title: Sematext Agent Release Notes
description: Features and improvements releases for Sematext Agent

Sematext Agent is a dynamic project with frequent releases. This Changelog contains only important changes, new features, and critical bug fixes.

<!-- Template:

Date: MM D, YYYY

# Version X.X.X

## New Features

NULL

## Improvements

NULL

## Bug Fixes

NULL

## Breaking Changes

NULL

## Deprecation Notice

NULL

## Packaging and Installation

NULL

-->

# Version 2.3.0

Date: June 6, 2023

## New Features

- MySQL logs parsing support: We have enhanced the log parsing capabilities of Sematext Agent with this update. Your log messages can now be parsed more effectively, leading to improved visibility and analysis.

## Improvements

- Improved container fields: Sematext Agent now provides more comprehensive fields for containers in Kubernetes. We have introduced the missing `container.type` field, allowing for better categorization of containers. Additionally, we have added the new `container.image.tag` field, providing valuable information about container images for improved management and identification.

## Bug Fixes

- Fixed an edge case for tracer to check network packets via eBPF: We have addressed an issue that previously prevented the tracer from effectively checking network packets via eBPF. This fix improves the functionality and reliability of the tracer, ensuring accurate monitoring of network traffic.
- Fixed nil pointer issue for MySQL and resolved broken portmatcher for MySQL: We have resolved a nil pointer issue that affected MySQL, eliminating potential errors and ensuring smooth operation. Additionally, we fixed a broken portmatcher specifically for MySQL, allowing for accurate monitoring and analysis of MySQL environments.
- Fixed connection issue to MongoDB: We have resolved an issue that caused connection problems to MongoDB.

## Packaging and Installation

- Introduced Beta version for Sematext Agent: We are pleased to introduce the Beta version of the Sematext Agent. This release is a testament to our commitment to providing you with a more stable and reliable product. We highly value your support and feedback as we continue to enhance and improve the agent. To opt for the Beta version, you can now install the `sematext-agent-beta` package instead of the standard `sematext-agent`. Please note that currently, the Beta version is only available for Debian and Ubuntu distributions.

# Version 2.2.0

Date: May 10, 2023

## New Features

- Introducing a new command to gather information about Kubernetes Cluster Roles: This new feature enables our agent to collect Cluster Roles and provide more useful information in Sematext Cloud.
- HTTPS support for OpenSearch and ElasticSearch: Sematext-Agent now supports both HTTP and HTTPS. The agent automatically detects whether HTTPS is available and uses it accordingly.

## Improvements

- Rewritten agent app logs to be under `st-agent`: The Sematext Agent logs are now displayed under `st-agent`, resulting in cleaner and more organized dashboards.
- Removed unnecessary errors from Fleet/Agent Errors page: We've cleaned up some noise from the Fleet/Agent Errors page to improve your monitoring experience.

## Bug Fixes

- Fixed ClickHouse discovery service signature: We have addressed an issue that caused some log files to not be selected.
- Fixed empty data for Infra info page: This fix resolves an issue with delayed data on the Infra info page.
- Fixed non-displayed HTTP request codes for Apache Logs: We have corrected our log field generator for this case, ensuring that all HTTP request codes are properly displayed.

# Version 2.1.0

Date: April 6, 2023

## New Features

- OpenSearch logs parsing support: With this update, we now parse fields of your log messages. We will also be releasing OpenSearch logs integration soon to enhance your logging experience.

## Improvements

- Additional Kubelet metrics: You can now collect a wider range of metrics from your Kubelet nodes, providing you with greater visibility into the health and performance of your Kubernetes cluster.
- Logging process improvements: We have made several enhancements to our logging process to reduce noise and simplify logs shown in Fleet.

## Bug Fixes

- Fixed missing Docker container memory issue: We have resolved the issue where the Docker container memory was not being properly displayed.
- Fixed missing `[]*types.ContainerInfo` issue: We have addressed the issue where `[]*types.ContainerInfo` was missing.
- Fixed JVM garbage collection detection: We have corrected the issue where the JVM GC logs were being identified as logs of another type.
- Fixed log shipping in Docker Swarm for some cases: We have resolved the issue where log shipping was not working properly for Docker Swarm.

## Packaging and Installation

- CentOS 9 package was released.

# Version 2.0.0

Date: March 8, 2023

## New Features

- OpenSearch auto-discovery support. Now you can easily start to collect the metrics of your OpenSearch services. Check [**OpenSearch Monitoring Integration**](https://sematext.com/integrations/opensearch/) for more information.
- StatefulSets and DaemonSets metrics collecting support.

## Bug Fixes

- Swarm housekeeping functionality.

## Breaking Changes

We added StatefulSets and DaemonSets metrics collection support. This new feature requires some additional cluster roles. If you're using Kubernetes and you installed the agent with `kubectl`, please update the clusterroles before upgrading your agent by running the following command:

```
kubectl apply -f https://sematext-installer.s3.amazonaws.com/sematext-clusterroles.yaml
```
