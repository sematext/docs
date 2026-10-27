title: Platform Support Policy
description: Supported distributions and platforms for the Sematext Agent

The Sematext Agent runs on Linux, Windows and macOS, in containers and on Kubernetes. We support the releases listed below, including the ones past their vendor's standard support noted under Linux. If a version is not listed, Sematext Agent is still very likely to run on it, and we encourage you to try it.

## Feature availability

Not every feature is available on every operating system. Containers and Kubernetes run the Linux agent, so they get the Linux column.

| Feature | Linux | Windows | macOS |
|:--|:-:|:-:|:-:|
| Host metrics (CPU, memory, disk, network) | ✅ | ✅ | ✅ |
| [Processes](/docs/monitoring/processes/) | ✅ | ✅ | ✅ |
| [Server inventory](/docs/monitoring/inventory/#servers) (OS, CPU, memory, disks) | ✅ | ✅ | ✅ |
| [Package and container image inventory](/docs/monitoring/inventory/#packages) | ✅ | ❌ | ❌ |
| Service status | systemd | [Windows Services](/docs/integration/windows/#windows-services) | launchd |
| [OpenTelemetry](/docs/agents/sematext-agent/opentelemetry/) metrics, traces and logs | ✅ | ✅ | ✅ |
| Log shipping ([log discovery](/docs/logs/discovery/intro/), [Custom Logs](/docs/agents/sematext-agent/custom-logs/)) | ✅ | [Windows Events](/docs/integration/windows/#logs) only | ❌ |
| Containers and Kubernetes | ✅ | ❌ | ❌ |
| [Monitoring Integrations](/docs/monitoring/service-monitoring/) | ✅ | ❌ | ❌ |
| [Service Monitoring](/docs/service-monitoring/) | ✅ | ❌ | ❌ |
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

> **Note:** Log discovery, Auto-Discovery, Service Monitoring and AI Agent Watch use eBPF and need Linux kernel **5.5** or newer (**5.8** or newer recommended). Some features, such as AI Agent Watch, need a newer kernel and are unavailable below it. Sematext Agent checks what the kernel supports rather than its version number, so enterprise kernels with backported eBPF features, such as Red Hat Enterprise Linux 8, qualify. Releases such as Red Hat Enterprise Linux 7 and Ubuntu 18.04 are not listed above because their kernels are older than 5.5: the agent still collects metrics and logs there, without the eBPF-based features.

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
- macOS 13 Ventura

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
