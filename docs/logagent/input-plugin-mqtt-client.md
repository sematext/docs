Title: Receive messages via MQTT 
Description: MQTT, IoT, log shipper

## Input Plugin: MQTT Client

Input plugin for [@sematext/logagent](http://sematext.com/logagent/). This plugin subscribes to MQTT topics. 

### Configuration

```
# mqtt-input.yaml
input:
  mqtt-client:
    module: input-mqtt-client
    url: mqtt://test.mosquitto.org
    topics: 
      - log-messages
      - sensor-data
    
output:
  stdout: yaml
  elasticsearch: 
    module: elasticsearch
    url: https://logsene-receiver.sematext.com
    # routing different topics to different indicies
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

### Send MQTT messages to subscribed topics

```
npm i -g mqtt
mqtt pub -h test.mosquitto.org -t log-messages -m "Hello MQTT"
mqtt pub -h test.mosquitto.org -t sensor-data -m '{"temperature": 11}'
```
