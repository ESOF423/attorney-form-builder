const db = require('../helpers/db.js')

module.exports = {
    create: async (formId, formQuestionContainerId, label, formQuestionTypeId) => {
        await db.query(`
            INSERT INTO formQuestions (formId, formQuestionContainerId, label, formQuestionTypeId)
            VALUES (${formId}, ${formQuestionContainerId}, '${label}', ${formQuestionTypeId})
        `)
    }
}