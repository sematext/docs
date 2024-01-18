title: Container Metrics
description: Container metrics, docker, rkt, containerd, cgroupfs

Sematext Agent offers a unified and agnostic approach to container engine monitoring and visibility. Containers are discovered from _cgroupfs_ hierarchies and all the metrics are fetched directly from accounting data exposed through _cgroup_ controllers. We have support for Docker, [containerd](https://containerd.io/), [crio](https://cri-o.io/), and [podman](https://podman.io/) container runtimes.

## Metrics

The following information recaps all the metrics shipped by the agent.

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
      - Docker Data Center
      - Docker Enterprise
      - Kubernetes
      - AWS ECS, AWS EKS
      - AKS
      - GKE
      - Red Hat OpenShift
      - Nomad
      - Docker Swarm
      - Mesos
      - Rancher
      


## Container Metrics Fields

|Name|Type|Unit|Numeric Type|Label|Description|
|----|----|----|------------|-----|-----------|
|container.memory.usage|gauge|bytes|long|memory|container memory usage in bytes|
|container.memory.fail.count|counter||long|memory|the number of times that memory cgroup limit was exceeded|
|container.memory.limit|gauge|bytes|long|memory|the max allowed memory limit for the container cgroup|
|container.memory.limit.soft|gauge|bytes|long|soft memory limit|soft memory limit represents the initial memory reservation for the container|
|container.memory.rss|gauge|bytes|long|RSS memory|number of bytes of anonymous (file unmapped memory) and swap cache memory|
|container.cache.usage|gauge|bytes|long|cache memory|number of bytes of page cache memory|
|container.memory.pages.in|counter||long|memory pages in|memory pages in,description=the number of events each time the page is accounted to the cgroup|
|container.memory.pages.out|counter||long|memory pages out|memory pages out,description=the number of events each time a page is unaccounted from the cgroup|
|container.memory.pages.fault|counter||long|memory page faults|the number of page faults accounted to the cgroup|
|container.memory.pages.fault.major|counter||long|major memory page faults|the number of major page faults accounted to the cgroup|
|container.swap.size|counter|bytes|long|swap|the number of bytes of swap usage|
|container.swap.limit|gauge|bytes|long|swap limit|the swap memory usage limit|
|container.io.read|gauge||long|disk read|the number of bytes read from the disk|
|container.io.read.time|gauge|ns|long|disk read time|the total amount of time (in nanoseconds) between request dispatch and request completion|
|container.io.read.wait.time|counter|ns|long|disk read wait time|total amount of time the IO operations for this cgroup spent waiting in the scheduler queues|
|container.io.write|counter|bytes|long|disk write|the number of bytes written to the disk|
|container.io.write.time|counter|ns|long|disk write time|the total amount of time (in nanoseconds) between request dispatch and request completion|
|container.io.write.wait.time|counter|ns|long|disk write wait time|total amount of time the IO operations for this cgroup spent waiting in the scheduler queues|
|container.io.weight|gauge|ns|long|disk io weight|specifies the relative proportion of block I/O access ranging from 100 to 1000|
|container.cpu.percent|gauge|%|double|CPU usage|container CPU usage|
|container.cpu.throttled.time|counter|microseconds|long|CPU throttled time|the total amount of time that processes have been throttled in the container cgroup|
|container.cpu.shares|gauge|ns|long|CPU shares|represents the weight of the cgroup that translates into the amount of CPU it is expected to get. Upon cgroup creation each group gets assigned a default of 1024|
|container.cpu.quota|gauge|microseconds|long|CPU quota|enforces a hard limit to the CPU time allocated to processes|
|container.cpu.period|gauge|microseconds|long|CPU period|is the time window expressed in microseconds that represents the period for which processes are allowed to run under specific quota|
|container.network.rx.bytes|counter|bytes|long|network received|received amount of bytes on the network interface|
|container.network.rx.packets|counter||long|network packets received|received amount of packets on the network interface|
|container.network.rx.errors|counter||long|network rx errors|received amount of errors on the network interface|
|container.network.rx.dropped|counter||long|network packets rx dropped|amount of dropped inbound packets on the network interface|
|container.network.tx|counter||long|network transmitted|transmitted amount of bytes on the network interface|
|container.network.tx.bytes|counter|bytes|long|network received|transmitted amount of bytes on the network interface|
|container.network.tx.packets|counter||long|network packets transmitted|transmitted amount of packets on the network interface|
|container.network.tx.errors|counter||long|network tx errors|transmitted amount of errors on the network interface|
|container.network.tx.dropped|counter||long|network packets tx dropped|amount of dropped outbound packets on the network interface|