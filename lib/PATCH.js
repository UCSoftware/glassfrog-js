var _ = require('underscore');

function formify(form, resource, id) {
  var formArray = [];
  _.keys(form).forEach(function (key) {
    formArray.push({
      "op": "replace",
      "path": "/" + resource + "/0/" + key,
      "value": form[key]
    });
  });
  return formArray;
}

module.exports = function(context) {
  return {
    roles: function() {
      return {
        withID: function(rolesID) {
          return {
            add: function() {
              return {
                to: function() {
                  return {
                    people: function() {
                      return {
                        withID: function(peopleID) {
                          return context.sendPATCH('roles/' + rolesID, JSON.stringify(
                            [{
                              "op" : "add", "path": "/roles/0/links/people/" + peopleID
                            }]
                          ));
                        }
                      };
                    }
                  };
                }
              };
            },
            remove: function() {
              return {
                from: function() {
                  return {
                    people: function() {
                      return {
                        withID: function(peopleID) {
                          return context.sendPATCH('roles/' + rolesID, JSON.stringify(
                            [{
                              "op" : "remove", "path": "/roles/0/links/people/" + peopleID
                            }]
                          ));
                        }
                      };
                    }
                  };
                }
              };
            }
          };
        }
      };
    },
    people: function() {
      return {
        withID: function(id) {
          return {
            change: function(form) {
              return context.sendPATCH('people/' + id, JSON.stringify(
                formify(form, 'people')
              ));
            }
          };
        }
      };
    },
    projects: function() {
      return {
        withID: function(id) {
          return {
            change: function(form) {
              return context.sendPATCH('projects/' + id, JSON.stringify(
                formify(form, 'projects')
              ));
            },
            archive: function() {
              return context.sendPATCH('projects/' + id, JSON.stringify(
                [{
                  "op": "replace", "path" : "/projects/0/status", "value": "Archived" 
                }]
              ));   
            }
          };
        }
      };
    },
    metrics: function() {
      return {
        withID: function(id) {
          return {
            change: function(form) {
              return context.sendPATCH('metrics/' + id, JSON.stringify(
                formify(form, 'metrics')
              ));
            }
          };
        }
      };
    },
    checklistItems: function() {
      return {
        withID: function(id) {
          return {
            change: function(form) {
              return context.sendPATCH('checklist_items/' + id, JSON.stringify(
                formify(form, 'checklist_items')
              ));
            }
          };
        }
      };
    },
  };
}