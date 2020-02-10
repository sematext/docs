title: Ship logs via http or https
description: Sends log messages as http or https post request

## Output Plugin: HTTP

Post logs to web services via `http` or `https`. 

Supported formats: 
- ldjson - line delimited json 

### Configuration

```
 output:
    module: output-http
    url: http://localhost:8080/events
    format: ldjson
    # maximum number of events to buffer
    # 1 - each event creates a separate http request
    # >1 - multiple events in each http request
    maxBufferSize: 1
    # flush interval in seconds
    flushInterval: 1
    # add tags before logs are shipped
    tags:
      token: SPM_TOKEN
      role: backend
      host: myServerName
    filter:
      field: logSource
      match: sensor.*
 ```

Start Logagent

```
logagent --config http.yaml
```