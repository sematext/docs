title: Ingest data in ClickHouse  
description: Send data to a ClickHouse server using ClickHouse output plugin for Logagent, light-weight log shipper, filebeat, fluentd or rsyslog alternative with out of the box and extensible log parsing, on-disk buffering, secure transport, bulk indexing to Elasticsearch and Sematext logs management platform

## Output Plugin: ClickHouse DB

This plugin sends data to Yandex ClickHouse DB. 

#### Installation 

To use the plugin, only Logagent must be installed. 

```
sudo npm i -g @sematext/logagent 
```

### Configuration

__Preparation for the example:__

- Start ClickHouse DB

```
docker run -d --name clickhouse-server -p 8123:8123 -p 9000:9000 --ulimit nofile=262144:262144 yandex/clickhouse-server
```

- Login via ClickHouse client

```
docker run -it --rm --link clickhouse-server:clickhouse-server yandex/clickhouse-client --host clickhouse-server
```

- Run create table statemnt

```
CREATE TABLE logs(
    message String,
    severity String,
    "@timestamp" UInt64) ENGINE = Log;
```

- Create a configuration file for Logagent

```
# Global options
options:
  includeOriginalLine: false

# note you can use any input plugin here
input:
  stdin: true
  

output:   
  clickhouse: 
    module: output-clickhouse
    url: http://127.0.0.1 
    port: 8123
    debug: false
    table: default.logs
    # Fields must be in the same order as specified in CREATE TABLE
    fields: 
      - 'severity'
      - 'message'
      - '@timestamp'

```


Stream log messages to Logagent and ClickHouse

```
  cat test.log | logagent --config clickhouse.yaml
```

