title: Special Tags 
description: The following tags are treated as special in Sematext Cloud and cannot be used as custom tag, App agent YAMLs and as custom fields in logs. They are used to correlate data across multiple Apps.

Tags are sent by Sematext Agents as part of every every data point or log line and they are shown in UI as filters. 

The following tags are treated as special in Sematext Cloud and cannot be used as custom tags, App agent YAMLs and as custom fields in logs. They are used to correlate data across multiple Apps. Refer to [Special Logs Fields](../logs/special-fields/) for a list of additional special fields for Logs Apps. Monitoring Apps currently only use the common special tags described here.

## Common Tags

The tags below are applicable to all metrics/logs types:

| Tag Name  | Description  | Synonymous Tags
|:--|:--|:--
| os.host | Hostname of the host where the agent is running | host, hostname, host.id, host.name, server.name |
| token | Sematext App Token |
| measurement | Reserved as per Influx Line Protocol |
| tag.alias.type | Denotes the Tag Alias type |

## Container Tags

Below are container related tags sent as part of metrics/logs in the container environment.

| Tag Name  | Description  | Synonymous Tags
|:--|:--|:--
| container.type | Type of container engine (e.g. docker, rkt, crio) |
| container.name | Container name |
| container.id | Container identifier |
| container.image.name | Container image name |
| container.hostname | Hostname of the container being monitored |
| container.host.hostname | Hostname of the host where the container is running |

## Kubernetes Tags

Below are Kubernetes related tags sent as part of metrics/logs in the Kubernetes environment.

| Tag Name  | Description  | Synonymous Tags
|:--|:--|:--
| kubernetes.pod.name | Name of the kubernetes pod | pod
| kubernetes.pod.node | Node name where the pod is running | 
| kubernetes.cluster.name | Kubernetes cluster name | 
| kubernetes.deployment.name | Kubernetes deployment name | 
| kubernetes.namespace | Kubernetes namespace | 
| kubernetes.pvc.name | Kubernetes Persistent Volume Clain name | 
| kubernetes.pod.controlledby | Controller of the pod (deployment or daemonset or statefulset) |

## Operating System Tags

Below are the OS related tags sent as part of OS metrics/logs

| Tag Name  | Description  | Synonymous Tags
|:--|:--|:--
| os.disk | Human readable name of the block device | 
| os.disk.mountpoint | Mount point for the disk in the file system |
| os.disk.fs.type | Type of the file system associated with the device |
| os.network | Name of the network interface |

## Process Tags

Below are Process related tags sent as part of metrics/logs process info.

| Tag Name  | Description  | Synonymous Tags
|:--|:--|:--
| process.name | process/program name |
| process.pid  | process identifier | 

## Network Traffic Stats Tags

Below are the tags sent as part of Network Traffic Status metrics/logs:

| Tag Name  | Description  | Synonymous Tags
|:--|:--|:--
| network.topology.address | Local address of the network connection | 
| network.topology.destination.address | Remote host address of the network connection | 
| network.topology.destination.port | Remote port |
| network.topology.protocol |  Protocol name (TCP or UDP) |
| network.topology.outgoing | determines whether the connection is incoming (client connected to server) or outgoin(current machine connects to external server) |
| network.topology.process.id | process's identifier that produces connection stats |
| network.topology.process.name | name of the process's image that produces connection stats | 

## Serverless Tags

Below are Serverless related tags sent as part of metrics/logs in the Serverless environment.

| Tag Name  | Description  | Synonymous Tags
|:--|:--|:--
| function.name | Name of the Lamba function | 
| function.version | Version of the Lamda function | 
| function.request.id | Identifier of the invocation request | 


## Other Special Tags

Below are the tags that are reserved for future use.

| Tag Name  | Description  | Synonymous Tags
|:--|:--|:--
| os.host.ip | IP Address of the host/server | server.ip, server.address, host.ip, host.address, source.ip, source.address
| service.name | Name of the service where the data is collected from |
| service.id | Unique service identifier |
| service.type | Service type e.g. `hadoop` |
| span | Building block of trace in distributed tracing |

