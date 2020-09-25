title: Sematext Autodiscovery for Monitoring
description: Sematext Autodiscovery Monitoring automatically scans for services that can be monitored using Sematext Agent and, depending on your configuration, automatically sets up monitoring agents. 

The centerpiece of our Autodiscovery feature is [Sematext Agent](../agents/sematext-agent). It scans for services that can be monitored by Sematext
[supported integrations](autodiscovery/#which-integrations-allow-autodiscovery). It works in both bare-metal/virtual machine and in container environments. Data about discovered services is displayed under Discovery.

<img class="content-modal-image" alt="Sematext Autodiscovery" src="../../images/monitoring/autodiscovery-ui.png" title="Sematext Autodiscovery">

## Autodiscovery-based Monitoring
Autodiscovered services can be monitored in two ways:

- **Manually** - in the case of bare-metal/virtual machine setups, you can use the classic Agent installation instructions. In container environments you can just add `MONITORING_TOKEN` as an environment variable to your container. Sematext Agent will automatically match it to the type of the discovered service and set up a monitoring agent container specifically for that service. If a service requires authentication for monitoring, you will also need to provide credentials, e.g., as environment variables with username or password for monitoring MySQL or as a Kubernetes Secret. Again, just follow the classic monitoring installation instructions to set this up.
- **Automatically** - In many cases Sematext Agent will be able to start and stop monitoring discovered services without requiring any changes from you and without restarting of services you wish to monitor. As services start, Sematext Agent automatically ensures they are monitored according to the rules you specified. For each discovered service type you can enable or disable automatic monitoring at any point. For example, if Sematext Agent discovered your Elasticsearch cluster and you see it in Discovery UI, you can easily start its monitoring with a single click. No actions are required from you on Elasticsearch nodes. Similarly, if you decide to stop monitoring the cluster, single click will do the trick again. 

<img class="content-modal-image" alt="Enabling Automatic Autodiscovery-base Monitoring" src="../../images/monitoring/automatic-autodiscovery-monitoring.png" title="Enabling Automatic Autodiscovery-based Monitoring">

### Which integrations allow Autodiscovery?

Sematext Agent can automatically discover and start monitoring the following service types:

- Cassandra
- ClickHouse
- Elasticsearch
- HAProxy
- Kafka
- MySQL
- Nginx+
- Redis
- Solr
- Spark
- Storm
- JVM
- Tomcat
- ZooKeeper
- Jenkins

Additionally, Sematext Agent will also discover the following services, but at the moment it can't automatically start monitoring them:

- Node.js *
- Couchbase
- Flink
- NATS
- PostgreSQL
- RabbitMQ

\* For Node.js services it is possible to install a Sematext-supported monitoring agent manually by following the instructions in the UI 

### How do I start using Autodiscovery?

Simply go to [Discovery](https://apps.sematext.com/ui/discovery/overview) ([EU](https://apps.eu.sematext.com/ui/discovery/overview)). You will be presented with instructions to install Sematext Agent. On each machine, Kubernetes, Swarm, or Docker Enterprise cluster where Sematext Agent
is installed, it will instantly start discovering services that can be monitored. Discovered services will be displayed in Discovery. Clicking on each service lets you enable automatic monitoring for that type of service. In most cases Sematext Agent knows how to start monitoring them without requiring you to take any additional actions. This means service metrics will start appearing a few seconds after you enable automatic monitoring. In other cases you may have to provide credentials so monitoring agents can connect to the service you wish to monitor. In either case, the Discovery screen will guide you and provide the exact instructions.

### How does Sematext Autodiscovery work in bare-metal/virtual machine environments?

It is enough to install sematext-agent RPM/DEB package and set up one of your Infra App tokens by following the instructions. This will start Sematext Agent which will
automatically start scanning for known service types. Separately, it will connect to the Sematext backend to fetch info about any automatic monitoring rules you may have defined.

In bare-metal/virtual machine environments, Sematext Agent will automatically start monitoring discovered services only if configured to do so via the Discovery screen.

### How does Sematext Autodiscovery work in container environments? 

The Sematext Agent container gets distributed to every Kubernetes, Docker Swarm, or Docker Enterprise node. Sematext Agent uses eBPF to watch for services starting, as well as stopping, so it can start and stop monitoring agent containers and pods.

In container environments, Sematext Agent will create a monitoring container if it finds `MONITORING_TOKEN` environment variable or label in your service. Additionally, this is true if you enabled automatic monitoring for specific service types in the UI. In Kubernetes setups `MONITORING_TOKEN` can be placed in the pod annotations.

Example: Steps required to monitor a containerized application, like Elasticsearch, manually: 

1. Create a new Monitoring App, and open the container env instructions.
2. Following the instructions in the UI, deploy a Sematext Agent container, either as a standalone container, as Kubernetes DaemonSet, or as global Swarm Service.
3. Add the Elasticsearch `MONITORING_TOKEN` as a label or environment variable to your Elasticsearch container.
4. Restart your Elasticsearch container to apply the label/environment variable.

Example: Steps required to monitor a containerized application, like Elasticsearch, automatically:

1. Visit the Discovery screen. Open instructions to install Sematext Agent in a container env.
2. Following the instructions in the UI to deploy a Sematext Agent container as a standalone container, Kubernetes DaemonSet, or as global Swarm Service.
3. From the Discovery UI, click on any discovered service and enable automatic monitoring option.

As soon as Sematext Agent discovers the Elasticsearch container with a `MONITORING_TOKEN` set, or the automatic monitoring option enabled, it will set up the monitoring agent container which will start to collect the Elasticsearch metrics. 

### Which Sematext Agent version do I need?

For RPM/DEB packages you need 3.2.0 or newer. For container version you need 1.0.0 or newer. 

### Can I have a mix of manually and automatically monitored services?

Yes. In case of bare-metal/virtual machine environments, follow the classic installation instructions to set up a "manually" monitored service agent. Sematext Agent will recognize it as being manually set up and won't apply any of the automatic monitoring rules. Automatic monitoring can be specified on the service type level in the Discovery UI. It will be applied for any instance of that service except those that already have a manually configured agent.

In container environments you add the `MONITORING_TOKEN` environment variable, or label, to the container of the service you wish to monitor manually. Automatic monitoring can again be enabled in the UI and Sematext Agent will again "know" which service instances have a manually configured agent and which should get automatic monitoring rule applied.  

In all environments this makes it possible to use different monitoring tokens, and thus different Sematext Apps for the same service type running on the same machine or in the same Kubernetes/Swarm cluster.

### Additional info

- Defining monitoring agent [credential sets](../agents/sematext-agent/autodisco/credential-sets) in Kubernetes
- Providing [MySQL JDBC driver](../agents/sematext-agent/autodisco/mysql-driver) in container environments
- [JMX Attaching](../agents/sematext-agent/jmx-attaching/)
- [Removing stale](../agents/sematext-agent/autodisco/removing-stale-resources) Sematext Agent resources after deinstallation
