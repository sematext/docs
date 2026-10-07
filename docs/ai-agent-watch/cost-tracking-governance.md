title: LLM Cost Tracking
description: Upcoming LLM cost tracking for AI Agent Watch

## Governance

Governance is available. Use [governance policies](governance.md) to block operations that match your conditions and scope, review enforcement events, and configure notifications. See [Governance Compatibility](governance-compatibility.md) for host compatibility and BPF-LSM configuration.

## LLM Cost Tracking

> LLM Cost Tracking is in development and not yet available.

LLM Cost Tracking will show exactly what every agent, session, and model is costing you, with cache savings, cost anomalies, and infrastructure breakdowns surfaced automatically. You'll be able to set your own negotiated rates and get alerted before a runaway session or a stuck model quietly inflates your bill.

- **Per-agent & per-session cost visibility** - total cost, cache hit rate, and dominant model for every agent, down to which single session spiked well above that agent's own average, and why.
- **Proactive cost alerts** - get notified the moment daily spend, a session, or a model's cost share breaks from its own recent baseline, before it shows up as a surprise on the bill.
- **Custom pricing & negotiated rates** - override the synced default rate card per model with your own negotiated pricing or a blanket discount, so cost calculations reflect your actual contract rather than list price.
- **Cost by infrastructure** - break spend down by host, cluster, and namespace to see which part of your infrastructure - not just which agent - is driving cost.
