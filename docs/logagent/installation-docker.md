title: Installing Logagent on Docker
description: Logagent, Sematext log shipper and Logstash alternative, is available as Docker image. It has automatic Docker installation and seamless logging system service integration with our log management and analysis platform

Please note the following instructions use the latest Logagent image from Docker Hub.
If you want to use certified images please pull the image from Red Hat and Docker registries.

## Certified Logagent Images

- Red Hat Certified Image: `docker pull registry.connect.redhat.com/sematext/logagent`
- Docker Certified Image: `docker pull sematext/logagent`

For Kubernetes or Helm installation instructions, see:

- [Kubernetes Installation](./installation-kubernetes)
- [Helm Installation](./installation-helm)

## Installation for Docker

The Logagent Docker image is pre-configured for the log collection on container platforms. It runs as a tiny container on every Docker host and collects logs for all cluster nodes and their containers.
All container logs are enriched with Kubernetes and Docker EE/Swarm metadata.

See: [sematext/logagent](https://hub.docker.com/r/sematext/logagent/) on Docker Hub.

### Docker Run

The most basic way to start is via docker run command:

```
docker pull sematext/logagent
docker run -d --restart=always --name logagent \
-e LOGS_TOKEN=YOUR_LOGS_TOKEN \
-e LOGS_RECEIVER_URL="https://logsene-receiver.sematext.com" \
-v /var/run/docker.sock:/var/run/docker.sock sematext/logagent
```


### Docker Compose

To use [Docker Compose](https://docs.docker.com/compose/) create docker-compose.yml as follows and insert real tokens:

```
# docker-compose.yml
logagent:
  image: 'sematext/logagent:latest'
  environment:
    - LOGS_TOKEN=YOUR_LOGS_TOKEN
    - LOGS_RECEIVER_URL="https://logsene-receiver.sematext.com"
  cap_add:
    - SYS_ADMIN
  restart: always
  volumes:
    - '/var/run/docker.sock:/var/run/docker.sock'
```

Then start Logagent with the docker-compose file:

```
docker-compose up -d
```

### Docker Swarm and Docker Enterprise

Connect your Docker client to Swarm or UCP remote API endpoint and
deploy Logagent with following docker command with your Logs App Token:

```bash
docker service create --mode global --name st-logagent \
--restart-condition any \
--mount type=bind,src=/var/run/docker.sock,dst=/var/run/docker.sock \
-e LOGS_TOKEN="REPLACE THIS WITH YOUR LOGS TOKEN" \
-e REGION=US \
sematext/logagent:latest
```

## Configuration

To see detailed configuration params and manuals, see:

- [Container Configuration Parameters](./container-config-parameters)
- [Container Configuration Manual](./container-config-manual)

## Known Issues

**Conflict with Docker logging-drivers. Logagent is running
with a valid Logs Token, but Sematext Cloud does not show container logs. **

Please note that Logagent collects logs via Docker Remote
API. If you use a Docker logging-driver other than the default json-file
driver, logs will not be available via the Docker Remote API. 

Please make sure that your container or docker daemon uses json-file logging
driver. This ensures that logs are exposed via Docker Remote API. To
check, run the "docker logs" command. If "docker logs CID" shows
container logs then Logagent should be able to collect the
logs as well.

Please check the parsed timestamps!
Logs with timestamps in the future (or several months or years in the past) might not be displayed in Sematext Cloud.
