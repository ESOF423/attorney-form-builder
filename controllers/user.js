const path = require('path')
const express = require('express')
const router = express.Router()

router.get('/user', function(req, res) {
    res.sendFile(path.join(__dirname, '../views', 'user.html'))
})

module.exports = router
