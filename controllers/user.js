const path = require('path')
const express = require('express')
const router = express.Router()

const dbFunctions = require('../helpers/db-functions.js')

router.get('/', function (req, res) {
    res.sendFile(path.join(__dirname, '../views', 'user.html'))
})

router.get('/purchaseForm', (req, res) => {
    res.sendFile(path.join(__dirname, '../views', 'purchaseForm.html'))
})

router.get('/getForms', async (req, res) => {
    if (req.session.isAuthenticated) {
        let forms = await dbFunctions.getUserForms(req.session.userEmail)

        res.setHeader('Content-Type', 'application/json');
        res.send(JSON.stringify({
            forms: forms
        }));
    } else {
        console.log('Not Authenticated')
    }
})



module.exports = router