
var gf = require('./glassfrog.js')('x'); // set your key here!
var _ = require('underscore');

var getRoot = gf.get().roles().all(true).then().spread(function (res, body) {
    return JSON.parse(body).roles
}).then(function (roles) {
    return gf.get().circles().all().then().spread(function (res, body) {
        return JSON.parse(body).circles
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
}).catch(console.log.bind(console));

getRoot.then(function (root) {
   console.log(root);
});

gf.get().roles().all(true).then().spread(function (res, body) {
        // use all cache:
        return JSON.parse(body).roles;
});
