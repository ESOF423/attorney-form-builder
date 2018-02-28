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
    return new Promise((resolve, reject) => {
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
            FROM accounts
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
            FROM accounts
            WHERE email='${email}'
        `)

        if (emailExistsRes.length > 0){
            throw new Error("Email already exists")
        }

        await query(conn, `
            INSERT INTO accounts (email, password)
            VALUES ('${email}', '${pass}');
        `)
    },

    getForms: async (name, attorney, cost) => {
        
        attorney = !!attorney ? `%${attorney}%` : ''

        let conn = await getConnection()

        let forms = await query(conn, `
            SELECT formId, forms.name as formName, forms.cost, attornies.name as attorneyName
            FROM forms 
            JOIN attornies ON forms.attorneyId = attornies.attorneyId
        `)

        return forms
    },

    getUserForms: async (email) => {
        let conn = await getConnection()

        let forms = await query(conn, `
            SELECT forms.name as formName, forms.cost, userForms.purchased
            FROM userForms
                JOIN forms ON userForms.formId = forms.formId
                JOIN users ON userForms.userId = users.userId
                JOIN accounts ON users.accountId = accounts.accountId
            WHERE accounts.email='${email}'
        `)

        return forms
    },

    getFormQuestions: async (formId) => {
        let conn = await getConnection()

        let questions = await query(conn, `
            SELECT label, value, templateName
            FROM formQuestions
                JOIN formQuestionTypes ON formQuestions.formQuestionTypeId = formQuestionTypes.formQuestionTypeId
            WHERE formId=${formId}
        `)

        return questions
    }
}