# GET

These functions pull data from GlassFrog with GET HTTP requests.

### General form:

All GET functions begin with the *get* function.

```javascript
gf.get() ...
```

## Circles

Get all circles with an ID of **$ID**:

```javascript
gf.get().circles().withID($ID).then(...).catch(...);
```

Get all circles:

```javascript
gf.get().circles().all().then(...).catch(...);
```

## Roles

Get all roles with an ID of **$ID**:

```javascript
gf.get().roles().withID($ID).then(...).catch(...);
```

Get all roles within some other type:

```javascript
gf.get().roles().within() ...
```

 Get all roles within circles with ID of **$ID**:

```javascript
gf.get().roles().within().circles().withID($ID).then(...).catch(...);
```

Get all roles within people with ID of **$ID**:

```javascript
gf.get().roles().within().people().withID($ID).then(...).catch(...);
```

Get all roles:

```javascript
gf.get().roles().all().then(...).catch(...);
```

## People

Get all people with ID of **$ID**:

```javascript
gf.get().people().withID($ID).then(...).catch(...);
```

Get all people within some other type:

```javascript
gf.get().people().within() ...
```

Get all people within circles with ID of **$ID**:

```javascript
gf.get().people().within().circles().withID($ID).then(...).catch(...);
```

Get all people within roles with name of **'secretary'**:

```javascript
gf.get().people().within().roles().withName('secretary').then(...).catch(...);
```

Get all people within roles with name of **'rep link'** or **'rep_link'**:

```javascript
gf.get().people().within().roles().withName('rep_link').then(...).catch(...);
```
```javascript
gf.get().people().within().roles().withName('rep link').then(...).catch(...);
```

Get all people within roles with name of **'lead link'** or **'lead_link'**:

```javascript
gf.get().people().within().roles().withName('lead_link').then(...).catch(...);
```
```javascript
gf.get().people().within().roles().withName('lead link').then(...).catch(...);
```

Get all people within roles with name of **'facilitator'**:

```javascript
gf.get().people().within().roles().withName('facilitator').then(...).catch(...);
```

Get all people:

```javascript
gf.get().people().all().then(...).catch(...);
```

## Projects

Get all projects with ID of **$ID**:

```javascript
gf.get().projects().withID($ID).then(...).catch(...);
```

Get all projects within some other type:

```javascript
gf.get().projects().within() ...
```

Get all projects within circles with ID of **$ID**:

```javascript
gf.get().projects().within().circles().withID($ID).then(...).catch(...);
```

Get all projects:

```javascript
gf.get().projects().all().then(...).catch(...);
```

## Metrics

Get all metrics with ID of **$ID**:

```javascript
gf.get().metrics().withID($ID).then(...).catch(...);
```

Get all metrics within some other type:

```javascript
gf.get().metrics().within() ...
```

Get all metrics within circles with ID of **$ID** including global metrics:

```javascript
gf.get().metrics().within().circles().withID($ID).withGlobals().then(...).catch(...);
```

Get all metrics within circles with ID of **$ID** **NOT** including global metrics:

```javascript
gf.get().metrics().within().circles().withID($ID).withoutGlobals().then(...).catch(...);
```

Get all global metrics:

```javascript
gf.get().metrics().globals().then(...).catch(...);
```

Get all metrics:

```javascript
gf.get().metrics().all().then(...).catch(...);
```

## Checklist Items:
```javascript
gf.get().checklistItems().then(...).catch(...);
```

Get all checklist items with ID of **$ID**:

```javascript
gf.get().checklistItems().withID($ID).then(...).catch(...);
```

Get all checklist items with some other type:

```javascript
gf.get().checklistItems().within() ...
```

Get all checklist items within circles with ID of **$ID** including global checklist items:

```javascript
gf.get().checklistItems().within().circles().withID($ID).withGlobals().then(...).catch(...);
```

Get all checklist items within circles with ID of **$ID** **NOT** including global checklist items:

```javascript
gf.get().checklistItems().within().circles().withID($ID).withoutGlobals().then(...).catch(...);
```

Get all global checklist items:

```javascript
gf.get().checklistItems().globals().then(...).catch(...);
```

Get all checklist items:

```javascript
gf.get().checklistItems().all().then(...).catch(...);
```

## Actions

Get all actions with ID of **$ID**:

```javascript
gf.get().actions().withID($ID).then(...).catch(...);
```

Get all actions within some other type:

```javascript
gf.get().actions().within() ...
```

Get all actions within circles with ID of **$ID**:

```javascript
gf.get().actions().within().circles().withID($ID).then(...).catch(...);
```

Get all actions within people with ID of **$ID**:

```javascript
gf.get().actions().within().people().withID($ID).then(...).catch(...);
```

Get all actions created since date of **$DATE**:

```javascript
gf.get().actions().createdSince($DATE).then(...).catch(...);
```

Get all actions:

```javascript
gf.get().actions().all().then(...).catch(...);
```

## Triggers

Get all triggers with ID of **$ID**:

```javascript
gf.get().triggers().withID($ID).then(...).catch(...);
```

Get all triggers within some other type:

```javascript
gf.get().triggers().within() ...
```

Get all triggers within circles with ID of **$ID**:

```javascript
gf.get().triggers().within().circles().withID($ID).then(...).catch(...);
```

Get all triggers within people with ID of **$ID**:

```javascript
gf.get().triggers().within().people().withID($ID).then(...).catch(...);
```

Get all triggers created since date of **$DATE**:

```javascript
gf.get().triggers().createdSince($DATE).then(...).catch(...);
```

Get all triggers:

```javascript
gf.get().triggers().all().then(...).catch(...);
```