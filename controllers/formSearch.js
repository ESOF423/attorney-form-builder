const path = require('path')
const express = require('express')
const router = express.Router()

const formModel = require('../models/form.js')


router.get('/', (req, res) => {
    res.sendFile(path.join(__dirname, '../views', 'formSearch.html'))
})

router.get('/getForms', async (req, res) => {
    try {
        const name = req.body.name
        const attorney = req.body.attorney
        const cost = req.body.cost

        let forms = await formModel.search(name, attorney, cost)

        res.setHeader('Content-Type', 'application/json');
        res.send(JSON.stringify({
            forms: forms
        }));

    } catch(err) { }
})

module.exports = router
