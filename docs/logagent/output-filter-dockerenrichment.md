title: Logagent output filter for Docker log enrichment
description: Logagent features modular logging architecture framework where each input or output module is implemented as a plugin. Use Docker log enrichment to add metadata like labels or Kubernetes pod information to docker logs or route logs to different destinations by setting container labels with the log index. 

## Output Filter: Docker Enrichment

Output filter plugin to add metadata like labels or Kubernetes pod information to docker logs or route logs to different destinations by setting container labels with the log index. 

Features:

- detect severty (error, info, warning) of logs
- attach labels to docker logs 
- attach Kuberntes meta data (namespace, UUID, pod name, container name in pod)
- set the log index for the elasticsearch output plugin
- evaluates containers LOGENSE_TOKEN label or environment variable to set log index

Applications:

- collect docker logs including meta data


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

output:
    elasticsearch:
      module: elasticsearch
      url: http://logsene.reciver.sematext.com
      index: YOUR_LOGSENE_TOKEN

```

Start Logagent

```
logagent --config docker.yaml
```

Docker logs and the docker-enrichment plugin is supported with CLI without any configuration file: 
```
logagent --docker /var/run/docker.sock --yaml
```