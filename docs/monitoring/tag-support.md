title: Monitoring Tags 
description: Tag is an attribute of a data point (or metric) that could be used for grouping and filtering.

Tags are sent by Sematext Agents as part of every data point and they are shown in UI as filters. 

For example, as part of Docker container metrics, the agent sends hostname on which the container is running, container identifier, container name, container image as tags which appear as filters in UI. User can then group or filter the container metrics using these tags.

At the moment all Common [Special Tags](../../special-tags) apply to Monitoring Apps.

If you choose to use 3rd party Agents, then you need to ensure the tag names match those from our Common Special Tags.

## Defining Tags in Sematext App Agent Integration YAMLs

In the App Agent, tags are extracted automatically from metric data sources & values based on YAML configuration. Tags can be configured in the `tag` section of the App Agent integration YAMLs. The maximum allowed length for the tag name is 200 characters. The tag name should match this regex: <nobr>`[a-zA-Z0-9_\-.:(\\ |,=)]+`</nobr>. Examples of these tags are hostname, port, webapp name, jvm name, disk, elasticsearch index, etc. You don't need to adjust these tags for built-in
integrations.

For example, refer to [Tomcat web module YAML definition](https://github.com/sematext/sematext-agent-integrations/blob/master/tomcat/jmx-web-module.yml) where the hostname and webapp name are extracted as tags from JMX ObjectName.

Some of the tags derived from a given metric source can be omitted. In such cases, the data point will be aggregated on the omitted tag. By default, the aggregate function is used based on metric type (AVG for gauges and SUM for counters). This could be overridden using `agentAggregation` property of metric. Refer to [Elasticsearch index YAML definition](https://github.com/sematext/sematext-agent-integrations/blob/master/elasticsearch/json-index-0.yml) where `shard` tag is omitted.