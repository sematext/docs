
## Elasticsearch Monitoring

### Why doesn't the number of documents I see in SPM match the number of documents in my Elasticsearch index

SPM collects index stats from primary shards only.  To see the
total number of documents in an index, select all shards in that index
and choose "sum".  The list of shards and the "sum" function can be
found in the "Shard filter" in the Index Stats
report.

### Can SPM collect metrics even when Elasticsearch HTTP API is disabled

Each SPM agent collects Elasticsearch metrics only from the local
node by accessing the Stats API via HTTP.  To allow only local access
add the following to elasticsearch.yml. Don't forget to restart each ES
node to whose elasticsearch.yml you add this.

``` bash
http.host: "127.0.0.1"
```

### Can I point SPM monitor to a non-localhost Elasticsearch node

Yes.  Adjust
/opt/spm/spm-monitor/conf/spm-monitor-config-*TOKEN\_HERE*-default.properties
and change the SPM\_MONITOR\_ES\_NODE\_HOSTPORT property from the
default localhost:9200 value to use an alternative hostname:port.  After
that restart SPM monitor (if you are running a standalone version) or
Elasticsearch process(es) with embedded SPM
monitor. 

### My Elasticsearch is protected by basic HTTP authentication, can I use SPM  

Yes. You just need to adjust
/opt/spm/spm-monitor/conf/spm-monitor-config-*TOKEN\_HERE*-default.properties
file by adding the following two properties (replace values with your
real username and password):

``` properties
SPM_MONITOR_ES_NODE_BASICAUTH_USERNAME=yourUsername
SPM_MONITOR_ES_NODE_BASICAUTH_PASSWORD=yourPassword
```

Restart your SPM monitor after this change (either with **sudo service
spm-monitor restart** in case of standalone monitor or by restarting
Elasticsearch node if you are using in-process
javaagent).

### I am using SPM for Elasticsearch monitor and I don't see Index (and/or Refresh/Flush/Merge) stats, why is that

SPM for Elasticsearch monitor collects Index stats only from
primary shards, so it is possible that you installed SPM monitor on some
Elasticsearch node which hosts only replicas. The same is also true for
Refresh/Flush and Merge stats. Also note that SPM Elasticsearch monitor
should be installed on all your Elasticsearch nodes to get the complete
picture of your cluster in SPM Reports UI.

## Metrics

### Report: Cache

#### Chart: Request
Metric Name | Metric Description
--- | ---
maximum size | 
estimated size | 
overhead | 

#### Chart: Fielddata
Metric Name | Metric Description
--- | ---
maximum size | 
estimated size | 
overhead | 



### Report: Cluster Health

#### Chart: ES Shards
Metric Name | Metric Description
--- | ---
active primary shards | 
active shards | 
relocating shards | 
initializing shards | 
unassigned shards | 

#### Chart: ES Nodes
Metric Name | Metric Description
--- | ---
nodes | 
data nodes | 



### Report: Cache

#### Chart: Warmer
Metric Name | Metric Description
--- | ---
current | 
total | 
total time | 

#### Chart: Field Cache
Metric Name | Metric Description
--- | ---
field cache evictions | 
field cache size | 

#### Chart: Query/Filter Cache
Metric Name | Metric Description
--- | ---
filter cache count | 
filter cache evictions | 
filter cache size | 



### Report: Connections

#### Chart: Connections/Sockets
Metric Name | Metric Description
--- | ---
open TCP sockets (current_estab) | 
open TCP conns (server_open) | 
open HTTP conns (current_open) | 
total opened HTTP conns (total_opened) | 

#### Chart: TCP Traffic
Metric Name | Metric Description
--- | ---
inbound segments (in_segs) | 
outbound segments (out_segs) | 
retransmitted segments (retrans_segs) | 

#### Chart: Transport (Node-to-Node)
Metric Name | Metric Description
--- | ---
received count (rx_count) | 
transmitted count (tx_count) | 
received size (rx_size) | 
transmitted size (tx_size) | 

#### Chart: TCP Socket Stats
Metric Name | Metric Description
--- | ---
active conn openings (active_opens) | 
passive conn openings (passive_opens) | 
failed socket open (attempt_fails) | 
socket resets sent (out_rsts) | 
open sockets (current_estab) | 
socket resets (estab_resets) | 



### Report: Cluster Topology

#### Chart: Shards
Metric Name | Metric Description
--- | ---
active primary shards | 
active shards | 
relocating shards | 
initializing shards | 
unassigned shards | 



### Report: Thread Pool

#### Chart: Thread Pool
Metric Name | Metric Description
--- | ---
active | 
size | 
queue | 
queue size | 
rejected | 
largest | 
completed | 
min | 
max | 



### Report: Index Stats

#### Chart: Documents
Metric Name | Metric Description
--- | ---
docs count (prim) | docs count on primary shards
docs count (all) | docs count on all (primary and replica) shards
docs deleted (prim) | docs deleted on primary shards
docs deleted (all) | docs deleted on all (primary and replica) shards
size on disk (prim) | size on the disk of primary shards
size on disk (all) | size on the disk of all (primary and replica) shards

#### Chart: Merged Documents
Metric Name | Metric Description
--- | ---
docs count (prim) | merge docs count on primary shards
docs count (all) | merge docs count on all (primary and replica) shards
docs size (prim) | merged docs size on primary shards
docs size (all) | merge docs size on all (primary and replica) shards

#### Chart: Indexing
Metric Name | Metric Description
--- | ---
indexed docs (prim) | docs indexed on primary shards
indexed docs (all) | docs indexed on all (primary and replica) shards
delete total (prim) | docs deleted on primary shards
delete total (all) | docs deleted on all (primary and replica) shards
indexing rate (prim) | indexing rate on primary shards
indexing rate (all) | indexing rate on all (primary and replica) shards
deleting rate (prim) | deleting rate on primary shards
deleting rate (all) | deleting rate on all (primary and replica) shards


