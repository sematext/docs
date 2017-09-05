## Installation using Docker client

1. Get a free account at [sematext.com/spm](https://apps.sematext.com/users-web/register.do)  
2. [Create an SPM App](https://apps.sematext.com/spm-reports/registerApplication.do) of type "Docker" and copy the SPM Application Token 
   - For logs (optional) [create a Logsene App](https://apps.sematext.com/logsene-reports/registerApplication.do) to obtain an App Token for [Logsene](http://www.sematext.com/logsene/)  
3. Run the image (please use your individual SPM and Logsene token!)

   ```
   docker pull sematext/sematext-agent-docker
   docker run -d --name sematext-agent-docker \
   -e SPM_TOKEN=YOUR_SPM_TOKEN \
   -e LOGSENE_TOKEN=YOUR_LOGSENE_TOKEN \
   -v /var/run/docker.sock:/var/run/docker.sock sematext/sematext-agent-docker -->
   ```

    You’ll see your Docker metrics in SPM after about a minute. 
**Installation** of the Docker Image of the monitoring agent:


## Docker Swarm and Docker Enterprise

Connect your Docker client to Swarm or UCP remote API endpoint and
deploy Sematext Docker Agent with following docker command with your SPM and Logsene token: 

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

1. Get a free account at [sematext.com/spm](https://apps.sematext.com/users-web/register.do)  
2. [Create an SPM App](https://apps.sematext.com/spm-reports/registerApplication.do) of type "Docker" and copy the SPM Application Token 
   - For logs (optional) [create a Logsene App](https://apps.sematext.com/logsene-reports/registerApplication.do) to obtain an App Token for [Logsene](http://www.sematext.com/logsene/)
3. Create [sematext-agent.yml](https://github.com/sematext/sematext-agent-docker/blob/master/kubernetes/sematext-agent.yml) - and set your SPM and Logsene App Token in the section spec.env.
4. Run the DaemonSet

```
kubectl create -f sematext-agent.yml 
```

On Red Hat OpenShift use the "oc" command instead of kubectl.

*Note: Red Hat Certified images for the Sematext Docker Agent are available in the [Red Hat Container Catalog](https://access.redhat.com/containers/?tab=overview#/registry.connect.redhat.com/sematext/sematext-agent-docker). You should use "registry.connect.redhat.com" as Docker registry to access Red Hat certified images.*

```
oc apply -f sematext-agent.yml 
```

## CoreOS using fleet

Please note due the end of support for fleet on CoreOS, we recommend to use Kubernetes installation. 


To install SPM for Docker including log forwarding from journald execute
these commands:

``` bash
export $SPM_TOKEN=YOUR-SPM-TOKEN
export $LOGSENE_TOKEN=YOUR-SPM-TOKEN
etcdctl set /sematext.com/myapp/spm/token $SPM_TOKEN
etcdctl set /sematext.com/myapp/logsene/token $LOGSENE_TOKEN
wget https://raw.githubusercontent.com/sematext/sematext-agent-docker/master/coreos/sematext-agent.service
fleetctl load sematext-agent.service; fleetctl start sematext-agent.service
wget https://raw.githubusercontent.com/sematext/sematext-agent-docker/master/coreos/logsene.service
fleetctl load logsene.service; fleetctl start logsene.service; 
```

Please note the provided .service scripts use port 9000 for the logging
service. The provided service templates could be changed after the
download.

An alternative way to install the services is to include the content of
the unit files in the cloud-init config file. 

The latest documentation, install script, and service files are
available in the [Github repository](https://github.com/sematext/sematext-agent-docker/tree/master/coreos)


## RancherOS

Please read [RancherOS Monitoring and Logging Support](https://sematext.com/blog/2016/08/31/rancheros-monitoring-and-logging-support/) there are various deployment options for Rancher, Swarm, Kubernetes or Mesos. In addition, we recommend reading Rancher Labs blog post about the [RancherOS Catalog Entry](http://rancher.com/new-rancher-community-catalog-monitoring-logging-sematext/). 

## Installation on Nomad by Hashicorp

See an example of the [job description](https://github.com/sematext/sematext-agent-docker/blob/master/hashicorp-nomad/sematext-docker-agent.nomad) for [Nomad by Hashicorp](https://www.nomadproject.io/)

## Installation on Mesos / Marathon

The following configuration will activate Sematext Docker Agent on every node in the Mesos cluster. Please note that you have to specify the number of Mesos nodes (instances), SPM App Token and Logsene App Token. Example call to the Marathon API:

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