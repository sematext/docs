title: PostgreSQL Logs Integration
description: Sematext PostgreSQL Logs integration allows you to dive deeper into statement duration breakdown, as well as users accessing the databases

To make use of the Sematext PostgreSQL Logs integration, you'll need to install the Sematext Agent and configure it to ship PostgreSQL logs via the [Logs Discovery](https://sematext.com/docs/logs/discovery/intro/). You will want to create or select an existing PostgreSQL Logs App because that is what will provide you with all the out of the box dashboards and alert rules, some of which you can see below.

Once data is in, you can explore it via the built-in reports: 

<img
  class="content-modal-image"
  alt="PostgreSQL Logs Overview"
  src="../../images/agents/postgresql_overview.png"
  title="PostgreSQL Logs Overview"
/>

Be sure to check out the [PostgreSQL Monitoring integration](./postgresql.md) as well, to get a complete view on PostgreSQL. For example, if you notice expensive queries in the logs, monitoring can tell you whether they hit the indices or they were mostly scans.

## Exploring logs

Once data is in, you can explore it using the built-in reports or create your own. For example, you can use the Statement Duration report to check on your queries:

<img
  class="content-modal-image"
  alt="PostgreSQL Statement Duration Report"
  src="../../images/agents/postgresql_statement.png"
  title="PostgreSQL Statement Duration Report"
/>

## Troubleshooting

If you are having trouble sending logs, try out the latest version of the [Sematext Agent](../agents/sematext-agent/installation/). Additionally, make sure to check out the [Log Agents panel](https://sematext.com/docs/fleet/#log-agents) for any errors, and refer to our [Sematext Logs FAQ](https://sematext.com/docs/logs/faq/) for useful tips.
