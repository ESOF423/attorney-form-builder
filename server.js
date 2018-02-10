var express = require('express');
var app = express();
var path = require('path');

var dbFunctions = require('./src/db-functions.js')

app.use(express.static('public'))

app.get('/', function(req, res) {
    res.sendFile(path.join(__dirname + '/public/index.html'))
})

app.get('/login', function(req, res) {
    res.sendFile(path.join(__dirname + '/public/login.html'))
})

app.post('/authenticate', function(req, res) {
    var email = req.param('email')
    var password = req.param('password')

    var isAuthenticated = dbFunctions.authenticate(email, password)

    res.setHeader('Content-Type', 'application/json');
    res.send(JSON.stringify({
        isAuthenticated: isAuthenticated,
        errorText: !isAuthenticated ? 'Invalid username or password' : ''
    }));
})

app.listen(8080)