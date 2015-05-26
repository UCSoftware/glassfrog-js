/**
 * Wrapper for the GlassFrog API.
 *
 * @description :: TODO
 *
 */

var Promise = require('bluebird');
var request = Promise.promisify(require('request'));
var _ = require('underscore');
var _s = require('underscore.string');

var getMethods = require('./GET.js'),
    postMethods = require('./POST.js');

module.exports = function(key, cacheEnabled) {
  return {
    // URL root for GF API.
    root: 'https://glassfrog.holacracy.org/api/v3/',
    // GF API Key, must set before use.
    key: key,
    // cacheEnabled will store local copies of fetched records, default is off.
    cacheEnabled: cacheEnabled || false,
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
    // Convenience method to parse response and body.
    processResponse: function(res, body) {
      // Follow with .then(...).catch(...)
      // Or .spread(...).catch(...)
      if (res.statusCode == 200) {
        if (_s.startsWith(res.headers['content-type'],
                          'application/json')) {
          // Parse the body as a convenience:
          data = JSON.parse(body);
        }

        return [res, data];
      }

      return [res, body];
    },
    // Sends a request to the url specified by this.root + suffix.
    sendGET: function(suffix) {
      var that = this;
      this.setHeaders();

      return request({
        url: this.root + suffix,
        method: 'GET',
        headers: this.header
      }).then().spread(function (res, body) {
        return that.processResponse(res, body);
      });
    },
    // Sends a request to the url specified by this.root + suffix.
    sendPOST: function(suffix, form) {
      var that = this;
      this.setHeaders();

      return request({
        url: this.root + suffix,
        method: 'POST',
        headers: this.header,
        form: form
      }).then().spread(function (res, body) {
        return that.processResponse(res, body);
      });
    },
    // .get()
    get: function(useCache) { return getMethods(this, cacheEnabled, useCache); },
    // .post()
    post: function() { return postMethods(this); }
  };
}
