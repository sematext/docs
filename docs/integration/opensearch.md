title: OpenSearch Monitoring Integration
description: Collect and monitor key OpenSearch metrics such as Cluster States and Pending Tasks, memory tied to shards, search latency, request rate, request cache, query/filter cache with built-in anomaly detection, threshold, and heartbeat alerts. Send notifications to email and various chatops messaging services, correlate events & logs, filter metrics by server, node, time or index, and visualize your cluster's health with out of the box graphs and custom dashboards

## Integration

- Instructions: [https://apps.sematext.com/ui/howto/opensearch/overview](https://apps.sematext.com/ui/howto/opensearch/overview)

## Metrics (WIP)

Metric Name<br> Key *(Type)* *(Unit)*                                                                          |  Description
---------------------------------------------------------------------------------------------------------------|-------------------------------------------------------------------
parent max size<br>**es.circuitBreaker.parent.size.max** <br>*(long gauge)* *(bytes)*                    |  max parent circuit breaker size
parent estimated size<br>**es.circuitBreaker.parent.size.estimate** <br>*(long gauge)* *(bytes)*                    |  estimated parent circuit breaker size

