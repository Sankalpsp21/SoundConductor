# AtlasMadness

## Schema
```
{
	userId: ObjectID,              // _id from users collection
	integrationName: STRING,
	signal: STRING,              // e.g. doubleClap, singleClap
	actions: {
		smartthings: {
			devices: [               // List of deviceID-action pairs e.g {1, ON}
				{
					deviceId: STRING,
					action: STRING
				},
        {
					deviceId: STRING,
					action: STRING
				}
			]
		}
	}
}
```

**Example:**

```
{
	"userId": "1",              
	"integrationName": "shut blinds",
	"signal": "clap",              
	"actions": {
		"smartthings": {
			"devices": [               
				{
					"deviceId": "123",
					"action": "OFF"
				}
			]
		}
	}
}
```

## API Specification


### ```GET /integrations```
**Description:** Fetch all integration data.


### ```GET /integrations/{id}```
**Description:** Fetch a specific integration data by id.


### ```GET /integrations/{signal}```
**Description:** Fetch specific integration data by signal. (e.g. double-clap)


### ```POST /integrations```
**Description:** Create new integration data to the database. The request body should be like this:
```
{
	userId: ObjectID,              // _id from users collection
	integrationName: STRING,
	signal: STRING,              // e.g. doubleClap, singleClap
	actions: {
		smartthings: {
			devices: [               // List of deviceID-action pairs e.g {1, ON}
				{
					deviceId: STRING,
					action: STRING
				},
        {
					deviceId: STRING,
					action: STRING
				}
			]
		}
	}
}
```


### ```PATCH /integrations/{id}```
**Description:** Update specific integration data.


### ```DELETE /integrations/{id}```
**Description:** Delete specific integration data.
