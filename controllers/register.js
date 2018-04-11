const path = require('path')
const express = require('express')
const router = express.Router()

const accountModel = require('../models/account.js')
const userModel = require('../models/user.js')
const attorneyModel = require('../models/attorney.js')

router.get('/', function (req, res) {
    res.sendFile(path.join(__dirname, '../views', 'register.html'))
})

router.post('/createUser', async (req, res) => {
    res.setHeader('Content-Type', 'application/json');
    try {
        let {email, password, passwordRetype} = req.body

        let accountId = await accountModel.create(email, password, passwordRetype)
        await userModel.create(accountId)

        
        res.send(JSON.stringify({
            success: true
        }));

    } catch (err) {
        res.send(JSON.stringify({
            success: false,
            errorMessage: err.message
        }));
    }
})


router.post('/createAttorney', async (req, res) => {
    res.setHeader('Content-Type', 'application/json');
    try {
        let {email, password, passwordRetype, name, about} = req.body

        let accountId = await accountModel.create(email, password, passwordRetype)
        await attorneyModel.create(accountId, name, about)
        
        res.send(JSON.stringify({
            success: true
        }));
    } catch (err) {
        res.send(JSON.stringify({
            success: false,
            errorMessage: err.message
        }));
    }
})

module.exports = router
