title: Sematext Common Schema 
description: The following tags are treated as special in Sematext Cloud and cannot be used as custom tag, App agent YAMLs and as custom fields in logs. They are used to correlate data across multiple Apps.

Tags are sent by the Sematext Agent as part of every every data point or log line and they are shown in UI as filters. 

The following tags are treated as special in Sematext Cloud and cannot be used as custom tags, App agent YAMLs and as custom fields in logs. They are used to correlate data across multiple Apps.

## Logs Tags

Refer to this list of default fields for Logs Apps. The tags below are applicable to all logs types:

| Tag Name  | Description  | Synonymous Tags
|:--|:--|:--
| host | A single-valued field and should contain the ID, typically a hostname, of the device or server sending logs. |
| source | A single-valued field and should contain the ID or descriptor of where the data is coming from. For example, this could be a file name or even a full path to a filename, or the name of the application or process |
| facility | A single-valued field used by syslog to indicate the [facility level](https://en.wikipedia.org/wiki/Syslog#Facility_levels). Sematext stores the keyword values of these levels (such as *user* or *auth*). |
| severity | A single-valued field and should contain the log level, such as *error* or *info*. |
| syslog-tag | A single-valued field used by syslog to indicate the name and the PID of the application generating the event (for example, **httpd\[215\]:**). |
| tags | A multi-valued array field that can contain zero or more tags. Tags can contain multiple tokens separated by space. |
| message | A string field that can contain any sort of text (usually the original log line or some other free text). |
| @timestamp | A date field, on which log retention is based. If it's not present, it will be added automatically when the log event is received by Sematext. See [Supported Date Formats](../logs/supported-date-formats). |
| error.id | A reserved field for errors |
| error.message | A reserved field for errors |
| error.type | A reserved field for errors |
| span.id | Building block of a trace in distributed tracing |
| trace.id | Building block of a trace in distributed tracing |

All of these fields are optional, but their use is strongly encouraged. If found in logs with low-enough cardinality, all distinct values of these fields will be loaded and shown in the UI as filters and thus allowing one to very quickly narrow down the search.


## Common Tags

The tags below are applicable to all metrics/logs types:

| Tag Name  | Description  | Synonymous Tags
|:--|:--|:--
| os.host | Hostname of the host where the agent is running | host, hostname, host.id, host.name, server.name |
| token | Sematext App Token |
| measurement | Reserved as per Influx Line Protocol |
| tag.alias.type | Denotes the Tag Alias type |

## Operating System Tags

Below are the OS related tags sent as part of OS metrics/logs

| Tag Name  | Description  | Synonymous Tags
|:--|:--|:--
| os.disk | Human readable name of the block device | 
| os.disk.mountpoint | Mount point for the disk in the file system |
| os.disk.fs.type | Type of the file system associated with the device |
| os.network | Name of the network interface |

## Process Tags

Below are Process related tags sent as part of metrics/logs process info:

| Tag Name  | Description  | Synonymous Tags
|:--|:--|:--
| process.name | Process/program name |
| process.pid  | Process identifier | 
| process.ppid  | Parent process identifier | 
| process.type  | Process type, an example of a process type can be `master` or `child` for Node.js processes. | 

## Network Traffic Stats Tags

Below are the tags sent as part of Network Traffic Status metrics/logs:

| Tag Name  | Description  | Synonymous Tags
|:--|:--|:--
| network.topology.address | Local address of the network connection | 
| network.topology.destination.address | Remote host address of the network connection | 
| network.topology.destination.port | Remote port |
| network.topology.protocol | Protocol name (TCP or UDP) |
| network.topology.outgoing | Determines whether the connection is incoming (client connected to server) or outgoin(current machine connects to external server) |
| network.topology.process.id | Process identifier that produces connection stats |
| network.topology.process.name | Name of the process's image that produces connection stats | 

## Container Tags

Below are container related tags sent as part of metrics/logs in the container environment:

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
| kubernetes.pvc.name | Kubernetes Persistent Volume Claim name | 
| kubernetes.pod.controlledby | Controller of the pod (deployment or DaemonSet or StatefulSet) |

## Serverless Tags

Below are Serverless related tags sent as part of metrics/logs in the Serverless environment:

| Tag Name  | Description  | Synonymous Tags
|:--|:--|:--
| function.name | Name of the Lambda function | 
| function.version | Version of the Lambda function | 
| function.request.id | Identifier of the invocation request |

## Synthetic Monitoring Tags

Below are tags sent as part of metrics in Sematext Synthetic Monitoring:

| Tag Name  | Description  | Synonymous Tags
|:--|:--|:--
| synthetics.monitor.id | Identifier of the Monitor | 
| synthetics.run.id | Identifier of the Monitor run | 
| synthetics.location.id | Identifier of the Monitor location |
| synthetics.content.type | Type of the resource content |
| synthetics.domain | The resource URL of the domain  |
| synthetics.response.code | The resource HTTP response status code  |

## Other Special Tags

Below are tags that are reserved for future use:

| Tag Name  | Description  | Synonymous Tags
|:--|:--|:--
| os.host.ip | IP Address of the host/server | server.ip, server.address, host.ip, host.address, source.ip, source.address
| service.name | Name of the service where the data is collected from |
| service.id | Unique service identifier |
| service.type | Service type e.g. `hadoop` |
| span.id | Building block of a trace in distributed tracing |
| trace.id | Building block of a trace in distributed tracing |
