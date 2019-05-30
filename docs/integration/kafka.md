title: Kafka Monitoring Integration
description: Monitor Kafka metrics for brokers, producers, and consumers, consumer lag and offset monitoring by consumer group, topic, or partition, and more. Our cloud and on-premises tools provide out of box Kafka graphs, reports and custom dashboards with built-in anomaly detection, threshold, and heartbeat alerts as well as easy chatops integrations

Sematext offers simple Kafka monitoring agent written in Java and Golang that provides full featured Kafka monitoring without CPU and memory overhead on your application. It's easy to install and require no changes in Kafka source code or source code of you application. 

## Sematext Kafka Monitoring Agent 
This lightweight, open-source [Java Monitoring Agent](https://github.com/sematext/sematext-agent-java) collects Kafka performance metrics and sends them to Sematext. The second part of the Sematext Kafka Monitoring Agent is a Golang based agent responsible for Operating System level metrics like network, I/O and more. 

The Sematext Kafka Monitoring Agent can be run in two different modes - *in-process* and *standalone*. The *in-process* one is run as a Java agent, it is simpler to initially setup, but will require restring your Kafka broker node when you will want to upgrade your monitoring Agent, i.e. to get new features. The benefit of *standalone* agent mode is that it is running as a separate process and doesn't require Kafka restart when it is upgraded.

After creating a [Kafka App in Sematext](https://apps.sematext.com/ui/monitoring-create) you need to install the Monitoring Agent on each host running your Kafka broker that you want to monitor. The full installation instructions can be found in the [setup instructions](https://apps.sematext.com/ui/howto/Solr/overview) displayed in the UI.

For example, on CentOS, you need to add Sematext Linux packages and install them with the following command:
```bash
sudo wget https://pub-repo.sematext.com/centos/sematext.repo -O /etc/yum.repos.d/sematext.repo
sudo yum clean all
sudo yum install spm-client
``` 

After that you need to setup the Kafka Monitoring Agent on your Kafka broker by running a command like this:
```bash
sudo bash /opt/spm/bin/setup-sematext  \
    --monitoring-token <your-monitoring-token-goes-here>   \
    --app-type kafka  \
    --app-subtype kafka-broker  \
    --agent-type javaagent  \
    --infra-token <your-infra-token-goes-here>
```

Keep in mind that your need to provide the Monitoring token and Infra token. They are both provided in the [installation instructions](https://apps.sematext.com/ui/howto/Kafka/overview) for your Kafka App. 

Finally, the last thing that needs to be done is adjusting the ```$KAFKA_HOME/bin/kafka-server-start.sh``` file and add the following section to the ```KAFKA_JMX_OPTS```:
```bash
-Dcom.sun.management.jmxremote -javaagent:/opt/spm/spm-monitor/lib/spm-monitor-generic.jar=<your-monitoring-token-goes-here>:kafka-broker:default
```

**You need to restart your Kafka broker after the above changes.**

To get the full view over some metrics - like the consumer lag, you also need to install monitoring on each of your Kafka producers and consumers. Here is how you can do that.

### Monitoring Producers

To have the full visibility into the whole Kafka pipeline it is crucial to monitor your Kafka producers as well. If your are using Java or Scala as the language of your choice for the producers implementation you need to install the Kafka Monitoring Agent on each host working as Kafka producer by running the following command (i.e. for CentOS):

```bash
sudo wget https://pub-repo.sematext.com/centos/sematext.repo -O /etc/yum.repos.d/sematext.repo
sudo yum clean all
sudo yum install spm-client
``` 

After that run the following command to setup Kafka producer monitoring:

```bash
sudo bash /opt/spm/bin/setup-sematext  \
    --monitoring-token <your-monitoring-token-goes-here>  \
    --app-type kafka  \
    --app-subtype kafka-producer  \
    --agent-type javaagent  \
    --infra-token <your-infra-token-goes-here>
```

Once that is done you need to add the following options to the JVM start-up properties:
```bash
-Dcom.sun.management.jmxremote -javaagent:/opt/spm/spm-monitor/lib/spm-monitor-generic.jar=<your-monitoring-token-goes-here>:kafka-producer:default
```

**You need to restart your Kafka producer after the above changes.**

### Monitoring Consumers

Monitoring your consumers is crucial to have the visibility into the topic lag, which can help you quickly identify issues with your pipeline. If your are using Java or Scala as the language of your choice for the Kafka consumers implementation you need to install the Kafka Monitoring Agent on each host working as Kafka consumer by running the following command (i.e. for CentOS):

```bash
sudo wget https://pub-repo.sematext.com/centos/sematext.repo -O /etc/yum.repos.d/sematext.repo
sudo yum clean all
sudo yum install spm-client
``` 

After that run the following command to setup Kafka consumer monitoring:

```bash
sudo bash /opt/spm/bin/setup-sematext  \
    --monitoring-token <your-monitoring-token-goes-here>   \
    --app-type kafka  \
    --app-subtype kafka-consumer  \
    --agent-type javaagent  \
    --infra-token <your-infra-token-goes-here>
```

Once that is done you need to add the following options to the JVM start-up properties:
```bash
-Dcom.sun.management.jmxremote -javaagent:/opt/spm/spm-monitor/lib/spm-monitor-generic.jar=<your-monitoring-token-goes-here>:kafka-consumer:default
```

**You need to restart your Kafka consumer after the above changes.**

## Integration

- Agent: [https://github.com/sematext/sematext-agent-java](https://github.com/sematext/sematext-agent-java)
- Instructions: [https://apps.sematext.com/ui/howto/Kafka/overview](https://apps.sematext.com/ui/howto/Kafka/overview)

## More about Apache Kafka Monitoring

* [Apache Kafka Metrics To Monitor](https://sematext.com/blog/kafka-metrics-to-monitor/)
* [Apache Kafka Open Source Monitoring Tools](https://sematext.com/blog/kafka-open-source-monitoring-tools/)
* [Monitoring Apache Kafka With Sematext](https://sematext.com/blog/monitoring-kafka-with-sematext/)

## Metrics

Metric Name<br> Key *(Type)* *(Unit)*                                                                                    |  Description
-------------------------------------------------------------------------------------------------------------------------|---------------------------------------------------------------------------------------------------------
broker log cleaner buffer utilization<br>**kafka.broker.log.cleaner.clean.buffer.utilization** <br>*(long gauge)* *(%)*  |
broker log cleaner recopy<br>**kafka.broker.log.cleaner.recopy.percentage** <br>*(long gauge)* *(%)*                     |
broker log cleaner max time<br>**kafka.broker.log.cleaner.clean.time** <br>*(long gauge)* *(ms)*                         |
broker log cleaner dirty<br>**kafka.broker.log.cleaner.dirty.percentage** <br>*(long gauge)* *(%)*                       |
broker requests local time<br>**kafka.broker.requests.time.local** <br>*(double counter)* *(ms)*                         |
broker requests remote time<br>**kafka.broker.requests.time.remote** <br>*(double counter)* *(ms)*                       |
broker request queue time<br>**kafka.broker.requests.time.queue** <br>*(double counter)* *(ms)*                          |
broker requests<br>**kafka.broker.requests** <br>*(long counter)*                                                        |
broker response queue time<br>**kafka.broker.responses.time.queue** <br>*(double counter)* *(ms)*                        |
broker response send time<br>**kafka.broker.responses.time.send** <br>*(double counter)* *(ms)*                          |
broker requests total time<br>**kafka.broker.requests.time.total** <br>*(double counter)* *(ms)*                         |
broker leader elections<br>**kafka.broker.leader.elections** <br>*(long counter)*                                        |
broker leader elections time<br>**kafka.broker.leader.elections.time** <br>*(double counter)* *(ms)*                     |
broker leader unclean elections<br>**kafka.broker.leader.elections.unclean** <br>*(long counter)*                        |
broker active controllers<br>**kafka.broker.controllers.active** <br>*(long gauge)*                                      |  Is controller active on broker
broker offline partitions<br>**kafka.broker.partitions.offline** <br>*(long gauge)*                                      |  Number of unavailable partitions
broker preferred replica imbalances<br>**kafka.broker.replica.imbalance** <br>*(long gauge)*                             |
broker response queue<br>**kafka.broker.queue.response.size** <br>*(long gauge)* *(bytes)*                               |  Response queue size
broker request queue<br>**kafka.broker.queue.request.size** <br>*(long gauge)* *(bytes)*                                 |  Request queue size
broker expires consumers<br>**kafka.broker.expires.consumer** <br>*(long counter)*                                       |  Number of expired delayed consumer fetch requests
broker expires followers<br>**kafka.broker.expires.follower** <br>*(long counter)*                                       |  Number of expired delayed follower fetch requests
broker all expires<br>**kafka.broker.expires.all** <br>*(long counter)*                                                  |  Number of expired delayed producer requests
purgatory fetch delayed reqs<br>**kafka.broker.purgatory.requests.fetch.delayed** <br>*(long gauge)*                     |  Number of requests delayed in the fetch purgatory
purgatory fetch delayed reqs size<br>**kafka.broker.purgatory.requests.fetch.size** <br>*(long gauge)*                   |  Requests waiting in the fetch purgatory. This depends on value of fetch.wait.max.ms in the consumer
purgatory producer delayed reqs<br>**kafka.broker.purgatory.producer.requests.fetch.delayed** <br>*(long gauge)*         |  Number of requests delayed in the producer purgatory
purgatory producer delayed reqs size<br>**kafka.broker.purgatory.producer.requests.fetch.size** <br>*(long gauge)*       |  Requests waiting in the producer purgatory. This should be non-zero when acks = -1 is used in producers
broker replica max lag<br>**kafka.broker.replica.lag.max** <br>*(long gauge)*                                            |
broker replica min fetch<br>**kafka.broker.replica.fetch.min** <br>*(double gauge)*                                      |
broker isr expands<br>**kafka.broker.isr.expands** <br>*(long counter)*                                                  |  Number of times ISR for a partition expanded
broker isr shrinks<br>**kafka.broker.isr.shrinks** <br>*(long counter)*                                                  |  Number of times ISR for a partition shrank
broker leader partitions<br>**kafka.broker.partitions.leader** <br>*(long gauge)*                                        |  Number of leader replicas on broker
broker partitions<br>**kafka.broker.partitions** <br>*(long gauge)*                                                      |  Number of partitions (lead or follower replicas) on broker
broker under replicated partitions<br>**kafka.broker.partitions.underreplicated** <br>*(long gauge)*                     |  Number of partitions with unavailable replicas
broker log flushes<br>**kafka.broker.log.flushes** <br>*(long counter)* *(flushes/sec)*                                  |  Rate of flushing Kafka logs to disk
broker log flushes time<br>**kafka.broker.log.flushes.time** <br>*(double counter)* *(ms)*                               |  Time of flushing Kafka logs to disk
broker partitions under replicated<br>**kafka.broker.partition.underreplicated** <br>*(double gauge)*                    |
broker log offset increasing<br>**kafka.broker.log.offset.end** <br>*(long counter)*                                     |
broker log segments<br>**kafka.broker.log.segments** <br>*(long gauge)*                                                  |
broker log size<br>**kafka.broker.log.size** <br>*(long gauge)* *(bytes)*                                                |
broker topic in<br>**kafka.broker.topic.in.bytes** <br>*(long counter)* *(bytes)*                                        |
broker topic out<br>**kafka.broker.topic.out.bytes** <br>*(long counter)* *(bytes)*                                      |
broker topic failed fetch requests<br>**kafka.broker.topic.requests.fetch.failed** <br>*(long counter)*                  |
broker topic failed produce requests<br>**kafka.broker.topic.requests.produce.failed** <br>*(long counter)*              |
broker topic messages in<br>**kafka.broker.topic.in.messages** <br>*(long counter)*                                      |
broker topic rejected<br>**kafka.broker.topic.in.bytes.rejected** <br>*(long counter)* *(bytes)*                         |
consumer assigned partitions<br>**kafka.consumer.partitions.assigned** <br>*(double gauge)*                              |  The number of partitions currently assigned to consumer
consumer commits rate<br>**kafka.consumer.coordinator.commit.rate** <br>*(double gauge)* *(commits/sec)*                 |
consumer commit latency<br>**kafka.consumer.coordinator.commit.latency** <br>*(double gauge)* *(ms)*                     |
consumer commit max latency<br>**kafka.consumer.coordinator.commit.latency.max** <br>*(double gauge)* *(ms)*             |
consumer join rate<br>**kafka.consumer.coordinator.join.rate** <br>*(double gauge)* *(joins/sec)*                        |  The number of group joins per second
consumer join time<br>**kafka.consumer.coordinator.join.time** <br>*(double gauge)* *(ms)*                               |  The average time taken for a group rejoin
consumer join max time<br>**kafka.consumer.coordinator.join.time.max** <br>*(double gauge)* *(ms)*                       |  The max time taken for a group rejoin
consumer syncs rate<br>**kafka.consumer.coordinator.sync.rate** <br>*(double gauge)* *(syncs/sec)*                       |  The number of group syncs per second
consumer sync time<br>**kafka.consumer.coordinator.sync.time** <br>*(double gauge)* *(ms)*                               |  The average time taken for a group sync
consumer sync max time<br>**kafka.consumer.coordinator.sync.time.max** <br>*(double gauge)* *(ms)*                       |  The max time taken for a group sync
consumer heartbeats rate<br>**kafka.consumer.coordinator.heartbeat.rate** <br>*(double gauge)* *(beats/sec)*             |  The number of hearthbeats per second
consumer heartbeat response max time<br>**kafka.consumer.coordinator.heartbeat.time** <br>*(double gauge)* *(ms)*        |  The max time taken to receive a response to a heartbeat request
consumer last heartbeat<br>**kafka.consumer.coordinator.heartbeat.last** <br>*(double gauge)* *(sec)*                    |  The number of seconds since the last controller heartbeat
consumer fetcher max lag<br>**kafka.consumer.fetcher.max.lag** <br>*(double gauge)*                                      |  Max lag in messages per topic partition
consumer fetcher avg lag<br>**kafka.consumer.fetcher.avg.lag** <br>*(double gauge)*                                      |  Average lag in messages per topic partition
consumer fetcher lag<br>**kafka.consumer.fetcher.lag** <br>*(double gauge)*                                              |  Lag in messages per topic partition
bytes consumed rate<br>**kafka.consumer.bytes.rate** <br>*(double gauge)* *(bytes/sec)*                                  |  The average number of bytes consumed per second
records consumed rate<br>**kafka.consumer.records.rate** <br>*(double gauge)* *(rec/sec)*                                |  The average number of records consumed per second
consumer records max lag<br>**kafka.consumer.records.lag.max** <br>*(double gauge)*                                      |  The maximum lag in terms of number of records for any partition
consumer records per request<br>**kafka.consumer.requests.records.avg** <br>*(double gauge)* *(rec/req)*                 |  The average number of records per request
consumer fetch rate<br>**kafka.consumer.fetch.rate** <br>*(double gauge)* *(fetches/sec)*                                |  The number of fetch requests per second
consumer fetch avg size<br>**kafka.consumer.fetch.size** <br>*(double gauge)* *(bytes)*                                  |  The average number of bytes fetched per request
consumer fetch max size<br>**kafka.consumer.fetch.size.max** <br>*(double gauge)* *(bytes)*                              |  The maximum number of bytes fetched per request
consumer fetch latency<br>**kafka.consumer.fetch.latency** <br>*(double gauge)* *(ms)*                                   |  The average time taken for a fetch request
consumer fetch max latency<br>**kafka.consumer.fetch.latency.max** <br>*(double gauge)* *(ms)*                           |  The maximum time taken for a fetch request
consumer throttle time<br>**kafka.consumer.throttle.time** <br>*(double gauge)* *(ms)*                                   |  The avarage throttle time in ms
consumer throttle max time<br>**kafka.consumer.throttle.time.max** <br>*(double gauge)* *(ms)*                           |  The max throttle time in ms
consumer node requests rate<br>**kafka.consumer.node.request.rate** <br>*(double gauge)* *(req/sec)*                     |  The average number of requests sent per second.
consumer node request size<br>**kafka.consumer.node.request.size** <br>*(double gauge)* *(bytes)*                        |  The average size of all requests in the window..
consumer node in bytes rate<br>**kafka.consumer.node.in.bytes.rate** <br>*(double gauge)* *(bytes/sec)*                  |  Bytes/second read off socket
consumer node request max size<br>**kafka.consumer.node.request.size.max** <br>*(double gauge)* *(bytes)*                |  The maximum size of any request sent in the window.
consumer node out bytes rate<br>**kafka.consumer.node.out.bytes.rate** <br>*(double gauge)* *(bytes/sec)*                |  The average number of outgoing bytes sent per second to servers.
consumer node request max latency<br>**kafka.consumer.node.request.latency.max** <br>*(double gauge)* *(ms)*             |  The maximum request latency
consumer node request latency<br>**kafka.consumer.node.request.latency** <br>*(double gauge)* *(ms)*                     |  The average request latency
consumer node responses rate<br>**kafka.consumer.node.response.rate** <br>*(double gauge)* *(res/sec)*                   |  The average number of responses received per second.
consumer io ratio<br>**kafka.consumer.io.ratio** <br>*(double gauge)* *(%)*                                              |  The fraction of time the I/O thread spent doing I/O
consumer request size<br>**kafka.consumer.request.size** <br>*(double gauge)* *(bytes)*                                  |
consumer network io rate<br>**kafka.consumer.io.rate** <br>*(double gauge)* *(op/sec)*                                   |  The average number of network operations (reads or writes) on all connections per second.
consumer in bytes rate<br>**kafka.consumer.incomming.bytes.rate** <br>*(double gauge)* *(bytes/sec)*                     |
consumer connection count<br>**kafka.consumer.connections** <br>*(double gauge)*                                         |  The current number of active connections.
consumer requests rate<br>**kafka.consumer.requests.rate** <br>*(double gauge)* *(req/sec)*                              |
consumer selects rate<br>**kafka.consumer.selects.rate** <br>*(double gauge)* *(sel/sec)*                                |
consumer connection creation rate<br>**kafka.consumer.connections.create.rate** <br>*(double gauge)* *(conn/sec)*        |  New connections established per second in the window.
consumer connection close rate<br>**kafka.consumer.connections.close.rate** <br>*(double gauge)* *(conn/sec)*            |  Connections closed per second in the window.
consumer io wait ratio<br>**kafka.consumer.io.wait.ratio** <br>*(double gauge)* *(ms)*                                   |  The fraction of time the I/O thread spent waiting.
consumer io wait time<br>**kafka.consumer.io.wait.time.ns** <br>*(double gauge)* *(ns)*                                  |  The average length of time the I/O thread spent waiting for a socket ready for reads or writes.
consumer out bytes rate<br>**kafka.consumer.outgoing.bytes.rate** <br>*(double gauge)* *(bytes/sec)*                     |
consumer io time<br>**kafka.consumer.io.time.ns** <br>*(double gauge)* *(ns)*                                            |  The average length of time for I/O per select call.
consumer responses rate<br>**kafka.consumer.responses.rate** <br>*(double gauge)* *(res/sec)*                            |
producer node requests rate<br>**kafka.producer.node.requests.rate** <br>*(double gauge)* *(req/sec)*                    |  The average number of requests sent per second.
producer request size<br>**kafka.producer.requests.size** <br>*(double gauge)* *(bytes)*                                 |  The average size of all requests in the window.
producer node in bytes rate<br>**kafka.producer.node.in.bytes.rate** <br>*(double gauge)* *(bytes)*                      |  Bytes/second read off socket
producer request max size<br>**kafka.producer.requests.size.max** <br>*(double gauge)* *(bytes)*                         |  The maximum size of any request sent in the window.
producer node out bytes rate<br>**kafka.producer.node.out.bytes.rate** <br>*(double gauge)* *(bytes)*                    |  The average number of outgoing bytes sent per second to servers.
producer node request max latency<br>**kafka.producer.node.requests.latency.max** <br>*(double gauge)* *(ms)*            |  The maximum request latency
producer node request latency<br>**kafka.producer.node.requests.latency** <br>*(double gauge)* *(ms)*                    |  The average request latency
producer node responses rate<br>**kafka.producer.node.responses.rate** <br>*(double gauge)* *(res/sec)*                  |  The average number of responses received per second.
producer records retries rate<br>**kafka.producer.topic.records.retry.rate** <br>*(double gauge)* *(retries/sec)*        |  The average per-second number of retried record sends
producer topic compression rate<br>**kafka.producer.topic.compression.rate** <br>*(double gauge)*                        |  The average compression rate of records.
producer topic bytes rate<br>**kafka.producer.topic.bytes.rate** <br>*(double gauge)* *(bytes/sec)*                      |  The average rate of bytes.
producer records sends rate<br>**kafka.producer.topic.records.send.rate** <br>*(double gauge)* *(sends/sec)*             |  The average number of records sent per second.
producer records errors rate<br>**kafka.producer.topic.records.error.rate** <br>*(double gauge)* *(errors/sec)*          |  The average per-second number of record sends that resulted in errors
producer records queue time<br>**kafka.producer.records.queued.time** <br>*(double gauge)* *(ms)*                        |  The average time record batches spent in the record accumulator.
producer io ratio<br>**kafka.producer.io.ratio** <br>*(double gauge)* *(%)*                                              |  The fraction of time the I/O thread spent doing I/O
producer record max size<br>**kafka.producer.records.size.max** <br>*(double gauge)* *(bytes)*                           |  The maximum record size
producer request size<br>**kafka.producer.request.size** <br>*(double gauge)* *(bytes)*                                  |
producer requests max size<br>**kafka.producer.request.size.max** <br>*(double gauge)*                                   |
record size<br>**kafka.producer.records.size** <br>*(double gauge)* *(bytes)*                                            |  The average producer record size
producer request max latency<br>**kafka.producer.request.latency.max** <br>*(double gauge)* *(ms)*                       |
producer requests in flight<br>**kafka.producer.requests.inflight** <br>*(double gauge)*                                 |  The current number of in-flight requests awaiting a response.
producer buffer pool wait ratio<br>**kafka.producer.buffer.pool.wait.ratio** <br>*(double gauge)* *(%)*                  |  The fraction of time an appender waits for space allocation.
producer network io rate<br>**kafka.producer.io.rate** <br>*(double gauge)* *(op/sec)*                                   |  The average number of network operations (reads or writes) on all connections per second.
producer records queue max time<br>**kafka.producer.records.queued.time.max** <br>*(double gauge)* *(ms)*                |  The maximum time record batches spent in the record accumulator.
producer in bytes rate<br>**kafka.producer.in.bytes.rate** <br>*(double gauge)* *(bytes/sec)*                            |
producer connections count<br>**kafka.producer.connections** <br>*(double gauge)*                                        |  The current number of active connections.
producer metadata age<br>**kafka.producer.metadata.age** <br>*(double gauge)* *(ms)*                                     |
producer records per request<br>**kafka.producer.requests.records** <br>*(double gauge)* *(rec/req)*                     |  The average number of records per request.
producer records retry rate<br>**kafka.producer.records.retry.rate** <br>*(double gauge)* *(rec/sec)*                    |  The average per-second number of retried record sends
producer buffer total bytes<br>**kafka.producer.buffer.size** <br>*(double gauge)* *(bytes)*                             |  The maximum amount of buffer memory the client can use (whether or not it is currently used).
producer compression rate<br>**kafka.producer.compression.rate** <br>*(double gauge)* *(%)*                              |  The average compression rate of record batches.
producer buffer available bytes<br>**kafka.producer.buffer.available** <br>*(double gauge)* *(bytes)*                    |  The total amount of buffer memory that is not being used (either unallocated or in the free list).
producer requests rate<br>**kafka.producer.requests.rate** <br>*(double gauge)* *(req/sec)*                              |
producer records send rate<br>**kafka.producer.records.send.rate** <br>*(double gauge)* *(rec/sec)*                      |  The average number of records sent per second.
producer selects rate<br>**kafka.producer.selects.rate** <br>*(double gauge)* *(sel/sec)*                                |  Number of times the I/O layer checked for new I/O to perform per second
producer request latency<br>**kafka.producer.request.latency** <br>*(double gauge)* *(ms)*                               |
producer records error rate<br>**kafka.producer.records.error.rate** <br>*(double gauge)* *(errors/sec)*                 |  The average per-second number of record sends that resulted in errors
producer connection creation rate<br>**kafka.producer.connections.create.rate** <br>*(double gauge)* *(conn/sec)*        |  New connections established per second in the window.
producer max batch size<br>**kafka.producer.batch.size.max** <br>*(double gauge)* *(bytes/req)*                          |  The max number of bytes sent per partition per-request.
producer connection close rate<br>**kafka.producer.connections.close.rate** <br>*(double gauge)* *(conn/sec)*            |  Connections closed per second in the window.
producer waiting threads<br>**kafka.producer.threads.waiting** <br>*(double gauge)*                                      |  The number of user threads blocked waiting for buffer memory to enqueue their records
producer batch size<br>**kafka.producer.batch.size** <br>*(double gauge)* *(bytes/req)*                                  |  The average number of bytes sent per partition per-request.
producer io wait ratio<br>**kafka.producer.io.wait.ratio** <br>*(double gauge)* *(%)*                                    |  The fraction of time the I/O thread spent waiting.
producer io wait time<br>**kafka.producer.io.wait.time.ns** <br>*(double gauge)* *(ms)*                                  |  The average length of time the I/O thread spent waiting for a socket ready for reads or writes.
producer out bytes rate<br>**kafka.producer.out.bytes.rate** <br>*(double gauge)* *(bytes/sec)*                          |
producer io time<br>**kafka.producer.io.time.ns** <br>*(double gauge)* *(ms)*                                            |  The average length of time for I/O per select call.
producer responses rate<br>**kafka.producer.responses.rate** <br>*(double gauge)* *(res/sec)*                            |
consumer kafka commits<br>**kafka.consumer.old.commits.kafka** <br>*(long counter)*                                      |
consumer zk commits<br>**kafka.consumer.old.commits.zookeeper** <br>*(long counter)*                                     |
consumer rebalances count<br>**kafka.consumer.old.rebalances** <br>*(long counter)*                                      |
consumer rebalances time<br>**kafka.consumer.old.rebalances.time** <br>*(double counter)* *(ms)*                         |
consumer topic queue size<br>**kafka.consumer.old.topic.queue** <br>*(long gauge)*                                       |
consumer fetcher bytes<br>**kafka.consumer.old.requests.bytes** <br>*(long counter)*                                     |
consumer throttle mean time<br>**kafka.consumer.old.requests.throttle.mean.time** <br>*(double gauge)* *(ms)*            |
consumer throtles<br>**kafka.consumer.old.requests.throttles** <br>*(long counter)*                                      |
consumer throttles time<br>**kafka.consumer.old.requests.throttle.time** <br>*(double counter)* *(ms)*                   |
consumer request mean time<br>**kafka.consumer.old.requests.mean.time** <br>*(double gauge)* *(ms)*                      |
consumer requests time<br>**kafka.consumer.old.requests.time** <br>*(double counter)* *(ms)*                             |
consumer response mean bytes<br>**kafka.consumer.old.responses.mean.bytes** <br>*(double gauge)*                         |
consumer responses<br>**kafka.consumer.old.responses** <br>*(long counter)*                                              |
consumer response bytes<br>**kafka.consumer.old.responses.bytes** <br>*(double counter)*                                 |
consumer topic<br>**kafka.consumer.old.topic.bytes** <br>*(long counter)* *(bytes)*                                      |
consumer topic messages<br>**kafka.consumer.old.topic.messages** <br>*(long counter)*                                    |
consumer owned partitions<br>**kafka.consumer.old.partitions.owned** <br>*(long gauge)*                                  |
producer requests<br>**kafka.producer.old.requests** <br>*(long counter)*                                                |
producer request size<br>**kafka.producer.old.requests.size** <br>*(double counter)* *(bytes)*                           |
producer request time<br>**kafka.producer.old.requests.time** <br>*(double counter)* *(ms)*                              |
producer sends failed<br>**kafka.producer.old.sends.failed** <br>*(long counter)*                                        |
producer resends<br>**kafka.producer.old.resends** <br>*(long counter)*                                                  |
producer serialization errors<br>**kafka.producer.errors.serialization** <br>*(long counter)*                            |
producer topic<br>**kafka.producer.old.topic.bytes** <br>*(long counter)* *(bytes)*                                      |
producer topic dropped messages<br>**kafka.producer.old.topic.messages.dropped** <br>*(long counter)*                    |
producer topic messages<br>**kafka.producer.old.topic.messages** <br>*(long counter)*                                    |
