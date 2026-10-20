title: Service Monitoring
description: Explore service connections and API traffic with Network Map and API Radar

Service Monitoring brings network topology and API traffic into the same workspace. Use **Network** to see how services and infrastructure communicate, and **API Radar** to inspect the endpoints those services expose or call.

## Why use it

- **Find dependencies.** Network Map shows observed connections between services, hosts, and Kubernetes workloads.
- **Find slow or failing endpoints.** API Radar shows request volume, server errors, and response-time percentiles by endpoint.
- **Get alerted about API issues.** Use [API Radar alert rules](api-radar/thresholds-alerts.md) for elevated server errors, slow responses, upcoming certificate expiry, and missing Authorization headers. Configure notification recipients to receive alerts identifying the affected service and endpoint.
- **Discover services and API endpoints automatically.** Install Sematext Agent on your hosts to discover services, network connections, and API endpoints as traffic is observed, without configuring each service or endpoint separately.
- **Review transport security.** Inspect observed HTTPS usage and discovered certificate validity.
- **Move between API and network context.** Open an endpoint's network context or inspect a service from either feature.

![Navigating between Network and API Radar in Service Monitoring](../images/service-monitoring/api-radar-network-map-navigation.gif)

## Network

Open **Service Monitoring → Network**. The **Map** has Services and Infrastructure views. **Services**, **Kubernetes**, **Hosts**, and **Connections** provide tabular views of the discovered topology.

See [Network Map](../network-map/index.md) for topology, filtering, thresholds, and supported service types.

## API Radar

Open **Service Monitoring → API Radar**. Start with [Services Overview](api-radar/services-overview.md), inspect individual [Endpoints](api-radar/endpoints.md), manage [Ignored Endpoints](api-radar/ignored-endpoints.md), or review [SSL Certs](api-radar/ssl-certificates.md).

See [API Radar](api-radar/index.md) for endpoint metrics and investigation workflows.

## Getting started

See [Getting Started](getting-started.md) for requirements and verification. Network and API Radar have different minimum Sematext Agent versions; a host reporting topology does not necessarily report API traffic.

