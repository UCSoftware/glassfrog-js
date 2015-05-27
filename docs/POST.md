# POST

These functions push data to GlassFrog and create new objects with POST HTTP requests.

They return a JSON with the copy of the object that was created in the body.

They are only available for People, Projects, Metrics, and Checklist Items.

Some of these functions also require an API Key belong to an administrator.

### General form:

All POST functions begin with the *post* function.

```javascript
gf.post() ...
```

## People

Create a new person in GlassFrog with the attributes of **$ATTRIBUTES**:

###### Requires an admin API Key.

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

###### Requires an admin API Key to add projects to circles one does not belong to.

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

###### Requires an admin API Key to create global metrics. Members may create metrics for roles they fill.

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

###### Requires an admin API Key to create global items. Lead Links, Secretaries, or Rep Links can create items for their circle. Members may create items for roles they fill.

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
