const db = require('../helpers/db.js')

module.exports = {
    create: async (formQuestionContainerId, label, formQuestionTypeId) => {
        console.log("add formQuestion")
        await db.query(`
            INSERT INTO formQuestions (formQuestionContainerId, label, formQuestionTypeId)
            VALUES (${formQuestionContainerId}, '${label}', ${formQuestionTypeId})
        `)

        // var testData = [
        //     { label: "", type: "Textbox" },
        //     { label: "Fooes", type: "Textbox" },
        //     {
        //         label: "This is a container",
        //         questions: [
        //             { 
        //                 label: "Question", 
        //                 type: "" 
        //             }
        //         ]
        //     }
        // ]
    }
}