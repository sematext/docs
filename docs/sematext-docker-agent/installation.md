title: Install Sematext Docker Agent
description: Installation instructions for Sematext Docker Agent, a modern, Docker-native monitoring and log collection agent. It runs as a tiny container on every Docker host and collects logs, metrics, and events for all cluster nodes and their containers

To run Sematext Docker Agent you will need a Monitoring App Token (aka
SPM_TOKEN) and/or a Logs App Token (aka LOGSENE_TOKEN).  If you don't have Monitoring and/or Logs Apps yet, you can [create Apps now](https://apps.sematext.com/ui/integrations)


## Docker Run

The most basic start method is using docker run command:

```
docker pull sematext/sematext-agent-docker
docker run -d --name sematext-agent-docker \
-e SPM_TOKEN=YOUR_SPM_TOKEN \
-e LOGSENE_TOKEN=YOUR_LOGSENE_TOKEN \
-v /var/run/docker.sock:/var/run/docker.sock sematext/sematext-agent-docker
```


## Docker Compose

To use [Docker Compose](https://docs.docker.com/compose/) create docker-compose.yml as follows and insert real tokens:

```

# docker-compose.yml
sematext-agent:
  image: 'sematext/sematext-agent-docker:latest'
  environment:
    - LOGSENE_TOKEN=YOUR_LOGSENE_TOKEN 
    - SPM_TOKEN=YOU_SPM_TOKEN
  cap_add:
    - SYS_ADMIN
  restart: always
  volumes:
    - '/var/run/docker.sock:/var/run/docker.sock'
    - '/:/rootfs:ro'

```

Then start Sematext Docker Agent with the docker-compose file: 

```
docker-compose up -d
```

## Docker Swarm and Docker Enterprise

Connect your Docker client to Swarm or UCP remote API endpoint and
deploy Sematext Docker Agent with following docker command with your SPM and Logsene tokens:

```bash
docker service create -mode global -name sematext-agent-docker \
-mount type=bind,src=/var/run/docker.sock,dst=/var/run/docker.sock \
-e SPM_TOKEN=”REPLACE THIS WITH YOUR SPM TOKEN” \
-e LOGSENE_TOKEN=”REPLACE THIS WITH YOUR LOGSENE TOKEN” \
sematext/sematext-agent-docker
```

Please refer to [Monitoring and Logging for Docker Enterprise Edition](https://sematext.com/docker-enterprise-monitoring-and-logging/) for further information. 

## Kubernetes and Red Hat OpenShift

Run Sematext Agent as [Kubernetes DaemonSet](https://kubernetes.io/docs/concepts/workloads/controllers/daemonset).

First, create [sematext-agent.yml](https://github.com/sematext/sematext-agent-docker/blob/master/kubernetes/sematext-agent.yml) - and set your SPM and Logsene tokens in the spec.env section.

Then run the DaemonSet:

```
kubectl create -f sematext-agent.yml 
```

On Red Hat OpenShift use the "oc" command instead of kubectl.

*Note: Red Hat Certified images for the Sematext Docker Agent are available in the [Red Hat Container Catalog](https://access.redhat.com/containers/?tab=overview#/registry.connect.redhat.com/sematext/sematext-agent-docker). You should use "registry.connect.redhat.com" as Docker registry to access Red Hat certified images.*

```
oc apply -f sematext-agent.yml 
```

## Rancher

Please read [Rancher Monitoring and Logging Support](https://sematext.com/blog/rancheros-monitoring-and-logging-support/). There are various deployment options for Rancher, Swarm, Kubernetes or Mesos. In addition, we recommend reading Rancher Labs blog post about the [Rancher Catalog Entry](http://rancher.com/new-rancher-community-catalog-monitoring-logging-sematext/). 

## Nomad by Hashicorp

See an example of the [job description](https://github.com/sematext/sematext-agent-docker/blob/master/hashicorp-nomad/sematext-docker-agent.nomad).

## Mesos / Marathon

The following configuration will activate Sematext Docker Agent on every node in the Mesos cluster. Please note that you have to specify the number of Mesos nodes (instances), SPM App Token and Logsene App Token. An example call to the Marathon API:

```
curl -XPOST -H "Content-type: application/json" http://your_marathon_server:8080/v2/apps  -d '
{
  "container": {
    "type": "DOCKER",
    "docker": {
      "image": "sematext/sematext-agent-docker"
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
        "LOGSENE_TOKEN": "YOUR_LOGSENE_TOKEN",
        "SPM_TOKEN": "YOUR_SPM_TOKEN" 
  },
  "id": "sematext-agent",
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
