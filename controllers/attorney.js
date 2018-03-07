const path = require('path')
const express = require('express')
const router = express.Router()

const formModel = require('../models/form.js')

router.get('/', (req, res) => {
    if (req.session.isAuthenticated && req.session.isAttorney){
        res.sendFile(path.join(__dirname, '../views', 'attorneyPage.html'))
    } else {
        res.redirect('/login')
    }
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

module.exports = router