const path = require('path')
const express = require('express')
const router = express.Router()

const accountModel = require('../models/account.js')

router.get('/', function(req, res) {
    res.sendFile(path.join(__dirname, '../views', 'register.html'))
})

router.post('/createUser', async (req, res) => {
    try { 
        var email = req.body.email
        var password = req.body.password
        var passwordRetype = req.body.passwordRetype

        await accountModel.createAccount(email, password, passwordRetype)

        res.setHeader('Content-Type', 'application/json');
        res.send(JSON.stringify({
            success: true
        }));

    } catch(err){
       error(res, err)
    }
})

module.exports = router
