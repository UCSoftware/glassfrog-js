module.exports = {
	circles: {
		withID: {}
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
	},
	projects: {
		withID: {},
		within: {
			circles: {
				withID: {}
			}
		},
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
		created_since: {}
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
		created_since: {}
	}
};