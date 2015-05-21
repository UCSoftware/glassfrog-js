# GlassFrog.js - Version: 0.3.0

A Node.js wrapper for the GlassFrog API.

Currently only capable of pulling data from GlassFrog.

## Importing

To import this module:

1. Require the module.
```javascript
var GlassFrog = require('glassfrog');
```

2. Pass your API Key to the function that is imported.
```javascript
var gf = GlassFrog($YOUR_API_KEY);
```

## Functions

All complete query functions return an object with the *then(callback)* method.

*callback* is a function with the form *callback(response)* where **response** is an array with:
* **response[0]** being the entire response.
* **response[1]** being the body of the response.

*then(callback)* then returns an object with the *catch(error)* method.

*catch* is a function with the form *catch(error)* where **error** is an error.

The complete form of a function might look like:

```javascript
gf.get().circles().withID($ID).then(function (response) {
		console.log(JSON.parse(response[1]));
	}).catch(function (error) {
		console.log("There was an " + error);
});
```

### [GET](/docs/GET.md)

These functions pull data from GlassFrog with GET HTTP requests.

### [POST](docs/POST.md)

These function push data to GlassFrog and create new objects with POST HTTP requests.