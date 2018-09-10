const session = require('./session');
const express = require('express');
const app = express();
const Transaction = require('./transaction');

const path = require('path');

app.options((req, res) => {
    console.log(res);
    res.setHeader("Access-Control-Allow-Origin", "*");
    res.setHeader('Access-Control-Allow-Methods', '*');
    res.setHeader("Access-Control-Allow-Headers", "*");
    next();
});
app.use('/', express.static(__dirname + '/client/'));
app.get('/client', function(req, res) {
    res.sendFile(path.join(__dirname + '/client/index.html'));
});


//SEND SOME TBTC TO AN ADDRESS
app.get('/sendTransaction/:address', function(req, res){
    if(req.params.address){
        let thisTransaction = new Transaction();
        thisTransaction.send(req.params.address).then(response=>{
            res.send(response)
        }).catch(error=>{
            res.status(500).send(error);
        });
    }
});

///RETURN WALLET TRANSACTIONS
app.get('/listwallettransactions/', function(req, res){
    if(req){
        let thisTransaction = new Transaction();
        thisTransaction.list().then(response=>{
            res.send(response)
        }).catch(error=>{
            res.status(500).send(error);
        });
    }
});


app.listen(3000, () => console.log('Example app listening on port 3000!'));
