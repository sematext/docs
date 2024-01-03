title: RabbitMQ
description: Comprehensive view of RabbitMQ's health and performance using Sematext's monitoring and logs integration. Monitor real-time metrics, leverage reports and dashboards for proactive issue identification, and troubleshoot various RabbitMQ issues, including connection and access, through detailed logs analysis.

RabbitMQ is an open-source message broker software that facilitates message queuing, enabling communication and transfer of data between distributed applications. The [Sematext Agent](https://sematext.com/docs/agents/sematext-agent/) collects RabbitMQ metrics and logs, transmits them to Sematext Cloud; installing the agent takes less than 5 minutes.

## Install Sematext Agent

1. Create an RabbitMQ Logs or Monitoring [App](https://sematext.com/docs/guide/app-guide/). This will let you install the agent and control access to your monitoring and logs data.
2. Install the Sematext Agent according to the [https://apps.sematext.com/ui/howto/RabbitMQ/overview](https://apps.sematext.com/ui/howto/RabbitMQ/overview) displayed in the UI.
3. Install the [RabbitMQ management plugin](https://www.rabbitmq.com/management.html), if it's not already installed
4. create a user with `administrator` tags, to be able to get all metrics
4. Configure Sematext Agent to connect to the RabbitMQ host and port (`localhost:15672` by default), using your App token and the newly created user's credentials
5. After installing the agent and configuring RabbitMQ, the Discovery tab shows all the RabbitMQ services identified on the host and you will start receiving metrics or logs from RabbitMQ services.
6. If you've created an RabbitMQ Monitoring App and want to collect RabbitMQ logs as well, or vice versa, click on the **Create Logs App** button from the left menu panel. This will navigate you to the 'Create Logs App' (or Monitoring App) page, where you'll find all the discovered log sources from RabbitMQ services and manage log and metric shipping effortlessly.

Having both RabbitMQ Logs and Monitoring Apps lets you correlate performance metrics and logs, and accelerate troubleshooting using [Split Screen](https://sematext.com/docs/guide/split-screen/) for faster resolution.For example, if you see a spike in connection metrics, you can check logs to see what are the sources of these connections. Or if you see an increase in authentication errors, monitoring can tell what's the impact on RabbitMQ's memory usage, garbage collection and CPU.

To [explore logs and services](https://sematext.com/docs/monitoring/autodiscovery/) across multiple hosts, navigate to [Fleet & Discovery > Discovery > Services](https://apps.sematext.com/ui/fleet-and-discovery/discovery/services) (or  [Sematext Cloud Europe](https://apps.eu.sematext.com/ui/fleet-and-discovery/discovery/services)). From there, you can create additional [Apps](https://sematext.com/docs/guide/app-guide/) or stream data to existing ones without requiring any additional installations. 

## Important RabbitMQ Metrics to Watch

The usual entry point is the Messages report: do you have many messages published in a specific timeframe? Out of those, how many are unacknowledged or redelivered? These could be red flags.

![RabbitMQ Messages Report](../images/agents/rabbitmq_monitoring_messages.png)

If there are any signs of trouble, it's time to dig deeper. Is the RabbitMQ server itself at fault? Check the Nodes metrics, such as Garbage Collection or Run Queue size:

![RabbitMQ Nodes Report](../images/agents/rabbitmq_monitoring_nodes.png)

Finally, OS-level metrics can also point out bottlenecks, such as network or CPU:

![RabbitMQ CPU Chart](../images/agents/rabbitmq_monitoring_cpu.png)

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

## Logs

Once data is in, you can explore it via the built-in reports: 

![RabbitMQ Logs Overview](../images/agents/rabbitmq_overview.png)

## Exploring logs

Once data is in, you can explore it using the built-in reports or create your own. For example, you can use the Authentication report to check on granted and denied connections:

![RabbitMQ Authentication Overview](../images/agents/rabbitmq_auth.png)

Other built-in reports include:

- **Connections**: Logs specifically about accepted and closed connections. You can see here when you have spikes in connection creation. You can also identify noisy sources, users, as well as popular destinations.
- **Start & Stop**: Logs about RabbitMQ startup and shutdown. Besides unexpected restarts, you can find info about which write-ahead logs (WALs) were recovered.

## Troubleshooting

If you are having trouble sending logs, try out the latest version of the [Sematext Agent](../agents/sematext-agent/installation/). Additionally, make sure to check out the [Log Agents panel](https://sematext.com/docs/fleet/#log-agents) for any errors, and refer to our [Sematext Logs FAQ](https://sematext.com/docs/logs/faq/) for useful tips.
