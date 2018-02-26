const path = require('path')
const express = require('express')
const router = express.Router()

router.get('/formSearch', function(req, res) {
    res.sendFile(path.join(__dirname, '../views', 'formSearch.html'))
})

module.exports = router
