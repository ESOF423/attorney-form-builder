const db = require('../helpers/db.js')

module.exports = {
    create: async (accountId, name, about) => {
        return (await db.query(`
            INSERT INTO attornies (accountId, name, about)
            VALUES (${accountId}, '${name}', '${about}');
        `)).insertId
    }
}