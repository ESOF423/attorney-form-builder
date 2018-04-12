const db = require('../helpers/db.js')

module.exports = {
    get: async (formId) => {
        let form = await db.query(`
            SELECT *
            FROM forms
            WHERE formId=${formId}
        `)

        return form[0]
    },
    create: async (attorneyId, name, cost, state, template) => {
        let resp = await db.query(`
            INSERT INTO forms (attorneyId, name, cost, state, template)
            VALUES (${attorneyId}, '${name}', ${cost}, '${state}', '${template}')
        `)

        return resp.insertId
    },
    getByAttorney: async (attorneyId) => {
        let forms = await db.query(`
            SELECT name as formName, cost
            FROM forms
            WHERE attorneyId = ${attorneyId}
        `)

        return forms
    },
    getQuestions: async (formId) => {
        let questions = await db.query(`
            SELECT formQuestionId, label, value, templateName
            FROM formQuestions
                JOIN formQuestionTypes ON formQuestions.formQuestionTypeId = formQuestionTypes.formQuestionTypeId
            WHERE formId=${formId}
        `)

        return questions
    },
    search: async (formName, attorneyName, formCost, state) => {

        formCost = parseFloat(formCost) * 100
        if (isNaN(formCost)){
            formCost = ''
        }

        let q = `
            SELECT formId, forms.name as formName, forms.cost, attornies.name as attorneyName
            FROM forms 
            JOIN attornies ON forms.attorneyId = attornies.attorneyId

            WHERE 
                (forms.name LIKE "%${formName}%" OR '${formName}' = '') AND
                (attornies.name LIKE "%${attorneyName}%" OR  '${attorneyName}' = '') AND
                (forms.cost = "${formCost}" OR '${formCost}' = '') AND
                (forms.state = "${state}" OR '${state}' = '')

        `

        console.log(q)

        let forms = await db.query(q)

        return forms
    }
}