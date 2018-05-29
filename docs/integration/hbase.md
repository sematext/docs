## Integration

- Instructions: [https://apps.sematext.com/ui/howto/HBase/overview](https://apps.sematext.com/ui/howto/HBase/overview)

## Metrics

Metric Name<br> Key *(Type)* *(Unit)*                                                                                                  |  Description
---------------------------------------------------------------------------------------------------------------------------------------|--------------------------------------------------------------------------------------------------------------------------------
lifo mode switches<br>**hbase.ipc.lifo.mode.switches** <br>*(long counter)*                                                            |  Total number of calls in general queue which were served from the tail of the queue
general dropped calls<br>**hbase.ipc.general.dropped.calls** <br>*(long counter)*                                                      |  Total number of calls in general queue which were dropped by CoDel RPC executor
insecure auth fallbacks<br>**hbase.ipc.authentication.fallbacks** <br>*(long counter)*                                                 |  Number of fallbacks to insecure authentication
ipc request exceptions<br>**hbase.ipc.exceptions** <br>*(long counter)*                                                                |  Exceptions caused by requests
sanity check exceptions<br>**hbase.ipc.exceptions.failed.sanity.check** <br>*(long counter)*                                           |  Number of requests that resulted in FailedSanityCheckException
region busy exceptions<br>**hbase.ipc.exceptions.region.too.busy** <br>*(long counter)*                                                |  Number of requests that resulted in RegionTooBusyException
scanner reset exceptions<br>**hbase.ipc.exceptions.scanner.reset** <br>*(long counter)*                                                |  Number of requests that resulted in ScannerResetException
full queue exceptions<br>**hbase.ipc.exceptions.call.queue.too.big** <br>*(long counter)*                                              |  Call queue is full
not serving region exceptions<br>**hbase.ipc.exceptions.not.serving.region** <br>*(long counter)*                                      |  Number of requests that resulted in NotServingRegionException
order scanner next exceptions<br>**hbase.ipc.exceptions.out.of.order.scanner.next** <br>*(long counter)*                               |  Number of requests that resulted in OutOfOrderScannerNextException
unknown scanner exceptions<br>**hbase.ipc.exceptions.unknown.scanner** <br>*(long counter)*                                            |  Number of requests that resulted in UnknownScannerException
large response exceptions<br>**hbase.ipc.exceptions.multi.response.too.large** <br>*(long counter)*                                    |  A response to a multi request was too large and the rest of the requests will have to be retried
region moved exceptions<br>**hbase.ipc.exceptions.region.moved** <br>*(long counter)*                                                  |  Number of requests that resulted in RegionMovedException
ipc requests<br>**hbase.ipc.requests** <br>*(long counter)*                                                                            |  Number of requests
ipc request min size<br>**hbase.ipc.request.size.min** <br>*(long gauge)* *(bytes)*                                                    |  Min Request size
ipc request max size<br>**hbase.ipc.request.size.max** <br>*(long gauge)* *(bytes)*                                                    |  Max Request size
ipc requests size<br>**hbase.ipc.requests.size** <br>*(long counter)* *(bytes)*                                                        |  Requests size
ipc responses<br>**hbase.ipc.responses** <br>*(long counter)*                                                                          |  Number of responses
ipc response min size<br>**hbase.ipc.response.size.min** <br>*(long gauge)* *(bytes)*                                                  |  Min Response size
ipc response max size<br>**hbase.ipc.response.size.max** <br>*(long gauge)* *(bytes)*                                                  |  Max Response size
ipc responses size<br>**hbase.ipc.responses.size** <br>*(long counter)* *(bytes)*                                                      |  Responses size
ipc total calls<br>**hbase.ipc.total.calls** <br>*(long counter)*                                                                      |  Total calls
ipc total call min time<br>**hbase.ipc.total.call.time.min** <br>*(long gauge)* *(ms)*                                                 |  Total call min time including both queued and processing time
ipc total call max time<br>**hbase.ipc.total.call.time.max** <br>*(long gauge)* *(ms)*                                                 |  Total call max time including both queued and processing time
ipc total calls time<br>**hbase.ipc.total.calls.time** <br>*(long counter)* *(ms)*                                                     |  Total calls time including both queued and processing time
ipc queue size<br>**hbase.ipc.queue.bytes** <br>*(long gauge)* *(bytes)*                                                               |  Number of bytes in the call queues; request has been read and parsed and is waiting to run or is currently being executed
ipc general queue calls<br>**hbase.ipc.queue.size** <br>*(long gauge)*                                                                 |  Number of calls in the general call queue; parsed requests waiting in scheduler to be executed
ipc replication queue calls<br>**hbase.ipc.queue.replication.size** <br>*(long gauge)*                                                 |  Number of calls in the replication call queue waiting to be run
ipc priority queue calls<br>**hbase.ipc.queue.priority.size** <br>*(long gauge)*                                                       |  Number of calls in the priority call queue waiting to be run
ipc open connections<br>**hbase.ipc.connections.open** <br>*(long gauge)*                                                              |  Number of open connections
ipc active handlers<br>**hbase.ipc.handlers.active** <br>*(long gauge)*                                                                |  Total number of active rpc handlers
ipc queue calls<br>**hbase.ipc.queue.calls** <br>*(long counter)*                                                                      |  Queue Calls
ipc queue call min time<br>**hbase.ipc.queue.call.time.min** <br>*(long gauge)* *(ms)*                                                 |  Queue Call Min Time
ipc queue call max time<br>**hbase.ipc.queue.call.time.max** <br>*(long gauge)* *(ms)*                                                 |  Queue Call Max Time
ipc authentication failures<br>**hbase.ipc.authentication.failures** <br>*(long counter)*                                              |  Number of authentication failures
ipc authorization failures<br>**hbase.ipc.authorization.failures** <br>*(long counter)*                                                |  Number of authorization failures
ipc authentication successes<br>**hbase.ipc.authentication.successes** <br>*(long counter)*                                            |  Number of authentication successes
ipc authorization successes<br>**hbase.ipc.authorization.successes** <br>*(long counter)*                                              |  Number of authorization successes
ipc processing calls<br>**hbase.ipc.process.calls** <br>*(long counter)*                                                               |  Processing calls
ipc processing call min time<br>**hbase.ipc.process.call.time.min** <br>*(long gauge)* *(ms)*                                          |  Processing call min time
ipc processing call max time<br>**hbase.ipc.process.call.time.max** <br>*(long gauge)* *(ms)*                                          |  Processing call max time
ipc sent bytes<br>**hbase.ipc.bytes.sent** <br>*(long counter)* *(bytes)*                                                              |  Number of bytes sent
ipc received bytes<br>**hbase.ipc.bytes.received** <br>*(long counter)* *(bytes)*                                                      |  Number of bytes received
ipc processing calls time<br>**hbase.ipc.process.calls.time** <br>*(long counter)* *(ms)*                                              |  Processing call time
ipc queue calls time<br>**hbase.ipc.queue.calls.time** <br>*(long counter)* *(ms)*                                                     |  Queue Call Time
new threads<br>**jvm.threads.new** <br>*(long gauge)*                                                                                  |  Current number of NEW threads
runnable threads<br>**jvm.threads.runnable** <br>*(long gauge)*                                                                        |  Current number of RUNNABLE threads
blocked threads<br>**jvm.threads.blocked** <br>*(long gauge)*                                                                          |  Current number of BLOCKED threads
waiting threads<br>**jvm.threads.waiting** <br>*(long gauge)*                                                                          |  Current number of WAITING threads
timed waiting threads<br>**jvm.threads.waiting.timed** <br>*(long gauge)*                                                              |  Current number of TIMED_WAITING threads
terminated threads<br>**jvm.threads.terminated** <br>*(long gauge)*                                                                    |  Current number of TERMINATED threads
fatal logs<br>**jvm.log.fatal** <br>*(long counter)*                                                                                   |  Total number of FATAL logs
error logs<br>**jvm.log.error** <br>*(long counter)*                                                                                   |  Total number of ERROR logs
warn logs<br>**jvm.log.warn** <br>*(long counter)*                                                                                     |  Total number of WARN logs
info logs<br>**jvm.log.info** <br>*(long counter)*                                                                                     |  Total number of INFO logs
non-heap memory used<br>**jvm.nonheap.used** <br>*(long gauge)* *(bytes)*                                                              |  Current non-heap memory used
non-heap memory committed<br>**jvm.nonheap.committed** <br>*(long gauge)* *(bytes)*                                                    |  Current non-heap memory committed
max non-heap memory<br>**jvm.nonheap.size.max** <br>*(long gauge)* *(bytes)*                                                           |  Max non-heap memory size
heap memory<br>**jvm.heap.used** <br>*(long gauge)* *(bytes)*                                                                          |  Current heap memory used
heap memory commited<br>**jvm.heap.committed** <br>*(long gauge)* *(bytes)*                                                            |  Current heap memory committed
max heap memory<br>**jvm.heap.size.max** <br>*(long gauge)* *(bytes)*                                                                  |  Max heap memory size
max memory size<br>**jvm.memory.size.max** <br>*(long gauge)* *(bytes)*                                                                |  Max memory size
successful logins<br>**hbase.ugi.login.success** <br>*(long counter)*                                                                  |  Successful kerberos logins
failed logins<br>**hbase.ugi.login.failure** <br>*(long counter)*                                                                      |  Failed kerberos logins
group resolutions<br>**hbase.ugi.groups.gets** <br>*(long counter)*                                                                    |  Total number of group resolutions
failed logins latency<br>**hbase.ugi.login.failure.time** <br>*(long counter)* *(ms)*                                                  |  Failed kerberos logins latency
successful logins latency<br>**hbase.ugi.login.success.time** <br>*(long counter)* *(ms)*                                              |  Successful kerberos logins latency
group resolutions time<br>**hbase.ugi.groups.gets.time** <br>*(long counter)* *(ms)*                                                   |  Time for group resolution
oldest regions in transition<br>**hbase.master.rit.oldest** <br>*(long gauge)* *(ms)*                                                  |  Timestamp of the oldest Region In Transition
total duration regions in transition<br>**hbase.master.rit.duration** <br>*(double counter)* *(ms)*                                    |  Total durations in milliseconds for all Regions in Transition
regions in transition<br>**hbase.master.rit.count** <br>*(long gauge)*                                                                 |  Current number of Regions In Transition
regions in transition long time<br>**hbase.master.rit.count.overthreshold** <br>*(long gauge)*                                         |  Current number of Regions In Transition over threshold time
bulk assigns<br>**hbase.master.assigns.bulk** <br>*(long counter)*                                                                     |  Number of bulk assign operations
bulk assign min time<br>**hbase.master.assigns.bulk.time.min** <br>*(long gauge)* *(ms)*                                               |  Min time for bulk assign operation
bulk assign max time<br>**hbase.master.assigns.bulk.time.max** <br>*(long gauge)* *(ms)*                                               |  Max time for bulk assign operation
master assigns<br>**hbase.master.assigns** <br>*(long counter)*                                                                        |  Number of assign operations
assign min time<br>**hbase.master.assigns.time.min** <br>*(long gauge)* *(ms)*                                                         |  Min time for assign operation
assign max time<br>**hbase.master.assigns.time.max** <br>*(long gauge)* *(ms)*                                                         |  Max time for assign operation
bulk assigns time<br>**hbase.master.assigns.bulk.time** <br>*(double counter)* *(ms)*                                                  |  Time for bulk assign operations
assigns time<br>**hbase.master.assigns.time** <br>*(double counter)* *(ms)*                                                            |  Time for assign operations
balancer ops<br>**hbase.master.balancer.ops** <br>*(long counter)*                                                                     |  Balancer invocations
balance min time<br>**hbase.master.balancer.time.min** <br>*(long gauge)* *(ms)*                                                       |  Min time for balance operation
balance max time<br>**hbase.master.balancer.time.max** <br>*(long gauge)* *(ms)*                                                       |  Max time for balance operation
balancer misc invocations<br>**hbase.master.balancer.misc.invocations** <br>*(long counter)*                                           |  Balancer misc invocations
balances time<br>**hbase.master.balancer.time** <br>*(long counter)* *(ms)*                                                            |  Time for balance operations
wal splits<br>**hbase.master.hlog.splits** <br>*(long counter)*                                                                        |  Number of WAL files splits
wal split min time<br>**hbase.master.hlog.split.time.min** <br>*(long gauge)* *(ms)*                                                   |  Min time it takes to finish WAL.splitLog()
wal split max time<br>**hbase.master.hlog.split.time.max** <br>*(long gauge)* *(ms)*                                                   |  Max time it takes to finish WAL.splitLog()
meta wal splits<br>**hbase.master.hlog.meta.splits** <br>*(long counter)*                                                              |  Meta WAL files splits
meta wal split min time<br>**hbase.master.hlog.meta.split.time.min** <br>*(long gauge)* *(ms)*                                         |  Min time it takes to finish splitMetaLog()
meta wal split max time<br>**hbase.master.hlog.meta.split.time.max** <br>*(long gauge)* *(ms)*                                         |  Max time it takes to finish splitMetaLog()
meta wal split min size<br>**hbase.master.hlog.meta.split.size.min** <br>*(long gauge)* *(bytes)*                                      |  Min size of hbase:meta WAL files being split
meta wal split max size<br>**hbase.master.hlog.meta.split.size.max** <br>*(long gauge)* *(bytes)*                                      |  Max size of hbase:meta WAL files being split
wal split min size<br>**hbase.master.hlog.split.size.min** <br>*(long gauge)* *(bytes)*                                                |  Min size of WAL files being split
wal split max size<br>**hbase.master.hlog.split.size.max** <br>*(long gauge)* *(bytes)*                                                |  Max size of WAL files being split
meta wal splits size<br>**hbase.master.hlog.meta.splits.size** <br>*(long counter)* *(bytes)*                                          |  Size of hbase:meta WAL files being split
meta wal splits time<br>**hbase.master.hlog.meta.splits.time** <br>*(long counter)* *(ms)*                                             |  Time it takes to finish splitMetaLog()
wal splits time<br>**hbase.master.hlog.splits.time** <br>*(long counter)* *(ms)*                                                       |  Time it takes to finish WAL.splitLog()
wal splits size<br>**hbase.master.hlog.splits.size** <br>*(long counter)* *(bytes)*                                                    |  Size of WAL files being split
plan splits<br>**hbase.master.plan.splits** <br>*(long gauge)*                                                                         |  Number of Region Split Plans executed
plan merges<br>**hbase.master.plan.merges** <br>*(long gauge)*                                                                         |  Number of Region Merge Plans executed
region servers<br>**hbase.master.servers.region** <br>*(long gauge)*                                                                   |  Number of RegionServers
dead region servers<br>**hbase.master.servers.region.dead** <br>*(long gauge)*                                                         |  Number of dead RegionServers
requests<br>**hbase.master.requests** <br>*(long counter)*                                                                             |  Number of cluster requests
average load<br>**hbase.master.load** <br>*(double gauge)*                                                                             |  Average Load
snapshots restores<br>**hbase.master.snapshots.restores** <br>*(long counter)*                                                         |  Number of restoreSnapshot() calls
snapshot restore min time<br>**hbase.master.snapshots.restore.time.min** <br>*(long gauge)* *(ms)*                                     |  Min time it takes to finish restoreSnapshot() call
snapshot restore max time<br>**hbase.master.snapshots.restore.time.max** <br>*(long gauge)* *(ms)*                                     |  Max time it takes to finish restoreSnapshot() call
snapshots clones<br>**hbase.master.snapshots.clones** <br>*(long counter)*                                                             |  Number of cloneSnapshot() calls
snapshots clone min time<br>**hbase.master.snapshots.clone.time.min** <br>*(long gauge)* *(ms)*                                        |  Min time it takes to finish cloneSnapshot() call
snapshots clone max time<br>**hbase.master.snapshots.clone.time.max** <br>*(long gauge)* *(ms)*                                        |  Max time it takes to finish cloneSnapshot() call
snapshots<br>**hbase.master.snapshots** <br>*(long counter)*                                                                           |  Number of snapshot() calls
snapshot min time<br>**hbase.master.snapshot.time.min** <br>*(long gauge)* *(ms)*                                                      |  Max time it takes to finish snapshot() call
snapshot max time<br>**hbase.master.snapshot.time.max** <br>*(long gauge)* *(ms)*                                                      |  Max time it takes to finish snapshot() call
snapshots restores time<br>**hbase.master.snapshots.restores.time** <br>*(double counter)* *(ms)*                                      |  Time it takes to finish restoreSnapshot() calls
snapshots clones time<br>**hbase.master.snapshots.clones.time** <br>*(double counter)* *(ms)*                                          |  Time it takes to finish cloneSnapshot() calls
snapshots time<br>**hbase.master.snapshots.time** <br>*(double counter)* *(ms)*                                                        |  Time it takes to finish snapshot() calls
completed logs<br>**hbase.rs.replication.completed.logs** <br>*(long gauge)*                                                           |  Source completed logs
repeated log files size<br>**hbase.rs.replication.repeated.log.file.size** <br>*(long gauge)* *(bytes)*                                |  Source repeated log files size
restarted load readings<br>**hbase.rs.replication.restarted.log.reads** <br>*(long gauge)*                                             |  Source restarted load readings
closed logs<br>**hbase.rs.replication.closed.logs.with.unknown.file.length** <br>*(long gauge)*                                        |  Source closed logs with unknows file length
uncleanly closed logs<br>**hbase.rs.replication.uncleanly.closed.logs** <br>*(long gauge)*                                             |  Source uncleanly closed logs
ignored uncleanly closed logs size<br>**hbase.rs.replication.ignored.uncleanly.closed.log.content.size** <br>*(long gauge)* *(bytes)*  |  Source ignored uncleanly closed logs content size
log queue<br>**hbase.rs.replication.log.queue** <br>*(long gauge)*                                                                     |  Source log queue
log edits read<br>**hbase.rs.replication.log.edits.read** <br>*(long counter)*                                                         |  Source log edits read
log edits filtered<br>**hbase.rs.replication.log.edits.filtered** <br>*(long counter)*                                                 |  Source log edits filtered
shipped batches<br>**hbase.rs.replication.batches.shipped** <br>*(long counter)*                                                       |  Source shipped batches
shipped operations<br>**hbase.rs.replication.ops.shipped** <br>*(long counter)*                                                        |  Source shipped operations
shipped size<br>**hbase.rs.replication.batches.shipped.size** <br>*(long counter)* *(bytes)*                                           |  Source shipped size
log read size<br>**hbase.rs.replication.log.edits.read.bytes** <br>*(long counter)* *(bytes)*                                          |  Source log read size
rs tables<br>**hbase.rs.tables** <br>*(long gauge)*                                                                                    |  Number of tables in the metrics system
rs read requests<br>**hbase.rs.table.read.requests** <br>*(long counter)*                                                              |  Number of read requests
rs write requests<br>**hbase.rs.table.write.requests** <br>*(long counter)*                                                            |  Number of write requests
rs memstore size<br>**hbase.rs.table.memstore.size** <br>*(long gauge)* *(bytes)*                                                      |  The size of memory stores
rs store files size<br>**hbase.rs.table.store.files.size** <br>*(long gauge)* *(bytes)*                                                |  The size of store files size
rs table size<br>**hbase.rs.table.size** <br>*(long gauge)* *(bytes)*                                                                  |  Total size of the table in the region server
compacted in size<br>**hbase.rs.compacted.in.size** <br>*(long counter)* *(bytes)*                                                     |  Total number of bytes that is read for compaction both major and minor
major compacted out size<br>**hbase.rs.major.compacted.out.bytes** <br>*(long counter)*                                                |
flushed memstore size<br>**hbase.rs.flushed.memostore.size** <br>*(long counter)* *(bytes)*                                            |  Total number of bytes of cells in memstore from flush
compacted out size<br>**hbase.rs.compacted.out.size** <br>*(long counter)* *(bytes)*                                                   |  Total number of bytes that is output from compaction major only
splits requests<br>**hbase.rs.split.requests** <br>*(long counter)*                                                                    |  Number of splits requested
flushed out size<br>**hbase.rs.flushed.out.size** <br>*(long counter)* *(bytes)*                                                       |  Total number of bytes written from flush
cache failed insertions<br>**hbase.rs.cache.block.failed.insertions** <br>*(long counter)*                                             |  Number of times that a block cache insertion failed. Usually due to size restrictions
cache hits rate<br>**hbase.rs.cache.block.hits.rate** <br>*(double gauge)*                                                             |  Percent of block cache requests that are hits
cache primary evictions<br>**hbase.rs.cache.block.primary.evictions** <br>*(long counter)*                                             |  Count of the number of blocks evicted from primary replica in the block cache
cache primary misses<br>**hbase.rs.cache.block.primary.misses** <br>*(long counter)*                                                   |  Number of requests for a block of primary replica that missed the block cache
cache primary hits<br>**hbase.rs.cache.block.primary.hits** <br>*(long counter)*                                                       |  Count of hit on primary replica in the block cache
large compaction queue<br>**hbase.rs.large.compaction.queue** <br>*(long gauge)*                                                       |  Length of the queue for compactions with input size larger than throttle threshold (2.5GB by default)
small compactions queue<br>**hbase.rs.small.compactions.queue** <br>*(long gauge)*                                                     |  Length of the queue for compactions
splits queue<br>**hbase.rs.splits.queue** <br>*(long gauge)*                                                                           |  Length of the queue for splits
secondary regions local files rate<br>**hbase.rs.files.local.rate.secondary.regions** <br>*(double gauge)*                             |  The percent of HFiles used by secondary regions that are stored on the local hdfs data node
rpc mutation requests<br>**hbase.rs.rpc.mutate.requests** <br>*(long counter)*                                                         |  Number of rpc mutation requests this RegionServer has answered
rpc multi requests<br>**hbase.rs.rpc.multi.requests** <br>*(long counter)*                                                             |  Number of rpc multi requests this RegionServer has answered
rpc scan requests<br>**hbase.rs.rpc.scan.requests** <br>*(long counter)*                                                               |  Number of rpc scan requests this RegionServer has answered
rpc get requests<br>**hbase.rs.rpc.get.requests** <br>*(long counter)*                                                                 |  Number of rpc get requests this RegionServer has answered
avg rs region size<br>**hbase.rs.region.size.avg** <br>*(long gauge)* *(bytes)*                                                        |  Average region size over the RegionServer including memstore and storefile sizes
reference files<br>**hbase.rs.reference.files** <br>*(long gauge)*                                                                     |  Number of reference file on this RegionServer
blocked requests<br>**hbase.rs.blocked.requests** <br>*(long counter)*                                                                 |  The number of blocked requests because of memstore size is larger than blockingMemStoreSize
cache trailer hits<br>**hbase.rs.cache.block.trailer.hits** <br>*(long counter)*                                                       |  Block cache trailer hits
cache delete family bloom hits<br>**hbase.rs.cache.block.delete.family.bloom.hits** <br>*(long counter)*                               |  Block cache delete family bloom hits
cache general bloom meta hits<br>**hbase.rs.cache.block.general.bloom.meta.hits** <br>*(long counter)*                                 |  Block cache general bloom meta hits
cache file info hits<br>**hbase.rs.cache.block.file.info.hits** <br>*(long counter)*                                                   |  Block cache file info hits
cache intermediate index hits<br>**hbase.rs.cache.block.intermediate.index.hits** <br>*(long counter)*                                 |  Block cache intermediate index hits
cache root index hits<br>**hbase.rs.cache.block.root.index.hits** <br>*(long counter)*                                                 |  Block cache root index hits
cache meta hits<br>**hbase.rs.cache.block.meta.hits** <br>*(long counter)*                                                             |  Block cache meta hits
cache bloom chunk hits<br>**hbase.rs.cache.block.bloom.chunk.hits** <br>*(long counter)*                                               |  Block cache bloom chunk hits count
cache leaf index hits<br>**hbase.rs.cache.block.leaf.index.hits** <br>*(long counter)*                                                 |  Block cache leaf index hits
cache data hits<br>**hbase.rs.cache.block.data.hits** <br>*(long counter)*                                                             |  Block cache data hits
cache trailer misses<br>**hbase.rs.cache.block.trailer.misses** <br>*(long counter)*                                                   |  Block cache trailer misses
cache delete family bloom misses<br>**hbase.rs.cache.block.delete.family.bloom.misses** <br>*(long counter)*                           |  Block cache delete family bloom misses
cache general bloom meta misses<br>**hbase.rs.cache.block.general.bloom.meta.misses** <br>*(long counter)*                             |  Block cache general bloom meta misses
cache file info misses<br>**hbase.rs.cache.block.file.info.misses** <br>*(long counter)*                                               |  Block cache file info misses
cache intermediate index misses<br>**hbase.rs.cache.block.intermediate.index.misses** <br>*(long counter)*                             |  Block cache intermediate index misses
cache root index misses<br>**hbase.rs.cache.block.root.index.misses** <br>*(long counter)*                                             |  Block cache root index misses
cache meta misses<br>**hbase.rs.cache.block.meta.misses** <br>*(long counter)*                                                         |  Block cache meta misses
cache bloom chunk misses<br>**hbase.rs.cache.block.bloom.chunk.misses** <br>*(long counter)*                                           |  Block cache bloom chunk misses count
cache leaf index misses<br>**hbase.rs.cache.block.leaf.index.misses** <br>*(long counter)*                                             |  Block cache leaf index misses
cache data misses<br>**hbase.rs.cache.block.data.misses** <br>*(long counter)*                                                         |  Block cache data misses
success splits<br>**hbase.rs.success.splits** <br>*(long counter)*                                                                     |  Number of successfully executed splits
rs regions<br>**hbase.rs.regions** <br>*(long gauge)*                                                                                  |  Number of regions
rs stores<br>**hbase.rs.stores** <br>*(long gauge)*                                                                                    |  Number of Stores
hlog files<br>**hbase.rs.files.hlog** <br>*(long gauge)*                                                                               |  Number of WAL Files
hlog files size<br>**hbase.rs.files.hlog.size** <br>*(long gauge)* *(bytes)*                                                           |  Size of all WAL Files
stores files<br>**hbase.rs.stores.files** <br>*(long gauge)*                                                                           |  Number of Store Files
memstore size<br>**hbase.rs.memstore.size** <br>*(long gauge)* *(bytes)*                                                               |  Size of the memstore
stores files size<br>**hbase.rs.stores.files.size** <br>*(long gauge)* *(bytes)*                                                       |  Size of storefiles being served
total requests<br>**hbase.rs.total.requests** <br>*(long counter)*                                                                     |  Total number of requests this RegionServer has answered; increments the count once for EVERY access whether an admin operation
rs read requests<br>**hbase.rs.requests.read** <br>*(long counter)*                                                                    |  Number of read requests with non-empty Results that this RegionServer has answered
rs write requests<br>**hbase.rs.requests.write** <br>*(long counter)*                                                                  |  Number of mutation requests this RegionServer has answered
failed mutates<br>**hbase.rs.ops.mutates.failed** <br>*(long counter)*                                                                 |  Number of Check and Mutate calls that failed the checks
passed mutates<br>**hbase.rs.ops.mutates.passed** <br>*(long counter)*                                                                 |  Number of Check and Mutate calls that passed the checks
store files indexes size<br>**hbase.rs.stores.index.size** <br>*(long gauge)* *(bytes)*                                                |  Size of indexes in storefiles on disk
static indices size<br>**hbase.rs.static.index.size** <br>*(long gauge)* *(bytes)*                                                     |  Uncompressed size of the static indices
static bloom filters size<br>**hbase.rs.static.bloom.size** <br>*(long gauge)* *(bytes)*                                               |  Uncompressed size of the static bloom filters
mutations without wal<br>**hbase.rs.ops.mutates.nowal** <br>*(long counter)*                                                           |  Number of mutations that have been sent by clients with the write ahead logging turned off
mutations size without wal<br>**hbase.rs.ops.mutates.nowal.size** <br>*(long counter)* *(bytes)*                                       |  Size of data that has been sent by clients with the write ahead logging turned off
local files rate<br>**hbase.rs.files.local.rate** <br>*(long gauge)*                                                                   |  The percent of HFiles that are stored on the local hdfs data node
compaction queue<br>**hbase.rs.compaction.queue** <br>*(long gauge)*                                                                   |  Length of the queue for compactions
flush queue<br>**hbase.rs.flush.queue** <br>*(long gauge)*                                                                             |  Length of the queue for region flushes
rs cache free size<br>**hbase.rs.cache.block.free.size** <br>*(long gauge)* *(bytes)*                                                  |
cache blocks<br>**hbase.rs.cache.block.count** <br>*(long gauge)*                                                                      |  Number of block in the block cache
rs cache size<br>**hbase.rs.cache.block.size** <br>*(long gauge)* *(bytes)*                                                            |  Size of the block cache
rs cache hits<br>**hbase.rs.cache.block.hits** <br>*(long counter)*                                                                    |  Count of the hit on the block cache
rs cache misses<br>**hbase.rs.cache.block.misses** <br>*(long counter)*                                                                |  Number of requests for a block that missed the block cache
rs cache evictions<br>**hbase.rs.cache.block.evictions** <br>*(long counter)*                                                          |  Count of the number of blocks evicted from the block cache (Not including blocks evicted because of HFile removal)
rs cache express hits rate<br>**hbase.rs.cache.block.hits.express.rate** <br>*(long gauge)*                                            |  The percent of the time that requests with the cache turned on hit the cache
blocked updates<br>**hbase.rs.updates.blocked.time** <br>*(long counter)*                                                              |  Number of MS updates have been blocked so that the memstore can be flushed
flushed cells<br>**hbase.rs.flushed.cells** <br>*(long counter)*                                                                       |  The number of cells flushed to disk
compaction cells<br>**hbase.rs.compaction.cells** <br>*(long counter)*                                                                 |  The number of cells processed during minor compactions
major compaction cells<br>**hbase.rs.compaction.major.cells** <br>*(long counter)*                                                     |  The number of cells processed during major compactions
flushed cells size<br>**hbase.rs.flushed.cells.size** <br>*(long counter)* *(bytes)*                                                   |  The total amount of mob cells flushed to disk
compaction cells size<br>**hbase.rs.compaction.cells.size** <br>*(long counter)* *(bytes)*                                             |  The total amount of data processed during major compactions
major compaction cells size<br>**hbase.rs.compaction.major.cells.size** <br>*(long counter)* *(bytes)*                                 |  The total amount of data processed during major compactions
hedged reads<br>**hbase.rs.reads.hedged** <br>*(long counter)*                                                                         |  The number of times we started a hedged read
hedged reads wins<br>**hbase.rs.reads.hedged.wins** <br>*(long counter)*                                                               |  The number of times we started a hedged read and a hedged read won
mob cached files<br>**hbase.rs.mob.cache.files** <br>*(long gauge)*                                                                    |  The count of cached mob files
mob cache files accesses<br>**hbase.rs.mob.cache.files.accesses** <br>*(long counter)*                                                 |  The count of accesses to the mob file cache
mob cache files misses<br>**hbase.rs.mob.cache.files.misses** <br>*(long counter)*                                                     |  The count of misses to the mob file cache
mob cache files evictions<br>**hbase.rs.mob.cache.files.evictions** <br>*(long counter)*                                               |  The number of items evicted from the mob file cache
mob flushes<br>**hbase.rs.mob.flushes** <br>*(long counter)*                                                                           |  The number of the flushes in mob-enabled stores
flushed cells<br>**hbase.rs.mob.flushed.cells** <br>*(long counter)*                                                                   |  The number of mob cells flushed to disk
mob flushed cells size<br>**hbase.rs.mob.flushed.cells.size** <br>*(long counter)* *(bytes)*                                           |  The total amount of mob cells flushed to disk
scanned cells<br>**hbase.rs.mob.scan.cells** <br>*(long counter)*                                                                      |  The number of scanned mob cells
scanned cells size<br>**hbase.rs.mob.scan.cells.size** <br>*(long counter)* *(bytes)*                                                  |  The total amount of scanned mob cells
mob cache files hits rate<br>**hbase.rs.mob.cache.files.hits.rate** <br>*(long gauge)*                                                 |  The hit percent to the mob file cache
rs appends<br>**hbase.rs.ops.appends** <br>*(long counter)*                                                                            |  The number of batches containing puts
rs deletes<br>**hbase.rs.ops.deletes** <br>*(long counter)*                                                                            |  The number of batches containing delete(s)
rs mutates<br>**hbase.rs.ops.mutates** <br>*(long counter)*                                                                            |  The number of Mutates
rs gets<br>**hbase.rs.ops.gets** <br>*(long counter)*                                                                                  |  The number of Gets
rs replays<br>**hbase.rs.ops.replays** <br>*(long counter)*                                                                            |  The numbers of Replays
rs increments<br>**hbase.rs.ops.increments** <br>*(long counter)*                                                                      |  The number of Increments
rs slow appends<br>**hbase.rs.ops.appends.slow** <br>*(long counter)*                                                                  |  The number of batches containing puts that took over 1000ms to complete
rs slow deletes<br>**hbase.rs.ops.deletes.slow** <br>*(long counter)*                                                                  |  The number of batches containing delete(s) that took over 1000ms to complete
rs slow increments<br>**hbase.rs.ops.increments.slow** <br>*(long counter)*                                                            |  The number of Increments that took over 1000ms to complete
rs slow gets<br>**hbase.rs.ops.gets.slow** <br>*(long counter)*                                                                        |  The number of Gets that took over 1000ms to complete
rs slow puts<br>**hbase.rs.ops.puts.slow** <br>*(long counter)*                                                                        |  The number of batches containing puts that took over 1000ms to complete
rs scan min size<br>**hbase.rs.ops.scan.size.min** <br>*(long gauge)* *(bytes)*                                                        |  Min scan size
rs scan max size<br>**hbase.rs.ops.scan.size.max** <br>*(long gauge)* *(bytes)*                                                        |  Max scan size
rs flushes<br>**hbase.rs.ops.flushes** <br>*(long counter)*                                                                            |  Number of flushes
rs flush output min size<br>**hbase.rs.ops.flushes.out.size.min** <br>*(long gauge)* *(bytes)*                                         |  Min number of bytes in the resulting file for a flush
rs flush output max size<br>**hbase.rs.ops.flushes.out.size.max** <br>*(long gauge)* *(bytes)*                                         |  Max number of bytes in the resulting file for a flush
rs compaction input min size<br>**hbase.rs.ops.major.compaction.in.size.min** <br>*(long gauge)* *(bytes)*                             |  Compaction min total input file sizes major only
rs compaction input max size<br>**hbase.rs.ops.major.compaction.in.size.max** <br>*(long gauge)* *(bytes)*                             |  Compaction max total input file sizes major only
rs compactions<br>**hbase.rs.ops.compactions** <br>*(long counter)* *(bytes)*                                                          |  Compactions both major and minor
rs compactions input min size<br>**hbase.rs.ops.compactions.in.size.min** <br>*(long gauge)* *(bytes)*                                 |  Min compaction total input file sizes both major and minor
rs compactions input max size<br>**hbase.rs.ops.compactions.in.size.max** <br>*(long gauge)* *(bytes)*                                 |  Max compaction total input file sizes both major and minor
rs flush min time<br>**hbase.rs.ops.flushes.time.min** <br>*(long gauge)* *(ms)*                                                       |  Min time for memstore flush
rs flush max time<br>**hbase.rs.ops.flushes.time.max** <br>*(long gauge)* *(ms)*                                                       |  Max time for memstore flush
rs compactions output min size<br>**hbase.rs.ops.compactions.out.size.min** <br>*(long gauge)* *(bytes)*                               |  Min compaction total output file sizes
rs compactions output max size<br>**hbase.rs.ops.compactions.out.size.max** <br>*(long gauge)* *(bytes)*                               |  Max compaction total output file sizes both major and minor
rs splits<br>**hbase.rs.ops.splits** <br>*(long counter)*                                                                              |  The number of Splits
rs split min time<br>**hbase.rs.ops.split.time.min** <br>*(long gauge)* *(ms)*                                                         |  Min split time
rs split max time<br>**hbase.rs.ops.split.time.max** <br>*(long gauge)* *(ms)*                                                         |  Max split time
rs flush memstore min size<br>**hbase.rs.ops.flushes.memstore.size.min** <br>*(long gauge)* *(bytes)*                                  |  Min number of bytes in the memstore for a flush
rs flush memstore max size<br>**hbase.rs.ops.flushes.memstore.size.max** <br>*(long gauge)* *(bytes)*                                  |  Max number of bytes in the memstore for a flush
rs scans<br>**hbase.rs.ops.scans** <br>*(long counter)*                                                                                |  The number of Scans
rs scan min time<br>**hbase.rs.ops.scan.time.min** <br>*(long gauge)* *(ms)*                                                           |  Min scan time
rs scan max time<br>**hbase.rs.ops.scan.time.max** <br>*(long gauge)* *(ms)*                                                           |  Max scan time
rs major compactions<br>**hbase.rs.ops.major.compactions** <br>*(long counter)*                                                        |  Compactions major only
rs major compaction min time<br>**hbase.rs.ops.major.compaction.time.min** <br>*(long gauge)* *(ms)*                                   |  Min time for compaction major only
rs major compaction max time<br>**hbase.rs.ops.major.compaction.time.max** <br>*(long gauge)* *(ms)*                                   |  Max time for compaction major only
rs major compactions time<br>**hbase.rs.ops.major.compactions.time** <br>*(long counter)* *(ms)*                                       |  Time for compactions  major only
rs scans time<br>**hbase.rs.ops.scans.time** <br>*(long counter)* *(ms)*                                                               |  Scans time
rs flushes memstore size<br>**hbase.rs.ops.flushes.memstore.size** <br>*(long counter)* *(bytes)*                                      |  Number of bytes in the memstore for a flushes
rs major compactions input files<br>**hbase.rs.ops.major.compactions.in.files** <br>*(long counter)*                                   |  Compactions input number of files major only
rs compactions input files<br>**hbase.rs.ops.compactions.in.files** <br>*(long counter)*                                               |  Compactions input number of files both major and minor
rs splits time<br>**hbase.rs.ops.splits.time** <br>*(long counter)* *(ms)*                                                             |  Splits time
rs compactions output size<br>**hbase.rs.ops.compactions.out.size** <br>*(long counter)* *(bytes)*                                     |  Compaction total output file sizes both major and minor
rs major compactions.output size<br>**hbase.rs.ops.major.compactions.out.size** <br>*(long counter)* *(bytes)*                         |  Compactions total output file sizes major only
rs compactions output files<br>**hbase.rs.ops.compactions.out.files** <br>*(long counter)* *(bytes)*                                   |  Compactions output number of files both major and minor
rs flushes time<br>**hbase.rs.ops.flushes.time** <br>*(long counter)* *(ms)*                                                           |  Time for memstore flushes
rs major compactions output files<br>**hbase.rs.ops.major.compactions.out.files** <br>*(long counter)*                                 |  Compactions output number of files major only
rs compactions input size<br>**hbase.rs.ops.compactions.in.size** <br>*(long counter)* *(bytes)*                                       |  Compactions total input file sizes both major and minor
rs major compactions input size<br>**hbase.rs.ops.major.compactions.in.size** <br>*(long counter)* *(bytes)*                           |  Compactions total input file sizes major only
rs flushes output size<br>**hbase.rs.ops.flushes.out.size** <br>*(long counter)* *(bytes)*                                             |  Number of bytes in the resulting file for a flushes
rs scans size<br>**hbase.rs.ops.scans.size** <br>*(long counter)* *(bytes)*                                                            |  Scans size
wal roll requests<br>**hbase.rs.wal.roll.requests** <br>*(long counter)*                                                               |  How many times a log roll has been requested total
wal written size<br>**hbase.rs.wal.written.size** <br>*(long counter)* *(bytes)*                                                       |  Size of the data written to the WAL
wal low replica roll requests<br>**hbase.rs.wal.low.replica.roll.requests** <br>*(long counter)*                                       |  How many times a log roll was requested due to too few DN's in the write pipeline
wal syncs<br>**hbase.rs.wal.syncs** <br>*(long counter)*                                                                               |  The number of syncs the WAL to HDFS
wal sync min time<br>**hbase.rs.wal.sync.time.min** <br>*(long gauge)* *(ms)*                                                          |  Min time it took to sync the WAL to HDFS
wal sync max time<br>**hbase.rs.wal.sync.time.max** <br>*(long gauge)* *(ms)*                                                          |  Max time it took to sync the WAL to HDFS
wal append min size<br>**hbase.rs.wal.append.size.min** <br>*(long gauge)* *(bytes)*                                                   |  Min size of the data appended to the WAL
wal append max size<br>**hbase.rs.wal.append.size.max** <br>*(long gauge)* *(bytes)*                                                   |  Max size of the data appended to the WAL
wal append min time<br>**hbase.rs.wal.append.time.min** <br>*(long gauge)* *(ms)*                                                      |  Min time an append to the WAL took
wal append max time<br>**hbase.rs.wal.append.time.max** <br>*(long gauge)* *(ms)*                                                      |  Max time an append to the WAL took
wal slow appends<br>**hbase.rs.wal.appends.slow** <br>*(long counter)*                                                                 |  Number of appends that were slow
wal appends<br>**hbase.rs.wal.appends** <br>*(long counter)*                                                                           |  Number of appends to the write ahead log
wal syncs time<br>**hbase.rs.wal.syncs.time** <br>*(long counter)* *(ms)*                                                              |  The time it took to syncs the WAL to HDFS
wal appends size<br>**hbase.rs.wal.appends.size** <br>*(long counter)* *(bytes)*                                                       |  Size of the data appended to the WAL
wal appends time<br>**hbase.rs.wal.appends.time** <br>*(long counter)* *(ms)*                                                          |  Time an appends to the WAL took
applied replication batches<br>**hbase.rs.replication.batches.applied** <br>*(long counter)*                                           |  Applied replication batches
applied replication ops<br>**hbase.rs.replication.ops.applied** <br>*(long counter)*                                                   |  Applied replication ops
applied replication hfiles<br>**hbase.rs.replication.hfiles.applied** <br>*(long counter)*                                             |  Applied replication hfiles



## FAQ

** How do I enable JMX in HBase **

Please see [HBase Metrics](http://hbase.apache.org/metrics.html)
page for
instructions.

** Do I need to add a separate SPM Application for each HBase server/node I want to monitor **

No, one Application is enough. Think of an SPM "Application" as a
"HBase Cluster". Thus, to monitor N HBase servers that belong to the
same cluster you would create just a single SPM Application and use its
Token in SPM configuration file on all HBase servers that are a part of
this cluster.

** Why don't some HBase metrics graphs have any data **

There could be 2 possible reasons:

1.  Some metrics are for RegionServers (HBase slaves), some for HBase
    Master. Thus, if you select the Master node in the UI, graphs that
    contain Slave-specific metrics will be blank and vice-versa.
2.  Different versions of HBase provide different metrics. Thus, if you
    have an older version of HBase, it may not be providing all metrics
    that SPM collects and graphs.

** Which versions of HBase does SPM support **

SPM has been tested with HBase 0.98, but will work for newer versions,
including all CDH versions.
