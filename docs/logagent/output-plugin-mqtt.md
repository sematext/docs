## Output Plugin: MQTT

This plugin publishes the result of Logagent parser as JSON message to MQTT topics.
Multiple instances of the plugin can be used, each one with its own topic filter. 
The optional filter configuration requires a field name (e.g. logSource) to match a regular expression. Messages not matching the filter are ignored. When no filter is specified Logagent sends all messages to the given MQTT topic.  

### Configuration

```
input:
  files: 
    - /var/log/sensor/*.log
    - /var/log/application-logs/*.log

output: 
  all:
    module: output-mqtt
    url: mqtt://test.mosquitto.org
    topic: logs-and-sensor-data
    debug: false

  sensor-data:
    module: output-mqtt
    url: mqtt://test.mosquitto.org
    topic: sensor-data
    debug: false
    # optional filter settings matching data field with regular expressions
    filter: 
      field: logSource
      match: sensor.*

  log-data:
    module: output-mqtt
    url: mqtt://test.mosquitto.org
    topic: log-data
    debug: false
    filter: 
      field: logSource
      match: application-logs.*

```

Start Logagent

```
logagent --config mqtt-output.yaml
```

### View events via mqtt client

```
npm i -g mqtt
mqtt subscribe -h test.mosquitto.org -t sensor-data
```