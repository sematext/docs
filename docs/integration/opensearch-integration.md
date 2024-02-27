title: Opensearch
description: Covers critical metrics—Cluster States, Pending Tasks, shard memory, search latency, request and cache stats—with anomaly detection and diverse alerting options. Correlate events, logs, filter metrics, and visualize cluster health using standard graphs and custom dashboards. Additionally, the OpenSearch Logs integration offers insights into query distribution, error analysis, deprecations, and cluster manager logs for troubleshooting and analysis.

OpenSearch is a powerful, open-source search and analytics engine built for scalability, flexibility, and advanced data exploration capabilities. The [Sematext Agent](https://sematext.com/docs/agents/sematext-agent/) collects Opensearch metrics and logs, transmits them to Sematext Cloud; installing the agent takes less than 5 minutes.

## Install Sematext Agent

1. Create an Opensearch Logs or Monitoring [App](https://sematext.com/docs/guide/app-guide/). This will let you install the agent and control access to your monitoring and logs data.
3. Install the Sematext Agent according to the [https://apps.sematext.com/ui/howto/Opensearch/overview](https://apps.sematext.com/ui/howto/Opensearch/overview) displayed in the UI.
4. After installing the agent, the Discovery tab shows all the Opensearch services identified on the host and you will start receiving metrics or logs from Opensearch services.
5. If you've created an Opensearch Monitoring App and want to collect Opensearch logs as well, or vice versa, click on the **Create Logs App** button from the left menu panel. This will navigate you to the 'Create Logs App' (or Monitoring App) page, where you'll find all the discovered log sources from Opensearch services and manage log and metric shipping effortlessly.

Having both Opensearch Logs and Monitoring Apps lets you correlate performance metrics and logs, and accelerate troubleshooting using [Split Screen](https://sematext.com/docs/guide/split-screen/) for faster resolution. For example, if you see logs of a node restarting, metrics let you see the impact on the rest of the cluster in terms of CPU, GC, and other metrics. Including query time metrics, even if you don't collect slowlogs from [all] queries.


To [explore logs and services](https://sematext.com/docs/monitoring/autodiscovery/) across multiple hosts, navigate to [Fleet & Discovery > Discovery > Services](https://apps.sematext.com/ui/fleet-and-discovery/discovery/services) (or  [Sematext Cloud Europe](https://apps.eu.sematext.com/ui/fleet-and-discovery/discovery/services)). From there, you can create additional [Apps](https://sematext.com/docs/guide/app-guide/) or stream data to existing ones without requiring any additional installations. 

## Important Metrics to Watch and Alert on

### OpenSearch specific metrics

#### Search Query performance metrics: Request Rate and Latency
When the cluster receives a request, it may need to access data from multiple shards, across multiple nodes. Knowing the rate at which the system is processing and returning requests, how many requests are currently in progress, and how long requests are taking can provide valuable insights into the health and performance of the OpenSearch cluster.

![Request Rate](../images/integrations/opensearch-request-rate.png)

![Latency](../images/integrations/opensearch-latency.png)

#### Indexing Rate and Merge Times
Monitoring the OpenSearch document indexing rate and merge time can help identify anomalies and related problems before they begin to affect the performance of the cluster. Considering these metrics in parallel with the health of each node can provide essential clues to potential problems within the system, or opportunities to optimize performance.

![Merged Documents](../images/integrations/opensearch-merged-documents.png)

![Refresh, Flush, Merge](../images/integrations/opensearch-indexing-merge.png)

### System and JVM Metrics
OS metrics like CPU, memory, disk I/O, and network play an essential role in OpenSearch monitoring.

OpenSearch runs within a Java Virtual Machine (JVM) and [monitoring JVM](https://sematext.com/docs/integration/jvm/) heap usage is critical to ensure cluster performance. Moreover, JVM supports [garbage collection](https://sematext.com/docs/integration/jvm-gc-logs/), which means that garbage collection frequency and duration are just as important to measure.

Finally, high disk reads and writes can indicate a poorly tuned system. Since accessing the disk is an expensive process in terms of time, a well-tuned system should reduce disk I/O wherever possible.


## OpenSearch Default Alerts

As soon as you create an OpenSearch App, you will receive a set of default [alert rules](https://sematext.com/docs/guide/alerts-guide/). These pre-configured rules will notify you of important events that may require your attention, as shown below.

### Node count anomaly

This alert rule continuously monitors the count of nodes in an OpenSearch cluster, checking for anomalies in the number of nodes present within the cluster. When anomalies are detected, it triggers a warning (WARN priority). The minimum delay between consecutive alerts triggered by this alert rule is set to 10 minutes.

Suppose an OpenSearch cluster typically maintains a stable number of nodes, but due to various factors such as node failures, scaling activities, or network issues, the node count experiences sudden changes. When this happens, the alert rule checks for anomalies in the count of nodes over the last 90 minutes. Upon detecting the anomaly, the alert rule triggers a warning.

#### Actions to take

- Check the status of nodes within the OpenSearch cluster for any nodes that may be offline, unavailable, or experiencing issues
- If node failures are detected, you may need to restart failed nodes or replace hardware
- If the node count changes due to scaling activities (e.g., adding or removing nodes), review the recent scaling events to confirm that they are intentional and expected
- Monitor network connectivity between nodes within the OpenSearch cluster for any network issues that may be affecting communication and node discovery


### Java old gen usage > 97%

This alert rule continuously monitors the usage of Java's old generation heap memory in an OpenSearch environment, triggering a warning if the usage exceeds 97%. The minimum delay between consecutive alerts triggered by this alert rule is set to 10 minutes.

Suppose the Java old generation heap memory usage in the OpenSearch environment starts increasing and eventually exceeds 97% over a 5-minute period.

#### Actions to take

- Analyze the application's memory usage patterns for any memory leaks
- Review and optimize the Java Virtual Machine (JVM) configuration, including heap size settings, garbage collection algorithms, and memory management parameters
- Monitor system resources, including memory, CPU, and disk I/O, and consider scaling them up if necessary
- Investigate recent application changes, updates, or deployments that may have contributed to the spike in memory usage

### Field data size

This alert rule continuously monitors the field data size in an OpenSearch cluster and triggers a warning if the field data size exceeds a certain threshold (20 in this case). The minimum delay between consecutive alerts triggered by this alert rule is set to 10 minutes.

Suppose the field data size in the OpenSearch cluster increases significantly due to increased query loads or inefficient queries. When this happens, the alert rule checks the field data size over the last 10 minutes. If it exceeds 20% of the JVM heap committed memory during this timeframe, the alert rule triggers a warning.

#### Actions to take

- Analyze the query patterns and usage that contribute to the increased field data size. Look for inefficient or resource-intensive queries that may need optimization
- Optimize queries to reduce the amount of field data loaded into memory. This may involve restructuring queries, using filters, or optimizing aggregations to minimize memory usage
- Consider scaling up the resources allocated to the OpenSearch cluster, such as increasing the JVM heap size, to accommodate the increased field data size


### Tripped parent circuit breaker

This alert rule continuously monitors the tripping of the parent circuit breaker in an OpenSearch cluster, detecting instances where the circuit breaker has been triggered due to resource constraints or overload. When such instances are detected, it triggers a warning (WARN priority). The minimum delay between consecutive alerts triggered by this alert rule is set to 10 minutes.

Suppose an OpenSearch cluster experiences a sudden increase in query load or indexing throughput, leading to resource contention and triggering the parent circuit breaker. When this happens, the alert rule checks for instances of the parent circuit breaker being tripped over the last 5 minutes. The alert is triggered as soon as the circuit breaker is tripped at least once within the specified timeframe.

#### Actions to take

- Analyze resource usage metrics for the OpenSearch cluster, including CPU, memory, and disk utilization, to identify the source of the increased load
- Review and optimize search queries or indexing operations that may be contributing to the increased load on the cluster. Consider optimizing query performance, reducing indexing throughput

### Unassigned shards anomaly

This alert rule continuously monitors the presence of unassigned shards in an OpenSearch cluster, identifying anomalies in the number of unassigned shards over time. When anomalies are detected, it triggers a warning (WARN priority). The minimum delay between consecutive alerts triggered by this alert rule is set to 10 minutes.

Suppose an OpenSearch cluster typically maintains a low number of unassigned shards, but due to issues such as node failures or disk space constraints, the number of unassigned shards suddenly increases. When this happens, the alert rule checks for anomalies in the number of unassigned shards over the last 30 minutes. Upon detecting the anomaly, the alert rule triggers a warning.

#### Actions to take

- Check the status of OpenSearch nodes to determine if any nodes are experiencing issues or are offline
- Review disk space on OpenSearch nodes to see if there is sufficient space available for shard allocation
- Review shard allocation settings in the OpenSearch cluster configuration to make sure that shards are allocated properly and evenly across nodes
- Recover unassigned shards and allocate them to available nodes in the cluster

### Thread pool rejections anomaly

This alert rule continuously monitors thread pool rejections in an OpenSearch environment, identifying anomalies in the rate at which thread pool requests are rejected. When anomalies are detected, it triggers a warning (WARN priority). The minimum delay between consecutive alerts triggered by this alert rule is set to 10 minutes.

Suppose an OpenSearch cluster experiences a sudden increase in thread pool rejections, potentially due to resource limitations or high query loads. When this happens, the alert rule checks for anomalies in thread pool rejections over the last 90 minutes. Upon detecting the anomaly, the alert rule triggers a warning.

#### Actions to take

- Review system metrics for the OpenSearch cluster, including CPU, memory, and disk usage, for any resource constraints that may be contributing to thread pool rejections
- Analyze query patterns for any inefficient or resource-intensive queries. Optimize queries to reduce the load on the cluster
- Review thread pool configurations and adjust settings such as thread counts, queue sizes, and timeouts to better accommodate the workload and prevent thread pool saturation

### Used memory > 80%

This alert rule continuously monitors memory usage in an OpenSearch environment and triggers a warning (WARN priority) when the used memory exceeds 80% of the total available memory. The minimum delay between consecutive alerts triggered by this alert rule is set to 10 minutes.

Suppose the OpenSearch cluster experiences a sudden increase in activity or data volume, leading to increased memory usage. When the used memory exceeds 80% of the total available memory, the alert rule checks memory usage over the last hour. Upon crossing the threshold, the alert rule triggers a warning.

#### Actions to take

- Investigate the cause of increased memory usage in the OpenSearch cluster, such as processes or activities contributing to the high memory consumption
- Review and optimize the configuration settings of the OpenSearch cluster, including heap size allocation and cache settings

### Swap usage

This alert rule continuously monitors swap usage in an OpenSearch environment by tracking the rate of swap input/output operations. When any amount of swap usage is detected, it triggers a warning (WARN priority). This includes even the slightest swap activity, such as reading or writing a single byte to or from swap space.

The minimum delay between consecutive alerts triggered by this alert rule is set to 10 minutes.

Suppose there is some activity detected in the swap usage on a node in the OpenSearch cluster. Despite the relatively small amount of swap activity, the alert rule triggers a warning to prevent any big (and potentially unacceptable) slowdowns in OpenSearch caused by accessing swap memory.

#### Action to take

- Review system resource metrics to identify any spikes or anomalies in CPU, memory, or disk usage that may be contributing to swap usage
- Evaluate OpenSearch configuration settings and adjust resource allocations as needed to optimize performance and prevent any swap usage

### Open files > 85%

This alert rule continuously monitors the percentage of open files in an OpenSearch cluster. When the percentage exceeds 85% within the specified timeframe, it triggers a warning (WARN priority). The minimum delay between consecutive alerts triggered by this alert rule is set to 10 minutes.

Suppose an OpenSearch cluster typically operates with a healthy percentage of open files, but due to increased usage or resource limitations, the percentage of open files exceeds 85%. When this happens, the alert rule checks for instances where the percentage of open files exceeds 85% within the last 10 minutes and triggers a warning.

#### Actions to take

- Review resource usage metrics and system logs to identify any issues contributing to the high percentage of open files
- Review OpenSearch cluster configuration settings and consider optimizing resource allocation and file management settings to better handle file usage and prevent excessive file opening

### Load average

This alert rule continuously monitors the load average of an OpenSearch cluster and triggers a warning when the load average exceeds a specified threshold (currently when load average is more than 2). The minimum delay between consecutive alerts triggered by this alert rule is set to 10 minutes.

Suppose the average load on the OpenSearch cluster typically remains below 2, but due to increased query loads or resource constraints, the load average spikes above 2. When this happens, the alert rule checks for load average values over the last 30 minutes. Upon detecting the load average anomaly, the alert rule triggers a warning.

#### Actions to take

-  Review system metrics such as CPU, memory, and disk usage for any source of increased load on the OpenSearch cluster
- Review and optimize queries or indexing processes that may be contributing to the increased load on the cluster
- If the increased load is due to resource limitations, consider scaling up resources such as CPU or memory


You can [create additional alerts](https://sematext.com/docs/alerts) on any metric.

## Metrics

Metric Name<br> Key *(Type)* *(Unit)*                                                                             |  Description
------------------------------------------------------------------------------------------------------------------|--------------------------------------------------------------------------------------------------
outgoing searches<br>**adaptiveReplicaSelection.searches.outgoing** <br>*(long gauge)*                            |  Searches from the monitored node to the remote node
average queue size<br>**adaptiveReplicaSelection.queue.size.avg** <br>*(double gauge)*                            |  Exponentially weighted moving average queue size for searches on the remote node
average service time<br>**adaptiveReplicaSelection.service.time.avg** <br>*(long gauge)* *(ns)*                   |  Exponentially weighted moving average task execution time on the remote node
average response time<br>**adaptiveReplicaSelection.response.time.avg** <br>*(long gauge)* *(ns)*                 |  Exponentially weighted moving average response time on the remote node
rank<br>**adaptiveReplicaSelection.rank** <br>*(double gauge)*                                                    |  Rank of the remote node used for replica selection
inFlightRequests max size<br>**circuitBreaker.inFlightRequests.size.max** <br>*(long gauge)* *(bytes)*            |  Max in-flight requests size
inFlightRequests estimated size<br>**circuitBreaker.inFlightRequests.size.estimate** <br>*(long gauge)* *(bytes)* |  Estimated in-flight requests size
inFlightRequests overhead<br>**circuitBreaker.inFlightRequests.size.overhead** <br>*(double gauge)*               |  In-flight requests overhead
inFlightRequests tripped<br>**circuitBreaker.inFlightRequests.tripped** <br>*(counter)*                           |  In-flight requests circuit breaker tripped
nodes<br>**cluster.nodes** <br>*(long gauge)*                                                                     |  Number of nodes in the cluster
data nodes<br>**cluster.nodes.data** <br>*(long gauge)*                                                           |  Number of data nodes in the cluster
active primary shards<br>**cluster.health.shards.active.primary** <br>*(long gauge)*                              |  Number of active primary shards
active shards<br>**cluster.health.shards.active** <br>*(long gauge)*                                              |  Number of active shards
relocating shards<br>**cluster.health.shards.relocating** <br>*(long gauge)*                                      |  Number of currently relocating shards
unassigned shards<br>**cluster.health.shards.unassigned** <br>*(long gauge)*                                      |  Number of currently unassigned shards
pending tasks<br>**cluster.health.pendingTasks.total** <br>*(long gauge)*                                         |  Number of currently pending tasks in master's queue
pending tasks max waiting time<br>**cluster.health.pendingTasks.maxQueueTime** <br>*(long gauge)* *(ms)*          |  Maximum time for a task in master's queue
open TCP conns<br>**connection.tcp.server.open** <br>*(long gauge)*                                               |  Open TCP conns (server_open)
network received packets<br>**transport.rx.packets** <br>*(counter)*                                              |  Network received packets count (rx_count)
network received size<br>**transport.rx.bytes** <br>*(counter)* *(bytes)*                                         |  Network received size (rx_size)
network transmitted packets<br>**transport.tx.packets** <br>*(counter)*                                           |  Network transmitted packets count (tx_count)
network transmitted size<br>**transport.tx.bytes** <br>*(counter)* *(bytes)*                                      |  Network transmitted size (tx_size)
cluster state incompatible diff updates<br>**cluster.state.published.diff.incompatible** <br>*(counter)*          |  Cluster state incompatible diff updates published
cluster state compatible diff updates<br>**cluster.state.published.diff.compatible** <br>*(counter)*              |  Cluster state compatible diff updates published
docs count<br>**index.docs.total** <br>*(long gauge)*                                                             |  Docs count on all (primary and replica) shards
docs deleted<br>**index.docs.deleted.total** <br>*(long gauge)*                                                   |  Docs deleted on all (primary and replica) shards
ingest calls<br>**ingest.calls.total** <br>*(counter)*                                                            |  Number of calls to this pipeline
ingest failures<br>**ingest.calls.errors** <br>*(counter)*                                                        |  Number of failed calls to this pipeline
ingest time<br>**ingest.time** <br>*(counter)* *(ms)*                                                             |  Time spent in this pipeline
read ops<br>**disk.io.operations.read** <br>*(counter)*                                                           |  Disk IO read operations
write ops<br>**disk.io.operations.write** <br>*(counter)*                                                         |  Disk IO write operations
gc collection count<br>**gc.collection.count** <br>*(counter)*                                                    |  Count of GC collections
gc collection time<br>**gc.collection.time** <br>*(counter)* *(ms)*                                               |  Duration of GC collections
heap_used<br>**heap.used** <br>*(gauge)* *(bytes)*                                                                |  JVM heap used memory
heap.committed<br>**heap.committed** <br>*(gauge)* *(bytes)*                                                      |  JVM heap committed
non_heap_used<br>**nonheap.used** <br>*(gauge)* *(bytes)*                                                         |  JVM non-heap used memory
non_heap_committed<br>**nonheap.committed** <br>*(gauge)* *(bytes)*                                               |  JVM non-heap committed
open files<br>**files.open** <br>*(gauge)*                                                                        |  JVM currently open files
max open files<br>**files.max** <br>*(gauge)*                                                                     |  JVM max open files limit
used<br>**pool.used** <br>*(gauge)* *(bytes)*                                                                     |  JVM pool used memory
max<br>**pool.max** <br>*(gauge)* *(bytes)*                                                                       |  JVM pool max memory
thread count<br>**threads** <br>*(gauge)*                                                                         |  JVM thread count
peak thread count<br>**threads.peak** <br>*(gauge)*                                                               |  Peak JVM thread count
merge count<br>**indexing.merges.total** <br>*(counter)*                                                          |  Merge count on all (primary and replica) shards
merge time<br>**indexing.merges.time.total** <br>*(counter)* *(ms)*                                               |  Merge time on all (primary and replica) shards
merged docs count<br>**indexing.merges.docs.total** <br>*(counter)*                                               |  Merged docs count on all (primary and replica) shards
merged docs size<br>**indexing.merges.docs.size.total** <br>*(counter)* *(bytes)*                                 |  Merged docs size on all (primary and replica) shards
throttled merge time<br>**indexing.merges.throttled.time.total** <br>*(counter)* *(ms)*                           |  Throttled time for merges (i.e. when merges fall behind) on all (primary and replica) shards
throttled merge size<br>**indexing.merges.throttled.size.total** <br>*(counter)* *(bytes)*                        |  Size of throttled merges on all (primary and replica) shards
field cache evictions<br>**cache.field.evicted** <br>*(counter)*                                                  |  Field cache evictions
field cache size<br>**cache.field.size** <br>*(long gauge)*                                                       |  Field cache size
number of processors<br>**cpu.allocated.count** <br>*(long gauge)*                                                |  Number of processors allocated to the OpenSearch process
refresh count<br>**indexing.refreshes.total** <br>*(counter)*                                                     |  Refresh count on all (primary and replica) shards
refresh time<br>**indexing.refreshes.time.total** <br>*(counter)* *(ms)*                                          |  Refresh time on all (primary and replica) shards
script compilations<br>**script.compilations.total** <br>*(counter)*                                              |  Script compilations (use params in scripts to reduce them)
script cache evictions<br>**script.cache.evictions** <br>*(counter)*                                              |  Script cache evictions
script compilations limit triggered<br>**script.compilations.limitTriggered** <br>*(counter)*                     |  Script compilations circuit breaker triggered (see script.max_compilations_rate setting)
query count<br>**query.count.total** <br>*(counter)*                                                              |  Query count on all (primary and replica) shards
query latency<br>**query.latency.time.total** <br>*(counter)* *(ms)*                                              |  Query latency on all (primary and replica) shards
fetch count<br>**fetch.count.total** <br>*(counter)*                                                              |  Fetch count on all (primary and replica) shards
fetch latency<br>**fetch.latency.time.total** <br>*(counter)* *(ms)*                                              |  Fetch latency on all (primary and replica) shards
suggest count<br>**suggest.count.total** <br>*(counter)*                                                          |  Suggest count on all (primary and replica) shards
suggest latency<br>**suggest.latency.time.total** <br>*(counter)* *(ms)*                                          |  Suggest latency on all (primary and replica) shards
scroll count<br>**scroll.count.total** <br>*(counter)*                                                            |  Scroll count on all (primary and replica) shards
scroll latency<br>**scroll.latency.time.total** <br>*(counter)* *(ms)*                                            |  Scroll latency on all (primary and replica) shards
search open contexts<br>**search.opencontexts.total** <br>*(long gauge)*                                          |  Open search contexts on all (primary and replica) shards
avg. query latency<br>**query.latency.total.avg** <br>*(gauge)* *(ms)*                                            |  Avg. query latency on all (primary and replica) shards
segments count<br>**segments.count.total** <br>*(long gauge)*                                                     |  Number of segments
segments memory<br>**segments.memory.total** <br>*(long gauge)* *(bytes)*                                         |  Total memory for segment-related data structures
terms memory<br>**segments.memory.terms** <br>*(long gauge)* *(bytes)*                                            |  Memory used by the terms dictionary
stored fields memory<br>**segments.memory.storedFields** <br>*(long gauge)* *(bytes)*                             |  Memory used by stored fields
term vectors memory<br>**segments.memory.termVectors** <br>*(long gauge)* *(bytes)*                               |  Memory used by term vectors
norms memory<br>**segments.memory.norms** <br>*(long gauge)* *(bytes)*                                            |  Memory used by (length) norms
points memory<br>**segments.memory.points** <br>*(long gauge)* *(bytes)*                                          |  Memory used by point fields (includes numeric, date, geo)
doc values memory<br>**segments.memory.docValues** <br>*(long gauge)* *(bytes)*                                   |  Memory used by doc values
indexing buffer memory<br>**segments.memory.indexWriter** <br>*(long gauge)* *(bytes)*                            |  Memory used by the IndexWriter
version map memory<br>**segments.memory.versionMap** <br>*(long gauge)* *(bytes)*                                 |  Memory used by the version map
fixed bitset memory<br>**segments.memory.fixedBitSet** <br>*(long gauge)* *(bytes)*                               |  Memory used by the fixed bitset that speeds up nested queries/aggregations
unassigned shards<br>**cluster.shards.unassigned** <br>*(long gauge)*                                             |  Number of unassigned shards
active shards<br>**cluster.shards.active** <br>*(long gauge)*                                                     |  Number of active shards
active primary shards<br>**cluster.shards.active.primary** <br>*(long gauge)*                                     |  Number of active primary shards
initializing shards<br>**cluster.shards.initializing** <br>*(long gauge)*                                         |  Number of initializing shards
relocating shards<br>**cluster.shards.relocating** <br>*(long gauge)*                                             |  Number of relocating shards
active threads<br>**thread.pool.active** <br>*(long gauge)*                                                       |  Active threads
thread pool size<br>**thread.pool.size** <br>*(long gauge)*                                                       |  Thread pool size
thread pool queue<br>**thread.pool.queue** <br>*(long gauge)*                                                     |  Thread pool queue
thread pool queue size<br>**thread.pool.queue.size** <br>*(long gauge)*                                           |  Thread pool queue size
rejected threads<br>**thread.pool.rejected** <br>*(counter)*                                                      |  Rejected threads
thread pool largest<br>**thread.pool.largest** <br>*(long gauge)*                                                 |  Thread pool largest
completed threads<br>**thread.pool.completed** <br>*(counter)*                                                    |  Complete threads
thread pool min<br>**thread.pool.min** <br>*(long gauge)*                                                         |  Thread pool min
thread pool max<br>**thread.pool.max** <br>*(long gauge)*                                                         |  Thread pool max

## Logs

Once data is in, you can explore it via the built-in reports or create your own:

![OpenSearch Logs Overview Report](../images/integrations/opensearch-logs-overview.png)

### Queries Report

You can use the Queries report to see a breakdown of your queries and "zoom in" to the ones you're interested in:

![OpenSearch Queries Report](../images/integrations/opensearch-logs-queries.png)

### Errors Report

You can use the Errors report to see breakdown of what's wrong, for example, which nodes or components generate errors:

![OpenSearch Errors Report](../images/integrations/opensearch-logs-errors.png)

### Clustering Report

You can use the Clustering report to see logs produced by components that have to do with cluster coordination. Cluster coordinator logs, logs related to a node joining/leaving a cluster and shard allocation:

![OpenSearch Clustering Report](../images/integrations/opensearch-logs-clustering.png)

### Deprecation Report

You can use the Deprecation report to see a breakdown of deprecation logs by node and component:

![OpenSearch Deprecation Report](../images/integrations/opensearch-logs-deprecation.png)

### Start & Stop Report

You can use the Start & Stop report to see startup-related and shutdown-related logs. Look here if a node went down unexpectedly or doesn't show up in the cluster when started:

![OpenSearch Start & Stop Report](../images/integrations/opensearch-logs-startstop.png)

## Troubleshooting

If you have trouble sending logs, try out the latest version of [Sematext Agent](../agents/sematext-agent/installation/). Also, make sure Sematext Agent is configured to send logs to your OpenSearch Logs App. Last, check the [Log Agents panel](https://sematext.com/docs/fleet/#log-agents) for any errors, and refer to our [Sematext Logs FAQ](https://sematext.com/docs/logs/faq/) for useful tips.
