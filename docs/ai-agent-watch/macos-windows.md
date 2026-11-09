title: AI Agent Watch on macOS and Windows
description: Set up AI Agent Watch and Governance for Claude Code and Codex on macOS and Windows workstations

AI Agent Watch and [Governance](governance/index.md) work on macOS and Windows workstations for **Claude Code** and **Codex** (the CLI, `codex exec` and the IDE extension). On Linux they need no setup. On macOS and Windows, Claude Code and Codex need a one-time setup per machine, done by an administrator, so they report to Sematext Agent.

Requires **Sematext Agent 4.7 or later**. Sematext Agent needs no configuration for this: it listens for Claude Code and Codex on `127.0.0.1` by default.

## What you get

- [AI Agent Watch events](captured-events.md) for every session: token usage, tool calls, the files Claude Code and Codex read and edit.
- [PII](pii-categories.md) findings in prompts, tool arguments and tool output. Text is scanned on the machine; only masked findings are sent to Sematext Cloud.
- [Governance policies](governance/policies.md) enforced on Claude Code and Codex tool calls. A blocked call does not run, and the user and the AI agent see why:

```
Sematext Agent blocked this: governance rule (extension) matches /Users/ann/app/.env. Ask your admin to change the rule.
```

Governance blocks the tool calls Claude Code and Codex make, not the operating system's activity underneath them:

| Tool call | Governance |
|---|---|
| Reading, writing and editing files, Codex patches, viewing images, fetching a URL | Exact. The file or URL is part of the tool call. |
| Shell commands | Best-effort. The command text is checked, so `cat .env`, `nc -h`, `curl http://10.1.2.3` and `cmd /c n^c` are blocked. A command written to hide what it runs, such as a variable (`x=nc; $x`), an interpreter (`python3 -c`) or a script the AI agent writes and then runs, is not. |
| What a command's own child processes do | Not seen. |

Treat it as a guardrail for the AI agent's own actions, not as a sandbox. On Linux, Governance acts on the operations themselves, whatever the command looked like.

If Sematext Agent is stopped or does not answer within half a second, the tool call goes ahead, so Sematext Agent never blocks a developer's work by being down.

## Set up Claude Code

1. **Find where Claude Code reads policy from.** Run `/status` in Claude Code; `Setting sources` names it. If your organization delivers Claude Code policy through MDM (a macOS configuration profile or the Windows `HKLM\SOFTWARE\Policies\ClaudeCode` registry value) or through server-managed settings on claude.ai, add the block below there. Claude Code then ignores the file in the next step.
2. **Add the block** for your OS to Claude Code's [managed settings](https://code.claude.com/docs/en/managed-settings) file, next to any keys already in it:
    - macOS: `/Library/Application Support/ClaudeCode/managed-settings.json`
    - Windows: `C:\Program Files\ClaudeCode\managed-settings.json`
3. **Check it.** Start a new Claude Code session and ask it to run a command that one of your Governance policies blocks, for example `nc -h` with a policy on `nc`. It must be refused with `Sematext Agent blocked this: governance rule (binary) matches nc.` An allowed call proves nothing: a hook that does not run lets every call through.

macOS:

```json
{
  "env": {
    "CLAUDE_CODE_ENABLE_TELEMETRY": "1",
    "OTEL_LOGS_EXPORTER": "otlp",
    "OTEL_EXPORTER_OTLP_LOGS_PROTOCOL": "grpc",
    "OTEL_EXPORTER_OTLP_LOGS_ENDPOINT": "http://127.0.0.1:4347",
    "OTEL_LOG_USER_PROMPTS": "1",
    "OTEL_LOG_TOOL_DETAILS": "1"
  },
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
  "env": {
    "CLAUDE_CODE_ENABLE_TELEMETRY": "1",
    "OTEL_LOGS_EXPORTER": "otlp",
    "OTEL_EXPORTER_OTLP_LOGS_PROTOCOL": "grpc",
    "OTEL_EXPORTER_OTLP_LOGS_ENDPOINT": "http://127.0.0.1:4347",
    "OTEL_LOG_USER_PROMPTS": "1",
    "OTEL_LOG_TOOL_DETAILS": "1"
  },
  "hooks": {
    "PreToolUse": [{"matcher": "*", "hooks": [{"type": "command", "command": "\"C:/Program Files/Sematext Agent/st-agent.exe\" hook claude", "timeout": 5}]}],
    "PostToolUse": [{"matcher": "*", "hooks": [{"type": "command", "command": "\"C:/Program Files/Sematext Agent/st-agent.exe\" hook claude", "timeout": 5}]}],
    "PostToolUseFailure": [{"matcher": "*", "hooks": [{"type": "command", "command": "\"C:/Program Files/Sematext Agent/st-agent.exe\" hook claude", "timeout": 5}]}],
    "UserPromptSubmit": [{"hooks": [{"type": "command", "command": "\"C:/Program Files/Sematext Agent/st-agent.exe\" hook claude", "timeout": 5}]}]
  }
}
```

- `env` sends Claude Code's activity to Sematext Agent; `hooks` lets Sematext Agent check each tool call. Without `OTEL_LOG_USER_PROMPTS` prompts are not scanned, and without `OTEL_LOG_TOOL_DETAILS` tool calls show their name only.
- On Windows, keep the hook path quoted and with forward slashes, exactly as above. Claude Code runs hook commands in Git Bash, and a path with backslashes does not run.
- Users cannot remove these settings. To also stop them from adding hooks of their own, add `"allowManagedHooksOnly": true`.
- Claude Code reads the settings when a session starts.

## Set up Codex

Codex needs two files: one for its telemetry, one for its hooks.

1. **Telemetry.** Add this block to the file for your OS:

    ```toml
    [otel]
    exporter = { otlp-grpc = { endpoint = "http://127.0.0.1:4347" } }
    log_user_prompt = true
    ```

    | OS | File | Can users change it? |
    |---|---|---|
    | macOS | `/etc/codex/managed_config.toml` | No. |
    | Windows | `%ProgramData%\OpenAI\Codex\config.toml` | Yes. A user's own `config.toml` overrides it. |

2. **Hooks.** Add this block to `requirements.toml`: `/etc/codex/requirements.toml` on macOS, `%ProgramData%\OpenAI\Codex\requirements.toml` on Windows. If the file already has a `[features]` table, add `hooks = true` to it instead of adding a second one.

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

3. **Check it.** From a terminal on the machine, `codex exec "run the shell command: nc -h"`, with a Governance policy on `nc`, must be refused with `Sematext Agent blocked this: governance rule (binary) matches nc.` A broken `requirements.toml` stops Codex from starting a session, so run this after every change.

- `[features] hooks = true` keeps the hooks on even when a user turns hooks off. Hooks in `requirements.toml` run without asking the user.
- A hook a user adds can change a call after Sematext Agent checked it. `allow_managed_hooks_only = true` at the top of `requirements.toml` prevents that, and also drops the hooks users added themselves.
- Codex reads the settings when a session starts.

## Verify

Start a Claude Code or Codex session and give it a prompt that uses a tool. Within a minute, the AI Agent Watch Overview shows an `agent_session_started` event for the host, followed by `llm_usage` and `tool_executed` events. A blocked call shows up as an `exec_denied`, `file_access_denied` or `net_denied` event in the [Governance report](governance/index.md#governance-report).

If nothing arrives, check that the Sematext Agent log shows `AI agent OTLP receiver started` and `AI agent hook endpoint started`. For Claude Code, run `/status` and check that `Setting sources` lists the managed settings. For Codex, check that the `[otel]` block is in the file Codex reads and points at `127.0.0.1:4347`.

## Ports and turning it off

Sematext Agent listens on `127.0.0.1:4347` (telemetry, gRPC), `127.0.0.1:4348` (telemetry, HTTP) and `127.0.0.1:4349` (hooks). If another process already holds one of these ports, Sematext Agent logs a warning and keeps the ones it could bind.

To turn either off, set it in `st-agent.yml` (`/opt/spm/properties/st-agent.yml` on macOS, `C:\Program Files\Sematext Agent\properties\st-agent.yml` on Windows) and restart Sematext Agent:

```yaml
aiagent:
  otlp:
    enabled: false
  hook:
    enabled: false
```

## Events compared to Linux

| Event | Claude Code | Codex |
|---|---|---|
| `agent_session_started`, `agent_session_end` | Yes. Session totals have no bytes sent or received. | Same. |
| `llm_usage` | Model, input, output and cache tokens. | Model, input, output, cache and reasoning tokens, service tier. |
| `tool_executed` | Shell commands and Claude Code's own tools (Grep, Glob, WebFetch, WebSearch). Subagents with their description, type and model. MCP tools show the tool name only. | Shell commands, web searches with their queries, files deleted by edits, subagents with their name, type and model. Other tools show their name only. |
| `tool_exit` | Exit code of shell commands. | Same. |
| `file_read`, `file_write` | Files Claude Code reads and edits with its own tools. | Files Codex edits, and images it views. Files Codex reads with shell commands appear as the command. |
| `file_rename` | No. | Yes, for files Codex moves in an edit. |
| `file_open_failed` | Failed reads, except missing files. | No. |
| `net_connect_started` | Only for WebFetch. Connections made by shell commands, such as `curl`, are not seen. | No. Codex's web search and page fetches run on OpenAI's servers. |
| `pii_detection` | Prompts, tool arguments and tool output. Not the system prompt or model replies. | Same. |
| `exec_denied`, `file_access_denied`, `net_denied` | Yes, for the tool calls in [What you get](#what-you-get). | Same. |
| `exec_failed`, `network_activity` | No. | No. |

A subagent's activity appears in the session of the agent that started it, as on Linux.
