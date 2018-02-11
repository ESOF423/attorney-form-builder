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

app.post('/authenticate', function(req, res) {
    var email = req.body.email
    var password = req.body.password

    var isAuthenticated = false;
    var errorText = ""
    try {
        isAuthenticated = await dbFunctions.authenticate(email, password)
    } catch(e) {
        errorText = e
    }
    

    res.setHeader('Content-Type', 'application/json');
    res.send(JSON.stringify({
        isAuthenticated: isAuthenticated,
        errorText: errorText
    }));
})

app.listen(8080)