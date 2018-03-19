const path = require('path')
const express = require('express')
const router = express.Router()

const auth = require('../middlewares/auth.js')

const formModel = require('../models/form.js')

router.use(auth.attorney)

router.get('/', (req, res) => {
    res.sendFile(path.join(__dirname, '../views', 'attorneyPage.html'))
})

router.get('/getForms', async (req, res) => {
    if (req.session.isAuthenticated && req.session.isAttorney) {
        let forms = await formModel.getByAttorney(req.session.attorneyId)

        res.setHeader('Content-Type', 'application/json');
        res.send(JSON.stringify({
            forms: forms
        }));
    }
})

router.get('/signout', async (req, res) => {
    req.session.isAttorney = false
    req.session.isAuthenticated = false
    req.session.attorneyId = null

    res.redirect(`/login`)
})

module.exports = router