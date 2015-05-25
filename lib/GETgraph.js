
var _ = require('underscore');

// .get().graph()
module.exports = function (get) {
	return {
		// Get the circle that contains all other circles in an organization:
		rootCircle: function() {
			return get.roles().all().spread(function (res, data) {
			  return data.roles
			}).then(function (roles) {
				return get.circles().all().spread(function (res, data) {
					return data.circles;
				}).then(function (circles) {
					// Find root circle of organization:
			    var root = _.chain(circles)
			    // Get all circle's supported_role's
			      .map(function (c) { return c.links })
			      .map(function (l) { return l.supported_role })
			      // Get the details for these roles:
			      .map(function (r) { return _.findWhere(roles, { id: r }) })
			      .map(function (l) { return l.links })
			      // Filter to the role that has no super-circle:
						// TODO: did I mean where?
			      .filter({ circle: null })
			      // Return the circle to which this role belongs:
			      .map(function (s) {
			        return _.findWhere(circles, {id: s.supporting_circle })})
			      .first().value();

			      return root;
				});
			});
		},
		// Return a nested hierarchy of circles for an organization:
		circleHierarchy: function() {
			var that = this;

			// Return a subset of fields from the circles API:
      var fieldFilter = function(circle) {
				return _.pick(circle, 'id', 'name', 'short_name', 'subCircles')
			}

			// These calls can be much faster if they are cached:
			return get.roles().all().spread(function (res, data) {
			  return data.roles
			}).then(function (roles) {
				return get.circles().all().spread(function (res, data) {
					return data.circles;
				}).then(function (circles) {
					return that.rootCircle().then(function (root) {
						var hierarchy = fieldFilter(root);

						// Breadth-first search to find sub-circles:
						bfsSubcircles = function (curCircle, curRoleIds) {
							if (!curRoleIds) {
								return [ ];
							}

							// Find all sub-circles:
							var subCircles = _.chain(curRoleIds)
								// Lookup roles curCircle:
							  .map(function (r) { return _.findWhere(roles, {id: r }) })
								// Filter to roles that expand to sub-circles from this circle:
								.filter(function (r) {
								  return (r.links.circle === curCircle.id &&
									        r.links.supporting_circle !== null)})
								// Lookup these sub-circles:
								.map(function (r) {
									return _.findWhere(circles, {id: r.links.supporting_circle })
								})
								// End chain:
								.value();

							// Create new object references:
							curCircle['subCircles'] = _.clone(subCircles);

							// Continue, breadth-first (updates by reference side-effect):
							_.each(curCircle['subCircles'], function (c) {
								return bfsSubcircles(c, c.links.roles);
							});

							// Filter to only fields we care about returning:
							curCircle['subCircles'] = _.map(curCircle['subCircles'],
							  function (c) { return fieldFilter(c); });

							return curCircle;
						}

						// Start breadth-first search at root node:
						return bfsSubcircles(hierarchy, root.links.roles);
					});
				});
			});
		}
	};
}
