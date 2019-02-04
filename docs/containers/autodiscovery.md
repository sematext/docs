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

1. Create a monitoring App for Docker in Sematext
2. Deploy Sematext Agent container as Kubernetes DaemonSet or global Swarm Service. Sematext UI displays the instructions.  
3. Create a monitoring App for Elasticsearch in Sematext. The MONITORING_TOKEN is displayed in the instructions and App Settings. 
4. Add the Elasticsearch MONITORING_TOKEN as label or environment variable to your Elasticsearch container

As soon Sematext Agent discovers the Elasticsearch container (having a MONITORING_TOKEN set) it will start to collect the Elasticsearch metrics. 



