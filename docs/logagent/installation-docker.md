title: Install Logagent
description: Logagent, Sematext log shipper and Logstash alternative, is available as Docker image. It has automatic Docker installation and seamless logging system service integration with our logs management and analysis platform


## Installation for Docker


To run Sematext Docker Agent you will need a Logs App Token (aka LOGSENE_TOKEN).  If you don't have Logs Apps yet, you can [create Apps now](https://apps.sematext.com/ui/integrations)

See: [sematext/logagent](https://hub.docker.com/r/sematext/logagent/) on Docker Hub


## Docker Run

The most basic start method is using docker run command:

```
docker pull sematext/logagent
docker run -d --name logagent \
-e LOGSENE_TOKEN=YOUR_LOGSENE_TOKEN \
-v /var/run/docker.sock:/var/run/docker.sock sematext/logagent
```


## Docker Compose

To use [Docker Compose](https://docs.docker.com/compose/) create docker-compose.yml as follows and insert real tokens:

```

# docker-compose.yml
logagent:
  image: 'sematext/logagent:latest'
  environment:
    - LOGSENE_TOKEN=YOUR_LOGSENE_TOKEN 
  cap_add:
    - SYS_ADMIN
  restart: always
  volumes:
    - '/var/run/docker.sock:/var/run/docker.sock'

```

Then start Logagent with the docker-compose file: 

```
docker-compose up -d
```

## Docker Swarm and Docker Enterprise

Connect your Docker client to Swarm or UCP remote API endpoint and
deploy Sematext Docker Agent with following docker command with your SPM and Logsene tokens:

```bash
docker service create -mode global -name logagent \
-mount type=bind,src=/var/run/docker.sock,dst=/var/run/docker.sock \
-e LOGSENE_TOKEN=”REPLACE THIS WITH YOUR LOGSENE TOKEN” \
sematext/logagent
```

## Kubernetes and Red Hat OpenShift

Run Sematext Agent as [Kubernetes DaemonSet](https://kubernetes.io/docs/concepts/workloads/controllers/daemonset).

First, create [logagent-daemonset.yml](https://github.com/sematext/logagent-js/blob/master/kubernetes/logagent-daemonset.yml) - and set your Logsene token in the spec.env section.

Then run the DaemonSet:

```
kubectl create -f logagent-daemonset.yml
```

On Red Hat OpenShift use the "oc" command instead of kubectl.

```
oc apply -f logagent-daemonset.yml
```

## Mesos / Marathon

The following configuration will activate Sematext Docker Agent on every node in the Mesos cluster. Please note that you have to specify the number of Mesos nodes (instances), SPM App Token and Logsene App Token. An example call to the Marathon API:

```
curl -XPOST -H "Content-type: application/json" http://your_marathon_server:8080/v2/apps  -d '
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
        "LOGSENE_TOKEN": "YOUR_LOGSENE_TOKEN"
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


