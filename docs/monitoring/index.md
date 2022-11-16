title: Sematext Monitoring
description: Sematext Monitoring covers server, database, container, and application monitoring with alerts and events. It's available as a SaaS or on-premise. Out-of-the-box integrations let you view and report data from various services and give you real-time insight of your entire DevOps ecosystem

Sematext **Application** and [**Infrastructure Monitoring**](../monitoring/infrastructure) lets you **collect metrics** and **events** across your whole stack with over [100 integrations](https://sematext.com/integrations/). 

Get started in minutes with **out-of-the-box dashboards**, [**alerts**](https://sematext.com/alerts/) and [**anomaly detection**](https://sematext.com/alerts/) rules, and ability to **analyze metrics** by a number of context-aware filters.

The integrations cover several key features. You have [**Server Monitoring**](../monitoring/#setting-up-monitoring-agents) giving you complete insight about the utilization of your servers and cloud instances. [**Monitor Containers**](../monitoring/containers) with [**Sematext Agent**](../agents/sematext-agent/), which is deployed seamlessly with Docker or Kubernetes.

Sematext Monitoring goes beyond just collecting metrics. 

Use [**Database Monitoring**](https://sematext.com/database-monitoring/) to get a complete overview of your database health whether you are running it on your own infrastructure or using AWS RDS. 

[**Transaction Tracing**](https://sematext.com/tracing/) will show slow database operations, full SQL statements, end-to-end HTTP transaction context, top 10 operations by throughput, latency, or time consumed, filter database operations, and much more...

[**Inventory Monitoring**](./inventory) will track all your infrastructure configurations, collect data about machines and group it into sets for easy access and identification.

You can create [**custom dashboards**](../dashboards/) with real-time data that helps you understand important trends, summarize top values and view the frequency of conditions.

And you can additionally send any kind of [**custom metrics**](./custom-metrics).

If you haven't [signed up for free](https://apps.sematext.com/ui/registration) yet, check it out or [sign in](https://apps.sematext.com/ui/login/) to get started by creating a Sematext Monitoring App with a wide selection of integrations to choose from.


### Creating Monitoring Apps

The first step to monitoring with Sematext is to create a Monitoring App. Go to [monitoring view](https://apps.sematext.com/ui/monitoring), click on New Monitoring App button, select your integration and create monitoring App.

Follow along the [Quick Start](./quick-start) guide to learn how.

<img class="content-modal-image" alt="Sematext Monitoring App Settings UI screen" src="../images/monitoring/create-new-monitoring-app.gif" title="New Monitoring App">

### App Settings

App settings and actions include, but are not limited to:

  - changing your App's plan
  - [managing alert rules](../alerts)
  - [connecting Apps](../guide/integrations-guide/#connected-apps)
  - [heartbeat alert creation](../alerts/creating-heartbeat-alerts)
  - [inviting others to your App](../team/app-guests)
  - [App ownership transfer](../team/transfer-apps)
  - [setting up a Sematext Monitoring Agent to ship metrics](./quick-start/#setting-up-monitoring-agents)
  - scheduled report emails (aka Subscriptions)

<img class="content-modal-image" alt="Sematext Monitoring App Settings UI screen" src="../images/monitoring/monitoring-app-actions.png" title="Sematext Monitoring App Actions">

<img class="content-modal-image" alt="Sematext Monitoring App Settings UI screen" src="../images/monitoring/monitoring-app-options.png" title="Sematext Monitoring App Options">

Check out the [Settings](./settings) guide to learn more.

### Reports And Components

Every Monitoring App can have multiple Reports that act as buckets for your metrics and data. The distinct metrics in one report are separated into components.

Read more in the [Reports and Components](./reports-and-components) guide.

<img class="content-modal-image" alt="Sematext Monitoring App Options UI screen" src="../images/monitoring/monitoring-app-reports.png" title="Sematext Monitoring App Options">

### Quickly start monitoring with Autodiscovery

The only thing you'll have to install is [Sematext Agent](../agents/sematext-agent). Then you can enable/disable monitoring of each discovered service type from the user interface. To learn more visit [Service Autodiscovery](./autodiscovery). Of course, if you wish to have full control over what is monitored and avoid configuring things in the user interface, you can still do that. The Sematext Cloud UI will show you manual monitoring installation instructions as well.
 

### Additional Features

To help you manage your metrics, hosts, and containers, and to help you create more useful dashboards, you can assign metadata to each host/server/container in the form of tags.

Check the [Tags](./tags) page for different ways to use tags.

The [Network Map](network-map) visualizes your network topology.  It show discovered hosts and the communication between them, including  details such as the amount of received or transmitted data on each port.

[On-demand profiling](on-demand-profiling) lets you profile your own JVM-based applications or even any 3rd party JVM-based applications (e.g. Spark, Elasticsearch, Solr, Kafka, Hadoop, Storm, Cassandra, HBase, etc.).  It works with both embedded and standalone agent and has negligible overhead.

You can [create custom dashboards](../dashboards) with real-time data that helps you understand important trends, summarize top values and view the frequency of conditions.

### Getting Support

We hope you enjoy using Sematext App and Infrastructure Monitoring and Log Management tools. If you need further support or have any feedback regarding our products, please don't hesitate to [contact us](mailto:support@sematext.com)! You can also contact / talk to us using chat widget at the bottom right corner of the page or give us a shout [@Sematext](https://twitter.com/sematext). 
