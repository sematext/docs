title: Logagent input plugin for Microsoft Azure EventHub 
description: ____

## Input Plugin: Azure EventHub

Plugin to ____

Use cases: 

- ____
- ____
- ____

### Configuration

```yaml

input:
  module: azure-eventhub
    name: hub1
    endpoint: Endpoint=sb://sematextevents.servicebus.windows.net/;SharedAccessKeyName=RootManageSharedAccessKey;SharedAccessKey=oahU9gjxqXvIpvJbOOU/UiTI+cyTY1kKqib43jMXnMQ=
    consumerGroup: '$Default'
    bodyField: msg
```
