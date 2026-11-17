title: LLM Cost Tracking
description: Understand AI agent token usage and calculated costs across servers and employee workstations

LLM Cost Tracking shows which AI agents, sessions, models, and hosts drive your organization's AI spending.

## Start collecting usage

1. [Enable AI Agent Watch](../getting-started.md) for the Infra Apps receiving your machines' data, and use a Sematext Agent version that supports cost collection on those hosts.
2. On macOS and Windows, complete [Claude Code or Codex setup](../macos-windows.md). Telemetry is needed for token usage; hooks alone do not provide complete usage reporting.
3. Start an AI-agent session that makes a model request. In **Explore**, look for `llm_usage` events for that agent and host.
4. Open **AI Agent Watch → LLM Costs** to compare agents, models, and sessions. Use **Cost by Infrastructure** to locate spending by host, namespace, or cluster.

## How costs are calculated

Each `llm_usage` event carries the available model, provider, and token counts. Sematext applies the model's applicable pricing, including your account's overrides, to calculate the call's cost. At session end, captured call costs are summed into a session total.

Input, output, cache reads, and cache writes can have different rates. Reasoning tokens are included in output tokens. See [Pricing and Calculations](pricing.md) for rate selection, overrides, and missing costs.

Costs are estimates; reported token counts are exact. Linux uses the service tier reported in each LLM usage event, while macOS and Windows use standard API rates when no service tier is reported. See [Understanding estimated costs](pricing.md#understanding-estimated-costs) for details.

If you have a fixed monthly subscription or use reserved or scale tiers, token reports still help you compare consumption across agents, models, machines, and sessions. Calculated costs do not allocate a subscription fee, and usage explicitly reported as reserved or scale is left unpriced. See [Subscriptions, reserved capacity, and scale tiers](pricing.md#subscriptions-reserved-capacity-and-scale-tiers) for how to interpret these reports and respond to pricing alerts.

## Investigate and control spending

- Compare models and expensive sessions in [Cost Reports](reports.md).
- Explore [LLM Usage](reports.md#llm-usage) and [Session Usage](reports.md#session-usage) reports for model and session comparisons.
- Configure negotiated rates or discounts in [Pricing and Calculations](pricing.md).
- Detect changes from normal usage with [Cost Alerts](../cost-alert-rules.md).

Cost alerts notify you about usage. They do not enforce a spending cap or stop model requests.
