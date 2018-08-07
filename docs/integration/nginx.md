title: Nginx Monitoring Integration

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
