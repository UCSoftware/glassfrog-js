var assert = require('assert'),
		should = require('should'),
 GlassFrog = require('../lib/glassfrog');

var randomID = Math.floor(Math.random() * 10000),
	role_names = ['secretary', 'rep link', 'rep_link', 'lead link', 'lead_link', 'facilitator'];

module.exports = function(key) {
	var gf = GlassFrog(key);
	describe('GET', function() {
		this.timeout(0);
		describe('circles', function() {
			describe('withID', function() {
				it('Should return 200 OK or 404 Not Found', function(done) {
					gf.get().circles().withID(randomID).spread(function (response, body) {
						if (response.headers.status === '200 OK' || response.headers.status === '404 Not Found') {
							done();
						} else {
							throw new Error('Not Ok. ' + response.headers.status);
						}
					}).catch(function (error) {
						if (error) throw error;
					});
				});
			});
			describe('all', function() {
				it('Should return 200 OK', function(done) {
					gf.get().circles().all().spread(function (response, body) {
						if (response.headers.status === '200 OK') {
							done();
						} else {
							throw new Error('Not Ok. ' + response.headers.status);
						}
					}).catch(function (error) {
						if (error) throw error;
					});
				});
			});
		});
		describe('roles', function() {
			describe('withID', function() {
				it('Should return 200 OK or 404 Not Found', function(done) {
					gf.get().roles().withID(randomID).spread(function (response, body) {
						if (response.headers.status === '200 OK' || response.headers.status === '404 Not Found') {
							done();
						} else {
							throw new Error('Not Ok. ' + response.headers.status);
						}
					}).catch(function (error) {
						if (error) throw error;
					});
				});
			});
			describe('within', function() {
				describe('circles', function() {
					describe('withID', function() {
						it('Should return 200 OK or 404 Not Found', function(done) {
							gf.get().roles().within().circles().withID(randomID).spread(function (response, body) {
								if (response.headers.status === '200 OK' || response.headers.status === '404 Not Found') {
									done();
								} else {
									throw new Error('Not Ok. ' + response.headers.status);
								}
							}).catch(function (error) {
								if (error) throw error;
							});
						});
					});
				});
				describe('people', function() {
					describe('withID', function() {
						it('Should return 200 OK or 404 Not Found', function(done) {
							gf.get().roles().within().people().withID(randomID).spread(function (response, body) {
								if (response.headers.status === '200 OK' || response.headers.status === '404 Not Found') {
									done();
								} else {
									throw new Error('Not Ok. ' + response.headers.status);
								}
							}).catch(function (error) {
								if (error) throw error;
							});
						});
					});
				});
			});
			describe('all', function() {
				it('Should return 200 OK', function(done) {
					gf.get().roles().all().spread(function (response, body) {
						if (response.headers.status === '200 OK') {
							done();
						} else {
							throw new Error('Not Ok. ' + response.headers.status);
						}
					}).catch(function (error) {
						if (error) throw error;
					});
				});
			});
		});
		describe('people', function() {
			describe('withID', function() {
				it('Should return 200 OK or 404 Not Found', function(done) {
					gf.get().people().withID(randomID).spread(function (response, body) {
						if (response.headers.status === '200 OK' || response.headers.status === '404 Not Found') {
							done();
						} else {
							throw new Error('Not Ok. ' + response.headers.status);
						}
					}).catch(function (error) {
						if (error) throw error;
					});
				});
			});
			describe('within', function() {
				describe('circles', function() {
					describe('withID', function() {
						it('Should return 200 OK or 404 Not Found', function(done) {
							gf.get().people().within().circles().withID(randomID).spread(function (response, body) {
								if (response.headers.status === '200 OK' || response.headers.status === '404 Not Found') {
									done();
								} else {
									throw new Error('Not Ok. ' + response.headers.status);
								}
							}).catch(function (error) {
								if (error) throw error;
							});
						});
					});
				});
				describe('roles', function() {
					describe('withName', function() {
						role_names.forEach(function (name) {
							describe(name, function () {
								it('Should return 200 OK or 404 Not Found', function(done) {
									gf.get().people().within().roles().withName(name).spread(function (response, body) {
										if (response.headers.status === '200 OK' || response.headers.status === '404 Not Found') {
											done();
										} else {
											throw new Error('Not Ok. ' + response.headers.status);
										}
									}).catch(function (error) {
										if (error) throw error;
									});
								});
							});
						});
					});
				});
			});
			describe('all', function() {
				it('Should return 200 OK', function(done) {
					gf.get().people().all().spread(function (response, body) {
						if (response.headers.status === '200 OK') {
							done();
						} else {
							throw new Error('Not Ok. ' + response.headers.status);
						}
					}).catch(function (error) {
						if (error) throw error;
					});
				});
			});
		});
		describe('projects', function() {
			describe('withID', function() {
				it('Should return 200 OK or 404 Not Found', function(done) {
					gf.get().projects().withID(randomID).spread(function (response, body) {
						if (response.headers.status === '200 OK' || response.headers.status === '404 Not Found') {
							done();
						} else {
							throw new Error('Not Ok. ' + response.headers.status);
						}
					}).catch(function (error) {
						if (error) throw error;
					});
				});
			});
			describe('within', function() {
				describe('circles', function() {
					describe('withID', function() {
						it('Should return 200 OK or 404 Not Found', function(done) {
							gf.get().projects().within().circles().withID(randomID).spread(function (response, body) {
								if (response.headers.status === '200 OK' || response.headers.status === '404 Not Found') {
									done();
								} else {
									throw new Error('Not Ok. ' + response.headers.status);
								}
							}).catch(function (error) {
								if (error) throw error;
							});
						});
					});
				});
			});
		});
		describe('metrics', function() {
			describe('withID', function() {
				it('Should return 200 OK or 404 Not Found', function(done) {
					gf.get().metrics().withID(randomID).spread(function (response, body) {
						if (response.headers.status === '200 OK' || response.headers.status === '404 Not Found') {
							done();
						} else {
							throw new Error('Not Ok. ' + response.headers.status);
						}
					}).catch(function (error) {
						if (error) throw error;
					});
				});
			});
			describe('within', function() {
				describe('circles', function() {
					describe('withID', function() {
						describe('withGlobals', function() {
							it('Should return 200 OK or 404 Not Found', function(done) {
								gf.get().metrics().within().circles().withID(randomID).withGlobals().spread(function (response, body) {
									if (response.headers.status === '200 OK' || response.headers.status === '404 Not Found') {
										done();
									} else {
										throw new Error('Not Ok. ' + response.headers.status);
									}
								}).catch(function (error) {
									if (error) throw error;
								});
							});
						});
						describe('withoutGlobals', function() {
							it('Should return 200 OK or 404 Not Found', function(done) {
								gf.get().metrics().within().circles().withID(randomID).withoutGlobals().spread(function (response, body) {
									if (response.headers.status === '200 OK' || response.headers.status === '404 Not Found') {
										done();
									} else {
										throw new Error('Not Ok. ' + response.headers.status);
									}
								}).catch(function (error) {
									if (error) throw error;
								});
							});
						});
					});
				});
			});
			describe('globals', function() {
				it('Should return 200 OK', function(done) {
					gf.get().metrics().globals().spread(function (response, body) {
						if (response.headers.status === '200 OK') {
							done();
						} else {
							throw new Error('Not Ok. ' + response.headers.status);
						}
					}).catch(function (error) {
						if (error) throw error;
					});
				});
			});
			describe('all', function() {
				it('Should return 200 OK', function(done) {
					gf.get().projects().all().spread(function (response, body) {
						if (response.headers.status === '200 OK') {
							done();
						} else {
							throw new Error('Not Ok. ' + response.headers.status);
						}
					}).catch(function (error) {
						if (error) throw error;
					});
				});
			});
		});
		describe('checklistItems', function() {
			describe('withID', function() {
				it('Should return 200 OK or 404 Not Found', function(done) {
					gf.get().checklistItems().withID(randomID).spread(function (response, body) {
						if (response.headers.status === '200 OK' || response.headers.status === '404 Not Found') {
							done();
						} else {
							throw new Error('Not Ok. ' + response.headers.status);
						}
					}).catch(function (error) {
						if (error) throw error;
					});
				});
			});
			describe('within', function() {
				describe('circles', function() {
					describe('withID', function() {
						describe('withGlobals', function() {
							it('Should return 200 OK or 404 Not Found', function(done) {
								gf.get().checklistItems().within().circles().withID(randomID).withGlobals().spread(function (response, body) {
									if (response.headers.status === '200 OK' ||
										response.headers.status === '404 Not Found') {
										done();
									} else {
										throw new Error('Not Ok. ' + response.headers.status);
									}
								}).catch(function (error) {
									if (error) throw error;
								});
							});
						});
						describe('withoutGlobals', function() {
							it('Should return 200 OK or 404 Not Found', function(done) {
								gf.get().checklistItems().within().circles().withID(randomID).withoutGlobals().spread(function (response, body) {
									if (response.headers.status === '200 OK' || response.headers.status === '404 Not Found') {
										done();
									} else {
										throw new Error('Not Ok. ' + response.headers.status);
									}
								}).catch(function (error) {
									if (error) throw error;
								});
							});
						});
					});
				});
			});
			describe('globals', function() {
				it('Should return 200 OK', function(done) {
					gf.get().checklistItems().globals().spread(function (response, body) {
						if (response.headers.status === '200 OK') {
							done();
						} else {
							throw new Error('Not Ok. ' + response.headers.status);
						}
					}).catch(function (error) {
						if (error) throw error;
					});
				});
			});
			describe('all', function() {
				it('Should return 200 OK', function(done) {
					gf.get().checklistItems().all().spread(function (response, body) {
						if (response.headers.status === '200 OK') {
							done();
						} else {
							throw new Error('Not Ok. ' + response.headers.status);
						}
					}).catch(function (error) {
						if (error) throw error;
					});
				});
			});
		});
		describe('actions', function() {
			describe('withID', function() {
				it('Should return 200 OK or 404 Not Found', function(done) {
					gf.get().actions().withID(randomID).spread(function (response, body) {
						if (response.headers.status === '200 OK' || response.headers.status === '404 Not Found') {
							done();
						} else {
							throw new Error('Not Ok. ' + response.headers.status);
						}
					}).catch(function (error) {
						if (error) throw error;
					});
				});
			});
			describe('within', function() {
				describe('circles', function() {
					describe('withID', function() {
						it('Should return 200 OK or 404 Not Found', function(done) {
							gf.get().actions().within().circles().withID(randomID).spread(function (response, body) {
								if (response.headers.status === '200 OK' || response.headers.status === '404 Not Found') {
									done();
								} else {
									throw new Error('Not Ok. ' + response.headers.status);
								}
							}).catch(function (error) {
								if (error) throw error;
							});
						});
					});
				});
				describe('people', function() {
					describe('withID', function() {
						it('Should return 200 OK or 404 Not Found', function(done) {
							gf.get().actions().within().people().withID(randomID).spread(function (response, body) {
								if (response.headers.status === '200 OK' || response.headers.status === '404 Not Found') {
									done();
								} else {
									throw new Error('Not Ok. ' + response.headers.status);
								}
							}).catch(function (error) {
								if (error) throw error;
							});
						});
					});
				});
			});
			describe('createdSince', function() {
				it('Should return 200 OK', function(done) {
					gf.get().actions().createdSince('2000-05-19T07:31:23+00:00').spread(function (response, body) {
						if (response.headers.status === '200 OK') {
							done();
						} else {
							throw new Error('Not Ok. ' + response.headers.status);
						}
					}).catch(function (error) {
						if (error) throw error;
					});
				});
			});
			describe('all', function() {
				it('Should return 200 OK', function(done) {
					gf.get().actions().all().spread(function (response, body) {
						if (response.headers.status === '200 OK') {
							done();
						} else {
							throw new Error('Not Ok. ' + response.headers.status);
						}
					}).catch(function (error) {
						if (error) throw error;
					});
				});
			});
		});
		describe('triggers', function() {
			describe('withID', function() {
				it('Should return 200 OK or 404 Not Found', function(done) {
					gf.get().triggers().withID(randomID).spread(function (response, body) {
						if (response.headers.status === '200 OK' || response.headers.status === '404 Not Found') {
							done();
						} else {
							throw new Error('Not Ok. ' + response.headers.status);
						}
					}).catch(function (error) {
						if (error) throw error;
					});
				});
			});
			describe('within', function() {
				describe('circles', function() {
					describe('withID', function() {
						it('Should return 200 OK or 404 Not Found', function(done) {
							gf.get().triggers().within().circles().withID(randomID).spread(function (response, body) {
								if (response.headers.status === '200 OK' || response.headers.status === '404 Not Found') {
									done();
								} else {
									throw new Error('Not Ok. ' + response.headers.status);
								}
							}).catch(function (error) {
								if (error) throw error;
							});
						});
					});
				});
				describe('people', function() {
					describe('withID', function() {
						it('Should return 200 OK or 404 Not Found', function(done) {
							gf.get().triggers().within().people().withID(randomID).spread(function (response, body) {
								if (response.headers.status === '200 OK' || response.headers.status === '404 Not Found') {
									done();
								} else {
									throw new Error('(Not Ok. ' + response.headers.status);
								}
							}).catch(function (error) {
								if (error) throw error;
							});
						});
					});
				});
			});
			describe('createdSince', function() {
				it('Should return 200 OK', function(done) {
					gf.get().triggers().createdSince('2000-05-19T07:31:23+00:00').spread(function (response, body) {
						if (response.headers.status === '200 OK') {
							done();
						} else {
							throw new Error('Not Ok. ' + response.headers.status);
						}
					}).catch(function (error) {
						if (error) throw error;
					});
				});
			});
			describe('all', function() {
				it('Should return 200 OK', function(done) {
					gf.get().triggers().all().spread(function (response, body) {
						if (response.headers.status === '200 OK') {
							done();
						} else {
							throw new Error('Not Ok. ' + response.headers.status);
						}
					}).catch(function (error) {
						if (error) throw error;
					});
				});
			});
		});
	});
}