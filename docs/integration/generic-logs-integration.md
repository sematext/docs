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

If you're an EC2 user, you can log Sematext  from your instances by
setting up a <a class="" href="https://apps.sematext.com/ui/logs#">log
shipper</a> like you would from any other physical or virtual machine.

** AWS S3 (CloudTrail, Flow logs, ELB access logs, etc.) **

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