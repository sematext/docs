title: OpenSearch Monitoring Integration
description: Collect and monitor key OpenSearch metrics such as Cluster States and Pending Tasks, memory tied to shards, search latency, request rate, request cache, query/filter cache with built-in anomaly detection, threshold, and heartbeat alerts. Send notifications to email and various chatops messaging services, correlate events & logs, filter metrics by server, node, time or index, and visualize your cluster's health with out of the box graphs and custom dashboards

## Integration

- Instructions: [https://apps.sematext.com/ui/howto/opensearch/overview](https://apps.sematext.com/ui/howto/opensearch/overview)

## Metrics (WIP)

Metric Name<br> Key *(Type)* *(Unit)*                                                                             |  Description
------------------------------------------------------------------------------------------------------------------|-------------------------------------------------------------------
outgoing searches<br>**adaptiveReplicaSelection.searches.outgoing** <br>*(long gauge)*                            |  searches from the monitored node to the remote node
average queue size<br>**adaptiveReplicaSelection.queue.size.avg** <br>*(double gauge)*                            |  exponentially weighted moving average queue size for searches on the remote node
average service time<br>**adaptiveReplicaSelection.service.time.avg** <br>*(long gauge)* *(ns)*                   |  exponentially weighted moving average task execution time on the remote node
average response time<br>**adaptiveReplicaSelection.response.time.avg** <br>*(long gauge)* *(ns)*                 |  exponentially weighted moving average response time on the remote node
rank<br>**adaptiveReplicaSelection.rank** <br>*(double gauge)*                                                    |  rank of the remote node used for replica selection
inFlightRequests max size<br>**circuitBreaker.inFlightRequests.size.max** <br>*(long gauge)* *(bytes)*            |  max in-flight requests size
inFlightRequests estimated size<br>**circuitBreaker.inFlightRequests.size.estimate** <br>*(long gauge)* *(bytes)* |  estimated in-flight requests size
inFlightRequests overhead<br>**circuitBreaker.inFlightRequests.size.overhead** <br>*(double gauge)*               |  in-flight requests overhead
inFlightRequests tripped<br>**circuitBreaker.inFlightRequests.tripped** <br>*(counter)*                           |  in-flight requests circuit breaker tripped
nodes<br>**cluster.nodes** <br>*(long gauge)*                                                                     |  Number of nodes in the cluster
data nodes<br>**cluster.nodes.data** <br>*(long gauge)*                                                           |  Number of data nodes in the cluster
active primary shards<br>**cluster.health.shards.active.primary** <br>*(long gauge)*                              |  Number of active primary shards
active shards<br>**cluster.health.shards.active** <br>*(long gauge)*                                              |  Number of active shards
relocating shards<br>**cluster.health.shards.relocating** <br>*(long gauge)*                                      |  Number of currently relocating shards
unassigned shards<br>**cluster.health.shards.unassigned** <br>*(long gauge)*                                      |  Number of currently unassigned shards
pending tasks<br>**cluster.health.pendingTasks.total** <br>*(long gauge)*                                         |  Number of currently pending tasks in master's queue
pending tasks max waiting time<br>**cluster.health.pendingTasks.maxQueueTime** <br>*(long gauge)* *(ms)*          |  Maximum time for a task in master's queue











