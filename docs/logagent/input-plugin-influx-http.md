## Input Plugin: InfluxDB

Receives metrics from InfluxDB compatible agents like telegraf. Logagent behaves like InfluxDB HTTP API /write endpoint. Metrics are converted from influx-line-protocol to a JSON structure, which could be indexed Elasticsearch or Sematext Cloud. 

```
input:
  influx: 
    module: input-influx-http
    port: 8086
    workers: 1

output: 
  stdout: yaml 
  # sematext-cloud:
  #   module: elasticsearch 
  #   url: https://logsene-receiver.sematext.com
  #   index: YOUR_LOGSENE_TOKEN_HERE
```

Run Logagent

```
logagent --config influx.yml 
```

The config above would output metrics received from Telegraf agent in the follwoing way (YAML): 

```
measurement:          system
timestamp:            1507673300000000000
@timestamp:           Wed Oct 11 2017 00:08:20 GMT+0200 (CEST)
system_uptime:        36984
system_uptime_format: 10:16
tags: 
  rack: 1a
  host: imac.local
  user: stefan
  dc:   us-east-1
```
