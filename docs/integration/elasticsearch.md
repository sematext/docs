## Integration

- Instructions: [https://apps.sematext.com/ui/howto/Elasticsearch/overview](https://apps.sematext.com/ui/howto/Elasticsearch/overview)

## Metrics

Metric Name                            |  Key                                        |  Metric Type  |  Numeric Type  |  Unit   |  Description
---------------------------------------|---------------------------------------------|---------------|----------------|---------|-------------------------------------------------------------------
field cache size                       |  es.cache.field.size                        |  gauge        |  long          |  bytes  |  Field cache size
field cache evictions                  |  es.cache.field.evicted                     |  counter      |  long          |         |  Field cache evictions
filter cache size                      |  es.cache.filter.size                       |  gauge        |  long          |  bytes  |  Filter cache size
filter/query cache count               |  es.cache.filter.size.count                 |  counter      |  long          |         |  Filter/query cache count of elements
filter cache evictions                 |  es.cache.filter.evicted                    |  counter      |  long          |         |  Filter cache evictions
warmer current                         |  es.cache.warmer.current                    |  gauge        |  long          |         |  Warmer current
warmer total time                      |  es.cache.warmer.time                       |  counter      |  long          |  ms     |  Warmer total time
warmer total                           |  es.cache.warmer.total                      |  counter      |  long          |  bytes  |  Warmer total
fieldData estimated size               |  es.circuitBreaker.fieldData.size.estimate  |  gauge        |  long          |  bytes  |  estimated fieldData size
fieldData max size                     |  es.circuitBreaker.fieldData.size.max       |  gauge        |  long          |  bytes  |  max fieldData size
fieldData overhead                     |  es.circuitBreaker.fieldData.size.overhead  |  gauge        |  double        |         |  fieldData overhead
request estimated size                 |  es.circuitBreaker.request.size.estimate    |  gauge        |  long          |  bytes  |  estimated request size
request maximum size                   |  es.circuitBreaker.request.size.max         |  gauge        |  long          |  bytes  |  max request size
request overhead                       |  es.circuitBreaker.request.size.overhead    |  gauge        |  double        |         |  request overhead
active shards                          |  es.cluster.health.shards.active            |  gauge        |  long          |         |  Number of active shards
active primary shards                  |  es.cluster.health.shards.active.primary    |  gauge        |  long          |         |  Number of active primary shards
initializing shards                    |  es.cluster.health.shards.initializing      |  gauge        |  long          |         |  Number of currently initializing shards
relocating shards                      |  es.cluster.health.shards.relocating        |  gauge        |  long          |         |  Number of currently relocating shards
unassigned shards                      |  es.cluster.health.shards.unassigned        |  gauge        |  long          |         |  Number of currently unassigned shards
ES nodes                               |  es.cluster.nodes                           |  gauge        |  long          |         |  Number of nodes in the ES cluster
ES data nodes                          |  es.cluster.nodes.data                      |  gauge        |  long          |         |  Number of data nodes in the ES cluster
active primary shards                  |  es.cluster.shards.active.primary           |  gauge        |  long          |         |  Number of active primary shards
initializing shards                    |  es.cluster.shards.initializing             |  gauge        |  long          |         |  Number of initializing shards
active shards                          |  es.cluster.shards.active                   |  gauge        |  long          |         |  Number of active shards
relocating shards                      |  es.cluster.shards.relocating               |  gauge        |  long          |         |  Number of relocating shards
unassigned shards                      |  es.cluster.shards.unassigned               |  gauge        |  long          |         |  Number of unassigned shards
open HTTP conns                        |  es.connection.http.current.open            |  gauge        |  long          |         |  open HTTP conns (current_open)
total opened HTTP conns                |  es.connection.http.total.opened            |  gauge        |  long          |         |  total opened HTTP conns (total_opened)
open TCP conns                         |  es.connection.tcp.server.open              |  gauge        |  long          |         |  open TCP conns (server_open)
active conn openings                   |  es.connection.tcp.active.opens             |  counter      |  long          |         |  active conn openings (active_opens)
passive conn openings                  |  es.connection.tcp.passive.opens            |  counter      |  long          |         |  passive conn openings (passive_opens)
open sockets                           |  es.connection.tcp.current.estab            |  gauge        |  long          |         |  open sockets (current_estab)
inbound segments (in_segs)             |  es.connection.in.segs                      |  counter      |  long          |         |  inbound segments (in_segs)
outbound segments (out_segs)           |  es.connection.out.segs                     |  counter      |  long          |         |  outbound segments (out_segs)
retransmitted segments (retrans_segs)  |  es.connection.retrans.segs                 |  counter      |  long          |         |  retransmitted segments (retrans_segs)
socket resets (estab_resets)           |  es.connection.tcp.estab.resets             |  counter      |  long          |         |  socket resets (estab_resets)
failed socket open (attempt_fails)     |  es.connection.tcp.attempt.fails            |  counter      |  long          |         |  failed socket open (attempt_fails)
connection errors                      |  es.connection.in.errors                    |  counter      |  long          |         |  connection errors
socket resets sent (out_rsts)          |  es.connection.tcp.out.rsts                 |  counter      |  long          |         |  socket resets sent (out_rsts)
fetch count (prim)                     |  es.fetch.count.primaries                   |  counter      |  long          |         |  fetch count on primary shards
fetch count (all)                      |  es.fetch.count.total                       |  counter      |  long          |         |  fetch count on all (primary and replica) shards
fetch latency (prim)                   |  es.fetch.latency.time.primaries            |  counter      |  long          |  ms     |  fetch latency on primary shards
fetch latency (all)                    |  es.fetch.latency.time.total                |  counter      |  long          |  ms     |  fetch latency on all (primary and replica) shards
docs deleted (prim)                    |  es.index.docs.deleted.primaries            |  gauge        |  long          |         |  docs deleted on primary shards
docs deleted (all)                     |  es.index.docs.deleted.total                |  gauge        |  long          |         |  docs deleted on all (primary and replica) shards
docs count (prim)                      |  es.index.docs.primaries                    |  gauge        |  long          |         |  docs count on primary shards
docs count (all)                       |  es.index.docs.totals                       |  gauge        |  long          |         |  docs count on all (primary and replica) shards
size on disk (prim)                    |  es.index.files.size.primaries              |  gauge        |  long          |  bytes  |  size on the disk of primary shards
size on disk (all)                     |  es.index.files.size.total                  |  gauge        |  long          |  bytes  |  size on the disk of all (primary and replica) shards
indexed docs (prim)                    |  es.indexing.docs.added.primaries           |  counter      |  long          |         |  docs indexed on primary shards
indexed docs (all)                     |  es.indexing.docs.added.total               |  counter      |  long          |         |  docs indexed on all (primary and replica) shards
deleted docs (prim)                    |  es.indexing.docs.deleted.primaries         |  counter      |  long          |         |  docs deleted on primary shards
deleted docs (all)                     |  es.indexing.docs.deleted.total             |  counter      |  long          |         |  docs deleted on all (primary and replica) shards
flush count (prim)                     |  es.indexing.flushes.primaries              |  counter      |  long          |         |  flush count on primary shards
flush count (all)                      |  es.indexing.flushes.total                  |  counter      |  long          |         |  flush count on all (primary and replica) shards
flush time (prim)                      |  es.indexing.flushes.time.primaries         |  counter      |  long          |  ms     |  flush time on primary shards
flush time (all)                       |  es.indexing.flushes.time.total             |  counter      |  long          |  ms     |  flush time on all (primary and replica) shards
merged docs count (prim)               |  es.indexing.merges.docs.primaries          |  counter      |  long          |         |  merged docs count on primary shards
merged docs size (prim)                |  es.indexing.merges.docs.size.primaries     |  counter      |  long          |  bytes  |  merged docs size on primary shards
merged docs size (all)                 |  es.indexing.merges.docs.size.total         |  counter      |  long          |  bytes  |  merged docs size on all (primary and replica) shards
merged docs count (all)                |  es.indexing.merges.docs.total              |  counter      |  long          |         |  merged docs count on all (primary and replica) shards
merge count (prim)                     |  es.indexing.merges.primaries               |  counter      |  long          |         |  merge count on primary shards
merge count (all)                      |  es.indexing.merges.total                   |  counter      |  long          |         |  merge count on all (primary and replica) shards
merge time (prim)                      |  es.indexing.merges.time.primaries          |  counter      |  long          |  ms     |  merge time on primary shards
merge time (all)                       |  es.indexing.merges.time.total              |  counter      |  long          |  ms     |  merge time on all (primary and replica) shards
refresh count (prim)                   |  es.indexing.refreshes.primaries            |  counter      |  long          |         |  refresh count on primary shards
refresh count (all)                    |  es.indexing.refreshes.total                |  counter      |  long          |         |  refresh count on all (primary and replica) shards
refresh time (prim)                    |  es.indexing.refreshes.time.primaries       |  counter      |  long          |  ms     |  refresh time on primary shards
refresh time (all)                     |  es.indexing.refreshes.time.total           |  counter      |  long          |  ms     |  refresh time on all (primary and replica) shards
indexing time (prim)                   |  es.indexing.time.added.primaries           |  counter      |  long          |  ms     |  time spent indexing on primary shards
indexing time (all)                    |  es.indexing.time.added.total               |  counter      |  long          |  ms     |  time spent indexing on all (primary and replica) shards
deleting time (prim)                   |  es.indexing.time.deleted.primaries         |  counter      |  long          |  ms     |  time spent deleting on primary shards
deleting time (all)                    |  es.indexing.time.deleted.total             |  counter      |  long          |  ms     |  time spent deleting on all (primary and replica) shards
query count (prim)                     |  es.query.count.primaries                   |  counter      |  long          |         |  query count on primary shards
query count (all)                      |  es.query.count.total                       |  counter      |  long          |         |  query count on all (primary and replica) shards
query latency (prim)                   |  es.query.latency.time.primaries            |  counter      |  long          |  ms     |  query latency on primary shards
query latency (all)                    |  es.query.latency.time.total                |  counter      |  long          |  ms     |  query latency on all (primary and replica) shards
avg. query latency (primaries)         |  es.query.latency.primaries.avg             |  gauge        |  long          |  ms     |  avg. query latency on primary shards
avg. query latency (all)               |  es.query.latency.total.avg                 |  gauge        |  long          |  ms     |  avg. query latency on all (primary and replica) shards
real-time get exists count (prim)      |  es.request.rtg.exists.primaries            |  counter      |  long          |         |  real-time get exists count on primary shards
real-time get exists count (all)       |  es.request.rtg.exists.total                |  counter      |  long          |         |  real-time get exists count on all (primary and replica) shards
real-time get exists latency (prim)    |  es.request.rtg.exists.time.primaries       |  counter      |  long          |  ms     |  real-time get exists latency on primary shards
real-time get exists latency (all)     |  es.request.rtg.exists.time.total           |  counter      |  long          |  ms     |  real-time get exists latency on all (primary and replica) shards
real-time get missing count (prim)     |  es.request.rtg.missing.primaries           |  counter      |  long          |         |  real-time get missing count on primary shards
real-time get missing count (all)      |  es.request.rtg.missing.total               |  counter      |  long          |         |  real-time get missing count on all (primary and replica) shards
real-time get missing latency (prim)   |  es.request.rtg.missing.time.primaries      |  counter      |  long          |  ms     |  real-time get missing latency on primary shards
real-time get missing latency (all)    |  es.request.rtg.missing.time.total          |  counter      |  long          |  ms     |  real-time get missing latency on all (primary and replica) shards
real-time get count (prim)             |  es.request.rtg.primaries                   |  counter      |  long          |         |  real-time get count on primary shards
real-time get count (all)              |  es.request.rtg.total                       |  counter      |  long          |         |  real-time get count on all (primary and replica) shards
real-time get latency (prim)           |  es.request.rtg.time.primaries              |  counter      |  long          |  ms     |  real-time latency on primary shards
real-time get latency (all)            |  es.request.rtg.time.total                  |  counter      |  long          |  ms     |  real-time latency on all (primary and replica) shards
active threads                         |  es.thread.pool.active                      |  gauge        |  long          |         |  active threads
thread pool size                       |  es.thread.pool.size                        |  gauge        |  long          |         |  thread pool size
thread pool queue                      |  es.thread.pool.queue                       |  gauge        |  long          |         |  thread pool queue
thread pool queue size                 |  es.thread.pool.queue.size                  |  gauge        |  long          |         |  thread pool queue size
rejected threads                       |  es.thread.pool.rejected                    |  counter      |  long          |         |  rejected threads
thread pool largest                    |  es.thread.pool.largest                     |  gauge        |  long          |         |  thread pool largest
completed threads                      |  es.thread.pool.completed                   |  counter      |  long          |         |  complete threads
thread pool min                        |  es.thread.pool.min                         |  gauge        |  long          |         |  thread pool min
thread pool max                        |  es.thread.pool.max                         |  gauge        |  long          |         |  thread pool max
network received size                  |  es.transport.rx.bytes                      |  counter      |  long          |  bytes  |  network received size (rx_size)
network received packets               |  es.transport.rx.packets                    |  counter      |  long          |         |  network received packets count (rx_count)
network transmitted size               |  es.transport.tx.bytes                      |  counter      |  long          |  bytes  |  network transmitted size (tx_size)
network transmitted packets            |  es.transport.tx.packets                    |  counter      |  long          |         |  network transmitted packets count (tx_count)
max open files                         |  jvm.files.max                              |  gauge        |  long          |         |  jvm max open files limit
open files                             |  jvm.files.open                             |  gauge        |  long          |         |  jvm currently open files
gc collection count                    |  jvm.gc.collection.count                    |  counter      |  long          |         |  count of GC collections
gc collection time                     |  jvm.gc.collection.time                     |  counter      |  long          |  ms     |  duration of GC collections
used                                   |  jvm.pool.max                               |  gauge        |  long          |  bytes  |  jvm pool max memory
used                                   |  jvm.pool.used                              |  gauge        |  long          |  bytes  |  jvm pool used memory
thread count                           |  jvm.threads                                |  gauge        |  long          |         |  current jvm thread count
peak thread count                      |  jvm.threads.peak                           |  gauge        |  long          |         |  peak jvm thread co

## FAQ

** Why doesn't the number of documents I see in SPM match the number of documents in my Elasticsearch index **

SPM collects index stats from primary shards only.  To see the
total number of documents in an index, select all shards in that index
and choose "sum".  The list of shards and the "sum" function can be
found in the "Shard filter" in the Index Stats
report.

** Can SPM collect metrics even when Elasticsearch HTTP API is disabled **

Each SPM agent collects Elasticsearch metrics only from the local
node by accessing the Stats API via HTTP.  To allow only local access
add the following to elasticsearch.yml. Don't forget to restart each ES
node to whose elasticsearch.yml you add this.

``` bash
http.host: "127.0.0.1"
```

** Can I point SPM monitor to a non-localhost Elasticsearch node **

Yes.  Adjust
/opt/spm/spm-monitor/conf/spm-monitor-config-*TOKEN\_HERE*-default.properties
and change the SPM\_MONITOR\_ES\_NODE\_HOSTPORT property from the
default localhost:9200 value to use an alternative hostname:port.  After
that restart SPM monitor (if you are running a standalone version) or
Elasticsearch process(es) with embedded SPM
monitor. 

** My Elasticsearch is protected by basic HTTP authentication, can I use SPM  **

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

** I am using SPM for Elasticsearch monitor and I don't see Index (and/or Refresh/Flush/Merge) stats, why is that **

SPM for Elasticsearch monitor collects Index stats only from
primary shards, so it is possible that you installed SPM monitor on some
Elasticsearch node which hosts only replicas. The same is also true for
Refresh/Flush and Merge stats. Also note that SPM Elasticsearch monitor
should be installed on all your Elasticsearch nodes to get the complete
picture of your cluster in SPM Reports UI.
