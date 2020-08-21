title: Kubernetes events
description: Explains how to control the event stream collector and available filters

Kubernetes events represent a valuable source of signals that might help during troubleshooting or can simply give insight into different cluster pieces. By default, Sematext Agent captures all the events produced by any Kubernetes resource type. However, you can fine-tune what events you would like to see in the event stream UI.

For example, if you would like to ignore persistent volume and service events, configure the following environment variable:

```
-e KUBERNETES_EVENTS_EXCLUDED=PersistentVolume,Service
```

The full list of resource types that you can exclude from event sources are:

- Container
- CronJob
- DaemonSet
- Deployment
- Job
- Pod
- ReplicaSet
- ReplicationController
- StatefulSet
- Endpoints
- Ingress
- Service
- ConfigMap
- Secret
- PersistentVolumeClaim
- StorageClass
- Volume
- VolumeAttachment
- Node
- Namespace
- PersistentVolume
- ServiceAccount
- Role
- Binding
- ClusterRole
- ClusterRoleBinding

### Namespace filter

Sematext Agent collects events from all existing namespaces. If you want to collect events from a specific namespace, set the `KUBERNETES_EVENTS_NAMESPACE` environment variable to the desired Kubernetes namespace.

### Disabling events

To completely disable the event collector set the `KUBERNETES_EVENTS_ENABLED` environment variable to `false`.
