title: Sensei Monitoring Integration

## Integration

- Instructions: [https://apps.sematext.com/ui/howto/Sensei/overview](https://apps.sematext.com/ui/howto/Sensei/overview)

## Metrics

Metric Name | Key | Agg | Type | Description
--- | --- | --- | --- | ---
cache misses num | sensei.bobo.facet.cache.misses | Sum | Long | 
cache misses num | sensei.bobo.sort.cache.misses | Sum | Long | 
cache hits num | sensei.bobo.sort.float.cache.hits | Sum | Long | 
cache hits num | sensei.bobo.sort.cache.hits | Sum | Long | 
cache hits num | sensei.bobo.facet.cache.hits | Sum | Long | 
cache misses num | sensei.bobo.sort.float.cache.misses | Sum | Long | 
disk index size | sensei.zoie.disk.index.size.metric | Avg | Long | 
RamB index segments | sensei.zoie.ram.b.index.segments | Avg | Long | 
disk index segments | sensei.zoie.disk.index.segments | Avg | Long | 
disk free space | sensei.zoie.disk.free | Avg | Long | 
RamA index segments | sensei.zoie.ram.a.index.segments | Avg | Long | 
RamB index size | sensei.zoie.ram.b.index.size | Avg | Long | 
RamA index size | sensei.zoie.ram.a.index.size | Avg | Long | 
request time | sensei.shards.requests.time | Avg | Long | 
num. of requests | sensei.shards.requests | Sum | Long | 
average request processing time | sensei.norbert.requests.processing.time | Avg | Double | 
queue size | sensei.norbert.request.queued | Avg | Long | 
requests per second | sensei.norbert.requests.rate | Avg | Double | 
requests rejected | sensei.norbert.requests.rejected | Avg | Double | 
req. to unknown partition (empty) | sensei.brokers.requests.unknownpartition | Sum | Long | 
scatter time | sensei.brokers.requests.time.scatter | Avg | Long | 
gather time | sensei.brokers.requests.time.gather | Avg | Long | 
errors | sensei.brokers.errors | Sum | Long | 
total time | sensei.brokers.requests.time | Avg | Long | 
num. of requests | sensei.brokers.requests | Sum | Long | 
total search time | sensei.nodes.search.time.total | Avg | Long | 
get reader time | sensei.nodes.reader.get.time | Avg | Long | 
merge time | sensei.nodes.merge.time | Avg | Long | 
search time | sensei.nodes.search.time | Avg | Long | 
prune time | sensei.nodes.prune.time | Avg | Long | 
batch size | sensei.gateway.indexer.batches.size | Avg | Long | 
indexing events | sensei.gateway.indexing.events | Avg | Long | 
docs indexed | sensei.gateway.docs.indexed | Avg | Long | 
docs leftover | sensei.gateway.docs.leftover | Avg | Long | 
update batch size | sensei.gateway.indexer.batches.update.size | Avg | Long | 
flush time | sensei.gateway.fulshes.time | Avg | Long | 
manager indexer events | sensei.gateway.indexer.events | Avg | Long | 
