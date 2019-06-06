title: Sematext Core Container Monitoring
description: Monitor Docker, rkt and containerd containers with Sematext by installing simple Agents and using our interface that shows everything in one simple screen.

## Create a Sematext Monitoring App
Creating a Sematext Monitoring App is as easy as choosing the Docker integrations and giving the App a name.

<video style="display:block; width:100%; height:auto;" controls autoplay loop>
  <source src="../../images/monitoring/create-docker-app.mp4" type="video/mp4" />
</video>

## Install the Sematext Agent
Sematext can easily monitor your containers with the Sematext Agent. [Installing](../agents/sematext-agent/containers/installation) the Agent is as simple as running one command on each host.

For Docker:

```bash
docker run -d  --restart always --privileged -P --name st-agent \
-v /sys/kernel/debug:/sys/kernel/debug \
-v /var/run/:/var/run/ \
-v /proc:/host/proc:ro \
-v /etc:/host/etc:ro \
-v /sys:/host/sys:ro \
-v /usr/lib:/host/usr/lib:ro \
-e CONTAINER_TOKEN=<YOUR_DOCKER_APP_TOKEN_HERE> \
-e INFRA_TOKEN=<YOUR_INFRA_APP_TOKEN_HERE> \
-e REGION=<US or EU> \
-e JOURNAL_DIR=/var/run/st-agent \
-e LOGGING_WRITE_EVENTS=false \
-e LOGGING_REQUEST_TRACKING=false \
-e LOGGING_LEVEL=info \
-e NODE_NAME=`hostname` \
-e CONTAINER_SKIP_BY_IMAGE=sematext \
sematext/agent:latest
```

For Docker Compose:

```yaml
# docker-compose.yml
version: '3'
services:
  sematext-agent:
    image: 'sematext/agent:latest'
    environment:
      - affinity:container!=*sematext-agent*
      - CONTAINER_TOKEN=<YOUR_DOCKER_APP_TOKEN_HERE>
      - INFRA_TOKEN=<YOUR_INFRA_APP_TOKEN_HERE>
      - REGION=<US or EU>
      - JOURNAL_DIR=/var/run/st-agent
      - LOGGING_WRITE_EVENTS=false
      - LOGGING_REQUEST_TRACKING=false
      - LOGGING_LEVEL=info
      - NODE_NAME=$HOSTNAME
      - CONTAINER_SKIP_BY_IMAGE=sematext
    cap_add:
      - SYS_ADMIN
    restart: always
    volumes:
      - '/var/run/:/var/run/'
      - '/sys/kernel/debug:/sys/kernel/debug'
      - '/proc:/host/proc:ro'
      - '/etc:/host/etc:ro'
      - '/sys:/host/sys:ro'
      - '/usr/lib:/host/usr/lib:ro'
```

For Docker Swarm:

```bash
docker service create --mode global --name st-agent \
--restart-condition any \
--mount type=bind,src=/var/run,dst=/var/run/ \
--mount type=bind,src=/usr/lib,dst=/host/usr/lib \
--mount type=bind,src=/sys/kernel/debug,dst=/sys/kernel/debug \
--mount type=bind,src=/proc,dst=/host/proc,readonly \
--mount type=bind,src=/etc,dst=/host/etc,readonly \
--mount type=bind,src=/sys,dst=/host/sys,readonly \
-e NODE_NAME={{.Node.Hostname}} \
-e INFRA_TOKEN=<YOUR_INFRA_APP_TOKEN_HERE> \
-e CONTAINER_TOKEN=<YOUR_DOCKER_APP_TOKEN_HERE> \
-e REGION=<US or EU> \
-e JOURNAL_DIR=/var/run/st-agent \
-e LOGGING_REQUEST_TRACKING=false \
-e LOGGING_WRITE_EVENTS=false \
-e LOGGING_LEVEL=info \
sematext/agent:latest
```

## See Container data in Sematext Monitoring
Sematext Agent collects a plethora of metrics about hosts (CPU, memory, disk, network, processes), containers (Docker, rkt, containerd) and orchestrator platforms and ships that to Sematext Cloud.

<video style="display:block; width:100%; height:auto;" controls autoplay loop>
  <source src="../../images/monitoring/shipping-docker-metrics.mp4" type="video/mp4" />
</video>

You can see host and container metrics inside the newly created Docker App or have a high-level overview of all your containers in the Sematext Containers screen.

Check out the [Sematext Agent installation for Docker](../agents/sematext-agent/containers/installation) guide for more info.

## More about Docker Monitoring
* [Docker Monitoring with Sematext Agent](../agents/sematext-agent/)
* [Docker Container Monitoring with Sematext](https://sematext.com/blog/docker-container-monitoring-with-sematext/)
* [Docker Container Monitoring and Management Challenges](https://sematext.com/blog/docker-container-monitoring-management-challenges/)
* [Docker Container Performance Metrics](https://sematext.com/blog/top-docker-metrics-to-watch/)

