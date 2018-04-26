## Integration

- Instructions: [https://apps.sematext.com/ui/howto/Kafka/overview](https://apps.sematext.com/ui/howto/Kafka/overview)

## Metrics

Metric Name                                      |  Key                                                     |  Metric Type     |  Numeric Type  |  Unit                     |  Description
-------------------------------------------------|----------------------------------------------------------|------------------|----------------|---------------------------|---------------------------------------------------------------------------------------------------------
producer node in bytes rate                      |  kafka.producer.node.in.bytes.rate                       |  gauge           |  double        |  bytes                    |  Bytes/second read off socket
producer node out bytes rate                     |  kafka.producer.node.out.bytes.rate                      |  gauge           |  double        |  bytes                    |  The average number of outgoing bytes sent per second to servers.
producer node requests rate                      |  kafka.producer.node.requests.rate                       |  gauge           |  double        |  req/sec                  |  The average number of requests sent per second.
producer node responses rate                     |  kafka.producer.node.responses.rate                      |  gauge           |  double        |  res/sec                  |  The average number of responses received per second.
producer node request latency                    |  kafka.producer.node.requests.latency                    |  gauge           |  double        |  ms                       |  The average request latency
producer node request max latency                |  kafka.producer.node.requests.latency.max                |  gauge           |  double        |  ms                       |  The maximum request latency
producer request size                            |  kafka.producer.requests.size                            |  gauge           |  double        |  bytes                    |  The average size of all requests in the window.
producer request max size                        |  kafka.producer.requests.size.max                        |  gauge           |  double        |  bytes                    |  The maximum size of any request sent in the window.
broker isr expands                               |  kafka.broker.isr.expands                                |  counter         |  long          |                           |  Number of times ISR for a partition expanded
broker isr shrinks                               |  kafka.broker.isr.shrinks                                |  counter         |  long          |                           |  Number of times ISR for a partition shrank
broker log flushes                               |  kafka.broker.log.flushes                                |  counter         |  long          |  flushes/sec              |  Rate of flushing Kafka logs to disk
broker log flushes time                          |  kafka.broker.log.flushes.time                           |  double_counter  |  double        |  ms                       |  Time of flushing Kafka logs to disk
broker log cleaner buffer utilization            |  kafka.broker.log.cleaner.clean.buffer.utilization       |  gauge           |  long          |  %                        |
broker log cleaner dirty                         |  kafka.broker.log.cleaner.dirty.percentage               |  gauge           |  long          |  %                        |
broker log cleaner max time                      |  kafka.broker.log.cleaner.clean.time                     |  gauge           |  long          |  ms                       |
broker log cleaner recopy                        |  kafka.broker.log.cleaner.recopy.percentage              |  gauge           |  long          |  %                        |
producer sends failed                            |  kafka.producer.old.sends.failed                         |  counter         |  long          |                           |
producer resends                                 |  kafka.producer.old.resends                              |  counter         |  long          |                           |
producer serialization errors                    |  kafka.producer.errors.serialization                     |  counter         |  long          |                           |
producer out bytes rate                          |  kafka.producer.out.bytes.rate                           |  gauge           |  double        |  bytes/sec                |
producer metadata age                            |  kafka.producer.metadata.age                             |  gauge           |  double        |  ms                       |
producer requests rate                           |  kafka.producer.requests.rate                            |  gauge           |  double        |  req/sec                  |
producer request latency                         |  kafka.producer.request.latency                          |  gauge           |  double        |  ms                       |
producer request max latency                     |  kafka.producer.request.latency.max                      |  gauge           |  double        |  ms                       |
producer responses rate                          |  kafka.producer.responses.rate                           |  gauge           |  double        |  res/sec                  |
producer in bytes rate                           |  kafka.producer.in.bytes.rate                            |  gauge           |  double        |  bytes/sec                |
producer request size                            |  kafka.producer.request.size                             |  gauge           |  double        |  bytes                    |
broker leader  elections                         |  kafka.broker.leader.elections                           |  counter         |  long          |                           |
broker leader unclean elections                  |  kafka.broker.leader.elections.unclean                   |  counter         |  long          |                           |
broker leader elections time                     |  kafka.broker.leader.elections.time                      |  double_counter  |  double        |  ms                       |
records consumed rate                            |  kafka.consumer.records.rate                             |  gauge           |  double        |  rec/sec                  |  The average number of records consumed per second
consumer records per request                     |  kafka.consumer.requests.records.avg                     |  gauge           |  double        |  rec/req                  |  The average number of records per request
consumer requests rate                           |  kafka.consumer.requests.rate                            |  gauge           |  double        |  req/sec                  |
consumer request size                            |  kafka.consumer.request.size                             |  gauge           |  double        |  bytes                    |
consumer responses rate                          |  kafka.consumer.responses.rate                           |  gauge           |  double        |  res/sec                  |
consumer out bytes rate                          |  kafka.consumer.outgoing.bytes.rate                      |  gauge           |  double        |  bytes/sec                |
consumer selects rate                            |  kafka.consumer.selects.rate                             |  gauge           |  double        |  sel/sec                  |
consumer fetch rate                              |  kafka.consumer.fetch.rate                               |  gauge           |  double        |  fetches/sec              |  The number of fetch requests per second
consumer fetch latency                           |  kafka.consumer.fetch.latency                            |  gauge           |  double        |  ms                       |  The average time taken for a fetch request
consumer fetch max latency                       |  kafka.consumer.fetch.latency.max                        |  gauge           |  double        |  ms                       |  The maximum time taken for a fetch request
bytes consumed rate                              |  kafka.consumer.bytes.rate                               |  gauge           |  double        |  betes/sec                |  The average number of bytes consumed per second
consumer fetch avg size                          |  kafka.consumer.fetch.size                               |  gauge           |  double        |  bytes                    |  The average number of bytes fetched per request
consumer fetch max size                          |  kafka.consumer.fetch.size.max                           |  gauge           |  double        |  betes                    |  The maximum number of bytes fetched per request
consumer throttle time                           |  kafka.consumer.throttle.time                            |  gauge           |  double        |  ms                       |  The avarage throttle time in ms
consumer throttle max time                       |  kafka.consumer.throttle.time.max                        |  gauge           |  double        |  ms                       |  The max throttle time in ms
producer connection creation rate                |  kafka.producer.connections.create.rate                  |  gauge           |  double        |  conn/sec                 |  New connections established per second in the window.
producer connection close rate                   |  kafka.producer.connections.close.rate                   |  gauge           |  double        |  conn/sec                 |  Connections closed per second in the window.
producer connections count                       |  kafka.producer.connections                              |  gauge           |  double        |                           |  The current number of active connections.
producer network io rate                         |  kafka.producer.io.rate                                  |  gauge           |  double        |  op/sec                   |  The average number of network operations (reads or writes) on all connections per second.
producer io wait ratio                           |  kafka.producer.io.wait.ratio                            |  gauge           |  double        |  %                        |  The fraction of time the I/O thread spent waiting.
producer io ratio                                |  kafka.producer.io.ratio                                 |  gauge           |  double        |  %                        |  The fraction of time the I/O thread spent doing I/O
producer io wait time                            |  kafka.producer.io.wait.time.ns                          |  gauge           |  double        |  ms                       |  The average length of time the I/O thread spent waiting for a socket ready for reads or writes.
producer io time                                 |  kafka.producer.io.time.ns                               |  gauge           |  double        |  ms                       |  The average length of time for I/O per select call.
producer requests                                |  kafka.producer.old.requests                             |  counter         |  long          |                           |
producer request size                            |  kafka.producer.old.requests.size                        |  double_counter  |  double        |  bytes                    |
producer request time                            |  kafka.producer.old.requests.time                        |  double_counter  |  double        |  ms                       |
consumer node in bytes rate                      |  kafka.consumer.node.in.bytes.rate                       |  gauge           |  double        |  bytes/sec                |  Bytes/second read off socket
consumer node out bytes rate                     |  kafka.consumer.node.out.bytes.rate                      |  gauge           |  double        |  bytes/sec                |  The average number of outgoing bytes sent per second to servers.
consumer node requests rate                      |  kafka.consumer.node.request.rate                        |  gauge           |  double        |  req/sec                  |  The average number of requests sent per second.
consumer node responses rate                     |  kafka.consumer.node.response.rate                       |  gauge           |  double        |  res/sec                  |  The average number of responses received per second.
consumer node request latency                    |  kafka.consumer.node.request.latency                     |  gauge           |  double        |  ms                       |  The average request latency
consumer node request max latency                |  kafka.consumer.node.request.latency.max                 |  gauge           |  double        |  ms                       |  The maximum request latency
consumer node request size                       |  kafka.consumer.node.request.size                        |  gauge           |  double        |  bytes                    |  The average size of all requests in the window..
consumer node request max size                   |  kafka.consumer.node.request.size.max                    |  gauge           |  double        |  bytes                    |  The maximum size of any request sent in the window.
broker requests                                  |  kafka.broker.requests                                   |  counter         |  long          |                           |
broker requests total time                       |  kafka.broker.requests.time.total                        |  double_counter  |  double        |  ms                       |
broker requests local time                       |  kafka.broker.requests.time.local                        |  double_counter  |  double        |  ms                       |
broker requests remote time                      |  kafka.broker.requests.time.remote                       |  double_counter  |  double        |  ms                       |
broker request queue time                        |  kafka.broker.requests.time.queue                        |  double_counter  |  double        |  ms                       |
broker response queue time                       |  kafka.broker.responses.time.queue                       |  double_counter  |  double        |  ms                       |
broker response send time                        |  kafka.broker.responses.time.send                        |  double_counter  |  double        |  ms                       |
broker topic messages in                         |  kafka.broker.topic.in.messages                          |  counter         |  long          |                           |
broker topic in                                  |  kafka.broker.topic.in.bytes                             |  counter         |  long          |  bytes                    |
broker topic out                                 |  kafka.broker.topic.out.bytes                            |  counter         |  long          |  bytes                    |
broker topic rejected                            |  kafka.broker.topic.in.bytes.rejected                    |  counter         |  long          |  bytes                    |
broker topic failed fetch requests               |  kafka.broker.topic.requests.fetch.failed                |  counter         |  long          |                           |
broker topic failed produce requests             |  kafka.broker.topic.requests.produce.failed              |  counter         |  long          |                           |
consumer requests                                |  kafka.consumer.old.requests                             |  counter         |  long          |                           |
consumer responses                               |  kafka.consumer.old.responses                            |  counter         |  long          |                           |
consumer fetcher bytes                           |  kafka.consumer.old.requests.bytes                       |  counter         |  long          |                           |
consumer response bytes                          |  kafka.consumer.old.responses.bytes                      |  double_counter  |  double        |                           |
consumer response mean bytes                     |  kafka.consumer.old.responses.mean.bytes                 |  gauge           |  double        |                           |
consumer requests time                           |  kafka.consumer.old.requests.time                        |  double_counter  |  double        |  ms                       |
consumer request mean time                       |  kafka.consumer.old.requests.mean.time                   |  gauge           |  double        |  ms                       |
consumer throttles time                          |  kafka.consumer.old.requests.throttle.time               |  double_counter  |  double        |  ms                       |
consumer throtles                                |  kafka.consumer.old.requests.throttles                   |  counter         |  long          |                           |
consumer throttle mean time                      |  kafka.consumer.old.requests.throttle.mean.time          |  gauge           |  double        |  ms                       |
consumer assigned partitions                     |  kafka.consumer.partitions.assigned                      |  gauge           |  double        |                           |  The number of partitions currently assigned to consumer
consumer heartbeats rate                         |  kafka.consumer.coordinator.heartbeat.rate               |  gauge           |  double        |  beats/sec                |  The number of hearthbeats per second
consumer heartbeat response max time             |  kafka.consumer.coordinator.heartbeat.time               |  gauge           |  double        |  ms                       |  The max time taken to receive a response to a heartbeat request
consumer last heartbeat                          |  kafka.consumer.coordinator.heartbeat.last               |  gauge           |  double        |  sec                      |  The number of seconds since the last controller heartbeat
consumer join rate                               |  kafka.consumer.coordinator.join.rate                    |  gauge           |  double        |  joins/sec                |  The number of group joins per second
consumer join time                               |  kafka.consumer.coordinator.join.time                    |  gauge           |  double        |  ms                       |  The average time taken for a group rejoin
consumer join max time                           |  kafka.consumer.coordinator.join.time.max                |  gauge           |  double        |  ms                       |  The max time taken for a group rejoin
consumer syncs rate                              |  kafka.consumer.coordinator.sync.rate                    |  gauge           |  double        |  syncs/sec                |  The number of group syncs per second
consumer sync time                               |  kafka.consumer.coordinator.sync.time                    |  gauge           |  double        |  ms                       |  The average time taken for a group sync
consumer sync max time                           |  kafka.consumer.coordinator.sync.time.max                |  gauge           |  double        |  ms                       |  The max time taken for a group sync
consumer commit latency                          |  kafka.consumer.coordinator.commit.latency               |  gauge           |  double        |  ms                       |
consumer commit max latency                      |  kafka.consumer.coordinator.commit.latency.max           |  gauge           |  double        |  ms                       |
consumer commits rate                            |  kafka.consumer.coordinator.commit.rate                  |  gauge           |  double        |  commits/sec              |
producer batch size                              |  kafka.producer.batch.size                               |  gauge           |  double        |  bytes/req                |  The average number of bytes sent per partition per-request.
producer max batch size                          |  kafka.producer.batch.size.max                           |  gauge           |  double        |  bytes/req                |  The max number of bytes sent per partition per-request.
producer compression rate                        |  kafka.producer.compression.rate                         |  gauge           |  double        |  %                        |  The average compression rate of record batches.
producer buffer available bytes                  |  kafka.producer.buffer.available                         |  gauge           |  double        |  bytes                    |  The total amount of buffer memory that is not being used (either unallocated or in the free list).
producer buffer total bytes                      |  kafka.producer.buffer.size                              |  gauge           |  double        |  bytes                    |  The maximum amount of buffer memory the client can use (whether or not it is currently used).
producer buffer pool wait ratio                  |  kafka.producer.buffer.pool.wait.ratio                   |  gauge           |  double        |  %                        |  The fraction of time an appender waits for space allocation.
broker active controllers                        |  kafka.broker.controllers.active                         |  gauge           |  long          |                           |  Is controller active on broker
broker preferred replica imbalance count         |  kafka.broker.replica.imbalance                          |  gauge           |  long          |                           |
broker replica max lag                           |  kafka.broker.replica.lag.max                            |  gauge           |  long          |                           |
broker replica min fetch                         |  kafka.broker.replica.fetch.min                          |  gauge           |  double        |                           |
broker response queue                            |  kafka.broker.queue.response.size                        |  gauge           |  long          |  bytes                    |  Response Queue Size
broker request queue                             |  kafka.broker.queue.request.size                         |  gauge           |  long          |  bytes                    |  Request Queue Size
broker expires consumers                         |  kafka.broker.expires.consumer                           |  counter         |  long          |                           |  Number of expired delayed consumer fetch requests
broker expires followers                         |  kafka.broker.expires.follower                           |  counter         |  long          |                           |  Number of expired delayed follower fetch requests
broker all expires                               |  kafka.broker.expires.all                                |  counter         |  long          |                           |  Number of expired delayed producer requests
consumer connection creation rate                |  kafka.consumer.connections.create.rate                  |  gauge           |  double        |  conn/sec                 |  New connections established per second in the window.
consumer connection close rate                   |  kafka.consumer.connections.close.rate                   |  gauge           |  double        |  conn/sec                 |  Connections closed per second in the window.
consumer connection count                        |  kafka.consumer.connections                              |  gauge           |  double        |                           |  The current number of active connections.
consumer network io rate                         |  kafka.consumer.io.rate                                  |  gauge           |  double        |  op/sec                   |  The average number of network operations (reads or writes) on all connections per second.
consumer io wait ratio                           |  kafka.consumer.io.wait.ratio                            |  gauge           |  double        |  ms                       |  The fraction of time the I/O thread spent waiting.
consumer io ratio                                |  kafka.consumer.io.ratio                                 |  gauge           |  double        |  %                        |  The fraction of time the I/O thread spent doing I/O
consumer io wait time                            |  kafka.consumer.io.wait.time.ns                          |  gauge           |  double        |  ns                       |  The average length of time the I/O thread spent waiting for a socket ready for reads or writes.
consumer io time                                 |  kafka.consumer.io.time.ns                               |  gauge           |  double        |  ns                       |  The average length of time for I/O per select call.
consumer kafka commits                           |  kafka.consumer.old.commits.kafka                        |  counter         |  long          |                           |
consumer zk commits                              |  kafka.consumer.old.commits.zookeeper                    |  counter         |  long          |                           |
consumer rebalances count                        |  kafka.consumer.old.rebalances                           |  counter         |  long          |                           |
consumer rebalances time                         |  kafka.consumer.old.rebalances.time                      |  double_counter  |  double        |  ms                       |
consumer in bytes rate                           |  kafka.consumer.incomming.bytes.rate                     |  gauge           |  double        |  bytes/sec                |
broker log segments                              |  kafka.broker.log.segments                               |  gauge           |  long          |                           |
broker log size                                  |  kafka.broker.log.size                                   |  gauge           |  long          |  bytes                    |
broker log offset increasing                     |  kafka.broker.log.offset.end                             |  counter         |  long          |                           |
broker partitions under replicated               |  kafka.broker.partition.underreplicated                  |  gauge           |  double        |                           |
producer topic messages                          |  kafka.producer.old.topic.messages                       |  counter         |  long          |                           |
producer topic dropped messages                  |  kafka.producer.old.topic.messages.dropped               |  counter         |  long          |                           |
producer topic                                   |  kafka.producer.old.topic.bytes                          |  counter         |  long          |  bytes                    |
broker purgatory fetch delayed requests          |  kafka.broker.purgatory.requests.fetch.delayed           |  gauge           |  long          |                           |  Number of requests delayed in the fetch purgatory
broker purgatory fetch delayed requests size     |  kafka.broker.purgatory.requests.fetch.size              |  gauge           |  long          |                           |  Requests waiting in the fetch purgatory. This depends on value of fetch.wait.max.ms in the consumer
broker purgatory producer delayed requests       |  kafka.broker.purgatory.producer.requests.fetch.delayed  |  gauge           |  long          |                           |  Number of requests delayed in the producer purgatory
broker purgatory producer delayed requests size  |  kafka.broker.purgatory.producer.requests.fetch.size     |  gauge           |  long          |                           |  Requests waiting in the producer purgatory. This should be non-zero when acks = -1 is used in producers
broker partitions                                |  kafka.broker.partitions                                 |  gauge           |  long          |                           |  Number of partitions (lead or follower replicas) on broker
broker leader partitions                         |  kafka.broker.partitions.leader                          |  gauge           |  long          |                           |  Number of leader replicas on broker
broker offline partitions                        |  kafka.broker.partitions.offline                         |  gauge           |  long          |                           |  Number of unavailable partitions
broker under replicated partitions               |  kafka.broker.partitions.underreplicated                 |  gauge           |  long          |                           |  Number of partitions with unavailable replicas
consumer topic messages                          |  kafka.consumer.old.topic.messages                       |  counter         |  long          |                           |
consumer topic                                   |  kafka.consumer.old.topic.bytes                          |  counter         |  long          |  bytes                    |
consumer topic queue size                        |  kafka.consumer.old.topic.queue                          |  gauge           |  long          |                           |
consumer owned partitions                        |  kafka.consumer.old.partitions.owned                     |  gauge           |  long          |                           |
producer records send rate                       |  kafka.producer.records.send.rate                        |  gauge           |  double        |  rec/sec                  |  The average number of records sent per second.
producer records retry rate                      |  kafka.producer.records.retry.rate                       |  gauge           |  double        |  rec/sec                  |  The average per-second number of retried record sends
producer records error rate                      |  kafka.producer.records.error.rate                       |  gauge           |  double        |  errors/sec               |  The average per-second number of record sends that resulted in errors
producer records queue max time                  |  kafka.producer.records.queued.time.max                  |  gauge           |  double        |  ms                       |  The maximum time record batches spent in the record accumulator.
producer records queue time                      |  kafka.producer.records.queued.time                      |  gauge           |  double        |  ms                       |  The average time record batches spent in the record accumulator.
record size                                      |  kafka.producer.records.size                             |  gauge           |  double        |  The average record size  |  producer record size
producer record max size                         |  kafka.producer.records.size.max                         |  gauge           |  double        |  bytes                    |  The maximum record size
producer records per request                     |  kafka.producer.requests.records                         |  gauge           |  double        |  rec/req                  |  The average number of records per request.
producer requests max size                       |  kafka.producer.request.size.max                         |  gauge           |  double        |                           |
producer selects rate                            |  kafka.producer.selects.rate                             |  gauge           |  double        |  sel/sec                  |  Number of times the I/O layer checked for new I/O to perform per second
producer requests in flight                      |  kafka.producer.requests.inflight                        |  gauge           |  double        |                           |  The current number of in-flight requests awaiting a response.
producer waiting threads                         |  kafka.producer.threads.waiting                          |  gauge           |  double        |                           |  The number of user threads blocked waiting for buffer memory to enqueue their records
consumer records max lag                         |  kafka.consumer.records.lag.max                          |  gauge           |  double        |                           |  The maximum lag in terms of number of records for any partition
producer topic bytes rate                        |  kafka.producer.topic.bytes.rate                         |  gauge           |  double        |  bytes/sec                |  The average rate of bytes.
producer topic compression rate                  |  kafka.producer.topic.compression.rate                   |  gauge           |  double        |                           |  The average compression rate of records.
producer records sends rate                      |  kafka.producer.topic.records.send.rate                  |  gauge           |  double        |  sends/sec                |  The average number of records sent per second.
producer records retries rate                    |  kafka.producer.topic.records.retry.rate                 |  gauge           |  double        |  retries/sec              |  The average per-second number of retried record sends
producer records errors rate                     |  kafka.producer.topic.records.error.rate                 |  gauge           |  double        |  errors/sec               |  The average per-second number of record sends that resulted in errors
consumer fetcher lag                             |  kafka.consumer.fetcher.lag                              |  gauge           |  double        |                           |  Lag in messages per topic partition
consumer fetcher max lag                         |  kafka.consumer.fetcher.max.lag                          |  gauge           |  double        |                           |  Max lag in messages per topic partition
consumer fetcher avg lag                         |  kafka.consumer.fetcher.avg.lag                          |  gauge           |  double        |                           |  Average lag in messages per topic partition