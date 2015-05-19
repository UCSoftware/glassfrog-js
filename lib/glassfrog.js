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
	 	// Based on the options passed to teams, returns circle data from GF.
		teams: function(options) {
			if (options) {
				if (options.id) {
					this.sendRequest('circles/' + options.id);
				} else if (options.members) {
					this.sendRequest('circles?include=members');
				} else {
					throw "Bad options.";
				}
			} else {
				this.sendRequest('circles');
			}
		},
		// Based on the options passed to souls, returns people data from GF.
		souls: function(options) {
			if (options) {
				if (options.id) {
					this.sendRequest('people/' + options.id);
				} else if (options.circle) {
					this.sendRequest('people?circle_id=' + options.circle);
				} else if (options.role) {
					this.sendRequest('people?role=' + options.role);
				} else {
					throw "Bad options.";
				}
			} else {
				this.sendRequest('people');
			}
		},
		// Based on the options passed to roles, returns role data from GF.
		roles: function(options) {
			if (options) {
				if (options.id) {
					this.sendRequest('roles/' + options.id);
				} else if (this.person) {
					this.sendRequest('roles?person_id=' + options.role);
				} else if (this.circle) {
					this.sendRequest('roles?circle_id=' + options.circle);
				} else {
					throw "Bad options.";
				}
			} else {
				this.sendRequest('roles');
			}
		}
	}
}
