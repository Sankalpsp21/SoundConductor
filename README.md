# AtlasMadness

## Schema
```
{
    signal: STRING,
    action: STRING
}
```

**Example:**

```
{
    signal: "double-clap",
    action: "open-door"
}
```

## API Specification


### ```GET /audioactions```
**Description:** Fetch all audioaction data.


### ```GET /audioactions/{id}```
**Description:** Fetch a specific audioaction data by id.


### ```GET /audioactions/{signal}```
**Description:** Fetch a specific audioaction data by signal. (e.g. double-clap)


### ```POST /audioactions```
**Description:** Create a new audioaction data to the database. The request body should be like this:
```
{
   signal: STRING,
   action: STRING
}
```


### ```PATCH /audioactions/{id}```
**Description:** Update specific audioaction data.


### ```DELETE /audioactions/{id}```
**Description:** Delete specific audioaction data.
