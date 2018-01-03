## Input Plugin: MQTT Client

Input plugin for [@sematext/logagent](http://sematext.com/logagent/). The plugin subscribes for MQTT topics. 

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

### Start logagent

```
logagent --config mqtt-input.yaml
```