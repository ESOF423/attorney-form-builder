const path = require('path')
const express = require('express')
const router = express.Router()

const auth = require('../middlewares/auth.js')

const formModel = require('../models/form.js')
const userFormModel = require('../models/userForm.js')
const paymentModel = require('../models/payment.js')

router.use(auth.user)

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
    let formId = req.body.formId
    let answers = JSON.parse(req.body.answers)
    let userId = req.session.userId

    await paymentModel.makePayment(200, "source", `Charge for formId: ${formId}`)

    let userFormId = await userFormModel.create(userId, formId)
    await userFormModel.createAnswers(userFormId, answers)

    res.setHeader('Content-Type', 'application/json');
    res.send(JSON.stringify({
        success: true
    }));
})

module.exports = router
