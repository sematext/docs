## Integration

- Agent: [https://github.com/sematext/sematext-agent-nginx](https://github.com/sematext/sematext-agent-nginx)
- Instructions: [https://apps.sematext.com/ui/howto/Nginx-Plus/overview](https://apps.sematext.com/ui/howto/Nginx-Plus/overview)

## Metrics

Metric Name                     |  Key                                     |  Metric Type  |  Numeric Type  |  Unit   |  Description
--------------------------------|------------------------------------------|---------------|----------------|---------|----------------------------------------------------------------------------------------------------------------------------------------------------------------
accepted connections            |  nginxp.connections.accepted             |  counter      |  long          |         |  The number of accepted client connections
dropped connections             |  nginxp.connections.dropped              |  counter      |  long          |         |  The number of idle client connections
active connections              |  nginxp.connections.active               |  gauge        |  long          |         |  The current number of active connections
idle connections                |  nginxp.connections.idle                 |  gauge        |  long          |         |  The current number of idle client connections
current active requests         |  nginxp.requests.current                 |  gauge        |  long          |         |  The current number of client requests
total requests                  |  nginxp.requests                         |  counter      |  long          |         |  The total number of client requests
zone total requests             |  nginxp.zone.requests                    |  counter      |  long          |         |  The total number of client requests received from clients
processing requests             |  nginxp.zone.requests.processing         |  gauge        |  long          |         |  The number of client requests that are currently being processed
discarded requests              |  nginxp.zone.requests.discarded          |  counter      |  long          |         |  The number of requests completed without sending a response
received clients data           |  nginxp.zone.traffic.rx.bytes            |  counter      |  long          |  bytes  |  Bytes received from clients
sent clients data               |  nginxp.zone.traffic.tx.bytes            |  counter      |  long          |  bytes  |  Bytes sent to clients
1xx responses                   |  nginxp.zone.responses.1xx               |  counter      |  long          |         |  The number of responses with status codes 1xx
2xx responses                   |  nginxp.zone.responses.2xx               |  counter      |  long          |         |  The number of responses with status codes 2xx
3xx responses                   |  nginxp.zone.responses.3xx               |  counter      |  long          |         |  The number of responses with status codes 3xx
4xx responses                   |  nginxp.zone.responses.4xx               |  counter      |  long          |         |  The number of responses with status codes 4xx
5xx responses                   |  nginxp.zone.responses.5xx               |  counter      |  long          |         |  The number of responses with status codes 4xx
total responses                 |  nginxp.zone.responses                   |  counter      |  long          |         |  The total number of responses
cache size                      |  nginxp.cache.size                       |  gauge        |  long          |         |  The current size of the cache
max cache size                  |  nginxp.cache.size.max                   |  gauge        |  long          |         |  The limit on the maximum size of the cache specified in the configuration
cold state                      |  nginxp.cache.cold                       |  gauge        |  long          |         |  The number of time cache in cold state
responses hits                  |  nginxp.cache.hits.responses             |  counter      |  long          |         |  The number of responses read from the cache
responses hits size             |  nginxp.cache.hits.bytes                 |  counter      |  long          |  bytes  |  The number of bytes read from the cache
stale responses                 |  nginxp.cache.stale.responses            |  counter      |  long          |         |  The number of stale responses read from the cache
stale responses size            |  nginxp.cache.stale.bytes                |  counter      |  long          |  bytes  |  The number of stale bytes read from the cache
updating responses              |  nginxp.cache.updating.responses         |  counter      |  long          |         |  The number of updating responses read from the cache
updating responses size         |  nginxp.cache.updating.bytes             |  counter      |  long          |  bytes  |  The number of updating bytes read from the cache
revalidated responses           |  nginxp.cache.revalidated.responses      |  counter      |  long          |         |  The number of revalidated responses read from the cache
revalidated responses size      |  nginxp.cache.revalidated.bytes          |  counter      |  long          |  bytes  |  The number of revalidated bytes read from the cache
cache missed responses          |  nginxp.cache.miss.responses             |  counter      |  long          |         |  The number of responses not taken from the cache
miss responses size             |  nginxp.cache.miss.bytes                 |  counter      |  long          |  bytes  |  The number of bytes read from the proxied server
miss responses written          |  nginxp.cache.miss.responses.written     |  counter      |  long          |         |  The number of miss responses written to the cache
miss written size               |  nginxp.cache.miss.bytes.written         |  counter      |  long          |  bytes  |  The number of miss bytes written to the cache
expired responses               |  nginxp.cache.expired.responses          |  counter      |  long          |         |  The number of expired responses not taken from the cache
expired responses size          |  nginxp.cache.expired.bytes              |  counter      |  long          |  bytes  |  The number of expired bytes written to the cache
expired responses written       |  nginxp.cache.expired.responses.written  |  counter      |  long          |         |  The number of expired responses written to the cache
expired responses written size  |  nginxp.cache.expired.bytes.written      |  counter      |  long          |  bytes  |  The number of expired bytes written to the cache
bypass responses                |  nginxp.cache.bypass.responses           |  counter      |  long          |         |  The number of bypass responses not taken from the cache
bypass responses size           |  nginxp.cache.bypass.bytes               |  counter      |  long          |  bytes  |  The number of bypass bytes written to the cache
bypass responses written        |  nginxp.cache.bypass.responses.written   |  counter      |  long          |         |  The number of bypass responses written to the cache
bypass responses written size   |  nginxp.cache.bypass.bytes.written       |  counter      |  long          |  bytes  |  The number of bypass bytes written to the cache
status backup                   |  nginxp.upstream.server.backup           |  gauge        |  long          |         |  A value indicating whether the server is a backup server
server weight                   |  nginxp.upstream.server.weight           |  gauge        |  long          |         |  Weight of the server
state up                        |  nginxp.upstream.state.up                |  counter      |  long          |         |  Server is up
state down                      |  nginxp.upstream.state.down              |  counter      |  long          |         |  Server is down
state unavailable               |  nginxp.upstream.state.unavailable       |  counter      |  long          |         |  Server is unavailable
state unhealthy                 |  nginxp.upstream.state.unhealthy         |  counter      |  long          |         |  Server is unhealthy
received data                   |  nginxp.upstream.traffic.rx.bytes        |  counter      |  long          |  bytes  |  The number of bytes sent to this server.
sent data                       |  nginxp.upstream.traffic.tx.bytes        |  counter      |  long          |  bytes  |  The number of bytes received from this server.
downtime                        |  nginxp.upstream.downtime                |  counter      |  long          |  ms     |  Total time the server was in the unavail/checking/unhealthy states
downstart                       |  nginxp.upstream.downstart               |  gauge        |  long          |  ms     |  The time (in milliseconds since Epoch) when the server became unavail/checking/unhealthy
total responses                 |  nginxp.upstream.responses               |  counter      |  long          |         |  The total number of responses obtained from this server
1xx responses                   |  nginxp.upstream.responses.1xx           |  counter      |  long          |         |  The number of responses with status codes 1xx
2xx responses                   |  nginxp.upstream.responses.2xx           |  counter      |  long          |         |  The number of responses with status codes 2xx
3xx responses                   |  nginxp.upstream.responses.3xx           |  counter      |  long          |         |  The number of responses with status codes 3xx
4xx responses                   |  nginxp.upstream.responses.4xx           |  counter      |  long          |         |  The number of responses with status codes 4xx
5xx responses                   |  nginxp.upstream.responses.5xx           |  counter      |  long          |         |  The number of responses with status codes 5xx
upstream check fails            |  nginxp.upstream.checks.fail             |  counter      |  long          |         |  The number of unsuccessful attempts to communicate with the server
upstream check unavailable      |  nginxp.upstream.checks.unavailable      |  counter      |  long          |         |  How many times the server became unavailable for client requests (state “unavail”) due to the number of unsuccessful attempts reaching the max_fails threshold
upstream health checks          |  nginxp.upstream.health.checks           |  counter      |  long          |         |  The total number of health check requests made
upstream health fails           |  nginxp.upstream.health.fails            |  counter      |  long          |         |  The number of failed health checks
upstream unhealthy count        |  nginxp.upstream.health.unhealthy        |  gauge        |  long          |         |  How many times the server became unhealthy (state unhealthy)
upstream health last passed     |  nginxp.upstream.health.passed           |  gauge        |  long          |         |  Value indicating if the last health check request was successful and passed tests
active connections              |  nginxp.upstream.connections.active      |  gauge        |  long          |         |  The current number of active connections
keepalive connections           |  nginxp.upstream.connections.keepalive   |  gauge        |  long          |         |  The current number of idle keepalive connections
zombie connections              |  nginxp.upstream.connections.zombies     |  gauge        |  long          |         |  The current number of servers removed from the group but still processing active client requests
