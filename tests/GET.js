var assert = require('assert'),
    should = require('should'),
 GlassFrog = require('../lib/glassfrog'),
    locals = require('./locals.js');

var DATE = '2000-05-19T07:31:23+00:00';

var randomID = Math.floor(Math.random() * 10000),
  role_names = ['secretary', 'rep link', 'rep_link', 'lead link', 'lead_link', 'facilitator'];

function testMethods(context, gf, timeout, cache) {
  context.timeout(timeout);
  describe('circles', function() {
    describe('withID', function() {
      it('Should return 200 OK or 404 Not Found', function(done) {
        gf.get(cache).circles().withID(randomID).spread(function (response, data) {
          if (response.headers.status === '200 OK' || response.headers.status === '404 Not Found') {
            done();
          } else {
            done(new Error('Not Ok. ' + response.headers.status));
          }
        }).catch(function (error) {
          if (error) throw error;
        });
      });
    });
    describe('all', function() {
      it('Should return 200 OK', function(done) {
        gf.get(cache).circles().all().spread(function (response, data) {
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
    describe('withID', function() {
      it('Should return 200 OK or 404 Not Found', function(done) {
        gf.get(cache).roles().withID(randomID).spread(function (response, data) {
          if (response.headers.status === '200 OK' || response.headers.status === '404 Not Found') {
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
          it('Should return 200 OK or 404 Not Found', function(done) {
            gf.get(cache).roles().within().circles().withID(randomID).spread(function (response, data) {
              if (response.headers.status === '200 OK' || response.headers.status === '404 Not Found') {
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
          it('Should return 200 OK or 404 Not Found', function(done) {
            gf.get(cache).roles().within().people().withID(randomID).spread(function (response, data) {
              if (response.headers.status === '200 OK' || response.headers.status === '404 Not Found') {
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
    describe('all', function() {
      it('Should return 200 OK', function(done) {
        gf.get(cache).roles().all().spread(function (response, data) {
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
      it('Should return 200 OK or 404 Not Found', function(done) {
        gf.get(cache).people().withID(randomID).spread(function (response, data) {
          if (response.headers.status === '200 OK' || response.headers.status === '404 Not Found') {
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
          it('Should return 200 OK or 404 Not Found', function(done) {
            gf.get(cache).people().within().circles().withID(randomID).spread(function (response, data) {
              if (response.headers.status === '200 OK' || response.headers.status === '404 Not Found') {
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
              it('Should return 200 OK or 404 Not Found', function(done) {
                gf.get(cache).people().within().roles().withName(name).spread(function (response, data) {
                  if (response.headers.status === '200 OK' || response.headers.status === '404 Not Found') {
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
    describe('all', function() {
      it('Should return 200 OK', function(done) {
        gf.get(cache).people().all().spread(function (response, data) {
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
  describe('projects', function() {
    describe('withID', function() {
      it('Should return 200 OK or 404 Not Found', function(done) {
        gf.get(cache).projects().withID(randomID).spread(function (response, data) {
          if (response.headers.status === '200 OK' || response.headers.status === '404 Not Found') {
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
          it('Should return 200 OK or 404 Not Found', function(done) {
            gf.get(cache).projects().within().circles().withID(randomID).spread(function (response, data) {
              if (response.headers.status === '200 OK' || response.headers.status === '404 Not Found') {
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
    describe('withID', function() {
      it('Should return 200 OK or 404 Not Found', function(done) {
        gf.get(cache).metrics().withID(randomID).spread(function (response, data) {
          if (response.headers.status === '200 OK' || response.headers.status === '404 Not Found') {
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
            it('Should return 200 OK or 404 Not Found', function(done) {
              gf.get(cache).metrics().within().circles().withID(randomID).withGlobals().spread(function (response, data) {
                if (response.headers.status === '200 OK' || response.headers.status === '404 Not Found') {
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
            it('Should return 200 OK or 404 Not Found', function(done) {
              gf.get(cache).metrics().within().circles().withID(randomID).withoutGlobals().spread(function (response, data) {
                if (response.headers.status === '200 OK' || response.headers.status === '404 Not Found') {
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
    describe('all', function() {
      it('Should return 200 OK', function(done) {
        gf.get(cache).projects().all().spread(function (response, data) {
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
    describe('withID', function() {
      it('Should return 200 OK or 404 Not Found', function(done) {
        gf.get(cache).checklistItems().withID(randomID).spread(function (response, data) {
          if (response.headers.status === '200 OK' || response.headers.status === '404 Not Found') {
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
            it('Should return 200 OK or 404 Not Found', function(done) {
              gf.get(cache).checklistItems().within().circles().withID(randomID).withGlobals().spread(function (response, data) {
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
            it('Should return 200 OK or 404 Not Found', function(done) {
              gf.get(cache).checklistItems().within().circles().withID(randomID).withoutGlobals().spread(function (response, data) {
                if (response.headers.status === '200 OK' || response.headers.status === '404 Not Found') {
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
    describe('all', function() {
      it('Should return 200 OK', function(done) {
        gf.get(cache).checklistItems().all().spread(function (response, data) {
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
    describe('withID', function() {
      it('Should return 200 OK or 404 Not Found', function(done) {
        gf.get(cache).actions().withID(randomID).spread(function (response, data) {
          if (response.headers.status === '200 OK' || response.headers.status === '404 Not Found') {
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
          it('Should return 200 OK or 404 Not Found', function(done) {
            gf.get(cache).actions().within().circles().withID(randomID).spread(function (response, data) {
              if (response.headers.status === '200 OK' || response.headers.status === '404 Not Found') {
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
          it('Should return 200 OK or 404 Not Found', function(done) {
            gf.get(cache).actions().within().people().withID(randomID).spread(function (response, data) {
              if (response.headers.status === '200 OK' || response.headers.status === '404 Not Found') {
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
    describe('all', function() {
      it('Should return 200 OK', function(done) {
        gf.get(cache).actions().all().spread(function (response, data) {
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
    describe('withID', function() {
      it('Should return 200 OK or 404 Not Found', function(done) {
        gf.get(cache).triggers().withID(randomID).spread(function (response, data) {
          if (response.headers.status === '200 OK' || response.headers.status === '404 Not Found') {
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
          it('Should return 200 OK or 404 Not Found', function(done) {
            gf.get(cache).triggers().within().circles().withID(randomID).spread(function (response, data) {
              if (response.headers.status === '200 OK' || response.headers.status === '404 Not Found') {
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
          it('Should return 200 OK or 404 Not Found', function(done) {
            gf.get(cache).triggers().within().people().withID(randomID).spread(function (response, data) {
              if (response.headers.status === '200 OK' || response.headers.status === '404 Not Found') {
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
    describe('all', function() {
      it('Should return 200 OK', function(done) {
        gf.get(cache).triggers().all().spread(function (response, data) {
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
    var gf = GlassFrog(locals.API_KEY, true)
    describe('Build the Cache', function () {
      testMethods(this, gf, 0, true);
    });
    describe('Poll the Cache', function () {
      testMethods(this, gf, 500, true);
    });
  });
});