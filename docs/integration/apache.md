title: Apache Web Server Monitoring Integration
description: Apache monitoring integration sends workers, scoreboard, php fpm, and httpd server performance metrics and other inventory data from your OS and web server to Sematext in cloud SaaS / private on-premises infrastructure and application monitoring & log management service 

## Integration

- Agent: [https://github.com/sematext/sematext-agent-httpd](https://github.com/sematext/sematext-agent-httpd)
- Instructions: [https://apps.sematext.com/ui/howto/Apache/overview](https://apps.sematext.com/ui/howto/Apache/overview)

## Metrics

Metric Name | Key | Agg | Type | Description
--- | --- | --- | --- | ---
async closing | apache.connections.async.closing | Avg | Double | 
async writing | apache.connections.async.writing | Avg | Double | 
busy | apache.workers.busy | Avg | Double | 
total | apache.connections.total | Avg | Double | 
requests count | apache.requests.count | Sum | Long | 
idle | apache.workers.idle | Avg | Double | 
async keep alive | apache.connections.async.keepAlive | Avg | Double | 
keepalive | apache.workers.keepalive | Avg | Double | <b>keepalive</b>: Number of workers currently sending keepalive messages
open | apache.workers.open | Avg | Double | <b>open</b>: Number of workers currently not busy with any process
sending | apache.workers.sending | Avg | Double | <b>sending</b>: Number of workers currently sending a reply
finishing | apache.workers.finishing | Avg | Double | <b>finishing</b>: Number of workers currently gracefully finishing connections
reading | apache.workers.reading | Avg | Double | <b>reading</b>: Number of workers currently reading incoming requests
closing | apache.workers.closing | Avg | Double | <b>closing</b>: Number of workers currently closing a connection
idle cleanup | apache.workers.cleanup | Avg | Double | <b>idle cleanup</b>: Number of workers currently performing idle cleanup procedure
starting | apache.workers.starting | Avg | Double | <b>starting</b>: Number of workers currently starting up a connection
logging | apache.workers.logging | Avg | Double | <b>logging</b>: Number of workers currently busy updating log files
waiting | apache.workers.waiting | Avg | Double | <b>waiting</b>: Number of workers currently waiting for a connection
dns lookup | apache.workers.dns | Avg | Double | <b>dnslookup</b>: Number of workers currently requesting DNS lookup

## Troubleshooting

If you are not seeing some or any Apache metrics, you can create a "diagnostics dump" and contact us via live chat or email. To create the diagnostics dump just run the following:

```
sudo spm-httpd-diagnostics
```

This will create a ZIP file and show the Sematext Support email address to which the ZIP file should be sent.
