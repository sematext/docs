title: AI Agent Watch on macOS and Windows
description: Set up AI Agent Watch for Claude Code and Codex on macOS and Windows workstations

On Linux, Sematext Agent watches AI agents from the kernel and needs no setup on the agent side. On macOS and Windows it works differently: the AI agent sends its own OpenTelemetry logs to Sematext Agent on the same machine, and Sematext Agent turns them into [AI Agent Watch events](captured-events.md).

Supported agents: **Claude Code** and **Codex** (the CLI, `codex exec` and the IDE extension).

Setup has two parts:

1. Turn on the AI agent receiver in Sematext Agent.
2. Point the AI agent's telemetry at it, ideally through managed settings so developers can't turn it off.

Both stay on the machine. The AI agent sends to `127.0.0.1` only, and Sematext Agent ships the same events it ships on Linux.

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

## Configure Codex

Codex exports telemetry only when its `config.toml` names an exporter. Add this block:

```toml
[otel]
exporter = { otlp-grpc = { endpoint = "http://127.0.0.1:4347" } }
log_user_prompt = true
```

- `log_user_prompt` lets Sematext Agent scan prompts for [PII](pii-categories.md). Without it, Codex sends the prompt as `[REDACTED]` and it is not scanned.
- For HTTP instead of gRPC, use `exporter = { otlp-http = { endpoint = "http://127.0.0.1:4348/v1/logs", protocol = "binary" } }`.
- Codex also sends tool arguments and the start of tool output. Sematext Agent reads only commands, file paths, search queries and subagent names from them; nothing else leaves the machine.

Where to put it:

| OS | File | Can users change it? |
|---|---|---|
| macOS | `/etc/codex/managed_config.toml` | No. It overrides the user's own config and command-line flags. |
| Windows | `%ProgramData%\OpenAI\Codex\config.toml` | Yes. It is a default; a user's `config.toml` overrides it. |
| Either, one user | `~/.codex/config.toml` | Yes. |

Codex ignores `[otel]` in a project's `.codex/config.toml`. It picks up the new settings in new sessions.

## Verify

Start a Claude Code or Codex session and give it a prompt that uses a tool. Within a minute, the AI Agent Watch Overview shows an `agent_session_started` event for the host, followed by `llm_usage` and `tool_executed` events. Closing the agent sends `agent_session_end`.

If nothing arrives, check the Sematext Agent log for the receiver line above. For Claude Code, run `/status` and check that `Setting sources` lists the managed settings. For Codex, check that the `[otel]` block is in the file Codex reads, and that it points at `127.0.0.1:4347`, not at the OpenTelemetry logs port of Sematext Agent: records sent there are dropped.

## What you get compared to Linux

| Event | Claude Code | Codex |
|---|---|---|
| `agent_session_started`, `agent_session_end` | Yes. Session totals have no bytes sent or received. | Same. |
| `llm_usage` | Model, input, output and cache tokens. | Model, input, output, cache and reasoning tokens, service tier. |
| `tool_executed` | Shell commands and Claude Code's own tools (Grep, Glob, WebFetch, WebSearch). Subagents with their description, type and model. MCP tools show the tool name only. | Shell commands, web searches with their queries, files deleted by edits, subagents with their name, type and model. Other tools show their name only. |
| `file_read`, `file_write` | Files Claude Code reads and edits with its own tools. | Files Codex edits, and images it views. Codex reads files with shell commands, which appear as the command. Edited paths are relative to the project directory. |
| `file_rename` | No. | Yes, for files Codex moves in an edit. |
| `file_open_failed` | Failed reads, except missing files. | No. |
| `net_connect_started` | Only for WebFetch. Connections made by shell commands, such as `curl`, are not seen. | No. Codex's web search and page fetches run on OpenAI's servers. |
| `pii_detection` | User prompts only. Tool results and the system prompt are not scanned. | User prompts only. |
| `tool_exit`, `exec_failed`, `network_activity` | No. | No. |
| Governance (`*_denied` events) | No. [Governance](governance/compatibility.md) needs Linux. | No. |

A subagent's activity appears in the session of the agent that started it, as on Linux.

The events come from what each AI agent reports about itself, so what its tools do underneath (child processes, their files and connections) is not visible on macOS and Windows.
