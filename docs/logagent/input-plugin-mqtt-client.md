title: Logagent input plugin for MQTT Client 
description: Logagent features modular logging architecture framework where each input or output module is implemented as a plugin, and loaded on demand as declared in the configuration file. MQTT Client input plugin subscribes to MQTT topics, receives messages via MQTT, and it is designed for the efficient exchange of real-time data between applications, sensors and mobile devices. Use it for device-generated analytics and monitoring, data indexing, search, and device metrics visualization

## Input Plugin: MQTT Client

Input plugin for [@sematext/logagent](https://sematext.com/logagent/). This plugin subscribes to MQTT topics. 

### Configuration

```yaml
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
