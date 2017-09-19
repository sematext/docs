## Plugin: Apache Kafka Output

Acts as producer to ingest parsed messages to Apache Kafka topics.
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
  stdin: true

output:
  kafka: 
   module: output-kafka
   kafkaHost: localhost
   topic: test
   #Configuration for consider message as  acknowledged acknowledged
   # 0 = No ack required
   # 1 = Leader ack required
   # -1 All in sync replicas ack required
   requireAcks: 1
   sslEnable: false
   #For init sslOptions please refer to to https://nodejs.org/api/tls.html
   sslOptions: 
      - rejectUnauthorized: false

```

Start logagent

```
logagent --config kafka-input.yaml
```