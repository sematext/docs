title: Sematext Agent
description: Sematext Agent collects a plethora of metrics about hosts (CPU, memory, disk, network, processes), containers (Docker, rkt, containerd) and orchestrator platforms.

Sematext Agent collects a plethora of metrics about hosts (CPU, memory, disk, network, processes), containers (Docker, rkt, containerd) and orchestrator platforms and ships that to [Sematext Cloud](https://sematext.com/cloud). To gain deep insight into the Linux kernel, Sematext Agent relies on eBPF to implant instrumentation points (attach eBPF programs to kprobes) on kernel functions. Using Linux kernel instrumentation allows Sematext Agent a very efficient and powerful system exploration approach. It has the ability to auto-discover services deployed on physical/virtual hosts and containers, as well as a mechanism for reporting inventory info. It also collects events from different sources such as OOM notifications, system-wide kill events, container or Kubernetes events.


## Capabilities

- Provides full visibility over the basic operating system metrics on your hosts. For example,  you can easily spot CPU spikes and correlate them with
other metric sources.
- Agnostic and unified container monitoring to gain deep visibility into your containerized deployments and orchestration platforms.
- Discovers your [network topology](https://sematext.com/docs/monitoring/network-map) with the eBPF-driven ultra efficient observability tracers.
- Collects a myriad of events such as Docker/Kubernetes life cycle events, package install/uninstall, OOMK or signal notifications among others.
- [Inventory tracking](https://sematext.com/docs/monitoring/inventory) of your whole infrastructure including packages, server details, container metadata and more.
- [Process monitoring](https://sematext.com/docs/monitoring/process) that helps out identifying top CPU or memory consumers.
- Service discovery and automated monitoring for vanilla Docker and Kubernetes workloads.
