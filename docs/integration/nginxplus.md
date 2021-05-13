title: NginxPlus Monitoring Integration
description: The Sematext monitoring agent can collect many metrics from NginxPlus instances, including requests, reading, writing, waiting, active and more. Utilize built-in anomaly detection, threshold, and heartbeat alerting and send notifications to email and various chatops messaging services. Correlate events & logs, filter metrics by server or time, and visualize your cluster's health with out of the box graphs and custom dashboards

## Integration

- Instructions: [https://apps.sematext.com/ui/howto/Nginx-Plus/overview](https://apps.sematext.com/ui/howto/Nginx-Plus/overview)

## Metrics

Metric Name<br> Key *(Type)* *(Unit)*                                                                    |  Description
---------------------------------------------------------------------------------------------------------|----------------------------------------------------------------------------------------------------------------------------------------------------------------
cache size<br>**nginxp.cache.size** <br>*(long gauge)*                                                   |  The current size of the cache
max cache size<br>**nginxp.cache.size.max** <br>*(long gauge)*                                           |  The limit on the maximum size of the cache specified in the configuration
cold state<br>**nginxp.cache.cold** <br>*(long gauge)*                                                   |  The number of time cache in cold state
responses hits<br>**nginxp.cache.hits.responses** <br>*(long counter)*                                   |  The number of responses read from the cache
responses hits size<br>**nginxp.cache.hits.bytes** <br>*(long counter)* *(bytes)*                        |  The number of bytes read from the cache
stale responses<br>**nginxp.cache.stale.responses** <br>*(long counter)*                                 |  The number of stale responses read from the cache
stale responses size<br>**nginxp.cache.stale.bytes** <br>*(long counter)* *(bytes)*                      |  The number of stale bytes read from the cache
updating responses<br>**nginxp.cache.updating.responses** <br>*(long counter)*                           |  The number of updating responses read from the cache
updating responses size<br>**nginxp.cache.updating.bytes** <br>*(long counter)* *(bytes)*                |  The number of updating bytes read from the cache
revalidated responses<br>**nginxp.cache.revalidated.responses** <br>*(long counter)*                     |  The number of revalidated responses read from the cache
revalidated responses size<br>**nginxp.cache.revalidated.bytes** <br>*(long counter)* *(bytes)*          |  The number of revalidated bytes read from the cache
cache missed responses<br>**nginxp.cache.miss.responses** <br>*(long counter)*                           |  The number of responses not taken from the cache
miss responses size<br>**nginxp.cache.miss.bytes** <br>*(long counter)* *(bytes)*                        |  The number of bytes read from the proxied server
miss responses written<br>**nginxp.cache.miss.responses.written** <br>*(long counter)*                   |  The number of miss responses written to the cache
miss written size<br>**nginxp.cache.miss.bytes.written** <br>*(long counter)* *(bytes)*                  |  The number of miss bytes written to the cache
expired responses<br>**nginxp.cache.expired.responses** <br>*(long counter)*                             |  The number of expired responses not taken from the cache
expired responses size<br>**nginxp.cache.expired.bytes** <br>*(long counter)* *(bytes)*                  |  The number of expired bytes written to the cache
expired responses written<br>**nginxp.cache.expired.responses.written** <br>*(long counter)*             |  The number of expired responses written to the cache
expired responses written size<br>**nginxp.cache.expired.bytes.written** <br>*(long counter)* *(bytes)*  |  The number of expired bytes written to the cache
bypass responses<br>**nginxp.cache.bypass.responses** <br>*(long counter)*                               |  The number of bypass responses not taken from the cache
bypass responses size<br>**nginxp.cache.bypass.bytes** <br>*(long counter)* *(bytes)*                    |  The number of bypass bytes written to the cache
bypass responses written<br>**nginxp.cache.bypass.responses.written** <br>*(long counter)*               |  The number of bypass responses written to the cache
bypass responses written size<br>**nginxp.cache.bypass.bytes.written** <br>*(long counter)* *(bytes)*    |  The number of bypass bytes written to the cache
accepted connections<br>**nginxp.connections.accepted** <br>*(long counter)*                             |  The number of accepted client connections
dropped connections<br>**nginxp.connections.dropped** <br>*(long counter)*                               |  The number of idle client connections
active connections<br>**nginxp.connections.active** <br>*(long gauge)*                                   |  The current number of active connections
idle connections<br>**nginxp.connections.idle** <br>*(long gauge)*                                       |  The current number of idle client connections
total requests<br>**nginxp.requests** <br>*(long counter)*                                               |  The total number of client requests
current active requests<br>**nginxp.requests.current** <br>*(long gauge)*                                |  The current number of client requests
zone total requests<br>**nginxp.zone.requests** <br>*(long counter)*                                     |  The total number of client requests received from clients
processing requests<br>**nginxp.zone.requests.processing** <br>*(long gauge)*                            |  The number of client requests that are currently being processed
discarded requests<br>**nginxp.zone.requests.discarded** <br>*(long counter)*                            |  The number of requests completed without sending a response
received clients data<br>**nginxp.zone.traffic.rx.bytes** <br>*(long counter)* *(bytes)*                 |  Bytes received from clients
sent clients data<br>**nginxp.zone.traffic.tx.bytes** <br>*(long counter)* *(bytes)*                     |  Bytes sent to clients
1xx responses<br>**nginxp.zone.responses.1xx** <br>*(long counter)*                                      |  The number of responses with status codes 1xx
2xx responses<br>**nginxp.zone.responses.2xx** <br>*(long counter)*                                      |  The number of responses with status codes 2xx
3xx responses<br>**nginxp.zone.responses.3xx** <br>*(long counter)*                                      |  The number of responses with status codes 3xx
4xx responses<br>**nginxp.zone.responses.4xx** <br>*(long counter)*                                      |  The number of responses with status codes 4xx
5xx responses<br>**nginxp.zone.responses.5xx** <br>*(long counter)*                                      |  The number of responses with status codes 4xx
total responses<br>**nginxp.zone.responses** <br>*(long counter)*                                        |  The total number of responses
status backup<br>**nginxp.upstream.server.backup** <br>*(long gauge)*                                    |  A value indicating whether the server is a backup server
server weight<br>**nginxp.upstream.server.weight** <br>*(long gauge)*                                    |  Weight of the server
state up<br>**nginxp.upstream.state.up** <br>*(long counter)*                                            |  Server is up
state down<br>**nginxp.upstream.state.down** <br>*(long counter)*                                        |  Server is down
state unavailable<br>**nginxp.upstream.state.unavailable** <br>*(long counter)*                          |  Server is unavailable
state unhealthy<br>**nginxp.upstream.state.unhealthy** <br>*(long counter)*                              |  Server is unhealthy
received data<br>**nginxp.upstream.traffic.rx.bytes** <br>*(long counter)* *(bytes)*                     |  The number of bytes sent to this server.
sent data<br>**nginxp.upstream.traffic.tx.bytes** <br>*(long counter)* *(bytes)*                         |  The number of bytes received from this server.
upstream check fails<br>**nginxp.upstream.checks.fail** <br>*(long counter)*                             |  The number of unsuccessful attempts to communicate with the server
upstream check unavailable<br>**nginxp.upstream.checks.unavailable** <br>*(long counter)*                |  How many times the server became unavailable for client requests (state “unavail”) due to the number of unsuccessful attempts reaching the max_fails threshold
downtime<br>**nginxp.upstream.downtime** <br>*(long counter)* *(ms)*                                     |  Total time the server was in the unavail/checking/unhealthy states
downstart<br>**nginxp.upstream.downstart** <br>*(long gauge)* *(ms)*                                     |  The time (in milliseconds since Epoch) when the server became unavail/checking/unhealthy
total responses<br>**nginxp.upstream.responses** <br>*(long counter)*                                    |  The total number of responses obtained from this server
1xx responses<br>**nginxp.upstream.responses.1xx** <br>*(long counter)*                                  |  The number of responses with status codes 1xx
2xx responses<br>**nginxp.upstream.responses.2xx** <br>*(long counter)*                                  |  The number of responses with status codes 2xx
3xx responses<br>**nginxp.upstream.responses.3xx** <br>*(long counter)*                                  |  The number of responses with status codes 3xx
4xx responses<br>**nginxp.upstream.responses.4xx** <br>*(long counter)*                                  |  The number of responses with status codes 4xx
5xx responses<br>**nginxp.upstream.responses.5xx** <br>*(long counter)*                                  |  The number of responses with status codes 5xx
upstream health checks<br>**nginxp.upstream.health.checks** <br>*(long counter)*                         |  The total number of health check requests made
upstream health fails<br>**nginxp.upstream.health.fails** <br>*(long counter)*                           |  The number of failed health checks
upstream unhealthy count<br>**nginxp.upstream.health.unhealthy** <br>*(long gauge)*                      |  How many times the server became unhealthy (state unhealthy)
upstream health last passed<br>**nginxp.upstream.health.passed** <br>*(long gauge)*                      |  Value indicating if the last health check request was successful and passed tests
active connections<br>**nginxp.upstream.connections.active** <br>*(long gauge)*                          |  The current number of active connections
keepalive connections<br>**nginxp.upstream.connections.keepalive** <br>*(long gauge)*                    |  The current number of idle keepalive connections
zombie connections<br>**nginxp.upstream.connections.zombies** <br>*(long gauge)*                         |  The current number of servers removed from the group but still processing active client requests
