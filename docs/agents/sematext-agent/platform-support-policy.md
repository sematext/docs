title: Platform Support Policy
description: Supported distributions and platforms for the Sematext Agent

The Sematext Agent runs on Linux, Windows and macOS, in containers and on Kubernetes. We support each platform below for its whole vendor lifecycle. If a version is not listed, Sematext Agent is still very likely to run on it, and we encourage you to try it.

## Feature availability

Not every feature is available on every operating system. Containers and Kubernetes run the Linux agent, so they get the Linux column.

| Feature | Linux | Windows | macOS |
|:--|:-:|:-:|:-:|
| Host metrics (CPU, memory, disk, network) | ✅ | ✅ | ✅ |
| [Processes](/docs/monitoring/processes/) | ✅ | ✅ | ✅ |
| Host details (OS, CPU, memory) | ✅ | ✅ | ✅ |
| Service status | systemd | [Windows Services](/docs/integration/windows/#windows-services) | launchd |
| [OpenTelemetry](/docs/agents/sematext-agent/opentelemetry/) metrics, traces and logs | ✅ | ✅ | ✅ |
| Log collection beyond OpenTelemetry | [Log discovery](/docs/logs/discovery/intro/) | [Windows Events](/docs/integration/windows/#logs) | ❌ |
| Containers and Kubernetes | ✅ | ❌ | ❌ |
| [Auto-Discovery](/docs/monitoring/autodiscovery/) | ✅ | ❌ | ❌ |
| [Network Map](/docs/network-map/) | ✅ | ❌ | ❌ |
| [AI Agent Watch](/docs/ai-agent-watch/) | ✅ | ❌ | ❌ |

## Linux

| Distro | Supported Versions (64-bit only) |
|:--|:--|
| **Ubuntu** | 20.04, 22.04, 24.04, 26.04 |
| **Debian** | 11, 12, 13 |
| **Red Hat Enterprise Linux** | 8, 9, 10 |
| **CentOS Stream** | 9, 10 |
| **Rocky Linux** | 8, 9, 10 |
| **AlmaLinux** | 8, 9, 10 |
| **Amazon Linux** | 2, 2023 |
| **Fedora Linux** | 43, 44 |
| **SUSE Linux Enterprise Server** | 15 SP4, 15 SP5, 15 SP6, 15 SP7, 16 |
| **openSUSE Leap** | 16.0 |

> **Note:** Some of these releases get vendor updates only under an extended support subscription: Ubuntu 20.04 (ESM), Debian 11 (LTS) and SUSE Linux Enterprise Server 15 SP4 through SP6 (LTSS). Amazon Linux 2 reached end of life in June 2026. Sematext Agent runs on all of them.

See [Installing Sematext Agent on Linux](/docs/agents/sematext-agent/linux-installation/).

??? note "Kernel requirements for eBPF-based features"
    Log discovery, Auto-Discovery, system metrics collection, Network Map and AI Agent Watch use eBPF. The minimum **Linux kernel** version for them is **5.5**, and we recommend **5.8 or newer**. Between 5.5 and 5.8 the agent falls back to an older event transport, so log discovery, Auto-Discovery and Network Map keep working with reduced performance. Features that require a newer kernel, such as AI Agent Watch, are unavailable rather than degraded.

    Enterprise distributions backport eBPF features into older kernels, so a release such as Red Hat Enterprise Linux 8 can meet these requirements even though it reports an older kernel version. Sematext Agent checks what the kernel actually supports rather than relying on its version number.

    This is also why releases such as Red Hat Enterprise Linux 7, CentOS 7, Ubuntu 18.04 and SUSE Linux Enterprise Server 12 are not listed above: their kernels are older than 5.5, so Sematext Agent runs on them and collects metrics and logs, but Network Map, AI Agent Watch and eBPF-based discovery are unavailable.

## Windows

- Windows Server 2025
- Windows Server 2022
- Windows Server 2019
- Windows Server 2016
- Windows 11 (64-bit only)
- Windows 10 (64-bit only)

See [Installing Sematext Agent on Windows](/docs/agents/sematext-agent/windows-installation/).

## macOS

- macOS 27 Golden Gate
- macOS 26 Tahoe
- macOS 15 Sequoia
- macOS 14 Sonoma

Both Apple Silicon and Intel Macs are supported. macOS 27 runs only on Apple Silicon, so Intel Macs are supported up to macOS 26. See [Installing Sematext Agent on macOS](/docs/agents/sematext-agent/macos-installation/).

## Containers

| Platform | Supported Versions |
|:--|:--|
| **Docker** | 25.0 and newer |
| **Docker Swarm** | Included in Docker Engine |
| **Portainer** | 2.x |
| **Red Hat OpenShift** | 4.20, 4.21, 4.22 |
| **Nomad** | 1.10, 1.11, 2.0 |
| **Amazon ECS** | |

> **Note:** These are the versions we actively test against. Older versions may work but are not fully tested.

## Kubernetes

| Provider | Service |
|:--|:--|
| Self-hosted Kubernetes | 1.34 and newer |
| Microsoft | **Azure Kubernetes Service (AKS)** |
| Amazon | **Elastic Kubernetes Service (EKS)** |
| Google | **Google Kubernetes Engine (GKE)** |

> **Note:** 1.34 and newer are the versions we actively test against, matching what is generally available on AKS, EKS and GKE. Older Kubernetes versions may work but are not fully tested.
