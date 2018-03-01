const path = require('path')
const express = require('express')
const router = express.Router()

const dbFunctions = require('../helpers/db-functions.js')

router.get('/', function(req, res) {
    res.sendFile(path.join(__dirname, '../views', 'purchaseForm.html'))
})

router.get('/getFormData', async (req, res) => {
    let formId = req.query.formId

    const questions = await dbFunctions.getFormQuestions(formId)
    const formName = (await dbFunctions.getForm(formId)).name

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

        let userFormId = await dbFunctions.createUserForm(userId, formId)
        await dbFunctions.createUserFormAnswers(userFormId, answers)
    }
})

module.exports = router
