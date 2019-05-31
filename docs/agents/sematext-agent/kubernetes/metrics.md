title: Kubernetes Metrics
description: Kubernetes Metrics captured by Sematext Agent, pods, deployments, nodes

## Kubernetes metrics

Sematext Agent seamlessly integrates with Kubernetes and cooperates with its leader election mechanism to elect one instance of the agent that is responsible for querying the API server and gathering the metrics. The list of supported metrics is summarized in the next section.

## Global metrics

| Metric name           | Description |
| ----------------------|-------------|
| number of nodes       | Represents the total nodes in the cluster |
| number of pods        | The total number of pods scheduled across nodes |   
| number of deployments | The total number of deployments in the cluster |

## Pod metrics

| Metric name           | Description |
| ----------------------|-------------|
| pod restarts          | Represents the number of times particular pod has been restarted |
| container count       | Is the number of containers grouped inside the pod |   
| succeeded pods        | Represents the number of pods that are successfully scheduled |
| failed pods           | Represents the number of failed pods |
| unknown pods          | Represents the number of pods that are in unknown state |
| pending pods          | Is the number of pods in pending state |
| running pods          | Reflects the current number of running pods |

## Deployment metrics

| Metric name           | Description |
| ----------------------|-------------|
| number of replicas    | Represents the number of active deployment replicas |
| available replicas    | The number of pod instances targeted by the deployment |   
| desired replicas      | Is the of number of non-terminated pods targeted by the deployment that have the desired template specification |

## PVC (Persistent Volume Claims) metrics

| Metric name           | Description |
| ----------------------|-------------|
| available   | Is the number of available bytes in the volume |
| used        | Represents the number of used bytes in the volume |   
| capacity    | Is the capacity in bytes of the volume |
