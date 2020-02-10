title: Logagent input plugin for Kubernetes audit logs
description: Logagent features modular logging architecture framework where each input or output module is implemented as a plugin. Logagent can receive Kubernetes audit logs via http. 

## Input Plugin: Kubernetes Audit Logs

Input plugin to receive Kubernetes audit logs via http.

Features:

- parse bulk messages

Applications:

- centralize Kubernetes audit logs
- act as webhook to receive Kubernetes audit logs
- index Kubernetes audit logs in Elasticsearch or Sematext Cloud
- create alerts on Kubernetes audit logs


Requirements: 

- Configure Kubernetes to send audit logs via webhook 

### Configuration

```yaml

# Receive Kubernetes Audit events via HTTP server
input:
   kubernetesAudit:
    module: input-kubernetes-audit
    # server listens to a port 
    port: 9091
    # dynamic index setting by posting audit logs to /indexName/ URL 
    useIndexFromUrlPath: true
    # number of extra processes to fork as web server workers
    worker: 0
    tags:
      receiver: logagent_kubernetes_audit

output:
    # view events on console during test setups
    stdout: yaml
    # ship audit logs to Sematext Cloud
    elasticsearch:
      module: elasticsearch
      url: https://logsene-receiver.sematext.com
      index: YOUR_LOGS_TOKEN


```

Start Logagent

```
logagent --config kubernetes-audit.yml
```


Note, you can use the command line argument `--k8sAudit portNumber` to activate the plugin via logagent command. The following command would listen to Kubernetes events on TCP port 9091 and dumps the events in YAML format to console. 

```
logagent --k8sAudit 9091 --yaml
```

