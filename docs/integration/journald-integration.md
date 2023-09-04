title: Journald Logs Integration
description: Sematext Linux Logs integration allows you to send systemd's journald logs to Sematext.

You can send Linux journal logs to Sematext by installing the [Sematext Agent](../agents/sematext-agent/index.md) and configuring it to ship Journald logs via the [Logs Discovery](../logs/discovery/intro.md). 

<img class="content-modal-image" alt="Journald Logs Discovery" src="../../images/integrations/journald-logs-disco.png" title="Journald Logs Discovery">

You will want to create or select an existing Logs App because that is what will provide you with all the out of the box dashboards.

<img class="content-modal-image" alt="Journald Logs Discovery Flyout" src="../../images/integrations/journald-log-disco-flyout.png" title="Journald Logs Discovery Flyout">

## Exploring logs

Once data is in, you can explore it using the built-in reports or create your own. For example, you can use the Generic Logs App explore SSH logs:

<img class="content-modal-image" alt="Journald Logs Explore" src="../../images/integrations/journald-log-explore.png" title="Journald Logs Explore">

## Troubleshooting

If you have trouble sending logs, try out the latest version of [Sematext Agent](../agents/sematext-agent/installation/). Also, make sure Sematext Agent is configured to send logs to your Logs App. Last, check the [Log Agents panel](https://sematext.com/docs/fleet/#log-agents) for any errors, and refer to our [Sematext Logs FAQ](https://sematext.com/docs/logs/faq/) for useful tips.


