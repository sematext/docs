## Metrics

Metric Name | Key | Agg | Type | Description
--- | --- | --- | --- | ---
resends | kafka.producer.old.resends | Sum | Long | 
failed | kafka.producer.old.sends.failed | Sum | Long | 
serialization errors | kafka.producer.errors.serialization | Sum | Long | 
zookeeper_commits | kafka.consumer.old.commits.zookeeper | Sum | Long | 
rebalance_count | kafka.consumer.old.rebalances | Sum | Long | 
kafka_commits | kafka.consumer.old.commits.kafka | Sum | Long | 
request queue time | kafka.broker.requests.time.queue | Sum | Double | 
requests | kafka.broker.requests | Sum | Long | 
response send time | kafka.broker.responses.time.send | Sum | Double | 
response queue time | kafka.broker.responses.time.queue | Sum | Double | 
local time | kafka.broker.requests.time.local | Sum | Double | 
remote time | kafka.broker.requests.time.remote | Sum | Double | 
buffer pool wait ratio | kafka.producer.buffer.pool.wait.ratio | Avg | Double | The fraction of time an appender waits for space allocation.
buffer available bytes | kafka.producer.buffer.available | Avg | Double | The total amount of buffer memory that is not being used (either unallocated or in the free list).
batch size max | kafka.producer.batch.size.max | Max | Double | The max number of bytes sent per partition per-request.
buffer total bytes | kafka.producer.buffer.size | Avg | Double | The maximum amount of buffer memory the client can use (whether or not it is currently used).
batch size | kafka.producer.batch.size | Avg | Double | The average number of bytes sent per partition per-request.
compression rate | kafka.producer.compression.rate | Avg | Double | The average compression rate of record batches.
size | kafka.broker.log.size | Avg | Long | 
offset increasing | kafka.broker.log.offset.end | Sum | Long | 
segments | kafka.broker.log.segments | Avg | Long | 
under replicated | kafka.broker.partition.underreplicated | Avg | Long | 
error rate | kafka.producer.topic.records.error.rate | Avg | Double | The average per-second number of record sends that resulted in errors
send rate | kafka.producer.topic.records.send.rate | Avg | Double | The average number of records sent per second.
byte rate | kafka.producer.topic.bytes.rate | Avg | Double | The average rate of bytes.
compression_rate | kafka.producer.topic.compression.rate | Avg | Double | The average compression rate of records.
retry rate | kafka.producer.topic.records.retry.rate | Avg | Double | The average per-second number of retried record sends
sync rate | kafka.consumer.coordinator.sync.rate | Avg | Double | The number of group syncs per second
heartbeat response time max | kafka.consumer.coordinator.heartbeat.time | Max | Double | The max time taken to receive a response to a heartbeat request
sync time avg | kafka.consumer.coordinator.sync.time | Avg | Double | The average time taken for a group sync
join time max | kafka.consumer.coordinator.join.time.max | Max | Double | The max time taken for a group rejoin
heartbeat rate | kafka.consumer.coordinator.heartbeat.rate | Avg | Double | The number of hearthbeats per second
join rate | kafka.consumer.coordinator.join.rate | Avg | Double | The number of group joins per second
sync time max | kafka.consumer.coordinator.sync.time.max | Max | Double | The max time taken for a group sync
last heartbeat | kafka.consumer.coordinator.heartbeat.last | Avg | Double | The number of seconds since the last controller heartbeat
assigned partitions | kafka.consumer.partitions.assigned | Avg | Double | The number of partitions currently assigned to consumer
join time avg | kafka.consumer.coordinator.join.time | Avg | Double | The average time taken for a group rejoin
io wait time | kafka.producer.io.wait.time.ns | Avg | Double | The average length of time the I/O thread spent waiting for a socket ready for reads or writes.
connection creation rate | kafka.producer.connections.create.rate | Avg | Double | New connections established per second in the window.
connection close rate | kafka.producer.connections.close.rate | Avg | Double | Connections closed per second in the window.
network io rate | kafka.producer.io.rate | Avg | Double | The average number of network operations (reads or writes) on all connections per second.
io ratio | kafka.producer.io.ratio | Avg | Double | The fraction of time the I/O thread spent doing I/O
connection count | kafka.producer.connections | Avg | Double | The current number of active connections.
io wait ratio | kafka.producer.io.wait.ratio | Avg | Double | The fraction of time the I/O thread spent waiting.
io_time | kafka.producer.io.time.ns | Avg | Double | The average length of time for I/O per select call.
records lag max | kafka.consumer.records.lag.max | Max | Double | The maximum lag in terms of number of records for any partition
time | kafka.producer.old.requests.time | Sum | Double | 
requests | kafka.producer.old.requests | Sum | Long | 
size | kafka.producer.old.requests.size | Sum | Double | 
connection close rate | kafka.consumer.connections.close.rate | Avg | Double | Connections closed per second in the window.
io wait ratio | kafka.consumer.io.wait.ratio | Avg | Double | The fraction of time the I/O thread spent waiting.
network io rate | kafka.consumer.io.rate | Avg | Double | The average number of network operations (reads or writes) on all connections per second.
io wait time | kafka.consumer.io.wait.time.ns | Avg | Double | The average length of time the I/O thread spent waiting for a socket ready for reads or writes.
connection count | kafka.consumer.connections | Avg | Double | The current number of active connections.
connection creation rate | kafka.consumer.connections.create.rate | Avg | Double | New connections established per second in the window.
io ratio | kafka.consumer.io.ratio | Avg | Double | The fraction of time the I/O thread spent doing I/O
io_time | kafka.consumer.io.time.ns | Avg | Double | The average length of time for I/O per select call.
record send rate | kafka.producer.records.send.rate | Avg | Double | The average number of records sent per second.
waiting threads | kafka.producer.threads.waiting | Avg | Double | The number of user threads blocked waiting for buffer memory to enqueue their records
records per request | kafka.producer.requests.records | Avg | Double | The average number of records per request.
record queue time max | kafka.producer.records.queued.time.max | Max | Double | The maximum time record batches spent in the record accumulator.
error rate | kafka.producer.records.error.rate | Avg | Double | The average per-second number of record sends that resulted in errors
record size max | kafka.producer.records.size.max | Max | Double | The maximum record size
record retry rate | kafka.producer.records.retry.rate | Avg | Double | The average per-second number of retried record sends
select rate | kafka.producer.selects.rate | Avg | Double | Number of times the I/O layer checked for new I/O to perform per second
record size | kafka.producer.records.size | Avg | Double | The average record size
record_queue_time_avg | kafka.producer.records.queued.time | Avg | Double | The average time record batches spent in the record accumulator.
requests in flight | kafka.producer.requests.inflight | Avg | Double | The current number of in-flight requests awaiting a response.
response bytes | kafka.consumer.old.responses.bytes | Sum | Double | 
responses | kafka.consumer.old.responses | Sum | Long | 
fetcher bytes | kafka.consumer.old.requests.bytes | Sum | Long | 
requests time | kafka.consumer.old.requests.time | Avg | Double | 
requests | kafka.consumer.old.requests | Sum | Long | 
throttle time | kafka.consumer.old.requests.throttle.time | Avg | Double | 
broker earliest offset changes | kafka.broker.earliest.offset.changes | Sum | Long | Number of messages deleted by Kafka retention job
lag | kafka.consumer.lag | Avg | Long | 
all expires | kafka.broker.expires.all | Sum | Long | Number of expired delayed producer requests
follower expires | kafka.broker.expires.follower | Sum | Long | Number of expired delayed follower fetch requests
response queue | kafka.broker.queue.response.size | Avg | Long | Response Queue Size
consumer expires | kafka.broker.expires.consumer | Sum | Long | Number of expired delayed consumer fetch requests
request queue | kafka.broker.queue.request.size | Avg | Long | Request Queue Size
records consumed rate | kafka.consumer.records.rate | Avg | Double | The average number of records consumed per second
fetch rate | kafka.consumer.fetch.rate | Avg | Double | The number of fetch requests per second
fetch size avg | kafka.consumer.fetch.size | Avg | Double | The average number of bytes fetched per request
bytes consumed rate | kafka.consumer.bytes.rate | Avg | Double | The average number of bytes consumed per second
fetch latency | kafka.consumer.fetch.latency | Avg | Double | The average time taken for a fetch request
records per request | kafka.consumer.requests.records.avg | Avg | Double | The average number of records per request
throttle time max | kafka.consumer.throttle.time.max | Max | Double | The max throttle time in ms
partitions | kafka.broker.partitions | Avg | Long | Number of partitions (lead or follower replicas) on broker
under replicated partitions | kafka.broker.partitions.underreplicated | Avg | Long | Number of partitions with unavailable replicas
offline partitions | kafka.broker.partitions.offline | Avg | Long | Number of unavailable partitions
leader partitions | kafka.broker.partitions.leader | Avg | Long | Number of leader replicas on broker
bytes | kafka.producer.old.topic.bytes | Sum | Long | 
dropped messages | kafka.producer.old.topic.messages.dropped | Sum | Long | 
messages | kafka.producer.old.topic.messages | Sum | Long | 
log flushes time | kafka.broker.log.flushes.time | Sum | Double | Time of flushing Kafka logs to disk
isr shrinks | kafka.broker.isr.shrinks | Sum | Long | Number of times ISR for a partition shrank
isr expands | kafka.broker.isr.expands | Sum | Long | Number of times ISR for a partition expanded
log flushes | kafka.broker.log.flushes | Sum | Long | Rate of flushing Kafka logs to disk
fetch delayed requests | kafka.broker.purgatory.requests.fetch.delayed | Avg | Long | Number of requests delayed in the fetch purgatory
producer delayed requests size | kafka.broker.purgatory.producer.requests.fetch.size | Avg | Long | Requests waiting in the producer purgatory. This should be non-zero when acks = -1 is used in producers
producer delayed requests | kafka.broker.purgatory.producer.requests.fetch.delayed | Avg | Long | Number of requests delayed in the producer purgatory
fetch delayed requests size | kafka.broker.purgatory.requests.fetch.size | Avg | Long | Requests waiting in the fetch purgatory. This depends on value of fetch.wait.max.ms in the consumer
preferred replica imbalance count | kafka.broker.replica.imbalance | Avg | Long | 
replica max lag | kafka.broker.replica.lag.max | Max | Long | 
replica min fetch | kafka.broker.replica.fetch.min | Min | Long | 
response rate | kafka.producer.node.responses.rate | Avg | Double | The average number of responses received per second.
request size max | kafka.producer.requests.size.max | Max | Double | The maximum size of any request sent in the window.
incoming byte rate | kafka.producer.node.in.bytes.rate | Avg | Double | Bytes/second read off socket
request latency max | kafka.producer.node.requests.latency.max | Max | Double | The maximum request latency
request latency | kafka.producer.node.requests.latency | Avg | Double | The average request latency
request rate | kafka.producer.node.requests.rate | Avg | Double | The average number of requests sent per second.
request size | kafka.producer.requests.size | Avg | Double | The average size of all requests in the window..
outgoing byte rate | kafka.producer.node.out.bytes.rate | Avg | Double | The average number of outgoing bytes sent per second to servers.
bytes out | kafka.broker.topic.out.bytes | Sum | Long | 
messages in | kafka.broker.topic.in.messages | Sum | Long | 
failed fetch requests | kafka.broker.topic.requests.fetch.failed | Sum | Long | 
failed produce requests | kafka.broker.topic.requests.produce.failed | Sum | Long | 
bytes in | kafka.broker.topic.in.bytes | Sum | Long | 
bytes rejected | kafka.broker.topic.in.bytes.rejected | Sum | Long | 
max_dirty | kafka.broker.log.cleaner.dirty.percentage | Max | Long | 
max_buffer_utilization | kafka.broker.log.cleaner.recopy.buffer.utilization | Max | Long | 
recopy_percent | kafka.broker.log.cleaner.recopy.percentage | Avg | Long | 
max_clean_time | kafka.broker.log.cleaner.clean.time | Max | Long | 
active controllers | kafka.broker.controllers.active | Avg | Double | Is controller active on broker
queue size | kafka.consumer.old.topic.queue | Avg | Long | 
owned_partitions | kafka.consumer.old.partitions.owned | Avg | Long | 
messages | kafka.consumer.old.topic.messages | Sum | Long | 
bytes | kafka.consumer.old.topic.bytes | Sum | Long | 
elections time | kafka.broker.leader.elections.time | Sum | Double | 
elections | kafka.broker.leader.elections | Sum | Long | 
unclean elections | kafka.broker.leader.elections.unclean | Sum | Long | 
request latency max | kafka.consumer.node.request.latency.max | Max | Double | The maximum request latency
outgoing byte rate | kafka.consumer.node.out.bytes.rate | Avg | Double | The average number of outgoing bytes sent per second to servers.
request latency | kafka.consumer.node.request.latency | Avg | Double | The average request latency
request size max | kafka.consumer.node.request.size.max | Max | Double | The maximum size of any request sent in the window.
incoming byte rate | kafka.consumer.node.in.bytes.rate | Avg | Double | Bytes/second read off socket
request rate | kafka.consumer.node.request.rate | Avg | Double | The average number of requests sent per second.
response rate | kafka.consumer.node.response.rate | Avg | Double | The average number of responses received per second.
request size | kafka.consumer.node.request.size | Avg | Double | The average size of all requests in the window..

### 0.7.2

Metric Name | Key | Agg | Type | Description
--- | --- | --- | --- | ---
async events | kafka.producer.events.async | Sum | Long | 
avg. request latency | kafka.producer.requests.latency | Avg | Double | 
async droped events | kafka.producer.events.async.dropped | Sum | Long | 
max. request latency | kafka.producer.requests.latency.max | Avg | Double | 
requests | kafka.producer.requests.rate | Avg | Double | 
requests | kafka.producer.requests | Sum | Long | 
flushes | kafka.broker.flushes.rate | Avg | Double | 
total fetch requests | kafka.broker.requests.fetch.time | Sum | Long | 
failed produce requests | kafka.broker.requests.produce.failed | Sum | Long | 
bytes written | kafka.broker.out.bytes.rate | Avg | Double | 
avg. produce request | kafka.broker.requests.produce.time.avg | Avg | Double | 
max. produce request | kafka.broker.requests.produce.time.max | Avg | Double | 
max. fetch request | kafka.broker.requests.fetch.time.max | Avg | Double | 
total bytes writtern | kafka.broker.out.bytes | Sum | Long | 
flushes | kafka.broker.flushes | Sum | Long | 
produce requests | kafka.broker.requests.produce.rate | Avg | Double | 
bytes in | kafka.broker.in.bytes.sum | Sum | Long | 
failed fetch requests | kafka.broker.requests.fetch.failed | Sum | Long | 
messages in | kafka.broker.in.messages | Sum | Long | 
avg. flushes | kafka.broker.flushes.time.avg | Avg | Double | 
produce requests | kafka.broker.requests.produce | Sum | Long | 
max. flush | kafka.broker.flushes.time.max | Avg | Double | 
total flush | kafka.broker.flushes.time.total | Sum | Long | 
bytes read | kafka.broker.in.bytes.rate | Avg | Double | 
fetch requests | kafka.broker.requests.fetch.rate | Avg | Double | 
fetch requests | kafka.broker.requests.fetch | Sum | Long | 
avg. fetch request | kafka.broker.requests.fetch.time.avg | Avg | Double | 
total bytes read | kafka.broker.in.bytes | Sum | Long | 
total produce requests | kafka.broker.requests.produce.time | Sum | Long | 
bytes out | kafka.broker.out.bytes | Sum | Long | 
messages appended | kafka.logs.messages | Sum | Long | 
logs size | kafka.logs.size | Avg | Double | 
segments | kafka.logs.segments | Sum | Long | 
avg. requests latency | kafka.consumer.requests.fetch.latency | Avg | Double | 
requests | kafka.consumer.requests.rate | Avg | Double | 
bytes per topic | kafka.consumer.bytes.topic | Sum | Long | 
throughput | kafka.consumer.throughput | Avg | Double | 
messages per topic | kafka.consumer.messages.topic | Sum | Long | 
max. requests latency | kafka.consumer.requests.fetch.latency.max | Avg | Double | 
requests | kafka.consumer.requests.fetch | Sum | Long | 
total flush time | kafka.broker.flushes.time | Sum | Long | 
max. flush time | kafka.broker.flushes.time.max | Avg | Double | 
flush rate | kafka.broker.flushes.rate | Avg | Double | 
total flushes | kafka.broker.flushes | Sum | Long | 
avg. flush time | kafka.broker.flushes.time.avg | Avg | Double | 
messages in | kafka.broker.in.messages | Sum | Long | 
bytes out | kafka.broker.out.bytes | Sum | Long | 
bytes in | kafka.broker.in.bytes | Sum | Long | 
lag | kafka.consumer.offset.lag | Avg | Long | 
bytes | kafka.consumer.topic.bytes | Sum | Long | 
consumed | kafka.consumer.offset.consumed | Sum | Long | 
produced | kafka.consumer.offset.produced | Sum | Long | 
messages | kafka.consumer.topic.messages | Sum | Long | 
avg. fetch latency | kafka.broker.requests.fetch.latency | Avg | Double | 
produce rate | kafka.broker.requests.produce.rate | Avg | Double | 
fetch rate | kafka.broker.requests.fetch.rate | Avg | Double | 
produce requests | kafka.broker.requests.produce | Sum | Long | 
total bytes read | kafka.broker.in.bytes | Sum | Long | 
total fetch latency | kafka.broker.requests.fetch.latency.total | Sum | Long | 
failed produce requests | kafka.broker.requests.produce.failed | Sum | Long | 
bytes read rate | kafka.broker.in.bytes.rate | Avg | Double | 
failed fetch requests | kafka.broker.requests.fetch.failed | Sum | Long | 
total produce latency | kafka.broker.requests.produce.latency.total | Sum | Long | 
avg. produce latency | kafka.broker.requests.produce.latency | Avg | Double | 
max. produce latency | kafka.broker.requests.produce.latency.max | Avg | Double | 
max. fetch latency | kafka.broker.requests.fetch.latency.max | Avg | Double | 
total bytes written | kafka.broker.out.bytes | Sum | Long | 
bytes written rate | kafka.broker.out.bytes.rate | Avg | Double | 
fetch requests | kafka.broker.requests.fetch | Sum | Long | 
bytes out | kafka.broker.topic.out.bytes | Sum | Long | 
messages in | kafka.broker.topic.in.messages | Sum | Long | 
bytes in | kafka.broker.topic.in.bytes | Sum | Long | 
failed fetch requests | kafka.broker.topic.requests.fetch.failed | Sum | Long | 
failed produce requests | kafka.broker.topic.requests.produce.failed | Sum | Long | 