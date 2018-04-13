const path = require('path')
const express = require('express')
const router = express.Router()

const formModel = require('../models/form.js')


router.get('/', (req, res) => {
    res.sendFile(path.join(__dirname, '../views', 'formSearch.html'))
})

router.post('/getForms', async (req, res) => {
    try {
        const {formName, formCost, attorneyName, state} = req.body

        let forms = await formModel.search(formName, attorneyName, formCost, state)

        res.setHeader('Content-Type', 'application/json');
        res.send(JSON.stringify({
            forms: forms
        }));

    } catch(err) { }
})

module.exports = router
