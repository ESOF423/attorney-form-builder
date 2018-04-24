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

const latexCompile = require('../helpers/latexCompile.js')

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
        formCost: parseFloat((formData.cost)/100) // due to stripe integer payment thing
    }));
})

router.post('/purchaseForm', async (req, res) => {
    let formId = req.body.formId
    let stripeTokenObj = req.body.stripeToken
    let isAttorney = req.body.isAttorney
    let answers = JSON.parse(req.body.answers)
    let userId = req.session.userId

    // retreive the form from the db, so users cant modify the cost of the form upon submission
    let form = await formModel.get(formId)

    if (isAttorney == 'true'){
        var directory = await latexCompile.compile(form, answers)
        res.download(directory + "/src.pdf", `${form.name}.pdf`)
    } else {
        await paymentModel.makePayment(form.cost, stripeTokenObj.id, `Charge for formId: ${formId}(${form.name}), on userId: ${userId}`)

        let userFormId = await userFormModel.create(userId, formId)
        await userFormAnswerModel.createMultiple(userFormId, answers)
    
        res.setHeader('Content-Type', 'application/json');
        res.send(JSON.stringify({
            success: true
        }));
    }
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
