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
				throw "Please set your API Key.";
			}
		},
		// Sets the API Key header key/value pair.
		setHeaders: function() {
			this.checkKey();
			this.header = { 'X-Auth-Token': this.key };
		},
		// Sends a request to the url specified by this.root + suffix.
		sendRequest: function(suffix) {
			var that = this;
			return {
				// .do(function (response) {..})
				// response is an array: [0] is the entire response, [1] is the body
				do: function(callback) {
					that.setHeaders();
					request({
						url: that.root + suffix,
						headers: that.header
					}).then(callback).catch(function(e) {
						throw new Error(e.code + " A client error occured.");
					});
				}
			}
		},
		// .find(type)
		find: function(type) {
			var that = this;
			if (typeof type === 'string') {
				switch(type.toLowerCase()) {
					// .find('circles')
					case 'circles':
						return {
							// .find('circles').withID(id)
							withID: function(id) {
								return that.sendRequest('circles/' + id);
							},
							// .find('circles').all()
							all: function() {
								return that.sendRequest('circles');
							}
						};
					// .find('roles')
					case 'roles':
						return {
							// .find('roles').withID(id)
							withID: function(id) {
								return that.sendRequest('roles/' + id);
							},
							// .find('roles').within(type)
							within: function(type) {
								if (typeof type === 'string') {
									switch(type.toLowerCase()) {
										// .find('roles').within('circles')
										case 'circles':
											return {
												// .find('roles').within('circles').withID(id)
												withID: function(id) {
													return that.sendRequest('circles/' + id + '/roles');
												}
											};
										// .find('roles').within('people')
										case 'people':
											return {
												// .find('roles').within('people').withID(id)
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
							// .find('roles').all()
							all: function() {
								return that.sendRequest('roles');
							}
						};
					// .find('people')
					case 'people':
						return {
							// .find('people').withID(id)
							withID: function(id) {
								return that.sendRequest('people/' + id);
							},
							// .find('people').within(type)
							within: function(type) {
								if (typeof type === 'string') {
									switch(type.toLowerCase()) {
										// .find('people').within('circles')
										case 'circles':
											return {
												// .find('people').within('circles').withID(id)
												withID: function(id) {
													return that.sendRequest('circles/' + id + '/people');
												}
											};
										// .find('people').within('roles')
										case 'roles':
											return {
												withName: function(name) {
													if (typeof name === 'string') {
														switch(name.toLowerCase()) {
															// .find('people').within('roles').withName('secretary')
															case 'secretary':
																return that.sendRequest('people?role=secretary');
																break;
															// .find('people').within('roles').withName('rep_link')
															case 'rep_link':
															// .find('people').within('roles').withName('rep link')
															case 'rep link':
																return that.sendRequest('people?role=rep_link');
																break;
															// .find('people').within('roles').withName('lead_link')
															case 'lead_link':
															// .find('people').within('roles').withName('lead link')
															case 'lead link':
																return that.sendRequest('people?role=lead_link');
																break;
															// .find('people').within('roles').withName('facilitator')
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
							// .find('people').all()
							all: function() {
								return that.sendRequest('people');
							}
						};
					// .find('projects')
					case 'projects':
						return {
							// .find('projects').withID(id)
							withID: function(id) {
								return that.sendRequest('projects/' + id);
							},
							// .find('projects').within(type)
							within: function(type) {
								if (typeof type === 'string') {
									switch(type.toLowerCase()) {
										// .find('projects').within('circles')
										case 'circles':
											return {
												// .find('projects').within('circles').withID(id)
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
							// .find('projects').all()
							all: function() {
								return that.sendRequest('projects');
							}
						};
					// .find('metrics')
					case 'metrics':
						return {
							// .find('metrics').withID(id)
							withID: function(id) {
								return that.sendRequest('metrics/' + id);
							},
							// .find('metrics').within(type)
							within: function(type) {
								if (typeof type === 'string') {
									switch(type.toLowerCase()) {
										// .find('metrics').within('circles')
										case 'circles':
											return {
												// .find('metrics').within('circles').withID(id)
												withID: function(id) {
													return {
														// .find('metrics').within('circles').withID(id).withGlobals()
														withGlobal: function() {
															return that.sendRequest('circles/' + id + '/metrics');
														},
														// .find('metrics').within('circles').withID(id).withoutGlobals()
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
							// .find('metrics').globals()
							globals: function() {
								return that.sendRequest('metrics?global=true');
							},
							// .find('metrics').all()
							all: function() {
								return that.sendRequest('metrics?global=false');
							}
						};
					// .find('checklist_items')
					case 'checklist_items':
					// .find('checklist items')
					case 'checklist items':
						return {
							// .find('checklist_items').withID(id)
							withID: function(id) {
								return that.sendRequest('checklist_items/' + id);
							},
							// .find('checklist_items').within(type)
							within: function(type) {
								if (typeof type === 'string') {
									switch(type.toLowerCase()) {
										// .find('checklist_items').within('circles')
										case 'circles':
											return {
												// .find('checklist_items').within('circles').withID(id)
												withID: function(id) {
													return {
														// .find('checklist_items').within('circles').withID(id).withGlobals()
														withGlobals: function() {
															return that.sendRequest('checklist_items?circle_id=' + id);
														},
														// .find('checklist_items').within('circles').withID(id).withoutGlobals()
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
							// .find('checklist_items').globals()
							globals: function() {
								return that.sendRequest('checklist_items?global=true');
							},
							// .find('checklist_items').all()
							all: function() {
								return that.sendRequest('checklist_items');
							}
						};
					// .find('actions')
					case 'actions':
						return {
							// .find('actions').withID(id)
							withID: function(id) {
								return that.sendRequest('actions/' + id);
							},
							// .find('actions').within(type)
							within: function(type) {
								if (typeof type === 'string') {
									switch(type.toLowerCase()) {
										// .find('actions').within('circles')
										case 'circles':
											return {
												// .find('actions').within('circles').withID(id)
												withID: function(id) {
													return that.sendRequest('actions?circle_id=' + id);
												}
											};
										// .find('actions').within('people')
										case 'people':
											return {
												// .find('actions').within('people').withID(id)
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
							// .find('actions').created_since(date)
							created_since: function(date) {
								return that.sendRequest('actions?created_since=' + date);
							},
							// .find('actions').all()
							all: function() {
								return that.sendRequest('actions');
							}
						};
					// find('triggers')
					case 'triggers':
						return {
							// .find('triggers').withID(id)
							withID: function(id) {
								return that.sendRequest('triggers/' + id);
							},
							// .find('triggers').within(type)
							within: function(type) {
								if (typeof type === 'string') {
									switch(type.toLowerCase()) {
										// .find('triggers').within('circles')
										case 'circles':
											return {
												// .find('triggers').within('circles').withID(id)
												withID: function(id) {
													return that.sendRequest('triggers?circle_id=' + id);
												}
											};
										// .find('triggers').within('people')
										case 'people':
											return {
												// .find('triggers').within('people').withID(id)
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
							// .find('triggers').created_since(date)
							created_since: function(date) {
								return that.sendRequest('triggers?created_since=' + date);
							},
							// .find('triggers').all()
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
