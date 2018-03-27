
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

## Integration

- Instructions: [https://apps.sematext.com/ui/howto/Elasticsearch/overview](https://apps.sematext.com/ui/howto/Elasticsearch/overview)

## Metrics

Metric Name | Key | Agg | Type | Description
--- | --- | --- | --- | ---
overhead | es.circuitBreaker.fieldData.size.overhead | Avg | Double | 
maximum size | es.circuitBreaker.fieldData.size.max | Max | Long | 
estimated size | es.circuitBreaker.request.size.estimate | Avg | Long | 
estimated size | es.circuitBreaker.fieldData.size.estimate | Avg | Long | 
overhead | es.circuitBreaker.request.size.overhead | Avg | Double | 
maximum size | es.circuitBreaker.request.size.max | Max | Long | 
initializing shards | es.cluster.health.shards.initializing | Avg | Long | 
relocating shards | es.cluster.health.shards.relocating | Avg | Long | 
nodes | es.cluster.nodes | Avg | Long | 
data nodes | es.cluster.nodes.data | Avg | Long | 
active primary shards | es.cluster.health.shards.primary | Avg | Long | 
unassigned shards | es.cluster.health.shards.unassigned | Avg | Long | 
active shards | es.cluster.health.shards.active | Avg | Long | 
filter cache size | es.cache.filter.size.max | Avg | Long | 
field cache evictions | es.cache.field.evicted | Sum | Long | 
current | es.cache.warmer.current | Avg | Long | 
filter cache evictions | es.cache.filter.evicted | Sum | Long | 
total | es.cache.warmer.total | Sum | Long | 
filter cache count | es.cache.filter.size | Avg | Long | 
total time | es.cache.warmer.time | Sum | Long | 
field cache size | es.cache.field.cache.size | Avg | Long | 
open HTTP conns (current_open) | es.connection.http.current.open | Avg | Long | 
socket resets sent (out_rsts) | es.connections.tcp.out.rsts | Sum | Long | 
received count (rx_count) | es.transport.rx.packets | Sum | Long | 
passive conn openings (passive_opens) | es.connections.tcp.passive.opens | Sum | Long | 
outbound segments (out_segs) | es.connection.out.segs | Sum | Long | 
received size (rx_size) | es.transport.rx.bytes | Sum | Long | 
open TCP conns (server_open) | es.connection.tcp.server.open | Avg | Long | 
transmitted size (tx_size) | es.transport.tx.bytes | Sum | Long | 
failed socket open (attempt_fails) | es.connections.tcp.attempt.fails | Sum | Long | 
socket resets (estab_resets) | es.connections.tcp.estab.resets | Sum | Long | 
total opened HTTP conns (total_opened) | es.connection.http.total.opened | Avg | Long | 
inbound segments (in_segs) | es.connection.in.segs | Sum | Long | 
open sockets (current_estab) | es.connections.tcp.current.estab | Avg | Long | 
active conn openings (active_opens) | es.connections.tcp.avtive.opens | Sum | Long | 
retransmitted segments (retrans_segs) | es.connection.retrans.segs | Sum | Long | 
transmitted count (tx_count) | es.transport.tx.packets | Sum | Long | 
queue | es.thread.pool.queue | Avg | Long | 
completed | es.thread.pool.completed | Sum | Long | 
active | es.thread.pool.active | Avg | Long | 
min | es.thread.pool.min | Min | Long | 
rejected | es.thread.pool.rejected | Sum | Long | 
queue size | es.thread.pool.queue.size | Avg | Long | 
size | es.thread.pool.size | Avg | Long | 
max | es.thread.pool.max | Max | Long | 
largest | es.thread.pool.largest | Max | Long | 
flush count (all) | es.indexing.flushes.total | Sum | Long | flush count on all (primary and replica) shards
refresh count (prim) | es.indexing.refreshes | Sum | Long | refresh count on primary shards
docs count (prim) | es.indexing.merges.docs | Sum | Long | merge docs count on primary shards
refresh count (all) | es.indexing.docs.refreshes.total | Sum | Long | refresh count on all (primary and replica) shards
merge count (all) | es.indexing.merges.total | Sum | Long | merge count on all (primary and replica) shards
flush time (all) | es.indexing.flushes.time.total | Sum | Long | flush time on all (primary and replica) shards
flush count (prim) | es.indexing.flushes | Sum | Long | flush count on primary shards
indexed docs (prim) | es.indexing.docs | Sum | Long | docs indexed on primary shards
merge time (all) | es.indexing.merges.time.total | Sum | Long | merge time on all (primary and replica) shards
indexed docs (all) | es.indexing.docs.total | Sum | Long | docs indexed on all (primary and replica) shards
flush time (prim) | es.indexing.flushes.time | Sum | Long | flush time on primary shards
refresh time (prim) | es.indexing.refreshes.time | Sum | Long | refresh time on primary shards
merge time (prim) | es.indexing.merges.time | Sum | Long | merge time on primary shards
docs count (all) | es.indexing.merges.docs.total | Sum | Long | merge docs count on all (primary and replica) shards
merge count (prim) | es.indexing.merges | Sum | Long | merge count on primary shards
refresh time (all) | es.indexing.refreshes.time.total | Sum | Long | refresh time on all (primary and replica) shards
docs size (all) | es.indexing.merges.docs.size.total | Sum | Long | merge docs size on all (primary and replica) shards
docs size (prim) | es.indexing.merges.docs.size | Sum | Long | merged docs size on primary shards
delete total (prim) | es.indexing.docs.deleted | Sum | Long | docs deleted on primary shards
delete total (all) | es.indexing.docs.deleted.total | Sum | Long | docs deleted on all (primary and replica) shards
