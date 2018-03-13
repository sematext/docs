## Input plugin: Nova SDS011 sensor

Input plugin for [@sematext/logagent](http://sematext.com/logagent/). The plugin collects PM10 and PM2.5 values from Nova SDS011 dust sensor from USB via serial port. The sensor data can be enriched with location data from other plugins, e.g. from [Logagent apple location](logagent-apple-location) tracker plugin. 

## Installation 

Install [@sematext/logagent](https://www.npmjs.com/package/@sematext/logagent) and [logagent-novasds](https://www.npmjs.com/package/logagent-novasds) npm package: 

```
npm i -g @sematext/logagent 
npm i -g logagent-novasds
```
 
### Configuration

```yaml

# Global options
options:
  includeOriginalLine: false

input:
  novaSDS011:
    module: logagent-novasds
    # COM port for the USB to serial interface
    comPort: /dev/cu.wchusbserialfa1220
    # optional static sensor location
    location:  
      lat: 49.0
      lon: 7.0
      address: "My Street, My City, My Country"
    tags: 
      environment: indoors

output: 
  stdout: yaml
  # store senor data in Sematext Cloud
  sematext-cloud:
    module: elasticsearch
    url: https://logsene-receiver.sematext.com
    index:  YOUR_LOGSENE_TOKEN
  # share sensor data via MQTT
  mqtt:
    module: output-mqtt
    url: mqtt://test.mosquitto.org
    topic: sensor-data
    debug: false
    # optional filter settings matching data field with regular expressions
    filter: 
      field: logSource
      match: Nova

```

## Start logagent

```
logagent --config logagent-novasds011-input.yaml
```