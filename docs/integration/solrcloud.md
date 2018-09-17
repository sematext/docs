title: SolrCloud Monitoring Integration
description:  Our monitoring and logging platform includes integration for SolrCloud. Use predefined key metrics reports combined with rich data visualization tools to monitor critical issues on your Solr machines cluster, and receive alerts on memory usage, uptime, load averages, index stats, document and filter caches, latency, rate, and more

## Integration

- Instructions: [https://apps.sematext.com/ui/howto/SolrCloud/overview](https://apps.sematext.com/ui/howto/SolrCloud/overview)

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
