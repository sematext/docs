title: Monitoring Events 
description: Event stream captures all your key IT and operations such as server, container, docker, and business events, and lets you search and filter historical alerts and add custom events via the UI or the REST API

### Events: What, Why, How?

[Sematext Cloud](http://sematext.com/cloud/) can graph not only
performance [metrics](../monitoring) or [logs](../logs), but also events. Such events 
may represent what is happening with a server or cluster, with an application, etc.
Think application or server restarts, builds, deployments, alerts, etc.
Events are graphed as a timeline. Events timeline can be shown
next to metrics or logs charts. This makes it possible to easily
correlate events with metrics and/or logs. In addition to showing
events as timeseries charts, a detailed listing of events can be seen
and, of course, events can have tags, and can be searched and
filtered.

Beyond events that you want to see as part of your operations
intelligence think about events that matter to your team or your
organization in general.  All kinds of "business events" can be shipped
to Sematext, too. [Read](/events/adding#adding-events-through-ui) more about
adding custom events. You can create an event when your web application encounters
an outage and when the problem which caused the outage has been fixed.

Besides being shown in the UI events are also exposed via a [REST API](../api)
that lets you post, retrieve, and search your events. This REST API
matches the Elasticsearch API, so you can use any Elasticsearch tool
or client to post, get, and search events.


### Searching Events

[Sematext Cloud](http://sematext.com/cloud/) lets you find events, metrics,
and logs from a specific time period. Additionally, the event chart has
a search box where you can further narrow down events to only those that match
the input query. You can search on any event field you included in the event when posting
it.  The query syntax is the same as the [logs search syntax](/logs/search-syntax/).

### Event Search API

Sematext exposes the Events Search HTTP API - as [Elasticsearch search API](http://www.elasticsearch.org/guide/en/elasticsearch/reference/current/query-dsl.html) - so
events can be searched and retrieved programmatically via
HTTP(S), using curl or any other Elasticsearch client.  The API endpoint
is:

```
https://event-receiver.sematext.com/APP_TOKEN
```

Alternatively, you can also use the same endpoint which was used when
adding events, where event type is specified, in which case the matching
events will be limited to the type specified in the URI:

```bash
https://event-receiver.sematext.com/APP_TOKEN/event
```

The simplest way to run a query is using [URI search](http://www.elasticsearch.org/guide/en/elasticsearch/reference/current/search-uri-request.html),
like this:

```bash
curl
https://event-receiver.sematext.com/1111111-2222-3333-4444-555555555555/_search?q=creator:john \
-H 'Authorization: apiKey 1111111-2222-3333-4444-555555555555'
```

For more info about ```apiKey``` [see](../logs/search-through-the-elasticsearch-api) .

More complex queries are available when using [request body search](http://www.elasticsearch.org/guide/en/elasticsearch/reference/current/search-request-body.html),
e.g.:

```json
curl -XGET "https://event-receiver.sematext.com/1111111-2222-3333-4444-555555555555/_search" -d '
  "query" : {
    "query_string" : {
      "query" : "MyHost04",
      "default_field" : "message"
    }
  } 
' \
-H 'Authorization: apiKey 1111111-2222-3333-4444-555555555555' 
```

This example shows how to use one of the simplest query types: 
```query_string```. To see which other query types are available, please
check [Elasticsearch docs](http://www.elasticsearch.org/guide/en/elasticsearch/reference/current/query-dsl.html).


### Events Histogram

The **Events Histogram** is a timeline of Events time-series data. It can easily be **filtered using the time-picker** component shortcuts, as well as zoom and shift chart tools.

![Sematext Cloud Events Histogram Component](https://sematext.com/docs/images/guide/alerts-and-events/add-events-component-time-series.png "Sematext Cloud Events Histogram Component")

### Events Stream

The **Event Stream component** is a **list view of all Events** that occurred across your infrastructure. It centralizes all of them in a single table, and is a **unified way to filter and pinpoint issues** across different parts of your infrastructure. 

![Sematext Cloud Events Stream Component](https://sematext.com/docs/images/guide/alerts-and-events/event-stream-component.png "Sematext Cloud Events Stream Component")

Apart from what you see here, you can **send** your own **custom events** to the Sematext Events Stream. Our Events feature is **exposed via a [REST API](../events/#adding-events)** that lets you post, retrieve, and search your events. This REST API matches the Elasticsearch API, so you can use any Elasticsearch tool or client to post, get, and search for events.

