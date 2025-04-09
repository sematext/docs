title: Sematext Agent Service Discovery
description:   Service Discovery: Additional Configuration for Sematext Agent

[Automatic Service Discovery](/docs/monitoring/autodiscovery/) and Monitoring is a key feature of [Sematext Cloud](https://sematext.com/cloud/). The Sematext Agent contains most of the key components needed to make service discovery work. In the majority of the cases, everything is taken care of automatically by the agent. However, for special cases, such as defining different sets of credentials in Kubernetes, additional steps are required to properly configure service discovery, as shown below:

- Defining monitoring agent [credential sets](/docs/agents/sematext-agent/autodisco/credential-sets) in Kubernetes
- Providing [MySQL JDBC driver](/docs/agents/sematext-agent/autodisco/mysql-driver) in container environments
- [JMX Attaching](/docs/agents/sematext-agent/jmx-attaching/)
- [Removing stale](/docs/agents/sematext-agent/autodisco/removing-stale-resources/) Sematext Agent resources after deinstallation

For more information about service discovery in Sematext, please refer to the [Fleet & Discovery](/docs/fleet/discovery) docs.
