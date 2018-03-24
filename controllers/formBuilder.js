const path = require('path')
const express = require('express')
const router = express.Router()

const auth = require('../middlewares/auth.js')

const formModel = require('../models/form.js')
const formQuestionModel = require('../models/formQuestion.js')
const formQuestionContainerModel = require('../models/formQuestionContainer.js')

router.use(auth.attorney)

router.get('/', (req, res) => {
    res.sendFile(path.join(__dirname, '../views', 'formBuilder.html'))
})

router.post('/submitForm', async (req, res) => {
    if (req.session.isAuthenticated && req.session.isAttorney){
        let {name, cost, state} = req.body
        let questions = JSON.parse(req.body.questions)

        let attorneyId = req.session.attorneyId

        let formId = await formModel.create(attorneyId, name, cost, state)

        let rootContainerId = await formQuestionContainerModel.createRoot(formId)
        await createQuestions(formId, rootContainerId, questions)

        res.setHeader('Content-Type', 'application/json');
        res.send(JSON.stringify({
            success: true
        }));
    }
})

async function createQuestions(formId, parentId, questions){
    for(let i = 0; i < questions.length; i++){
        let question = questions[i]

        if (question.hasOwnProperty("questions")){
            // question is a container question, recurse.
            let newParentId = await formQuestionContainerModel.create(formId, parentId, question.label)
            createQuestions(formId, newParentId, question.questions)
        } else {
            // question is just a regular question
            await formQuestionModel.create(formId, parentId, question.label, 1)
        }

    }
}

module.exports = router
