var express = require('express');
var app = express();
var path = require('path');

app.use(express.static('public'))

app.get('/', function(req, res) {
    res.sendFile(path.join(__dirname + '/public/index.html'))
})

app.get('/login', function(req, res) {
    res.sendFile(path.join(__dirname + '/public/login.html'))
})

app.post('/authenticate', function(req, res) {
    var email = req.param('email')
    var password = req.
})

app.listen(8080)