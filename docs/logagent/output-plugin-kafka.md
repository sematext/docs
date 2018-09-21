title: Ingest parsed logs in Apache Kafka 
description: Logging pipeline plugin to ingest parsed messages to Apache Kafka topics with Logagent, light-weight log shipper, filebeat, fluentd or rsyslog alternative with out of the box and extensible log parsing, on-disk buffering, secure transport, bulk indexing to Elasticsearch and Sematext logs management platform

## Output Plugin: Apache Kafka 

Acts as producer to ingest parsed messages to Apache Kafka topics.
This plugin depends on [logagent-output-kakfa](https://www.npmjs.com/package/logagent-output-kafka), which should be installed first. 


### Installation 

Install [@sematext/logagent](https://www.npmjs.com/package/@sematext/logagent) and [logagent-output-kafka](https://www.npmjs.com/package/logagent-output-kafka) npm package: 

```
npm i -g @sematext/logagent 
npm i -g logagent-output-kafka
```
 
### Configuration

```
# Global options
options:
  includeOriginalLine: false

input:
  stdin: true

output:
  kafka: 
   module: logagent-output-kafka
   host: localhost
   port: 9092 
   topic: test
   requireAcks: 1
   sslEnable: false
   sslOptions: 
      - rejectUnauthorized: false

```

### Start logagent

```
logagent --config kafka-input.yaml
```
