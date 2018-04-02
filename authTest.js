const assert = require('chai');
const user = require('../auth').user;
const attorney = require('../auth').attorney;

const server = 'htpp://server.redstonelab.net:8080'

var badAttorney = user();
var goodAttorney = user();

describe('Authentication works correctly, user(){
	it('should authenticate',user(){
		assert.equals("ATHKLSDJFH");
	});

	it('should authenticate',attorney(){
		assert.equals("");
	});
});


