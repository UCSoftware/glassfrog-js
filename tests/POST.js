var assert = require('assert'),
    should = require('should'),
 GlassFrog = require('../lib/glassfrog'),
    locals = require('./locals.js');

// These will be the new objects created on GlassFrog.
var PERSON = {
      "name": "Test Person",
      "email": "test.person@quirkyinc.com"
    },
    PROJECT = {
      "description": "Test Project",
      "circle_id": null,
      "role_id": null
    },
    METRIC = {
      "description": "Test Metric",
      "frequency": "Weekly",
      "circle_id": null,
      "role_id": null
    },
    CHECKLIST_ITEM = {
      "description": "Test Checklist Item",
      "frequency": "Weekly",
      "circle_id": null,
      "role_id": null
    };

// Set these to the names of the circle and role created on the GlassFrog web UI.
var TEST_CIRCLE_NAME = 'API Sandbox',
      TEST_ROLE_NAME = 'Sandperson';

var randomID = Math.floor(Math.random() * 10000),
  role_names = ['secretary', 'rep link', 'rep_link', 'lead link', 'lead_link', 'facilitator'];

var gf = GlassFrog(locals.API_KEY);
describe('POST', function() {
  this.timeout(0);
  // These will be used as fields for the objects we are creating.
  var testCircleID, testRoleID,
  // Currently unused, will be fetched when the person is created if needed.
      testPersonID;
  // Fetch test circle ID created on the GlassFrog UI.
  it('Should fetch test circle', function(done) {
    gf.get().circles().all().spread(function (response, data) {
      data.circles.forEach(function (circle) {
        if (circle.name === TEST_CIRCLE_NAME) {
          testCircleID = circle.id;
        }
      });
      done();
    });
  });
  // Fetch test role ID created on the GlassFrog UI.
  it('Should fetch test role', function(done) {
    gf.get().roles().all().spread(function (response, data) {
      data.roles.forEach(function (role) {
        if (role.name === TEST_ROLE_NAME) {
          testRoleID = role.id;
        }
      });
      done();
    });
  });
  describe('people', function() {
    it('Should return 200 OK and the object', function(done) {
      gf.post().people(PERSON).spread(function (response, data) {
        if (response.headers.status === '200 OK') {
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
  describe('projects', function() {
    it('Should return 200 OK and the object', function(done) {
      if (testRoleID && testCircleID) {
        PROJECT.circle_id = testCircleID,
        PROJECT.role_id = testRoleID;
        gf.post().projects(PROJECT).spread(function (response, data) {
          if (response.headers.status === '200 OK') {
            done();
          } else if (response.headers.status === '403 Forbidden') {
            done(new Error('Your API KEY must belong to an admin.'));
          } else {
            done(new Error('Not Ok. ' + response.headers.status));
          }
        }).catch(function (error) {
          if (error) throw error;
        });
      } else {
        throw new Error("Test Person or Test Circle not found.");
      }
    });
  });
  describe('metrics', function() {
    it('Should return 200 OK and the object', function(done) {
      if (testRoleID && testCircleID) {
        METRIC.circle_id = testCircleID,
        METRIC.role_id = testRoleID;
        gf.post().metrics(METRIC).spread(function (response, data) {
          if (response.headers.status === '200 OK') {
            done();
          } else if (response.headers.status === '403 Forbidden') {
            done(new Error('Your API KEY must belong to an admin.'));
          } else {
            done(new Error('Not Ok. ' + response.headers.status));
          }
        }).catch(function (error) {
          if (error) throw error;
        });
      } else {
        throw new Error("Test Person or Test Circle not found.");
      }
    });
  });
  describe('checklist', function() {
    it('Should return 200 OK and the object', function(done) {
      if (testRoleID && testCircleID) {
        CHECKLIST_ITEM.circle_id = testCircleID,
        CHECKLIST_ITEM.role_id = testRoleID;
        gf.post().checklistItems(CHECKLIST_ITEM).spread(function (response, data) {
          if (response.headers.status === '200 OK') {
            done();
          } else if (response.headers.status === '403 Forbidden') {
            done(new Error('Your API KEY must belong to an admin.'));
          } else {
            done(new Error('Not Ok. ' + response.headers.status));
          }
        }).catch(function (error) {
          if (error) throw error;
        });
      } else {
        throw new Error("Test Person or Test Circle not found.");
      }
    });
  });
});
