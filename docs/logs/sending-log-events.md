title: Sending Log Events to Sematext
description: Send new log events to Sematext using Sematext Agent, Sematext API -compatible with Elasticsearch and OpenSearch- or syslog, and log shippers such as  Logstash, Fluentd, rsyslog, syslog-ng, Fluentbit and more

## Logs Discovery

The simplest - and the recommended way - to ship logs to Sematext is via the [Discovery](/docs/logs/discovery/intro) screen after the [initial setup](/docs/logs/discovery/setup). Setting up log shipping from there will be the easiest and will yield the best results, resulting in a the most suitable type of Logs App being created with the most useful pre-built dasboards and the most useful alert rules.


Follow these step-by-step instructions for setting up the [Sematext Agent](/docs/agents/sematext-agent/) through the Logs App.

### Create Logs App

A Logs App is the space in Sematext that holds your logs.  You can have any number of Logs Apps in your account and each of them can have a different plan, retention, users who can access it, etc. 

#### Integration-specific Logs Apps

It is important to note that _most_ Logs Apps are "typed".  That is, most Logs Apps are built for a specific integration, for logs with some _specific_, known log format. For example, you can see an Nginx Logs App in a screenshot below. If you want to ship Nginx logs that is the Logs App you want to create.  Not only will that Logs App have a bunch of ready to use Nginx-specific reports and charts out of the box, but it will also come with a set of default alert rules that are applicable to monitoring Nginx logs.  Make use of this and save time by creating an appropriate Logs App.  You can find other integrations in [integrations docs](/docs/integration/).

![Nginx Logs App](/docs/images/logs/nginx-logpack.png)

If you select a specific integration, you will be asked to create an Infra App. The [Infra App](/docs/monitoring/infrastructure/) works with the Sematext Agent to automatically discover log sources on your host for the selected service. 

Next, choose the environment where you want to install the [Sematext Agent](/docs/agents/sematext-agent). 

![Logs App Environments](/docs/images/logs/environments.png)

Once the agent is installed, the log sources are discovered automatically, and logs from your selected service will start shipping to Sematext Cloud without any additional setup.

![Logs App Finish Setup](/docs/images/logs/finish-setup.png)

#### Generic Logs App

If you need to ship logs whose "type" you don't see among the list of offered Logs Apps types, create a `Generic Logs App`.  This type of Logs App has log search, alerting, and all other capabilities, but has _general reports_ that work for _all_ types of logs regardless of their format.  You can later create additional reports, charts, etc. to customize things to your liking.

From there you will be provided with 2 options to ship logs from. 

#### Use Sematext Agent to ship custom logs

Install the Sematext Agent, which can automatically discover log sources on your hosts. When you select this option, you will be asked to choose an Infra App. If you don’t have one, we will create it automatically for you. An [Infra App](/docs/monitoring/infrastructure/)  works with the [Sematext Agent](/docs/agents/sematext-agent) to discover available log sources on the host where the agent is installed.

After creating the Infra App, select the environment where you want to install the Sematext Agent. Once the agent is installed, you can choose which logs to ship from the list of discovered log sources. 

![Generic Logs Discovery](/docs/images/logs/generic-logs-discovery.png)

Click on the **Set Up** button next to the services from which you want to ship logs and enable automatic log shipping for the selected service.

![Generic Logs Discovery Setup](/docs/images/logs/generic-logs-discovery-setup.png)

> If you are shipping custom logs to Sematext Cloud, we recommend reviewing the [Logs Pipelines guide](/docs/logs/pipelines/) to structure, enrich, or transform your log documents.
                                
#### Use Custom Integrations

If you don’t see your environment in the Install Sematext Agent step, you can use your own log shipper, such as Logstash, Fluentd, Syslog, cloud libraries, or send log events directly from your application using any Elasticsearch or OpenSearch compatible library to set up log shipping manually. The Custom Integrations screen explains how to [manually send data to your new Logs App](/docs/logs/sending-log-events/#custom-integration-options)

### Shipping to the Same App from Additional Sources

If you want to ship logs from additional hosts and containers to the same Logs App, you can always navigate to the Ship Logs screen from the left Menu panel and repeat the steps to install the agent to another host.

![Logs App Ship Logs](/docs/images/logs/ship-logs.png)

Furthermore, at any time, you can navigate to the Discovery screen to view the log sources and services identified across your infrastructure, from all the containers and hosts where the [Sematext Agent](/docs/agents/sematext-agent/) is installed. From this screen, you have the option to configure automatic log shipping or metrics without the need for any additional installations.

![Sematext Discovery](/docs/images/logs/sematext-discovery.png)

## Custom Integration Options

Alternatively, you can explore various custom integration options for shipping log events to Sematext. These include support for [Sematext API](/docs/logs/index-events-via-sematext-api) which is compatible with Elasticsearch and OpenSearch, [syslog-ng](/docs/logs/syslog-ng), various programming languages, and popular log shippers such as [rsyslog](/docs/logs/rsyslog), Logstash, Fluentd, and many many more. You can discover all supported custom integrations by accessing any Logs App, clicking 'Ship Logs' on the left menu panel, and picking Custom Integrations option.  We recommend you use this only if, for some reason, setting up log shipping from Discovery screen in Sematext Cloud UI doesn't work and our support is unable to help you.

![Custom Integrations Selected](/docs/images/logs/custom-integrations-selected.png)

![Custom Integrations](/docs/images/logs/custom-integrations.png)

For further insights, refer to [Logging Libraries vs Log Shippers](https://sematext.com/blog/logging-libraries-vs-log-shippers/).

### Log Shippers 

<ul>
 	<li><a  href="https://apps.sematext.com/ui/howto/Logsene/overview?activeSection=logagent-log-shippers">Logagent</a> - cross platform, Smart and lightweight Log Parser and Log Shipper written in Node.js</li>
 	<li><a href="https://apps.sematext.com/ui/howto/Logsene/overview?activeSection=rsyslog">rsyslog</a> - easy to get started, very fast and very light on resources, docs are harder to navigate for beginners though.</li>
 	<li><a href="https://apps.sematext.com/ui/howto/Logsene/overview?activeSection=logstash">Logstash OSS</a> - cross platform, very simple to set up, well documented, but a little heavy on resource usage</li>
 	<li><a  href="https://apps.sematext.com/ui/howto/Logsene/overview?activeSection=filebeat">Filebeat OSS</a> - cross platform, much lighter on resource usage, requires a Logstash instance to aggregate logs</li>
 	<li><a href="https://apps.sematext.com/ui/howto/Logsene/overview?activeSection=syslog">syslog-ng</a> - very fast and very light on resources, good docs</li>
 	<li><a href="https://apps.sematext.com/ui/howto/Logsene/overview?activeSection=syslogd">syslogd</a> - quite old, light on resources, not very feature rich</li>
 	<li><a href="https://apps.sematext.com/ui/howto/Logsene/overview?activeSection=fluentd">Fluentd</a> - cross platform, easy to get started, horizontally scalable</li>
 	<li><a href="https://apps.sematext.com/ui/howto/Logsene/overview?activeSection=fluentbit">Fluent Bit</a> - FluentBit is an open source specialized data collector. It provides built-in metrics and general purpose output interfaces for centralized collectors such as Fluentd.</li>
 	<li><a href="https://apps.sematext.com/ui/howto/Logsene/overview?activeSection=nxlog">NXLog</a> - cross platform but mostly used on Windows, easy to get started</li>
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
 	<li><a href="https://sematext.com/docs/integration/kubernetes-audit-integration/">Kubernetes Audit</a></li>
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
 	<li><a href="https://sematext.com/docs/integration/github-webhook-events-integration/">GitHub Webhook Events</a></li>
 	<li><a href="https://sematext.com/docs/integration/vercel-logs-integration/">Vercel</a></li>
</ul>

### iOS 

<div>For iOS apps use <a href="https://github.com/sematext/sematext-logsene-ios" target="_blank" rel="noopener">Sematext Logs for iOS</a> library.</div>

### Android 

<div>For Android apps use<a href="https://github.com/sematext/sematext-logsene-android" target="_blank" rel="noopener"> Sematext Logs for Android</a> library.</div>

### AWS EC2 

If you're an EC2 user, you can log Sematext from your instances by creating a [US region Logs App](https://apps.sematext.com/ui/logs#) or [EU region Logs App](https://apps.eu.sematext.com/ui/logs#) and setting up a <a class="" href="https://sematext.com/docs/logs/sending-log-events/#log-shippers">log
shipper</a> like you would from any other physical or virtual machine.

### AWS ECS on AWS Fargate With FireLens 

We recommend you use the [AWS ECS Logs Integration](/docs/integration/aws-ecs-logs/) to get more detailed out-of-the-box reports.

### AWS ECS on AWS Fargate With AWS Logs

We recommend you use the [AWS ECS Logs Integration](/docs/integration/aws-ecs-logs/) to get more detailed out-of-the-box reports.

### AWS ECS on AWS EC2

We recommend you use the [AWS ECS Logs Integration](/docs/integration/aws-ecs-logs/) to get more detailed out-of-the-box reports.

