var local = require('./cache.js');

function sendRequest(context, caching, cache, suffix, object, key) {
	if (caching) {
		if (cache) {
			object[key] = object[key] || context.sendGET(suffix);
			return object[key];
		} else {
			object[key] = context.sendGET(suffix);
			return object[key];
		}
	} else {
		if (cache) throw new Error('Caching is not turned on!');
		return context.sendGET(suffix);
	}
}

// .get()
module.exports = function (context, caching, cache) {
	var object = local;
	return {
		circles: function() {
			object = object.circles;
			return {
				// .get().circles().withID(id)
				withID: function(id) {
					object = object.withID;
					return sendRequest(context, caching, cache, 'circles/' + id, object, id);
				},
				// .get().circles().all()
				all: function() {
					return sendRequest(context, caching, cache, 'circles', object, 'all');
				}
			};
		},
		roles: function() {
			object = object.roles;
			return {
				// .get().roles().withID(id)
				withID: function(id) {
					object = object.withID;
					return sendRequest(context, caching, cache, 'roles/' + id, object, id);
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
									object = object.withID;
									return sendRequest(context, caching, cache, 'circles/' + id + '/roles', object, id);
								}
							};
						},
						// .get().roles().within().people()
						people: function() {
							object = object.people;
							return {
								// .get().roles().within().people().withID(id)
								withID: function(id) {
									object = object.withID;
									return sendRequest(context, caching, cache, 'roles?person_id=' + id, object, id);
								}
							}
						}
					}
				},
				// .get().roles().all()
				all: function() {
					return sendRequest(context, caching, cache, 'roles', object, 'all');
				}
			};
		},
		people: function() {
			object = object.people;
			return {
				// .get().people().withID(id)
				withID: function(id) {
					object = object.withID;
					return sendRequest(context, caching, cache, 'people/' + id, object, id);
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
									object = object.withID;
									return sendRequest(context, caching, cache, 'circles/' + id + '/people', object, id);
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
												return sendRequest(context, caching, cache, 'people?role=secretary', object, 'secretary');
												break;
											// .get().people().within().roles().withName('rep_link')
											case 'rep_link':
											// .get().people().within().roles().withName('rep link')
											case 'rep link':
												return sendRequest(context, caching, cache, 'people?role=rep_link', object, 'rep_link');
												break;
											// .get().people().within().roles().withName('lead_link')
											case 'lead_link':
											// .get().people().within().roles().withName('lead link')
											case 'lead link':
												return sendRequest(context, caching, cache, 'people?role=lead_link', object, 'lead_link');
												break;
											// .get().people().within().roles().withName('facilitator')
											case 'facilitator':
												return sendRequest(context, caching, cache, 'people?role=facilitator', object, 'facilitator');
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
					return sendRequest(context, caching, cache, 'people', object, 'all');
				}
			};
		},
		projects: function() {
			object = object.projects;
			return {
				// .get().projects().withID(id)
				withID: function(id) {
					object = object.withID;
					return sendRequest(context, caching, cache, 'projects/' + id, object, id);
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
									object = object;
									return sendRequest(context, caching, cache, 'projects?circle_id=' + id, object, id);
								}
							};
						}
					};
				},
				// .get().projects().all()
				all: function() {
					return sendRequest(context, caching, cache, 'projects', object, 'all');
				}
			};
		},
		metrics: function() {
			object = object.metrics;
			return {
				// .get().metrics().withID(id)
				withID: function(id) {
					object = object.withID;
					return sendRequest(context, caching, cache, 'metrics/' + id, object, id);
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
											object = object.withGlobals.withID;
											return sendRequest(context, caching, cache, 'circles/' + id + '/metrics', object, id);
										},
										// .get().metrics().within().circles().withID(id).withoutGlobals()
										withoutGlobals: function() {
											object = object.withoutGlobals.withID;
											return sendRequest(context, caching, cache, 'metrics?circle_id=' + id + '&global=false', object, id);
										}
									}
								}
							};
						}
					};
				},
				// .get().metrics().globals()
				globals: function() {
					return sendRequest(context, caching, cache, 'metrics?global=true', object, 'globals');
				},
				// .get().metrics().all()
				all: function() {
					return sendRequest(context, caching, cache, 'metrics?global=false', object, 'all');
				}
			};
		},
		checklistItems: function() {
			object = object.checklist_items;
			return {
				// .get().checklistItems().withID(id)
				withID: function(id) {
					object = object.withID;
					return sendRequest(context, caching, cache, 'checklist_items/' + id, object, id);
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
											object = object.withGlobals.withID;
											return sendRequest(context, caching, cache, 'checklist_items?circle_id=' + id, object, id);
										},
										// .get().checklistItems().within().circles().withID(id).withoutGlobals()
										withoutGlobals: function() {
											object = object.withoutGlobals.withID;
											return sendRequest(context, caching, cache, 'checklist_items?circle_id=' + id + '&global=false', object, id);
										}
									}
								}
							};
						}
					};
				},
				// .get().checklistItems().globals()
				globals: function() {
					return sendRequest(context, caching, cache, 'checklist_items?global=true', object, 'globals');
				},
				// .get().checklistItems().all()
				all: function() {
					return sendRequest(context, caching, cache, 'checklist_items', object, 'all');
				}
			};
		},
		// .get().actions()
		actions: function() {
			object = object.actions;
			return {
				// .get().actions().withID(id)
				withID: function(id) {
					object = object.withID;
					return sendRequest(context, caching, cache, 'actions/' + id, object, id);
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
									object = object.withID;
									return sendRequest(context, caching, cache, 'actions?circle_id=' + id, object, id);
								}
							};
						},
						// .get().actions().within().people()
						people: function() {
							object = object.people;
							return {
								// .get().actions().within().people().withID(id)
								withID: function(id) {
									object = object.withID;
									return sendRequest(context, caching, cache, 'actions?person_id=' + id, object, id);
								}
							};
						}
					};
				},
				// .get().actions().createdSince(date)
				createdSince: function(date) {
					object = object.created_since;
					return sendRequest(context, caching, cache, 'actions?created_since=' + date, object, date);
				},
				// .get().actions().all()
				all: function() {
					return sendRequest(context, caching, cache, 'actions', object, 'all');
				}
			};
		},
		triggers: function() {
			object = object.triggers;
			return {
				// .get().triggers().withID(id)
				withID: function(id) {
					object = object.withID;
					return sendRequest(context, caching, cache, 'triggers/' + id, object, id);
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
									object = object.withID;
									return sendRequest(context, caching, cache, 'triggers?circle_id=' + id, object, id);
								}
							};
						},
						// .get().triggers().within().people()
						people: function() {
							object = object.people;
							return {
								// .get().triggers().within().people().withID(id)
								withID: function(id) {
									object = object.withID;
									return sendRequest(context, caching, cache, 'triggers?person_id=' + id, object, id);
								}
							};
						}
					};
				},
				// .get().triggers().createdSince(date)
				createdSince: function(date) {
					object = object.created_since;
					return sendRequest(context, caching, cache, 'triggers?created_since=' + date, object, date);
				},
				// .get().triggers().all()
				all: function() {
					return sendRequest(context, caching, cache, 'triggers', object, 'all');
				}
			};
		}
	};
}