const db = require('../helpers/db.js')

module.exports = {
    createMultiple: async (userFormId, answers) => {
        let values = answers.map((answer) => {
            return `(${userFormId}, ${answer.formQuestionId}, '${answer.answer}')`
        })

        let resp = await db.query(`
            INSERT INTO userFormAnswers (userFormId, formQuestionId, answer)
            VALUES ${values};
        `)
    },
    get: async (userFormId) => {
        let resp = await db.query(`
            SELECT answer, formQuestions.label as questionLabel, formQuestionContainers.formQuestionContainerId, formQuestionContainers.label as containerLabel
            FROM userFormAnswers
                JOIN formQuestions ON userFormAnswers.formQuestionId = formQuestions.formQuestionId
                JOIN formQuestionContainers ON formQuestions.formQuestionContainerId = formQuestionContainers.formQuestionContainerId
            WHERE userFormId = ${userFormId}
        `)

        return resp
    }
}