title: Generic Logs Integration
description: Sematext Logs supports dozens of different integrations.

Stored data is received through the Elasticsearch API and also through a variety of Syslog protocols.

The Elasticsearch API lets you:

- send log events directly from your application, using any Elasticsearch library
- send log events using a "log shipper" application such as Logstash, rsyslog, Apache Flume, Fluentd, or anything that can output to Elasticsearch
- search for logs from your own application, or by configuring/adapting existing Elasticsearch UIs, such as Kibana
- optionally define custom mappings for your log types, so you can tweak the way your logs are indexed

### Syslog Protocols 

We accept <a href="https://apps.sematext.com/ui/howto/Logsene/overview?activeSection=syslogprotocols" target="_blank" rel="noopener">Syslog</a> messages using any log shipper and any Syslog library, as long as they either contain a valid token or the source IP is authorized.

### Journald 

We accept <a href="../journald-integration" target="_blank" rel="noopener">Journald</a> logs using the `systemd-journal-remote` package. Everything you need to do is point the `systemd-journal-remote` to send Journald logs to Sematext Logs.

### Log Shippers 

<ul>
 	<li><a  href="https://apps.sematext.com/ui/howto/Logsene/overview?activeSection=logagent-log-shippers">Logagent</a> - cross platform, Smart and lightweight Log Parser and Log Shipper written in Node.js</li>
 	<li><a href="https://apps.sematext.com/ui/howto/Logsene/overview?activeSection=rsyslog">rsyslog</a> - easy to get started, very fast and very light on resources, docs are harder to navigate for beginners though.</li>
 	<li><a href="https://apps.sematext.com/ui/howto/Logsene/overview?activeSection=logstash">Logstash</a> - cross platform, very simple to set up, well documented, but a little heavy on resource usage</li>
 	<li><a  href="https://apps.sematext.com/ui/howto/Logsene/overview?activeSection=filebeat">Filebeat</a> - cross platform, much lighter on resource usage, requires a Logstash instance to aggregate logs</li>
 	<li><a href="https://apps.sematext.com/ui/howto/Logsene/overview?activeSection=syslog">syslog-ng</a> - very fast and very light on resources, good docs, available as both free and paid version</li>
 	<li><a href="https://apps.sematext.com/ui/howto/Logsene/overview?activeSection=syslogd">syslogd</a> - quite old, light on resources, not very feature rich</li>
 	<li><a href="https://apps.sematext.com/ui/howto/Logsene/overview?activeSection=fluentd">Fluentd</a> - cross platform, easy to get started, horizontally scalable, available as both free and paid version</li>
 	<li><a href="https://apps.sematext.com/ui/howto/Logsene/overview?activeSection=fluentbit">Fluent Bit</a> - FluentBit is an open source specialized data collector. It provides built-in metrics and general purpose output interfaces for centralized collectors such as Fluentd.</li>
 	<li><a href="https://apps.sematext.com/ui/howto/Logsene/overview?activeSection=nxlog">NXLog</a> - cross platform but mostly used on Windows, easy to get started, available as both free and paid version</li>
</ul>

### Programming Languages

<ul>
 	<li><a href="https://apps.sematext.com/ui/howto/Logsene/overview?activeSection=dotnet">.Net</a></li>
 	<li><a href="https://apps.sematext.com/ui/howto/Logsene/overview?activeSection=golang">GoLang</a></li>
 	<li><a href="https://apps.sematext.com/ui/howto/Logsene/overview?activeSection=java">Java</a></li>
 	<li><a href="https://apps.sematext.com/ui/howto/Logsene/overview?activeSection=nodejs">Node.js</a></li>
 	<li><a href="https://apps.sematext.com/ui/howto/Logsene/overview?activeSection=javascript">Javascript</a></li>
 	<li><a href="https://apps.sematext.com/ui/howto/Logsene/overview?activeSection=perl">Perl</a></li>
 	<li><a href="https://apps.sematext.com/ui/howto/Logsene/overview?activeSection=php">PHP</a></li>
 	<li><a href="https://apps.sematext.com/ui/howto/Logsene/overview?activeSection=python">Python</a></li>
 	<li><a href="https://apps.sematext.com/ui/howto/Logsene/overview?activeSection=ruby">Ruby</a></li>
</ul>

### Operating Systems 

<ul>
 	<li><a href="https://apps.sematext.com/ui/howto/Logsene/overview?activeSection=windows">Windows</a></li>
 	<li><a href="https://apps.sematext.com/ui/howto/Logsene/overview?activeSection=linux">Linux</a></li>
 	<li><a href="https://apps.sematext.com/ui/howto/Logsene/overview?activeSection=osx">Mac OS</a></li>
</ul>

### Containers 

<ul>
 	<li><a href="https://apps.sematext.com/ui/howto/Logsene/overview?activeSection=docker">Docker</a></li>
 	<li><a href="https://apps.sematext.com/ui/howto/Logsene/overview?activeSection=kubernetes">Kubernetes</a></li>
 	<li><a href="../kubernetes-audit-integration">Kubernetes Audit</a></li>
 	<li><a href="https://apps.sematext.com/ui/howto/Logsene/overview?activeSection=kubernetes-containerd">Kubernetes Containerd</a></li>
 	<li><a href="https://apps.sematext.com/ui/howto/Logsene/overview?activeSection=kubernetes-crio">Kubernetes CRI-O</a></li>
 	<li><a href="https://apps.sematext.com/ui/howto/Logsene/overview?activeSection=mesosmarathon">Mesos Marathon</a></li>
</ul>

### Cloud IaaS / PaaS

<ul>
 	<li><a href="https://apps.sematext.com/ui/howto/Logsene/overview?activeSection=awss3">AWS S3</a></li>
 	<li><a href="https://apps.sematext.com/ui/howto/Logsene/overview?activeSection=awscloudtrail">AWS CloudTrail</a></li>
 	<li><a href="https://apps.sematext.com/ui/howto/Logsene/overview?activeSection=awscloudwatch">AWS CloudWatch</a></li>
 	<li><a href="https://apps.sematext.com/ui/howto/Logsene/overview?activeSection=awsvpsflow">AWS VPC Flow Logs</a></li>
 	<li><a href="https://apps.sematext.com/ui/howto/Logsene/overview?activeSection=heroku">Heroku</a></li>
 	<li><a href="https://apps.sematext.com/ui/howto/Logsene/overview?activeSection=cloudfoundry">Cloud Foundry</a></li>
 	<li><a href="https://apps.sematext.com/ui/howto/Logsene/overview?activeSection=gae">Google App Engine</a></li>
 	<li><a href="../github-webhook-events-integration">GitHub Webhook Events</a></li>
 	<li><a href="../vercel-logs-integration">Vercel</a></li>
</ul>

### iOS 

<div>For iOS apps use <a href="https://github.com/sematext/sematext-logsene-ios" target="_blank" rel="noopener">Sematext Logs for iOS</a> library.</div>

### Android 

<div>For Android apps use<a href="https://github.com/sematext/sematext-logsene-android" target="_blank" rel="noopener"> Sematext Logs for Android</a> library.</div>

### AWS EC2 

If you're an EC2 user, you can log Sematext from your instances by
setting up a <a class="" href="https://apps.sematext.com/ui/logs#">log
shipper</a> like you would from any other physical or virtual machine.

### AWS ECS on AWS Fargate With FireLens 

There are two main ways you can forward logs from containers running in Fargate to Sematext. They rely on two different log drivers.

- [AWS Firelens](https://docs.aws.amazon.com/AmazonECS/latest/developerguide/using_firelens.html) - `awsfirelens`
- [AWS Logs](https://docs.aws.amazon.com/AmazonECS/latest/developerguide/using_awslogs.html) - `awslogs`

We suggest you use AWS Firelens to avoid additional CloudWatch costs.

With Firelens you can route logs to another AWS service, like Firehose, or use Fluentd or Fluent Bit. AWS provides the image for Fluentd / Fluent Bit. You need to configure the output module.

#### 1. Enable Firelens
In the ECS Task Definition, check a checkbox called Enable FireLens integration. Choose Fluent Bit and AWS will populate the image name for you.

![aws-ecs-firelens-1](../images/integrations/aws-ecs-firelens-1.png)

AWS will add an additional container called `log_router` to the list of containers in your Task Definition.

#### 2. Configure the Firelens Log Driver
Next, in the same Task Definition but for your own container (not the `log_router`), you configure the `logConfiguration` like this:

```json
"logConfiguration": {
  "logDriver": "awsfirelens",
  "options": {
    "Type": "ecs",
    "Port": "443",
    "Host": "logsene-receiver.sematext.com",
    "Index": "<LOGS_TOKEN>",
    "TLS": "On",
    "Match": "*",
    "Name": "es"
  }
}
```

> Note: If you are using the EU region of Sematext you should set the Host like this: `"Host": "logsene-receiver.eu.sematext.com"`

This will forward all container logs to Sematext.

### AWS ECS on AWS Fargate With AWS Logs
This log driver will forward all logs to CloudWatch. From there you can configure a Lambda function to collect the logs and forward them to Sematext. 

#### 1. Enable forwarding to CloudWatch
Your ECS task configuration JSON will contain this snippet:
    
```json
"logConfiguration": {
  "logDriver": "awslogs",
  "options": {
    "awslogs-group": "/ecs/ecs-service-name",
    "awslogs-region": "eu-central-1",
    "awslogs-stream-prefix": "ecs"
  }
}
```

#### 2. Set up a Lambda function pipeline to collect and forward CloudWatch logs to Sematext
Once forwarding to CloudWatch is configured, you need to set up a Lambda function to collect these logs from CloudWatch and send them to Sematext. You do this by [following this guide](https://sematext.com/blog/centralized-aws-lambda-logs-kinesis-serverless/). Or, if you already know how to, [here is the code for the Lambda pipeline so you can deploy](https://github.com/sematext/cloudwatch-sematext-aws-lambda-log-shipper) right away. 

All you need to do is edit the secrets to add your Sematext LOGS_TOKEN and LOGS_RECEIVER_URL. Also, don't forget to [edit the PREFIX](https://github.com/sematext/cloudwatch-sematext-aws-lambda-log-shipper/blob/39c781df576e0decb9c4bfa4e615d76805d7b69f/sample.secrets.json#L9) to match your ECS containers. E.g:

```
"PREFIX": "/ecs/ecs-service-name"
```


### AWS ECS on AWS EC2
When using EC2 container instances you can configure [Logagent](https://hub.docker.com/_/logagent) to forward container logs.

#### 1. Set env vars
In the ECS Task Definition you need to make sure you have these two environment variables configured:

- `LOGS_TOKEN` - set to your token
- `REGION` - either US or EU based on the region you are using

In JSON it looks like this:

```json
{
  "requiresCompatibilities": [
    "EC2"
  ],
  ...
  "containerDefinitions": [
    {
      "name": "st-logagent",
      "image": "sematext/logagent:latest",
      ...
      "environment": [
        {
            "name": "LOGS_TOKEN",
            "value": "9c63d337-xxxx-xxxx-xxxx-abcc87342d47"
        },
        {
            "name": "REGION",
            "value": "US"
        }
      ],
      ...
    }
  ]
  ...
}
```

#### 2. Set volumes
To enable log collection you must bind the Docker Socket volume from the EC2 container instance to the Logagent container.

The `/var/run/docker.sock` path on the host must be bound to the `/var/run/docker.sock` path in the container.

In JSON it looks like this:

```json
{
  "requiresCompatibilities": [
    "EC2"
  ],
  ...
  "containerDefinitions": [
    {
      "name": "st-logagent",
      "image": "sematext/logagent:latest",
      ...
      "environment": [
        {
          "name": "LOGS_TOKEN",
          "value": "9c63d337-xxxx-xxxx-xxxx-abcc87342d47"
        },
        {
          "name": "REGION",
          "value": "US"
        }
      ],
      "mountPoints": [
        {
          "sourceVolume": "docker-socket",
          "containerPath": "/var/run/docker.sock",
          "readOnly": ""
        }
      ]
      ...
    }
  ],
  "volumes": [
    {
      "host": {
        "sourcePath": "/var/run/docker.sock"
      },
      "name": "docker-socket"
    }
  ]
  ...
}
```

#### 3. Run the Logagent Task Definition as a Daemon Service type
When creating the Logagent service make sure to set the `Launch type` as **EC2** and `Service type` as **DAEMON**.


### AWS S3 (CloudTrail, Flow logs, ELB access logs, etc.) **

If you have logs stored in S3, you can ship them to Sematext <a
href="https://github.com/sematext/logsene-aws-lambda-s3"
target="_blank" rel="noopener">via this AWS Lambda function</a>. This
method also works for when you periodically upload logs to S3 buckets,
like Amazon CloudTrail does.

### AWS CloudWatch Logs 

If you want to ship CloudWatch logs, you can use <a
href="https://github.com/sematext/logsene-aws-lambda-cloudwatch"
target="_blank" rel="noopener">another AWS Lambda function</a>. If
logs are VPC flowlogs, the Lambda function will also parse them and
add geoIP information on the source IP addresses.

### Centralized Logging for AWS Lambda

If you want to automatically subscribe to AWS Lambda log streams you can use
this <a href="https://github.com/sematext/cloudwatch-sematext-aws-lambda-log-shipper" target="_blank" rel="noopener">CloudFormation stack</a>.

It'll let you run a single command and set up log group subscriptions,
funnel all CloudWatch logs to Kinesis, and use a dedicated Lambda function
to ship these logs to Sematext.

Read the [full tutorial on our blog](https://sematext.com/blog/centralized-aws-lambda-logs-kinesis-serverless/)!