const path = require('path')
const express = require('express')
const router = express.Router()

const accountModel = require('../models/account.js')

router.get('/', function (req, res) {
    res.sendFile(path.join(__dirname, '../views', 'register.html'))
})

router.post('/createUser', async (req, res) => {
    try {
        var {email, password, passwordRetype} = req.body

        await accountModel.createAccount(email, password, passwordRetype)

        res.setHeader('Content-Type', 'application/json');
        res.send(JSON.stringify({
            success: true
        }));

    } catch (err) {
        console.error(err)
    }
})


router.post('/createAttorney', async (req, res) => {
    try {
        //let {email, password, passwordRetype, name, about} = req.body
        var email = req.body.email
        var password = req.body.password
        var passwordRetype = req.body.passwordRetype
        var name = req.body.name
        var about = req.body.about

        console.log(`${email} ${password} ${passwordRetype} ${name} ${about}`)

        await accountModel.createAttorney(email, password, passwordRetype, name, about)

        res.setHeader('Content-Type', 'application/json');
        res.send(JSON.stringify({
            success: true
        }));

    } catch (err) {
        console.error(err)
    }
})

module.exports = router
