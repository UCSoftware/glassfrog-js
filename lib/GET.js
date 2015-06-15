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
    if (useCache) throw new Error('cacheEnabled is not turned on!');

    return context.sendGET(suffix);
  }
}

function findID(id, type, response, data) {
    if (response.headers.status === "200 OK") {
        var items = data[type].filter(function (i) {
            return i.id === id;
        });
        if (items.length > 0) response.headers.status === "404 Not Found";
        return [response, items];
    } else {
        return [response, data];
    }
}

/**
  * Retrieve information from the GlassFrog API.
  *
  * For examples and more documentation read:
  * [GET Documentation]{@tutorial GET}
  *
  * @class get
  */
module.exports = function (context, cacheEnabled, useCache) {
  var cache = globalCache;

  return {
    /**
     * get().circles(): get information on circles
     * @memberof get
     * @instance
     * @class circles
     */
    circles: function() {
      return {
        /**
         * get().circles().withID(): get a circle by its circle id.
         * @memberof get#circles
         * @instance
         * @param {string} id circle id
         * @returns {Promise}
         */
        withID: function(id) {
          return sendRequest(context, cacheEnabled, useCache, 'circles/' + id,
                             cache.circles.withID, id);
        },
        /**
         * get().circles().all(): fetch a list of all circles.
         * @memberof get#circles
         * @instance
         * @returns {Promise}
         */
        all: function() {
          return sendRequest(context, cacheEnabled, useCache, 'circles',
                             cache.circles, 'all');
        }
      };
    },
    /**
     * get().roles(): get information about roles.
     * @memberof get
     * @instance
     * @class roles
     */
    roles: function() {
      return {
        /**
         * get().roles().withID(): fetch a role by its id
         * @memberof get#roles
         * @instance
         * @param {string} id role id
         * @returns {Promise}
         */
        withID: function(id) {
          return sendRequest(context, cacheEnabled, useCache, 'roles/' + id,
                             cache.roles.withID, id);
        },
        /**
         * get().roles().within(): get roles within a subsequent scope.
         * @memberof get#roles
         * @instance
         * @class within
         */
        within: function() {
          return {
            /**
             * get().roles().within().circles():
             *   get roles within a circle's scope.
             *
             *   @see {@link get#roles#within#circles#withID}.
             *
             * @memberof get#roles#within
             * @instance
             * @class circles
             */
            circles: function() {
              return {
                /**
                 * get().roles().within().circles().withID(id):
                 *  get roles within a circle's scope by circle id.
                 * @memberof get#roles#within#circles
                 * @instance
                 * @param {string} id circle id
                 * @returns {Promise}
                 */
                withID: function(id) {
                  return sendRequest(context, cacheEnabled, useCache, 'circles/' + id + '/roles',
                                     cache.roles.within.circles.withID, id);
                }
              };
            },
            /**
             * get().roles().within().people():
             *   get roles within a persons's scope.
             * @memberof get#roles#within
             * @instance
             * @class people
             */
            people: function() {
              return {
                /**
                 * get().roles().within().people().withID(id):
                 *  get roles within a person's scope by id.
                 *
                 *  That is to say, find which roles belong to a given
                 *  person.
                 *
                 * @memberof get#roles#within#people
                 * @instance
                 * @param {string} id person id
                 * @returns {Promise}
                 */
                withID: function(id) {
                  return sendRequest(context, cacheEnabled, useCache, 'roles?person_id=' + id,
                                     cache.roles.within.people.withID, id);
                }
              }
            }
          }
        },
        /**
         * get().roles().all(): fetch a list of all roles.
         * @memberof get#roles
         * @instance
         * @returns {Promise}
         */
        all: function() {
          return sendRequest(context, cacheEnabled, useCache, 'roles',
                             cache.roles, 'all');
        }
      };
    },
    /**
     * get().people(): get information about people (individual users).
     * @memberof get
     * @instance
     * @class people
     */
    people: function() {
      return {
        /**
         * get().people().withID(): get a person by its id.
         * @memberof get#people
         * @instance
         * @param {string} id people id
         * @returns {Promise}
         */
        withID: function(id) {
          return sendRequest(context, cacheEnabled, useCache, 'people/' + id,
                             cache.people.withID, id);
        },
        /**
         * get().people().within(): get people within a subsequent scope.
         * @memberof get#people
         * @instance
         * @class within
         */
        within: function() {
          return {
            /**
             * get().people().within().circles():
             *   find which people belong to a circle's scope
             * @memberof get#people#within
             * @instance
             * @class circles
             */
            circles: function() {
              return {
                /**
                 * get().people().within().circles().withID(id):
                 *  get people within a circles's scope by circle id.
                 *
                 *  That is to say, find which people are a member of a
                 *  given circle.
                 *
                 * @memberof get#people#within#circle
                 * @instance
                 * @param {string} id circle id
                 * @returns {Promise}
                 */
                withID: function(id) {
                  return sendRequest(context, cacheEnabled, useCache, 'circles/' + id + '/people',
                                     cache.people.within.circles.withID, id);
                }
              };
            },
            /**
             * get().people().within().roles():
             *   find people who fill a particular role.
             * @memberof get#people#within
             * @instance
             * @class people
             */
            roles: function() {
              return {
                /**
                 * get().people().within().roles().withName(name):
                 *  get the people who fill a role by a role's name.
                 *
                 *  The role's must be one of the core Holacracy roles,
                 *  e.g. "secretary", "rep link", "lead link", or
                 *  "facilitator".
                 *
                 * @memberof get#people#within#roles
                 * @instance
                 * @param {string} name role name
                 * @returns {Promise}
                 */
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
        /**
         * get().people().all(): fetch a list of all people.
         * @memberof get#people
         * @instance
         * @returns {Promise}
         */
        all: function() {
          return sendRequest(context, cacheEnabled, useCache, 'people',
                             cache.people, 'all');
        }
      };
    },
    /**
     * get().projects(): retrieve projects
     * @memberof get
     * @instance
     * @class projects
     */
    projects: function() {
      return {
        /**
         * get().projects().withID(): get a project by its id.
         * @memberof get#projects
         * @instance
         * @param {string} id project id
         * @returns {Promise}
         */
        withID: function(id) {
          return sendRequest(context, cacheEnabled, useCache, 'projects/' + id,
                             cache.projects.withID, id);
        },
        /**
         * get().projects().within(): get projects within a subsequent scope.
         * @memberof get#projects
         * @instance
         * @class within
         */
        within: function() {
          return {
            /**
             * get().projects().within().circles():
             *   get roles within a circle's scope.
             *
             *   @see {@link get#projects#within#circles#withID}.
             *
             * @memberof get#projects#within
             * @instance
             * @class circles
             */
            circles: function() {
              return {
                /**
                 * get().projects().within().circles().withID(id):
                 *  get projects within a circle's by circle id.
                 * @memberof get#projects#within#circles
                 * @instance
                 * @param {string} id circle id
                 * @returns {Promise}
                 */
                withID: function(id) {
                  return sendRequest(context, cacheEnabled, useCache, 'projects?circle_id=' + id,
                                     cache.projects.within.circles.withID, id);
                }
              };
            }
          };
        },
        /**
         * get().projects().all(): fetch a list of all projects.
         * @memberof get#projects
         * @instance
         * @returns {Promise}
         */
        all: function() {
          return sendRequest(context, cacheEnabled, useCache, 'projects',
                             cache.projects, 'all');
        }
      };
    },
    /**
     * get().metrics(): retrieve metrics
     * @memberof get
     * @instance
     * @class metrics
     */
    metrics: function() {
      return {
        /**
         * get().metrics().withID(): get a metric by its id.
         * @memberof get#metrics
         * @instance
         * @param {string} id metric id
         * @returns {Promise}
         */
        withID: function(id) {
          return sendRequest(context, cacheEnabled, useCache, 'metrics', cache.metrics.withID, id)
                             .spread(function (response, data) { return [id, 'metrics', response, data] })
                             .spread(findID);
        },
        /**
         * get().metrics().within(): get metrics within a subsequent scope.
         * @memberof get#metrics
         * @instance
         * @class within
         */
        within: function() {
          return {
            /**
             * get().metrics().within().circles():
             *   get metrics within a circle's scope.
             *
             *   @see {@link get#metrics#within#circles#withID#withGlobals}
             *   @see {@link get#metrics#within#circles#withID#withoutGlobals}
             *
             * @memberof get#metrics#within
             * @instance
             * @class circles
             */
            circles: function() {
              return {
                /**
                 * get().projects().within().circles().withID(id):
                 *  get metrics within a circle's by circle id.
                 *
                 *   @see {@link get#metrics#within#circles#withID#withGlobals}
                 *   @see {@link get#metrics#within#circles#withID#withoutGlobals}
                 *
                 * @memberof get#metrics#within#circles
                 * @instance
                 * @param {string} id circle id
                 * @returns {Promise}
                 */
                withID: function(id) {
                  return {
                    /**
                     * get().metrics().within().circles().withID(id).withGlobals():
                     *  get metrics within a circle's by circle id, including
                     *  global metrics.
                     *
                     *
                     *   @see {@link get#metrics#within#circles#withID#withGlobals}
                     *   @see {@link get#metrics#within#circles#withID#withoutGlobals}
                     *
                     * @memberof get#metrics#within#circles#withID
                     * @instance
                     * @returns {Promise}
                     */
                    withGlobals: function() {
                      return sendRequest(context, cacheEnabled, useCache, 'circles/' + id + '/metrics',
                                         cache.metrics.within.circles.withGlobals.withID, id);
                    },
                    /**
                     * get().metrics().within().circles().withID(id).withoutGlobals():
                     *  get metrics within a circle's by circle id, without
                     *  global metrics.
                     *
                     * @memberof get#metrics#within#circles#withID
                     * @instance
                     * @returns {Promise}
                     */
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
        /**
         * get().metrics().globals(): fetch a list of all global metrics
         * @memberof get#metrics
         * @instance
         * @returns {Promise}
         */
        globals: function() {
          return sendRequest(context, cacheEnabled, useCache, 'metrics?global=true',
                             cache.metrics, 'globals');
        },
        /**
         * get().metrics().all(): fetch a list of all metrics
         * @memberof get#metrics
         * @instance
         * @returns {Promise}
         */
        all: function() {
          return sendRequest(context, cacheEnabled, useCache, 'metrics?global=false',
                             cache.metrics, 'all');
        }
      };
    },
    /**
     * get().checklistItems(): retrieve checklists
     * @memberof get
     * @instance
     * @class checklistItems
     */
    checklistItems: function() {
      return {
        /**
         * get().checklistItems().withID(): get a checklist by its id.
         * @memberof get#checklistItems
         * @instance
         * @param {string} id checklist id
         * @returns {Promise}
         */
        withID: function(id) {
          return sendRequest(context, cacheEnabled, useCache, 'checklist_items', cache.checklistItems.withID, id)
                 .spread(function (response, data) { return [id, 'checklist_items', response, data] })
                 .spread(findID);
        },
        /**
         * get().checklistItems().within(): get checklists within a subsequent scope.
         * @memberof get#checklistItems
         * @instance
         * @class within
         */
        within: function() {
          return {
            /**
             * get().projects().within().circles():
             *   get checklists within a circle's scope.
             *
             *   @see {@link get#checklistItems#within#circles#withID#withGlobals}
             *   @see {@link get#checklistItems#within#circles#withID#withoutGlobals}
             *
             * @memberof get#checklistItems#within
             * @instance
             * @class circles
             */
            circles: function() {
              return {
                /**
                 * get().checklistItems().within().circles():
                 *   get checklists within a circle's scope.
                 *
                 *   @see {@link get#checklistItems#within#circles#withID#withGlobals}
                 *   @see {@link get#checklistItems#within#circles#withID#withoutGlobals}
                 *
                 * @memberof get#checklistItems#within
                 * @instance
                 * @class circles
                 */
                withID: function(id) {
                  return {
                    /**
                     * get().checklistItems().within().circles().withID(id).withGlobals():
                     *  get checklists within a circle's by circle id, including
                     *  global checklists.
                     *
                     *
                     *   @see {@link get#checklistItems#within#circles#withID#withGlobals}
                     *   @see {@link get#checklistItems#within#circles#withID#withoutGlobals}
                     *
                     * @memberof get#checklistItems#within#circles#withID
                     * @instance
                     * @returns {Promise}
                     */
                    withGlobals: function() {
                      return sendRequest(context, cacheEnabled, useCache, 'checklist_items?circle_id=' + id,
                                         cache.checklistItems.within.circles.withGlobals.withID, id);
                    },
                    /**
                     * get().checklistItems().within().circles().withID(id).withoutGlobals():
                     *  get checklists within a circle's by circle id, without
                     *  global checklists.
                     *
                     * @memberof get#checklistItems#within#circles#withID
                     * @instance
                     * @returns {Promise}
                     */
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
        /**
         * get().checklistItems().globals(): fetch a list of all global checklists
         * @memberof get#checklistItems
         * @instance
         * @returns {Promise}
         */
        globals: function() {
          return sendRequest(context, cacheEnabled, useCache, 'checklist_items?global=true',
                             cache.checklistItems, 'globals');
        },
        /**
         * get().checklistItems().all(): fetch a list of all checklists
         * @memberof get#checklistItems
         * @instance
         * @returns {Promise}
         */
        // .get().checklistItems().all()
        all: function() {
          return sendRequest(context, cacheEnabled, useCache, 'checklist_items',
                             cache.checklistItems, 'all');
        }
      };
    },
    /**
     * get().actions(): retrieve actions
     * @memberof get
     * @instance
     * @class actions
     */
    actions: function() {
      return {
        /**
         * get().actions().withID(): get an action by its id.
         * @memberof get#actions
         * @instance
         * @param {string} id action id
         * @returns {Promise}
         */
        withID: function(id) {
          return sendRequest(context, cacheEnabled, useCache, 'actions', cache.actions.withID, id)
                 .spread(function (response, data) { return [id, 'actions', response, data] })
                 .spread(findID);
        },
        /**
         * get().actions().within(): get actions within a subsequent scope.
         * @memberof get#actions
         * @instance
         * @class within
         */
        within: function() {
          return {
            /**
             * get().actions().within().circles():
             *   get actions within a circle's scope.
             *
             *   @see {@link get#actions#within#circles#withID}
             *
             * @memberof get#actions#within
             * @instance
             * @class circles
             */
            circles: function() {
              return {
                /**
                 * get().actions().within().circles().withID(id):
                 *  get actions within a circle by circle id.
                 *
                 * @memberof get#actions#within#circles
                 * @instance
                 * @param {string} id circle id
                 * @returns {Promise}
                 */
                withID: function(id) {
                  return sendRequest(context, cacheEnabled, useCache, 'actions?circle_id=' + id,
                                     cache.actions.within.circles.withID, id);
                }
              };
            },
            /**
             * get().actions().within().people():
             *  get actions belonging to a person
             *
             *   @see {@link get#actions#within#people#withID}
             *
             * @memberof get#actions#within
             * @instance
             * @returns {Promise}
             */
            people: function() {
              return {
                /**
                 * get().actions().within().people().withID(id):
                 *  get actions belonging to a person by a person's id
                 *
                 * @memberof get#actions#within#people
                 * @instance
                 * @param {string} id person's id
                 * @returns {Promise}
                 */
                withID: function(id) {
                  return sendRequest(context, cacheEnabled, useCache, 'actions?person_id=' + id,
                                     cache.actions.within.people.withID, id);
                }
              };
            }
          };
        },
        /**
         * get().actions().createdSince(): retrieve actions after a particular date
         * @memberof get#actions
         * @instance
         * @param {string} date ISO 8601 date {@link http://en.wikipedia.org/wiki/ISO_8601}
         * @returns {Promise}
         */
        createdSince: function(date) {
          return sendRequest(context, cacheEnabled, useCache, 'actions?created_since=' + date,
                             cache.actions.createdSince, date);
        },
        /**
         * get().actions().actions(): retrieve all actions
         * @memberof get#actions
         * @instance
         * @returns {Promise}
         */
        all: function() {
          return sendRequest(context, cacheEnabled, useCache, 'actions',
                             cache.actions, 'all');
        }
      };
    },
    /**
     * get().triggers(): retrieve triggers
     * @memberof get
     * @instance
     * @class triggers
     */
    triggers: function() {
      return {
        /**
         * get().triggers().withID(): get a trigger by its id
         * @memberof get#triggers
         * @instance
         * @param {string} id trigger id
         * @returns {Promise}
         */
        withID: function(id) {
          return sendRequest(context, cacheEnabled, useCache, 'triggers', cache.triggers.withID, id)
                 .spread(function (response, data) { return [id, 'triggers', response, data] })
                 .spread(findID);
        },
        /**
         * get().triggers().within(): get triggers within a subsequent scope.
         * @memberof get#actions
         * @instance
         * @class within
         */
        within: function() {
          return {
            /**
             * get().triggers().within().circles():
             *   get triggers within a circle's scope.
             *
             *   @see {@link get#triggers#within#circles#withID}
             *
             * @memberof get#triggers#within
             * @instance
             * @class circles
             */
            circles: function() {
              return {
                /**
                 * get().triggers().within().circles().withID(id):
                 *  get triggers within a circle by circle id.
                 *
                 * @memberof get#triggers#within#circles
                 * @instance
                 * @param {string} id circle id
                 * @returns {Promise}
                 */
                withID: function(id) {
                  return sendRequest(context, cacheEnabled, useCache, 'triggers?circle_id=' + id,
                                     cache.triggers.within.circles.withID, id);
                }
              };
            },
            /**
             * get().triggers().within().people():
             *  get triggers belonging to a person
             *
             *   @see {@link get#triggers#within#people#withID}
             *
             * @memberof get#triggers#within
             * @instance
             * @returns {Promise}
             */
            people: function() {
              return {
                /**
                 * get().triggers().within().people().withID(id):
                 *  get triggers belonging to a person by a person's id
                 *
                 * @memberof get#triggers#within#people
                 * @instance
                 * @param {string} id person's id
                 * @returns {Promise}
                 */
                withID: function(id) {
                  return sendRequest(context, cacheEnabled, useCache, 'triggers?person_id=' + id,
                                     cache.triggers.within.people.withID, id);
                }
              };
            }
          };
        },
        /**
         * get().triggers().createdSince(): retrieve triggers after a particular date
         * @memberof get#triggers
         * @instance
         * @param {string} date ISO 8601 date {@link http://en.wikipedia.org/wiki/ISO_8601}
         * @returns {Promise}
         */
        createdSince: function(date) {
          return sendRequest(context, cacheEnabled, useCache, 'triggers?created_since=' + date,
                             cache.triggers.createdSince, date);
        },
        /**
         * get().triggers().all(): retrieve all actions
         * @memberof get#triggers
         * @instance
         * @returns {Promise}
         */
        all: function() {
          return sendRequest(context, cacheEnabled, useCache, 'triggers',
                             cache.triggers, 'all');
        }
      };
    },
    /* Build an organization's graph, see: GETgraph.js */
    graph: function() { return graphMethods(this); }
  };
}
