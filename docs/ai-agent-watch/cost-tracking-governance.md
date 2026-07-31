title: Cost Tracking & Governance
description: Upcoming AI Agent Watch features - Governance & Enforcement and LLM Cost Tracking

> The features on this page are in development and not yet available. 

## Governance

Today, AI Agent Watch monitors and alerts, but doesn't intervene. Governance will add the ability to actively block AI agents from carrying out actions that violate your security policies, rather than only reporting on them after the fact. You'll be able to define governance rules per agent, per action type, or across your entire infrastructure.

- **Block unauthorized agent actions** - stop a specific agent from executing shell commands, accessing sensitive files, or connecting to untrusted endpoints, before the action happens rather than after.
- **Control agent spawning** - restrict which agents are allowed to spawn new agent processes; block unrecognized agents from launching entirely, or limit spawning to a pre-approved list.
- **Granular per-agent policies** - scope enforcement rules to individual agents or agent groups, so one agent can run `bash` while another is blocked from doing the same.
- **Real-time enforcement feed** - see every blocked action as it happens: who tried what, which rule triggered it, and the full event context.

## LLM Cost Tracking

LLM Cost Tracking will show exactly what every agent, session, and model is costing you, with cache savings, cost anomalies, and infrastructure breakdowns surfaced automatically. You'll be able to set your own negotiated rates and get alerted before a runaway session or a stuck model quietly inflates your bill.

- **Per-agent & per-session cost visibility** - total cost, cache hit rate, and dominant model for every agent, down to which single session spiked well above that agent's own average, and why.
- **Proactive cost alerts** - get notified the moment daily spend, a session, or a model's cost share breaks from its own recent baseline, before it shows up as a surprise on the bill.
- **Custom pricing & negotiated rates** - override the synced default rate card per model with your own negotiated pricing or a blanket discount, so cost calculations reflect your actual contract rather than list price.
- **Cost by infrastructure** - break spend down by host, cluster, and namespace to see which part of your infrastructure - not just which agent - is driving cost.
