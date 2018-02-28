const path = require('path')
const express = require('express')
const router = express.Router()

const dbFunctions = require('../helpers/db-functions.js')

router.get('/', function(req, res) {
    res.sendFile(path.join(__dirname, '../views', 'purchaseForm.html'))
})

router.get('/questions', async (req, res) => {
    var formId = 1

    const questions = await dbFunctions.getFormQuestions(formId)

    res.setHeader('Content-Type', 'application/json');
    res.send(JSON.stringify({
        questions: questions
    }));
})

module.exports = router
