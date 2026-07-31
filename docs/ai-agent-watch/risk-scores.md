title: Risk Scores & Priorities
description: How AI Agent Watch scores individual events and whole agent sessions, and how priority is assigned

AI Agent Watch scores risk at two levels: a **risk score on each event**, and a **risk score for the whole session** once it ends. Both exist so you can either react to a single risky action as it happens, or judge a session as a whole after the fact.

## Priority

Priority (Info, Medium, High, or Critical) is set per [alert rule](alert-rules.md) - you choose it when you create or edit a rule. It is not calculated from anything; it's a judgment call you make about how serious a given condition is.

## Event risk score

Every event gets a risk score, derived directly from the priority of whichever alert rule matched it (the highest one, if more than one matched):

| Priority | Risk score |
|---|---|
| Info / no rule matched | 0 |
| Medium | 10 |
| High | 20 |
| Critical | 30 |

An event that matches no rule stays at Info priority with a risk score of 0. This score is the raw input to the session risk score below.

## Session risk score

When a session ends (`agent_session_end`), AI Agent Watch combines the risk scores of every event in that session into a single **session risk score** from 0 to 100.

Rather than simply adding scores together - which would let a long session with many small findings look artificially critical - each additional risky event pushes the score closer to 100 with a diminishing effect the closer it already is to the ceiling. In practice that means:

- One or two Critical-priority events in a session will push it well up the scale
- A session made up mostly of low-risk events climbs more slowly and rarely reaches the top of the range on volume alone
- The score can approach but not exceed 100

![Agent Sessions](/docs/images/aiam/agent-sessions.png)

## Where these scores show up

- **Event risk score** and priority are shown on every event and used to sort/filter activity.
- **Session risk score** is shown on the session summary and used in reports that break sessions down by risk band: **Clean** (0-30), **Medium** (31-60), **High** (61-80), and **Critical** (81-100). See the Agent Sessions report in [Reports](reports.md#agent-sessions).
- The default "Critical-Risk Session" alert rule fires when a session's risk score crosses a high threshold, so you can be notified about a session as a whole rather than only reacting event-by-event. You can also write your own rules against `sessionRiskScore` on `agent_session_end` events.
