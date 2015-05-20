/**
 * Wrapper for the GlassFrog API.
 *
 * @description :: TODO
 *
 */

var Promise = require('bluebird');
var request = Promise.promisify(require('request'));

module.exports = function(key) {
	return {
		// URL root for GF API.
		root: 'https://glassfrog.holacracy.org/api/v3/',
		// GF API Key, must set before use.
		key: key,
		// Checks if API Key is set.
		checkKey: function() {
			if (!this.key) {
				throw new Error('Please set your API Key.');
			}
		},
		// Sets the API Key header key/value pair.
		setHeaders: function() {
			this.checkKey();
			this.header = { 'X-Auth-Token': this.key };
		},
		// Sends a request to the url specified by this.root + suffix.
		sendRequest: function(suffix) {
			this.setHeaders();
			// Follow with .then(...).catch(...)
			return request({
				url: this.root + suffix,
				headers: this.header
			});
		},
		// .get()
		get: function() {
			var that = this;
			return {
				// .get().circles()
				circles: function() {
					return {
						// .get().circles().withID(id)
						withID: function(id) {
							return that.sendRequest('circles/' + id);
						},
						// .get().circles().all()
						all: function() {
							return that.sendRequest('circles');
						}
					};
				},
				// .get().roles()
				roles: function() {
					return {
						// .get().roles().withID(id)
						withID: function(id) {
							return that.sendRequest('roles/' + id);
						},
						// .get().roles().within()
						within: function() {
							return {
								// .get.roles().within().circles()
								circles: function() {
									return {
										// .get().roles().within().circles().withID(id)
										withID: function(id) {
											return that.sendRequest('circles/' + id + '/roles');
										}
									};
								},
								// .get().roles().within().people()
								people: function() {
									return {
										// .get().roles().within().people().withID(id)
										withID: function(id) {
											return that.sendRequest('roles?person_id=' + id);
										}
									}
								}
							}
						},
						// .get().roles().all()
						all: function() {
							return that.sendRequest('roles');
						}
					};
				},
				// .get().people()
				people: function() {
					return {
						// .get().people().withID(id)
						withID: function(id) {
							return that.sendRequest('people/' + id);
						},
						// .get().people().within()
						within: function() {
							return {
								circles: function() {
									return {
										// .get().people().within().circles().withID(id)
										withID: function(id) {
											return that.sendRequest('circles/' + id + '/people');
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
														return that.sendRequest('people?role=secretary');
														break;
													// .get().people().within().roles().withName('rep_link')
													case 'rep_link':
													// .get().people().within().roles().withName('rep link')
													case 'rep link':
														return that.sendRequest('people?role=rep_link');
														break;
													// .get().people().within().roles().withName('lead_link')
													case 'lead_link':
													// .get().people().within().roles().withName('lead link')
													case 'lead link':
														return that.sendRequest('people?role=lead_link');
														break;
													// .get().people().within().roles().withName('facilitator')
													case 'facilitator':
														return that.sendRequest('people?role=facilitator');
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
							return that.sendRequest('people');
						}
					};
				},
				// .get().projects()
				projects: function() {
					return {
						// .get().projects().withID(id)
						withID: function(id) {
							return that.sendRequest('projects/' + id);
						},
						// .get().projects().within()
						within: function() {
							return {
								// .get().projects().within().circles()
								circles: function() {
									return {
										// .get().projects().within().circles().withID(id)
										withID: function(id) {
											return that.sendRequest('projects?circle_id=' + id);
										}
									};
								}
							};
						},
						// .get().projects().all()
						all: function() {
							return that.sendRequest('projects');
						}
					};
				},
				// .get().metrics()
				metrics: function() {
 					return {
						// .get().metrics().withID(id)
						withID: function(id) {
							return that.sendRequest('metrics/' + id);
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
												withGlobal: function() {
													return that.sendRequest('circles/' + id + '/metrics');
												},
												// .get().metrics().within().circles().withID(id).withoutGlobals()
												withoutGlobal: function() {
													return that.sendRequest('metrics?circle_id=' + id + '&global=false');
												}
											}
										}
									};
								}
							};
						},
						// .get().metrics().globals()
						globals: function() {
							return that.sendRequest('metrics?global=true');
						},
						// .get().metrics().all()
						all: function() {
							return that.sendRequest('metrics?global=false');
						}
					};
				},
				// .get().checklistItems()
				checklistItems: function() {
					return {
						// .get().checklistItems().withID(id)
						withID: function(id) {
							return that.sendRequest('checklist_items/' + id);
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
													return that.sendRequest('checklist_items?circle_id=' + id);
												},
												// .get().checklistItems().within().circles().withID(id).withoutGlobals()
												withoutGlobals: function() {
													return that.sendRequest('checklist_items?circle_id=' + id + '&global=false');
												}
											}
										}
									};
								}
							};
						},
						// .get().checklistItems().globals()
						globals: function() {
							return that.sendRequest('checklist_items?global=true');
						},
						// .get().checklistItems().all()
						all: function() {
							return that.sendRequest('checklist_items');
						}
					};
				},
				// .get().actions()
				actions: function() {
					return {
						// .get().actions().withID(id)
						withID: function(id) {
							return that.sendRequest('actions/' + id);
						},
						// .get().actions().within()
						within: function() {
							return {
								// .get().actions().within().circles()
								circles: function() {
									return {
										// .get().actions().within().circles().withID(id)
										withID: function(id) {
											return that.sendRequest('actions?circle_id=' + id);
										}
									};
								},
								// .get().actions().within().people()
								people: function() {
									return {
										// .get().actions().within().people().withID(id)
										withID: function(id) {
											return that.sendRequest('actions?person_id=' + id);
										}
									};
								}
							};
						},
						// .get().actions().created_since(date)
						created_since: function(date) {
							return that.sendRequest('actions?created_since=' + date);
						},
						// .get().actions().all()
						all: function() {
							return that.sendRequest('actions');
						}
					};
				},
				// get().triggers()
				triggers: function() {
					return {
						// .get().triggers().withID(id)
						withID: function(id) {
							return that.sendRequest('triggers/' + id);
						},
						// .get().triggers().within()
						within: function() {
							return {
								// .get().triggers().within().circles()
								circles: function() {
									return {
										// .get().triggers().within().circles().withID(id)
										withID: function(id) {
											return that.sendRequest('triggers?circle_id=' + id);
										}
									};
								},
								// .get().triggers().within().people()
								people: function () {
									return {
										// .get().triggers().within().people().withID(id)
										withID: function(id) {
											return that.sendRequest('triggers?person_id=' + id);
										}
									};
								}
							};
						},
						// .get().triggers().created_since(date)
						created_since: function(date) {
							return that.sendRequest('triggers?created_since=' + date);
						},
						// .get().triggers().all()
						all: function() {
							return that.sendRequest('triggers');
						}
					};
				}
			};
		}
	};
}
