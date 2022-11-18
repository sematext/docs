title: Sematext Monitoring Quick Start
description: Sematext Cloud is a modern monitoring, log management, transaction tracing, and real user monitoring system that includes over 40 monitoring integrations. It is a suite of products that combine high-quality logging experience with other monitoring and alerting devops tools helping fix IT production issues

After you get logged into Sematext Cloud at <https://apps.sematext.com> (or <https://apps.eu.sematext.com> if using Sematext Cloud Europe), the first step is to create a Monitoring App. An App is an independent namespace for your data.

For example, if you have a development and a production environment, it might make sense to have one App for each. You can create as many Apps as you want.

## Creating a Monitoring App

You create an App by pressing the **Create Monitoring App** button or by clicking **+ New Monitoring App** in the Monitoring tab.

<img class="content-modal-image" alt="Create a new Sematext Monitoring App" src="../images/monitoring/monitoring-app-create-first-app.png" title="Create a new Sematext Monitoring App">

Choose one of the many available integrations.

<img class="content-modal-image" alt="Choose a Monitoring Integration" src="../images/monitoring/monitoring-app-select-integration.png" title="Choose a Monitoring Integration">

Once clicking on your desired integration, add a name, and press **Create App**.

<img class="content-modal-image" alt="Enter a Monitoring App name" src="../images/monitoring/monitoring-app-enter-name.png" title="Enter a Monitoring App name">

This will immediately open up the Agent installation wizard to select your environment.

<img class="content-modal-image" alt="Select Agent Installation Environment" src="../images/monitoring/monitoring-app-select-env.png" title="Select Agent Installation Environment">

Based on your environment, follow the Agent installation instructions and data will start flowing in!

<img class="content-modal-image" alt="Agent Installation Instructions" src="../images/monitoring/monitoring-app-agent-instructions.png" title="Agent Installation Instructions">

Every type of Integration has a dedicated Agent Installation Guide.

Once you have data flowing you can **analyze metrics** by a number of context-aware filters, add **alerts** and **anomaly detection**, and **correlate metrics** with events and logs.

<img class="content-modal-image" alt="Monitoring App Data Flowing" src="../images/monitoring/monitoring-app-data-flowing.png" title="Monitoring App Data Flowing">

You can have any number of Monitoring Apps and each App can be shared
with different people, giving them different access roles. Each App has its own plan.
Some Apps can use the free plan, while others can use paid plans, thus enabling a lot of flexibility around cost management.

## Setting up Monitoring Agents

Metrics are shipped to Sematext Monitoring using the [Sematext Agent](../agents/sematext-agent/), a lightweight, blazing fast Go-based Monitoring Agent with a tiny footprint for both infrastructure and containers. Also includes Java based App Agent that collects application metrics.

The setup instructions are shown in the UI and you can also see them under individual [integrations](../integration).

Once the agent is set up metrics will start coming to Sematext
instantly. If you do not see performance charts 5 minutes after setting up the agent, have a
look at the [troubleshooting](./spm-faq) page.

## Monitoring App Layout

This guide will help you get started with our Monitoring App and discover reporting, monitoring, and other features and functionalities. Here's the default monitoring view and shown are the main application and system elements.

<img class="content-modal-image" alt="Monitoring App Layout" src="../images/monitoring/monitoring-app-layout.png" title="Monitoring App Layout">

