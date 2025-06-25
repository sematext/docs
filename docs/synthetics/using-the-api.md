title: Using the Synthetics API for fetching and creating monitors
description: How to use the Synthetics API for fetching and creating monitors.

You can also use the Synthetics API to trigger monitor runs, retrieve monitors, create or edit monitors (individually or [in bulk](/docs/synthetics/bulk-add-monitors-api)), or schedule monitor pauses. To send any of these API requests, you'll need your account's API Key, which you can copy from the **Settings → API** page.

- [here](https://apps.sematext.com/ui/account/api), if your account is registered in the US region, or
- [here](https://apps.eu.sematext.com/ui/account/api), for the EU region

## Create Monitors Using the API

The create monitor API can be triggered by sending an HTTP request with the below configuration:

| Type | Region | Endpoint
| --- | --- | --- |
| Browser Monitor | US | `https://apps.sematext.com/synthetics-api/api/apps/<appId>/monitors/browser` |
| Browser Monitor | EU | `https://apps.eu.sematext.com/synthetics-api/api/apps/<appId>/monitors/browser` |
| HTTP Monitor | US | `https://apps.sematext.com/synthetics-api/api/apps/<appId>/monitors/http` |
| HTTP Monitor | EU | `https://apps.eu.sematext.com/synthetics-api/api/apps/<appId>/monitors/http` |

**HTTP Method** - `POST`

**Request Headers** - `Authorization: apiKey <apiKey>`

### Getting the appId
* The `<appId>` and `<monitorId>` values can be extracted from the URL of the Monitor Overview page. For example, if the Monitor Overview page URL is `https://apps.sematext.com/ui/synthetics/12345/monitors/276` then the `appId` is `12345` and `monitorId` is `276`.
* The `<appId>` can also be obtained by sending a GET request using the above request header and `<apiKey>` to the required endpoint:

| Region | Endpoint
| --- | --- |
| US | `https://apps.sematext.com/users-web/api/v3/apps` |
| EU | `https://apps.eu.sematext.com/users-web/api/v3/apps` |

Example:
```
curl -L -X GET 'https://apps.sematext.com/users-web/api/v3/apps' \
-H 'Authorization: apiKey 9bddb0a6-xxxx-xxxx-xxxx-397d15806cfd'
```
Response:
```
  "success": true,
  "message": null,
  "data": {
    "apps": [
      {
        "id": 17174,
        "name": "Bulk API Test",
        "appType": "Synthetics",
        "appTypeId": 40000,
```
From the above response, we can determine that the `<appId>` for the Synthetics App named `Bulk API Test` is `17174`.

### Setting the Request Body

Now that we have the API Key and the `appId`, we can define the body of the request based on how we want to configure our HTTP or Browser monitor. Below are examples for both types. Let’s start by creating a simple HTTP monitor.

#### Create an HTTP Monitor

To create an HTTP Monitor, we would send an HTTP request as follows:
```
curl -L -X POST 'https://apps.sematext.com/synthetics-api/api/apps/17174/monitors/http' \
-H 'Authorization: apiKey 9bddb0a6-xxxx-xxxx-xxxx-397d15806cfd' \
-H 'Content-Type: application/json' \
--data-raw '{
    "name": "Example HTTP monitor name",
    "interval": "1m",
    "enabled": true,
    "locations": [
        1
    ],
    "url": "https://www.google.com/",
    "method": "GET",
    "conditions": [
        {
            "id": 1,
            "type": "ERROR",
            "operator": "=",
            "value": "",
            "enabled": true
        },
        {
            "id": 2,
            "type": "RESPONSE_CODE",
            "operator": "=",
            "value": "200",
            "enabled": true
        },
        {
            "id": 3,
            "type": "METRIC",
            "key": "synthetics.time.response",
            "operator": "<",
            "value": "20000",
            "enabled": true
        }
    ],
    "alertRule": {
        "schedule": [
            {
                "day": "Monday",
                "index": 2,
                "label": "MON",
                "intervals": [],
                "type": "ACTIVE"
            },
            {
                "day": "Tuesday",
                "index": 3,
                "label": "TUE",
                "intervals": [],
                "type": "ACTIVE"
            },
            {
                "day": "Wednesday",
                "index": 4,
                "label": "WED",
                "intervals": [],
                "type": "ACTIVE"
            },
            {
                "day": "Thursday",
                "index": 5,
                "label": "THU",
                "intervals": [],
                "type": "ACTIVE"
            },
            {
                "day": "Friday",
                "index": 6,
                "label": "FRI",
                "intervals": [],
                "type": "ACTIVE"
            },
            {
                "day": "Saturday",
                "index": 7,
                "label": "SAT",
                "intervals": [],
                "type": "ACTIVE"
            },
            {
                "day": "Sunday",
                "index": 1,
                "label": "SUN",
                "intervals": [],
                "type": "ACTIVE"
            }
        ],
        "priority": "WARN",
        "minDelayBetweenNotificationsInMinutes": "10",
        "backToNormalNeeded": true,
        "failedRunCountToAlert": 1,
        "notificationsEnabled": true,
        "useOnlyAlertRuleIntegrations": false
    },
    "monitorSSLExpiry": true,
    "monitorSSLChange": true,
    "allowInsecureSSL": false
}'
```

> Make sure you’re using the correct API endpoint for your region, and replace the placeholders with your actual API Key and App ID.

You can adjust the request body parameters to fit your needs. Check [here](#api-reference-http-monitor) to see the full list of available parameters.

> Refer to the [Bulk Add Monitors via Apps Script](/docs/synthetics/bulk-add-monitors-api/) page to learn how to bulk add or edit HTTP monitors using Google Sheets and Apps Script.

#### Create a Browser Monitor
When creating a Browser Monitor which uses a User Journey script, special characters in the [User Journey script](/docs/synthetics/user-journey-scripts/overview/) **should be correctly escaped**.
To create a Browser Monitor which monitors a URL using a User Journey script, we would send an HTTP request as follows:
```
curl -L -X POST 'https://apps.sematext.com/synthetics-api/api/apps/17174/monitors/browser' \
-H 'Authorization: apiKey 9bddb0a6-xxxx-xxxx-xxxx-397d15806cfd' \
-H 'Content-Type: application/json' \
--data-raw '{
    "name": "Example Browser Monitor with a User Journey script",
    "interval": "10m",
    "enabled": true,
    "locations": [
        1,
        2
	],
    "url": "",
    "script": "// Example script\n async function testPage(page) {\n   await page.goto(\"https://www.google.com/\");\n   await page.screenshot({ path: '\''screenshot.jpg'\'' });\n }\n module.exports = testPage;",
    "scriptBased": true,
	"isPlaywright": true,
    "conditions": [
        {
            "id": 1,
            "type": "ERROR",
            "operator": "=",
            "value": "",
            "enabled": true
        },
        {
            "id": 2,
            "type": "METRIC",
            "key": "synthetics.time.response",
            "operator": "<",
            "value": "20000",
            "enabled": true
        }
    ],
    "alertRule": {
        "schedule": [
            {
                "day": "Monday",
                "index": 2,
                "label": "MON",
                "intervals": [],
                "type": "ACTIVE"
            },
            {
                "day": "Tuesday",
                "index": 3,
                "label": "TUE",
                "intervals": [],
                "type": "ACTIVE"
            },
            {
                "day": "Wednesday",
                "index": 4,
                "label": "WED",
                "intervals": [],
                "type": "ACTIVE"
            },
            {
                "day": "Thursday",
                "index": 5,
                "label": "THU",
                "intervals": [
                  {
                     "start": "12:00",
                     "end": "13:00"
                  },
                  {
                     "start": "12:00",
                     "end": "13:00"
                  }
                ],
                "type": "CUSTOM"
            },
            {
                "day": "Friday",
                "index": 6,
                "label": "FRI",
                "intervals": [],
                "type": "ACTIVE"
            },
            {
                "day": "Saturday",
                "index": 7,
                "label": "SAT",
                "intervals": [],
                "type": "ACTIVE"
            },
            {
                "day": "Sunday",
                "index": 1,
                "label": "SUN",
                "intervals": [],
                "type": "ACTIVE"
            }
        ],
        "priority": "WARN",
        "minDelayBetweenNotificationsInMinutes": "10",
        "backToNormalNeeded": true,
        "failedRunCountToAlert": 1,
        "notificationsEnabled": true,
        "useOnlyAlertRuleIntegrations": false
    }
}'
```

> Make sure you’re using the correct API endpoint for your region, and replace the placeholders with your actual API Key and App ID.

To create a Browser Monitor which monitors a URL without using a User Journey script, we would send an HTTP request as follows:
```
curl -L -X POST 'https://apps.sematext.com/synthetics-api/api/apps/17174/monitors/browser' \
-H 'Authorization: apiKey 9bddb0a6-xxxx-xxxx-xxxx-397d15806cfd' \
-H 'Content-Type: application/json' \
--data-raw '{
    "name": "Example browser monitor without a User Journey script",
    "interval": "10m",
    "enabled": true,
    "locations": [
        1,
        2
    ],
    "url": "https://www.google.com/",
    "script": "",
    "scriptBased": false,
    "conditions": [
        {
            "id": 1,
            "type": "ERROR",
            "operator": "=",
            "value": "",
            "enabled": true
        },
        {
            "id": 2,
            "type": "METRIC",
            "key": "synthetics.time.response",
            "operator": "<",
            "value": "20000",
            "enabled": true
        }
    ],
    "alertRule": {
        "schedule": [
            {
                "day": "Monday",
                "index": 2,
                "label": "MON",
                "intervals": [],
                "type": "ACTIVE"
            },
            {
                "day": "Tuesday",
                "index": 3,
                "label": "TUE",
                "intervals": [],
                "type": "ACTIVE"
            },
            {
                "day": "Wednesday",
                "index": 4,
                "label": "WED",
                "intervals": [],
                "type": "ACTIVE"
            },
            {
                "day": "Thursday",
                "index": 5,
                "label": "THU",
                "intervals": [],
                "type": "ACTIVE"
            },
            {
                "day": "Friday",
                "index": 6,
                "label": "FRI",
                "intervals": [],
                "type": "ACTIVE"
            },
            {
                "day": "Saturday",
                "index": 7,
                "label": "SAT",
                "intervals": [],
                "type": "ACTIVE"
            },
            {
                "day": "Sunday",
                "index": 1,
                "label": "SUN",
                "intervals": [],
                "type": "ACTIVE"
            }
        ],
        "priority": "WARN",
        "minDelayBetweenNotificationsInMinutes": "10",
        "backToNormalNeeded": true,
        "failedRunCountToAlert": 1,
        "notificationsEnabled": true,
        "useOnlyAlertRuleIntegrations": false
    }
}'
```

> Make sure you’re using the correct API endpoint for your region, and replace the placeholders with your actual API Key and App ID.

You can adjust the request body parameters to fit your needs. Check [here](#api-reference-browser-monitor) to see the full list of available parameters.

Refer to the [Bulk Add Monitors via Apps Script](/docs/synthetics/bulk-add-monitors-api/) page to learn how to bulk add or edit Browser monitors using Google Sheets and Apps Script.

## Edit Monitors Using the API

To edit monitors using the API, you need to send a **PUT** request with the full request body with the updated parameters, depending on what you want to change. In the example below, we've added an additional location to the User Journey script-based Browser monitor we created above.

You’ll also need to include the ID of the monitor you want to edit in the URL.

The `<monitorId>` can be extracted from the URL of the Monitor Overview page. For example, if the Monitor Overview page URL is `https://apps.sematext.com/ui/synthetics/12345/monitors/276` then the `monitorId` is `monitorId` is `276`.

```
curl -L -X PUT 'https://apps.eu.sematext.com/synthetics-api/api/apps/17174/monitors/browser/11605' \
-H 'Authorization: apiKey 9bddb0a6-xxxx-xxxx-xxxx-397d15806cfd' \
-H 'Content-Type: application/json' \
--data-raw '{
    "name": "Example Browser Monitor with a User Journey script",
    "interval": "10m",
    "enabled": true,
    "locations": [
        1,
        2,
		9
	],
    "url": "",
    "script": "// Example script\n async function testPage(page) {\n   await page.goto(\"https://www.google.com/\");\n   await page.screenshot({ path: '\''screenshot.jpg'\'' });\n }\n module.exports = testPage;",
    "scriptBased": true,
	"isPlaywright": true,
    "conditions": [
        {
            "id": 1,
            "type": "ERROR",
            "operator": "=",
            "value": "",
            "enabled": true
        },
        {
            "id": 2,
            "type": "METRIC",
            "key": "synthetics.time.response",
            "operator": "<",
            "value": "20000",
            "enabled": true
        }
    ],
    "alertRule": {
        "schedule": [
            {
                "day": "Monday",
                "index": 2,
                "label": "MON",
                "intervals": [],
                "type": "ACTIVE"
            },
            {
                "day": "Tuesday",
                "index": 3,
                "label": "TUE",
                "intervals": [],
                "type": "ACTIVE"
            },
            {
                "day": "Wednesday",
                "index": 4,
                "label": "WED",
                "intervals": [],
                "type": "ACTIVE"
            },
            {
                "day": "Thursday",
                "index": 5,
                "label": "THU",
                "intervals": [
                  {
                     "start": "12:00",
                     "end": "13:00"
                  },
                  {
                     "start": "12:00",
                     "end": "13:00"
                  }
                ],
                "type": "CUSTOM"
            },
            {
                "day": "Friday",
                "index": 6,
                "label": "FRI",
                "intervals": [],
                "type": "ACTIVE"
            },
            {
                "day": "Saturday",
                "index": 7,
                "label": "SAT",
                "intervals": [],
                "type": "ACTIVE"
            },
            {
                "day": "Sunday",
                "index": 1,
                "label": "SUN",
                "intervals": [],
                "type": "ACTIVE"
            }
        ],
        "priority": "WARN",
        "minDelayBetweenNotificationsInMinutes": "10",
        "backToNormalNeeded": true,
        "failedRunCountToAlert": 1,
        "notificationsEnabled": true,
        "useOnlyAlertRuleIntegrations": false
    }
}'
```

## Create/Edit Monitors: API Reference

### API Reference: HTTP Monitor

| Key | Type | Value | Description | Required
| --- | --- | --- | --- | --- |
| name | STRING | User-defined | Title of the monitor | YES |
| interval | STRING | -- | Interval to run the monitor | YES |
| | | 1m | 1 minute intervals | |
| | | 5m | 5 minute intervals | |
| | | 10m | 10 minute intervals | |
| | | 15m | 15 minute intervals | |
| enabled | BOOLEAN | -- | Enable/Disable the monitor | YES |
| | | true | Enabled state | |
| | | false | Disabled state  | |
| locations | ARRAY | -- | Locations to run the monitor from | YES |
| | | 1 | N. Virginia, USA | |
| | | 2 | Ireland | |
| | | 3 | Mumbai, India | |
| | | 4 | Singapore | |
| | | 5 | Sydney, Australia | |
| | | 6 | Frankfurt, Germany | |
| | | 7 | Sao Paulo, Brazil | |
| | | 8 | N. California, USA| |
| | | 9 | Montreal, Canada | |
| url | STRING | User-defined | URL to monitor | YES |
| method | STRING | -- | HTTP method | YES |
| | | GET | Perform a GET request | |
| | | POST | Perform a POST request | |
| | | PUT | Perform a PUT request | |
| | | DELETE | Perform a DELETE request | |
| | | PATCH | Perform a PATCH request | |
| body | STRING | User-defined | Request body | NO - Optional |
| headers | Array of JSON Objects | *See [API Reference: headers](#api-reference-headers) | Request headers | NO - Optional |
| params | Array of JSON Objects | *See [API Reference: params](#api-reference-params) | Request params | NO - Optional |
| cookies | Array of JSON Objects | *See [API Reference: cookies](#api-reference-cookies) | Request cookies | NO - Optional |
| conditions | Array of JSON Objects | *See [API Reference: conditions](#api-reference-conditions) | Alert Conditions | YES |
| alertRule | JSON Object | *See [API Reference: alertRule](#api-reference-alertrule) | Alert Settings | YES |
| monitorSSLExpiry | BOOLEAN | -- | Alert when SSL certificate is expiring in 28, 14, 7, and 3 days | YES |
| | | true | SSL expiry alert enabled | |
| | | false | SSL expiry alert disabled | |
| monitorSSLChange | BOOLEAN | -- | Alert when SSL certificate change is detected | YES |
| | | true | SSL certificate change alert enabled | |
| | | false | SSL certificate change alert disabled | |
| allowInsecureSSL | BOOLEAN | -- | SSL Certificate validation | YES |
| | | true | Skip SSL Certificate validation | |
| | | false | Validate SSL Certificates | |

### API Reference: Browser Monitor

| Key | Type | Value | Description | Required
| --- | --- | --- | --- | --- |
| name | STRING | User-defined | Title of the monitor | YES |
| interval | STRING | -- | Interval to run the monitor | YES |
| | | 1m | 1 minute intervals | |
| | | 5m | 5 minute intervals | |
| | | 10m | 10 minute intervals | |
| | | 15m | 15 minute intervals | |
| enabled | BOOLEAN | -- | Enable/Disable the monitor | YES |
| | | true | Enabled state | |
| | | false | Disabled state  | |
| locations | ARRAY | -- | Locations to run the monitor from | YES |
| | | 1 | N. Virginia, USA | |
| | | 2 | Ireland | |
| | | 3 | Mumbai, India | |
| | | 4 | Singapore | |
| | | 5 | Sydney, Australia | |
| | | 6 | Frankfurt, Germany | |
| | | 7 | Sao Paulo, Brazil | |
| | | 8 | N. California, USA| |
| | | 9 | Montreal, Canada|
| url | STRING | User-defined | URL to monitor | YES - Empty for User Journey |
| script | STRING | User-defined | User Journey script | YES - Empty for Website Monitor |
| scriptBased | BOOLEAN | -- | Browser Monitor mode | YES |
| | | true | Monitor a User Journey | |
| | | false | Monitor a Website | |
| conditions | Array of JSON Objects | *See [API Reference: conditions](#api-reference-conditions) | Alert Conditions | YES |
| alertRule | JSON Object | *See [API Reference: alertRule](#api-reference-alertrule) | Alert Settings | YES |
| allowInsecureSSL | BOOLEAN | -- | SSL Certificate validation | YES |
| | | true | Skip SSL Certificate validation | |
| | | false | Validate SSL Certificates | |

#### API Reference: headers
| Key | Type | Value | Description | Required
| --- | --- | --- | --- | --- |
| Name | STRING | User-defined | Custom header name | YES |
| Value | STRING | User-defined | Custom header value | YES |

#### API Reference: params
| Key | Type | Value | Description | Required
| --- | --- | --- | --- | --- |
| Name | STRING | User-defined | Custom parameter name | YES |
| Value | STRING | User-defined | Custom parameter value | YES |

#### API Reference: cookies
| Key | Type | Value | Description | Required
| --- | --- | --- | --- | --- |
| Name | STRING | User-defined | Custom cookie name | YES |
| Value | STRING | User-defined | Custom cookie value | YES |

#### API Reference: conditions
| Key | Type | Value | Description | Required
| --- | --- | --- | --- | --- |
| id | INTEGER | User-defined | Alert condition line number | YES |
| type | STRING | -- | Alert condition type | YES |
| | | METRIC | Metric | |
| | | RESPONSE_BODY | Response Body | Only for HTTP monitor |
| | | RESPONSE_BODY_JSON | Response Body JSON | Only for HTTP monitor |
| | | RESPONSE_HEADER | Response Header | Only for HTTP monitor |
| | | RESPONSE_CODE | Response Code | Only for HTTP monitor |
| | | ERROR | Error | |
| | | SSL_CERT_EXPIRY | SSL Certificate Expiry (days) | *Only > operator available |
| key | STRING | -- | Alert condition field | Only for the following value in type: |
| | | synthetics.http.time.dns | DNS time (ms) | METRIC |
| | | synthetics.http.time.connect | Connect time (ms) | METRIC |
| | | synthetics.http.time.tls | TLS time (ms) | METRIC |
| | | synthetics.http.time.firstbyte | Time to first byte (ms) | METRIC |
| | | synthetics.http.time.download | Download time (ms) | METRIC |
| | | synthetics.browser.transfer.size  | Bytes Transferred (Bytes) | METRIC - Only for Browser monitor |
| | | synthetics.browser.request.count | Request Count | METRIC - Only for Browser monitor |
| | | synthetics.time.response | Response time (ms) | METRIC |
| | | synthetics.http.response.size | Response size (bytes) | METRIC |
| | | User-defined | JSON path | RESPONSE_BODY_JSON |
| | | User-defined | Header name | RESPONSE_HEADER |
| operator | STRING | -- | Operator type | YES |
| | | contains | Contains | *See [API Reference: operator](#api-reference-operator)  |
| | | does not contain | Does Not Contain | *See [API Reference: operator](#api-reference-operator) |
| | | > | Greater Than | *See [API Reference: operator](#api-reference-operator) |
| | | < | Less Than | *See [API Reference: operator](#api-reference-operator)|
| | | = | Equal To | *See [API Reference: operator](#api-reference-operator) |
| | | !=  | Not Equal To | *See [API Reference: operator](#api-reference-operator) |
| | | Starts With | Starts With | *See [API Reference: operator](#api-reference-operator) |
| value | STRING | User-defined | Rule value | YES |
| enabled | BOOLEAN | -- | Enable/Disable the line | YES |
| | | true | Line enabled | |
| | | false | Line disabled | |

#### API Reference: operator

**HTTP Monitor**

| Operator | Alert Condition Availability
| --- | --- |
| Contains | -- |
| | Response Body |
| | Response Body JSON |
| | Response Header |
| | Response Code |
| | Error |
| Does Not Contain | -- |
| | Metric |
| | Response Body |
| | Response Body JSON |
| | Response Header |
| | Response Code |
| | Error |
| > | -- |
| | Metric |
| | Response Body JSON |
| | Response Code |
| | SSL Certificate Expiry (days) |
| < | -- |
| | Metric |
| | Response Body JSON |
| | Response Code |
| = | -- |
| | Metric |
| | Response Body |
| | Response Body JSON |
| | Response Header |
| | Response Code |
| | Error |
| != | -- |
| | Metric |
| | Response Body |
| | Response Body JSON |
| | Response Header |
| | Response Code |
| | Error |
| Starts With | -- |
| | Response Body |
| | Response Body JSON |
| | Response Header |
| | Response Code |
| | Error |

**Browser Monitor**

| Operator | Alert Condition Availability
| --- | --- |
| Contains | Error |
| Does Not Contain | -- |
| | Metric |
| | Error |
| > | Metric |
| < | Metric |
| = | -- |
| | Metric |
| | Error |
| != | -- |
| | Metric |
| | Error |
| Starts With | Error |

### API Reference: alertRule
| Key | Type | Value | Description | Required
| --- | --- | --- | --- | --- |
| schedule | Array of JSON Objects | *See [API Reference: schedule](#api-reference-schedule) | Notifications Schedule | YES |
| priority | STRING | -- | Alert priority | YES |
| | | INFO | Info | |
| | | WARN | Warning | |
| | | ERROR | Error | |
| | | CRITICAL | Critical | |
| minDelayBetweenNotificationsInMinutes | INTEGER | 1-90 | Delay in minutes between notifications (1-90) | YES |
| backToNormalNeeded | BOOLEAN | -- | Alert when the value goes back to non-alert level | YES |
| | | true | Enabled | |
| | | false | Disabled | |
| failedRunCountToAlert | INTEGER | 1-5 | Alert after N failed runs from a location (1-5) | YES |
| notificationsEnabled | BOOLEAN | -- | Enable/Disable notifications | YES |
| | | true | Enable notifications | |
| | | false | Disable notifications | |
| useOnlyAlertRuleIntegrations | BOOLEAN | -- | Use account-default notification hooks for this alert | YES |
| | | true | Enable account-default notification hooks | |
| | | false | Disable account-default notification hooks |

### API Reference: schedule
| Key | Type | Value | Description | Required
| --- | --- | --- | --- | --- |
| day | STRING | -- | Day of the week | YES |
| | | Monday | Monday | |
| | | Tuesday | Tuesday | |
| | | Wednesday | Wednesday | |
| | | Thursday | Thursday | |
| | | Friday | Friday | |
| | | Saturday | Saturday | |
| | | Sunday | Sunday | |
| index | INTEGER | -- | Day index | YES |
| | | 1 | Sunday | |
| | | 2 | Monday | |
| | | 3 | Tuesday | |
| | | 4 | Wednesday | |
| | | 5 | Thursday | |
| | | 6 | Friday | |
| | | 7 | Saturday | |
| label | STRING | -- | Day label | YES |
| | | MON | Monday | |
| | | TUE | Tuesday | |
| | | WED | Wednesday | |
| | | THU | Thursday | |
| | | FRI | Friday | |
| | | SAT | Saturday | |
| | | SUN | Sunday | |
| intervals | Array of JSON Objects | *See [API Reference: intervals](#api-reference-intervals) | Notifications Schedule | YES - Empty for All Day or Inactive |
| type | STRING | -- | Schedule Type | YES |
| | | ACTIVE | All Day | |
| | | CUSTOM | Intervals | |
| | | INACTIVE | Inactive All Day | |

### API Reference: intervals
| Key | Type | Value | Description | Required
| --- | --- | --- | --- | --- |
| start | STRING | HH:MM | Start time HH:MM | YES |
| end | STRING | HH:MM | End time HH:MM | YES |

## Get Monitors for an App

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

## Get Monitors: API Reference

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

See [API Reference](#api-reference-data) to get the location IDs.

## Create/Edit Scheduled Pauses using the API

You can also create or edit [scheduled pauses](/docs/synthetics/scheduled-pauses/) using the Synthetics API.

### Create a Scheduled Pause

