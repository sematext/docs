title: Using the Synthetics API to run monitors
description: How to use the Synthetics API to run monitors.

## Run Monitors using the API

The run monitor API can be triggered by sending an HTTP request with the below configuration:

**US Region Endpoint**

* `https://apps.sematext.com/synthetics-api/api/v3/apps/<appId>/monitors/runs`

**EU Region Endpoint**

* `https://apps.eu.sematext.com/synthetics-api/api/v3/apps/<appId>/monitors/runs`

**HTTP Method** - `POST`

**Request Headers** - `Authorization: apiKey <apiKey>`

**Request Body**
```json
[
    {
        "monitorId": <monitorId-1>,
        "locations": [<locationId-1>, <locationId-2>,...],
    },
    {
        "monitorId": <monitorId-2>,
        "locations": [<locationId-1>, <locationId-2>,...],
    },
    ...
]
```

The below API triggers runs for monitors with ID `276` and `335` belonging to App with ID `12345` from locations `N.Virginia, USA`, `Mumbai, India` and `N.Virginia, USA`, `Ireland, Europe` respectively.

```
curl --request POST \
  --url https://apps.sematext.com/synthetics-api/api/v3/apps/12345/monitors/runs \
  --header 'Authorization: apiKey 1d7a2d6b-xxxx-xxxx-xxxx-10f83c5c8da7' \
  --header 'Content-Type: application/json' \
  --data '[
    {
        "monitorId": 276,
        "regions": [1,3]
    },
    {
        "monitorId": 335,
        "regions": [1,2]
    }
]'
```
See [API Reference](/docs/synthetics/monitor-overview-api#api-reference-data) to get the location IDs.
