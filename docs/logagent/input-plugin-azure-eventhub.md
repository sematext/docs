title: Logagent input plugin for Microsoft Azure Event Hub 
description: Logagent collects events from Azure Event Hub. Store and process events in Sematext Cloud. 

## Input Plugin: Azure Event Hub

Plugin subscribes to [Microsoft Azure Event Hub](https://docs.microsoft.com/en-us/azure/event-hubs/event-hubs-about) and receives events in real-time. 

Use cases: 

- collect logs from Azure applications 
- collect metrics from Azure
- collect any kind of events from Event Hubs
- long term storage for events in Sematext Cloud
- use Sematext Cloud anomaly detection and alerts based on Azure events 

### Configuration

```yaml

# Collect Azure Events
input:
  azure-events: 
    module: azure-eventhub
    # Event Hub Name
    name: hub1
    # Your Event Hub endpoint, requires read permissions 
    endpoint: Endpoint=sb://sematextevents.servicebus.windows.net/;SharedAccessKeyName=RootManageSharedAccessKey;SharedAccessKey=oahU9gjxqXvIpvJbOOU/UiTI+cyTY1kKqib43jMXnMQ=
    # Your consumer group
    consumerGroup: '$Default'
    # depending on the JSON structure of the events, you can change 
    # the field name to extract event entries
    # Microsoft puts a bulk of events into the msg field
    # bodyField: msg

# Store Azure events in Sematext Cloud
output: 
  module: elasticsearch
  url: https://logsene-receiver.sematext.com
  index: YOUR_SEMATEXT_LOGS_TOKEN

```

Start Logagent to view azure events on console

```
logagent --config azure-events.yml --yaml 
```
