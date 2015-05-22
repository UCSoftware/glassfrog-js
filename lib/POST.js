module.exports = function(context) {
	return {
		people: function(form) {
			return context.sendPOST({'people': {
				'people' : [
					form
				]
			}});
		},
		projects: function(form) {
			return context.sendPOST({'projects': {
				'projects' : [
					form
				]
			}});
		},
		metrics: function(form) {
			return context.sendPOST({'metrics': {
				'metrics' : [
					form
				]
			}});
		},
		checklistItems: function(form) {
			return context.sendPOST({'checklist_items': {
				'checklist_items' : [
					form
				]
			}});
		}
	};
}