/**
 * Wrapper for the GlassFrog API.
 *
 * @description :: TODO
 *
 */

var Promise = require('bluebird');
var request = Promise.promisify(require('request'));

var getMethods = require('./GET.js'),
	 postMethods = require('./POST.js');

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
			return getMethods(this);
		},
		// .post()
		post: function() {
			return postMethods(this);
		}
	};
}
