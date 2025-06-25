title: Using the Synthetics API for fetching monitors
description: How to use the Synthetics API for fetching monitors.

To get all the available monitors for an App, the API can be triggered by sending an HTTP request with the below configuration:

| Region | Endpoint
| --- | --- |
| US | `https://apps.sematext.com/synthetics-api/api/apps/<appId>/monitors` |
| EU | `https://apps.eu.sematext.com/synthetics-api/api/apps/<appId>/monitors` |

**HTTP Method** - `GET`

**Request Headers** - `Authorization: apiKey <apiKey>`

Example:

In order to get all the available monitors for the App with an `<appId>` of `17174`, we would send an HTTP request as follows:
```
curl -L -X GET 'https://apps.sematext.com/synthetics-api/api/apps/17174/monitors' \
-H 'Authorization: apiKey 9bddb0a6-xxxx-xxxx-xxxx-397d15806cfd'
```
Result:
```
{
  "success": true,
  "data": {
    "id": 3124,
    "name": "Example HTTP monitor",
```

In the above example we can see that the `<monitorId>` for the `Example HTTP monitor` is `3124`. Using the obtained `<monitorId>`, we can then perform an API request to retrieve only information on the `Example HTTP monitor`.

### Get a single Monitor for an App

To get information on a single monitor for an App, the API can be triggered by sending an HTTP request with the below configuration:

| Region | Endpoint
| --- | --- |
| US | `https://apps.sematext.com/synthetics-api/api/apps/<appId>/monitors/<monitorId>` |
| EU | `https://apps.eu.sematext.com/synthetics-api/api/apps/<appId>/monitors/<monitorId>` |

**HTTP Method** - `GET`

**Request Headers** - `Authorization: apiKey <apiKey>`

Example:

In order to get information on the monitor with a `<monitorId>` of `3124` for the App with `<appId>` equal to `17174`, we would send an HTTP request as follows:
```
curl -L -X GET 'https://apps.sematext.com/synthetics-api/api/apps/17174/monitors/3124' \
-H 'Authorization: apiKey 9bddb0a6-xxxx-xxxx-xxxx-397d15806cfd'
```
Result:
```
{
  "success": true,
  "data": {
    "id": 3124,
    "name": "Example HTTP monitor",
```

## API Reference

| Key | Type | Value | Description
| --- | --- | --- | --- |
| success | BOOLEAN | -- | API call response status |
| | | true | Successful |
| | | false | Failed |
| data | Array of JSON Objects | *See [API Reference: data](#api-reference-data)  | Monitor overview response data |


### API Reference: data
| Key | Type | Value | Description
| --- | --- | --- | --- |
| id | INTEGER | Variable | `<monitorId>` of the monitor |
| name | STRING | Variable | Name of the monitor |
| interval | STRING | -- | Interval the monitor is set to run |
| | | 1m | 1 minute intervals |
| | | 5m | 5 minute intervals |
| | | 10m | 10 minute intervals |
| | | 15m | 15 minute intervals |
| intervalInSeconds | INTEGER | -- | Interval the monitor is set to run in seconds |
| | | 60 | 1 minute intervals |
| | | 300 | 5 minute intervals |
| | | 600 | 10 minute intervals |
| | | 900 | 15 minute intervals |
| enabled | BOOLEAN | -- | Monitor is Enabled/Disabled |
| | | true | Enabled state |
| | | false | Disabled state  |
| locations | ARRAY | -- | Locations the monitor is set to run from |
| | | 1 | N. Virginia, USA |
| | | 2 | Ireland |
| | | 3 | Mumbai, India |
| | | 4 | Singapore |
| | | 5 | Sydney, Australia |
| | | 6 | Frankfurt, Germany |
| | | 7 | Sao Paulo, Brazil |
| | | 8 | N. California, USA|
| | | 9 | Montreal, Canada|
| lastScheduledAt | INTEGER | Variable | Last scheduled run of the monitor (Epoch milliseconds) |
| status | STRING | -- | Current status of the monitor |
| | | PASSING | Monitor is passing |
| | | FAILING | Monitor is failing |
| appId | INTEGER | Variable | `<appId>` of the monitor's parent App |
| type | STRING | -- | Type of monitor |
| | | HTTP | Is an HTTP Monitor |
| | | BROWSER | Is a Browser Monitor |
| conditions | Array of JSON Objects | *See [API Reference: conditions](#api-reference-conditions) | Alert conditions |
| lastFailedResult | JSON Object | *See [API Reference: lastFailedResult](#api-reference-lastfailedresult) | Last failed run |
| availability | JSON Object | *See [API Reference: availability](#api-reference-availability) | Average overall availability |


### API Reference: conditions
| Key | Type | Value | Description
| --- | --- | --- | --- |
| id | INTEGER | Variable | `<ruleId>` of the alert condition |
| type | STRING | -- | Alert condition type |
| | | METRIC | Metric |
| | | RESPONSE_BODY | Response Body |
| | | RESPONSE_BODY_JSON | Response Body JSON |
| | | RESPONSE_HEADER | Response Header |
| | | RESPONSE_CODE | Response Code |
| | | ERROR | Error |
| | | SSL_CERT_EXPIRY | SSL Certificate Expiry (days) |
| key | STRING | -- | Alert condition field |
| | | synthetics.http.time.dns | DNS time (ms) |
| | | synthetics.http.time.connect | Connect time (ms) |
| | | synthetics.http.time.tls | TLS time (ms) |
| | | synthetics.http.time.firstbyte | Time to first byte (ms) |
| | | synthetics.http.time.download | Download time (ms) |
| | | synthetics.browser.transfer.size  | Bytes Transferred (Bytes) |
| | | synthetics.browser.request.count | Request Count |
| | | synthetics.time.response | Response time (ms) |
| | | synthetics.http.response.size | Response size (bytes) |
| | | Variable | JSON path/Header name |
| operator | STRING | -- | Operator type |
| | | contains | Contains |
| | | does not contain | Does Not Contain |
| | | > | Greater Than |
| | | < | Less Than |
| | | = | Equal To |
| | | !=  | Not Equal To |
| | | Starts With | Starts With |
| value | STRING | Variable | Rule value |
| enabled | BOOLEAN | -- | Condition is Enabled/Disabled |
| | | true | Condition enabled |
| | | false | Condition disabled |


### API Reference: lastFailedResult
| Key | Type | Value | Description
| --- | --- | --- | --- |
| timestamp | INTEGER | Variable | Last failed run of the monitor (Epoch milliseconds) |
| runId | INTEGER | Variable | `<runId>` of the failed run |


### API Reference: availability
| Key | Type | Value | Description
| --- | --- | --- | --- |
| day | INTEGER | Variable | Daily availability % (5 decimals) |
| week | INTEGER | Variable | Weekly availability % (5 decimals) |
| month | INTEGER | Variable |  Monthly availability % (5 decimals) |
| custom | INTEGER | 0 | N/A |
