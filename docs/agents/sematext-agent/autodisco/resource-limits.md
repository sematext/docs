title: App Agent Resource Limits

description:  Setting resource limits for App Agent pods.

Sematext Agent spins up a new pod for every App Agent responsible for monitoring a particular service. The App Agent pod is configured to run with the following [request/limit](https://kubernetes.io/docs/concepts/configuration/manage-resources-containers/#resource-requests-and-limits-of-pod-and-container) specifications:

- CPU request: 90m
- CPU limit: 2000m
- Memory request: 256Mi
- Memory limit: 768Mi

However, you can override these settings by adhering to the Kubernetes [resource units](https://kubernetes.io/docs/concepts/configuration/manage-resources-containers/#resource-units-in-kubernetes) and adding the following environment variables to your deployment manifest:

- `AUTODISCO_AGENT_CPU_REQUEST` overrides the default CPU request
- `AUTODISCO_AGENT_CPU_LIMIT` overrides the default CPU limit
- `AUTODISCO_AGENT_MEM_REQUEST` overrides the default memory request
- `AUTODISCO_AGENT_MEM_LIMIT` overrides the default memory limit
