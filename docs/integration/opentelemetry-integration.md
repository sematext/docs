Title: OpenTelemetry Logs
Description: Complete guide for integrating OpenTelemetry metrics and logs with Sematext Cloud. Learn how to set up the Sematext Agent as an OpenTelemetry collector, configure SDK-specific instrumentation for Python, Go, Node.js, .NET, Java, Ruby, and PHP applications, and explore built-in dashboards, visualizations, and alert rules.

OpenTelemetry is an observability framework that helps you collect data from your applications and servers. It can gather logs, metrics, and traces in one place. Sematext Cloud works with OpenTelemetry to store and display this data.

This page explains how to integrate OpenTelemetry metrics and logs in your application and how to use the [Sematext Agent](/docs/agents/sematext-agent) to ship logs and metrics from the application that's been instrumented with OpenTelemetry to Sematext Cloud. With the support for [OpenTelemetry Tracing](todo:link to tracing), you will be collecting metrics, logs, and traces in a single platform, giving you the ability to correlate them easily and understand how metrics trends, log events, and traces relate to each other across your applications.

With logs, you can monitor your applications and infrastructure, troubleshoot issues faster, detect anomalies, and connect logs to [events](/docs/events) such as deployments or restarts. Metrics provide insights into system and application performance, while traces let you analyze request flows and latency across services. Together, they give you the full picture in one platform. Features like [Split Screen](/docs/guide/split-screen) and [Connected Apps](/docs/guide/connected-apps) in Sematext Cloud let you view and correlate this data side by side for faster and deeper root-cause analysis.
 
# Install Sematext Agent

- Create an OpenTelemetry Logs or Monitoring [App](/docs/guide/app-guide). This will let you install the agent and control access to your monitoring and logs data.
- Set up log and metrics exporting in your application. Follow the SDK-specific instructions provided in the UI. Choose your language and integrate OpenTelemetry metrics and logging into your code.
- Install the [Sematext Agent](/docs/agents/sematext-agent/releasenotes) using the instructions shown in the App creation flow. The Agent works as an OpenTelemetry collector and ships logs from your application that has been instrumented with an OpenTelemetry SDKs to Sematext Cloud.

> OpenTelemetry metrics and logging is supported in `Python`, `Go`, `Node.js`, `.NET`, `Java`, `Ruby`, and `PHP`. The SDK setup instructions for these languages are shown after you create an OpenTelemetry Logs App.

# Metrics
Explain zero-code vs manual instrumentation here
Explain why zero-code is not supported in the instructions for some SDKs yet.
## Zero-code metrics
list zero code metrics
.........
.........
Explain the importance of matching zero code metrics if they choose manual instrumentation in order to benefit from out-of-the-box reports and alert rules

## Reports

Explain the SDK generic report and language specific reports and why.

### Service Health Report

### Performance Summary Report

### Cross-Service Report

### Client Performance Report

### Database Performance Report

### Java-specific JVM Runtime Report

### Java-specific Memory Analysis Report

### Java-specific System Resource Report

### .Net-specific CPU & Memory Report

### .Net-specific Garbage Collection Report

### .Net-specific Asembly & Exceptions Report

### Python-specific CPython Runtime Report

### Python-specific Memory Management Report

### Python-specific System Performance Report

### Python-specific Process Analysis Report

## Default Metric Alerts

# Logs

Explain zero-code vs manual instrumentation.
Explain why zero-code is not supported in the instructions for some SDKs yet.
## Standard Info Added Automatically

After following the SDK-specific instructions, your logs will automatically have useful metadata in every log.

Common fields include:

- `service.name` - Your applications's name
- `service.version` - Your applications's version
- `deployment.environment` - Where it's running (dev, prod, etc.)
- `os.host` - Server name
- `container.name` - Docker container name
- `trace.id` and `span.id` - Identifiers that connect a log entry with a specific trace or span. These fields are useful because they allow you to start from a trace or span and then find the related logs to see detailed context about what happened during that request.

Once data is in, you can explore it via the built-in reports:

## Overview Report

Overview report provides a view of your system's state/status/health with visual analytics including total log counts, severity distribution (info, warning, error, debug, trace), SDK breakdown, service-by-service activity monitoring, host distribution analysis, and timeline visualizations showing activity patterns over time. You can drill down from these visualizations to investigate issues and understand how your system behaves across services and environments.

![OTEL Logs Overview](/docs/images/integrations/otel-logs-overview.png)

## Explore Report

![OTEL Logs Explore](/docs/images/integrations/otel-logs-explore.png)

Explore report lets you see raw logs in the Logs Table. Here you can use [Quick Actions](/docs/logs/logs-table-quick-actions/) such as creating alerts, adding logs to dashboards, or applying filters. You can save common queries as [Saved Views](/docs/guide/saved-views/) for faster access later. You can also correlate logs with Events such as deployments, scaling actions, or configuration changes to understand when and why issues started. This makes troubleshooting faster because you can connect changes in your system directly with the log activity they caused.

## Default Log Alerts

Moreover, the pre-configured [alert rules](/docs/guide/alerts-guide) will notify you about:

- **Anomaly alerts**: Alerts when there are abnormal spikes in error and warning logs
- **Service Heartbeat Alert**: Alerts when a service stops sending logs for an extended period, indicating the service may have crashed, been terminated, or lost connectivity.
- **Infrastructure Resource Exhaustion Alert**: Alerts on critical resource exhaustion events by detecting keywords indicating system limits have been reached. Triggers immediately on memory, disk, or connection pool depletion to enable rapid intervention before complete service failure.
- **Authentication Attack Detection Alert**: Alerts on potential brute force or credential stuffing attacks by monitoring failed authentication attempts.
- **Database Connectivity Issues**: Alerts on database connection problems and query failures that could indicate database server issues, network problems, or connection pool exhaustion. Early detection prevents cascading application failures when database connectivity is degraded.

# Event Correlation

Sending [events](/docs/events/) to Sematext Cloud alongside your OpenTelemetry logs helps you understand the context behind changes in your system. Events can include deployments, service restarts, configuration changes, scaling actions, or other operational milestones. By correlating these events with logs, you can quickly identify the root cause of issues and see how system activity aligns with key changes.

We recommend using the [Sematext API](/docs/events/adding/) to send events whenever these operational changes occur. Include key metadata such as environment and version.

This enables you to:
- Quickly determine if a spike in error logs corresponds with a recent deployment or configuration change.
- Investigate issues by checking whether log patterns align with operational events.
- Understand trends in your system by visualizing event-driven log activity over time.

For example, if an error surge happens after a new release, the event log helps you immediately pinpoint the deployment responsible, reducing troubleshooting time and helping maintain system reliability.

Once your events are in Sematext Cloud, you can view them by toggling on the Events heatbar in your OpenTelemetry Logs App’s Explore report. Hovering over the heatbar shows the number of events that occurred within a specific timeframe. Clicking on a section opens a flyout where you can see detailed event information and directly correlate with your logs.

The recording below shows how events can help when you receive an anomaly alert about a sudden spike in errors in your logs.
- Filter for errors in your OpenTelemetry Logs App
- Toggle on the Events heatmap to see recent changes
- Notice two new events in the last few minutes
- Open the details and see a deployment that likely caused the spike

![OTel Logs Events Correlation](/docs/images/integrations/otel-logs-events-correlation.gif)

# Troubleshooting

If you have trouble sending logs or metrics, try out the latest version of [Sematext Agent](/docs/agents/sematext-agent/installation/). Also, make sure Sematext Agent is configured to send logs and metrics to your OpenTelemetry Logs or Monitoring App. 
