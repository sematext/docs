
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