title: OpenTelemetry
description: Complete guide for integrating OpenTelemetry metrics and logs with Sematext Cloud. Learn how to set up the Sematext Agent as an OpenTelemetry collector, configure SDK-specific instrumentation for Python, Go, Node.js, .NET, Java, Ruby, and PHP applications, and explore built-in dashboards, visualizations, and alert rules.

OpenTelemetry is an observability framework that helps you collect data from your applications and servers. It can gather logs, metrics, and traces in one place. Sematext Cloud works with OpenTelemetry to store and display this data.

This page explains how to integrate OpenTelemetry metrics and logs in your application and how to use the [Sematext Agent](/docs/agents/sematext-agent) to ship logs and metrics from the application that's been instrumented with OpenTelemetry to Sematext Cloud. With the support for [OpenTelemetry Tracing](/docs/tracing/), you will be collecting metrics, logs, and traces in a single platform, giving you the ability to correlate them easily and understand how metrics trends, log events, and traces relate to each other across your applications.

With logs, you can monitor your applications and infrastructure, troubleshoot issues faster, detect anomalies, and connect logs to [events](/docs/events) such as deployments or restarts. Metrics provide insights into system and application performance, while traces let you analyze request flows and latency across services. Together, they give you the full picture in one platform. Features like [Split Screen](/docs/guide/split-screen) and [Connected Apps](/docs/guide/connected-apps) in Sematext Cloud let you view and correlate this data side by side for faster and deeper root-cause analysis.
 
## Install Sematext Agent

- Create an OpenTelemetry Logs or Monitoring [App](/docs/guide/app-guide). This will let you install the agent and control access to your monitoring and logs data.
- Set up log and metrics exporting in your application. Follow the SDK-specific instructions provided in the UI. Choose your language and integrate OpenTelemetry metrics and logging into your code.
- Install the [Sematext Agent](/docs/agents/sematext-agent/releasenotes) using the instructions shown in the App creation flow. The Agent works as an OpenTelemetry collector and ships logs from your application that has been instrumented with an OpenTelemetry SDKs to Sematext Cloud.

OpenTelemetry metrics and logging is supported in `Python`, `Node.js`, `.NET`, `Java`. The SDK setup instructions for these languages **are shown after you create an OpenTelemetry Logs or Monitoring App**.

After completing the SDK-specific setup, logs and metrics will begin flowing into your App. The following sections describe the available OpenTelemetry [metrics](/docs/integration/opentelemetry-monitoring) and [logs](/docs/integration/opentelemetry-logs) in Sematext Cloud, including built-in dashboards, visualizations, and alert rules.



