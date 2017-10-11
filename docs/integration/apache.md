## Integration

- Agent: https://github.com/sematext/sematext-agent-httpd
- Instructions: https://apps.sematext.com/ui/howto/Apache/overview

## Metrics

### Report: Apache Worker Stats

#### Chart: Traffic Rate
Metric Name | Metric Description
--- | ---
bytes | 

#### Chart: Requests Rate
Metric Name | Metric Description
--- | ---
requests rate | 
requests count | 

#### Chart: Connections
Metric Name | Metric Description
--- | ---
total | 
async writing | 
async keep alive | 
async closing | 

#### Chart: Workers
Metric Name | Metric Description
--- | ---
total | 
active (connections) | 
idle | 
busy | 



### Report: Apache Scoreboard Stats

#### Chart: Scoreboard Available Worker
Metric Name | Metric Description
--- | ---
open | <b>open</b>: Number of workers currently not busy with any process
waiting | <b>waiting</b>: Number of workers currently waiting for a connection
keepalive | <b>keepalive</b>: Number of workers currently sending keepalive messages

#### Chart: Scoreboard Connection Ops
Metric Name | Metric Description
--- | ---
starting | <b>starting</b>: Number of workers currently starting up a connection
closing | <b>closing</b>: Number of workers currently closing a connection
finishing | <b>finishing</b>: Number of workers currently gracefully finishing connections
idle cleanup | <b>idle cleanup</b>: Number of workers currently performing idle cleanup procedure

#### Chart: Scoreboard Serving
Metric Name | Metric Description
--- | ---
dns lookup | <b>dnslookup</b>: Number of workers currently requesting DNS lookup
reading | <b>reading</b>: Number of workers currently reading incoming requests
sending | <b>sending</b>: Number of workers currently sending a reply
logging | <b>logging</b>: Number of workers currently busy updating log files



