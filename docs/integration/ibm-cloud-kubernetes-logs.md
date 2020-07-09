title: IBM Cloud Kubernetes Logs Integration
description: Sematext IBM Cloud Kubernetes Logs integration is configured by running Logagent as a Daemonset in your cluster.

With this integration you can:

- Forward all container logs
- Use log globs to choose which containers to log
- Drop noisy logs with `dropEvents`
- Forward logs to different Apps
- Enable Kubernetes audit logs 

IBM Cloud Kubernetes uses cointainerd as the container engine. In this case Logagent can't use the Docker remote API to retrieve logs and metadata. Instead, logs are collected from containerd log files, which requires access to the relevant directories.

The Logagent [input-filter for Containerd](../logagent/input-filter-containerd/) supports:

* Tailing log files from `/var/log/containers/`, `/var/log/pods` and `/var/data/kubeletlogs`
* Enrichment of logs with podName, namespace, containerName, containerId
* Joining long log lines over 4KB into one log line (log lines over 4KB are split into multiple lines)
* Parsing containerd log headers (timestamp, stream, flags)
* Parsing message content with Logagent's parser library


## Forward all Container Logs

Run Logagent as [Kubernetes DaemonSet](https://kubernetes.io/docs/concepts/workloads/controllers/daemonset).

First, create the [ibm-cloud-logagent-ds.yml](https://github.com/sematext/logagent-js/blob/master/kubernetes/ibm-cloud-logagent-ds.yml) DaemonSet file.

```
curl -o ibm-cloud-logagent-ds.yml  https://raw.githubusercontent.com/sematext/logagent-js/master/kubernetes/ibm-cloud-logagent-ds.yml
```

Set your `LOGS_TOKEN` in the `spec.env` section in the `ibm-cloud-logagent-ds.yml` file.

Then run the DaemonSet:

```
kubectl create -f ibm-cloud-logagent-ds.yml
```

## Use `LOG_GLOB` to Filter Which Container Logs to Forward

hu ha...

## Drop noisy Container Logs 

ha hu...

## Forward Container Logs to Multiple Apps with Log Routing

ha hu...

## Enable Kubernetes Audit Logs

hu ha...


