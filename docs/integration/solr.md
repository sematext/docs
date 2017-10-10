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

## Metrics

### Report: Request Rate & Latency

#### Chart: Req. Rate
Metric Name | Metric Description
--- | ---
req. count | 
req. count | 
req. rate | 

#### Chart: Req. Latency
Metric Name | Metric Description
--- | ---
perc. latency | 
avg. latency | 



### Report: Solr Components

#### Chart: Solr Components Times (Avg)
Metric Name | Metric Description
--- | ---
avg. time | 



### Report: Warmup

#### Chart: Warmup Times
Metric Name | Metric Description
--- | ---
warmup time | 



### Report: Error

#### Chart: Errors Count
Metric Name | Metric Description
--- | ---
error count | 



### Report: Indexing

#### Chart: Other Events
Metric Name | Metric Description
--- | ---
update errors | 
expunge deletes | 
optimizes | 
rollbacks | 

#### Chart: Added Docs
Metric Name | Metric Description
--- | ---
added docs | 
added docs rate | 
docs pending | 

#### Chart: Commit Events
Metric Name | Metric Description
--- | ---
commits | 
autocommits | 
soft commits | 
autocommit max time | 

#### Chart: Deletes
Metric Name | Metric Description
--- | ---
deletes by id | 
deletes by query | 



### Report: Cache

#### Chart: Per Segment Filter Cache
Metric Name | Metric Description
--- | ---
autowarm count or % | 
evictions | 
hits % | 
hits | 
lookups | 
max. size | 
size | 

#### Chart: Document Cache
Metric Name | Metric Description
--- | ---
autowarm count or % | 
evictions | 
hits % | 
hits | 
lookups | 
max. size | 
size | 

#### Chart: Query Result Cache
Metric Name | Metric Description
--- | ---
autowarm count or % | 
evictions | 
hits % | 
hits | 
lookups | 
max.size | 
size | 

#### Chart: Filter Cache
Metric Name | Metric Description
--- | ---
autowarm count or % | 
evictions | 
hits % | 
hits | 
lookups | 
max. size | 
size | 



### Report: Index

#### Chart: Solr Index Stats
Metric Name | Metric Description
--- | ---
max doc | 
num docs | 
segments | 
deleted docs | 

#### Chart: File System Stats
Metric Name | Metric Description
--- | ---
num of files | 
size on the disk | 


