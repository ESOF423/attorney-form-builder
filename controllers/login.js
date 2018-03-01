const path = require('path')
const express = require('express')
const router = express.Router()

const dbFunctions = require('../helpers/db-functions.js')

router.get('/', function(req, res) {
    res.sendFile(path.join(__dirname, '../views', 'login.html'))
})

router.post('/authenticate', async (req, res) => {
    try {
        var email = req.body.email
        var password = req.body.password

        var isAuthenticated = await dbFunctions.authenticate(email, password)
        
        if (isAuthenticated){
            req.session.isAuthenticated = true
            req.session.userEmail = email
            req.session.userId = await dbFunctions.getUserId(email)
            console.log(req.session.userId)
        }

        res.setHeader('Content-Type', 'application/json');
        res.send(JSON.stringify({
            isAuthenticated: isAuthenticated
        }));

    } catch(err) {
        error(res, err)
    }
})

module.exports = router
