## General 

1. Get a free account at [sematext.com/spm](https://apps.sematext.com/ui/registration)
2. [Create an Monitoring App](https://apps.sematext.com/ui/integrations)
3. For logs (optional) [create a Logs App](https://apps.sematext.com/ui/integrations) to obtain an App Token for [Logsene](http://www.sematext.com/logsene/)  

Follow the installation instructions in Sematext user interface. The user interface provides copy/paste instructions for various platforms including Docker Cloud, Docker Swarm, Kubernetes, Mesos, and Rancher.

To use Logging and Monitoring with a single agent, the provided instructions need to be extended with application tokens LOGSENE_TOKEN or SPM_TOKEN as described in the examples below. 

## Installation using Docker client

1. Get a free account at [sematext.com/spm](https://apps.sematext.com/users-web/register.do)  
2. [Create a Monitoring App](https://apps.sematext.com/ui/integrations) of type "Docker" and copy the SPM Token 
3. For logs (optional) [create a Logs App](https://apps.sematext.com/ui/integrations) to obtain a [Logsene](http://www.sematext.com/logsene/) token
4. Run the image after adding your Monitoring (aka SPM) and/or Logsene tokens:

```
docker pull sematext/sematext-agent-docker
docker run -d --name sematext-agent-docker \
-e SPM_TOKEN=YOUR_SPM_TOKEN \
-e LOGSENE_TOKEN=YOUR_LOGSENE_TOKEN \
-v /var/run/docker.sock:/var/run/docker.sock sematext/sematext-agent-docker
```


## Installation using Docker Compose

Create a Logs and Monitoring App and replace the actual LOGSENE_TOKEN and SPM_TOKEN with your individual tokens in the following [Docker Compose](https://docs.docker.com/compose/) file: 

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

Start Sematext Docker agent with the docker-compose file: 

```
docker-compose up -d
```

## Docker Swarm and Docker Enterprise

Connect your Docker client to Swarm or UCP remote API endpoint and
deploy Sematext Docker Agent with following docker command with your SPM and Logsene tokens: 

```bash
docker service create –mode global –name sematext-agent-docker \
–mount type=bind,src=/var/run/docker.sock,dst=/var/run/docker.sock \
-e SPM_TOKEN=”REPLACE THIS WITH YOUR SPM TOKEN” \
-e LOGSENE_TOKEN=”REPLACE THIS WITH YOUR LOGSENE TOKEN” \
sematext/sematext-agent-docker
```

Please refer to [Monitoring and Logging for Docker Enterprise Edition](https://sematext.com/docker-enterprise-monitoring-and-logging/) for further information. 

## Kubernetes and Red Hat OpenShift

Run Sematext Agent as [Kubernetes DaemonSet](https://kubernetes.io/docs/concepts/workloads/controllers/daemonset).

1. Get a [free account](https://apps.sematext.com/ui/registration)  
2. [Create a Monitoring App](https://apps.sematext.com/ui/integrations) of type "Docker" and copy the SPM App Token 
   - For logs (optional) [create a Logs App](https://apps.sematext.com/ui/integrations) to obtain an App Token for [Logsene](http://www.sematext.com/logsene/)
3. Create [sematext-agent.yml](https://github.com/sematext/sematext-agent-docker/blob/master/kubernetes/sematext-agent.yml) - and set your SPM and Logsene App Tokens in the section spec.env.
4. Run the DaemonSet

```
kubectl create -f sematext-agent.yml 
```

On Red Hat OpenShift use the "oc" command instead of kubectl.

*Note: Red Hat Certified images for the Sematext Docker Agent are available in the [Red Hat Container Catalog](https://access.redhat.com/containers/?tab=overview#/registry.connect.redhat.com/sematext/sematext-agent-docker). You should use "registry.connect.redhat.com" as Docker registry to access Red Hat certified images.*

```
oc apply -f sematext-agent.yml 
```

## Rancher

Please read [Rancher Monitoring and Logging Support](https://sematext.com/blograncheros-monitoring-and-logging-support/). There are various deployment options for Rancher, Swarm, Kubernetes or Mesos. In addition, we recommend reading Rancher Labs blog post about the [Rancher Catalog Entry](http://rancher.com/new-rancher-community-catalog-monitoring-logging-sematext/). 

## Installation on Nomad by Hashicorp

See an example of the [job description](https://github.com/sematext/sematext-agent-docker/blob/master/hashicorp-nomad/sematext-docker-agent.nomad) for [Nomad by Hashicorp](https://www.nomadproject.io/)

## Installation on Mesos / Marathon

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

