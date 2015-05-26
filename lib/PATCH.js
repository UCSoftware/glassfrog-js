var _ = require('underscore');

function formify(form, resource) {
  var formArray = [];
  _.keys(form, function (key) {
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
    roles: function(form) {
      return {
        withID: function(id) {
          return context.sendPATCH('roles/' + id, JSON.stringify({
            'roles' : formify(form, 'roles')
          }));
        }
      };
    },
    people: function(form) {
      return {
        withID: function(id) {
          return context.sendPATCH('people/' + id, JSON.stringify({
            'people' : formify(form, 'people')
          }));
        }
      };
    },
    projects: function(form) {
      return {
        withID: function(id) {
          return context.sendPATCH('projects/' + id, JSON.stringify({
            'projects' : formify(form, 'projects')
          }));
        }
      };
    },
    metrics: function(form) {
      return {
        withID: function(id) {
          return context.sendPATCH('metrics/' + id, JSON.stringify({
            'metrics' : formify(form, 'metrics')
          }));
        }
      };
    },
    checklistItems: function(form) {
      return {
        withID: function(id) {
          return context.sendPATCH('checklist_items/' + id, JSON.stringify({
            'checklist_items' : formify(form, 'checklist_items')
          }));
        }
      };
    },
  };
}