## Integration

- Instructions: [https://apps.sematext.com/ui/howto/SolrCloud/overview](https://apps.sematext.com/ui/howto/SolrCloud/overview)

## Metrics

Metric Name             |  Key                                  |  Metric Type  |  Numeric Type  |  Unit   |  Description
------------------------|---------------------------------------|---------------|----------------|---------|--------------------------------
autowarm count or %     |  solr.cache.autowarm.count            |  gauge        |  long          |         |  cache autowarm count or %
cache evictions         |  solr.cache.evicted                   |  counter      |  long          |         |  count of evictions
cache hits              |  solr.cache.hits                      |  counter      |  long          |         |  hits count
cache lookups           |  solr.cache.lookups                   |  counter      |  long          |         |  lookups count
cache size              |  solr.cache.size                      |  gauge        |  long          |         |  cache size (count of elements)
cache memory used       |  solr.cache.size.bytes                |  gauge        |  long          |  bytes  |  cache size in bytes
cache max size          |  solr.cache.size.max                  |  gauge        |  long          |         |  cache max size
index num docs          |  solr.index.docs                      |  gauge        |  long          |  docs   |  number of docs in the index
index max doc           |  solr.index.docs.max                  |  gauge        |  long          |  docs   |  max doc in the index
index num of files      |  solr.index.files                     |  gauge        |  long          |         |  number of files in solr index
index size on the disk  |  solr.index.files.size                |  gauge        |  long          |  bytes  |  size of solr index on the disk
index segments          |  solr.index.segments                  |  gauge        |  long          |         |  index segments count
commits                 |  solr.indexing.commits                |  counter      |  long          |         |  total count of commits
autocommits             |  solr.indexing.commits.auto           |  counter      |  long          |         |  count of auto commits
autocommit max time     |  solr.indexing.commits.auto.time.max  |  gauge        |  long          |  ms     |  autocommit max time
soft autocommits        |  solr.indexing.commits.soft           |  counter      |  long          |         |  count of soft auto commits
expunge deletes         |  solr.indexing.deletes.expunge        |  counter      |  long          |         |  count of expunge deletes
deletes by id           |  solr.indexing.deletes.id             |  counter      |  long          |         |  deletes by id
deletes by query        |  solr.indexing.deletes.query          |  counter      |  long          |         |  deletes by query
index docs added        |  solr.indexing.docs.added             |  counter      |  long          |  docs   |  added docs
index docs pending      |  solr.indexing.docs.pending           |  gauge        |  long          |  docs   |  count of pending docs
update errors           |  solr.indexing.errors                 |  counter      |  long          |         |  count of update errors
optimizes               |  solr.indexing.optimizes              |  counter      |  long          |         |  count of optimizes
rollbacks               |  solr.indexing.rollbacks              |  counter      |  long          |         |  count of rollbacks
req.count               |  solr.requests                        |  counter      |  long          |  req    |  request count
request error count     |  solr.requests.error.count            |  counter      |  long          |         |  request error count
request time            |  solr.requests.time                   |  counter      |  long          |  ms     |  request time
avg. request latency    |  solr.requests.latency.avg            |  gauge        |  double        |         |   avg. request latency
request timeout count   |  solr.requests.timeout.count          |  counter      |  long          |         |  request timeout count
warmup time             |  solr.warmup.time                     |  counter      |  long          |  ms     |  warmup time