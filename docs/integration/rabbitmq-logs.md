title: RabbitMQ Logs Integration
description: Sematext RabbitMQ Logs integration allows you to troubleshoot connection, access, and other RabbitMQ issues.

To make use of the Sematext RabbitMQ Logs integration, you'll need to install the Sematext Agent and configure it to ship RabbitMQ logs via the Logs Discovery. You will want to create or select an existing RabbitMQ Logs App because that is what will provide you with all the out of the box dashboards and alert rules, some of which you can see below.

Once data is in, you can explore it via the built-in reports: 

<img
  class="content-modal-image"
  alt="RabbitMQ Logs Overview"
  src="../../images/agents/rabbitmq_overview.png"
  title="RabbitMQ Logs Overview"
/>

Be sure to check out the [RabbitMQ Monitoring integration](./rabbitmq.md) as well, to get a complete view on RabbitMQ. For example, if you see an increase in authentication errors, monitoring can tell what's the impact on RabbitMQ's memory usage, garbage collection and CPU.

## Exploring logs

Once data is in, you can explore it using the built-in reports or create your own. For example, you can use the Authentication report to check on granted and denied connections:

<img
  class="content-modal-image"
  alt="RabbitMQ Authentication Report"
  src="../../images/agents/rabbitmq_auth.png"
  title="RabbitMQ Authentication Report"
/>

Other built-in reports include:

- **Connections**: Logs specifically about accepted and closed connections. You can see here when you have spikes in connection creation. You can also identify noisy sources, users, as well as popular destinations.
- **Start & Stop**: Logs about RabbitMQ startup and shutdown. Besides unexpected restarts, you can find info about which write-ahead logs (WALs) were recovered.

## Troubleshooting

If you are having trouble sending logs, try out the latest version of the [Sematext Agent](../agents/sematext-agent/installation/). Additionally, make sure to check out the [Log Agents panel](https://sematext.com/docs/fleet/#log-agents) for any errors, and refer to our [Sematext Logs FAQ](https://sematext.com/docs/logs/faq/) for useful tips.
