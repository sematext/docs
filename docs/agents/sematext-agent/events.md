title: Sematext Agents Events

Below you can find a list of all the events sent from Sematext Agent

## Agent started

This event is sent when the agent is started.

Message: agent_started sematext-agent `version` / on `hostname`

## Agent stopped

This event is sent when the agent is stopped.

Message: agent_stopped sematext-agent `version` / on `hostname`

## Out of memory (OOM)

This event is sent when a process is terminated by OOM Killer.

Message: `process name` process with pid `pid` terminated by OOM killer. Total allocated memory `N` bytes

## Package installed 

This event is sent when a new package is installed (Linux only).

Message: Package `package name`, version `version` has been installed on host `hostname`

Package types supported: Node, Python 2.x/3.x, Deb, RPM

## Package removed

This event is sent when a new package is removed (Linux only).

Message: Package `package name`, version `version` has been removed on host `hostname`

Package types supported: Node, Python 2.x/3.x, Deb, RPM

## Docker events

All docker events sent by the Sematext Agent include the [Docker Events Tags](https://sematext.com/docs/tags/common-schema/#docker-event-tags) as defined in Sematext Common Schema.

Sematext Agent sends supports all events from various docker object types, including containers, images, plugins, volumes, networks, daemons, services, nodes, secrets and configs. Learn more about all the available docker events at: https://docs.docker.com/reference/cli/docker/system/events/.

All docker events start with `Docker Event: ` in the message field. `container.status` tag gives the docker status of the event, e.g `exec_start`, `exec_create`, `exec_died`.

## Kubernetes events

Kubernetes events from all Kubernetes objects are supported, including: Nodes, Pods, Deployments, StatefulSets, DaemonSets, Jobs, CronJobs, ReplicaSets, ConfigMaps, Services, Persistent volumes and more.

All Kubernetes events sent by the Sematext Agent include the [Kubernetes Events Tags](https://sematext.com/docs/tags/common-schema/#kubernetes-event-tags) as defined in Sematext Common Schema.

You can get a list of all Kubernetes events supported in your cluster by executing the following command:

```
kubectl get events
```

or to list all the events in a specified namespace, execute the command:

```
kubectl get events -n <namespace>
```
