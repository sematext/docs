title: Sematext Monitoring App Settings
description: Sematext Cloud is a modern monitoring, log management, transaction tracing, and real user monitoring system that includes over 40 monitoring integrations. It is a suite of products that combine high-quality logging experience with other monitoring and alerting devops tools helping fix IT production issues

The Monitoring App view ([US](https://apps.sematext.com/ui/monitoring) or [EU](https://apps.eu.sematext.com/ui/monitoring)) allows for easy interaction between various App settings.

From the App Actions drop down menu, the horizontal elipsis icon (⋯) shows your App options and lets you open various App-specific functions:

  - [inviting others to your App](/docs/team/app-guests/)
  - [alert rules](/docs/alerts)
  - [changing your App's plan](https://sematext.com/pricing/#infrastructure)
  - [connecting Apps](/docs/guide/connected-apps/)
  - [heartbeat alert creation](/docs/alerts/creating-heartbeat-alerts/)
  - [App ownership transfer](/docs/team/transfer-apps/)
  - [scheduled report emails](/docs/guide/scheduled-reports/)


![](/docs/images/guide/monitoring/monitoring-app-actions.png)

## Side Navigation

The left navigation menu provides access to [all primary product areas and features](/docs/guide/navigation-guide), organized into functional categories. When you click on Monitoring under Observability Suite section, you will see a list of your Service Monitoring and Infrastructure Monitoring Apps. Selecting any Monitoring App opens a contextual sub-menu that contains actions and sections specific to that Monitoring App. 

Sub-level sections for a Service Monitoring App include:

### Reports 

Provides out-of-the-box reports based on the selected integrations. You can also use the **+ Add Report** button to create custom reports tailored to your Service Monitoring App.

### Alerts 

The [Alerts](/docs/guide/alerts-guide/). section shows recently triggered alerts for your Service Monitoring App. It also includes Alert Rules, where you can view, manage, and create new alert rules to get notified based on thresholds, or anomalies.

### Setup & Configuration

This section contains all options for shipping metrics to your Monitoring App, including:

- Installing the **[Sematext Agent](/docs/agents/)** on additional hosts
- Configuring metrics shipping from **[discovered metrics](/docs/monitoring/autodiscovery/)** on existing hosts without additional installation

It also includes:

- **[Agent Fleet](/docs/fleet/fleet/)** – A centralized view of all the Sematext Agents installed throughout your infrastructure.
- **App Settings** – Configure App level settings such as retention, data access, integrations, and general preferences.

### Tools & Resources

- **[Custom Dashboards](/docs/dashboards/)** – Build and manage dashboards to visualize and aggregate your metrics using the Chart Builder.
- **Troubleshooting** – Tools and guidance to help diagnose log ingestion issues.
- **Documentation** – Direct access to relevant documentation, guides, and examples for working with your Monitoring App.

## Report Settings

Once you [create a Monitoring App](/docs/monitoring/quick-start/#creating-a-monitoring-app), and start your Agent, it will have a set of default [reports and components](/docs/monitoring/reports-and-components/). You can edit, clone and delete these reports or create new ones. You can also define [report variables](/docs/dashboards/report-variables/) to dynamically fiter and group data in a report.

![](/docs/images/monitoring/report-menu.png)

Based on what type of Monitoring Integration you chose, more reports get created by default. In this OpenSearch integration you can see three more reports are created by default.


