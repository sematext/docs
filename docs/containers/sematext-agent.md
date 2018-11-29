# Sematext Agent

Sematext Agent collects a plethora of metrics about hosts (CPU, memory, disk, network, processes), containers (both Docker and rkt) and orchestrator platforms and ships that to [Sematext Cloud](https://sematext.com/cloud). To gain deep insight into the Linux kernel, Sematext Agent relies on eBPF to implant instrumentation points (attach eBPF programs to kprobes) on kernel functions. This allows for a very efficient and powerful system exploration approach. It has auto-discovery capabilities of services deployed on physical/virtual hosts and containers, as well as a mechanism for reporting inventory info. It also collects events from different sources such as OOM notifications, container or Kuberentes events.

### How to use this image

Starting a Sematext Agent instance involves creating a new container with the following options:

```bash
$ docker run -d --privileged -P --name st-agent \
	          -v /sys/kernel/debug:/sys/kernel/debug \
	          -v /var/run/docker.sock:/var/run/docker.sock \
	          -v /var/run/st-agent:/var/run/st-agent \
	          -v /proc:/host/proc:ro \
	          -v /etc:/host/etc:ro \
	          -v /sys:/host/sys:ro \
	          -e INFRA_TOKEN=<INFRA-TOKEN> \
	          -e CONTAINER_TOKEN=<CONTAINER-TOKEN> \
	          -e LOGS_TOKEN=<LOGS-TOKEN> \
	          -e JOURNAL_DIR=/var/run/st-agent \
	          -e LOGGING_WRITE_EVENTS=false \
	          -e NODE_NAME=`hostname` \
	          -e CONTAINER_SKIP_BY_IMAGE=sematext \
	          sematext/agent:latest
```

Besides providing several bind mounts for Docker socket, procfs and journal directory, tokens are required to ship data to the right place. If infra token is given Sematext Agent will gather data about running processes on the system, basic operating system metrics, machine/instance related information, and so on. When container token is provided, the agent will detect active containers and start collecting different container metrics such as memory usage, network I/O statistics, disk throughput, etc.

In addition to metrics, Sematext Agent also collects events (Docker, Kubernetes, agent initialization/termination events, OOM notifications, kill signals) and sends them to Sematext's event and log receivers.

By default, the US region receiver endpoints are used to ship data to Sematext Cloud. You can override receiver addresses by passing `SERVER_BASE_URL` for metrics receivers, `LOGS_RECEIVER_URL` and `EVENTS_RECEIVER_URL` for log and event receivers respectively.

### Configuration file

For fine-tunning Sematext Agent refer to `st-agent.yml` configuration file. You will have to attach a bind mount with file location and pass the `CONFIG_FILE` environment variable that contains the path to aforementioned configuration file.

```bash
$ docker run -d --privileged -P --name st-agent \
	          -v /sys/kernel/debug:/sys/kernel/debug \
	          -v /var/run/docker.sock:/var/run/docker.sock \
	          -v /var/run/st-agent:/var/run/st-agent \
	          -v /proc:/host/proc:ro \
	          -v /etc:/host/etc:ro \
	          -v /sys:/host/sys:ro \
	          -v /opt/st-agent/st-agent.yml:/opt/st-agent/st-agent.yml \
	          -e INFRA_TOKEN=<INFRA-TOKEN> \
	          -e CONTAINER_TOKEN=<CONTAINER-TOKEN> \
	          -e LOGS_TOKEN=<LOGS-TOKEN> \
	          -e JOURNAL_DIR=/var/run/st-agent \
	          -e NODE_NAME=`hostname` \
	          -e LOGGING_WRITE_EVENTS=false \
	          -e CONFIG_FILE=/opt/st-agent/st-agent.yml \
	          sematext/agent:latest
```

### Environment Variables

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
| **Kubernetes Settings** | | 
| KUBERNETES_ENABLED | Specifies if the Kubernetes monitoring functionality is active. Default value is `true`. To disable Kubernetes collector set `KUBERNETES_ENABLED=false`. | 
| KUBERNETES_EVENTS_NAMESPACE | Designates a namespace for Kubernetes event watcher. By default all namespaces are watched for Kubernetes events and forwarded to event/log receivers. |
| KUBERNETES_NAMESPACES | Defines the comma separated list of namespaces that are queried for Kubernetes resources such as pods or deployments. By default all namespaces are fetched. You can adjust specific namespaces such as `KUBERNETES_NAMESPACES=default,kube-system`. | 
| **Process Monitoring** | | 
| PROCESS_ENABLED | Specifies if process metrics collection is enabled. To disable process metrics collector set `PROCESS_ENABLED=false`. |
| **Network Monitoring** | |
| NETMON_ENABLED | Controls whether network topology collector is turned on. Network monitor is disabled by default. To enable network monitor set `NETMON_ENABLED=false`. In order to capture network traffic from the host, you should start the container with host networking by passing the `--network=host` argument to Docker engine. | 
| NETMON_INPUT_FILTER, NETMON_OUTPUT_FILTER | When specified, applies filtering expressions to all inbound/outbound packets (`NETMON_INPUT_FILTER="dst port 8923 and tcp"`). | 
| NETMON_INTERFACES | A comma-separated list of network interfaces to monitor. By default all interfaces are tracked. | 
| NETMON_LOOPBACK | Determines whether loopback interfaces should be captured for network traffic. By default network packets are not captured from loopback interfaces. | 
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
