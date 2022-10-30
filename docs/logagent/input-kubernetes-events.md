title: Logagent input plugin for Kubernetes Events
description: Logagent features modular logging architecture framework where each input or output module is implemented as a plugin. Logagent collects Kubernetes event logs.  

## Input Plugin: Kubernetes Event Collection

Input plugin to collect Kubernetes events via API.

Features:

- parse bulk messages

Applications:

- centralize Kubernetes events
- index Kubernetes events in Elasticsearch or Sematext Cloud
- create alerts on Kubernetes events
- create analytics and monitor event logs 

Requirements: 

- A working `kubectl` config
- Or run Logagent in a pod, role bindings to access k8s API pods, events, and namespaces 

### Configuration

```yaml

# Receive Kubernetes events via HTTP server
input:
   kubernetesEvents:
    module: input-kubernetes-events

output:
    # view events on console during test setups
    stdout: yaml
    # ship events to Sematext Cloud
    elasticsearch:
      module: elasticsearch
      url: https://logsene-receiver.sematext.com
      index: YOUR_LOGS_TOKEN


```

Start Logagent

```
logagent --config kubernetes-events.yml
```


Note, you can use the command line argument `--k8sEvents` to activate the plugin via logagent command. The following command would listen to Kubernetes events on TCP port 9091 and dumps the events in YAML format to console. 

```
logagent --k8sEvents --yaml
```

