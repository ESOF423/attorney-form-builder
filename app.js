const bodyParser = require('body-parser')
const express = require('express')
const session = require('express-session')
const app = express()

function error(res, err){
    console.log(err)
    res.setHeader('Content-Type', 'application/json');
    res.status(err.status || 500);
    res.json({
        message: err.message,
        error: err
    });
}

app.use(bodyParser.json())
app.use(bodyParser.urlencoded({
    extended: true
}));

app.use(session({ 
    secret: 'this-is-a-secret-token', 
    cookie: {}
}));

app.use(express.static(__dirname + '/public'))

app.use('/', require('./controllers/index'))
app.use('/login', require('./controllers/login'))
app.use('/register', require('./controllers/register'))
app.use('/user', require('./controllers/user'))
app.use('/formSearch', require('./controllers/formSearch'))
app.use('/formBuilder', require('./controllers/formBuilder'))
app.use('/purchaseForm', require('./controllers/purchaseForm'))

app.listen(8080, () => {
    console.log('Listening on port 8080...')
})