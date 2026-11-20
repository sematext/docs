title: LLM Cost Tracking
description: Understand AI agent token usage and calculated costs across servers and employee workstations

LLM Cost Tracking shows which AI agents, sessions, models, and hosts drive your organization's AI spending.

## Start collecting usage

1. [Enable AI Agent Watch](../getting-started.md).
2. On macOS and Windows, complete [Claude Code or Codex setup](../macos-windows.md).
3. Start an AI-agent session that makes a model request. In **Explore**, look for `llm_usage` events for that agent and host.
4. Open **AI Agent Watch → LLM Costs** to compare agents, models, and sessions. Use **Cost by Infrastructure** to locate spending by host, namespace, or cluster.

## How costs are calculated

Each `llm_usage` event carries the available model, provider, and token counts. Sematext calculates the call's cost using the model's default pricing rates, which you can override to reflect negotiated rates or discounts agreed with your provider. At session end, captured call costs are summed into a session total.

Input, output, cache reads, and cache writes can have different rates. Reasoning tokens are included in output tokens. See [Pricing and Calculations](pricing.md) for rate selection, overrides, and missing costs.

Costs are estimates; reported token counts are exact. Linux uses the service tier reported in each LLM usage event, while macOS and Windows use standard API rates when no service tier is reported. See [Understanding estimated costs](pricing.md#understanding-estimated-costs) for details.

If you have a fixed monthly subscription or use reserved or scale tiers, token reports still help you compare consumption across agents, models, machines, and sessions. Calculated costs do not allocate a subscription fee, and usage explicitly reported as reserved or scale is left unpriced. See [Subscriptions, reserved capacity, and scale tiers](pricing.md#subscriptions-reserved-capacity-and-scale-tiers) for how to interpret these reports and respond to pricing alerts.

## Investigate unexpected usage

An unusual increase in token usage can deserve a security investigation as well as a cost review. For example, a compromised automation or an agent running unauthorized tasks on a monitored machine could generate far more model requests than expected. [Cost alerts](../cost-alert-rules.md) help you notice the increase, then investigate the hosts, agents, models, and sessions behind it.

AI Agent Watch monitors collected agent activity. If someone uses a stolen API key outside your monitored environment, that usage is not automatically visible in AI Agent Watch. Review your provider's usage and security tools to investigate activity across the provider account.

[Governance policies](../governance/index.md) can help prevent credential exposure by blocking supported operations on monitored machines, such as a tool call that attempts to read a restricted credential file. A cost alert does not automatically block activity, and governance policies do not revoke provider API keys or stop their use outside monitored machines. See [Platform Support](../platform-support.md#capability-comparison) for enforcement coverage.

## Investigate and control spending

- Compare models and expensive sessions in [Cost Reports](reports.md).
- Explore [LLM Usage](reports.md#llm-usage) and [Session Usage](reports.md#session-usage) reports for model and session comparisons.
- Configure negotiated rates or discounts in [Pricing and Calculations](pricing.md).
- Detect changes from normal usage with [Cost Alerts](../cost-alert-rules.md).

Cost alerts notify you about usage. They do not enforce a spending cap or stop model requests.
