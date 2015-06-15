var assert = require('assert'),
    should = require('should'),
 GlassFrog = require('../lib/glassfrog'),
    locals = require('./locals.js');

var DATE = '2000-05-19T07:31:23+00:00';

var role_names = ['secretary', 'rep link', 'rep_link', 'lead link', 'lead_link', 'facilitator'];

var circleID, roleID, personID, projectID, metricID, checklistItemID, actionID, triggerID;

var metrics, checklistItems, actions, triggers;

function testMethods(context, gf, timeout, cache) {
  context.timeout(timeout);
  describe('circles', function() {
    describe('all', function() {
      it('Should return 200 OK', function(done) {
        gf.get(cache).circles().all().spread(function (response, data) {
          if (response.headers.status === '200 OK') {
            circleID = data.circles[0].id;
            done();
          } else {
            done(new Error('Not Ok. ' + response.headers.status));
          }
        }).catch(function (error) {
          if (error) throw error;
        });
      });
    });
    describe('withID', function() {
      it('Should return 200 OK', function(done) {
        gf.get(cache).circles().withID(circleID).spread(function (response, data) {
          if (response.headers.status === '200 OK') {
            done();
          } else {
            done(new Error('Not Ok. ' + response.headers.status));
          }
        }).catch(function (error) {
          if (error) throw error;
        });
      });
    });
  });
  describe('people', function() {
    describe('all', function() {
      it('Should return 200 OK', function(done) {
        gf.get(cache).people().all().spread(function (response, data) {
          if (response.headers.status === '200 OK') {
            personID = data.people[0].id;
            done();
          } else {
            done(new Error('Not Ok. ' + response.headers.status));
          }
        }).catch(function (error) {
          if (error) throw error;
        });
      });
    });
    describe('withID', function() {
      it('Should return 200 OK', function(done) {
        gf.get(cache).people().withID(personID).spread(function (response, data) {
          if (response.headers.status === '200 OK') {
            done();
          } else {
            done(new Error('Not Ok. ' + response.headers.status));
          }
        }).catch(function (error) {
          if (error) throw error;
        });
      });
    });
    describe('within', function() {
      describe('circles', function() {
        describe('withID', function() {
          it('Should return 200 OK', function(done) {
            gf.get(cache).people().within().circles().withID(circleID).spread(function (response, data) {
              if (response.headers.status === '200 OK') {
                done();
              } else {
                done(new Error('Not Ok. ' + response.headers.status));
              }
            }).catch(function (error) {
              if (error) throw error;
            });
          });
        });
      });
      describe('roles', function() {
        describe('withName', function() {
          role_names.forEach(function (name) {
            describe(name, function () {
              it('Should return 200 OK', function(done) {
                gf.get(cache).people().within().roles().withName(name).spread(function (response, data) {
                  if (response.headers.status === '200 OK') {
                    done();
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
      });
    });
  });
  describe('roles', function() {
    describe('all', function() {
      it('Should return 200 OK', function(done) {
        gf.get(cache).roles().all().spread(function (response, data) {
          if (response.headers.status === '200 OK') {
            roleID = data.roles[0].id;
            done();
          } else {
            done(new Error('Not Ok. ' + response.headers.status));
          }
        }).catch(function (error) {
          if (error) throw error;
        });
      });
    });
    describe('withID', function() {
      it('Should return 200 OK', function(done) {
        gf.get(cache).roles().withID(roleID).spread(function (response, data) {
          if (response.headers.status === '200 OK') {
            done();
          } else {
            done(new Error('Not Ok. ' + response.headers.status));
          }
        }).catch(function (error) {
          if (error) throw error;
        });
      });
    });
    describe('within', function() {
      describe('circles', function() {
        describe('withID', function() {
          it('Should return 200 OK', function(done) {
            gf.get(cache).roles().within().circles().withID(circleID).spread(function (response, data) {
              if (response.headers.status === '200 OK') {
                done();
              } else {
                done(new Error('Not Ok. ' + response.headers.status));
              }
            }).catch(function (error) {
              if (error) throw error;
            });
          });
        });
      });
      describe('people', function() {
        describe('withID', function() {
          it('Should return 200 OK', function(done) {
            gf.get(cache).roles().within().people().withID(personID).spread(function (response, data) {
              if (response.headers.status === '200 OK') {
                done();
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
  });
  describe('projects', function() {
    describe('all', function() {
      it('Should return 200 OK', function(done) {
        gf.get(cache).projects().all().spread(function (response, data) {
          if (response.headers.status === '200 OK') {
            projectID = data.projects[0].id;
            done();
          } else {
            done(new Error('Not Ok. ' + response.headers.status));
          }
        }).catch(function (error) {
          if (error) throw error;
        });
      });
    });
    describe('withID', function() {
      it('Should return 200 OK', function(done) {
        gf.get(cache).projects().withID(projectID).spread(function (response, data) {
          if (response.headers.status === '200 OK') {
            done();
          } else {
            done(new Error('Not Ok. ' + response.headers.status));
          }
        }).catch(function (error) {
          if (error) throw error;
        });
      });
    });
    describe('within', function() {
      describe('circles', function() {
        describe('withID', function() {
          it('Should return 200 OK', function(done) {
            gf.get(cache).projects().within().circles().withID(circleID).spread(function (response, data) {
              if (response.headers.status === '200 OK') {
                done();
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
  });
  describe('metrics', function() {
    describe('all', function() {
      it('Should return 200 OK', function(done) {
        gf.get(cache).metrics().all().spread(function (response, data) {
          if (response.headers.status === '200 OK') {
            metricID = data.metrics[0].id;
            metrics = data.metrics;
            done();
          } else {
            done(new Error('Not Ok. ' + response.headers.status));
          }
        }).catch(function (error) {
          if (error) throw error;
        });
      });
    });
    describe('withID', function() {
      it('Should return 200 OK', function(done) {
        gf.get(cache).metrics().withID(metricID).spread(function (response, data) {
          if (response.headers.status === '200 OK') {
            done();
          } else {
            done(new Error('Not Ok. ' + response.headers.status));
          }
        }).catch(function (error) {
          if (error) throw error;
        });
      });
    });
    describe('within', function() {
      describe('circles', function() {
        describe('withID', function() {
          describe('withGlobals', function() {
            it('Should return 200 OK', function(done) {
              gf.get(cache).metrics().within().circles().withID(circleID).withGlobals().spread(function (response, data) {
                if (response.headers.status === '200 OK') {
                  done();
                } else {
                  done(new Error('Not Ok. ' + response.headers.status));
                }
              }).catch(function (error) {
                if (error) throw error;
              });
            });
          });
          describe('withoutGlobals', function() {
            it('Should return 200 OK', function(done) {
              gf.get(cache).metrics().within().circles().withID(circleID).withoutGlobals().spread(function (response, data) {
                if (response.headers.status === '200 OK') {
                  done();
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
    });
    describe('globals', function() {
      it('Should return 200 OK', function(done) {
        gf.get(cache).metrics().globals().spread(function (response, data) {
          if (response.headers.status === '200 OK') {
            done();
          } else {
            done(new Error('Not Ok. ' + response.headers.status));
          }
        }).catch(function (error) {
          if (error) throw error;
        });
      });
    });
  });
  describe('checklistItems', function() {
    describe('all', function() {
      it('Should return 200 OK', function(done) {
        gf.get(cache).checklistItems().all().spread(function (response, data) {
          if (response.headers.status === '200 OK') {
            checklistItemID = data.checklist_items[0].id;
            done();
          } else {
            done(new Error('Not Ok. ' + response.headers.status));
          }
        }).catch(function (error) {
          if (error) throw error;
        });
      });
    });
    describe('withID', function() {
      it('Should return 200 OK', function(done) {
        gf.get(cache).checklistItems().withID(checklistItemID).spread(function (response, data) {
          if (response.headers.status === '200 OK') {
            done();
          } else {
            done(new Error('Not Ok. ' + response.headers.status));
          }
        }).catch(function (error) {
          if (error) throw error;
        });
      });
    });
    describe('within', function() {
      describe('circles', function() {
        describe('withID', function() {
          describe('withGlobals', function() {
            it('Should return 200 OK', function(done) {
              gf.get(cache).checklistItems().within().circles().withID(circleID).withGlobals().spread(function (response, data) {
                if (response.headers.status === '200 OK' ||
                  response.headers.status === '404 Not Found') {
                  done();
                } else {
                  done(new Error('Not Ok. ' + response.headers.status));
                }
              }).catch(function (error) {
                if (error) throw error;
              });
            });
          });
          describe('withoutGlobals', function() {
            it('Should return 200 OK', function(done) {
              gf.get(cache).checklistItems().within().circles().withID(circleID).withoutGlobals().spread(function (response, data) {
                if (response.headers.status === '200 OK') {
                  done();
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
    });
    describe('globals', function() {
      it('Should return 200 OK', function(done) {
        gf.get(cache).checklistItems().globals().spread(function (response, data) {
          if (response.headers.status === '200 OK') {
            done();
          } else {
            done(new Error('Not Ok. ' + response.headers.status));
          }
        }).catch(function (error) {
          if (error) throw error;
        });
      });
    });
  });
  describe('actions', function() {
    describe('all', function() {
      it('Should return 200 OK', function(done) {
        gf.get(cache).actions().all().spread(function (response, data) {
          if (response.headers.status === '200 OK') {
            actionID = data.actions[0].id;
            done();
          } else {
            done(new Error('Not Ok. ' + response.headers.status));
          }
        }).catch(function (error) {
          if (error) throw error;
        });
      });
    });
    describe('withID', function() {
      it('Should return 200 OK', function(done) {
        gf.get(cache).actions().withID(actionID).spread(function (response, data) {
          if (response.headers.status === '200 OK') {
            done();
          } else {
            done(new Error('Not Ok. ' + response.headers.status));
          }
        }).catch(function (error) {
          if (error) throw error;
        });
      });
    });
    describe('within', function() {
      describe('circles', function() {
        describe('withID', function() {
          it('Should return 200 OK', function(done) {
            gf.get(cache).actions().within().circles().withID(circleID).spread(function (response, data) {
              if (response.headers.status === '200 OK') {
                done();
              } else {
                done(new Error('Not Ok. ' + response.headers.status));
              }
            }).catch(function (error) {
              if (error) throw error;
            });
          });
        });
      });
      describe('people', function() {
        describe('withID', function() {
          it('Should return 200 OK', function(done) {
            gf.get(cache).actions().within().people().withID(personID).spread(function (response, data) {
              if (response.headers.status === '200 OK') {
                done();
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
    describe('createdSince', function() {
      it('Should return 200 OK', function(done) {
        gf.get(cache).actions().createdSince(DATE).spread(function (response, data) {
          if (response.headers.status === '200 OK') {
            done();
          } else {
            done(new Error('Not Ok. ' + response.headers.status));
          }
        }).catch(function (error) {
          if (error) throw error;
        });
      });
    });
  });
  describe('triggers', function() {
    describe('all', function() {
      it('Should return 200 OK', function(done) {
        gf.get(cache).triggers().all().spread(function (response, data) {
          if (response.headers.status === '200 OK') {
            triggerID = data.triggers[0].id;
            done();
          } else {
            done(new Error('Not Ok. ' + response.headers.status));
          }
        }).catch(function (error) {
          if (error) throw error;
        });
      });
    });
    describe('withID', function() {
      it('Should return 200 OK', function(done) {
        gf.get(cache).triggers().withID(triggerID).spread(function (response, data) {
          if (response.headers.status === '200 OK') {
            done();
          } else {
            done(new Error('Not Ok. ' + response.headers.status));
          }
        }).catch(function (error) {
          if (error) throw error;
        });
      });
    });
    describe('within', function() {
      describe('circles', function() {
        describe('withID', function() {
          it('Should return 200 OK', function(done) {
            gf.get(cache).triggers().within().circles().withID(circleID).spread(function (response, data) {
              if (response.headers.status === '200 OK') {
                done();
              } else {
                done(new Error('Not Ok. ' + response.headers.status));
              }
            }).catch(function (error) {
              if (error) throw error;
            });
          });
        });
      });
      describe('people', function() {
        describe('withID', function() {
          it('Should return 200 OK', function(done) {
            gf.get(cache).triggers().within().people().withID(personID).spread(function (response, data) {
              if (response.headers.status === '200 OK') {
                done();
              } else {
                done( new Error('(Not Ok. ' + response.headers.status));
              }
            }).catch(function (error) {
              if (error) throw error;
            });
          });
        });
      });
    });
    describe('createdSince', function() {
      it('Should return 200 OK', function(done) {
        gf.get(cache).triggers().createdSince(DATE).spread(function (response, data) {
          if (response.headers.status === '200 OK') {
            done();
          } else {
            done(new Error('Not Ok. ' + response.headers.status));
          }
        }).catch(function (error) {
          if (error) throw error;
        });
      });
    });
  });
}

describe("GET", function() {
  describe("Without Caching", function() {
    var gf = GlassFrog(locals.API_KEY);
    describe('Poll the API', function () {
      testMethods(this, gf, 0, false);
    });
    describe('Attempt to poll the cache', function () {
      this.timeout(0);
      describe('circles', function() {
        describe('all', function() {
          it('Should throw an error', function(done) {
            try {
              gf.get(true).circles().all().spread(function (response, data) {
                done(new Error('No Error ' + response.headers.status));
              }).catch(function (error) {
                if (error) done();
              });
            } catch(error) {
              done();
            }
          });
        });
      });
    });
  });
  describe("With Caching", function() {
    var gf = GlassFrog(locals.API_KEY, {
      caching: true
    });
    describe('Build the Cache', function () {
      testMethods(this, gf, 0, true);
    });
    describe('Poll the Cache', function () {
      testMethods(this, gf, 500, true);
    });
  });
  describe("With Persistence", function () {
    var gf = GlassFrog(locals.API_KEY, {
      caching: false,
      persistence: true
    });
    describe('Poll the API', function() {
      testMethods(this, gf, 0, false);
    });
  });
});