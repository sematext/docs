title: Sematext Autodiscovery for Monitoring
description: Sematext Autodiscovery Monitoring automatically scans for services that can be monitored using Sematext Agent and, depending on your configuration, automatically sets up monitoring agents. 

## Autodiscovery Monitoring

The centerpiece of Autodiscovery feature is [Sematext Agent](../agents/sematext-agent) which scans for services that can be monitored by Sematext
[supported integrations](autodiscovery/#which-integrations-allow-autodiscovery). It works in both bare-metal/virtual machine and in container environments. Data about discovered services is displayed under Discovery.

<img class="content-modal-image" alt="Sematext Autodiscovery UI" src="../images/monitoring/autodiscovery-ui.png" title="Sematext Autodiscovery UI">


Autodiscovered services can be monitored in two ways:
- **Manually** - in case of bare-metal/virtual machine setups, you can use classic Agent installation instructions. In container environments you can just add `MONITORING_TOKEN` as environment variable to your container. Sematext Agent will automatically match it to the type of discovered service and set up monitoring agent container specifically for that service. If a service requires authentication for monitoring, you will also need to provide credentials, e.g., as environmental variable with username or password for monitoring MySQL or as a Kubernetes Secret. Again, just follow the classic monitoring installation instructions in UI to set this up.
- **Automatically** - In many cases Sematext Agent will be able to start and stop monitoring discovered services without requiring any changes from you and without restarting of services you wish to monitor. As services start, Sematext Agent automatically ensures they are monitored according to the rules you specified. For each discovered service type you can enable or disable automatic monitoring at any point. For example, if Sematext Agent discovered your Elasticsearch cluster and you see it in Discovery UI, you can easily start its monitoring with a single click. No actions are required from you on Elasticsearch nodes. Similarly, if you decide to stop monitoring the cluster, single click will do the trick again. 

<img class="content-modal-image" alt="Enabling Automatic Autodiscovery Monitoring" src="../images/monitoring/automatic-autodiscovery-monitoring.png" title="Enabling Automatic Autodiscovery Monitoring">

### Which integrations allow Autodiscovery?

Sematext Agent can automatically discover and set up monitoring agent for the following service types: 
- Cassandra
- Clickhouse
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
- Zookeeper

Additionally, Sematext Agent will also discover the following services, but at the moment it can't set up the monitoring agent for them:
- Couchbase
- Flink
- NATS
- PostgreSQL
- RabbitMQ

### How do I start using Autodiscovery?

Simply go to Discovery. You will be presented with instructions to install Sematext Agent. On each machine, Kubernetes, Swarm, or Docker Enterprise cluster where Sematext Agent
is installed, it will instantly start discovering services that can be monitored. Discovered services will be displayed in Discovery. Clicking on each service lets you enable automatic monitoring for that type of service. In most cases Sematext Agent knows how to set up the monitor without requiring any additional actions from you, which means service metrics will start appearing few seconds after you enable automatic monitoring. In other cases you may have to provide credentials so monitoring agents can connect to the service you wish to monitor. In either case, Autodiscovery UI will guide you and provide the exact instructions.

### How does Sematext Autodiscovery work in bare-metal/virtual machine environments?

It is enough to install sematext-agent rpm/deb package and set up one of your Infra App tokens by following instructions. This will start Sematext Agent which will
automatically start scanning for known service types. Separately, it will connect to Sematext backend to fetch info about any automatic monitoring rules you may have defined.

In bare-metal/virtual machine environments, Sematext Agent will automatically create monitoring agents only if configured to do so in the UI.

### How does Sematext Autodiscovery work in container environments? 

The Sematext Agent container gets distributed to every Kubernetes, Docker Swarm, or Docker Enterprise node. Sematext Agent uses eBPF to watch for services starting, as well as stopping, so it can start and stop monitoring agent containers and pods.

In container environments, Sematext Agent will create a monitoring agent if it finds `MONITORING_TOKEN` in environment variables or labels of your service or if you enabled automatic monitoring for specific service type in the UI. In Kubernetes setups `MONITORING_TOKEN` can be placed in pod annotations.

Example: Steps required to monitor a containerized application like Elasticsearch manually: 
1. Visit Sematext Cloud UI, create a new Elasticsearch App, and open container env instructions.
2. Following the instructions in the UI, deploy Sematext Agent container (as a standalone container, as Kubernetes DaemonSet or as global Swarm Service).
3. Add the Elasticsearch `MONITORING_TOKEN` as label or environment variable to your Elasticsearch container.
4. Restart your Elasticsearch container to apply the label/environment variable.

Example: Steps required to monitor a containerized application like Elasticsearch automatically: 
1. Visit Discovery UI - open instructions to install Sematext Agent in container env.
2. Following the instructions in the UI, deploy Sematext Agent container as a standalone container, Kubernetes DaemonSet, or as global Swarm Service.
3. From Discovery UI, click on any discovered service and enable automatic monitoring option.

As soon as Sematext Agent discovers the Elasticsearch container having a `MONITORING_TOKEN` set or automatic monitoring option enabled, it will set up monitoring agent container which will start to collect the Elasticsearch metrics. 

### Can I have a mix of manually and automatically monitored services?

Yes. In case of bare-metal/virtual machine environments, just follow the classic installation instructions to set up "manually" monitored service agent. Sematext Agent will recognize it as manually set up and will not apply any of automatic monitoring rules on it. Automatic monitoring can be specified on service type level in Discovery UI and will be applied for any instance of that service except those that already have manually set up agent.

In container envs just add the `MONITORING_TOKEN` environment variable (or label) to container of the service you wish to monitor manually. Automatic monitoring can again be enabled in UI and Sematext Agent will again "know" which service instances have manually set up agent and which should get automatic monitoring rule applied.  

In all environments this makes it possible to use different monitoring tokens, and thus different Sematext Apps for the same service type running on the same machine or in the same Kubernetes/Swarm cluster.

### Additional info

- Defining monitoring agent [credential sets](../agents/sematext-agent/autodisco/credential-sets) in Kubernetes.
- Providing [MySQL JDBC driver](../agents/sematext-agent/autodisco/mysql-driver) in container environments.
- [Removing stale](../agents/sematext-agent/autodisco/removing-stale-resources) Sematext Agent resources after deinstallation.
