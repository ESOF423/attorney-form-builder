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


app.get('/register', function(req, res){
    res.sendFile(path.join(__dirname + '/public/register.html'))
})

app.get('/user', (req, res) => {
    res.sendFile(path.join(__dirname + '/public/user.html'))
})

app.get('/formSearch', (req, res) => {
    res.sendFile(path.join(__dirname + '/public/formSearch.html'))
})

app.get('/forms', (req, res) => {
    
})



app.listen(8080, () => {
    console.log("server running on port 8080")
})