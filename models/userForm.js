const db = require('../helpers/db.js')

module.exports = {
    getUsers: async (userId) => {
        let usersForms = await db.query(`
            SELECT userFormId, forms.name as formName, forms.cost, userForms.purchased
            FROM userForms
                JOIN forms ON userForms.formId = forms.formId
            WHERE userForms.userId=${userId}
        `)

        return usersForms
    },
    getAnswers: async (userFormId) => {
        let resp = await db.query(`
            SELECT formQuestions.formQuestionId, label, answer
            FROM userFormAnswers
                JOIN userForms ON userForms.userFormId = userFormAnswers.userFormId
                JOIN formQuestions ON userFormAnswers.formQuestionId = formQuestions.formQuestionId
            WHERE userForms.userFormId=${userFormId}
        `)

        return resp
    },
    getForm: async (userFormId) => {
        let form = await db.query(`
            SELECT *
            FROM userForms
                JOIN forms ON userForms.formId = forms.formId
            WHERE userFormId=${userFormId}
        `)
        return form.length > 0 ? form[0] : null
    },
    create: async (userId, formId) => {
        let resp = await db.query(`
            INSERT INTO userForms (userId, formId, purchased)
            VALUES(${userId}, ${formId}, NOW())
        `)

        return resp.insertId
    },
    createAnswers: async (userFormId, answers) => {
        if (Object.keys(answers).length >= 1000) {
            throw "Unable to insert more than 1000 answers into database"
        }

        let values = Object.keys(answers).map((formQuestionId, i, arr) => {
            return `(${userFormId}, ${formQuestionId}, '${answers[formQuestionId]}')`
        })

        let resp = await db.query(`
            INSERT INTO userFormAnswers (userFormId, formQuestionId, answer)
            VALUES ${values};
        `)
    }
}