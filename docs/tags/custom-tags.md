title: Custom Tags 
description: A Tag is an attribute of a data point (or metric) that could be used for grouping and filtering. The Sematext Agents support configuring custom tags. They can be specified in the Agent's configuration files. For example, tags like `env:prod` can be configured on all production servers.

The Sematext Agents support configuring custom tags. They can be specified in the Agent's configuration files. For example, tags like `env:prod` can be configured on all production servers and `env:dev` on all development servers. The data can then be filtered in the UI using these tags. The maximum allowed length for both name and value is 1024 characters. They are mapped to `os.host` tag by the Agent. Configured tags are optional and can be changed at any time. The name and value of custom tags should match this regex: `[a-zA-Z0-9_\-=\+\.]*`.

Below are the steps to configure custom tags in Sematext Agents.

## Sematext Agent

To add tags in the Sematext Agent, edit the property below in the Infra Agent configuration file:
`/opt/spm/properties/st-agent.yml` 

```yaml
# Tag Alias configuration, add tags if you want to use them: "env:foo, role:bar"
tag-aliases: "env:dev, project:projectName, role:webfrontend"
```

## Sematext App Agent

To configure tags for an individual App, edit the property below in the monitor configuration file: 
`/opt/spm/spm-monitor/conf/spm-monitor-config-${token}-${jvm}.properties`:

``` properties
# add tags if you want to use them, example: SPM_MONITOR_TAGS="env:foo, role:bar"
SPM_MONITOR_TAGS="env:dev, project:projectName, role:webfrontend"
```

### Defining Tags in Integration YAMLs

In the App Agent, tags are extracted automatically from metric data sources & values based on YAML configuration. Tags can be configured in the `tag` section of the App Agent integration YAMLs. The maximum allowed length for the tag name is 200 characters. The tag name should match this regex: <nobr>`[a-zA-Z0-9_\-.:(\\ |,=)]+`</nobr>. Examples of these tags are hostname, port, webapp name, jvm name, disk, elasticsearch index, etc. You don't need to adjust these tags for built-in
integrations.

For example, refer to [Tomcat web module YAML definition](https://github.com/sematext/sematext-agent-integrations/blob/master/tomcat/jmx-web-module.yml) where the hostname and webapp name are extracted as tags from JMX ObjectName.

Some of the tags derived from a given metric source can be omitted. In such cases, the data point will be aggregated on the omitted tag. By default, the aggregate function is used based on metric type (AVG for gauges and SUM for counters). This could be overridden using `agentAggregation` property of metric. Refer to [Elasticsearch index YAML definition](https://github.com/sematext/sematext-agent-integrations/blob/master/elasticsearch/json-index-0.yml) where `shard` tag is omitted.

## Sematext Node.js Agent

Tags could be configured in the config file `./.spmagentrc` or
`/etc/spmagentrc`

``` properties
SPM_MONITOR_TAGS = env:dev, project:projectName, role:webfrontend
```

or in the environment variable SPM\_MONITOR\_TAGS, e.g. on Linux:

``` properties
export SPM_MONITOR_TAGS="env:dev, project:projectName, role:webfrontend"
```
