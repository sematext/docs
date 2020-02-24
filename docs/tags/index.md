title: Getting Started with Tags 
description: A Tag is an attribute of a data point (or metric) that could be used for grouping and filtering.

Tags are a way of adding dimensions to metrics, so they can be filtered, aggregated, grouped, and compared in Sematext Cloud. Using tags enables you to observe and aggregate performance across a number of hosts and narrow the set further based on specific elements. 

Tagging binds different data types in Sematext Cloud, allowing for correlation, data pivoting, and creating actionable metrics and logs. This is accomplished with reserved tags that you can find in our [Common Schema](./common-schema). Here are some examples:

| Solution | Tag Name  | Allows for...
|:--|:--|:--
| Logs
| | host | Correlation and filtering by hostname across all logs
| | source | Correlation and filtering by source across all logs, this could be a file name or even a full path to a filename, or the name of the application or process
| | severity | Correlation and filtering by the log level, such as *error* or *info*, across all logs
| Monitoring
| | os.host | Segregation, aggregation and filtering of metrics, processes, and inventories across hosts
| | service.* | Segregation, aggregation and filtering of metrics, processes, and inventories based on the services and where the data is coming from
| | process.*  | Segregation, aggregation and filtering of processes
| | container.*  | Segregation, aggregation and filtering of container metrics
| | kubernetes.*  | Segregation, aggregation and filtering of kubernetes metrics

### Why Tags matter?
An example is when you look at containers, cloud infrastructure, or Kubernetes clusters. It is more useful to look at the CPU usage across a collection of hosts that belong to a service or cluster, rather than looking at the CPU usage for the hosts separately.

For example, tags like `env:prod` can be configured on all production servers and `env:dev` on all development servers.

Containers, Kubernetes clusters and cloud environments regularly start and terminate hosts, so it is critical to tag them to allow for aggregation of the metrics you’re getting. Alongside our full-text search, tagging is a powerful tool to make your life easier.

<video style="display:block; width:100%; height:auto;" controls autoplay loop>
  <source src="https://cdn.sematext.com/videos/groupbytags2.mp4" type="video/mp4" />
</video>

### Defining you own tags
It is not recommended to use the names from our [Common Schema](./common-schema) for your own [Custom Tags](./custom-tags). Read more about defining tags on the [Custom Tags](./custom-tags) page.

The Sematext Agent supports configuring custom tags. They can be specified in the Agent's configuration files.

Tags you define, and tags that are automatically configured in our [Agents](../agents), can be used to group and filter data in dashboards and reports. Take a look at the [Common Schema](./common-schema) to see all the tags we gather automatically.
