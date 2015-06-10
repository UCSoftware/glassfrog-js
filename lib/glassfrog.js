/**
 * NodeJS module wrapper for the GlassFrog API.
 *
 * Initialize the module by:
 *
 * ```javascript
 * var gf = GlassFrog(YOUR_API_KEY, true);
 * ```
 *
 * Module functionality is exposed by the `get()` and `post()`
 * and `patch()` methods exposed by an instance of this module.
 *
 * All methods follow the Promise pattern. For example:
 *
 * ```javascript
 * gf.get().circles().all().spread(function (response, data) {
 *   console.log(data);
 * }).catch(function(error) {
 *   console.log("There was an " + error);
 * });
 * ```
 *
 * Refer to:
 *
 *    * {@link get}
 *    * {@link post}
 *    * {@link patch}
 *    * {@link delete}
 *
 * @module glassfrog
 * @param {string} key Your GlassFrog API key.
 * @param {boolean} options.caching Enable local caching of GET API results.
 * @param {boolean} options.persistence Retry all GET requests that result in 403 Forbidden responses 
                                           until successful (or a non-403 header).
 * @see {@link https://github.com/petkaantonov/bluebird/blob/master/API.md}
 */

var Promise = require('bluebird');
var request = Promise.promisify(require('request'));
var _ = require('underscore');
var _s = require('underscore.string');

var getMethods = require('./GET.js'),
   postMethods = require('./POST.js'),
  patchMethods = require('./PATCH.js'),
 deleteMethods = require('./DELETE.js');

module.exports = function(key, options) {
  return {
    // URL root for GF API.
    root: 'https://glassfrog.holacracy.org/api/v3/',
    // GF API Key, must set before use.
    key: key,
    // cacheEnabled will store local copies of fetched records, default is off.
    cacheEnabled: (options && options.caching) || false,
    // persistEnabled will ignore 403 Forbidden responses on GET requests and retry until non-403 response.
    persistEnabled: (options && options.persistence) || false,
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
        if (that.persistEnabled && res.headers.status === "403 Forbidden") {
          return setTimeout(function() {
            console.log("403 Forbidden - Persistence Enabled, Retrying...");
            return that.sendGET(suffix);
          }, 5000);
        } else {
          return that.processResponse(res, body);
        }
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
    // Sends a request to the url specified by this.root + suffix.
    sendPATCH: function(suffix, form) {
      var that = this;
      this.setHeaders();

      return request({
        url: this.root + suffix,
        method: 'PATCH',
        headers: this.header,
        form: form
      }).then().spread(function (res, body) {
        return that.processResponse(res, body);
      });
    },
    // Sends a request to the url specified by this.root + suffix.
    sendDELETE: function(suffix) {
      var that = this;
      this.setHeaders();

      return request({
        url: this.root + suffix,
        method: 'DELETE',
        headers: this.header
      }).then().spread(function (res, body) {
        return that.processResponse(res, body);
      });
    },
    // .get(), see: GET.js
    get: function(useCache) { return getMethods(this, this.cacheEnabled, useCache); },
    // .post(), see: POST.js
    post: function() { return postMethods(this); },
    // .patch(), see: PATCH.js
    patch: function() { return patchMethods(this); },
    // .delete(), see: DELETE.js
    delete: function() { return deleteMethods(this); }
  };
}
