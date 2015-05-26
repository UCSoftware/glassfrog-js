module.exports = function(context) {
  return {
    people: function() {
      return {
        withID: function(id) {
          return context.sendDELETE('people/' + id);
        }
      };
    },
    projects: function() {
      return {
        withID: function(id) {
          return context.sendDELETE('projects/' + id);
        }
      };
    },
    metrics: function() {
      return {
        withID: function(id) {
          return context.sendDELETE('metrics/' + id);
        }
      };
    },
    checklistItems: function() {
      return {
        withID: function(id) {
          return context.sendDELETE('checklist_items/' + id);
        }
      };
    },
  };
}