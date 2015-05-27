/**
  * Create new objects within GlassFrog.
  *
  * For examples and more documentation read:
  * [POST Documentation]{@tutorial POST}* 
  *
  * @class post
  */
module.exports = function(context) {
  return {
    /**
     * Post people
     * @memberof post
     * @instance
     */
    people: function(form) {
      return context.sendPOST('people', JSON.stringify({
        'people' : [
          form
        ]
      }));
    },
    projects: function(form) {
      return context.sendPOST('projects', JSON.stringify({
        'projects' : [
          form
        ]
      }));
    },
    metrics: function(form) {
      return context.sendPOST('metrics', JSON.stringify({
        'metrics' : [
          form
        ]
      }));
    },
    checklistItems: function(form) {
      return context.sendPOST('checklist_items', JSON.stringify({
        'checklist_items' : [
          form
        ]
      }));
    }
  };
}
