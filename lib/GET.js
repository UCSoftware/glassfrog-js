var allCache = {};

function checkCache (cache, type, id) {
	
}

module.exports = function (context) {
	return {
		circles: function() {
			return {
				// .get().circles().withID(id)
				withID: function(id) {
					return context.sendGET('circles/' + id);
				},
				// .get().circles().all()
				all: function() {
					return context.sendGET('circles');
				}
			};
		},
		roles: function() {
			return {
				// .get().roles().withID(id)
				withID: function(id) {
					return context.sendGET('roles/' + id);
				},
				// .get().roles().within()
				within: function() {
					return {
						// .get.roles().within().circles()
						circles: function() {
							return {
								// .get().roles().within().circles().withID(id)
								withID: function(id) {
									return context.sendGET('circles/' + id + '/roles');
								}
							};
						},
						// .get().roles().within().people()
						people: function() {
							return {
								// .get().roles().within().people().withID(id)
								withID: function(id) {
									return context.sendGET('roles?person_id=' + id);
								}
							}
						}
					}
				},
				// .get().roles().all()
				all: function(cache) {
					cache = typeof cache !== 'undefined' ? cache : false;
					if (cache && typeof allCache['roles'] != 'undefined') {
						// use cache:
						return allCache['roles'];
					}
					// update cache:
					allCache['roles'] = context.sendGET('roles');
					return allCache['roles'];
				}
			};
		},
		people: function() {
			return {
				// .get().people().withID(id)
				withID: function(id) {
					return context.sendGET('people/' + id);
				},
				// .get().people().within()
				within: function() {
					return {
						circles: function() {
							return {
								// .get().people().within().circles().withID(id)
								withID: function(id) {
									return context.sendGET('circles/' + id + '/people');
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
												return context.sendGET('people?role=secretary');
												break;
											// .get().people().within().roles().withName('rep_link')
											case 'rep_link':
											// .get().people().within().roles().withName('rep link')
											case 'rep link':
												return context.sendGET('people?role=rep_link');
												break;
											// .get().people().within().roles().withName('lead_link')
											case 'lead_link':
											// .get().people().within().roles().withName('lead link')
											case 'lead link':
												return context.sendGET('people?role=lead_link');
												break;
											// .get().people().within().roles().withName('facilitator')
											case 'facilitator':
												return context.sendGET('people?role=facilitator');
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
					return context.sendGET('people');
				}
			};
		},
		projects: function() {
			return {
				// .get().projects().withID(id)
				withID: function(id) {
					return context.sendGET('projects/' + id);
				},
				// .get().projects().within()
				within: function() {
					return {
						// .get().projects().within().circles()
						circles: function() {
							return {
								// .get().projects().within().circles().withID(id)
								withID: function(id) {
									return context.sendGET('projects?circle_id=' + id);
								}
							};
						}
					};
				},
				// .get().projects().all()
				all: function() {
					return context.sendGET('projects');
				}
			};
		},
		metrics: function() {
				return {
				// .get().metrics().withID(id)
				withID: function(id) {
					return context.sendGET('metrics/' + id);
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
											return context.sendGET('circles/' + id + '/metrics');
										},
										// .get().metrics().within().circles().withID(id).withoutGlobals()
										withoutGlobals: function() {
											return context.sendGET('metrics?circle_id=' + id + '&global=false');
										}
									}
								}
							};
						}
					};
				},
				// .get().metrics().globals()
				globals: function() {
					return context.sendGET('metrics?global=true');
				},
				// .get().metrics().all()
				all: function() {
					return context.sendGET('metrics?global=false');
				}
			};
		},
		checklistItems: function() {
			return {
				// .get().checklistItems().withID(id)
				withID: function(id) {
					return context.sendGET('checklist_items/' + id);
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
											return context.sendGET('checklist_items?circle_id=' + id);
										},
										// .get().checklistItems().within().circles().withID(id).withoutGlobals()
										withoutGlobals: function() {
											return context.sendGET('checklist_items?circle_id=' + id + '&global=false');
										}
									}
								}
							};
						}
					};
				},
				// .get().checklistItems().globals()
				globals: function() {
					return context.sendGET('checklist_items?global=true');
				},
				// .get().checklistItems().all()
				all: function() {
					return context.sendGET('checklist_items');
				}
			};
		},
		// .get().actions()
		actions: function() {
			return {
				// .get().actions().withID(id)
				withID: function(id) {
					return context.sendGET('actions/' + id);
				},
				// .get().actions().within()
				within: function() {
					return {
						// .get().actions().within().circles()
						circles: function() {
							return {
								// .get().actions().within().circles().withID(id)
								withID: function(id) {
									return context.sendGET('actions?circle_id=' + id);
								}
							};
						},
						// .get().actions().within().people()
						people: function() {
							return {
								// .get().actions().within().people().withID(id)
								withID: function(id) {
									return context.sendGET('actions?person_id=' + id);
								}
							};
						}
					};
				},
				// .get().actions().createdSince(date)
				createdSince: function(date) {
					return context.sendGET('actions?created_since=' + date);
				},
				// .get().actions().all()
				all: function() {
					return context.sendGET('actions');
				}
			};
		},
		triggers: function() {
			return {
				// .get().triggers().withID(id)
				withID: function(id) {
					return context.sendGET('triggers/' + id);
				},
				// .get().triggers().within()
				within: function() {
					return {
						// .get().triggers().within().circles()
						circles: function() {
							return {
								// .get().triggers().within().circles().withID(id)
								withID: function(id) {
									return context.sendGET('triggers?circle_id=' + id);
								}
							};
						},
						// .get().triggers().within().people()
						people: function() {
							return {
								// .get().triggers().within().people().withID(id)
								withID: function(id) {
									return context.sendGET('triggers?person_id=' + id);
								}
							};
						}
					};
				},
				// .get().triggers().createdSince(date)
				createdSince: function(date) {
					return context.sendGET('triggers?created_since=' + date);
				},
				// .get().triggers().all()
				all: function() {
					return context.sendGET('triggers');
				}
			};
		}
	};
}