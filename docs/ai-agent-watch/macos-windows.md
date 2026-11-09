title: AI Agent Watch on macOS and Windows
description: Set up AI Agent Watch and Governance for Claude Code and Codex on macOS and Windows workstations

On Linux, Sematext Agent watches AI agents from the kernel and needs no setup on the agent side. On macOS and Windows it works differently: the AI agent reports its own activity to Sematext Agent on the same machine, and Sematext Agent turns it into [AI Agent Watch events](captured-events.md) and enforces [Governance](governance/index.md) policies.

Supported agents: **Claude Code** and **Codex** (the CLI, `codex exec` and the IDE extension). Requires **Sematext Agent 4.7 or later**.

The AI agent reports in two ways, and you can set up either or both:

- **Telemetry** (OpenTelemetry logs): sessions, token usage, tool calls, files and connections.
- **Hooks**: the AI agent asks Sematext Agent before each tool call. This is what enforces Governance policies, and it adds PII scanning of tool output and the exit code of shell commands.

Setup has three parts:

1. Turn on the AI agent receiver in Sematext Agent.
2. Point the AI agent's telemetry at it.
3. Install the hooks, for Governance.

Use managed settings for steps 2 and 3, so developers can't turn them off. Everything stays on the machine: the AI agent talks to `127.0.0.1` only, and Sematext Agent ships the same events it ships on Linux.

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
  hook:
    enabled: true
    endpoint: 127.0.0.1:4349
```

`otlp` receives telemetry and `hook` answers the hooks. Turn on the ones you use.

Then restart Sematext Agent.

macOS:

```
sudo st-agent macos-service restart
```

Windows, as Administrator:

```
st-agent windows-service restart
```

The agent log then shows `AI agent OTLP receiver started` with both telemetry endpoints, and `AI agent hook endpoint started endpoint=127.0.0.1:4349`.

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

If you deploy Claude Code policy through MDM (a macOS configuration profile or the Windows `HKLM\SOFTWARE\Policies\ClaudeCode` registry value), or your organization uses server-managed settings on claude.ai, put the settings there instead. Claude Code uses only the highest-ranked managed source that sets any policy and ignores the hooks in the files; an `env` variable from the files still applies where that source leaves it unset. Run `/status` in Claude Code: `Setting sources` names the source in use.

Claude Code picks up the new settings in new sessions.

## Configure Codex

Codex exports telemetry only when its `config.toml` names an exporter. Add this block:

```toml
[otel]
exporter = { otlp-grpc = { endpoint = "http://127.0.0.1:4347" } }
log_user_prompt = true
```

- `log_user_prompt` lets Sematext Agent scan prompts for [PII](pii-categories.md) from telemetry. Without it, Codex sends the prompt as `[REDACTED]`. With the hooks installed, prompts are scanned either way.
- For HTTP instead of gRPC, use `exporter = { otlp-http = { endpoint = "http://127.0.0.1:4348/v1/logs", protocol = "binary" } }`.
- Codex also sends tool arguments and the start of tool output. Sematext Agent reads only commands, file paths, search queries and subagent names from them; nothing else leaves the machine.

Where to put it:

| OS | File | Can users change it? |
|---|---|---|
| macOS | `/etc/codex/managed_config.toml` | No. It overrides the user's own config and command-line flags. |
| Windows | `%ProgramData%\OpenAI\Codex\config.toml` | Yes. It is a default; a user's `config.toml` overrides it. |
| Either, one user | `~/.codex/config.toml` | Yes. |

Codex ignores `[otel]` in a project's `.codex/config.toml`. It picks up the new settings in new sessions.

## Install the hooks for Governance

A hook is a command the AI agent runs before and after each tool call. Here it is `st-agent hook claude` or `st-agent hook codex`, which passes the call to Sematext Agent. Sematext Agent checks the call against the account's [Governance policies](governance/policies.md), the same ones Linux enforces, and when one matches it refuses the call and sends the same `exec_denied`, `file_access_denied` or `net_denied` event as on Linux. The AI agent shows the user and the model why, for example:

```
Sematext Agent blocked this: governance rule (extension) matches /Users/ann/app/.env. Ask your admin to change the rule.
```

The hooks also scan prompts, tool arguments and tool output for [PII](pii-categories.md), and report the exit code of shell commands.

If Sematext Agent is stopped or does not answer within half a second, the tool call goes ahead. The hooks never block a developer's work because the agent is down.

Install the hooks once per machine, as an administrator. Users cannot remove managed hooks.

### Claude Code hooks

1. **Find the source Claude Code reads policy from.** Run `/status` in Claude Code; `Setting sources` names it. If it is MDM or server-managed settings on claude.ai, add the hooks there, not to the file below (see [Configure Claude Code](#configure-claude-code)).
2. **Add the `hooks` block** to the managed settings file, next to any keys already in it: `/Library/Application Support/ClaudeCode/managed-settings.json` on macOS, `C:\Program Files\ClaudeCode\managed-settings.json` on Windows.
3. **Check it** from a new Claude Code session, with a policy that blocks a program, such as `nc`: asking Claude Code to run `nc -h` must be refused with `Sematext Agent blocked this: governance rule (binary) matches nc.` A hook that does not run lets the call through without a word, so a call that is allowed proves nothing.

macOS:

```json
{
  "hooks": {
    "PreToolUse": [{"matcher": "*", "hooks": [{"type": "command", "command": "/opt/spm/spm-monitor/bin/st-agent hook claude", "timeout": 5}]}],
    "PostToolUse": [{"matcher": "*", "hooks": [{"type": "command", "command": "/opt/spm/spm-monitor/bin/st-agent hook claude", "timeout": 5}]}],
    "PostToolUseFailure": [{"matcher": "*", "hooks": [{"type": "command", "command": "/opt/spm/spm-monitor/bin/st-agent hook claude", "timeout": 5}]}],
    "UserPromptSubmit": [{"hooks": [{"type": "command", "command": "/opt/spm/spm-monitor/bin/st-agent hook claude", "timeout": 5}]}]
  }
}
```

Windows:

```json
{
  "hooks": {
    "PreToolUse": [{"matcher": "*", "hooks": [{"type": "command", "command": "\"C:/Program Files/Sematext Agent/st-agent.exe\" hook claude", "timeout": 5}]}],
    "PostToolUse": [{"matcher": "*", "hooks": [{"type": "command", "command": "\"C:/Program Files/Sematext Agent/st-agent.exe\" hook claude", "timeout": 5}]}],
    "PostToolUseFailure": [{"matcher": "*", "hooks": [{"type": "command", "command": "\"C:/Program Files/Sematext Agent/st-agent.exe\" hook claude", "timeout": 5}]}],
    "UserPromptSubmit": [{"hooks": [{"type": "command", "command": "\"C:/Program Files/Sematext Agent/st-agent.exe\" hook claude", "timeout": 5}]}]
  }
}
```

- `PreToolUse` is the one that blocks. The others carry the prompt, tool arguments and output for the PII scan, and a shell command's exit code.
- On Windows, Claude Code runs hook commands in Git Bash. Keep the path quoted and with forward slashes as above: with backslashes the command does not run, and Claude Code goes on without checking anything.
- To also stop users from adding hooks of their own, set `"allowManagedHooksOnly": true`.

### Codex hooks

1. **Add the block below** to Codex's `requirements.toml`: `/etc/codex/requirements.toml` on macOS, `%ProgramData%\OpenAI\Codex\requirements.toml` on Windows. If the file already has a `[features]` table, add `hooks = true` to it instead of a second table.
2. **Check it** with a policy that blocks a program, such as `nc`: from a terminal on the machine, `codex exec "run the shell command: nc -h"` must be refused with `Sematext Agent blocked this: governance rule (binary) matches nc.`

```toml
[features]
hooks = true

[[hooks.PreToolUse]]
[[hooks.PreToolUse.hooks]]
type = "command"
command = "/opt/spm/spm-monitor/bin/st-agent hook codex"
commandWindows = '''& 'C:\Program Files\Sematext Agent\st-agent.exe' hook codex'''
timeout = 5

[[hooks.PostToolUse]]
[[hooks.PostToolUse.hooks]]
type = "command"
command = "/opt/spm/spm-monitor/bin/st-agent hook codex"
commandWindows = '''& 'C:\Program Files\Sematext Agent\st-agent.exe' hook codex'''
timeout = 5

[[hooks.UserPromptSubmit]]
[[hooks.UserPromptSubmit.hooks]]
type = "command"
command = "/opt/spm/spm-monitor/bin/st-agent hook codex"
commandWindows = '''& 'C:\Program Files\Sematext Agent\st-agent.exe' hook codex'''
timeout = 5
```

- `[features] hooks = true` keeps the hooks on when a user turns hooks off (`--disable hooks`). Hooks in `requirements.toml` run without asking the user.
- Codex runs hook commands in PowerShell on Windows, so the Windows form calls the program with `&`.
- Codex also runs any hook a user adds, and a user's hook can change a call after it was checked. `allow_managed_hooks_only = true` at the top of `requirements.toml` prevents that, and also drops every hook users added themselves.
- A malformed hook in `requirements.toml` stops Codex from starting a session, so run the check above after every change.

### What the hooks check

| Tool call | Check |
|---|---|
| Reading, writing and editing files, Codex patches, viewing images, fetching a URL | Exact. The file or URL is a field of the tool call. |
| Shell commands | Best-effort. Sematext Agent reads the command's text the way a shell would, so `cat .env`, `nc -h`, `curl http://10.1.2.3` and `cmd /c n^c` are refused. A command written to hide what it runs, such as a variable (`x=nc; $x`), an interpreter (`python3 -c`) or a script the AI agent writes and then runs, gets past the check. |
| What a command's own child processes do | Not seen. On Linux, the kernel sees it. |

On Linux, Governance acts on the operation itself (the program starting, the file opening, the connection), whatever the command looked like. On macOS and Windows it acts on the tool call, so treat it as a guardrail for the AI agent's own actions, not as a sandbox.

## Verify

Start a Claude Code or Codex session and give it a prompt that uses a tool. Within a minute, the AI Agent Watch Overview shows an `agent_session_started` event for the host, followed by `llm_usage` and `tool_executed` events. Closing the agent sends `agent_session_end`. For the hooks, use the check in [Install the hooks for Governance](#install-the-hooks-for-governance).

If nothing arrives, check the Sematext Agent log for the receiver lines above. For Claude Code, run `/status` and check that `Setting sources` lists the managed settings. For Codex, check that the `[otel]` block is in the file Codex reads, and that it points at `127.0.0.1:4347`, not at the OpenTelemetry logs port of Sematext Agent: records sent there are dropped.

## What you get compared to Linux

| Event | Claude Code | Codex |
|---|---|---|
| `agent_session_started`, `agent_session_end` | Yes. Session totals have no bytes sent or received. | Same. |
| `llm_usage` | Model, input, output and cache tokens. | Model, input, output, cache and reasoning tokens, service tier. |
| `tool_executed` | Shell commands and Claude Code's own tools (Grep, Glob, WebFetch, WebSearch). Subagents with their description, type and model. MCP tools show the tool name only. | Shell commands, web searches with their queries, files deleted by edits, subagents with their name, type and model. Other tools show their name only. |
| `tool_exit` | With the hooks: the exit code of shell commands. | From telemetry: the exit code of shell commands. |
| `file_read`, `file_write` | Files Claude Code reads and edits with its own tools. | Files Codex edits, and images it views. Codex reads files with shell commands, which appear as the command. With the hooks, edited paths are full paths; from telemetry alone they are relative to the project directory. |
| `file_rename` | No. | Yes, for files Codex moves in an edit. |
| `file_open_failed` | Failed reads, except missing files. | No. |
| `net_connect_started` | Only for WebFetch. Connections made by shell commands, such as `curl`, are not seen. | No. Codex's web search and page fetches run on OpenAI's servers. |
| `pii_detection` | User prompts. With the hooks, also tool arguments and output. The system prompt and model replies are not scanned. | Same. |
| `exec_denied`, `file_access_denied`, `net_denied` | With the hooks. See [What the hooks check](#what-the-hooks-check). | Same. |
| `exec_failed`, `network_activity` | No. | No. |

A subagent's activity appears in the session of the agent that started it, as on Linux.

The events come from what each AI agent reports about itself, so what its tools do underneath (child processes, their files and connections) is not visible on macOS and Windows.
