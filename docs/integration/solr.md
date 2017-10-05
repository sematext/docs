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