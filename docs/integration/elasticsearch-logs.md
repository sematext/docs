title: Elasticsearch Logs Integration
description: Sematext Elasticsearch Logs integration allows you to check query distribution, analyze errors, deprecations and master logs and much more.

To make use of the Sematext Elasticsearch Logs integration, you'll need to install the [Sematext Agent](../agents/sematext-agent/index.md) and configure it to ship Elasticsearch logs via the [Logs Discovery](../logs/discovery/intro.md). You will want to create or select an existing Elasticsearch Logs App because that is what will provide you with all the out of the box dashboards, some of which you can see below.

Once data is in, you can explore it via the built-in reports: 

<img
  class="content-modal-image"
  alt="Elasticsearch Logs Overview Report"
  src="../../images/agents/elasticsearch_logs_overview.png"
  title="Elasticsearch Logs Overview Report"
/>

Be sure to check out the [Elasticsearch Monitoring integration](./elasticsearch.md) as well, to get a complete view on Elasticsearch. For example, if you see logs of a node restarting, metrics let you see the impact on the rest of the cluster in terms of CPU, GC, and other metrics. Including query time metrics, even if you don't collect slowlogs from [all] queries.

## Exploring logs

Once data is in, you can explore it using the built-in reports or create your own. For example, you can use the Queries report to see a breakdown of your queries and "zoom in" to the ones you're interested in:

<img
  class="content-modal-image"
  alt="Elasticsearch Queries Report"
  src="../../images/agents/elasticsearch_logs_queries.png"
  title="Elasticsearch Queries Report"
/>

Other built-in reports include:

- **Errors**: breakdown of what's wrong: which nodes or components generate errors
- **Clustering**: logs produced by components that have to do with cluster coordination: master logs, logs related to a node joining/leaving a cluster and shard allocation
- **Deprecation**: breakdown of deprecation logs by node and coomponent
- **Start & Stop**: startup-related and shutdown-related logs. Look here if a node went down unexpectedly or doesn't show up in the cluster when started

## Troubleshooting

If you have trouble sending logs, try out the latest version of [Sematext Agent](../agents/sematext-agent/installation/). Also, make sure Sematext Agent is configured to send logs to your Elasticsearch Logs App. Last, check the [Log Agents panel](https://sematext.com/docs/fleet/#log-agents) for any errors, and refer to our [Sematext Logs FAQ](https://sematext.com/docs/logs/faq/) for useful tips.

