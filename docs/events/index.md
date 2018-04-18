#### Events: What, Why, How?

[Sematext Cloud](http://sematext.com/cloud/) can graph not only
performance and [custom metrics](/monitoring/custom-metrics) or
[logs](/logs), but also events. Such events may represent what is
happening with a server or cluster, with an application, etc.  Think
application or server restarts, builds, deployments, alerts, etc.
Events are graphed in timeseries charts and these charts can be shown
next to metrics or logs charts. This makes it possible to easily
correlate events with metrics and/or logs. In addition to showing
events as timeseries charts, a detailed listing of events can be seen
and, of course, events can have tags, and can be searched and
filtered.

Beyond events that you want to see as part of your operations
intelligence think about events that matter to your team or your
organization in general.  Such "business events" can be shipped to
Sematext, too.

Besides being shown in the UI events are also exposed via a REST API
that lets you post, retrieve, and search your events. This REST API
matches the Elasticsearch API, so you can use any Elasticsearch tool
or client to post, get, and search events.

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

Events can be added interactively via the UI, but you can also add them via the API:

```
https://event-receiver.sematext.com/APPLICATION_TOKEN/event
```

Because an event is always associated with a Sematext App, the App token must be specified in the URL. Thus, to send
multiple events associated with multiple Apps, separate call to
the API will need to be made for each App.  

** Event Types **

Each event has a type.  This helps you distinguish between different kinds of events.
You can specify the event type as a field in the even JSON structure as shown further below.
You may want to use types such as
**alert**, **app\_restart**, **server\_restart**, **reboot**, **deployment**...
To get the most value out of typed events we strongly suggest using a smaller number of distinct
event types (1-10) to keep things manageable.

Note: when using curl to call the Events API, you may experience **"SSL certificate
problem"** errors. The reason is that curl doesn't bundle any CA certs
any more.  For more info see
[this](http://curl.haxx.se/docs/sslcerts.html). Regardless of curl
errors, HTTPS communication should be successful.

**Example 1**

Consider an App whose token (your App tokens are at:
<https://apps.sematext.com/ui/integrations/apps>) is
**1111111-2222-3333-4444-555555555555**.  To send
a **server\_restart** event call the Events API with the App token in the URL:

[https://event-receiver.sematext.com/1111111-2222-3333-4444-555555555555/event](https://event-receiver.sematext.com/1111111-2222-3333-4444-555555555555/event)

and with POST content, including event type, in JSON format like this:

``` JSON
{
  "timestamp" : "2014-02-17T15:29:04+0100",
  "message": "Application MyApp on MyHost04 restarted",
  "type" : "server_restart"
}
```

To add the above event with curl use: 

``` bash
curl -XPOST "https://event-receiver.sematext.com/1111111-2222-3333-4444-555555555555/event" -d '
{
  "timestamp" : "2014-02-17T15:29:04+0100",
  "message" : "Application MyApp on MyHost04 restarted",
  "type" : "server_restart"
}
'
```

**Example 2**

Same App, but we want to post a **deployment** event with more event properties populated. In this case the HTTP endpoint would be:

[https://event-receiver.sematext.com/1111111-2222-3333-4444-555555555555/event](https://event-receiver.sematext.com/1111111-2222-3333-4444-555555555555/event)

with HTTP POST content:

``` JSON
{
  "timestamp" : "2018-02-17T15:58:04+0100",
  "message": "Solr 7.0.0 version deployed on prodhost06",
  "name" : "Solr 7.0.0 deployment",
  "tags" : ["solr", "7.0.0", "deployment", "upgrade"],
  "priority" : "High",
  "creator" : "John Smith",
  "type" : "deployment"
}
```

or, again with curl:

``` bash
curl -XPOST "https://event-receiver.sematext.com/1111111-2222-3333-4444-555555555555/event" -d '
{
  "timestamp" : "2018-02-17T15:58:04+0100",
  "message" : "Solr 7.0.0 version deployed on prodhost06",
  "name" : "Solr 7.0.0 deployment",
  "tags" : ["solr", "7.0.0", "deployment", "upgrade"],
  "priority" : "High",
  "creator" : "John Smith",
  "type" : "deployment"
}
'
```

#### Searching Events

Sematext lets you find events, metrics, and logs from a specific
time period. Additionally, the event chart has a search box where you
can further narrow down events to only those that match the input query.
You can search on any event field you included in the event when posting
it.  The query syntax is the same as the [logs search syntax](/logs/search-syntax/).

#### Event Search API

Sematext exposes the Events Search HTTP API - as [Elasticsearch search API](http://www.elasticsearch.org/guide/en/elasticsearch/reference/current/query-dsl.html) - so
events can be searched and retrieved programmatically via
HTTP(S), using curl or any other Elasticsearch client.  The API endpoint
is:

```
https://event-receiver.sematext.com/APPLICATION_TOKEN
```

Alternatively, you can also use the same endpoint which was used when
adding events, where event type is specified, in which case the matching
events will be limited to the type specified in the URI:

``` bash
https://event-receiver.sematext.com/APPLICATION_TOKEN/event
```

The simplest way to run a query is using [URI search](http://www.elasticsearch.org/guide/en/elasticsearch/reference/current/search-uri-request.html),
like this:

$ curl -XGET
"[https://event-receiver.sematext.com/1111111-2222-3333-4444-555555555555/\_search?q=creator:john](https://event-receiver.sematext.com/1111111-2222-3333-4444-555555555555/\_search?q=creator:john)"

More query options are available when using [request body search](http://www.elasticsearch.org/guide/en/elasticsearch/reference/current/search-request-body.html),
e.g.:

``` bash
curl -XGET "https://event-receiver.sematext.com/1111111-2222-3333-4444-555555555555/_search" -d '
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
