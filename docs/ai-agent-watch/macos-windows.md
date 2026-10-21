title: AI Agent Watch on macOS and Windows
description: Set up AI Agent Watch for Claude Code on macOS and Windows workstations

On Linux, Sematext Agent watches AI agents from the kernel and needs no setup on the agent side. On macOS and Windows it works differently: the AI agent sends its own OpenTelemetry logs to Sematext Agent on the same machine, and Sematext Agent turns them into [AI Agent Watch events](captured-events.md).

Supported agents: **Claude Code**.

Setup has two parts:

1. Turn on the AI agent receiver in Sematext Agent.
2. Point Claude Code's telemetry at it, ideally through managed settings so developers can't turn it off.

Both stay on the machine. Claude Code sends to `127.0.0.1` only, and Sematext Agent ships the same events it ships on Linux.

## Enable the receiver in Sematext Agent

The receiver is off by default. Open `st-agent.yml`:

- macOS: `/opt/spm/properties/st-agent.yml`
- Windows: `C:\Program Files\Sematext Agent\properties\st-agent.yml`

Uncomment the `aiagent` block, or add it if your file has none:

```yaml
aiagent:
  otlp:
    enabled: true
    grpc-endpoint: 127.0.0.1:4347
    http-endpoint: 127.0.0.1:4348
```

Then restart Sematext Agent.

macOS:

```
sudo st-agent macos-service restart
```

Windows, as Administrator:

```
st-agent windows-service restart
```

The agent log then shows `AI agent OTLP receiver started` with both endpoints.

## Configure Claude Code

Claude Code exports telemetry only when told to. Put this `env` block in Claude Code's [managed settings](https://code.claude.com/docs/en/managed-settings), so it applies to every user on the machine and users can't redirect it:

```json
{
  "env": {
    "CLAUDE_CODE_ENABLE_TELEMETRY": "1",
    "OTEL_LOGS_EXPORTER": "otlp",
    "OTEL_EXPORTER_OTLP_LOGS_PROTOCOL": "grpc",
    "OTEL_EXPORTER_OTLP_LOGS_ENDPOINT": "http://127.0.0.1:4347",
    "OTEL_LOG_USER_PROMPTS": "1",
    "OTEL_LOG_TOOL_DETAILS": "1"
  }
}
```

- `OTEL_LOG_USER_PROMPTS` lets Sematext Agent scan prompts for [PII](pii-categories.md). Prompts are scanned on the machine; only masked findings are sent to Sematext Cloud.
- `OTEL_LOG_TOOL_DETAILS` adds the commands, file paths and URLs that tool, file and connection events are built from. Without it, you see tool names only.
- For HTTP instead of gRPC, use `"OTEL_EXPORTER_OTLP_LOGS_PROTOCOL": "http/protobuf"` and `"OTEL_EXPORTER_OTLP_LOGS_ENDPOINT": "http://127.0.0.1:4348/v1/logs"`.

Where to put it, if you deploy managed settings as files:

| OS | Directory |
|---|---|
| macOS | `/Library/Application Support/ClaudeCode/` |
| Windows | `C:\Program Files\ClaudeCode\` |

To leave an existing `managed-settings.json` untouched, save the block as its own file in the `managed-settings.d` folder of that directory, for example `managed-settings.d/50-sematext.json`. Claude Code merges `env` blocks key by key.

If you deploy Claude Code policy through MDM (a macOS configuration profile or the Windows `HKLM\SOFTWARE\Policies\ClaudeCode` registry value), add the `env` keys there instead. By default Claude Code uses only the highest-ranked managed source and ignores the files.

Claude Code picks up the new settings in new sessions.

## Verify

Start a Claude Code session and give it a prompt that uses a tool. Within a minute, the AI Agent Watch Overview shows an `agent_session_started` event for the host, followed by `llm_usage` and `tool_executed` events. Closing Claude Code sends `agent_session_end`.

If nothing arrives, run `/status` in Claude Code and check that `Setting sources` lists the managed settings, and check the Sematext Agent log for the receiver line above.

## What you get compared to Linux

| Event | macOS and Windows |
|---|---|
| `agent_session_started`, `agent_session_end` | Yes. Session totals have no bytes sent or received. |
| `llm_usage` | Yes: model, input, output and cache tokens. No service tier or reasoning tokens. |
| `tool_executed` | Yes, for shell commands and Claude Code's own tools (Grep, Glob, WebFetch, WebSearch, subagents). MCP tools show the tool name only. |
| `file_read`, `file_write` | Yes, for files Claude Code reads and edits with its own tools. Files touched by shell commands appear as the command only. |
| `file_open_failed` | Yes, for failed reads, except missing files. |
| `net_connect_started` | Only for WebFetch. Connections made by shell commands, such as `curl`, are not seen. |
| `pii_detection` | User prompts only. Tool results and the system prompt are not scanned. |
| `tool_exit`, `exec_failed`, `file_rename`, `network_activity` | No. |
| Governance (`*_denied` events) | No. [Governance](governance/compatibility.md) needs Linux. |

The events come from what Claude Code reports about itself, so what its tools do underneath (child processes, their files and connections) is not visible on macOS and Windows.
