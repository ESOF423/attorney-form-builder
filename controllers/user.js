const path = require('path')
const express = require('express')
const router = express.Router()

const latexCompile = require('../helpers/latexCompile.js')
const dbFunctions = require('../helpers/db-functions.js')

router.get('/', function (req, res) {
    res.sendFile(path.join(__dirname, '../views', 'user.html'))
})

router.get('/purchaseForm', (req, res) => {
    res.sendFile(path.join(__dirname, '../views', 'purchaseForm.html'))
})

router.get('/getForms', async (req, res) => {
    if (req.session.isAuthenticated) {
        let forms = await dbFunctions.getUserForms(req.session.userId)

        res.setHeader('Content-Type', 'application/json');
        res.send(JSON.stringify({
            forms: forms
        }));
    } else {
        console.log('Not Authenticated')
    }
})

router.get('/downloadForm', async (req, res) => {
    if (req.session.isAuthenticated){
        const userFormId = req.query.userFormId
        const userId = req.session.userId


        const formAnswers = await dbFunctions.getUserFormAnswers(userId, userFormId)
        const form = await dbFunctions.getFormFromUserFormId(userFormId)

        var directory = await latexCompile.compile(form, formAnswers)
        
        res.download(directory + "/src.pdf")
        latexCompile.cleanup(directory)
    }
})

module.exports = router