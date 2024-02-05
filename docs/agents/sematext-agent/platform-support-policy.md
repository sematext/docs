title: Platform Support Policy

The Sematext Agent is designed for compatibility across all major GNU/Linux distributions and platforms. Our commitment extends to providing support throughout the entire lifecycle of distros and platforms. If a specific version is not listed below, running the agent may still be feasible, and we encourage you to explore its functionality on those versions.

## Linux

| Distro | Supported Versions |
|:-:|:-|
| **Ubuntu** | 16.04<br>18.04<br>20.04<br>22.04<br>23.10 |
| **Debian** | 10<br>11<br>12 |
| **CentOS** | 6<br>7<br>8 |
| **CentOS Stream** | 8<br>9 |
| **Red Hat Enterprise Linux** | 7<br>8<br>9 |
| **Amazon Linux** | 2<br>2023 |
| **Fedora Linux** | 36<br>37<br>38<br>39 |
| **openSUSE** | 15.4<br>15.5 |

**Notes:**


- Our eBPF functinality requires at least 4.4.2 version of the Linux kernel.  
- The Sematext Agent's bare-metal version relies on SystemD. While using Init remains possible, we strongly recommend adopting SystemD for optimal performance.

## Platforms

| Platform | Supported Versions |
|:-:|:-|
| **Kubernetes** | 1.25<br>1.26<br>1.27<br>1.28 |
| **Docker** | 20.10<br>23.0<br>24.0<br>25.0 | 
| **Red Hat OpenShift** | 4.11<br>4.12<br>4.13<br>4.14 | 
| **Nomad** | 1.4<br>1.5<br>1.6<br>1.7 | 

## Cloud Providers

| Provider |
|:-:|
| Azure AKS |
| Amazon ECS |
| Amazon AKS |
| Google GKE |

## Windows

The development of **Sematext Agent for Windows** is currently in progress. Stay tuned for upcoming updates and enhancements.
