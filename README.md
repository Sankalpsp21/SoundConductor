# AtlasMadness

## Schema

### Users Collection

#### This collection stores user's tokens.

```
{
	token: STRING
}
```

### Integrations Collection

#### This collection stores integration data.

```
{
	userId: ObjectID,              	// _id from users collection
	integrationName: STRING,
	signal: STRING,              	// e.g. doubleClap, singleClap
	actions: {
		smartthings: {
			devices: [              // List of deviceID-action pairs e.g {1, ON}
				{
					deviceId: STRING,
					state: STRING
				},
        		{
					deviceId: STRING,
					state: STRING
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
	"signal": "singleClap",
	"actions": {
		"smartthings": {
			"devices": [
				{
					"deviceId": "123",
					"state": "OFF"
				}
			]
		}
	}
}
```

## API Specification

### `POST /smartthings/token`

**Description:** Create new user data with a given token.
**Request Body**

```
{
	token: STRING, required
}
```

**Status Code Table**

| Status Code | Description           |
| ----------- | --------------------- |
| 201         | Success               |
| 400         | Invalid Body          |
| 500         | Internal Server error |

### `GET /smartthings/devices/{token}`

**Description:** Fetch a list of SmartThings devices that support the switch on/off capability by using SmartThings API.
**Example Response**

```
{
	"devices": [
		{
			"deviceId": "1c6cc03e-b817-4525-99ff-5d740c970fae",
			"label": "Cam"
		},
		{
			"deviceId": "839e22a0-1a1e-4f90-adcc-4c0db4d533e5",
			"label": "Curtain"
		},
		{
			"deviceId": "32f3bea4-8f1a-44e1-3276-1845c3eae0ea",
			"label": "Wifi Smart Plug"
		},
		{
			"deviceId": "265c20e8-018c-4724-a2ee-e36b8c81dc89",
			"label": "Samsung Q60 Series (82)"
		}
	]
}
```

**Status Code Table**

| Status Code | Description                           |
| ----------- | ------------------------------------- |
| 200         | Success                               |
| 404         | A given token is invalid or not found |
| 500         | Internal Server error                 |

### `GET /integrations`

**Description:** Fetch all integration data.
**Example Response**

```
[
	{
		"actions": {
			"smartthings": {
				"devices": [
					{
						"deviceId": "123",
						"state": "OFF",
						"_id": "649d0aa825e65fa45fc00fe1"
					}
				]
			}
		},
		"_id": "649d0aa825e65fa45fc00fe0",
		"integrationName": "shut blinds",
		"signal": "clap",
		"__v": 0
	},
	{
		"actions": {
			"smartthings": {
				"devices": [
					{
						"deviceId": "sampleId",
						"state": "openDoor",
						"_id": "649d39b79fdc315a2c1d2ddc"
					}
				]
			}
		},
		"_id": "649d39b79fdc315a2c1d2ddb",
		"userId": "649d0aa825e65fa45fc00fe1",
		"integrationName": "Integration2",
		"signal": "doubleClap",
		"__v": 0
	}
]
```

**Status Code Table**

| Status Code | Description           |
| ----------- | --------------------- |
| 200         | Success               |
| 500         | Internal Server error |

### `GET /integrations/{id}`

**Description:** Fetch a specific integration data by id.

**Status Code Table**

| Status Code | Description                       |
| ----------- | --------------------------------- |
| 200         | Success                           |
| 404         | Data with given id does not exist |
| 500         | Internal Server error             |

### `POST /integrations`

**Description:** Create new integration data to the database.
**Request Body**

```
{
	userId: ObjectID,              		// _id from users collection
	integrationName: STRING,
	signal: STRING,              		// e.g. doubleClap, singleClap
	actions: {
		smartthings: {
			devices: [               	// Array of deviceID-action pairs e.g {1, ON}
				{
					deviceId: STRING,
					state: STRING
				},
        {
					deviceId: STRING,
					state: STRING
				}
			]
		}
	}
}
```

**Status Code Table**

| Status Code | Description           |
| ----------- | --------------------- |
| 201         | Success               |
| 400         | Invalid Body          |
| 500         | Internal Server error |

### `PATCH /integrations/{id}`

**Description:** Update specific integration data.

**Status Code Table**

| Status Code | Description                       |
| ----------- | --------------------------------- |
| 200         | Success                           |
| 400         | Invalid Body                      |
| 404         | Data with given id does not exist |
| 500         | Internal Server error             |

### `DELETE /integrations/{id}`

**Description:** Delete specific integration data.

**Status Code Table**

| Status Code | Description                       |
| ----------- | --------------------------------- |
| 200         | Success                           |
| 400         | Invalid Body                      |
| 404         | Data with given id does not exist |
| 500         | Internal Server error             |

### `POST /integrations/execute/{token} - In progress`

1. Get’s called after ML model classifies sound
2. Looks up all user integrations that match given signal classification
3. For each integration’s outputs (e.g. SmartThings light bulbs), turn it on/off

```
{
	signal: STRING
}
```
