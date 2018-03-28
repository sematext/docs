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

SPM has been tested with HBase 0.90, 0.92, 0.94, and 0.98, but
will work for newer versions, including all CDH
versions.

## Integration

- Instructions: [https://apps.sematext.com/ui/howto/HBase/overview](https://apps.sematext.com/ui/howto/HBase/overview)

## Metrics

Metric Name | Key | Agg | Type | Description
--- | --- | --- | --- | ---
total max | jvm.memory.size.max | Max | Double | <i>Hadoop:service=HBase,name=JvmMetrics#MemMaxM</i>
info | jvm.log.info | Sum | Long | <i>Hadoop:service=HBase,name=JvmMetrics#LogInfo</i>
non heap used | jvm.nonheap.used | Avg | Double | <i>Hadoop:service=HBase,name=JvmMetrics#MemNonHeapUsedM</i>
error | jvm.log.error | Sum | Long | <i>Hadoop:service=HBase,name=JvmMetrics#LogError</i>
heap committed | jvm.heap.committed | Avg | Double | <i>Hadoop:service=HBase,name=JvmMetrics#MemHeapCommittedM</i>
heap max | jvm.heap.size.max | Max | Double | <i>Hadoop:service=HBase,name=JvmMetrics#MemHeapMaxM</i>
blocked | jvm.threads.blocked | Avg | Long | <i>Hadoop:service=HBase,name=JvmMetrics#ThreadsBlocked</i>
terminated | jvm.threads.terminated | Avg | Long | <i>Hadoop:service=HBase,name=JvmMetrics#ThreadsTerminated</i>
warn | jvm.log.warn | Sum | Long | <i>Hadoop:service=HBase,name=JvmMetrics#LogWarn</i>
timed waiting | jvm.threads.waiting.timed | Avg | Long | <i>Hadoop:service=HBase,name=JvmMetrics#ThreadsTimedWaiting</i>
heap used | jvm.heap.used | Avg | Double | <i>Hadoop:service=HBase,name=JvmMetrics#MemHeapUsedM</i>
fatal | jvm.log.fatal | Sum | Long | <i>Hadoop:service=HBase,name=JvmMetrics#LogFatal</i>
non heap max | jvm.nonheap.size.max | Avg | Double | <i>Hadoop:service=HBase,name=JvmMetrics#MemNonHeapMaxM</i>
waiting | jvm.threads.waiting | Avg | Long | <i>Hadoop:service=HBase,name=JvmMetrics#ThreadsWaiting</i>
new | jvm.threads.new | Avg | Long | <i>Hadoop:service=HBase,name=JvmMetrics#ThreadsNew</i>
non heap committed | jvm.nonheap.committed | Avg | Double | <i>Hadoop:service=HBase,name=JvmMetrics#MemNonHeapCommittedM</i>
runnable | jvm.threads.runnable | Avg | Long | <i>Hadoop:service=HBase,name=JvmMetrics#ThreadsRunnable</i>
ops | hbase.ugi.groups.gets | Sum | Long | <i>Hadoop:service=HBase,name=UgiMetrics#GetGroupsNumOps</i>
failure time | hbase.ugi.login.failure.time | Sum | Double | <i>Hadoop:service=HBase,name=UgiMetrics#LoginFailureAvgTime * LoginFailureNumOps</i>
success time | hbase.ugi.login.success.time | Sum | Double | <i>Hadoop:service=HBase,name=UgiMetrics#LoginSuccessAvgTime * LoginSuccessNumOps</i>
success ops | hbase.ugi.login.success | Sum | Long | <i>Hadoop:service=HBase,name=UgiMetrics#LoginSuccessNumOps</i>
failure ops | hbase.ugi.login.failure | Sum | Long | <i>Hadoop:service=HBase,name=UgiMetrics#LoginFailureNumOps</i>
time | hbase.ugi.groups.gets.time | Sum | Double | <i>Hadoop:service=HBase,name=UgiMetrics#v * GetGroupsNumOps</i>
syncs | hbase.rs.wal.syncs | Sum | Long | Count of syncs the HLog to HDFS.<br/><i>Hadoop:service=HBase,name=RegionServer,sub=WAL#SyncTime_num_ops</i>
append time | hbase.rs.wal.appends.time | Sum | Double | Time an append to the log took.<br/><i>Hadoop:service=HBase,name=RegionServer,sub=WAL#AppendTime_num_ops * AppendTime_mean</i>
append max time | hbase.rs.wal.appends.time.max | Max | Long | <i>Hadoop:service=HBase,name=RegionServer,sub=WAL#AppendTime_max</i>
sync time | hbase.rs.wal.syncs.time | Sum | Double | The time it took to sync the HLog to HDFS.<br/><i>Hadoop:service=HBase,name=RegionServer,sub=WAL#SyncTime_num_ops * SyncTime_mean</i>
appends | hbase.rs.wal.appends | Sum | Long | Count of appends to the log.<br/><i>Hadoop:service=HBase,name=RegionServer,sub=WAL#appendCount</i>
append size | hbase.rs.wal.appends.size | Sum | Double | Size (in bytes) of the data appended to the HLog.<br/><i>Hadoop:service=HBase,name=RegionServer,sub=WAL#AppendSize_num_ops * AppendSize_mean</i>
append max size | hbase.rs.wal.appends.size.max | Max | Long | <i>Hadoop:service=HBase,name=RegionServer,sub=WAL#AppendSize_max</i>
append min time | hbase.rs.wal.appends.time.min | Min | Long | <i>Hadoop:service=HBase,name=RegionServer,sub=WAL#AppendTime_min</i>
appends | hbase.rs.wal.appends | Sum | Long | Count of appends to the log.<br/><i>Hadoop:service=HBase,name=RegionServer,sub=WAL#AppendSize_num_ops</i>
sync max time | hbase.rs.wal.syncs.time.max | Max | Long | <i>Hadoop:service=HBase,name=RegionServer,sub=WAL#SyncTime_max</i>
appends | hbase.rs.wal.appends | Sum | Long | Count of appends to the log.<br/><i>Hadoop:service=HBase,name=RegionServer,sub=WAL#AppendSize_num_ops</i>
append min size | hbase.rs.wal.appends.size.min | Min | Long | <i>Hadoop:service=HBase,name=RegionServer,sub=WAL#AppendSize_min</i>
sync min time | hbase.rs.wal.syncs.time.min | Min | Long | <i>Hadoop:service=HBase,name=RegionServer,sub=WAL#SyncTime_min</i>
slow appends | hbase.rs.wal.appends.slow | Sum | Long | Number of appends that were slow.<br/><i>Hadoop:service=HBase,name=RegionServer,sub=WAL#slowAppendCount</i>
compaction queue | hbase.rs.compaction.queue | Avg | Long | Current depth of the compaction request queue. If increasing, we are falling behind with storefile compaction.<br/><i>Hadoop:service=HBase,name=RegionServer,sub=Server#compactionQueueLength</i>
compacted cells size | hbase.rs.compaction.cells.size | Sum | Long | The total amount of data processed during minor compactions, in bytes.<br/><i>Hadoop:service=HBase,name=RegionServer,sub=Server#compactedCellsSize</i>
updates blocked time | hbase.rs.updates.blocked.time | Sum | Long | Number of MS updates have been blocked so that the memstore can be flushed.<br/><i>Hadoop:service=HBase,name=RegionServer,sub=Server#updatesBlockedTime</i>
major compacted cells | hbase.rs.compaction.major.cells | Sum | Long | The number of cells processed during major compactions.<br/><i>Hadoop:service=HBase,name=RegionServer,sub=Server#majorCompactedCellsCount</i>
flush queue | hbase.rs.compaction.queue.size | Avg | Long | Length of the queue for region flushes.If increasing, we are falling behind with clearing memstores out to HDFS.<br/><i>Hadoop:service=HBase,name=RegionServer,sub=Server#flushQueueLength</i>
compacted cells | hbase.rs.compaction.cells | Sum | Long | The number of cells processed during minor compactions.<br/><i>Hadoop:service=HBase,name=RegionServer,sub=Server#compactedCellsCount</i>
flushed cells | hbase.rs.flushes.cells | Sum | Long | The number of cells flushed to disk.<br/><i>Hadoop:service=HBase,name=RegionServer,sub=Server#flushedCellsCount</i>
flushed cells size | hbase.rs.flushes.cells.size | Sum | Long | The total amount of data flushed to disk, in bytes.<br/><i>Hadoop:service=HBase,name=RegionServer,sub=Server#flushedCellsSize</i>
major compacted cells size | hbase.rs.compaction.major.cells.size | Sum | Long | The total amount of data processed during major compactions, in bytes.<br/><i>Hadoop:service=HBase,name=RegionServer,sub=Server#majorCompactedCellsSize</i>
assign min time | hbase.master.assigns.time.min | Min | Long | <i>Hadoop:service=HBase,name=Master,sub=AssignmentManger#Assign_min</i>
rit count over threshold | hbase.master.rit.count.overthreshold | Avg | Long | The number of regions that have been in transition longer than a threshold time (default: 60 seconds).<br/><i>Hadoop:service=HBase,name=Master,sub=AssignmentManger#ritCountOverThreshold</i>
rit count | hbase.master.rit.count | Avg | Long | The number of regions in transition.<br/><i>Hadoop:service=HBase,name=Master,sub=AssignmentManger#ritCount</i>
assigns | hbase.master.assigns | Sum | Long | <i>Hadoop:service=HBase,name=Master,sub=AssignmentManger#Assign_num_ops</i>
assign time | hbase.master.assigns.time | Sum | Double | <i>Hadoop:service=HBase,name=Master,sub=AssignmentManger#Assign_mean * Assign_num_ops</i>
bulk assign time | hbase.master.assigns.bulk.time | Sum | Double | <i>Hadoop:service=HBase,name=Master,sub=AssignmentManger#BulkAssign_mean * BulkAssign_num_ops</i>
rit oldest age | hbase.master.rit.oldest | Max | Long | The age of the longest region in transition.<br/><i>Hadoop:service=HBase,name=Master,sub=AssignmentManger#ritOldestAge</i>
bulk assign max time | hbase.master.assigns.bulk.time.max | Max | Long | <i>Hadoop:service=HBase,name=Master,sub=AssignmentManger#BulkAssign_max</i>
assign max time | hbase.master.assigns.time.max | Max | Long | <i>Hadoop:service=HBase,name=Master,sub=AssignmentManger#Assign_max</i>
bulk assign min time | hbase.master.assigns.bulk.time.min | Min | Long | <i>Hadoop:service=HBase,name=Master,sub=AssignmentManger#BulkAssign_min</i>
bulk assigns | hbase.master.assigns.bulk | Sum | Long | <i>Hadoop:service=HBase,name=Master,sub=AssignmentManger#BulkAssign_num_ops</i>
increment time | hbase.rs.ops.increments.time | Sum | Double | <i>Hadoop:service=HBase,name=RegionServer,sub=Server#Increment_num_ops * Increment_mean</i>
slow_puts | hbase.rs.ops.puts.slow | Sum | Long | The number of Puts that took over 1000ms to complete.<br/><i>Hadoop:service=HBase,name=RegionServer,sub=Server#slowPutCount</i>
get max time | hbase.rs.ops.gets.time.max | Max | Long | <i>Hadoop:service=HBase,name=RegionServer,sub=Server#Get_max</i>
append time | hbase.rs.ops.appends.time | Sum | Double | <i>Hadoop:service=HBase,name=RegionServer,sub=Server#Append_num_ops * Append_mean</i>
deletes | hbase.rs.ops.deletes | Sum | Long | <i>Hadoop:service=HBase,name=RegionServer,sub=Server#Delete_num_ops</i>
replay min time | hbase.rs.ops.replays.time.min | Min | Long | <i>Hadoop:service=HBase,name=RegionServer,sub=Server#Replay_min</i>
mutate min time | hbase.rs.ops.mutates.time.min | Min | Long | <i>Hadoop:service=HBase,name=RegionServer,sub=Server#Mutate_min</i>
get time | hbase.rs.ops.gets.time | Sum | Double | <i>Hadoop:service=HBase,name=RegionServer,sub=Server#Get_num_ops * Get_mean</i>
increment max time | hbase.rs.ops.increments.time.max | Max | Long | <i>Hadoop:service=HBase,name=RegionServer,sub=Server#Increment_max</i>
slow appends | hbase.rs.ops.appends.slow | Sum | Long | The number of Appends that took over 1000ms to complete.<br/><i>Hadoop:service=HBase,name=RegionServer,sub=Server#slowAppendCount</i>
mutate max time | hbase.rs.ops.mutates.time.max | Max | Long | <i>Hadoop:service=HBase,name=RegionServer,sub=Server#Mutate_max</i>
get min time | hbase.rs.ops.gets.time.min | Min | Long | <i>Hadoop:service=HBase,name=RegionServer,sub=Server#Get_min</i>
increments | hbase.rs.ops.increments | Sum | Long | <i>Hadoop:service=HBase,name=RegionServer,sub=Server#Increment_num_ops</i>
replay max time | hbase.rs.ops.replays.time.max | Max | Long | <i>Hadoop:service=HBase,name=RegionServer,sub=Server#Replay_max</i>
delete time | hbase.rs.ops.deletes.time | Sum | Double | <i>Hadoop:service=HBase,name=RegionServer,sub=Server#Delete_num_ops * Delete_mean</i>
slow deletes | hbase.rs.ops.deletes.slow | Sum | Long | The number of Deletes that took over 1000ms to complete.<br/><i>Hadoop:service=HBase,name=RegionServer,sub=Server#slowDeleteCount</i>
delete max time | hbase.rs.ops.deletes.time.max | Max | Long | <i>Hadoop:service=HBase,name=RegionServer,sub=Server#Delete_max</i>
appends | hbase.rs.ops.appends | Sum | Long | <i>Hadoop:service=HBase,name=RegionServer,sub=Server#Append_num_ops</i>
append max time | hbase.rs.ops.append.time.max | Max | Long | <i>Hadoop:service=HBase,name=RegionServer,sub=Server#Append_max</i>
delete min time | hbase.rs.ops.deletes.time.min | Min | Long | <i>Hadoop:service=HBase,name=RegionServer,sub=Server#Delete_min</i>
mutates | hbase.rs.ops.mutates | Sum | Long | <i>Hadoop:service=HBase,name=RegionServer,sub=Server#Mutate_num_ops</i>
increment min time | hbase.rs.ops.increments.time.min | Min | Long | <i>Hadoop:service=HBase,name=RegionServer,sub=Server#Increment_min</i>
append min time | hbase.rs.ops.appends.time.min | Min | Long | <i>Hadoop:service=HBase,name=RegionServer,sub=Server#Append_min</i>
replay time | hbase.rs.ops.replays.time | Sum | Double | <i>Hadoop:service=HBase,name=RegionServer,sub=Server#Replay_num_ops * Replay_mean</i>
slow increments | hbase.rs.ops.increments.slow | Sum | Long | The number of Increments that took over 1000ms to complete.<br/><i>Hadoop:service=HBase,name=RegionServer,sub=Server#slowIncrementCount</i>
replays | hbase.rs.ops.replays | Sum | Long | <i>Hadoop:service=HBase,name=RegionServer,sub=Server#Replay_num_ops</i>
gets | hbase.rs.ops.gets | Sum | Long | <i>Hadoop:service=HBase,name=RegionServer,sub=Server#Get_num_ops</i>
slow gets | hbase.rs.ops.gets.slow | Sum | Long | The number of Gets that took over 1000ms to complete.<br/><i>Hadoop:service=HBase,name=RegionServer,sub=Server#slowGetCount</i>
mutate time | hbase.rs.ops.mutates.time | Sum | Double | <i>Hadoop:service=HBase,name=RegionServer,sub=Server#Mutate_num_ops * Mutate_mean</i>
restore max time | hbase.snapshots.restore.time.max | Max | Long | <i>Hadoop:service=HBase,name=Master,sub=Snapshots#SnapshotRestoreTime_max</i>
snapshot time | hbase.snapshots.time | Sum | Double | Time it takes to finish snapshot().<br/><i>Hadoop:service=HBase,name=Master,sub=Snapshots#SnapshotTime_num_ops * SnapshotTime_mean</i>
snapshot max time | hbase.snapshots.time.max | Max | Long | <i>Hadoop:service=HBase,name=Master,sub=Snapshots#SnapshotTime_max</i>
clone time | hbase.snapshots.clone.time | Sum | Double | Time it takes to finish cloneSnapshot().<br/><i>Hadoop:service=HBase,name=Master,sub=Snapshots#SnapshotCloneTime_num_ops * SnapshotCloneTime_mean</i>
snapshots | hbase.snapshots | Sum | Long | Count of snapshot() invocations.<br/><i>Hadoop:service=HBase,name=Master,sub=Snapshots#SnapshotTime_num_ops</i>
restores | hbase.snapshots.restores | Sum | Long | Count of restoreSnapshot() invocations.<br/><i>Hadoop:service=HBase,name=Master,sub=Snapshots#SnapshotRestoreTime_num_ops</i>
clone min time | hbase.snapshots.clone.time.min | Min | Long | <i>Hadoop:service=HBase,name=Master,sub=Snapshots#SnapshotCloneTime_min</i>
clones | hbase.snapshots.clones | Sum | Long | Count of cloneSnapshot() invocations.<br/><i>Hadoop:service=HBase,name=Master,sub=Snapshots#SnapshotCloneTime_num_ops</i>
snapshot min time | hbase.snapshots.time.min | Min | Long | <i>Hadoop:service=HBase,name=Master,sub=Snapshots#SnapshotTime_min</i>
clone max time | hbase.snapshots.clone.time.max | Max | Long | <i>Hadoop:service=HBase,name=Master,sub=Snapshots#SnapshotCloneTime_max</i>
restore time | hbase.snapshots.restore.time | Sum | Double | Time it takes to finish restoreSnapshot().<br/><i>Hadoop:service=HBase,name=Master,sub=Snapshots#SnapshotRestoreTime_num_ops * SnapshotRestoreTime_mean</i>
restore min time | hbase.snapshots.restore.time.min | Min | Long | <i>Hadoop:service=HBase,name=Master,sub=Snapshots#SnapshotRestoreTime_min</i>
meta hlog split max size | hbase.master.hlog.meta.splits.size.max | Max | Long | <i>Hadoop:service=HBase,name=Master,sub=FileSystem#MetaHlogSplitSize_max</i>
hlog split size | hbase.master.meta.splits.size | Sum | Double | Size of HLog files being split.<br/><i>Hadoop:service=HBase,name=Master,sub=FileSystem#HlogSplitSize_num_ops * HlogSplitSize_mean</i>
hlog split min time | hbase.master.hlog.splits.time.min | Min | Long | <i>Hadoop:service=HBase,name=Master,sub=FileSystem#HlogSplitTime_min</i>
hlog split max size | hbase.master.hlog.splits.size.max | Max | Long | <i>Hadoop:service=HBase,name=Master,sub=FileSystem#HlogSplitSize_max</i>
hlog splits | hbase.master.hlog.splits | Sum | Long | Count of HLog.splitLog() invocations.<br/><i>Hadoop:service=HBase,name=Master,sub=FileSystem#HlogSplitTime_num_ops</i>
meta hlog split time | hbase.master.hlog.meta.splits.time | Sum | Double | Time it takes to finish splitMetaLog().<br/><i>Hadoop:service=HBase,name=Master,sub=FileSystem#MetaHlogSplitTime_num_ops * MetaHlogSplitTime_mean</i>
meta hlog split max time | hbase.master.hlog.meta.splits.time.max | Max | Long | <i>Hadoop:service=HBase,name=Master,sub=FileSystem#MetaHlogSplitTime_max</i>
hlog split time | hbase.master.hlog.splits.time | Sum | Double | Time it takes to finish HLog.splitLog().<br/><i>Hadoop:service=HBase,name=Master,sub=FileSystem#HlogSplitTime_num_ops * HlogSplitTime_mean</i>
hlog split min size | hbase.master.hlog.splits.size.min | Min | Long | <i>Hadoop:service=HBase,name=Master,sub=FileSystem#HlogSplitSize_min</i>
meta hlog splits | hbase.master.hlog.meta.splits | Sum | Long | Count of splitMetaLog() invocations.<br/><i>Hadoop:service=HBase,name=Master,sub=FileSystem#MetaHlogSplitSize_num_ops</i>
meta hlog split min size | hbase.master.hlog.meta.splits.size.min | Min | Long | <i>Hadoop:service=HBase,name=Master,sub=FileSystem#MetaHlogSplitSize_min</i>
meta hlog split min time | hbase.master.hlog.meta.splits.time.min | Min | Long | <i>Hadoop:service=HBase,name=Master,sub=FileSystem#MetaHlogSplitTime_min</i>
meta hlog splits | hbase.master.hlog.meta.splits | Sum | Long | Count of splitMetaLog() invocations.<br/><i>Hadoop:service=HBase,name=Master,sub=FileSystem#MetaHlogSplitTime_num_ops</i>
hlog split max time | hbase.master.hlog.splits.time.max | Max | Long | <i>Hadoop:service=HBase,name=Master,sub=FileSystem#HlogSplitTime_max</i>
hlog splits | hbase.master.hlog.splits | Sum | Long | Count of HLog.splitLog() invocations.<br/><i>Hadoop:service=HBase,name=Master,sub=FileSystem#HlogSplitSize_num_ops</i>
meta hlog split size | hbase.master.hlog.meta.splits.size | Sum | Double | Size of hbase:meta HLog files being split.<br/><i>Hadoop:service=HBase,name=Master,sub=FileSystem#MetaHlogSplitSize_num_ops * MetaHlogSplitSize_mean</i>
lower limit | hbase.rs.memstore.size.limit.lower | Avg | Long | Property 'hbase.regionserver.global.memstore.lowerLimit' value.
static bloom size | hbase.rs.static.bloom.size | Avg | Long | Uncompressed size of the static bloom filters.<br/><i>Hadoop:service=HBase,name=RegionServer,sub=Server#staticBloomSize</i>
store files | hbase.rs.stores.files | Avg | Long | Number of Store Files.<br/><i>Hadoop:service=HBase,name=RegionServer,sub=Server#storeFileCount</i>
store file index size | hbase.rs.stores.index.size | Avg | Long | Size of indexes in storefiles on disk.<br/><i>Hadoop:service=HBase,name=RegionServer,sub=Server#storeFileIndexSize</i>
store file size | hbase.rs.stores.files.size | Avg | Long | Size of storefiles being served.<br/><i>Hadoop:service=HBase,name=RegionServer,sub=Server#storeFileSize</i>
mem store size | hbase.rs.memstore.size | Avg | Long | Size of the memstore.<br/><i>Hadoop:service=HBase,name=RegionServer,sub=Server#memStoreSize
static index size | hbase.rs.static.index.size | Avg | Long | Uncompressed size of the static indexes.<br/><i>Hadoop:service=HBase,name=RegionServer,sub=Server#staticIndexSize</i>
upper limit | hbase.rs.memstore.size.limit.upper | Avg | Long | Property 'hbase.regionserver.global.memstore.upperLimit' value.
stores | hbase.rs.stores | Avg | Long | Number of Stores.<br/><i>Hadoop:service=HBase,name=RegionServer,sub=Server#storeCount</i>
regions | hbase.rs.regions | Avg | Long | Number of regions.<br/><i>Hadoop:service=HBase,name=RegionServer,sub=Server#regionCount</i>
active handlers | hbase.ipc.handlers.active | Avg | Long | Number of active rpc handlers.<br/><i>Hadoop:service=HBase,name=IPC,sub=IPC#numActiveHandler</i>
process call time | hbase.ipc.handlers.process.calls.time | Sum | Double | <i>Hadoop:service=HBase,name=IPC,sub=IPC#ProcessCallTime_mean * ProcessCallTime_num_ops</i>
process call min time | hbase.ipc.process.call.time.min | Min | Long | <i>Hadoop:service=HBase,name=IPC,sub=IPC#ProcessCallTime_min</i>
calls in priority queue | hbase.ipc.queue.priority.size | Avg | Long | The number of currently enqueued priority (internal housekeeping) requests.<br/><i>Hadoop:service=HBase,name=IPC,sub=IPC#numCallsInPriorityQueue</i>
authorization successes | hbase.ipc.authorization.successes | Sum | Long | Number of authorization successes.<br/><i>Hadoop:service=HBase,name=IPC,sub=IPC#authorizationSuccesses</i>
received bytes | hbase.ipc.bytes.received | Sum | Long | Number of bytes received.<br/><i>Hadoop:service=HBase,name=IPC,sub=IPC#receivedBytes</i>
sent bytes | hbase.ipc.bytes.sent | Sum | Long | Number of bytes sent.<br/><i>Hadoop:service=HBase,name=IPC,sub=IPC#sentBytes</i>
authorization failures | hbase.ipc.authorization.failures | Sum | Long | Number of authorization failures.<br/><i>Hadoop:service=HBase,name=IPC,sub=IPC#authorizationFailures</i>
process call max time | hbase.ipc.process.call.time.max | Max | Long | <i>Hadoop:service=HBase,name=IPC,sub=IPC#ProcessCallTime_max</i>
calls in replication queue | hbase.ipc.queue.replication.size | Avg | Long | Number of calls in the replication call queue.<br/><i>Hadoop:service=HBase,name=IPC,sub=IPC#numCallsInReplicationQueue</i>
process calls | hbase.ipc.handlers.process.calls | Sum | Long | <i>Hadoop:service=HBase,name=IPC,sub=IPC#ProcessCallTime_num_ops</i>
calls in general queue | hbase.ipc.queue.size | Avg | Long | The number of currently enqueued user requests.<br/><i>Hadoop:service=HBase,name=IPC,sub=IPC#numCallsInGeneralQueue</i>
queue call time | hbase.ipc.handlers.queue.calls.time | Sum | Double | <i>Hadoop:service=HBase,name=IPC,sub=IPC#QueueCallTime_mean * QueueCallTime_num_ops</i>
queue call min time | hbase.ipc.queue.call.time.min | Min | Long | <i>Hadoop:service=HBase,name=IPC,sub=IPC#QueueCallTime_min</i>
queue call max time | hbase.ipc.queue.call.time.max | Max | Long | <i>Hadoop:service=HBase,name=IPC,sub=IPC#QueueCallTime_max</i>
queue size | hbase.ipc.queue.bytes | Avg | Long | Number of bytes in the call queues.<br/><i>Hadoop:service=HBase,name=IPC,sub=IPC#queueSize</i>
authentication failures | hbase.ipc.authentication.failures | Sum | Long | Number of authentication failures.<br/><i>Hadoop:service=HBase,name=IPC,sub=IPC#authenticationFailures</i>
queue calls | hbase.ipc.handlers.queue.calls | Sum | Long | <i>Hadoop:service=HBase,name=IPC,sub=IPC#QueueCallTime_num_ops</i>
open connections | hbase.ipc.connections.open | Avg | Long | The number of open connections at the RPC layer.<br/><i>Hadoop:service=HBase,name=IPC,sub=IPC#numOpenConnections</i>
authentication successes | hbase.ipc.authentication.successes | Sum | Long | Number of authentication successes.<br/><i>Hadoop:service=HBase,name=IPC,sub=IPC#authenticationSuccesses</i>
total requests | hbase.rs.requests | Sum | Long | Total number of requests this RegionServer has answered.<br/><i>Hadoop:service=HBase,name=RegionServer,sub=Server#totalRequestCount</i>
read requests | hbase.rs.requests.read | Sum | Long | <i>Hadoop:service=HBase,name=RegionServer,sub=Server#readRequestCount</i>
write requests | hbase.rs.requests.write | Sum | Long | <i>Hadoop:service=HBase,name=RegionServer,sub=Server#writeRequestCount</i>
applied ops | hbase.rs.replication.ops.applied | Sum | Long | <i>Hadoop:service=HBase,name=RegionServer,sub=Replication#sink.appliedOps</i>
applied batches | hbase.rs.replication.batches.applied | Sum | Long | <i>Hadoop:service=HBase,name=RegionServer,sub=Replication#sink.appliedBatches</i>
balancer min time | hbase.master.balancer.time.min | Min | Long | <i>Hadoop:service=HBase,name=Master,sub=Balancer#BalancerCluster_min</i>
ops | hbase.master.balancer.ops | Avg | Long | <i>Hadoop:service=HBase,name=Master,sub=Balancer#BalancerCluster_num_ops</i>
time | hbase.master.balancer.time | Sum | Double | <i>Hadoop:service=HBase,name=Master,sub=Balancer#BalancerCluster_num_ops * BalancerCluster_mean</i>
misc invocations | hbase.master.balancer.invocations | Sum | Long | <i>Hadoop:service=HBase,name=Master,sub=Balancer#miscInvocationCount</i>
balancer max time | hbase.master.balancer.time.max | Max | Long | <i>Hadoop:service=HBase,name=Master,sub=Balancer#BalancerCluster_max</i>
flushed cells | hbase.rs.mob.flushes.cells | Sum | Long | The number of mob cells flushed to disk.<br/><i>Hadoop:service=HBase,name=RegionServer,sub=Server#mobFlushedCellsCount</i>
scan cells size | hbase.rs.mob.scan.cells.size | Sum | Long | The total amount of scanned mob cells, in bytes.<br/><i>Hadoop:service=HBase,name=RegionServer,sub=Server#mobScanCellsSize</i>
file cache hits | hbase.rs.mob.cache.files.hits | Avg | Long | The hit percent to the mob file cache.<br/><i>Hadoop:service=HBase,name=RegionServer,sub=Server#mobFileCacheHitPercent</i>
file caches | hbase.rs.mob.cache.files | Avg | Long | The count of cached mob files.<br/><i>Hadoop:service=HBase,name=RegionServer,sub=Server#mobFileCacheCount</i>
compacted into mob cells | hbase.rs.mob.compactions.cells.into | Sum | Long | The number of cells moved to mob during compaction.<br/><i>Hadoop:service=HBase,name=RegionServer,sub=Server#mobCompactedIntoMobCellsCount</i>
file cache accesses | hbase.rs.mob.cache.files.accesses | Sum | Long | The count of accesses to the mob file cache.<br/><i>Hadoop:service=HBase,name=RegionServer,sub=Server#mobFileCacheAccessCount</i>
scan cells | hbase.rs.mob.scan.cells | Sum | Long | The number of scanned mob cells.<br/><i>Hadoop:service=HBase,name=RegionServer,sub=Server#mobScanCellsCount</i>
file cache misses | hbase.rs.mob.cache.files.misses | Sum | Long | The count of misses to the mob file cache.<br/><i>Hadoop:service=HBase,name=RegionServer,sub=Server#mobFileCacheMissCount</i>
compacted from mob cells | hbase.rs.mob.compactions.cells.from | Sum | Long | The number of cells moved from mob during compaction.<br/><i>Hadoop:service=HBase,name=RegionServer,sub=Server#mobCompactedFromMobCellsCount</i>
compacted into mob cells size | hbase.rs.mob.compactions.cells.into.size | Sum | Long | The total amount of cells move to mob during compaction, in bytes.<br/><i>Hadoop:service=HBase,name=RegionServer,sub=Server#mobCompactedIntoMobCellsSize</i>
compacted from mob cells size | hbase.rs.mob.compactions.cells.from.size | Sum | Long | The total amount of cells move from mob during compaction, in bytes.<br/><i>Hadoop:service=HBase,name=RegionServer,sub=Server#mobCompactedFromMobCellsSize</i>
file cache evictions | hbase.rs.mob.cache.files.evictions | Sum | Long | The number of items evicted from the mob file cache.<br/><i>Hadoop:service=HBase,name=RegionServer,sub=Server#mobFileCacheEvictedCount</i>
flushes | hbase.rs.mob.flushes | Sum | Long | The number of the flushes in mob-enabled stores.<br/><i>Hadoop:service=HBase,name=RegionServer,sub=Server#mobFlushCount</i>
flushed cells size | hbase.rs.mob.flushes.cells.size | Sum | Long | The total amount of mob cells flushed to disk, in bytes.<br/><i>Hadoop:service=HBase,name=RegionServer,sub=Server#mobFlushedCellsSize</i>
local files | hbase.rs.files.local | Avg | Long | The percent of HFiles that are stored on the local hdfs data node.<br/><i>Hadoop:service=HBase,name=RegionServer,sub=Server#percentFilesLocal</i>
hlog files | hbase.rs.files.hlog | Avg | Long | The number of write ahead logs not yet archived.<br/><i>Hadoop:service=HBase,name=RegionServer,sub=Server#hlogFileCount</i>
hlog files size | hbase.rs.files.hlog.size | Avg | Long | Size of all HLog Files.<br/><i>Hadoop:service=HBase,name=RegionServer,sub=Server#hlogFileSize</i>
cluster requests | hbase.master.requests | Sum | Long | <i>Hadoop:service=HBase,name=Master,sub=Server#clusterRequests</i>
dead region servers | hbase.master.servers.region.dead | Avg | Double | <i>Hadoop:service=HBase,name=Master,sub=Server#numDeadRegionServers</i>
region servers | hbase.master.servers.region | Avg | Double | <i>Hadoop:service=HBase,name=Master,sub=Server#numRegionServers</i>
average load | hbase.master.load | Avg | Double | <i>Hadoop:service=HBase,name=Master,sub=Server#averageLoad</i>
mutations without wal | hbase.ops.mutates.nowal | Sum | Long | Number of mutations that have been sent by clients with the write ahead logging turned off.<br/><i>Hadoop:service=HBase,name=RegionServer,sub=Server#mutationsWithoutWALCount</i>
mutate failed ops | hbase.ops.mutates.failed | Sum | Long | Number of Check and Mutate calls that failed the checks.<br/><i>Hadoop:service=HBase,name=RegionServer,sub=Server#checkMutateFailedCount</i>
mutate passed ops | hbase.ops.mutates.passed | Sum | Long | Number of Check and Mutate calls that passed the checks.<br/><i>Hadoop:service=HBase,name=RegionServer,sub=Server#checkMutatePassedCount</i>
mutations without wal size | hbase.ops.mutates.nowal.size | Sum | Long | Size of data that has been sent by clients with the write ahead logging turned off.<br/><i>Hadoop:service=HBase,name=RegionServer,sub=Server#mutationsWithoutWALSize</i>
hits | hbase.cache.hits | Sum | Long | Count of the hit on the block cache.<br/><i>Hadoop:service=HBase,name=RegionServer,sub=Server#blockCacheHitCount</i>
express hit% | hbase.cache.hits.express.rate | Avg | Long | The percent of the time that requests with the cache turned on hit the cache.<br/><i>Hadoop:service=HBase,name=RegionServer,sub=Server#blockCacheExpressHitPercent</i>
hit% | hbase.cache.hits.rate | Avg | Long | Percent of block cache requests that are hits.<br/><i>Hadoop:service=HBase,name=RegionServer,sub=Server#blockCountHitPercent</i>
cache free size | hbase.cache.block.free | Avg | Long | Size of the block cache that is not occupied.<br/><i>Hadoop:service=HBase,name=RegionServer,sub=Server#blockCacheFreeSize</i>
block cache size | hbase.cache.block.size | Avg | Long | Size of the block cache.<br/><i>Hadoop:service=HBase,name=RegionServer,sub=Server#blockCacheSize</i>
miss | hbase.cache.misses | Sum | Long | Number of requests for a block that missed the block cache.<br/><i>Hadoop:service=HBase,name=RegionServer,sub=Server#blockCacheMissCount</i>
cache count | hbase.cache.block.count | Avg | Long | Number of block in the block cache.<br/><i>Hadoop:service=HBase,name=RegionServer,sub=Server#blockCacheCount</i>
evictions | hbase.cache.evictions | Sum | Long | Count of the number of blocks evicted from the block cache.<br/><i>Hadoop:service=HBase,name=RegionServer,sub=Server#blockCacheEvictionCount</i>
shipped batches | hbase.rs.replication.batches.shipped | Sum | Long | <i>Hadoop:service=HBase,name=RegionServer,sub=Replication#source.shippedBatches</i>
shipped ops | hbase.rs.replication.ops.shipped | Sum | Long | <i>Hadoop:service=HBase,name=RegionServer,sub=Replication#source.shippedOps</i>
log edits read | hbase.rs.replication.log.edits.read | Sum | Long | <i>Hadoop:service=HBase,name=RegionServer,sub=Replication#source.logEditsRead</i>
log queue | hbase.rs.replication.log.queue | Avg | Long | <i>Hadoop:service=HBase,name=RegionServer,sub=Replication#source.sizeOfLogQueue</i>
shipped bytes | hbase.rs.replication.batches.shipped.size | Sum | Long | <i>Hadoop:service=HBase,name=RegionServer,sub=Replication#source.shippedKBs</i>
log edits filtered | hbase.rs.replication.log.edits.filtered | Sum | Long | <i>Hadoop:service=HBase,name=RegionServer,sub=Replication#source.logEditsFiltered</i>
log read bytes | hbase.rs.replication.log.edits.read.bytes | Sum | Long | <i>Hadoop:service=HBase,name=RegionServer,sub=Replication#source.logReadInBytes</i>
hedged read wins | hbase.reads.hedged.wins | Sum | Long | The number of times we started a hedged read and a hedged read won.<br/><i>Hadoop:service=HBase,name=RegionServer,sub=Server#hedgedReadWins</i>
hedged reads | hbase.reads.hedged | Sum | Long | The number of times we started a hedged read.<br/><i>Hadoop:service=HBase,name=RegionServer,sub=Server#hedgedReads</i>
stores | hbase.stores | Avg | Long | 
flushes | hbase.flushes | Sum | Long | 
compactions | hbase.compactions | Sum | Long | 
store files | hbase.store.files | Avg | Long | 
store file index size | hbase.store.index.size | Avg | Long | 
sync | hbase.fs.sync.latency.max | Max | Long | 
read | hbase.fs.read.latency.max | Max | Long | 
write | hbase.fs.write.latency.max | Max | Long | 
sync | hbase.fs.sync.latency.min | Min | Long | 
read | hbase.fs.read.latency.min | Min | Long | 
write | hbase.fs.write.latency.min | Min | Long | 
flush queue | hbase.flushes.queue.size | Avg | Double | 
max | hbase.memstore.flushes.time.max | Max | Long | 
min | hbase.flushes.size.min | Min | Long | 
flushes | hbase.memstore.flushes | Sum | Long | 
max | hbase.flushes.size.max | Max | Long | 
memstore size | hbase.memstore.size | Avg | Long | 
min | hbase.memstore.flushes.time.min | Min | Long | 
min | hbase.compactions.time.min | Min | Long | 
max | hbase.compactions.time.max | Max | Long | 
max | hbase.compactions.size.max | Max | Long | 
compactions | hbase.compactions | Sum | Long | 
compaction queue | hbase.compactions.queue.size | Avg | Double | 
min | hbase.compactions.size.min | Min | Long | 
cache size | hbase.cache.block.size | Avg | Long | 
miss count | hbase.cache.block.misses | Sum | Long | 
cache free | hbase.cache.block.free | Avg | Long | 
hit count | hbase.cache.block.hits | Sum | Long | 
block cache count | hbase.cache.block.count | Avg | Long | 
blockCacheHitRatio | hbase.cache.block.hits.ratio | Avg | Long | 
evicted count | hbase.cache.block.evictions | Sum | Long | 
blockCacheHitCachingRatio | hbase.cache.block.caching.hits.ratio | Avg | Long | 
max | hbase.splits.time.max | Max | Long | 
splits | hbase.splits | Sum | Long | 
max | hbase.splits.size.max | Max | Long | 
min | hbase.splits.size.min | Min | Long | 
splits | hbase.splits | Sum | Long | 
regions | hbase.regions | Avg | Long | 

### 0.98

Metric Name | Key | Agg | Type | Description
--- | --- | --- | --- | ---
total max | jvm.memory.size.max | Max | Double | <i>Hadoop:service=HBase,name=JvmMetrics#MemMaxM</i>
info | jvm.log.info | Sum | Long | <i>Hadoop:service=HBase,name=JvmMetrics#LogInfo</i>
non heap used | jvm.nonheap.used | Avg | Double | <i>Hadoop:service=HBase,name=JvmMetrics#MemNonHeapUsedM</i>
error | jvm.log.error | Sum | Long | <i>Hadoop:service=HBase,name=JvmMetrics#LogError</i>
heap committed | jvm.heap.committed | Avg | Double | <i>Hadoop:service=HBase,name=JvmMetrics#MemHeapCommittedM</i>
heap max | jvm.heap.size.max | Max | Double | <i>Hadoop:service=HBase,name=JvmMetrics#MemHeapMaxM</i>
blocked | jvm.threads.blocked | Avg | Long | <i>Hadoop:service=HBase,name=JvmMetrics#ThreadsBlocked</i>
terminated | jvm.threads.terminated | Avg | Long | <i>Hadoop:service=HBase,name=JvmMetrics#ThreadsTerminated</i>
warn | jvm.log.warn | Sum | Long | <i>Hadoop:service=HBase,name=JvmMetrics#LogWarn</i>
timed waiting | jvm.threads.waiting.timed | Avg | Long | <i>Hadoop:service=HBase,name=JvmMetrics#ThreadsTimedWaiting</i>
heap used | jvm.heap.used | Avg | Double | <i>Hadoop:service=HBase,name=JvmMetrics#MemHeapUsedM</i>
fatal | jvm.log.fatal | Sum | Long | <i>Hadoop:service=HBase,name=JvmMetrics#LogFatal</i>
non heap max | jvm.nonheap.size.max | Avg | Double | <i>Hadoop:service=HBase,name=JvmMetrics#MemNonHeapMaxM</i>
waiting | jvm.threads.waiting | Avg | Long | <i>Hadoop:service=HBase,name=JvmMetrics#ThreadsWaiting</i>
new | jvm.threads.new | Avg | Long | <i>Hadoop:service=HBase,name=JvmMetrics#ThreadsNew</i>
non heap committed | jvm.nonheap.committed | Avg | Double | <i>Hadoop:service=HBase,name=JvmMetrics#MemNonHeapCommittedM</i>
runnable | jvm.threads.runnable | Avg | Long | <i>Hadoop:service=HBase,name=JvmMetrics#ThreadsRunnable</i>
ops | hbase.ugi.groups.gets | Sum | Long | <i>Hadoop:service=HBase,name=UgiMetrics#GetGroupsNumOps</i>
failure time | hbase.ugi.login.failure.time | Sum | Double | <i>Hadoop:service=HBase,name=UgiMetrics#LoginFailureAvgTime * LoginFailureNumOps</i>
success time | hbase.ugi.login.success.time | Sum | Double | <i>Hadoop:service=HBase,name=UgiMetrics#LoginSuccessAvgTime * LoginSuccessNumOps</i>
success ops | hbase.ugi.login.success | Sum | Long | <i>Hadoop:service=HBase,name=UgiMetrics#LoginSuccessNumOps</i>
failure ops | hbase.ugi.login.failure | Sum | Long | <i>Hadoop:service=HBase,name=UgiMetrics#LoginFailureNumOps</i>
time | hbase.ugi.groups.gets.time | Sum | Double | <i>Hadoop:service=HBase,name=UgiMetrics#v * GetGroupsNumOps</i>
syncs | hbase.rs.wal.syncs | Sum | Long | Count of syncs the HLog to HDFS.<br/><i>Hadoop:service=HBase,name=RegionServer,sub=WAL#SyncTime_num_ops</i>
append time | hbase.rs.wal.appends.time | Sum | Double | Time an append to the log took.<br/><i>Hadoop:service=HBase,name=RegionServer,sub=WAL#AppendTime_num_ops * AppendTime_mean</i>
append max time | hbase.rs.wal.appends.time.max | Max | Long | <i>Hadoop:service=HBase,name=RegionServer,sub=WAL#AppendTime_max</i>
sync time | hbase.rs.wal.syncs.time | Sum | Double | The time it took to sync the HLog to HDFS.<br/><i>Hadoop:service=HBase,name=RegionServer,sub=WAL#SyncTime_num_ops * SyncTime_mean</i>
appends | hbase.rs.wal.appends | Sum | Long | Count of appends to the log.<br/><i>Hadoop:service=HBase,name=RegionServer,sub=WAL#appendCount</i>
append size | hbase.rs.wal.appends.size | Sum | Double | Size (in bytes) of the data appended to the HLog.<br/><i>Hadoop:service=HBase,name=RegionServer,sub=WAL#AppendSize_num_ops * AppendSize_mean</i>
append max size | hbase.rs.wal.appends.size.max | Max | Long | <i>Hadoop:service=HBase,name=RegionServer,sub=WAL#AppendSize_max</i>
append min time | hbase.rs.wal.appends.time.min | Min | Long | <i>Hadoop:service=HBase,name=RegionServer,sub=WAL#AppendTime_min</i>
appends | hbase.rs.wal.appends | Sum | Long | Count of appends to the log.<br/><i>Hadoop:service=HBase,name=RegionServer,sub=WAL#AppendSize_num_ops</i>
sync max time | hbase.rs.wal.syncs.time.max | Max | Long | <i>Hadoop:service=HBase,name=RegionServer,sub=WAL#SyncTime_max</i>
appends | hbase.rs.wal.appends | Sum | Long | Count of appends to the log.<br/><i>Hadoop:service=HBase,name=RegionServer,sub=WAL#AppendSize_num_ops</i>
append min size | hbase.rs.wal.appends.size.min | Min | Long | <i>Hadoop:service=HBase,name=RegionServer,sub=WAL#AppendSize_min</i>
sync min time | hbase.rs.wal.syncs.time.min | Min | Long | <i>Hadoop:service=HBase,name=RegionServer,sub=WAL#SyncTime_min</i>
slow appends | hbase.rs.wal.appends.slow | Sum | Long | Number of appends that were slow.<br/><i>Hadoop:service=HBase,name=RegionServer,sub=WAL#slowAppendCount</i>
compaction queue | hbase.rs.compaction.queue | Avg | Long | Current depth of the compaction request queue. If increasing, we are falling behind with storefile compaction.<br/><i>Hadoop:service=HBase,name=RegionServer,sub=Server#compactionQueueLength</i>
compacted cells size | hbase.rs.compaction.cells.size | Sum | Long | The total amount of data processed during minor compactions, in bytes.<br/><i>Hadoop:service=HBase,name=RegionServer,sub=Server#compactedCellsSize</i>
updates blocked time | hbase.rs.updates.blocked.time | Sum | Long | Number of MS updates have been blocked so that the memstore can be flushed.<br/><i>Hadoop:service=HBase,name=RegionServer,sub=Server#updatesBlockedTime</i>
major compacted cells | hbase.rs.compaction.major.cells | Sum | Long | The number of cells processed during major compactions.<br/><i>Hadoop:service=HBase,name=RegionServer,sub=Server#majorCompactedCellsCount</i>
flush queue | hbase.rs.compaction.queue.size | Avg | Long | Length of the queue for region flushes.If increasing, we are falling behind with clearing memstores out to HDFS.<br/><i>Hadoop:service=HBase,name=RegionServer,sub=Server#flushQueueLength</i>
compacted cells | hbase.rs.compaction.cells | Sum | Long | The number of cells processed during minor compactions.<br/><i>Hadoop:service=HBase,name=RegionServer,sub=Server#compactedCellsCount</i>
flushed cells | hbase.rs.flushes.cells | Sum | Long | The number of cells flushed to disk.<br/><i>Hadoop:service=HBase,name=RegionServer,sub=Server#flushedCellsCount</i>
flushed cells size | hbase.rs.flushes.cells.size | Sum | Long | The total amount of data flushed to disk, in bytes.<br/><i>Hadoop:service=HBase,name=RegionServer,sub=Server#flushedCellsSize</i>
major compacted cells size | hbase.rs.compaction.major.cells.size | Sum | Long | The total amount of data processed during major compactions, in bytes.<br/><i>Hadoop:service=HBase,name=RegionServer,sub=Server#majorCompactedCellsSize</i>
assign min time | hbase.master.assigns.time.min | Min | Long | <i>Hadoop:service=HBase,name=Master,sub=AssignmentManger#Assign_min</i>
rit count over threshold | hbase.master.rit.count.overthreshold | Avg | Long | The number of regions that have been in transition longer than a threshold time (default: 60 seconds).<br/><i>Hadoop:service=HBase,name=Master,sub=AssignmentManger#ritCountOverThreshold</i>
rit count | hbase.master.rit.count | Avg | Long | The number of regions in transition.<br/><i>Hadoop:service=HBase,name=Master,sub=AssignmentManger#ritCount</i>
assigns | hbase.master.assigns | Sum | Long | <i>Hadoop:service=HBase,name=Master,sub=AssignmentManger#Assign_num_ops</i>
assign time | hbase.master.assigns.time | Sum | Double | <i>Hadoop:service=HBase,name=Master,sub=AssignmentManger#Assign_mean * Assign_num_ops</i>
bulk assign time | hbase.master.assigns.bulk.time | Sum | Double | <i>Hadoop:service=HBase,name=Master,sub=AssignmentManger#BulkAssign_mean * BulkAssign_num_ops</i>
rit oldest age | hbase.master.rit.oldest | Max | Long | The age of the longest region in transition.<br/><i>Hadoop:service=HBase,name=Master,sub=AssignmentManger#ritOldestAge</i>
bulk assign max time | hbase.master.assigns.bulk.time.max | Max | Long | <i>Hadoop:service=HBase,name=Master,sub=AssignmentManger#BulkAssign_max</i>
assign max time | hbase.master.assigns.time.max | Max | Long | <i>Hadoop:service=HBase,name=Master,sub=AssignmentManger#Assign_max</i>
bulk assign min time | hbase.master.assigns.bulk.time.min | Min | Long | <i>Hadoop:service=HBase,name=Master,sub=AssignmentManger#BulkAssign_min</i>
bulk assigns | hbase.master.assigns.bulk | Sum | Long | <i>Hadoop:service=HBase,name=Master,sub=AssignmentManger#BulkAssign_num_ops</i>
increment time | hbase.rs.ops.increments.time | Sum | Double | <i>Hadoop:service=HBase,name=RegionServer,sub=Server#Increment_num_ops * Increment_mean</i>
slow_puts | hbase.rs.ops.puts.slow | Sum | Long | The number of Puts that took over 1000ms to complete.<br/><i>Hadoop:service=HBase,name=RegionServer,sub=Server#slowPutCount</i>
get max time | hbase.rs.ops.gets.time.max | Max | Long | <i>Hadoop:service=HBase,name=RegionServer,sub=Server#Get_max</i>
append time | hbase.rs.ops.appends.time | Sum | Double | <i>Hadoop:service=HBase,name=RegionServer,sub=Server#Append_num_ops * Append_mean</i>
deletes | hbase.rs.ops.deletes | Sum | Long | <i>Hadoop:service=HBase,name=RegionServer,sub=Server#Delete_num_ops</i>
replay min time | hbase.rs.ops.replays.time.min | Min | Long | <i>Hadoop:service=HBase,name=RegionServer,sub=Server#Replay_min</i>
mutate min time | hbase.rs.ops.mutates.time.min | Min | Long | <i>Hadoop:service=HBase,name=RegionServer,sub=Server#Mutate_min</i>
get time | hbase.rs.ops.gets.time | Sum | Double | <i>Hadoop:service=HBase,name=RegionServer,sub=Server#Get_num_ops * Get_mean</i>
increment max time | hbase.rs.ops.increments.time.max | Max | Long | <i>Hadoop:service=HBase,name=RegionServer,sub=Server#Increment_max</i>
slow appends | hbase.rs.ops.appends.slow | Sum | Long | The number of Appends that took over 1000ms to complete.<br/><i>Hadoop:service=HBase,name=RegionServer,sub=Server#slowAppendCount</i>
mutate max time | hbase.rs.ops.mutates.time.max | Max | Long | <i>Hadoop:service=HBase,name=RegionServer,sub=Server#Mutate_max</i>
get min time | hbase.rs.ops.gets.time.min | Min | Long | <i>Hadoop:service=HBase,name=RegionServer,sub=Server#Get_min</i>
increments | hbase.rs.ops.increments | Sum | Long | <i>Hadoop:service=HBase,name=RegionServer,sub=Server#Increment_num_ops</i>
replay max time | hbase.rs.ops.replays.time.max | Max | Long | <i>Hadoop:service=HBase,name=RegionServer,sub=Server#Replay_max</i>
delete time | hbase.rs.ops.deletes.time | Sum | Double | <i>Hadoop:service=HBase,name=RegionServer,sub=Server#Delete_num_ops * Delete_mean</i>
slow deletes | hbase.rs.ops.deletes.slow | Sum | Long | The number of Deletes that took over 1000ms to complete.<br/><i>Hadoop:service=HBase,name=RegionServer,sub=Server#slowDeleteCount</i>
delete max time | hbase.rs.ops.deletes.time.max | Max | Long | <i>Hadoop:service=HBase,name=RegionServer,sub=Server#Delete_max</i>
appends | hbase.rs.ops.appends | Sum | Long | <i>Hadoop:service=HBase,name=RegionServer,sub=Server#Append_num_ops</i>
append max time | hbase.rs.ops.append.time.max | Max | Long | <i>Hadoop:service=HBase,name=RegionServer,sub=Server#Append_max</i>
delete min time | hbase.rs.ops.deletes.time.min | Min | Long | <i>Hadoop:service=HBase,name=RegionServer,sub=Server#Delete_min</i>
mutates | hbase.rs.ops.mutates | Sum | Long | <i>Hadoop:service=HBase,name=RegionServer,sub=Server#Mutate_num_ops</i>
increment min time | hbase.rs.ops.increments.time.min | Min | Long | <i>Hadoop:service=HBase,name=RegionServer,sub=Server#Increment_min</i>
append min time | hbase.rs.ops.appends.time.min | Min | Long | <i>Hadoop:service=HBase,name=RegionServer,sub=Server#Append_min</i>
replay time | hbase.rs.ops.replays.time | Sum | Double | <i>Hadoop:service=HBase,name=RegionServer,sub=Server#Replay_num_ops * Replay_mean</i>
slow increments | hbase.rs.ops.increments.slow | Sum | Long | The number of Increments that took over 1000ms to complete.<br/><i>Hadoop:service=HBase,name=RegionServer,sub=Server#slowIncrementCount</i>
replays | hbase.rs.ops.replays | Sum | Long | <i>Hadoop:service=HBase,name=RegionServer,sub=Server#Replay_num_ops</i>
gets | hbase.rs.ops.gets | Sum | Long | <i>Hadoop:service=HBase,name=RegionServer,sub=Server#Get_num_ops</i>
slow gets | hbase.rs.ops.gets.slow | Sum | Long | The number of Gets that took over 1000ms to complete.<br/><i>Hadoop:service=HBase,name=RegionServer,sub=Server#slowGetCount</i>
mutate time | hbase.rs.ops.mutates.time | Sum | Double | <i>Hadoop:service=HBase,name=RegionServer,sub=Server#Mutate_num_ops * Mutate_mean</i>
restore max time | hbase.snapshots.restore.time.max | Max | Long | <i>Hadoop:service=HBase,name=Master,sub=Snapshots#SnapshotRestoreTime_max</i>
snapshot time | hbase.snapshots.time | Sum | Double | Time it takes to finish snapshot().<br/><i>Hadoop:service=HBase,name=Master,sub=Snapshots#SnapshotTime_num_ops * SnapshotTime_mean</i>
snapshot max time | hbase.snapshots.time.max | Max | Long | <i>Hadoop:service=HBase,name=Master,sub=Snapshots#SnapshotTime_max</i>
clone time | hbase.snapshots.clone.time | Sum | Double | Time it takes to finish cloneSnapshot().<br/><i>Hadoop:service=HBase,name=Master,sub=Snapshots#SnapshotCloneTime_num_ops * SnapshotCloneTime_mean</i>
snapshots | hbase.snapshots | Sum | Long | Count of snapshot() invocations.<br/><i>Hadoop:service=HBase,name=Master,sub=Snapshots#SnapshotTime_num_ops</i>
restores | hbase.snapshots.restores | Sum | Long | Count of restoreSnapshot() invocations.<br/><i>Hadoop:service=HBase,name=Master,sub=Snapshots#SnapshotRestoreTime_num_ops</i>
clone min time | hbase.snapshots.clone.time.min | Min | Long | <i>Hadoop:service=HBase,name=Master,sub=Snapshots#SnapshotCloneTime_min</i>
clones | hbase.snapshots.clones | Sum | Long | Count of cloneSnapshot() invocations.<br/><i>Hadoop:service=HBase,name=Master,sub=Snapshots#SnapshotCloneTime_num_ops</i>
snapshot min time | hbase.snapshots.time.min | Min | Long | <i>Hadoop:service=HBase,name=Master,sub=Snapshots#SnapshotTime_min</i>
clone max time | hbase.snapshots.clone.time.max | Max | Long | <i>Hadoop:service=HBase,name=Master,sub=Snapshots#SnapshotCloneTime_max</i>
restore time | hbase.snapshots.restore.time | Sum | Double | Time it takes to finish restoreSnapshot().<br/><i>Hadoop:service=HBase,name=Master,sub=Snapshots#SnapshotRestoreTime_num_ops * SnapshotRestoreTime_mean</i>
restore min time | hbase.snapshots.restore.time.min | Min | Long | <i>Hadoop:service=HBase,name=Master,sub=Snapshots#SnapshotRestoreTime_min</i>
meta hlog split max size | hbase.master.hlog.meta.splits.size.max | Max | Long | <i>Hadoop:service=HBase,name=Master,sub=FileSystem#MetaHlogSplitSize_max</i>
hlog split size | hbase.master.meta.splits.size | Sum | Double | Size of HLog files being split.<br/><i>Hadoop:service=HBase,name=Master,sub=FileSystem#HlogSplitSize_num_ops * HlogSplitSize_mean</i>
hlog split min time | hbase.master.hlog.splits.time.min | Min | Long | <i>Hadoop:service=HBase,name=Master,sub=FileSystem#HlogSplitTime_min</i>
hlog split max size | hbase.master.hlog.splits.size.max | Max | Long | <i>Hadoop:service=HBase,name=Master,sub=FileSystem#HlogSplitSize_max</i>
hlog splits | hbase.master.hlog.splits | Sum | Long | Count of HLog.splitLog() invocations.<br/><i>Hadoop:service=HBase,name=Master,sub=FileSystem#HlogSplitTime_num_ops</i>
meta hlog split time | hbase.master.hlog.meta.splits.time | Sum | Double | Time it takes to finish splitMetaLog().<br/><i>Hadoop:service=HBase,name=Master,sub=FileSystem#MetaHlogSplitTime_num_ops * MetaHlogSplitTime_mean</i>
meta hlog split max time | hbase.master.hlog.meta.splits.time.max | Max | Long | <i>Hadoop:service=HBase,name=Master,sub=FileSystem#MetaHlogSplitTime_max</i>
hlog split time | hbase.master.hlog.splits.time | Sum | Double | Time it takes to finish HLog.splitLog().<br/><i>Hadoop:service=HBase,name=Master,sub=FileSystem#HlogSplitTime_num_ops * HlogSplitTime_mean</i>
hlog split min size | hbase.master.hlog.splits.size.min | Min | Long | <i>Hadoop:service=HBase,name=Master,sub=FileSystem#HlogSplitSize_min</i>
meta hlog splits | hbase.master.hlog.meta.splits | Sum | Long | Count of splitMetaLog() invocations.<br/><i>Hadoop:service=HBase,name=Master,sub=FileSystem#MetaHlogSplitSize_num_ops</i>
meta hlog split min size | hbase.master.hlog.meta.splits.size.min | Min | Long | <i>Hadoop:service=HBase,name=Master,sub=FileSystem#MetaHlogSplitSize_min</i>
meta hlog split min time | hbase.master.hlog.meta.splits.time.min | Min | Long | <i>Hadoop:service=HBase,name=Master,sub=FileSystem#MetaHlogSplitTime_min</i>
meta hlog splits | hbase.master.hlog.meta.splits | Sum | Long | Count of splitMetaLog() invocations.<br/><i>Hadoop:service=HBase,name=Master,sub=FileSystem#MetaHlogSplitTime_num_ops</i>
hlog split max time | hbase.master.hlog.splits.time.max | Max | Long | <i>Hadoop:service=HBase,name=Master,sub=FileSystem#HlogSplitTime_max</i>
hlog splits | hbase.master.hlog.splits | Sum | Long | Count of HLog.splitLog() invocations.<br/><i>Hadoop:service=HBase,name=Master,sub=FileSystem#HlogSplitSize_num_ops</i>
meta hlog split size | hbase.master.hlog.meta.splits.size | Sum | Double | Size of hbase:meta HLog files being split.<br/><i>Hadoop:service=HBase,name=Master,sub=FileSystem#MetaHlogSplitSize_num_ops * MetaHlogSplitSize_mean</i>
lower limit | hbase.rs.memstore.size.limit.lower | Avg | Long | Property 'hbase.regionserver.global.memstore.lowerLimit' value.
static bloom size | hbase.rs.static.bloom.size | Avg | Long | Uncompressed size of the static bloom filters.<br/><i>Hadoop:service=HBase,name=RegionServer,sub=Server#staticBloomSize</i>
store files | hbase.rs.stores.files | Avg | Long | Number of Store Files.<br/><i>Hadoop:service=HBase,name=RegionServer,sub=Server#storeFileCount</i>
store file index size | hbase.rs.stores.index.size | Avg | Long | Size of indexes in storefiles on disk.<br/><i>Hadoop:service=HBase,name=RegionServer,sub=Server#storeFileIndexSize</i>
store file size | hbase.rs.stores.files.size | Avg | Long | Size of storefiles being served.<br/><i>Hadoop:service=HBase,name=RegionServer,sub=Server#storeFileSize</i>
mem store size | hbase.rs.memstore.size | Avg | Long | Size of the memstore.<br/><i>Hadoop:service=HBase,name=RegionServer,sub=Server#memStoreSize
static index size | hbase.rs.static.index.size | Avg | Long | Uncompressed size of the static indexes.<br/><i>Hadoop:service=HBase,name=RegionServer,sub=Server#staticIndexSize</i>
upper limit | hbase.rs.memstore.size.limit.upper | Avg | Long | Property 'hbase.regionserver.global.memstore.upperLimit' value.
stores | hbase.rs.stores | Avg | Long | Number of Stores.<br/><i>Hadoop:service=HBase,name=RegionServer,sub=Server#storeCount</i>
regions | hbase.rs.regions | Avg | Long | Number of regions.<br/><i>Hadoop:service=HBase,name=RegionServer,sub=Server#regionCount</i>
active handlers | hbase.ipc.handlers.active | Avg | Long | Number of active rpc handlers.<br/><i>Hadoop:service=HBase,name=IPC,sub=IPC#numActiveHandler</i>
process call time | hbase.ipc.handlers.process.calls.time | Sum | Double | <i>Hadoop:service=HBase,name=IPC,sub=IPC#ProcessCallTime_mean * ProcessCallTime_num_ops</i>
process call min time | hbase.ipc.process.call.time.min | Min | Long | <i>Hadoop:service=HBase,name=IPC,sub=IPC#ProcessCallTime_min</i>
calls in priority queue | hbase.ipc.queue.priority.size | Avg | Long | The number of currently enqueued priority (internal housekeeping) requests.<br/><i>Hadoop:service=HBase,name=IPC,sub=IPC#numCallsInPriorityQueue</i>
authorization successes | hbase.ipc.authorization.successes | Sum | Long | Number of authorization successes.<br/><i>Hadoop:service=HBase,name=IPC,sub=IPC#authorizationSuccesses</i>
received bytes | hbase.ipc.bytes.received | Sum | Long | Number of bytes received.<br/><i>Hadoop:service=HBase,name=IPC,sub=IPC#receivedBytes</i>
sent bytes | hbase.ipc.bytes.sent | Sum | Long | Number of bytes sent.<br/><i>Hadoop:service=HBase,name=IPC,sub=IPC#sentBytes</i>
authorization failures | hbase.ipc.authorization.failures | Sum | Long | Number of authorization failures.<br/><i>Hadoop:service=HBase,name=IPC,sub=IPC#authorizationFailures</i>
process call max time | hbase.ipc.process.call.time.max | Max | Long | <i>Hadoop:service=HBase,name=IPC,sub=IPC#ProcessCallTime_max</i>
calls in replication queue | hbase.ipc.queue.replication.size | Avg | Long | Number of calls in the replication call queue.<br/><i>Hadoop:service=HBase,name=IPC,sub=IPC#numCallsInReplicationQueue</i>
process calls | hbase.ipc.handlers.process.calls | Sum | Long | <i>Hadoop:service=HBase,name=IPC,sub=IPC#ProcessCallTime_num_ops</i>
calls in general queue | hbase.ipc.queue.size | Avg | Long | The number of currently enqueued user requests.<br/><i>Hadoop:service=HBase,name=IPC,sub=IPC#numCallsInGeneralQueue</i>
queue call time | hbase.ipc.handlers.queue.calls.time | Sum | Double | <i>Hadoop:service=HBase,name=IPC,sub=IPC#QueueCallTime_mean * QueueCallTime_num_ops</i>
queue call min time | hbase.ipc.queue.call.time.min | Min | Long | <i>Hadoop:service=HBase,name=IPC,sub=IPC#QueueCallTime_min</i>
queue call max time | hbase.ipc.queue.call.time.max | Max | Long | <i>Hadoop:service=HBase,name=IPC,sub=IPC#QueueCallTime_max</i>
queue size | hbase.ipc.queue.bytes | Avg | Long | Number of bytes in the call queues.<br/><i>Hadoop:service=HBase,name=IPC,sub=IPC#queueSize</i>
authentication failures | hbase.ipc.authentication.failures | Sum | Long | Number of authentication failures.<br/><i>Hadoop:service=HBase,name=IPC,sub=IPC#authenticationFailures</i>
queue calls | hbase.ipc.handlers.queue.calls | Sum | Long | <i>Hadoop:service=HBase,name=IPC,sub=IPC#QueueCallTime_num_ops</i>
open connections | hbase.ipc.connections.open | Avg | Long | The number of open connections at the RPC layer.<br/><i>Hadoop:service=HBase,name=IPC,sub=IPC#numOpenConnections</i>
authentication successes | hbase.ipc.authentication.successes | Sum | Long | Number of authentication successes.<br/><i>Hadoop:service=HBase,name=IPC,sub=IPC#authenticationSuccesses</i>
total requests | hbase.rs.requests | Sum | Long | Total number of requests this RegionServer has answered.<br/><i>Hadoop:service=HBase,name=RegionServer,sub=Server#totalRequestCount</i>
read requests | hbase.rs.requests.read | Sum | Long | <i>Hadoop:service=HBase,name=RegionServer,sub=Server#readRequestCount</i>
write requests | hbase.rs.requests.write | Sum | Long | <i>Hadoop:service=HBase,name=RegionServer,sub=Server#writeRequestCount</i>
applied ops | hbase.rs.replication.ops.applied | Sum | Long | <i>Hadoop:service=HBase,name=RegionServer,sub=Replication#sink.appliedOps</i>
applied batches | hbase.rs.replication.batches.applied | Sum | Long | <i>Hadoop:service=HBase,name=RegionServer,sub=Replication#sink.appliedBatches</i>
balancer min time | hbase.master.balancer.time.min | Min | Long | <i>Hadoop:service=HBase,name=Master,sub=Balancer#BalancerCluster_min</i>
ops | hbase.master.balancer.ops | Avg | Long | <i>Hadoop:service=HBase,name=Master,sub=Balancer#BalancerCluster_num_ops</i>
time | hbase.master.balancer.time | Sum | Double | <i>Hadoop:service=HBase,name=Master,sub=Balancer#BalancerCluster_num_ops * BalancerCluster_mean</i>
misc invocations | hbase.master.balancer.invocations | Sum | Long | <i>Hadoop:service=HBase,name=Master,sub=Balancer#miscInvocationCount</i>
balancer max time | hbase.master.balancer.time.max | Max | Long | <i>Hadoop:service=HBase,name=Master,sub=Balancer#BalancerCluster_max</i>
flushed cells | hbase.rs.mob.flushes.cells | Sum | Long | The number of mob cells flushed to disk.<br/><i>Hadoop:service=HBase,name=RegionServer,sub=Server#mobFlushedCellsCount</i>
scan cells size | hbase.rs.mob.scan.cells.size | Sum | Long | The total amount of scanned mob cells, in bytes.<br/><i>Hadoop:service=HBase,name=RegionServer,sub=Server#mobScanCellsSize</i>
file cache hits | hbase.rs.mob.cache.files.hits | Avg | Long | The hit percent to the mob file cache.<br/><i>Hadoop:service=HBase,name=RegionServer,sub=Server#mobFileCacheHitPercent</i>
file caches | hbase.rs.mob.cache.files | Avg | Long | The count of cached mob files.<br/><i>Hadoop:service=HBase,name=RegionServer,sub=Server#mobFileCacheCount</i>
compacted into mob cells | hbase.rs.mob.compactions.cells.into | Sum | Long | The number of cells moved to mob during compaction.<br/><i>Hadoop:service=HBase,name=RegionServer,sub=Server#mobCompactedIntoMobCellsCount</i>
file cache accesses | hbase.rs.mob.cache.files.accesses | Sum | Long | The count of accesses to the mob file cache.<br/><i>Hadoop:service=HBase,name=RegionServer,sub=Server#mobFileCacheAccessCount</i>
scan cells | hbase.rs.mob.scan.cells | Sum | Long | The number of scanned mob cells.<br/><i>Hadoop:service=HBase,name=RegionServer,sub=Server#mobScanCellsCount</i>
file cache misses | hbase.rs.mob.cache.files.misses | Sum | Long | The count of misses to the mob file cache.<br/><i>Hadoop:service=HBase,name=RegionServer,sub=Server#mobFileCacheMissCount</i>
compacted from mob cells | hbase.rs.mob.compactions.cells.from | Sum | Long | The number of cells moved from mob during compaction.<br/><i>Hadoop:service=HBase,name=RegionServer,sub=Server#mobCompactedFromMobCellsCount</i>
compacted into mob cells size | hbase.rs.mob.compactions.cells.into.size | Sum | Long | The total amount of cells move to mob during compaction, in bytes.<br/><i>Hadoop:service=HBase,name=RegionServer,sub=Server#mobCompactedIntoMobCellsSize</i>
compacted from mob cells size | hbase.rs.mob.compactions.cells.from.size | Sum | Long | The total amount of cells move from mob during compaction, in bytes.<br/><i>Hadoop:service=HBase,name=RegionServer,sub=Server#mobCompactedFromMobCellsSize</i>
file cache evictions | hbase.rs.mob.cache.files.evictions | Sum | Long | The number of items evicted from the mob file cache.<br/><i>Hadoop:service=HBase,name=RegionServer,sub=Server#mobFileCacheEvictedCount</i>
flushes | hbase.rs.mob.flushes | Sum | Long | The number of the flushes in mob-enabled stores.<br/><i>Hadoop:service=HBase,name=RegionServer,sub=Server#mobFlushCount</i>
flushed cells size | hbase.rs.mob.flushes.cells.size | Sum | Long | The total amount of mob cells flushed to disk, in bytes.<br/><i>Hadoop:service=HBase,name=RegionServer,sub=Server#mobFlushedCellsSize</i>
local files | hbase.rs.files.local | Avg | Long | The percent of HFiles that are stored on the local hdfs data node.<br/><i>Hadoop:service=HBase,name=RegionServer,sub=Server#percentFilesLocal</i>
hlog files | hbase.rs.files.hlog | Avg | Long | The number of write ahead logs not yet archived.<br/><i>Hadoop:service=HBase,name=RegionServer,sub=Server#hlogFileCount</i>
hlog files size | hbase.rs.files.hlog.size | Avg | Long | Size of all HLog Files.<br/><i>Hadoop:service=HBase,name=RegionServer,sub=Server#hlogFileSize</i>
cluster requests | hbase.master.requests | Sum | Long | <i>Hadoop:service=HBase,name=Master,sub=Server#clusterRequests</i>
dead region servers | hbase.master.servers.region.dead | Avg | Double | <i>Hadoop:service=HBase,name=Master,sub=Server#numDeadRegionServers</i>
region servers | hbase.master.servers.region | Avg | Double | <i>Hadoop:service=HBase,name=Master,sub=Server#numRegionServers</i>
average load | hbase.master.load | Avg | Double | <i>Hadoop:service=HBase,name=Master,sub=Server#averageLoad</i>
mutations without wal | hbase.ops.mutates.nowal | Sum | Long | Number of mutations that have been sent by clients with the write ahead logging turned off.<br/><i>Hadoop:service=HBase,name=RegionServer,sub=Server#mutationsWithoutWALCount</i>
mutate failed ops | hbase.ops.mutates.failed | Sum | Long | Number of Check and Mutate calls that failed the checks.<br/><i>Hadoop:service=HBase,name=RegionServer,sub=Server#checkMutateFailedCount</i>
mutate passed ops | hbase.ops.mutates.passed | Sum | Long | Number of Check and Mutate calls that passed the checks.<br/><i>Hadoop:service=HBase,name=RegionServer,sub=Server#checkMutatePassedCount</i>
mutations without wal size | hbase.ops.mutates.nowal.size | Sum | Long | Size of data that has been sent by clients with the write ahead logging turned off.<br/><i>Hadoop:service=HBase,name=RegionServer,sub=Server#mutationsWithoutWALSize</i>
hits | hbase.cache.hits | Sum | Long | Count of the hit on the block cache.<br/><i>Hadoop:service=HBase,name=RegionServer,sub=Server#blockCacheHitCount</i>
express hit% | hbase.cache.hits.express.rate | Avg | Long | The percent of the time that requests with the cache turned on hit the cache.<br/><i>Hadoop:service=HBase,name=RegionServer,sub=Server#blockCacheExpressHitPercent</i>
hit% | hbase.cache.hits.rate | Avg | Long | Percent of block cache requests that are hits.<br/><i>Hadoop:service=HBase,name=RegionServer,sub=Server#blockCountHitPercent</i>
cache free size | hbase.cache.block.free | Avg | Long | Size of the block cache that is not occupied.<br/><i>Hadoop:service=HBase,name=RegionServer,sub=Server#blockCacheFreeSize</i>
block cache size | hbase.cache.block.size | Avg | Long | Size of the block cache.<br/><i>Hadoop:service=HBase,name=RegionServer,sub=Server#blockCacheSize</i>
miss | hbase.cache.misses | Sum | Long | Number of requests for a block that missed the block cache.<br/><i>Hadoop:service=HBase,name=RegionServer,sub=Server#blockCacheMissCount</i>
cache count | hbase.cache.block.count | Avg | Long | Number of block in the block cache.<br/><i>Hadoop:service=HBase,name=RegionServer,sub=Server#blockCacheCount</i>
evictions | hbase.cache.evictions | Sum | Long | Count of the number of blocks evicted from the block cache.<br/><i>Hadoop:service=HBase,name=RegionServer,sub=Server#blockCacheEvictionCount</i>
shipped batches | hbase.rs.replication.batches.shipped | Sum | Long | <i>Hadoop:service=HBase,name=RegionServer,sub=Replication#source.shippedBatches</i>
shipped ops | hbase.rs.replication.ops.shipped | Sum | Long | <i>Hadoop:service=HBase,name=RegionServer,sub=Replication#source.shippedOps</i>
log edits read | hbase.rs.replication.log.edits.read | Sum | Long | <i>Hadoop:service=HBase,name=RegionServer,sub=Replication#source.logEditsRead</i>
log queue | hbase.rs.replication.log.queue | Avg | Long | <i>Hadoop:service=HBase,name=RegionServer,sub=Replication#source.sizeOfLogQueue</i>
shipped bytes | hbase.rs.replication.batches.shipped.size | Sum | Long | <i>Hadoop:service=HBase,name=RegionServer,sub=Replication#source.shippedKBs</i>
log edits filtered | hbase.rs.replication.log.edits.filtered | Sum | Long | <i>Hadoop:service=HBase,name=RegionServer,sub=Replication#source.logEditsFiltered</i>
log read bytes | hbase.rs.replication.log.edits.read.bytes | Sum | Long | <i>Hadoop:service=HBase,name=RegionServer,sub=Replication#source.logReadInBytes</i>
hedged read wins | hbase.reads.hedged.wins | Sum | Long | The number of times we started a hedged read and a hedged read won.<br/><i>Hadoop:service=HBase,name=RegionServer,sub=Server#hedgedReadWins</i>
hedged reads | hbase.reads.hedged | Sum | Long | The number of times we started a hedged read.<br/><i>Hadoop:service=HBase,name=RegionServer,sub=Server#hedgedReads</i>

### 0.94

Metric Name | Key | Agg | Type | Description
--- | --- | --- | --- | ---
stores | hbase.stores | Avg | Long | 
flushes | hbase.flushes | Sum | Long | 
compactions | hbase.compactions | Sum | Long | 
store files | hbase.store.files | Avg | Long | 
store file index size | hbase.store.index.size | Avg | Long | 
sync | hbase.fs.sync.latency.max | Max | Long | 
read | hbase.fs.read.latency.max | Max | Long | 
write | hbase.fs.write.latency.max | Max | Long | 
sync | hbase.fs.sync.latency.min | Min | Long | 
read | hbase.fs.read.latency.min | Min | Long | 
write | hbase.fs.write.latency.min | Min | Long | 
flush queue | hbase.flushes.queue.size | Avg | Double | 
max | hbase.memstore.flushes.time.max | Max | Long | 
min | hbase.flushes.size.min | Min | Long | 
flushes | hbase.memstore.flushes | Sum | Long | 
max | hbase.flushes.size.max | Max | Long | 
memstore size | hbase.memstore.size | Avg | Long | 
min | hbase.memstore.flushes.time.min | Min | Long | 
min | hbase.compactions.time.min | Min | Long | 
max | hbase.compactions.time.max | Max | Long | 
max | hbase.compactions.size.max | Max | Long | 
compactions | hbase.compactions | Sum | Long | 
compaction queue | hbase.compactions.queue.size | Avg | Double | 
min | hbase.compactions.size.min | Min | Long | 
cache size | hbase.cache.block.size | Avg | Long | 
miss count | hbase.cache.block.misses | Sum | Long | 
cache free | hbase.cache.block.free | Avg | Long | 
hit count | hbase.cache.block.hits | Sum | Long | 
block cache count | hbase.cache.block.count | Avg | Long | 
blockCacheHitRatio | hbase.cache.block.hits.ratio | Avg | Long | 
evicted count | hbase.cache.block.evictions | Sum | Long | 
blockCacheHitCachingRatio | hbase.cache.block.caching.hits.ratio | Avg | Long | 
max | hbase.splits.time.max | Max | Long | 
splits | hbase.splits | Sum | Long | 
max | hbase.splits.size.max | Max | Long | 
min | hbase.splits.size.min | Min | Long | 
splits | hbase.splits | Sum | Long | 
regions | hbase.regions | Avg | Long | 
