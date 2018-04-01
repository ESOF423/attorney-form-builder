const md5 = require('md5')
const db = require('../helpers/db.js')

module.exports = {
    get: async (email, pass) => {
        pass = md5(pass)
        
        let res = await db.query(`
            SELECT * 
            FROM accounts
            WHERE email='${email}' AND password='${pass}'
        `)

        return res
    },
    authenticate: async (email, pass) => {
        let account = await module.exports.get(email, pass)
        return {
            isAuthenticated: account.length > 0,
            accountId: account.length > 0 ? account[0].accountId : null
        }
    },
    create: async (email, password, passwordRetype) => {
        if (pass != passRetype){
            throw new Error("Passwords do not match")
        }
        pass = md5(pass)

        let emailExistsRes = await db.query(`
            SELECT *
            FROM accounts
            WHERE email='${email}'
        `)

        if (emailExistsRes.length > 0){
            throw new Error("Email already exists")
        }

        await db.query(`
            INSERT INTO accounts (email, password)
            VALUES ('${email}', '${pass}');
        `)
    },

    createAttorney: async (email, password, passwordRetype, name, about) => {
        if (pass != passRetype){
            throw new Error("Passwords do not match")
        }
        pass = md5(pass)

        let emailExistsRes = await db.query(`
            SELECT *
            FROM accounts
            WHERE email='${email}'
        `)

        if (emailExistsRes.length > 0){
            throw new Error("Email already exists")
        }

        await db.query(`
            INSERT INTO accounts (email, password)
            VALUES ('${email}', '${pass}');
        `)

	await db.query(`
	    INSERT INTO attornies (name, about, accountId)
            VALUES ('${name}', '${about}', LAST_INSERT_ID())
    },


    isAttorney: async (accountId) => {
        console.log(accountId)
        let query = await db.query(`
            SELECT *
            FROM accounts
                JOIN attornies ON accounts.accountId = attornies.accountId
            WHERE accounts.accountId = ${accountId}
        `)

        return {
            isAttorney: query.length > 0,
            attorneyId: query.length > 0 ? query[0].attorneyId : null
        }
    },

    getUser: async (accountId) => {
        let query = await db.query(`
            SELECT *
            FROM accounts
                JOIN users ON accounts.accountId = users.accountId
            WHERE accounts.accountId = ${accountId}
        `)

        return query.length > 0 ? query[0] : null
    }
}
