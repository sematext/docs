title: Tag Support
description: Asssign metadata to host/server/container with custom tags and create more useful dashboards and alerts for your AWS, Docker, Node.js and other applications, hosts and containers

## What's a Tag?

To help you manage your metrics, hosts, and containers, and to help you
create more useful dashboards, you can assign metadata to each
host/server/container in the form of *tags*.

Tags let you to organize your SPM hosts/servers/containers in different
ways – for example by role, owner, or environment. Each tag consists of
a key and a value, separated by the ':' character. 

We recommend that you devise a set of tag keys that meet your needs for each host and to keep the tag set small and clean. Using a consistent and not overly broad set of tag keys makes it easier for you make the most of SPM and avoid chaos. Tags will help you create Alerts for hosts/servers/containers under certain tags or add dashboard widgets based on tags you have defined.

SPM supports 2 types of tags:

1. **Physical tags** -  Physical Tag is an attribute of a data point one can use for filtering and grouping. They are sent with every data point. They can either automatically collected by agent or can be configured. e.g hostname, jvm name etc.
2. **Logical tags** - Logical tags are stored just once and updated periodically and are not sent as part of every data point. They are associated with a set of physical tags. Once can filter/group data points using logical tags without sending them with every data point. e.g. cloud tags

## Cloud Tags

SPM client has the ability to collect metadata as tags from AWS, Azure and GCE instances. Cloud tags are sent as logical tags. 
SPM collects below metadata:

1. InstanceId
2. InstanceName (Azure and GCE)
3. InstanceType
4. Region (AWS & Azure)
5. AvailabilityZone (AWS & GCE)
6. ProjectID (GCE)
5. User defined tags

To collect user defined tags you need below IAM roles:

1. AWS - EC2 Instances should be created with AWS IAM Role that has policy `AmazonEC2ReadOnlyAccess`.
    See [AWS/EC2 User Guide](http://docs.aws.amazon.com/AWSEC2/latest/UserGuide/iam-roles-for-amazon-ec2.html) for more info.
2. Azure - To fetch resource tags for Virtual Machines, you need to grant `Reader` role to its Resource Group in Azure Resource Manager
    See [Access Azure Resource Manager API](https://docs.microsoft.com/en-gb/azure/active-directory/managed-identities-azure-resources/tutorial-linux-vm-access-arm) for more info.
3. GCE - In GCE User defined tags are called as Labels. To read labels, the instance needs `roles/compute.viewer` IAM role.
    See [Granting Roles to Service Accounts](https://cloud.google.com/iam/docs/granting-roles-to-service-accounts#granting_access_to_a_service_account_for_a_resource) for more info.

Cloud tag collection is enabled by default.  To disable Cloud tags
collection adjust set `cloud.metadata-enabled` to `false` in `/opt/spm/properties/sta.yml`.

## Custom Tags

Sematext-agent-java supports configuration of custom physical tags. To add custom tags for each app edit the below
property in the monitor configuration file: /opt/spm/spm-monitor/conf/spm-monitor-config-${token}-${jvm}.properties:

``` properties
# add tags if you want to use them, example: SPM_MONITOR_TAGS="env:foo, role:bar"
SPM_MONITOR_TAGS="appType:jvm"
```

To exclude tags and thus not send them to SPM just edit:

``` properties
# uncomment and add tags which should be excluded
# SPM_SUPPRESS_TAGS=project:baz, node:qux
```

## Adding Tags in SPM for Docker

Tags are provided by the environment variable SPM\_MONITOR\_TAGS for
example:

``` bash
docker run -e SPM_MONITOR_TAGS="env:dev, project:projectName, role:webfrontend" ... sematext/sematext-agent-docker
```

## Adding Tags in SPM for Node.js

Tags could be configured in the config file "./.spmagentrc" or
/etc/spmagentrc

``` properties
SPM_MONITOR_TAGS = env:dev, project:projectName, role:webfrontend
```

or by the environment variable SPM\_MONITOR\_TAGS, e.g. on Linux:

``` properties
export SPM_MONITOR_TAGS="env:dev, project:projectName, role:webfrontend"
```

