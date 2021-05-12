title: Installing Logagent on Kubernetes
description: Logagent, Sematext log shipper and Logstash alternative, is available as Docker image. It has automatic Docker installation and seamless logging system service integration with our log management and analysis platform

Please note the following instructions use the latest Logagent image from Docker Hub.
If you want to use certified images please pull the image from Red Hat and Docker registries.

## Certified Logagent Images

- Red Hat Certified Image: `docker pull registry.connect.redhat.com/sematext/logagent`
- Docker Certified Image: `docker pull sematext/logagent`

## Installation for Kubernetes

The Logagent Docker image is pre-configured for the log collection on container platforms. It runs as a tiny container on every Kubernetes node and collects logs for all cluster nodes and their containers.

All container logs are enriched with Kubernetes metadata.

See: [sematext/logagent](https://hub.docker.com/r/sematext/logagent/) on Docker Hub.

### Kubernetes with Docker runtime

Run Logagent as [Kubernetes DaemonSet](https://kubernetes.io/docs/concepts/workloads/controllers/daemonset).

First, create [logagent-daemonset.yml](https://github.com/sematext/logagent-js/blob/master/kubernetes/logagent-daemonset.yml)

```bash
curl -o logagent-daemonset.yml https://raw.githubusercontent.com/sematext/logagent-js/master/kubernetes/logagent-daemonset.yml
```


Then run the DaemonSet:

```
kubectl create -f logagent-daemonset.yml
```

On Red Hat OpenShift use the "oc" command instead of kubectl.

```
oc apply -f logagent-daemonset.yml
```

### Kubernetes with containerd runtime

Kubernetes can use cointainerd as container engine. In this case Logagent can't use the Docker remote API to retrieve logs and metadata.  Instead, logs are collected from containerd log files, which requires access to the relevant directories.
The Logagent input-filter for containerd supports:

* Tailing log files from `/var/log/containers/`, `/var/log/pods` and `/var/data/kubeletlogs`
* Enrichment of logs with podName, namespace, containerName, containerId
* Parsing containerd log headers (timestamp, stream, flags)
* Parsing message content with logagent parser library

Run Logagent as [Kubernetes DaemonSet](https://kubernetes.io/docs/concepts/workloads/controllers/daemonset).

First, create [ibm-cloud-logagent-ds.yml](https://github.com/sematext/logagent-js/blob/master/kubernetes/ibm-cloud-logagent-ds.yml)

```
curl -o ibm-cloud-logagent-ds.yml  https://raw.githubusercontent.com/sematext/logagent-js/master/kubernetes/ibm-cloud-logagent-ds.yml
```

Set your Logs App Token in the spec.env section in the `ibm-cloud-logagent-ds.yml` file.

Then run the DaemonSet:

```
kubectl create -f ibm-cloud-logagent-ds.yml
```


### Mesos / Marathon

The following configuration will activate Logagent on every node in the Mesos cluster. Please note that you have to specify the number of Mesos nodes (instances) and Logs App Token. An example call to the Marathon API:

```
curl -XPOST -H "Content-type: application/json" https://your_marathon_server:8080/v2/apps  -d '
{
  "container": {
    "type": "DOCKER",
    "docker": {
      "image": "sematext/logagent"
    },
    "volumes": [
      {
        "containerPath": "/var/run/docker.sock",
        "hostPath": "/var/run/docker.sock",
        "mode": "RW"
      }
    ],
    "network": "BRIDGE"
  },
  "env": {
        "LOGS_TOKEN": "YOUR_LOGS_TOKEN",
        "LOGS_RECEIVER_URL": "https://logsene-receiver.sematext.com"

  },
  "id": "sematext-logagent",
  "instances": 1,
  "cpus": 0.1,
  "mem": 100,
  "constraints": [
    [
      "hostname",
      "UNIQUE"
    ]
  ]
}
```

## Configuration

To see detailed configuration params and manuals, see:

- [Container Configuration Parameters](./container-config-parameters)
- [Container Configuration Manual](./container-config-manual)
