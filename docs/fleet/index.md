title: Fleet and Discovery Overview
description: Overview of Fleet and Discovery - Fleet & Discovery management panel

Fleet & Discovery are two major components of your infrastructure [monitoring](https://sematext.com/docs/monitoring/) and [log management](https://sematext.com/docs/logs/). Think of them as the 'eyes and ears' of your entire infrastructure. They enable you to monitor the health, performance, and configuration changes of your infrastructure.

## Visibility Across Your Fleet
[Fleet](./fleet) provides a centralized view of all the [Sematext Agents](https://sematext.com/docs/agents/sematext-agent/) installed throughout your infrastructure, offering several key advantages:

- List all the hosts with installed Sematext Agents to get an overall view of your infrastructure
- Get valuable info from each host, including host diagnostics, metrics, logs and events
- Monitor the health status of each agent and check for available updates
- Access a list of discovered services per host, which can be further configured in Discovery

## Discovery - Service and Logs Autodiscovery
Discovery extends the capabilities of Fleet by automating the identification and categorization of services and collecting log data from various log sources. Below, you can explore some of the main benefits of Discovery:

- Centralized view of all the discovered services and their current configurations within one or more Monitoring and Logs Integrations
- Discovered services that can be automatically monitored through one of our [supported integrations](https://sematext.com/docs/integration/), eliminating the need for manual tracking and configuration
- Automatic monitoring of newly discovered service instances, which is extremely useful in cluster and container environments
- Automatic correlation between discovered services and logs using the [Connected Apps](https://sematext.com/docs/guide/connected-apps/) feature.

### Service Discovery
[Service Discovery](https://sematext.com/docs/monitoring/autodiscovery/) is powered by the [Sematext Agent](https://sematext.com/docs/agents/sematext-agent/) allowing for the automatic discovery and monitoring of services within your infrastructure without the need for additional configuration. Furthermore, it automatically correlates and configures discovered logs with each monitored service.

### Logs Discovery
[Logs Discovery](https://sematext.com/docs/logs/discovery/intro/) functions similarly to Service Discovery, with a distinct emphasis on the automated discovery, classification, and shipping of your infrastructure and application logs.