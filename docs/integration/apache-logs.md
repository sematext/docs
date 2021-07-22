title: Apache Logs Integration
description: Sematext Apache Logs integration allows you to troubleshoot connection, access, and other Apache issues.

To make use of the Sematext Apache Logs integration, you'll need to send Apache logs to your Sematext Logs App. The easiest way is via [Discovery](../logs/discovery/setup), which can parse Apache logs out of the box.

Once data is in, you can explore it via the built-in reports: 

<img
  class="content-modal-image"
  alt="Apache Logs Overview"
  src="../../images/logs/nginx-logpack-1.png"
  title="Apache Logs Overview"
/>

Be sure to check out the [Apache Monitoring integration](./apache.md) as well, to get a complete view on Apache. For example, if you see an increase in 4XX errors, monitoring can tell what's the impact on Apache's response times and CPU usage.

## Setting up Apache Log Shipping

All you need to do is use [Discovery](../logs/discovery/setup) to Set Up log shipping.

## Exploring logs

Once data is in, you can explore it using the built-in reports or create your own. For example, you can use the Users report to check on where the requests are coming from:

<img
  class="content-modal-image"
  alt="Apache Users Report"
  src="../../images/logs/nginx-logpack-2.png"
  title="Apache Users Report"
/>

Other built-in reports include:

- **Errors**: Logs specifically about errors. You can see which status codes are returned and which errors are logged by your Apache server.
- **HTTP**: Logs about Apache access logs. Use this report to view any and all data about HTTP requests and responses.
- **Sources**: Logs about Apache source files. You can view where the logs are collected from and from where in the world users are accessing your Apache server.

## Troubleshooting

If you have trouble sending logs, try out the latest version of [Sematext Agent](../agents/sematext-agent/installation/). Also, make sure Sematext Agent is configured to send logs to your Apache Logs App. If you're using Apache in a container, make sure to configure it to output logs to the stdout/stderr streams.
