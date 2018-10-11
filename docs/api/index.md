title: Sematext Cloud API
description: Sematext Cloud is APM (Application Performance Management), Log Management, Tracing, RUM (Real User Management) platform. Sematext Cloud exposes REST API to access its functionalities and API calls accept JSON in requests and return JSON response. To use the API, you need the API key of your account

#### Introduction
Sematext Cloud exposes REST API to access its functionalities. The REST API can be used to easily manage your Account and Apps remotely, without the need to be logged-in via a browser. It also makes it possible to automate certain tasks, such as creation of new Apps, definition of Alert Rules, etc.

To use the API, you need the API key of your account - it can be found [here](https://apps.sematext.com/ui/account/api) for US region or [here](https://apps.eu.sematext.com/ui/account/api) for EU region. You can also get the API Key using Login endpoint by providing username/password. The API Key needs to be passed as Header parameter with name `Authorization` and value should be in the format `apiKey <Value>`. e.g. `apiKey e5f18450-205a-48eb-8589-7d49edaea813`

Access to API key of some account is allowed for OWNER, BILLING_ADMIN and ADMIN users. Users with USER role cannot access API key of that account, though they can always use their own account's API key to manage their own Account, Apps, etc. 

#### Request/Response format

All API calls accept JSON in requests and return JSON response. For POST requests not all attributes listed in API Explorer are mandatory. All API responses contain attribute `success` which has value true or false. Optional response attributes are `message` (which provides textual message about what API call did) and `data`, which contains data returned by the call, under specific response key (`apps` in the below example). Example of response:
```json
{
  "success": true,
  "message": "Created application new-solr-app, token is: xxxxx-xxxx-xxxxx",
  "data": {
    "apps": [
      {
        "id": 20651,
        "name": "new-solr-app",
        "appType": "Solr",
        "appTypeId": 1,
        ....
      }
    ]
  }
}
```
Also, all responses contain an HTTP code which describes success or failure. In case of a successful call, HTTP code will be 200 (OK). Any other non-2XX HTTP code represents an error (most commonly used codes are 400 - Bad Request, 401 - Unauthorized, 403 - Forbidden and 500 - Internal Server Error).

#### API Explorer

Try out the REST APIs using the API Key of your Sematext account at:

* <a href="https://apps.sematext.com/api-explorer" target="_blank">Sematext Cloud US Region</a>

* <a href="https://apps.eu.sematext.com/api-explorer" target="_blank">Sematext Cloud EU Region</a>
