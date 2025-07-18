title: Data Correlation
description: Guide to correlating Synthetics, Logs, and Metrics in Sematext to quickly move from symptoms to root cause when troubleshooting production issues.

When something breaks in production such as a slow API, a failed deployment, a spike in errors, your users don’t care which system is responsible. They just see that something’s not working.

**Sematext’s power comes from connecting the dots**, across synthetics, logs, and metrics so you can _move from symptom to root cause_ quickly, with context at every step.

This Data Correlation guide, we walk you through three common cross connection investigation paths:

- **Metrics to Logs ↔ Logs to Metrics**: Go from system or service metrics (like CPU spikes or disk pressure) to logs that explain _why_ they happened and vice versa.
- **Synthetics to Logs**: Start with a failed or slow browser/API test and trace the issue into backend logs for root cause analysis.
- **Synthetics to Metrics**: Correlate synthetic check failures with system-level or service-specific performance metrics to uncover underlying resource bottlenecks.

  These aren’t just theoretical workflows, they’re what make troubleshooting **faster and more effective**.


## Why Correlation Matters

Single-point monitoring (just logs, just metrics, just uptime checks) shows you a part of the picture. But only when these are linked you can:

- Understand both **user impact and internal system state**
- Investigate without jumping between disconnected tools
- Reduce meantime-to-resolution (MTTR)
- Identify patterns and dependencies across multiple layers of your stack

Whether you're monitoring infrastructure, services, APIs, or frontend, connecting [Synthetics](/docs/synthetics/), [Logs](/docs/logs/), and [Metrics](/docs/monitoring/) turns isolated events into actionable insights.

## Data Flow

Here’s a simplified view of how synthetic checks, logs, and metrics fit into your system architecture:

- **A user/browser initiates a Synthetics check.**
- **The request flows through:** Public endpoint → Backend services → Database
- **Along this path**:
  - [Synthetics](/docs/synthetics/) capture what the user sees (e.g., response time, errors, UI behavior).
  - [Logs](/docs/logs/) are generated by backend services and infrastructure components and databases.
  - [Metrics](/docs/monitoring/) are collected from hosts, containers, pods, services, and the database.

 ![Sematext Correlation Diagram](/docs/images/guide/data-correlation/sematext-correlation-diagram.svg)

  
