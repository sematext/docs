title: Fleet and Discovery Overview
description: Overview of Fleet and Discovery - Sematext Fleet & Discovery management panel

Fleet & Discovery are two major components of your infrastructure [monitoring](https://sematext.com/docs/monitoring/) and [log management](https://sematext.com/docs/logs/). Think of it as the eyes and ears of your entire infrastructure. They enable you to keep track of the health, performance, and configuration changes of your infrastructure. 

## Visibility Across Your Fleet
[Fleet](./fleet) offers you a centralized view of all the [Sematext Agents](https://sematext.com/docs/agents/sematext-agent/) installed across your infrastructure. It's a crucial component for a number of reasons:

- List all the hosts with installed Sematext Agents to get an overal view of your infrastructure
- Get valuable info from each host including host diagnostics, metrics, logs and events
- Check the health status of each agent and available updates
- Get a list of discovered services per host that can be further configured in Discovery

## Service and Logs Autodiscovery
[Discovery](./discovery) extends the capabilities of Fleet by automating the identification and categorization of services and collecting log data from different log sources. Main benefits:

- Centralized view with all the discovered services and their current setup with one or more Monitoring and Logs Integrations
- Discovered services that can be automatically monitored by one of the [supported integrations](https://sematext.com/docs/integration/), eliminating the manual effort of tracking and configuring services
- Automatic monitoring of newly discovered instances of a service something extremely useful in cluster and container environments
