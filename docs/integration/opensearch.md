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
merge count<br>**indexing.merges.total** <br>*(counter)*                                                          |  merge count on all (primary and replica) shards
merge time<br>**indexing.merges.time.total** <br>*(counter)* *(ms)*                                               |  merge time on all (primary and replica) shards
merged docs count<br>**indexing.merges.docs.total** <br>*(counter)*                                               |  merged docs count on all (primary and replica) shards
merged docs size<br>**indexing.merges.docs.size.total** <br>*(counter)* *(bytes)*                                 |  merged docs size on all (primary and replica) shards
throttled merge time<br>**indexing.merges.throttled.time.total** <br>*(counter)* *(ms)*                           |  throttled time for merges (i.e. when merges fall behind) on all (primary and replica) shards
throttled merge size<br>**indexing.merges.throttled.size.total** <br>*(counter)* *(bytes)*                        |  size of throttled merges on all (primary and replica) shards
field cache evictions<br>**cache.field.evicted** <br>*(counter)*                                                  |  Field cache evictions
field cache size<br>**cache.field.size** <br>*(long gauge)*                                                       |  Field cache size
number of processors<br>**cpu.allocated.count** <br>*(long gauge)*                                                |  number of processors allocated to the OpenSearch process
refresh count<br>**indexing.refreshes.total** <br>*(counter)*                                                     |  refresh count on all (primary and replica) shards
refresh time<br>**indexing.refreshes.time.total** <br>*(counter)* *(ms)*                                          |  refresh time on all (primary and replica) shards
script compilations<br>**script.compilations.total** <br>*(counter)*                                              |  script compilations (use params in scripts to reduce them)
script cache evictions<br>**script.cache.evictions** <br>*(counter)*                                              |  script cache evictions
script compilations limit triggered<br>**script.compilations.limitTriggered** <br>*(counter)*                     |  script compilations circuit breaker triggered (see script.max_compilations_rate setting)
query count<br>**query.count.total** <br>*(counter)*                                                              |  query count on all (primary and replica) shards
query latency<br>**query.latency.time.total** <br>*(counter)* *(ms)*                                              |  query latency on all (primary and replica) shards
fetch count<br>**fetch.count.total** <br>*(counter)*                                                              |  fetch count on all (primary and replica) shards
fetch latency<br>**fetch.latency.time.total** <br>*(counter)* *(ms)*                                              |  fetch latency on all (primary and replica) shards
suggest count<br>**suggest.count.total** <br>*(counter)*                                                          |  suggest count on all (primary and replica) shards
suggest latency<br>**suggest.latency.time.total** <br>*(counter)* *(ms)*                                          |  suggest latency on all (primary and replica) shards
scroll count<br>**scroll.count.total** <br>*(counter)*                                                            |  scroll count on all (primary and replica) shards
scroll latency<br>**scroll.latency.time.total** <br>*(counter)* *(ms)*                                            |  scroll latency on all (primary and replica) shards
search open contexts<br>**search.opencontexts.total** <br>*(long gauge)*                                          |  open search contexts on all (primary and replica) shards
avg. query latency<br>**query.latency.total.avg** <br>*(gauge)* *(ms)*                                            |  avg. query latency on all (primary and replica) shards
segments count<br>**segments.count.total** <br>*(long gauge)*                                                     |  number of segments
segments memory<br>**segments.memory.total** <br>*(long gauge)* *(bytes)*                                         |  total memory for segment-related data structures
terms memory<br>**segments.memory.terms** <br>*(long gauge)* *(bytes)*                                            |  memory used by the terms dictionary
stored fields memory<br>**segments.memory.storedFields** <br>*(long gauge)* *(bytes)*                             |  memory used by stored fields
term vectors memory<br>**segments.memory.termVectors** <br>*(long gauge)* *(bytes)*                               |  memory used by term vectors
norms memory<br>**segments.memory.norms** <br>*(long gauge)* *(bytes)*                                            |  memory used by (length) norms
points memory<br>**segments.memory.points** <br>*(long gauge)* *(bytes)*                                          |  memory used by point fields (includes numeric, date, geo)
doc values memory<br>**segments.memory.docValues** <br>*(long gauge)* *(bytes)*                                   |  memory used by doc values
indexing buffer memory<br>**segments.memory.indexWriter** <br>*(long gauge)* *(bytes)*                            |  memory used by the IndexWriter
version map memory<br>**segments.memory.versionMap** <br>*(long gauge)* *(bytes)*                                 |  memory used by the version map
fixed bitset memory<br>**segments.memory.fixedBitSet** <br>*(long gauge)* *(bytes)*                               |  memory used by the fixed bitset that speeds up nested queries/aggregations
unassigned shards<br>**cluster.shards.unassigned** <br>*(long gauge)*                                             |  Number of unassigned shards
active shards<br>**cluster.shards.active** <br>*(long gauge)*                                                     |  Number of active shards
active primary shards<br>**cluster.shards.active.primary** <br>*(long gauge)*                                     |  Number of active primary shards
initializing shards<br>**cluster.shards.initializing** <br>*(long gauge)*                                         |  Number of initializing shards
relocating shards<br>**cluster.shards.relocating** <br>*(long gauge)*                                             |  Number of relocating shards
