const path = require('path')
const express = require('express')
const router = express.Router()

const latexCompile = require('../helpers/latexCompile.js')

const userFormModel = require('../models/userForm.js')
const formModel = require('../models/form.js')

router.get('/', function (req, res) {
    if (req.session.isAuthenticated){
        res.sendFile(path.join(__dirname, '../views', 'user.html'))
    } else {
        res.redirect('/login')
    }
})

router.get('/purchaseForm', (req, res) => {
    res.sendFile(path.join(__dirname, '../views', 'purchaseForm.html'))
})

router.get('/getForms', async (req, res) => {
    if (req.session.isAuthenticated) {
        let forms = await userFormModel.getUsers(req.session.userId)

        res.setHeader('Content-Type', 'application/json');
        res.send(JSON.stringify({
            forms: forms
        }));
    }
})

router.get('/downloadForm', async (req, res) => {
    if (req.session.isAuthenticated){
        const userFormId = req.query.userFormId
        const userId = req.session.userId
        
        const formAnswers = await userFormModel.getAnswers(userFormId)
        const form = await userFormModel.getForm(userFormId)

        var directory = await latexCompile.compile(form, formAnswers)
        res.download(directory + "/src.pdf", `${form.name}.pdf`)
    }
})

module.exports = router