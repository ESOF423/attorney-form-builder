const path = require('path')
const express = require('express')
const router = express.Router()

const auth = require('../middlewares/auth.js')

const latexCompile = require('../helpers/latexCompile.js')

const userFormModel = require('../models/userForm.js')
const formModel = require('../models/form.js')

router.use(auth.user)

router.get('/', function (req, res) {
    res.sendFile(path.join(__dirname, '../views', 'user.html'))
})

router.get('/purchaseForm', (req, res) => {
    res.sendFile(path.join(__dirname, '../views', 'purchaseForm.html'))
})

router.get('/getForms', async (req, res) => {
    let forms = await userFormModel.getUsers(req.session.userId)

    res.setHeader('Content-Type', 'application/json');
    res.send(JSON.stringify({
        forms: forms
    }));
})

router.get('/downloadForm', async (req, res) => {
    const userFormId = req.query.userFormId
    const userId = req.session.userId
    
    const formAnswers = await userFormModel.getAnswers(userFormId)
    const form = await userFormModel.getForm(userFormId)

    var directory = await latexCompile.compile(form, formAnswers)
    res.download(directory + "/src.pdf", `${form.name}.pdf`)
})

router.get('/signout', async (req, res) => {
    req.session.isAuthenticated = false
    req.session.userId = null

    res.redirect(`/login`)
})


module.exports = router