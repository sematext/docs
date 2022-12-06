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
