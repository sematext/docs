## Sematext Agent

Sematext Agent collects a plethora of metrics about hosts (CPU, memory, disk, network, processes), containers (Docker, rkt, containerd) and orchestrator platforms and ships that to [Sematext Cloud](https://sematext.com/cloud). To gain deep insight into the Linux kernel, Sematext Agent relies on eBPF to implant instrumentation points (attach eBPF programs to kprobes) on kernel functions. Using Linux kernel instrumentation allows Sematext Agent a very efficient and powerful system exploration approach. It has auto-discovery capabilities of services deployed on physical/virtual hosts and containers, as well as a mechanism for reporting inventory info. It also collects events from different sources such as OOM notifications, system-wide kill events, container or Kubernetes events.


## Capabilities

- Offers a full visibility over the basic operating system metrics on your hosts. For example,  you can easily spot CPU spikes and correlate them with
other metric sources.
- Agnostic and unified container monitoring to gain deep visibility into your containerized deployments.
- Discovers your network topology with eBPF-driven ultra efficient observability hooks.
- Collects a myriad of events such as Docker/Kubernetes life cycle events, package install/uninstall, OOMK and signal notifications among others.
- Inventory tracking including packages, server details, container metadata and more.
- Process monitoring that helps out to identify top CPU or memory consumers.
- Service discovery and automated monitoring for vanilla Docker and Kubernetes workloads.
