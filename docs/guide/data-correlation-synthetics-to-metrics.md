title: How to Troubleshoot with Synthetics-to-Metrics Correlation
description: Discover how to correlate Sematext Synthetics with infrastructure and service metrics to uncover the root causes behind slow responses and failed checks for faster, data-driven troubleshooting.

[Synthetic Monitoring](/docs/synthetics/) helps you detect performance degradation and availability issues from an external user’s point of view. But when a website or API starts responding slowly or fails altogether, synthetic checks can only tell you what the symptoms are, not what’s causing them when the problem stems from the underlying backend services or infrastructure.

This is where **backend service and infrastructure metrics** come in. By correlating Synthetics data with infrastructure or service-level metrics, you can identify whether the issue is related to high CPU usage, memory pressure, slow disk I/O, container restarts, degraded dependencies, slow DB queries, etc. In Sematext, synthetics check results and backend metrics can be connected and visualized together for faster root cause analysis without switching tools.

In this article, we’ll show you how to connect the dots between failed synthetic checks and metrics data to get to the _why_ behind the _what_.

## A Typical Use Case: Slow Website Response

You’re monitoring your public website using a [Browser Monitor](/docs/synthetics/browser-monitor/).

- You receive an alert that page load times have increased beyond your set threshold.
- You open the [Synthetics App](/docs/synthetics/) and confirm that the check results show a growing trend in total page load time and backend time.
- To investigate further, you switch to your connected [Infra Monitoring App](/docs/monitoring/infrastructure/) or open it in [Split Screen](/docs/guide/split-screen/) and look at system level metrics for the backend host serving the website.
- In the exact timeframe of the performance degradation, you spot a spike in CPU usage and also notice that the host has been running close to memory limits.

These resource metrics suggest the host is under pressure, potentially explaining the slow page loads captured by Synthetics.

TO DO: VIDEO HERE

## Another Use Case: API Timeout During Synthetic Check

- You receive an alert that one of your [HTTP Monitors](/docs/synthetics/http-monitor/), which is monitoring your /auth endpoint, has started failing.
- Upon reviewing the run details, you see that the failures are caused by timeout errors.
- You switch to your [Service Monitoring App](/docs/monitoring/service-monitoring/) or open it in [Split Screen](/docs/guide/split-screen/) for the authentication service.
- Looking at metrics, you notice that during the failure window, the database latency metric spiked, and the number of open connections dropped, indicating a problem in the DB layer.
- Further investigation shows a spike in container restarts due to OOM events, confirming the service wasn’t healthy at the time the synthetic checks failed.

TO DO: VIDEO HERE

## What You Need in Sematext Cloud to Catch These Issues

To troubleshoot effectively from Synthetics to Metrics, you’ll need:

- A [Synthetics App](/docs/synthetics/) set up to monitor websites, APIs, or user journeys.
- A [Monitoring App](/docs/monitoring/) that collects system or service-level metrics from your backend infrastructure or services.
- [Connected Apps](/docs/guide/connected-apps/), which make it easier to open related data in [Split Screen](/docs/guide/split-screen/) and explore correlations visually.

[Sematext Agent] is the easiest way to collect system and service metrics. It works across hosts, containers, Kubernetes, and VMs, and supports auto-discovery of services like [OpenSearch](/docs/integration/opensearch-integration/), [Solr](/docs/integration/solr-integration/), [Elasticsearch](/docs/integration/elasticsearch-integration/), [Apache](/docs/integration/apache-integration/), [Nginx](/docs/integration/nginx-integration/), [PostgreSQL](/docs/integration/postgresql-integration/), [Redis](/docs/integration/redis/), [Kafka](/docs/integration/kafka/), and [many others](/docs/integration/). These integrations come with out-of-the-box dashboards and alerts, no extra config required.

## Final Thoughts

Synthetics alert you when there’s a problem, but metrics show you _what’s breaking down under the hood_. By correlating these two in Sematext, you get a much clearer picture of system health and user-facing performance.

This saves valuable time during outages, and helps you avoid future incidents by identifying systemic bottlenecks.

Want to learn more? Check out the [Root Cause Discovery guide](/docs/synthetics/root-cause-discovery/overview/).

