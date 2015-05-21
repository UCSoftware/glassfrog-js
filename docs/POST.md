### POST

These functions push data to GlassFrog and create new objects with POST HTTP requests.

They return a JSON with the copy of the object that was created in the body.

They are only available for People, Projects, Metrics, and Checklist Items.

These functions also require an API Key belong to an administrator.

### General form:

All POST functions begin with the *post* function.

```javascript
gf.post() ...
```

## People

Create a new person in GlassFrog with the attributes of **$ATTRIBUTES**:

```javascript
gf.post().circles($ATTRIBUTES).then(...).catch(...);
```

###### $ATTRIBUTES should take the form of:

```javascript
{ 
	"name": "Sally Benally", 
	"email": "sally@example.com" 
}
```

**name** and **email** are required fields.

## Projects

Creates a new project in GlassFrog with the attributes of **$ATTRIBUTES**

```javascript
gf.post().projects($ATTRIBUTES).then(...).catch(...);
```

###### $ATTRIBUTES should take the form of:

```javascript
{ 
	"description": "API docs updated", 
	"circle_id": 346, 
	"role_id": 2331 
}
```

## Metrics

Create a new metric in GlassFrog with the attributes of **$ATTRIBUTES**:

```javascript
gf.post().metrics($ATTRIBUTES).then(...).catch(...);
```

###### $ATTRIBUTES should take the form of:

```javascript
{
	"description": "A New Metric", 
	"frequency": "Weekly", 
	"circle_id": 856843816, 
	"role_id": 905502603
}
```

## Checklist Item

Create a new checklist item in GlassFrog with the attributes of **$ATTRIBUTES**:

```javascript
gf.post().checklistItems($ATTRIBUTES).then(...).catch(...);
```

###### $ATTRIBUTES should take the form of:

```javascript
{
	"description": "A New Item", 
	"frequency": "Weekly", 
	"circle_id": 856843816, 
	"role_id": 905502603
}
```
