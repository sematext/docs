## Metrics

### Report: HAProxy Failure Stats

#### Chart: Denied
Metric Name | Metric Description
--- | ---
requests | <b>requests</b>: The denied requests
responses | <b>responses</b>: The denied responses

#### Chart: Warnings
Metric Name | Metric Description
--- | ---
retries | <b>retries</b>: retries
redispatches | <b>redispatches</b>: The redispatches

#### Chart: Errors
Metric Name | Metric Description
--- | ---
requests | <b>requests</b>: The request errors
connections | <b>connections</b>: The connection errors
responses | <b>responses</b>: The response errors



### Report: HAProxy Traffic Stats

#### Chart: Bytes
Metric Name | Metric Description
--- | ---
in | <b>in</b>: Bytes in
out | <b>out</b>: Bytes out



### Report: HAProxy Server Stats

#### Chart: Status
Metric Name | Metric Description
--- | ---
up/down | <b>up/downs</b>: Status UP/DOWN
downtime | <b>downtime</b>: The total downtime (seconds)

#### Chart: Role
Metric Name | Metric Description
--- | ---
weight | <b>weight</b>: The server weight (server), total weight (backend)
active | <b>active</b>: server is active (server), The number of active servers (backend)
backup | <b>backup</b>: The server is backup (server), number of backup servers (backend)



### Report: HAProxy Session Stats

#### Chart: Selection
Metric Name | Metric Description
--- | ---
total | <b>total</b>: The total number of sessions
selected | <b>selected</b>: The total number of times a server was selected

#### Chart: Sessions
Metric Name | Metric Description
--- | ---
cur | <b>cur</b>: The current sessions
max | <b>max</b>: The max sessions
limit | <b>limit</b>: The sessions limit

#### Chart: Session Rate
Metric Name | Metric Description
--- | ---
cur | <b>cur</b>: The number of sessions per second over last elapsed second
max | <b>max</b>: The max number of new sessions per second
limit | <b>limit</b>: The limit on new sessions per second



