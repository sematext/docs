title: Embedded Agent Mode
description: Sematext embedded monitoring Java agent is started in the process of the application it monitors, and used to retrieve various devops metrics from Solr, HBase, Kafka, Cassandra, Elasticsearch and more

Unlike the [Standalone monitor](spm-monitor-standalone),
the Embedded Java agent-based monitor is started embedded in the
process of the application it monitors. To use the Embedded monitor do following steps:

  - Enable JMX for the application which will be monitored, if metrics
    are retrieved via JMX (e.g. Solr, HBase, Kafka, Cassandra, but not
    Elasticsearch)
  - Add Embedded monitor to the application's Java command-line
  - Restart the application

For information specific to your particular monitoring needs please go
to [Integrations](https://apps.sematext.com/ui/our-integrations) page in our centralized monitoring and logging devops solution.
