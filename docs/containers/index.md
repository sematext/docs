## Container Monitoring

[Sematext Agent](https://sematext.com/docs/container/sematext-agent.md) collects a plethora of metrics about hosts (CPU, memory, disk, network, processes), containers (both Docker and rkt) and orchestrator platforms and ships that to [Sematext Cloud](https://sematext.com/cloud). To gain deep insight into the Linux kernel, Sematext Agent relies on eBPF to implant instrumentation points (attach eBPF programs to kprobes) on kernel functions. This allows for a very efficient and powerful system exploration approach. It has auto-discovery capabilities of services deployed on physical/virtual hosts and containers, as well as a mechanism for reporting inventory info. It also collects events from different sources such as OOM notifications, container or Kuberentes events.

## Container Logging

The [Logagent Docker image](https://hub.docker.com/r/sematext/logagent/) is tailored for the log collection on container platforms. It runs as a tiny container on every Docker host and collects logs for all cluster nodes and their containers. It is open source agent created by Sematext.

Logagent detects known log formats and structures your logs for supported applications and formats automatically. You can configure the log parser for any application by proving your own pattern deininitions or by contributing to the open source pattern defiitions in the [patterns.yml](https://github.com/sematext/logagent-js/blob/master/patterns.yml) file. 

All container logs are enriched with meta data, such as container labels, Kubernetes metadata or Swarm metadata.  

## Autodiscovery is coming soon!!! 

### Application monitoring for containerized applications 

Container metrics do not include application-specific metrics like index rate of Elasticsearch clusters or the number of Database operations or web server request rates. Such metrics must be monitored with application-specific monitoring agents, such as  [Sematext SPM-Client](https://hub.docker.com/r/sematext/spm-client/). 

Monitoring of application-specific metrics like Queue size of message queues, Database query times, Elasticsearch indexing rate or web server request rates requires the setup of application-specific monitoring agents.  Typically application monitoring agents connect to the application via TCP/IP to collect application metrics. In container environments, such setup can't be static because IP addresses and port numbers are changing dynamically. In addition, an application might run in an isolated virtual network and the monitoring agent must be able to connect to the application network.   

Sematext Agent Auto-Discovery solves the issues above by the automatic discovery of all relevant information for application monitoring:
- Sematext Agent container connects to Docker Remote API and Kuberntes API to discover new application containers and network parameters
- Sematext Agent connects to container networks and Kubernetes pods for monitoring 
- Application containers can be tagged with the APP_TOKEN,  and Sematext Agent uses the APP_TOKEN label or environment variable to ship metrics to the right Monitoring App in Sematext Cloud (or Sematext Enterprise). 

## How does Sematext Autodiscovery work? 

The Sematext Agent container gets distributed to every Kubernetes, Docker Swarm or Docker Enterprise node. Then it starts watching container events and compares the image or process name of started containers with a list of application names defined in a configuration template. Then Sematext Agent connects the container network and configures Sematext Agent for the right IP-address and port and other settings according to the configuration template. 

Monitoring with Sematext Cloud requires the APP_TOKEN for each application type. The APP_TOKEN is read from the application container environment or container labels. 

Example: To monitor a containerized application like Elasticsearch with Autodiscovery we need only 3 steps: 

1) Create a monitoring app for Elasticsearch in Sematext UI.
2) Deploy Sematext Agent container as Kubernetes DaemonSet or global Swarm Service. Instructions are displayed in Sematext UI.  
3) Add the displayed APP_TOKEN to the environment of your Elasticsearch container 

