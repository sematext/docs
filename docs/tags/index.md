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

<video style="display:block; width:100%; height:auto;" controls>
  <source src="https://cdn.sematext.com/videos/groupbytags2.mp4" type="video/mp4" />
</video>

### Benefits of using Tags ###
Some benefits of using tags are:

#### Better organization ####
Tags provide a flexible way to organize logs and metrics into logical groups. This can be especially useful when dealing with large amounts of data, as it can help users to quickly and easily find the information they need. For example, a tag could be used to group logs from different components of an application or to group metrics by geographic region.

#### Easier filtering ####
Tags allow users to filter data based on specific criteria. For example, users can filter logs or metrics by tag to quickly see all the data associated with a particular component or service. This makes it easier to find and troubleshoot issues. Filtering by tag is also useful when [creating alerts](https://sematext.com/docs/alerts/), as users can set up alert rules based on specific tags.

#### Improved searchability ####
Tags provide additional context for logs and metrics, which makes them more searchable and discoverable. Users can search for logs or metrics based on tag values to find related data, even if the data is spread across multiple sources. This can be especially useful when investigating issues, as it can help users to quickly find all the relevant data in one place.

#### Customizable dashboards and reports ####
Tags can be used to create custom [dashboards](https://sematext.com/docs/dashboards/) and [reports](https://sematext.com/docs/dashboards/reports-and-components/) that display data specific to certain tags. For example, a dashboard could be created to display specific application metrics, making it easier to monitor and optimize performance. Dashboards can be [shared](https://sematext.com/docs/team/account-members/) with others, providing a consistent view of metrics across a team or organization.

In summary, tags provide a powerful way to organize, filter and search data. They can be used to provide additional context and metadata, making it easier to navigate and analyze large amounts of data.

### Common ways to use Tags ###
Here are some examples of the most common ways to use tags in a Kubernetes cluster:

#### Tag by Service Role ####
Service role tags can be used, for example, to group Kubernetes pods belonging to a specific service, such as "frontend" or "backend".

#### Tag by Team ####
These tags can be used to indicate which team is responsible for managing a particular Kubernetes resource. For example, a "devops" team may be responsible for managing deployments, while a "development" team may be responsible for managing services. 

#### Tag by Region ####
These tags can be used to indicate the geographical region in which a Kubernetes cluster is located. For example, a Kubernetes cluster may be located in a "US East" region or a "Europe" region.

#### Tag by Environment ####
These tags can be used to indicate the environment in which a Kubernetes resource is running, such as "development", "staging", or "production". This will ensure that resources are not accidentally modified in a production environment.

### Defining you own tags
It is not recommended to use the names from our [Common Schema](./common-schema) for your own [Custom Tags](./custom-tags). Read more about defining tags on the [Custom Tags](./custom-tags) page.

The Sematext Agent supports configuring custom tags. They can be specified in the Agent's configuration files.

Tags you define, and tags that are automatically configured in our [Agents](../agents), can be used to group and filter data in dashboards and reports. Take a look at the [Common Schema](./common-schema) to see all the tags we gather automatically.
