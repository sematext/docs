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

Available event types and fields depend on the platform and collection method. See [Platform coverage](#platform-coverage) and the [workstation event matrix](macos-windows.md#events-compared-to-linux).

| Event type | What it represents |
|---|---|
| `agent_session_started` | An AI agent process/session began. Carries the command line used to start it. |
| `agent_session_end` | The session ended. Carries the session's rolled-up totals - duration, [session risk score](risk-scores.md#session-risk-score), number of tool executions, connections, requests, file reads/writes, and bytes sent/received. |
| `llm_usage` | A model call's available token usage, provider/model, calculated cost, and pricing status. See [LLM usage and session costs](#llm-usage-and-session-costs). |
| `tool_executed` | The agent spawned a tool, shell command, or subprocess. Carries the command, its full command line, and the spawned process' PID. |
| `tool_exit` | A previously spawned tool/subprocess exited. Carries its exit code. |
| `file_read` | The agent read a file. Carries the file path and extension. |
| `file_write` | The agent wrote to a file. Carries the file path and extension. |
| `file_rename` | The agent renamed or moved a file. Carries the old and new paths. |
| `net_connect_started` | The agent opened an outbound connection. Carries the destination host/IP/port and whether that destination is a [trusted host](trusted-agents-hosts.md#trusted-hosts). |
| `network_activity` | A rollup of traffic to a given destination. Carries bytes sent/received and request count. |
| `pii_detection` | Captured content matched one of your [PII categories](pii-categories.md). Carries the category, the masked/one-way-encrypted payload (see [PII Categories](pii-categories.md)), the HTTP method/URL, and the destination. |
| `exec_failed` | The kernel blocked the agent from executing a binary - due to an existing OS-level permission or security policy, not anything AI Agent Watch enforces. Carries an error code/reason. |
| `file_open_failed` | The kernel blocked the agent from opening a file, for the same reason. Carries the file path/extension and an error code/reason. |
| `exec_denied` | A governance policy blocked tool execution based on a binary or command-argument match. |
| `file_access_denied` | A governance policy denied file access based on a path or extension. |
| `net_denied` | A governance policy blocked network activity based on an IP, port, CIDR, or destination-host match. |

`exec_failed` and `file_open_failed` report denials caused by existing OS permissions or security policies. `exec_denied`, `file_access_denied`, and `net_denied` report AI Agent Watch Governance enforcement. See [Governance](governance/index.md) for policy configuration and notifications.

Governance events record the matched condition for the blocked operation. Depending on the event type, they also carry the binary, file path, or destination IP and port.

## LLM usage and session costs

`llm_usage` reports a model call's provider, model, available input/output/cache token counts, and, where available, reasoning tokens and service-tier metadata. Sematext calculates the call's cost and records its pricing status. At `agent_session_end`, captured usage and costs are aggregated for the session.

See [Cost Tracking](cost-tracking/index.md) and [Pricing and Calculations](cost-tracking/pricing.md) for collection requirements and billing boundaries.

## Platform coverage

| Capability | Linux | macOS and Windows |
|---|---|---|
| Discovery and collection | Automatic discovery and kernel-based observation on supported hosts. | Claude Code and Codex must be configured to report telemetry and run hooks. |
| Sessions and tool calls | Observed process activity. | Derived from reported sessions, tool calls, hooks, and process lifecycle information. |
| File activity | Kernel file operations. | Supported agents' reported file tools and patches; shell reads remain command events. |
| Network activity | Observed connections and traffic. | Limited reported destinations; no network byte totals or visibility into shell-child connections. |
| PII detections | Scanned captured outbound content. | Scanned prompts, tool arguments, and hook-reported tool output. Only masked findings are sent. |
| Governance | Kernel enforcement on compatible Linux hosts. | Known tool-call checks; shell commands are best effort, MCP calls and underlying child-process activity are not checked. |
| LLM usage | Supported captured model requests. | Token usage reported by the configured coding agent. |

See the [per-agent event matrix](macos-windows.md#events-compared-to-linux) for details. An absent event can reflect a collection limitation; it does not prove that an operation did not happen.
