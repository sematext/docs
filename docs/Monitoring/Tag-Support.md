### What's a Tag?

To help you manage your metrics, hosts, and containers, and to help you
create more useful dashboards, you can assign metadata to each
host/server/container in the form of *tags*.

Tags let you to organize your SPM hosts/servers/containers in different
ways – for example by role, owner, or environment. Each tag consists of
a key and a value, separated by the ':' character. We recommend that you
devise a set of tag keys that meet your needs for each host and to keep
the tag set small and clean. Using a consistent and not overly broad set
of tag keys makes it easier for you make the most of SPM and avoid
chaos. Tags will help you create Alerts for hosts/servers/containers
under certain tags or add dashboard widgets based on tags you have
defined.

### **AWS Tags Support**

SPM client has the ability to:

1.  Collect AWS/EC2 tags and send them to SPM. EC2 Instances should be
    created with AWS IAM Role that has policy 'AmazonEC2ReadOnlyAccess'.
     See <http://docs.aws.amazon.com/AWSEC2/latest/UserGuide/iam-roles-for-amazon-ec2.html> 
2.  Send EC2 Instance Type and Availability Zone as tags.

#### **Excluding Specific Tags**

To exclude tags and thus not send them to SPM just edit the monitor
configuration file -
/opt/spm/spm-monitor/conf/spm-monitor-config-${token}-${jvm}.properties:

``` properties
# uncomment and add tags which should be excluded
# SPM_SUPPRESS_TAGS=project:baz, node:qux
```

 

AWS tag collection is enabled by default.  To disable AWS tags
collection adjust the following in the
/opt/spm/spm-monitor/conf/spm-monitor-config-${token}-${jvm}.properties
file:

``` properties
# use true|false if you want/don't want to send AWS tags to SPM
COLLECT_AWS_TAGS=true
```

### Adding Tags

To add tags edit the monitor configuration file -
/opt/spm/spm-monitor/conf/spm-monitor-config-${token}-${jvm}.properties:

``` properties
# uncomment and specify tags you want to send to SPM
# SPM_MONITOR_TAGS="env:local, project:projectName, role:slave"
```

### Adding Tags in SPM for Docker

Tags are provided by the environment variable SPM\_MONITOR\_TAGS for
example:

``` bash
docker run -e SPM_MONITOR_TAGS="env:dev, project:projectName, role:webfrontend" ... sematext/sematext-agent-docker
```

### Adding Tags in SPM for Node.js

Tags could be configured in the config file "./.spmagentrc" or
/etc/spmagentrc

``` properties
SPM_MONITOR_TAGS = env:dev, project:projectName, role:webfrontend
```

or by the environment variable SPM\_MONITOR\_TAGS, e.g. on Linux:

``` properties
export SPM_MONITOR_TAGS="env:dev, project:projectName, role:webfrontend"
```

