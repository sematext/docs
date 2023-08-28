title: Varnish Cache Logs Integration
description: Sematext Varnish Cache Logs integration allows you to check response time, first byte served, along with traffic distribution across servers and requests made to the client and backend side.

To make use of the Sematext Varnish Cache Logs integration, you'll need to install the [Sematext Agent](../agents/sematext-agent/index.md) and configure it to ship Varnish Cache logs via the [Logs Discovery](../logs/discovery/intro.md). You will want to create or select an existing Varnish Cache Logs App because that is what will provide you with all the out of the box dashboards, some of which you can see below. Moreover, pre-configured anomaly alert rules are available to notify about increasing 4xx and 5xx response rates.

Once data is in, you can explore it via the built-in reports: 

<img
  class="content-modal-image"
  alt="Varnish Cache Logs Overview Report"
  src="../../images/integrations/varnishcache-logs-overview.png"
  title="Varnish Cache Logs Overview Report"
/>

## Exploring logs

Once data is in, you can explore it using the built-in reports or create your own. 

### Traffic Insight Report

You can use the Traffic Insight report to see top clients, referrers, average response time and time to serve first byte based on servers and "zoom in" to the ones you're interested in:

<img
  class="content-modal-image"
  alt="Varnish Cache Traffic Insight Report"
  src="../../images/integrations/varnishcache-traffic-insight.png"
  title="Varnish Cache Traffic Insight Report"
/>

### Traffic Distribution Report

You can use the Traffic Distribution report to see the traffic distribution across servers for resource planning by analyzing data volume and bytes served:

<img
  class="content-modal-image"
  alt="Varnish Cache Traffic Distribution Report"
  src="../../images/integrations/varnishcache-traffic-distribution.png"
  title="Varnish Cache Traffic Distribution Report"
/>

### Client Side Logs Report

You can use the Clustering report to see logs produced by components that have to do with cluster coordination. Cluster coordinator logs, logs related to a node joining/leaving a cluster and shard allocation:

<img
  class="content-modal-image"
  alt="Varnish Cache Client Side Logs Report"
  src="../../images/integrations/varnishcache-client-side-logs.png"
  title="Varnish Cache Client Side Logs Report"
/>

### Backend Side Logs Report

You can use the Deprecation report to see a breakdown of deprecation logs by node and component:

<img
  class="content-modal-image"
  alt="Varnish Cache Backend Side Logs Report"
  src="../../images/integrations/varnishcache-backend-side-logs.png"
  title="Varnish Cache Backend Side Logs Report"
/>

## Troubleshooting

If you have trouble sending logs, try out the latest version of [Sematext Agent](../agents/sematext-agent/installation/). Also, make sure Sematext Agent is configured to send logs to your OpenSearch Logs App. Last, check the [Log Agents panel](https://sematext.com/docs/fleet/#log-agents) for any errors, and refer to our [Sematext Logs FAQ](https://sematext.com/docs/logs/faq/) for useful tips.


