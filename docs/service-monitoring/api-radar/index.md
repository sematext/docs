title: API Radar
description: Discover observed API endpoints and inspect request traffic, errors, latency, and SSL certificates

API Radar shows the API traffic observed by Sematext Agent across your services. Find endpoints by service, method, and path, compare request volume and response-time percentiles, and inspect server errors and certificate information.

Open **Service Monitoring → API Radar**. API Radar requires **Sematext Agent 4.6.0 or later**; see [Getting Started](../getting-started.md).

## Why use it

- **See which endpoints receive traffic.** Browse observed methods and paths without maintaining a separate endpoint inventory by hand.
- **Find slow operations.** Compare p50, p95, and p99 response times and inspect their trends.
- **Investigate errors.** Review server error counts alongside the response status distribution.
- **Get alerted when endpoints need attention.** Configure [alert rules](thresholds-alerts.md) for increased error rates, high latency, missing Authorization headers, or upcoming certificate expiry.
- **Check visibility and security signals.** Review observation coverage, HTTPS, observed authentication headers, and certificates.
- **Reduce noise.** Manage health checks and other unwanted entries through Ignored Endpoints.

![API Radar Services Overview with service traffic and endpoint error rates](../../images/service-monitoring/api-radar/api-radar-services-overview.png)

## How to investigate

Start with [Services Overview](services-overview.md) to find a service driving traffic or errors. Open [Endpoints](endpoints.md), select an operation, and inspect its time series and status codes. Click [Open in Network Map](../../network-map/index.md) to see which services the selected service communicates with and where it runs, including its hosts or Kubernetes workloads.

API Radar discovers endpoints from observed traffic. An endpoint may not appear if it received no requests during the selected time range.

## In this section

- [Services Overview](services-overview.md) - account-level API traffic and services requiring attention
- [Endpoints](endpoints.md) - filtering, metrics, observation status, and endpoint details
- [Ignored Endpoints](ignored-endpoints.md) - managing entries and path-based ignore rules
- [SSL Certificates](ssl-certificates.md) - validity, expiry, and certificate details
- [Thresholds & Alerts](thresholds-alerts.md) - visual thresholds and notification configuration
- [Coming Soon](coming-soon.md) - Spec Discovery and Quality & Ownership
