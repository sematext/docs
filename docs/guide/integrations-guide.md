title: Sematext Integrations Guide
description: Sematext APM and logging management service provides over 40 built-in integrations used to monitor across all your systems, apps, and services.

Sematext Cloud and on-premises IT monitoring system provides over 40 built-in infrastructure integrations used to monitor across all your systems, apps, and services.

You can report data from various systems to the Sematext Cloud, analyze and visualize it using APM and logging tools, and set alerts on the behaviour of these systems. Once infrastructure agent is installed, integrations provide monitoring capabilities for the following type of data:

- Metrics and inventory data such as OS & Network, server, and much more depending on the metrics type your integration sends with control over how data is collected and shared within your organization.
- Logs where stored data is received through the Elasticsearch API and also through a variety of Syslog protocols.

- Events such as services starting or restarting, version updates, builds, deployments, alerts, etc. Events are graphed in timeseries charts and these charts can be shown next to metrics or logs components, and together added to your custom dashboards.

Essentially, you can report data from any system on your server or hosts by creating your own custom reports.

To start monitoring your infrastructure you need to set up the
appropriate Sematext monitoring agent. You can choose from:

- [Sematext Infra & App Agent](spm-client) (aka SPM Client or SPM
Monitor). The Infra Agent collects OS & Network metrics.
The App Agent collects application metrics. The App Agent
can run in [embedded](spm-monitor-javaagent)
(aka Java agent-based, aka in-process) or
[standalone](spm-monitor-standalone) mode. This agent can also
instrument JVM-based apps to collect transaction traces and
perform [on demand profiling](on-demand-profiling).

- [Node-based App Agent](node-agent), which can [monitor
Apache](../integration/apache) and [Nginx](../integration/nginx)
(including [Nginx Plus](../integration/nginxplus)).

- [Docker Agent](../sematext-docker-agent), which can collect not
only container and host metrics, but also container events and
also logs, it can parse and structure out of the box.


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
- [AWS CloudWatch Logs](/docs/integration/index.md#aws-cloudwatch-logs)


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

Hover over any integration card and click to create it. Initially, there will be no app status and count tag displayed in the left bottom corner of the card, but once related app(s) have been created tag will display the number of apps, and grey and green tag colour are used to show if apps are not or are receiving data respectively.

Image below illustrates an integration card being hovered over and the app status and count tag displayed with one example app created

![Sematext Cloud - Create New App](https://sematext.com/docs/images/guide/integrations/add-new-logging-app.png "Sematext Cloud - Create New App")

Once one or more apps had been created, [Apps Table](https://apps.sematext.com/ui/integrations/apps) will display all the created apps and provide overview as well as app menu from where you can:

- app settings
- create alerts and define alert rules
- connect two apps
- invite other devops team members
- transfer or disable app
- get to monitoring installation instructions

You can also add new integrations and filter and search existing app using table search functionality.App table contains following information:

- Type illustrated using integration type logo link to provide visual clue should app naming convention not include any reference to the type
- Application Name
- Integration Token is a unique system generated string that you will need to use on your systems in order to install Sematext Integration Agent. It is required to authenticate and establish system connections so you can start sending data to the Sematext Cloud. Integration Agent installation will be covered in more depth in the following section.
- Next table column describes your Integration Plan and plans can be adjusted using app settings. For more information on [infrastructure pricing](https://sematext.com/spm/pricing/) or [logging pricing](https://sematext.com/logsene/pricing/) check our website
- App Status indicator icons show your apps status and either green checkmark is used to indicate that app is sending data to our service, indexed and ready for IT systems monitoring
- App owner is defined in the last second column
- Last, but not the least, App Settings dropdown menu is the last item in the [apps table](https://github.com/sematext/sematable).

![Sematext Cloud Monitoring and Logging Integrations Table](https://sematext.com/docs/images/guide/integrations/monitoring-and-logging-integrations-table.png "Sematext Cloud Monitoring and Logging Integrations Table")

## Sematext Agent Installation

### Logging

### Monitoring

[Register](https://apps.sematext.com/ui/registration) for free or [Login](https://apps.sematext.com/ui/login/) into Sematext IT systems monitoring platform to get started and create your logs app. Upload your logs from all your servers to our centralized log management solution with Elasticsearch API and integrated Kibana, and experience the first true Hosted ELK Stack.

Recommendations for learning more about Sematext products and services:

- Infrastructure [integrations documentation](/integration/)
- Our [website](https://sematext.com/)
- For open-source integrations and other Sematext contribution to the open-source community, check our [GitHub](https://github.com/sematext/) repositories.
- or just use chat in the right bottom corner and one of our engineers will help you navigate Sematext waters.
