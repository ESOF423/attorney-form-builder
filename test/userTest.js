var expect = require('chai').expect

const db = require('../src/db-functions.js')

describe('authenticate test', () => {
    it('valid login', async (done) => {
        try {
            var result = await db.authenticate("user", "pass");
    
            expect(result).to.be.true

            done();
        } catch(err) {
            done(err);
        }
    })

    it('invalid username', async (done) => {
        try {
            var result = await db.authenticate("invalidUser", "pass");
    
            expect(result).to.be.false

            done();
        } catch(err) {
            done(err);
        }
    })

    it('invalid password', async (done) => {
        try {
            var result = await db.authenticate("user", "invalidpassword");
    
            expect(result).to.be.false

            done();
        } catch(err) {
            done(err);
        }
    })
})
