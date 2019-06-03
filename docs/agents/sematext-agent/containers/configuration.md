## Configuration file

For fine-tunning Sematext Agent refer to `st-agent.yml` configuration file. You will have to attach a bind mount with file location and pass the `CONFIG_FILE` environment variable that contains the path to the aforementioned configuration file.

The configuration file accepts all options (listed below) in YAML format.
```yaml
# Sematext Agent configuration file
infra-token: <YOUR_INFRA_APP_TOKEN_HERE>
container-token: <YOUR_DOCKER_APP_TOKEN_HERE>
# Logs token to store Docker and Kubernetes Events in Sematext Logs
logs-token: <YOUR_LOGS_APP_TOKEN_HERE>
# Location to persist events, when backend is not reachable
journal:
  dir: /var/run/st-agent

pkg:
 enabled: false

logging:
  format: json
  write-events: false
  request-tracking: false
  level: warning
```

## Environment Variables

You can adjust the configuration of Sematext Agent with additional environment variables:

| Variable | Description |
|----------|-------------|
| **Firewall and Proxy Settings** | |
| PROXY_HOST, PROXY_PORT, PROXY_PASSWORD, PROXY_USERNAME | These variables specify the settings for the proxy server. |
| **Docker Connection Options** | |
| DOCKER_TRANSPORT | Defines the transport protocol for communication with Docker daemon. The default transport is UNIX domain socket (`unix:///var/run/docker.sock`). For TCP transport you have to specify an IP address that's reachable from container (`DOCKER_TRANSPORT=tcp://ip-reachable-from-container:2375/`).|
| DOCKER_CERT_PATH | Specifies the path to your certificate files when communication with Docker daemon is carried out over secure channel. |
| **Container Monitoring** | |
| CONTAINER_ENABLED | Determines whether the container collector is enabled. Default value is `true`. To disable container collector set `CONTAINER_ENABLED=false`. |
| CONTAINER_MATCH_BY_IMAGE, CONTAINER_MATCH_BY_NAME | These variables control the inclusion of detected containers either by image or container name. Can contain a comma separated list of full container/images names or regular expression patterns (`CONTAINER_MATCH_BY_IMAGE=nginx,mongo*`).|
| CONTAINER_SKIP_BY_IMAGE, CONTAINER_SKIP_BY_NAME | These variables control the exclusion of detected containers either by image or container name. Can contain a comma separated list of full container/images names or regular expression patterns (`CONTAINER_SKIP_BY_IMAGE=nginx,mongo*`).|
| **Process Monitoring** | |
| PROCESS_ENABLED | Specifies if process metrics collection is enabled. To disable process metrics collector set `PROCESS_ENABLED=false`. |
| **Network Monitoring** | |
| NETRACER_ENABLED | Controls whether network topology collector is turned on. Network tracer is disabled by default. To enable network tracer set `NETRACER_ENABLED=true`. In order to capture network traffic from the host, you should start the container with host networking by passing the `--network=host` argument to Docker engine. This is only required when pcap network tracer is used. |
| NETRACER_INPUT_FILTER, NETRACER_OUTPUT_FILTER | When specified, applies filtering expressions to all inbound/outbound packets (`NETRACER_INPUT_FILTER="dst port 8923 and tcp"`). |
| NETRACER_INTERFACES | A comma-separated list of network interfaces to monitor. By default all interfaces are tracked. |
| NETRACER_LOOPBACK | Determines whether loopback interfaces should be captured for network traffic. By default network packets are not captured from loopback interfaces. |
| NETRACER_EBPF_TRACK_TCP | Determines whether TCP connections are tracked by ebpf tracer. By default TCP traffic statistics are collected. |
| NETRACER_EBPF_TRACK_UDP | Determines whether UDP connections are tracked by ebpf tracer. By default UDP traffic statistics are collected. |  
| **Troubleshooting Options** | |
| CPUPROFILE | Name of the file where `pprof` CPU profile is dumped. When provided this turns on the CPU profiling and writes data to a given file. |
| LOGGING_LEVEL | Defines the minimal allowed log level. Default log level is `info`. You can choose between `debug`, `info`, `warn/warning`, `error`, `fatal` and `panic`. |
| LOGGING_WRITE_EVENTS | Defines whether event payloads are written to standard output stream. Useful for debugging. You can disable this feature by passing `LOGGING_WRITE_EVENTS=false` environment variable during container bootstrap. |
| **Other Agent Settings** | |
| INTERVAL | Specifies the collection interval for metrics collectors. Default interval is `10s`. You can specify a duration for collection interval in seconds, minutes or hours (`INTERVAL=1m`). |
| JOURNAL_DIR | Defines the data directory where failed events are stored. Agent periodically scans this directory and resends events to the backend. |
| JOURNAL_RETRY_INTERVAL | Specifies how often journal directory is scanned for failed events. Default interval is `30s`. You can specify a different interval in either seconds, minutes or hours (`JOURNAL_RETRY_INTERVAL=5m`) |
| AUTODISCO_TEMPLATES_PATH | Defines the location of the `autodisco.yml` file that contains definitions of patterns involved in app auto-discovery.|
| HOSTNAME_ALIAS | When specified it overrides the original host name. |
