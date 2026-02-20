title: Sematext Monitoring
description: Sematext Monitoring covers server, kubernetes, database, container, and application monitoring with alerts and events. It's available as a SaaS or on-premise. Out-of-the-box integrations let you view and report data from various services and give you real-time insight of your entire DevOps ecosystem

Sematext [**Application**](/docs/monitoring/service-monitoring/) and [**Infrastructure Monitoring**](/docs/monitoring/infrastructure), with over [100 integrations](/docs/integration/), allows you to collect an extensive set of **events** and thousands of metrics across your entire stack.

Get started in minutes with **out-of-the-box dashboards** that include prebuilt charts and other numeric components for the most notable metrics. Get notified with automatic [**alerts**](https://sematext.com/alerts/) powered by [**anomaly detection**](https://sematext.com/alerts/) rules, and ability to **analyze metrics** by a number of context-aware filters.

## Infrastructure Monitoring
Monitor your core infrastructure in minutes, simply install [Sematext Agent](/docs/agents/sematext-agent). Get performance and health metrics from a single (Infra) Monitoring App. Keep an eye on everything, from servers and Kubernetes clusters to cloud instances, containers, processes, inventory, events, and beyond. Read more in the [Infrastructure Monitoring Overview](/docs/monitoring/infrastructure/).

## Application and Service Monitoring
No matter how complex your infrastructure is, you can benefit from service autodiscovery functionality and get all the important metrics from your applications and services easily and quickly. Simply choose one of the available monitoring integrations and monitor performance and health metrics for all your applications. 

Get dedicated dashboards and reports for each application to extract the most value from the metrics we track. Useful tips are presented alongside the charts and other report components. Of course, if you prefer to be notified of important events, we have you covered with automatic alert rules. Read more in the [Application Monitoring Overview](/docs/monitoring/service-monitoring/).

Sematext Monitoring goes beyond just collecting metrics. 

Use [**Database Monitoring**](https://sematext.com/database-monitoring/) to get a complete overview of your database health whether you are running it on your own infrastructure or using AWS RDS. 

[**Transaction Tracing**](https://sematext.com/tracing/) will show slow database operations, full SQL statements, end-to-end HTTP transaction context, top 10 operations by throughput, latency, or time consumed, filter database operations, and much more...

You can create [**custom dashboards**](/docs/dashboards/) with real-time data that helps you understand important trends, summarize top values and view the frequency of conditions.

And you can additionally send any kind of [**custom metrics**](/docs/monitoring/custom-metrics).

If you haven't [signed up for free](https://apps.sematext.com/ui/registration) yet, check it out or [sign in](https://apps.sematext.com/ui/login/) to get started by creating a Sematext Monitoring App with a wide selection of integrations to choose from.

## Service Monitoring vs Infrastructure Monitoring

[Infrastructure Monitoring](/docs/monitoring/infrastructure/) collects system level metrics from your hosts. This includes CPU, memory, disk, network, and other operating system metrics. These metrics help you understand the health and resource usage of your machines, virtual machines, or containers.

[Service Monitoring](/docs/monitoring/service-monitoring/) collects metrics specific to a particular service such as a database, web server, message queue, or application runtime. Examples include query rate for a database, request count for a web server, or JVM metrics for a Java application.
Infrastructure Monitoring gives you visibility into the host. Service Monitoring gives you visibility into the service running on that host.

If you do not have any Apps and want to monitor metrics from a specific service such as a database or web server, you should create a Service Monitoring App.

During this process you will also be asked to create an Infrastructure Monitoring App. If you do not already have one, it will be created automatically for you. This is required because Infrastructure Monitoring Apps are the foundation of Sematext Cloud. The Sematext Agent that you install on your hosts is bound to an Infrastructure Monitoring App. The agent can collect:

- System level metrics such as CPU, memory, disk, and network
- Service specific metrics when enabled
- Logs when log collection is configured

When you install the Sematext Agent, [service discovery](/docs/fleet/discovery/) is automatically enabled. This feature is available when you have an **Infrastructure Monitoring** App, which is why the Infrastructure App is the foundation of Sematext Cloud.
Discovery scans the host where the agent is installed and detects:
- Running services
- Available integrations
- Log files that can be collected

Because the agent is bound to an Infrastructure Monitoring App, it can continuously observe what is running on the host. This allows Sematext Cloud to present discovered services and logs directly in the UI.
If you later decide to collect metrics or logs from a discovered service, you can enable them directly from the Sematext Cloud UI. You do not need to reinstall or reconfigure the agent. In most cases, enabling monitoring for a discovered service requires only a few clicks.

Follow along the [Quick Start](/docs/monitoring/quick-start) guide to learn how.

## App Settings

App settings and actions include, but are not limited to:

  - changing your App's plan
  - [managing alert rules](/docs/alerts)
  - [connecting Apps](/docs/guide/connected-apps)
  - [heartbeat alert creation](/docs/alerts/creating-heartbeat-alerts)
  - [inviting others to your App](/docs/team/app-guests)
  - [App ownership transfer](/docs/team/transfer-apps)
  - [setting up a Sematext Monitoring Agent to ship metrics](/docs/monitoring/quick-start/#setting-up-monitoring-agents)
  - [scheduled report emails](/docs/guide/scheduled-reports)

<img class="content-modal-image" alt="Sematext Monitoring App Settings UI screen" src="/docs/images/monitoring/monitoring-app-actions.png" title="Sematext Monitoring App Actions">

<img class="content-modal-image" alt="Sematext Monitoring App Settings UI screen" src="/docs/images/monitoring/monitoring-app-options.png" title="Sematext Monitoring App Options">

Check out the [Settings](/docs/monitoring/settings) guide to learn more.

## Reports And Components

Every Monitoring App can have multiple Reports that act as buckets for your metrics and data. The distinct metrics in one report are separated into components.

Read more in the [Reports and Components](/docs/monitoring/reports-and-components) guide.

<img class="content-modal-image" alt="Sematext Monitoring App Options UI screen" src="/docs/images/monitoring/monitoring-app-reports.png" title="Sematext Monitoring App Options">


## Additional Features

To help you manage your metrics, hosts, and containers, and to help you create more useful dashboards, you can assign metadata to each host/server/container in the form of tags.

Check the [Tags](/docs/monitoring/tags) page for different ways to use tags.

You can [create custom dashboards](/docs/dashboards) with real-time data that helps you understand important trends, summarize top values and view the frequency of conditions.

## Getting Support

We hope you enjoy using Sematext App and Infrastructure Monitoring and Log Management tools. If you need further support or have any feedback regarding our products, please don't hesitate to [contact us](mailto:support@sematext.com)! You can also contact / talk to us using chat widget at the bottom right corner of the page or give us a shout [@Sematext](https://twitter.com/sematext). 
