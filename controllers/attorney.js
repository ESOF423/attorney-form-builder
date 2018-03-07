const path = require('path')
const express = require('express')
const router = express.Router()

router.get('/', function (req, res) {
    if (req.session.isAuthenticated && req.session.isAttorney){
        res.sendFile(path.join(__dirname, '../views', 'attorneyPage.html'))
    } else {
        res.redirect('/login')
    }
})

module.exports = router