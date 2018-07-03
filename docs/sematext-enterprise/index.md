Looking for On Premises Monitoring and/or Logging Solution?

Sematext Enterprise is private or on-premises version of both [SPM](http://sematext.com/spm/), infrastructure, application, and container monitoring and alerting and [Logsene](http://sematext.com/logsene/), hosted ELK stack and our log management platform.

Sematext Enterprise is available either as pre-built VM (Ubuntu 14.04), DEB repo (Ubuntu 14.04 and 16.04) and RPM repo (RHEL / CentOS 6 and 7) and contain the basic setup for all services that make up SPM and Logsene.

Given enough resources, such as RAM, disk, and CPU, it is possible to run all these services on a single system although not recommended for a production setup.

**IMPORTANT:** The DEB and RPM packages have dependencies that will automatically be fetched and installed.  If your system is behind a firewall and cannot connect to the Internet to download anything we can help you meet those requirements with an offline install package.

## Hardware and Software Requirements
Each Sematext Enterprise instance needs to have:

- Ubuntu 14.04 and 16.04, RHEL/CentOS 6 and 7 (if you install from DEB/RPM).
- Minimum 16 GB of RAM, recommended 24 GB of RAM.
- Minimum 4 vCPUs, recommended 8 vCPUs.
- 300+ GB of storage, SSDs are not needed, but will improve performance, especially for large volumes of metrics, logs, and events. Main storage must be mounted under /opt.
- Server time zone must be set to UTC (if for some reason server cannot be set to UTC, please contact support for instructions).
- Working network connection (e.g. for ntpd, for connecting to other Sematext Enterprise nodes, etc.)
- Only during the install process, servers running Sematext Enterprise need access to the Internet to download required packages. If your servers are behind the firewall contact Sematext to get an offline install package.

## System Deployment

**Note:** in this context a “system” means either a VM if you are installing Sematext Enterprise VM, or a server (whether virtual, cloud instance, or bare metal), if you are installing the RPM or DEB package.

The Single System Deployment is good for getting started quickly, but to set up production level monitoring or log management system capable of handling typical production workloads where lots of servers are being monitored or non-trivial amounts of logs are being collected, Sematext Enterprise should be run on multiple systems for Fault Tolerance, High Availability, and scaling.

To be able to copy files and run commands on all the Sematext Enterprise servers, the config script requires a SSH user and private key (or password) as parameters. The user must be able to run commands as root via sudo. The private key is only needed when running the config script and can be deleted after that.

Please [contact us](http://sematext.com/about/contact.html) and we'll provide you with the evaluation copy of Sematext Enterprise for your organization.

<!-- For more information check Sematext Enterprise [FAQ]() and [On-premises vs SaaS deployment]() pages. -->
