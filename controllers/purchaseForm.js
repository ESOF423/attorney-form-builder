const path = require('path')
const express = require('express')
const router = express.Router()

const formModel = require('../models/form.js')
const userFormModel = require('../models/userForm.js')

router.get('/', function(req, res) {
    res.sendFile(path.join(__dirname, '../views', 'purchaseForm.html'))
})

router.get('/getFormData', async (req, res) => {
    let formId = req.query.formId

    const questions = await formModel.getQuestions(formId)
    const formName = (await formModel.get(formId)).name

    res.setHeader('Content-Type', 'application/json');
    res.send(JSON.stringify({
        questions: questions,
        formName: formName
    }));
})

router.post('/purchaseForm', async (req, res) => {
    if (req.session.isAuthenticated){
        let formId = req.body.formId
        let answers = JSON.parse(req.body.answers)
        let userId = req.session.userId

        let userFormId = await userFormModel.create(userId, formId)
        await userFormModel.createAnswers(userFormId, answers)

        res.setHeader('Content-Type', 'application/json');
        res.send(JSON.stringify({
            success: true
        }));
    }
})

module.exports = router
