
## HBase Monitoring

### How do I enable JMX in HBase

Please see [HBase Metrics](http://hbase.apache.org/metrics.html)
page for
instructions.

### Do I need to add a separate SPM Application for each HBase server/node I want to monitor

No, one Application is enough. Think of an SPM "Application" as a
"HBase Cluster". Thus, to monitor N HBase servers that belong to the
same cluster you would create just a single SPM Application and use its
Token in SPM configuration file on all HBase servers that are a part of
this cluster.

### Why don't some HBase metrics graphs have any data

There could be 2 possible reasons:

1.  Some metrics are for RegionServers (HBase slaves), some for HBase
    Master. Thus, if you select the Master node in the UI, graphs that
    contain Slave-specific metrics will be blank and vice-versa.
2.  Different versions of HBase provide different metrics. Thus, if you
    have an older version of HBase, it may not be providing all metrics
    that SPM collects and graphs.

### Which versions of HBase does SPM support

SPM has been tested with HBase 0.90, 0.92, 0.94, and 0.98, but
will work for newer versions, including all CDH
versions.

## Metrics

### Report: HBase JVM

#### Chart: Log
Metric Name | Metric Description
--- | ---
fatal | <i>Hadoop:service=HBase,name=JvmMetrics#LogFatal</i>
error | <i>Hadoop:service=HBase,name=JvmMetrics#LogError</i>
warn | <i>Hadoop:service=HBase,name=JvmMetrics#LogWarn</i>
info | <i>Hadoop:service=HBase,name=JvmMetrics#LogInfo</i>

#### Chart: Threads
Metric Name | Metric Description
--- | ---
new | <i>Hadoop:service=HBase,name=JvmMetrics#ThreadsNew</i>
runnable | <i>Hadoop:service=HBase,name=JvmMetrics#ThreadsRunnable</i>
blocked | <i>Hadoop:service=HBase,name=JvmMetrics#ThreadsBlocked</i>
waiting | <i>Hadoop:service=HBase,name=JvmMetrics#ThreadsWaiting</i>
timed waiting | <i>Hadoop:service=HBase,name=JvmMetrics#ThreadsTimedWaiting</i>
terminated | <i>Hadoop:service=HBase,name=JvmMetrics#ThreadsTerminated</i>

#### Chart: Memory
Metric Name | Metric Description
--- | ---
non heap used | <i>Hadoop:service=HBase,name=JvmMetrics#MemNonHeapUsedM</i>
non heap committed | <i>Hadoop:service=HBase,name=JvmMetrics#MemNonHeapCommittedM</i>
heap used | <i>Hadoop:service=HBase,name=JvmMetrics#MemHeapUsedM</i>
heap committed | <i>Hadoop:service=HBase,name=JvmMetrics#MemHeapCommittedM</i>
non heap max | <i>Hadoop:service=HBase,name=JvmMetrics#MemNonHeapMaxM</i>
heap max | <i>Hadoop:service=HBase,name=JvmMetrics#MemHeapMaxM</i>
total max | <i>Hadoop:service=HBase,name=JvmMetrics#MemMaxM</i>
non heap committed | <i>Hadoop:service=HBase,name=JvmMetrics#MemNonHeapCommittedM</i>
heap committed | <i>Hadoop:service=HBase,name=JvmMetrics#MemHeapCommittedM</i>



### Report: UGI

#### Chart: Login Success & Failure
Metric Name | Metric Description
--- | ---
success ops | <i>Hadoop:service=HBase,name=UgiMetrics#LoginSuccessNumOps</i>
failure ops | <i>Hadoop:service=HBase,name=UgiMetrics#LoginFailureNumOps</i>
success time | <i>Hadoop:service=HBase,name=UgiMetrics#LoginSuccessAvgTime * LoginSuccessNumOps</i>
failure time | <i>Hadoop:service=HBase,name=UgiMetrics#LoginFailureAvgTime * LoginFailureNumOps</i>

#### Chart: Get Groups
Metric Name | Metric Description
--- | ---
ops | <i>Hadoop:service=HBase,name=UgiMetrics#GetGroupsNumOps</i>
time | <i>Hadoop:service=HBase,name=UgiMetrics#v * GetGroupsNumOps</i>



### Report: RS WAL

#### Chart: Sync & Append Ops & Time
Metric Name | Metric Description
--- | ---
syncs | Count of syncs the HLog to HDFS.<br/><i>Hadoop:service=HBase,name=RegionServer,sub=WAL#SyncTime_num_ops</i>
appends | Count of appends to the log.<br/><i>Hadoop:service=HBase,name=RegionServer,sub=WAL#AppendSize_num_ops</i>
sync time | The time it took to sync the HLog to HDFS.<br/><i>Hadoop:service=HBase,name=RegionServer,sub=WAL#SyncTime_num_ops * SyncTime_mean</i>
append time | Time an append to the log took.<br/><i>Hadoop:service=HBase,name=RegionServer,sub=WAL#AppendTime_num_ops * AppendTime_mean</i>

#### Chart: Append Ops & Size
Metric Name | Metric Description
--- | ---
appends | Count of appends to the log.<br/><i>Hadoop:service=HBase,name=RegionServer,sub=WAL#AppendSize_num_ops</i>
append size | Size (in bytes) of the data appended to the HLog.<br/><i>Hadoop:service=HBase,name=RegionServer,sub=WAL#AppendSize_num_ops * AppendSize_mean</i>

#### Chart: Sync & Append Max & Min Time
Metric Name | Metric Description
--- | ---
sync min time | <i>Hadoop:service=HBase,name=RegionServer,sub=WAL#SyncTime_min</i>
sync max time | <i>Hadoop:service=HBase,name=RegionServer,sub=WAL#SyncTime_max</i>
append min time | <i>Hadoop:service=HBase,name=RegionServer,sub=WAL#AppendTime_min</i>
append max time | <i>Hadoop:service=HBase,name=RegionServer,sub=WAL#AppendTime_max</i>
append min size | <i>Hadoop:service=HBase,name=RegionServer,sub=WAL#AppendSize_min</i>
append max size | <i>Hadoop:service=HBase,name=RegionServer,sub=WAL#AppendSize_max</i>

#### Chart: Slow Appends
Metric Name | Metric Description
--- | ---
slow appends | Number of appends that were slow.<br/><i>Hadoop:service=HBase,name=RegionServer,sub=WAL#slowAppendCount</i>
appends | Count of appends to the log.<br/><i>Hadoop:service=HBase,name=RegionServer,sub=WAL#appendCount</i>



### Report: RS Compact & Flush

#### Chart: Flush Queue
Metric Name | Metric Description
--- | ---
flush queue | Length of the queue for region flushes.If increasing, we are falling behind with clearing memstores out to HDFS.<br/><i>Hadoop:service=HBase,name=RegionServer,sub=Server#flushQueueLength</i>

#### Chart: Blocked Updates
Metric Name | Metric Description
--- | ---
updates blocked time | Number of MS updates have been blocked so that the memstore can be flushed.<br/><i>Hadoop:service=HBase,name=RegionServer,sub=Server#updatesBlockedTime</i>

#### Chart: Flush Counts/Size
Metric Name | Metric Description
--- | ---
flushed cells | The number of cells flushed to disk.<br/><i>Hadoop:service=HBase,name=RegionServer,sub=Server#flushedCellsCount</i>
flushed cells size | The total amount of data flushed to disk, in bytes.<br/><i>Hadoop:service=HBase,name=RegionServer,sub=Server#flushedCellsSize</i>

#### Chart: Compaction Queue
Metric Name | Metric Description
--- | ---
compaction queue | Current depth of the compaction request queue. If increasing, we are falling behind with storefile compaction.<br/><i>Hadoop:service=HBase,name=RegionServer,sub=Server#compactionQueueLength</i>

#### Chart: Compaction Counts/Size
Metric Name | Metric Description
--- | ---
compacted cells | The number of cells processed during minor compactions.<br/><i>Hadoop:service=HBase,name=RegionServer,sub=Server#compactedCellsCount</i>
major compacted cells | The number of cells processed during major compactions.<br/><i>Hadoop:service=HBase,name=RegionServer,sub=Server#majorCompactedCellsCount</i>
compacted cells size | The total amount of data processed during minor compactions, in bytes.<br/><i>Hadoop:service=HBase,name=RegionServer,sub=Server#compactedCellsSize</i>
major compacted cells size | The total amount of data processed during major compactions, in bytes.<br/><i>Hadoop:service=HBase,name=RegionServer,sub=Server#majorCompactedCellsSize</i>



### Report: Master Assign Mngr

#### Chart: Assigns Ops & Time
Metric Name | Metric Description
--- | ---
bulk assigns | <i>Hadoop:service=HBase,name=Master,sub=AssignmentManger#BulkAssign_num_ops</i>
assigns | <i>Hadoop:service=HBase,name=Master,sub=AssignmentManger#Assign_num_ops</i>
bulk assign time | <i>Hadoop:service=HBase,name=Master,sub=AssignmentManger#BulkAssign_mean * BulkAssign_num_ops</i>
assign time | <i>Hadoop:service=HBase,name=Master,sub=AssignmentManger#Assign_mean * Assign_num_ops</i>

#### Chart: Regions In Transition
Metric Name | Metric Description
--- | ---
rit oldest age | The age of the longest region in transition.<br/><i>Hadoop:service=HBase,name=Master,sub=AssignmentManger#ritOldestAge</i>
rit count | The number of regions in transition.<br/><i>Hadoop:service=HBase,name=Master,sub=AssignmentManger#ritCount</i>
rit count over threshold | The number of regions that have been in transition longer than a threshold time (default: 60 seconds).<br/><i>Hadoop:service=HBase,name=Master,sub=AssignmentManger#ritCountOverThreshold</i>

#### Chart: Assigns Max & Min Time
Metric Name | Metric Description
--- | ---
bulk assign max time | <i>Hadoop:service=HBase,name=Master,sub=AssignmentManger#BulkAssign_max</i>
bulk assign min time | <i>Hadoop:service=HBase,name=Master,sub=AssignmentManger#BulkAssign_min</i>
assign max time | <i>Hadoop:service=HBase,name=Master,sub=AssignmentManger#Assign_max</i>
assign min time | <i>Hadoop:service=HBase,name=Master,sub=AssignmentManger#Assign_min</i>



### Report: RS Operations

#### Chart: Operation Calls & Time
Metric Name | Metric Description
--- | ---
appends | <i>Hadoop:service=HBase,name=RegionServer,sub=Server#Append_num_ops</i>
deletes | <i>Hadoop:service=HBase,name=RegionServer,sub=Server#Delete_num_ops</i>
mutates | <i>Hadoop:service=HBase,name=RegionServer,sub=Server#Mutate_num_ops</i>
gets | <i>Hadoop:service=HBase,name=RegionServer,sub=Server#Get_num_ops</i>
replays | <i>Hadoop:service=HBase,name=RegionServer,sub=Server#Replay_num_ops</i>
increments | <i>Hadoop:service=HBase,name=RegionServer,sub=Server#Increment_num_ops</i>
append time | <i>Hadoop:service=HBase,name=RegionServer,sub=Server#Append_num_ops * Append_mean</i>
delete time | <i>Hadoop:service=HBase,name=RegionServer,sub=Server#Delete_num_ops * Delete_mean</i>
mutate time | <i>Hadoop:service=HBase,name=RegionServer,sub=Server#Mutate_num_ops * Mutate_mean</i>
get time | <i>Hadoop:service=HBase,name=RegionServer,sub=Server#Get_num_ops * Get_mean</i>
replay time | <i>Hadoop:service=HBase,name=RegionServer,sub=Server#Replay_num_ops * Replay_mean</i>
increment time | <i>Hadoop:service=HBase,name=RegionServer,sub=Server#Increment_num_ops * Increment_mean</i>

#### Chart: Slow Operations
Metric Name | Metric Description
--- | ---
slow deletes | The number of Deletes that took over 1000ms to complete.<br/><i>Hadoop:service=HBase,name=RegionServer,sub=Server#slowDeleteCount</i>
slow increments | The number of Increments that took over 1000ms to complete.<br/><i>Hadoop:service=HBase,name=RegionServer,sub=Server#slowIncrementCount</i>
slow gets | The number of Gets that took over 1000ms to complete.<br/><i>Hadoop:service=HBase,name=RegionServer,sub=Server#slowGetCount</i>
slow appends | The number of Appends that took over 1000ms to complete.<br/><i>Hadoop:service=HBase,name=RegionServer,sub=Server#slowAppendCount</i>
slow_puts | The number of Puts that took over 1000ms to complete.<br/><i>Hadoop:service=HBase,name=RegionServer,sub=Server#slowPutCount</i>

#### Chart: Operation Max & Min Time
Metric Name | Metric Description
--- | ---
append min time | <i>Hadoop:service=HBase,name=RegionServer,sub=Server#Append_min</i>
delete min time | <i>Hadoop:service=HBase,name=RegionServer,sub=Server#Delete_min</i>
mutate min time | <i>Hadoop:service=HBase,name=RegionServer,sub=Server#Mutate_min</i>
get min time | <i>Hadoop:service=HBase,name=RegionServer,sub=Server#Get_min</i>
replay min time | <i>Hadoop:service=HBase,name=RegionServer,sub=Server#Replay_min</i>
increment min time | <i>Hadoop:service=HBase,name=RegionServer,sub=Server#Increment_min</i>
append max time | <i>Hadoop:service=HBase,name=RegionServer,sub=Server#Append_max</i>
delete max time | <i>Hadoop:service=HBase,name=RegionServer,sub=Server#Delete_max</i>
mutate max time | <i>Hadoop:service=HBase,name=RegionServer,sub=Server#Mutate_max</i>
get max time | <i>Hadoop:service=HBase,name=RegionServer,sub=Server#Get_max</i>
replay max time | <i>Hadoop:service=HBase,name=RegionServer,sub=Server#Replay_max</i>
increment max time | <i>Hadoop:service=HBase,name=RegionServer,sub=Server#Increment_max</i>



### Report: Master Snapshot

#### Chart: Snapshot Ops & Time
Metric Name | Metric Description
--- | ---
restores | Count of restoreSnapshot() invocations.<br/><i>Hadoop:service=HBase,name=Master,sub=Snapshots#SnapshotRestoreTime_num_ops</i>
clones | Count of cloneSnapshot() invocations.<br/><i>Hadoop:service=HBase,name=Master,sub=Snapshots#SnapshotCloneTime_num_ops</i>
snapshots | Count of snapshot() invocations.<br/><i>Hadoop:service=HBase,name=Master,sub=Snapshots#SnapshotTime_num_ops</i>
restore time | Time it takes to finish restoreSnapshot().<br/><i>Hadoop:service=HBase,name=Master,sub=Snapshots#SnapshotRestoreTime_num_ops * SnapshotRestoreTime_mean</i>
clone time | Time it takes to finish cloneSnapshot().<br/><i>Hadoop:service=HBase,name=Master,sub=Snapshots#SnapshotCloneTime_num_ops * SnapshotCloneTime_mean</i>
snapshot time | Time it takes to finish snapshot().<br/><i>Hadoop:service=HBase,name=Master,sub=Snapshots#SnapshotTime_num_ops * SnapshotTime_mean</i>

#### Chart: Snapshot Max & Min Time
Metric Name | Metric Description
--- | ---
restore min time | <i>Hadoop:service=HBase,name=Master,sub=Snapshots#SnapshotRestoreTime_min</i>
restore max time | <i>Hadoop:service=HBase,name=Master,sub=Snapshots#SnapshotRestoreTime_max</i>
clone min time | <i>Hadoop:service=HBase,name=Master,sub=Snapshots#SnapshotCloneTime_min</i>
clone max time | <i>Hadoop:service=HBase,name=Master,sub=Snapshots#SnapshotCloneTime_max</i>
snapshot min time | <i>Hadoop:service=HBase,name=Master,sub=Snapshots#SnapshotTime_min</i>
snapshot max time | <i>Hadoop:service=HBase,name=Master,sub=Snapshots#SnapshotTime_max</i>



### Report: Master FS

#### Chart: Split Ops & Time
Metric Name | Metric Description
--- | ---
hlog splits | Count of HLog.splitLog() invocations.<br/><i>Hadoop:service=HBase,name=Master,sub=FileSystem#HlogSplitTime_num_ops</i>
meta hlog splits | Count of splitMetaLog() invocations.<br/><i>Hadoop:service=HBase,name=Master,sub=FileSystem#MetaHlogSplitTime_num_ops</i>
hlog split time | Time it takes to finish HLog.splitLog().<br/><i>Hadoop:service=HBase,name=Master,sub=FileSystem#HlogSplitTime_num_ops * HlogSplitTime_mean</i>
meta hlog split time | Time it takes to finish splitMetaLog().<br/><i>Hadoop:service=HBase,name=Master,sub=FileSystem#MetaHlogSplitTime_num_ops * MetaHlogSplitTime_mean</i>

#### Chart: Split Ops & Size
Metric Name | Metric Description
--- | ---
hlog splits | Count of HLog.splitLog() invocations.<br/><i>Hadoop:service=HBase,name=Master,sub=FileSystem#HlogSplitSize_num_ops</i>
meta hlog splits | Count of splitMetaLog() invocations.<br/><i>Hadoop:service=HBase,name=Master,sub=FileSystem#MetaHlogSplitSize_num_ops</i>
hlog split size | Size of HLog files being split.<br/><i>Hadoop:service=HBase,name=Master,sub=FileSystem#HlogSplitSize_num_ops * HlogSplitSize_mean</i>
meta hlog split size | Size of hbase:meta HLog files being split.<br/><i>Hadoop:service=HBase,name=Master,sub=FileSystem#MetaHlogSplitSize_num_ops * MetaHlogSplitSize_mean</i>

#### Chart: Split Max & Min time
Metric Name | Metric Description
--- | ---
hlog split min time | <i>Hadoop:service=HBase,name=Master,sub=FileSystem#HlogSplitTime_min</i>
hlog split max time | <i>Hadoop:service=HBase,name=Master,sub=FileSystem#HlogSplitTime_max</i>
meta hlog split min time | <i>Hadoop:service=HBase,name=Master,sub=FileSystem#MetaHlogSplitTime_min</i>
meta hlog split max time | <i>Hadoop:service=HBase,name=Master,sub=FileSystem#MetaHlogSplitTime_max</i>
hlog split min size | <i>Hadoop:service=HBase,name=Master,sub=FileSystem#HlogSplitSize_min</i>
hlog split max size | <i>Hadoop:service=HBase,name=Master,sub=FileSystem#HlogSplitSize_max</i>
meta hlog split min size | <i>Hadoop:service=HBase,name=Master,sub=FileSystem#MetaHlogSplitSize_min</i>
meta hlog split max size | <i>Hadoop:service=HBase,name=Master,sub=FileSystem#MetaHlogSplitSize_max</i>



### Report: RS Regions & Stores

#### Chart: Indexes & Bloom Filters
Metric Name | Metric Description
--- | ---
static index size | Uncompressed size of the static indexes.<br/><i>Hadoop:service=HBase,name=RegionServer,sub=Server#staticIndexSize</i>
static bloom size | Uncompressed size of the static bloom filters.<br/><i>Hadoop:service=HBase,name=RegionServer,sub=Server#staticBloomSize</i>

#### Chart: Regions & Stores
Metric Name | Metric Description
--- | ---
regions | Number of regions.<br/><i>Hadoop:service=HBase,name=RegionServer,sub=Server#regionCount</i>
stores | Number of Stores.<br/><i>Hadoop:service=HBase,name=RegionServer,sub=Server#storeCount</i>
store files | Number of Store Files.<br/><i>Hadoop:service=HBase,name=RegionServer,sub=Server#storeFileCount</i>

#### Chart: Store Files
Metric Name | Metric Description
--- | ---
store file size | Size of storefiles being served.<br/><i>Hadoop:service=HBase,name=RegionServer,sub=Server#storeFileSize</i>
store file index size | Size of indexes in storefiles on disk.<br/><i>Hadoop:service=HBase,name=RegionServer,sub=Server#storeFileIndexSize</i>

#### Chart: Mem Stores
Metric Name | Metric Description
--- | ---
mem store size | Size of the memstore.<br/><i>Hadoop:service=HBase,name=RegionServer,sub=Server#memStoreSize
upper limit | Property 'hbase.regionserver.global.memstore.upperLimit' value.
lower limit | Property 'hbase.regionserver.global.memstore.lowerLimit' value.



### Report: IPC

#### Chart: Connections & Handler
Metric Name | Metric Description
--- | ---
open connections | The number of open connections at the RPC layer.<br/><i>Hadoop:service=HBase,name=IPC,sub=IPC#numOpenConnections</i>
active handlers | Number of active rpc handlers.<br/><i>Hadoop:service=HBase,name=IPC,sub=IPC#numActiveHandler</i>

#### Chart: Queue & Process Calls & Times
Metric Name | Metric Description
--- | ---
queue calls | <i>Hadoop:service=HBase,name=IPC,sub=IPC#QueueCallTime_num_ops</i>
process calls | <i>Hadoop:service=HBase,name=IPC,sub=IPC#ProcessCallTime_num_ops</i>
queue call time | <i>Hadoop:service=HBase,name=IPC,sub=IPC#QueueCallTime_mean * QueueCallTime_num_ops</i>
process call time | <i>Hadoop:service=HBase,name=IPC,sub=IPC#ProcessCallTime_mean * ProcessCallTime_num_ops</i>

#### Chart: Authentication & Authorization
Metric Name | Metric Description
--- | ---
authentication failures | Number of authentication failures.<br/><i>Hadoop:service=HBase,name=IPC,sub=IPC#authenticationFailures</i>
authorization failures | Number of authorization failures.<br/><i>Hadoop:service=HBase,name=IPC,sub=IPC#authorizationFailures</i>
authentication successes | Number of authentication successes.<br/><i>Hadoop:service=HBase,name=IPC,sub=IPC#authenticationSuccesses</i>
authorization successes | Number of authorization successes.<br/><i>Hadoop:service=HBase,name=IPC,sub=IPC#authorizationSuccesses</i>

#### Chart: Send & Received Bytes
Metric Name | Metric Description
--- | ---
sent bytes | Number of bytes sent.<br/><i>Hadoop:service=HBase,name=IPC,sub=IPC#sentBytes</i>
received bytes | Number of bytes received.<br/><i>Hadoop:service=HBase,name=IPC,sub=IPC#receivedBytes</i>

#### Chart: Queue
Metric Name | Metric Description
--- | ---
queue size | Number of bytes in the call queues.<br/><i>Hadoop:service=HBase,name=IPC,sub=IPC#queueSize</i>
calls in general queue | The number of currently enqueued user requests.<br/><i>Hadoop:service=HBase,name=IPC,sub=IPC#numCallsInGeneralQueue</i>
calls in replication queue | Number of calls in the replication call queue.<br/><i>Hadoop:service=HBase,name=IPC,sub=IPC#numCallsInReplicationQueue</i>
calls in priority queue | The number of currently enqueued priority (internal housekeeping) requests.<br/><i>Hadoop:service=HBase,name=IPC,sub=IPC#numCallsInPriorityQueue</i>

#### Chart: Queue & Process Max & Min Times
Metric Name | Metric Description
--- | ---
process call min time | <i>Hadoop:service=HBase,name=IPC,sub=IPC#ProcessCallTime_min</i>
queue call min time | <i>Hadoop:service=HBase,name=IPC,sub=IPC#QueueCallTime_min</i>
process call max time | <i>Hadoop:service=HBase,name=IPC,sub=IPC#ProcessCallTime_max</i>
queue call max time | <i>Hadoop:service=HBase,name=IPC,sub=IPC#QueueCallTime_max</i>



### Report: RS Requests

#### Chart: Requests
Metric Name | Metric Description
--- | ---
total requests | Total number of requests this RegionServer has answered.<br/><i>Hadoop:service=HBase,name=RegionServer,sub=Server#totalRequestCount</i>
read requests | Number of read requests this region server has answered.<br/><i>Hadoop:service=HBase,name=RegionServer,sub=Server#readRequestCount</i>
write requests | Number of mutation requests this region server has answered.<br/><i>Hadoop:service=HBase,name=RegionServer,sub=Server#writeRequestCount</i>
read requests | <i>Hadoop:service=HBase,name=RegionServer,sub=Server#readRequestCount</i>
write requests | <i>Hadoop:service=HBase,name=RegionServer,sub=Server#writeRequestCount</i>



### Report: RS Replication

#### Chart: Sink Ops & Batches
Metric Name | Metric Description
--- | ---
applied batches | <i>Hadoop:service=HBase,name=RegionServer,sub=Replication#sink.appliedBatches</i>
applied ops | <i>Hadoop:service=HBase,name=RegionServer,sub=Replication#sink.appliedOps</i>



### Report: Master Balancer

#### Chart: Balancing Min & Max Time
Metric Name | Metric Description
--- | ---
balancer max time | <i>Hadoop:service=HBase,name=Master,sub=Balancer#BalancerCluster_max</i>
balancer min time | <i>Hadoop:service=HBase,name=Master,sub=Balancer#BalancerCluster_min</i>

#### Chart: Balancing Ops & Time
Metric Name | Metric Description
--- | ---
ops | <i>Hadoop:service=HBase,name=Master,sub=Balancer#BalancerCluster_num_ops</i>
time | <i>Hadoop:service=HBase,name=Master,sub=Balancer#BalancerCluster_num_ops * BalancerCluster_mean</i>

#### Chart: Misc Invocations
Metric Name | Metric Description
--- | ---
misc invocations | <i>Hadoop:service=HBase,name=Master,sub=Balancer#miscInvocationCount</i>



### Report: RS MOB

#### Chart: MOB Cache Stats
Metric Name | Metric Description
--- | ---
file cache accesses | The count of accesses to the mob file cache.<br/><i>Hadoop:service=HBase,name=RegionServer,sub=Server#mobFileCacheAccessCount</i>
file cache misses | The count of misses to the mob file cache.<br/><i>Hadoop:service=HBase,name=RegionServer,sub=Server#mobFileCacheMissCount</i>
file cache evictions | The number of items evicted from the mob file cache.<br/><i>Hadoop:service=HBase,name=RegionServer,sub=Server#mobFileCacheEvictedCount</i>
file cache hits | The hit percent to the mob file cache.<br/><i>Hadoop:service=HBase,name=RegionServer,sub=Server#mobFileCacheHitPercent</i>

#### Chart: MOB Compaction Stats
Metric Name | Metric Description
--- | ---
compacted from mob cells | The number of cells moved from mob during compaction.<br/><i>Hadoop:service=HBase,name=RegionServer,sub=Server#mobCompactedFromMobCellsCount</i>
compacted into mob cells | The number of cells moved to mob during compaction.<br/><i>Hadoop:service=HBase,name=RegionServer,sub=Server#mobCompactedIntoMobCellsCount</i>
compacted from mob cells size | The total amount of cells move from mob during compaction, in bytes.<br/><i>Hadoop:service=HBase,name=RegionServer,sub=Server#mobCompactedFromMobCellsSize</i>
compacted into mob cells size | The total amount of cells move to mob during compaction, in bytes.<br/><i>Hadoop:service=HBase,name=RegionServer,sub=Server#mobCompactedIntoMobCellsSize</i>

#### Chart: MOB Cache Files
Metric Name | Metric Description
--- | ---
file caches | The count of cached mob files.<br/><i>Hadoop:service=HBase,name=RegionServer,sub=Server#mobFileCacheCount</i>

#### Chart: MOB Scan Stats
Metric Name | Metric Description
--- | ---
scan cells | The number of scanned mob cells.<br/><i>Hadoop:service=HBase,name=RegionServer,sub=Server#mobScanCellsCount</i>
scan cells size | The total amount of scanned mob cells, in bytes.<br/><i>Hadoop:service=HBase,name=RegionServer,sub=Server#mobScanCellsSize</i>

#### Chart: MOB Flush Stats
Metric Name | Metric Description
--- | ---
flushes | The number of the flushes in mob-enabled stores.<br/><i>Hadoop:service=HBase,name=RegionServer,sub=Server#mobFlushCount</i>
flushed cells | The number of mob cells flushed to disk.<br/><i>Hadoop:service=HBase,name=RegionServer,sub=Server#mobFlushedCellsCount</i>
flushed cells size | The total amount of mob cells flushed to disk, in bytes.<br/><i>Hadoop:service=HBase,name=RegionServer,sub=Server#mobFlushedCellsSize</i>



### Report: RS Files

#### Chart: HLog
Metric Name | Metric Description
--- | ---
hlog files | The number of write ahead logs not yet archived.<br/><i>Hadoop:service=HBase,name=RegionServer,sub=Server#hlogFileCount</i>
hlog files size | Size of all HLog Files.<br/><i>Hadoop:service=HBase,name=RegionServer,sub=Server#hlogFileSize</i>

#### Chart: Local Files
Metric Name | Metric Description
--- | ---
local files | The percent of HFiles that are stored on the local hdfs data node.<br/><i>Hadoop:service=HBase,name=RegionServer,sub=Server#percentFilesLocal</i>



### Report: Master Servers

#### Chart: Region Servers
Metric Name | Metric Description
--- | ---
region servers | <i>Hadoop:service=HBase,name=Master,sub=Server#numRegionServers</i>
dead region servers | <i>Hadoop:service=HBase,name=Master,sub=Server#numDeadRegionServers</i>

#### Chart: Requests & Load
Metric Name | Metric Description
--- | ---
cluster requests | <i>Hadoop:service=HBase,name=Master,sub=Server#clusterRequests</i>
average load | <i>Hadoop:service=HBase,name=Master,sub=Server#averageLoad</i>



### Report: RS Check & Mutate

#### Chart: Check & Mutate Calls
Metric Name | Metric Description
--- | ---
mutate failed ops | Number of Check and Mutate calls that failed the checks.<br/><i>Hadoop:service=HBase,name=RegionServer,sub=Server#checkMutateFailedCount</i>
mutate passed ops | Number of Check and Mutate calls that passed the checks.<br/><i>Hadoop:service=HBase,name=RegionServer,sub=Server#checkMutatePassedCount</i>

#### Chart: Mutations
Metric Name | Metric Description
--- | ---
mutations without wal | Number of mutations that have been sent by clients with the write ahead logging turned off.<br/><i>Hadoop:service=HBase,name=RegionServer,sub=Server#mutationsWithoutWALCount</i>
mutations without wal size | Size of data that has been sent by clients with the write ahead logging turned off.<br/><i>Hadoop:service=HBase,name=RegionServer,sub=Server#mutationsWithoutWALSize</i>



### Report: RS Cache

#### Chart: Cache Blocks
Metric Name | Metric Description
--- | ---
cache count | Number of block in the block cache.<br/><i>Hadoop:service=HBase,name=RegionServer,sub=Server#blockCacheCount</i>
cache free size | Size of the block cache that is not occupied.<br/><i>Hadoop:service=HBase,name=RegionServer,sub=Server#blockCacheFreeSize</i>
block cache size | Size of the block cache.<br/><i>Hadoop:service=HBase,name=RegionServer,sub=Server#blockCacheSize</i>

#### Chart: Cache Stats
Metric Name | Metric Description
--- | ---
hits | Count of the hit on the block cache.<br/><i>Hadoop:service=HBase,name=RegionServer,sub=Server#blockCacheHitCount</i>
miss | Number of requests for a block that missed the block cache.<br/><i>Hadoop:service=HBase,name=RegionServer,sub=Server#blockCacheMissCount</i>
evictions | Count of the number of blocks evicted from the block cache.<br/><i>Hadoop:service=HBase,name=RegionServer,sub=Server#blockCacheEvictionCount</i>
hit% | Percent of block cache requests that are hits.<br/><i>Hadoop:service=HBase,name=RegionServer,sub=Server#blockCountHitPercent</i>
express hit% | The percent of the time that requests with the cache turned on hit the cache.<br/><i>Hadoop:service=HBase,name=RegionServer,sub=Server#blockCacheExpressHitPercent</i>



### Report: RS Replication Src

#### Chart: Log Queue
Metric Name | Metric Description
--- | ---
log queue | <i>Hadoop:service=HBase,name=RegionServer,sub=Replication#source.sizeOfLogQueue</i>

#### Chart: Log Reads
Metric Name | Metric Description
--- | ---
log edits read | <i>Hadoop:service=HBase,name=RegionServer,sub=Replication#source.logEditsRead</i>
log edits filtered | <i>Hadoop:service=HBase,name=RegionServer,sub=Replication#source.logEditsFiltered</i>
log read bytes | <i>Hadoop:service=HBase,name=RegionServer,sub=Replication#source.logReadInBytes</i>

#### Chart: Shipped Ops & Size
Metric Name | Metric Description
--- | ---
shipped batches | <i>Hadoop:service=HBase,name=RegionServer,sub=Replication#source.shippedBatches</i>
shipped ops | <i>Hadoop:service=HBase,name=RegionServer,sub=Replication#source.shippedOps</i>
shipped bytes | <i>Hadoop:service=HBase,name=RegionServer,sub=Replication#source.shippedKBs</i>



### Report: Overview

#### Chart: Requests
Metric Name | Metric Description
--- | ---
total requests | Total number of requests this RegionServer has answered.<br/><i>Hadoop:service=HBase,name=RegionServer,sub=Server#totalRequestCount</i>
read requests | Number of read requests this region server has answered.<br/><i>Hadoop:service=HBase,name=RegionServer,sub=Server#readRequestCount</i>
write requests | Number of mutation requests this region server has answered.<br/><i>Hadoop:service=HBase,name=RegionServer,sub=Server#writeRequestCount</i>

#### Chart: Compaction Queue
Metric Name | Metric Description
--- | ---
compaction queue | Current depth of the compaction request queue. If increasing, we are falling behind with storefile compaction.<br/><i>Hadoop:service=HBase,name=RegionServer,sub=Server#compactionQueueLength</i>

#### Chart: Disk Space Used
Metric Name | Metric Description
--- | ---
used space | 

#### Chart: Mem Stores
Metric Name | Metric Description
--- | ---
mem store size | Size of the memstore.<br/><i>Hadoop:service=HBase,name=RegionServer,sub=Server#memStoreSize
upper limit | Property 'hbase.regionserver.global.memstore.upperLimit' value.
lower limit | Property 'hbase.regionserver.global.memstore.lowerLimit' value.

#### Chart: Region Servers
Metric Name | Metric Description
--- | ---
region servers | <i>Hadoop:service=HBase,name=Master,sub=Server#numRegionServers</i>
dead region servers | <i>Hadoop:service=HBase,name=Master,sub=Server#numDeadRegionServers</i>

#### Chart: Garbage Collectors
Metric Name | Metric Description
--- | ---
collection time | 
collection count | 
avg collection time | 

#### Chart: Flush Queue
Metric Name | Metric Description
--- | ---
flush queue | Length of the queue for region flushes.If increasing, we are falling behind with clearing memstores out to HDFS.<br/><i>Hadoop:service=HBase,name=RegionServer,sub=Server#flushQueueLength</i>

#### Chart: Local Files
Metric Name | Metric Description
--- | ---
local files | The percent of HFiles that are stored on the local hdfs data node.<br/><i>Hadoop:service=HBase,name=RegionServer,sub=Server#percentFilesLocal</i>

#### Chart: CPU
Metric Name | Metric Description
--- | ---
'user' | 
'system' | 
'wait' | 
'interruption' | 
'soft interrupt' | 
'nice' | 
'steal' | 
'idle' | 



### Report: RS Hedged Reads

#### Chart: Hedged Reads
Metric Name | Metric Description
--- | ---
hedged reads | The number of times we started a hedged read.<br/><i>Hadoop:service=HBase,name=RegionServer,sub=Server#hedgedReads</i>
hedged read wins | The number of times we started a hedged read and a hedged read won.<br/><i>Hadoop:service=HBase,name=RegionServer,sub=Server#hedgedReadWins</i>



### Report: HBase Store (0.94)

#### Chart: Stores
Metric Name | Metric Description
--- | ---
stores | 
store files | 

#### Chart: Compaction
Metric Name | Metric Description
--- | ---
compactions | 
avg time | 

#### Chart: StoreFile Index
Metric Name | Metric Description
--- | ---
store file index size | 
store files | 

#### Chart: Memstore Flush
Metric Name | Metric Description
--- | ---
flushes | 
avg time | 



### Report: HBase FS (0.94)

#### Chart: Min Time Latency
Metric Name | Metric Description
--- | ---
read | 
write | 
sync | 

#### Chart: Avg Time Latency
Metric Name | Metric Description
--- | ---
read | 
write | 
sync | 

#### Chart: Max Time Latency
Metric Name | Metric Description
--- | ---
read | 
write | 
sync | 



### Report: HBase Memstore (0.94)

#### Chart: Memstore Size
Metric Name | Metric Description
--- | ---
memstore size | 
memory store upper limit | 
memory store lower limit | 

#### Chart: Memstore Flush Queue
Metric Name | Metric Description
--- | ---
flush queue | 

#### Chart: Memstore Flush Operations
Metric Name | Metric Description
--- | ---
flushes | 
avg time | 

#### Chart: Memstore Flush Size
Metric Name | Metric Description
--- | ---
max | 
avg | 
min | 

#### Chart: Memstore Flush Time
Metric Name | Metric Description
--- | ---
max | 
avg | 
min | 



### Report: HBase Requests (0.94)

#### Chart: HBase Request Rate
Metric Name | Metric Description
--- | ---
request rate | 



### Report: HBase Compactions (0.94)

#### Chart: Compaction Size
Metric Name | Metric Description
--- | ---
max | 
avg | 
min | 

#### Chart: Compaction Operations
Metric Name | Metric Description
--- | ---
compactions | 
avg time | 

#### Chart: Compaction Time
Metric Name | Metric Description
--- | ---
max | 
avg | 
min | 

#### Chart: Compaction Queue
Metric Name | Metric Description
--- | ---
compaction queue | 



### Report: HBase Block Cache (0.94)

#### Chart: Block Cache Hit Ratio
Metric Name | Metric Description
--- | ---
blockCacheHitCachingRatio | 
blockCacheHitRatio | 

#### Chart: Block Cache Size
Metric Name | Metric Description
--- | ---
cache size | 
cache free | 
block cache count | 

#### Chart: Block Cache Operations
Metric Name | Metric Description
--- | ---
evicted count | 
hit count | 
miss count | 



### Report: Split (0.94)

#### Chart: Split Time
Metric Name | Metric Description
--- | ---
max | 
avg | 
min | 

#### Chart: Split Operations
Metric Name | Metric Description
--- | ---
splits | 
avg time | 

#### Chart: Split Size
Metric Name | Metric Description
--- | ---
max | 
avg | 
min | 



### Report: HBase Regions (0.94)

#### Chart: Regions
Metric Name | Metric Description
--- | ---
regions | 

#### Chart: Splits
Metric Name | Metric Description
--- | ---
splits | 
avg time | 

## Metrics HBase 0.94

### Report: HBase Store (0.94)

#### Chart: Stores
Metric Name | Metric Description
--- | ---
stores | 
store files | 

#### Chart: Compaction
Metric Name | Metric Description
--- | ---
compactions | 
avg time | 

#### Chart: StoreFile Index
Metric Name | Metric Description
--- | ---
store file index size | 
store files | 

#### Chart: Memstore Flush
Metric Name | Metric Description
--- | ---
flushes | 
avg time | 



### Report: HBase FS (0.94)

#### Chart: Min Time Latency
Metric Name | Metric Description
--- | ---
read | 
write | 
sync | 

#### Chart: Avg Time Latency
Metric Name | Metric Description
--- | ---
read | 
write | 
sync | 

#### Chart: Max Time Latency
Metric Name | Metric Description
--- | ---
read | 
write | 
sync | 



### Report: HBase Memstore (0.94)

#### Chart: Memstore Size
Metric Name | Metric Description
--- | ---
memstore size | 
memory store upper limit | 
memory store lower limit | 

#### Chart: Memstore Flush Queue
Metric Name | Metric Description
--- | ---
flush queue | 

#### Chart: Memstore Flush Operations
Metric Name | Metric Description
--- | ---
flushes | 
avg time | 

#### Chart: Memstore Flush Size
Metric Name | Metric Description
--- | ---
max | 
avg | 
min | 

#### Chart: Memstore Flush Time
Metric Name | Metric Description
--- | ---
max | 
avg | 
min | 



### Report: HBase Requests (0.94)

#### Chart: HBase Request Rate
Metric Name | Metric Description
--- | ---
request rate | 



### Report: HBase Compactions (0.94)

#### Chart: Compaction Size
Metric Name | Metric Description
--- | ---
max | 
avg | 
min | 

#### Chart: Compaction Operations
Metric Name | Metric Description
--- | ---
compactions | 
avg time | 

#### Chart: Compaction Time
Metric Name | Metric Description
--- | ---
max | 
avg | 
min | 

#### Chart: Compaction Queue
Metric Name | Metric Description
--- | ---
compaction queue | 



### Report: HBase Block Cache (0.94)

#### Chart: Block Cache Hit Ratio
Metric Name | Metric Description
--- | ---
blockCacheHitCachingRatio | 
blockCacheHitRatio | 

#### Chart: Block Cache Size
Metric Name | Metric Description
--- | ---
cache size | 
cache free | 
block cache count | 

#### Chart: Block Cache Operations
Metric Name | Metric Description
--- | ---
evicted count | 
hit count | 
miss count | 



### Report: Split (0.94)

#### Chart: Split Time
Metric Name | Metric Description
--- | ---
max | 
avg | 
min | 

#### Chart: Split Operations
Metric Name | Metric Description
--- | ---
splits | 
avg time | 

#### Chart: Split Size
Metric Name | Metric Description
--- | ---
max | 
avg | 
min | 



### Report: HBase Regions (0.94)

#### Chart: Regions
Metric Name | Metric Description
--- | ---
regions | 

#### Chart: Splits
Metric Name | Metric Description
--- | ---
splits | 
avg time | 


## Metrics HBase 0.98

### Report: HBase JVM

#### Chart: Log
Metric Name | Metric Description
--- | ---
fatal | <i>Hadoop:service=HBase,name=JvmMetrics#LogFatal</i>
error | <i>Hadoop:service=HBase,name=JvmMetrics#LogError</i>
warn | <i>Hadoop:service=HBase,name=JvmMetrics#LogWarn</i>
info | <i>Hadoop:service=HBase,name=JvmMetrics#LogInfo</i>

#### Chart: Threads
Metric Name | Metric Description
--- | ---
new | <i>Hadoop:service=HBase,name=JvmMetrics#ThreadsNew</i>
runnable | <i>Hadoop:service=HBase,name=JvmMetrics#ThreadsRunnable</i>
blocked | <i>Hadoop:service=HBase,name=JvmMetrics#ThreadsBlocked</i>
waiting | <i>Hadoop:service=HBase,name=JvmMetrics#ThreadsWaiting</i>
timed waiting | <i>Hadoop:service=HBase,name=JvmMetrics#ThreadsTimedWaiting</i>
terminated | <i>Hadoop:service=HBase,name=JvmMetrics#ThreadsTerminated</i>

#### Chart: Memory
Metric Name | Metric Description
--- | ---
non heap used | <i>Hadoop:service=HBase,name=JvmMetrics#MemNonHeapUsedM</i>
non heap committed | <i>Hadoop:service=HBase,name=JvmMetrics#MemNonHeapCommittedM</i>
heap used | <i>Hadoop:service=HBase,name=JvmMetrics#MemHeapUsedM</i>
heap committed | <i>Hadoop:service=HBase,name=JvmMetrics#MemHeapCommittedM</i>
non heap max | <i>Hadoop:service=HBase,name=JvmMetrics#MemNonHeapMaxM</i>
heap max | <i>Hadoop:service=HBase,name=JvmMetrics#MemHeapMaxM</i>
total max | <i>Hadoop:service=HBase,name=JvmMetrics#MemMaxM</i>
non heap committed | <i>Hadoop:service=HBase,name=JvmMetrics#MemNonHeapCommittedM</i>
heap committed | <i>Hadoop:service=HBase,name=JvmMetrics#MemHeapCommittedM</i>



### Report: UGI

#### Chart: Login Success & Failure
Metric Name | Metric Description
--- | ---
success ops | <i>Hadoop:service=HBase,name=UgiMetrics#LoginSuccessNumOps</i>
failure ops | <i>Hadoop:service=HBase,name=UgiMetrics#LoginFailureNumOps</i>
success time | <i>Hadoop:service=HBase,name=UgiMetrics#LoginSuccessAvgTime * LoginSuccessNumOps</i>
failure time | <i>Hadoop:service=HBase,name=UgiMetrics#LoginFailureAvgTime * LoginFailureNumOps</i>

#### Chart: Get Groups
Metric Name | Metric Description
--- | ---
ops | <i>Hadoop:service=HBase,name=UgiMetrics#GetGroupsNumOps</i>
time | <i>Hadoop:service=HBase,name=UgiMetrics#v * GetGroupsNumOps</i>



### Report: RS WAL

#### Chart: Sync & Append Ops & Time
Metric Name | Metric Description
--- | ---
syncs | Count of syncs the HLog to HDFS.<br/><i>Hadoop:service=HBase,name=RegionServer,sub=WAL#SyncTime_num_ops</i>
appends | Count of appends to the log.<br/><i>Hadoop:service=HBase,name=RegionServer,sub=WAL#AppendSize_num_ops</i>
sync time | The time it took to sync the HLog to HDFS.<br/><i>Hadoop:service=HBase,name=RegionServer,sub=WAL#SyncTime_num_ops * SyncTime_mean</i>
append time | Time an append to the log took.<br/><i>Hadoop:service=HBase,name=RegionServer,sub=WAL#AppendTime_num_ops * AppendTime_mean</i>

#### Chart: Append Ops & Size
Metric Name | Metric Description
--- | ---
appends | Count of appends to the log.<br/><i>Hadoop:service=HBase,name=RegionServer,sub=WAL#AppendSize_num_ops</i>
append size | Size (in bytes) of the data appended to the HLog.<br/><i>Hadoop:service=HBase,name=RegionServer,sub=WAL#AppendSize_num_ops * AppendSize_mean</i>

#### Chart: Sync & Append Max & Min Time
Metric Name | Metric Description
--- | ---
sync min time | <i>Hadoop:service=HBase,name=RegionServer,sub=WAL#SyncTime_min</i>
sync max time | <i>Hadoop:service=HBase,name=RegionServer,sub=WAL#SyncTime_max</i>
append min time | <i>Hadoop:service=HBase,name=RegionServer,sub=WAL#AppendTime_min</i>
append max time | <i>Hadoop:service=HBase,name=RegionServer,sub=WAL#AppendTime_max</i>
append min size | <i>Hadoop:service=HBase,name=RegionServer,sub=WAL#AppendSize_min</i>
append max size | <i>Hadoop:service=HBase,name=RegionServer,sub=WAL#AppendSize_max</i>

#### Chart: Slow Appends
Metric Name | Metric Description
--- | ---
slow appends | Number of appends that were slow.<br/><i>Hadoop:service=HBase,name=RegionServer,sub=WAL#slowAppendCount</i>
appends | Count of appends to the log.<br/><i>Hadoop:service=HBase,name=RegionServer,sub=WAL#appendCount</i>



### Report: RS Compact & Flush

#### Chart: Flush Queue
Metric Name | Metric Description
--- | ---
flush queue | Length of the queue for region flushes.If increasing, we are falling behind with clearing memstores out to HDFS.<br/><i>Hadoop:service=HBase,name=RegionServer,sub=Server#flushQueueLength</i>

#### Chart: Blocked Updates
Metric Name | Metric Description
--- | ---
updates blocked time | Number of MS updates have been blocked so that the memstore can be flushed.<br/><i>Hadoop:service=HBase,name=RegionServer,sub=Server#updatesBlockedTime</i>

#### Chart: Flush Counts/Size
Metric Name | Metric Description
--- | ---
flushed cells | The number of cells flushed to disk.<br/><i>Hadoop:service=HBase,name=RegionServer,sub=Server#flushedCellsCount</i>
flushed cells size | The total amount of data flushed to disk, in bytes.<br/><i>Hadoop:service=HBase,name=RegionServer,sub=Server#flushedCellsSize</i>

#### Chart: Compaction Queue
Metric Name | Metric Description
--- | ---
compaction queue | Current depth of the compaction request queue. If increasing, we are falling behind with storefile compaction.<br/><i>Hadoop:service=HBase,name=RegionServer,sub=Server#compactionQueueLength</i>

#### Chart: Compaction Counts/Size
Metric Name | Metric Description
--- | ---
compacted cells | The number of cells processed during minor compactions.<br/><i>Hadoop:service=HBase,name=RegionServer,sub=Server#compactedCellsCount</i>
major compacted cells | The number of cells processed during major compactions.<br/><i>Hadoop:service=HBase,name=RegionServer,sub=Server#majorCompactedCellsCount</i>
compacted cells size | The total amount of data processed during minor compactions, in bytes.<br/><i>Hadoop:service=HBase,name=RegionServer,sub=Server#compactedCellsSize</i>
major compacted cells size | The total amount of data processed during major compactions, in bytes.<br/><i>Hadoop:service=HBase,name=RegionServer,sub=Server#majorCompactedCellsSize</i>



### Report: Master Assign Mngr

#### Chart: Assigns Ops & Time
Metric Name | Metric Description
--- | ---
bulk assigns | <i>Hadoop:service=HBase,name=Master,sub=AssignmentManger#BulkAssign_num_ops</i>
assigns | <i>Hadoop:service=HBase,name=Master,sub=AssignmentManger#Assign_num_ops</i>
bulk assign time | <i>Hadoop:service=HBase,name=Master,sub=AssignmentManger#BulkAssign_mean * BulkAssign_num_ops</i>
assign time | <i>Hadoop:service=HBase,name=Master,sub=AssignmentManger#Assign_mean * Assign_num_ops</i>

#### Chart: Regions In Transition
Metric Name | Metric Description
--- | ---
rit oldest age | The age of the longest region in transition.<br/><i>Hadoop:service=HBase,name=Master,sub=AssignmentManger#ritOldestAge</i>
rit count | The number of regions in transition.<br/><i>Hadoop:service=HBase,name=Master,sub=AssignmentManger#ritCount</i>
rit count over threshold | The number of regions that have been in transition longer than a threshold time (default: 60 seconds).<br/><i>Hadoop:service=HBase,name=Master,sub=AssignmentManger#ritCountOverThreshold</i>

#### Chart: Assigns Max & Min Time
Metric Name | Metric Description
--- | ---
bulk assign max time | <i>Hadoop:service=HBase,name=Master,sub=AssignmentManger#BulkAssign_max</i>
bulk assign min time | <i>Hadoop:service=HBase,name=Master,sub=AssignmentManger#BulkAssign_min</i>
assign max time | <i>Hadoop:service=HBase,name=Master,sub=AssignmentManger#Assign_max</i>
assign min time | <i>Hadoop:service=HBase,name=Master,sub=AssignmentManger#Assign_min</i>



### Report: RS Operations

#### Chart: Operation Calls & Time
Metric Name | Metric Description
--- | ---
appends | <i>Hadoop:service=HBase,name=RegionServer,sub=Server#Append_num_ops</i>
deletes | <i>Hadoop:service=HBase,name=RegionServer,sub=Server#Delete_num_ops</i>
mutates | <i>Hadoop:service=HBase,name=RegionServer,sub=Server#Mutate_num_ops</i>
gets | <i>Hadoop:service=HBase,name=RegionServer,sub=Server#Get_num_ops</i>
replays | <i>Hadoop:service=HBase,name=RegionServer,sub=Server#Replay_num_ops</i>
increments | <i>Hadoop:service=HBase,name=RegionServer,sub=Server#Increment_num_ops</i>
append time | <i>Hadoop:service=HBase,name=RegionServer,sub=Server#Append_num_ops * Append_mean</i>
delete time | <i>Hadoop:service=HBase,name=RegionServer,sub=Server#Delete_num_ops * Delete_mean</i>
mutate time | <i>Hadoop:service=HBase,name=RegionServer,sub=Server#Mutate_num_ops * Mutate_mean</i>
get time | <i>Hadoop:service=HBase,name=RegionServer,sub=Server#Get_num_ops * Get_mean</i>
replay time | <i>Hadoop:service=HBase,name=RegionServer,sub=Server#Replay_num_ops * Replay_mean</i>
increment time | <i>Hadoop:service=HBase,name=RegionServer,sub=Server#Increment_num_ops * Increment_mean</i>

#### Chart: Slow Operations
Metric Name | Metric Description
--- | ---
slow deletes | The number of Deletes that took over 1000ms to complete.<br/><i>Hadoop:service=HBase,name=RegionServer,sub=Server#slowDeleteCount</i>
slow increments | The number of Increments that took over 1000ms to complete.<br/><i>Hadoop:service=HBase,name=RegionServer,sub=Server#slowIncrementCount</i>
slow gets | The number of Gets that took over 1000ms to complete.<br/><i>Hadoop:service=HBase,name=RegionServer,sub=Server#slowGetCount</i>
slow appends | The number of Appends that took over 1000ms to complete.<br/><i>Hadoop:service=HBase,name=RegionServer,sub=Server#slowAppendCount</i>
slow_puts | The number of Puts that took over 1000ms to complete.<br/><i>Hadoop:service=HBase,name=RegionServer,sub=Server#slowPutCount</i>

#### Chart: Operation Max & Min Time
Metric Name | Metric Description
--- | ---
append min time | <i>Hadoop:service=HBase,name=RegionServer,sub=Server#Append_min</i>
delete min time | <i>Hadoop:service=HBase,name=RegionServer,sub=Server#Delete_min</i>
mutate min time | <i>Hadoop:service=HBase,name=RegionServer,sub=Server#Mutate_min</i>
get min time | <i>Hadoop:service=HBase,name=RegionServer,sub=Server#Get_min</i>
replay min time | <i>Hadoop:service=HBase,name=RegionServer,sub=Server#Replay_min</i>
increment min time | <i>Hadoop:service=HBase,name=RegionServer,sub=Server#Increment_min</i>
append max time | <i>Hadoop:service=HBase,name=RegionServer,sub=Server#Append_max</i>
delete max time | <i>Hadoop:service=HBase,name=RegionServer,sub=Server#Delete_max</i>
mutate max time | <i>Hadoop:service=HBase,name=RegionServer,sub=Server#Mutate_max</i>
get max time | <i>Hadoop:service=HBase,name=RegionServer,sub=Server#Get_max</i>
replay max time | <i>Hadoop:service=HBase,name=RegionServer,sub=Server#Replay_max</i>
increment max time | <i>Hadoop:service=HBase,name=RegionServer,sub=Server#Increment_max</i>



### Report: Master Snapshot

#### Chart: Snapshot Ops & Time
Metric Name | Metric Description
--- | ---
restores | Count of restoreSnapshot() invocations.<br/><i>Hadoop:service=HBase,name=Master,sub=Snapshots#SnapshotRestoreTime_num_ops</i>
clones | Count of cloneSnapshot() invocations.<br/><i>Hadoop:service=HBase,name=Master,sub=Snapshots#SnapshotCloneTime_num_ops</i>
snapshots | Count of snapshot() invocations.<br/><i>Hadoop:service=HBase,name=Master,sub=Snapshots#SnapshotTime_num_ops</i>
restore time | Time it takes to finish restoreSnapshot().<br/><i>Hadoop:service=HBase,name=Master,sub=Snapshots#SnapshotRestoreTime_num_ops * SnapshotRestoreTime_mean</i>
clone time | Time it takes to finish cloneSnapshot().<br/><i>Hadoop:service=HBase,name=Master,sub=Snapshots#SnapshotCloneTime_num_ops * SnapshotCloneTime_mean</i>
snapshot time | Time it takes to finish snapshot().<br/><i>Hadoop:service=HBase,name=Master,sub=Snapshots#SnapshotTime_num_ops * SnapshotTime_mean</i>

#### Chart: Snapshot Max & Min Time
Metric Name | Metric Description
--- | ---
restore min time | <i>Hadoop:service=HBase,name=Master,sub=Snapshots#SnapshotRestoreTime_min</i>
restore max time | <i>Hadoop:service=HBase,name=Master,sub=Snapshots#SnapshotRestoreTime_max</i>
clone min time | <i>Hadoop:service=HBase,name=Master,sub=Snapshots#SnapshotCloneTime_min</i>
clone max time | <i>Hadoop:service=HBase,name=Master,sub=Snapshots#SnapshotCloneTime_max</i>
snapshot min time | <i>Hadoop:service=HBase,name=Master,sub=Snapshots#SnapshotTime_min</i>
snapshot max time | <i>Hadoop:service=HBase,name=Master,sub=Snapshots#SnapshotTime_max</i>



### Report: Master FS

#### Chart: Split Ops & Time
Metric Name | Metric Description
--- | ---
hlog splits | Count of HLog.splitLog() invocations.<br/><i>Hadoop:service=HBase,name=Master,sub=FileSystem#HlogSplitTime_num_ops</i>
meta hlog splits | Count of splitMetaLog() invocations.<br/><i>Hadoop:service=HBase,name=Master,sub=FileSystem#MetaHlogSplitTime_num_ops</i>
hlog split time | Time it takes to finish HLog.splitLog().<br/><i>Hadoop:service=HBase,name=Master,sub=FileSystem#HlogSplitTime_num_ops * HlogSplitTime_mean</i>
meta hlog split time | Time it takes to finish splitMetaLog().<br/><i>Hadoop:service=HBase,name=Master,sub=FileSystem#MetaHlogSplitTime_num_ops * MetaHlogSplitTime_mean</i>

#### Chart: Split Ops & Size
Metric Name | Metric Description
--- | ---
hlog splits | Count of HLog.splitLog() invocations.<br/><i>Hadoop:service=HBase,name=Master,sub=FileSystem#HlogSplitSize_num_ops</i>
meta hlog splits | Count of splitMetaLog() invocations.<br/><i>Hadoop:service=HBase,name=Master,sub=FileSystem#MetaHlogSplitSize_num_ops</i>
hlog split size | Size of HLog files being split.<br/><i>Hadoop:service=HBase,name=Master,sub=FileSystem#HlogSplitSize_num_ops * HlogSplitSize_mean</i>
meta hlog split size | Size of hbase:meta HLog files being split.<br/><i>Hadoop:service=HBase,name=Master,sub=FileSystem#MetaHlogSplitSize_num_ops * MetaHlogSplitSize_mean</i>

#### Chart: Split Max & Min time
Metric Name | Metric Description
--- | ---
hlog split min time | <i>Hadoop:service=HBase,name=Master,sub=FileSystem#HlogSplitTime_min</i>
hlog split max time | <i>Hadoop:service=HBase,name=Master,sub=FileSystem#HlogSplitTime_max</i>
meta hlog split min time | <i>Hadoop:service=HBase,name=Master,sub=FileSystem#MetaHlogSplitTime_min</i>
meta hlog split max time | <i>Hadoop:service=HBase,name=Master,sub=FileSystem#MetaHlogSplitTime_max</i>
hlog split min size | <i>Hadoop:service=HBase,name=Master,sub=FileSystem#HlogSplitSize_min</i>
hlog split max size | <i>Hadoop:service=HBase,name=Master,sub=FileSystem#HlogSplitSize_max</i>
meta hlog split min size | <i>Hadoop:service=HBase,name=Master,sub=FileSystem#MetaHlogSplitSize_min</i>
meta hlog split max size | <i>Hadoop:service=HBase,name=Master,sub=FileSystem#MetaHlogSplitSize_max</i>



### Report: RS Regions & Stores

#### Chart: Indexes & Bloom Filters
Metric Name | Metric Description
--- | ---
static index size | Uncompressed size of the static indexes.<br/><i>Hadoop:service=HBase,name=RegionServer,sub=Server#staticIndexSize</i>
static bloom size | Uncompressed size of the static bloom filters.<br/><i>Hadoop:service=HBase,name=RegionServer,sub=Server#staticBloomSize</i>

#### Chart: Regions & Stores
Metric Name | Metric Description
--- | ---
regions | Number of regions.<br/><i>Hadoop:service=HBase,name=RegionServer,sub=Server#regionCount</i>
stores | Number of Stores.<br/><i>Hadoop:service=HBase,name=RegionServer,sub=Server#storeCount</i>
store files | Number of Store Files.<br/><i>Hadoop:service=HBase,name=RegionServer,sub=Server#storeFileCount</i>

#### Chart: Store Files
Metric Name | Metric Description
--- | ---
store file size | Size of storefiles being served.<br/><i>Hadoop:service=HBase,name=RegionServer,sub=Server#storeFileSize</i>
store file index size | Size of indexes in storefiles on disk.<br/><i>Hadoop:service=HBase,name=RegionServer,sub=Server#storeFileIndexSize</i>

#### Chart: Mem Stores
Metric Name | Metric Description
--- | ---
mem store size | Size of the memstore.<br/><i>Hadoop:service=HBase,name=RegionServer,sub=Server#memStoreSize
upper limit | Property 'hbase.regionserver.global.memstore.upperLimit' value.
lower limit | Property 'hbase.regionserver.global.memstore.lowerLimit' value.



### Report: IPC

#### Chart: Connections & Handler
Metric Name | Metric Description
--- | ---
open connections | The number of open connections at the RPC layer.<br/><i>Hadoop:service=HBase,name=IPC,sub=IPC#numOpenConnections</i>
active handlers | Number of active rpc handlers.<br/><i>Hadoop:service=HBase,name=IPC,sub=IPC#numActiveHandler</i>

#### Chart: Queue & Process Calls & Times
Metric Name | Metric Description
--- | ---
queue calls | <i>Hadoop:service=HBase,name=IPC,sub=IPC#QueueCallTime_num_ops</i>
process calls | <i>Hadoop:service=HBase,name=IPC,sub=IPC#ProcessCallTime_num_ops</i>
queue call time | <i>Hadoop:service=HBase,name=IPC,sub=IPC#QueueCallTime_mean * QueueCallTime_num_ops</i>
process call time | <i>Hadoop:service=HBase,name=IPC,sub=IPC#ProcessCallTime_mean * ProcessCallTime_num_ops</i>

#### Chart: Authentication & Authorization
Metric Name | Metric Description
--- | ---
authentication failures | Number of authentication failures.<br/><i>Hadoop:service=HBase,name=IPC,sub=IPC#authenticationFailures</i>
authorization failures | Number of authorization failures.<br/><i>Hadoop:service=HBase,name=IPC,sub=IPC#authorizationFailures</i>
authentication successes | Number of authentication successes.<br/><i>Hadoop:service=HBase,name=IPC,sub=IPC#authenticationSuccesses</i>
authorization successes | Number of authorization successes.<br/><i>Hadoop:service=HBase,name=IPC,sub=IPC#authorizationSuccesses</i>

#### Chart: Send & Received Bytes
Metric Name | Metric Description
--- | ---
sent bytes | Number of bytes sent.<br/><i>Hadoop:service=HBase,name=IPC,sub=IPC#sentBytes</i>
received bytes | Number of bytes received.<br/><i>Hadoop:service=HBase,name=IPC,sub=IPC#receivedBytes</i>

#### Chart: Queue
Metric Name | Metric Description
--- | ---
queue size | Number of bytes in the call queues.<br/><i>Hadoop:service=HBase,name=IPC,sub=IPC#queueSize</i>
calls in general queue | The number of currently enqueued user requests.<br/><i>Hadoop:service=HBase,name=IPC,sub=IPC#numCallsInGeneralQueue</i>
calls in replication queue | Number of calls in the replication call queue.<br/><i>Hadoop:service=HBase,name=IPC,sub=IPC#numCallsInReplicationQueue</i>
calls in priority queue | The number of currently enqueued priority (internal housekeeping) requests.<br/><i>Hadoop:service=HBase,name=IPC,sub=IPC#numCallsInPriorityQueue</i>

#### Chart: Queue & Process Max & Min Times
Metric Name | Metric Description
--- | ---
process call min time | <i>Hadoop:service=HBase,name=IPC,sub=IPC#ProcessCallTime_min</i>
queue call min time | <i>Hadoop:service=HBase,name=IPC,sub=IPC#QueueCallTime_min</i>
process call max time | <i>Hadoop:service=HBase,name=IPC,sub=IPC#ProcessCallTime_max</i>
queue call max time | <i>Hadoop:service=HBase,name=IPC,sub=IPC#QueueCallTime_max</i>



### Report: RS Requests

#### Chart: Requests
Metric Name | Metric Description
--- | ---
total requests | Total number of requests this RegionServer has answered.<br/><i>Hadoop:service=HBase,name=RegionServer,sub=Server#totalRequestCount</i>
read requests | Number of read requests this region server has answered.<br/><i>Hadoop:service=HBase,name=RegionServer,sub=Server#readRequestCount</i>
write requests | Number of mutation requests this region server has answered.<br/><i>Hadoop:service=HBase,name=RegionServer,sub=Server#writeRequestCount</i>
read requests | <i>Hadoop:service=HBase,name=RegionServer,sub=Server#readRequestCount</i>
write requests | <i>Hadoop:service=HBase,name=RegionServer,sub=Server#writeRequestCount</i>



### Report: RS Replication

#### Chart: Sink Ops & Batches
Metric Name | Metric Description
--- | ---
applied batches | <i>Hadoop:service=HBase,name=RegionServer,sub=Replication#sink.appliedBatches</i>
applied ops | <i>Hadoop:service=HBase,name=RegionServer,sub=Replication#sink.appliedOps</i>



### Report: Master Balancer

#### Chart: Balancing Min & Max Time
Metric Name | Metric Description
--- | ---
balancer max time | <i>Hadoop:service=HBase,name=Master,sub=Balancer#BalancerCluster_max</i>
balancer min time | <i>Hadoop:service=HBase,name=Master,sub=Balancer#BalancerCluster_min</i>

#### Chart: Balancing Ops & Time
Metric Name | Metric Description
--- | ---
ops | <i>Hadoop:service=HBase,name=Master,sub=Balancer#BalancerCluster_num_ops</i>
time | <i>Hadoop:service=HBase,name=Master,sub=Balancer#BalancerCluster_num_ops * BalancerCluster_mean</i>

#### Chart: Misc Invocations
Metric Name | Metric Description
--- | ---
misc invocations | <i>Hadoop:service=HBase,name=Master,sub=Balancer#miscInvocationCount</i>



### Report: RS MOB

#### Chart: MOB Cache Stats
Metric Name | Metric Description
--- | ---
file cache accesses | The count of accesses to the mob file cache.<br/><i>Hadoop:service=HBase,name=RegionServer,sub=Server#mobFileCacheAccessCount</i>
file cache misses | The count of misses to the mob file cache.<br/><i>Hadoop:service=HBase,name=RegionServer,sub=Server#mobFileCacheMissCount</i>
file cache evictions | The number of items evicted from the mob file cache.<br/><i>Hadoop:service=HBase,name=RegionServer,sub=Server#mobFileCacheEvictedCount</i>
file cache hits | The hit percent to the mob file cache.<br/><i>Hadoop:service=HBase,name=RegionServer,sub=Server#mobFileCacheHitPercent</i>

#### Chart: MOB Compaction Stats
Metric Name | Metric Description
--- | ---
compacted from mob cells | The number of cells moved from mob during compaction.<br/><i>Hadoop:service=HBase,name=RegionServer,sub=Server#mobCompactedFromMobCellsCount</i>
compacted into mob cells | The number of cells moved to mob during compaction.<br/><i>Hadoop:service=HBase,name=RegionServer,sub=Server#mobCompactedIntoMobCellsCount</i>
compacted from mob cells size | The total amount of cells move from mob during compaction, in bytes.<br/><i>Hadoop:service=HBase,name=RegionServer,sub=Server#mobCompactedFromMobCellsSize</i>
compacted into mob cells size | The total amount of cells move to mob during compaction, in bytes.<br/><i>Hadoop:service=HBase,name=RegionServer,sub=Server#mobCompactedIntoMobCellsSize</i>

#### Chart: MOB Cache Files
Metric Name | Metric Description
--- | ---
file caches | The count of cached mob files.<br/><i>Hadoop:service=HBase,name=RegionServer,sub=Server#mobFileCacheCount</i>

#### Chart: MOB Scan Stats
Metric Name | Metric Description
--- | ---
scan cells | The number of scanned mob cells.<br/><i>Hadoop:service=HBase,name=RegionServer,sub=Server#mobScanCellsCount</i>
scan cells size | The total amount of scanned mob cells, in bytes.<br/><i>Hadoop:service=HBase,name=RegionServer,sub=Server#mobScanCellsSize</i>

#### Chart: MOB Flush Stats
Metric Name | Metric Description
--- | ---
flushes | The number of the flushes in mob-enabled stores.<br/><i>Hadoop:service=HBase,name=RegionServer,sub=Server#mobFlushCount</i>
flushed cells | The number of mob cells flushed to disk.<br/><i>Hadoop:service=HBase,name=RegionServer,sub=Server#mobFlushedCellsCount</i>
flushed cells size | The total amount of mob cells flushed to disk, in bytes.<br/><i>Hadoop:service=HBase,name=RegionServer,sub=Server#mobFlushedCellsSize</i>



### Report: RS Files

#### Chart: HLog
Metric Name | Metric Description
--- | ---
hlog files | The number of write ahead logs not yet archived.<br/><i>Hadoop:service=HBase,name=RegionServer,sub=Server#hlogFileCount</i>
hlog files size | Size of all HLog Files.<br/><i>Hadoop:service=HBase,name=RegionServer,sub=Server#hlogFileSize</i>

#### Chart: Local Files
Metric Name | Metric Description
--- | ---
local files | The percent of HFiles that are stored on the local hdfs data node.<br/><i>Hadoop:service=HBase,name=RegionServer,sub=Server#percentFilesLocal</i>



### Report: Master Servers

#### Chart: Region Servers
Metric Name | Metric Description
--- | ---
region servers | <i>Hadoop:service=HBase,name=Master,sub=Server#numRegionServers</i>
dead region servers | <i>Hadoop:service=HBase,name=Master,sub=Server#numDeadRegionServers</i>

#### Chart: Requests & Load
Metric Name | Metric Description
--- | ---
cluster requests | <i>Hadoop:service=HBase,name=Master,sub=Server#clusterRequests</i>
average load | <i>Hadoop:service=HBase,name=Master,sub=Server#averageLoad</i>



### Report: RS Check & Mutate

#### Chart: Check & Mutate Calls
Metric Name | Metric Description
--- | ---
mutate failed ops | Number of Check and Mutate calls that failed the checks.<br/><i>Hadoop:service=HBase,name=RegionServer,sub=Server#checkMutateFailedCount</i>
mutate passed ops | Number of Check and Mutate calls that passed the checks.<br/><i>Hadoop:service=HBase,name=RegionServer,sub=Server#checkMutatePassedCount</i>

#### Chart: Mutations
Metric Name | Metric Description
--- | ---
mutations without wal | Number of mutations that have been sent by clients with the write ahead logging turned off.<br/><i>Hadoop:service=HBase,name=RegionServer,sub=Server#mutationsWithoutWALCount</i>
mutations without wal size | Size of data that has been sent by clients with the write ahead logging turned off.<br/><i>Hadoop:service=HBase,name=RegionServer,sub=Server#mutationsWithoutWALSize</i>



### Report: RS Cache

#### Chart: Cache Blocks
Metric Name | Metric Description
--- | ---
cache count | Number of block in the block cache.<br/><i>Hadoop:service=HBase,name=RegionServer,sub=Server#blockCacheCount</i>
cache free size | Size of the block cache that is not occupied.<br/><i>Hadoop:service=HBase,name=RegionServer,sub=Server#blockCacheFreeSize</i>
block cache size | Size of the block cache.<br/><i>Hadoop:service=HBase,name=RegionServer,sub=Server#blockCacheSize</i>

#### Chart: Cache Stats
Metric Name | Metric Description
--- | ---
hits | Count of the hit on the block cache.<br/><i>Hadoop:service=HBase,name=RegionServer,sub=Server#blockCacheHitCount</i>
miss | Number of requests for a block that missed the block cache.<br/><i>Hadoop:service=HBase,name=RegionServer,sub=Server#blockCacheMissCount</i>
evictions | Count of the number of blocks evicted from the block cache.<br/><i>Hadoop:service=HBase,name=RegionServer,sub=Server#blockCacheEvictionCount</i>
hit% | Percent of block cache requests that are hits.<br/><i>Hadoop:service=HBase,name=RegionServer,sub=Server#blockCountHitPercent</i>
express hit% | The percent of the time that requests with the cache turned on hit the cache.<br/><i>Hadoop:service=HBase,name=RegionServer,sub=Server#blockCacheExpressHitPercent</i>



### Report: RS Replication Src

#### Chart: Log Queue
Metric Name | Metric Description
--- | ---
log queue | <i>Hadoop:service=HBase,name=RegionServer,sub=Replication#source.sizeOfLogQueue</i>

#### Chart: Log Reads
Metric Name | Metric Description
--- | ---
log edits read | <i>Hadoop:service=HBase,name=RegionServer,sub=Replication#source.logEditsRead</i>
log edits filtered | <i>Hadoop:service=HBase,name=RegionServer,sub=Replication#source.logEditsFiltered</i>
log read bytes | <i>Hadoop:service=HBase,name=RegionServer,sub=Replication#source.logReadInBytes</i>

#### Chart: Shipped Ops & Size
Metric Name | Metric Description
--- | ---
shipped batches | <i>Hadoop:service=HBase,name=RegionServer,sub=Replication#source.shippedBatches</i>
shipped ops | <i>Hadoop:service=HBase,name=RegionServer,sub=Replication#source.shippedOps</i>
shipped bytes | <i>Hadoop:service=HBase,name=RegionServer,sub=Replication#source.shippedKBs</i>



### Report: Overview

#### Chart: Requests
Metric Name | Metric Description
--- | ---
total requests | Total number of requests this RegionServer has answered.<br/><i>Hadoop:service=HBase,name=RegionServer,sub=Server#totalRequestCount</i>
read requests | Number of read requests this region server has answered.<br/><i>Hadoop:service=HBase,name=RegionServer,sub=Server#readRequestCount</i>
write requests | Number of mutation requests this region server has answered.<br/><i>Hadoop:service=HBase,name=RegionServer,sub=Server#writeRequestCount</i>

#### Chart: Compaction Queue
Metric Name | Metric Description
--- | ---
compaction queue | Current depth of the compaction request queue. If increasing, we are falling behind with storefile compaction.<br/><i>Hadoop:service=HBase,name=RegionServer,sub=Server#compactionQueueLength</i>

#### Chart: Disk Space Used
Metric Name | Metric Description
--- | ---
used space | 

#### Chart: Mem Stores
Metric Name | Metric Description
--- | ---
mem store size | Size of the memstore.<br/><i>Hadoop:service=HBase,name=RegionServer,sub=Server#memStoreSize
upper limit | Property 'hbase.regionserver.global.memstore.upperLimit' value.
lower limit | Property 'hbase.regionserver.global.memstore.lowerLimit' value.

#### Chart: Region Servers
Metric Name | Metric Description
--- | ---
region servers | <i>Hadoop:service=HBase,name=Master,sub=Server#numRegionServers</i>
dead region servers | <i>Hadoop:service=HBase,name=Master,sub=Server#numDeadRegionServers</i>

#### Chart: Garbage Collectors
Metric Name | Metric Description
--- | ---
collection time | 
collection count | 
avg collection time | 

#### Chart: Flush Queue
Metric Name | Metric Description
--- | ---
flush queue | Length of the queue for region flushes.If increasing, we are falling behind with clearing memstores out to HDFS.<br/><i>Hadoop:service=HBase,name=RegionServer,sub=Server#flushQueueLength</i>

#### Chart: Local Files
Metric Name | Metric Description
--- | ---
local files | The percent of HFiles that are stored on the local hdfs data node.<br/><i>Hadoop:service=HBase,name=RegionServer,sub=Server#percentFilesLocal</i>

#### Chart: CPU
Metric Name | Metric Description
--- | ---
'user' | 
'system' | 
'wait' | 
'interruption' | 
'soft interrupt' | 
'nice' | 
'steal' | 
'idle' | 



### Report: RS Hedged Reads

#### Chart: Hedged Reads
Metric Name | Metric Description
--- | ---
hedged reads | The number of times we started a hedged read.<br/><i>Hadoop:service=HBase,name=RegionServer,sub=Server#hedgedReads</i>
hedged read wins | The number of times we started a hedged read and a hedged read won.<br/><i>Hadoop:service=HBase,name=RegionServer,sub=Server#hedgedReadWins</i>


