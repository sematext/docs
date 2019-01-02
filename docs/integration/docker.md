title: Docker Monitoring Integration
description: Docker performance monitoring - metrics, event, log collection and parsing for Docker

## Overview
  
The following information is collected and transmitted to Sematext Cloud or Sematext Enterprise version.  Sematext Cloud integration for Docker uses [Sematext Agent](https://sematext.com/docs/containers/) and the open-source [Logagent](https://sematext.com/docs/logagent/installation-docker/) for the collection of container logs. 

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
<td><strong>Docker Container Metrics/Stats</strong></td>
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

Metric Name | Key | Agg | Type | Description
--- | --- | --- | --- | ---
container count | docker.containers | Avg | Long | 
write wait time | docker.io.write.wait.time | Sum | Double | 
write time | docker.io.write.time | Sum | Double | 
read | docker.io.read | Sum | Long | 
read wait time | docker.io.read.wait.time | Sum | Double | 
read time | docker.io.read.time | Sum | Double | 
write | docker.io.write | Sum | Long | 
mem fail counter | docker.memory.fail.count | Sum | Long | 
pages in | docker.swap.pages.in | Sum | Long | 
mem usage | docker.memory.usage | Avg | Long | 
pages fault | docker.swap.pages.fault | Sum | Long | 
pages out | docker.swap.pages.out | Sum | Long | 
mem limit | docker.memory.limit | Avg | Long | 
cpu throttled time | docker.cpu.throttled.time | Sum | Double | 
cpu usage | docker.cpu.percent | Avg | Double | 
tx dropped | docker.network.tx.dropped | Sum | Long | 
received | docker.network.rx.bytes | Sum | Long | 
transmitted | docker.network.tx.bytes | Sum | Long | 
received | docker.network.rx.packets | Sum | Long | 
rx errors | docker.network.rx.errors | Sum | Long | 
transmitted | docker.network.tx.packets | Sum | Long | 
rx dropped | docker.network.rx.dropped | Sum | Long | 
tx errors | docker.network.tx.errors | Sum | Long | 
