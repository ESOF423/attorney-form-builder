const assert = require('chai').assert;
const index = require('index');

describe('Index', function(){
	it('index should return an index', function(){
		assert.equal(index(),'output');
	});
});
