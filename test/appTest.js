

const assert = require('chai').assert;
const error = require('../app').error;
const index = require('../controllers/index')

const server = 'http://server.redstonelab.net:8080'


describe('App connected', function(){
	it('should return nothing', function(){
		assert.equal(error(),"");
	});

	it('should return listening', function(){
		assert.equal(listen(),"Listening on port 8080...");
	});

	it('should be a 
	
});

