title: Couchbase Monitoring Integration
description: Collect and monitor key Couchbase metrics with built-in anomaly detection, threshold, and heartbeat alerts. Send notifications to email and various chatops messaging services, correlate events & logs, filter metrics by server, node, time or index, and visualize your cluster's health with out of the box graphs and custom dashboards

## Integration

- Instructions: [https://apps.sematext.com/ui/howto/couchbase/overview](https://apps.sematext.com/ui/howto/couchbase/overview)

## Important Metrics to Watch and Alert on
TODO

## Metrics

Metric Name <br> Key (Type) (Unit) | description
--- | ---
average background wait <br> **background.wait.time.avg** <br> double_gauge <br> sec | Average background wait time
background wait time <br> **background.wait.total** <br> double_counter <br> sec | Total background wait time
average commit time <br> **disk.commit.time.avg** <br> double_gauge <br> sec | Average disk commit time
average update time <br> **disk.update.time.avg** <br> double_gauge <br> microsec | Average disk update time
bytes read <br> **bytes.read** <br> double_counter <br> bytes | Number of bytes per second sent into a bucket.
bytes written <br> **bytes.written** <br> double_counter <br> bytes | Number of bytes per second sent from a bucket
cas bad values <br> **cas.badval** <br> double_counter <br>  | Compare and Swap bad values
cas hits <br> **cas.hits** <br> double_counter <br>  | Compare and Swap hits
cas misses <br> **cas.misses** <br> double_counter <br>  | Compare and Swap misses
cmd gets <br> **cmd.get** <br> double_counter <br>  | Number of get commands
cmd sets <br> **cmd.set** <br> double_counter <br>  | Number of set commands
doc actual disk size <br> **docs.disk.actual.size** <br> long_gauge <br> bytes | Couch docs total size on disk
doc data disk size <br> **docs.data.size** <br> long_gauge <br> bytes | Couch docs data size
docs disk size <br> **docs.disk.size** <br> long_gauge <br> bytes | Couch docs total size
doc fragmentation <br> **docs.fragmentation** <br> double_gauge <br> % | Couch docs fragmentation
spatial data size <br> **data.spatial.size** <br> long_gauge <br> bytes | Size of object data for spatial views
spatial disk size <br> **disk.spatial.size** <br> long_gauge <br> bytes | Amount of disk space occupied by spatial views
spatial ops <br> **ops.spatial** <br> double_counter <br>  | Spatial operations
total disk size <br> **disk.size** <br> long_gauge <br> bytes | Couch total disk size.
view data size <br> **views.data.size** <br> long_gauge <br> bytes | Size of object data for views.
view disk size <br> **views.disk.size** <br> long_gauge <br> bytes | Amount of disk space occupied by views.
view fragmentation <br> **views.fragmentation** <br> double_gauge <br> % | View fragmentation
view ops <br> **views.ops** <br> double_counter <br>  | View operations
cpu utilization <br> **cpu.utilization** <br> double_gauge <br> % | CPU utilization percentage.
connections <br> **connections.current** <br> long_gauge <br>  | Current bucket connections.
total items <br> **items.current.total** <br> long_gauge <br>  | Num current items including those not active (replica, dead and pending states)
memory items <br> **items.current** <br> long_gauge <br>  | Num items in active vbuckets (temp + live)
decrement hits <br> **decrement.hits** <br> double_counter <br>  | Decrement hits
decrement misses <br> **decrement.misses** <br> double_counter <br>  | Decrement misses
delete hdouble_counterits <br> **delete.hits** <br> double_counter <br>  | Delete hits
delete misses <br> **delete.misses** <br> double_counter <br>  | Delete misses
commits <br> **disk.commits.count** <br> double_counter <br>  | Disk commits
updates <br> **disk.updates.count** <br> double_counter <br>  | Disk updates
writes <br> **disk.write.queue** <br> long_gauge <br>  | Disk write queue depth
reads <br> **ep.background.fetched** <br> double_counter <br>  | Disk reads
cache miss rate <br> **ep.cache.miss.rate** <br> double_gauge <br> % | Cache miss rate
cache miss ratio <br> **ep.cache.miss.ratio** <br> double_gauge <br> % | Cache miss ratio
DCP fts backoff <br> **ep.dcp.fts.backoff** <br> double_counter <br>  | Number of backoffs for fts DCP connections
DCP fts count <br> **ep.dcp.fts.count** <br> double_gauge <br>  | Number of fts DCP connections
DCP fts items remaining <br> **ep.dcp.fts.items.remaining** <br> double_gauge <br>  | Number of fts items remaining to be sent
DCP fts items sent <br> **ep.dcp.fts.items.sent** <br> double_counter <br>  | Number of fts items sent
DCP fts producers <br> **ep.dcp.fts.producer.count** <br> double_gauge <br>  | Number of fts producers
DCP fts total bytes <br> **ep.dcp.2i.total.bytes** <br> double_counter <br> bytes | Number of bytes being sent for indexes DCP connections
DCP indexes backoff <br> **ep.dcp.2i.backoff** <br> double_counter <br>  | Number of backoffs for indexes DCP
DCP indexes count <br> **ep.dcp.2i.count** <br> double_gauge <br>  | Number of indexes DCP connections
DCP indexes items remaining <br> **ep.dcp.2i.items.remaining** <br> double_gauge <br>  | Number of indexes items remaining to be sent
DCP indexes items sent <br> **ep.dcp.2i.items.sent** <br> double_counter <br>  | Number of indexes items sent
DCP indexes producer <br> **ep.dcp.2i.producer.count** <br> double_gauge <br>  | Number of indexes producers
DCP other backoff <br> **ep.dcp.other.backoff** <br> double_counter <br>  | Number of backoffs for other DCP connections
DCP other count <br> **ep.dcp.other.count** <br> double_gauge <br>  | Number of other DCP connections
DCP other items remaining <br> **ep.dcp.other.items.remaining** <br> double_gauge <br>  | Number of other items remaining to be sent
DCP other items sent <br> **ep.dcp.other.items.sent** <br> double_counter <br>  | Number of other items sent
DCP other producers <br> **ep.dcp.other.producer.count** <br> double_gauge <br>  | Number of other producers
DCP other total bytes <br> **ep.dcp.other.total.bytes** <br> double_counter <br> bytes | Number of bytes being sent for other DCP connections
DCP replica backoff <br> **ep.dcp.replica.backoff** <br> double_counter <br>  | Number of backoffs for replica DCP connections
DCP replica count <br> **ep.dcp.replica.count** <br> double_gauge <br>  | Number of replica DCP connections
DCP replica items remaining <br> **ep.dcp.replica.items.remaining** <br> double_gauge <br>  | Number of replica items remaining to be sent
DCP replica items sent <br> **ep.dcp.replica.items.sent** <br> double_counter <br>  | Number of replica items sent
DCP replica producer <br> **ep.dcp.replica.producer.count** <br> double_gauge <br>  | Number of replica producers
DCP replica total bytes <br> **ep.dcp.replica.bytes.total** <br> double_counter <br> bytes | Number of bytes being sent for replica DCP connections
DCP views backoff <br> **ep.dcp.views.backoff** <br> double_counter <br>  | Number of backoffs for views DCP connections
DCP views count <br> **ep.dcp.views.count** <br> double_gauge <br>  | Number of views DCP connections
DCP views items remaining <br> **ep.dcp.views.items.remaining** <br> double_gauge <br>  | Number of views items remaining to be sent
DCP views items sent <br> **ep.dcp.views.items.sent** <br> double_counter <br>  | Number of views items sent
DCP views producer <br> **ep.dcp.views.producer.count** <br> double_gauge <br>  | Number of views producers
DCP views total bytes <br> **ep.dcp.views.bytes.total** <br> double_counter <br> bytes | Number of bytes being sent for views DCP connections
DCP XDCR backoff <br> **ep.dcp.xdcr.backoff** <br> double_counter <br>  | Number of backoffs for XDCR DCP connections
DCP XDCR count <br> **ep.dcp.xdcr.count** <br> double_gauge <br>  | Number of XDCR DCP connections
DCP XDCR items remaining <br> **ep.dcp.xdcr.items.remaining** <br> double_gauge <br>  | Number of XDCR items remaining to be sent
DCP XDCR items sent <br> **ep.dcp.xdcr.items.sent** <br> double_counter <br>  | Number of XDCR items sent
DCP XDCR producer <br> **ep.dcp.xdcr.producer.count** <br> double_gauge <br>  | Number of XDCR producers
DCP XDCR total bytes <br> **ep.dcp.xdcr.total.bytes** <br> double_counter <br> bytes | Number of bytes being sent for XDCR DCP connections
queue drained <br> **ep.diskqueue.drain** <br> double_counter <br>  | Total drained items in disk queue
queued <br> **ep.diskqueue.fill** <br> double_counter <br>  | Total enqueued items in disk queue
queue waiting items <br> **ep.diskqueue.items** <br> long_gauge <br>  | Total number of items waiting to be written to disk
current flushing items <br> **ep.flusher.todo** <br> long_gauge <br>  | Number of items currently being written
failed commits <br> **ep.item.commit.failed** <br> double_gauge <br>  | Number of times a transaction failed to commit due to storage errors
kv size <br> **ep.kv.size** <br> long_gauge <br> bytes | Total amount of user data cached in RAM in this bucket
max size <br> **ep.max.size** <br> long_gauge <br> bytes | The maximum amount of memory this bucket can use
memory high water mark <br> **ep.mem.high.wat** <br> long_gauge <br> bytes | Memory usage high water mark for auto-evictions
memory low water mark <br> **ep.mem.low.wat** <br> long_gauge <br> bytes | Memory usage low water mark for auto-evictions
metadata mem <br> **ep.meta.data.memory** <br> long_gauge <br> bytes | Total amount of item metadata consuming RAM in this bucket
non-resident items <br> **ep.num.non.resident** <br> long_gauge <br>  | Number of non-resident items
ops del meta <br> **ep.num.ops.del.meta** <br> double_counter <br>  | Number of delete operations for this bucket as the target for XDCR
ops del ret meta <br> **ep.num.ops.del.ret.meta** <br> double_counter <br>  | Number of delRetMeta operations for this bucket as the target for XDCR
ops get meta <br> **ep.num.ops.get.meta** <br> double_counter <br>  | Number of read operations for this bucket as the target for XDCR
ops set meta <br> **ep.num.ops.set.meta** <br> double_counter <br>  | Number of set operations for this bucket as the target for XDCR
ops set rep meta <br> **ep.num.ops.set.ret.meta** <br> double_counter <br>  | Number of setRetMeta operations for this bucket as the target for XDCR
ejects <br> **ep.num.value.ejects** <br> double_counter <br>  | Number of times item values got ejected from memory to disk
ooms <br> **ep.oom.errors** <br> long_gauge <br>  | Number of times unrecoverable OOMs happened while processing operations
create ops <br> **ep.ops.create** <br> double_counter <br>  | Create operations
update ops <br> **ep.ops.update** <br> double_counter <br>  | Update operations
overhead <br> **ep.overhead** <br> long_gauge <br>  | Extra memory used by transient data like persistence queues or checkpoints
queue size <br> **ep.queue.size** <br> long_gauge <br>  | Number of items queued for storage
resident items <br> **ep.resident.items.rate** <br> double_gauge <br>  | Number of resident items
drain items <br> **ep.tap.replica.queue.drain** <br> double_counter <br>  | Total drained items in the replica queue
drain items <br> **ep.tap.total.queue.drain** <br> double_counter <br>  | Total drained items in the queue
queued <br> **ep.tap.total.queue.fill** <br> double_gauge <br>  | Total enqueued items in the queue
backlog size <br> **ep.tap.total.total.backlog.size** <br> long_gauge <br>  | Number of remaining items for replication
ooms <br> **ep.tmp.oom.errors** <br> double_counter <br>  | Number of times recoverable OOMs happened while processing operations
vb total <br> **ep.vb.total** <br> long_gauge <br>  | Total number of vBuckets for this bucket
evictions <br> **evictions** <br> double_counter <br>  | Number of evictions
get hits <br> **get.hits** <br> double_counter <br>  | Number of get hits
get misses <br> **get.misses** <br> double_counter <br>  | Number of get misses
hibernated requests <br> **hibernated.requests** <br> double_gauge <br>  | Number of streaming requests idle
hibernated waked <br> **hibernated.waked** <br> double_counter <br>  | Rate of streaming request wakeups
hit ratio <br> **hit.ratio** <br> double_gauge <br>  | Hit ratio
increment hits <br> **increment.hits** <br> double_counter <br>  | Number of increment hits
increment misses <br> **increment.misses** <br> double_counter <br>  | Number of increment misses
actual free <br> **mem.actual.free** <br> long_gauge <br> bytes | Actual free memory
actual used <br> **mem.actual.used** <br> long_gauge <br> bytes | Used memory
free <br> **mem.free** <br> long_gauge <br> bytes | Free memory
total <br> **mem.total** <br> long_gauge <br> bytes | Total available memory
used <br> **mem.used** <br> long_gauge <br> bytes | Engine's total memory usage (deprecated)
used sys <br> **mem.used.sys** <br> long_gauge <br> bytes | System memory usage
misses <br> **misses** <br> double_counter <br>  | Total number of misses
ops <br> **ops** <br> double_counter <br>  | Total number of operations
faults <br> **page.faults** <br> double_gauge <br>  | Number of page faults
repl docs queue <br> **replication.docs.rep.queue** <br> double_gauge <br>  | 
repl meta latency aggr <br> **replication.meta.latency.aggr** <br> double_gauge <br>  | 
rest requests <br> **rest.requests** <br> double_counter <br> request | Number of HTTP requests
swap total <br> **swap.total** <br> long_gauge <br> bytes | Total amount of swap available
swap used <br> **swap.used** <br> long_gauge <br> bytes | Amount of swap used
vb active eject <br> **vb.active.eject** <br> double_counter <br> items | Number of items being ejected to disk from active vBuckets
vb active item mem <br> **vb.active.itm.memory** <br> long_gauge <br>  | Amount of active user data cached in RAM in this bucket
vb active meta mem <br> **vb.active.meta.data.memory** <br> long_gauge <br>  | Amount of active item metadata consuming RAM in this bucket
vb active num non resident <br> **vb.active.num.non.resident** <br> long_gauge <br>  | Number of non resident vBuckets in the active state for this bucket
vb active num <br> **vb.active.num** <br> long_gauge <br>  | Number of active items
vb active ops create <br> **vb.active.ops.create** <br> double_counter <br> items | New items being inserted into active vBuckets in this bucket
vb active ops update <br> **vb.active.ops.update** <br> double_counter <br> items | Number of items updated on active vBucket for this bucket
vb active queue age <br> **vb.active.queue.age** <br> long_gauge <br> ms | Sum of disk queue item age
vb active queue drain <br> **vb.active.queue.drain** <br> double_counter <br>  | Total drained items in the queue
vb active queue fill <br> **vb.active.queue.fill** <br> double_counter <br> items | Number of active items being put on the active item disk queue
vb active queue size <br> **vb.active.queue.size** <br> long_gauge <br>  | Number of active items in the queue
vb active resident items ratio <br> **vb.active.resident.items.ratio** <br> double_gauge <br> % | Number of resident items
vb avg active queue age <br> **vb.avg.active.queue.age** <br> double_gauge <br> sec | Average age in seconds of active items in the active item queue
vb avg pending queue age <br> **vb.avg.pending.queue.age** <br> double_gauge <br> sec | Average age in seconds of pending items in the pending item queue
vb avg replica queue age <br> **vb.avg.replica.queue.age** <br> double_gauge <br> sec | Average age in seconds of replica items in the replica item queue
vb avg total queue age <br> **vb.avg.total.queue.age** <br> double_gauge <br> sec | Average age of items in the queue
vb pending curr item <br> **vb.pending.curr.items** <br> long_gauge <br>  | Number of items in pending vBuckets
vb pending eject <br> **vb.pending.eject** <br> double_counter <br> items | Number of items being ejected to disk from pending vBuckets
vb pending item mem <br> **vb.pending.itm.memory** <br> double_gauge <br>  | Amount of pending user data cached in RAM in this bucket
vb pending meta mem <br> **vb.pending.meta.data.memory** <br> double_gauge <br>  | Amount of pending item metadata consuming RAM in this bucket
vb pending num non resident <br> **vb.pending.num.non.resident** <br> double_gauge <br>  | Number of non resident vBuckets in the pending state for this bucket
vb pending num <br> **vb.pending.num** <br> double_gauge <br>  | Number of pending items
vb pending ops create <br> **vb.pending.ops.create** <br> double_counter <br>  | Number of pending create operations
vb pending ops update <br> **vb.pending.ops.update** <br> double_counter <br> items | Number of items updated on pending vBucket for this bucket
vb pending queue age <br> **vb.pending.queue.age** <br> double_gauge <br> ms | Sum of disk pending queue item age
vb pending queue drain <br> **vb.pending.queue.drain** <br> double_counter <br>  | Total drained pending items in the queue
vb pending queue fill <br> **vb.pending.queue.fill** <br> double_counter <br>  | Total enqueued pending items in disk queue
vb pending queue size <br> **vb.pending.queue.size** <br> double_gauge <br>  | Number of pending items in the queue
vb pending resident items ratio <br> **vb.pending.resident.items.ratio** <br> double_gauge <br>  | Number of resident pending items
vb replica curr items <br> **vb.replica.curr.items** <br> long_gauge <br>  | Number of in memory items
vb replica eject <br> **vb.replica.eject** <br> double_counter <br> items | Number of items being ejected to disk from replica vBuckets
vb replica item mem <br> **vb.replica.itm.memory** <br> long_gauge <br>  | Amount of replica user data cached in RAM in this bucket
vb replica meta data mem <br> **vb.replica.meta.data.memory** <br> long_gauge <br> bytes | Total metadata memory
vb replica num non resident <br> **vb.replica.num.non.resident** <br> long_gauge <br>  | Number of non resident vBuckets in the replica state for this bucket
vb replica num <br> **vb.replica.num** <br> long_gauge <br>  | Number of replica vBuckets
vb replica ops create <br> **vb.replica.ops.create** <br> double_counter <br>  | Number of replica create operations
vb replica ops update <br> **vb.replica.ops.update** <br> double_counter <br> items | Number of items updated on replica vBucket for this bucket
vb replica queue age <br> **vb.replica.queue.age** <br> long_gauge <br> ms | Sum of disk replica queue item age
vb replica queue drain <br> **vb.replica.queue.drain** <br> double_counter <br>  | Total drained replica items in the queue
vb replica queue fill <br> **vb.replica.queue.fill** <br> double_counter <br>  | Total enqueued replica items in disk queue
vb replica queue size <br> **vb.replica.queue.size** <br> long_gauge <br>  | Replica items in disk queue
vb replica resident items ratio <br> **vb.replica.resident.items.ratio** <br> double_gauge <br> % | Number of resident replica items
vb total queue age <br> **vb.queue.age.total** <br> long_gauge <br> ms | Sum of disk queue item age
XDCR ops <br> **xdc.ops** <br> double_counter <br>  | Number of cross-datacenter replication operations
