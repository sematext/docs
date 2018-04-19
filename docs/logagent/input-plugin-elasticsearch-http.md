Title: Receive data via Elasticsearch index API 

## Input Plugin: Elasticsearch HTTP

Plugin to receive documents via Elasticsearch HTTP indexing API (bulk and post requests). You can scale the HTTP service by setting 'worker' property > 0. 

Use cases: 

- Use the powerful Logagent parser with lightweight shippers like Rsyslog or Filebeat
- Act as 'Elasticsearch indexing proxy' with disk buffer using elasticsearch output plugin
- Receive events via Elasticsearch bulk API and fan out processed data to multiple outputs like Elasticsearch, Kafka or MQTT. 

### Configuration

```yaml

input:
  elasticsearch-http:
    module: input-elasticsearch-http
    port: 9200
    worker: 0
      
output: 
  stdout: false
  sematext-cloud:
    module: elasticsearch
    url: https://logsene-receiver.sematext.com
    # set default index
    # will be overwritten by data._index from elasticsearch-http plugin
    index: YOUR_SEMATEXT_LOGS_TOKEN
  
  # Real-time publishing of indexed docs via MQTT
  mqtt:
    module: output-mqtt
    url: mqtt://test.mosquitto.org
    debug: false
    dynamicTopic: data._index

```

Start Logagent

```
logagent --config myconfig.yml
# Index data. If you use Sematext Cloud for the output
# use your Sematext Cloud logs token as index name 
curl -XPOST http://127.0.0.1:9200/YOUR_SEMATEXT_LOGS_TOKEN/example/ -d '{
  "message": "Hello, Sematext!"
}'
```

