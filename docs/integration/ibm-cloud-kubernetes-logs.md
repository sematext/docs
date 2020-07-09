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
* Joining long log lines over 4KB into one log line
* Parsing containerd log headers (timestamp, stream, flags)
* Parsing message content with Logagent's parser library


## Default Setup of IBM Cloud Kubernetes Logs

With the default setup you edit env vars to change the configuration.

### Forward all Container Logs

Run Logagent as [Kubernetes DaemonSet](https://kubernetes.io/docs/concepts/workloads/controllers/daemonset).

First, create the [ibm-cloud-logagent-ds.yml](https://github.com/sematext/logagent-js/blob/master/kubernetes/ibm-cloud-logagent-ds.yml) DaemonSet file.

```bash
curl -o ibm-cloud-logagent-ds.yml  https://raw.githubusercontent.com/sematext/logagent-js/master/kubernetes/ibm-cloud-logagent-ds.yml
```

Set your `LOGS_TOKEN` in the `spec.env` section in the `ibm-cloud-logagent-ds.yml` file.

Then run the DaemonSet:

```
kubectl create -f ibm-cloud-logagent-ds.yml
```

### Use `LOG_GLOB` to Filter Which Container Logs to Forward

Log globs make it easy to use wildcards to filter in/out which log files to tail.
In the `spec.env.LOG_GLOB` env var you can set values to not include logs from certain containers.
To read more about log globs, [check this out](https://www.npmjs.com/package/glob).

Here's how you can exclude all logs from the `kube-system` namespace:
```yaml
env:
  - name: LOG_GLOB
    value: "/var/log/containers/!(*kube-system*.log);/var/log/*.log"
```

Or, only include logs from the `default` namespace:
```yaml
env:
  - name: LOG_GLOB
    value: "/var/log/containers/*default*.log);/var/log/*.log"
```

This is a quick way of including/excluding logs from containers.

## Advanced Setup of IBM Cloud Kubernetes Logs

With the advanced setup you add a `logagent.conf` file as a `ConfigMap` to change the configuration.
With this config file you have more control over the settings, including:

- dropping logs
- log routing
- more fine tuned filtering
- ability to add audit logs

### 1. Create a `logagent.conf` file

The logagent.conf is the main config file for Logagent.

```yaml
# logagent.conf
options:
  debug: false

input: 
  files: 
    - /var/log/*.log
    - /var/log/containers/*.log

inputFilter:
  - module: input-filter-k8s-containerd

output:
  elasticsearch:
    module: elasticsearch
    url: https://logsene-receiver.sematext.com
    index: YOUR_SEMATEXT_LOGS_TOKEN
```

This particular config above will work the same as using the default setup with env vars.

### 2. Add the `logagent.conf` as a `ConfigMap`

Create the ConfigMap from the `logagent.conf` file. Run this command from the dir where you have the `logagent.conf`:

```bash
kubectl create configmap logagent-config --from-file=./logagent.conf
```

### 3. Create the Logagent DaemonSet

Create the [ibm-cloud-logagent-with-config-ds.yml](https://github.com/sematext/logagent-js/blob/master/kubernetes/ibm-cloud-logagent-with-config-ds.yml) DaemonSet file.

```bash
curl -o ibm-cloud-logagent-with-config-ds.yml https://raw.githubusercontent.com/sematext/logagent-js/master/kubernetes/ibm-cloud-logagent-with-config-ds.yml 
```

You don't need to change anything as all the config is in `logagent.conf`, just run the DaemonSet:

```bash
kubectl create -f ibm-cloud-logagent-with-config-ds.yml
```

When you want to edit the config, change the `logagent.conf`, recreate the ConfigMap, restart the Logagent pod to grab the new ConfigMap and you're done!
Continue reading below to see how to configure more advanced settings.

### Drop noisy Container Logs 

Edit the `logagent.conf` to add the [drop-events](../logagent/output-filter-dropevents/) outputFilter.

```yaml
# Global options
options:
  debug: false

input: 
  files: 
    - /var/log/*.log
    - /var/log/containers/*.log

inputFilter:
  - module: input-filter-k8s-containerd

outputFilter:
  dropEvents:
    module: drop-events
    filters:
      message:
        include: !!js/regexp /critical|auth|error|failed/
        exclude: !!js/regexp /status/i

output:
  elasticsearch:
    module: elasticsearch
    url: https://logsene-receiver.sematext.com
    index: YOUR_SEMATEXT_LOGS_TOKEN

```

In the `filters.message.ex

### Forward Container Logs to Multiple Apps with Log Routing

ha hu...

### Enable Kubernetes Audit Logs

hu ha...


