title: Monitoring Tags 
description: Tag is an attribute of a data point (or metric) that could be used for grouping and filtering.

Tags are sent by Sematext Agents as part of every data point and they are shown in UI as filters. 
For example, as part of Docker container metrics, the agent sends hostname on which the container is running, container identifier, container name, container image as tags which appear as filters in UI. User can then group or filter the container metrics using these tags.

The tags are automatically collected by agents while fetching metrics and sent as part of metrics to the receiver.

## Special Tags

The following tags are treated as special in Sematext Cloud and cannot be used in tag aliases, App agent YAMLs and as custom fields in logs. They are used to correlate data across multiple Apps. Refer to [Special Logs Fields](/logs/special-fields/) for list of special fields in logs.

### Common Tags

The tags below are applicable to all metrics types:

| Tag Name  | Description  | Synonymous Tags
|:--|:--|:--
| os.host | Hostname of the host where the agent is running | host, hostname, host.id, host.name, server.name |
| token | Sematext App Token |
| measurement | Reserved as per Influx Line Protocol |
| tag.alias.type | Denotes the Tag Alias type |

### Container Tags

Below are container related tags sent as part of metrics in the container environment.

| Tag Name  | Description  | Synonymous Tags
|:--|:--|:--
| container.type | Type of container engine (e.g. docker, rkt, crio) |
| container.name | Container name |
| container.id | Container identifier |
| container.image.name | Container image name |
| container.hostname | Hostname of the container being monitored |
| container.host.hostname | Hostname of the host where the container is running |

### Kubernetes Tags

Below are Kubernetes related tags sent as part of metrics in the Kubernetes environment.

| Tag Name  | Description  | Synonymous Tags
|:--|:--|:--
| kubernetes.pod.name | Name of the kubernetes pod | pod
| kubernetes.pod.node | Node name where the pod is running | 
| kubernetes.cluster.name | Kubernetes cluster name | 
| kubernetes.deployment.name | Kubernetes deployment name | 
| kubernetes.namespace | Kubernetes namespace | 
| kubernetes.pvc.name | Kubernetes Persistent Volume Clain name | 
| kubernetes.pod.controlledby | Controller of the pod (deployment or daemonset or statefulset) |

### Operating System Tags

Below are the OS related tags sent as part of OS metrics

| Tag Name  | Description  | Synonymous Tags
|:--|:--|:--
| os.disk | Human readable name of the block device | 
| os.disk.mountpoint | Mount point for the disk in the file system |
| os.disk.fs.type | Type of the file system associated with the device |
| os.network | Name of the network interface |

### Process Tags

Below are Process related tags sent as part of metrics/logs process info.

| Tag Name  | Description  | Synonymous Tags
|:--|:--|:--
| process.name | process/program name |
| process.pid  | process identifier | 

### Network Traffic Stats Tags

Below are the tags sent as part of Network Traffic Status metrics:

| Tag Name  | Description  | Synonymous Tags
|:--|:--|:--
| network.topology.address | Local address of the network connection | 
| network.topology.destination.address | Remote host address of the network connection | 
| network.topology.destination.port | Remote port |
| network.topology.protocol |  Protocol name (TCP or UDP) |
| network.topology.outgoing | determines whether the connection is incoming (client connected to server) or outgoin(current machine connects to external server) |
| network.topology.process.id | process's identifier that produces connection stats |
| network.topology.process.name | name of the process's image that produces connection stats | 

### Serverless Tags

Below are Serverless related tags sent as part of metrics/logs in the Serverless environment.

| Tag Name  | Description  | Synonymous Tags
|:--|:--|:--
| function.name | Name of the Lamba function | 
| function.version | Version of the Lamda function | 
| function.request.id | Identifier of the invocation request | 


### Other Special Tags

Below are the tags that are reserved for future use.

| Tag Name  | Description  | Synonymous Tags
|:--|:--|:--
| os.host.ip | IP Address of the host/server | server.ip, server.address, host.ip, host.address, source.ip, source.address
| service.name | Name of the service where the data is collected from |
| service.id | Unique service identifier |
| service.type | Service type e.g. `hadoop` |
| span | Building block of trace in distributed tracing |


## Defining Tags in Sematext App Agent Integration YAMLs

In the App Agent, tags are extracted automatically from metric data sources & values based on YAML configuration. Tags can be configured in the `tag` section of the App Agent integration YAMLs. The maximum allowed length for the tag name is 200 characters. The tag name should match this regex: <nobr>`[a-zA-Z0-9_\-.:(\\ |,=)]+`</nobr>. Examples of these tags are hostname, port, webapp name, jvm name, disk, elasticsearch index, etc. You don't need to adjust these tags for built-in
integrations.

For example, refer to [Tomcat web module YAML definition](https://github.com/sematext/sematext-agent-integrations/blob/master/tomcat/jmx-web-module.yml) where the hostname and webapp name are extracted as tags from JMX ObjectName.

Some of the tags derived from a given metric source can be omitted. In such cases, the data point will be aggregated on the omitted tag. By default, the aggregate function is used based on metric type (AVG for gauges and SUM for counters). This could be overridden using `agentAggregation` property of metric. Refer to [Elasticsearch index YAML definition](https://github.com/sematext/sematext-agent-integrations/blob/master/elasticsearch/json-index-0.yml) where `shard` tag is omitted.