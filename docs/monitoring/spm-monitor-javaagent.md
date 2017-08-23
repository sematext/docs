## Introduction

Unlike the [Standalone monitor](spm-monitor-standalone),
the Embedded, Javaagent-based monitor, is started embedded in the
process of the application it monitors.  To use the Embedded monitor one
typically has to do the following:

 

  - Enable JMX for the application which will be monitored, if metrics
    are retrieved via JMX (e.g. Solr, HBase, Kafka, Cassandra, but not
    Elasticsearch)
  - Add Embedded monitor to the application's Java command-line
  - Restart the application

 

For information specific to your particular application please go
to <https://apps.sematext.com/ui/our-integrations> where you can
select you application and see the exact and simple instructions to
follow.

 

