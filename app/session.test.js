const chai = require('chai');
const expect = chai.expect;
const appConstants = require('./constants');
const session = require('./session');

const thisSession = new session();
describe('Session',()=>{
    context('Testing of Session',()=>{
        it('should return a valid session with an unlocked wallet',function(done){
            this.timeout(5000);
            thisSession.authenticate().then((result)=>{
                expect(result.bitgo).to.have.property('_token');
                expect(result.bitgo._token).to.equal(appConstants.accessToken);
                done();
            });
        })
    })
});
