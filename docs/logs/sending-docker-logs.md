title: Sending Docker Logs with Sematext Agent
description: Collect and ship container logs with Sematext Agent

The [Sematext Agent Docker image](https://hub.docker.com/r/sematext/agent) is pre-configured for [log collection on container platforms](https://sematext.com/blog/docker-container-monitoring-with-sematext/#toc-container-logs-0). It runs as a tiny container on every Docker host and collects logs for all cluster nodes and their containers. [Sematext Agent](https://sematext.com/docs/agents/sematext-agent/) enriches container logs with container metadata such as Kubernetes, Docker Enterprise, and Docker Swarm.

[Sematext Agent](https://sematext.com/docs/agents/sematext-agent/) deployment is very simple. Login to your Sematext Cloud account and create a **Logs App** and select the **Docker** environment to see the installation instructions.

<img src="/docs/images/logs/logs-app-docker-environment.png" alt="docker environment">

After agent installation, Sematext Agent will discover all the log sources that are available within the container.

<img src="/docs/images/logs/logs-app-dockerd-discovered-logs.png" alt="discovered logs">

Click on the **"Set Up"** button next to the services from which you want to ship logs. This enables automatic log shipping for the selected services. 

Note that Sematext Agent recognizes log formats from various applications and provides out-of-the-box Dashboards and [Alert Rules](https://sematext.com/docs/guide/alerts-guide/) for each [integration](https://sematext.com/docs/integration/) type. So when you are creating a Logs App, select the integration type based on the services you are running on your container. 

<img src="/docs/images/logs/integrations.png" alt="docker environment">

You also have the option to create a generic logs App and create custom Reports based on your log source. 

