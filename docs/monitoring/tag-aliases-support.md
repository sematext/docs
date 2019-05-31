title: Tag Aliases
description: Tag aliases are name-value pairs used to identify a group of tag values i.e. alias for a group of tags. For example, user can create a tag alias `env:prod` which identifies a set of hosts. 

## What are Tag Aliases?

Tag aliases are name-value pairs used to identify a group of tag values i.e. alias for a group of tags. For example, user can create a tag alias `env:prod` which identifies a set of hosts running in prod setup. So user can define this tag alias and map it set of `os.host` tag values. Tag aliases can be defined from UI, configured in agent or automatically sent by agents.

## Automatic Tags Aliases from agent

The Infra Agent automatically collects following tag aliases and sends them periodically to Sematext Cloud. These tag aliases are purged periodically. It is not recommended to use these names in configured/user-defined tag aliases.

### Cloud metadata

The cloud metadata from AWS, Azure and GCE instances is collected as tag aliases. These tag aliases are mapped to `os.host` tag.

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

To collect user-defined tags you need to define the IAM roles listed below:

1. AWS - EC2 Instances should be created with AWS IAM Role that has policy `AmazonEC2ReadOnlyAccess`.
    See [AWS/EC2 User Guide](http://docs.aws.amazon.com/AWSEC2/latest/UserGuide/iam-roles-for-amazon-ec2.html) for more info.
2. Azure - To fetch resource tags for Virtual Machines, you need to grant `Reader` role to its Resource Group in Azure Resource Manager
    See [Access Azure Resource Manager API](https://docs.microsoft.com/en-gb/azure/active-directory/managed-identities-azure-resources/tutorial-linux-vm-access-arm) for more info.
3. GCE - In GCE user-defined tags are called Labels. To read labels, the instance needs `roles/compute.viewer` IAM role.
    See [Granting Roles to Service Accounts](https://cloud.google.com/iam/docs/granting-roles-to-service-accounts#granting_access_to_a_service_account_for_a_resource) for more info.

Cloud tags collection is enabled by default.  To disable Cloud tags
collection set `cloud.metadata-enabled` to `false` in `/opt/spm/properties/st-agent.yml` and
restart spm-monitor using `sudo service spm-monitor restart`.

### Machine

Following tag aliases are collected from the host the agent is running. They are mapped to `os.host` tag:

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

The Sematext Agents supports configuration of custom tag aliases. They can be specified in the agent's configuration files. For example, you can configure tag aliases like `env:prod` (on all production servers) and `env:dev` (on all dev servers) and filter the data in UI based on these tags. The maximum allowed length for both name and value is 1024 characters. They are mapped to `os.host` tag. These tag aliases are optional and can be changed anytime.

Below are the steps to configure custom tags in Sematext Agents.

### Sematext Infra Agent

To add tag aliases for Infra Agent edit the below property in Infra Agent configuration file:
`/opt/spm/properties/st-agent.yml` 

```yaml
# Tag Alias configuration, add tag aliases if you want to use them: "env:foo, role:bar"
tag-aliases: "env:dev, project:projectName, role:webfrontend"
```

### Sematext App Agent

To configure tag alias for each app edit the below property in the monitor configuration file: 
`/opt/spm/spm-monitor/conf/spm-monitor-config-${token}-${jvm}.properties`:

``` properties
# add tag aliases if you want to use them, example: SPM_MONITOR_TAGS="env:foo, role:bar"
SPM_MONITOR_TAGS="env:dev, project:projectName, role:webfrontend"
```

The name and value of custom tags should match this regex: `[a-zA-Z0-9_\-=\+\.]*`.

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

## User-defined Tag Aliases from UI

User can define custom tags aliases for an App from UI. From UI, the user can define name-value pair for tag alias and map it to set of tags available for this App. Once created the user-defined tag aliases can be edited or deleted later. These are not purged periodically.