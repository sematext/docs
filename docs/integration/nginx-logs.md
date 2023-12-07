title: Nginx Logs Integration
description: Sematext Nginx Logs integration allows you to troubleshoot connection, access, and other Nginx issues.

To make use of the Sematext Nginx Logs integration, you'll need to send Nginx logs to your Sematext Logs App. The easiest way is via [Discovery](../logs/discovery/setup), which can parse Nginx logs out of the box.

Once data is in, you can explore it via the built-in reports: 

<img
  class="content-modal-image"
  alt="Nginx Logs Overview"
  src="../../images/logs/nginx-logpack.png"
  title="Nginx Logs Overview"
/>

Be sure to check out the [Nginx Monitoring integration](./nginx.md) as well, to get a complete view on Nginx. For example, if you see an increase in 4XX errors, monitoring can tell what's the impact on Nginx's response times and CPU usage.

## Setting up Nginx Log Shipping

All you need to do is use [Discovery](../logs/discovery/setup) to Set Up log shipping.

## Exploring logs

Once data is in, you can explore it using the built-in reports or create your own. For example, you can use the Users report to check on where the requests are coming from:

<img
  class="content-modal-image"
  alt="Nginx Users Report"
  src="../../images/logs/nginx-logpack-2.png"
  title="Nginx Users Report"
/>

Other built-in reports include:

- **Errors**: Logs specifically about errors. You can see which status codes are returned and which errors are logged by your Nginx server.
- **HTTP**: Logs about Nginx access logs. Use this report to view any and all data about HTTP requests and responses.
- **Sources**: Logs about Nginx source files. You can view where the logs are collected from and from where in the world users are accessing your Nginx server.

## Troubleshooting

If you have trouble sending logs, try out the latest version of [Sematext Agent](../agents/sematext-agent/installation/). Also, make sure Sematext Agent is configured to send logs to your Nginx Logs App. If you're using Nginx in a container, make sure to configure it to output logs to the stdout/stderr streams. Last, check the [Log Agents panel](https://sematext.com/docs/fleet/#log-agents) for any errors, and refer to our [Sematext Logs FAQ](https://sematext.com/docs/logs/faq/) for useful tips.

