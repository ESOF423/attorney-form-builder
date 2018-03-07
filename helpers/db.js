const mysql = require('mysql')
const config = require('./config.json')

let connection = null

function getConnection() {
    return new Promise((resolve, reject) => {
        if (connection){
            resolve(connection)
        } else {
            var conn = mysql.createConnection({
                host: "localhost",
                user: config.mysql.user,
                password: config.mysql.password,
                database: 'website'
            });
            
            conn.connect((err) => {
                if (err) {
                    throw new Error(err)
                }
                connection = conn
                resolve(conn)
            });
        }
    })   
}

module.exports = {
    query: async (sql) => {
        return new Promise((resolve, reject) => {
            getConnection().then((conn) => {
                conn.query(sql, function (err, result) {
                    if (err){
                        throw new Error(err)
                    }
                    resolve(result)
                });
            })
        })
    }
}