title: Sematext Logs Quick Start
description: Get up-and-running quickly with Sematext Logs. Here's how to start shipping and searching logs in no-time!

After you get logged into Sematext Cloud at <https://apps.sematext.com> (or <https://apps.eu.sematext.com> if using Sematext Cloud Europe), the first step is to create a Logs App. An [App](/docs/guide/app-guide) is an independent namespace for your data.

For example, if you have a development and a production environment, it might make sense to have one App for each. You can create as many Apps as you want.

## Creating a Logs App

You create an App by pressing the **Create Logs App** button in the Logs tab.

![Create a new Logs App](/docs/images/logs/create-logs-app.png)

You’ll then see a screen with the steps required to create a Logs App.

1. Choose one of the many available [integrations](/docs/guide/integrations-guide).

![Logs Integrations](/docs/images/logs/integrations.png)

If you don’t see the service you want to ship logs from, create a Generic Logs App. With a Generic Logs App, you can use the Sematext Agent or Custom Integrations to set up log shipping manually. If that’s the case, name your App and jump to the [Generic Logs App](#generic-logs-app) section.

2. Name your App and select a plan for it.

Note that **you won’t be charged during the 14-day trial period**, so we recommend selecting the Pro plan to explore [all its features](https://sematext.com/pricing/) during the free trial. Unless a payment method is added, your Apps will be disabled once the trial ends. If a payment method is added, your selected plan will continue. **You can downgrade or switch plans at any time without commitment**.

3. Select an Infra App.

**What is an Infra App?**

An [Infra App](/docs/monitoring/infrastructure/) works with the Sematext Agent to automatically discover available log sources on the host where the agent is installed. Once these sources are discovered, you can enable log shipping from them at any time with a single click, without any additional installation. If you don't have an Infra App, we will create one for you. Just click Next Step to continue and choose the platform on which you want to install the [Sematext Agent](/docs/agents/sematext-agent).
 
4. Then choose the platform you want to install [Sematext Agent](/docs/agents/sematext-agent).

![Logs App Environments](/docs/images/logs/environments.png)

And this will open up the agent installation instruction page for the selected environment.

5. Once the Sematext Agent is up and running, logs from your selected service integration will be shipped to your Logs App automatically.

![Logs App Finish Setup](/docs/images/logs/finish-setup.png)

After data starts flowing in, you can begin [searching and analyzing your logs](/docs/logs/searching-log-events) in the Logs App.

For more details, see [Reports And Components](/docs/logs/reports-and-components) .

### Adding Data to Your Logs App

You can add logs from the selected integration on other hosts using the left navigation panel. Click **Ship Logs → Install Agent** and choose the environment where you want to install the Sematext Agent on another host.

If the Sematext Agent is already installed on that host, go to **Ship Logs → Discovered Logs** in the left navigation menu. This will take you to the discovered log sources for that integration on other hosts running the Sematext Agent, where you can enable log shipping without any additional installation.

### Shipping Data From an existing Agent

If you have already installed the Sematext Agent on a host to ship logs from other services and now want to ship logs from a different service on the same host, no additional installation is needed.

Complete the steps up to step 4. If the selected Infra App is already receiving data from that host and the service you want to add is running, you will see an option to **Ship Logs from Existing Agent**. This will list all hosts running the selected service. Simply select **Use Existing Agents** and click **Finish Setup**. We will then start shipping logs from the new service on those hosts automatically.

![Logs App Existing Agent](/docs/images/logs/existing-agent.png)

## Generic Logs App

If you don’t see your service in the [integrations](/docs/guide/integrations-guide) list, create a Generic Logs App to ship logs from any part of your infrastructure. 

From there you will be provided with 2 options to ship logs from. 

### Use Sematext Agent to ship custom logs

Install the Sematext Agent, which can automatically discover log sources on your hosts. After the agent is installed, you can choose which logs to ship from the list of discovered log sources.

### Use Custom Integrations

If you don’t see your environment in the Install Sematext Agent step, you can use your own log shipper, such as Logstash, Fluentd, Syslog, cloud libraries, or send log events directly from your application using any Elasticsearch or OpenSearch compatible library to set up log shipping manually. The Custom Integrations screen explains how to [manually send data to your new Logs App](/docs/logs/sending-log-events/#custom-integration-options)

![Custom Integrations Selected](/docs/images/logs/custom-integrations-selected.png)

![Custom Integrations](/docs/images/logs/custom-integrations.png)

> If you are shipping custom logs to Sematext Cloud, we recommend reviewing the [Logs Pipelines guide](/docs/logs/pipelines/) to structure, enrich, or transform your log documents.

## Troubleshooting With Logs

Quality Log Management tools have several main requirements for analyzing logs:

- A way to ship, ingest, and reliably index logs data
- Tools to search, correlate and investigate logs data
- Drill-down analysis functionality to reveal trends, spikes, and anomalies
- Monitoring and alerting features with 3rd party webhooks and integrations 
- Building custom reports and dashboards from your data

These are key features Sematext Logs offers. The rest of this guide will help you get started with using it to its full potential. But first, check out this short video about troubleshooting with logs.

<div class="video_container">
<iframe src="https://www.youtube.com/embed/glwZ8OCV0kc"
frameborder="0" allow="autoplay; encrypted-media" 
allowfullscreen class="video"></iframe>
</div>

Moving on, let's see how to make the best out of a Logs App.

## Logs App Layout

The image below shows the default logs view. 

![Sematext Cloud Logs App](/docs/images/logs/logs-app.png)

 Marked are the main application and system UI elements

![Sematext Cloud UI Elements](/docs/images/guide/logs/sematext-logs-search-and-report-menu_2.png)

See [Reports And Components](/docs/logs/reports-and-components) for more details. 

You can create custom dashboards that can integrate multiple charts and views of your real-time data that help you understand important trends, summarize top values and view the frequency of conditions.  Sematext log management system lets your DevOps and business teams analyze your data further with advanced visualizations, chart overlay and pan and zoom controls and more.
