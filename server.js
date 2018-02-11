var express = require('express');
var bodyParser = require('body-parser')
var path = require('path');

var dbFunctions = require('./src/db-functions.js')

var app = express();

app.use(bodyParser.json())
app.use(bodyParser.urlencoded({
    extended: true
}));

app.use(express.static('public'))


app.get('/', function(req, res) {
    res.sendFile(path.join(__dirname + '/public/index.html'))
})

app.get('/login', function(req, res) {
    res.sendFile(path.join(__dirname + '/public/login.html'))
})

app.get('/register', function(req, res){
    res.sendFile(path.join(__dirname + '/public/register.html'))
})

app.post('/authenticate', async (req, res) => {
    try {
        var email = req.body.email
        var password = req.body.password

        var isAuthenticated = await dbFunctions.authenticate(email, password)
        
        res.setHeader('Content-Type', 'application/json');
        res.send(JSON.stringify({
            isAuthenticated: isAuthenticated
        }));

    } catch(err) {
        res.status(500)
        res.render('error', { error: err })
    }
})

app.post('/createUser', async (req, res) => {
    try { 
        var email = req.body.email
        var password = req.body.password
        var passwordRetype = req.body.passwordRetype

        await dbFunctions.createAccount(email, password, passwordRetype)

        res.setHeader('Content-Type', 'application/json');
        res.send(JSON.stringify({
            success: true
        }));

    } catch(err){
        res.status(500)
        res.render('error', { error: err })
    }
})

app.listen(8080)