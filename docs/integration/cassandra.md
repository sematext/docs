title: Cassandra Integration 
description: Sematext integration used to capture and report Cassandra metrics, including throughput requests, errors, latency, compaction activity, and more. Use built-in reports and monitoring dashboards to capture and troubleshoot Cassandra issues in real-time by cluster or specific node in production

## Integration

- Instructions: [https://apps.sematext.com/ui/howto/Cassandra/overview](https://apps.sematext.com/ui/howto/Cassandra/overview)

## Metrics

Metric Name<br> Key *(Type)* *(Unit)*                                                                     |  Description
----------------------------------------------------------------------------------------------------------|-----------------------------------------------------------------------------------------------------------------------------------------------
sstable size<br>**cassandra.sstable.size** <br>*(long gauge)* *(bytes)*                                   |  Disk space used by SSTables belonging to this table
sstables count<br>**cassandra.sstable.count** <br>*(long gauge)*                                          |  Number of SSTables on disk for this table
bloom false positives<br>**cassandra.bloom.falsepositives** <br>*(long counter)*                          |  The number of Bloom filter false positives
bloom false positive ratio<br>**cassandra.bloom.falsepositives.ratio** <br>*(double gauge)*               |  The ratio of Bloom filter false positives to total checks
bloom disk space<br>**cassandra.bloom.disk.space** <br>*(long gauge)* *(bytes)*                           |  Disk space used by the Bloom filters
sstables per read<br>**cassandra.number.of.sstables.per.read** <br>*(double gauge)*                       |  Number of SSTables are accessed during a read. Includes sstables that undergo bloom-filter checks, even if no data is read from the sstable
local write request<br>**cassandra.local.write.requests** <br>*(long counter)*                            |  Local writes update the table's memtable and appends to a commitlog
local write latency total<br>**cassandra.local.write.requests.latency.time** <br>*(long counter)* *(ms)*  |
avg local write latency<br>**cassandra.local.write.latency.avg** <br>*(double gauge)* *(ms)*              |
local read request<br>**cassandra.local.read.requests** <br>*(long counter)*                              |  Local reads retrieve data from a table's memtable and any necessary SSTables on disk
local read latency total<br>**cassandra.local.read.requests.latency.time** <br>*(long counter)* *(ms)*    |
avg local read latency<br>**cassandra.local.read.latency.avg** <br>*(double gauge)* *(ms)*                |
leaving nodes<br>**cassandra.cluster.nodes.leaving** <br>*(long gauge)*                                   |
moving nodes<br>**cassandra.cluster.nodes.moving** <br>*(long gauge)*                                     |
joining nodes<br>**cassandra.cluster.nodes.joining** <br>*(long gauge)*                                   |
live nodes<br>**cassandra.cluster.nodes.live** <br>*(long gauge)* *(from the perspective of this node)*   |  Count of nodes which are visible and live
unreachable nodes<br>**cassandra.cluster.nodes.unreachable** <br>*(long gauge)*                           |  Count of the nodes which this node knows about which are currently unreachable
write requests<br>**cassandra.write.requests** <br>*(long counter)*                                       |  The number of write requests
write latency total<br>**cassandra.write.requests.latency.time** <br>*(long counter)* *(ms)*              |
avg write latency<br>**cassandra.write.latency.avg** <br>*(double gauge)* *(ms)*                          |
read requests<br>**cassandra.read.requests** <br>*(long counter)*                                         |  The number of read requests
read latency total<br>**cassandra.read.requests.latency.time** <br>*(long counter)* *(ms)*                |
avg read latency<br>**cassandra.read.latency.avg** <br>*(double gauge)* *(ms)*                            |
read repairs pending<br>**cassandra.read.repair.pending** <br>*(long gauge)*                              |  The number of read repair operations that are queued and waiting for system resources in order to run
compactions pending<br>**cassandra.compaction.pending** <br>*(long gauge)*                                |  The number of compactions that are queued and waiting for system resources in order to run
bytes compacted<br>**cassandra.compaction.bytes** <br>*(long counter)* *(bytes)*                          |  Total number of bytes compacted since server [re]start
compactions completed<br>**cassandra.compaction.completed** <br>*(long counter)*                          |  Number of compaction tasks completed
key cache requests<br>**cassandra.cache.key.requests** <br>*(long counter)*                               |  The number of key cache requests
key cache hits<br>**cassandra.cache.key.hits** <br>*(long counter)*                                       |  The number of key cache hits. This will avoid possible disk seeks when finding a partition in an SSTable
row cache requests<br>**cassandra.cache.row.requests** <br>*(long counter)*                               |  The number of row cache requests
row cache hits<br>**cassandra.cache.row.hits** <br>*(long counter)*                                       |  The number of row cache hits
repl. on write pending<br>**cassandra.write.replications.pending** <br>*(long gauge)*                     |  When an insert or update to a row is written, the affected row is replicated to all other nodes that manage a replica for that row
write flushes pending<br>**cassandra.write.flushes.pending** <br>*(long gauge)*                           |  Number of Flush Writer(writes memtables to disk) tasks pending
write requests pending<br>**cassandra.write.pending** <br>*(long gauge)*                                  |  The number of write requests that have arrived into the cluster but are waiting to be handled
write post flushes pending<br>**cassandra.write.postflushes.pending** <br>*(long gauge)*                  |  Number of Post Flush(cleans up commit log after memtable is written to disk) tasks pending
read requests pending<br>**cassandra.read.requests.pending** <br>*(long gauge)*                           |  The number of read requests that have arrived into the cluster but are waiting to be handled
repair tasks pending<br>**cassandra.cluster.tasks.repair.pending** <br>*(long gauge)*                     |  Repair tasks pending, such as handling the merkle tree transfer after the validation compaction
gossip tasks pending<br>**cassandra.cluster.tasks.gossip.pending** <br>*(long gauge)*                     |  Number of gossip messages and acknowledgments queued and waiting to be sent or received
hints handoff pending<br>**cassandra.cluster.tasks.handoff.pending** <br>*(long gauge)*                   |  Number of hints that are queued and waiting to be delivered after a failed node is back online again
internal responses pending<br>**cassandra.cluster.tasks.response.internal.pending** <br>*(long gauge)*    |  Number of pending tasks from internal tasks, such as nodes joining and leaving the cluster
migrations pending<br>**cassandra.cluster.tasks.migration.pending** <br>*(long gauge)*                    |  Number of pending tasks from system methods that modified the schema
misc tasks pending<br>**cassandra.cluster.tasks.misc.pending** <br>*(long gauge)*                         |  Number of pending tasks from infrequently run operations, such as taking a snapshot or processing the notification of a completed replication
cluster responses pending<br>**cassandra.cluster.tasks.response.pending** <br>*(long gauge)*              |  Number of pending callbacks to execute after a task on a remote node completes
