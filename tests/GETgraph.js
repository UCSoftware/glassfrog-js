var    assert = require('assert'),
		   should = require('should'),
    GlassFrog = require('../lib/glassfrog'),
       locals = require('./locals.js'),
            _ = require('underscore');

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


describe('get().graph().circleHierarchy()', function () {
	this.timeout(0);

	it('Should return a tree', function(done) {
		var p = gf.get(true).graph().circleHierarchy().then(function (tree) {
			var maxLevel = function(cur, depth) {
				var depth = typeof depth !== 'undefined' ? depth : 0;
				var children = cur.subCircles;

		    if (typeof children === 'undefined' ||
				    children.length === 0) {
					return depth;
				}

				return _.chain(cur.subCircles)
				  .map(function (child) { return maxLevel(child, depth + 1) })
					.max()
					.value();
			}

		  if (typeof root === "object" && root instanceof Array) {
				throw new Error("Did not expect Array")
			}

			if (maxLevel(tree) < 2) {
				throw new Error("Expected organization tree deeper than 1.");
			}
			
			done();
		}).catch(function (error) {
			if (error) throw error;
		});
	});
});
