title: Cost Reports
description: Investigate LLM costs by model, agent, session, host, namespace, and cluster

Use **AI Agent Watch → LLM Costs** to understand spending and **Cost by Infrastructure** to locate it across your deployment. Select the Infra Apps and filters relevant to your investigation. Model and provider filters help isolate a particular source of spend.

## LLM Costs

The report combines summary tiles, cost trends, model breakdowns, agent and session tables, and recent cost alerts.

| Element | What to look for |
|---|---|
| Total Cost | Calculated cost for the selected period and filters. |
| Daily Average and Monthly Estimate | A trailing seven-day average and its monthly projection. These two values are independent of the selected date range; the projection is not a bill or budget commitment. |
| Cache Savings | The cache hit rate, shown as a percentage. It describes cache reuse, not a dollar amount saved. |
| Cost Alerts | Alerts that warrant investigation. |
| Cost heatmap | Recurring expensive hours and unusual cost concentrations over the trailing seven days, independent of the selected date range. |
| Cost by Model | Which models contribute most to spend and how that changes over time. |
| Top Agents by Cost | Cost, sessions, average session cost, cache hit rate, model breakdown, and input/output/cache tokens for each agent origin. |
| Top Sessions by Cost | Expensive sessions, their model breakdown, cache hit rate, and cost compared with the agent's seven-day average. |

> **Screenshot placeholder — LLM Costs:** Show summary tiles, heatmap, model charts, Top Agents, Top Sessions, and the cost-alert feed.

### Compare agents across workstations

1. Select the Infra Apps receiving the workstations' data and choose a representative time range.
2. In **Top Agents by Cost**, identify each agent by its host and agent type. For example, compare Claude Code on Bora's workstation with Codex on Nikhil's workstation.
3. Compare total cost alongside session count, average session cost, and token usage. A higher total may reflect more sessions rather than a more expensive model.
4. Inspect model breakdown and cache hit rate to understand differences in usage.
5. Open a row's context menu to view that agent's events or costs by infrastructure. Use **Top Sessions by Cost** to locate individual expensive sessions and open their events.

> **Screenshot placeholder — Top Agents and session drilldown:** Show identifiable workstation hosts, token columns, model breakdowns, and the context menu used to investigate an agent or session.

A workstation can be shared, and an employee can use more than one workstation. Treat host-based comparisons as agent-origin comparisons, not automatic employee or department accounting.

## Cost by Infrastructure

Use this report to find where spending originates:

- **Cost by Host** covers host origins, including employee workstations and servers outside Kubernetes.
- **Cost by Namespace** groups Kubernetes usage by namespace.
- **Cost by Cluster** compares Kubernetes clusters.

Kubernetes origins are represented in the Kubernetes breakdowns rather than treated as bare-metal host spending. Inspect the agent, provider, and model details to understand what drives an expensive origin, and use context menus to continue the investigation.

> **Screenshot placeholder — Cost by Infrastructure:** Show the summary, host distribution, namespace breakdown, and cluster distribution with both workstation and server examples.

## Investigate a spike

Start with the model timeline or cost heatmap, narrow the period, then compare Top Agents and Top Sessions. Follow the expensive origin into its usage events. Check whether a change in session count, model choice, token volume, or cache reuse explains the increase. If an alert fired, open it to inspect its condition and contributing events; see [Cost Alerts](../cost-alert-rules.md#investigate-a-cost-alert).

## Interpret missing or incomplete costs

A missing cost is not the same as zero usage. Requests can report tokens without an applicable model price or supported billing mode. A session with some unpriced calls has a partial cost; one with no captured usage has no calculated session cost. Review usage events and [pricing status](pricing.md#missing-and-partial-costs) before treating a small total as a complete account of spending.
