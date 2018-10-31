title: Sematext Integrations Guide
description: Sematext APM and logging management service provides over 40 built-in integrations used to monitor across all your systems, apps, and services. 

Sematext Cloud and on-premises IT monitoring system provides over 40 built-in infrastructure integrations used to monitor across all your systems, apps, and services. 

You can report data from various systems to the Sematext Cloud and set alerts on the behaviour of these systems, analyze and visualize it using APM and logging tools. Once infrastructure agent is installed, integrations provide monitoring capabilities for the following type of data:

- Metrics and inventory data such as OS & Network, server, and much more depending on  the metrics type your integration sends with control over how data is collected and shared within your organization.
 
- Logs where stored data is received through the Elasticsearch API and also through a variety of Syslog protocols.

- Events such as services starting or restarting, version updates, builds, deployments, alerts, etc. Events are graphed in timeseries charts and these charts can be shown next to metrics or logs components, making them  that can be added to your custom dashboards.

Essentially, you can report data from any system on your server or hosts by creating your own custom reports.

To start monitoring your infrastructure you need to set up the
appropriate Sematext monitoring agent. You can choose from:

  - [Sematext Infra & App Agent](spm-client) (aka SPM Client or SPM
    Monitor). The Infra Agent collects OS & Network metrics.
    The App Agent collects application metrics. The App Agent
    can run in [embedded](spm-monitor-javaagent)
    (aka Java agent-based, aka in-process) or
    [standalone](spm-monitor-standalone) mode.  This agent can also
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
- [Programming Languages](/docs/integration/index.md#programming-languages)
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

- [Email as default system webhhook]()
- [Custom user defined webhooks]()
- [Hipchat]()
- [Nagios]()
- [OpsGenie]()
- [PagerDuty]()
- [Pushover]()
- [Slack]()
- [VictorOps]()
- [Zapier]()

## Sematext Agent Installation

### Logging

### Monitoring

[Register](https://apps.sematext.com/ui/registration) for free or [Login](https://apps.sematext.com/ui/login/) into Sematext IT systems monitoring platform to get started and create your logs app. Upload your logs from all your servers to our centralized log management solution with Elasticsearch API and integrated Kibana, and experience the first true Hosted ELK Stack. 

Recommendations for learning more about Sematext products and services:

- Infrastructure  [integrations documentation](/integration/)
- Our [website](https://sematext.com/)
- For open-source integrations and other Sematext contribution to the open-source community, check our [GitHub](https://github.com/sematext/) repositories.
- or just use chat in the right bottom corner and one of our engineers will help you navigate Sematext waters.

