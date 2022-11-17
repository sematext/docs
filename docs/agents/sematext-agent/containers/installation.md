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
sematext/agent:latest
```

_[Read more](../permission-requirements.md#bind-mounts) about why Sematext Agent needs access to host files and directories._

Besides providing several bind mounts for Docker socket, _procfs_ and journal directory, App tokens are required to ship data to the appropriate Monitoring Apps. Sematext Agent will gather data about running processes on the system, basic operating system metrics, machine/instance related information, and ship it to the Infra App token. It will also detect active containers and start collecting different container metrics such as memory usage, network I/O statistics, disk throughput, etc.

By default, the US region receiver endpoints are used to ship data to Sematext Cloud. You can override receiver addresses by either passing `SERVER_BASE_URL` for metrics receivers, `LOGS_RECEIVER_URL` and `EVENTS_RECEIVER_URL` for log and event receivers respectively or specify an alternative (`EU`) region via `REGION` environment variable.

**Note that if any of the** `*_URL` **environment variables are set, region specific receiver endpoints are ignored.**

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
sematext/agent:latest
```

Docker on OSX relies on virtualization capabilities to spawn the containers inside the VM. The side effect is that Sematext Agent will report the OS metrics of the VM box and not the bare-metal machine where the OSX is running.

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

## Docker Swarm / Enterprise

Create an Infra Monitoring App in Sematext and follow the instructions in the UI.

After that, Sematext Agent can be activated with a single command, but has to be run manually on each node:

```bash
docker run -d --restart always --privileged  -P --name st-agent --memory 512MB \
-v /:/hostfs:ro \
-v /sys/:/hostfs/sys:ro \
-v /var/run/:/var/run/ \
-v /sys/kernel/debug:/sys/kernel/debug \
-v /etc/passwd:/etc/passwd:ro \
-v /etc/group:/etc/group:ro \
-v /dev:/hostfs/dev:ro \
-v /var/run/docker.sock:/var/run/docker.sock:ro \
-e INFRA_TOKEN=<YOUR_INFRA_APP_TOKEN_HERE> \
-e REGION=<US or EU> \
sematext/agent:latest
```

If you like using `docker stack`, the following `docker-compose.yml` provides a working configuration:

```yaml
# docker-compose.yml
services:
  sematext-agent:
    image: 'sematext/agent:latest'
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
```

Then you run:

```bash
docker stack deploy -c docker-compose.yml <name>
```


_[Read more](../permission-requirements.md#bind-mounts) about why Sematext Agent needs access to host files and directories._
