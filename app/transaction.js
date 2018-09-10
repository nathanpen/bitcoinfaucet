const appConstants = require('./constants');
const session = require('./session');

class Transaction {
    walletInstance(){
        const thisSession = new session();
        return thisSession.authenticate();
    }
    list() {
        return new Promise((resolve, reject)=> {
            this.walletInstance().then(res=>{
                resolve(res);
            }).catch(err=>{
                reject(err);
            })
        }
    )}
    send(address) {
        return new Promise((resolve, reject)=> {
            this.walletInstance().then(function (res) {
                res.sendMany({
                    recipients: [
                        {
                            amount: appConstants.amount,
                            address: address
                        }
                    ],
                    walletPassphrase: appConstants.passphrase
                }).then(res=>{
                    resolve(res)
                }).catch(err=>{
                    reject(err);
                });

            }).catch(err=> {
                reject(err);
            })
        });
    }
}

module.exports = Transaction;