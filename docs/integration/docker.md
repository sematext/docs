title: Docker Monitoring Integration
description: Container performance monitoring - metrics, event, log collection and parsing for Docker

The Sematext Integration for Docker uses [Sematext Agent](https://sematext.com/docs/containers/) and the open-source [Logagent](https://sematext.com/docs/logagent/installation-docker/) for the collection of container logs.

We at Sematext aim to save you time and effort by giving you a strong starting point for monitoring Docker. You will **not** have to:

- figure out which metrics to collect and which ones to ignore
- give metrics meaningful labels
- hunt for metric descriptions in the docs so that you know what each of them actually shows
- build charts to group metrics that you really want on the same charts, not N separate charts
- figure out, for each metric, which aggregation to use (min? max? avg? something else?)
- build dashboards to combine charts with metrics you typically want to see together
- set up basic alert rules

We set it up for you, out-of-the-box!

## Docker Monitoring with Sematext Agent

Sematext Agent collects various metrics about hosts and ships that to Sematext Cloud.

### Host Metrics

- CPU
- memory
    
![](../images/integrations/docker/hostcpu.png)

- disk 

![](../images/integrations/docker/hostdisk.png)

- network
- processes
- containers

![](../images/integrations/docker/containers.png)

- orchestrator platforms

### eBPF Support

To gain deep **insight into the Linux kernel**, Sematext Agent relies on **eBPF** to implant **instrumentation points**, which means to **attach eBPF programs to kprobes** on kernel functions. This ensures a very efficient and powerful system exploration approach with better network tracing and negligible overhead.

### Auto-Discovery

Sematext Agent can **auto-discover services** deployed on physical/virtual hosts and containers. It also collects data about your infrastructure to provide you with infrastructure inventory reports. It collects events from different sources such as OOM notifications, container or Kubernetes events.

### Container Metrics

- Container runtime agnostic discovery and monitoring
    - Containers are discovered from cgroupfs hierarchies
    - Supports Docker and Rkt container engines
- Container metrics fetched directly from cgroupfs
    - CPU usage
    - Disk space usage and IO stats
        ![](../images/integrations/docker/container-cpu-io.png)
    - Memory usage, memory limits, and memory fail counters
    - Network IO stats
        ![](../images/integrations/docker/container-memory-network.png)
- Collection of host inventory information
    - Host kernel version/system information
    - Information about installed software packages
- Collection of container metadata
    - Container name
    - Image name
    - Container networks
    - Container volumes
    - Container environment
    - Container labels including relevant information about orchestration
    - Kubernetes metadata such as Pod name, UUID, Namespace
    - Docker Swarm metadata such as Service name, Swarm Task etc.
        ![](../images/integrations/docker/container-metadata.png)
- Collection of container events
- Docker events such as start/stop/die/volume mount, etc.
- Kubernetes events such as Pod status changes deployed, destroyed etc.
- Tracking deployment status and Pod restarts over time

That is a lot of information and **Sematext organizes this information in reports** for **infrastructure monitoring**, **container monitoring**, and **Kubernetes cluster monitoring**.

## Overview
  
The following information is collected and transmitted to Sematext Cloud or Sematext Enterprise version.

<table>
<tbody>
<tr class="odd">
<td><strong>Type</strong></td>
<td><strong>Description</strong></td>
</tr>
<tr class="even">
<td><strong>Operating System Metrics</strong></td>
<td><p>Host machine metrics</p>
<ul>
<li>CPU Usage</li>
<li>Memory Usage</li>
<li>Network Stats</li>
<li>Disk I/O Stats</li>
</ul></td>
</tr>
<tr class="odd">
<td><strong>Container Metrics/Stats</strong></td>
<td><ul>
<li>CPU Usage / limits</li>
<li>Memory Usage / Limits / Fail Counters</li>
<li>Network Stats</li>
<li>Disk I/O Stats</li>
</ul></td>
</tr>
<tr class="even">
<td><strong>Events</strong></td>
<td> </td>
</tr>
<tr class="odd">
<td> Agent Startup Event</td>
<td>server-info – created by spm-agent framework with node.js and OS version info on startup. Please note the agent is implemented in node.js.</td>
</tr>
<tr class="even">
<td> </td>
<td>Docker-info – Docker Version, API Version, Kernel Version on startup</td>
</tr>
<tr class="odd">
<td>Docker Events</td>
<td>Container Lifecycle Events| create, exec_create, destroy, export, ...</td>
</tr>
<tr class="even">
<td>Container Runtime Events</td>
<td>die, exec_start, kill, pause, restart, start, stop, unpause, ...</td>
</tr>
<tr class="odd">
<td><strong>Docker Logs</strong></td>
<td> </td>
</tr>
<tr class="even">
<td>Default Fields</td>
<td><ul>
<li>hostname / IP address</li>
<li>container id</li>
<li>container name</li>
<li>image name</li>
<li>message</li>
</ul></td>
</tr>
<tr class="odd">
<td><p>Log formats</p>
<p>(detection and log parsers)</p></td>
<td><ul>
<li>NGINX</li>
<li>APACHE httpd, Kafka, Solr, HBase, Zookeeper, Cassandra</li>
<li>MySQL</li>
<li>MongoDB</li>
<li>Redis</li>
<li>Elasticsearch</li>
<li>NSQ  / <a href="http://Nsq.io" class="external-link">Nsq.io</a></li>
<li>patterns are maintained here: 
<ul>
<li><a href="https://github.com/sematext/logagent-js" class="uri" class="external-link">https://github.com/sematext/logagent-js</a></li>
</ul></li>
</ul></td>
</tr>
<tr class="even">
<td> </td>
<td><span>JSON, Plain Text</span></td>
</tr>
</tbody>
</table>

**Supported Platforms**

  - Docker Engine \>= 17.0.0
  - Platforms using Docker:  
      - Docker Cloud
      - Docker Data Center
      - Kubernetes
      - Mesos
      - CoreOS
      - Rancher
      - Amazon ECS
      - Red Hat OpenShift


## Metrics

|Name|Type|Unit|Numeric Type|Label|Description|
|----|----|----|------------|-----|-----------|
|memory.usage|gauge|bytes|long|memory|container memory usage in bytes|
|memory.fail.count|counter||long|memory|the number of times that memory cgroup limit was exceeded|
|memory.limit|gauge|bytes|long|memory|the max allowed memory limit for the container cgroup|
|memory.rss|gauge|bytes|long|RSS memory|number of bytes of anonymous (file unmapped memory) and swap cache memory|
|memory.pages.in|counter||long|memory pages in|memory pages in,description=the number of events each time the page is accounted to the cgroup|
|memory.pages.out|counter||long|memory pages out|memory pages out,description=the number of events each time a page is unaccounted from the cgroup|
|memory.pages.fault|counter||long|memory page faults|the number of page faults accounted the cgroup|
|swap.size|counter|bytes|long|swap|the number of bytes of swap usage|
|io.read|gauge||long|disk read|the number of bytes read from the disk|
|io.read.time|gauge|ns|long|disk read time|the total amount of time (in nanoseconds) between request dispatch and request completion|
|io.read.wait.time|counter|ns|long|disk read wait time|total amount of time the IO operations for this cgroup spent waiting in the scheduler queues|
|io.write|counter|bytes|long|disk write|the number of bytes written to the disk|
|io.write.time|counter|ns|long|disk write time|the total amount of time (in nanoseconds) between request dispatch and request completion|
|io.write.wait.time|counter|ns|long|disk write wait time|total amount of time the IO operations for this cgroup spent waiting in the scheduler queues|
|cpu.percent|gauge|%|double|CPU usage|container CPU usage|
|cpu.throttled.time|counter|ns|long|CPU throttled time|the total amount of time that processes have been throttled in the container cgroup|
|network.rx.bytes|counter|bytes|long|network received|received amount of bytes on the network interface|
|network.rx.packets|counter||long|network packets received|received amount of packets on the network interface|
|network.rx.errors|counter||long|network rx errors|received amount of errors on the network interface|
|network.rx.dropped|counter||long|network packets rx dropped|amount of dropped inbound packets on the network interface|
|network.tx|counter||long|network transmitted|transmitted amount of bytes on the network interface|
|network.tx.bytes|counter|bytes|long|network received|transmitted amount of bytes on the network interface|
|network.tx.packets|counter||long|network packets transmitted|transmitted amount of packets on the network interface|
|network.tx.errors|counter||long|network tx errors|transmitted amount of errors on the network interface|
|network.tx.dropped|counter||long|network packets tx dropped|amount of dropped outbound packets on the network interface

## More about Docker Monitoring
* [Docker Container Monitoring and Management Challenges](https://sematext.com/blog/docker-container-monitoring-management-challenges/)
* [Docker Container Performance Metrics](https://sematext.com/blog/top-docker-metrics-to-watch/)
* [Docker Container Monitoring Open Source Tools](https://sematext.com/blog/open-source-docker-monitoring-logging/)
* [Docker Container Monitoring with Sematext](https://sematext.com/blog/docker-container-monitoring-with-sematext/)

