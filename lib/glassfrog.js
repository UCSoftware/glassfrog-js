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
		sendGET: function(suffix) {
			this.setHeaders();
			// Follow with .then(...).catch(...)
			return request({
				url: this.root + suffix,
				headers: this.header
			});
		},
		sendPOST: function(suffix, form) {
			this.setHeaders();
			return request.post({
				url: this.root + suffix,
				headers: this.header,
				form: form
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
							return that.sendGET('circles/' + id);
						},
						// .get().circles().all()
						all: function() {
							return that.sendGET('circles');
						}
					};
				},
				// .get().roles()
				roles: function() {
					return {
						// .get().roles().withID(id)
						withID: function(id) {
							return that.sendGET('roles/' + id);
						},
						// .get().roles().within()
						within: function() {
							return {
								// .get.roles().within().circles()
								circles: function() {
									return {
										// .get().roles().within().circles().withID(id)
										withID: function(id) {
											return that.sendGET('circles/' + id + '/roles');
										}
									};
								},
								// .get().roles().within().people()
								people: function() {
									return {
										// .get().roles().within().people().withID(id)
										withID: function(id) {
											return that.sendGET('roles?person_id=' + id);
										}
									}
								}
							}
						},
						// .get().roles().all()
						all: function() {
							return that.sendGET('roles');
						}
					};
				},
				// .get().people()
				people: function() {
					return {
						// .get().people().withID(id)
						withID: function(id) {
							return that.sendGET('people/' + id);
						},
						// .get().people().within()
						within: function() {
							return {
								circles: function() {
									return {
										// .get().people().within().circles().withID(id)
										withID: function(id) {
											return that.sendGET('circles/' + id + '/people');
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
														return that.sendGET('people?role=secretary');
														break;
													// .get().people().within().roles().withName('rep_link')
													case 'rep_link':
													// .get().people().within().roles().withName('rep link')
													case 'rep link':
														return that.sendGET('people?role=rep_link');
														break;
													// .get().people().within().roles().withName('lead_link')
													case 'lead_link':
													// .get().people().within().roles().withName('lead link')
													case 'lead link':
														return that.sendGET('people?role=lead_link');
														break;
													// .get().people().within().roles().withName('facilitator')
													case 'facilitator':
														return that.sendGET('people?role=facilitator');
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
							return that.sendGET('people');
						}
					};
				},
				// .get().projects()
				projects: function() {
					return {
						// .get().projects().withID(id)
						withID: function(id) {
							return that.sendGET('projects/' + id);
						},
						// .get().projects().within()
						within: function() {
							return {
								// .get().projects().within().circles()
								circles: function() {
									return {
										// .get().projects().within().circles().withID(id)
										withID: function(id) {
											return that.sendGET('projects?circle_id=' + id);
										}
									};
								}
							};
						},
						// .get().projects().all()
						all: function() {
							return that.sendGET('projects');
						}
					};
				},
				// .get().metrics()
				metrics: function() {
 					return {
						// .get().metrics().withID(id)
						withID: function(id) {
							return that.sendGET('metrics/' + id);
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
													return that.sendGET('circles/' + id + '/metrics');
												},
												// .get().metrics().within().circles().withID(id).withoutGlobals()
												withoutGlobals: function() {
													return that.sendGET('metrics?circle_id=' + id + '&global=false');
												}
											}
										}
									};
								}
							};
						},
						// .get().metrics().globals()
						globals: function() {
							return that.sendGET('metrics?global=true');
						},
						// .get().metrics().all()
						all: function() {
							return that.sendGET('metrics?global=false');
						}
					};
				},
				// .get().checklistItems()
				checklistItems: function() {
					return {
						// .get().checklistItems().withID(id)
						withID: function(id) {
							return that.sendGET('checklist_items/' + id);
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
													return that.sendGET('checklist_items?circle_id=' + id);
												},
												// .get().checklistItems().within().circles().withID(id).withoutGlobals()
												withoutGlobals: function() {
													return that.sendGET('checklist_items?circle_id=' + id + '&global=false');
												}
											}
										}
									};
								}
							};
						},
						// .get().checklistItems().globals()
						globals: function() {
							return that.sendGET('checklist_items?global=true');
						},
						// .get().checklistItems().all()
						all: function() {
							return that.sendGET('checklist_items');
						}
					};
				},
				// .get().actions()
				actions: function() {
					return {
						// .get().actions().withID(id)
						withID: function(id) {
							return that.sendGET('actions/' + id);
						},
						// .get().actions().within()
						within: function() {
							return {
								// .get().actions().within().circles()
								circles: function() {
									return {
										// .get().actions().within().circles().withID(id)
										withID: function(id) {
											return that.sendGET('actions?circle_id=' + id);
										}
									};
								},
								// .get().actions().within().people()
								people: function() {
									return {
										// .get().actions().within().people().withID(id)
										withID: function(id) {
											return that.sendGET('actions?person_id=' + id);
										}
									};
								}
							};
						},
						// .get().actions().createdSince(date)
						createdSince: function(date) {
							return that.sendGET('actions?created_since=' + date);
						},
						// .get().actions().all()
						all: function() {
							return that.sendGET('actions');
						}
					};
				},
				// get().triggers()
				triggers: function() {
					return {
						// .get().triggers().withID(id)
						withID: function(id) {
							return that.sendGET('triggers/' + id);
						},
						// .get().triggers().within()
						within: function() {
							return {
								// .get().triggers().within().circles()
								circles: function() {
									return {
										// .get().triggers().within().circles().withID(id)
										withID: function(id) {
											return that.sendGET('triggers?circle_id=' + id);
										}
									};
								},
								// .get().triggers().within().people()
								people: function() {
									return {
										// .get().triggers().within().people().withID(id)
										withID: function(id) {
											return that.sendGET('triggers?person_id=' + id);
										}
									};
								}
							};
						},
						// .get().triggers().createdSince(date)
						createdSince: function(date) {
							return that.sendGET('triggers?created_since=' + date);
						},
						// .get().triggers().all()
						all: function() {
							return that.sendGET('triggers');
						}
					};
				}
			};
		},
		post: function() {
			return {
				people: function(form) {
					return that.sendPOST({'people': { 
						'people' : [
							form
						]
					}});
				},
				projects: function(form) {
					return that.sendPOST({'projects': {
						'projects' : [
							form
						]
					}});
				},
				metrics: function(form) {
					return that.sendPOST({'metrics': {
						'metrics' : [
							form
						]
					}});
				}
			};
		}
	};
}
