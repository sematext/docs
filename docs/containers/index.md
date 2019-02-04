## Container Monitoring

[Sematext Agent](sematext-agent.md) collects a plethora of metrics about hosts (CPU, memory, disk, network, processes), containers (both Docker and rkt) and orchestrator platforms and ships that to [Sematext Cloud](https://sematext.com/cloud). To gain deep insight into the Linux kernel, Sematext Agent relies on eBPF to implant instrumentation points (attach eBPF programs to kprobes) on kernel functions. Using Linux kernel instrumentation allows Sematext Agent a very efficient and powerful system exploration approach. It has auto-discovery capabilities of services deployed on physical/virtual hosts and containers, as well as a mechanism for reporting inventory info. It also collects events from different sources such as OOM notifications, container or Kubernetes events.

## Container Logging

The [Logagent Docker image](https://hub.docker.com/r/sematext/logagent/) is tailored for the log collection on container platforms. It runs as a tiny container on every Docker host and collects logs for all cluster nodes and their containers. It is open-source agent created by Sematext.

Logagent detects known log formats and structures your logs for supported applications and structures logs automatically. You can configure the log parser for any application by providing your pattern definitions or by contributing to the open source pattern definitions in the [patterns.yml](https://github.com/sematext/logagent-js/blob/master/patterns.yml) file. 

Logagent enriches all container logs with metadata, such as container labels, Kubernetes metadata or Swarm metadata.  
