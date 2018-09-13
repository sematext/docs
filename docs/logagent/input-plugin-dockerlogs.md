title: Logagent input plugin for Docker logs
description: Logagent features modular logging architecture framework where each input or output module is implemented as a plugin. Use Docker logs as input and stream the output into Logagent. 

## Input Plugin: Docker logs

Input plugin to use Docker logs as input and stream the output into Logagent.

Features:

- collect all container logs
- discovers new containers
- all logs are tagged with container id/name and image name
- disable container logs by setting LOGSENE_ENBALED=false label/env variable
- enrich logs with with labels for later use in docker-enrichment plugin 

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