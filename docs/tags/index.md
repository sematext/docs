title: Tags 
description: A Tag is an attribute of a data point (or metric) that could be used for grouping and filtering.

Tags are sent by Sematext Agents as part of every data point and they are shown in UI as filters. 

For example, as part of Docker container metrics, the agent sends hostname on which the container is running, container identifier, container name, container image as tags which appear as filters in UI. User can then group or filter the container metrics using these tags.

At the moment all Common [Special Tags](../special-tags) apply to Monitoring Apps.

If you choose to use 3rd party Agents, then you need to ensure the tag names match those from our Common Special Tags.

## Automatic Tags collected from Agents

The Sematext Agent automatically collects the following tags and sends them periodically to Sematext Cloud. It is not recommended to use these names for your own, custom configured tags.

### Cloud Metadata

The cloud metadata from AWS, Azure and GCE instances are collected as tags. They're mapped to the `os.host` tag.

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

### Machine Metadata

Following tags are collected from the host the agent is running on. They're mapped to the `os.host` tag.

| Name  | Tag Name  | Description |
|:--|:--|:--|
| SystemUUID | os.uuid | Unique ID based on SMBIOS specification |
| OS Distribution Name | os.distro.name | Distribution name of the OS. e.g. `ubuntu` |
| OS Distribution Version | os.distro.version | Version of the OS. e.g. `16.04` |
| Kernel Version | os.kernel | Version of the Kernel. e.g. `4.4.0-130-generic` |
| JVM Version | jvm.version | Version of JVM, if available in `PATH` |
| Virtualization | virtualization | Virtualization Type. Possible values are `BareMetal`, `VM`, `Container` |
| Container Labels | - | All user-defined container labels. These tag are mapped to `os.host` and `container.id` |
