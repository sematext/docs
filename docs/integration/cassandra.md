## Integration

- Instructions: [https://apps.sematext.com/ui/howto/Cassandra/overview](https://apps.sematext.com/ui/howto/Cassandra/overview)

## Metrics

Metric Name                 |  Key                                                |  Metric Type  |  Numeric Type  |  Unit                               |  Description
----------------------------|-----------------------------------------------------|---------------|----------------|-------------------------------------|-----------------------------------------------------------------------------------------------------------------------------------------------
leaving nodes               |  cassandra.cluster.nodes.leaving                    |  gauge        |  long          |                                     |
moving nodes                |  cassandra.cluster.nodes.moving                     |  gauge        |  long          |                                     |
joining nodes               |  cassandra.cluster.nodes.joining                    |  gauge        |  long          |                                     |
live nodes                  |  cassandra.cluster.nodes.live                       |  gauge        |  long          |  from the perspective of this node  |  Count of nodes which are visible and live
unreachable nodes           |  cassandra.cluster.nodes.unreachable                |  gauge        |  long          |                                     |  Count of the nodes which this node knows about which are currently unreachable
write requests              |  cassandra.write.requests                           |  counter      |  long          |                                     |  The number of write requests
write latency total         |  cassandra.write.requests.latency.time              |  counter      |  long          |  ms                                 |
avg write latency           |  cassandra.write.latency.avg                        |  gauge        |  double        |  ms                                 |
read requests               |  cassandra.read.requests                            |  counter      |  long          |                                     |  The number of read requests
read latency total          |  cassandra.read.requests.latency.time               |  counter      |  long          |  ms                                 |
avg read latency            |  cassandra.read.latency.avg                         |  gauge        |  double        |  ms                                 |
read repairs pending        |  cassandra.read.repair.pending                      |  gauge        |  long          |                                     |  The number of read repair operations that are queued and waiting for system resources in order to run
compactions pending         |  cassandra.compaction.pending                       |  gauge        |  long          |                                     |  The number of compactions that are queued and waiting for system resources in order to run
bytes compacted             |  cassandra.compaction.bytes                         |  counter      |  long          |  bytes                              |  Total number of bytes compacted since server [re]start
compactions completed       |  cassandra.compaction.completed                     |  counter      |  long          |                                     |  Number of compaction tasks completed
key cache requests          |  cassandra.cache.key.requests                       |  counter      |  long          |                                     |  The number of key cache requests
key cache hits              |  cassandra.cache.key.hits                           |  counter      |  long          |                                     |  The number of key cache hits. This will avoid possible disk seeks when finding a partition in an SSTable
row cache requests          |  cassandra.cache.row.requests                       |  counter      |  long          |                                     |  The number of row cache requests
row cache hits              |  cassandra.cache.row.hits                           |  counter      |  long          |                                     |  The number of row cache hits
repl. on write pending      |  cassandra.write.replications.pending               |  gauge        |  long          |                                     |  When an insert or update to a row is written, the affected row is replicated to all other nodes that manage a replica for that row
write flushes pending       |  cassandra.write.flushes.pending                    |  gauge        |  long          |                                     |  Number of Flush Writer(writes memtables to disk) tasks pending
write requests pending      |  cassandra.write.pending                            |  gauge        |  long          |                                     |  The number of write requests that have arrived into the cluster but are waiting to be handled
write post flushes pending  |  cassandra.write.postflushes.pending                |  gauge        |  long          |                                     |  Number of Post Flush(cleans up commit log after memtable is written to disk) tasks pending
read requests pending       |  cassandra.read.requests.pending                    |  gauge        |  long          |                                     |  The number of read requests that have arrived into the cluster but are waiting to be handled
repair tasks pending        |  cassandra.cluster.tasks.repair.pending             |  gauge        |  long          |                                     |  Repair tasks pending, such as handling the merkle tree transfer after the validation compaction
gossip tasks pending        |  cassandra.cluster.tasks.gossip.pending             |  gauge        |  long          |                                     |  Number of gossip messages and acknowledgments queued and waiting to be sent or received
hints handoff pending       |  cassandra.cluster.tasks.handoff.pending            |  gauge        |  long          |                                     |  Number of hints that are queued and waiting to be delivered after a failed node is back online again
internal responses pending  |  cassandra.cluster.tasks.response.internal.pending  |  gauge        |  long          |                                     |  Number of pending tasks from internal tasks, such as nodes joining and leaving the cluster
migrations pending          |  cassandra.cluster.tasks.migration.pending          |  gauge        |  long          |                                     |  Number of pending tasks from system methods that modified the schema
misc tasks pending          |  cassandra.cluster.tasks.misc.pending               |  gauge        |  long          |                                     |  Number of pending tasks from infrequently run operations, such as taking a snapshot or processing the notification of a completed replication
cluster responses pending   |  cassandra.cluster.tasks.response.pending           |  gauge        |  long          |                                     |  Number of pending callbacks to execute after a task on a remote node completes
sstable size                |  cassandra.sstable.size                             |  gauge        |  long          |  bytes                              |  Disk space used by SSTables belonging to this table
sstables count              |  cassandra.sstable.count                            |  gauge        |  long          |                                     |  Number of SSTables on disk for this table
bloom false positives       |  cassandra.bloom.falsepositives                     |  counter      |  long          |                                     |  The number of Bloom filter false positives
bloom false positive ratio  |  cassandra.bloom.falsepositives.ratio               |  gauge        |  double        |                                     |  The ratio of Bloom filter false positives to total checks
bloom disk space            |  cassandra.bloom.disk.space                         |  gauge        |  long          |  bytes                              |  Disk space used by the Bloom filters
sstables per read           |  cassandra.number.of.sstables.per.read              |  gauge        |  double        |                                     |  Number of SSTables are accessed during a read. Includes sstables that undergo bloom-filter checks, even if no data is read from the sstable
local write request         |  cassandra.local.write.requests                     |  counter      |  long          |                                     |  Local writes update the table's memtable and appends to a commitlog
local write latency total   |  cassandra.local.write.requests.latency.time        |  counter      |  long          |  ms                                 |
avg local write latency     |  cassandra.local.write.latency.avg                  |  gauge        |  double        |  ms                                 |
local read request          |  cassandra.local.read.requests                      |  counter      |  long          |                                     |  Local reads retrieve data from a table's memtable and any necessary SSTables on disk
local read latency total    |  cassandra.local.read.requests.latency.time         |  counter      |  long          |  ms                                 |
avg local read latency      |  cassandra.local.read.latency.avg                   |  gauge        |  double        |  ms                                 |
