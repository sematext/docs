title: Monitoring Tags Support
description: Assign metadata to host/server/container with custom tags and create more useful dashboards and alerts for your AWS, Docker, Node.js and other applications, hosts and containers

## What's a Tag?

To help you manage your metrics, hosts, and containers, and to help you
create more useful dashboards, you can assign metadata to each
host/server/container in the form of *tags*.

Tags let you to organize your hosts/servers/containers in different
ways – for example by role, owner, or environment. Each tag consists of
a key and a value, separated by the ':' character. Both key & value are
case-sensitive.

We recommend that you devise a set of tag keys that meet your needs for each piece of your infrastructure and to keep the tag set small and clean. Using a consistent and not overly broad set of tag keys makes it easier for you make the most of Sematext and avoid chaos. Tags will help you create Alerts for hosts/servers/containers under certain tags or add dashboard widgets based on tags you have defined.

Sematext supports 2 types of tags:

1. **Physical tags** - Physical tag is an attribute of a data point one can use for filtering and grouping. They are sent with every data point. They are either automatically collected by agent or can be configured. e.g., hostname, jvm name, disk, elasticsearch index, tomcat webapp, port, etc. The maximum allowed length for key is 200 characters. The key should match this regex: `[a-zA-Z0-9_\-.:(\\ |,=)]+`. Physical tags are extracted from metric data sources and can be configured in metric definitions YAML file. 
    * For example, refer to [Tomcat web module YAML definition](https://github.com/sematext/sematext-agent-integrations/blob/master/tomcat/jmx-web-module.yml) where the hostname and webapp name are extracted as physical tags from JMX ObjectName.
    * Physical tags derived from metrics source can be omitted. In such cases, the data point will be aggregated on the omitted tag. By default, the aggregate function is used based on metric type (AVG for gauges and SUM for counters). This could be overridden using `agentAggregation` property of metric. Refer to [Elasticsearch index YAML definition](https://github.com/sematext/sematext-agent-integrations/blob/master/elasticsearch/json-index-0.yml) where `shard` tag is omitted.

2. **Logical tags** - Logical tags are stored just once and updated periodically and are not sent as part of every data point. They are associated with a set of physical tags. One can filter/group data points using logical tags without sending them with every data point. Logical tags are either extracted automatically like cloud tags or user can specify Custom Tags. 
    * For example, you can configure user-defined tags like `env:prod` (on all production servers) and `env:test` (on all test servers) in EC2 and filter the data in UI based on these tags. The maximum allowed length for both key and value is 1024 characters.

`token` and `measurement` are reserved tag keys. Do not use them in user-defined tags.

## Cloud Tags

The Sematext Monitoring Agent has the ability to collect metadata as tags from AWS, Azure and GCE instances. Cloud tags are of type logical tags.
BY default, the agent collects below metadata:

| Name  | Tag Name  | Supported Cloud Providers  |
|:-:|:-:|---|
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

## Custom Tags

The App Agent supports configuration of custom logical tags. To add custom tags for each app edit the below
property in the monitor configuration file: /opt/spm/spm-monitor/conf/spm-monitor-config-${token}-${jvm}.properties:

``` properties
# add tags if you want to use them, example: SPM_MONITOR_TAGS="env:foo, role:bar"
SPM_MONITOR_TAGS="appType:jvm"
```

The key and value of custom tags should match this regex: `[a-zA-Z0-9_\-=\+\.]*`.

## Adding Tags in Sematext for Monitoring Docker

Tags are provided in the environment variable SPM\_MONITOR\_TAGS for example:

``` bash
docker run -e SPM_MONITOR_TAGS="env:dev, project:projectName, role:webfrontend" ... sematext/sematext-agent-docker
```

## Adding Tags in Sematext for Monitoring Node.js

Tags could be configured in the config file `./.spmagentrc` or
`/etc/spmagentrc`

``` properties
SPM_MONITOR_TAGS = env:dev, project:projectName, role:webfrontend
```

or in the environment variable SPM\_MONITOR\_TAGS, e.g. on Linux:

``` properties
export SPM_MONITOR_TAGS="env:dev, project:projectName, role:webfrontend"
```
