title: RabbitMQ Monitoring Integration
description: Comprehensive view of your RabbitMQ health and performance with Sematext RabbitMQ monitoring integration. Our infrastructure monitoring tools provide real-time visibility into the performance and availability of various RabbitMQ metrics. Use built-in reports and dashboards, and identify and investigate RabbitMQ issues before they become incidents

Use the Sematext RabbitMQ Monitoring integration to check on your RabbitMQ metrics. From simply checking message counts to tuning RabbitMQ's performance, all the relevant metrics are collected and displayed in built-in dashboards:

<img
  class="content-modal-image"
  alt="RabbitMQ Monitoring Overview"
  src="../../images/agents/rabbitmq_monitoring_overview.png"
  title="RabbitMQ Monitoring Overview"
/>

Be sure to check out the [RabbitMQ Logs integration](./rabbitmq-logs.md) as well, to get a complete view on RabbitMQ. For example, if you see a spike in connection metrics, you can check logs to see what are the sources of these connections.

## Agent Install

You can find the [complete instructions](https://apps.sematext.com/ui/howto/rabbitmq/overview) in the Integrations screen of your Monitoring App, but the basic steps are:

- install the Sematext Agent
- install the [RabbitMQ management plugin](https://www.rabbitmq.com/management.html), if it's not already installed
- create a user with `administrator` tags, to be able to get all metrics
- configure Sematext Agent to connect to the RabbitMQ host and port (`localhost:15672` by default), using your App token and the newly created user's credentials

## Important RabbitMQ Metrics to Watch

The usual entry point is the Messages report: do you have many messages published in a specific timeframe? Out of those, how many are unacknowledged or redelivered? These could be red flags.

<img
  class="content-modal-image"
  alt="RabbitMQ Messages Report"
  src="../../images/agents/rabbitmq_monitoring_messages.png"
  title="RabbitMQ Messages Report"
/>

If there are any signs of trouble, it's time to dig deeper. Is the RabbitMQ server itself at fault? Check the Nodes metrics, such as Garbage Collection or Run Queue size:

<img
  class="content-modal-image"
  alt="RabbitMQ Nodes Report"
  src="../../images/agents/rabbitmq_monitoring_nodes.png"
  title="RabbitMQ Nodes Report"
/>

Finally, OS-level metrics can also point out bottlenecks, such as network or CPU:

<img
  class="content-modal-image"
  alt="RabbitMQ CPU Chart"
  src="../../images/agents/rabbitmq_monitoring_cpu.png"
  title="RabbitMQ CPU Chart"
/>

## Metrics

Metric Name<br> Key *(Type)* *(Unit)*                                                                     |  Description
----------------------------------------------------------------------------------------------------------|----------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------
connections<br>**connections.count** <br>*(gauge)*  |  Total number of connections
channels<br>**channels.count** <br>*(gauge)*  |  Total number of channels
queues<br>**queues.count** <br>*(gauge)*  |  Total number of queues
consumers<br>**consumers.count** <br>*(gauge)*  |   Total number of consumers
messages<br>**messages.count** <br>*(gauge)*  |  Total number of messages (ready plus unacknowledged)
ready messages<br>**messages.ready.count** <br>*(gauge)*  |  Number of messages ready for delivery
unacknowledged messages<br>**messages.unacknowledged.count** <br>*(gauge)*  |  Number of unacknowledged messages
ack messages<br>**messages.acked** <br>*(counter)*  |  Number of messages delivered to clients and acknowledged
confirmed messages<br>**messages.confirmed** <br>*(counter)*  |  Count of messages confirmed
delivered get messages<br>**messages.delivered.get** <br>*(counter)*  |  Sum of messages delivered in acknowledgement mode to consumers, in no-acknowledgement mode to consumers, in acknowledgement mode in response to basic.get, and in no-acknowledgement mode in response to basic.get
published messages<br>**messages.published** <br>*(counter)*  |  Count of messages published
published in messages<br>**messages.published.in** <br>*(counter)*  |  Count of messages published from channels into this exchange
published out messages<br>**messages.published.out** <br>*(counter)*  |  Count of messages published from this exchange into queues
unroutable messages<br>**messages.returned.unroutable** <br>*(counter)*  |  Count of messages returned to publisher as unroutable
redelivered messages<br>**messages.redelivered** <br>*(counter)*  |  Count of subset of messages in deliver_get which had the redelivered flag set
ack messages<br>**exchanges.messages.acked** <br>*(counter)*  |   Number of messages delivered to clients and acknowledged (per exchange)
confirmed messages<br>**exchanges.messages.confirmed** <br>*(counter)*  |  Count of messages confirmed (per exchange)
delivered get messages<br>**exchanges.messages.delivered.get** <br>*(counter)*  |  Sum of messages delivered in acknowledgement mode to consumers, in no-acknowledgement mode to consumers, in acknowledgement mode in response to basic.get, and in no-acknowledgement mode in response to basic.get. Also per exchange
published messages<br>**exchanges.messages.published** <br>*(counter)*  |  Count of messages published, per exchange
published in messages<br>**exchanges.messages.published.in** <br>*(counter)*  |  Count of messages published from channels into this exchange
published out messages<br>**exchanges.messages.published.out** <br>*(counter)*  |  Count of messages published from this exchange into queues
unroutable messages<br>**exchanges.messages.returned.unroutable** <br>*(counter)*  |  Count of messages returned to publisher as unroutable (per exchange)
redelivered messages<br>**exchanges.messages.redelivered** <br>*(counter)*  |  Count of subset of messages in deliver_get which had the redelivered flag set (per exchange)
GC count<br>**gc.count** <br>*(counter)*  |  Number of garbage collections
GC bytes reclaimed<br>**gc.reclaimed.bytes** <br>*(counter)*  |  Bytes reclaimed by garbage collections
used files<br>**file.descriptors.used** <br>*(gauge)*  |  Used file descriptors
free space<br>**disk.free** <br>*(counter)*  |  Current free disk space
used memory<br>**memory.used** <br>*(gauge)*  |  Memory used in bytes
waiting processes<br>**process.wait** <br>*(gauge)*  |  Average number of Erlang processes waiting to run
used sockets<br>**sockets.used** <br>*(gauge)*  |  Number of file descriptors used as sockets
partitions<br>**network.partitions** <br>*(gauge)*  |  Number of network partitions this node is seeing
running<br>**node.running** <br>*(gauge)*  |  Is the node running or not
memory alarm<br>**memory.alarm.enabled** <br>*(gauge)*  |  Does the host have memory alarm
disk alarm<br>**disk.alarm.enabled** <br>*(gauge)*  |  Does the node have disk alarm
active consumers<br>**queues.consumers.active** <br>*(gauge)*  |  Number of active consumers, consumers that can immediately receive any messages sent to the queue
consumers<br>**queues.consumers** <br>*(gauge)*  |  Number of consumers
consumer utilisation<br>**queues.consumer.utilisation** <br>*(gauge)*  |  The ratio of time that a queue's consumers can take new messages
memory<br>**queues.memory** <br>*(gauge)*  |  Bytes of memory consumed by the Erlang process associated with the queue, including stack, heap and internal structures
messages<br>**queues.messages** <br>*(gauge)*  |  Count of the total messages in the queue
ready messages<br>**queues.messages.ready** <br>*(gauge)*  |  Number of messages ready to be delivered to clients (per queue)
unacknowledged messages<br>**queues.messages.unacknowledged** <br>*(gauge)*  |  Number of messages delivered to clients but not yet acknowledged (per queue)
ack messages<br>**queues.messages.acked** <br>*(counter)*  |  Number of messages delivered to clients and acknowledged (per queue)
delivered messages<br>**queues.messages.delivered** <br>*(counter)*  |  Count of messages delivered in acknowledgement mode to consumers (per queue)
delivered get messages<br>**queues.messages.delivered.get** <br>*(counter)*  |  Sum of messages delivered in acknowledgement mode to consumers, in no-acknowledgement mode to consumers, in acknowledgement mode in response to basic.get, and in no-acknowledgement mode in response to basic.get. Per queue.
published messages<br>**queues.messages.published** <br>*(counter)*  |  Count of messages published (per queue)
redelivered messages<br>**queues.messages.redelivered** <br>*(counter)*  |  Count of subset of messages in deliver_get which had the redelivered flag set
