var local = require('./cache.js');

function sendRequest(context, caching, cache, suffix, object) {
	if (caching) {
		if (cache) {
			object = object || sendGET(suffix);
			return object;
		} else {
			object = sendGET(suffix);
			return object;
		}
	} else {
		if (cache) throw new Error('Caching is not turned on!');
		return context.sendGET(suffix);
	}
}

// .get(cache=false)
module.exports = function (context, caching, cache) {
	var object = local;
	return {
		circles: function() {
			object = object.circles;
			return {
				// .get().circles().withID(id)
				withID: function(id) {
					object = object.withID[id];
					return sendRequest(context, caching, cache, 'circles/' + id, object);
				},
				// .get().circles().all()
				all: function() {
					object = object.all;
					return sendRequest(context, caching, cache, 'circles', object);
				}
			};
		},
		roles: function() {
			object = object.roles;
			return {
				// .get().roles().withID(id)
				withID: function(id) {
					object = object.withID[id];
					return sendRequest(context, caching, cache, 'roles/' + id, object);
				},
				// .get().roles().within()
				within: function() {
					object = object.within;
					return {
						// .get.roles().within().circles()
						circles: function() {
							object = object.circles;
							return {
								// .get().roles().within().circles().withID(id)
								withID: function(id) {
									object = object.withID[id];
									return sendRequest(context, caching, cache, 'circles/' + id + '/roles', object);
								}
							};
						},
						// .get().roles().within().people()
						people: function() {
							object = object.people;
							return {
								// .get().roles().within().people().withID(id)
								withID: function(id) {
									object = object.withID[id];
									return sendRequest(context, caching, cache, 'roles?person_id=' + id, object);
								}
							}
						}
					}
				},
				// .get().roles().all()
				all: function() {
					object = object.all;
					return sendRequest(context, caching, cache, 'roles', object);
				}
			};
		},
		people: function() {
			object = object.people;
			return {
				// .get().people().withID(id)
				withID: function(id) {
					object = object.withID[id];
					return sendRequest(context, caching, cache, 'people/' + id, object);
				},
				// .get().people().within()
				within: function() {
					object = object.within;
					return {
						circles: function() {
							object = object.circles;
							return {
								// .get().people().within().circles().withID(id)
								withID: function(id) {
									object = object.withID[id];
									return sendRequest(context, caching, cache, 'circles/' + id + '/people', object);
								}
							};
						},
						// .get().people().within().roles()
						roles: function() {
							object = object.roles;
							return {
								// .get().people().within().roles().withName(name)
								withName: function(name) {
									object = object.withName;
									if (typeof name === 'string') {
										switch(name.toLowerCase()) {
											// .get().people().within().roles().withName('secretary')
											case 'secretary':
												object = object['secretary'];
												return sendRequest(context, caching, cache, 'people?role=secretary', object);
												break;
											// .get().people().within().roles().withName('rep_link')
											case 'rep_link':
											// .get().people().within().roles().withName('rep link')
											case 'rep link':
												object = object['rep_link'];
												return sendRequest(context, caching, cache, 'people?role=rep_link', object);
												break;
											// .get().people().within().roles().withName('lead_link')
											case 'lead_link':
											// .get().people().within().roles().withName('lead link')
											case 'lead link':
												object = object['lead_link'];
												return sendRequest(context, caching, cache, 'people?role=lead_link', object);
												break;
											// .get().people().within().roles().withName('facilitator')
											case 'facilitator':
												object = object['facilitator'];
												return sendRequest(context, caching, cache, 'people?role=facilitator', object);
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
					object = object.all;
					return sendRequest(context, caching, cache, 'people', object);
				}
			};
		},
		projects: function() {
			object = object.projects;
			return {
				// .get().projects().withID(id)
				withID: function(id) {
					object = object.withID[id];
					return sendRequest(context, caching, cache, 'projects/' + id, object);
				},
				// .get().projects().within()
				within: function() {
					object = object.within;
					return {
						// .get().projects().within().circles()
						circles: function() {
							object = object.circles;
							return {
								// .get().projects().within().circles().withID(id)
								withID: function(id) {
									object = object[id];
									return sendRequest(context, caching, cache, 'projects?circle_id=' + id, object);
								}
							};
						}
					};
				},
				// .get().projects().all()
				all: function() {
					object = object.all;
					return sendRequest(context, caching, cache, 'projects', object);
				}
			};
		},
		metrics: function() {
			object = object.metrics;
			return {
				// .get().metrics().withID(id)
				withID: function(id) {
					object = object.withID[id];
					return sendRequest(context, caching, cache, 'metrics/' + id, object);
				},
				// .get().metrics().within()
				within: function() {
					object = object.within;
					return {
						// .get().metrics().within().circles()
						circles: function() {
							object = object.circles;
							return {
								// .get().metrics().within().circles().withID(id)
								withID: function(id) {
									return {
										// .get().metrics().within().circles().withID(id).withGlobals()
										withGlobals: function() {
											object = object.withGlobals.withID[id];
											return sendRequest(context, caching, cache, 'circles/' + id + '/metrics', object);
										},
										// .get().metrics().within().circles().withID(id).withoutGlobals()
										withoutGlobals: function() {
											object = object.withoutGlobals.withID[id];
											return sendRequest(context, caching, cache, 'metrics?circle_id=' + id + '&global=false', object);
										}
									}
								}
							};
						}
					};
				},
				// .get().metrics().globals()
				globals: function() {
					object = object.globals;
					return sendRequest(context, caching, cache, 'metrics?global=true', object);
				},
				// .get().metrics().all()
				all: function() {
					object = object.all;
					return sendRequest(context, caching, cache, 'metrics?global=false', object);
				}
			};
		},
		checklistItems: function() {
			object = object.checklist_items;
			return {
				// .get().checklistItems().withID(id)
				withID: function(id) {
					object = object.withID[id];
					return sendRequest(context, caching, cache, 'checklist_items/' + id, object);
				},
				// .get().checklistItems().within()
				within: function() {
					object = object.within;
					return {
						// .get().checklistItems().within().circles()
						circles: function() {
							object = object.circles;
							return {
								// .get().checklistItems().within().circles().withID(id)
								withID: function(id) {
									return {
										// .get().checklistItems().within().circles().withID(id).withGlobals()
										withGlobals: function() {
											object = object.withGlobals.withID[id];
											return sendRequest(context, caching, cache, 'checklist_items?circle_id=' + id, object);
										},
										// .get().checklistItems().within().circles().withID(id).withoutGlobals()
										withoutGlobals: function() {
											object = object.withoutGlobals.withID[id];
											return sendRequest(context, caching, cache, 'checklist_items?circle_id=' + id + '&global=false', object);
										}
									}
								}
							};
						}
					};
				},
				// .get().checklistItems().globals()
				globals: function() {
					object = object.globals;
					return sendRequest(context, caching, cache, 'checklist_items?global=true', object);
				},
				// .get().checklistItems().all()
				all: function() {
					object = object.all;
					return sendRequest(context, caching, cache, 'checklist_items', object);
				}
			};
		},
		// .get().actions()
		actions: function() {
			object = object.actions;
			return {
				// .get().actions().withID(id)
				withID: function(id) {
					object = object.withID[id];
					return sendRequest(context, caching, cache, 'actions/' + id, object);
				},
				// .get().actions().within()
				within: function() {
					object = object.within;
					return {
						// .get().actions().within().circles()
						circles: function() {
							object = object.circles;
							return {
								// .get().actions().within().circles().withID(id)
								withID: function(id) {
									object = object.withID[id];
									return sendRequest(context, caching, cache, 'actions?circle_id=' + id, object);
								}
							};
						},
						// .get().actions().within().people()
						people: function() {
							object = object.people;
							return {
								// .get().actions().within().people().withID(id)
								withID: function(id) {
									object = object.withID[id];
									return sendRequest(context, caching, cache, 'actions?person_id=' + id, object);
								}
							};
						}
					};
				},
				// .get().actions().createdSince(date)
				createdSince: function(date) {
					object = object.created_since[date];
					return sendRequest(context, caching, cache, 'actions?created_since=' + date, object);
				},
				// .get().actions().all()
				all: function() {
					object = object.all;
					return sendRequest(context, caching, cache, 'actions', object);
				}
			};
		},
		triggers: function() {
			object = object.triggers;
			return {
				// .get().triggers().withID(id)
				withID: function(id) {
					object = object.withID[id];
					return sendRequest(context, caching, cache, 'triggers/' + id, object);
				},
				// .get().triggers().within()
				within: function() {
					object = object.within;
					return {
						// .get().triggers().within().circles()
						circles: function() {
							object = object.circles;
							return {
								// .get().triggers().within().circles().withID(id)
								withID: function(id) {
									object = object.withID[id];
									return sendRequest(context, caching, cache, 'triggers?circle_id=' + id, object);
								}
							};
						},
						// .get().triggers().within().people()
						people: function() {
							object = object.people;
							return {
								// .get().triggers().within().people().withID(id)
								withID: function(id) {
									object = object.withID[id];
									return sendRequest(context, caching, cache, 'triggers?person_id=' + id, object);
								}
							};
						}
					};
				},
				// .get().triggers().createdSince(date)
				createdSince: function(date) {
					object = object.created_since[date];
					return sendRequest(context, caching, cache, 'triggers?created_since=' + date, object);
				},
				// .get().triggers().all()
				all: function() {
					object = object.all;
					return sendRequest(context, caching, cache, 'triggers', object);
				}
			};
		}
	};
}