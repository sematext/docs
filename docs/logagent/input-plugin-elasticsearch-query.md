title: Logagent input plugin for Elasticsearch Query 
description: Logagent features modular logging architecture framework where each input or output module is implemented as a plugin. Elasticsearch Query input plugin is used to receive documents from scheduled Elasticsearch queries. Ingest data from Elasticsearch queries and report the results to supported output modules (e.g. Slack channels), re-index and transform documents, replicate data to other Elasticsearch clusters, and store results of aggregation queries in a new index.

## Input Plugin: Elasticsearch Query

Plugin to receive documents from scheduled Elasticsearch queries.

Applications:

- Elasticsearch alerting: Logagent can report the results of any Elasticsearch query to supported output modules (e.g. Slack channels).  
- Re-indexing and transforming documents 
- Replicating data to other Elasticsearch clusters
- Storing results of aggregation queries in a new index

### Configuration

```yaml
input:
  queryLogs: 
    module: elasticsearch-query
    sourceName: errorQuery
    # repeat query every N seconds
    interval: 60
    # tracing settings for elasticsearch-client
    log: 'error'
    url: https://localhost:9200
    query: 
      size: 50
      index: logstash-YYYY-MM-DD
      body:
        query:
          bool:
            must: 
              - query_string:
                  query: 'status:>399'
            filter:
              - range:
                  '@timestamp':
                    gte: now-1m/m
                    lte: now/m

output: 
    stdout: yaml

```

Start Logagent

```
logagent --config myconfig.yml
```
