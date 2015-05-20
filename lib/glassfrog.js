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
				throw new Error("Please set your API Key.");
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
		// .get(type)
		get: function(type) {
			var that = this;
			if (typeof type === 'string') {
				switch(type.toLowerCase()) {
					// .get('circles')
					case 'circles':
						return {
							// .get('circles').withID(id)
							withID: function(id) {
								return that.sendRequest('circles/' + id);
							},
							// .get('circles').all()
							all: function() {
								return that.sendRequest('circles');
							}
						};
					// .get('roles')
					case 'roles':
						return {
							// .get('roles').withID(id)
							withID: function(id) {
								return that.sendRequest('roles/' + id);
							},
							// .get('roles').within(type)
							within: function(type) {
								if (typeof type === 'string') {
									switch(type.toLowerCase()) {
										// .get('roles').within('circles')
										case 'circles':
											return {
												// .get('roles').within('circles').withID(id)
												withID: function(id) {
													return that.sendRequest('circles/' + id + '/roles');
												}
											};
										// .get('roles').within('people')
										case 'people':
											return {
												// .get('roles').within('people').withID(id)
												withID: function(id) {
													return that.sendRequest('roles?person_id=' + id);
												}
											}
										default:
											throw new Error("Invalid argument.");
									}
								} else {
									throw new TypeError("Argument must be a string.");
								}
							},
							// .get('roles').all()
							all: function() {
								return that.sendRequest('roles');
							}
						};
					// .get('people')
					case 'people':
						return {
							// .get('people').withID(id)
							withID: function(id) {
								return that.sendRequest('people/' + id);
							},
							// .get('people').within(type)
							within: function(type) {
								if (typeof type === 'string') {
									switch(type.toLowerCase()) {
										// .get('people').within('circles')
										case 'circles':
											return {
												// .get('people').within('circles').withID(id)
												withID: function(id) {
													return that.sendRequest('circles/' + id + '/people');
												}
											};
										// .get('people').within('roles')
										case 'roles':
											return {
												withName: function(name) {
													if (typeof name === 'string') {
														switch(name.toLowerCase()) {
															// .get('people').within('roles').withName('secretary')
															case 'secretary':
																return that.sendRequest('people?role=secretary');
																break;
															// .get('people').within('roles').withName('rep_link')
															case 'rep_link':
															// .get('people').within('roles').withName('rep link')
															case 'rep link':
																return that.sendRequest('people?role=rep_link');
																break;
															// .get('people').within('roles').withName('lead_link')
															case 'lead_link':
															// .get('people').within('roles').withName('lead link')
															case 'lead link':
																return that.sendRequest('people?role=lead_link');
																break;
															// .get('people').within('roles').withName('facilitator')
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
										default:
											throw new Error("Invalid argument.");
									}
								} else {
									throw new TypeError("Argument must be a string.");
								}
							},
							// .get('people').all()
							all: function() {
								return that.sendRequest('people');
							}
						};
					// .get('projects')
					case 'projects':
						return {
							// .get('projects').withID(id)
							withID: function(id) {
								return that.sendRequest('projects/' + id);
							},
							// .get('projects').within(type)
							within: function(type) {
								if (typeof type === 'string') {
									switch(type.toLowerCase()) {
										// .get('projects').within('circles')
										case 'circles':
											return {
												// .get('projects').within('circles').withID(id)
												withID: function(id) {
													return that.sendRequest('projects?circle_id=' + id);
												}
											};
										default:
											throw new Error("Invalid argument.");
									}
								} else {
									throw new TypeError("Argument must be a string.");
								}
							},
							// .get('projects').all()
							all: function() {
								return that.sendRequest('projects');
							}
						};
					// .get('metrics')
					case 'metrics':
						return {
							// .get('metrics').withID(id)
							withID: function(id) {
								return that.sendRequest('metrics/' + id);
							},
							// .get('metrics').within(type)
							within: function(type) {
								if (typeof type === 'string') {
									switch(type.toLowerCase()) {
										// .get('metrics').within('circles')
										case 'circles':
											return {
												// .get('metrics').within('circles').withID(id)
												withID: function(id) {
													return {
														// .get('metrics').within('circles').withID(id).withGlobals()
														withGlobal: function() {
															return that.sendRequest('circles/' + id + '/metrics');
														},
														// .get('metrics').within('circles').withID(id).withoutGlobals()
														withoutGlobal: function() {
															return that.sendRequest('metrics?circle_id=' + id + '&global=false');
														}
													}
												}
											};
										default:
											throw new Error("Invalid argument.");
									}
								} else {
									throw new TypeError("Argument must be a string.");
								}
							},
							// .get('metrics').globals()
							globals: function() {
								return that.sendRequest('metrics?global=true');
							},
							// .get('metrics').all()
							all: function() {
								return that.sendRequest('metrics?global=false');
							}
						};
					// .get('checklist_items')
					case 'checklist_items':
					// .get('checklist items')
					case 'checklist items':
						return {
							// .get('checklist_items').withID(id)
							withID: function(id) {
								return that.sendRequest('checklist_items/' + id);
							},
							// .get('checklist_items').within(type)
							within: function(type) {
								if (typeof type === 'string') {
									switch(type.toLowerCase()) {
										// .get('checklist_items').within('circles')
										case 'circles':
											return {
												// .get('checklist_items').within('circles').withID(id)
												withID: function(id) {
													return {
														// .get('checklist_items').within('circles').withID(id).withGlobals()
														withGlobals: function() {
															return that.sendRequest('checklist_items?circle_id=' + id);
														},
														// .get('checklist_items').within('circles').withID(id).withoutGlobals()
														withoutGlobals: function() {
															return that.sendRequest('checklist_items?circle_id=' + id + '&global=false');
														}
													}
												}
											};
										default:
											throw new Error("Invalid argument.");
									}
								} else {
									throw new TypeError("Argument must be a string.");
								}
							},
							// .get('checklist_items').globals()
							globals: function() {
								return that.sendRequest('checklist_items?global=true');
							},
							// .get('checklist_items').all()
							all: function() {
								return that.sendRequest('checklist_items');
							}
						};
					// .get('actions')
					case 'actions':
						return {
							// .get('actions').withID(id)
							withID: function(id) {
								return that.sendRequest('actions/' + id);
							},
							// .get('actions').within(type)
							within: function(type) {
								if (typeof type === 'string') {
									switch(type.toLowerCase()) {
										// .get('actions').within('circles')
										case 'circles':
											return {
												// .get('actions').within('circles').withID(id)
												withID: function(id) {
													return that.sendRequest('actions?circle_id=' + id);
												}
											};
										// .get('actions').within('people')
										case 'people':
											return {
												// .get('actions').within('people').withID(id)
												withID: function(id) {
													return that.sendRequest('actions?person_id=' + id);
												}
											};
										default:
											throw new Error("Invalid argument.");
									}
								} else {
									throw new TypeError("Argument must be a string.");
								}
							},
							// .get('actions').created_since(date)
							created_since: function(date) {
								return that.sendRequest('actions?created_since=' + date);
							},
							// .get('actions').all()
							all: function() {
								return that.sendRequest('actions');
							}
						};
					// get('triggers')
					case 'triggers':
						return {
							// .get('triggers').withID(id)
							withID: function(id) {
								return that.sendRequest('triggers/' + id);
							},
							// .get('triggers').within(type)
							within: function(type) {
								if (typeof type === 'string') {
									switch(type.toLowerCase()) {
										// .get('triggers').within('circles')
										case 'circles':
											return {
												// .get('triggers').within('circles').withID(id)
												withID: function(id) {
													return that.sendRequest('triggers?circle_id=' + id);
												}
											};
										// .get('triggers').within('people')
										case 'people':
											return {
												// .get('triggers').within('people').withID(id)
												withID: function(id) {
													return that.sendRequest('triggers?person_id=' + id);
												}
											};
										default:
											throw new Error("Invalid argument.");
									}
								} else {
									throw new TypeError("Argument must be a string.");
								}
							},
							// .get('triggers').created_since(date)
							created_since: function(date) {
								return that.sendRequest('triggers?created_since=' + date);
							},
							// .get('triggers').all()
							all: function() {
								return that.sendRequest('triggers');
							}
						}
					default:
						throw new Error("Invalid argument.");
				}
			} else {
				throw new TypeError("Argument must be a string");
			}
		}
	}
}
