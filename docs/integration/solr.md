## Solr Monitoring

### How do I enable JMX in Solr

Add or uncomment the **<jmx/\>** directive in solrconfig.xml and
restart Solr.  See <https://wiki.apache.org/solr/SolrJmx> for more
info.

### I am using SPM for Solr and I don't see any data on Solr and JVM reports, what is the problem

You should probably enable JMX in your Solr. Add or uncomment
the **<jmx /\>** directive in **solrconfig.xml** and restart Solr.
 See <https://wiki.apache.org/solr/SolrJmx> for more
info.

### I am using SPM for Solr and I don't see any data only in Solr Components or Errors reports, what should I do

Most likely you are using standalone variant of Solr monitor. In
that case, SPM monitor can't collect metrics which are available only
when running in-process. If so, switch to in-process (javaagent) version
of SPM
monitor.

## Integration

- Instructions: [https://apps.sematext.com/ui/howto/Solr/overview](https://apps.sematext.com/ui/howto/Solr/overview)

## Metrics

Metric Name | Key | Agg | Type | Description
--- | --- | --- | --- | ---
req. count | solr.request.count | Sum | Long | 
warmup time | solr.warmup.time | Max | Long | 
error count | solr.error.count | Count | Metric | 
autocommits | solr.indexing.commits.auto | Sum | Long | 
commits | solr.indexing.commits | Sum | Long | 
update errors | solr.indexing.errors | Sum | Long | 
deletes by id | solr.indexing.deletes.id | Sum | Long | 
added docs | solr.indexing.docs.added | Sum | Long | 
optimizes | solr.indexing.optimizes | Sum | Long | 
deletes by query | solr.indexing.deletes.query | Sum | Long | 
rollbacks | solr.indexing.rollbacks | Sum | Long | 
expunge deletes | solr.indexing.deletes.expunge | Sum | Long | 
docs pending | solr.indexing.docs.pending | Avg | Long | 
soft commits | solr.indexing.commits.soft | Sum | Long | 
autocommit max time | solr.indexing.commits.auto.time.max | Max | Long | 
lookups | solr.cache.segment.lookups | Sum | Long | 
evictions | solr.cache.segment.evicted | Sum | Long | 
autowarm count or % | solr.cache.segment.autowarm.count | Max | Long | 
size | solr.cache.segment.size | Max | Long | 
max. size | solr.cache.segment.size.max | Max | Long | 
hits | solr.cache.segment.hits | Sum | Long | 
max doc | solr.index.docs.max | Max | Long | 
num docs | solr.index.docs | Max | Long | 
num of files | solr.index.files | Max | Long | 
size on the disk | solr.index.files.size | Max | Long | 
segments | solr.index.segments | Max | Long | 