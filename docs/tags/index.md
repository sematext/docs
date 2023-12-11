title: Getting Started with Tags 
description: A Tag is an attribute of a data point (or metric) that could be used for grouping and filtering.

Tags are a way of adding dimensions to observability data (e.g. metrics), so they can be filtered, aggregated, grouped, and compared in Sematext Cloud. Using tags enables you to observe and aggregate performance across a number of hosts and narrow the set further based on specific elements. 

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

### Why Tags matter
Today's infrastructure is dynamic.  For example, containers, cloud instances, or Kubernetes pods are not static.  They come and go.  They get moved from one host to another. It is thus much more useful to look at observability data (e.g. CPU usage) for a collection of hosts, containers, pods, or services that are all tagged with a common tag or set of tags than it would be to look at the CPU usage while filtering or grouping data based on specific host names.  What happens when you deploy an additional host that runs the service you are monitoring?  Any filters or grouping that is referencing specific hosts would miss this new host.  But if your filters and groupings use tags, then as long as you tag the new host correctly, it will automatically be included in your charts, dashboards, alert rules, etc.

For example, tags like `env:prod` can be configured on all production servers and `env:dev` on all development servers.

Containers, Kubernetes clusters and cloud environments regularly start, stop, and move containers and pods, so it is critical to tag them in order to be able to group and filter their data regardless which host they are currently running on.

<video style="display:block; width:100%; height:auto;" controls>
  <source src="https://cdn.sematext.com/videos/groupbytags2.mp4" type="video/mp4" />
</video>

### Benefits of using Tags ###

#### Better organization ####
Tags provide a flexible way to organize logs and metrics into logical groups. This can be especially useful when dealing with large amounts of data, as it can help users to quickly and easily find the information they need. For example, a tag could be used to group logs from different components of an application or to group metrics by geographic region.

#### Easier filtering ####
Tags allow users to filter data based on specific criteria. For example, users can filter logs or metrics by tag to quickly see all the data associated with a particular component or service. This makes it easier to find and troubleshoot issues. Filtering by tag is also useful when [creating alerts](https://sematext.com/docs/alerts/), as users can set up alert rules based on specific tags.

#### Improved searchability ####
Tags provide additional context for logs and metrics, which makes them more searchable and discoverable. Users can search for logs or metrics based on tag values to find related data, even if the data is spread across multiple sources. This can be especially useful when investigating issues, as it can help users to quickly find all the relevant data in one place.

#### Customizable dashboards and reports ####
Tags can be used to create custom [Dashboards](https://sematext.com/docs/dashboards/) and [Reports](https://sematext.com/docs/dashboards/reports-and-components/) that display data specific to certain tags. For example, a dashboard could be created to display specific application metrics, making it easier to monitor and optimize performance. Dashboards can be [shared](https://sematext.com/docs/team/account-members/) with others, providing a consistent view of metrics across a team or organization.

In summary, tags provide a powerful way to organize, filter and search data. They can be used to provide additional context and metadata, making it easier to navigate and analyze large amounts of data.

### Common ways to use Tags ###
You can efficiently organize and analyze all your data and set up alerts based on tags.
Tags are in `key:value` format, specified in [agent configuration files](https://sematext.com/docs/tags/custom-tags/). You can set tags to distinguish and organize data shipped from different hosts and containers based on your needs.
After you tag your services, you can create [Saved Views](https://sematext.com/docs/guide/saved-views/) or [Dashboards](https://sematext.com/docs/dashboards/) based on tags, and isolate them for more comprehensive analysis.

Here are some examples of the most common ways to use tags:

#### Tag by Service Role ####
Example tags: <br>
`service: payment` <br>
`service: billing` <br>
`service: employment` <br>

By tagging all services running payment transactions with `service:payment` you can categorize each service with their business role. The same applies for billing, employment transactions, and so on. You can later create [Saved Views](https://sematext.com/docs/guide/saved-views/) or [Dashboards](https://sematext.com/docs/dashboards/) to aggregate and analyze all running services, particularly payment transactions. Isolate them for a more comprehensive analysis.

#### Tag by Team ####
Example tags: <br>
`team: backend` <br>
`team: frontend` <br>

If you have many teams in your organization and each team is responsible for tracking a wide range of monitors and services, you can use tags to set which teams own that service. You can [create alerts](https://sematext.com/docs/alerts/) based on team tags and benefit from [Slack Notification Hook](https://sematext.com/docs/integration/alerts-slack-integration/) to send the alerts to a specific team channel.

#### Tag by Region ####
Example tags: <br>
`region: eu` <br>
`region: us` <br>

Production servers are usually deployed across several regions to have more stable and high availability systems. You can tag each service by region and [create alerts](https://sematext.com/docs/alerts/) or have separate [Views](https://sematext.com/docs/guide/saved-views/) and [Dashboards](https://sematext.com/docs/dashboards/) for each region. 

#### Tag by Environment ####
Example tags: <br>
`env: production` <br>
`env: staging`<br>
`env: development` <br>

These tags can be used to indicate the environment in which a your services are running, such as `development`, `staging`, or `production`. This helps you distinguish between what is running in the production environment and the need to take immediate action when there is an outage.

### Defining you own tags
It is not recommended to use the names from our [Common Schema](./common-schema) for your own [Custom Tags](./custom-tags). Read more about defining tags on the [Custom Tags](./custom-tags) page.

The Sematext Agent supports configuring custom tags. They can be specified in the Agent's configuration files.

Tags you define, and tags that are automatically configured in our [Agents](../agents), can be used to group and filter data in dashboards and reports. Take a look at the [Common Schema](./common-schema) to see all the tags we gather automatically.
