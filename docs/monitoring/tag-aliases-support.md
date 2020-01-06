title: Tag Aliases
description: Tag aliases are name-value pairs used to identify a group of tag values i.e. alias for a group of tags. For example, user can create a tag alias `env:prod` which identifies a set of hosts. 

## What are Tag Aliases?

Tag aliases are name-value pairs used to identify a group of tag values.  In other words, a tag alias is an alias for a group of tags. For example, to identify the set of hosts running in a production environment you might define `env:prod` tag alias in the agents running on all production machines. The Agent will map the configured tag alias to `os.host` tag.  Selecting the `env:prod` filter in the UI will then filter data from all hosts in the production environment. Custom tag aliases can be configured in the Agent and some are automatically sent by agents. All tag aliases are sent periodically by Agent and are purged from Sematext Cloud when they stop being sent.

## Automatic Tag Aliases from Agent

The Infra Agent automatically collects the following tag aliases and sends them periodically to Sematext Cloud. It is not recommended to use these names for your own, custom configured tag aliases.

### Cloud Metadata

The cloud metadata from AWS, Azure and GCE instances are collected as tag aliases. These tag aliases are mapped to `os.host` tag.

| Name  | Tag Name  | Supported Cloud Providers  |
|:--|:--|:--|
|  Provider Type |  cloud.type |  AWS, GCE, Azure |
|  Instance Identifier |  cloud.instance.id |  AWS, GCE, Azure |
|  Instance Name |  cloud.instance.name |  Azure, GCE |
|  Instance Type |  cloud.instance.type |  AWS, GCE, Azure |
|  Region |  cloud.region |  AWS, Azure |
|  Availability Zone |  cloud.zone |  AWS, GCE |
|  Project Identifier |  cloud.project |  GCE |
|  User-defined tags |  - |  AWS, GCE, Azure |

To collect user-defined cloud tags from AWS, Azure or GCE environment you need to define the IAM roles listed below:

1. AWS - EC2 Instances should be created with AWS IAM Role that has policy `AmazonEC2ReadOnlyAccess`.
    See [AWS/EC2 User Guide](http://docs.aws.amazon.com/AWSEC2/latest/UserGuide/iam-roles-for-amazon-ec2.html) for more info.
2. Azure - To fetch resource tags for Virtual Machines, you need to grant `Reader` role to its Resource Group in Azure Resource Manager.
    See [Access Azure Resource Manager API](https://docs.microsoft.com/en-gb/azure/active-directory/managed-identities-azure-resources/tutorial-linux-vm-access-arm) for more info.
3. GCE - In GCE user-defined tags are called labels. To read labels, the instance needs `roles/compute.viewer` IAM role.
    See [Granting Roles to Service Accounts](https://cloud.google.com/iam/docs/granting-roles-to-service-accounts#granting_access_to_a_service_account_for_a_resource) for more info.

Cloud tags collection is enabled by default.  To disable Cloud tags
collection set `cloud.metadata-enabled` to `false` in `/opt/spm/properties/st-agent.yml` and
restart spm-monitor using `sudo service spm-monitor restart`.

### Machine

Following tag aliases are collected from the host the agent is running on. They are mapped to the `os.host` tag:

| Name  | Tag Name  | Description |
|:--|:--|:--|
| SystemUUID | os.uuid | Unique ID based on SMBIOS specification |
| OS Distribution Name | os.distro.name | Distribution name of the OS. e.g. `ubuntu` |
| OS Distribution Version | os.distro.version | Version of the OS. e.g. `16.04` |
| Kernel Version | os.kernel | Version of the Kernel. e.g. `4.4.0-130-generic` |
| JVM Version | jvm.version | Version of JVM, if available in `PATH` |
| Virtualization | virtualization | Virtualization Type. Possible values are `BareMetal`, `VM`, `Container` |
| Container Labels | - | All user-defined container labels. These tag aliases are mapped to `os.host` and `container.id` |

## Configured Tag Aliases in Agent

The Sematext Agents support configuring custom tag aliases. They can be specified in the Agent's configuration files. For example, tag aliases like `env:prod` can be configured on all production servers and `env:dev` on all development servers. The data can then be filtered in the UI using these tags. The maximum allowed length for both name and value is 1024 characters. They are mapped to `os.host` tag by the Agent. Configured tag aliases are optional and can be changed at any time.  The name and value of custom tags should match this regex: `[a-zA-Z0-9_\-=\+\.]*`.

Below are the steps to configure custom tags in Sematext Agents.

### Sematext Infra Agent

To add tag aliases in Infra Agent, edit the property below in the Infra Agent configuration file:
`/opt/spm/properties/st-agent.yml` 

```yaml
# Tag Alias configuration, add tag aliases if you want to use them: "env:foo, role:bar"
tag-aliases: "env:dev, project:projectName, role:webfrontend"
```

### Sematext App Agent

To configure tag aliases for an individual App, edit the property below in the monitor configuration file: 
`/opt/spm/spm-monitor/conf/spm-monitor-config-${token}-${jvm}.properties`:

``` properties
# add tag aliases if you want to use them, example: SPM_MONITOR_TAGS="env:foo, role:bar"
SPM_MONITOR_TAGS="env:dev, project:projectName, role:webfrontend"
```

### Sematext Docker Agent

Tags are provided in the environment variable SPM\_MONITOR\_TAGS for example:

``` bash
docker run -e SPM_MONITOR_TAGS="env:dev, project:projectName, role:webfrontend" ... sematext/sematext-agent-docker
```

### Sematext Node Agent

Tags could be configured in the config file `./.spmagentrc` or
`/etc/spmagentrc`

``` properties
SPM_MONITOR_TAGS = env:dev, project:projectName, role:webfrontend
```

or in the environment variable SPM\_MONITOR\_TAGS, e.g. on Linux:

``` properties
export SPM_MONITOR_TAGS="env:dev, project:projectName, role:webfrontend"
```
