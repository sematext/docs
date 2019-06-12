To deploy the Sematext Agent as a container, run the following command on each host:

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

Besides providing several bind mounts for Docker socket, _procfs_ and journal directory, App tokens are required to ship data to the appropriate Monitoring Apps. Sematext Agent will gather data about running processes on the system, basic operating system metrics, machine/instance related information, and ship it to the Infra App token. It will also detect active containers and start collecting different container metrics such as memory usage, network I/O statistics, disk throughput, etc.

By default, the US region receiver endpoints are used to ship data to Sematext Cloud. You can override receiver addresses by either passing `SERVER_BASE_URL` for metrics receivers, `LOGS_RECEIVER_URL` and `EVENTS_RECEIVER_URL` for log and event receivers respectively or specify an alternative (`EU`) region via `REGION` environment variable.

**Note that if any of the** `*_URL` **environment variables are set, region specific receiver endpoints are ignored.**

#### Run Sematext Agent with a Config File

Mount the configuration file into the container and set the path to the configuration file ```-v /opt/st-agent/st-agent.yml:/opt/st-agent/st-agent.yml ``` via `CONFIG_FILE` environment variable.

```bash
$ docker run -d  --restart always --privileged -P --name st-agent \
-v /sys/kernel/debug:/sys/kernel/debug \
-v /var/run/:/var/run/ \
-v /proc:/host/proc:ro \
-v /etc:/host/etc:ro \
-v /sys:/host/sys:ro \
-v /usr/lib:/host/usr/lib:ro \
-e CONTAINER_TOKEN=<YOUR_DOCKER_APP_TOKEN_HERE> \
-e INFRA_TOKEN=<YOUR_INFRA_APP_TOKEN_HERE> \
-e REGION=<US or EU> \
-e NODE_NAME=`hostname` \
-e CONTAINER_SKIP_BY_IMAGE=sematext \
-e CONFIG_FILE=/opt/st-agent/st-agent.yml \
sematext/agent:latest
```

## Docker Compose
For the deployments that are orchestrated by Docker Compose, you can use the following manifest:

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

## Docker Enterprise / Swarm

Create a Docker Monitoring App in Sematext and follow the instructions in the UI.
Sematext Agent can be deployed as global service on all Swarm nodes with a single command:

```
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
