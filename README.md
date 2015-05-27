# GlassFrog.js - Version: 0.5.1

A Node.js wrapper for the GlassFrog® API.

## Importing & Initialization
Written with ♡ by your friends at [Undercurrent](http://www.undercurrent.com).

To import this module:

1) Require the module.
```javascript
var GlassFrog = require('glassfrog');
```

2) Pass your API Key to the function that is imported.
```javascript
var gf = GlassFrog(YOUR_API_KEY);
```

Optionally, you may also specify the `caching` flag. If set to `true`
fetched API data will be stored locally. The `get()` method (documented
below) allows you to specify if you want to attempt to retrieve data
instantaneously from the local cache or from the GlassFrog server.

The cache can dramatically speed up some of the organizational graph
traversal methods.

By default, caching is disabled. Turn it on by setting `caching` to
`true`:

```javascript
var gf = GlassFrog(YOUR_API_KEY, true);
```

For more information [see](file:./docs/module-glassfrog.html).

## Usage

This library follows the [Promise pattern]( https://github.com/petkaantonov/bluebird/blob/master/API.md).

A method that returns a Promise should be processed with either
`then(callback)` or `spread(callback)`. It is also strongly recommended
that you add a `catch(callback)` to gather any thrown exceptions.

The `then(callback)` accepts a function taking a single parameter of
the form `callback(response)` where `response` is an array with:

* `response[0]` being the entire response.
* `response[1]` being the body of the response.

`catch` is a function with the form `catch(error)` where `error` is
an error object.

The complete form of a function might look like:

```javascript
gf.get().circles().withID($ID).then(function (response) {
	console.log(JSON.parse(response[1]));
}).catch(function (error) {
	console.log("There was an " + error);
});
```

Alternatively you can call the `spread(callback)` function to make the parameters more readable:

```javascript
gf.get().circles().withID($ID).spread(function (response, data) {
	console.log(data);
}).catch(function(error) {
	console.log("There was an " + error);
});
```
Note that `data` will automatically be parsed into an object for you if
the call to the GlassFrog API was successful

## [GET](file:./docs/get.html)

These functions pull data from GlassFrog with GET HTTP requests.

## [POST](file:./docs/post.html)

These functions push data to GlassFrog and create new objects with POST HTTP requests.

## [PATCH](file:./docs/patch.html)

These functions modify existing data on GlassFrog with PATCH HTTP requests.

## [DELETE](file:./docs/delete.html)

These functions delete existing data on GlassFrog with DELETE HTTP requests.

## Authors

This software has been authored in part by:

   * Robert Wells <robert.wells@quirkyinc.com>
   * Jordan Husney <jordan.husney@quirkyinc.com>

## License

Copyright [2015] [Undercurrent LLC]

Licensed under the Apache License, Version 2.0 (the "License");
you may not use this file except in compliance with the License.
You may obtain a copy of the License at

    http://www.apache.org/licenses/LICENSE-2.0

Unless required by applicable law or agreed to in writing, software
distributed under the License is distributed on an "AS IS" BASIS,
WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
See the License for the specific language governing permissions and
limitations under the License.
