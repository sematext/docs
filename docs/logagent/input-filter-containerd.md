title: Parsing cri-o log format, add Kubernetes context to container logs 
description: Logagent features modular logging architecture framework where each input or output module is implemented as a plugin, and loaded on demand as declared in the configuration file. Input filters process raw input from input plugins before log events get parsed 

## Input Filter: Kubernetes cri-o / containerd  

Parsing cri-o containerd log format. Use the file input plugin to read log files. 

## Configuration 

Note: The plugin can be enabled via command line option `--k8sContainerd`.

Add the following section to the Logagent configuration file:  

```
inputFilter:
  # parse containerd log format, add pod info to log context 
  - module: input-filter-k8s-containerd
```

The following example collects container log files, parses cri-o format, parses container logs with default log patterns, and adds Kubernetes meta-data via Kubernetes API before it ships logs to Sematext Cloud: 

```yaml
input: 
  # make sure files include your cri-o log container folder 
  files:
    - '/var/log/containers/*.log'

inputFilter:
  # parse containerd log format, add pod info to log context 
  - module: input-filter-k8s-containerd

outputFilter:
  # add k8s metadata via k8s API 
  - module: k8s-enrichment 

output:
  elasticsearch:
    module: elasticsearch
    url: https://logsene-receiver.sematext.com
    index: YOUR_LOGS_TOKEN

```


Run Logagent: 
```
logagent --config crio.yml 
```
