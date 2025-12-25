title: Setup OpenTelemetry with Sematext Cloud for Metrics and Logs
description: Complete guide for integrating OpenTelemetry metrics and logs with Sematext Cloud. Learn how to set up the Sematext Agent as an OpenTelemetry collector, configure SDK-specific instrumentation for Python, Go, Node.js, .NET, Java, Ruby, and PHP applications, and explore built-in dashboards, visualizations, and alert rules.

OpenTelemetry is an observability framework that helps you collect data from your applications and servers. It can gather logs, metrics, and traces in one place. Sematext Cloud works with OpenTelemetry to store and display this data.

This page explains how to integrate OpenTelemetry metrics and logs in your application and use the [Sematext Agent](/docs/agents/sematext-agent) to ship them to Sematext Cloud. With support for [OpenTelemetry Tracing](/docs/tracing/), you can collect metrics, logs, and traces in a single platform, making it easy to correlate data across your applications. This unified view helps you monitor performance, troubleshoot issues, detect anomalies, and connect logs to [events](/docs/events) such as deployments or restarts. Features like [Split Screen](/docs/guide/split-screen) and [Connected Apps](/docs/guide/connected-apps) allow side-by-side analysis of metrics, logs, and traces for faster and deeper root-cause investigation.

## Why use OpenTelemetry with Sematext Cloud?

With OpenTelemetry Logs and Metrics in Sematext Cloud, you can:

- Monitor your **applications as first-class entities**, not just the infrastructure they run on
- Track **application-level performance** such as request rates, latency, errors, and custom business metrics
- **Alert on application behavior**, not just resource usage
- **Correlate logs, metrics, and traces** to quickly understand what happened and why
- Connect telemetry with **events** like deployments or restarts to spot regressions faster

Below, you’ll find step-by-step instructions for setting up OpenTelemetry and configuring your applications to ship logs and metrics.
 
## Install Sematext Agent

- Create an OpenTelemetry Logs or Monitoring [App](/docs/guide/app-guide). This will let you install the agent and control access to your monitoring and logs data.
- Set up log and metrics exporting in your application. Follow the SDK-specific instructions provided in the UI. Choose your language and integrate OpenTelemetry metrics and logging into your code.
- Install the [Sematext Agent](/docs/agents/sematext-agent/releasenotes) using the instructions shown in the App creation flow. The Agent acts as an OpenTelemetry Collector and ships all observability signals collected by the OpenTelemetry SDKs to Sematext.

OpenTelemetry metrics and logging is supported in `Python`, `Node.js`, `.NET`, `Java`. The SDK setup instructions for these languages **are shown after you create an OpenTelemetry Logs or Monitoring App**.

After completing the SDK-specific setup, logs and metrics will begin flowing into your App. The following sections describe the available OpenTelemetry [metrics](/docs/integration/opentelemetry-monitoring) and [logs](/docs/integration/opentelemetry-logs) in Sematext Cloud, including built-in dashboards, visualizations, and alert rules.



