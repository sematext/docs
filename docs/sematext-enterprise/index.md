title: Sematext Enterprise Overview
description: Sematext Enterprise is on-premises version of our managed SaaS platform with application, server, and container monitoring, log management, and alerting for devops running dynamic infrastructure. All in one private solution for metrics, traces, logs, alerts, and events. 

<a href="https://sematext.com/enterprise">Sematext Enterprise</a> is private or on-premises version of <a href="https://sematext.com/cloud">Sematext Cloud</a>.

Sematext Enterprise is available as a Helm Chart (package for Kubernetes) and
can be installed as such.  This will install everything, including components
that have persistent storage.

Given enough resources, such as RAM, disk, and CPU, it is possible to
run all these services on a single host, although this is not recommended for
a production setup. The number of worker nodes will depend on the number
of monitored servers and size of collected logs. For high availability
a minimum of 3 worker nodes is required.

**IMPORTANT:** The Helm chart has Docker images as dependencies that will
  automatically be pulled and run. If your system is behind a
  firewall and cannot connect to the Internet to download anything we
  can help you meet those requirements.

## Hardware Requirements

Each worker node needs to have:

- Minimum 32 GB of RAM
- Minimum 8 vCPUs
- Minimum 150 GB of SSD disk storage

## Software Requirements
- Docker 18.06.x or newer - https://www.docker.com
- Kubernetes 1.12.x or newer - https://kubernetes.io
- Helm v2.15.x (package manager for Kubernetes) - https://helm.sh

Please [contact us](https://sematext.com/contact) and we'll provide you
with the evaluation copy of Sematext Enterprise for your organization.

<!-- For more information check Sematext Enterprise [FAQ]() and [On-premises vs SaaS deployment]() pages. -->
