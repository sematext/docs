title: Sematext Agent Release Notes
description: Features and improvements releases for Sematext Agent

Sematext Agent is a dynamic project with frequent releases. This Changelog contains only important changes, new features, and critical bug fixes.

<!-- Template:

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

# Version 2.2.0

## New Features

- SC-15689 Introducing a new command to gather information about Kubernetes Cluster Roles: This new feature enables our agent to collect Cluster Roles and provide more useful information in Sematext Cloud.
- SC-13098 HTTPS support for OpenSearch and ElasticSearch: Sematext-Agent now supports both HTTP and HTTPS. The agent automatically detects whether HTTPS is available and uses it accordingly.

## Improvements

- SC-15905 Rewritten agent app logs to be under `st-agent`: The Sematext Agent logs are now displayed under `st-agent`, resulting in cleaner and more organized dashboards.
- SC-14375 Removed unnecessary errors from Fleet/Agent Errors page: We've cleaned up some noise from the Fleet/Agent Errors page to improve your monitoring experience.

## Bug Fixes

- SC-15754 Fixed ClickHouse discovery service signature: We have addressed an issue that caused some log files to not be selected.
- SC-16064 Fixed empty data for Infra info page: This fix resolves an issue with delayed data on the Infra info page.
- SC-16072 Fixed non-displayed HTTP request codes for Apache Logs: We have corrected our log field generator for this case, ensuring that all HTTP request codes are properly displayed.

# Version 2.1.0

## New Features

- SC-14822 OpenSearch logs parsing support: With this update, we now parse fields of your log messages. We will also be releasing OpenSearch logs integration soon to enhance your logging experience.

## Improvements

- SC-14963 Additional Kubelet metrics: You can now collect a wider range of metrics from your Kubelet nodes, providing you with greater visibility into the health and performance of your Kubernetes cluster.
- SC-15285 Logging process improvements: We have made several enhancements to our logging process to reduce noise and simplify logs shown in Fleet.

## Bug Fixes

- SC-15581 Fixed missing Docker container memory issue: We have resolved the issue where the Docker container memory was not being properly displayed.
- Fixed missing `[]*types.ContainerInfo` issue: We have addressed the issue where `[]*types.ContainerInfo` was missing.
- SC-12977 Fixed JVM garbage collection detection: We have corrected the issue where the JVM GC logs were being identified as logs of another type.
- SC-15891 Fixed log shipping in Docker Swarm for some cases: We have resolved the issue where log shipping was not working properly for Docker Swarm.

## Packaging and Installation

- SC-15761 CentOS 9 package was released.

# Version 2.0.0

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
