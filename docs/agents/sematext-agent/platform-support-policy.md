title: Platform Support Policy

The Sematext Agent is designed for compatibility across all major GNU/Linux distributions and platforms. Our commitment extends to providing support throughout the entire lifecycle of distros and platforms.  

If a specific version is not listed below, running the agent may still be possible, and we encourage you to explore its functionality on those versions to determine compatibility and performance.

## Linux

| Distro | Supported Versions |
|:-:|:-:|
| **Ubuntu** | 18.04<br>20.04<br>22.04<br>23.10 |
| **Debian** | 10<br>11<br>12 |
| **CentOS** | 7 |
| **CentOS Stream** | 8<br>9 |
| **Red Hat Enterprise Linux** | 7<br>8<br>9 |
| **Amazon Linux** | 2<br>2023 |
| **Fedora Linux** | 37<br>38<br>39 |
| **openSUSE** | 15.4<br>15.5 |

**Notes:**

- We utilize eBPF technology for various functionalities such as log discovery, service discovery, and system metrics collection. Please note that our eBPF functionality requires a minimum Linux kernel version of 4.4.3. If your kernel version is lower than 4.4.2, the Sematext Agent will still function using fallbacks. However, we strongly recommend using a host with eBPF enabled for optimal performance.
- The bare-metal version of the Sematext Agent relies on SystemD. While it is still possible to use Init, we highly recommend adopting SystemD for optimal performance.

## Container Orchestrators

| Platform | Supported Versions |
|:-:|:-:|
| **Kubernetes** | 1.26<br>1.27<br>1.28 |
| **Docker** | 23.0<br>24.0<br>25.0 | 
| **Red Hat OpenShift** | 4.12<br>4.13<br>4.14 | 
| **Nomad** | 1.5<br>1.6<br>1.7 | 

## Cloud Managed Kubernetes Services

| Provider | Service |
|:-:|:-:|
| Microsoft | Azure Kubernetes Service (AKS) |
| Amazon | Elastic Kubernetes Service (EKS) |
| Google | Google Kubernetes Engine (GKE) |
