Looking for On Premises Monitoring and/or Logging Solution?

Please [contact us](http://sematext.com/about/contact.html) and we'll provide you with the evaluation copy of Sematext Enterprise, which includes both [SPM](http://sematext.com/spm/), private infrastructure, application, and container monitoring and alerting and [Logsene](http://sematext.com/logsene/), on-premises log management platform and ELK stack.

Sematext Enterprise is available either as pre-built VM (Ubuntu 14.04), DEB repo (Ubuntu 14.04 and 16.04) and RPM repo (RHEL / CentOS 6 and 7) and contain the basic setup for all services that make up SPM and Logsene.  

Given enough resources, such as RAM, disk, and CPU, it is possible to run all these services on a single system although not recommended for a production setup.

**IMPORTANT:** The DEB and RPM packages have dependencies that will automatically be fetched and installed.  If your system is behind a firewall and cannot connect to the Internet to download anything we can help you with those requirements as well with an offline install package.

## Hardware and Software Requirements
Each Sematext Enterprise instance needs to have:

- Ubuntu 14.04 and 16.04, RHEL/CentOS 6 and 7 (if you install from DEB/RPM).
- Minimum 16 GB of RAM, recommended 24 GB of RAM.
- Minimum 4 vCPUs, recommended 8 vCPUs.
- 300+ GB of storage, SSDs are not needed, but will improve performance, especially for large volumes of metrics, logs, and events. Main storage must be mounted under /opt.
- Server time zone must be set to UTC (if for some reason server cannot be set to UTC, please contact support for instructions).
- Working network connection (e.g. for ntpd, for connecting to other Sematext Enterprise nodes, etc.)
- Only during the install process, servers running Sematext Enterprise need access to the Internet to download required packages. If your servers are behind the firewall contact Sematext to get an offline install package.
