const path = require('path')
const express = require('express')
const router = express.Router()

const formModel = require('../models/form.js')
const formQuestionModel = require('../models/formQuestion.js')

router.get('/', (req, res) => {
    res.sendFile(path.join(__dirname, '../views', 'formBuilder.html'))
})

router.post('/submitForm', async (req, res) => {
    if (req.session.isAuthenticated && req.session.isAttorney){
        let {name, cost, state} = req.body
        let questions = JSON.parse(req.body.questions)

        let attorneyId = req.session.attorneyId

        let formId = await formModel.create(attorneyId, name, cost, state)
        await formQuestionModel.createMultiple(formId, questions)

        res.setHeader('Content-Type', 'application/json');
        res.send(JSON.stringify({
            success: true
        }));
    }
})

module.exports = router
