## Integration

- Instructions: [https://apps.sematext.com/ui/howto/HBase/overview](https://apps.sematext.com/ui/howto/HBase/overview)

## Metrics

Metric Name                           |  Key                                                             |  Metric Type     |  Numeric Type  |  Unit   |  Description
--------------------------------------|------------------------------------------------------------------|------------------|----------------|---------|--------------------------------------------------------------------------------------------------------------------------------
compacted in size                     |  hbase.rs.compacted.in.size                                      |  counter         |  long          |  bytes  |  Total number of bytes that is read for compaction both major and minor
major compacted out size              |  hbase.rs.major.compacted.out.bytes                              |  counter         |  long          |         |
flushed memostore size                |  hbase.rs.flushed.memostore.size                                 |  counter         |  long          |  bytes  |  Total number of bytes of cells in memstore from flush
compacted out size                    |  hbase.rs.compacted.out.size                                     |  counter         |  long          |  bytes  |  Total number of bytes that is output from compaction major only
splits requests                       |  hbase.rs.split.requests                                         |  counter         |  long          |         |  Number of splits requested
flushed out size                      |  hbase.rs.flushed.out.size                                       |  counter         |  long          |  bytes  |  Total number of bytes written from flush
cache failed insertions               |  hbase.rs.cache.block.failed.insertions                          |  counter         |  long          |         |  Number of times that a block cache insertion failed. Usually due to size restrictions
cache hits rate                       |  hbase.rs.cache.block.hits.rate                                  |  gauge           |  double        |         |  Percent of block cache requests that are hits
cache primary evictions               |  hbase.rs.cache.block.primary.evictions                          |  counter         |  long          |         |  Count of the number of blocks evicted from primary replica in the block cache
cache primary misses                  |  hbase.rs.cache.block.primary.misses                             |  counter         |  long          |         |  Number of requests for a block of primary replica that missed the block cache
cache primary hits                    |  hbase.rs.cache.block.primary.hits                               |  counter         |  long          |         |  Count of hit on primary replica in the block cache
large compaction queue                |  hbase.rs.large.compaction.queue                                 |  gauge           |  long          |         |  Length of the queue for compactions with input size larger than throttle threshold (2.5GB by default)
small compactions queue               |  hbase.rs.small.compactions.queue                                |  gauge           |  long          |         |  Length of the queue for compactions
splits queue                          |  hbase.rs.splits.queue                                           |  gauge           |  long          |         |  Length of the queue for splits
secondary regions local files rate    |  hbase.rs.files.local.rate.secondary.regions                     |  gauge           |  double        |         |  The percent of HFiles used by secondary regions that are stored on the local hdfs data node
rpc mutation requests                 |  hbase.rs.rpc.mutate.requests                                    |  counter         |  long          |         |  Number of rpc mutation requests this RegionServer has answered
rpc multi requests                    |  hbase.rs.rpc.multi.requests                                     |  counter         |  long          |         |  Number of rpc multi requests this RegionServer has answered
rpc scan requests                     |  hbase.rs.rpc.scan.requests                                      |  counter         |  long          |         |  Number of rpc scan requests this RegionServer has answered
rpc get requests                      |  hbase.rs.rpc.get.requests                                       |  counter         |  long          |         |  Number of rpc get requests this RegionServer has answered
avg region size                       |  hbase.rs.region.size.avg                                        |  gauge           |  long          |  bytes  |  Average region size over the RegionServer including memstore and storefile sizes
reference files                       |  hbase.rs.reference.files                                        |  gauge           |  long          |         |  Number of reference file on this RegionServer
blocked requests                      |  hbase.rs.blocked.requests                                       |  counter         |  long          |         |  The number of blocked requests because of memstore size is larger than blockingMemStoreSize
cache trailer hits                    |  hbase.rs.cache.block.trailer.hits                               |  counter         |  long          |         |  Block cache trailer hits
cache delete family bloom hits        |  hbase.rs.cache.block.delete.family.bloom.hits                   |  counter         |  long          |         |  Block cache delete family bloom hits
cache general bloom meta hits         |  hbase.rs.cache.block.general.bloom.meta.hits                    |  counter         |  long          |         |  Block cache general bloom meta hits
cache file info hits                  |  hbase.rs.cache.block.file.info.hits                             |  counter         |  long          |         |  Block cache file info hits
cache intermediate index hits         |  hbase.rs.cache.block.intermediate.index.hits                    |  counter         |  long          |         |  Block cache intermediate index hits
cache root index hits                 |  hbase.rs.cache.block.root.index.hits                            |  counter         |  long          |         |  Block cache root index hits
cache meta hits                       |  hbase.rs.cache.block.meta.hits                                  |  counter         |  long          |         |  Block cache meta hits
cache bloom chunk hits                |  hbase.rs.cache.block.bloom.chunk.hits                           |  counter         |  long          |         |  Block cache bloom chunk hits count
cache leaf index hits                 |  hbase.rs.cache.block.leaf.index.hits                            |  counter         |  long          |         |  Block cache leaf index hits
cache data hits                       |  hbase.rs.cache.block.data.hits                                  |  counter         |  long          |         |  Block cache data hits
cache trailer misses                  |  hbase.rs.cache.block.trailer.misses                             |  counter         |  long          |         |  Block cache trailer misses
cache delete family bloom misses      |  hbase.rs.cache.block.delete.family.bloom.misses                 |  counter         |  long          |         |  Block cache delete family bloom misses
cache general bloom meta misses       |  hbase.rs.cache.block.general.bloom.meta.misses                  |  counter         |  long          |         |  Block cache general bloom meta misses
cache file info misses                |  hbase.rs.cache.block.file.info.misses                           |  counter         |  long          |         |  Block cache file info misses
cache intermediate index misses       |  hbase.rs.cache.block.intermediate.index.misses                  |  counter         |  long          |         |  Block cache intermediate index misses
cache root index misses               |  hbase.rs.cache.block.root.index.misses                          |  counter         |  long          |         |  Block cache root index misses
cache meta misses                     |  hbase.rs.cache.block.meta.misses                                |  counter         |  long          |         |  Block cache meta misses
cache bloom chunk misses              |  hbase.rs.cache.block.bloom.chunk.misses                         |  counter         |  long          |         |  Block cache bloom chunk misses count
cache leaf index misses               |  hbase.rs.cache.block.leaf.index.misses                          |  counter         |  long          |         |  Block cache leaf index misses
cache data misses                     |  hbase.rs.cache.block.data.misses                                |  counter         |  long          |         |  Block cache data misses
success splits                        |  hbase.rs.success.splits                                         |  counter         |  long          |         |  Number of successfully executed splits
regions                               |  hbase.rs.regions                                                |  gauge           |  long          |         |  Number of regions
stores                                |  hbase.rs.stores                                                 |  gauge           |  long          |         |  Number of Stores
hlog files                            |  hbase.rs.files.hlog                                             |  gauge           |  long          |         |  Number of WAL Files
hlog files size                       |  hbase.rs.files.hlog.size                                        |  gauge           |  long          |  bytes  |  Size of all WAL Files
stores files                          |  hbase.rs.stores.files                                           |  gauge           |  long          |         |  Number of Store Files
memstore size                         |  hbase.rs.memstore.size                                          |  gauge           |  long          |  bytes  |  Size of the memstore
stores files size                     |  hbase.rs.stores.files.size                                      |  gauge           |  long          |  bytes  |  Size of storefiles being served
total requests                        |  hbase.rs.total.requests                                         |  counter         |  long          |         |  Total number of requests this RegionServer has answered; increments the count once for EVERY access whether an admin operation
read requests                         |  hbase.rs.requests.read                                          |  counter         |  long          |         |  Number of read requests with non-empty Results that this RegionServer has answered
write requests                        |  hbase.rs.requests.write                                         |  counter         |  long          |         |  Number of mutation requests this RegionServer has answered
failed mutates                        |  hbase.rs.ops.mutates.failed                                     |  counter         |  long          |         |  Number of Check and Mutate calls that failed the checks
passed mutates                        |  hbase.rs.ops.mutates.passed                                     |  counter         |  long          |         |  Number of Check and Mutate calls that passed the checks
store files indexes size              |  hbase.rs.stores.index.size                                      |  gauge           |  long          |  bytes  |  Size of indexes in storefiles on disk
static indexes size                   |  hbase.rs.static.index.size                                      |  gauge           |  long          |  bytes  |  Uncompressed size of the static indexes
static bloom filters size             |  hbase.rs.static.bloom.size                                      |  gauge           |  long          |  bytes  |  Uncompressed size of the static bloom filters
mutations without wal                 |  hbase.rs.ops.mutates.nowal                                      |  counter         |  long          |         |  Number of mutations that have been sent by clients with the write ahead logging turned off
mutations size without wal            |  hbase.rs.ops.mutates.nowal.size                                 |  counter         |  long          |  bytes  |  Size of data that has been sent by clients with the write ahead logging turned off
local files rate                      |  hbase.rs.files.local.rate                                       |  gauge           |  long          |         |  The percent of HFiles that are stored on the local hdfs data node
compaction queue                      |  hbase.rs.compaction.queue                                       |  gauge           |  long          |         |  Length of the queue for compactions
flush queue                           |  hbase.rs.flush.queue                                            |  gauge           |  long          |         |  Length of the queue for region flushes
cache free size                       |  hbase.rs.cache.block.free.size                                  |  gauge           |  long          |  bytes  |
cache blocks                          |  hbase.rs.cache.block.count                                      |  gauge           |  long          |         |  Number of block in the block cache
cache size                            |  hbase.rs.cache.block.size                                       |  gauge           |  long          |  bytes  |  Size of the block cache
cache hits                            |  hbase.rs.cache.block.hits                                       |  counter         |  long          |         |  Count of the hit on the block cache
cache misses                          |  hbase.rs.cache.block.misses                                     |  counter         |  long          |         |  Number of requests for a block that missed the block cache
cache evictions                       |  hbase.rs.cache.block.evictions                                  |  counter         |  long          |         |  Count of the number of blocks evicted from the block cache (Not including blocks evicted because of HFile removal)
cache express hits rate               |  hbase.rs.cache.block.hits.express.rate                          |  gauge           |  long          |         |  The percent of the time that requests with the cache turned on hit the cache
blocked updates                       |  hbase.rs.updates.blocked.time                                   |  counter         |  long          |         |  Number of MS updates have been blocked so that the memstore can be flushed
flushed cells                         |  hbase.rs.flushed.cells                                          |  counter         |  long          |         |  The number of cells flushed to disk
compaction cells                      |  hbase.rs.compaction.cells                                       |  counter         |  long          |         |  The number of cells processed during minor compactions
major compaction cells                |  hbase.rs.compaction.major.cells                                 |  counter         |  long          |         |  The number of cells processed during major compactions
flushed cells size                    |  hbase.rs.flushed.cells.size                                     |  counter         |  long          |  bytes  |  The total amount of mob cells flushed to disk
compaction cells size                 |  hbase.rs.compaction.cells.size                                  |  counter         |  long          |  bytes  |  The total amount of data processed during major compactions
major compaction cells size           |  hbase.rs.compaction.major.cells.size                            |  counter         |  long          |  bytes  |  The total amount of data processed during major compactions
hedged reads                          |  hbase.rs.reads.hedged                                           |  counter         |  long          |         |  The number of times we started a hedged read
hedged reads wins                     |  hbase.rs.reads.hedged.wins                                      |  counter         |  long          |         |  The number of times we started a hedged read and a hedged read won
mob cached files                      |  hbase.rs.mob.cache.files                                        |  gauge           |  long          |         |  The count of cached mob files
mob cache files accesses              |  hbase.rs.mob.cache.files.accesses                               |  counter         |  long          |         |  The count of accesses to the mob file cache
mob cache files misses                |  hbase.rs.mob.cache.files.misses                                 |  counter         |  long          |         |  The count of misses to the mob file cache
mob cache files evictions             |  hbase.rs.mob.cache.files.evictions                              |  counter         |  long          |         |  The number of items evicted from the mob file cache
mob flushes                           |  hbase.rs.mob.flushes                                            |  counter         |  long          |         |  The number of the flushes in mob-enabled stores
flushed cells                         |  hbase.rs.mob.flushed.cells                                      |  counter         |  long          |         |  The number of mob cells flushed to disk
mob flushed cells size                |  hbase.rs.mob.flushed.cells.size                                 |  counter         |  long          |  bytes  |  The total amount of mob cells flushed to disk
scanned cells                         |  hbase.rs.mob.scan.cells                                         |  counter         |  long          |         |  The number of scanned mob cells
scanned cells size                    |  hbase.rs.mob.scan.cells.size                                    |  counter         |  long          |  bytes  |  The total amount of scanned mob cells
mob cache files hits rate             |  hbase.rs.mob.cache.files.hits.rate                              |  gauge           |  long          |         |  The hit percent to the mob file cache
appends                               |  hbase.rs.ops.appends                                            |  counter         |  long          |         |  The number of batches containing puts
deletes                               |  hbase.rs.ops.deletes                                            |  counter         |  long          |         |  The number of batches containing delete(s)
mutates                               |  hbase.rs.ops.mutates                                            |  counter         |  long          |         |  The number of Mutates
gets                                  |  hbase.rs.ops.gets                                               |  counter         |  long          |         |  The number of Gets
replays                               |  hbase.rs.ops.replays                                            |  counter         |  long          |         |  The numbers of Replays
increments                            |  hbase.rs.ops.increments                                         |  counter         |  long          |         |  The number of Increments
slow appends                          |  hbase.rs.ops.appends.slow                                       |  counter         |  long          |         |  The number of batches containing puts that took over 1000ms to complete
slow deletes                          |  hbase.rs.ops.deletes.slow                                       |  counter         |  long          |         |  The number of batches containing delete(s) that took over 1000ms to complete
slow increments                       |  hbase.rs.ops.increments.slow                                    |  counter         |  long          |         |  The number of Increments that took over 1000ms to complete
slow gets                             |  hbase.rs.ops.gets.slow                                          |  counter         |  long          |         |  The number of Gets that took over 1000ms to complete
slow puts                             |  hbase.rs.ops.puts.slow                                          |  counter         |  long          |         |  The number of batches containing puts that took over 1000ms to complete
scan min size                         |  hbase.rs.ops.scan.size.min                                      |  gauge           |  long          |  bytes  |  Min scan size
scan max size                         |  hbase.rs.ops.scan.size.max                                      |  gauge           |  long          |  bytes  |  Max scan size
flushes                               |  hbase.rs.ops.flushes                                            |  counter         |  long          |         |  Number of flushes
flush output min size                 |  hbase.rs.ops.flushes.out.size.min                               |  gauge           |  long          |  bytes  |  Min number of bytes in the resulting file for a flush
flush output max size                 |  hbase.rs.ops.flushes.out.size.max                               |  gauge           |  long          |  bytes  |  Max number of bytes in the resulting file for a flush
compaction input min size             |  hbase.rs.ops.major.compaction.in.size.min                       |  gauge           |  long          |  bytes  |  Compaction min total input file sizes major only
compaction input max size             |  hbase.rs.ops.major.compaction.in.size.max                       |  gauge           |  long          |  bytes  |  Compaction max total input file sizes major only
compactions                           |  hbase.rs.ops.compactions                                        |  counter         |  long          |  bytes  |  Compactions both major and minor
compactions input min size            |  hbase.rs.ops.compactions.in.size.min                            |  gauge           |  long          |  bytes  |  Min compaction total input file sizes both major and minor
compactions input max size            |  hbase.rs.ops.compactions.in.size.max                            |  gauge           |  long          |  bytes  |  Max compaction total input file sizes both major and minor
flush min time                        |  hbase.rs.ops.flushes.time.min                                   |  gauge           |  long          |  ms     |  Min time for memstore flush
flush max time                        |  hbase.rs.ops.flushes.time.max                                   |  gauge           |  long          |  ms     |  Max time for memstore flush
compactions output min size           |  hbase.rs.ops.compactions.out.size.min                           |  gauge           |  long          |  bytes  |  Min compaction total output file sizes
compactions output max size           |  hbase.rs.ops.compactions.out.size.max                           |  gauge           |  long          |  bytes  |  Max compaction total output file sizes both major and minor
splits                                |  hbase.rs.ops.splits                                             |  counter         |  long          |         |  The number of Splits
split min time                        |  hbase.rs.ops.split.time.min                                     |  gauge           |  long          |  ms     |  Min split time
split max time                        |  hbase.rs.ops.split.time.max                                     |  gauge           |  long          |  ms     |  Max split time
flush memstore min size               |  hbase.rs.ops.flushes.memstore.size.min                          |  gauge           |  long          |  bytes  |  Min number of bytes in the memstore for a flush
flush memstore max size               |  hbase.rs.ops.flushes.memstore.size.max                          |  gauge           |  long          |  bytes  |  Max number of bytes in the memstore for a flush
scans                                 |  hbase.rs.ops.scans                                              |  counter         |  long          |         |  The number of Scans
scan min time                         |  hbase.rs.ops.scan.time.min                                      |  gauge           |  long          |  ms     |  Min scan time
scan max time                         |  hbase.rs.ops.scan.time.max                                      |  gauge           |  long          |  ms     |  Max scan time
major compactions                     |  hbase.rs.ops.major.compactions                                  |  counter         |  long          |         |  Compactions major only
major compaction min time             |  hbase.rs.ops.major.compaction.time.min                          |  gauge           |  long          |  ms     |  Min time for compaction major only
major compaction max time             |  hbase.rs.ops.major.compaction.time.max                          |  gauge           |  long          |  ms     |  Max time for compaction major only
major compactions time                |  hbase.rs.ops.major.compactions.time                             |  counter         |  long          |  ms     |  Time for compactions  major only
scans time                            |  hbase.rs.ops.scans.time                                         |  counter         |  long          |  ms     |  Scans time
flushes memstore size                 |  hbase.rs.ops.flushes.memstore.size                              |  counter         |  long          |  bytes  |  Number of bytes in the memstore for a flushes
major compactions input files         |  hbase.rs.ops.major.compactions.in.files                         |  counter         |  long          |         |  Compactions input number of files major only
compactions input files               |  hbase.rs.ops.compactions.in.files                               |  counter         |  long          |         |  Compactions input number of files both major and minor
splits time                           |  hbase.rs.ops.splits.time                                        |  counter         |  long          |  ms     |  Splits time
compactions output size               |  hbase.rs.ops.compactions.out.size                               |  counter         |  long          |  bytes  |  Compaction total output file sizes both major and minor
major compactions.output size         |  hbase.rs.ops.major.compactions.out.size                         |  counter         |  long          |  bytes  |  Compactions total output file sizes major only
compactions output files              |  hbase.rs.ops.compactions.out.files                              |  counter         |  long          |  bytes  |  Compactions output number of files both major and minor
flushes time                          |  hbase.rs.ops.flushes.time                                       |  counter         |  long          |  ms     |  Time for memstore flushes
major compactions output files        |  hbase.rs.ops.major.compactions.out.files                        |  counter         |  long          |         |  Compactions output number of files major only
compactions input size                |  hbase.rs.ops.compactions.in.size                                |  counter         |  long          |  bytes  |  Compactions total input file sizes both major and minor
major compactions input size          |  hbase.rs.ops.major.compactions.in.size                          |  counter         |  long          |  bytes  |  Compactions total input file sizes major only
flushes output size                   |  hbase.rs.ops.flushes.out.size                                   |  counter         |  long          |  bytes  |  Number of bytes in the resulting file for a flushes
scans size                            |  hbase.rs.ops.scans.size                                         |  counter         |  long          |  bytes  |  Scans size
wal roll requests                     |  hbase.rs.wal.roll.requests                                      |  counter         |  long          |         |  How many times a log roll has been requested total
wal written size                      |  hbase.rs.wal.written.size                                       |  counter         |  long          |  bytes  |  Size of the data written to the WAL
wal low replica roll requests         |  hbase.rs.wal.low.replica.roll.requests                          |  counter         |  long          |         |  How many times a log roll was requested due to too few DN's in the write pipeline
wal syncs                             |  hbase.rs.wal.syncs                                              |  counter         |  long          |         |  The number of syncs the WAL to HDFS
wal sync min time                     |  hbase.rs.wal.sync.time.min                                      |  gauge           |  long          |  ms     |  Min time it took to sync the WAL to HDFS
wal sync max time                     |  hbase.rs.wal.sync.time.max                                      |  gauge           |  long          |  ms     |  Max time it took to sync the WAL to HDFS
wal append min size                   |  hbase.rs.wal.append.size.min                                    |  gauge           |  long          |  bytes  |  Min size of the data appended to the WAL
wal append max size                   |  hbase.rs.wal.append.size.max                                    |  gauge           |  long          |  bytes  |  Max size of the data appended to the WAL
wal append min time                   |  hbase.rs.wal.append.time.min                                    |  gauge           |  long          |  ms     |  Min time an append to the WAL took
wal append max time                   |  hbase.rs.wal.append.time.max                                    |  gauge           |  long          |  ms     |  Max time an append to the WAL took
wal slow appends                      |  hbase.rs.wal.appends.slow                                       |  counter         |  long          |         |  Number of appends that were slow
wal appends                           |  hbase.rs.wal.appends                                            |  counter         |  long          |         |  Number of appends to the write ahead log
wal syncs time                        |  hbase.rs.wal.syncs.time                                         |  counter         |  long          |  ms     |  The time it took to syncs the WAL to HDFS
wal appends size                      |  hbase.rs.wal.appends.size                                       |  counter         |  long          |  bytes  |  Size of the data appended to the WAL
wal appends time                      |  hbase.rs.wal.appends.time                                       |  counter         |  long          |  ms     |  Time an appends to the WAL took
applied replication batches           |  hbase.rs.replication.batches.applied                            |  counter         |  long          |         |  Applied replication batches
ppplied replication ops               |  hbase.rs.replication.ops.applied                                |  counter         |  long          |         |  Applied replication ops
applied replication hfiles            |  hbase.rs.replication.hfiles.applied                             |  counter         |  long          |         |  Applied replication hfiles
oldest regions in transition          |  hbase.master.rit.oldest                                         |  gauge           |  long          |  ms     |  Timestamp of the oldest Region In Transition
total duration regions in transition  |  hbase.master.rit.duration                                       |  double_counter  |  double        |  ms     |  Total durations in milliseconds for all Regions in Transition
regions in transition                 |  hbase.master.rit.count                                          |  gauge           |  long          |         |  Current number of Regions In Transition
regions in transition long time       |  hbase.master.rit.count.overthreshold                            |  gauge           |  long          |         |  Current number of Regions In Transition over threshold time
bulk assigns                          |  hbase.master.assigns.bulk                                       |  counter         |  long          |         |  Number of bulk assign operations
bulk assign min time                  |  hbase.master.assigns.bulk.time.min                              |  gauge           |  long          |  ms     |  Min time for bulk assign operation
bulk assign max time                  |  hbase.master.assigns.bulk.time.max                              |  gauge           |  long          |  ms     |  Max time for bulk assign operation
master assigns                        |  hbase.master.assigns                                            |  counter         |  long          |         |  Number of assign operations
assign min time                       |  hbase.master.assigns.time.min                                   |  gauge           |  long          |  ms     |  Min time for assign operation
assign max time                       |  hbase.master.assigns.time.max                                   |  gauge           |  long          |  ms     |  Max time for assign operation
bulk assigns time                     |  hbase.master.assigns.bulk.time                                  |  double_counter  |  double        |  ms     |  Time for bulk assign operations
assigns time                          |  hbase.master.assigns.time                                       |  double_counter  |  double        |  ms     |  Time for assign operations
balancer ops                          |  hbase.master.balancer.ops                                       |  counter         |  long          |         |  Balancer invocations
balance min time                      |  hbase.master.balancer.time.min                                  |  gauge           |  long          |  ms     |  Min time for balance operation
balance max time                      |  hbase.master.balancer.time.max                                  |  gauge           |  long          |  ms     |  Max time for balance operation
balancer misc invocations             |  hbase.master.balancer.misc.invocations                          |  counter         |  long          |         |  Balancer misc invocations
balances time                         |  hbase.master.balancer.time                                      |  counter         |  long          |  ms     |  Time for balance operations
wal splits                            |  hbase.master.hlog.splits                                        |  counter         |  long          |         |  Number of WAL files splits
wal split min time                    |  hbase.master.hlog.split.time.min                                |  gauge           |  long          |  ms     |  Min time it takes to finish WAL.splitLog()
wal split max time                    |  hbase.master.hlog.split.time.max                                |  gauge           |  long          |  ms     |  Max time it takes to finish WAL.splitLog()
meta wal splits                       |  hbase.master.hlog.meta.splits                                   |  counter         |  long          |         |  Meta WAL files splits
meta wal split min time               |  hbase.master.hlog.meta.split.time.min                           |  gauge           |  long          |  ms     |  Min time it takes to finish splitMetaLog()
meta wal split max time               |  hbase.master.hlog.meta.split.time.max                           |  gauge           |  long          |  ms     |  Max time it takes to finish splitMetaLog()
meta wal split min size               |  hbase.master.hlog.meta.split.size.min                           |  gauge           |  long          |  bytes  |  Min size of hbase:meta WAL files being split
meta wal split max size               |  hbase.master.hlog.meta.split.size.max                           |  gauge           |  long          |  bytes  |  Max size of hbase:meta WAL files being split
wal split min size                    |  hbase.master.hlog.split.size.min                                |  gauge           |  long          |  bytes  |  Min size of WAL files being split
wal split max size                    |  hbase.master.hlog.split.size.max                                |  gauge           |  long          |  bytes  |  Max size of WAL files being split
meta wal splits size                  |  hbase.master.hlog.meta.splits.size                              |  counter         |  long          |  bytes  |  Size of hbase:meta WAL files being split
meta wal splits time                  |  hbase.master.hlog.meta.splits.time                              |  counter         |  long          |  ms     |  Time it takes to finish splitMetaLog()
wal splits time                       |  hbase.master.hlog.splits.time                                   |  counter         |  long          |  ms     |  Time it takes to finish WAL.splitLog()
wal splits size                       |  hbase.master.hlog.splits.size                                   |  counter         |  long          |  bytes  |  Size of WAL files being split
plan splits                           |  hbase.master.plan.splits                                        |  gauge           |  long          |         |  Number of Region Split Plans executed
plan merges                           |  hbase.master.plan.merges                                        |  gauge           |  long          |         |  Number of Region Merge Plans executed
region servers                        |  hbase.master.servers.region                                     |  gauge           |  long          |         |  Number of RegionServers
dead region servers                   |  hbase.master.servers.region.dead                                |  gauge           |  long          |         |  Number of dead RegionServers
requests                              |  hbase.master.requests                                           |  counter         |  long          |         |  Number of cluster requests
average load                          |  hbase.master.load                                               |  gauge           |  double        |         |  Average Load
snapshots restores                    |  hbase.master.snapshots.restores                                 |  counter         |  long          |         |  Number of restoreSnapshot() calls
snapshot restore min time             |  hbase.master.snapshots.restore.time.min                         |  gauge           |  long          |  ms     |  Min time it takes to finish restoreSnapshot() call
snapshot restore max time             |  hbase.master.snapshots.restore.time.max                         |  gauge           |  long          |  ms     |  Max time it takes to finish restoreSnapshot() call
snapshots clones                      |  hbase.master.snapshots.clones                                   |  counter         |  long          |         |  Number of cloneSnapshot() calls
snapshots clone min time              |  hbase.master.snapshots.clone.time.min                           |  gauge           |  long          |  ms     |  Min time it takes to finish cloneSnapshot() call
snapshots clone max time              |  hbase.master.snapshots.clone.time.max                           |  gauge           |  long          |  ms     |  Max time it takes to finish cloneSnapshot() call
snapshots                             |  hbase.master.snapshots                                          |  counter         |  long          |         |  Number of snapshot() calls
snapshot min time                     |  hbase.master.snapshot.time.min                                  |  gauge           |  long          |  ms     |  Max time it takes to finish snapshot() call
snapshot max time                     |  hbase.master.snapshot.time.max                                  |  gauge           |  long          |  ms     |  Max time it takes to finish snapshot() call
snapshots restores time               |  hbase.master.snapshots.restores.time                            |  double_counter  |  double        |  ms     |  Time it takes to finish restoreSnapshot() calls
snapshots clones time                 |  hbase.master.snapshots.clones.time                              |  double_counter  |  double        |  ms     |  Time it takes to finish cloneSnapshot() calls
snapshots time                        |  hbase.master.snapshots.time                                     |  double_counter  |  double        |  ms     |  Time it takes to finish snapshot() calls
complated logs                        |  hbase.rs.replication.completed.logs                             |  gauge           |  long          |         |  Source completed logs
repeated log files size               |  hbase.rs.replication.repeated.log.file.size                     |  gauge           |  long          |  bytes  |  Source repeated log files size
restarted load readings               |  hbase.rs.replication.restarted.log.reads                        |  gauge           |  long          |         |  Source restarted load readings
closed logs                           |  hbase.rs.replication.closed.logs.with.unknown.file.length       |  gauge           |  long          |         |  Source closed logs with unknows file length
uncleanly closed logs                 |  hbase.rs.replication.uncleanly.closed.logs                      |  gauge           |  long          |         |  Source uncleanly closed logs
ignored uncleanly closed logs size    |  hbase.rs.replication.ignored.uncleanly.closed.log.content.size  |  gauge           |  long          |  bytes  |  Source ignored uncleanly closed logs content size
log queue                             |  hbase.rs.replication.log.queue                                  |  gauge           |  long          |         |  Source log queue
log edits read                        |  hbase.rs.replication.log.edits.read                             |  counter         |  long          |         |  Source log edits read
log edits filtered                    |  hbase.rs.replication.log.edits.filtered                         |  counter         |  long          |         |  Source log edits filtered
shipped batches                       |  hbase.rs.replication.batches.shipped                            |  counter         |  long          |         |  Source shipped batches
shipped operations                    |  hbase.rs.replication.ops.shipped                                |  counter         |  long          |         |  Source shipped operations
shipped size                          |  hbase.rs.replication.batches.shipped.size                       |  counter         |  long          |  bytes  |  Source shipped size
log read size                         |  hbase.rs.replication.log.edits.read.bytes                       |  counter         |  long          |  bytes  |  Source log read size
lifo mode switches                    |  hbase.ipc.lifo.mode.switches                                    |  counter         |  long          |         |  Total number of calls in general queue which were served from the tail of the queue
general dropped calls                 |  hbase.ipc.general.dropped.calls                                 |  counter         |  long          |         |  Total number of calls in general queue which were dropped by CoDel RPC executor
fallbacks to insecure auth            |  hbase.ipc.authentication.fallbacks                              |  counter         |  long          |         |  Number of fallbacks to insecure authentication
requests exceptions                   |  hbase.ipc.exceptions                                            |  counter         |  long          |         |  Exceptions caused by requests
sanity check exceptions               |  hbase.ipc.exceptions.failed.sanity.check                        |  counter         |  long          |         |  Number of requests that resulted in FailedSanityCheckException
region too busy exceptions            |  hbase.ipc.exceptions.region.too.busy                            |  counter         |  long          |         |  Number of requests that resulted in RegionTooBusyException
scanner reset exceptions              |  hbase.ipc.exceptions.scanner.reset                              |  counter         |  long          |         |  Number of requests that resulted in ScannerResetException
full queue exceptions                 |  hbase.ipc.exceptions.call.queue.too.big                         |  counter         |  long          |         |  Call queue is full
not serving region exceptions         |  hbase.ipc.exceptions.not.serving.region                         |  counter         |  long          |         |  Number of requests that resulted in NotServingRegionException
out of order scanner next exceptions  |  hbase.ipc.exceptions.out.of.order.scanner.next                  |  counter         |  long          |         |  Number of requests that resulted in OutOfOrderScannerNextException
unknown scanner exceptions            |  hbase.ipc.exceptions.unknown.scanner                            |  counter         |  long          |         |  Number of requests that resulted in UnknownScannerException
too large response exceptions         |  hbase.ipc.exceptions.multi.response.too.large                   |  counter         |  long          |         |  A response to a multi request was too large and the rest of the requests will have to be retried
region moved exceptions               |  hbase.ipc.exceptions.region.moved                               |  counter         |  long          |         |  Number of requests that resulted in RegionMovedException
requests                              |  hbase.ipc.requests                                              |  counter         |  long          |         |  Number of requests
request min size                      |  hbase.ipc.request.size.min                                      |  gauge           |  long          |  bytes  |  Min Request size
request max size                      |  hbase.ipc.request.size.max                                      |  gauge           |  long          |  bytes  |  Max Request size
requests size                         |  hbase.ipc.requests.size                                         |  counter         |  long          |  bytes  |  Requests size
responses                             |  hbase.ipc.responses                                             |  counter         |  long          |         |  Number of responses
response min size                     |  hbase.ipc.response.size.min                                     |  gauge           |  long          |  bytes  |  Min Response size
response max size                     |  hbase.ipc.response.size.max                                     |  gauge           |  long          |  bytes  |  Max Response size
responses size                        |  hbase.ipc.responses.size                                        |  counter         |  long          |  bytes  |  Responses size
total calls                           |  hbase.ipc.total.calls                                           |  counter         |  long          |         |  Total calls
total call min time                   |  hbase.ipc.total.call.time.min                                   |  gauge           |  long          |  ms     |  Total call min time including both queued and processing time
total call max time                   |  hbase.ipc.total.call.time.max                                   |  gauge           |  long          |  ms     |  Total call max time including both queued and processing time
total calls time                      |  hbase.ipc.total.calls.time                                      |  counter         |  long          |  ms     |  Total calls time including both queued and processing time
queue size                            |  hbase.ipc.queue.bytes                                           |  gauge           |  long          |  bytes  |  Number of bytes in the call queues; request has been read and parsed and is waiting to run or is currently being executed
general queue calls                   |  hbase.ipc.queue.size                                            |  gauge           |  long          |         |  Number of calls in the general call queue; parsed requests waiting in scheduler to be executed
replication queue calls               |  hbase.ipc.queue.replication.size                                |  gauge           |  long          |         |  Number of calls in the replication call queue waiting to be run
priority queue calls                  |  hbase.ipc.queue.priority.size                                   |  gauge           |  long          |         |  Number of calls in the priority call queue waiting to be run
open connections                      |  hbase.ipc.connections.open                                      |  gauge           |  long          |         |  Number of open connections
active handlers                       |  hbase.ipc.handlers.active                                       |  gauge           |  long          |         |  Total number of active rpc handlers
queue calls                           |  hbase.ipc.queue.calls                                           |  counter         |  long          |         |  Queue Calls
queue call min time                   |  hbase.ipc.queue.call.time.min                                   |  gauge           |  long          |  ms     |  Queue Call Min Time
queue call max time                   |  hbase.ipc.queue.call.time.max                                   |  gauge           |  long          |  ms     |  Queue Call Max Time
auth failures                         |  hbase.ipc.authentication.failures                               |  counter         |  long          |         |  Number of authentication failures
authorization failures                |  hbase.ipc.authorization.failures                                |  counter         |  long          |         |  Number of authorization failures
auth successes                        |  hbase.ipc.authentication.successes                              |  counter         |  long          |         |  Number of authentication successes
authorization successes               |  hbase.ipc.authorization.successes                               |  counter         |  long          |         |  Number of authorization successes
processing calls                      |  hbase.ipc.process.calls                                         |  counter         |  long          |         |  Processing calls
processing call min time              |  hbase.ipc.process.call.time.min                                 |  gauge           |  long          |  ms     |  Processing call min time
processing call max time              |  hbase.ipc.process.call.time.max                                 |  gauge           |  long          |  ms     |  Processing call max time
sent bytes                            |  hbase.ipc.bytes.sent                                            |  counter         |  long          |  bytes  |  Number of bytes sent
received bytes                        |  hbase.ipc.bytes.received                                        |  counter         |  long          |  bytes  |  Number of bytes received
processing calls time                 |  hbase.ipc.process.calls.time                                    |  counter         |  long          |  ms     |  Processing call time
queue calls time                      |  hbase.ipc.queue.calls.time                                      |  counter         |  long          |  ms     |  Queue Call Time
new threads                           |  jvm.threads.new                                                 |  gauge           |  long          |         |  Current number of NEW threads
runnable threads                      |  jvm.threads.runnable                                            |  gauge           |  long          |         |  Current number of RUNNABLE threads
blocked threads                       |  jvm.threads.blocked                                             |  gauge           |  long          |         |  Current number of BLOCKED threads
waiting threads                       |  jvm.threads.waiting                                             |  gauge           |  long          |         |  Current number of WAITING threads
timed waiting threads                 |  jvm.threads.waiting.timed                                       |  gauge           |  long          |         |  Current number of TIMED_WAITING threads
terminated threads                    |  jvm.threads.terminated                                          |  gauge           |  long          |         |  Current number of TERMINATED threads
fatal logs                            |  jvm.log.fatal                                                   |  counter         |  long          |         |  Total number of FATAL logs
error logs                            |  jvm.log.error                                                   |  counter         |  long          |         |  Total number of ERROR logs
warn logs                             |  jvm.log.warn                                                    |  counter         |  long          |         |  Total number of WARN logs
info logs                             |  jvm.log.info                                                    |  counter         |  long          |         |  Total number of INFO logs
non-heap memory used                  |  jvm.nonheap.used                                                |  gauge           |  long          |  bytes  |  Current non-heap memory used
non-heap memory committed             |  jvm.nonheap.committed                                           |  gauge           |  long          |  bytes  |  Current non-heap memory committed
max non-heap memory                   |  jvm.nonheap.size.max                                            |  gauge           |  long          |  bytes  |  Max non-heap memory size
heap memory                           |  jvm.heap.used                                                   |  gauge           |  long          |  bytes  |  Current heap memory used
heap memory commited                  |  jvm.heap.committed                                              |  gauge           |  long          |  bytes  |  Current heap memory committed
max heap memory                       |  jvm.heap.size.max                                               |  gauge           |  long          |  bytes  |  Max heap memory size
max memory size                       |  jvm.memory.size.max                                             |  gauge           |  long          |  bytes  |  Max memory size
successful logins                     |  hbase.ugi.login.success                                         |  counter         |  long          |         |  Successful kerberos logins
failed logins                         |  hbase.ugi.login.failure                                         |  counter         |  long          |         |  Failed kerberos logins
group resolutions                     |  hbase.ugi.groups.gets                                           |  counter         |  long          |         |  Total number of group resolutions
failed logins latency                 |  hbase.ugi.login.failure.time                                    |  counter         |  long          |  ms     |  Failed kerberos logins latency
successful logins latency             |  hbase.ugi.login.success.time                                    |  counter         |  long          |  ms     |  Successful kerberos logins latency
group resolutions time                |  hbase.ugi.groups.gets.time                                      |  counter         |  long          |  ms     |  Time for group resolution
tables                                |  hbase.rs.tables                                                 |  gauge           |  long          |         |  Number of tables in the metrics system
read requests                         |  hbase.rs.table.read.requests                                    |  counter         |  long          |         |  Number of read requests
write requests                        |  hbase.rs.table.write.requests                                   |  counter         |  long          |         |  Number of write requests
memstore size                         |  hbase.rs.table.memstore.size                                    |  gauge           |  long          |  bytes  |  The size of memory stores
store files size                      |  hbase.rs.table.store.files.size                                 |  gauge           |  long          |  bytes  |  The size of store files size
table size                            |  hbase.rs.table.size                                             |  gauge           |  long          |  bytes  |  Total size of the table in the region server


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
