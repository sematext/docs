title: Platform Support Policy
description: Supported distributions and platforms for the Sematext Agent

The Sematext Agent is designed for compatibility across all major GNU/Linux distributions, Windows platforms, and more. Our commitment extends to providing support throughout the entire lifecycle of these distros and platforms. Additionally, we offer support for Kubernetes environments and containerized installations.

If a specific version is not listed below, Sematext Agent is still very likely to run, and we encourage you to explore its functionality on those versions.

## Linux

| Distro | Supported Versions (64-bit only) |
|:-:|:-:|
| **Ubuntu** | 20.04<br>22.04<br>24.04<br>26.04 |
| **Debian** | 11<br>12<br>13 |
| **Red Hat Enterprise Linux** | 8<br>9<br>10 |
| **CentOS Stream** | 9<br>10 |
| **Rocky Linux** | 8<br>9<br>10 |
| **AlmaLinux** | 8<br>9<br>10 |
| **Amazon Linux** | 2<br>2023 |
| **Fedora Linux** | 43<br>44 |
| **SUSE Linux Enterprise Server** | 15 SP4<br>15 SP5<br>15 SP6<br>15 SP7<br>16 |
| **openSUSE Leap** | 16.0 |

> **Note:** Some of the releases above are past their standard support window and receive vendor updates only under an extended support subscription, such as Ubuntu 20.04 (ESM), Debian 11 (LTS) and SUSE Linux Enterprise Server 15 SP4 through SP6 (LTSS). Amazon Linux 2 reached end of life in June 2026. Sematext Agent runs on all of them, with the eBPF-based features depending on the kernel version as described below.

> **Note:** We utilize eBPF technology for various functionality such as log discovery, service discovery, system metrics collection, Network Map, and AI Agent Watch. The minimum **Linux kernel** version for the eBPF-based features is **5.5**, and we recommend **5.8 or newer**. Between 5.5 and 5.8 the agent falls back to an older event transport, so log discovery, service discovery and Network Map keep working with reduced performance. Features that require a newer kernel, such as AI Agent Watch, are unavailable rather than degraded. Enterprise distributions backport eBPF features into older kernels, so a release such as Red Hat Enterprise Linux 8 can meet these requirements even though it reports an older kernel version. Sematext Agent checks what the kernel actually supports rather than relying on its version number. This is also why releases such as Red Hat Enterprise Linux 7, CentOS 7, Ubuntu 18.04 and SUSE Linux Enterprise Server 12 are not listed above: their kernels are older than 5.5, so Sematext Agent runs on them and collects metrics and logs, but Network Map, AI Agent Watch and eBPF-based discovery are unavailable.

## Windows

- Windows Server 2025
- Windows Server 2022
- Windows Server 2019
- Windows Server 2016
- Windows 11 (64-bit only)
- Windows 10 (64-bit only)

## Containers

| Platform | Supported Versions |
|:-:|:-:|
| **Docker** | 25.0 and newer | 
| **Docker Swarm** | Included in Docker Engine | 
| **Portainer** | 2.x |
| **Red Hat OpenShift** | 4.20<br>4.21<br>4.22 | 
| **Nomad** | 1.10<br>1.11<br>2.0 | 
| **Amazon ECS** | |

> **Note:** These are the versions we actively test against. Older versions may work but are not fully tested.

## Kubernetes

| Provider | Service |
|:-:|:-:|
| Self-hosted Kubernetes | 1.34 and newer |
| Microsoft | **Azure Kubernetes Service (AKS)** |
| Amazon | **Elastic Kubernetes Service (EKS)** |
| Google | **Google Kubernetes Engine (GKE)** |

> **Note:** 1.34 and newer are the versions we actively test against, matching what is generally available on AKS, EKS and GKE. Older Kubernetes versions may work but are not fully tested.
