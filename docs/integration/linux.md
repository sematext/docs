title: Sematext Linux Monitoring
description: Monitor Linux bare metal servers and VMs using a lightweight agent and visualize your full infrastructure in Sematext Cloud

Sematext Linux Monitoring provides insights into your Linux infrastructure, automatically monitoring servers, processes, packages and more across various Linux distributions. Check the following areas for more information:

- [Linux Servers](https://sematext.com/docs/monitoring/servers/)
- [Linux Processes](https://sematext.com/docs/monitoring/processes/)
- [Linux Packages](https://sematext.com/docs/monitoring/inventory/)
- [Events](https://sematext.com/docs/events/), etc.

## How it works

A lightweight agent, called [Sematext Agent](../agents/sematext-agent), will be installed on your Linux machine. This agent sends all infrastructure data to an Infra App in Sematext Cloud, whose token is configured during the agent's installation.

The agent itself can be installed either using a [native package manager](https://sematext.com/docs/agents/sematext-agent/installation/) for each distribution or using configuration automation tools like Ansible. Every option is available together with instructions during the [creation of an Infra App](https://sematext.com/docs/monitoring/infrastructure/#create-an-infra-app).

## Supported Linux distributions

Linux Monitoring supports the following Linux distributions:

- Ubuntu
- Debian
- CentOS
- Red Hat Enterprise Linux (RHEL)
- Fedora
- openSUSE
- Amazon Linux

For more information, please refer to our [platform support policy](https://sematext.com/docs/agents/sematext-agent/platform-support-policy/#linux) page.

## Infrastructure Reports

As soon as the Sematext Agent is installed, you can navigate to Sematext Cloud > Infrastructure section and access a wide variety of prebuilt reports. These reports contain hundreds of live [infrastructure metrics](https://sematext.com/docs/agents/sematext-agent/os-metrics/) together with their historical data.

![Infra App metrics](../images/monitoring/infra-metrics.gif)

All the metrics can be filtered or grouped by each individual host among other [supported tags](https://sematext.com/docs/tags/).

Moreover, some reports contain useful information about the [processes](https://sematext.com/docs/monitoring/processes/) running on your Linux servers 

![Infrastructure Processes](../images/monitoring/infra-processes.gif)

Other reports give you insights about machine-related information such as host, VM, or container properties, kernel versions, and installed packages. All these are part of [Inventory Monitoring](https://sematext.com/docs/monitoring/inventory/).

![Infrastructure Inventory](../images/monitoring/infra-inventory.gif)

## Out of the box alerts

Each time you create a new Infra App in Sematext Cloud to monitor your Linux servers, a number of pre-configured alerts are created as well, fine tuned to catch various issues and prevent your systems to go down. 

Refer to our [infrastructure default alerts](https://sematext.com/docs/monitoring/servers/#core-infrastructure-alerting) to learn more information.


