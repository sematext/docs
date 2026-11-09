title: Getting Started with Service Monitoring
description: Prepare your hosts and verify network topology and API traffic in Service Monitoring

Service Monitoring uses an [Infra App](/docs/monitoring/infrastructure/) and [Sematext Agent](/docs/agents/sematext-agent/installation/) on the hosts you want to observe. For Kubernetes, deploy the agent on the worker nodes whose workloads you want to monitor.

## Requirements

| Feature | Minimum Sematext Agent version |
|---|---|
| Network Map | 4.5.2 |
| API Radar | 4.6.0 |

See the [Network Map setup guide](../network-map/getting-started.md) for network collection requirements and enabling topology collection. API Radar shows an outdated-agent banner when monitored hosts need an agent update. Use [Go to Fleet](/docs/fleet/fleet/) to identify those hosts.

<!-- Release check: confirm API Radar activation, supported platforms/kernels/protocols, TLS library coverage, and whether API collection needs a separate setting. -->

## Verify network data

Open **Service Monitoring → Network → Map**. Check that services and their connections appear. Switch to **Services**, **Kubernetes**, **Hosts**, or **Connections** to inspect the same topology in tables.

If data is missing, see [Network Map Troubleshooting](../network-map/troubleshooting.md).

## Verify API data

1. Open **Service Monitoring → API Radar → Services Overview**.
2. Select a time range containing traffic to the service you want to inspect.
3. Open **Endpoints** and find a method and path for that service.
4. Select the endpoint and inspect its request volume, observation status, and available metrics.

## Next steps

- Explore the [Network Map](../network-map/index.md) to understand service dependencies and infrastructure connections.
- Use [Network tables](../network-map/tabular-views.md) to inspect services, Kubernetes workloads, hosts, and connections.
- Review [API Radar Services Overview](api-radar/services-overview.md) to find services and endpoints requiring attention.
- Investigate request volume, latency, and errors in [Endpoints](api-radar/endpoints.md).
- Manage [Ignored Endpoints](api-radar/ignored-endpoints.md) and review [SSL Certificates](api-radar/ssl-certificates.md).
