title: AI Agent Watch
description: An overview of AI Agent Watch, Sematext's monitoring solution for AI agent activity running on your hosts

AI agents - coding assistants, autonomous scripts, agentic workflows - increasingly run directly on your infrastructure with real permissions: they execute shell commands, read and write files, and talk to external services on your behalf. AI Agent Watch gives you visibility into what those agents are actually doing on a host, so you can catch risky behavior - credential access, connections to unexpected destinations, PII leaving your systems - before it becomes an incident.

AI Agent Watch runs alongside your AI agent processes and reports on their activity: when a session starts and ends, which tools/commands it executes, which files it reads, writes, or renames, which hosts it connects to, and whether any outbound data matches a PII pattern you care about. Each event is automatically compared against your alert rules, given a priority and a risk score, and rolled up into an overall risk score for the session.

![Overview](/docs/images/aiam/overview.png)

## Why use it

- **See what your agents actually do.** Session start/end, shell/tool executions, file reads and writes, outbound connections - all captured as [structured events](captured-events.md).
- **Know when something looks wrong.** [Alert rules](alert-rules.md) match on event fields - event type, [trusted/untrusted](trusted-agents-hosts.md) status, destination, PII category, and more.
- **Catch sensitive data leaving your systems.** [PII categories](pii-categories.md) scan outbound payloads for things like credentials, API keys, and personal data, and flag matches as their own event type.
- **Separate agents and destinations you trust from ones you don't.** [Trusted agents and hosts](trusted-agents-hosts.md) let you tune alerting so a known, expected agent or destination doesn't trigger the same scrutiny as a brand-new one.
- **Get a single number for "how risky was this session."** Every event carries an [event risk score](risk-scores.md), and at the end of a session those scores are combined into a session risk score you can alert on directly.

## How it works

1. [Sematext Agent](/docs/agents/sematext-agent) running on the same host as your AI agent observes its process activity and sends events to Sematext Cloud.
2. The event is evaluated against your account's [alert rules](alert-rules.md). If one or more rules match, the event gets tagged with a priority (Info, Medium, High, or Critical) and a risk score; if a matching rule has notifications enabled, an alert is sent.
4. When the session ends, we combine the risk scores of everything that happened during the session into a single [session risk score](risk-scores.md#session-risk-score).
5. You review activity, sessions, and alerts in the AI Agent Watch.

![Explore](/docs/images/aiam/explore.png)

## Setting it up

AI Agent Watch can be enabled per [Infra App](/docs/monitoring/infrastructure/). See [Getting Started](getting-started.md) for enabling it on an App and connecting your first host.


**No AI Agents Detected Yet**

If you don't see any data right away after enabling AI Agent Watch, that's expected - [Sematext Agent](/docs/agents/sematext-agent) continuously discovers AI agents running on your infrastructure, but if none are installed on the monitored hosts yet, there's simply nothing yet to report.

Leaving AI Agent Watch enabled is still valuable in the meantime: it gives you continuous visibility into your environment and immediate awareness when new AI agents are introduced, whether intentionally or without authorization. Early detection helps identify potentially malicious, misconfigured, or high-risk AI agents before they become a security or compliance concern.

For the best coverage and strongest security posture, deploy Sematext Agent on as many hosts as possible. The broader your deployment, the greater the likelihood of discovering AI agents wherever they appear across your infrastructure.

## Coming soon

Two features are currently in development: **Governance & Enforcement**, which will let you actively block agent actions rather than just observe them, and **LLM Cost Tracking**, which will surface per-agent and per-session LLM spend. See [Cost Tracking & Governance](cost-tracking-governance.md) for details.

## In this section

- [Getting Started](getting-started.md) - enabling AI Agent Watch and connecting a host
- [Reports](reports.md) - the built-in reports and how filtering works across them
- [Captured Events](captured-events.md) - the event types AI Agent Watch records and what each one contains
- [Trusted Agents & Hosts](trusted-agents-hosts.md) - marking known agents and destinations as trusted
- [PII Categories](pii-categories.md) - detecting sensitive data in outbound traffic
- [Alert Rules](alert-rules.md) - defining what counts as risky and getting notified about it
- [Risk Scores & Priorities](risk-scores.md) - how event and session risk scores are calculated and used
- [Cost Tracking & Governance](cost-tracking-governance.md) - upcoming features: Governance & Enforcement and LLM Cost Tracking
