title: Sematext Agent
description: Sematext Agent collects a plethora of metrics about hosts (CPU, memory, disk, network, processes), containers (Docker, rkt, containerd) and orchestrator platforms.

Sematext Agent collects a plethora of metrics about hosts (CPU, memory, disk, network, processes), containers (Docker, rkt, containerd) and orchestrator platforms and ships that to [Sematext Cloud](https://sematext.com/cloud). 

In the case of Linux, Sematext Agent relies on eBPF to gain deep insight into the Linux kernel by implanting instrumentation points (attach eBPF programs to kprobes) on kernel functions. Using Linux kernel instrumentation allows Sematext Agent a very efficient and powerful system exploration approach. 

Sematext Agent has the ability to [auto-discover services and logs](/docs/fleet/discovery/) deployed on physical/virtual hosts and containers, as well as a mechanism for reporting [inventory info](/docs/monitoring/inventory/). It also collects [events](/docs/events/) from different sources such as OOM notifications, system-wide kill events, container or [Kubernetes events](/docs/agents/sematext-agent/kubernetes/events).


## Capabilities

- Provides full visibility over the basic operating system metrics on your hosts. For example,  you can easily spot CPU spikes and [correlate](/docs/monitoring/correlation/) them with
other metric sources.
- [App Agent](/docs/agents/sematext-agent/app-agent) for collecting application metrics from JMX, REST APIs, and from databases that support JDBC as well as transaction traces collection and on demand JVM profiling.
- Agnostic and unified [container monitoring](/docs/agents/sematext-agent/containers/metrics) to gain deep visibility into your containerized deployments and orchestration platforms.
- Collects a myriad of events such as Docker/Kubernetes life cycle events, package install/uninstall, OOMK or signal notifications among others.
- [Inventory tracking](/docs/monitoring/inventory) of your whole infrastructure including packages, server details, container metadata and more.
- [Process monitoring](/docs/monitoring/processes) that helps out identifying top CPU or memory consumers.
- [Service discovery](/docs/monitoring/autodiscovery/) and automated monitoring for vanilla Docker and Kubernetes workloads.
- [Network Map](/docs/network-map/) for visualizing infrastructure topology and service connections using eBPF-powered network insights.
- [Logs discovery](/docs/logs/discovery/intro/) and parsing.
