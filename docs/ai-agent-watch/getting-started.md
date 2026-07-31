title: Getting Started with AI Agent Watch
description: How to enable AI Agent Watch on an App and start sending AI agent activity to Sematext Cloud

## Enabling AI Agent Watch

AI Agent Watch is enabled on a per-[Infra App](/docs/monitoring/infrastructure/) basis.

If you don't already have an Infra App, create one first. Then open the **AI Agent Watch** page, click **Enable**, and select the Infra App(s) for which you want to enable AI Agent Watch.

Once enabled, AI Agent Watch will start collecting AI agent events from all hosts that are already sending infrastructure data to the selected Infra App(s).

If you already have one or more Infra Apps receiving infrastructure data from multiple hosts, no additional installation is required. Simply enable AI Agent Watch for the desired Infra App(s) from the UI, and AI agent events will begin flowing automatically from all connected hosts.

![Infra Apps](/docs/images/aiam/pick-infra-apps.png)

Enabling it also seeds the account with a set of default [PII categories](pii-categories.md) and default [alert rules](alert-rules.md), and gives you access to the built-in [reports](reports.md) (Overview, Explore, Agent Sessions, PII Detections, Network Events, Tool Execution), so you get useful detections and dashboards out of the box instead of starting from an empty configuration. 


## Verifying data is flowing

After connecting a host, open the AI Agent Watch Overview screen for the App. You should see [captured events](captured-events.md) - starting with an `agent_session_started` event - within a few minutes.

![Overview](/docs/images/aiam/overview.png)

**No AI Agents Detected Yet**

[Sematext Agent](/docs/agents/sematext-agent) continuously discovers AI agents running on your infrastructure and automatically begins monitoring their activity. If no AI agents are currently installed on the monitored hosts, no AI agent data will appear.

This is expected—and valuable. Leaving Sematext Agent running provides continuous visibility into your environment and gives you immediate awareness when new AI agents are introduced, whether intentionally or without authorization. Early detection helps identify potentially malicious, misconfigured, or high-risk AI agents before they become a security or compliance concern.

For the best coverage and strongest security posture, deploy Sematext Agent on as many hosts as possible. The broader your deployment, the greater the likelihood of discovering AI agents wherever they appear across your infrastructure.


## Next steps

- Review the [captured events](captured-events.md) AI Agent Watch records
- Mark known agents and destinations as [trusted](trusted-agents-hosts.md) to tune alerting
- Review or customize the default [PII categories](pii-categories.md) and [alert rules](alert-rules.md)
