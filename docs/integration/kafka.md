## Kafka Monitoring

### Why am I not seeing all Kafka metrics if I'm running a 0.8.x version of Kafka that is pre-0.8.2

A: Kafka had great metrics in 0.7x versions and then in pre-0.8.2 the
metrics had a lot of issues.  In short, the MBeans Kafka exposed via JMX
were named in a way that made them very difficult/impossible to parse
systematically.  We worked with the Kafka developers to fix that in
Kafka 0.8.2 (see <https://issues.apache.org/jira/browse/KAFKA-1481>).
 To make your Kafka Producers, Consumers, and Brokers properly
monitorable, upgrade to 0.8.2.

### How can I see metrics for Kafka Producers and Brokers and Consumers

A: To see metrics for Kafka Producers, Brokers, and Consumers make sure
to run SPM client on all of them.  Each of them has its own metrics.
 Kafka Brokers do not expose Producers' or Consumers' metrics, so
ensure you have SPM client on all three Kafka tiers.

### Can I see metrics for non-Scala/JVM Kafka Producers and Consumers

A: No, because none of them seem to expose metrics the way Kafka's own
Producer and Consumer implementations expose
metrics.

## Metrics 

### Report: Producer Failed/Resend Requests

#### Chart: Producer Failed/Resend Requests
Metric Name | Metric Description
--- | ---
failed | 
resends | 
serialization errors | 



### Report: Consumer Connector

#### Chart: Consumer Commits
Metric Name | Metric Description
--- | ---
kafka_commits | 
zookeeper_commits | 
rebalance_count | 



### Report: Broker Requests

#### Chart: Requests
Metric Name | Metric Description
--- | ---
requests | 
local time | 
remote time | 
request queue time | 
response queue time | 
response send time | 
local time | 
remote time | 
request queue time | 
response queue time | 
response send time | 



### Report: Clients Producer Batch/Buffer/Compression

#### Chart: Batch
Metric Name | Metric Description
--- | ---
batch size | The average number of bytes sent per partition per-request.
batch size max | The max number of bytes sent per partition per-request.
compression rate | The average compression rate of record batches.

#### Chart: Buffer
Metric Name | Metric Description
--- | ---
buffer available bytes | The total amount of buffer memory that is not being used (either unallocated or in the free list).
buffer total bytes | The maximum amount of buffer memory the client can use (whether or not it is currently used).
buffer pool wait ratio | The fraction of time an appender waits for space allocation.



### Report: Broker Topic Partition

#### Chart: Topic Partition Log
Metric Name | Metric Description
--- | ---
segments | 
size | 

#### Chart: Topic Partition Offset Increasing
Metric Name | Metric Description
--- | ---
offset increasing | 

#### Chart: Topic Partition Under Replicated
Metric Name | Metric Description
--- | ---
under replicated | 



### Report: Clients Producer Topic

#### Chart: Rate
Metric Name | Metric Description
--- | ---
byte rate | The average rate of bytes.
compression_rate | The average compression rate of records.

#### Chart: Record Rate
Metric Name | Metric Description
--- | ---
send rate | The average number of records sent per second.
retry rate | The average per-second number of retried record sends
error rate | The average per-second number of record sends that resulted in errors



### Report: Clients Consumer Coordinator

#### Chart: Rebalance
Metric Name | Metric Description
--- | ---
join rate | The number of group joins per second
join time avg | The average time taken for a group rejoin
join time max | The max time taken for a group rejoin
sync rate | The number of group syncs per second
sync time avg | The average time taken for a group sync
sync time max | The max time taken for a group sync

#### Chart: Heartbeats
Metric Name | Metric Description
--- | ---
heartbeat rate | The number of hearthbeats per second
heartbeat response time max | The max time taken to receive a response to a heartbeat request

#### Chart: Last Heartbeat
Metric Name | Metric Description
--- | ---
last heartbeat | The number of seconds since the last controller heartbeat

#### Chart: Assigned Partitions
Metric Name | Metric Description
--- | ---
assigned partitions | The number of partitions currently assigned to consumer



### Report: Clients Producer Communication

#### Chart: IO
Metric Name | Metric Description
--- | ---
io wait ratio | The fraction of time the I/O thread spent waiting.
io ratio | The fraction of time the I/O thread spent doing I/O
io wait time | The average length of time the I/O thread spent waiting for a socket ready for reads or writes.
io_time | The average length of time for I/O per select call.

#### Chart: Connections
Metric Name | Metric Description
--- | ---
connection creation rate | New connections established per second in the window.
connection close rate | Connections closed per second in the window.
connection count | The current number of active connections.

#### Chart: Network
Metric Name | Metric Description
--- | ---
network io rate | The average number of network operations (reads or writes) on all connections per second.



### Report: Clients Consumer Lag

#### Chart: Consumer Lag
Metric Name | Metric Description
--- | ---
records lag max | The maximum lag in terms of number of records for any partition



### Report: Producer Requests

#### Chart: Producer Request Time
Metric Name | Metric Description
--- | ---
time | 

#### Chart: Producer Request Size
Metric Name | Metric Description
--- | ---
requests | 
size | 



### Report: Clients Consumer Communication

#### Chart: Connections
Metric Name | Metric Description
--- | ---
connection creation rate | New connections established per second in the window.
connection close rate | Connections closed per second in the window.
connection count | The current number of active connections.

#### Chart: Network
Metric Name | Metric Description
--- | ---
network io rate | The average number of network operations (reads or writes) on all connections per second.

#### Chart: IO
Metric Name | Metric Description
--- | ---
io wait ratio | The fraction of time the I/O thread spent waiting.
io ratio | The fraction of time the I/O thread spent doing I/O
io wait time | The average length of time the I/O thread spent waiting for a socket ready for reads or writes.
io_time | The average length of time for I/O per select call.



### Report: Clients Producer Request/Records

#### Chart: Record Size
Metric Name | Metric Description
--- | ---
record size | The average record size
record size max | The maximum record size
records per request | The average number of records per request.

#### Chart: Requests In Flight
Metric Name | Metric Description
--- | ---
requests in flight | The current number of in-flight requests awaiting a response.

#### Chart: Select Rate
Metric Name | Metric Description
--- | ---
select rate | Number of times the I/O layer checked for new I/O to perform per second

#### Chart: Waiting Buffer Threads
Metric Name | Metric Description
--- | ---
waiting threads | The number of user threads blocked waiting for buffer memory to enqueue their records

#### Chart: Record Rate
Metric Name | Metric Description
--- | ---
record send rate | The average number of records sent per second.
record retry rate | The average per-second number of retried record sends
error rate | The average per-second number of record sends that resulted in errors
record queue time max | The maximum time record batches spent in the record accumulator.
record_queue_time_avg | The average time record batches spent in the record accumulator.
record send rate | The average number of records sent per second.
record retry rate | The average per-second number of retried record sends
error rate | The average per-second number of record sends that resulted in errors



### Report: Consumer Fetcher

#### Chart: Consumer Requests Time
Metric Name | Metric Description
--- | ---
requests time | 

#### Chart: Consumer Requests Throttle Time
Metric Name | Metric Description
--- | ---
throttle time | 

#### Chart: Consumer Requests/Responses
Metric Name | Metric Description
--- | ---
requests | 
responses | 
fetcher bytes | 
response bytes | 
fetcher bytes | 
response bytes | 



### Report: Consumer Lag

#### Chart: Consumer Lag
Metric Name | Metric Description
--- | ---
lag | 
broker earliest offset changes | Number of messages deleted by Kafka retention job
broker write rate | 
consume rate | 



### Report: Broker Queues/Expires

#### Chart: Queues
Metric Name | Metric Description
--- | ---
response queue | Response Queue Size
request queue | Request Queue Size

#### Chart: Expires
Metric Name | Metric Description
--- | ---
consumer expires | Number of expired delayed consumer fetch requests
follower expires | Number of expired delayed follower fetch requests
all expires | Number of expired delayed producer requests



### Report: Clients Consumer Fetc Manager

#### Chart: Throttle
Metric Name | Metric Description
--- | ---
throttle time max | The max throttle time in ms

#### Chart: Records
Metric Name | Metric Description
--- | ---
records consumed rate | The average number of records consumed per second
records per request | The average number of records per request

#### Chart: Requests
Metric Name | Metric Description
--- | ---
fetch rate | The number of fetch requests per second
fetch latency | The average time taken for a fetch request

#### Chart: Bytes
Metric Name | Metric Description
--- | ---
bytes consumed rate | The average number of bytes consumed per second
fetch size avg | The average number of bytes fetched per request



### Report: Partitions

#### Chart: Partitions
Metric Name | Metric Description
--- | ---
partitions | Number of partitions (lead or follower replicas) on broker
leader partitions | Number of leader replicas on broker
offline partitions | Number of unavailable partitions
under replicated partitions | Number of partitions with unavailable replicas



### Report: Producer Topic

#### Chart: Producer Topic Bytes/Messages
Metric Name | Metric Description
--- | ---
messages | 
dropped messages | 
bytes | 
dropped messages | 
bytes | 



### Report: Broker ISR/Log Flush

#### Chart: ISR
Metric Name | Metric Description
--- | ---
isr expands | Number of times ISR for a partition expanded
isr shrinks | Number of times ISR for a partition shrank

#### Chart: Log Flush
Metric Name | Metric Description
--- | ---
log flushes | Rate of flushing Kafka logs to disk
log flushes time | Time of flushing Kafka logs to disk



### Report: Broker Purgatory

#### Chart: Purgatory
Metric Name | Metric Description
--- | ---
fetch delayed requests | Number of requests delayed in the fetch purgatory
fetch delayed requests size | Requests waiting in the fetch purgatory. This depends on value of fetch.wait.max.ms in the consumer
producer delayed requests | Number of requests delayed in the producer purgatory
producer delayed requests size | Requests waiting in the producer purgatory. This should be non-zero when acks = -1 is used in producers



### Report: Broker Replica

#### Chart: Replica Stats
Metric Name | Metric Description
--- | ---
replica max lag | 
replica min fetch | 

#### Chart: Replica Imbalance
Metric Name | Metric Description
--- | ---
preferred replica imbalance count | 



### Report: Clients Producer Node

#### Chart: Request Rate
Metric Name | Metric Description
--- | ---
request rate | The average number of requests sent per second.
response rate | The average number of responses received per second.
request latency | The average request latency
request latency max | The maximum request latency
request rate | The average number of requests sent per second.
response rate | The average number of responses received per second.

#### Chart: Request Size
Metric Name | Metric Description
--- | ---
request size | The average size of all requests in the window..
request size max | The maximum size of any request sent in the window.

#### Chart: Bytes
Metric Name | Metric Description
--- | ---
incoming byte rate | Bytes/second read off socket
outgoing byte rate | The average number of outgoing bytes sent per second to servers.
incoming byte rate | Bytes/second read off socket
outgoing byte rate | The average number of outgoing bytes sent per second to servers.



### Report: Broker Topic

#### Chart: Topic Bytes/Messages
Metric Name | Metric Description
--- | ---
messages in | 
bytes in | 
bytes out | 
bytes rejected | 
bytes in | 
bytes out | 
bytes rejected | 

#### Chart: Topic Failed Requests
Metric Name | Metric Description
--- | ---
failed fetch requests | 
failed produce requests | 



### Report: Log Cleaner

#### Chart: Recopy
Metric Name | Metric Description
--- | ---
max_buffer_utilization | 
recopy_percent | 

#### Chart: Buffer
Metric Name | Metric Description
--- | ---
max_buffer_utilization | 
max_dirty | 
max_clean_time | 



### Report: Controllers

#### Chart: Active Controllers
Metric Name | Metric Description
--- | ---
active controllers | Is controller active on broker



### Report: Consumer Topic

#### Chart: Consumer Topic Fetch Queue
Metric Name | Metric Description
--- | ---
queue size | 

#### Chart: Consumer Topic Owned Partitions
Metric Name | Metric Description
--- | ---
owned_partitions | 

#### Chart: Consumer Topic Bytes/Messages
Metric Name | Metric Description
--- | ---
messages | 
bytes | 



### Report: Elections

#### Chart: Leader Elections
Metric Name | Metric Description
--- | ---
elections | 
unclean elections | 
elections time | 



### Report: Clients Consumer Node

#### Chart: Bytes
Metric Name | Metric Description
--- | ---
incoming byte rate | Bytes/second read off socket
outgoing byte rate | The average number of outgoing bytes sent per second to servers.
incoming byte rate | Bytes/second read off socket
outgoing byte rate | The average number of outgoing bytes sent per second to servers.

#### Chart: Request Rate
Metric Name | Metric Description
--- | ---
request rate | The average number of requests sent per second.
response rate | The average number of responses received per second.
request latency | The average request latency
request latency max | The maximum request latency
request rate | The average number of requests sent per second.
response rate | The average number of responses received per second.

#### Chart: Request Size
Metric Name | Metric Description
--- | ---
request size | The average size of all requests in the window..
request size max | The maximum size of any request sent in the window.

## Metrics Kafka 0.7.2

### Report: Logs

#### Chart: Request Rate
Metric Name | Metric Description
--- | ---
requests | 

#### Chart: Async Requests
Metric Name | Metric Description
--- | ---
async droped events | 
async events | 

#### Chart: Request Stats
Metric Name | Metric Description
--- | ---
avg. request latency | 
max. request latency | 
requests | 



### Report: Broker

#### Chart: Socket Server Rate
Metric Name | Metric Description
--- | ---
produce requests | 
fetch requests | 
bytes read | 
bytes written | 

#### Chart: Flush Rate
Metric Name | Metric Description
--- | ---
flushes | 

#### Chart: Flush Time
Metric Name | Metric Description
--- | ---
perc. total flush | 
total flush | 
max. flush | 

#### Chart: Socket Server Count
Metric Name | Metric Description
--- | ---
total bytes read | 
total bytes writtern | 
perc. total produce requests | 
total produce requests | 
perc. total fetch requests | 
total fetch requests | 

#### Chart: Messages
Metric Name | Metric Description
--- | ---
bytes in | 
bytes out | 
messages in | 

#### Chart: Socket Server Time
Metric Name | Metric Description
--- | ---
avg. produce request | 
max. produce request | 
avg. fetch request | 
max. fetch request | 
produce requests | 
fetch requests | 

#### Chart: Flush Count
Metric Name | Metric Description
--- | ---
flushes | 
avg. flushes | 

#### Chart: Failed Requests
Metric Name | Metric Description
--- | ---
failed produce requests | 
failed fetch requests | 



### Report: Logs

#### Chart: Segments
Metric Name | Metric Description
--- | ---
segments | 

#### Chart: Messages
Metric Name | Metric Description
--- | ---
messages appended | 
logs size | 



### Report: Consumer

#### Chart: Requests
Metric Name | Metric Description
--- | ---
avg. requests latency | 
max. requests latency | 
requests | 

#### Chart: Request Rate
Metric Name | Metric Description
--- | ---
requests | 
throughput | 

#### Chart: Messages
Metric Name | Metric Description
--- | ---
messages per topic | 
bytes per topic | 



### Report: Broker Flush

#### Chart: Flush Time
Metric Name | Metric Description
--- | ---
perc. flush time | 
avg. flush time | 
max. flush time | 

#### Chart: Flush Count
Metric Name | Metric Description
--- | ---
total flushes | 
total flush time | 

#### Chart: Flush Rate
Metric Name | Metric Description
--- | ---
flush rate | 



### Report: Broker Msgs

#### Chart: Messages
Metric Name | Metric Description
--- | ---
bytes in | 
bytes out | 
messages in | 



### Report: Consumer Topics

#### Chart: Messages
Metric Name | Metric Description
--- | ---
messages | 
bytes | 

#### Chart: Offset
Metric Name | Metric Description
--- | ---
produced | 
consumed | 
lag | 



### Report: Broker Reqs

#### Chart: Fetch/Produce Latency
Metric Name | Metric Description
--- | ---
avg. produce latency | 
avg. fetch latency | 
max. produce latency | 
max. fetch latency | 

#### Chart: Fetch/Produce Rate
Metric Name | Metric Description
--- | ---
produce rate | 
fetch rate | 
bytes read rate | 
bytes written rate | 

#### Chart: Fetch/Produce Total
Metric Name | Metric Description
--- | ---
total produce latency | 
total fetch latency | 

#### Chart: Failed Requests
Metric Name | Metric Description
--- | ---
failed produce requests | 
failed fetch requests | 

#### Chart: Fetch/Produce Traffic
Metric Name | Metric Description
--- | ---
total bytes read | 
total bytes written | 
produce requests | 
fetch requests | 



### Report: Broker Topics

#### Chart: Failed Requests
Metric Name | Metric Description
--- | ---
failed produce requests | 
failed fetch requests | 

#### Chart: Messages
Metric Name | Metric Description
--- | ---
bytes in | 
bytes out | 
messages in | 


