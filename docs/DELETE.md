# POST

These functions delete existing data on GlassFrog with DELETE HTTP requests.

They are only available for People, Projects, Metrics, and Checklist Items.

### General form:

All DELETE functions begin with the *delete* function.

```javascript
gf.delete() ...
```

## People

Deletes a person on GlassFrog with the id of **$ID**:

```javascript
gf.delete().people().withID($ID).then(...).catch(...);
```

## Projects

Deletes a project on GlassFrog with the id of **$ID**:

```javascript
gf.delete().project().withID($ID).then(...).catch(...);
```

## Metrics

Deletes a metric on GlassFrog with the id of **$ID**:

```javascript
gf.delete().metrics().withID($ID).then(...).catch(...);
```

## Checklist Items

Deletes a checklist item on GlassFrog with the id of **$ID**:

```javascript
gf.delete().checklistItems().withID($ID).then(...).catch(...);
```