title: Nginx Monitoring Integration
description: The Sematext monitoring agent can collect many metrics from NGINX instances, including requests, reading, writing, waiting, active and more. Utilize built-in anomaly detection, threshold, and heartbeat alerting and send notifications to email and various chatops messaging services. Correlate events & logs, filter metrics by server or time, and visualize your cluster's health with out of the box graphs and custom dashboards

## Integration

- Agent: [https://github.com/sematext/sematext-agent-nginx](https://github.com/sematext/sematext-agent-nginx)
- Instructions: [https://apps.sematext.com/ui/howto/Nginx/overview](https://apps.sematext.com/ui/howto/Nginx/overview)

## Metrics

Metric Name | Key | Agg | Type | Description
--- | --- | --- | --- | ---
requests | nginx.request.count | Sum | Long | <b>requests</b>: Request count
reading | nginx.requests.connections.reading | Avg | Double | <b>reading</b>: Nginx reads request header
writing | nginx.requests.connections.writing | Avg | Double | <b>writing</b>: Nginx reads request body, processes request, or writes response to a client
waiting | nginx.requests.connections.waiting | Avg | Double | <b>waiting</b>: keep-alive connections
active | nginx.requests.connections.active | Avg | Double | <b>active</b>: number of all open connections
