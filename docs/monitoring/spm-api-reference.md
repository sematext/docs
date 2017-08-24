*Note: This is Reference for v2 of SPM API.*

*  
Note: For details on Logsene API, see [Logsene API Reference](../logs/logsene-api-reference)*

### Introduction

SPM HTTP API is used to easily manage your Account and Apps remotely,
without the need to be logged-in via a browser. It also makes it
possible to automate certain tasks, such as creation of new Apps,
definition of Alert Rules, etc.  
  
To use the API, you need the API key for your Account (or, if you are a
guest to some other Account under which you want to manage Apps,
Alerts..., then API key of that Account) - it can be found
**[here](https://apps.sematext.com/ui/account/api)**. API key
needs to be passed as an attribute to all API calls and is used by SPM
to authenticate Account under which some API call is done.  API keys and
App tokens used in this document are fake.  Use your own API key and App
tokens.  
  
Access to API key of some Account is allowed for **OWNER**,
**BILLING\_ADMIN** and **ADMIN** users. Users with **USER** role
**cannot** access API key of that Account, though they can always use
their own Account's API key to manage their own Account, Apps, etc.  For
more info about Account Sharing please see [SPM FAQ](spm-faq/#how-can-i-share-my-apps-with-other-users).

### Request/Response format

All API calls accept JSON in requests and return JSON response. All API
call requests should contain **apiKey** attribute (among other
attributes specific for that API call). Example of content of one such
call:

 

``` JSON
{
  "apiKey":"a9092d95-d062-4499-ad0b-a1b43fadb9b5",
  "name":"solr-app-1",
  "type":"Solr"
}
```

 

All API responses contain attribute **success** which has value **true**
or **false**. Optional response attributes are **message** (which
provides textual message about what API call did) and **data** (which
contains data returned by the call). Example of response:

 

``` JSON
{
  "success" : true,
  "message" : "Application 'new-solr-app-1' created",
  "data" : {
    "token" : {
      "newSolrCluster" : "61611d45-6ecd-47f7-b5b4-6faccdb2f8c4"
    }
  }
}
```

 

Also, all responses contain an HTTP code which describes success or
failure. In case of a successful call, HTTP code will be **200** (OK).
Any other non-2XX HTTP code represents an error (most commonly used
codes are **400** - Bad Request, **401** - Unauthorized, **403** -
Forbidden and **500** - Internal Server Error).

### Apps API

#### Create SPM App

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
<td><a href="https://apps.sematext.com/spm-reports/api/v1/app/add.do" class="external-link">https://apps.sematext.com/spm-reports/api/v2/app/add</a></td>
<td>POST</td>
<td><p><strong>apiKey</strong> (of account under which app will be created)</p>
<p><strong>name</strong> (of app which will be created)</p>
<p><strong>type</strong> (of app which will be created)</p>
<p><strong>discountCode</strong> (optional parameter, send only if you have a valid code)</p></td>
<td><p>Creates new <strong>SPM</strong> application under account defined by <strong>apiKey</strong>, with name <strong>name</strong> <strong></strong> (such name should be unique among other SPM apps under this account), of specific <strong>type</strong> (to see available types check below)</p></td>
</tr>
<tr class="even">
<td><span class="nolink"><a href="https://apps.sematext.com/spm-reports/api/v1/app/add.do" class="external-link">https://apps.sematext.com/spm-reports/api/v2/app/add</a></span></td>
<td>POST</td>
<td><p><strong>apiKey</strong> (of account under which app will be created)</p>
<p><strong>name</strong> (of app which will be created)</p>
<p><strong>type</strong> (must have value <strong>aws</strong>)</p>
<p><strong><strong>discountCode</strong></strong> (optional parameter, send only if you have a valid code)</p>
<p><strong>subtype</strong> (defines for which AWS types new SPM apps should be created - comma separated list, possible values: aws_ec2, aws_elb, aws_ebs)</p>
<p><strong>fetchFrequency</strong> (possible values: MINUTE, FIVE_MINUTES, FIFTEEN_MINUTES)</p>
<p><strong>region</strong> (possible values: US_EAST_1, US_WEST_1, US_WEST_2, EU_WEST_1, AP_SOUTHEAST_1, AP_SOUTHEAST_2, AP_NORTHEAST_1, SA_EAST_1, GovCloud, CN_NORTH_1)</p>
<p><strong>awsCloudWatchSecretKey</strong></p>
<p><strong>awsCloudWatchAccessKey</strong></p></td>
<td><p>Creates new <strong>SPM</strong> <strong>AWS</strong> application under account defined by <strong>apiKey</strong>.</p></td>
</tr>
</tbody>
</table>

\* *Available app type values (please contact us if application type
you'd like to use is not on the list):*  
*         solr, *solrcloud, *hbase, elastic\_search, sensei, jvm,
hadoop\_mrv1, hadoop\_yarn, kafka, kafka\_0\_7\_2, zookeeper, redis,
storm, cassandra, memcached, aws, mysql, apache, nginx, nginx\_plus,
spark, nodejs*

 

Examples of API
calls:

``` bash
curl -X POST -k -H "Content-Type: application/json" "https://apps.sematext.com/spm-reports/api/v2/app/add" -d '
{
  "apiKey":"a9092d95-d062-4499-ad0b-a1b43fadb9b5",
  "name":"new-solr-app-1",
  "type":"Solr"
}'

curl -X POST -k -H "Content-Type: application/json" "https://apps.sematext.com/spm-reports/api/v2/app/add" -d '
{
  "apiKey":"a9092d95-d062-4499-ad0b-a1b43fadb9b5",
  "name":"new-aws-app-1",
  "type":"aws",
  "subtype":"aws_ec2,aws_elb",
  "fetchFrequency":"FIVE_MINUTES",
  "region":"US_EAST_1",
  "awsCloudWatchSecretKey":"xxxxx",
  "awsCloudWatchAccessKey":"zzzzz"
}'
```

 

Example of a success response (with HTTP code 200):

``` JSON
{
  "success" : true,
  "message" : "Created application for dto: [name=new-solr-app-1,type=Solr,discountCode=<null>,subType=<null>,fetchFrequency=<null>,region=<null>,awsCloudWatchSecretKey=<null>,awsCloudWatchAccessKey=<null>,apiKey=a9092d95-d062-4499-ad0b-a1b43fadb9b5], token is: 61611d45-6ecd-47f7-b5b4-6faccdb2f8c4",
  "data" : {
    "token" : {
      "new-solr-app-1" : "61611d45-6ecd-47f7-b5b4-6faccdb2f8c4"
    }
  }
}

{
  "success" : true,
  "message" : "Created application for dto: [name=new-aws-app-1,type=aws,discountCode=<null>,subType=aws_ec2,aws_elb,fetchFrequency=FIVE_MINUTES,region=US_EAST_1,awsCloudWatchSecretKey=xxxxx,awsCloudWatchAccessKey=zzzzz,apiKey=a9092d95-d062-4499-ad0b-a1b43fadb9b5], token is: , AWS EC2:5413ae3f-d1c0-4cfc-9caa-532377e03e02, AWS ELB:fcc77a45-c160-403c-887a-052d25d46144",
  "data" : {
    "token" : {
      "AWS ELB" : "fcc77a45-c160-403c-887a-052d25d46144",
      "AWS EC2" : "5413ae3f-d1c0-4cfc-9caa-532377e03e02"
    }
  }
}
```

 

Few examples of non-200 responses:

``` JSON
{
  "success" : false,
  "message" : "User identified with API key a9092d95-d062-4499-ad0b-a1b43fadb9b4 doesn't exist"
}


{
  "success" : false,
  "message" : "Error while creating application for: [name=new-solr-app-1,type=Solr,discountCode=<null>,subType=<null>,fetchFrequency=<null>,region=<null>,awsCloudWatchSecretKey=<null>,awsCloudWatchAccessKey=<null>,apiKey=a9092d95-d062-4499-ad0b-a1b43fadb9b5], error was: User some-email-address@your-company.com already owns application with name: new-solr-app-1"
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

``` bash
curl -X POST -k -H "Content-Type: application/json" "https://apps.sematext.com/users-web/api/v2/app/list" -d '
{
  "apiKey":"a9092d95-d06-4499-ad0b-a1b43fadb9b5"
}'
```

 

Example of a success response (with HTTP code 200):

``` JSON
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

 

### Alerts API

SPM Alerts HTTP API lets you:

  - list all alerts defined for some app
  - delete/enable/disable individual alerts
  - create new alerts (of any type: heartbeat, threshold, anomaly)

When using SPM Alerts API, you will need to use API key which belongs to
OWNER of the app to which alerts are related. If you are managing alerts
for your apps, then just use your API key. If you are managing alerts
for apps that belong to some other account (and your are just a guest in
that account with role **BILLING\_ADMIN** or **ADMIN**), you will have
to use API key of that account (in both cases the key can be found
[here](https://apps.sematext.com/ui/account/api), you just
have to consider which account you are currently logged into).

#### List Alerts

Fetches all alerts of specific type (threshold, anomaly or heartbeat)
for a particular app.

 

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
<td><a href="https://apps.sematext.com/spm-reports/api/v1/alert/threshold/list.do" class="external-link">https://apps.sematext.com/spm-reports/api/v2/alert/threshold/list</a></td>
<td>POST</td>
<td><p><strong>apiKey</strong> (of owner of app represented with &quot;token&quot;)</p>
<p><strong>appToken</strong> (of app whose alerts are fetched)</p></td>
<td>Fetches all <strong>threshold</strong> based alerts for app <strong></strong> defined with <strong>appToken</strong></td>
</tr>
<tr class="even">
<td><span class="nolink"><a href="https://apps.sematext.com/spm-reports/api/v1/alert/anomaly/list.do" class="external-link">https://apps.sematext.com/spm-reports/api/v2/alert/anomaly/list</a></span></td>
<td>POST</td>
<td><strong>apiKey</strong> (of owner of app represented with &quot;token&quot;)
<p><strong>appToken</strong> (of app <span>whose </span>alerts are fetched)</p></td>
<td>Fetches all <strong>anomaly</strong> alerts for app <strong></strong> defined with <strong>appToken</strong></td>
</tr>
<tr class="odd">
<td><span class="nolink"><a href="https://apps.sematext.com/spm-reports/api/v1/alert/heartbeat/list.do" class="external-link">https://apps.sematext.com/spm-reports/api/v2/alert/heartbeat/list</a></span></td>
<td>POST</td>
<td><strong>apiKey</strong> (of owner of app represented with &quot;token&quot;)
<p><strong>appToken</strong> (of app <span>whose </span>alerts are fetched)</p></td>
<td>Fetches all <strong>heartbeat</strong> alerts for app <strong></strong> defined with <strong>appToken</strong></td>
</tr>
</tbody>
</table>

 

Examples of API
calls:

``` bash
curl -X POST -k -H "Content-Type: application/json" "https://apps.sematext.com/spm-reports/api/v2/alert/threshold/list" -d '
{
  "apiKey":"a9092d95-d062-4499-ad0b-a1b43fadb9b5",
  "appToken":"12c91563-ba95-4a73-aa5a-08fe04b94631"
}'

curl -X POST -k -H "Content-Type: application/json" "https://apps.sematext.com/spm-reports/api/v2/alert/anomaly/list" -d '
{
  "apiKey":"a9092d95-d062-4499-ad0b-a1b43fadb9b5",
  "appToken":"12c91563-ba95-4a73-aa5a-08fe04b94631"
}'

curl -X POST -k -H "Content-Type: application/json" "https://apps.sematext.com/spm-reports/api/v2/alert/heartbeat/list" -d '
{
  "apiKey":"a9092d95-d062-4499-ad0b-a1b43fadb9b5",
  "appToken":"12c91563-ba95-4a73-aa5a-08fe04b94631"
}'
```

 

Example of a success response (with HTTP code 200):

``` JSON
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
        "name" : "Req. Rate Alert",
        "reportName" : "solrOverviewReportPage",
        "chartKey" : "solrRequestRate",
        "metricLabel" : "req. count",
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
        "name" : "Req. Rate Alert",
        "reportName" : "solrOverviewReportPage",
        "chartKey" : "solrRequestRate",
        "metricLabel" : "req. count",
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

There are 3 types of alerts available in SPM - threshold, anomaly, and
heartbeat. Each of them has different attributes so there are 3
different API calls for creating them.

**Threshold** and **Anomaly** Alerts are created for a specific metric.
API calls for their creation (as you'll see in following sections)
require 3 important attributes: **reportName**, **chartKey**,
**metricLabel**. List of all available metrics for some SPM app can be
fetched using [Metrics API](spm-api-reference/#list-metrics)
call (response provides all 3 important attributes).

##### Creating Threshold Alert

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
<td><span class="nolink"><a href="https://apps.sematext.com/spm-reports/api/v1/alert/threshold/add.do" class="external-link">https://apps.sematext.com/spm-reports/api/v2/alert/threshold/add</a></span></td>
<td>POST</td>
<td><p><strong>apiKey</strong> (of owner of app represented with &quot;token&quot;)</p>
<p><strong>appToken</strong> (of app for which alert is created)</p>
<p>+ attributes specific to threshold alert</p></td>
<td>Creates new <strong>threshold</strong> based alert for app <strong></strong> defined with <strong>appToken</strong></td>
</tr>
</tbody>
</table>

Example of API
call:

``` bash
curl -X POST -k -H "Content-Type: application/json" "https://apps.sematext.com/spm-reports/api/v2/alert/threshold/add" -d '
{
  "apiKey":"a9092d95-d062-4499-ad0b-a1b43fadb9b5",
  "appToken":"12c91563-ba95-4a73-aa5a-08fe04b94631",
  "alertRule":{
    "name":"Req. Rate Alert",
    "enabled":"true",
    "estimateValue":500,
    "estimateOperation":"MORE",
    "metricLabel":"req. count",
    "reportName":"solrOverviewReportPage",
    "chartKey":"solrRequestRate",
    "analyzingTime":"05",
    "backToNormalNeeded":false,
    "ignoreRegularEventsEnabled":false,
    "muteTimePeriodInMinutes":"30",
    "minDelayBetweenNotificationsInMinutes":"1",
    "maxNotificationsInMutePeriod":"3",
    "muteIsGlobal":false,
    "sendToEmail":"email-to-send-alerts-to@your-company.com",
    "ruleType": "AFValuesRule"
 }
}'
```

 

Example of a success response (with HTTP code 200):

``` JSON
{
  "success" : true,
  "message" : "AlertRule created",
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
      "name" : "Req. Rate Alert",
      "reportName" : "solrOverviewReportPage",
      "chartKey" : "solrRequestRate",
      "metricLabel" : "req. count",
      "filterValues" : "?",
      "estimateOperation" : "MORE",
      "estimateValue" : 500.0,
      "backToNormalNeeded" : false
    }
  }
}
```

 

##### Creating Anomaly Alert

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
<td><span class="nolink"><a href="https://apps.sematext.com/spm-reports/api/v1/alert/anomaly/add.do" class="external-link">https://apps.sematext.com/spm-reports/api/v2/alert/anomaly/add</a></span></td>
<td>POST</td>
<td><p><strong>apiKey</strong> (of owner of app represented with &quot;token&quot;)</p>
<p><strong>appToken</strong> (of app for which alert is created)</p>
<p>+ attributes specific to anomaly alert</p></td>
<td>Creates new <strong>anomaly</strong> alert for app <strong></strong> defined with <strong>appToken</strong></td>
</tr>
</tbody>
</table>

Example of API
call:

``` bash
curl -X POST -k -H "Content-Type: application/json" "https://apps.sematext.com/spm-reports/api/v2/alert/anomaly/add" -d '
{
  "apiKey":"a9092d95-d062-4499-ad0b-a1b43fadb9b5",
  "appToken":"12c91563-ba95-4a73-aa5a-08fe04b94631",
  "alertRule":{
    "name":"Req. Rate Alert Anomaly1",
    "enabled":"true",
    "metricLabel":"req. count",
    "reportName":"solrOverviewReportPage",
    "chartKey":"solrRequestRate","analyzingTime":"60",
    "backToNormalNeeded":false,
    "ignoreRegularEventsEnabled":true,
    "muteTimePeriodInMinutes":"30",
    "minDelayBetweenNotificationsInMinutes":"1",
    "maxNotificationsInMutePeriod":"3",
    "muteIsGlobal":false,
    "sendToEmail":"email-to-send-alerts-to@your-company.com",
    "ruleType": "AFAnomalyValuesRule"
   }
}'
```

 

Example of a success response (with HTTP code 200):

``` JSON
{
  "success" : true,
  "message" : "AlertRule created",
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
      "name" : "Req. Rate Alert Anomaly1",
      "reportName" : "solrOverviewReportPage",
      "chartKey" : "solrRequestRate",
      "metricLabel" : "req. count",
      "filterValues" : "?",
      "backToNormalNeeded" : false
    }
  }
}
```

 

##### Creating Heartbeat Alert

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
<td><span class="nolink"><span class="nolink"><a href="https://apps.sematext.com/spm-reports/api/v1/alert/heartbeat/add.do" class="external-link">https://apps.sematext.com/spm-reports/api/v2/alert/heartbeat/add</a></span></span></td>
<td>POST</td>
<td><p><strong>apiKey</strong> (of owner of app represented with &quot;token&quot;)</p>
<p><strong>appToken</strong> (of app for which alert is created)</p>
<p>+ attributes specific to anomaly alert</p></td>
<td>Creates new <strong>heartbeat</strong> alert for app <strong></strong> defined with <strong>appToken</strong></td>
</tr>
</tbody>
</table>

 

Example of API
call:

``` bash
curl -X POST -k -H "Content-Type: application/json" "https://apps.sematext.com/spm-reports/api/v2/alert/heartbeat/add" -d '
{
  "apiKey":"a9092d95-d062-4499-ad0b-a1b43fadb9b5",
  "appToken":"12c91563-ba95-4a73-aa5a-08fe04b94631",
  "alertRule":{
    "ruleKey":"",
    "name":"MyAPP - heartbeat Alert",
    "enabled":"true",
    "analyzingTime":"5",
    "backToNormalNeeded":false,
    "ignoreRegularEventsEnabled":false,
    "muteTimePeriodInMinutes":"30",
    "minDelayBetweenNotificationsInMinutes":"1",
    "maxNotificationsInMutePeriod":"3",
    "muteIsGlobal":false,
    "sendToEmail":"email-to-send-alerts-to@your-company.com",
    "ruleType": "HeartbeatRule"
  }
}'
```

 

Example of a success response (with HTTP code 200):

``` JSON
{
  "success" : true,
  "message" : "AlertRule created",
  "data" : {
    "alertRule" : {
      "sendToEmail" : "email-to-send-alerts-to@your-company.com",
      "muteTimePeriodInMinutes" : "30",
      "minDelayBetweenNotificationsInMinutes" : "1",
      "maxNotificationsInMutePeriod" : 3,
      "ignoreRegularEventsEnabled" : false,
      "muteIsGlobal" : false,
      "analyzingTime" : "5",
      "systemId" : 2199,
      "enabled" : true,
      "name" : "MyAPP - heartbeat Alert",
      "backToNormalNeeded" : false
    }
  }
}
```

 

##### Alert Creation Designer

The best way to prepare alert rule definitions to be used in API calls
is by using the Create Alert dialog available in SPM. To access it, go
to SPM reports<https://apps.sematext.com/ui/monitoring> and
open application for which you want to create alert.  
  
For **Anomaly**/**Threshold** alerts, navigate to Report (by selecting a
tab on the left side) and after that to Chart where metric you want to
alert on is located. For example: let's create an alert based on **req.
count** metric for some Solr application. That metric can be found under
the **Req. Rate & Latency** report, in **Req. Rate** chart.

![](plugins/servlet/confluence/placeholder/unknown-attachment
"alert-creation-designer-threshold-anomaly.png")

  
Clicking on **Create Alert** option will open Alert dialog. If you have
sufficient permissions for that application (app **OWNER** or
**BILLING\_ADMIN** or **ADMIN** of account which owns the app), you will
see "Show API Call" at the bottom of the Create Alert dialog. Click on
it to see the full API call to use  to create this alert via an API.

![](attachments/40009738/40009757.png?width=500)

You can change alert attributes in the dialog and update the API call
details by clicking on the little Refresh icon.

For **Heartbeat** Alerts, just click on Heart icon on any report (as
displayed below), similar dialog will open:

![](plugins/servlet/confluence/placeholder/unknown-attachment
"alert-creation-designer-heartbeat.png")

  
Typically, you would prepare your alert templates this way once, and
then just tweak them remotely (for example, just use different token
parameter to get it applied to your other apps, adjust metric names,
thresholds, etc.).

 

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
<td><span class="nolink"><span class="nolink"><span class="nolink"><span class="nolink"><a href="https://apps.sematext.com/spm-reports/api/v1/alert/delete.do" class="external-link">https://apps.sematext.com/spm-reports/api/v2/alert/delete/{alertId}</a></span></span></span></span></td>
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
as a key in [**list alerts**](spm-api-reference/#list-alerts)
API call response.

  
Example of API
call:

``` bash
curl -X DELETE -k -H "Content-Type: application/json" "https://apps.sematext.com/spm-reports/api/v2/alert/delete/141" -d '{
  "apiKey":"a9092d95-d062-4499-ad0b-a1b43fadb9b5",
  "appToken":"12c91563-ba95-4a73-aa5a-08fe04b94631"
}'
```

 

Example of a success response (with HTTP code 200):

``` JSON
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
<td><span class="nolink"><span class="nolink"><span class="nolink"><span class="nolink"><span class="nolink"><a href="https://apps.sematext.com/spm-reports/api/v1/alert/enable.do" class="external-link">https://apps.sematext.com/spm-reports/api/v2/alert/enable<span class="nolink"> </span></a><a href="https://apps.sematext.com/spm-reports/api/v1/alert/delete.do" class="external-link">/{alertId}</a></span></span></span></span></span></td>
<td>POST</td>
<td><p><strong>apiKey</strong> (of owner of app whose alert is enabled)</p>
<strong>appToken</strong> (of app to which alert belongs)</td>
<td>Enables alert</td>
</tr>
<tr class="even">
<td><span class="nolink"><span class="nolink"><span class="nolink"><span class="nolink"><span class="nolink"><span class="nolink"><a href="https://apps.sematext.com/spm-reports/api/v1/alert/disable.do" class="external-link">https://apps.sematext.com/spm-reports/api/v2/alert/disable/<span class="nolink"> </span></a><a href="https://apps.sematext.com/spm-reports/api/v1/alert/delete.do" class="external-link">{alertId}</a></span></span></span></span></span></span></td>
<td>POST</td>
<td><p><strong>apiKey</strong> (of owner of app whose alert is enabled)</p>
<strong>appToken</strong> (of app to which alert belongs)</td>
<td>Disables alert</td>
</tr>
</tbody>
</table>

**Note**: {alertId} value in URL should be replaced with real id of
alert rule which should be deleted - alertId of each alert is returned
as a key in [**list alerts**](spm-api-reference/#list-alerts)
API call response.

 

Examples of API
calls:

``` bash
curl -X POST -k -H "Content-Type: application/json" "https://apps.sematext.com/spm-reports/api/v2/alert/enable/141" -d '{
  "apiKey":"a9092d95-d062-4499-ad0b-a1b43fadb9b5",
  "appToken":"12c91563-ba95-4a73-aa5a-08fe04b94631"
}'

curl -X POST -k -H "Content-Type: application/json" "https://apps.sematext.com/spm-reports/api/v2/alert/disable/141" -d '{
  "apiKey":"a9092d95-d062-4499-ad0b-a1b43fadb9b5",
  "appToken":"12c91563-ba95-4a73-aa5a-08fe04b94631"
}'
```

 

Examples of success responses (with HTTP code 200):

``` JSON
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

 

### Metrics API

Metrics API provides info about metrics available for some SPM
application.

#### List Metrics

For a particular SPM application, this API call will return a list of
all available **Reports**, **Charts** and **Metrics**. This info is
especially useful when using Alerts API to [create Alerts](spm-api-reference/#create-alert) since
it requires 3 important attributes for each
Alert:**reportName**, **chartKey** and **metricLabel**.

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
<td><p><span class="nolink"><span class="nolink"><span class="nolink"><span class="nolink"><span class="nolink"><a href="https://apps.sematext.com/spm-reports/api/v2/metrics/list" class="uri" class="external-link">https://apps.sematext.com/spm-reports/api/v2/metrics/list</a></span></span></span></span></span></p>
<p><span class="nolink"><span class="nolink"><span class="nolink"><span class="nolink"><span class="nolink"><a href="http://list.do/" class="external-link"><br />
</a></span></span></span></span></span></p></td>
<td>POST</td>
<td><p><strong>apiKey</strong> (of owner of app represented with &quot;token&quot;)</p>
<p><strong>appToken</strong> (token of app whose metrics info is being fetched)</p></td>
<td><p>Fetches metrics info list</p></td>
</tr>
</tbody>
</table>

Example of API
call:

``` bash
curl -X POST -k -H "Content-Type: application/json" "https://apps.sematext.com/spm-reports/api/v2/metrics/list?rcm" -d '
{
  "apiKey":"a9092d95-d062-4499-ad0b-a1b43fadb9b5",
  "appToken":"262f66e5-0951-488b-9c92-379ba71a4299"
}'
```

Example of a success response (with HTTP code 200):

``` JSON
{
  "success" : true,
  "data" : {
    "metrics" : [ {
      "reportName" : "cacheReportPage",
      "chartKey" : "documentCache",
      "metricLabel" : "autowarm count or %"
    }, {
      "reportName" : "cacheReportPage",
      "chartKey" : "documentCache",
      "metricLabel" : "evictions"
    }, 
.
.
.
.
    }, {
      "reportName" : "warmupReportPage",
      "chartKey" : "warmupTimes",
      "metricLabel" : "warmup time"
    } ]
  }
}
```

#### Metric Keys

For a particular SPM application, this API call will return a list of
all available metrics for the specified app token. Returned metric names
are used in other API calls to reference metrics.

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
<td><p><span class="nolink"><span class="nolink"><span class="nolink"><span class="nolink"><span class="nolink"><a href="https://apps.sematext.com/spm-reports/api/v2/metrics/keys" class="uri" class="external-link">https://apps.sematext.com/spm-reports/api/v2/metrics/keys</a></span></span></span></span></span></p>
<p><span class="nolink"><span class="nolink"><span class="nolink"><span class="nolink"><span class="nolink"><a href="http://list.do" class="external-link"><span><br />
</span></a></span></span></span></span></span></p></td>
<td>POST</td>
<td><p><strong>apiKey</strong> (of owner of app represented with &quot;token&quot;)</p>
<p><strong>appToken</strong> (token of app whose metrics info is being fetched)</p></td>
<td><p>Fetches array of metrics keys</p>
<p> </p></td>
</tr>
</tbody>
</table>

 

Example of API
call:

``` bash
curl -X POST -k -H "Content-Type: application/json" "https://apps.sematext.com/spm-reports/api/v2/metrics/list" -d '
{
  "apiKey": "a9092d95-d062-4499-ad0b-a1b43fadb9b5",
  "appToken": "262f66e5-0951-488b-9c92-379ba71a4299"
}'
```

 

Example of a success response (with HTTP code 200):

``` JSON
{
  "success" : true,
  "data" : {
    "metrics" : ["jvm.files.open", "jvm.files.open.max", "jvm.files.open.percentage", "jvm.gc.collection.count", ... "solr.cache.doc.autowarm.count", "solr.cache.doc.evicted", "solr.cache.doc.hits", "solr.cache.doc.hits.percentage", "solr.cache.doc.lookups", ...]
  }
}
```

Returned metric keys can be used to obtain data points using [metrics data API](#metrics-data), or list of
available filters using [metrics filters API](#metrics-filters).

#### Metrics Data

For a particular SPM application, this API call will return data points
for referenced metric(s) and time span, matching specified filters.

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
<td><p><span class="nolink"><span class="nolink"><span class="nolink"><span class="nolink"><span class="nolink"><a href="https://apps.sematext.com/spm-reports/api/v2/metrics/data" class="uri" class="external-link">https://apps.sematext.com/spm-reports/api/v2/metrics/data</a></span></span></span></span></span></p>
<p><span class="nolink"><span class="nolink"><span class="nolink"><span class="nolink"><span class="nolink"><a href="http://list.do/" class="external-link"><br />
</a></span></span></span></span></span></p></td>
<td>POST</td>
<td><p><strong>apiKey</strong> (of owner of app represented with &quot;token&quot;)</p>
<p><strong>appToken</strong> (token of app whose metrics data is being fetched)</p>
<p><strong>metric</strong> (metric name or metric group prefix to return data points for)</p>
<p><strong>start</strong> (time of interval to return metric data points for; optional; can be expressed as timestamp in milliseconds or UTC date in format yyyy-MM-dd HH:mm:ss)</p>
<p><strong>end</strong> (time of interval to return <span>metric data points for</span>; optional; can be expressed as timestamp in milliseconds or UTC date in format yyyy-MM-dd HH:mm:ss)</p>
<p><strong>interval</strong> (to return <span>metric data points for</span>,expressed in milliseconds; optional; Can use suffixes s, m, h, d to express interval in seconds, minutes, hours, days - e.g. &quot;1d&quot; is equal to &quot;86400000&quot;; default value is 5m)</p>
<p><strong>granularity</strong> (data points granularity - interval between two data points; optional; allowed values are &quot;ONE_MINUTE&quot;, &quot;FIVE_MINUTES&quot;, &quot;HOUR&quot;, &quot;DAY&quot;, &quot;WEEK&quot;, &quot;MONTH&quot;, &quot;AUTO&quot;; default value is &quot;AUTO&quot; - calculated based on selected time span.</p>
<p><strong>filters</strong> (map of allowed filter values and aggregation strategy; optional; list of available filter values can be fetched using metric filters call and supported aggregations are &quot;MIN&quot;, &quot;MAX&quot;, &quot;AVG&quot;, &quot;SUM&quot; - default depends on metric)</p></td>
<td><p>Fetches metrics data points</p>
<p> </p></td>
</tr>
</tbody>
</table>

Following tables explains rules how start, end and interval are
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
<th><div class="tablesorter-header-inner">
&quot;start&quot;
</div></th>
<th><div class="tablesorter-header-inner">
&quot;end&quot;
</div></th>
<th><div class="tablesorter-header-inner">
&quot;interval&quot;
</div></th>
<th><div class="tablesorter-header-inner">
Rule
</div></th>
</tr>
</thead>
<tbody>
<tr class="odd">
<td>No</td>
<td>No</td>
<td>No</td>
<td><p>[current - 5m, current]</p></td>
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
<td>[end - 5m, end]</td>
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

 

Examples of API calls without
filtering:

``` bash
# data point for last 5 min for metric os.cpu.user, using default granularity
curl -X POST -k -H "Content-Type: application/json" "https://apps.sematext.com/spm-reports/api/v2/metrics/data" -d '
{
  "apiKey" : "a9092d95-d062-4499-ad0b-a1b43fadb9b5",
  "appToken" : "262f66e5-0951-488b-9c92-379ba71a4299",
  "metric" : "os.cpu.user"
}'
 
# data point for last hour, for all os.cpu metrics, using 5 min granularity
curl -X POST -k -H "Content-Type: application/json" "https://apps.sematext.com/spm-reports/api/v2/metrics/data" -d '
{
  "apiKey" : "a9092d95-d062-4499-ad0b-a1b43fadb9b5",
  "appToken" : "262f66e5-0951-488b-9c92-379ba71a4299",
  "metric" : "os.cpu.*",
  "interval" : "1h",
  "granularity" : "FIVE_MINUTES",
}'

# data point for specified interval, for all os.cpu.user metrics, using 1 min granularity
curl -X POST -k -H "Content-Type: application/json" "https://apps.sematext.com/spm-reports/api/v2/metrics/data" -d '
{
  "apiKey" : "a9092d95-d062-4499-ad0b-a1b43fadb9b5",
  "appToken" : "262f66e5-0951-488b-9c92-379ba71a4299",
  "metric" : "os.cpu.user",
  "start" : "2016-03-25 15:26:36",
  "end" : "2016-03-25 15:31:36",
  "granularity": "ONE_MINUTE",
}'
```

 

Previous calls will result in data points for specified metric(s) and
specified time span, using specified or default granularity. Example of
a success response (with HTTP code 200):

``` JSON
{
  "success" : true,
  "data" : {
    "start" : "2016-03-25 15:26:36",
    "end" : "2016-03-25 15:31:36",
    "granularityMillis" : 60000,
    "os.cpu.user" : [ {
      "values" : [ 
        [ 1458876360000, 0.9899340312315237 ], 
        [ 1458876420000, 1.1467510978187545 ], 
        [ 1458876480000, 0.7745150128236261 ], 
        [ 1458876540000, 1.8582038339701432 ], 
        [ 1458876600000, 1.749585622915006 ], 
        [ 1458876660000, 0.6908039210654127 ] ]
    } ]
  }
}
```

Response contains information about time span and used granularity and
array of data series for each metric matching request criteria. Data
series' "values" attribute contains array of data points where each data
point is \[timestamp, metricValue\] pair. In case there are no values
for some metric for some timestamp, it will be omitted from the
response.

In case a metric group prefix is used instead of specific metric group,
response will contain a property for each metric in a metric group.
Example response for metric:"os.cpu.\*":

``` JSON
{
  "success" : true,
  "data" : {
    "start" : "2016-03-28 13:41:39",
    "end" : "2016-03-28 13:46:39",
    "granularityMillis" : 60000,
    "os.cpu.interrupt.soft" : [ {
      "values" : [ [ 1459129260000, 0.016619662452155185 ], [ 1459129320000, 0.033222591196565156 ], [ 1459129380000, 0.00828157572110189 ], [ 1459129440000, 0.008298066426549504 ], [ 1459129500000, 0.01664031773581799 ], [ 1459129560000, 0.008309790554097375 ] ]
    } ],
    "os.cpu.interrupt" : [ {
      "values" : [ [ 1459129260000, 0.0 ], [ 1459129320000, 0.0 ], [ 1459129380000, 0.0 ], [ 1459129440000, 0.0 ], [ 1459129500000, 0.0 ], [ 1459129560000, 0.0 ] ]
    } ],
    "os.cpu.idle" : [ {
      "values" : [ [ 1459129260000, 93.72611045572539 ], [ 1459129320000, 94.26910285247953 ], [ 1459129380000, 93.10986407254323 ], [ 1459129440000, 92.41556853084373 ], [ 1459129500000, 94.23412832370889 ], [ 1459129560000, 94.6568063356735 ] ]
    } ],
    "os.cpu.nice" : [ {
      "values" : [ [ 1459129260000, 1.0387233772495639 ], [ 1459129320000, 1.0382061410056171 ], [ 1459129380000, 0.9772391027954195 ], [ 1459129440000, 0.9376815891807583 ], [ 1459129500000, 1.0067393062185772 ], [ 1459129560000, 0.9223866684069032 ] ]
    } ],
    "os.cpu.user" : [ {
      "values" : [ [ 1459129260000, 1.1052019439602878 ], [ 1459129320000, 1.0714284830327485 ], [ 1459129380000, 1.5899928903997484 ], [ 1459129440000, 1.0040660376124901 ], [ 1459129500000, 0.9235379671442533 ], [ 1459129560000, 0.9306961265693783 ] ]
    } ],
    "os.cpu.wait" : [ {
      "values" : [ [ 1459129260000, 1.2630872830425686 ], [ 1459129320000, 0.7059800629270097 ], [ 1459129380000, 0.9026915879685913 ], [ 1459129440000, 2.6055916962072447 ], [ 1459129500000, 1.098261636176697 ], [ 1459129560000, 0.5152067650603207 ] ]
    } ],
    "os.cpu.steal" : [ {
      "values" : [ [ 1459129260000, 1.8281531472831476 ], [ 1459129320000, 1.893687698204214 ], [ 1459129380000, 2.451285461048852 ], [ 1459129440000, 1.9832378759453313 ], [ 1459129500000, 1.797154731476287 ], [ 1459129560000, 1.9278707437673468 ] ]
    } ],
    "os.cpu.system" : [ {
      "values" : [ [ 1459129260000, 1.0221041302868925 ], [ 1459129320000, 0.9883721711542914 ], [ 1459129380000, 0.9606453095230476 ], [ 1459129440000, 1.0455562037839088 ], [ 1459129500000, 0.9235377175394872 ], [ 1459129560000, 1.0387235699684552 ] ]
    } ]
  }
}
```

Note that wildcards may return a large number of data series and can
result in large responses, especially if combined with long time
interval and filtering without aggregation. In such cases, granularity
may be adjusted in order to control the number of returned data points. 

Metric data is aggregated to a single data series by default, but the
API allows filtering of data by all dimensions and/or aggregation using
non-default aggregation function. List of filters' values (dimensions)
for a specific metric and time span can be obtained using the metrics
filters API. There is also a special value "all" that can be used.

Example of API call for returning metric data per
host:

``` bash
# data point for last 5 min for metric os.cpu.user, using default granularity, separate data series for all hosts
curl -X POST -k -H "Content-Type: application/json" "https://apps.sematext.com/spm-reports/api/v2/metrics/data" -d '
{
  "apiKey" : "a9092d95-d062-4499-ad0b-a1b43fadb9b5",
  "appToken" : "262f66e5-0951-488b-9c92-379ba71a4299",
  "metric" : "os.cpu.user",
  "filters" : {
    "hostFilter" : {"values":["all"]}
  }
}'
```

And example of response:

``` JSON
{
  "success" : true,
  "data" : {
    "start" : "2016-03-28 13:45:11",
    "end" : "2016-03-28 13:50:11",
    "granularityMillis" : 60000,
     "os.cpu.user" : [ {
      "values" : [ [ 1459129500000, 1.1505753889951276 ], [ 1459129560000, 1.098534744785327 ], [ 1459129620000, 0.9655403374216636 ], [ 1459129680000, 1.4307098751555802 ], [ 1459129740000, 1.100367233337291 ], [ 1459129800000, 1.3153515628837957 ] ],
      "filters" : {
        "hostFilter" : "test1.sematext"
      }
    }, {
      "values" : [ [ 1459129500000, 0.6974430352297272 ], [ 1459129560000, 0.763358874900887 ], [ 1459129620000, 4.662621950518259 ], [ 1459129680000, 1.161054994243126 ], [ 1459129740000, 0.6974426262345177 ], [ 1459129800000, 1.1938319671857287 ] ],
      "filters" : {
        "hostFilter" : "test2.sematext"
      }
    } ]
  }
}
```

In this case there are two hosts that are sending metrics to the same
SPM app, so in the response the metric property contains separate data
series for each host. In case a metric has more than one dimension,
filters can be combined and the response will contain data series for
each combination of values.

As noted before, by default, single, aggregated data series is returned.
Aggregation is done on all data series, using default aggregation
function (in case of os.cpu.\* it is AVG). The API allows aggregation on
only a subset of data series, using any aggregation
function:

``` bash
# data point for last 5 min for metric os.cpu.user, using default granularity, separate data series for all hosts
curl -X POST -k -H "Content-Type: application/json" "https://apps.sematext.com/spm-reports/api/v2/metrics/data" -d '
{
  "apiKey" : "a9092d95-d062-4499-ad0b-a1b43fadb9b5",
  "appToken" : "262f66e5-0951-488b-9c92-379ba71a4299",
  "metric" : "os.cpu.user",
  "filters" : {
    "hostFilter": {"values":["test1.sematext", "test2.sematext"], "aggregation":"MAX"}
  }
}'
 
```

This call will result in a response similar to the one without filters,
with the difference being that the MAX value is returned for each data
point instead of AVG.

#### Metrics Filters

For a particular SPM application, this API call will return a list of
available filters and their values for referenced metric(s) and time
span, matching specified filters. The request format is similar to the
one for returning metric data.

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
<td><p><span class="nolink"><span class="nolink"><span class="nolink"><span class="nolink"><span class="nolink"><a href="https://apps.sematext.com/spm-reports/api/v2/metrics/filters" class="uri" class="external-link">https://apps.sematext.com/spm-reports/api/v2/metrics/filters</a></span></span></span></span></span></p>
<p><span class="nolink"><span class="nolink"><span class="nolink"><span class="nolink"><span class="nolink"><a href="http://list.do/" class="external-link"><br />
</a></span></span></span></span></span></p></td>
<td>POST</td>
<td><p><strong>apiKey</strong> (of owner of app represented with &quot;token&quot;)</p>
<p><strong>appToken</strong> (token of app whose metrics filters is being fetched)</p>
<p><strong>metric</strong> (metric name or metric group prefix to return filters for)</p>
<p><strong>start</strong> (time of interval to return filter values for; optional; can be expressed as timestamp in milliseconds or UTC date in format yyyy-MM-dd HH:mm:ss)</p>
<p><strong>end</strong> (time of interval to return filter values for; optional; can be expressed as timestamp in milliseconds or UTC date in format yyyy-MM-dd HH:mm:ss)</p>
<p><strong>interval</strong> (to return filter values for,expressed in milliseconds; optional; Can use suffixes s, m, h, d to express interval in seconds, minutes, hours, days - e.g. &quot;1d&quot; is equal to &quot;86400000&quot;; default value is 5m)</p>
<p><strong>filters</strong> (map of allowed filter values; optional;)</p></td>
<td><p>Fetches metrics data points</p>
<p> </p></td>
</tr>
</tbody>
</table>

Examples of API calls without filtering:

``` bash
# filters and their values for last 5 min for metric os.cpu.user
curl -X POST -k -H "Content-Type: application/json" "https://apps.sematext.com/spm-reports/api/v2/metrics/filters" -d '
{
  "apiKey" : "a9092d95-d062-4499-ad0b-a1b43fadb9b5",
  "appToken" : "262f66e5-0951-488b-9c92-379ba71a4299",
  "metric" : "os.cpu.user"
}'
 
# filters and their values for last hour, for all os.cpu metrics
curl -X POST -k -H "Content-Type: application/json" "https://apps.sematext.com/spm-reports/api/v2/metrics/filters" -d '
{
  "apiKey" : "a9092d95-d062-4499-ad0b-a1b43fadb9b5",
  "appToken"  :"262f66e5-0951-488b-9c92-379ba71a4299",
  "metric" : "os.*",
  "interval" : "1h"
}'

# filters and their values for specified interval, for all solr metrics, that are reported from test1.sematext
curl -X POST -k -H "Content-Type: application/json" "https://apps.sematext.com/spm-reports/api/v2/metrics/filters" -d '
{
  "apiKey" : "a9092d95-d062-4499-ad0b-a1b43fadb9b5",
  "appToken" : "262f66e5-0951-488b-9c92-379ba71a4299",
  "metric" : "solr.*",
  "start" : "2016-03-25 15:26:36",
  "end" : "2016-03-25 15:31:36",
  "filters" : ["hostFilter": {"values": ["test1.sematext"]}]
}'
```

Example of a success response for os.cpu.user metric (with HTTP code
200):

``` JSON
{
  "success" : true,
  "data" : {
    "start" : "2016-03-28 14:52:29",
    "end" : "2016-03-28 14:57:29",
    "filters" : {
      "tagFilter" : [ "env:test", "role:searcher", "zone:us-east-1a", "instanceType:m3.medium", "project:test" ],
      "hostFilter" : [ "all", "test1.sematext", "test2.sematext" ]
    }
  }
}
```

Response contains two filter types that can be used in metrics data API
to filter data series or metrics filters API to limit filter values
(e.g., to see what tags present are on host test1.sematext). In case of
wildcards, it is possible to get a list of filters that cannot actually
be applied to all metrics in a metric group, e.g. response for
"metric":"os.\*":

``` JSON
{
  "success" : true,
  "data" : {
    "start" : "2016-03-28 14:52:29",
    "end" : "2016-03-28 14:57:29",
    "filters" : {
      "tagFilter" : [ "env:test", "role:searcher", "zone:us-east-1a", "instanceType:m3.medium", "project:test" ],
      "networkFilter" : [ "all", "lo", "eth0" ],
      "diskFilter" : [ "all", "xvda", "xvda1", "xvdb", "xvdf" ],
      "hostFilter" : [ "all", "test1.sematext", "test2.sematext" ]
    }
  }
}
```

Since os.\* also includes disk and network metrics, filters applicable
to those metrics are also returned, but they are not applicable to
os.cpu.\* metrics.

Filter values can also be filtered. The last example is returning
solr.\* filters but only for test1.sematext:

``` JSON
{
  "success" : true,
  "data" : {
    "start" : "2016-03-28 14:52:29",
    "end" : "2016-03-28 14:57:29",
    "filters" : {
      "tagFilter" : [ "env:test", "role:searcher", "zone:us-east-1a", "instanceType:m3.medium", "project:test" ],
      "hostFilter" : [ "test1.sematext" ],
      "solrCoreFilter" : [ "all", "test-index", "lookup" ],
      "solrCoreUpdateHandlerFilter" : [ "all", "test-index:updateHandler" ],
      "solrCoreAllSumFilter" : [ "all", "test-index", "lookup"],
      "solrCoreHandlerFilter" : [ "all", "test-index:light_dismax", "test-index:standard", "lookup:dismax_ac", "lookup:standard" ]      
    }
  }
}
```

### Subscriptions API

Subscriptions API provides API calls for fetching of existing
subscriptions and for triggering emailing of reports.

#### List Subscriptions

For particular SPM application, this API call will return a list of all
existing subscriptions.

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
<td><p><span class="nolink"><span class="nolink"><span class="nolink"><span class="nolink"><span class="nolink"><a href="https://apps.sematext.com/spm-reports/api/v1/alert/enable.do" class="external-link">https://apps.sematext.com/spm-reports/api/v2/subscription/</a><a href="http://list.do" class="external-link">list</a></span></span></span></span></span></p>
<p><span class="nolink"><span class="nolink"><span class="nolink"><span class="nolink"><span class="nolink"><a href="http://list.do" class="external-link"><span><br />
</span></a></span></span></span></span></span></p></td>
<td>POST</td>
<td><p><strong>apiKey</strong> (of owner of app represented with &quot;token&quot;)</p>
<p><strong>appToken</strong> (token of app whose subscriptions are being fetched)</p></td>
<td><p>Fetches subscriptions for some application</p>
<p> </p></td>
</tr>
</tbody>
</table>

 

Example of API
call:

``` bash
curl -X POST -k -H "Content-Type: application/json" "https://apps.sematext.com/spm-reports/api/v2/subscription/list" -d '
{
  "apiKey":"a9092d95-d062-4499-ad0b-a1b43fadb9b5",
  "appToken":"12c91563-ba95-4a73-aa5a-08fe04b94631"
}'
```

 

Example of a success response (with HTTP code 200):

``` JSON
{
  "success" : true,
  "data" : {
    "subscriptions" : [ {
      "subscriptionId" : "34",
      "subject" : "[Sematext SPM] 'Disk' for 'Solr_app' application.",
      "appToken" : "262f66e5-0951-488b-9c92-379ba71a4299",
      "appName" : "Solr_app",
      "timeRange" : "ONE_WEEK",
      "attributes" : [ ],
      "emailTo" : [ "email-to-send-report-to@your-company.com" ]
    }, {
      "subscriptionId" : "35",
      "subject" : "[Sematext SPM] 'Disk' for 'Solr_app",
      "appToken" : "262f66e5-0951-488b-9c92-379ba71a4299",
      "appName" : "Solr_app",
      "timeRange" : "ONE_WEEK",
      "attributes" : [ "report name = disk, filters: hostFilter=host001, diskFilter=sda, diskFilter=sda1, diskFilter=sda2" ],
      "emailTo" : [ "email-to-send-report-to@your-company.com" ]
    }, {
      "subscriptionId" : "36",
      "subject" : "[Sematext SPM] 'Disk' for 'Solr_app' application.",
      "appToken" : "262f66e5-0951-488b-9c92-379ba71a4299",
      "appName" : "Solr_app",
      "timeRange" : "ONE_WEEK",
      "attributes" : [ "report name = disk, filters: hostFilter=host002, diskFilter=sda, diskFilter=sda1, diskFilter=sda2" ],
      "emailTo" : [ "email-to-send-report-to@your-company.com" ]
    } ]
  }
}
```

 

#### Email Report

Triggers instant emailing of a report defined by some subscription.

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
<td><p><span class="nolink"><span class="nolink"><span class="nolink"><span class="nolink"><span class="nolink"><a href="https://apps.sematext.com/spm-reports/api/v1/alert/enable.do" class="external-link">https://apps.sematext.com/spm-reports/api/v2/subscription/send/{subscriptionId}</a></span></span></span></span></span></p>
<p><span class="nolink"><span class="nolink"><span class="nolink"><span class="nolink"><span class="nolink"><a href="http://list.do" class="external-link"><span><br />
</span></a></span></span></span></span></span></p></td>
<td>POST</td>
<td><p><strong>apiKey</strong> (of owner of app represented with &quot;token&quot;)</p>
<p><strong>appToken</strong> (token of app which owns the report which is being sent)</p></td>
<td>Triggers instant sending of report<br />

<p> </p></td>
</tr>
</tbody>
</table>

 

Example of API
call:

``` bash
curl -X POST -k -H "Content-Type: application/json" "https://apps.sematext.com/spm-reports/api/v2/subscription/send/36" -d '
{
  "apiKey":"a9092d95-d062-4499-ad0b-a1b43fadb9b5",
  "appToken":"262f66e5-0951-488b-9c92-379ba71a4299"
}'
```

 

Example of a success response (with HTTP code 200):

``` JSON
{
  "success" : true,
  "message" : "Report for subscription with ID 36 sent"
}
```
