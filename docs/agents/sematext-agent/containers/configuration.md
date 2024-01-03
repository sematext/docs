title: Configuration file
description: For fine-tuning Sematext Agent refer to `st-agent.yml` configuration file.

For fine-tuning Sematext Agent refer to `st-agent.yml` configuration file. You will have to mount the file from the host into the container file system and set `CONFIG_FILE` environment variable to specify the path to the aforementioned configuration file.

The configuration file accepts all options listed below in YAML format.
```yaml
# Sematext Agent configuration file
infra-token: <YOUR_INFRA_APP_TOKEN_HERE>
# Logs token to store Docker and Kubernetes Events in Sematext Logs
logs-token: <YOUR_LOGS_APP_TOKEN_HERE>
# Location to persist events, when backend is not reachable
journal:
  dir: /var/run/st-agent

pkg:
 enabled: true

logging:
  format: json
  write-events: false
  request-tracking: false
  level: warning
```

## Environment Variables

You can adjust the configuration of Sematext Agent with additional environment variables:

| Variable | Description                                                                                                                                                                                                                                                                                                                                                                                                                                                                                  |
|----------|----------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------|
| **Firewall and Proxy Settings** |                                                                                                                                                                                                                                                                                                                                                                                                                                                                                              |
| PROXY_HOST, PROXY_PORT, PROXY_PASSWORD, PROXY_USERNAME | These variables specify the settings for the proxy server.                                                                                                                                                                                                                                                                                                                                                                                                                                   |
| **Docker Connection Options** |                                                                                                                                                                                                                                                                                                                                                                                                                                                                                              |
| DOCKER_TRANSPORT | Defines the transport protocol for communication with Docker daemon. The default transport is UNIX domain socket (`unix:///var/run/docker.sock`). For TCP transport you have to specify an IP address that's reachable from container (`DOCKER_TRANSPORT=tcp://ip-reachable-from-container:2375/`).                                                                                                                                                                                          |
| DOCKER_CERT_PATH | Specifies the path to your certificate files when communication with Docker daemon is carried out over secure channel.                                                                                                                                                                                                                                                                                                                                                                       |
| **Container Monitoring** |                                                                                                                                                                                                                                                                                                                                                                                                                                                                                              |
| CONTAINER_ENABLED | Determines whether the container collector is enabled. Default value is `true`. To disable container collector set `CONTAINER_ENABLED=false`.                                                                                                                                                                                                                                                                                                                                                |
| CONTAINER_MATCH_BY_IMAGE, CONTAINER_MATCH_BY_NAME | These variables control the inclusion of detected containers either by image or container name. Can contain a comma separated list of full container/images names or regular expression patterns (`CONTAINER_MATCH_BY_IMAGE=nginx,mongo*`).                                                                                                                                                                                                                                                  |
| CONTAINER_SKIP_BY_IMAGE, CONTAINER_SKIP_BY_NAME | These variables control the exclusion of detected containers either by image or container name. Can contain a comma separated list of full container/images names or regular expression patterns (`CONTAINER_SKIP_BY_IMAGE=nginx,mongo*`). **Important**: By default, the agent skips the following images: `CONTAINER_SKIP_BY_IMAGE=sematext/agent,sematext/app-agent,timberio/vector`. If you modify this environment variable, please ensure to append these options to your configuration. |
| **Process Monitoring** |                                                                                                                                                                                                                                                                                                                                                                                                                                                                                              |
| PROCESS_ENABLED | Specifies if process metrics collection is enabled. To disable process metrics collector set `PROCESS_ENABLED=false`.                                                                                                                                                                                                                                                                                                                                                                        |
| **Network Monitoring** |                                                                                                                                                                                                                                                                                                                                                                                                                                                                                              |
| NETRACER_ENABLED | Controls whether network topology collector is turned on. Network tracer is disabled by default. To enable network tracer set `NETRACER_ENABLED=true`. In order to capture network traffic from the host, you should start the container with host networking by passing the `--network=host` argument to Docker engine. This is only required when pcap network tracer is used.                                                                                                             |
| NETRACER_INPUT_FILTER, NETRACER_OUTPUT_FILTER | When specified, applies filtering expressions to all inbound/outbound packets (`NETRACER_INPUT_FILTER="dst port 8923 and tcp"`).                                                                                                                                                                                                                                                                                                                                                             |
| NETRACER_INTERFACES | A comma-separated list of network interfaces to monitor. By default all interfaces are tracked.                                                                                                                                                                                                                                                                                                                                                                                              |
| NETRACER_LOOPBACK | Determines whether loopback interfaces should be captured for network traffic. By default network packets are not captured from loopback interfaces.                                                                                                                                                                                                                                                                                                                                         |
| NETRACER_EBPF_TRACK_TCP | Determines whether TCP connections are tracked by ebpf tracer. By default TCP traffic statistics are collected.                                                                                                                                                                                                                                                                                                                                                                              |
| NETRACER_EBPF_TRACK_UDP | Determines whether UDP connections are tracked by ebpf tracer. By default UDP traffic statistics are collected.                                                                                                                                                                                                                                                                                                                                                                              |  
| **Troubleshooting Options** |                                                                                                                                                                                                                                                                                                                                                                                                                                                                                              |
| CPUPROFILE | Name of the file where `pprof` CPU profile is dumped. When provided this turns on the CPU profiling and writes data to a given file.                                                                                                                                                                                                                                                                                                                                                         |
| LOGGING_LEVEL | Defines the minimal allowed log level. Default log level is `info`. You can choose between `debug`, `info`, `warn/warning`, `error`, `fatal` and `panic`.                                                                                                                                                                                                                                                                                                                                    |
| LOGGING_WRITE_EVENTS | Defines whether event payloads are written to standard output stream. Useful for debugging. You can disable this feature by passing `LOGGING_WRITE_EVENTS=false` environment variable during container bootstrap.                                                                                                                                                                                                                                                                            |
| **Other Agent Settings** |                                                                                                                                                                                                                                                                                                                                                                                                                                                                                              |
| INTERVAL | Specifies the collection interval for metrics collectors. Default interval is `10s`. You can specify a duration for collection interval in seconds, minutes or hours (`INTERVAL=1m`).                                                                                                                                                                                                                                                                                                        |
| JOURNAL_DIR | Defines the data directory where failed events are stored. Agent periodically scans this directory and resends events to the backend.                                                                                                                                                                                                                                                                                                                                                        |
| JOURNAL_RETRY_INTERVAL | Specifies how often journal directory is scanned for failed events. Default interval is `30s`. You can specify a different interval in either seconds, minutes or hours (`JOURNAL_RETRY_INTERVAL=5m`)                                                                                                                                                                                                                                                                                        |
| AUTODISCO_TEMPLATES_PATH | Defines the location of the `autodisco.yml` file that contains definitions of patterns involved in app auto-discovery.                                                                                                                                                                                                                                                                                                                                                                       |
| HOSTNAME_ALIAS | When specified it overrides the original host name.                                                                                                                                                                                                                                                                                                                                                                                                                                          |

Your documentation is quite clear, but I have made a few grammatical and stylistic improvements for better readability. Here's the revised version:

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
-e COMMAND_SERVER_URL=https://command.sematext.com \
sematext/agent:latest
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
-e COMMAND_SERVER_URL=https://command.sematext.com \
-e CONTAINER_SKIP_BY_IMAGE=nginx \
sematext/agent:latest
```

To skip multiple images simply separate them with a comma. In the example below we ignore containers whose names contain `nginx` or `httpd`.

```bash
docker run -d --restart always --privileged -P --name st-agent --memory 512MB \
-v /:/hostfs:ro \
-v /sys/:/hostfs/sys:ro \
# ...
-e CONTAINER_SKIP_BY_IMAGE=nginx,apache/httpd \
sematext/agent:latest
```

**Note:** The `CONTAINER_SKIP_BY_IMAGE` values will search for any substring match among the discovered images. Therefore, if you wish to skip the `apache/httpd` image, you can simply use `httpd`. This applies similarly to other matching and skipping options such as `CONTAINER_MATCH_BY_IMAGE`, `CONTAINER_MATCH_BY_NAME`, and `CONTAINER_SKIP_BY_NAME`.

If you are using Docker Swarm, append the new line in the `environment` section of your `docker-compose.yml` file:

```yaml
# docker-compose.yml
version: "3"
services:
  st-agent:
    image: sematext/agent:latest
    privileged: true
    environment:
      - INFRA_TOKEN=<your-infra-token>
      - SERVER_BASE_URL=https://spm-receiver.sematext.com
      - LOGS_RECEIVER_URL=https://logsene-receiver.sematext.com
      - EVENTS_RECEIVER_URL=https://event-receiver.sematext.com
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
