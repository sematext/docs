title: Elasticsearch Monitoring Integration
description: Collect and monitor key Elasticsearch metrics such as request latency, indexing rate, and segment merges with built-in anomaly detection, threshold, and heartbeat alerts. Send notifications to email and various chatops messaging services, correlate events & logs, filter metrics by server, node, time or index, and visualize your cluster's health with out of the box graphs and custom dashboards

## Agent Install
Setting up the monitoring agent takes less than 5 minutes:

1.  Create an Elasticsearch App in the  [Integrations / Overview](https://apps.sematext.com/ui/monitoring-create) (or  [Sematext Cloud Europe](https://apps.eu.sematext.com/ui/monitoring-create)). This will let you install the agent and control access to your monitoring and logs data. The short  [What is an App in Sematext Cloud](https://www.youtube.com/watch?v=tr_qxdr8dvk&index=14&list=plt_fd32ofypflbfzz_hiafnqjdltth1ns) video has more details.
2.  Name your Elasticsearch monitoring App and, if you want to collect Elasticsearch logs as well, create a Logs App along the way.
3.  Install the Sematext Agent according to the  [setup instructions](https://apps.sematext.com/ui/howto/Elasticsearch/overview) displayed in the UI.
4.  Enable HTTP metrics by setting `http.enabled: true` and set the `node.name` value in `elasticsearch.yaml`.

![App creation and setup instructions in Sematext Cloud](https://sematext.com/wp-content/uploads/2021/01/create-elasticsearch-app-min.gif)

For example, on Ubuntu, add Sematext Linux packages with the following command:

    echo "deb http://pub-repo.sematext.com/ubuntu sematext main" | sudo tee /etc/apt/sources.list.d/sematext.list > /dev/null
    wget -O - https://pub-repo.sematext.com/ubuntu/sematext.gpg.key | sudo apt-key add -
    sudo apt-get update
    sudo apt-get install sematext-agent

Then setup Elasticsearch monitoring by providing Elasticsearch server connection details:

    sudo bash /opt/spm/bin/setup-sematext  \
        --monitoring-token <your-token-goes-here>   \
        --app-type elasticsearch  \
        --agent-type standalone  \
        --ST_MONITOR_ES_NODE_HOSTPORT 'localhost:9200'

Make sure that HTTP metrics are enabled by setting `http.enabled: true` in `elasticsearch.yaml`. Also set the `node.name` value in the same file. Elasticsearch will otherwise generate a random node name each time an instance starts, making tracking node stats over time impossible.

The `elasticsearch.yml` file can be found in `/etc/elasticsearch/elasticsearch.yml` or `$ES_HOME/config/elasticsearch.yml`.


## Important Metrics to Watch and Alert on
### System and JVM Metrics
The first place we would recommend looking for in a new system are the OS metrics: CPU, memory, IO and network. A healthy CPU graph looks like this:

![CPU usage](https://sematext.com/wp-content/uploads/2019/03/Screen-Shot-2019-03-26-at-11.18.14-1.png)

Note how the relative percentage of *wait* and *system* is negligible compared to *user*. Meaning we don't have a bottleneck in IO. And total usage isn't close to 100% all the time, so there's headroom.

If there's high CPU usage, have a look at JVM garbage collection (GC) times. Which are probably good candidates for alerts. If GC times are high, then Elasticsearch is in trouble with JVM memory, rather than doing useful work with the CPU. You can look deeper into JVM memory usage to check. A healthy pattern looks like a shard tooth:

![JVM memory usage per pool](https://sematext.com/wp-content/uploads/2019/03/Screen-Shot-2019-03-26-at-10.50.27-1.png)

When it comes to system memory, don't be worried if you see very little free, like here:

![System memory usage](https://sematext.com/wp-content/uploads/2019/03/Screen-Shot-2019-03-26-at-11.24.02-1.png)

The operating system will try to cache your index files as much as it can. The *cached* memory can be freed up, if the system needs more memory.
### Elasticsearch-specific metrics
You'll want to monitor query rates and times. In other words, how fast is Elasticsearch responding? Since this will likely impact your users, these are metrics worth alerting on as well.

![Query and fetch rate](https://sematext.com/wp-content/uploads/2019/03/Screen-Shot-2019-03-26-at-11.09.09-1.png)

On the indexing side, check the indexing rate:
![Indexing rate](https://sematext.com/wp-content/uploads/2019/03/Screen-Shot-2019-03-26-at-11.13.19-1.png)

And correlate it with the asynchronous refresh and merge times, as they can correlate with your CPU spikes:

![Refresh, flush and merge stats](https://sematext.com/wp-content/uploads/2019/03/Screen-Shot-2019-03-26-at-11.16.51-1.png)

For example, if refresh time is too high, you might want to adjust the [refresh interval](https://sematext.com/blog/elasticsearch-refresh-interval-vs-indexing-performance/).

Last, but certainly not least, you may want to get an alert if a node leaves the cluster, so you can replace it. Once you do, you can keep an eye on shard stats, to see how many are initializing or relocating:

![Dropping nodes and relocation of shards](https://sematext.com/wp-content/uploads/2019/03/Screen-Shot-2019-03-26-at-10.59.52-1.png)

### Alert Setup
There are 3 types of alerts in Sematext:

 - **Heartbeat alerts**, which notify you when a Elasticsearch DB server is down
 - Classic **threshold-based alerts** that notify you when a metric value crosses a predefined threshold
 - Alerts based on statistical **anomaly detection** that notify you when metric values suddenly change and deviate from the baseline

Let’s see how to actually create some alert rules for Elasticsearch metrics in the animation below. The request query count chart shows a spike. We normally have up to 100 requests, but we see it can jump to over 600 requests. To create an alert rule on a metric we’d go to the pulldown in the top right corner of a chart and choose “Create alert”. The alert rule applies the filters from the current view and you can choose various notification options such as email or configured [notification hooks](https://sematext.com/docs/alerts/#alert-integrations) (PagerDuty, Slack, VictorOps, BigPanda, OpsGenie, Pusher, generic webhooks etc.)

![Alert creation for Elasticsearch request query count metric](https://sematext.com/wp-content/uploads/2019/03/elasticsearch-create-alert.gif)

## Correlating Logs and Metrics
Since having [logs and metrics in one platform](https://sematext.com/metrics-and-logs/) makes troubleshooting simpler and faster let’s ship Elasticsearch logs too. You can use [many log shippers](https://sematext.com/docs/integration/#logging), but we’ll use [Logagent](https://sematext.com/logagent/) because it’s lightweight, easy to set up, and because it can parse and structure logs out of the box.
### **Shipping Elasticsearch Logs**
 1. Create a Logs App to obtain an App token
 2. Install Logagent npm package
```
sudo npm i -g @sematext/logagent
```

you don’t have Node.js, you can install it easily. E.g. On Debian/Ubuntu:

```
curl -sL https://deb.nodesource.com/setup_10.x | sudo -E bash -
sudo apt-get install -y nodejs
```
 3. Install the Logagent service by specifying the logs token and the path to Elasticsearch log files. You can use ``-g ‘var/log/**/elasticsearch*.log` `` to ship only logs from Elasticsearch server. If you run other services, on the same server consider shipping all logs using ``-g `/var/log/**/*.log` `` The default settings ship all logs from /var/log/**/*.log when the -g parameter is not specified. Logagent detects the init system and installs Systemd or Upstart service scripts. On Mac OS X it creates a launchd service. Simply run:

```
sudo logagent-setup -i YOUR_LOGS_TOKEN -g `var/log/**/elasticsearch*.log`
#for EU region:
#sudo logagent-setup -i LOGS_TOKEN
#-u logsene-receiver.eu.sematext.com
#-g `var/log/**/elasticsearch*.log`
```

The setup script generates the configuration file in /etc/sematext/logagent.conf and starts Logagent as system service.

### **Log Search and Dashboards**

Once you have logs in Sematext you can search through them when troubleshooting, save queries you run frequently or  [create your individual logs dashboard](https://sematext.com/product-updates/#/2018/custom-reports-for-monitoring-logs-apps).

![Search for Elasticsearch Logs](https://sematext.com/wp-content/uploads/2019/03/clickhouse-logs-search.png)

### **Elasticsearch Metrics and Log Correlation**

A typical troubleshooting workflow starts from detecting a spike in the metrics, then digging into logs to find the root cause of the problem. Sematext makes this really simple and fast. Your metrics and logs live under the same roof. Logs are centralized, the search is fast, and the powerful  [log search syntax](https://sematext.com/docs/logs/search-syntax/) is simple to use. Correlation of metrics and logs is literally one click away.

![Elasticsearch logs and metrics in a single view](https://sematext.com/wp-content/uploads/2019/03/pasted-image-0-1.png)

## More about Elasticsearch Monitoring

* [Elasticsearch Monitoring Guide](https://sematext.com/blog/elasticsearch-guide/)
* [Top 10 Elasticsearch Metrics To Monitor](https://sematext.com/blog/top-10-elasticsearch-metrics-to-watch/)
* [Elasticsearch Open Source Monitoring Tools](https://sematext.com/blog/elasticsearch-open-source-monitoring-tools/)
* [Monitoring Elasticsearch With Sematext](https://sematext.com/blog/monitoring-elasticsearch-with-sematext/)

## Metrics

Metric Name<br> Key *(Type)* *(Unit)*                                                                          |  Description
---------------------------------------------------------------------------------------------------------------|-------------------------------------------------------------------
parent max size<br>**es.circuitBreaker.parent.size.max** <br>*(long gauge)* *(bytes)*                    |  max parent circuit breaker size
parent estimated size<br>**es.circuitBreaker.parent.size.estimate** <br>*(long gauge)* *(bytes)*                    |  estimated parent circuit breaker size
parent overhead<br>**es.circuitBreaker.parent.size.overhead** <br>*(double gauge)*                   |  parent circuit breaker overhead
parent tripped<br>**es.circuitBreaker.parent.tripped** <br>*(counter)*                    |  parent circuit breaker tripped
inFlightRequests max size<br>**es.circuitBreaker.inFlightRequests.size.max** <br>*(long gauge)* *(bytes)*                    |  max in-flight requests size
inFlightRequests estimated size<br>**es.circuitBreaker.inFlightRequests.size.estimate** <br>*(long gauge)* *(bytes)*                    |  estimated in-flight requests size
inFlightRequests overhead<br>**es.circuitBreaker.inFlightRequests.size.overhead** <br>*(double gauge)*                   |  in-flight requests overhead
inFlightRequests tripped<br>**es.circuitBreaker.inFlightRequests.tripped** <br>*(counter)*                    |  in-flight requests circuit breaker tripped
fieldData max size<br>**es.circuitBreaker.fieldData.size.max** <br>*(long gauge)* *(bytes)*                    |  max fieldData size
fieldData estimated size<br>**es.circuitBreaker.fieldData.size.estimate** <br>*(long gauge)* *(bytes)*         |  estimated fieldData size
fieldData overhead<br>**es.circuitBreaker.fieldData.size.overhead** <br>*(double gauge)*                       |  fieldData overhead
request maximum size<br>**es.circuitBreaker.request.size.max** <br>*(long gauge)* *(bytes)*                    |  max request size
fieldData tripped<br>**es.circuitBreaker.fieldData.tripped** <br>*(counter)*                    |  fieldData circuit breaker tripped
request estimated size<br>**es.circuitBreaker.request.size.estimate** <br>*(long gauge)* *(bytes)*             |  estimated request size
request overhead<br>**es.circuitBreaker.request.size.overhead** <br>*(double gauge)*                           |  request overhead
request tripped<br>**es.circuitBreaker.request.tripped** <br>*(counter)*                    |  request circuit breaker tripped
ES nodes<br>**es.cluster.nodes** <br>*(long gauge)*                                                            |  Number of nodes in the ES cluster
ES data nodes<br>**es.cluster.nodes.data** <br>*(long gauge)*                                                  |  Number of data nodes in the ES cluster
number of processors<br>**es.cpu.allocated.count** <br>*(long gauge)*                                                            |  number of processors allocated to the Elasticsearch process
full cluster state updates<br>**es.cluster.state.published.full** <br>*(long counter)*                                                            |  full cluster state updates published
cluster state incompatible diff updates<br>**es.cluster.state.published.diff.incompatible** <br>*(long counter)*                                                            |  cluster state incompatible diff updates published
cluster state compatible diff updates<br>**es.cluster.state.published.diff.compatible** <br>*(long counter)*                                                            |  cluster state compatible diff updates published
active primary shards<br>**es.cluster.health.shards.active.primary** <br>*(long gauge)*                        |  Number of active primary shards
active shards<br>**es.cluster.health.shards.active** <br>*(long gauge)*                                        |  Number of active shards
relocating shards<br>**es.cluster.health.shards.relocating** <br>*(long gauge)*                                |  Number of currently relocating shards
initializing shards<br>**es.cluster.health.shards.initializing** <br>*(long gauge)*                            |  Number of currently initializing shards
unassigned shards<br>**es.cluster.health.shards.unassigned** <br>*(long gauge)*                                |  Number of currently unassigned shards
outgoing searches<br>**es.adaptiveReplicaSelection.searches.outgoing** <br>*(long gauge)*                                |  searches from the monitored node to the remote node
average queue size<br>**es.adaptiveReplicaSelection.queue.size.avg** <br>*(double gauge)*                                |  exponentially weighted moving average queue size for searches on the remote node
average service time<br>**es.adaptiveReplicaSelection.service.time.avg** <br>*(long gauge)* *(ms)*                               |  exponentially weighted moving average task execution time on the remote node
average response time<br>**es.adaptiveReplicaSelection.response.time.avg** <br>*(long gauge)* *(ms)*                               |  exponentially weighted moving average response time on the remote node
rank<br>**es.adaptiveReplicaSelection.rank** <br>*(double gauge)*                                |  rank of the remote node used for replica selection
open HTTP conns<br>**es.connection.http.current.open** <br>*(long gauge)*                                      |  open HTTP conns (current_open)
total opened HTTP conns<br>**es.connection.http.total.opened** <br>*(long gauge)*                              |  total opened HTTP conns (total_opened)
open TCP conns<br>**es.connection.tcp.server.open** <br>*(long gauge)*                                         |  open TCP conns (server_open)
network received packets<br>**es.transport.rx.packets** <br>*(long counter)*                                   |  network received packets count (rx_count)
network received size<br>**es.transport.rx.bytes** <br>*(long counter)* *(bytes)*                              |  network received size (rx_size)
network transmitted packets<br>**es.transport.tx.packets** <br>*(long counter)*                                |  network transmitted packets count (tx_count)
network transmitted size<br>**es.transport.tx.bytes** <br>*(long counter)* *(bytes)*                           |  network transmitted size (tx_size)
active conn openings<br>**es.connection.tcp.active.opens** <br>*(long counter)*                                |  active conn openings (active_opens)
passive conn openings<br>**es.connection.tcp.passive.opens** <br>*(long counter)*                              |  passive conn openings (passive_opens)
open sockets<br>**es.connection.tcp.current.estab** <br>*(long gauge)*                                         |  open sockets (current_estab)
inbound segments (in_segs)<br>**es.connection.in.segs** <br>*(long counter)*                                   |  inbound segments (in_segs)
outbound segments (out_segs)<br>**es.connection.out.segs** <br>*(long counter)*                                |  outbound segments (out_segs)
retransmitted segments (retrans_segs)<br>**es.connection.retrans.segs** <br>*(long counter)*                   |  retransmitted segments (retrans_segs)
socket resets (estab_resets)<br>**es.connection.tcp.estab.resets** <br>*(long counter)*                        |  socket resets (estab_resets)
failed socket open (attempt_fails)<br>**es.connection.tcp.attempt.fails** <br>*(long counter)*                 |  failed socket open (attempt_fails)
connection errors<br>**es.connection.in.errors** <br>*(long counter)*                                          |  connection errors
socket resets sent (out_rsts)<br>**es.connection.tcp.out.rsts** <br>*(long counter)*                           |  socket resets sent (out_rsts)
docs count (prim)<br>**es.index.docs.primaries** <br>*(long gauge)*                                            |  docs count on primary shards
docs deleted (prim)<br>**es.index.docs.deleted.primaries** <br>*(long gauge)*                                  |  docs deleted on primary shards
docs count (all)<br>**es.index.docs.totals** <br>*(long gauge)*                                                |  docs count on all (primary and replica) shards
docs deleted (all)<br>**es.index.docs.deleted.total** <br>*(long gauge)*                                       |  docs deleted on all (primary and replica) shards
size on disk (prim)<br>**es.index.files.size.primaries** <br>*(long gauge)* *(bytes)*                          |  size on the disk of primary shards
size on disk (all)<br>**es.index.files.size.total** <br>*(long gauge)* *(bytes)*                               |  size on the disk of all (primary and replica) shards
indexed docs (prim)<br>**es.indexing.docs.added.primaries** <br>*(long counter)*                               |  docs indexed on primary shards
deleted docs (prim)<br>**es.indexing.docs.deleted.primaries** <br>*(long counter)*                             |  docs deleted on primary shards
indexing time (prim)<br>**es.indexing.time.added.primaries** <br>*(long counter)* *(ms)*                       |  time spent indexing on primary shards
deleting time (prim)<br>**es.indexing.time.deleted.primaries** <br>*(long counter)* *(ms)*                     |  time spent deleting on primary shards
indexed docs (all)<br>**es.indexing.docs.added.total** <br>*(long counter)*                                    |  docs indexed on all (primary and replica) shards
deleted docs (all)<br>**es.indexing.docs.deleted.total** <br>*(long counter)*                                  |  docs deleted on all (primary and replica) shards
indexing time (all)<br>**es.indexing.time.added.total** <br>*(long counter)* *(ms)*                            |  time spent indexing on all (primary and replica) shards
deleting time (all)<br>**es.indexing.time.deleted.total** <br>*(long counter)* *(ms)*                          |  time spent deleting on all (primary and replica) shards
recovery throttle time<br>**es.index.recovery.time.throttled** <br>*(long counter)* *(ms)*                          |  time during which recovery was throttled (due to indices.recovery.max_bytes_per_sec limit)
completion memory<br>**es.index.completion.size** <br>*(long gauge)* *(bytes)*                               |  memory used by the Completion Suggester
translog size<br>**es.index.translog.size** <br>*(long gauge)* *(bytes)*                               |  transaction log size
translog operations<br>**es.index.translog.operations** <br>*(long gauge)*                               |  number of operations in the transaction log
translog uncommitted size<br>**es.index.translog.uncommittedSize** <br>*(long gauge)* *(bytes)*                               |  transaction log uncommitted size
translog uncommitted operations<br>**es.index.translog.uncommittedOperations** <br>*(long gauge)*                               |  number of uncommitted operations in the transaction log
segments count<br>**es.segments.count.total** <br>*(long gauge)*                               |  number of segments
segments memory<br>**es.segments.memory.total** <br>*(long gauge)* *(bytes)*                               |  total memory for segment-related data structures
terms memory<br>**es.segments.memory.terms** <br>*(long gauge)* *(bytes)*                               |  memory used by the terms dictionary
stored fields memory<br>**es.segments.memory.storedFields** <br>*(long gauge)* *(bytes)*                               |  memory used by stored fields
term vectors memory<br>**es.segments.memory.termVectors** <br>*(long gauge)* *(bytes)*                               |  memory used by term vectors
norms memory<br>**es.segments.memory.norms** <br>*(long gauge)* *(bytes)*                               |  memory used by (length) norms
points memory<br>**es.segments.memory.points** <br>*(long gauge)* *(bytes)*                               |  memory used by point fields (includes numeric, date, geo)
doc values memory<br>**es.segments.memory.docValues** <br>*(long gauge)* *(bytes)*                               |  memory used by doc values
indexing buffer memory<br>**es.segments.memory.indexWriter** <br>*(long gauge)* *(bytes)*                               |  memory used by the IndexWriter
version map memory<br>**es.segments.memory.versionMap** <br>*(long gauge)* *(bytes)*                               |  memory used by the version map
fixed bitset memory<br>**es.segments.memory.fixedBitSet** <br>*(long gauge)* *(bytes)*                               |  memory used by the fixed bitset that speeds up nested queries/aggregations
read ops<br>**es.disk.io.operations.read** <br>*(long counter)*                               |  disk IO read operations
write ops<br>**es.disk.io.operations.write** <br>*(long counter)*                               |  disk IO write operations
script compilations<br>**es.script.compilations.total** <br>*(long counter)*                               |  script compilations (use params in scripts to reduce them)
script cache evictions<br>**es.script.cache.evictions** <br>*(long counter)*                               |  script cache evictions
script compilations limit triggered<br>**es.script.compilations.limitTriggered** <br>*(long counter)*                               |  script compilations circuit breaker triggered (see script.max_compilations_rate setting)
ingest calls<br>**es.ingest.calls.total** <br>*(long counter)*                               |  number of calls to this pipeline
ingest failures<br>**es.ingest.calls.errors** <br>*(long counter)*                               |  number of failed calls to this pipeline
ingest time<br>**es.ingest.time** <br>*(long counter)* *(ms)*                               |  time spent in this pipeline
gc collection count<br>**jvm.gc.collection.count** <br>*(long counter)*                                        |  count of GC collections
gc collection time<br>**jvm.gc.collection.time** <br>*(long counter)* *(ms)*                                   |  duration of GC collections
open files<br>**jvm.files.open** <br>*(long gauge)*                                                            |  jvm currently open files
max open files<br>**jvm.files.max** <br>*(long gauge)*                                                         |  jvm max open files limit
used<br>**jvm.pool.used** <br>*(long gauge)* *(bytes)*                                                         |  jvm pool used memory
used<br>**jvm.pool.max** <br>*(long gauge)* *(bytes)*                                                          |  jvm pool max memory
thread count<br>**jvm.threads** <br>*(long gauge)*                                                             |  current jvm thread count
peak thread count<br>**jvm.threads.peak** <br>*(long gauge)*                                                   |  peak jvm thread count
merge count (prim)<br>**es.indexing.merges.primaries** <br>*(long counter)*                                    |  merge count on primary shards
merge time (prim)<br>**es.indexing.merges.time.primaries** <br>*(long counter)* *(ms)*                         |  merge time on primary shards
merged docs count (prim)<br>**es.indexing.merges.docs.primaries** <br>*(long counter)*                         |  merged docs count on primary shards
merged docs size (prim)<br>**es.indexing.merges.docs.size.primaries** <br>*(long counter)* *(bytes)*           |  merged docs size on primary shards
throttled merge time (prim)<br>**es.indexing.merges.throttled.time.primaries** <br>*(long counter)* *(ms)*           |  throttled time for merges (i.e. when merges fall behind) on primary shards
merge count (all)<br>**es.indexing.merges.total** <br>*(long counter)*                                         |  merge count on all (primary and replica) shards
merge time (all)<br>**es.indexing.merges.time.total** <br>*(long counter)* *(ms)*                              |  merge time on all (primary and replica) shards
merged docs count (all)<br>**es.indexing.merges.docs.total** <br>*(long counter)*                              |  merged docs count on all (primary and replica) shards
merged docs size (all)<br>**es.indexing.merges.docs.size.total** <br>*(long counter)* *(bytes)*                |  merged docs size on all (primary and replica) shards
throttled merge time (all)<br>**es.indexing.merges.throttled.time.total** <br>*(long counter)* *(ms)*           |  throttled time for merges (i.e. when merges fall behind) on all (primary and replica) shards
field cache evictions<br>**es.cache.field.evicted** <br>*(long counter)*                                       |  Field cache evictions
field cache size<br>**es.cache.field.size** <br>*(long gauge)* *(bytes)*                                       |  Field cache size
filter cache evictions<br>**es.cache.filter.evicted** <br>*(long counter)*                                     |  Filter cache evictions
filter cache size<br>**es.cache.filter.size** <br>*(long gauge)* *(bytes)*                                     |  Filter cache size
filter/query cache count<br>**cache.filter.size.count** <br>*(long counter)*                                     |   Filter/query cache count of elements
filter/query cache hit count<br>**es.cache.filter.hits** <br>*(long counter)*                                     |  Number of requests hitting the filter/query cache
filter/query cache miss count<br>**es.cache.filter.misses** <br>*(long counter)*                                     |  Number of requests missing the filter/query cache
request cache evictions<br>**es.cache.request.evicted** <br>*(long counter)*                                     |  Request cache evictions
request cache size<br>**es.cache.request.size** <br>*(long gauge)* *(bytes)*                                     |  Request cache size
request cache hit count<br>**es.cache.request.hits** <br>*(long counter)*                                     |  Number of requests hitting the request cache
request cache miss count<br>**es.cache.request.misses** <br>*(long counter)*                                     |  Number of requests missing the request cache
warmer current<br>**es.cache.warmer.current** <br>*(long gauge)*                                               |  Warmer current
warmer total<br>**es.cache.warmer.total** <br>*(long counter)* *(bytes)*                                       |  Warmer total
warmer total time<br>**es.cache.warmer.time** <br>*(long counter)* *(ms)*                                      |  Warmer total time
filter/query cache count<br>**es.cache.filter.size.count** <br>*(long counter)*                                |  Filter/query cache count of elements
refresh count (prim)<br>**es.indexing.refreshes.primaries** <br>*(long counter)*                               |  refresh count on primary shards
refresh time (prim)<br>**es.indexing.refreshes.time.primaries** <br>*(long counter)* *(ms)*                    |  refresh time on primary shards
refresh count (all)<br>**es.indexing.refreshes.total** <br>*(long counter)*                                    |  refresh count on all (primary and replica) shards
refresh time (all)<br>**es.indexing.refreshes.time.total** <br>*(long counter)* *(ms)*                         |  refresh time on all (primary and replica) shards
flush count (prim)<br>**es.indexing.flushes.primaries** <br>*(long counter)*                                   |  flush count on primary shards
flush time (prim)<br>**es.indexing.flushes.time.primaries** <br>*(long counter)* *(ms)*                        |  flush time on primary shards
flush count (all)<br>**es.indexing.flushes.total** <br>*(long counter)*                                        |  flush count on all (primary and replica) shards
flush time (all)<br>**es.indexing.flushes.time.total** <br>*(long counter)* *(ms)*                             |  flush time on all (primary and replica) shards
query count (prim)<br>**es.query.count.primaries** <br>*(long counter)*                                        |  query count on primary shards
query latency (prim)<br>**es.query.latency.time.primaries** <br>*(long counter)* *(ms)*                        |  query latency on primary shards
fetch count (prim)<br>**es.fetch.count.primaries** <br>*(long counter)*                                        |  fetch count on primary shards
fetch latency (prim)<br>**es.fetch.latency.time.primaries** <br>*(long counter)* *(ms)*                        |  fetch latency on primary shards
avg. query latency (primaries)<br>**es.query.latency.primaries.avg** <br>*(long gauge)* *(ms)*                 |  avg. query latency on primary shards
suggest count (prim)<br>**es.suggest.count.primaries** <br>*(long counter)*                                        |  suggest count on primary shards
suggest latency (prim)<br>**es.suggest.latency.time.primaries** <br>*(long counter)* *(ms)*                        |  suggest latency on primary shards
scroll count (prim)<br>**es.scroll.count.primaries** <br>*(long counter)*                                        |  scroll count on primary shards
scroll latency (prim)<br>**es.scroll.latency.time.primaries** <br>*(long counter)* *(ms)*                        |  scroll latency on primary shards
search open contexts (prim)<br>**es.opencontexts.primaries** <br>*(long gauge)*                                        |  open search contexts on primary shards
query count (all)<br>**es.query.count.total** <br>*(long counter)*                                             |  query count on all (primary and replica) shards
query latency (all)<br>**es.query.latency.time.total** <br>*(long counter)* *(ms)*                             |  query latency on all (primary and replica) shards
fetch count (all)<br>**es.fetch.count.total** <br>*(long counter)*                                             |  fetch count on all (primary and replica) shards
fetch latency (all)<br>**es.fetch.latency.time.total** <br>*(long counter)* *(ms)*                             |  fetch latency on all (primary and replica) shards
avg. query latency (all)<br>**es.query.latency.total.avg** <br>*(long gauge)* *(ms)*                           |  avg. query latency on all (primary and replica) shards
suggest count (all)<br>**es.suggest.count.total** <br>*(long counter)*                                        |  suggest count on all (primary and replica) shards
suggest latency (all)<br>**es.suggest.latency.time.total** <br>*(long counter)* *(ms)*                        |  suggest latency on all (primary and replica) shards
scroll count (all)<br>**es.scroll.count.total** <br>*(long counter)*                                        |  scroll count on all (primary and replica) shards
scroll latency (all)<br>**es.scroll.latency.time.total** <br>*(long counter)* *(ms)*                        |  scroll latency on all (primary and replica) shards
search open contexts (all)<br>**es.opencontexts.total** <br>*(long gauge)*                                        |  open search contexts on all (primary and replica) shards
real-time get count (prim)<br>**es.request.rtg.primaries** <br>*(long counter)*                                |  real-time get count on primary shards
real-time get latency (prim)<br>**es.request.rtg.time.primaries** <br>*(long counter)* *(ms)*                  |  real-time latency on primary shards
real-time get exists count (prim)<br>**es.request.rtg.exists.primaries** <br>*(long counter)*                  |  real-time get exists count on primary shards
real-time get exists latency (prim)<br>**es.request.rtg.exists.time.primaries** <br>*(long counter)* *(ms)*    |  real-time get exists latency on primary shards
real-time get missing count (prim)<br>**es.request.rtg.missing.primaries** <br>*(long counter)*                |  real-time get missing count on primary shards
real-time get missing latency (prim)<br>**es.request.rtg.missing.time.primaries** <br>*(long counter)* *(ms)*  |  real-time get missing latency on primary shards
real-time get count (all)<br>**es.request.rtg.total** <br>*(long counter)*                                     |  real-time get count on all (primary and replica) shards
real-time get latency (all)<br>**es.request.rtg.time.total** <br>*(long counter)* *(ms)*                       |  real-time latency on all (primary and replica) shards
real-time get exists count (all)<br>**es.request.rtg.exists.total** <br>*(long counter)*                       |  real-time get exists count on all (primary and replica) shards
real-time get exists latency (all)<br>**es.request.rtg.exists.time.total** <br>*(long counter)* *(ms)*         |  real-time get exists latency on all (primary and replica) shards
real-time get missing count (all)<br>**es.request.rtg.missing.total** <br>*(long counter)*                     |  real-time get missing count on all (primary and replica) shards
real-time get missing latency (all)<br>**es.request.rtg.missing.time.total** <br>*(long counter)* *(ms)*       |  real-time get missing latency on all (primary and replica) shards
active shards<br>**es.cluster.shards.active** <br>*(long gauge)*                                               |  Number of active shards
active primary shards<br>**es.cluster.shards.active.primary** <br>*(long gauge)*                               |  Number of active primary shards
initializing shards<br>**es.cluster.shards.initializing** <br>*(long gauge)*                                   |  Number of initializing shards
relocating shards<br>**es.cluster.shards.relocating** <br>*(long gauge)*                                       |  Number of relocating shards
unassigned shards<br>**es.cluster.shards.unassigned** <br>*(long gauge)*                                       |  Number of unassigned shards
active threads<br>**es.thread.pool.active** <br>*(long gauge)*                                                 |  active threads
thread pool size<br>**es.thread.pool.size** <br>*(long gauge)*                                                 |  thread pool size
thread pool queue<br>**es.thread.pool.queue** <br>*(long gauge)*                                               |  thread pool queue
thread pool queue size<br>**es.thread.pool.queue.size** <br>*(long gauge)*                                     |  thread pool queue size
rejected threads<br>**es.thread.pool.rejected** <br>*(long counter)*                                           |  rejected threads
thread pool largest<br>**es.thread.pool.largest** <br>*(long gauge)*                                           |  thread pool largest
completed threads<br>**es.thread.pool.completed** <br>*(long counter)*                                         |  complete threads
thread pool min<br>**es.thread.pool.min** <br>*(long gauge)*                                                   |  thread pool min
thread pool max<br>**es.thread.pool.max** <br>*(long gauge)*                                                   |  thread pool max

## FAQ

** Why doesn't the number of documents I see in Sematext match the number of documents in my Elasticsearch index **

Sematext collects index stats from primary shards only.  To see the
total number of documents in an index, select all shards in that index
and choose "sum".  The list of shards and the "sum" function can be
found in the "Shard filter" in the Index Stats
report.

** Can Sematext Agent collect metrics even when Elasticsearch HTTP API is disabled **

Each Sematext Agent collects Elasticsearch metrics only from the local
node by accessing the Stats API via HTTP.  To allow only local access
add the following to elasticsearch.yml. Don't forget to restart each ES
node to whose elasticsearch.yml you add this.

``` bash
http.host: "127.0.0.1"
```

** Can I point Sematext Agent to a non-localhost Elasticsearch node **

Yes.  Adjust
/opt/spm/spm-monitor/conf/spm-monitor-config-*TOKEN\_HERE*-default.properties
and change the SPM\_MONITOR\_ES\_NODE\_HOSTPORT property from the
default localhost:9200 value to use an alternative hostname:port.  After
that restart Sematext Agent (if you are running a standalone App Agent version) or
Elasticsearch process(es) with embedded App Agent.

** My Elasticsearch is protected by basic HTTP authentication, can I use Sematext Agent  **

Yes. You just need to adjust
/opt/spm/spm-monitor/conf/spm-monitor-config-*TOKEN\_HERE*-default.properties
file by adding the following two properties (replace values with your
real username and password):

``` properties
ST_MONITOR_ES_NODE_BASICAUTH_USERNAME=yourUsername
ST_MONITOR_ES_NODE_BASICAUTH_PASSWORD=yourPassword
```

Restart your Sematext Agent after this change (either with **sudo service
spm-monitor restart** in case of standalone App Agent or by restarting
Elasticsearch node if you are using in-process
App Agent).

** I am using Sematext Agent and I don't see Index (and/or Refresh/Flush/Merge) stats, why is that **

Sematext Agent collects Index stats only from
primary shards, so it is possible that you installed Sematext Agent on some
Elasticsearch node which hosts only replicas. The same is also true for
Refresh/Flush and Merge stats. Also note that Sematext Agent
should be installed on all your Elasticsearch nodes to get the complete
picture of your cluster in Sematext Reports UI.
