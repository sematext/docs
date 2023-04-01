title: Couchbase Monitoring Integration
description: Collect and monitor key Couchbase metrics with built-in anomaly detection, threshold, and heartbeat alerts. Send notifications to email and various chatops messaging services, correlate events & logs, filter metrics by server, node, time or index, and visualize your cluster's health with out of the box graphs and custom dashboards

## Integration

- Instructions: [https://apps.sematext.com/ui/howto/couchbase/overview](https://apps.sematext.com/ui/howto/couchbase/overview)

## Important Metrics to Watch and Alert on

### View Operations
The View Operations metric measures the number of view queries executed by the Couchbase cluster.

It is an important metric for monitoring the performance and throughput of view queries in your Couchbase cluster. High view operation rates can indicate that the number of view queries is increasing and that the design of the views may need to be optimized for better performance. On the other hand, low view operation rates may indicate that the views are not being utilized effectively and may need to be re-evaluated.

### Resident Item Ratio
The Resident Item Ratio metric indicates the percentage of active items in a bucket that are currently residing in the memory of the Couchbase server. In other words, it is the ratio of the number of active items residing in memory to the total number of active items in the bucket.

A high ratio means that a large portion of the active items in the bucket are resident in memory, which can lead to faster read and write performance. On the other hand, a low ratio indicates that most of the active items are residing on disk, which can lead to increased disk I/O and slower response times.

The Resident Item Ratio is an important metric for Couchbase performance tuning, as it can help identify if a bucket has sufficient memory resources to accommodate its working set. It can also help to determine if the working set of data is too large for the available memory, which can result in a high number of disk I/O operations and reduced performance.

### Cache Miss Rate
Cache Miss Rate is a performance metric that indicates the percentage of times a requested item is not found in the cache and must be retrieved from the disk. A high cache miss rate can indicate that the working set of data is too large for the available cache size or that the cache eviction policy is not effective. It can lead to increased disk I/O, longer response times, and reduced throughput. On the other hand, a low cache miss rate means that most requested items are found in the cache, which results in faster response times and better overall performance. This number should be as close to zero as possible.

### Total Items
This metric counts the total number of current items stored in a bucket including those not active (replica, dead and pending states). It is an important indicator of the size and growth of a Couchbase bucket, as well as the overall workload on the cluster. It can be used to monitor and manage the storage capacity and performance of a Couchbase deployment, and to optimize the allocation of resources such as memory, disk space, and network bandwidth.

### Current Connections
The Current Connections metric indicates the number of active network connections between clients and the Couchbase cluster. This includes connections for data access, management operations, and other network traffic.

It's used for monitoring the load on the Couchbase cluster and for identifying potential bottlenecks or capacity issues. A high number of current connections can indicate that the cluster is experiencing heavy load and may need additional resources, such as increased network bandwidth or additional nodes.

## Metrics

Metric Name <br> Key (Type) (Unit) | description
--- | ---
average background wait <br> **background.wait.time.avg** <br> (double_gauge) (sec) | Average background wait time
background wait time <br> **background.wait.total** <br> (double_counter) (sec) | Total background wait time
average commit time <br> **disk.commit.time.avg** <br> (double_gauge) (sec) | Average disk commit time
average update time <br> **disk.update.time.avg** <br> (double_gauge) (microsec) | Average disk update time
bytes read <br> **bytes.read** <br> (double_counter) (bytes) | Number of bytes per second sent into a bucket.
bytes written <br> **bytes.written** <br> (double_counter) (bytes) | Number of bytes per second sent from a bucket
cas bad values <br> **cas.badval** <br> (double_counter) () | Compare and Swap bad values
cas hits <br> **cas.hits** <br> (double_counter) () | Compare and Swap hits
cas misses <br> **cas.misses** <br> (double_counter) () | Compare and Swap misses
cmd gets <br> **cmd.get** <br> (double_counter) () | Number of get commands
cmd sets <br> **cmd.set** <br> (double_counter) () | Number of set commands
doc actual disk size <br> **docs.disk.actual.size** <br> (long_gauge) (bytes) | Couch docs total size on disk
doc data disk size <br> **docs.data.size** <br> (long_gauge) (bytes) | Couch docs data size
docs disk size <br> **docs.disk.size** <br> (long_gauge) (bytes) | Couch docs total size
doc fragmentation <br> **docs.fragmentation** <br> (double_gauge) (%) | Couch docs fragmentation
spatial data size <br> **data.spatial.size** <br> (long_gauge) (bytes) | Size of object data for spatial views
spatial disk size <br> **disk.spatial.size** <br> (long_gauge) (bytes) | Amount of disk space occupied by spatial views
spatial ops <br> **ops.spatial** <br> (double_counter) () | Spatial operations
total disk size <br> **disk.size** <br> (long_gauge) (bytes) | Couch total disk size.
view data size <br> **views.data.size** <br> (long_gauge) (bytes) | Size of object data for views.
view disk size <br> **views.disk.size** <br> (long_gauge) (bytes) | Amount of disk space occupied by views.
view fragmentation <br> **views.fragmentation** <br> (double_gauge) (%) | View fragmentation
view ops <br> **views.ops** <br> (double_counter) () | View operations
cpu utilization <br> **cpu.utilization** <br> (double_gauge) (%) | CPU utilization percentage.
connections <br> **connections.current** <br> (long_gauge) () | Current bucket connections.
total items <br> **items.current.total** <br> (long_gauge) () | Num current items including those not active (replica, dead and pending states)
memory items <br> **items.current** <br> (long_gauge) () | Num items in active vbuckets (temp + live)
decrement hits <br> **decrement.hits** <br> (double_counter) () | Decrement hits
decrement misses <br> **decrement.misses** <br> (double_counter) () | Decrement misses
delete hdouble_counterits <br> **delete.hits** <br> (double_counter) () | Delete hits
delete misses <br> **delete.misses** <br> (double_counter) () | Delete misses
commits <br> **disk.commits.count** <br> (double_counter) () | Disk commits
updates <br> **disk.updates.count** <br> (double_counter) () | Disk updates
writes <br> **disk.write.queue** <br> (long_gauge) () | Disk write queue depth
reads <br> **ep.background.fetched** <br> (double_counter) () | Disk reads
cache miss rate <br> **ep.cache.miss.rate** <br> (double_gauge) (%) | Cache miss rate
cache miss ratio <br> **ep.cache.miss.ratio** <br> (double_gauge) (%) | Cache miss ratio
DCP fts backoff <br> **ep.dcp.fts.backoff** <br> (double_counter) () | Number of backoffs for fts DCP connections
DCP fts count <br> **ep.dcp.fts.count** <br> (double_gauge) () | Number of fts DCP connections
DCP fts items remaining <br> **ep.dcp.fts.items.remaining** <br> (double_gauge) () | Number of fts items remaining to be sent
DCP fts items sent <br> **ep.dcp.fts.items.sent** <br> (double_counter) () | Number of fts items sent
DCP fts producers <br> **ep.dcp.fts.producer.count** <br> (double_gauge) () | Number of fts producers
DCP fts total bytes <br> **ep.dcp.2i.total.bytes** <br> (double_counter) (bytes) | Number of bytes being sent for indexes DCP connections
DCP indexes backoff <br> **ep.dcp.2i.backoff** <br> (double_counter) () | Number of backoffs for indexes DCP
DCP indexes count <br> **ep.dcp.2i.count** <br> (double_gauge) () | Number of indexes DCP connections
DCP indexes items remaining <br> **ep.dcp.2i.items.remaining** <br> (double_gauge) () | Number of indexes items remaining to be sent
DCP indexes items sent <br> **ep.dcp.2i.items.sent** <br> (double_counter) () | Number of indexes items sent
DCP indexes producer <br> **ep.dcp.2i.producer.count** <br> (double_gauge) () | Number of indexes producers
DCP other backoff <br> **ep.dcp.other.backoff** <br> (double_counter) () | Number of backoffs for other DCP connections
DCP other count <br> **ep.dcp.other.count** <br> (double_gauge) () | Number of other DCP connections
DCP other items remaining <br> **ep.dcp.other.items.remaining** <br> (double_gauge) () | Number of other items remaining to be sent
DCP other items sent <br> **ep.dcp.other.items.sent** <br> (double_counter) () | Number of other items sent
DCP other producers <br> **ep.dcp.other.producer.count** <br> (double_gauge) () | Number of other producers
DCP other total bytes <br> **ep.dcp.other.total.bytes** <br> (double_counter) (bytes) | Number of bytes being sent for other DCP connections
DCP replica backoff <br> **ep.dcp.replica.backoff** <br> (double_counter) () | Number of backoffs for replica DCP connections
DCP replica count <br> **ep.dcp.replica.count** <br> (double_gauge) () | Number of replica DCP connections
DCP replica items remaining <br> **ep.dcp.replica.items.remaining** <br> (double_gauge) () | Number of replica items remaining to be sent
DCP replica items sent <br> **ep.dcp.replica.items.sent** <br> (double_counter) () | Number of replica items sent
DCP replica producer <br> **ep.dcp.replica.producer.count** <br> (double_gauge) () | Number of replica producers
DCP replica total bytes <br> **ep.dcp.replica.bytes.total** <br> (double_counter) (bytes) | Number of bytes being sent for replica DCP connections
DCP views backoff <br> **ep.dcp.views.backoff** <br> (double_counter) () | Number of backoffs for views DCP connections
DCP views count <br> **ep.dcp.views.count** <br> (double_gauge) () | Number of views DCP connections
DCP views items remaining <br> **ep.dcp.views.items.remaining** <br> (double_gauge) () | Number of views items remaining to be sent
DCP views items sent <br> **ep.dcp.views.items.sent** <br> (double_counter) () | Number of views items sent
DCP views producer <br> **ep.dcp.views.producer.count** <br> (double_gauge) () | Number of views producers
DCP views total bytes <br> **ep.dcp.views.bytes.total** <br> (double_counter) (bytes) | Number of bytes being sent for views DCP connections
DCP XDCR backoff <br> **ep.dcp.xdcr.backoff** <br> (double_counter) () | Number of backoffs for XDCR DCP connections
DCP XDCR count <br> **ep.dcp.xdcr.count** <br> (double_gauge) () | Number of XDCR DCP connections
DCP XDCR items remaining <br> **ep.dcp.xdcr.items.remaining** <br> (double_gauge) () | Number of XDCR items remaining to be sent
DCP XDCR items sent <br> **ep.dcp.xdcr.items.sent** <br> (double_counter) () | Number of XDCR items sent
DCP XDCR producer <br> **ep.dcp.xdcr.producer.count** <br> (double_gauge) () | Number of XDCR producers
DCP XDCR total bytes <br> **ep.dcp.xdcr.total.bytes** <br> (double_counter) (bytes) | Number of bytes being sent for XDCR DCP connections
queue drained <br> **ep.diskqueue.drain** <br> (double_counter) () | Total drained items in disk queue
queued <br> **ep.diskqueue.fill** <br> (double_counter) () | Total enqueued items in disk queue
queue waiting items <br> **ep.diskqueue.items** <br> (long_gauge) () | Total number of items waiting to be written to disk
current flushing items <br> **ep.flusher.todo** <br> (long_gauge) () | Number of items currently being written
failed commits <br> **ep.item.commit.failed** <br> (double_gauge) () | Number of times a transaction failed to commit due to storage errors
kv size <br> **ep.kv.size** <br> (long_gauge) (bytes) | Total amount of user data cached in RAM in this bucket
max size <br> **ep.max.size** <br> (long_gauge) (bytes) | The maximum amount of memory this bucket can use
memory high water mark <br> **ep.mem.high.wat** <br> (long_gauge) (bytes) | Memory usage high water mark for auto-evictions
memory low water mark <br> **ep.mem.low.wat** <br> (long_gauge) (bytes) | Memory usage low water mark for auto-evictions
metadata mem <br> **ep.meta.data.memory** <br> (long_gauge) (bytes) | Total amount of item metadata consuming RAM in this bucket
non-resident items <br> **ep.num.non.resident** <br> (long_gauge) () | Number of non-resident items
ops del meta <br> **ep.num.ops.del.meta** <br> (double_counter) () | Number of delete operations for this bucket as the target for XDCR
ops del ret meta <br> **ep.num.ops.del.ret.meta** <br> (double_counter) () | Number of delRetMeta operations for this bucket as the target for XDCR
ops get meta <br> **ep.num.ops.get.meta** <br> (double_counter) () | Number of read operations for this bucket as the target for XDCR
ops set meta <br> **ep.num.ops.set.meta** <br> (double_counter) () | Number of set operations for this bucket as the target for XDCR
ops set rep meta <br> **ep.num.ops.set.ret.meta** <br> (double_counter) () | Number of setRetMeta operations for this bucket as the target for XDCR
ejects <br> **ep.num.value.ejects** <br> (double_counter) () | Number of times item values got ejected from memory to disk
ooms <br> **ep.oom.errors** <br> (long_gauge) () | Number of times unrecoverable OOMs happened while processing operations
create ops <br> **ep.ops.create** <br> (double_counter) () | Create operations
update ops <br> **ep.ops.update** <br> (double_counter) () | Update operations
overhead <br> **ep.overhead** <br> (long_gauge) () | Extra memory used by transient data like persistence queues or checkpoints
queue size <br> **ep.queue.size** <br> (long_gauge) () | Number of items queued for storage
resident items <br> **ep.resident.items.rate** <br> (double_gauge) () | Number of resident items
drain items <br> **ep.tap.replica.queue.drain** <br> (double_counter) () | Total drained items in the replica queue
drain items <br> **ep.tap.total.queue.drain** <br> (double_counter) () | Total drained items in the queue
queued <br> **ep.tap.total.queue.fill** <br> (double_gauge) () | Total enqueued items in the queue
backlog size <br> **ep.tap.total.total.backlog.size** <br> (long_gauge) () | Number of remaining items for replication
ooms <br> **ep.tmp.oom.errors** <br> (double_counter) () | Number of times recoverable OOMs happened while processing operations
vb total <br> **ep.vb.total** <br> (long_gauge) () | Total number of vBuckets for this bucket
evictions <br> **evictions** <br> (double_counter) () | Number of evictions
get hits <br> **get.hits** <br> (double_counter) () | Number of get hits
get misses <br> **get.misses** <br> (double_counter) () | Number of get misses
hibernated requests <br> **hibernated.requests** <br> (double_gauge) () | Number of streaming requests idle
hibernated waked <br> **hibernated.waked** <br> (double_counter) () | Rate of streaming request wakeups
hit ratio <br> **hit.ratio** <br> (double_gauge) () | Hit ratio
increment hits <br> **increment.hits** <br> (double_counter) () | Number of increment hits
increment misses <br> **increment.misses** <br> (double_counter) () | Number of increment misses
actual free <br> **mem.actual.free** <br> (long_gauge) (bytes) | Actual free memory
actual used <br> **mem.actual.used** <br> (long_gauge) (bytes) | Used memory
free <br> **mem.free** <br> (long_gauge) (bytes) | Free memory
total <br> **mem.total** <br> (long_gauge) (bytes) | Total available memory
used <br> **mem.used** <br> (long_gauge) (bytes) | Engine's total memory usage (deprecated)
used sys <br> **mem.used.sys** <br> (long_gauge) (bytes) | System memory usage
misses <br> **misses** <br> (double_counter) () | Total number of misses
ops <br> **ops** <br> (double_counter) () | Total number of operations
faults <br> **page.faults** <br> (double_gauge) () | Number of page faults
repl docs queue <br> **replication.docs.rep.queue** <br> (double_gauge) () | 
repl meta latency aggr <br> **replication.meta.latency.aggr** <br> (double_gauge) () | 
rest requests <br> **rest.requests** <br> (double_counter) (request) | Number of HTTP requests
swap total <br> **swap.total** <br> (long_gauge) (bytes) | Total amount of swap available
swap used <br> **swap.used** <br> (long_gauge) (bytes) | Amount of swap used
vb active eject <br> **vb.active.eject** <br> (double_counter) (items) | Number of items being ejected to disk from active vBuckets
vb active item mem <br> **vb.active.itm.memory** <br> (long_gauge) () | Amount of active user data cached in RAM in this bucket
vb active meta mem <br> **vb.active.meta.data.memory** <br> (long_gauge) () | Amount of active item metadata consuming RAM in this bucket
vb active num non resident <br> **vb.active.num.non.resident** <br> (long_gauge) () | Number of non resident vBuckets in the active state for this bucket
vb active num <br> **vb.active.num** <br> (long_gauge) () | Number of active items
vb active ops create <br> **vb.active.ops.create** <br> (double_counter) (items) | New items being inserted into active vBuckets in this bucket
vb active ops update <br> **vb.active.ops.update** <br> (double_counter) (items) | Number of items updated on active vBucket for this bucket
vb active queue age <br> **vb.active.queue.age** <br> (long_gauge) (ms) | Sum of disk queue item age
vb active queue drain <br> **vb.active.queue.drain** <br> (double_counter) () | Total drained items in the queue
vb active queue fill <br> **vb.active.queue.fill** <br> (double_counter) (items) | Number of active items being put on the active item disk queue
vb active queue size <br> **vb.active.queue.size** <br> (long_gauge) () | Number of active items in the queue
vb active resident items ratio <br> **vb.active.resident.items.ratio** <br> (double_gauge) (%) | Number of resident items
vb avg active queue age <br> **vb.avg.active.queue.age** <br> (double_gauge) (sec) | Average age in seconds of active items in the active item queue
vb avg pending queue age <br> **vb.avg.pending.queue.age** <br> (double_gauge) (sec) | Average age in seconds of pending items in the pending item queue
vb avg replica queue age <br> **vb.avg.replica.queue.age** <br> (double_gauge) (sec) | Average age in seconds of replica items in the replica item queue
vb avg total queue age <br> **vb.avg.total.queue.age** <br> (double_gauge) (sec) | Average age of items in the queue
vb pending curr item <br> **vb.pending.curr.items** <br> (long_gauge) () | Number of items in pending vBuckets
vb pending eject <br> **vb.pending.eject** <br> (double_counter) (items) | Number of items being ejected to disk from pending vBuckets
vb pending item mem <br> **vb.pending.itm.memory** <br> (double_gauge) () | Amount of pending user data cached in RAM in this bucket
vb pending meta mem <br> **vb.pending.meta.data.memory** <br> (double_gauge) () | Amount of pending item metadata consuming RAM in this bucket
vb pending num non resident <br> **vb.pending.num.non.resident** <br> (double_gauge) () | Number of non resident vBuckets in the pending state for this bucket
vb pending num <br> **vb.pending.num** <br> (double_gauge) () | Number of pending items
vb pending ops create <br> **vb.pending.ops.create** <br> (double_counter) () | Number of pending create operations
vb pending ops update <br> **vb.pending.ops.update** <br> (double_counter) (items) | Number of items updated on pending vBucket for this bucket
vb pending queue age <br> **vb.pending.queue.age** <br> (double_gauge) (ms) | Sum of disk pending queue item age
vb pending queue drain <br> **vb.pending.queue.drain** <br> (double_counter) () | Total drained pending items in the queue
vb pending queue fill <br> **vb.pending.queue.fill** <br> (double_counter) () | Total enqueued pending items in disk queue
vb pending queue size <br> **vb.pending.queue.size** <br> (double_gauge) () | Number of pending items in the queue
vb pending resident items ratio <br> **vb.pending.resident.items.ratio** <br> (double_gauge) () | Number of resident pending items
vb replica curr items <br> **vb.replica.curr.items** <br> (long_gauge) () | Number of in memory items
vb replica eject <br> **vb.replica.eject** <br> (double_counter) (items) | Number of items being ejected to disk from replica vBuckets
vb replica item mem <br> **vb.replica.itm.memory** <br> (long_gauge) () | Amount of replica user data cached in RAM in this bucket
vb replica meta data mem <br> **vb.replica.meta.data.memory** <br> (long_gauge) (bytes) | Total metadata memory
vb replica num non resident <br> **vb.replica.num.non.resident** <br> (long_gauge) () | Number of non resident vBuckets in the replica state for this bucket
vb replica num <br> **vb.replica.num** <br> (long_gauge) () | Number of replica vBuckets
vb replica ops create <br> **vb.replica.ops.create** <br> (double_counter) () | Number of replica create operations
vb replica ops update <br> **vb.replica.ops.update** <br> (double_counter) (items) | Number of items updated on replica vBucket for this bucket
vb replica queue age <br> **vb.replica.queue.age** <br> (long_gauge) (ms) | Sum of disk replica queue item age
vb replica queue drain <br> **vb.replica.queue.drain** <br> (double_counter) () | Total drained replica items in the queue
vb replica queue fill <br> **vb.replica.queue.fill** <br> (double_counter) () | Total enqueued replica items in disk queue
vb replica queue size <br> **vb.replica.queue.size** <br> (long_gauge) () | Replica items in disk queue
vb replica resident items ratio <br> **vb.replica.resident.items.ratio** <br> (double_gauge) (%) | Number of resident replica items
vb total queue age <br> **vb.queue.age.total** <br> (long_gauge) (ms) | Sum of disk queue item age
XDCR ops <br> **xdc.ops** <br> (double_counter) () | Number of cross-datacenter replication operations
active items <br> **items.active** <br> (long_gauge) () | Number of active items in memory
total items <br> **items.total** <br> (long_gauge) () | Total number of items
data size <br> **docs.size** <br> (long_gauge) (bytes) | Couch docs data size
data disk size <br> **docs.disk.actual.size** <br> (long_gauge) (bytes) | Couch docs total size on disk
views size <br> **views.size** <br> (long_gauge) (bytes) | Couch views data size
views disk size <br> **views.disk.size** <br> (long_gauge) (bytes) | Couch views data size on disk
memory items <br> **items.replica** <br> (long_gauge) () | Number of in memory items
cores <br> **cores** <br> (long_gauge) () | Cores
gc num <br> **gc.num** <br> (counter) () | Number of objects garbage collected
gc pause percent <br> **gc.pause.percent** <br> (gauge) (%) | Garbage collection pause percentage
gc pause time <br> **gc.pause.time** <br> (counter) (seconds) | Garbage collection pause time
system memory <br> **memory.system** <br> (long_gauge) (bytes) | Memory used by the system
total memory <br> **memory.total** <br> (long_gauge) (bytes) | Memory used by Couchbase over the total period of time
usage memory <br> **memory.usage** <br> (long_gauge) (bytes) | Memory currently used by Couchbase
active requests <br> **request.active.count** <br> (long_gauge) () | Number of active requests
requests completed <br> **request.completed.count** <br> (counter) () | Number of requests completed
request prepared percent <br> **request.prepared.percent** <br> (gauge) (%) | Percentage of requests prepared
request time mean <br> **request.time.mean** <br> (gauge) (seconds) | Average request time
total threads <br> **threads.total** <br> (long_gauge) () | total_threads

