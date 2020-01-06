title: Sematext Inventory Monitoring
description: Sematext Inventory Monitoring gives you insight into your whole infrastructure automatically based on the applications, containers, servers and general infrastructure you are monitoring.

The [Sematext Agent](../agents/sematext-agent) provides a simple and versatile way of gathering machine-related information such as host, VM, or container properties, kernel versions, and installed packages. It presents them on a per-host basis allowing you not only to view the data but also search and compare different hosts. All of this, in the same place, shipped automatically and effortlessly, without any operational overhead.

The Inventory information is available in the *Monitoring Infrastructure* section of the *Monitoring* tab of your Sematext Cloud account - your main place for hosts, virtual machines and containers information.

<!-- ![Sematext Inventory Main Screen](../images/monitoring/inventory_main_view.png) -->

<video style="display:block; width:100%; height:auto;" controls autoplay loop>
  <source src="https://cdn.sematext.com/videos/sematext-infra-inventory.mp4" type="video/mp4" />
</video>

### Inventory Info

The consolidated infrastructure inventory provides insight into:

- Number of different packages in your monitored environment
- Number of different OS distributions
- Number of different OS versions
- A number of different kernel versions

![Inventory Info](../images/monitoring/inventory_inventory_info.png)

### Inventory Overview

The Inventory overview provides a per-host view of each host, virtual machine, and container along with the operating system and its version, number of CPUs, their type, memory, number of hard disk drives and total capacity.

![Inventory Overview](../images/monitoring/inventory_overview.png)

Expanding each row gives detailed information about the system including:

- Unique identifier of the system
- OS version
- Kernel version
- Java virtual machine version
- System type (bare metal, virtual machine, container)
- Total memory size
- Memory slot information
- Total disk size
- Disk drives information

In addition, an overview of all the installed packages on a given system is available. This includes:

- Installation source
- Package name
- Package version

![Inventory Overview](../images/monitoring/inventory_packages.png)

### Comparing Hosts

The Inventory UI allows comparing different systems to quickly and efficiently see differences between them:

![Inventory Package Comparison](../images/monitoring/inventory_package_comparison.png)

## How does it Work?

The [Sematext Agent](../agents/sematext-agent) tracks all changes done on the file system. Such changes are displayed in the Inventory Monitoring UI. Package installs, upgrades and removals are also captured. They are displayed as Events. The following types of packages are supported:

- Node.js (when using NPM package manager)
- Python (when using PIP package manager)
- DEB (for example, when using APT package manager)

The Agent checks the state of packages on machines and containers where it's running to ensure all package info is up to date.

## Enabling Inventory Monitoring

Check out enabling and disabling Inventory Monitoring [here](../agents/sematext-agent/packages/configuration/).

## Gathered Data

The [Sematext Agent](../agents/sematext-agent) gathers the following data about the system:

- OS version
- Kernel version
- Java virtual machine version
- System type (bare metal, virtual machine, container)
- Total memory size
- Memory slot information
- Total disk size
- Disk drives information

In addition, the following information about packages is gathered for Node.js, Python and DEB sources:

- Installation source
- Package name
- Package version

## Solving Problems With Inventory Monitoring

Here are some of the common use cases and issues that Inventory Monitoring helps solve:

- Finding obsolete packages  
- Seeing differences in environments for troubleshooting behavior discrepancies
- Finding packages mentioned in the [CVE](https://en.wikipedia.org/wiki/Common_Vulnerabilities_and_Exposures) reports
- And many, many more
