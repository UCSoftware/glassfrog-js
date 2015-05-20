# GlassFrog.js - Version: 0.2.1

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
gf.find('circles').withID($ID).then(function (response) {
		console.log(JSON.parse(response[1]));
	}).catch(function (error) {
		console.log("There was an " + error);
});
```

### GET

These functions pull data from GlassFrog with GET HTTP requests.

#### General form:

All GET functions begin with the *find* function and specify a **$TYPE**

```javascript
gf.find($TYPE) ...
```

#### Circles

##### Get all circles with an ID of **$ID**:

```javascript
gf.find('circles').withID($ID).then(...).catch(...);
```

##### Get all circles:

```javascript
gf.find('circles').all().then(...).catch(...);
```

#### Roles

##### Get all roles with an ID of **$ID**:

```javascript
gf.find('roles').withID($ID).then(...).catch(...);
```

##### Get all roles within some other type of **$TYPE**:

```javascript
gf.find('roles').within($TYPE) ...
```

###### Get all roles within circles with ID of **$ID**:

```javascript
gf.find('roles').within('circles').withID($ID).then(...).catch(...);
```

###### Get all roles within people with ID of **$ID**:

```javascript
gf.find('roles').within('people').withID($ID).then(...).catch(...);
```

##### Get all roles:

```javascript
gf.find('roles').all().then(...).catch(...);
```

#### People

##### Get all people with ID of **$ID**:

```javascript
gf.find('people').withID($ID).then(...).catch(...);
```

##### Get all people within some other type of **$TYPE**:

```javascript
gf.find('people').within($TYPE) ...
```

###### Get all people within circles with ID of **$ID**:

```javascript
gf.find('people').within('circles').withID($ID).then(...).catch(...);
```

###### Get all people within roles with name of **'secretary'**:

```javascript
gf.find('people').within('roles').withName('secretary').then(...).catch(...);
```

###### Get all people within roles with name of **'rep link'** or **'rep_link'**:

```javascript
gf.find('people').within('roles').withName('rep_link').then(...).catch(...);
```
```javascript
gf.find('people').within('roles').withName('rep link').then(...).catch(...);
```

###### Get all people within roles with name of **'lead link'** or **'lead_link'**:

```javascript
gf.find('people').within('roles').withName('lead_link').then(...).catch(...);
```
```javascript
gf.find('people').within('roles').withName('lead link').then(...).catch(...);
```

###### Get all people within roles with name of **'facilitator'**:

```javascript
gf.find('people').within('roles').withName('facilitator').then(...).catch(...);
```

##### Get all people:

```javascript
gf.find('people').all().then(...).catch(...);
```

#### Projects

##### Get all projects with ID of **$ID**:

```javascript
gf.find('projects').withID($ID).then(...).catch(...);
```

##### Get all projects within some other type of **$TYPE**:

```javascript
gf.find('projects').within($TYPE) ...
```

###### Get all projects within circles with ID of **$ID**:

```javascript
gf.find('projects').within('circles').withID($ID).then(...).catch(...);
```

##### Get all projects:

```javascript
gf.find('projects').all().then(...).catch(...);
```

#### Metrics

##### Get all metrics with ID of **$ID**:

```javascript
gf.find('metrics').withID($ID).then(...).catch(...);
```

##### Get all metrics within some other type of **$TYPE**:

```javascript
gf.find('metrics').within($TYPE) ...
```

###### Get all metrics within circles with ID of **$ID** including global metrics:

```javascript
gf.find('metrics').within('circles').withID($ID).withGlobals().then(...).catch(...);
```

###### Get all metrics within circles with ID of **$ID** **NOT** including global metrics:

```javascript
gf.find('metrics').within('circles').withID($ID).withoutGlobals().then(...).catch(...);
```

##### Get all global metrics:

```javascript
gf.find('metrics').globals().then(...).catch(...);
```

##### Get all metrics:

```javascript
gf.find('metrics').all().then(...).catch(...);
```

#### Checklist Items:
##### Can be specified as either:
```javascript
gf.find('checklist_items').then(...).catch(...);
```
##### Or:
```javascript
gf.find('checklist items').then(...).catch(...);
```

##### Get all checklist items with ID of **$ID**:

```javascript
gf.find('checklist_items').withID($ID).then(...).catch(...);
```

##### Get all checklist items with some other type of **$TYPE**:

```javascript
gf.find('checklist_items').within($TYPE) ...
```

###### Get all checklist items within circles with ID of **$ID** including global checklist items:

```javascript
gf.find('checklist_items').within('circles').withID($ID).withGlobals().then(...).catch(...);
```

###### Get all checklist items within circles with ID of **$ID** **NOT** including global checklist items:

```javascript
gf.find('checklist_items').within('circles').withID($ID).withoutGlobals().then(...).catch(...);
```

##### Get all global checklist items:

```javascript
gf.find('checklist_items').globals().then(...).catch(...);
```

##### Get all checklist items:

```javascript
gf.find('checklist_items').all().then(...).catch(...);
```

#### Actions

##### Get all actions with ID of **$ID**:

```javascript
gf.find('actions').withID($ID).then(...).catch(...);
```

##### Get all actions within some other type of **$TYPE**:

```javascript
gf.find('actions').within($TYPE) ...
```

###### Get all actions within circles with ID of **$ID**:

```javascript
gf.find('actions').within('circles').withID($ID).then(...).catch(...);
```

###### Get all actions within people with ID of **$ID**:

```javascript
gf.find('actions').within('people').withID($ID).then(...).catch(...);
```

##### Get all actions created since date of **$DATE**:

```javascript
gf.find('actions').created_since($DATE).then(...).catch(...);
```

##### Get all actions:

```javascript
gf.find('actions').all().then(...).catch(...);
```

#### Triggers

##### Get all triggers with ID of **$ID**:

```javascript
gf.find('triggers').withID($ID).then(...).catch(...);
```

##### Get all triggers within some other type of **$TYPE**:

```javascript
gf.find('triggers').within($TYPE) ...
```

###### Get all triggers within circles with ID of **$ID**:

```javascript
gf.find('triggers').within('circles').withID($ID).then(...).catch(...);
```

###### Get all triggers within people with ID of **$ID**:

```javascript
gf.find('triggers').within('people').withID($ID).then(...).catch(...);
```

##### Get all triggers created since date of **$DATE**:

```javascript
gf.find('triggers').created_since($DATE).then(...).catch(...);
```

##### Get all triggers:

```javascript
gf.find('triggers').all().then(...).catch(...);
```