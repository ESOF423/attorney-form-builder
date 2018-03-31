const db = require('../helpers/db.js')

module.exports = {
    create: async (formId, parent, label) => {
        let query = ''

        if (parent){
            query = `
                INSERT INTO formQuestionContainers (formId, label, parent)
                VALUES (${formId}, '${label}', ${parent})
            `
            console.log(query)
        } else {
            query = `
                INSERT INTO formQuestionContainers (formId, label)
                VALUES (${formId}, '${label}')
            `
        }

        let formQuestionContainer = await db.query(query)

        return formQuestionContainer.insertId
    },
    createRoot: async (formId) => {
        console.log("Add formQuestionContainer Root")
        let res = await db.query(`
            INSERT INTO formQuestionContainers (formId)
            VALUES (${formId})
        `)

        return res.insertId
    },
    get: async (formId) => {
        return await db.query(`
            SELECT * 
            FROM formQuestionContainers
            WHERE formId = ${formId}
        `)
    }
}