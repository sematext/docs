title: Metrics Correlation
description: Correlate failed Synthetics monitor runs with infrastructure and service metrics.

The Metrics tab in the failed run flyout lists all Monitoring Apps [connected](/docs/guide/connected-apps/) to your Synthetics App. It gives you a direct path to the metrics of the services hosting your monitored endpoint, scoped to the time of the failure.

## Connecting a Monitoring App

If you don't have a Monitoring App yet, the Metrics section in the Troubleshoot tab will prompt you to create one and connect it to your Synthetics App automatically. If you already have Monitoring Apps in your account, you can select and connect the relevant one directly from the same tab.

We recommend using the [OpenTelemetry Metrics integration](/docs/integration/opentelemetry-monitoring/) — it produces structured, enriched telemetry that correlates well across signals and gives you more context when investigating failures.

If Sematext detects a known service on the monitored host, such as [Nginx](/docs/integration/nginx-integration/) or [Apache](/docs/integration/apache-integration/), it will also suggest creating a service-specific Monitoring App. These come with out-of-the-box dashboards and alerts tailored to that service, so you can start monitoring what matters immediately after installing the [Sematext Agent](/docs/agents/sematext-agent/) on your host.

## Using the Metrics Tab

Once a Monitoring App is connected, it appears in the Metrics tab when a monitor run fails.

![Metrics Tab - Connected Monitoring Apps](/docs/images/synthetics/root-cause-discovery/metrics-tab.png)

Click the App name to open it in a new tab. The Monitoring App opens with the time range pre-set to around the time of the failure. From there, check for anomalies that coincide with the failure:

- CPU and memory spikes
- Elevated error rates or dropped request counts
- Database connection pool exhaustion or high query latency
- Network throughput drops

## Further Reading

- [Monitoring overview](/docs/monitoring/)
- [OpenTelemetry Metrics integration](/docs/integration/opentelemetry-monitoring/)
- [Nginx integration](/docs/integration/nginx-integration/)
- [Apache integration](/docs/integration/apache-integration/)
- [Available integrations](/docs/integration/)
