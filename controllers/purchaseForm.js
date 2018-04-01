const path = require('path')
const express = require('express')
const router = express.Router()

const auth = require('../middlewares/auth.js')

const formModel = require('../models/form.js')
const formQuestion = require('../models/formQuestion.js')
const formQuestionContainer = require('../models/formQuestionContainer.js')
const userFormModel = require('../models/userForm.js')
const userFormAnswerModel = require('../models/userFormAnswer.js')
const paymentModel = require('../models/payment.js')

router.use(auth.user)

router.get('/', function(req, res) {
    res.sendFile(path.join(__dirname, '../views', 'purchaseForm.html'))
})

router.get('/getFormData', async (req, res) => {
    let formId = req.query.formId

    const containers = await formQuestionContainer.get(formId) 
    const questions = await formQuestion.get(formId)

    let questionData = generateQuestionJson(containers, questions)

    const formData = await formModel.get(formId)

    res.setHeader('Content-Type', 'application/json');
    res.send(JSON.stringify({
        questions: questionData,
        formName: formData.name,
        formCost: formData.cost
    }));
})

router.post('/purchaseForm', async (req, res) => {
    let formId = req.body.formId
    let answers = JSON.parse(req.body.answers)
    let userId = req.session.userId

    //await paymentModel.makePayment(200, "source", `Charge for formId: ${formId}`)

    let userFormId = await userFormModel.create(userId, formId)
    await userFormAnswerModel.createMultiple(userFormId, answers)

    res.setHeader('Content-Type', 'application/json');
    res.send(JSON.stringify({
        success: true
    }));
})

function generateQuestionJson(containers, questions) {
    // get the root container by its null parent
    let rootContainer = containers.find(el => {
        return el.parent == null
    })

    let res = generateQuestionJsonAux(rootContainer, containers, questions)

    // because we are at the root, ignore the label, it has none
    return [...res.questions] 
}

function generateQuestionJsonAux(parentContainer, containers, questions){
    let appendObj = {}

    let parentQuestions = questions.filter(el => {
        return el.formQuestionContainerId == parentContainer.formQuestionContainerId
    }).map(el => {
        return {
            formQuestionId: el.formQuestionId,
            label: el.label,
            type: el.formQuestionTypeId
        }
    })

    let parentContainers = containers.filter(el => {
        return el.parent == parentContainer.formQuestionContainerId
    }).map(el => {
        return generateQuestionJsonAux(el, containers, questions)
    })

    if (parentQuestions.length > 0) {
        appendObj.questions = parentQuestions
    }

    return {
        label: parentContainer.label,
        questions: [...parentQuestions, ...parentContainers]
    }
}


module.exports = router
