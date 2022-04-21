title: CI/CD Integration
description: Guide to how to run HTTP/Browser monitors from your CI/CD pipeline.

In addition to scheduled monitor runs, you can also trigger monitor runs by using an API. You can use this API to trigger monitor runs as part of your CI/CD pipeline and block deployments if runs fail. When a run fails, you'll be alerted via your configured alert [notification hooks](../alerts/alert-notifications.md). The run monitor API can be used to:

* Test the APIs, websites, and the user journeys in your PR and staging environments and annotate the pull requests with the results. 
* Test the APIs, websites, and the user journeys in production immediately after deployment and alert when it fails.
* Track and catch major changes in website metrics like page load time, page size, request count, 3rd Party API performance, etc introduced as part of code changes.

## Run Monitor API

The run monitor API can be triggered by sending an HTTP request with the below configuration:

**US Region Endpoint** - `https://apps.sematext.com/synthetics-api/api/v3/apps/<appId>/monitors/runs`

**EU Region Endpoint** - `https://apps.eu.sematext.com/synthetics-api/api/v3/apps/<appId>/monitors/runs`

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

* The `<appId>` and `<monitorId>` values can be extracted from the URL of the Monitor Overview page. For example, if the Monitor Overview page URL is `https://apps.sematext.com/ui/synthetics/12345/monitors/276` then the `appId` is `12345` and `monitorId` is `276`.
* `<apiKey>` of your account can be copied from Settings -> API page.
* `<locationId>` - List of locations to run the monitor from. If not specified, the monitor will be run from all locations specified in the monitor configuration. The supported locations are:

| Location ID  | Location |
|---|---|
| us-east-1      | N. Virginia, USA   |
| eu-west-1      | Ireland            |
| ap-south-1     | Mumbai, India      |
| ap-southeast-1 | Singapore          |
| ap-southeast-2 | Sydney, Australia  |
| eu-central-1   | Frankfurt, Germany |
| sa-east-1      | São Paulo, Brazil  |
| us-west-1      | N. California, USA |


**Example Request**

The below API triggers runs for monitors with ID `276` and `335` belonging to App with ID `12345` from locations `N.Virginia, USA`, `Mumbai, India` and `N.Virginia, USA`, `Ireland, Europe` respectively.

```sh
curl --request POST \
  --url https://apps.sematext.com/synthetics-api/api/v3/apps/12345/monitors/runs \
  --header 'Authorization: apiKey 1d7a2d6b-xxxx-xxxx-xxxx-10f83c5c8da7' \
  --header 'Content-Type: application/json' \
  --data '[
    {
        "monitorId": 276,
        "regions": ["us-east-1","ap-south-1"]
    },
    {
        "monitorId": 335,
        "regions": ["us-east-1","eu-west-1"]
    }
]'
```

### Customize Request Configuration

There are cases where you might want to customize request parameters depending on the environment. For example, the deployment URL for running the monitor in a PR env or a different HTTP header for the staging environment. You can pass these custom configurations as part of run monitor API data. When the custom values are passed the configured values for scheduled runs will be overridden with the custom values.

For [HTTP monitors](./http-monitor.md), the following fields can be customized:

* URL
* Request Headers
* Request Cookies
* Request Params
* Request Body

Below is an example, where we are override the HTTP configuration parameters:

```sh
curl --request POST \
  --url https://apps.sematext.com/synthetics-api/api/v3/apps/12345/monitors/runs \
  --header 'Authorization: apiKey 1d7a2d6b-xxxx-xxxx-xxxx-10f83c5c8da7' \
  --header 'Content-Type: application/json' \
  --data '[
    {
        "monitorId": 276,
        "url": "https://pr-2589.app.acme.com",
        "headers": [
            {
                "name": "Authorization",
                "value": "pr-env-key"
            }
        ]
    }
]'
```

For [Browser monitors](./browser-monitor.md), the URL of the website can be customized.

For Browser monitors with a script, you can pass custom parameters as variables, that could be referenced in the script.

### Customize Output Format

By default the API output will be in JSON format. While invoking the API in build pipelines, it might be useful to display the output in a table format, so that the output could be easily interpreted. To get the output in table format, set the `Accept` header to `text/plain`. The API response contains the summary of the request and lists the individual run results with the link to the run result page. Below is an example request along with the output:

```sh
curl -s --request POST --url https://apps.sematext.com/synthetics-api/api/v3/apps/12345/monitors/runs --header 'authorization: apiKey 1d7e2d6b-xxxx-xxxx-xxxx-10f83c5a8da7' --header 'accept: text/plain'        --header 'content-type: application/json' --data '[{"monitorId": 276}]' 

All monitors passed successfully.
Name            ID  Region      Status  Conditions  URL
AllLocations    276 us-east-1   passed  3/3 Passed  https://apps.sematext.com/ui/synthetics/12345/monitors/276/runs/5173798
AllLocations    276 us-west-1   passed  3/3 Passed  https://apps.sematext.com/ui/synthetics/12345/monitors/276/runs/5173805
AllLocations    276 ap-south-1  passed  3/3 Passed  https://apps.sematext.com/ui/synthetics/12345/monitors/276/runs/5173800
```

## Create Monitor API

The create monitor API can be triggered by sending a HTTP request with the below configuration:

| Type | Region | Endpoint
| --- | --- | --- |
| Browser Monitor | US | `https://apps.sematext.com/synthetics-api/api/apps/<appId>/monitors/browser` |
| Browser Monitor | EU | `https://apps.eu.sematext.com/synthetics-api/api/apps/<appId>/monitors/browser` |
| HTTP Monitor | US | `https://apps.sematext.com/synthetics-api/api/apps/<appId>/monitors/http` |
| HTTP Monitor | EU | `https://apps.eu.sematext.com/synthetics-api/api/apps/<appId>/monitors/http` |

**HTTP Method** - `POST`

**Request Headers** - `Authorization: apiKey <apiKey>`

### appId
The `<appId>` can be obtained by sending a GET request using the above request header and `<apiKey>` to the required endpoint:

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

### API Reference
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
| url | STRING | User-defined | URL to monitor | YES - Empty for User Journey |
| method | STRING | -- | HTTP method | YES - Not for User Journey |
| | | GET | Perform a GET request | Required for website Browser Monitor |
| | | POST | Perform a POST request | HTTP monitor only |
| | | PUT | Perform a PUT request | HTTP monitor only |
| | | DELETE | Perform a DELETE request | HTTP monitor only |
| | | PATCH | Perform a PATCH request | HTTP monitor only |
| body | STRING | User-defined | Request body | NO - Optional for HTTP Monitor |
| headers | Array of JSON Objects | -- | Request headers | NO - Optional for HTTP Monitor |
| | | *See [API Reference: headers](#api-reference-headers) | | |
| params | Array of JSON Objects | -- | Request params | NO - Optional for HTTP Monitor |
| | | *See [API Reference: params](#api-reference-params) | | |
| cookies | Array of JSON Objects | -- | Request cookies | NO - Optional for HTTP Monitor |
| | | *See [API Reference: cookies](#api-reference-cookies) | | |
| script | STRING | User-defined | User Journey Script | Only for Browser Monitor |
| | |  | | *Empty for website monitor |
| scriptBased | BOOLEAN | -- | Browser Monitor mode | Only for Browser Monitor |
| | | true | Monitor a User Journey | |
| | | false | Monitor a Website | |
| conditions | Array of JSON Objects | -- | Alert Conditions | YES |
| | | *See [API Reference: conditions](#api-reference-conditions) | | |
| alertRule | JSON Object | -- | Alert Settings | YES |
| | | *See [API Reference: alertRule](#api-reference-alertrule) | | |
| monitorSSLExpiry | BOOLEAN | -- | Alert when SSL certificate is expiring in 28, 14, 7, and 3 days | HTTP monitor only |
| | | true | SSL expiry alert enabled | |
| | | false | SSL expiry alert disabled | |
| monitorSSLChange | BOOLEAN | -- | Alert when SSL certificate change is detected | HTTP monitor only |
| | | true | SSL certificate change alert enabled | |
| | | false | SSL certificate change alert disabled | |
| allowInsecureSSL | BOOLEAN | -- | Type of SSL Certificate check | HTTP monitor only |
| | | true | Relaxed | |
| | | false | Strict | |

### API Reference: headers
| Key | Type | Value | Description | Required
| --- | --- | --- | --- | --- |
| Name | STRING | User-defined | Custom header name | YES |
| Value | STRING | User-defined | Custom header value | YES |

### API Reference: params
| Key | Type | Value | Description | Required
| --- | --- | --- | --- | --- |
| Name | STRING | User-defined | Custom parameter name | YES |
| Value | STRING | User-defined | Custom parameter value | YES |

### API Reference: cookies
| Key | Type | Value | Description | Required
| --- | --- | --- | --- | --- |
| Name | STRING | User-defined | Custom cookie name | YES |
| Value | STRING | User-defined | Custom cookie value | YES |

### API Reference: conditions
| Key | Type | Value | Description | Required
| --- | --- | --- | --- | --- |
| id | INTEGER | User-defined | Alert condition line number | YES |
| type | STRING | -- | Alert condition type | YES |
| | | METRIC | Metric | |
| | | RESPONSE_BODY | Response Body | Only HTTP monitor |
| | | RESPONSE_BODY_JSON | Response Body JSON | Only HTTP monitor |
| | | RESPONSE_HEADER | Response Header | Only HTTP monitor |
| | | RESPONSE_CODE | Response Code | Only HTTP monitor |
| | | ERROR | Error | |
| | | SSL_CERT_EXPIRY | SSL Certificate Expiry (days) | *Only > operator available |
| key | STRING | -- | Alert condition field | Only for the following: |
| | | synthetics.http.time.dns | DNS time (ms) | Metric |
| | | synthetics.http.time.connect | Connect time (ms) | Metric |
| | | synthetics.http.time.tls | TLS time (ms) | Metric |
| | | synthetics.http.time.firstbyte | Time to first byte (ms) | Metric |
| | | synthetics.http.time.download | Download time (ms) | Metric |
| | | synthetics.browser.transfer.size  | Bytes Transferred (Bytes) | Metric - Only browser monitor |
| | | synthetics.browser.request.count | Request Count | Metric - Only browser monitor |
| | | synthetics.time.response | Response time (ms) | Metric |
| | | synthetics.http.response.size | Response size (bytes) | Metric |
| | | User-defined | JSON path | Response Body JSON |
| | | User-defined | Header name | Response Header |
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

### API Reference: operator

**HTTP Monitor**
| Operator | Alert Condition Availability
| --- | --- |
| Contains | Response Body |
| | Response Body JSON |
| | Response Header |
| | Response Code |
| | Error |
| Does Not Contain | Metric |
| | Response Body |
| | Response Body JSON |
| | Response Header |
| | Response Code |
| | Error |
| > | Metric |
| | Response Body JSON |
| | Response Code |
| | SSL Certificate Expiry (days) |
| < | Metric |
| | Response Body JSON |
| | Response Code |
| = | Metric |
| | Response Body |
| | Response Body JSON |
| | Response Header |
| | Response Code |
| | Error |
| != | Metric |
| | Response Body |
| | Response Body JSON |
| | Response Header |
| | Response Code |
| | Error |
| Starts With | Response Body |
| | Response Body JSON |
| | Response Header |
| | Response Code |
| | Error |

**Browser Monitor**
| Operator | Alert Condition Availability
| --- | --- |
| Contains | Error |
| Does Not Contain | Metric |
| | Error |
| > | Metric |
| < | Metric |
| = | Metric |
| | Error |
| != | Metric |
| | Error |
| Starts With | Error |

### API Reference: alertRule
| Key | Type | Value | Description | Required
| --- | --- | --- | --- | --- |
| schedule | Array of JSON Objects | -- | Notifications Schedule | YES |
| | | *See [API Reference: schedule](#api-reference-schedule) | | |
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
| intervals | Array of JSON Objects | -- | Notifications Schedule | YES - Empty for All Day or Inactive |
| | | *See [API Reference: intervals](#api-reference-intervals) | | |
| type | STRING | -- | Schedule Type | YES |
| | | ACTIVE | All Day | |
| | | CUSTOM | Intervals | |
| | | INACTIVE | Inactive All Day | |

### API Reference: intervals
| Key | Type | Value | Description | Required
| --- | --- | --- | --- | --- |
| start | STRING | HH:MM | Start time HH:MM | YES |
| end | STRING | HH:MM | End time HH:MM | YES |

### Create a Browser Monitor
To create a Browser Monitor with a User Journey script, we would send a HTTP request as follows:
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
        2,
        3,
        4
    ],
    "url": "",
    "script": "// Example script\n async function testPage(page) {\n   await page.goto(\"https://www.google.com/\");\n   await page.screenshot({ path: '\''screenshot.jpg'\'' });\n }\n module.exports = testPage;",
    "scriptBased": true,
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
                   },
                ]
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
        "minDelayBetweenNotificationsInMinutes": "10",
        "backToNormalNeeded": true,
        "failedRunCountToAlert": 1,
        "notificationsEnabled": true,
        "useOnlyAlertRuleIntegrations": false
    }
}'
```

To create a Browser Monitor to monitor a website, we would send a HTTP request as follows:
```
curl -L -X POST 'https://apps.sematext.com/synthetics-api/api/apps/17174/monitors/browser' \
-H 'Authorization: apiKey 9bddb0a6-xxxx-xxxx-xxxx-397d15806cfd' \
-H 'Content-Type: application/json' \
--data-raw '{
    "name": "Example browser monitor without script",
    "interval": "10m",
    "enabled": true,
    "locations": [
        1,
        2
    ],
    "url": "https://www.google.com/",
    "script": "// Doesn'\''t matter since it doesn'\''t use a script",
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
        "minDelayBetweenNotificationsInMinutes": "10",
        "backToNormalNeeded": true,
        "failedRunCountToAlert": 1,
        "notificationsEnabled": true,
        "useOnlyAlertRuleIntegrations": false
    }
}'
```

### Create a HTTP Monitor
To create a HTTP Monitor, we would send a HTTP request as follows:
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
## Get all Monitors for an app

To get all the available monitors for an app, the API can be triggered by sending a HTTP request with the below configuration:

| Region | Endpoint
| --- | --- |
| US | `https://apps.sematext.com/synthetics-api/api/apps/<appId>/monitors` |
| EU | `https://apps.eu.sematext.com/synthetics-api/api/apps/<appId>/monitors` |

**HTTP Method** - `GET`

**Request Headers** - `Authorization: apiKey <apiKey>`

Example:

In order to get all the available monitors for the app with appId of `17174`, we would send a HTTP request as follows:
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

In the above example we can see that the `monitorId` for the `Example HTTP monitor` is `3124`. Using the obtained `monitorId`, we can then perform an API request to retrieve only information on the `Example HTTP monitor`.

## Get single Monitor for an app

To get information on a single monitor for an app, the API can be triggered by sending a HTTP request with the below configuration:

| Region | Endpoint
| --- | --- |
| US | `https://apps.sematext.com/synthetics-api/api/apps/<appId>/monitors/<monitorId>` |
| EU | `https://apps.eu.sematext.com/synthetics-api/api/apps/<appId>/monitors/<monitorId>` |

**HTTP Method** - `GET`

**Request Headers** - `Authorization: apiKey <apiKey>`

Example:

In order to get information on the monitor with a monitorId of `3124` for the app with appId `17174`, we would send a HTTP request as follows:
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

## Integrations

Using the run monitor API, you can integrate [Sematext Synthetics](./index.md) to your CI/CD pipeline. Below are the steps to trigger monitor runs from various CI/CD tools.

### Jenkins

**Create API Key Secret**

Create a secret credential for Sematext API Key to be used in the run monitor API request.

<img
  class="content-modal-image"
  alt="CI/CD Jenkins Credentials"
  src="../../images/synthetics/ci-cd-jenkins-secret.png"
  title="Add Secret Credential in Jenkins"
/>

**Add Run Monitor stage to the pipeline in Jenkinsfile**

Add a stage in the Jenkinsfile to invoke the run monitor API, check the results, and exit the pipeline on failure. 

```groovy
stage('Run Sematext monitors') {
      withCredentials([string(credentialsId: 'SEMATEXT_API_KEY', variable: 'SEMATEXT_API_KEY')]) {
        sh """
            curl -s --request POST \
              --url https://apps.sematext.com/synthetics-api/api/v3/apps/12345/monitors/runs \
                --header 'authorization: apiKey ${SEMATEXT_API_KEY}' \
                  --header 'accept: text/plain' \
                    --header 'content-type: application/json' \
                      --data '[{"monitorId": 276}]' > results.txt
            cat results.txt
            if [ \$(head -1 results.txt | grep -c 'failed') -ne 0 ]; then exit 1; fi
          """
      }
    }
```

### Travis CI

Update `.travis.yaml` to include `after_deploy` phase to trigger a monitor run after the deployment. Define `SEMATEXT_API_KEY` as an environment variable in [Repository Settings](https://docs.travis-ci.com/user/environment-variables/#defining-variables-in-repository-settings).

```yaml
# This example deploys a nodejs project in heroku and triggers a monitor run after the deployment. 
language: node_js
node_js:
  - 10
cache:
  directories:
    - node_modules
script:
  - npm run test:unit
  - npm run build
before_deploy: "echo 'Deploying.'"
deploy:
  provider: heroku
  api_key: $HEROKU_API_KEY
  app: my-heroku-website

after_deploy: 
  - echo 'Deployment finished. Running Sematext Synthetics monitors..'
  - curl -H "authorization:apiKey $SEMATEXT_API_KEY" -H "accept:text/plain" -H "content-type:application/json" -s -X POST -d "[{\"monitorId\":276}]" https://apps.sematext.com/synthetics-api/api/v3/apps/12345/monitors/runs > results.txt
  - cat results.txt
  - if [ $(head -1 results.txt | grep -c 'failed') -ne 0 ]; then exit 1; fi
```

### Circle CI

Update `.circleci/config.yml` to trigger a monitor run after the deployment. Define `SEMATEXT_API_KEY` as an environment variable under [Project Settings](https://circleci.com/docs/2.0/env-vars/#setting-an-environment-variable-in-a-project).

```yaml
version: 2.1
jobs:
  build:
    docker:
      - image: circleci/node:15.0.1
    steps:
      - checkout
      - run:
          name: Setup
          command: |
            echo "Setup starting..."
            npm install
      - run:
          name: Build
          command: |
            echo "Building..."
            npm run build
      - run:
          name: Test
          command: |
            echo "Running tests..."
            npm run test:unit
      - run:
          name: Deploy
          command: 
            echo "Deploying the App..."
            # Deploy your App
      - run:
          name: Trigger Sematext run monitor
          command: |
            echo 'Deployment finished. Running Sematext Synthetics monitors..'
            curl -H "authorization:apiKey $SEMATEXT_API_KEY" -H "accept:text/plain" -H "content-type:application/json" -s -X POST -d "[{\"monitorId\":276}]" https://apps.sematext.com/synthetics-api/api/v3/apps/12345/monitors/runs > results.txt
            cat results.txt
            if [ $(head -1 results.txt | grep -c 'failed') -ne 0 ]; then exit 1; fi
```

### Github Actions

**Create API Key Secret**

Create a secret from the Repository Settings, for Sematext API Key.

<img
  class="content-modal-image"
  alt="CI/CD GitHub Secret"
  src="../../images/synthetics/ci-cd-github-secret.png"
  title="Add Secret in Github"
/>

**Add Run Monitor Job to GitHub Action Workflow YAML**

Create `.github/workflows/run-monitor.yml` GitHub Actions YAML to run your monitors on various CI/CD events. For example, to run the monitor after a deployment event, create a GitHub Action Job that gets executed on `deployment_status` event. The below action uses the `deployment_status.target_url` to pass the custom URL to the run monitor API.

```yaml
name: CI

# Execute the run monitor job on deployment status event
on:
  deployment_status:

jobs:
  run_monitor:
    runs-on: ubuntu-latest
    outputs:
      output1: ${{ steps.run.outputs.test }}

    steps:
      - uses: actions/checkout@v2

      - name: Run Sematext Monitor
        env:
          API_KEY: ${{ secrets.SEMATEXT_API_KEY }}
        id: run
        run: |
          target_url=`cat "$GITHUB_EVENT_PATH" | jq .deployment_status.target_url`
          curl -s --request POST \
            --url https://apps.sematext.com/synthetics-api/api/v3/apps/12345/monitors/runs \
              --header 'authorization: apiKey '$API_KEY \
                --header 'accept: text/plain' \
                  --header 'content-type: application/json' \
                    --data '[{"monitorId": 276, "url":'$target_url'}]' > results.txt
          cat results.txt
          if [ $(head -1 results.txt | grep -c 'failed') -ne 0 ]; then exit 1; fi
```

**GitHub Actions Logs**

On every deployment event, the action will be invoked and the action logs will contain the results.

<img
  class="content-modal-image"
  alt="CI/CD GitHub Secret"
  src="../../images/synthetics/ci-cd-github-actions-log.png"
  title="Add Secret in Github"
/>


### Bitbucket Pipelines

**Create API Key Secret**

Create a secret from the Repository Settings -> Repository Variables, for Sematext API Key.

<img
  class="content-modal-image"
  alt="CI/CD Bitbucket Secret"
  src="../../images/synthetics/ci-cd-bitbucket-secret.png"
  title="Add Secret in BitBucket"
/>

**Add Run Monitor Job to Bitbucket Pipeline Workflow YAML**

Add Run Monitor step to `bitbucket-pipelines.yml`. Add the below steps after the deploy step in your pipeline configuration.

```yaml
image: node:10.15.3

pipelines:
  custom:
    sematext:
      - step:
          script:
            - curl -H "authorization:apiKey $SEMATEXT_API_KEY" -H "accept:text/plain" -H "content-type:application/json" -s -X POST -d "[{\"monitorId\":276}]" https://apps.sematext.com/synthetics-api/api/v3/apps/12345/monitors/runs > results.txt
            - cat results.txt
            - if [ $(head -1 results.txt | grep -c 'failed') -ne 0 ]; then exit 1; fi

```

### GitLab CI/CD

**Create API Key Variable**

Create a CI/CD variable from the Settings -> CI/CD -> Variables, for Sematext API Key.

<img
  class="content-modal-image"
  alt="CI/CD GitLab Secret"
  src="../../images/synthetics/ci-cd-gitlab-secret.png"
  title="Add Secret in GitLab"
/>

**Configure Run Monitor Step in Pipeline YAML**

Configure run monitor stage in `.gitlab-ci.yml` to trigger run after deployment and upload the artifacts.

```yaml
stages:
  - deploy
deploy-app:
    stage: deploy
    image: docker:stable
    script:
      - echo "script to deploy your App"
run-sematext-monitor:
    stage: .post
    image: docker:stable
    before_script:
    - apk add --update curl && rm -rf /var/cache/apk/*
    script:
        - curl -H "authorization:apiKey $SEMATEXT_API_KEY" -H "accept:text/plain" -H "content-type:application/json" -s -X POST -d "[{\"monitorId\":276}]" https://apps.sematext.com/synthetics-api/api/v3/apps/12345/monitors/runs > results.txt
        - cat results.txt
        - if [ $(head -1 results.txt | grep -c 'failed') -ne 0 ]; then exit 1; fi
    artifacts:
        expose_as: 'Sematext Monitor Results'
        paths: ['results.txt']
```

### Vercel

Configure [GitHub Action](#github-actions) to run the monitor on deployment event. If the Vercel project repository is GitHub, the action will be automatically triggered on PR or production deployment.

### Netlify

Configure [GitHub Action](#github-actions) to run the monitor on deployment event. If the Netlify project repository is GitHub, the action will be automatically triggered on production deployment.
