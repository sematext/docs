# Sematext Agent

Sematext Agent collects a plethora of metrics about hosts (CPU, memory, disk, network, processes), containers (both Docker and rkt) and orchestrator platforms and ships that to [Sematext Cloud](https://sematext.com/cloud). To gain deep insight into the Linux kernel, Sematext Agent relies on eBPF to implant instrumentation points (attach eBPF programs to kprobes) on kernel functions. This allows for a very efficient and powerful system exploration approach. It has auto-discovery capabilities of services deployed on physical/virtual hosts and containers, as well as a mechanism for reporting inventory info. It also collects events from different sources such as OOM notifications, container or Kuberentes events.

# Preparation 

To run Sematext Docker Agent you will need a Monitoring App Token and a Logs App Token.  If you don't have Monitoring and/or Logs Apps yet, you can [create a Docker Monitoring and Logs Apps now](https://apps.sematext.com/ui/integrations). 

Note: Sematext UI might not display the INFRA_TOKEN (we are working on the release). 
In this case simply ignore the INFRA_TOKEN in the following instructions. 

### Get started with Docker Engine

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

The configuration file accepts all options (listed below) in YAML format. 
```
# Sematext Agent configuration file
infra-token: YourInfrastructureMonitoringToken
container-token: YourDockerMonitoringToken
# Logs token to store Docker and Kubernetes Events in Sematext Logs
logs-token: YourLogsToken
# Location to persit events, when backend is not reachable
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

#### Run Sematext Agent with a Config File

Mount the configuration file into the container and set the path to the configuration file ```-v /opt/st-agent/st-agent.yml:/opt/st-agent/st-agent.yml \``` via CONFIG_FILE envirnment variable. 

```bash
$ docker run -d --privileged -P --name st-agent \
	          -v /sys/kernel/debug:/sys/kernel/debug \
	          -v /var/run/docker.sock:/var/run/docker.sock \
	          -v /var/run/st-agent:/var/run/st-agent \
	          -v /proc:/host/proc:ro \
	          -v /etc:/host/etc:ro \
	          -v /sys:/host/sys:ro \
	          -v /opt/st-agent/st-agent.yml:/opt/st-agent/st-agent.yml \
	          -e NODE_NAME=`hostname` \
	          -e CONFIG_FILE=/opt/st-agent/st-agent.yml \
	          sematext/agent:latest
```

# Run Sematext Agent on Docker Enterprise / Swarm Service

Create a Docker Monitoring App in Sematext and follow the instructions in the UI. 
Sematext Agent can be deployed as global service on all Swarm nodes with a single command: 

```
docker service create --mode global --restart always --name st-agent \
--mount type=bind,src=/var/run/docker.sock,dst=/var/run/docker.sock \ 
--mount type=bind,src=/sys/kernel/debug,dst=/sys/kernel/debug  \
--mount type=bind,src=/tmp,dst=/var/run/st-agent \
--mount type=bind,src=/proc,dst=/host/proc,readonly \ 
--mount type=bind,src=/etc,dst=/host/etc,readonly \
--mount type=bind,src=/sys,dst=/host/sys,readonly \
-e NODE_NAME={{.Node.Hostname}} \
-e INFRA_TOKEN=<Infra App Token> \
-e CONTAINER_TOKEN=<Docker App Token> \
-e LOGS_TOKEN=<Logs App Token> \
-e SERVER_BASE_URL=https://spm-receiver.sematext.com \
-e EVENTS_RECEIVER_URL=https://event-receiver.sematext.com \
-e LOGS_RECEIVER_URL=https://logsene-receiver.sematext.com \
-e JOURNAL_DIR=/var/run/st-agent \
-e LOGGING_REQUEST_TRACKING=false \
-e LOGGING_WRITE_EVENTS=false \
-e LOGGING_LEVEL=error \
-e PKG_ENABLED=false \
sematext/agent:latest
```
## Run Sematext Agent on Kubernetes

Create a Docker Monitoring App in Sematext and follow the instructions in the UI. 

### RBAC 
If your cluster has RBAC enabled add ClusterRole and ClusterRoleBindings. For ClusterRoleBindings you should update REPLACE_WITH_NAMESPACE value to match with namespace where the Sematext agent will be installed:

```
apiVersion: rbac.authorization.k8s.io/v1
kind: ClusterRoleBinding
metadata:
  name: sematext-agent
  labels:
    app: sematext-agent
roleRef:
  apiGroup: rbac.authorization.k8s.io
  kind: ClusterRole
  name: sematext-agent
subjects:
- kind: ServiceAccount
  name: sematext-agent
  namespace: <REPLACE_WITH_NAMESPACE>
---
apiVersion: rbac.authorization.k8s.io/v1
kind: ClusterRole
metadata:
  name: sematext-agent
  labels:
    app: sematext-agent
rules:
- apiGroups:
  - ""
  resources:
  - events
  - pods
  - configmaps
  - nodes
  - secrets
  verbs:
  - list
  - get
  - watch
- apiGroups:
  - ""
  resources:
  - pods
  - configmaps
  verbs:
  - create
  - delete
  - update 
- apiGroups:
  - apps
  resources:
  - deployments
  verbs:
  - watch
  - list
```
### Create and deploy the DaemonSet

Create a file for the deployment st-agent.yml (Replace Tokens and receiver URLs): 

```
# Sematext Agent DaemonSet
apiVersion: v1
kind: ServiceAccount
metadata:
  name: sematext-agent
  labels:
    app: sematext-agent
---
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
  template:
    metadata:
      labels:
        app: sematext-agent
    spec:
      serviceAccountName: sematext-agent
      containers:
        - name: agent
          image: sematext/agent:latest
          imagePullPolicy: Always
          env:
          - name: INFRA_TOKEN
            value: <REPLACE_WITH_INFRA_TOKEN>
          - name: CONTAINER_TOKEN
            value: <REPLACE_WITH_CONTAINER_TOKEN>
          - name: LOGS_TOKEN
            value: <REPLACE_WITH_LOGS_TOKEN>
          - name: SERVER_BASE_URL
            value: https://spm-receiver.eu.sematext.com
          - name: EVENTS_RECEIVER_URL
            value: https://event-receiver.eu.sematext.com
          - name: LOGS_RECEIVER_URL
            value: https://logsene-receiver.eu.sematext.com
          - name: API_SERVER_PORT
            value: "80"
          - name: JOURNAL_DIR
            value: /opt/spm/st-agent
          - name: PIPELINE_CONSOLE_OUTPUT
            value: "false"
          - name: PIPELINE_NULL_OUTPUT
            value: "false"
          - name: API_SERVER_HOST
            value: "0.0.0.0"
          - name: LOGGING_WRITE_EVENTS
            value: "false"
          - name: LOGGING_REQUEST_TRACKING
            value: "false"
          - name: KUBERNETES_CLUSTER_ID
            value: <REPLACE_WITH_CLUSTER_NAME>
          - name: NODE_NAME
            valueFrom:
              fieldRef:
                fieldPath: spec.nodeName
          livenessProbe:
            httpGet:
              path: /health
              port: 80
          readinessProbe:
            httpGet:
              path: /health
              port: 80
          volumeMounts:
            - name: procfs
              mountPath: /host/proc
              readOnly: true
            - name: sysfs
              mountPath: /host/sys
              readOnly: true
            - name: etc
              mountPath: /host/etc
              readOnly: true
            - name: debugfs
              mountPath: /sys/kernel/debug
            - name: docker-sock
              mountPath: /var/run/docker.sock
            - name: journal
              mountPath: /opt/spm/st-agent
          securityContext:
            privileged: true
          ports:
            - name: http
              containerPort: 80
              protocol: TCP
        - name: logagent
          image: sematext/logagent:latest
          imagePullPolicy: Always
          env:
          - name: LOGS_TOKEN
            value: <REPLACE_WITH_LOGS_TOKEN>
          - name: LOGS_RECEIVER_URL
            value: https://logsene-receiver.eu.sematext.com
          volumeMounts:
            - name: docker-sock
              mountPath: /var/run/docker.sock
      volumes:
        - name: procfs
          hostPath:
            path: /proc
        - name: sysfs
          hostPath:
            path: /sys
        - name: etc
          hostPath:
            path: /etc
        - name: debugfs
          hostPath:
            path: /sys/kernel/debug
        - name: docker-sock
          hostPath:
            path: /var/run/docker.sock
        - name: journal
          hostPath:
            path: /tmp
      tolerations:
      - effect: NoSchedule
        key: node-role.kubernetes.io/master
```

Deploy the DaemonSet: 

```
kubectl create st-agent.ymml 
``

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
