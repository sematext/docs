#### Events: What, Why, How?

[Sematext Cloud](http://sematext.com/cloud/) can graph not only performance and
[custom metrics](/monitoring/custom-metrics) or logs, but also events.  Such
events may represent what is happening with a server or cluster, with an
application (e.g., application or server restarts, deployments,
alerts...), etc, as well as any sort of other event data that you want
to correlate to metrics or logs.  Events are graphed in timeseries charts
and these charts can be shown next to metrics or logs charts.  This
makes it possible to easily correlate events with metrics and/or logs.  In addition
to showing events as timeseries charts, a detailed listing of events can
be seen and, of course, events can have tags, and can be
searched and filtered.

Events are also exposed via a REST API that let's you post, retrieve,
and search your events.  This REST API matches the Elasticsearch API, so
you can use any Elasticsearch tool or client to post, get, and search
events.

  

**NOTE:**

  - To be able to use send Events to Sematext, you need a Sematext account.
    If you don't already have it, you can create
    it [here](https://apps.sematext.com/ui/registration), it's
    free, no credit card needed. After you have Sematext account, create
    an App of any type.
  - If you have already created some Apps under your account in the
    past, you can send Events to any of them.
  - If you just registered, you can create Apps by following the
    steps after Sematext account registration, or by clicking
    directly [here](https://apps.sematext.com/ui/registration).

  

#### Event Fields

An event has the following set of fields, most of which are optional:

<table>
<thead>
<tr class="header">
<th>Field Name</th>
<th>Field Type</th>
<th>Required</th>
<th>Notes</th>
</tr>
</thead>
<tbody>
<tr class="odd">
<td>timestamp</td>
<td>date</td>
<td>no</td>
<td>Represents time when event happened (if not specified, current time will be assumed). The format is <a href="http://joda-time.sourceforge.net/api-release/org/joda/time/format/ISODateTimeFormat.html#dateOptionalTimeParser" class="external-link">dateOptionalTime</a> e.g.: <span>2014-02-17T21:37:04+0100 or </span><span class="jsonPretty-string">2014-02-17T14:15:01.534471+02:00 or ...<br />
</span></td>
</tr>
<tr class="even">
<td>message</td>
<td>string</td>
<td>yes</td>
<td>Short description of event, e.g. &quot;Elasticsearch node03 on host somehost06 restarted&quot;. This is a default search field in Sematext UI, so it is good to keep it concise, but search-friendly.</td>
</tr>
<tr class="odd">
<td>name</td>
<td>string</td>
<td>no</td>
<td>Event name, can be used as a short label for event, e.g. &quot;Elasticsearch restart&quot;.</td>
</tr>
<tr class="even">
<td>tags</td>
<td>string array</td>
<td>no</td>
<td>Multivalued field. Each tag should be specified as a separate array element (e.g., &quot;tags&quot;:[ &quot;elasticsearch&quot;, &quot;restart&quot;, &quot;emergency fix&quot;])</td>
</tr>
<tr class="odd">
<td>priority</td>
<td>string</td>
<td>no</td>
<td>You can use any values that make sense to you, like &quot;high&quot;, &quot;very high&quot; or 7. Note that sorting on this field will sort in lexicographical order.</td>
</tr>
<tr class="even">
<td>creator</td>
<td>string</td>
<td>no</td>
<td>Person, application, or component that created an event. E.g., &quot;John Smith&quot;, &quot;Elasticsearch&quot;, &quot;Some Batch Job&quot;</td>
</tr>
<tr class="odd">
<td>data</td>
<td>string</td>
<td>no</td>
<td>Additional event data. It can be anything you may find useful to have along inside of event object. E.g., it could be stacktrace in case of &quot;app_error&quot; event,  base64 encoded content of file generated during &quot;user_registered&quot; event, etc.</td>
</tr>
</tbody>
</table>

  

#### Adding Events

To post an event to your event stream use the following base endpoint:

``` bash
http://event-receiver.sematext.com/APPLICATION_TOKEN/event
```

A single App token must be specified in the URL. Thus, to send
multiple events associated with multiple Apps, separate call to
the API will need to be made for each App.  You can add event
type as a field in JSON message
(e.g, **alert**, **app\_restart**, **server\_restart**, **reboot**,
**deployment**...), but we suggest using a smaller number of distinct
event types (1-10) to keep things manageable.

##### **Example** **1**

Consider an App whose token (your App tokens are at:
<https://apps.sematext.com/ui/integrations/apps>) is
**1111111-2222-3333-4444-555555555555**.  To send
a **server\_restart** event call the Events API with token and event
type:

**[http://event-receiver.sematext.com](http://event-receiver.sematext.com/receive/YOUR_APPLICATION_TOKEN/EVENT_TYPE)[/**1111111-2222-3333-4444-555555555555**/event](http://event-receiver.sematext.com/receive/YOUR_APPLICATION_TOKEN/EVENT_TYPE)**

with POST content in JSON format like this:

``` JSON
{
  "timestamp" : "2014-02-17T15:29:04+0100",
  "message": "Application MyApp on MyHost04 restarted",
  "type" : "server_restart"
}
```

  

To post the above event with curl
use: 

``` bash
curl -XPOST "http://event-receiver.sematext.com/1111111-2222-3333-4444-555555555555/event" -d '
{
  "timestamp" : "2014-02-17T15:29:04+0100",
  "message" : "Application MyApp on MyHost04 restarted",
  "type" : "server_restart"
}
'
```

  

##### **Example 2**

Same App, but we want to post a **deployment** event with
more event properties populated. In this case the HTTP endpoint would
be:

**[http://event-receiver.sematext.com](http://event-receiver.sematext.com/receive/YOUR_APPLICATION_TOKEN/EVENT_TYPE)[/](http://event-receiver.sematext.com/receive/YOUR_APPLICATION_TOKEN/EVENT_TYPE)[1111111-2222-3333-4444-555555555555/event](http://localhost:8448/event-receiver/1111111-2222-3333-4444-555555555555/server_restart)**

with HTTP POST content:

``` JSON
{
  "timestamp" : "2014-02-17T15:58:04+0100",
  "message": "Solr 4.6.1 version deployed on prodhost06",
  "name" : "Solr 4.6.1 deployment",
  "tags" : ["solr", "4.6.1", "deployment", "upgrade"],
  "priority" : "High",
  "creator" : "John Smith",
  "type" : "deployment"
}
```

  

or, again with
curl:

``` bash
curl -XPOST "http://event-receiver.sematext.com/1111111-2222-3333-4444-555555555555/event" -d '
{
  "timestamp" : "2014-02-17T15:58:04+0100",
  "message" : "Solr 4.6.1 version deployed on prodhost06",
  "name" : "Solr 4.6.1 deployment",
  "tags" : ["solr", "4.6.1", "deployment", "upgrade"],
  "priority" : "High", "creator" : "John Smith",
  "type" : "deployment"
}
'
```

  

#### Searching Events

Sematext user interface lets you find events, metrics, and logs from a specific
time period. Additionally, the event chart has a search box where you
can further narrow down events to only those that match the input query.

![](attachments/22249482/22511618.png)

  

The query syntax is specified by Elasticsearch's query string query, as
described
[here](http://www.elasticsearch.org/guide/en/elasticsearch/reference/current/query-dsl-query-string-query.html#query-string-syntax).

You can search on any event field you included in the event when posting
it.

  

#### Searching Events Programmatically

Sematext exposes the Events Search HTTP API - as [Elasticsearch search API](http://www.elasticsearch.org/guide/en/elasticsearch/reference/current/query-dsl.html) - so
events can be searched and retrieved programmatically/remotely, via
HTTP(S), using curl or any other Elasticsearch client.  The API endpoint
is:

``` bash
http://event-receiver.sematext.com/APPLICATION_TOKEN
```

  

Alternatively, you can also use the same endpoint which was used when
adding events, where event type is specified, in which case the matching
events will be limited to the type specified in the URI:

``` bash
http://event-receiver.sematext.com/APPLICATION_TOKEN/event
```

  

The simplest way to run a query is using [URI search](http://www.elasticsearch.org/guide/en/elasticsearch/reference/current/search-uri-request.html),
like this:

$ curl -XGET
"[http://event-receiver.sematext.com/1111111-2222-3333-4444-555555555555/](http://event-receiver.sematext.com/1111111-2222-3333-4444-555555555555/server_restart/)\_search?q=creator:john"

  

More query options are available when using [request body search](http://www.elasticsearch.org/guide/en/elasticsearch/reference/current/search-request-body.html),
e.g.:

``` bash
curl -XGET "http://event-receiver.sematext.com/1111111-2222-3333-4444-555555555555/_search" -d '
  "query" : {
    "query_string" : {
      "query" : "MyHost04",
      "default_field" : "message"
    }
  } 
'
```

  

This example shows how to use one of the simpler query types -
query\_string. To see which other query types are available, please
check [Elasticsearch docs](http://www.elasticsearch.org/guide/en/elasticsearch/reference/current/query-dsl.html).

  

#### Posting Events via HTTPS

You can use HTTPS instead of HTTP for all calls, in which case the
endpoint becomes:

``` bash
https://event-receiver.sematext.com/APPLICATION_TOKEN
```

  

Note: when using curl, you may experience **"SSL certificate
problem"** errors. The reason is that curl doesn't bundle any CA certs
any more.  For more info see
[this](http://curl.haxx.se/docs/sslcerts.html). Regardless of curl
errors, HTTPS communication should be functional.
