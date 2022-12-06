title: OpenSearch Monitoring Integration
description: Collect and monitor key OpenSearch metrics such as Cluster States and Pending Tasks, memory tied to shards, search latency, request rate, request cache, query/filter cache with built-in anomaly detection, threshold, and heartbeat alerts. Send notifications to email and various chatops messaging services, correlate events & logs, filter metrics by server, node, time or index, and visualize your cluster's health with out of the box graphs and custom dashboards

## Integration

- Instructions: [https://apps.sematext.com/ui/howto/opensearch/overview](https://apps.sematext.com/ui/howto/opensearch/overview)

## Metrics (WIP)

Metric Name<br> Key *(Type)* *(Unit)*                                                                             |  Description
------------------------------------------------------------------------------------------------------------------|-------------------------------------------------------------------
outgoing searches<br>**adaptiveReplicaSelection.searches.outgoing** <br>*(long gauge)*                            |  searches from the monitored node to the remote node
average queue size<br>**adaptiveReplicaSelection.queue.size.avg** <br>*(double gauge)*                            |  exponentially weighted moving average queue size for searches on the remote node
average service time<br>**adaptiveReplicaSelection.service.time.avg** <br>*(long gauge)* *(ns)*                   |  exponentially weighted moving average task execution time on the remote node
average response time<br>**adaptiveReplicaSelection.response.time.avg** <br>*(long gauge)* *(ns)*                 |  exponentially weighted moving average response time on the remote node
rank<br>**adaptiveReplicaSelection.rank** <br>*(double gauge)*                                                    |  rank of the remote node used for replica selection
inFlightRequests max size<br>**circuitBreaker.inFlightRequests.size.max** <br>*(long gauge)* *(bytes)*            |  max in-flight requests size
inFlightRequests estimated size<br>**circuitBreaker.inFlightRequests.size.estimate** <br>*(long gauge)* *(bytes)* |  estimated in-flight requests size
inFlightRequests overhead<br>**circuitBreaker.inFlightRequests.size.overhead** <br>*(double gauge)*               |  in-flight requests overhead
inFlightRequests tripped<br>**circuitBreaker.inFlightRequests.tripped** <br>*(counter)*                           |  in-flight requests circuit breaker tripped
nodes<br>**cluster.nodes** <br>*(long gauge)*                                                                     |  Number of nodes in the cluster
data nodes<br>**cluster.nodes.data** <br>*(long gauge)*                                                           |  Number of data nodes in the cluster
active primary shards<br>**cluster.health.shards.active.primary** <br>*(long gauge)*                              |  Number of active primary shards
active shards<br>**cluster.health.shards.active** <br>*(long gauge)*                                              |  Number of active shards
relocating shards<br>**cluster.health.shards.relocating** <br>*(long gauge)*                                      |  Number of currently relocating shards
unassigned shards<br>**cluster.health.shards.unassigned** <br>*(long gauge)*                                      |  Number of currently unassigned shards
pending tasks<br>**cluster.health.pendingTasks.total** <br>*(long gauge)*                                         |  Number of currently pending tasks in master's queue
pending tasks max waiting time<br>**cluster.health.pendingTasks.maxQueueTime** <br>*(long gauge)* *(ms)*          |  Maximum time for a task in master's queue
open TCP conns<br>**connection.tcp.server.open** <br>*(long gauge)*                                               |  open TCP conns (server_open)
network received packets<br>**transport.rx.packets** <br>*(counter)*                                              |  network received packets count (rx_count)
network received size<br>**transport.rx.bytes** <br>*(counter)* *(bytes)*                                         |  network received size (rx_size)
network transmitted packets<br>**transport.tx.packets** <br>*(counter)*                                           |  network transmitted packets count (tx_count)
network transmitted size<br>**transport.tx.bytes** <br>*(counter)* *(bytes)*                                      |  network transmitted size (tx_size)
cluster state incompatible diff updates<br>**cluster.state.published.diff.incompatible** <br>*(counter)*          |  cluster state incompatible diff updates published
cluster state compatible diff updates<br>**cluster.state.published.diff.compatible** <br>*(counter)*              |  cluster state compatible diff updates published
docs count<br>**index.docs.total** <br>*(long gauge)*                                                             |  docs count on all (primary and replica) shards
docs deleted<br>**index.docs.deleted.total** <br>*(long gauge)*                                                   |  docs deleted on all (primary and replica) shards
ingest calls<br>**ingest.calls.total** <br>*(counter)*                                                            |  number of calls to this pipeline
ingest failures<br>**ingest.calls.errors** <br>*(counter)*                                                        |  number of failed calls to this pipeline
ingest time<br>**ingest.time** <br>*(counter)* *(ms)*                                                             |  time spent in this pipeline
read ops<br>**disk.io.operations.read** <br>*(counter)*                                                           |  disk IO read operations
write ops<br>**disk.io.operations.write** <br>*(counter)*                                                         |  disk IO write operations
gc collection count<br>**gc.collection.count** <br>*(counter)*                                                    |  count of GC collections
gc collection time<br>**gc.collection.time** <br>*(counter)* *(ms)*                                               |  duration of GC collections
heap_used<br>**heap.used** <br>*(gauge)* *(bytes)*                                                                |  jvm heap used memory
heap.committed<br>**heap.committed** <br>*(gauge)* *(bytes)*                                                      |  jvm heap committed
non_heap_used<br>**nonheap.used** <br>*(gauge)* *(bytes)*                                                         |  jvm non-heap used memory
non_heap_committed<br>**nonheap.committed** <br>*(gauge)* *(bytes)*                                               |  jvm non-heap committed
open files<br>**files.open** <br>*(gauge)*                                                                        |  jvm currently open files
max open files<br>**files.max** <br>*(gauge)*                                                                     |  jvm max open files limit
used<br>**pool.used** <br>*(gauge)* *(bytes)*                                                                     |  jvm pool used memory
max<br>**pool.max** <br>*(gauge)* *(bytes)*                                                                       |  jvm pool max memory
thread count<br>**threads** <br>*(gauge)*                                                                         |  jvm thread count
peak thread count<br>**threads.peak** <br>*(gauge)*                                                               |  peak jvm thread count
