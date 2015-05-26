# PATCH

These functions modify existing data on GlassFrog with PATCH HTTP requests.

They are only available for Roles, People, Projects, Metrics, and Checklist Items.

### General form:

All PATCH functions begin with the *patch* function.

```javascript
gf.patch() ...
```

## Roles

Assigns a role with the id of $ROLEID to a person with the id of $PERSONID:

```javascript
gf.patch().roles().withID($ROLEID).add().to().people().withID($PERSONID).then(...).catch(...);
```

Removes a role with the id of $ROLEID from a person with the id of $PERSONID:

```javascript
gf.patch().roles().withID($ROLEID).remove().from().people().withID($PERSONID).then(...).catch(...);
```

## People

Updates a person with the id of $ID in GlassFrog with the new attributes of **$ATTRIBUTES**:

```javascript
gf.patch().people().withID($ID).change($ATTRIBUTES).then(...).catch(...);
```

###### $ATTRIBUTES should take the form of:

```javascript
{ 
  "name": "Sally Benally", 
  "email": "sally@example.com" 
}
```

## Projects

Updates a project with the id of $ID in GlassFrog with the new attributes of **$ATTRIBUTES**:

```javascript
gf.patch().projects().withID($ID).change($ATTRIBUTES).then(...).catch(...);
```

###### $ATTRIBUTES should take the form of:

```javascript
{ 
  "description": "API docs updated", 
  "circle_id": 346, 
  "role_id": 2331 
}
```

Changes the status of a project to *archived*:

```javascript
gf.patch().projects().withID($ID).archive().then(...).catch(...);
```

## Metrics

Updates a metric with the id of $ID in GlassFrog with the new attributes of **$ATTRIBUTES**:

```javascript
gf.patch().metrics().withID($ID).change($ATTRIBUTES).then(...).catch(...);
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

Updates a checklist item with the id of $ID in GlassFrog with the new attributes of **$ATTRIBUTES**:

```javascript
gf.patch().checklistItems().withID($ID).change($ATTRIBUTES).then(...).catch(...);
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
