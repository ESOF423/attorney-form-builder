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
    getQuestions: async (formId) => {
        let questions = await db.query(`
            SELECT formQuestionId, label, value, templateName
            FROM formQuestions
                JOIN formQuestionTypes ON formQuestions.formQuestionTypeId = formQuestionTypes.formQuestionTypeId
            WHERE formId=${formId}
        `)

        return questions
    },
    search: async (formName, attorneyName, cost) => {
        attorneyName = !!attorneyName ? `%${attorneyName}%` : ''

        let forms = await db.query(`
            SELECT formId, forms.name as formName, forms.cost, attornies.name as attorneyName
            FROM forms 
            JOIN attornies ON forms.attorneyId = attornies.attorneyId
        `)

        return forms
    }
}