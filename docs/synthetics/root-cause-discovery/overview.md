title: Root Cause Discovery
description: Correlate failed Synthetics monitor runs with metrics, logs, and traces to find the backend cause of failures.

When a Synthetics monitor run fails, the run details flyout shows a **Troubleshoot** tab with **Metrics**, **Logs**, and **Traces** sections. These sections will prompt you to create or connect Tracing, Logs, and Monitoring Apps. Once connected, each section surfaces the backend data around the time of the failure that explains *why* the monitor failed: with metrics you can check CPU usage, memory, and request rates; with logs you can see error messages and warnings from your application; with traces you can follow the full request journey and identify which service or database call caused the problem. There are multiple ways to set this up and correlate data, all explained in detail in the sections below.

## Traces

Connect a [Tracing App](/docs/tracing/). Instrument your services with [OpenTelemetry](/docs/tracing/getting-started/) and traces will appear automatically when a monitor hits an instrumented endpoint. With distributed traces you can see exactly where time was spent across your services, identify slow database queries, service timeouts, or errors propagating across microservices.

[Traces correlation →](/docs/synthetics/root-cause-discovery/traces-correlation/)

## Logs

Connect a [Logs App](/docs/logs/). We recommend shipping logs via [OpenTelemetry](/docs/integration/opentelemetry-logs/) for the same reasons — structured, enriched telemetry that correlates well across signals and gives you more context when investigating failures. In addition, if we detect a known service on the monitored host, such as [Nginx](/docs/integration/nginx-integration/) or [Apache](/docs/integration/apache-integration/), we will suggest creating a dedicated Logs App for that service. These come with out-of-the-box dashboards and alerts tailored to each service, so you can start collecting the logs that matter immediately after installing the [Sematext Agent](/docs/agents/sematext-agent/) on your host. 

[Logs correlation →](/docs/synthetics/root-cause-discovery/logs-correlation/)

## Metrics

Connect a [Monitoring App](/docs/monitoring/). We recommend shipping metrics via [OpenTelemetry](/docs/integration/opentelemetry-monitoring/) — it produces structured, enriched telemetry that correlates well across signals and gives you more context when investigating failures. Similar to logs, if we detect a known service running on the monitored host, we will suggest creating a dedicated Monitoring App for that service.

[Metrics correlation →](/docs/synthetics/root-cause-discovery/metrics-correlation/)

## Adding a Trace ID to Response Headers

Once connected, a failed monitor run gives you metrics from the host, logs from the service, and the full distributed trace for the request, all filtered to the moment of failure. For your **OpenTelemetry Logs and Tracing Apps**, you can take correlation a step further by adding a trace ID to your HTTP response headers:

- **Without trace ID** — results are filtered by URL and time window, which may include logs or traces from unrelated requests happening at the same time
- **With trace ID** — Sematext matches the trace ID from the response header directly against your OpenTelemetry logs and traces, filtering to the exact request that failed with no noise

The trace ID comes from your existing OpenTelemetry instrumentation. The change is small: read the active span's trace ID in your request handler and write it to a response header. See [Adding a Trace ID to Response Headers](/docs/synthetics/root-cause-discovery/adding-trace-id-to-response-headers/).

## Getting the Most Out of Root Cause Discovery

Connecting Monitoring, Logs, and Tracing Apps to your Synthetics App gives you the full picture when a monitor fails:

- **Metrics** show whether the failure coincided with resource exhaustion, a traffic spike, or a drop in service health
- **Logs** show what your application was reporting at the time, including errors, warnings, and application-level events
- **Traces** show the full request path through your backend services, pinpointing which service call was slow or failed

Used together, these three data types significantly reduce the time it takes to go from a failed monitor run to the underlying cause.
