title: Installing Logagent with Helm
description: Logagent, Sematext log shipper and Logstash alternative, is available as Docker image. It has automatic Docker installation and seamless logging system service integration with our log management and analysis platform

Please note the following instructions use the latest Logagent image from Docker Hub.
If you want to use certified images please pull the image from Red Hat and Docker registries.

## Helm Chart

- Sematext Agent Helm Chart: `helm repo add sematext https://cdn.sematext.com/helm-charts`

## Installation with Helm

The Logagent Docker image is pre-configured for the log collection on container platforms. It runs as a tiny container on every Kubernetes node and collects logs for all cluster nodes and their containers.

All container logs are enriched with Kubernetes metadata.

See: [sematext/helm-charts](https://github.com/sematext/helm-charts/tree/master/charts/sematext-agent) on Github.

This Helm chart installs the Logagent to all nodes in your cluster via a DaemonSet resource. Logagent is part of sematext-agent chart.

Sematext Agent chart is hosted in the Sematext Repository. Add and update the repo:

```bash
helm repo add sematext https://cdn.sematext.com/helm-charts 
helm repo update
```

To install the chart run the following command:

```bash
helm install st-logagent \
  --set logsToken=YOUR_LOGS_TOKEN \
  --set logsReceiverUrl=https://logsene-receiver.sematext.com \
  sematext/sematext-agent
```

## Configuration

To see detailed configuration params and manuals, see:

- [Container Configuration Parameters](./container-config-parameters)
- [Container Configuration Manual](./container-config-manual)
