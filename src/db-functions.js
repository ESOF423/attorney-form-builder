const md5 = require('md5')
const mysql = require('mysql')

const config = require('./config.json')

function getConnection() {
    return new Promise((resolve) => {
        var connection = mysql.createConnection({
            host: "localhost",
            user: config.mysql.user,
            password: config.mysql.password,
            database: 'website'
        });
        
        connection.connect((err) => {
            if (err) {
                throw new Error(err)
            }

            resolve(connection)
        });
    })   
}

function query(conn, sql){
    return new Promise((reject, resolve) => {
        conn.query(sql, function (err, result) {
            if (err){
                throw new Error(err)
            }

            resolve(result)
        });
    })
}

module.exports = {
    // checks to see if a user exists for a password and email combination
    authenticate: async (email, pass) => {
        pass = md5(pass)
    
        let conn = await getConnection()

        let res = await query(conn, `
            SELECT * 
            FROM users
            WHERE email='${email}' AND password='${pass}'
        `)

        return res.length > 0;
    },

    createAccount: async (email, pass, passRetype) => {
        if (pass != passRetype){
            throw new Error("Passwords do not match")
        }
        pass = md5(pass)

        let conn = await getConnection()

        let emailExistsRes = await query(conn, `
            SELECT *
            FROM users
            WHERE email='${email}'
        `)

        if (emailExists.length > 0){
            throw new Error("Email already exists")
        }

        await query(conn, `
            INSERT INTO users (email, password)
            VALUES (${email}, ${pass});
        `)

    }
}