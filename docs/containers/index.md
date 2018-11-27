## Container Monitoring

[Sematext Agent](https://sematext.com/docs/container/sematext-agent.md) collects a plethora of metrics about hosts (CPU, memory, disk, network, processes), containers (both Docker and rkt) and orchestrator platforms and ships that to [Sematext Cloud](https://sematext.com/cloud). To gain deep insight into the Linux kernel, Sematext Agent relies on eBPF to implant instrumentation points (attach eBPF programs to kprobes) on kernel functions. Using Linux kernel instrumentation allows Sematext Agent a very efficient and powerful system exploration approach. It has auto-discovery capabilities of services deployed on physical/virtual hosts and containers, as well as a mechanism for reporting inventory info. It also collects events from different sources such as OOM notifications, container or Kubernetes events.

## Container Logging

The [Logagent Docker image](https://hub.docker.com/r/sematext/logagent/) is tailored for the log collection on container platforms. It runs as a tiny container on every Docker host and collects logs for all cluster nodes and their containers. It is open-source agent created by Sematext.

Logagent detects known log formats and structures your logs for supported applications and structures logs automatically. You can configure the log parser for any application by providing your pattern definitions or by contributing to the open source pattern definitions in the [patterns.yml](https://github.com/sematext/logagent-js/blob/master/patterns.yml) file. 

Logagent enriches all container logs with metadata, such as container labels, Kubernetes metadata or Swarm metadata.  

## Autodiscovery is coming soon!!! 

### Application monitoring for containerized applications 

Container metrics do not include application-specific metrics like index rate of Elasticsearch clusters or the number of database operations or web server request rates. To monitor metrics of applications running inside containers you need an application-specific monitoring agent such as  [Sematext Monitoring Agent](https://hub.docker.com/r/sematext/spm-client/). 

Monitoring of application-specific metrics like queue size of message queues, database query times, Elasticsearch indexing rate or web server request rates requires the setup of application-specific monitoring agents. Typically application monitoring agents connect to the application via TCP/IP to collect application metrics. In container environments, such configuration can't be static because IP addresses and port numbers are changing dynamically. Also, an application might run in an isolated virtual network, and the monitoring agent must be able to connect to the application network.   

Sematext Agent Auto-Discovery solves the issues above by the automatic discovery of all relevant information for application monitoring:
- Sematext Agent container connects to Docker Remote API and Kubernetes API to discover new application containers and network parameters
- Sematext Agent connects to container networks and Kubernetes pods for monitoring 
- Application containers can be tagged with the APP_TOKEN,  and Sematext Agent uses the APP_TOKEN label or environment variable to ship metrics to the right Monitoring App in Sematext Cloud (or Sematext Enterprise). 

## How does Sematext Autodiscovery work? 

The Sematext Agent container gets distributed to every Kubernetes, Docker Swarm or Docker Enterprise node. Then it starts watching container events and compares the image or process name of started containers with a list of application names defined in a configuration template. Then Sematext Agent connects the container network and configures Sematext Agent for the right IP-address and port and other settings according to the configuration template. 

Monitoring with Sematext Cloud requires the MONITORING_TOKEN for each application type. The MONITORING_TOKEN is read from the application container environment or container labels. 

Example: To monitor a containerized application like Elasticsearch with Auto-Discovery we need only 4 steps: 

1) Create a monitoring App for Docker in Sematext
2) Deploy Sematext Agent container as Kubernetes DaemonSet or global Swarm Service. Sematext UI displays the instructions.  
3) Create a monitoring App for Elasticsearch in Sematext. The MONITORING_TOKEN is displayed in the instructions and App Settings. 
4) Add the Elasticsearch MONITORING_TOKEN as label or environment variable to your Elasticsearch container

As soon Sematext Agent discovers the Elasticsearch container (having a MONITORING_TOKEN set) it will start to collect the Elasticsearch metrics. 



