title: Monitoring Tags 
description: Tag is an attribute of a data point (or metric) that could be used for grouping and filtering.

Tags are sent by Sematext Agents as part of every data point and they are shown in UI as filters. 
For example, as part of Docker container metrics, the agent sends hostname on which the container is running, container identifier, container name, container image as tags which appear as filters in UI. User can then group or filter the container metrics using these tags.

The tags are automatically collected by agents while fetching metrics and sent as part of metrics to the receiver.

## Reserved Tags

Following tags are reserved and cannot be used in Tag aliases, App agent YAMLs and as custom fields in logs. There are used to correlate data across multiple apps and logs. Refer to [Special Logs Fields](/logs/special-fields/) for list of special fields in logs.

### Common Tags

The below tags are applicable to all metrics types

| Tag Name  | Description  | Related reserved tags
|:--|:--|:--
| os.host | Hostname of the host where the agent is running | host, hostname, host.id, host.ip, host.name |
| token | Sematext App Token |
| measurement | Reserved as per Influx Line Protocol |
| tag.alias.type | Denotes the Tag Alias type |

### Container Tags

Below are container related tags that are sent as part of metrics in the container environment.

| Tag Name  | Description  | Related reserved tags
|:--|:--|:--
| container.type | Type of container engine (e.g. docker, rkt, crio) |
| container.name | Container name |
| container.id | Container identifier |
| container.image.name | Container image name |
| container.hostname | Hostname of the container being monitored |
| container.host.hostname | Hostname of the host where the container is running |

### Kubernetes Tags

Below are Kubernetes related tags that are sent as part of metrics in the Kubernetes environment.

| Tag Name  | Description  | Related reserved tags
|:--|:--|:--
| kubernetes.pod.name | Name of the kubernetes pod | pod

### Serverless Tags

Below are Serverless related tags that are sent as part of metrics/logs in the Serverless environment.

| Tag Name  | Description  | Related reserved tags
|:--|:--|:--
| function.name |  | 


### Other Reserved Tags

Below are the tags that are reserved for future use.

| Tag Name  | Description  | Related reserved tags
|:--|:--|:--
| source |  Represents the source of the event  | facility
| service | Service that generated the event | service.id, service.name
| span | Building block of trace in distributed tracing | 


## Defining Tags in Sematext App Agent Integration YAMLs

In App Agent, tags are extracted automatically from metric data sources & values based on YAML configuration. The tags can be configured in `tag` section App Agent integration YAMLs.  The maximum allowed length for the tag name is 200 characters. The tag name should match this regex: <nobr>`[a-zA-Z0-9_\-.:(\\ |,=)]+`</nobr>. Examples of these tags are hostname, port, webapp name, jvm name, disk, elasticsearch index, etc. You don't need to adjust these tags for built-in
integrations.

For example, refer to [Tomcat web module YAML definition](https://github.com/sematext/sematext-agent-integrations/blob/master/tomcat/jmx-web-module.yml) where the hostname and webapp name are extracted as tags from JMX ObjectName.

Some of the tags derived from a given metric source can be omitted. In such cases, the data point will be aggregated on the omitted tag. By default, the aggregate function is used based on metric type (AVG for gauges and SUM for counters). This could be overridden using `agentAggregation` property of metric. Refer to [Elasticsearch index YAML definition](https://github.com/sematext/sematext-agent-integrations/blob/master/elasticsearch/json-index-0.yml) where `shard` tag is omitted.
