## Metrics

Metric Name | Key | Agg | Type | Description
--- | --- | --- | --- | ---
fails | nginxp.upstream.health.fails | Sum | Long | <b>fails</b>: The number of failed health checks
weight | nginxp.upstream.server.weight | Avg | Double | <b>weight</b>: Weight of the server
checks | nginxp.upstream.health.checks | Sum | Long | <b>checks</b>: The total number of health check requests made
sent | nginxp.upstream.traffic.tx.bytes | Sum | Long | <b>sent</b>: The number of bytes sent to this server
unhealthy | nginxp.upstream.state.unhealthy | Avg | Double | <b>unhealthy</b>: Server is unhealthy
2xx | nginxp.upstream.responses.2xx | Sum | Long | <b>2xx</b>: The number of responses with status codes 2xx
keepalive | nginxp.upstream.connections.keepalive | Avg | Double | <b>keepalive</b>: The current number of idle keepalive connections
1xx | nginxp.upstream.responses.1xx | Sum | Long | <b>1xx</b>: The number of responses with status codes 1xx
received | nginxp.upstream.traffic.rx.bytes | Sum | Long | <b>received</b>: The number of bytes received from this server
fails | nginxp.upstream.checks.fail | Sum | Long | <b>fails</b>: The total number of unsuccessful attempts to communicate with the server
last passed | nginxp.upstream.health.passed | Avg | Double | <b>lass passed</b>: The time health check request was successful and passed
4xx | nginxp.upstream.responses.4xx | Sum | Long | <b>4xx</b>: The number of responses with status codes 4xx
requests | nginxp.upstream.server.requests | Sum | Long | <b>requests</b>: The number of client requests forwarded to this server
3xx | nginxp.upstream.responses.3xx | Sum | Long | <b>3xx</b>: The number of responses with status codes 3xx
5xx | nginxp.upstream.responses.5xx | Sum | Long | <b>5xx</b>: The number of responses with status codes 5xx
backup | nginxp.upstream.server.backup | Avg | Long | <b>backup</b>: Server is backup server
total | nginxp.upstream.responses | Sum | Long | <b>total</b>: The total number of responses obtained from this server
unavail | nginxp.upstream.checks.unavailable | Sum | Long | <b>unavail</b>: How many times the server became unavailable for client requests (state “unavail”) due to the number of unsuccessful attempts reaching the max_fails threshold
downtime | nginxp.upstream.downtime | Sum | Long | <b>downtime</b>: Total time the server was in the “unavail” and “unhealthy” states
unavailable | nginxp.upstream.state.unavailable | Avg | Double | <b>unavailable</b>: Server is unavailable
down | nginxp.upstream.state.down | Avg | Double | <b>down</b>: Server is down
up | nginxp.upstream.state.up | Avg | Double | <b>up</b>: Server is up
unhealthy | nginxp.upstream.health.unhealthy | Sum | Long | <b>unhealthy</b>: Boolean indicating if the last health check request was successful and passed tests
limit | nginxp.upstream.connections.max | Max | Long | 
active | nginxp.upstream.connections.active | Avg | Double | <b>active</b>: The current number of active connections
downstart | nginxp.upstream.downstart | Sum | Long | <b>downstart</b>: The time (in milliseconds since Epoch) when the server became “unavail” or “unhealthy”
active | nginxp.connections.active | Avg | Long | <b>active</b>: The current number of active client connections
requests | nginxp.requests | Sum | Long | <b>requests</b>: The total number of client requests
accepted | nginxp.connections.accepted | Avg | Long | <b>accepted</b>: The total number of accepted client connections
dropped | nginxp.connections.dropped | Avg | Long | <b>dropped</b>: The total number of dropped client connections
current | nginxp.requests.current | Avg | Long | <b>current</b>: The current number of client requests
idle | nginxp.connections.idle | Avg | Long | <b>idle</b>: The current number of idle client connections
bytes written | nginxp.cache.bypass.bytes.written | Sum | Long | <b>bytes written</b>: The total number of bytes written to the cache
responses | nginxp.cache.revalidated.responses | Sum | Long | <b>responses</b>: The total number of responses read from the cache
size | nginxp.cache.size | Avg | Long | <b>size</b>: The current size of the cache
max size | nginxp.cache.size.max | Max | Long | <b>max size</b>: The limit on the maximum size of the cache specified in the configuration
responses written | nginxp.cache.miss.responses.written | Sum | Long | <b>responses written</b>: The total number of responses written to the cache
responses | nginxp.cache.bypass.responses | Sum | Long | <b>responses</b>: The total number of responses not taken from the cache
bytes | nginxp.cache.updating.bytes | Sum | Long | <b>bytes</b>: The total number of bytes read from the cache
bytes | nginxp.cache.bypass.bytes | Sum | Long | <b>bytes</b>: The total number of bytes read from the proxied server
responses | nginxp.cache.expired.responses | Sum | Long | <b>responses</b>: The total number of responses not taken from the cache
bytes written | nginxp.cache.miss.bytes.written | Sum | Long | <b>bytes written</b>: The total number of bytes written to the cache
responses | nginxp.cache.hits.responses | Sum | Long | <b>responses</b>: The total number of responses read from the cache
responses | nginxp.cache.updating.responses | Sum | Long | <b>responses</b>: The total number of responses read from the cache
cold state | nginxp.cache.cold | Avg | Double | <b>cold state</b>: The number of time cach in cold state
bytes | nginxp.cache.hits.bytes | Sum | Long | <b>bytes</b>: The total number of bytes read from the cache
bytes | nginxp.cache.revalidated.bytes | Sum | Long | <b>bytes</b>: The total number of bytes read from the cache
responses | nginxp.cache.miss.responses | Sum | Long | <b>responses</b>: The total number of responses not taken from the cache
bytes written | nginxp.cache.expired.bytes.written | Sum | Long | <b>bytes written</b>: The total number of bytes written to the cache
responses | nginxp.cache.stale.responses | Sum | Long | <b>responses</b>: The total number of responses read from the cache
bytes | nginxp.cache.expired.bytes | Sum | Long | <b>bytes</b>: The total number of bytes read from the proxied server
bytes | nginxp.cache.stale.bytes | Sum | Long | <b>bytes</b>: The total number of bytes read from the cache
bytes | nginxp.cache.miss.bytes | Sum | Long | <b>bytes</b>: The total number of bytes read from the proxied server
responses written | nginxp.cache.expired.responses.written | Sum | Long | <b>responses written</b>: The total number of responses written to the cache
responses written | nginxp.cache.bypass.responses.written | Sum | Long | <b>responses written</b>: The total number of responses written to the cache
total | nginxp.zone.responses | Sum | Long | <b>total</b>: The total number of responses sent to clients
3xx | nginxp.zone.responses.3xx | Sum | Long | <b>3xx</b>: The number of responses with status codes 3xx
requests | nginxp.zone.requests | Sum | Long | <b>requests</b>: The number of client requests received from clients
1xx | nginxp.zone.responses.1xx | Sum | Long | <b>1xx</b>: The number of responses with status codes 1xx
processing | nginxp.zone.requests.processing | Avg | Double | <b>processing</b>: The number of client requests that are currently being processed
2xx | nginxp.zone.responses.2xx | Sum | Long | <b>2xx</b>: The number of responses with status codes 2xx
received | nginxp.zone.traffic.rx.bytes | Sum | Long | <b>received</b>: The number of bytes received from clients
5xx | nginxp.zone.responses.5xx | Sum | Long | <b>5xx</b>: The number of responses with status codes 5xx
sent | nginxp.zone.traffic.tx.bytes | Sum | Long | <b>sent</b>: The number of bytes sent to clients
4xx | nginxp.zone.responses.4xx | Sum | Long | <b>4xx</b>: The number of responses with status codes 4xx
