title: Cost Alerts
description: Configure fixed thresholds and baseline alerts for AI agent LLM usage and costs

Cost alerts evaluate aggregated AI Agent Watch data and notify you when it meets a condition. They complement [event alert rules](alert-rules.md), which match individual activity events, and [governance policies](governance/policies.md), which block operations. A cost alert does not stop an agent or enforce a spending limit.

Open **AI Agent Watch → Event Alerting → Cost Alerts** to manage rules. Account owners and admins can create, edit, clone, enable, disable, and delete them.

## Choose an alert type

- **Threshold:** Compare a metric aggregated over an analyzing window with a fixed limit. For example, alert when captured LLM cost exceeds $50 in an hour.
- **Baseline:** Compare the current window with the median of comparable earlier windows. For example, alert when a workstation agent's cost is more than 30% above its normal level.

Use filters to select the usage you care about and grouping to evaluate origins independently. For example, group by host to detect a workstation spike that would be diluted in an organization-wide total. Choose the metric, aggregation, and grouping supported by the rule form for your question.

## Create a rule

1. Add a cost alert rule and give it a descriptive name.
2. Select a threshold or baseline condition, metric, aggregation, and analyzing window.
3. Add filters, such as provider or model, and choose grouping if each origin should be evaluated separately.
4. Set the comparison and fixed limit or baseline deviation.
5. Review the preview against available data, select priority, configure the schedule and notification destinations, then save and enable the rule.

> **Screenshot placeholder — Cost alert rule:** Show a cost metric, host grouping, filters, analyzing window, threshold or baseline condition, preview, and notification settings.

## Baseline comparison windows

| Mode | Earlier windows used for comparison |
|---|---|
| SLIDING | Back-to-back windows over the previous 24 hours. Useful for recent changes. |
| ALIGNED | The same clock-time window on each of the previous seven days. Useful for daily work patterns. |
| WEEKLY | The same clock-time window on the same weekday over the previous four weeks. Useful for weekly patterns. |

Baseline rules compare against the median of eligible windows. Windows without data are excluded. **Skip weekends** is available for ALIGNED comparisons and excludes Saturday and Sunday windows from the baseline. Pair it with a weekday-only alert schedule if the current window should also be a weekday.

Choose a percentage deviation for proportional changes or an absolute deviation for a fixed difference in the metric's units. Historical data must be available to form a useful baseline; a missing history is not evidence of normal spending.

## Investigate a cost alert

Open a cost alert from the LLM Costs report's alert feed. Review the triggered value, condition, and current value. For a baseline alert, inspect the historical windows, their median, and any excluded windows to understand the comparison.

Then inspect the contributing events from the alert's analyzing window, narrowed to its filters and the group that triggered it. Use the events' agent, host, model, and token usage to distinguish a model change from increased activity. If the rule changed after the alert fired, account for that change when comparing the current configuration with the original hit.

> **Screenshot placeholder — Cost alert investigation:** Show the alert summary, baseline/current-window chart, excluded windows, and contributing usage events.

Notification schedules and throttling follow the usual [alert scheduling](/docs/alerts/alert-scheduling/) behavior. Review [missing and partial costs](cost-tracking/pricing.md#missing-and-partial-costs) when evaluating spend-based alerts: an unpriced call does not contribute a complete cost.
