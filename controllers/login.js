const path = require('path')
const express = require('express')
const router = express.Router()

const accountModel = require('../models/account.js')

router.get('/', function(req, res) {
    res.sendFile(path.join(__dirname, '../views', 'login.html'))
})

router.post('/authenticate', async (req, res) => {
    try {
        var email = req.body.email
        var password = req.body.password

        let {isAuthenticated, accountId} = await accountModel.authenticate(email, password)
        
        if (isAuthenticated){
            req.session.isAuthenticated = true

            let {isAttorney, attorneyId} = await accountModel.isAttorney(accountId)
            req.session.isAttorney = isAttorney
            if (isAttorney) {
                req.session.attorneyId = attorneyId
            } else {
                req.session.userEmail = email
                req.session.userId = (await accountModel.getUser(accountId)).userId
            }
        }

        res.setHeader('Content-Type', 'application/json');
        res.send(JSON.stringify({
            isAuthenticated: isAuthenticated
        }));

    } catch(err) {
        console.error(err)
    }
})

module.exports = router
