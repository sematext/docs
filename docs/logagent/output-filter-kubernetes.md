title: Logagent output filter for Kubernetes log enrichment
description: Logagent features a modular logging architecture framework where each input or output module is implemented as a plugin. Use Kubernetes log enrichment to add metadata like labels or Kubernetes pod information to container logs or route logs to different destinations by setting Kubernetes annotations with the log index. 

## Output Filter: kubernetes-enrichment

Output filter plugin to add metadata such as Kubernetes pod information to container logs or route logs to different destinations by setting pod annotations. 

Features:

- Attach Kuberntes meta data (namespace, UUID, pod name, container name in pod, image name)
- Evaluates pod annotations for Sematext Cloud: 
  -  `sematext/logs-token=YOUR_LOGS_TOKEN` to set the log index
  -  `sematext/logs-enabled=<true|false>` to switch logging per pod on or off
   - `sematext/logs-remove-fields=<field list>` to remove specific log fields from pod logs 

Applications:

- Log routing based on Kubernetes annotations
- Use Kuberntes API to get correct Kubernetes metadata 


### Configuration

```yaml

input:
  docker:
    module: docker-logs
    socket: /var/run/docker.sock
    labelFilter: com.docker.*,io.kubernetes.*,annotation.*

outputFilter: 
  dockerEnrichment:
    module: docker-enrichment 
    autodetectSeverity: true
  k8sEnrichment:
    module: kubernetes-enrichment

output:
    sematext:
      module: elasticsearch
      url: https://logsene-receiver.sematext.com
      index: YOUR_LOGS_TOKEN

```

Start Logagent

```
logagent --config k8s.yaml
```

Kubernetes enrichment plugin is supported with CLI without any configuration file: 
```
logagent --k8sEnrichment --docker /var/run/docker.sock --yaml
```
