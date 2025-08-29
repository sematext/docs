title: Installing Sematext Agent on Docker
description: To deploy the Sematext Agent as a container, run a simple command on each one of your hosts.

Installing Sematext Agent can be done by using Docker, Docker Compose, and Docker Swarm / Enterprise.

## Docker

To deploy the Sematext Agent as a container, run the following command on each host:

```bash
docker run -d  --restart always --privileged -P --name st-agent \
-v /:/hostfs:ro \
-v /sys/:/hostfs/sys:ro \
-v /var/run/:/var/run/ \
-v /sys/kernel/debug:/sys/kernel/debug \
-v /etc/passwd:/etc/passwd:ro \
-v /etc/group:/etc/group:ro \
-e INFRA_TOKEN=<YOUR_INFRA_APP_TOKEN_HERE> \
-e REGION=<US or EU> \
sematext/agent:latest-4
```

_[Read more](/docs/agents/sematext-agent/permission-requirements/#bind-mounts) about why Sematext Agent needs access to host files and directories._

Besides providing several bind mounts for Docker socket, _procfs_ and journal directory, App tokens are required to ship data to the appropriate Monitoring Apps. Sematext Agent will gather data about running processes on the system, basic operating system metrics, machine/instance-related information, and ship it to the Infra App token. It will also detect active containers and start collecting different container metrics such as memory usage, network I/O statistics, disk throughput, etc.

By default, the US region receiver endpoints are used to ship data to Sematext Cloud. You can override receiver addresses by either passing `SERVER_BASE_URL` for metrics receivers, `LOGS_RECEIVER_URL` and `EVENTS_RECEIVER_URL` for log and event receivers respectively, or specify an alternative (`EU`) region via the `REGION` environment variable.

**Note that if any of the** `*_URL` **environment variables are set, region-specific receiver endpoints are ignored.**

### Updating/Upgrading Sematext Agent on Docker

To update or upgrade the Sematext Agent to the latest version, you can pull the latest image and recreate the container:

```bash
docker pull sematext/agent:latest-4
docker rm -f st-agent
docker run -d  --restart always --privileged -P --name st-agent \
-v /:/hostfs:ro \
-v /sys/:/hostfs/sys:ro \
-v /var/run/:/var/run/ \
-v /sys/kernel/debug:/sys/kernel/debug \
-v /etc/passwd:/etc/passwd:ro \
-v /etc/group:/etc/group:ro \
-e INFRA_TOKEN=<YOUR_INFRA_APP_TOKEN_HERE> \
-e REGION=<US or EU> \
sematext/agent:latest-4
```

### Uninstalling Sematext Agent on Docker

To remove the Sematext Agent container from a Docker host, run the following command:

```bash
docker ps -a --format '{{.Names}}' | grep -E "sematext-agent|st-agent" | xargs -r docker rm -f
```

This command will find and force-remove any containers named `sematext-agent` or `st-agent` from the host.

## Docker for OSX

To deploy the Sematext Agent on Docker for OSX, run the following command:

```bash
docker run -d  --restart always --privileged -P --name st-agent \
-v /:/hostfs:ro \
-v /sys/:/hostfs/sys:ro \
-v /var/run/:/var/run/ \
-v /sys/kernel/debug:/sys/kernel/debug \
-v /etc/passwd:/etc/passwd:ro \
-v /etc/group:/etc/group:ro \
-v /var/run/docker.sock:/var/run/docker.sock:ro \
-e INFRA_TOKEN=<YOUR_INFRA_APP_TOKEN_HERE> \
-e REGION=<US or EU> \
sematext/agent:latest-4
```

Docker on OSX relies on virtualization capabilities to spawn the containers inside the VM. The side effect is that Sematext Agent will report the OS metrics of the VM box and not the bare-metal machine where OSX is running.

### Updating/Upgrading Sematext Agent on Docker for OSX

To update the Sematext Agent on Docker for OSX, follow the same steps as for Docker:

```bash
docker pull sematext/agent:latest-4
docker rm -f st-agent
docker run -d  --restart always --privileged -P --name st-agent \
-v /:/hostfs:ro \
-v /sys/:/hostfs/sys:ro \
-v /var/run/:/var/run/ \
-v /sys/kernel/debug:/sys/kernel/debug \
-v /etc/passwd:/etc/passwd:ro \
-v /etc/group:/etc/group:ro \
-v /var/run/docker.sock:/var/run/docker.sock:ro \
-e INFRA_TOKEN=<YOUR_INFRA_APP_TOKEN_HERE> \
-e REGION=<US or EU> \
sematext/agent:latest-4
```

### Uninstalling Sematext Agent on Docker for OSX

To remove the Sematext Agent container on Docker for OSX, use the following command:

```bash
docker ps -a --format '{{.Names}}' | grep -E "sematext-agent|st-agent" | xargs -r docker rm -f
```

### Run Sematext Agent with a Config File

Mount the configuration file into the container and set the path to the configuration file ```-v /opt/st-agent/st-agent.yml:/opt/st-agent/st-agent.yml ``` via `CONFIG_FILE` environment variable.

```bash
$ docker run -d  --restart always --privileged -P --name st-agent \
-v /:/hostfs:ro \
-v /sys/:/hostfs/sys:ro \
-v /var/run/:/var/run/ \
-v /sys/kernel/debug:/sys/kernel/debug \
-v /etc/passwd:/etc/passwd:ro \
-v /etc/group:/etc/group:ro \
-v /dev:/hostfs/dev:ro \
-e INFRA_TOKEN=<YOUR_INFRA_APP_TOKEN_HERE> \
-e REGION=<US or EU> \
sematext/agent:latest-4
```

## Docker Compose

For the deployments that are orchestrated by Docker Compose, you can use the following manifest:

```yaml
# docker-compose.yml
version: '3'
services:
  sematext-agent:
    image: 'sematext/agent:latest-4'
    environment:
      - affinity:container!=*sematext-agent*
      - INFRA_TOKEN=<YOUR_INFRA_APP_TOKEN_HERE>
      - REGION=<US or EU>
      - LOGGING_WRITE_EVENTS=false
      - LOGGING_REQUEST_TRACKING=false
      - LOGGING_LEVEL=info
      - NODE_NAME=$HOSTNAME
      - CONTAINER_SKIP_BY_IMAGE=sematext
    cap_add:
      - SYS_ADMIN
    restart: always
    volumes:
      - '/:/hostfs:ro'
      - '/etc/passwd:/etc/passwd:ro'
      - '/etc/group:/etc/group:ro'
      - '/var/run/:/var/run/'
      - '/sys/kernel/debug:/sys/kernel/debug'
      - '/sys:/host/sys:ro'
      - '/dev:/hostfs/dev:ro'
```

### Updating/Upgrading Sematext Agent using Docker Compose

To update the Sematext Agent using Docker Compose, follow these steps:

```bash
docker-compose pull sematext-agent
docker-compose down
docker-compose up -d
```

This process will pull the latest version of the agent, stop the current container, and start the updated version.

### Uninstalling Sematext Agent using Docker Compose

To remove the Sematext Agent using Docker Compose, run:

```bash
docker-compose down
```

This will stop and remove the Sematext Agent container managed by Docker Compose.

## Docker Swarm / Enterprise

Create an Infra Monitoring App in Sematext and follow the Docker Swarm instructions in the UI.

The following `docker-compose.yml` file provides a working configuration that can be used with `docker stack`. However, for convenience, a version pre-filled with `INFRA_TOKEN` and `REGION` can be found in the installation instructions in the UI.

```yaml
# docker-compose.yml
version: '3'
services:
  sematext-agent:
    image: 'sematext/agent:latest-4'
    environment:
      - INFRA_TOKEN: <YOUR_INFRA_APP_TOKEN_HERE>
      - REGION: <US or EU>
    cap_add:
      - SYS_ADMIN
    restart: always
    volumes:
      - '/:/hostfs:ro'
      - '/etc/passwd:/etc/passwd:ro'
      - '/etc/group:/etc/group:ro'
      - '/var/run/:/var/run/'
      - '/sys/kernel/debug:/sys/kernel/debug'
      - '/sys:/host/sys:ro'
      - '/dev:/hostfs/dev:ro'
      - '/var/run/docker.sock:/var/run/docker.sock:ro'
    networks:
      - st-agent-net
networks:
  st-agent-net:
    driver: overlay
    attachable: true
```

Then you run:

```bash
docker stack deploy -c docker-compose.yml <my_app>
```

_[Read more](/docs/agents/sematext-agent/permission-requirements/#bind-mounts) about why Sematext Agent needs access to host files and directories._

### Updating/Upgrading Sematext Agent on Docker Swarm / Enterprise

To update the Sematext Agent on Docker Swarm, follow these steps:

```bash
docker service update --image sematext/agent:latest-4 sematext-agent
```

This command will update the Sematext Agent service to the latest image.

### Uninstalling Sematext Agent on Docker Swarm / Enterprise

To remove the Sematext Agent deployed via Docker Swarm, run:

```bash
docker service rm sematext-agent-docker sematext-agent st-agent
docker network rm st-agent-net
```

This will remove the Sematext Agent services and network from your Docker Swarm environment.
