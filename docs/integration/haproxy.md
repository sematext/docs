title: HAProxy Monitoring Integration
description: HAProxy proxy server offers a multitude of metrics that allow high visibility into its performance. Sematext monitoring SaaS helps you identify poor load balancer performance which can result in latency across your entire stack. Correlate various HAProxy metrics such as HTTP response codes, request rate, sessions, connection errors, retries, backup, downtime, and more

## Integration

- Instructions: [https://apps.sematext.com/ui/howto/HAProxy/overview](https://apps.sematext.com/ui/howto/HAProxy/overview)

## Metrics

Metric Name | Key | Agg | Type | Description
--- | --- | --- | --- | ---
responses | haproxy.responses.denied | Avg | Long | <b>responses</b>: The denied responses
redispatches | haproxy.redispatches | Avg | Long | <b>redispatches</b>: The redispatches
requests | haproxy.requests.errors | Avg | Long | <b>requests</b>: The request errors
requests | haproxy.requests.denied | Avg | Long | <b>requests</b>: The denied requests
connections | haproxy.connections.errors | Avg | Long | <b>connections</b>: The connection errors
responses | haproxy.responses.errors | Avg | Long | <b>responses</b>: The response errors
retries | haproxy.retries | Avg | Long | <b>retries</b>: retries
in | haproxy.io.in | Avg | Long | <b>in</b>: Bytes in
out | haproxy.io.out | Avg | Long | <b>out</b>: Bytes out
backup | haproxy.server.backend.backup | Avg | Long | <b>backup</b>: The server is backup (server), number of backup servers (backend)
weight | haproxy.server.weight | Avg | Long | <b>weight</b>: The server weight (server), total weight (backend)
active | haproxy.server.backend.active | Avg | Long | <b>active</b>: server is active (server), The number of active servers (backend)
downtime | haproxy.server.downtime | Avg | Long | <b>downtime</b>: The total downtime (seconds)
up/down | haproxy.server.status | Avg | Double | <b>up/downs</b>: Status UP/DOWN
selected | haproxy.server.selected | Avg | Long | <b>selected</b>: The total number of times a server was selected
cur | haproxy.sessions | Avg | Long | <b>cur</b>: The current sessions
max | haproxy.sessions.rate.max | Max | Long | <b>max</b>: The max number of new sessions per second
max | haproxy.sessions.max | Max | Long | <b>max</b>: The max sessions
cur | haproxy.sessions.rate | Avg | Long | <b>cur</b>: The number of sessions per second over last elapsed second
limit | haproxy.sessions.rate.limit | Avg | Long | <b>limit</b>: The limit on new sessions per second
limit | haproxy.sessions.limit | Avg | Long | <b>limit</b>: The sessions limit
total | haproxy.sessions.total | Avg | Long | <b>total</b>: The total number of sessions
