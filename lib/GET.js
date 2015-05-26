var globalCache  = require('./cache.js'),
    graphMethods = require('./graph.js');

function sendRequest(context, cacheEnabled, useCache, suffix, cache, key) {
  if (cacheEnabled) {
    if (useCache) {
      cache[key] = cache[key] || context.sendGET(suffix);
    } else {
      cache[key] = context.sendGET(suffix);
    }

    return cache[key];
  } else {
    if (useCache) {
      throw new Error('cacheEnabled is not turned on!');
    } else {
      return context.sendGET(suffix);
    }
  }
}

// .get()
module.exports = function (context, cacheEnabled, useCache) {
  var cache = globalCache;
  return {
    circles: function() {
      return {
        // .get().circles().withID(id)
        withID: function(id) {
          return sendRequest(context, cacheEnabled, useCache, 'circles/' + id,
                             cache.circles.withID, id);
        },
        // .get().circles().all()
        all: function() {
          return sendRequest(context, cacheEnabled, useCache, 'circles',
                             cache.circles, 'all');
        }
      };
    },
    roles: function() {
      return {
        // .get().roles().withID(id)
        withID: function(id) {
          return sendRequest(context, cacheEnabled, useCache, 'roles/' + id,
                             cache.roles.withID, id);
        },
        // .get().roles().within()
        within: function() {
          return {
            // .get.roles().within().circles()
            circles: function() {
              return {
                // .get().roles().within().circles().withID(id)
                withID: function(id) {
                  return sendRequest(context, cacheEnabled, useCache, 'circles/' + id + '/roles',
                                     cache.roles.within.circles.withID, id);
                }
              };
            },
            // .get().roles().within().people()
            people: function() {
              return {
                // .get().roles().within().people().withID(id)
                withID: function(id) {
                  return sendRequest(context, cacheEnabled, useCache, 'roles?person_id=' + id,
                                     cache.roles.within.people.withID, id);
                }
              }
            }
          }
        },
        // .get().roles().all()
        all: function() {
          return sendRequest(context, cacheEnabled, useCache, 'roles',
                             cache.roles, 'all');
        }
      };
    },
    people: function() {
      return {
        // .get().people().withID(id)
        withID: function(id) {
          return sendRequest(context, cacheEnabled, useCache, 'people/' + id,
                             cache.people.withID, id);
        },
        // .get().people().within()
        within: function() {
          return {
            circles: function() {
              return {
                // .get().people().within().circles().withID(id)
                withID: function(id) {
                  return sendRequest(context, cacheEnabled, useCache, 'circles/' + id + '/people',
                                     cache.people.within.circles.withID, id);
                }
              };
            },
            // .get().people().within().roles()
            roles: function() {
              return {
                // .get().people().within().roles().withName(name)
                withName: function(name) {
                  if (typeof name === 'string') {
                    switch(name.toLowerCase()) {
                      // .get().people().within().roles().withName('secretary')
                      case 'secretary':
                        return sendRequest(context, cacheEnabled, useCache, 'people?role=secretary',
                                           cache.people.within.roles.withName, 'secretary');
                        break;
                      // .get().people().within().roles().withName('rep_link')
                      case 'rep_link':
                      // .get().people().within().roles().withName('rep link')
                      case 'rep link':
                        return sendRequest(context, cacheEnabled, useCache, 'people?role=rep_link',
                                           cache.people.within.roles.withName, 'rep_link');
                        break;
                      // .get().people().within().roles().withName('lead_link')
                      case 'lead_link':
                      // .get().people().within().roles().withName('lead link')
                      case 'lead link':
                        return sendRequest(context, cacheEnabled, useCache, 'people?role=lead_link',
                                           cache.people.within.roles.withName, 'lead_link');
                        break;
                      // .get().people().within().roles().withName('facilitator')
                      case 'facilitator':
                        return sendRequest(context, cacheEnabled, useCache, 'people?role=facilitator',
                                           cache.people.within.roles.withName, 'facilitator');
                        break;
                      default:
                        throw new Error("Invalid argument.");
                    }
                  } else {
                    throw new TypeError("Argument must be a string.");
                  }
                }
              };
            }
          };
        },
        // .get().people().all()
        all: function() {
          return sendRequest(context, cacheEnabled, useCache, 'people',
                             cache.people, 'all');
        }
      };
    },
    projects: function() {
      return {
        // .get().projects().withID(id)
        withID: function(id) {
          return sendRequest(context, cacheEnabled, useCache, 'projects/' + id,
                             cache.projects.withID, id);
        },
        // .get().projects().within()
        within: function() {
          return {
            // .get().projects().within().circles()
            circles: function() {
              return {
                // .get().projects().within().circles().withID(id)
                withID: function(id) {
                  return sendRequest(context, cacheEnabled, useCache, 'projects?circle_id=' + id,
                                     cache.projects.within.circles.withID, id);
                }
              };
            }
          };
        },
        // .get().projects().all()
        all: function() {
          return sendRequest(context, cacheEnabled, useCache, 'projects',
                             cache.projects, 'all');
        }
      };
    },
    metrics: function() {
      return {
        // .get().metrics().withID(id)
        withID: function(id) {
          return sendRequest(context, cacheEnabled, useCache, 'metrics/' + id,
                             cache.metrics.withID, id);
        },
        // .get().metrics().within()
        within: function() {
          return {
            // .get().metrics().within().circles()
            circles: function() {
              return {
                // .get().metrics().within().circles().withID(id)
                withID: function(id) {
                  return {
                    // .get().metrics().within().circles().withID(id).withGlobals()
                    withGlobals: function() {
                      return sendRequest(context, cacheEnabled, useCache, 'circles/' + id + '/metrics',
                                         cache.metrics.within.circles.withGlobals.withID, id);
                    },
                    // .get().metrics().within().circles().withID(id).withoutGlobals()
                    withoutGlobals: function() {
                      return sendRequest(context, cacheEnabled, useCache, 'metrics?circle_id=' + id + '&global=false',
                                         cache.metrics.within.circles.withoutGlobals.withID, id);
                    }
                  }
                }
              };
            }
          };
        },
        // .get().metrics().globals()
        globals: function() {
          return sendRequest(context, cacheEnabled, useCache, 'metrics?global=true',
                             cache.metrics, 'globals');
        },
        // .get().metrics().all()
        all: function() {
          return sendRequest(context, cacheEnabled, useCache, 'metrics?global=false',
                             cache.metrics, 'all');
        }
      };
    },
    checklistItems: function() {
      return {
        // .get().checklistItems().withID(id)
        withID: function(id) {
          return sendRequest(context, cacheEnabled, useCache, 'checklist_items/' + id,
                             cache.checklistItems.withID, id);
        },
        // .get().checklistItems().within()
        within: function() {
          return {
            // .get().checklistItems().within().circles()
            circles: function() {
              return {
                // .get().checklistItems().within().circles().withID(id)
                withID: function(id) {
                  return {
                    // .get().checklistItems().within().circles().withID(id).withGlobals()
                    withGlobals: function() {
                      return sendRequest(context, cacheEnabled, useCache, 'checklist_items?circle_id=' + id,
                                         cache.checklistItems.within.circles.withGlobals.withID, id);
                    },
                    // .get().checklistItems().within().circles().withID(id).withoutGlobals()
                    withoutGlobals: function() {
                      return sendRequest(context, cacheEnabled, useCache, 'checklist_items?circle_id=' + id + '&global=false',
                                         cache.checklistItems.within.circles.withoutGlobals.withID, id);
                    }
                  }
                }
              };
            }
          };
        },
        // .get().checklistItems().globals()
        globals: function() {
          return sendRequest(context, cacheEnabled, useCache, 'checklist_items?global=true',
                             cache.checklistItems, 'globals');
        },
        // .get().checklistItems().all()
        all: function() {
          return sendRequest(context, cacheEnabled, useCache, 'checklist_items',
                             cache.checklistItems, 'all');
        }
      };
    },
    // .get().actions()
    actions: function() {
      return {
        // .get().actions().withID(id)
        withID: function(id) {
          return sendRequest(context, cacheEnabled, useCache, 'actions/' + id,
                             cache.actions.withID, id);
        },
        // .get().actions().within()
        within: function() {
          return {
            // .get().actions().within().circles()
            circles: function() {
              return {
                // .get().actions().within().circles().withID(id)
                withID: function(id) {
                  return sendRequest(context, cacheEnabled, useCache, 'actions?circle_id=' + id,
                                     cache.actions.within.circles.withID, id);
                }
              };
            },
            // .get().actions().within().people()
            people: function() {
              return {
                // .get().actions().within().people().withID(id)
                withID: function(id) {
                  return sendRequest(context, cacheEnabled, useCache, 'actions?person_id=' + id,
                                     cache.actions.within.people.withID, id);
                }
              };
            }
          };
        },
        // .get().actions().createdSince(date)
        createdSince: function(date) {
          return sendRequest(context, cacheEnabled, useCache, 'actions?created_since=' + date,
                             cache.actions.createdSince, date);
        },
        // .get().actions().all()
        all: function() {
          return sendRequest(context, cacheEnabled, useCache, 'actions',
                             cache.actions, 'all');
        }
      };
    },
    triggers: function() {
      return {
        // .get().triggers().withID(id)
        withID: function(id) {
          return sendRequest(context, cacheEnabled, useCache, 'triggers/' + id,
                             cache.triggers.withID, id);
        },
        // .get().triggers().within()
        within: function() {
          return {
            // .get().triggers().within().circles()
            circles: function() {
              return {
                // .get().triggers().within().circles().withID(id)
                withID: function(id) {
                  return sendRequest(context, cacheEnabled, useCache, 'triggers?circle_id=' + id,
                                     cache.triggers.within.circles.withID, id);
                }
              };
            },
            // .get().triggers().within().people()
            people: function() {
              return {
                // .get().triggers().within().people().withID(id)
                withID: function(id) {
                  return sendRequest(context, cacheEnabled, useCache, 'triggers?person_id=' + id,
                                     cache.triggers.within.people.withID, id);
                }
              };
            }
          };
        },
        // .get().triggers().createdSince(date)
        createdSince: function(date) {
          return sendRequest(context, cacheEnabled, useCache, 'triggers?created_since=' + date,
                             cache.triggers.createdSince, date);
        },
        // .get().triggers().all()
        all: function() {
          return sendRequest(context, cacheEnabled, useCache, 'triggers',
                             cache.triggers, 'all');
        }
      };
    },
    graph: function() { return graphMethods(this); }
  };
}
