title: Sematext Integrations Guide
description: Sematext APM and logging management service provides over 40 built-in integrations used to monitor across all your systems, apps, and services.

Sematext Cloud and on-premises IT monitoring system provides over 40 built-in infrastructure integrations used to monitor across all your systems, apps, and services.

You can report data from various systems to the Sematext Cloud, analyze and visualize it using APM and logging tools, and set alerts on the behaviour of these systems. Once infrastructure agent is installed, integrations provide monitoring capabilities for the following type of data:

- Metrics and inventory data such as OS & Network, server, and much more depending on the metrics type your integration sends with control over how data is collected and shared within your organization.
- Logs where stored data is received through the Elasticsearch API and also through a variety of Syslog protocols.

- Events such as services starting or restarting, version updates, builds, deployments, alerts, etc. Events are graphed in timeseries charts and these charts can be shown next to metrics or logs components, and together added to your custom dashboards.

Essentially, you can report data from any system on your server or hosts by creating your own custom reports.

To start monitoring your IT infrastructure you need to set up the
appropriate Sematext monitoring agent. You can choose from:

- [Sematext Infra Agent](../agents/sematext-agent/) & [App Agent](../agents/spm-client/) 
The Infra Agent collects server, container, and Kubernetes metrics, network connections, process metrics, infrastructure inventory data, Docker and Kubernetes events, and more.  The App Agent collects metrics for various [integrations](/integration). The App Agent
can run in [embedded](../agents/spm-monitor-javaagent)
(aka Java agent-based, aka in-process) or
[standalone](../agents/spm-monitor-standalone) mode. This agent can also
instrument JVM-based apps to collect transaction traces and
perform [on demand profiling](../monitoring/on-demand-profiling).

- [Node-based App Agent](../agents/node-agent), which can [monitor
Apache](../integration/apache) and [Nginx](../integration/nginx)
(including [Nginx Plus](../integration/nginxplus)).

After you install and activate an integration, you can:

- Filter and analyze the metrics and configuration data

- Query your data and create custom dashboards

- Create alert conditions to monitor problems with your services' performance with Sematext alerting tools


## Available Integrations

### Logging

- [Syslog Protocols](/integration/index.md#syslog-protocols)
- [Log Shippers](/integration/index.md#log-shippers)
- [Programming Languages](/integration/index.md#programming-languages)
- [Operating Systems](/integration/index.md#operating-systems)
- [Containers](/integration/index.md#containers)
- [Cloud IaaS / PaaS](/integration/index.md#cloud-iaas--paas)
- [iOS](/integration/index.md#ios)
- [Android](/integration/index.md#android)
- [AWS EC2](/integration/index.md#aws-ec2)
- [AWS CloudWatch Logs](/integration/index.md#aws-cloudwatch-logs)


### Monitoring

- [Akka](/integration/akka/)
- [Apache](/integration/apache/)
- [AWS (Amazon Web Services)](/integration/aws/)
- [Cassandra](/integrartion/cassandra/)
- [Clickhouse](/integration/clickhouse/)
- [Docker](/integration/docker/)
- [Elasticsearch](/integration/elasticsearch)
- [Hbase](/integration/hbase)
- [Java](/integration/java/)
- [Kafka](/integration/kafka/)
- [Mysql](/integration/mysql/)
- [MongoDB](/integration/mongodb/)
- [NginX](/integration/nginx/)
- [Nginx+](/integration/ngingxplus/)
- [Node.js](/integration/node.js)
- [PHP](/integration/php/)
- [Redis](/integration/redis/)
- [Hadoop](/integration/hadoop/)
- [Solr](/integration/solr/)
- [Solr Cloud](/integration/solrcloud/)
- [Apache Spark](/integration/spark/)
- [Apache Storm](/integration/storm/)
- [Tomcat](/integration/tomcat/)
- [Zookeeper](/integration/zookeeper/)

### Webhooks

- [Email as default system webhhook](/integration/alerts-email-integration/)
- [Custom user defined webhooks](/integration/alerts-webhooks-integration/)
- [Big Panda](integration/alerts-bigpanda-integration/)
- [Hipchat](/integration/alerts-hipchat-integration/)
- [Nagios](/integration/alerts-nagios-integration/)
- [OpsGenie](/integration/alerts-opsgenie-integration/)
- [PagerDuty](/integration/alerts-pagerduty-integration/)
- [Pushover](/integration/alerts-pushover-integration/)
- [Slack](/integration/alerts-slack-integration/)
- [VictorOps](/integration/alerts-victorops-integration/)
- [Zapier](/integration/alerts-zapier-integration/)

## Creating New Integration

Navigate to [Integrations Overview](https://apps.sematext.com/ui/integrations). Three different integrations are available:

- Log Shipping and Management app
- Infrastructure and Application Performance Monitoring app
- Notification Hooks through various third party integrations, email, and system defined custom webhooks

Hover over any integration card and click to create respective app or a webhook. Initially, there will be no app status and count tag displayed in the left bottom corner of the card, but once related app(s) have been created tag will display the number of apps, and grey and green tag colour are used to show if apps are not or are receiving data respectively.

Image below illustrates an integration card being hovered over and the app status with the count tag displayed with one example app created.  

![Sematext Cloud - Create New App](https://sematext.com/docs/images/guide/integrations/add-new-logging-app.png "Sematext Cloud - Create New App")

### App Integration

New integration creation userflow is the same for both monitoring as well as logging apps. While Apache monitoring app is being created you can also create complementary logs app as well. It makes perfect sense, and it is the only way to have full observability into performance and issues of the Apache server for example, and that particular piece of a IT infrastructure puzzle.

In other words, as monitoring app is being created you can create a logging app as well and vice versa. You can also invite other devops team members and provide them with the same tools and insights while using RBAC (role based access control) model to restrict or provide proper administrative user rights.

![Sematext Cloud - Create New Intergration App](https://sematext.com/docs/images/guide/integrations/create-new-app-integration.png " Sematext Cloud - Create New Integration App")

### Webhook Integration

When an integration app is first created our IT system monitoring platform creates several app specific alerts. User account email is used as a default notification mechanism to send those alert notifications. If you want to use any of the popular third party messaging services that you use in your operations workflow, you can do so by creating related [webhook](/guide/integrations-guide/#webhooks) integration. 

You will first need to create that third party service and obtain required API keys and/or other tokens in order to establish communication between that service and Sematext Cloud. Image below shows a third party notification webhook integration being created, Slack in this example.

![Sematext Cloud - Create New Alert Notification Webhook](https://sematext.com/docs/images/guide/integrations/create-new-webhook-integration.png " Sematext Cloud - Create New Alert Notification Webhook") 


### App Table View

Once one or more apps have been created, [Apps Table](https://apps.sematext.com/ui/integrations/apps) will display all the created apps and provide overview as well as app menu from where you can:

- access and edit app settings
- create alerts and define alert rules
- connect two apps
- invite other devops team members
- transfer or disable app
- get to monitoring installation instructions

You can also add new integrations and filter and search existing app using table search functionality.App table contains following information:

- Type illustrated using integration type logo link to provide visual clue should app naming convention not include any reference to the type
- Application Name
- Integration Token is a unique system generated string that you will need to use on your system in order to install Sematext Integration Agent. It is required to authenticate and establish system connections so you can start sending data to the Sematext Cloud. Integration Agent installation will be covered in more depth in the following section.
- Next table column describes your Integration Plan and plans can be adjusted using app settings. For more information on [infrastructure pricing](https://sematext.com/spm/pricing/) or [logging pricing](https://sematext.com/logsene/pricing/) check our website
- App Status indicator icons show your apps status and either green checkmark is used to indicate that app is sending data to our service, indexed and ready for IT systems monitoring
- App owner is defined in the last second column
- Last, but not the least, App Settings dropdown menu is the last item in the [apps table](https://github.com/sematext/sematable).

![Sematext Cloud Monitoring and Logging Integrations Table](https://sematext.com/docs/images/guide/integrations/monitoring-and-logging-integrations-table.png "Sematext Cloud Monitoring and Logging Integrations Table")

## Sematext Agent Installation

### Logging

Sematext stores data received through the Elasticsearch API and also through a variety of Syslog protocols. In order for the Sematext Cloud to receive data from your systems you need to install the agent on them. Logging apps require log shipper installation on your end, and information below explains the process.

#### Elasticsearch API

Sematext exposes the Elasticsearch API which lets you:
- send log events directly from your application, using any Elasticsearch library
- send log events using a "log shipper" application such as Logstash, rsyslog, Apache Flume, Fluentd, or - anything that can output to Elasticsearch
search for logs from your own application, or by configuring/adapting existing Elasticsearch UIs, such as Kibana
- optionally define custom mappings for your log types, so you can tweak the way your logs are indexed

The basic settings for sending data using the Elasticsearch API are:

- host: logsene-receiver.sematext.com
- port: 80 (HTTP) or 443 (HTTPS)
- index: bb50181f-5fad-4639-b880-7c49e036ae02 (this is example app token and the unique one will be created for every logging app you create)

#### Syslog Protocols

We accept Syslog messages using any log shipper and any Syslog library, as long as they either contain a valid token or the source IP is authorized. The basic settings for sending data using the Syslog protocols are:

- host: logsene-syslog-receiver.sematext.com
- port: 514 (TCP and UDP), 20514 (RELP) or 10514 (TLS)
- index: bb50181f-5fad-4639-b880-7c49e036ae02 (example tokene)

#### Socket Protocols

We accept JSON messages using any log shipper and any logging library, as long as they contain a valid token. The basic settings for sending data using the Socket protocols are:

- host: logsene-syslog-receiver.sematext.com
- port: 12201 (TCP and UDP)
- index: bb50181f-5fad-4639-b880-7c49e036ae02 (example token)

### Monitoring

When creating a monitoring app two steps are required, Agent Installation and Agent Setup.

#### Agent Installation

You need to add Sematext repository and install Sematext monitoring agent. It is available for various Linux distributions as well as infrastructure orchestration tools like Ansible, Puppet, and Chef. Choose your distribution and install required packages. Once installed, move to the next step, that is, agent configuration setup

#### Agent Setup

Sematext Monitor agent collects performance metrics of your application (Solr, Elasticsearch, HBase...). It can run in two different modes: 

- [In-process as a javaagent](/agents/spm-monitor-javaagent/)
- [Standalone as a separate process](/agents/spm-monitor-standalone/) 

For more information check Java agent [overview page](/agents/spm-client/) 

You'll start seeing your performance data in Sematext in a few minutes. If you do not see performance charts in 5 minutes, have a look at [Troubleshooting page](/monitoring/spm-faq/) for tips and if nothing works give us a shout @Sematext or at support@sematext.com.

[Register](https://apps.sematext.com/ui/registration) for free or [Login](https://apps.sematext.com/ui/login/) into Sematext IT systems monitoring platform to get started and create your logs app. Upload your logs from all your servers to our centralized log management solution with Elasticsearch API and integrated Kibana, and experience the first true Hosted ELK Stack.

Recommendations for learning more about Sematext products and services:

- Infrastructure [integrations documentation](/integration/)
- Our [website](https://sematext.com/)
- For open-source integrations and other Sematext contribution to the open-source community, check our [GitHub](https://github.com/sematext/) repositories.
- or just talk to us using chat located in right bottom corner of any page, and one of our engineers will help you navigate Sematext waters.
