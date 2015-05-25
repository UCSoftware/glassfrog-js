
var _ = require('underscore');

// .get().graph()
module.exports = function (context) {
	return {
		rootCircle: function() {
			return context.roles().all().spread(function (res, data) {
			  return data.roles
			}).then(function (roles) {
				return context.circles().all().spread(function (res, data) {
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
			      .filter({ circle: null })
			      // Return the circle to which this role belongs:
			      .map(function (s) {
			        return _.findWhere(circles, {id: s.supporting_circle })})
			      .first().value();

			      return root;
				});
			});
		}
	};
}
