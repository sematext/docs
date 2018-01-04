## Input Plugin: MQTT Broker

Input plugin for [@sematext/logagent](http://sematext.com/logagent/). The plugin starts a MQTT Broker and emits each received message (all topics) to Logagent processing pipeline.  

### Configuration

```
# mqtt-input.yaml
input:
  mqtt-broker:
    module: input-mqtt-broker
    port: 1883
    # regular expression to ignore topics
    ignoreTopic: ^\$SYS
    debug: false

output:
  stdout: yaml
  elasticsearch: 
    module: elasticsearch
    url: https://logsene-receiver.sematext.com
    # default index 
    index: bb308f80-0453-485e-xxxx-f80c054a0f09
    # routing topics to different indicies
    indices:
          bb308f80-0453-485e-xxxx-f80c054a0f10:
              - log-m.*
          bb308f80-0453-485e-xxxx-f80c054a0f11:
              - sensor-.*

```

### Start Logagent

```
logagent --config mqtt-input.yaml
```

### Send MQTT messages

```
npm i -g mqtt
mqtt pub -h localhost -p 1833 -t log-messages -m "Hello MQTT"
mqtt pub -h localhost -p 1833 -t sensor-data -m '{"temperature": 11}'
```
