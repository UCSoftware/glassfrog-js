var assert = require('assert'),
    should = require('should'),
 GlassFrog = require('../lib/glassfrog'),
    locals = require('./locals.js');

// Require that POST be run before.
var TEST_OBJECTS = require('./POST');

var gf = GlassFrog(locals.API_KEY);
describe('DELETE', function() {
  this.timeout(0);
  // These will be use to identify the records we are deleting.
  var testRoleID, testPersonID, testProjectID, testMetricID, testChecklistItemID;
  // Fetch test role ID created on the GlassFrog UI.
  it('Should fetch test role id', function(done) {
    gf.get().roles().all().spread(function (response, data) {
      data.roles.forEach(function (role) {
        if (role.name === TEST_OBJECTS.TEST_ROLE_NAME) {
          testRoleID = role.id;
        }
      });
      done();
    });
  });
  // Fetch test person ID created on the GlassFrog UI.
  it('Should fetch test person id', function(done) {
    gf.get().people().all().spread(function (response, data) {
      data.people.forEach(function (person) {
        if (person.name === TEST_OBJECTS.PERSON.name) {
          testPersonID = person.id;
        }
      });
      done();
    });
  });
  // Fetch test project ID created on the GlassFrog UI.
  it('Should fetch test project id', function(done) {
    gf.get().projects().all().spread(function (response, data) {
      data.projects.forEach(function (project) {
        if (project.description === TEST_OBJECTS.PROJECT.description) {
          testProjectID = project.id;
        }
      });
      done();
    });
  });
  // Fetch test metric ID created on the GlassFrog UI.
  it('Should fetch test metric id', function(done) {
    gf.get().metrics().all().spread(function (response, data) {
      data.metrics.forEach(function (metric) {
        if (metric.name === TEST_OBJECTS.METRIC.name) {
          testMetricID = metric.id;
        }
      });
      done();
    });
  });
  // Fetch test checklistItem ID created on the GlassFrog UI.
  it('Should fetch test checklist item id', function(done) {
    gf.get().checklistItems().all().spread(function (response, data) {
      data.checklist_items.forEach(function (checklistItem) {
        if (checklistItem.name === TEST_OBJECTS.CHECKLIST_ITEM.name) {
          testChecklistItemID = checklistItem.id;
        }
      });
      done();
    });
  });
  describe('people', function() {
    describe('withID', function() {
      it('Should return 204 No Content', function(done) {
        gf.delete().people().withID(testPersonID).spread(function (response, data) {
          if (response.headers.status === '204 No Content') {
            done();
          } else if (response.headers.status === '403 Forbidden') {
            done(new Error('Your API KEY must belong to an admin.'));
          } else {
            done(new Error('Not Ok. ' + response.headers.status));
          }
        }).catch(function (error) {
          if (error) throw error;
        });
      });
    });
  });
  describe('projects', function() {
    describe('withID', function() {
      it('Should return 204 No Content', function(done) {
        gf.delete().projects().withID(testProjectID).spread(function (response, data) {
          if (response.headers.status === '204 No Content') {
            done();
          } else if (response.headers.status === '403 Forbidden') {
            done(new Error('Your API KEY must belong to an admin.'));
          } else {
            done(new Error('Not Ok. ' + response.headers.status));
          }
        }).catch(function (error) {
          if (error) throw error;
        });
      });
    });
  });
  describe('metrics', function() {
    describe('withID', function() {
      it('Should return 204 No Content', function(done) {
        gf.delete().metrics().withID(testMetricID).spread(function (response, data) {
          if (response.headers.status === '204 No Content') {
            done();
          } else if (response.headers.status === '403 Forbidden') {
            done(new Error('Your API KEY must belong to an admin.'));
          } else {
            done(new Error('Not Ok. ' + response.headers.status));
          }
        }).catch(function (error) {
          if (error) throw error;
        });
      });
    });
  });
  describe('checklist items', function() {
    describe('withID', function() {
      it('Should return 204 No Content', function(done) {
        gf.delete().checklistItems().withID(testChecklistItemID).spread(function (response, data) {
          if (response.headers.status === '204 No Content') {
            done();
          } else if (response.headers.status === '403 Forbidden') {
            done(new Error('Your API KEY must belong to an admin.'));
          } else {
            done(new Error('Not Ok. ' + response.headers.status));
          }
        }).catch(function (error) {
          if (error) throw error;
        });
      });
    });
  });
});
