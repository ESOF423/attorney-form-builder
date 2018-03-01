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

    getUserId: async (email) => {
        let conn = await getConnection()

        let res = await query(conn, `
            SELECT userId
            FROM accounts
                JOIN users ON users.accountId = accounts.accountId
            WHERE email='${email}'
        `)

        return res.length > 0 ? res[0].userId : null
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

    getFormFromUserFormId: async (userFormId) => {
        let conn = await getConnection()

        let form = await query(conn, `
            SELECT *
            FROM userForms
                JOIN forms ON userForms.formId = forms.formId
            WHERE userFormId=${userFormId}
        `)

        return form[0]
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

    getUserForms: async (userId) => {
        let conn = await getConnection()

        let forms = await query(conn, `
            SELECT userFormId, forms.name as formName, forms.cost, userForms.purchased
            FROM userForms
                JOIN forms ON userForms.formId = forms.formId
            WHERE userForms.userId=${userId}
        `)

        return forms
    },

    getFormQuestions: async (formId) => {
        let conn = await getConnection()

        let questions = await query(conn, `
            SELECT formQuestionId, label, value, templateName
            FROM formQuestions
                JOIN formQuestionTypes ON formQuestions.formQuestionTypeId = formQuestionTypes.formQuestionTypeId
            WHERE formId=${formId}
        `)

        return questions
    },

    createUserForm: async (userId, formId) => {
        let conn = await getConnection()

        let resp = await query(conn, `
            INSERT INTO userForms (userId, formId, purchased)
            VALUES(${userId}, ${formId}, NOW())
        `)

        return resp.insertId
    },

    createUserFormAnswers: async (userFormId, answers) => {
        if (Object.keys(answers).length >= 1000) {
            throw "Unable to insert more than 1000 answers into database"
        }
        let conn = await getConnection()

        let values = Object.keys(answers).map((formQuestionId, i, arr) => {
            return `(${userFormId}, ${formQuestionId}, '${answers[formQuestionId]}')`
        })

        let resp = await query(conn, `
            INSERT INTO userFormAnswers (userFormId, formQuestionId, answer)
            VALUES ${values};
        `)
    },

    getUserFormAnswers: async (userFormId, userId) => {
        let conn = await getConnection()

        let resp = await query(conn, `
            SELECT formQuestions.formQuestionId, label, answer
            FROM userFormAnswers
                JOIN userForms ON userForms.userFormId = userFormAnswers.userFormId
                JOIN formQuestions ON userFormAnswers.formQuestionId = formQuestions.formQuestionId
            WHERE userForms.userFormId=${userFormId} AND userForms.userId=${userId}
        `)

        return resp
    }
}