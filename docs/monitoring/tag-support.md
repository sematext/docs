title: Monitoring Tags Support
description: Extract tags from metric sources, environment, assign metadata to host/server/container with custom tags and create more useful dashboards and alerts for your AWS, Docker, Node.js and other applications, hosts and containers

## What's a Tag?

To help you manage your metrics, hosts, and containers, and to help you
create more useful dashboards, you can assign metadata to each
host/server/container in the form of *tags*.

Tags let you organize your hosts/servers/containers in different
ways – for example by role, owner, or environment. Each tag consists of
a key and a value, separated by the ':' character. Both key & value are
case-sensitive.

We recommend that you devise a set of tag keys that meet your needs for each piece of your infrastructure and to keep the tag set small and clean. Using a consistent and not overly broad set of tag keys makes it easier for you make the most of Sematext and avoid chaos. Tags will help you to create Alerts for hosts/servers/containers under certain tags or add dashboard widgets based on tags you have defined.

`token` and `measurement` are reserved tag keys.

Sematext Agents collects tags from following sources:

### Sematext App Agent Integration YAMLs

These tags are extracted from metric data sources & values. The tags can be configured in `tag` section App Agent integration YAMLs.  The maximum allowed length for the key is 200 characters. The key should match this regex: <nobr>`[a-zA-Z0-9_\-.:(\\ |,=)]+`</nobr>. Examples of these tags are hostname, port, webapp name, jvm name, disk, elasticsearch index, etc. You don't need to adjust these tags for built-in
integrations.

For example, refer to [Tomcat web module YAML definition](https://github.com/sematext/sematext-agent-integrations/blob/master/tomcat/jmx-web-module.yml) where the hostname and webapp name are extracted as tags from JMX ObjectName.

Some of the tags derived from a given metrics source can be omitted. In such cases, the data point will be aggregated on the omitted tag. By default, the aggregate function is used based on metric type (AVG for gauges and SUM for counters). This could be overridden using `agentAggregation` property of metric. Refer to [Elasticsearch index YAML definition](https://github.com/sematext/sematext-agent-integrations/blob/master/elasticsearch/json-index-0.yml) where `shard` tag is omitted.

### Environment

Sematext Monitoring agent automatically collects tags from the environment the agent is running. Following tags are collected:

#### Cloud metadata

The cloud metadata from AWS, Azure and GCE instances is collected as tags. The agent collects below metadata as tags:

| Name  | Tag Name  | Supported Cloud Providers  |
|:--|:--|:--|
|  Provider Type |  cloud.type |  AWS, GCE, Azure |
|  Instance Identifier |  instance.id |  AWS, GCE, Azure |
|  Instance Name |  instance.name |  Azure, GCE |
|  Instance Type |  instance.type |  AWS, GCE, Azure |
|  Region |  region |  AWS, Azure |
|  Availability Zone |  zone |  AWS, GCE |
|  Project Identifier |  project |  GCE |
|  User defined tags |  - |  AWS, GCE, Azure |

To collect user defined tags you need to define the IAM roles listed below:

1. AWS - EC2 Instances should be created with AWS IAM Role that has policy `AmazonEC2ReadOnlyAccess`.
    See [AWS/EC2 User Guide](http://docs.aws.amazon.com/AWSEC2/latest/UserGuide/iam-roles-for-amazon-ec2.html) for more info.
2. Azure - To fetch resource tags for Virtual Machines, you need to grant `Reader` role to its Resource Group in Azure Resource Manager
    See [Access Azure Resource Manager API](https://docs.microsoft.com/en-gb/azure/active-directory/managed-identities-azure-resources/tutorial-linux-vm-access-arm) for more info.
3. GCE - In GCE User defined tags are called Labels. To read labels, the instance needs `roles/compute.viewer` IAM role.
    See [Granting Roles to Service Accounts](https://cloud.google.com/iam/docs/granting-roles-to-service-accounts#granting_access_to_a_service_account_for_a_resource) for more info.

Cloud tags collection is enabled by default.  To disable Cloud tags
collection set `cloud.metadata-enabled` to `false` in `/opt/spm/properties/st-agent.yml` and
restart spm-monitor using `sudo service spm-monitor restart`.

#### Machine

Following tags are collected from the host the agent is running.

| Name  | Tag Name  | Description |
|:--|:--|:--|
| SystemUUID | os.uuid | Unique ID based on SMBIOS specification |
| OS Distribution Name | os.distro.name | Distribution name of the OS. e.g. `ubuntu` |
| OS Distribution Version | os.distro.version | Version of the OS. e.g. `16.04` |
| Kernel Version | os.kernel | Version of the Kernel. e.g. `4.4.0-130-generic` |
| JVM Version | jvm.version | Version of JVM, if available in `PATH` |
| Virtualization | virtualization | Virtualization Type. Possible values are `BareMetal`, `VM`, `Container` |

### Agent configuration

The Sematext Agents supports configuration of custom tags. They can be specified in the agent's configuration files. For example, you can configure tags like `env:prod` (on all production servers) and `env:dev` (on all dev servers) and filter the data in UI based on these tags. The maximum allowed length for both key and value is 1024 characters. These tags are optional and can be changed anytime.

Below are the steps to configure custom tags in Sematext Agents.

#### Sematext App Agent

To add custom tags for each app edit the below property in the monitor configuration file: 
`/opt/spm/spm-monitor/conf/spm-monitor-config-${token}-${jvm}.properties`:

``` properties
# add tags if you want to use them, example: SPM_MONITOR_TAGS="env:foo, role:bar"
SPM_MONITOR_TAGS="env:dev, project:projectName, role:webfrontend"
```

The key and value of custom tags should match this regex: `[a-zA-Z0-9_\-=\+\.]*`.

#### Sematext Docker Agent

Tags are provided in the environment variable SPM\_MONITOR\_TAGS for example:

``` bash
docker run -e SPM_MONITOR_TAGS="env:dev, project:projectName, role:webfrontend" ... sematext/sematext-agent-docker
```

#### Sematext Node Agent

Tags could be configured in the config file `./.spmagentrc` or
`/etc/spmagentrc`

``` properties
SPM_MONITOR_TAGS = env:dev, project:projectName, role:webfrontend
```

or in the environment variable SPM\_MONITOR\_TAGS, e.g. on Linux:

``` properties
export SPM_MONITOR_TAGS="env:dev, project:projectName, role:webfrontend"
```
