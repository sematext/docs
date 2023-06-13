title: OpenSearch Logs Integration
description: Sematext OpenSearch Logs integration allows you to check query distribution, analyze errors, deprecations and cluster manager logs and much more.

To make use of the Sematext OpenSearch Logs integration, you'll need to install the [Sematext Agent](../agents/sematext-agent/index.md) and configure it to ship OpenSearch logs via the [Logs Discovery](../logs/discovery/intro.md). You will want to create or select an existing OpenSearch Logs App because that is what will provide you with all the out of the box dashboards, some of which you can see below.

Once data is in, you can explore it via the built-in reports: 

<img
  class="content-modal-image"
  alt="OpenSearch Logs Overview Report"
  src="../../images/agents/opensearch-logs-overview.png"
  title="OpenSearch Logs Overview Report"
/>

Be sure to check out the [OpenSearch Monitoring integration](./opensearch.md) as well, to get a complete view on OpenSearch. For example, if you see logs of a node restarting, metrics let you see the impact on the rest of the cluster in terms of CPU, GC, and other metrics. Including query time metrics, even if you don't collect slowlogs from [all] queries.

## Exploring logs

Once data is in, you can explore it using the built-in reports or create your own. For example, you can use the Errors report to see breakdown of what's wrong, for example, which nodes or components generate errors:

<img
  class="content-modal-image"
  alt="OpenSearch Errors Report"
  src="../../images/agents/opensearch-logs-errors.png"
  title="OpenSearch Errors Report"
/>

Other built-in reports include:

- **Queries**: breakdown of your queries
- **Clustering**: logs produced by components that have to do with cluster coordination: cluster coordinator logs, logs related to a node joining/leaving a cluster and shard allocation
- **Deprecation**: breakdown of deprecation logs by node and component
- **Start & Stop**: startup-related and shutdown-related logs. Look here if a node went down unexpectedly or doesn't show up in the cluster when started

## Troubleshooting

If you have trouble sending logs, try out the latest version of [Sematext Agent](../agents/sematext-agent/installation/). Also, make sure Sematext Agent is configured to send logs to your OpenSearch Logs App. Last, check the [Log Agents panel](https://sematext.com/docs/fleet/#log-agents) for any errors, and refer to our [Sematext Logs FAQ](https://sematext.com/docs/logs/faq/) for useful tips.

