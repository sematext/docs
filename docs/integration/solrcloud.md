title: SolrCloud Monitoring Integration
description:  Our monitoring and logging platform includes integration for SolrCloud. Use predefined key metrics reports combined with rich data visualization tools to monitor critical issues on your Solr machines cluster, and receive alerts on memory usage, uptime, load averages, index stats, document and filter caches, latency, rate, and more

Sematext offers simple and versatile SolrCloud monitoring agent written in Java and Golang without CPU and memory overhead. It's easy to install and requires no changes in the SolrCloud source code or your application's source code. 

## Sematext SolrCloud Monitoring Agent 
This lightweight, open-source [Java Monitoring Agent](https://github.com/sematext/sematext-agent-java) collects SolrCloud performance metrics and sends them to Sematext. The second part of the Sematext SolrCloud Monitoring Agent is a Golang-based agent responsible for Operating System level metrics like network, I/O and more. 

The Sematext SolrCloud Monitoring Agent can be run in two different modes - *in-process* and *standalone*. The *in-process* one is run as a Java agent, it is simpler to initially set up, but will require restarting your Solr node when you will want to upgrade your monitoring Agent, i.e. to get new features. The benefit of the *standalone* agent mode is that it's running as a separate process and doesn't require a Solr restart when it is upgraded.

After creating a [SolrCloud App in Sematext](https://apps.sematext.com/ui/monitoring-create) you need to install the Monitoring Agent on each host that is running your SolrCloud nodes to have the full visibility over the metrics from each host. The full installation instructions can be found in the [setup instructions](https://apps.sematext.com/ui/howto/SolrCloud/overview) displayed in the UI. 

For example, on CentOS, you need to add Sematext Linux packages and install them with the following command:
```bash
sudo wget https://pub-repo.sematext.com/centos/sematext.repo -O /etc/yum.repos.d/sematext.repo
sudo yum clean all
sudo yum install spm-client
``` 

After that you need to setup the SolrCloud Monitoring Agent by running a command like this:
```bash
sudo bash /opt/spm/bin/setup-sematext  \
    --monitoring-token <your-monitoring-token-goes-here>   \
    --app-type solrcloud  \
    --agent-type javaagent  \
    --infra-token <your-infra-token-goes-here>
```

The command above will set up your SolrCloud Monitoring Agent in the *in-process* mode. To have it running in the *standalone* mode, run the command below instead of the one above:
```bash
sudo bash /opt/spm/bin/setup-sematext  \
    --monitoring-token <your-monitoring-token-goes-here>   \
    --app-type solr  \
    --agent-type standalone  \
    --infra-token <your-infra-token-goes-here>  \
    --jmx-params '-Dspm.remote.jmx.url=localhost:3000'
```

Keep in mind that your need to provide the Monitoring token and Infra token. They are both provided in the [installation instructions](https://apps.sematext.com/ui/howto/SolrCloud/overview) for your SolrCloud App. 

Finally, the last thing that needs to be done is adjusting the *solr.in.sh* file and add the following section:
```bash
SOLR_OPTS="$SOLR_OPTS -Dcom.sun.management.jmxremote -javaagent:/opt/spm/spm-monitor/lib/spm-monitor-generic.jar=<your-monitoring-token-goes-here>::default"
```

Or if you would like to run the Solr Monitoring Agent in the *standalone* mode add the following section to the ```solr.in.sh``` file:
```bash
SOLR_OPTS="$SOLR_OPTS -Dcom.sun.management.jmxremote -Dcom.sun.management.jmxremote.port=3000 -Dcom.sun.management.jmxremote.ssl=false -Dcom.sun.management.jmxremote.authenticate=false"
```

Make sure that tag ```<jmx />``` is enabled in your ```solrconfig.xml``` file.

**You need to restart your SolrCloud node after the changes above.**

## Collected Metrics

The Sematext SolrCloud monitoring agent collects the following metrics.

### Operating System

- CPU usage
- CPU load
- Memory usage 
- Swap usage
- Disk space used
- I/O Reads and Writes
- Network traffic

![](https://sematext.com/wp-content/uploads/2019/05/d_solr_cpu_details.png)

### Java Virtual Machine

- Grabage collectors time and count
- JVM pool size and utilization
- Threads and daemon threads
- Files opened by the JVM

![](https://sematext.com/wp-content/uploads/2019/05/d_solr_jvm_pool.png)

### Solr

- Requests rate and latency 
- Solr index stats and file system stats
- Added and pending documents
- Deletes by id and queries
- Filter cache statistics
- Document cache statistics
- Query result cache statistics
- Per segment filter cache statistics
- Commit events 
- Warmup times

![](https://sematext.com/wp-content/uploads/2019/05/d_solr_requests.png)

## Troubleshooting

If you are having issues with Sematext Monitoring, i.e. not seeing SolrCloud metrics, you can create a diagnostics package on any affected machines where SolrCloud Monitoring Agent installed by running:

```bash
sudo bash /opt/spm/bin/spm-client-diagnostics.sh
```

The resulting package will contain all relevant info needed for our investigation. You can send it, along with a short description of your problem, to support@sematext.com or contact us through the chat in the bottom right.

## Integration

- Agent: [https://github.com/sematext/sematext-agent-java](https://github.com/sematext/sematext-agent-java)
- Tutorial: [https://sematext.com/blog/solr-monitoring-made-easy-with-sematext/](https://sematext.com/blog/solr-monitoring-made-easy-with-sematext/)
- Instructions: [https://apps.sematext.com/ui/howto/Solr/overview](https://apps.sematext.com/ui/howto/Solr/overview)

## Metrics

Metric Name<br> Key *(Type)* *(Unit)*                                                     |  Description
------------------------------------------------------------------------------------------|--------------------------------
cache lookups<br>**solr.cache.lookups** <br>*(long counter)*                              |  lookups count
cache hits<br>**solr.cache.hits** <br>*(long counter)*                                    |  hits count
cache size<br>**solr.cache.size** <br>*(long gauge)*                                      |  cache size (count of elements)
cache evictions<br>**solr.cache.evicted** <br>*(long counter)*                            |  count of evictions
warmup time<br>**solr.warmup.time** <br>*(long counter)* *(ms)*                           |  warmup time
cache memory used<br>**solr.cache.size.bytes** <br>*(long gauge)* *(bytes)*               |  cache size in bytes
cache max size<br>**solr.cache.size.max** <br>*(long gauge)*                              |  cache max size
autowarm count or %<br>**solr.cache.autowarm.count** <br>*(long gauge)*                   |  cache autowarm count or %
request time<br>**solr.requests.time** <br>*(long counter)* *(ms)*                        |  request time
req.count<br>**solr.requests** <br>*(long counter)* *(req)*                               |  request count
avg. request latency<br>**solr.requests.latency.avg** <br>*(double gauge)*                |  avg. request latency
request error count<br>**solr.requests.error.count** <br>*(long counter)*                 |  request error count
request timeout count<br>**solr.requests.timeout.count** <br>*(long counter)*             |  request timeout count
index max doc<br>**solr.index.docs.max** <br>*(long gauge)* *(docs)*                      |  max doc in the index
index num docs<br>**solr.index.docs** <br>*(long gauge)* *(docs)*                         |  number of docs in the index
index segments<br>**solr.index.segments** <br>*(long gauge)*                              |  index segments count
index num of files<br>**solr.index.files** <br>*(long gauge)*                             |  number of files in solr index
index size on the disk<br>**solr.index.files.size** <br>*(long gauge)* *(bytes)*          |  size of solr index on the disk
commits<br>**solr.indexing.commits** <br>*(long counter)*                                 |  total count of commits
optimizes<br>**solr.indexing.optimizes** <br>*(long counter)*                             |  count of optimizes
rollbacks<br>**solr.indexing.rollbacks** <br>*(long counter)*                             |  count of rollbacks
expunge deletes<br>**solr.indexing.deletes.expunge** <br>*(long counter)*                 |  count of expunge deletes
index docs added<br>**solr.indexing.docs.added** <br>*(long counter)* *(docs)*            |  added docs
deletes by id<br>**solr.indexing.deletes.id** <br>*(long counter)*                        |  deletes by id
deletes by query<br>**solr.indexing.deletes.query** <br>*(long counter)*                  |  deletes by query
update errors<br>**solr.indexing.errors** <br>*(long counter)*                            |  count of update errors
autocommits<br>**solr.indexing.commits.auto** <br>*(long counter)*                        |  count of auto commits
soft autocommits<br>**solr.indexing.commits.soft** <br>*(long counter)*                   |  count of soft auto commits
index docs pending<br>**solr.indexing.docs.pending** <br>*(long gauge)* *(docs)*          |  count of pending docs
autocommit max time<br>**solr.indexing.commits.auto.time.max** <br>*(long gauge)* *(ms)*  |  autocommit max time
