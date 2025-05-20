title: Events API in Sematext
description: API for adding and searching events in Sematext

Events can be added and retrieved via an API. To use the API, you need the API key of your account. 
It can be found [here](https://apps.sematext.com/ui/account/api) for US region or [here](https://apps.eu.sematext.com/ui/account/api) for EU region.
You can also get the API Key using Login endpoint by providing username/password. 
The API Key needs to be passed as Header parameter with name Authorization and value should be in the format apiKey <Value>. e.g. apiKey e5f18450-205a-48eb-8589-7d49edaea813

## Adding Events via API

See [here](adding.md#adding-events-via-api).

### Event Search API

Sematext exposes the Events Search HTTP API, which is compatible with both [Elasticsearch](https://www.elasticsearch.org/guide/en/elasticsearch/reference/current/query-dsl.html) and [OpenSearch](https://docs.opensearch.org/docs/latest/query-dsl/) query DSLs. This allows you to search and retrieve events programmatically over HTTP(S), using curl or any standard Elasticsearch/OpenSearch client. The API endpoint is:

`https://event-receiver.sematext.com/APP_TOKEN`

Alternatively, you can also use the same endpoint which was used when  
adding events, where event type is specified, in which case the matching
events will be limited to the type specified in the URI:

```bash
https://event-receiver.sematext.com/APP_TOKEN/event
```

The simplest way to run a query is using [URI search](https://docs.opensearch.org/docs/latest/api-reference/search/),
like this:

```bash
curl
https://event-receiver.sematext.com/1111111-2222-3333-4444-555555555555/_search?q=creator:john \
-H 'Authorization: apiKey 1111111-2222-3333-4444-555555555555'
```

For more info about ```apiKey``` [see](/docs/logs/search-through-the-sematext-api) .

More complex queries are available when using [request body search](https://docs.opensearch.org/docs/latest/api-reference/search),
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

This example shows how to use one of the simplest query types: `query_string`. To see which other query types are available, please
check [OpenSearch docs](https://docs.opensearch.org/docs/latest/query-dsl/).
