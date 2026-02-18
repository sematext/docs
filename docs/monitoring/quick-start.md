title: Sematext Monitoring Quick Start
description: Sematext Cloud is a modern monitoring, log management, transaction tracing, and real user monitoring system that includes over 40 monitoring integrations. It is a suite of products that combine high-quality logging experience with other monitoring and alerting devops tools helping fix IT production issues

After you get logged into Sematext Cloud at <https://apps.sematext.com> (or <https://apps.eu.sematext.com> if using Sematext Cloud Europe), the first step is to create a [Service Monitoring](/docs/monitoring/service-monitoring/) App or an [Infrastructure Monitoring](/docs/monitoring/infrastructure/) App.

Refer to [Service Monitoring vs Infrastructure Monitoring](/docs/monitoring/#service-monitoring-vs-infrastructure-monitoring) for more details.

An App is an independent namespace for your data. For example, if you have a development and a production environment, it might make sense to have one App for each. You can create as many Apps as you want.

## Creating an Infrastructure Monitoring App

Go to the **All Apps** page by clicking the Octi icon in the top left corner of the main navigation menu. From there, create an Infrastructure Monitoring App.

<img class="content-modal-image" alt="Sematext Monitoring Create New Infrastructure App UI screen" src="/docs/images/monitoring/create-new-app.png" title="New Infrastructure App">

Add a name, select the [plan](https://sematext.com/pricing/), and click **Create App**.

<img class="content-modal-image" alt="Sematext Monitoring Create Infrastructure App UI screen" src="/docs/images/monitoring/create-new-infra-app.png" title="Create Infrastructure App">

Proceed with the next step to choose your environment and install [Sematext Agent](/docs/agents/).

<img class="content-modal-image" alt="Agent Installation Select Environment UI screen" src="/docs/images/monitoring/agent-installation-select-environment.png" title="Select Environment">

Based on your environment, follow the Agent installation instructions and data will start flowing in! After the metrics are being shipped, infrastructure metrics will be available under the Infrastructure Monitoring section in the left navigation menu.

<img class="content-modal-image" alt="Infrastructure Kubernetes Overview Report" src="/docs/images/monitoring/infrastructure-kubernetes-overview.png" title="Infrastructure Kubernetes Overview">

Once you have data flowing you can **analyze metrics** by a number of context-aware filters, add [**alerts**](/docs/alerts/) and [**anomaly detection**](/docs/alerts/creating-metrics-alerts/#anomaly-alerts), and [**correlate metrics**](/docs/monitoring/correlation/) with [events](/docs/events/) and [logs](/docs/logs/).

## Creating a Service Monitoring App

Go to the **Observability Suite → Monitoring** section in the left navigation menu and create a Service Monitoring App.

<img class="content-modal-image" alt="Create New Monitoring App UI screen" src="/docs/images/monitoring/create-monitoring-app.png" title="New Service Monitoring App">

Choose one of the many available [integrations](/integration/).

<img class="content-modal-image" alt="Select a Monitoring Integration UI screen" src="/docs/images/monitoring/select-monitoring-integration.png" title="Select a Monitoring Integration">

Add a name, select the [plan](https://sematext.com/pricing/), and click **Create App**. At this step, if you don't already have an Infrastructure App, we will create one for you. Refer to [Service vs Infrastructure Monitoring](/docs/monitoring/#service-monitoring-vs-infrastructure-monitoring) for more information.

Proceed with the next step to choose your environment and install [Sematext Agent](/docs/agents/).

<img class="content-modal-image" alt="Agent Installation Select Environment UI screen" src="/docs/images/monitoring/agent-installation-select-environment.png" title="Select Environment">

Based on your environment, follow the Agent installation instructions and data will start flowing in! After the App is created and the service metrics are being shipped, Service Monitoring App will be visible under Observability Suite → Monitoring section in the left navigation menu.

Once you have data flowing you can **analyze metrics** by a number of context-aware filters, add [**alerts**](/docs/alerts/) and [**anomaly detection**](/docs/alerts/creating-metrics-alerts/#anomaly-alerts), and [**correlate metrics**](/docs/monitoring/correlation/) with [events](/docs/events/) and [logs](/docs/logs/).

<img class="content-modal-image" alt="Monitoring App Data Flowing" src="/docs/images/monitoring/monitoring-app-data-flowing.png" title="Monitoring App Data Flowing">

You can have any number of Monitoring Apps and each App [can be shared](/docs/team/) with different people, giving them different access roles. Each App has its own plan.

## Setting up Monitoring Agents

Metrics are shipped to Sematext Monitoring using the [Sematext Agent](/docs/agents/sematext-agent/), a lightweight, blazing fast Go-based Monitoring Agent with a tiny footprint for various infrastructure environments including Kubernetes. It also collects metrics for a number of integrations using integration-specifc App Agents.

The agent installation instructions are shown in the UI and you can also see them under individual [integrations](/docs/integration).

Once the agent is set up metrics will start coming to Sematext instantly. If you do not see performance charts 5 minutes after setting up the agent, have a
look at the [troubleshooting](/docs/monitoring/spm-faq) page.

## Monitoring App Layout

Here's the default monitoring view of an App and shown are the main application and system elements.

<img class="content-modal-image" alt="Monitoring App Layout" src="/docs/images/monitoring/monitoring-app-layout.png" title="Monitoring App Layout">

