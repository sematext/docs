## Metrics

### Report: Nginx Plus Upstream Stats

#### Chart: Status
Metric Name | Metric Description
--- | ---
backup | <b>backup</b>: Server is backup server
weight | <b>weight</b>: Weight of the server
requests | <b>requests</b>: The number of client requests forwarded to this server

#### Chart: Responses
Metric Name | Metric Description
--- | ---
1xx | <b>1xx</b>: The number of responses with status codes 1xx
2xx | <b>2xx</b>: The number of responses with status codes 2xx
3xx | <b>3xx</b>: The number of responses with status codes 3xx
4xx | <b>4xx</b>: The number of responses with status codes 4xx
5xx | <b>5xx</b>: The number of responses with status codes 5xx
total | <b>total</b>: The total number of responses obtained from this server

#### Chart: State
Metric Name | Metric Description
--- | ---
up | <b>up</b>: Server is up
down | <b>down</b>: Server is down
unavailable | <b>unavailable</b>: Server is unavailable
unhealthy | <b>unhealthy</b>: Server is unhealthy

#### Chart: Traffic
Metric Name | Metric Description
--- | ---
received | <b>received</b>: The number of bytes received from this server
sent | <b>sent</b>: The number of bytes sent to this server

#### Chart: Connections
Metric Name | Metric Description
--- | ---
active | <b>active</b>: The current number of active connections
keepalive | <b>keepalive</b>: The current number of idle keepalive connections
limit | 

#### Chart: Server Checks
Metric Name | Metric Description
--- | ---
fails | <b>fails</b>: The total number of unsuccessful attempts to communicate with the server
unavail | <b>unavail</b>: How many times the server became unavailable for client requests (state “unavail”) due to the number of unsuccessful attempts reaching the max_fails threshold

#### Chart: Health Monitors
Metric Name | Metric Description
--- | ---
checks | <b>checks</b>: The total number of health check requests made
fails | <b>fails</b>: The number of failed health checks
unhealthy | <b>unhealthy</b>: Boolean indicating if the last health check request was successful and passed tests
last passed | <b>lass passed</b>: The time health check request was successful and passed

#### Chart: Downtime
Metric Name | Metric Description
--- | ---
downtime | <b>downtime</b>: Total time the server was in the “unavail” and “unhealthy” states
downstart | <b>downstart</b>: The time (in milliseconds since Epoch) when the server became “unavail” or “unhealthy”



### Report: Nginx Plus Server Stats

#### Chart: Connections
Metric Name | Metric Description
--- | ---
accepted | <b>accepted</b>: The total number of accepted client connections
dropped | <b>dropped</b>: The total number of dropped client connections
active | <b>active</b>: The current number of active client connections
idle | <b>idle</b>: The current number of idle client connections

#### Chart: Requests
Metric Name | Metric Description
--- | ---
requests | <b>requests</b>: The total number of client requests
current | <b>current</b>: The current number of client requests



### Report: Nginx Plus Cache Stats

#### Chart: Cache revalidated
Metric Name | Metric Description
--- | ---
responses | <b>responses</b>: The total number of responses read from the cache
bytes | <b>bytes</b>: The total number of bytes read from the cache

#### Chart: Cache size
Metric Name | Metric Description
--- | ---
size | <b>size</b>: The current size of the cache
max size | <b>max size</b>: The limit on the maximum size of the cache specified in the configuration
cold state | <b>cold state</b>: The number of time cach in cold state

#### Chart: Cache miss
Metric Name | Metric Description
--- | ---
responses | <b>responses</b>: The total number of responses not taken from the cache
bytes | <b>bytes</b>: The total number of bytes read from the proxied server
responses written | <b>responses written</b>: The total number of responses written to the cache
bytes written | <b>bytes written</b>: The total number of bytes written to the cache

#### Chart: Cache stale
Metric Name | Metric Description
--- | ---
responses | <b>responses</b>: The total number of responses read from the cache
bytes | <b>bytes</b>: The total number of bytes read from the cache

#### Chart: Cache bypass
Metric Name | Metric Description
--- | ---
responses | <b>responses</b>: The total number of responses not taken from the cache
bytes | <b>bytes</b>: The total number of bytes read from the proxied server
responses written | <b>responses written</b>: The total number of responses written to the cache
bytes written | <b>bytes written</b>: The total number of bytes written to the cache

#### Chart: Cache updating
Metric Name | Metric Description
--- | ---
responses | <b>responses</b>: The total number of responses read from the cache
bytes | <b>bytes</b>: The total number of bytes read from the cache

#### Chart: Cache expired
Metric Name | Metric Description
--- | ---
responses | <b>responses</b>: The total number of responses not taken from the cache
bytes | <b>bytes</b>: The total number of bytes read from the proxied server
responses written | <b>responses written</b>: The total number of responses written to the cache
bytes written | <b>bytes written</b>: The total number of bytes written to the cache

#### Chart: Cache hit
Metric Name | Metric Description
--- | ---
responses | <b>responses</b>: The total number of responses read from the cache
bytes | <b>bytes</b>: The total number of bytes read from the cache



### Report: Nginx Plus Server Zone Stats

#### Chart: Requests
Metric Name | Metric Description
--- | ---
requests | <b>requests</b>: The number of client requests received from clients
processing | <b>processing</b>: The number of client requests that are currently being processed

#### Chart: Traffic
Metric Name | Metric Description
--- | ---
received | <b>received</b>: The number of bytes received from clients
sent | <b>sent</b>: The number of bytes sent to clients

#### Chart: Responses
Metric Name | Metric Description
--- | ---
1xx | <b>1xx</b>: The number of responses with status codes 1xx
2xx | <b>2xx</b>: The number of responses with status codes 2xx
3xx | <b>3xx</b>: The number of responses with status codes 3xx
4xx | <b>4xx</b>: The number of responses with status codes 4xx
5xx | <b>5xx</b>: The number of responses with status codes 5xx
total | <b>total</b>: The total number of responses sent to clients



