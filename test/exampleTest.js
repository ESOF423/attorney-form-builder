var assert = require('assert');
var app = require('../src/app.js');


describe('ex test', function() {
    it('adds numbers', function () {
        var result = app.add(1, 1);
        assert.equal(result, 2);
    });
});
