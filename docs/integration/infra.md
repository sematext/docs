title: Infrastructure Monitoring Integration
description: Infrastructure performance monitoring - metrics, events, processes, packages, log collection and parsing for bare-metal servers, virtual machines and containers with support for Docker, containerd, Kubernetes, Swarm, Nomad, AWS ECS, AWS EKS, AKS, GKE.

The Sematext Infra Integration uses [Sematext Agent](../agents/sematext-agent) to collect metrics, events, processes, and package info for bare-metal servers, virtual machines and containers. Container monitoring is supported for Docker, containerd, k8s, Swarm, Nomad, AWS ECS, AWS EKS, AKS, GKE and more.

Sematext saves you time and effort by giving you a strong starting point for monitoring your infrastructure. You will **not** have to:

- figure out which metrics to collect and which ones to ignore
- give metrics meaningful labels
- hunt for metric descriptions in the docs so that you know what each of them actually shows
- build charts to group metrics that you really want on the same charts, not N separate charts
- figure out the most useful aggregation to use for each metric (min? max? avg? something else?)
- build dashboards to combine charts with metrics you typically want to see together
- set up basic alert rules

Sematext provides all that and more out of the box.


## Monitoring with Sematext Agent

Sematext Agent collects various metrics and other info about servers, virtual machines, container hosts and containers and ships that to Sematext Cloud.

First create an [Infra Monitoring App in Sematext Cloud](https://apps.sematext.com/ui/monitoring-create). You will be presented with installation instructions for many possible environments.


## How it works

A Golang-based [Sematext Agent](../agents/sematext-agent) will be installed on the host you want to monitor. This agent sends all infrastructure data to an Infra App whose token is configured during the Agent's installation.

It is capable of running in two kinds of environments:
- bare-metal, virtual machine - we provide rpm/deb packages for most popular linux distributions
- containers - a special sematext/agent container image provides support for monitoring in container environments

In both cases, installing the agent will start gathering all infrastructure data right away. Additionally, it will enable [Service Autodiscovery](../monitoring/autodiscovery) and [Logs Autodiscovery](../logs/discovery/intro/) features which make it possible to automatically start monitoring any supported [Sematext integrations](./integration) or to ship logs produced by any process or container.

### eBPF Support

To gain deep **insight into the Linux kernel**, Sematext Agent relies on **eBPF** to implant **instrumentation points**, which means to **attach eBPF programs to kprobes** on kernel functions. This ensures a very efficient and powerful system exploration approach with better network tracing and negligible overhead.


## Enabling Infra Monitoring

If you've set up Sematext Monitoring at some point in the past, you can easily enable Infra Monitoring by:

- [Upgrading](./spm-faq/#agent-updating) your `sematext-agent` to the latest version
- Setting up Infra App token on each host with Sematext Agent by running the `setup-infra` command (in bare-metal/virtual machine environments)

> **Note**: For container monitoring, we suggest uninstalling the existing deprecated Agent and going through the new setup steps for Docker Monitoring in Sematext Cloud.

When doing a clean installation, regardless of whether you're installing in containerized environment or not, follow agent installation instructions displayed in Sematext Cloud. Those instructions will always include everything needed to set up an Infra App, either on its own or alongside some other App Agent.


### The `setup-infra` command

This command is applicable only in bare-metal/virtual machine environments.

The `setup-infra` command is used to set the Infra App to which Sematext Agent should send data it collects.

To see which Infra Apps exist in your account visit Sematext Cloud -> Apps. You can choose any of the existing Infra Apps and go to App Settings > Tokens or you can create a new Infra App.

Once you do that you'll have the token of that particular App. To configure the Sematext Agent to start sending data to a particular Infra App run `setup-infra` on each host you wish to update:

`sudo bash /opt/spm/bin/setup-infra --infra-token YOUR_INFRA_APP_TOKEN_HERE`


## Installation

Exact installation instructions with correct tokens are displayed under your Sematext account when creating an Infra App or viewing an existing Infra App's installation instructions.

Setting up in bare-metal/virtual machine environments consists of installing `sematext-agent` rpm/deb package and executing `setup-infra` command with correct Infra token.

For container environments, find more info in [docker installation](../agents/sematext-agent/containers/installation) and [kubernetes installation](../agents/sematext-agent/kubernetes/installation).

## Collected Metrics
The Sematext Agent will collect the following container and host metrics.


### Host Metrics

These metrics are collected for all environments where the agent is installed (bare-metal, virtual machine, containers).

- CPU
- memory

![](../images/integrations/docker/hostcpu.png)

- disk space and I/O

![](../images/integrations/docker/hostdisk.png)

- network traffic
- processes metrics
- containers metrics

![](../images/integrations/docker/containers.png)

- orchestrator platforms

For more details, see [OS metrics](../agents/sematext-agent/os-metrics).

### Process Metrics

These metrics are collected for all environments where the agent is installed (bare-metal, virtual machine, containers).

See [Process Monitoring](../monitoring/processes) and [Process Metrics](../agents/sematext-agent/processes/metrics) for more info.

### Container Metrics

- Container runtime agnostic discovery and monitoring
    - Containers are discovered from cgroupfs hierarchies
    - Supports Docker, containerd, cri-o container engines
- Container metrics fetched directly from cgroupfs
    - CPU usage
    - Disk space usage and IO stats
        ![](../images/integrations/docker/container-cpu-io.png)
    - Memory usage, memory limits, and memory fail counters
    - Network IO stats
        ![](../images/integrations/docker/container-memory-network.png)
- Collection of host inventory information
    - Host kernel version/system information
    - Information about installed software packages
- Collection of container metadata
    - Container name
    - Image name
    - Container networks
    - Container volumes
    - Container environment
    - Container labels including relevant information about orchestration
    - Kubernetes metadata such as Pod name, UUID, Namespace
    - Docker Swarm metadata such as Service name, Swarm Task etc.
        ![](../images/integrations/docker/container-metadata.png)
- Collection of container events
- Docker events such as start/stop/die/volume mount, etc.
- Kubernetes events such as Pod status changes deployed, destroyed, etc.
- Tracking deployment status and Pod restarts over time

That is a lot of information and **Sematext organizes this information in reports** for **infrastructure monitoring**, **container monitoring**, and **Kubernetes cluster monitoring**.

See [container monitoring](../monitoring/containers/) for more info.

## Service Auto-Discovery

Sematext Agent can **auto-discover services** deployed on physical/virtual hosts and containers. 

Take a look at [Monitoring](../monitoring/autodiscovery) and [Logs Autodiscovery](../logs/discovery/intro/) to learn more about discovery.

## Inventory

One of the features provided by the Infra App is [Inventory](../monitoring/inventory). Inventory contains the data about all your servers, container images and packages installed on your servers.

## Events

Sematext Agent collects events from different sources such as OOM notifications, [container](../agents/sematext-agent/container/events) or [Kubernetes](../agents/sematext-agent/kubernetes/events) events and stores them into your Infra Apps. For info about using events see [events guide](../guide/events-guide).
