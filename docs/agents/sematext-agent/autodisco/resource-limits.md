title: App Agent Resource Limits

description:  Setting resource limits for App Agent pods and non-Kubernetes containers.

## Kubernetes Pod Resource Limits

Sematext Agent spins up a new Pod for every App Agent responsible for monitoring a particular service. The App Agent Pod is configured to run with the following [request/limit](https://kubernetes.io/docs/concepts/configuration/manage-resources-containers/#resource-requests-and-limits-of-pod-and-container) specifications:

- CPU request: 90m
- CPU limit: 2000m
- Memory request: 256Mi
- Memory limit: 768Mi

You can override these default settings by adhering to the Kubernetes [resource units](https://kubernetes.io/docs/concepts/configuration/manage-resources-containers/#resource-units-in-kubernetes) and setting the following environment variables to your deployment manifest:

- `AUTODISCO_AGENT_CPU_REQUEST` - Overrides the default CPU request
- `AUTODISCO_AGENT_CPU_LIMIT` - Overrides the default CPU limit
- `AUTODISCO_AGENT_MEM_REQUEST` - Overrides the default memory request
- `AUTODISCO_AGENT_MEM_LIMIT` - Overrides the default memory limit

## Non-Kubernetes Container Resource Limits

In addition to configuring Pod-level resource limits, you can also set specific limits for non-Kubernetes containers (e.g., Docker) running within the App Agent, by using the following environment variables:

- `AUTODISCO_AGENT_CONTAINER_CPU_SET` – Overrides the default CPU core allocation
- `AUTODISCO_AGENT_CONTAINER_MEM_LIMIT` – Overrides the default memory limit

### Example Usage (Docker)

```
docker run ... \
... \
-e AUTODISCO_AGENT_CONTAINER_MEM_LIMIT=1024 \ # Override default memory limit to 1024Mi
-e AUTODISCO_AGENT_CONTAINER_CPU_SET=0-3 \ # Assign CPU cores 0-3 to the container
sematext/agent:latest-4
```

By using these environment variables, you can fine-tune the resource allocation for non-Kubernetes containers based on your specific requirements.