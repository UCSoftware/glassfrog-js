module.exports = {
	circles: {
		withID: {},
		all: {}
	},
	roles: {
		withID: {},
		within: {
			circles: {
				withID: {}
			},
			people: {
				withID: {}
			}
		},
		all: {}
	},
	people: {
		withID: {},
		within: {
			circles: {
				withID: {}
			},
			roles: {
				withName: {}
			}
		},
		all: {}
	},
	projects: {
		withID: {},
		within: {
			circles: {
				withID: {}
			}
		},
		all: {}
	},
	metrics: {
		withID: {},
		within: {
			circles: {
				withGlobals: {
					withID: {}
				},
				withoutGlobals: {
					withID: {}
				}
			}
		},
		globals: {},
		all: {}
	},
	checklist_items: {
		withID: {},
		within: {
			circles: {
				withGlobals: {
					withID: {}
				},
				withoutGlobals: {
					withID: {}
				}
			}
		},
		globals: {},
		all: {}
	},
	actions: {
		withID: {},
		within: {
			circles: {
				withID: {}
			},
			people: {
				withID: {}
			}
		},
		created_since: {},
		all: {}
	},
	triggers: {
		withID: {},
		within: {
			circles: {
				withID: {}
			},
			people: {
				withID: {}
			}
		},
		created_since: {},
		all: {} 
	}
};