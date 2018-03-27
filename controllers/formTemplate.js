onst path = require('path')
const express = require('express')
const router = express.Router()

const auth = require('../middlewares/auth.js')

const formModel = require('../models/form.js')
const formQuestionModel = require('../models/formQuestion.js')

router.use(auth.attorney)

router.get('/', (req, res) => {
    res.sendFile(path.join(__dirname, '../views', 'formBuilder.html'))
})

router.post('/submitForm', async (req, res) => {
    if (req.session.isAuthenticated && req.session.isAttorney){
        console.log(req.body)
        let {name, cost, state} = req.body
        let questions = JSON.parse(req.body.questions)
        let attorneyId = req.session.attorneyId
        let insert = JSON.parse(req.body.questions)

        let formId = await formModel.create(attorneyId, name, cost, state)
        await formQuestionModel.createMultiple(formId, questions)
        let formBuild = await formQuestionModel.createMultiple(questions, insert)

        res.setHeader('Content-Type', 'application/json');
        res.send(JSON.stringify({
            success: true
        }));
    }
})

module.exports = router
