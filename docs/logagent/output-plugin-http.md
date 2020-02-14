title: Ship logs via HTTP or HTTPS
description: Sends log messages as HTTP or HTTPS post request

## Output Plugin: HTTP

Post logs to web services via `HTTP` or `HTTPS`. 

Supported formats: 
- ldjson - line delimited json

### Configuration

```
 output:
    module: output-http
    url: http://localhost:8080/events
    format: ldjson
    # maximum number of events per request
    # 1 - each event creates a separate http request
    # >1 - multiple events in each http request
    maxBufferSize: 1
    # flush interval in seconds
    flushInterval: 5
    filter:
      field: logSource
      match: sensor.*
 ```

Start Logagent

```
logagent --config http.yaml
```