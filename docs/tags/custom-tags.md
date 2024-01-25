title: Defining Custom Tags
description: A Tag is an attribute of a data point (or metric) that could be used for grouping and filtering. The Sematext Agents support configuring custom tags. They can be specified in the Agent's configuration files. For example, tags like `env:prod` can be configured on all production servers.

The Sematext Agent supports configuring custom tags. They can be specified in the Agent's configuration files. For example, tags like `env:prod` can be configured on all production servers and `env:dev` on all development servers. The data can then be filtered in the UI using these tags. The maximum allowed length for both name and value is 1024 characters. They are mapped to `os.host` tag by the Agent. Configured tags are optional and can be changed at any time. The name and value of custom tags should match this regex: `[a-zA-Z0-9_\-=\+\.]*`.

Below are the steps to configure custom tags in Sematext Agents.

## Sematext Agent

To add tags to the Sematext Agent, edit the property below in the Sematext Agent configuration file:
`/opt/spm/properties/st-agent.yml`

```yaml
# User configured tags, add tags if you want to use them: "env:foo, role:bar"
tags: "env:dev, project:projectName, role:webfrontend"
```

### Ansible

It also possible to add custom tags to your Ansible playbook, for details please see [here](https://sematext.com/docs/agents/sematext-agent/ansible/#install-the-agent-using-an-ansible-playbook).

## Sematext App Agent

To configure tags for an individual App, edit the property below in the monitor configuration file:
`/opt/spm/spm-monitor/conf/spm-monitor-config-${token}-${jvm}.properties`:

``` properties
# add tags if you want to use them, example: SPM_MONITOR_TAGS="env:foo, role:bar"
SPM_MONITOR_TAGS="env:dev, project:projectName, role:webfrontend"
```

### Defining Tags in Integration YAMLs

In the Sematext App Agent, tags are extracted automatically from metric data sources & values defined in the `tags` section of App Agent's YAML configuration. The maximum allowed length for the tag name is 200 characters. The tag name should match this regex: <nobr>`[a-zA-Z0-9_\-.:(\\ |,=)]+`</nobr>. Examples of these tags are hostname, port, webapp name, jvm name, disk, elasticsearch index, etc. You don't need to adjust these tags for built-in integrations.

For example, refer to [Tomcat web module YAML definition](https://github.com/sematext/sematext-agent-integrations/blob/master/tomcat/jmx-web-module.yml) where the hostname and webapp name are automatically extracted as tags from JMX ObjectName.

Some of the tags derived from a given metric source can be omitted. In such cases, the data point will be aggregated on the omitted tag. For example, in [Elasticsearch index YAML definition](https://github.com/sematext/sematext-agent-integrations/blob/master/elasticsearch/json-index-0.yml) the `shard` tag is omitted.  By default, the aggregate function used is based on the metric type (`avg` for gauges and `sum` for counters). This could be overridden using `agentAggregation` property of metric.

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
