title: Getting Started with AI Agent Watch
description: How to enable AI Agent Watch on an App and start sending AI agent activity to Sematext Cloud

## Enabling AI Agent Watch

AI Agent Watch is enabled on a per-[Infra App](/docs/monitoring/infrastructure/) basis.

If you don't already have an Infra App, create one first. Then open the **AI Agent Watch** page, click **Enable**, and select the Infra App(s) for which you want to enable AI Agent Watch.

## Connect servers or workstations

Install or upgrade [Sematext Agent](/docs/agents/sematext-agent/) on each machine and configure it with the token for the selected Infra App. Workstations can run Linux, macOS, or Windows; choose the setup path by operating system. See [Platform Support](platform-support.md) for requirements and capability differences.

- **Linux servers and workstations:** Follow [Linux installation](/docs/agents/sematext-agent/linux-installation/). On supported hosts, Sematext Agent automatically discovers AI agents. Existing compatible installations need no additional AI-agent configuration; enable AI Agent Watch for their Infra App.
- **macOS and Windows:** Use Sematext Agent **4.7 or later**, then configure **Claude Code or Codex** to send telemetry and run hooks. Follow [macOS and Windows Setup](macos-windows.md), including its verification steps. Enabling the Infra App alone does not configure those coding agents.

For a company deployment, connect employees' machines to the organization's Infra Apps. Recognizable hostnames help you compare workstation agents in [cost reports](cost-tracking/reports.md).

![Infra Apps](/docs/images/aiam/pick-infra-apps.png)

Enabling it also seeds the account with a set of default [PII categories](pii-categories.md) and default [alert rules](alert-rules.md), and gives you access to the built-in [reports](reports.md) (Overview, Explore, Agent Sessions, PII Detections, Network Events, Tool Execution), so you get useful detections and dashboards out of the box instead of starting from an empty configuration. 


## Verifying data is flowing

After completing the setup, open the AI Agent Watch Overview screen for the App. You should see [captured events](captured-events.md) - starting with an `agent_session_started` event - within a few minutes.

![Overview](/docs/images/aiam/overview.png)

## No AI Agents Detected Yet

[Sematext Agent](/docs/agents/sematext-agent) continuously discovers AI agents on supported Linux hosts and automatically begins monitoring their activity. If none are running, no AI agent data will appear. On macOS and Windows, start a configured Claude Code or Codex session and use the [workstation verification steps](macos-windows.md#verify) to check telemetry and hooks.

This is expected—and valuable. Leaving Sematext Agent running provides continuous visibility into your environment and gives you immediate awareness when new AI agents are introduced, whether intentionally or without authorization. Early detection helps identify potentially malicious, misconfigured, or high-risk AI agents before they become a security or compliance concern.

For the best coverage and strongest security posture, deploy Sematext Agent on as many hosts as possible. The broader your deployment, the greater the likelihood of discovering AI agents wherever they appear across your infrastructure.


## Next steps

- Check [Platform Support](platform-support.md) for available capabilities
- Explore [Cost Tracking](cost-tracking/index.md) and configure [cost alerts](cost-alert-rules.md)
- Review the [captured events](captured-events.md) AI Agent Watch records
- Mark known agents and destinations as [trusted](trusted-agents-hosts.md) to tune alerting
- Review or customize the default [PII categories](pii-categories.md) and [alert rules](alert-rules.md)

- Review the default [governance policies](governance/policies.md) or create your own, define their conditions and scope, and enable them on [compatible hosts](governance/compatibility.md) to block the operations you want to restrict.
