## Environment Variables

You can adjust the configuration of Sematext Agent with additional environment variables:

| Variable | Description                                                                                                                                                                                                                                                                                                                                                                      |
|----------|----------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------|
| **Firewall and Proxy Settings** |                                                                                                                                                                                                                                                                                                                                                                                  |
| PROXY_HOST, PROXY_PORT, PROXY_PASSWORD, PROXY_USERNAME | These variables specify the settings for the proxy server.                                                                                                                                                                                                                                                                                                                       |
| **Docker Connection Options** |                                                                                                                                                                                                                                                                                                                                                                                  |
| DOCKER_TRANSPORT | Defines the transport protocol for communication with Docker daemon. The default transport is UNIX domain socket (`unix:///var/run/docker.sock`). For TCP transport you have to specify an IP address that's reachable from container (`DOCKER_TRANSPORT=tcp://ip-reachable-from-container:2375/`).                                                                              |
| DOCKER_CERT_PATH | Specifies the path to your certificate files when communication with Docker daemon is carried out over secure channel.                                                                                                                                                                                                                                                           |
| **Container Monitoring** |                                                                                                                                                                                                                                                                                                                                                                                  |
| CONTAINER_ENABLED | Determines whether the container collector is enabled. Default value is `true`. To disable container collector set `CONTAINER_ENABLED=false`.                                                                                                                                                                                                                                    |
| CONTAINER_MATCH_BY_IMAGE, CONTAINER_MATCH_BY_NAME | These variables control the inclusion of detected containers either by image or container name. Can contain a comma separated list of full container/images names or regular expression patterns (`CONTAINER_MATCH_BY_IMAGE=nginx,mongo*`).                                                                                                                                      |
| CONTAINER_SKIP_BY_IMAGE, CONTAINER_SKIP_BY_NAME | These variables control the exclusion of detected containers either by image or container name. Can contain a comma separated list of full container/images names or regular expression patterns (`CONTAINER_SKIP_BY_IMAGE=nginx,mongo*`). **Important**: By default, the agent skips the following images: `CONTAINER_SKIP_BY_IMAGE=sematext/agent,sematext/app-agent,timberio/vector`. If you modify this environment variable, please ensure to append these options to your configuration.                                                                                                                                       |
| **Kubernetes Settings** |                                                                                                                                                                                                                                                                                                                                                                                  |
| KUBERNETES_ENABLED | Specifies if the Kubernetes monitoring functionality is active. Default value is `true`. To disable Kubernetes collector set `KUBERNETES_ENABLED=false`.                                                                                                                                                                                                                         |
| KUBERNETES_EVENTS_NAMESPACE | Designates a namespace for Kubernetes event watcher. By default all namespaces are watched for Kubernetes events and forwarded to event/log receivers.                                                                                                                                                                                                                           |
| KUBERNETES_NAMESPACES | Defines the comma separated list of namespaces that are queried for Kubernetes resources such as pods or deployments. By default all namespaces are fetched. You can adjust specific namespaces such as `KUBERNETES_NAMESPACES=default,kube-system`.                                                                                                                             |
| KUBERNETES_INTERVAL | Defines the collection interval for Kubernetes resources (default 10s)                                                                                                                                                                                                                                                                                                           |
| KUBERNETES_CLUSTER_ID | Uniquely identifies the cluster where agent is deployed                                                                                                                                                                                                                                                                                                                          |
| KUBERNETES_KUBELET_AUTH_TOKEN | Specifies the path for account service token                                                                                                                                                                                                                                                                                                                                     |
| KUBERNETES_KUBELET_CA_PATH | Determines the file path for the certificate authority utilized during TLS verification                                                                                                                                                                                                                                                                                          |
| KUBERNETES_KUBELET_CERT_PATH | Determines the file path for the certificate file utilized during TLS verification                                                                                                                                                                                                                                                                                               |
| KUBERNETES_KUBELET_KEY_PATH | Determines the file path for the private key utilized during TLS verification                                                                                                                                                                                                                                                                                                    |
| KUBERNETES_ETCD_CA_PATH | Determines the file path for the certificate authority utilized during TLS verification                                                                                                                                                                                                                                                                                          |
| KUBERNETES_ETCD_KEY_PATH | Determines the file path for the private key utilized during TLS verification                                                                                                                                                                                                                                                                                                    |
| KUBERNETES_ETCD_CERT_PATH | Determines the file path for the certificate file utilized during TLS verification                                                                                                                                                                                                                                                                                               |
| KUBERNETES_KUBELET_INSECURE_SKIP_TLS_VERIFY | Indicates whether to skip TLS verification                                                                                                                                                                                                                                                                                                                                       |
| KUBERNETES_KUBELET_METRICS_PORT | Specifies the port where kubelet Prometheus metrics are exposed (default 10250)                                                                                                                                                                                                                                                                                                  |
| **Process Monitoring** |                                                                                                                                                                                                                                                                                                                                                                                  |
| PROCESS_ENABLED | Specifies if process metrics collection is enabled. To disable process metrics collector set `PROCESS_ENABLED=false`.                                                                                                                                                                                                                                                            |
| **Network Monitoring** |                                                                                                                                                                                                                                                                                                                                                                                  |
| NETRACER_ENABLED | Controls whether network topology collector is turned on. Network tracer is disabled by default. To enable network tracer set `NETRACER_ENABLED=true`. In order to capture network traffic from the host, you should start the container with host networking by passing the `--network=host` argument to Docker engine. This is only required when pcap network tracer is used. |
| NETRACER_INPUT_FILTER, NETRACER_OUTPUT_FILTER | When specified, applies filtering expressions to all inbound/outbound packets (`NETRACER_INPUT_FILTER="dst port 8923 and tcp"`).                                                                                                                                                                                                                                                 |
| NETRACER_INTERFACES | A comma-separated list of network interfaces to monitor. By default all interfaces are tracked.                                                                                                                                                                                                                                                                                  |
| NETRACER_LOOPBACK | Determines whether loopback interfaces should be captured for network traffic. By default network packets are not captured from loopback interfaces.                                                                                                                                                                                                                             |
| NETRACER_EBPF_TRACK_TCP | Determines whether TCP connections are tracked by ebpf tracer. By default TCP traffic statistics are collected.                                                                                                                                                                                                                                                                  |
| NETRACER_EBPF_TRACK_UDP | Determines whether UDP connections are tracked by ebpf tracer. By default UDP traffic statistics are collected.                                                                                                                                                                                                                                                                  |  
| **Troubleshooting Options** |                                                                                                                                                                                                                                                                                                                                                                                  |
| CPUPROFILE | Name of the file where `pprof` CPU profile is dumped. When provided this turns on the CPU profiling and writes data to a given file.                                                                                                                                                                                                                                             |
| LOGGING_LEVEL | Defines the minimal allowed log level. Default log level is `info`. You can choose between `debug`, `info`, `warn/warning`, `error`, `fatal` and `panic`.                                                                                                                                                                                                                        |
| LOGGING_WRITE_EVENTS | Defines whether event payloads are written to standard output stream. Useful for debugging. You can disable this feature by passing `LOGGING_WRITE_EVENTS=false` environment variable during container bootstrap.                                                                                                                                                                |
| **Other Agent Settings** |                                                                                                                                                                                                                                                                                                                                                                                  |
| INTERVAL | Specifies the collection interval for metrics collectors. Default interval is `10s`. You can specify a duration for collection interval in seconds, minutes or hours (`INTERVAL=1m`).                                                                                                                                                                                            |
| JOURNAL_DIR | Defines the data directory where failed events are stored. Agent periodically scans this directory and resends events to the backend.                                                                                                                                                                                                                                            |
| JOURNAL_RETRY_INTERVAL | Specifies how often journal directory is scanned for failed events. Default interval is `30s`. You can specify a different interval in either seconds, minutes or hours (`JOURNAL_RETRY_INTERVAL=5m`)                                                                                                                                                                            |
| AUTODISCO_TEMPLATES_PATH | Defines the location of the `autodisco.yml` file that contains definitions of patterns involved in app auto-discovery.                                                                                                                                                                                                                                                           |
| HOSTNAME_ALIAS | When specified it overrides the original host name.                                                                                                                                                                                                                                                                                                                              |

## Populating Environment Variables in Kubernetes

To populate environment variables in Kubernetes, you need to propagate the variables to the pods by including them in the DaemonSet manifest within the `env` section. Consider the following example manifest:

```yaml
apiVersion: apps/v1
kind: DaemonSet
metadata:
  name: sematext-agent
  labels:
    app: sematext-agent
spec:
  selector:
    matchLabels:
      app: sematext-agent
 # ...
          env:
            - name: AUTODISCO_VECTOR_SERVICE_ACCOUNT
              value: sematext-agent-vector
            - name: INFRA_TOKEN
              value: <your-infra-token>
            - name: KUBERNETES_CLUSTER_ID
              value: <REPLACE_WITH_CLUSTER_NAME>
            - name: API_SERVER_PORT
              value: "8675"
            - name: REGION
              value: US
          livenessProbe:
            httpGet:
              path: /health
              port: 8675
# ...
```

You can add additional environment variables by following the `name` and `value` format, where the former is the name of the variable and the latter is the value. For example, to skip certain containers based on the image like `nginx`, add the following lines:

```yaml
            - name: CONTAINER_SKIP_BY_IMAGE
              value: nginx
```

If you are using the `helm` installation option instead of `kubectl`, you can add environment variables using the `--set` directive. Also, you can skip multiple images by separating multiple image names with a comma, as in the following example:

```bash
helm install st-agent \
  --set infraToken=<your-infra-token> \
  --set region=US \
  --set clusterName=REPLACE_WITH_CLUSTER_NAME \
  --set CONTAINER_SKIP_BY_IMAGE=nginx,apache/httpd \
  --namespace=sematext \
  --create-namespace \
  sematext/sematext-agent
```

**Note:** The `CONTAINER_SKIP_BY_IMAGE` values will search for any substring match among the discovered images. Therefore, if you wish to skip the `apache/httpd` image, you can simply use `httpd`. This applies similarly to other matching and skipping options such as `CONTAINER_MATCH_BY_IMAGE`, `CONTAINER_MATCH_BY_NAME`, and `CONTAINER_SKIP_BY_NAME`.
