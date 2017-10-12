## Input Plugin: InfluxDB

Receives metrics from InfluxDB compatible agents like telegraf. Logagent behaves like InfluxDB HTTP API /write endpoint. Metrics are converted from influx-line-protocol to a JSON structure. The JSON documents could be indexed in Elasticsearch or Sematext Cloud - or forwarded to any other output plugin.

### Example 

```
# Logagent configuration file: influx.yml
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

Then start e.g. [Telegraf](https://github.com/influxdata/telegraf) configured for InfluxDB, pointing to Logagent server.

```
# Telegraf configuration 
# Configuration for influxdb server to send metrics to Logagent
[[outputs.influxdb]]
  ## The HTTP or UDP URL for your InfluxDB instance.  Each item should be
  ## of the form:
  ##   scheme "://" host [ ":" port]
  ##
  ## Multiple urls can be specified as part of the same cluster,
  ## this means that only ONE of the urls will be written to each interval.
  # urls = ["udp://localhost:8089"] # UDP endpoint example
  urls = ["http://logagent-server-name:8086"] # required
  ## The target database for metrics (telegraf will create it if not exists).
  database = "telegraf" # required
```

Logagent would output metrics received from Telegraf agent (YAML): 

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
