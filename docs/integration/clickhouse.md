title: ClickHouse Monitoring Integration
description: Comprehensive view of your database’s health and performance with Sematext ClickHouse monitoring integration. Our ClickHouse integration provides support to monitor ClickHouse current metrics, profile events, asynchronous metrics, database/table level replication and replica metrics.

## Integration

- Instructions: [https://apps.sematext.com/ui/howto/ClickHouse/overview](https://apps.sematext.com/ui/howto/ClickHouse/overview)

## More about ClickHouse Monitoring
* [Key Metrics for Monitoring ClickHouse](https://sematext.com/blog/clickhouse-monitoring-key-metrics/)
* [ClickHouse Monitoring Tools](https://sematext.com/blog/clickhouse-monitoring-tools/)
* [Monitoring ClickHouse with Sematext](https://sematext.com/blog/clickhouse-monitoring-sematext/)

## Metrics

Metric Name<br> Key *(Type)* *(Unit)*                                                                             |  Description
------------------------------------------------------------------------------------------------------------------|--------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------
Max relative replica queue delay<br>**clickhouse.repl.queue.delay.relative.max** <br>*(double gauge)* *(ms)*      |  Relative delay is the maximum difference of absolute delay from any other replica
Max absolute replica queue delay<br>**clickhouse.repl.queue.delay.absolute.max** <br>*(double gauge)* *(ms)*      |  Maximum replica queue delay relative to current time
Max active part count<br>**clickhouse.part.count.max** <br>*(double gauge)*                                       |  Maximum number of active parts in partitions
Mark cache size<br>**clickhouse.cache.mark.size** <br>*(double gauge)* *(bytes)*                                  |  Mark cache - Cache of 'marks' for StorageMergeTree. Marks is an index structure that addresses ranges in column file, corresponding to ranges of primary key
Heap size<br>**clickhouse.heap.size** <br>*(double gauge)* *(bytes)*                                              |  Number of bytes in the heap (current_allocated_bytes + fragmentation + freed memory regions)
Current allocated memory<br>**clickhouse.current.allocated.bytes** <br>*(double gauge)* *(bytes)*                 |  Number of bytes currently allocated by application
Allocated bytes<br>**clickhouse.dict.allocated.bytes** <br>*(long gauge)* *(bytes)*                               |  The amount of memory used by the dictionary.
Element count<br>**clickhouse.dict.element.count** <br>*(long gauge)*                                             |  The number of items stored in the dictionary.
Load factor<br>**clickhouse.dict.load.factor** <br>*(double gauge)*                                               |  The filled percentage (0.0 - 1.0) of the dictionary (for a hashed dictionary, it is the filled percentage of the hash table).
Total query count<br>**clickhouse.query.count** <br>*(long counter)*                                              |  Total number of queries started to be interpreted and may be executed.
Select query count<br>**clickhouse.query.select.count** <br>*(long counter)*                                      |  Number of SELECT queries started to be interpreted and may be executed.
Insert query count<br>**clickhouse.query.insert.count** <br>*(long counter)*                                      |  Number of INSERT queries started to be interpreted and may be executed.
Failed file opens<br>**clickhouse.file.open.failed** <br>*(long counter)*                                         |
Read buffer failed file reads<br>**clickhouse.buffer.read.fd.failed** <br>*(long counter)*                        |  Number of times the read (read/pread) from a file descriptor has failed.
Write buffer failed file writes<br>**clickhouse.buffer.write.fd.failed** <br>*(long counter)*                     |  Number of times the write (write/pwrite) to a file descriptor has failed.
Inserted rows<br>**clickhouse.insert.rows** <br>*(long counter)*                                                  |  Number of rows inserted to all tables.
Inserted bytes<br>**clickhouse.insert.bytes** <br>*(long counter)* *(bytes)*                                      |  Number of uncompressed bytes inserted to all tables.
Merged rows<br>**clickhouse.merge.rows** <br>*(long counter)*                                                     |  Rows read for background merges. This is the number of rows before merge.
Mark cache hits<br>**clickhouse.cache.mark.hits** <br>*(long counter)*                                            |  Mark cache - Cache of 'marks' for merge tree storage engine. Marks is an index structure that addresses ranges in column file, corresponding to ranges of primary key
Mark cache misses<br>**clickhouse.cache.mark.misses** <br>*(long counter)*                                        |  Mark cache - Cache of 'marks' for merge tree storage engine. Marks is an index structure that addresses ranges in column file, corresponding to ranges of primary key
Replicated part fetches<br>**clickhouse.repl.part.fetches** <br>*(long counter)*                                  |  Number of times a data part was downloaded from the replica of a ReplicatedMergeTree table.
Failed replicated part fetches<br>**clickhouse.repl.part.fetches.failed** <br>*(long counter)*                    |
Obsolete replicated parts<br>**clickhouse.repl.part.obsolete** <br>*(long counter)*                               |  Replicated parts that are replaced/rendered obsolete by fetching new parts.
Replicated part merges<br>**clickhouse.repl.part.merge.count** <br>*(long counter)*                               |
Fetches of merged replicated parts<br>**clickhouse.repl.part.fetches.merged** <br>*(long counter)*                |  Number of times the system prefers to download already merged part from the replica of ReplicatedMergeTree table.
Replicated part checks<br>**clickhouse.repl.part.checks** <br>*(long counter)*                                    |
Failed replicated part checks<br>**clickhouse.repl.part.checks.failed** <br>*(long counter)*                      |
Lost replicated parts<br>**clickhouse.repl.part.lost** <br>*(long counter)*                                       |  Replicated parts lost forever (possible if on all the replicas where the part was, is deteriorated), detected during part checks.
Distributed Connection Retries<br>**clickhouse.connection.dist.retries** <br>*(long counter)*                     |  Count of connection retries in replicated DB connection pool
Distributed Connection Fails<br>**clickhouse.connection.dist.fails** <br>*(long counter)*                         |  Count of connection failures after all retries in replicated DB connection pool
Uncompressed bytes merged<br>**clickhouse.merge.bytes.uncompressed** <br>*(long counter)* *(bytes)*               |  Uncompressed bytes that was read for background merges. This is the number before merge.
Merge time<br>**clickhouse.merge.time** <br>*(long counter)* *(ms)*                                               |  Total time spent for background merges.
RW Lock acquired read locks<br>**clickhouse.lock.rw.acquired.reads** <br>*(long counter)*                         |  Count of acquired read locks on table storage. RW locks are used to control concurrent access to table structure and data
RW Lock reader wait time<br>**clickhouse.lock.rw.reader.wait.time** <br>*(long counter)* *(ms)*                   |  Total time waited to get read locks on table storage. RW locks are used to control concurrent access to table structure and data
RW Lock acquired write locks<br>**clickhouse.lock.rw.acquired.writes** <br>*(long counter)*                       |  Count of acquired write locks on table. RW locks are used to control concurrent access to table structure
RW Lock write wait time<br>**clickhouse.lock.rw.writer.wait.time** <br>*(long counter)* *(ms)*                    |  Total time waited to get write locks on table storage. RW locks are used to control concurrent access to table structure
Delayed inserts<br>**clickhouse.insert.delayed** <br>*(long counter)*                                             |  Part inserts that are delayed because the current `Max active part count` is more than `parts_to_delay_insert` setting
Rejected inserts<br>**clickhouse.insert.rejected** <br>*(long counter)*                                           |  Part inserts that are rejected because the current `Max active part count` is more than `parts_to_throw_insert` setting
ZooKeeper wait time<br>**clickhouse.zk.wait.time** <br>*(long counter)* *(microseconds)*                          |  Time spent in waiting for ZooKeeper operations
ZooKeeper exceptions<br>**clickhouse.zk.exceptions** <br>*(long counter)*                                         |  Count of exceptions during ZooKeeper operations
ZooKeeper ephemeral node removal failures<br>**clickhouse.zk.nodes.ephemeral.remove.fails** <br>*(long counter)*  |  Count of ZooKeeper ephemeral node removal failures
Network errors<br>**clickhouse.network.errors** <br>*(long counter)*                                              |  Count of network errors (timeouts and connection failures) during query execution, background pool tasks and DNS cache update
Distributed Sync insertion timeouts<br>**clickhouse.distributed.sync.insert.timeout** <br>*(long counter)*        |  Count of sync distributed insert wait timeout exceeded errors in distributed storage engine
Cache dictionary expired keys<br>**clickhouse.dict.cache.keys.expired** <br>*(long counter)*                      |
Cache dictionary keys not found<br>**clickhouse.dict.cache.keys.notfound** <br>*(long counter)*                   |
Cache dictionary keys hits<br>**clickhouse.dict.cache.keys.hits** <br>*(long counter)*                            |
TCP Connections<br>**clickhouse.connection.tcp.count** <br>*(long gauge)*                                         |  Number of connections to TCP server (clients with native interface)
HTTP Connections<br>**clickhouse.connection.http.count** <br>*(long gauge)*                                       |  Number of connections to HTTP server
Interserver Connections<br>**clickhouse.connection.interserver.count** <br>*(long gauge)*                         |  Number of connections from other replicas to fetch parts
Query Threads<br>**clickhouse.query.thread.count** <br>*(long gauge)*                                             |  Number of query processing threads
Preempted Queries<br>**clickhouse.query.preempted.count** <br>*(long gauge)*                                      |  Number of queries that are stopped and waiting due to 'priority' setting.
BackgroundPool Tasks<br>**clickhouse.backgroundpool.tasks** <br>*(long gauge)*                                    |  Number of active tasks in BackgroundProcessingPool (merges, mutations, fetches or replication queue bookkeeping)
Reads<br>**clickhouse.reads** <br>*(long gauge)*                                                                  |  Number of read (read, pread, io_get events, etc.) syscalls in progress
Writes<br>**clickhouse.writes** <br>*(long gauge)*                                                                |  Number of write (write, pwrite, io_get events, etc.) syscalls in progress
Memory<br>**clickhouse.memory.tracking** <br>*(long gauge)* *(bytes)*                                             |  Total amount of memory (bytes) allocated in currently executing queries. Note that some memory allocations may not be accounted.
Running merges<br>**clickhouse.merge.count** <br>*(long gauge)*                                                   |  Number of executing background merges (if merged takes very short time, they may not be counted)
Open Files (Read)<br>**clickhouse.files.open.read** <br>*(long gauge)*                                            |  Number of files open for reading
Open Files (Write)<br>**clickhouse.files.open.write** <br>*(long gauge)*                                          |  Number of files open for writing
Distributed Sends<br>**clickhouse.distributed.send** <br>*(long gauge)*                                           |  Number of connections sending data, that was inserted to Distributed tables, to remote servers. Both synchronous and asynchronous mode.
Current leader elections<br>**clickhouse.zk.leader.election** <br>*(long gauge)*                                  |  Number of replicas participating in leader election. Equals to total number of replicas in usual cases.
Ephemeral nodes<br>**clickhouse.zk.nodes.ephemeral** <br>*(long gauge)*                                           |  Number of ephemeral nodes held in ZooKeeper.
ZooKeeper sessions<br>**clickhouse.zk.sessions** <br>*(long gauge)*                                               |  Number of sessions (connections) to ZooKeeper. Should be no more than one.
ZooKeeper watches<br>**clickhouse.zk.watches** <br>*(long gauge)*                                                 |  Number of watches (event subscriptions) in ZooKeeper.
ZooKeeper requests<br>**clickhouse.zk.requests** <br>*(long gauge)*                                               |  Number of requests to ZooKeeper in progress.
Table size on disk<br>**clickhouse.mergetree.table.size** <br>*(long gauge)* *(bytes)*                            |
Active part count<br>**clickhouse.mergetree.table.parts** <br>*(long gauge)*                                      |
Row count<br>**clickhouse.mergetree.table.rows** <br>*(long gauge)*                                               |
Replica readonly<br>**clickhouse.replica.readonly** <br>*(long gauge)*                                            |  True if the config doesn't have session with ZK, if an unknown error occurred when reinitializing sessions in ZK, and during session reinitialization in ZK.
Replica session expired<br>**clickhouse.replica.session.expired** <br>*(long gauge)*                              |  True if the ZK session expired
Replica future parts<br>**clickhouse.replica.parts.future** <br>*(long gauge)*                                    |  The number of data parts that will appear as the result of inserts or merges that haven't been done yet
Replica parts to check<br>**clickhouse.replica.parts.tocheck** <br>*(long gauge)*                                 |  The number of data parts in the queue for verification. A part is put in the verification queue if there is suspicion that it might be damaged.
Replica queue size<br>**clickhouse.replica.queue.size** <br>*(long gauge)*                                        |  Size of the queue for operations waiting to be performed. Operations include inserting blocks of data, merges, and certain other actions.
Replica queue inserts<br>**clickhouse.replica.queue.inserts** <br>*(long gauge)*                                  |  Number of inserts of blocks of data that need to be made. Insertions are usually replicated fairly quickly. If the number is high, something is wrong.
Replica queue merges<br>**clickhouse.replica.queue.merges** <br>*(long gauge)*                                    |  The number of merges waiting to be made. Sometimes merges are lengthy, so this value may be greater than zero for a long time
Replica log max index<br>**clickhouse.replica.log.max.index** <br>*(long gauge)*                                  |  Maximum entry number in the log of general activity.
Replica log pointer<br>**clickhouse.replica.log.pointer** <br>*(long gauge)*                                      |  Maximum entry number in the log of general activity that the replica copied to its execution queue, plus one. If log pointer is much smaller than log max index, something is wrong.
Total replicas<br>**clickhouse.replica.total.replicas** <br>*(long gauge)*                                        |  The total number of known replicas of this table.
Active replicas<br>**clickhouse.replica.active.replicas** <br>*(long gauge)*                                      |  The number of replicas of this table that have a session in ZooKeeper (i.e., the number of functioning replicas).
