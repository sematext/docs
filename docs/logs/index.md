title: Sematext Logs Documentation
description:  Cloud based SaaS logging as a service platform. Index machine data, search, correlate and investigate. Built in reports and dashboards with monitoring and alerting capabilities.

Sematext Logs is your team's modern log monitoring and alerting cloud solution.

You can collect logs from any part of your software stack, IoT devices, network hardware and much more. By using log shippers you centralize and index logs from all parts in one single place.  You can [send logs](/docs/logs/sending-log-events/) from infrastructure, containers, AWS, applications, custom events, syslogs, and much more.

Sematext is a cheaper [alternative to Datadog, Splunk, Logz.io, and other vendors](https://sematext.com/resources/industry-comparisons/). Sematext exposes an Elasticsearch and OpenSearch-compatible ingestion and query APIs for indexing and searching. Data can be sent to Sematext from virtually any source, format or location.

You can create [custom dashboards](/docs/dashboards) with real-time data that helps you understand important trends, spot new logs, troubleshoot application and infrastructure issues, etc.

[Searching logs](/docs/logs/searching-log-events) is easy with a Google-like [query syntax](/docs/logs/search-syntax). You can also turn all searches into real-time [alerts](/docs/alerts/) and automatically trigger notifications. Sematext Logs supports sending **alerts via [E-mail](/docs/integration/alerts-email-integration/), [Slack](/docs/integration/alerts-slack-integration/), [PagerDuty](/docs/integration/alerts-pagerduty-integration/)**, and [various other 3rd party integrations](/docs/integration/#alerts-notifications). Alerts can be triggered based on thresholds, trend-based conditions and other complex searches.

Sematext Logs has many [integrations](/docs/integration/) available. These integrations come with out-of-the-box dashboards and [alert rules](/docs/guide/alerts-guide/). Once you create a Logs App, select the environment to install the [Sematext Agent](/docs/agents/sematext-agent/). The Sematext Agent will discover all the available log sources within the installed host, where you can view all of them in the [Fleet & Discovery](/docs/logs/discovery/intro/) section. There are many other ways to ship logs to Sematext, but the simplest and recommended way is to configure shipping of discovered logs via the UI.

If you don’t see the integration you desire from the integrations list, select the [Generic Logs App](/docs/integration/generic-logs-integration/) to ship logs. From there, you can use [Logs Pipelines](/docs/logs/pipelines/) to structure your data and build custom reports with [Chart Builder](/docs/dashboards/chart-builder/). If you have any questions, we're here to help. Don't hesitate to contact us at support@sematext.com.

Note that [Logs Pipelines](/docs/logs/pipelines/) can be used in all types of Logs Apps to save costs. See [Reducing Log Monitoring Costs](/docs/logs/reduce-costs-with-pipelines/) and [Plan Recommendations](/docs/logs/plan-recommendations/) for more information.

## Creating a Logs App

After you get logged into Sematext Cloud at <https://apps.sematext.com> (or <https://apps.eu.sematext.com> if using Sematext Cloud Europe), the first step is to create a Logs App. An App is an independent namespace for your data. See [What is an App?](/docs/guide/app-guide/) for details.

For example, if you have a development and a production environment, it might make sense to have one App for each. You can create as many Apps as you want.

Follow along the [Quick Start](/docs/logs/quick-start) guide to learn how.

## App Settings

App's settings include, but are not limited to:

  - inviting new users to your App
  - [authorizing public IPs to send data to your app via syslog](/docs/logs/authorizing-ips-for-syslog)
  - adjusting data retention time, daily volume, and limits
  - [changing your App's plan](/docs/logs/faq/#plans-prices)
  - checking how much data is, or has been shipped to your App

Check out the [Settings](/docs/logs/settings) section for more info.

## Getting Support

We hope you enjoy using Sematext Infrastructure Monitoring and Log Management tools. If you need further support or have any feedback regarding our products, please don't hesitate to [contact us](mailto:support@sematext.com)! You can also contact / talk to us using chat widget at the bottom right corner of the page.
