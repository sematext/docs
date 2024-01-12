title: Sematext Logs Documentation
description:  Cloud based SaaSlogging as a service platform. Index machine data, search, correlate and investigate. Build in reports and dashboards with monitoring and alerting capabilities.

Sematext Logs is a **Log Management-as-a-service**. Think of it as your own **central location for logs** in the cloud.

You can collect logs from any part of your software stack, IoT devices, network hardware and much more. By using log shippers you centralize and index logs from all parts in one single place, [Sematext Logs](../logs).

[Sematext Logs](../logs) supports [sending logs](../logs/sending-log-events/) from infrastructure, containers, AWS, applications, custom events, and much more, all through an Elasticsearch API or Syslog.

It's a cheaper [alternative to Splunk or Logz.io](https://sematext.com/resources/industry-comparisons/). You can **use Sematext Logs as your own Hosted Elasticsearch** since it exposes an Elasticsearch API for indexing and searching. Data can be indexed from virtually any source, format or location.

You can create [custom dashboards](../dashboards) with real-time data that helps you understand important trends, summarize top values and view the frequency of conditions.

[Searching logs](./searching-log-events/) is easy with a Google-like [query syntax](./search-syntax). You can also turn all searches into real-time [alerts](../alerts/) and automatically trigger notifications. Sematext Logs supports sending **alerts via [E-mail](https://sematext.com/docs/integration/alerts-email-integration/), [Slack](https://sematext.com/docs/integration/alerts-slack-integration/), [PagerDuty](https://sematext.com/docs/integration/alerts-pagerduty-integration/)**, and [various other 3rd party integrations](https://sematext.com/docs/integration/#alerts-notifications). Alerts can be triggered based on thresholds, trend-based conditions and other complex searches.

Sematext Logs has many [integrations](https://sematext.com/docs/integration/) available, and these integrations come with out-of-the-box dashboards and [alert rules](https://sematext.com/docs/guide/alerts-guide/). Once you create a Logs App, select the environment to install the [Sematext Agent](https://sematext.com/docs/agents/sematext-agent/). The Sematext Agent will discover all the available log sources within the installed host, where you can view all of them in the [Fleet & Discovery](https://sematext.com/docs/logs/discovery/intro/) section. There are many other ways to ship logs to Sematext Cloud, but the simplest and recommended way is to ship logs via initial agent setup and navigate to Discovery.

If you don’t see the integration you desire from the integrations list, select the [Generic Logs App](https://sematext.com/docs/integration/generic-logs-integration/) to ship logs. From there, you can use [Logs Pipelines](https://sematext.com/docs/logs/pipelines/) to structure your data and build custom reports with [Chart Builder](https://sematext.com/docs/dashboards/chart-builder/). If you have any questions, we're here to help. Don't hesitate to contact us at support@sematext.com.

Note that [Logs Pipelines](https://sematext.com/docs/logs/pipelines/) can be used in all types of Logs Apps to save costs. See [Reducing Log Monitoring Costs](https://sematext.com/docs/logs/reduce-costs-with-pipelines/) and [Plan Recommendations](https://sematext.com/docs/logs/plan-recommendations/) for more information.

## Creating a Logs App

After you get logged into Sematext Cloud at <https://apps.sematext.com> (or <https://apps.eu.sematext.com> if using Sematext Cloud Europe), the first step is to create a Logs App. An App is an independent namespace for your data.

For example, if you have a development and a production environment, it might make sense to have one App for each. You can create as many Apps as you want.

Follow along the [Quick Start](./quick-start) guide to learn how.

## App Settings

App's settings include, but are not limited to:

  - inviting new users to your App
  - [authorizing public IPs to send data to your app via syslog](../logs/authorizing-ips-for-syslog)
  - adjusting data retention time, daily volume, and limits
  - [changing your App's plan](../logs/faq/#plans-prices)
  - checking how much data is, or has been shipped to your App

Check out the [Settings](./settings) section for more info.

## Getting Support

We hope you enjoy using Sematext Infrastructure Monitoring and Log Management tools. If you need further support or have any feedback regarding our products, please don't hesitate to [contact us](mailto:support@sematext.com)! You can also contact / talk to us using chat widget at the bottom right corner of the page.
