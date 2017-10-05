
## HBase Monitoring

### How do I enable JMX in HBase

Please see [HBase Metrics](http://hbase.apache.org/metrics.html)
page for
instructions.

### Do I need to add a separate SPM Application for each HBase server/node I want to monitor

No, one Application is enough. Think of an SPM "Application" as a
"HBase Cluster". Thus, to monitor N HBase servers that belong to the
same cluster you would create just a single SPM Application and use its
Token in SPM configuration file on all HBase servers that are a part of
this cluster.

### Why don't some HBase metrics graphs have any data

There could be 2 possible reasons:

1.  Some metrics are for RegionServers (HBase slaves), some for HBase
    Master. Thus, if you select the Master node in the UI, graphs that
    contain Slave-specific metrics will be blank and vice-versa.
2.  Different versions of HBase provide different metrics. Thus, if you
    have an older version of HBase, it may not be providing all metrics
    that SPM collects and graphs.

### Which versions of HBase does SPM support

SPM has been tested with HBase 0.90, 0.92, 0.94, and 0.98, but
will work for newer versions, including all CDH
versions.
