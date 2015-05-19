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
			this.setHeaders();
			request({
					url: this.root + suffix,
					headers: this.header
				}, function (error, response, body) {
					if (!error && response.statusCode == 200) {
						var info = JSON.parse(body);
						// NEEDS TO BE CHANGED
						console.log(info);
					}
			});
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
								that.sendRequest('circles/' + id);
							},
							// .find('circles').within(type)
							//within: function(type) {
							//	// CURRENTLY INVALID
							//},
							// .find('circles').all()
							all: function() {
								that.sendRequest('circles');
							}
						};
					// .find('roles')
					case 'roles':
						return {
							// .find('roles').withID(id)
							withID: function(id) {
								that.sendRequest('roles/' + id);
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
													that.sendRequest('circles/' + id + '/roles');
												}
											};
										// .find('roles').within('souls')
										case 'souls':
											return {
												// .find('roles').within('souls').withID(id)
												withID: function(id) {
													that.sendRequest('roles?person_id=' + id);
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
								that.sendRequest('roles');
							}
						};
					// .find('souls')
					case 'souls':
						return {
							// .find('souls').withID(id)
							withID: function(id) {
								that.sendRequest('people/' + id);
							},
							// .find('souls').within(type)
							within: function(type) {
								if (typeof type === 'string') {
									switch(type.toLowerCase()) {
										// .find('souls').within('circles')
										case 'circles':
											return {
												// .find('souls').within('circles').withID(id)
												withID: function(id) {
													that.sendRequest('circles/' + id + '/people');
												}
											};
										// .find('souls').within('roles')
										case 'roles':
											return {
												withName: function(name) {
													if (typeof name === 'string') {
														switch(name.toLowerCase()) {
															// .find('souls').within('roles').withName('secretary')
															case 'secretary':
																that.sendRequest('people?role=secretary');
																break;
															// .find('souls').within('roles').withName('rep_link')
															case 'rep_link':
															// .find('souls').within('roles').withName('rep link')
															case 'rep link':
																that.sendRequest('people?role=rep_link');
																break;
															// .find('souls').within('roles').withName('lead_link')
															case 'lead_link':
															// .find('souls').within('roles').withName('lead link')
															case 'lead link':
																that.sendRequest('people?role=lead_link');
																break;
															// .find('souls').within('roles').withName('facilitator')
															case 'facilitator':
																that.sendRequest('people?role=facilitator');
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
							// .find('souls').all()
							all: function() {
								that.sendRequest('people');
							}
						};
					// .find('projects')
					case 'projects':
						return {
							// .find('projects').withID(id)
							withID: function(id) {
								that.sendRequest('projects/' + id);
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
													that.sendRequest('projects?circle_id=' + id);
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
								that.sendRequest('projects');
							}
						};
					// .find('metrics')
					case: 'metrics':
						return {
							// .find('metrics').withID(id)
							withID: function(id) {
								that.sendRequest('metrics/' + id);
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
														// .find('metrics').within('circles').withID(id).withGlobalMetrics()
														withGlobalMetrics: function() {
															that.sendRequest('circles/' + id + '/metrics');
														},
														// .find('metrics').within('circles').withID(id).withoutGlobalMetrics()
														withoutGlobalMetrics: function() {
															that.sendRequest('metrics?circle_id=' + id '&global=false');
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
							// .find('metrics').all()
							all: function() {
								{
									// .find('metrics').all().withGlobalMetrics()
									withGlobalMetrics: function() {
										that.sendRequest('metrics?global=true');
									},
									// .find('metrics').all().withoutGlobalMetrics()
									withoutGlobalMetrics: function() {
										that.sendRequest('metrics?global=false');
									}
								}
							}
						};
					default:
						throw new Error("Invalid argument.");
				}
			} else {
				throw new TypeError("Argument must be a string");
			}
		}
	}
}
