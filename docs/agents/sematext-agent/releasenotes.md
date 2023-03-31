title: Sematext Agent Release Notes
description: Features and improvements releases for Sematext Agent

Sematext Agent is a dynamic project with frequent releases. This Changelog contains only important changes, new features, and critical bug fixes.

<!-- Template:

# Version X.X.X

## New Features

- 

## Bugfixes

- 

## Breaking Changes

NULL

## Deprecation Notice

NULL

## Packaging and Installation

NULL

-->

# Version 2.0.0

## New Features

- OpenSearch auto-discovery support. Now you can easily start to collect the metrics of your OpenSearch services. Check [**OpenSearch Monitoring Integration**](https://sematext.com/integrations/opensearch/) for more information.
- StatefulSets and DaemonSets metrics collecting support.

## Bugfixes

- Swarm housekeeping functionality.

## Breaking Changes

We added StatefulSets and DaemonSets metrics collection support. This new feature requires some additional cluster roles. If you're using Kubernetes and you installed the agent with `kubectl`, please update the clusterroles before upgrading your agent by running the following command:

```
kubectl apply -f https://sematext-installer.s3.amazonaws.com/sematext-clusterroles.yaml
```
