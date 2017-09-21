## Input Plugin: TCP input

Plugin to receive log data via TCP.
Optionally it can send parsed JSON back to the client. 

### Configuration

```yaml
input:
  tcp: 
    module: input-tcp
    port: 45900
    bindAddress: 0.0.0.0
    sourceName: tcpTest
    returnResult: false

output:
  elasticsearch:
    module: elasticsearch
    url: http://localhost:9200
    index: logs
```

Start Logagent

```
logagent --config myconfig.yml
```

Ship logs to a TCP port:

```
tail -F  access.log |  nc localhost 45900
``` 
