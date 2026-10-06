title: Containers Configuration
description: Configure how Sematext Agent connects to Docker, which containers it monitors, and how to pass settings to the agent container

This page covers settings for running Sematext Agent in containers. Settings that apply to every installation, such as proxy, logging, and journal settings, are on the [Sematext Agent configuration](/docs/agents/sematext-agent/configuration/) page.

## Configuration File

To use an `st-agent.yml` configuration file with the agent container, mount the file from the host into the container file system and set the `CONFIG_FILE` environment variable to its path inside the container. See [Sematext Agent configuration](/docs/agents/sematext-agent/configuration/#configuration-file) for the file format.

## Environment Variables

| Variable | Description |
|----------|-------------|
| **Docker Connection Options** | |
| DOCKER_TRANSPORT | Defines the transport protocol for communication with Docker daemon. The default transport is UNIX domain socket (`unix:///var/run/docker.sock`). For TCP transport you have to specify an IP address that's reachable from container (`DOCKER_TRANSPORT=tcp://ip-reachable-from-container:2375/`). |
| DOCKER_CERT_PATH | Specifies the path to your certificate files when communication with Docker daemon is carried out over secure channel. |
| **Container Monitoring** | |
| CONTAINER_ENABLED | Determines whether the container collector is enabled. Default value is `true`. To disable container collector set `CONTAINER_ENABLED=false`. |
| CONTAINER_MATCH_BY_IMAGE, CONTAINER_MATCH_BY_NAME | These variables control the inclusion of detected containers either by image or container name. Can contain a comma separated list of full container/images names or regular expression patterns (`CONTAINER_MATCH_BY_IMAGE=nginx,mongo*`). |
| CONTAINER_SKIP_BY_IMAGE, CONTAINER_SKIP_BY_NAME | These variables control the exclusion of detected containers either by image or container name. Can contain a comma separated list of full container/images names or regular expression patterns (`CONTAINER_SKIP_BY_IMAGE=nginx,mongo*`). **Important**: By default, the agent skips the following images: `CONTAINER_SKIP_BY_IMAGE=sematext/agent,sematext/app-agent,timberio/vector`. If you modify this environment variable, please ensure to append these options to your configuration. |

## Populating Environment Variables

Environment variables for container-based agents can be directly populated using the manifest. For instance, consider the following installation instruction:

```bash
docker run -d --restart always --privileged -P --name st-agent --memory 512MB \
-v /:/hostfs:ro \
-v /sys/:/hostfs/sys:ro \
-v /var/run/:/var/run/ \
-v /sys/kernel/debug:/sys/kernel/debug \
-v /etc/passwd:/etc/passwd:ro \
-v /etc/group:/etc/group:ro \
-v /dev:/hostfs/dev:ro \
-v /var/run/docker.sock:/var/run/docker.sock:ro \
-e INFRA_TOKEN=85015a9b-6530-4023-9a68-660cce3546b3 \
-e SERVER_BASE_URL=https://spm-receiver.sematext.com \
-e LOGS_RECEIVER_URL=https://logsene-receiver.sematext.com \
-e EVENTS_RECEIVER_URL=https://event-receiver.sematext.com \
-e AIMONITORING_RECEIVER_URL=https://aimonitoring-receiver.sematext.com \
-e COMMAND_SERVER_URL=https://command.sematext.com \
sematext/agent:latest-4
```

You can add different environment variables preceded by the `-e` argument. For example, if you want to ignore the discovery of `nginx` processes, add `-e CONTAINER_SKIP_BY_IMAGE=nginx`. Remember to place the last `\` right after:

```bash
docker run -d --restart always --privileged -P --name st-agent --memory 512MB \
-v /:/hostfs:ro \
-v /sys/:/hostfs/sys:ro \
-v /var/run/:/var/run/ \
-v /sys/kernel/debug:/sys/kernel/debug \
-v /etc/passwd:/etc/passwd:ro \
-v /etc/group:/etc/group:ro \
-v /dev:/hostfs/dev:ro \
-v /var/run/docker.sock:/var/run/docker.sock:ro \
-e INFRA_TOKEN=<your-infra-token> \
-e SERVER_BASE_URL=https://spm-receiver.sematext.com \
-e LOGS_RECEIVER_URL=https://logsene-receiver.sematext.com \
-e EVENTS_RECEIVER_URL=https://event-receiver.sematext.com \
-e AIMONITORING_RECEIVER_URL=https://aimonitoring-receiver.sematext.com \
-e COMMAND_SERVER_URL=https://command.sematext.com \
-e CONTAINER_SKIP_BY_IMAGE=nginx \
sematext/agent:latest-4
```

To skip multiple images simply separate them with a comma. In the example below we ignore containers whose names contain `nginx` or `httpd`.

```bash
docker run -d --restart always --privileged -P --name st-agent --memory 512MB \
-v /:/hostfs:ro \
-v /sys/:/hostfs/sys:ro \
# ...
-e CONTAINER_SKIP_BY_IMAGE=nginx,apache/httpd \
sematext/agent:latest-4
```

**Note:** The `CONTAINER_SKIP_BY_IMAGE` values will search for any substring match among the discovered images. Therefore, if you wish to skip the `apache/httpd` image, you can simply use `httpd`. This applies similarly to other matching and skipping options such as `CONTAINER_MATCH_BY_IMAGE`, `CONTAINER_MATCH_BY_NAME`, and `CONTAINER_SKIP_BY_NAME`.

If you are using Docker Swarm, append the new line in the `environment` section of your `docker-compose.yml` file:

```yaml
# docker-compose.yml
version: "3"
services:
  st-agent:
    image: sematext/agent:latest-4
    privileged: true
    environment:
      - INFRA_TOKEN=<your-infra-token>
      - SERVER_BASE_URL=https://spm-receiver.sematext.com
      - LOGS_RECEIVER_URL=https://logsene-receiver.sematext.com
      - EVENTS_RECEIVER_URL=https://event-receiver.sematext.com
      - AIMONITORING_RECEIVER_URL=https://aimonitoring-receiver.sematext.com
      - COMMAND_SERVER_URL=https://command.sematext.com
      - CONTAINER_SKIP_BY_IMAGE=nginx
    cap_add:
      - SYS_ADMIN
    restart: always
    volumes:
      - /:/hostfs:ro
      - /etc/passwd:/etc/passwd:ro
      - /etc/group:/etc/group:ro
      - /var/run/:/var/run
      - /sys/kernel/debug:/sys/kernel/debug
      - /sys:/host/sys:ro
      - /dev:/hostfs/dev:ro
      - /var/run/docker.sock:/var/run/docker.sock:ro
```
