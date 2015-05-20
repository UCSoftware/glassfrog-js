# GlassFrog.js

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

All complete functions return an object with the *do(callback, error)* method.

*callback* is a function with the form *callback(response)* where **response** is an array with:
* **response[0]** being the entire response
* **response[1]** being the body of the response.

*error* is a function with the form *error(e)* where **e** is an error.

The complete form of a function might look like:

```javascript
gf.find('circles').withID($ID).do(function (response) {
		console.log(JSON.parse(response[1]));
	}, error (e) {
		console.log("There was an " + e);
});
```

### GET

These functions pull data from GlassFrog with GET HTTP requests.

#### General form:

All GET functions begin with the *find* function and specify a **$TYPE**

```javascript
gf.find($TYPE) ...
```

#### Circles (Teams)

##### Get all circles with an ID of **$ID**:

```javascript
gf.find('circles').withID($ID).do(...);
```

##### Get all circles:

```javascript
gf.find('circles').all().do(...);
```

#### Roles

##### Get all roles with an ID of **$ID**:

```javascript
gf.find('roles').withID($ID).do(...);
```

##### Get all roles within some other type of **$TYPE**:

```javascript
gf.find('roles').within($TYPE) ...
```

###### Get all roles within circles with ID of **$ID**:

```javascript
gf.find('roles').within('circles').withID($ID).do(...);
```

###### Get all roles within people with ID of **$ID**:

```javascript
gf.find('roles').within('people').withID($ID).do(...);
```

##### Get all roles:

```javascript
gf.find('roles').all().do(...);
```

#### People

##### Get all people with ID of **$ID**:

```javascript
gf.find('people').withID($ID).do(...);
```

##### Get all people within some other type of **$TYPE**:

```javascript
gf.find('people').within($TYPE) ...
```

###### Get all people within circles with ID of **$ID**:

```javascript
gf.find('people').within('circles').withID($ID).do(...);
```

###### Get all people within roles with name of **'secretary'**:

```javascript
gf.find('people').within('roles').withName('secretary').do(...);
```

###### Get all people within roles with name of **'rep link'** or **'rep_link'**:

```javascript
gf.find('people').within('roles').withName('rep_link').do(...);
```
```javascript
gf.find('people').within('roles').withName('rep link').do(...);
```

###### Get all people within roles with name of **'lead link'** or **'lead_link'**:

```javascript
gf.find('people').within('roles').withName('lead_link').do(...);
```
```javascript
gf.find('people').within('roles').withName('lead link').do(...);
```

###### Get all people within roles with name of **'facilitator'**:

```javascript
gf.find('people').within('roles').withName('facilitator').do(...);
```

##### Get all people:

```javascript
gf.find('people').all().do(...);
```

#### Projects

##### Get all projects with ID of **$ID**:

```javascript
gf.find('projects').withID($ID).do(...);
```

##### Get all projects within some other type of **$TYPE**:

```javascript
gf.find('projects').within($TYPE) ...
```

###### Get all projects within circles with ID of **$ID**:

```javascript
gf.find('projects').within('circles').withID($ID).do(...);
```

##### Get all projects:

```javascript
gf.find('projects').all().do(...);
```

#### Metrics

##### Get all metrics with ID of **$ID**:

```javascript
gf.find('metrics').withID($ID).do(...);
```

##### Get all metrics within some other type of **$TYPE**:

```javascript
gf.find('metrics').within($TYPE) ...
```

###### Get all metrics within circles with ID of **$ID** including global metrics:

```javascript
gf.find('metrics').within('circles').withID($ID).withGlobals().do(...);
```

###### Get all metrics within circles with ID of **$ID** **NOT** including global metrics:

```javascript
gf.find('metrics').within('circles').withID($ID).withoutGlobals().do(...);
```

##### Get all global metrics:

```javascript
gf.find('metrics').globals().do(...);
```

##### Get all metrics:

```javascript
gf.find('metrics').all().do(...);
```

#### Checklist Items:
##### Can be specified as either:
```javascript
gf.find('checklist_items').do(...);
```
##### Or:
```javascript
gf.find('checklist items').do(...);
```

##### Get all checklist items with ID of **$ID**:

```javascript
gf.find('checklist_items').withID($ID).do(...);
```

##### Get all checklist items with some other type of **$TYPE**:

```javascript
gf.find('checklist_items').within($TYPE) ...
```

###### Get all checklist items within circles with ID of **$ID** including global checklist items:

```javascript
gf.find('checklist_items').within('circles').withID($ID).withGlobals().do(...);
```

###### Get all checklist items within circles with ID of **$ID** **NOT** including global checklist items:

```javascript
gf.find('checklist_items').within('circles').withID($ID).withoutGlobals().do(...);
```

##### Get all global checklist items:

```javascript
gf.find('checklist_items').globals().do(...);
```

##### Get all checklist items:

```javascript
gf.find('checklist_items').all().do(...);
```

#### Actions

##### Get all actions with ID of **$ID**:

```javascript
gf.find('actions').withID($ID).do(...);
```

##### Get all actions within some other type of **$TYPE**:

```javascript
gf.find('actions').within($TYPE) ...
```

###### Get all actions within circles with ID of **$ID**:

```javascript
gf.find('actions').within('circles').withID($ID).do(...);
```

###### Get all actions within people with ID of **$ID**:

```javascript
gf.find('actions').within('people').withID($ID).do(...);
```

##### Get all actions created since date of **$DATE**:

```javascript
gf.find('actions').created_since($DATE).do(...);
```

##### Get all actions:

```javascript
gf.find('actions').all().do(...);
```

#### Triggers

##### Get all triggers with ID of **$ID**:

```javascript
gf.find('triggers').withID($ID).do(...);
```

##### Get all triggers within some other type of **$TYPE**:

```javascript
gf.find('triggers').within($TYPE) ...
```

###### Get all triggers within circles with ID of **$ID**:

```javascript
gf.find('triggers').within('circles').withID($ID).do(...);
```

###### Get all triggers within people with ID of **$ID**:

```javascript
gf.find('triggers').within('people').withID($ID).do(...);
```

##### Get all triggers created since date of **$DATE**:

```javascript
gf.find('triggers').created_since($DATE).do(...);
```

##### Get all triggers:

```javascript
gf.find('triggers').all().do(...);
```