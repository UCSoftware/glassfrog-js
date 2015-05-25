var    assert = require('assert'),
		   should = require('should'),
    GlassFrog = require('../lib/glassfrog'),
       locals = require('./locals.js');

var gf = GlassFrog(locals.API_KEY, true);

describe('get().graph().rootCircle()', function () {
	this.timeout(0);
	it('Should return a single object', function(done) {
		var p = gf.get(true).graph().rootCircle().then(function (root) {
		  if (typeof root === "object" && root instanceof Array)
			{
				throw new Error("Expected single circle (not Array)")
			}
			done();
		}).catch(function (error) {
			if (error) throw error;
		});
	});
});
