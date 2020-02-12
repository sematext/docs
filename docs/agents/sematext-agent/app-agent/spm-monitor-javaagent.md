title: Embedded Agent Mode
description: Sematext embedded monitoring App Agent is started in the process of the application it monitors, and used to retrieve various devops metrics from Solr, HBase, Kafka, Cassandra, Elasticsearch and more

Unlike the [Standalone monitor](spm-monitor-standalone),
the Embedded App Agent is started embedded in the
process of the application it monitors. To use the Embedded App Agent follow these steps:

  - Enable JMX for the application which will be monitored, if metrics
    are retrieved via JMX (e.g. Solr, HBase, Kafka, Cassandra, but not
    Elasticsearch)
  - Add Embedded App Agent to the application's Java command-line
  - Restart the application

For information specific to your particular monitoring needs please go
to [Integrations](https://apps.sematext.com/ui/our-integrations) page in our centralized monitoring and logging devops solution.
