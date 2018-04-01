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
    }
}