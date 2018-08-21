title: Logagent input plugin for Apache Cassandra
description: Logagent features modular logging architecture framework where each input or output module is implemented as a plugin. Use Cassandra queries as input and stream the output into Logagent. Export data from Cassandra , run queries frequently, choose time zone and format for query time, use multiple CQL query statements features, index CQL data to Elasticsearch and create analytics and monitoring graph event as well as alerts based on series in database

## Input Plugin: Apache Cassandra

Input plugin to use Cassandra queries as input and stream the output into Logagent.

Features:

- run queries frequently
- choose time zone and format for query time
- use multiple CQL query statements 

Applications:

- index CQL data to elasticsearch
- create alerts based on series in Cassandra database
- create analytics and monitoring graph event stored in Cassandra 

### Configuration

```yaml

input:
  cassandra-json:
    module: cassandra-query
    server:
      #contact points should be separated by comma ',' for example 'h1', 'h2' 
      host: localhost
      port: '9042'
      keyspace: 'logagent'
    #https://docs.datastax.com/en/developer/nodejs-driver/3.4/features/connection-pooling/
    pooling:
        coreConnectionsPerHost:
          distanceLocal: 2
          distanceRemote: 1
    queryTimezone: America/Los_Angeles 
    queryTimeFormat: YYYY-MM-DD HH:mm:ss          
    queries: 
      - sourceName: query1
        sql: SELECT * FROM logagent.orders_by_day WHERE event_time >= '$queryTime' ALLOW FILTERING
    interval: 1
    debug: false

output:
    stdout: yaml


```

Start Logagent

```
logagent --config cassandra.yml
```
