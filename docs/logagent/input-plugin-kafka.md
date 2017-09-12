## Plugin: Apache Kafka Input

Input plugin to receive and act as consumer for an Apache Kafka Topic.
This plugin depends on two additional node modules, which should be installed first: 

```
npm i -g kafka-node 
npm i -g kafka-stream
```
 
### Configuration

```
# Global options
options:
  includeOriginalLine: false

input:
  kafka: 
    module: input-kafka
    kafkaHost: localhost
    groupId: ExampleTestGroup
    topic: test
    autoCommit: true
    sessionTimeout: 15000
    sslEnable: false
    #For init sslOptions please refer to to https://nodejs.org/api/tls.html
    sslOptions: 
      - rejectUnauthorized: false
    
output:
  stdout: yaml # use 'pretty' for pretty json and 'ldjson' for line delimited json (default)
  elasticsearch: 
  	module: elasticsearch
  	url: http://localhost:9200
  	index: test

```

Start logagent

```
logagent --config kafka-input.yaml
```