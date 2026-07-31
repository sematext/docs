title: Captured Events
description: The event types AI Agent Watch records for each AI agent session and what each one contains

Every action AI Agent Watch observes on a host is reported as an event. Events belong to a session (an `agent_session_started`/`agent_session_end` pair, identified by a session ID) and share a common set of fields, plus fields specific to that event type.

## Common fields

Every event carries, among others:

- **App**, **host**, **agent type/version/process**, and the **session ID** it belongs to
- **Event type** and a human-readable message
- **Is trusted agent** - whether the agent that produced the event is [trusted](trusted-agents-hosts.md)
- **Priority** and **risk score** - set by whichever [alert rule](alert-rules.md) matched the event, if any
- **Matched rules** - which rule(s) matched, if any

## Event types

| Event type | What it represents |
|---|---|
| `agent_session_started` | An AI agent process/session began. Carries the command line used to start it. |
| `agent_session_end` | The session ended. Carries the session's rolled-up totals - duration, [session risk score](risk-scores.md#session-risk-score), number of tool executions, connections, requests, file reads/writes, and bytes sent/received. |
| `tool_executed` | The agent spawned a tool, shell command, or subprocess. Carries the command, its full command line, and the spawned process' PID. |
| `tool_exit` | A previously spawned tool/subprocess exited. Carries its exit code. |
| `file_read` | The agent read a file. Carries the file path and extension. |
| `file_write` | The agent wrote to a file. Carries the file path and extension. |
| `file_rename` | The agent renamed or moved a file. Carries the old and new paths. |
| `net_connect_started` | The agent opened an outbound connection. Carries the destination host/IP/port and whether that destination is a [trusted host](trusted-agents-hosts.md#trusted-hosts). |
| `network_activity` | A rollup of traffic to a given destination. Carries bytes sent/received and request count. |
| `pii_detection` | Outbound data matched one of your [PII categories](pii-categories.md). Carries the category, the masked/one-way-encrypted payload (see [PII Categories](pii-categories.md)), the HTTP method/URL, and the destination. |
| `exec_failed` | The kernel blocked the agent from executing a binary - due to an existing OS-level permission or security policy, not anything AI Agent Watch enforces. Carries an error code/reason. |
| `file_open_failed` | The kernel blocked the agent from opening a file, for the same reason. Carries the file path/extension and an error code/reason. |

`exec_failed` and `file_open_failed` are purely observational - AI Agent Watch is just reporting a denial the kernel already made, not the one making it. AI Agent Watch has no enforcement capability of its own yet; that's what the upcoming [Governance & Enforcement](cost-tracking-governance.md#governance) feature will add.
