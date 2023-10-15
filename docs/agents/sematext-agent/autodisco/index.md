title: Sematext Agent Service Discovery
description:   Service Discovery: Additional Configuration for Sematext Agent

For special cases, such as defining different sets of credentials in Kubernetes, additional steps are required to properly configure [service discovery](https://sematext.com/docs/monitoring/autodiscovery/).

- Defining monitoring agent [credential sets](./credential-sets) in Kubernetes
- Providing [MySQL JDBC driver](./mysql-driver) in container environments
- [JMX Attaching](https://sematext.com/docs/agents/sematext-agent/jmx-attaching/)
- [Removing stale](https://sematext.com/docs/agents/sematext-agent/autodisco/removing-stale-resources/) Sematext Agent resources after deinstallation
