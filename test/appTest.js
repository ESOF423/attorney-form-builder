const assert = require('chai').assert;
const app = require('../app');

const server = 'http://server.redstonelab.net:8080'

describe('Index', app.use(express.static(__dirname + '/public'))){
	it('Should produce correct directory', app.use(express.static(__dirname + 'public')){
		should.equal(app.use(), __dirname + '/public');
	});
});

describe('Login', app.use('/', require('./controllers/login')))
	it('should produce login', app.use('login/', require('./controllers/login')))
		should.equal(app.use(),'./controllers/login');
	});
});

describe('Register', app.use('/register', require('./controllers/register')){
	it('should produce register', app.use('/register', require('./controllers/register')){
		should.equal(app.use(),'./controllers/register');
	});
});


describe('User', app.use('/user', require('./controllers/user')){
	it('should produce user', app.use('/user', require('./controllers/user')){
		should.equal(app.use(),'./controllers/user');
	});
});

describe('Form Search', app.use('/formSearch', require('./controllers/formSearch')){
	it('should produce form search', app.use('/formSearch', require('./controllers/formSearch')){
		should.equal(app.use(),'./controllers/formSearch');
	});
});
describe('purchseForm', app.use('/purchaseForm', require('./controllers/purchaseForm')){
	it('should produce purchaseForm', app.use('/purchaseForm', require('./controllers/purchaseForm')){
		should.equal(app.use(),'./controllers/purchaseForm');
	});
});
