const appConstants = require('./constants');
const BitGo = require('bitgo');
const bitgo = new BitGo.BitGo({env:'test'});
const basecoin = bitgo.coin(appConstants.coin);

class BitGoSession {
    authenticate(){
        return new Promise(function(resolve,reject){
                bitgo.authenticateWithAccessToken({ accessToken: appConstants.accessToken });
                bitgo.unlock({ otp: appConstants.otp }).then(function(res){
                    basecoin.wallets().get({ id: appConstants.walletId }).then(function(res){
                        resolve(res);

                    }).catch(error=>{
                        reject(error);
                    });
                },function(res){
                    reject(res);
                });
            }
        );
    }
}

module.exports = BitGoSession;