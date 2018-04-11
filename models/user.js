const db = require('../helpers/db.js')

module.exports = {
    create: async (accountId) => {
        return (await db.query(`
            INSERT INTO users (accountId)
            VALUES (${accountId});
        `)).insertId
    }
}