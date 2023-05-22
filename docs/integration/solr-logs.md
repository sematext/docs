title: Solr Logs Integration
description: Sematext Solr Logs integration allows you to check query distribution, analyze errors, Zookeeper and Overseer logs and much more.

To make use of the Sematext Solr Logs integration, you'll need to install the Sematext Agent and configure it to ship Solr logs via the Logs Discovery. You will want to create or select an existing Solr Logs App because that is what will provide you with all the out of the box dashboards, some of which you can see below.

Once data is in, you can explore it via the built-in reports: 

<img
  class="content-modal-image"
  alt="Solr Logs Overview"
  src="../../images/agents/solr_logs_overview.png"
  title="Solr Logs Overview"
/>

Be sure to check out the [Solr Monitoring integration](./solr.md) as well, to get a complete view on Solr. For example, if you see logs of a node restarting, metrics let you see the impact on the rest of the cluster in terms of CPU, GC, and other metrics. Including query time metrics, even if you don't collect logs from [all] queries.

## Exploring logs

Once data is in, you can explore it using the built-in reports or create your own. For example, you can use the Queries report to see a breakdown of your queries and "zoom in" to the ones you're interested in:

<img
  class="content-modal-image"
  alt="Solr Queries Report"
  src="../../images/agents/solr_logs_hits.png"
  title="Solr Queries Report"
/>

Other built-in reports include:

- **Errors**: breakdown of what's wrong: which nodes/classes/collections/etc generate errors
- **Zookeeper**: logs produced by Solr's [Zookeeper](https://zookeeper.apache.org) client and other Zookeeper-related classes and threads. Look here for insights on SolrCloud's stability. For the Zookeeper ensemble itself, check out our [Zookeeper monitoring integration](./zookeeper.md)
- **Overseer**: logs produced by SolrCloud's [Overseer](https://lucene.apache.org/solr/8_6_0/solr-core/org/apache/solr/cloud/Overseer.html) thread and other Overseer activities (e.g. shard leader election)
- **Start & Stop**: startup-related and shutdown-related logs. Look here if a node went down unexpectedly or doesn't show up in the cluster when started
