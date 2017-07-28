*Note: This is Reference for v2 of Logsene API.*

Note: For details on SPM API, see [SPM API
Reference](https://sematext.atlassian.net/wiki/spaces/PUBSPM/pages/40009738/SPM+API+Reference).*

### Introduction to Management API

Logsene HTTP API is used to easily manage and access your Logsene Apps
and their data remotely, without the need to be logged-in via a browser.
It also makes it possible to automate certain tasks, such as creation of
new Apps, definition of Alert Rules, etc.  
  
To use the management APIs, you need the API key for your Account (or,
if you are a guest to some other Account under which you want to manage
Apps, Alerts..., then API key of that Account) - it can be
found **[here](https://apps.sematext.com/users-web/account.do#api)**.
API key needs to be passed as an attribute to all API calls and is used
by Logsene to authenticate Account under which some API call is done.
 API keys and App tokens used in this document are fake.  Use your own
API key and App tokens.

Access to API key of some Account is allowed
for **OWNER**, **BILLING\_ADMIN** and **ADMIN** users. Users
with **USER** role **cannot** access API key of that Account, though
they can always use their own Account's API key to manage their own
Account, Apps, etc.  For more info about Account Sharing please see [SPM
FAQ](https://sematext.atlassian.net/wiki/display/PUBSPM/SPM+FAQ#SPMFAQ-HowcanIsharemyappswithotherusers).

### Elasticsearch-compatible Search API

To use the search APIs, see [Search through the Elasticsearch
API](Search-through-the-Elasticsearch-API_19726366.html). This API
is **fully compatible with Elasticsearch's APIs**. To use it you need
just your Logsene App tokens, not the API key.  The rest of this
document describes only the app management APIs.  For searching your
logs from the terminal/console, see [Logsene
CLI](Logsene-CLI_43221002.html).

### Request/Response format

All API calls accept JSON in requests and return JSON response. All API
call requests should contain **apiKey** attribute (among other
attributes specific for that API call). Example of content of one such
call:

``` syntaxhighlighter-pre
{
  "apiKey":"a9092d95-d062-4499-ad0b-a1b43fadb9b5",
  "name":"new-logsene-app-1"
}
```

All API responses contain attribute **success** which has
value **true** or **false**. Optional response attributes
are **message** (which provides textual message about what API call
did) and **data** (which contains data returned by the call). Example of
response:

``` syntaxhighlighter-pre
{
  "success" : true,
  "message" : "Created application for dto: [name=new-logsene-app-1,apiKey=a9092d95-d062-4499-ad0b-a1b43fadb9b5], token is: 61611d45-6ecd-47f7-b5b4-6faccdb2f8c4",
  "data" : {
    "token" : {
      "new-logsene-app-1" : "61611d45-6ecd-47f7-b5b4-6faccdb2f8c4"
    }
  }
}
```

Also, all responses contain an HTTP code which describes success or
failure. In case of a successful call, HTTP code will be **200** (OK).
Any other non-2XX HTTP code represents an error (most commonly used
codes are **400** - Bad Request, **401** - Unauthorized, **403** -
Forbidden and **500** - Internal Server Error).

### Apps API

#### Create Logsene App

Creates new Logsene app under referenced account.

<table>
<colgroup>
<col width="25%" />
<col width="25%" />
<col width="25%" />
<col width="25%" />
</colgroup>
<thead>
<tr class="header">
<th><div class="tablesorter-header-inner">
API call
</div></th>
<th><div class="tablesorter-header-inner">
HTTP Method
</div></th>
<th><div class="tablesorter-header-inner">
Attributes
</div></th>
<th><div class="tablesorter-header-inner">
Description
</div></th>
</tr>
</thead>
<tbody>
<tr class="odd">
<td><a href="https://apps.sematext.com/logsene-reports/api/v2/app/add" class="uri" class="external-link">https://apps.sematext.com/logsene-reports/api/v2/app/add</a></td>
<td>POST</td>
<td><p><strong>apiKey</strong> (of account under which app will be created)</p>
<p><strong>name </strong>(of app which will be created)</p>
<p><strong>discountCode</strong> (optional parameter, send only if you have a valid code)</p></td>
<td><p>Creates new <strong>Logsene</strong> application under account defined by <strong>apiKey</strong>, with name<strong> name </strong>(such name should be unique among other Logsene apps under this account)</p></td>
</tr>
</tbody>
</table>

Example of API
call:

``` syntaxhighlighter-pre
curl -X POST -k -H "Content-Type: application/json" "https://apps.sematext.com/logsene-reports/api/v2/app/add" -d '
{
  "apiKey":"a9092d95-d062-4499-ad0b-a1b43fadb9b5",
  "name":"new-logsene-app-1"
}'
```

Example of success response (with HTTP status 200):

``` syntaxhighlighter-pre
{
  "success" : true,
  "message" : "Created application for dto: [name=new-logsene-app-1,apiKey=a9092d95-d062-4499-ad0b-a1b43fadb9b5], token is: 61611d45-6ecd-47f7-b5b4-6faccdb2f8c4",
  "data" : {
    "token" : {
      "new-logsene-app-1" : "61611d45-6ecd-47f7-b5b4-6faccdb2f8c4"
    }
  }
}
```

Example of non-200 response:

``` syntaxhighlighter-pre
{
  "success" : false,
  "message" : "User identified with API key a9092d95-d062-4499-ad0b-a1b43fadb9b4 doesn't exist"
}
```

#### List Apps

<table>
<colgroup>
<col width="25%" />
<col width="25%" />
<col width="25%" />
<col width="25%" />
</colgroup>
<thead>
<tr class="header">
<th>API call</th>
<th>HTTP Method</th>
<th>Attributes</th>
<th>Description</th>
</tr>
</thead>
<tbody>
<tr class="odd">
<td><a href="https://apps.sematext.com/spm-reports/api/v1/app/add.do" class="external-link">https://apps.sematext.com/users-web/api/v2/app/list</a></td>
<td>POST</td>
<td><p><strong>apiKey</strong> (of account whose apps are fetched)</p></td>
<td><p>Fetches all apps which can be accessed by account represented with <strong>apiKey</strong>. All app roles will be included (OWNER, ADMIN, USER). Apps available through sharing of other accounts will not be returned.</p></td>
</tr>
</tbody>
</table>

Example of API
call:

``` syntaxhighlighter-pre
curl -X POST -k -H "Content-Type: application/json" "https://apps.sematext.com/users-web/api/v2/app/list" -d '
{
  "apiKey":"a9092d95-d06-4499-ad0b-a1b43fadb9b5"
}'
```

Example of a success response (with HTTP code 200):

``` syntaxhighlighter-pre
{
  "success" : true,
  "data" : {
    "apps" : {
      "logsene" : [ {
        "planId" : "10000",
        "trialEndDate" : "Sun Jul 17 23:59:59 UTC 2015",
        "appType" : "Logsene",
        "appStatus" : "ACTIVE",
        "ownerEmail" : "some-email-address@your-company.com",
        "planName" : "Basic Logsene",
        "token" : "01f1d605-8ab4-4a08-bf7e-ef2749e90de5",
        "service" : "logsene",
        "role" : "USER",
        "name" : "logsene1"
      }, {
        "planId" : "10000",
        "trialEndDate" : "Sun Jul 17 23:59:59 UTC 2015",
        "appType" : "Logsene",
        "appStatus" : "ACTIVE",
        "ownerEmail" : "some-email-address@your-company.com",
        "planName" : "Basic Logsene",
        "token" : "61ae423c-9e81-4201-9a57-30442196200d",
        "service" : "logsene",
        "role" : "ADMIN",
        "name" : "logsene2"
      }, {
.
.
.
      }, {
        "planId" : "27",
        "trialEndDate" : "Sun Feb 17 23:59:59 UTC 2015",
        "appType" : "Solr",
        "appStatus" : "ACTIVE",
        "ownerEmail" : "some-email-address@your-company.com",
        "planName" : "Pro Silver SPM Solr",
        "token" : "61611d45-6ecd-47f7-b5b4-6faccdb2f8c4",
        "service" : "spm",
        "role" : "OWNER",
        "name" : "spmSolr1"
      } ]
    }
  }
}
```

**Note**: It will return all apps registered under provided account, not
just Logsene apps.

### Alerts API

Logsene Alerts HTTP API lets you:

  - list all alerts defined for some app
  - delete/enable/disable individual alerts
  - create new alerts (of any type: threshold, anomaly)
  - list alert notifications

When using Logsene Alerts API, you will need to use API key which
belongs to OWNER of the app to which alerts are related. If you are
managing alerts for your apps, then just use your API key. If you are
managing alerts for apps that belong to some other account (and your are
just a guest in that account with role **BILLING\_ADMIN** or **ADMIN**),
you will have to use API key of that account (in both cases the key can
be found [here](https://apps.sematext.com/users-web/account.do#api), you
just have to consider which account you are currently logged into).

#### List Alerts

Fetches all alerts of specific type (threshold, anomaly) for a
particular Logsene app.

<table>
<colgroup>
<col width="25%" />
<col width="25%" />
<col width="25%" />
<col width="25%" />
</colgroup>
<thead>
<tr class="header">
<th><div class="tablesorter-header-inner">
API call
</div></th>
<th><div class="tablesorter-header-inner">
HTTP Method
</div></th>
<th><div class="tablesorter-header-inner">
Attributes
</div></th>
<th><div class="tablesorter-header-inner">
Description
</div></th>
</tr>
</thead>
<tbody>
<tr class="odd">
<td><a href="https://apps.sematext.com/logsene-reports/api/v2/alert/threshold/list" class="uri" class="external-link">https://apps.sematext.com/logsene-reports/api/v2/alert/threshold/list</a></td>
<td>POST</td>
<td><p><strong>apiKey</strong> (of owner of app represented with &quot;token&quot;)</p>
<p><strong>appToken </strong>(of app whose alerts are fetched)</p></td>
<td>Fetches all <strong>threshold</strong> based alerts for app<strong> </strong>defined with <strong>appToken</strong></td>
</tr>
<tr class="even">
<td><span class="nolink"><a href="https://apps.sematext.com/logsene-reports/api/v2/alert/anomaly/list" class="uri" class="external-link">https://apps.sematext.com/logsene-reports/api/v2/alert/anomaly/list</a></span></td>
<td>POST</td>
<td><strong>apiKey</strong> (of owner of app represented with &quot;token&quot;)
<p><strong>appToken </strong>(of app whose alerts are fetched)</p></td>
<td>Fetches all <strong>anomaly</strong> alerts for app<strong> </strong>defined with <strong>appToken</strong></td>
</tr>
</tbody>
</table>

Examples of API
calls:

``` syntaxhighlighter-pre
curl -X POST -k -H "Content-Type: application/json" "https://apps.sematext.com/logsene-reports/api/v2/alert/threshold/list" -d '
{
  "apiKey":"a9092d95-d062-4499-ad0b-a1b43fadb9b5",
  "appToken":"12c91563-ba95-4a73-aa5a-08fe04b94631"
}'
 
curl -X POST -k -H "Content-Type: application/json" "https://apps.sematext.com/logsene-reports/api/v2/alert/anomaly/list" -d '
{
  "apiKey":"a9092d95-d062-4499-ad0b-a1b43fadb9b5",
  "appToken":"12c91563-ba95-4a73-aa5a-08fe04b94631"
}'
```

Example of success response (with HTTP status 200):

``` syntaxhighlighter-pre
{

  "success" : true,
  "data" : {
    "alertRules" : {
      "140" : {
        "sendToEmail" : "email-to-send-alerts-to@your-company.com",
        "muteTimePeriodInMinutes" : "30",
        "minDelayBetweenNotificationsInMinutes" : "60",
        "maxNotificationsInMutePeriod" : 3,
        "ignoreRegularEventsEnabled" : false,
        "muteIsGlobal" : false,
        "analyzingTime" : "300",
        "enabled" : true,
        "name" : "Apache Alert",
        "query" : "apache",
        "estimateOperation" : "LESS_OR_EQUAL",
        "estimateValue" : 0.0,
        "backToNormalNeeded" : false
      },
      "149" : {
        "sendToEmail" : "email-to-send-alerts-to@your-company.com",
        "muteTimePeriodInMinutes" : "30",
        "minDelayBetweenNotificationsInMinutes" : "60",
        "maxNotificationsInMutePeriod" : 3,
        "ignoreRegularEventsEnabled" : false,
        "muteIsGlobal" : false,
        "analyzingTime" : "300",
        "enabled" : true,
        "name" : "Warn Alert",
        "query" : "warn",
        "estimateOperation" : "MORE",
        "estimateValue" : 500.0,
        "backToNormalNeeded" : false
      }
    }
  }
}
```

If response succeeded, HTTP code will be 200 and response content will
be a map where keys are alert IDs (which can be used as parameter in
other Alerts API calls) and values are alert objects. The previous
example shows "threshold" alerts; other alert types will show different
attributes in alert objects.

The output of this call can be directly reused for creation of new
alerts, you can just copy alert objects and reuse them (or you can also
adjust some attributes).

#### Create Alert

There are 2 types of alerts available in Logsene - threshold and
anomaly. Each of them has different attributes so there are 2 different
API calls for creating them.

**Threshold** and **Anomaly** Alerts are created for a specific query.

##### Create Threshold Alert

<table>
<colgroup>
<col width="25%" />
<col width="25%" />
<col width="25%" />
<col width="25%" />
</colgroup>
<thead>
<tr class="header">
<th><div class="tablesorter-header-inner">
API call
</div></th>
<th><div class="tablesorter-header-inner">
HTTP Method
</div></th>
<th><div class="tablesorter-header-inner">
Attributes
</div></th>
<th><div class="tablesorter-header-inner">
Description
</div></th>
</tr>
</thead>
<tbody>
<tr class="odd">
<td><span class="nolink"><a href="https://apps.sematext.com/logsene-reports/api/v2/alert/threshold/add" class="uri" class="external-link">https://apps.sematext.com/logsene-reports/api/v2/alert/threshold/add</a></span></td>
<td>POST</td>
<td><p><strong>apiKey</strong> (of owner of app represented with &quot;token&quot;)</p>
<p><strong>appToken </strong>(of app for which alert is created)</p>
<p>+ attributes specific to threshold alert</p></td>
<td>Creates new <strong>threshold</strong> based query alert for Logsene app<strong> </strong>defined with <strong>appToken</strong></td>
</tr>
</tbody>
</table>

Example of API
call:

``` syntaxhighlighter-pre
curl -X POST -k -H "Content-Type: application/json" "https://apps.sematext.com/logsene-reports/api/v2/alert/threshold/add" -d '
{
  "apiKey":"a9092d95-d062-4499-ad0b-a1b43fadb9b5",
  "appToken":"12c91563-ba95-4a73-aa5a-08fe04b94631",
  "alertRule":{
    "name":"Apache alert",
    "query":"apache",
    "enabled":true,
    "estimateValue":500,
    "estimateOperation":"MORE",
    "analyzingTime":5,
    "backToNormalNeeded":false,
    "ignoreRegularEventsEnabled":false,
    "muteTimePeriodInMinutes":30,
    "minDelayBetweenNotificationsInMinutes":1,
    "maxNotificationsInMutePeriod":3,
    "muteIsGlobal":false,
    "sendToEmail":"email-to-send-alerts-to@your-company.com",
    "ruleType": "AFValuesRule"
   }
}'
```

Example of a success response (with HTTP code 200):

``` syntaxhighlighter-pre
{
  "success" : true,
  "message" : "Alert rule created",
  "data" : {
    "alertRule" : {
      "sendToEmail" : "email-to-send-alerts-to@your-company.com",
      "muteTimePeriodInMinutes" : "30",
      "minDelayBetweenNotificationsInMinutes" : "1",
      "maxNotificationsInMutePeriod" : 3,
      "ignoreRegularEventsEnabled" : false,
      "muteIsGlobal" : false,
      "analyzingTime" : "05",
      "systemId" : 2199,
      "enabled" : true,
      "name" : "Apache Alert",
      "query" : "apache",
      "estimateOperation" : "MORE",
      "estimateValue" : 500.0,
      "backToNormalNeeded" : false
    }
  }
}
```

##### Create Anomaly Alert

<table>
<thead>
<tr class="header">
<th><div class="tablesorter-header-inner">
API call
</div></th>
<th><div class="tablesorter-header-inner">
HTTP Method
</div></th>
<th><div class="tablesorter-header-inner">
Attributes
</div></th>
<th><div class="tablesorter-header-inner">
Description
</div></th>
</tr>
</thead>
<tbody>
<tr class="odd">
<td><span class="nolink"><a href="https://apps.sematext.com/logsene-reports/api/v2/alert/anomaly/add" class="uri" class="external-link">https://apps.sematext.com/logsene-reports/api/v2/alert/anomaly/add</a></span></td>
<td>POST</td>
<td><p><strong>apiKey</strong> (of owner of app represented with &quot;token&quot;)</p>
<p><strong>appToken </strong>(of app for which alert is created)</p>
<p>+ attributes specific to anomaly alert</p></td>
<td>Creates new <strong>anomaly</strong> query alert for Logsene app<strong> </strong>defined with <strong>appToken</strong></td>
</tr>
</tbody>
</table>

Example of API
call:

``` syntaxhighlighter-pre
curl -X POST -k -H "Content-Type: application/json" "https://apps.sematext.com/logsene-reports/api/v2/alert/anomaly/add" -d '
{
  "apiKey":"a9092d95-d062-4499-ad0b-a1b43fadb9b5",
  "appToken":"12c91563-ba95-4a73-aa5a-08fe04b94631",
  "alertRule":{
    "name":"Anomaly apache alert",
    "query":"apache",
    "enabled":"true",
    "backToNormalNeeded":false,
    "ignoreRegularEventsEnabled":true,
    "muteTimePeriodInMinutes":"30",
    "analyzingTime" : "05",
    "minDelayBetweenNotificationsInMinutes":"1",
    "maxNotificationsInMutePeriod":"3",
    "muteIsGlobal":false,
    "sendToEmail":"email-to-send-alerts-to@your-company.com",
    "ruleType": "AFAnomalyValuesRule"
   }
}'
```

Example of a success response (with HTTP code 200):

``` syntaxhighlighter-pre
{
  "success" : true,
  "message" : "Alert rule created",
  "data" : {
    "alertRule" : {
      "sendToEmail" : "email-to-send-alerts-to@your-company.com",
      "muteTimePeriodInMinutes" : "30",
      "minDelayBetweenNotificationsInMinutes" : "1",
      "maxNotificationsInMutePeriod" : 3,
      "ignoreRegularEventsEnabled" : true,
      "muteIsGlobal" : false,
      "analyzingTime" : "60",
      "systemId" : 2199,
      "enabled" : true,
      "name" : "Anomaly apache alert",
      "query" : "apache",
      "backToNormalNeeded" : false
    }
  }
}
```

Errors will be returned in case of wrong apiKey or appToken  or if some
of values are missing. Example of a error response when query is not
sent (with HTTP code 400):

``` syntaxhighlighter-pre
{
 "success" : false,
 "message" : "Missing mandatory param alertRule.query"
}
```

#### Delete Alert

<table>
<colgroup>
<col width="25%" />
<col width="25%" />
<col width="25%" />
<col width="25%" />
</colgroup>
<thead>
<tr class="header">
<th>API call</th>
<th>HTTP Method</th>
<th>Attributes</th>
<th>Description</th>
</tr>
</thead>
<tbody>
<tr class="odd">
<td><span class="nolink"><span class="nolink"><span class="nolink"><span class="nolink"><span>https://apps.sematext.com/logsene-reports/api/v2/alert/delete/{alertId}</span></span></span></span></span></td>
<td>DELETE</td>
<td><p><strong>apiKey</strong> (of owner of app represented with &quot;token&quot;)</p>
<p><strong>appToken</strong> (of app to which alert belongs)</p>
<p> </p></td>
<td>Deletes a single alert rule</td>
</tr>
</tbody>
</table>

**Note**: {alertId} value in URL should be replaced with real id of
alert rule which should be deleted - alertId of each alert is returned
as a key in [**list alerts**](#LogseneAPIReference-ListAlerts) API call
response.

Example API
call:

``` syntaxhighlighter-pre
curl -X DELETE -k -H "Content-Type: application/json" "https://apps.sematext.com/logsene-reports/api/v2/alert/delete/141" -d '{
  "apiKey":"a9092d95-d062-4499-ad0b-a1b43fadb9b5",
  "appToken":"12c91563-ba95-4a73-aa5a-08fe04b94631"
}'
```

Example of a success response (with HTTP code 200):

``` syntaxhighlighter-pre
{
  "success" : true,
  "message" : "Alert with alertId 141 deleted",
  "data" : {
    "alertId" : "141"
  }
}
```

#### Enable/Disable Alert

<table>
<colgroup>
<col width="25%" />
<col width="25%" />
<col width="25%" />
<col width="25%" />
</colgroup>
<thead>
<tr class="header">
<th>API call</th>
<th>HTTP Method</th>
<th>Attributes</th>
<th>Description</th>
</tr>
</thead>
<tbody>
<tr class="odd">
<td><span class="nolink"><span class="nolink"><span class="nolink"><span class="nolink"><span class="nolink"><span>https://apps.sematext.com/logsene-reports/api/v2/alert/enable/{alertId}</span></span></span></span></span></span></td>
<td>POST</td>
<td><p><strong>apiKey</strong> (of owner of app whose alert is enabled)</p>
<strong>appToken</strong> (of app to which alert belongs)</td>
<td>Enables alert</td>
</tr>
<tr class="even">
<td><span class="nolink"><span class="nolink"><span class="nolink"><span class="nolink"><span class="nolink"><span class="nolink"><span>https://apps.sematext.com/logsene-reports/api/v2/alert/disable/{alertId}</span></span></span></span></span></span></span></td>
<td>POST</td>
<td><p><strong>apiKey</strong> (of owner of app whose alert is enabled)</p>
<strong>appToken</strong> (of app to which alert belongs)</td>
<td>Disables alert</td>
</tr>
</tbody>
</table>

**Note**: {alertId} value in URL should be replaced with real id of
alert rule which should be deleted - alertId of each alert is returned
as a key in **[list alerts](#LogseneAPIReference-ListAlerts)** API call
response.

Example API
calls:

``` syntaxhighlighter-pre
curl -X POST -k -H "Content-Type: application/json" "https://apps.sematext.com/logsene-reports/api/v2/alert/enable/141" -d '{
  "apiKey":"a9092d95-d062-4499-ad0b-a1b43fadb9b5",
  "appToken":"12c91563-ba95-4a73-aa5a-08fe04b94631"
}'

curl -X POST -k -H "Content-Type: application/json" "https://apps.sematext.com/logsene-reports/api/v2/alert/disable/141" -d '{
  "apiKey":"a9092d95-d062-4499-ad0b-a1b43fadb9b5",
  "appToken":"12c91563-ba95-4a73-aa5a-08fe04b94631"
}'
```

Example of a success responses (with HTTP code 200):

``` syntaxhighlighter-pre
{
  "success" : true,
  "message" : "Alert with alertId 141 enabled",
  "data" : {
    "alertId" : "141"
  }
}

{
  "success" : true,
  "message" : "Alert with alertId 141 disabled",
  "data" : {
    "alertId" : "141"
  }
}
```

#### List Alert Notifications (Coming soon\!)

<table>
<colgroup>
<col width="25%" />
<col width="25%" />
<col width="25%" />
<col width="25%" />
</colgroup>
<thead>
<tr class="header">
<th>API call</th>
<th>HTTP Method</th>
<th>Attributes</th>
<th>Description</th>
</tr>
</thead>
<tbody>
<tr class="odd">
<td><span class="nolink"><span class="nolink"><span class="nolink"><span class="nolink"><span class="nolink"><span>https://apps.sematext.com/logsene-reports/api/v2/alert/notification/list</span></span></span></span></span></span></td>
<td>POST</td>
<td><p><strong>apiKey</strong> (of owner of apps whose alert notifications want to list)</p>
<p><strong>appToken</strong> (of app to list alert notifications for; it is optional - if omitted, alerts for all active apps will be returned)</p>
<p><strong>start</strong> (time of interval to return alert notifications for; optional; can be expressed as timestamp in milliseconds or UTC date in format yyyy-MM-dd HH:mm:ss)</p>
<p><strong>end</strong><span> (time of interval to return alert notifications for; optional<span>; can be expressed as timestamp in milliseconds or UTC date in format </span><span>yyyy-MM-dd HH:mm:ss</span><span>)</span></span></p>
<p><span><strong>interval</strong><span> (to return alert notifications for,expressed in milliseconds; optional; Can use suffixes s, m, h, d to express interval in seconds, minutes, hours, days - e.g. &quot;1d&quot; is equal to &quot;86400000&quot; )</span></span></p></td>
<td>List alerts for provided user, app and defined time interval.</td>
</tr>
</tbody>
</table>

Examples of API
calls:

``` syntaxhighlighter-pre
# alert notifications for last 24h for all apps owned by user with provided key
curl -X POST -k -H "Content-Type: application/json" "https://apps.sematext.com/logsene-reports/api/v2/alert/notification/list" -d '{
  "apiKey":"a9092d95-d062-4499-ad0b-a1b43fadb9b5"
}'
 
# alert notifications for last 24h for app with provided token
curl -X POST -k -H "Content-Type: application/json" "https://apps.sematext.com/logsene-reports/api/v2/alert/notification/list" -d '{
  "apiKey":"a9092d95-d062-4499-ad0b-a1b43fadb9b5",
  "appToken":"12c91563-ba95-4a73-aa5a-08fe04b94631"
}'
 
# alert notifications for one hour interval specified with start and end
curl -X POST -k -H "Content-Type: application/json" "https://apps.sematext.com/logsene-reports/api/v2/alert/notification/list" -d '{
  "apiKey":"a9092d95-d062-4499-ad0b-a1b43fadb9b5",
  "start":"2015-07-28 12:36:14",
  "end":"2015-07-28 13:36:14",
}'
 
# alert notifications for last hour
curl -X POST -k -H "Content-Type: application/json" "https://apps.sematext.com/logsene-reports/api/v2/alert/notification/list" -d '{
  "apiKey":"a9092d95-d062-4499-ad0b-a1b43fadb9b5",
  "interval":"1h",
}'
 
# alert notifications created after timestamp provided in start
curl -X POST -k -H "Content-Type: application/json" "https://apps.sematext.com/logsene-reports/api/v2/alert/notification/list" -d '{
  "apiKey":"a9092d95-d062-4499-ad0b-a1b43fadb9b5",
  "start":"1438086975139"
}'
```

Example of success response (with HTTP code 200):

``` syntaxhighlighter-pre
{
  "success" : true,
  "data" : {
    "alerts" : [ {
      "when" : "23 hours ago",
      "text" : "Test alert",
      "createTime" : "2015-07-28 13:38:26",
      "backToNormal" : false,
      "appName" : "logsene-api-test",
      "appType" : "Logsene",
      "sent" : true
    }, {
      "when" : "23 hours ago",
      "text" : "Test alert",
      "createTime" : "2015-07-28 13:35:11",
      "backToNormal" : false,
      "appName" : "test-logsene",
      "appType" : "Logsene",
      "sent" : true
    } ],
    "start" : "2015-07-28 12:36:15",
    "end" : "2015-07-29 12:36:15"
  }
}
```

Regardless on how input is defined, output will contain list of alert
notifications matching criteria and start and end dates of returned
interval. Following tables explains rules how star, end and interval are
combined.

<table>
<colgroup>
<col width="25%" />
<col width="25%" />
<col width="25%" />
<col width="25%" />
</colgroup>
<thead>
<tr class="header">
<th>&quot;start&quot;</th>
<th>&quot;end&quot;</th>
<th>&quot;interval&quot;</th>
<th>Rule</th>
</tr>
</thead>
<tbody>
<tr class="odd">
<td>No</td>
<td>No</td>
<td>No</td>
<td><p>[current - 24h, current]</p></td>
</tr>
<tr class="even">
<td>No</td>
<td>No</td>
<td>Yes</td>
<td>[current - interval, current]</td>
</tr>
<tr class="odd">
<td>No</td>
<td>Yes</td>
<td>No</td>
<td>[end - 24h, end]</td>
</tr>
<tr class="even">
<td>No</td>
<td>Yes</td>
<td>Yes</td>
<td>[end - interval, end]</td>
</tr>
<tr class="odd">
<td>Yes</td>
<td>No</td>
<td>No</td>
<td>[start, current]</td>
</tr>
<tr class="even">
<td>Yes</td>
<td>No</td>
<td>Yes</td>
<td>[start, start + interval]</td>
</tr>
<tr class="odd">
<td>Yes</td>
<td>Yes</td>
<td>No</td>
<td>[start, end]</td>
</tr>
<tr class="even">
<td>Yes</td>
<td>Yes</td>
<td>Yes</td>
<td>[start, end]</td>
</tr>
</tbody>
</table>

 

### Subscriptions API

Subscriptions API provides API calls for fetching of existing
subscriptions and for triggering emailing of reports.

#### List Subscriptions

For particular Logsene application, this API call will return a list of
all existing subscriptions.

<table>
<colgroup>
<col width="25%" />
<col width="25%" />
<col width="25%" />
<col width="25%" />
</colgroup>
<thead>
<tr class="header">
<th><div class="tablesorter-header-inner">
API call
</div></th>
<th><div class="tablesorter-header-inner">
HTTP Method
</div></th>
<th><div class="tablesorter-header-inner">
Attributes
</div></th>
<th><div class="tablesorter-header-inner">
Description
</div></th>
</tr>
</thead>
<tbody>
<tr class="odd">
<td><p><span class="nolink"><span class="nolink"><span class="nolink"><span class="nolink"><span class="nolink"><a href="https://apps.sematext.com/logsene-reports/api/v2/subscription/list" class="uri" class="external-link">https://apps.sematext.com/logsene-reports/api/v2/subscription/list</a></span></span></span></span></span></p>
<p><span class="nolink"><span class="nolink"><span class="nolink"><span class="nolink"><span class="nolink"><a href="http://list.do/" class="external-link"><br />
</a></span></span></span></span></span></p></td>
<td>POST</td>
<td><p><strong>apiKey</strong> (of owner of app represented with &quot;token&quot;)</p>
<p><strong>appToken</strong> (token of app whose metrics info is being fetched)</p></td>
<td><p>Fetches subscriptions for Logsene app defined with <strong>appToken</strong>.</p>
<p> </p></td>
</tr>
</tbody>
</table>

Example of API
call:

``` syntaxhighlighter-pre
curl -X POST -k -H "Content-Type: application/json" "https://apps.sematext.com/logsene-reports/api/v2/subscription/list -d '
{
  "apiKey":"a9092d95-d062-4499-ad0b-a1b43fadb9b5",
  "appToken":"01f1d605-8ab4-4a08-bf7e-ef2749e90de5"
}'
```

Example of a success response (with HTTP code 200):

``` syntaxhighlighter-pre
{
  "success" : true,
  "data" : {
    "subscriptions" : [ {
      "subscriptionId" : "55",
      "subject" : "[Sematext Logsene] 'Query: warning' for 'Logsene web server' application.",
      "appToken" : "01f1d605-8ab4-4a08-bf7e-ef2749e90de5",
      "appName" : "logsene1",
      "timeRange" : "ONE_WEEK",
      "attributes" : [ "report name = Query: warning, filters: " ],
      "emailTo" : [ "email-to-send-alerts-to@your-company.com" ]
    }, {      "subscriptionId" : "76",
      "subject" : "[Sematext Logsene] 'Query: error' for 'Logsene web server' application.",
      "appToken" : "01f1d605-8ab4-4a08-bf7e-ef2749e90de5",
      "appName" : "logsene1",
      "timeRange" : "ONE_WEEK",
      "attributes" : [ "report name = Query: error, filters: " ],
      "emailTo" : [ "email-to-send-alerts-to@your-company.com" ]
    } ]

  }
}
```

#### Email Report

Triggers instant emailing of a report defined by some subscription.

<table>
<colgroup>
<col width="100%" />
</colgroup>
<tbody>
<tr class="odd">
<td> </td>
</tr>
<tr class="even">
<td>API call</td>
</tr>
<tr class="odd">
<td><p><span class="nolink"><span class="nolink"><span class="nolink"><span class="nolink"><span class="nolink"><span>https://apps.sematext.com/logsene-reports/api/v2/subscription/send/{subscriptionId}</span></span></span></span></span></span></p>
<p><span class="nolink"><span class="nolink"><span class="nolink"><span class="nolink"><span class="nolink"><a href="http://list.do/" class="external-link"><br />
</a></span></span></span></span></span></p></td>
</tr>
</tbody>
</table>

Example of API
call:

``` syntaxhighlighter-pre
curl -X POST -k -H "Content-Type: application/json" "https://apps.sematext.com/logsene-reports/api/v2/subscription/send/36" -d '
{
  "apiKey":"a9092d95-d062-4499-ad0b-a1b43fadb9b5",
  "appToken":"262f66e5-0951-488b-9c92-379ba71a4299"
}'
```

Example of a success response (with HTTP code 200):

``` syntaxhighlighter-pre
{
  "success" : true,
  "message" : "Report for subscription with ID 36 sent"
}
```

### Saved Queries API (Coming soon\!)

Logsene Saved Queries HTTP API lets you:

  - list all saved queries defined for some app
  - delete individual saved queries
  - create new saved query

When using Logsene Saved Queries API, you will need to use API key which
belongs to OWNER of the app to which saved queries are related. If you
are managing saved queries for your apps, then just use your API key. If
you are managing saved queries for apps that belong to some other
account (and your are just a guest in that account with
role **BILLING\_ADMIN** or **ADMIN**), you will have to use API key of
that account (in both cases the key can be
found [here](https://apps.sematext.com/users-web/account.do#api), you
just have to consider which account you are currently logged into).

#### List Saved Queries

Fetches saved queries for a particular Logsene app.

<table>
<colgroup>
<col width="25%" />
<col width="25%" />
<col width="25%" />
<col width="25%" />
</colgroup>
<thead>
<tr class="header">
<th><div class="tablesorter-header-inner">
API call
</div></th>
<th><div class="tablesorter-header-inner">
HTTP Method
</div></th>
<th><div class="tablesorter-header-inner">
Attributes
</div></th>
<th><div class="tablesorter-header-inner">
Description
</div></th>
</tr>
</thead>
<tbody>
<tr class="odd">
<td><a href="https://apps.sematext.com/logsene-reports/api/v2/query/list" class="uri" class="external-link">https://apps.sematext.com/logsene-reports/api/v2/query/list</a></td>
<td>POST</td>
<td><p><strong>apiKey</strong> (of owner of app represented with &quot;token&quot;)</p>
<p><strong>appToken </strong>(of app whose saved queries are fetched)</p></td>
<td>Fetches all saved queries for app<strong> </strong>defined with <strong>appToken</strong></td>
</tr>
</tbody>
</table>

Examples of API
calls:

``` syntaxhighlighter-pre
curl -X POST -k -H "Content-Type: application/json" "https://apps.sematext.com/logsene-reports/api/v2/query/list" -d '
{
  "apiKey":"a9092d95-d062-4499-ad0b-a1b43fadb9b5",
  "appToken":"12c91563-ba95-4a73-aa5a-08fe04b94631"
}'
```

Example of success response (with HTTP status 200):

``` syntaxhighlighter-pre
{
  "success" : true,
  "data" : {
    "queries" : {
      "14" : {
        "queryName" : "Chrome query",
        "queryString" : "Chrome",
      },
      "49" : {
        "queryName" : "Localhost",
        "queryString" : "host:(127.0.0.1)",
      }
    }
  }
}
```

If response succeeded, HTTP code will be 200 and response content will
be a map where keys are query IDs (which can be used as parameter in
delete saved query API call) and values are query objects.

#### Create Saved Query

<table>
<colgroup>
<col width="25%" />
<col width="25%" />
<col width="25%" />
<col width="25%" />
</colgroup>
<thead>
<tr class="header">
<th><div class="tablesorter-header-inner">
API call
</div></th>
<th><div class="tablesorter-header-inner">
HTTP Method
</div></th>
<th><div class="tablesorter-header-inner">
Attributes
</div></th>
<th><div class="tablesorter-header-inner">
Description
</div></th>
</tr>
</thead>
<tbody>
<tr class="odd">
<td><span class="nolink"><a href="https://apps.sematext.com/logsene-reports/api/v2/query/add" class="uri" class="external-link">https://apps.sematext.com/logsene-reports/api/v2/query/add</a></span></td>
<td>POST</td>
<td><p><strong>apiKey</strong> (of owner of app represented with &quot;token&quot;)</p>
<p><strong>appToken </strong>(of app for which saved query is created)</p>
<p><strong>queryName</strong> (display name, does not have to be unique)</p>
<p><strong>queryString</strong> (saved query string)</p></td>
<td>Creates new saved query with provided name and query string for Logsene app<strong> </strong>defined with <strong>appToken</strong></td>
</tr>
</tbody>
</table>

Example of API
call:

``` syntaxhighlighter-pre
curl -X POST -k -H "Content-Type: application/json" "https://apps.sematext.com/logsene-reports/api/v2/query/add" -d '
{
  "apiKey":"a9092d95-d062-4499-ad0b-a1b43fadb9b5",
  "appToken":"12c91563-ba95-4a73-aa5a-08fe04b94631",
  "query":{
    "queryName" : "Hot",
    "queryString" : "tag:(hot)"
  }
}'
```

Example of a success response (with HTTP code 200):

``` syntaxhighlighter-pre
{
  "success" : true,
  "message" : "Query created",
  "data" : {
    "query":{
      "id" : 50,
      "queryName" : "Hot",
      "queryString" : "tag:(hot)"
    }
  }
}
```

#### Delete Saved Query

<table>
<thead>
<tr class="header">
<th>API call</th>
<th>HTTP Method</th>
<th>Attributes</th>
<th>Description</th>
</tr>
</thead>
<tbody>
<tr class="odd">
<td><span class="nolink"><span class="nolink"><span class="nolink"><span class="nolink"><span>https://apps.sematext.com/logsene-reports/api/v2/query/delete/{queryId}</span></span></span></span></span></td>
<td>DELETE</td>
<td><p><strong>apiKey</strong> (of owner of app represented with &quot;token&quot;)</p>
<p><strong>appToken</strong> (of app to which saved query belongs to)</p>
<p> </p></td>
<td>Deletes a single saved query</td>
</tr>
</tbody>
</table>

**Note**: {queryId} value in URL should be replaced with real id of
saved query which should be deleted - queryId of each saved query is
returned as a key in **[list saved
queries](#LogseneAPIReference-ListSavedQueries)** API call response.

Example API
call:

``` syntaxhighlighter-pre
curl -X DELETE -k -H "Content-Type: application/json" "https://apps.sematext.com/logsene-reports/api/v2/query/delete/50" -d '{
  "apiKey":"a9092d95-d062-4499-ad0b-a1b43fadb9b5",
  "appToken":"12c91563-ba95-4a73-aa5a-08fe04b94631"
}'
```

Example of a success response (with HTTP code 200):

``` syntaxhighlighter-pre
{
  "success" : true,
  "message" : "Query with queryId 50 deleted",
  "data" : {
    "queryId" : "50"
  }
}
```

### Elasticsearch-compatible API

For details [read
this](Search-through-the-Elasticsearch-API_19726366.html).

