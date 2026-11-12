title: AI Agent Watch Setup on macOS and Windows
description: Set up AI Agent Watch and Governance for Claude Code and Codex on macOS and Windows workstations

AI Agent Watch and [Governance](governance/index.md) work on macOS and Windows workstations for **Claude Code** and **Codex** (the CLI, `codex exec` and the IDE extension). On macOS and Windows, Claude Code and Codex need a one-time setup per machine, done by an administrator with one command, so they report to Sematext Agent.

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

## Set up

First, follow [Getting Started](getting-started.md) to enable AI Agent Watch and install Sematext Agent.

For Claude Code, use version **2.1.139 or later**. If your organization manages Claude Code through MDM or claude.ai, also follow [Centrally managed Claude Code](#centrally-managed-claude-code).

As an administrator, on each machine:

```bash
# macOS
sudo st-agent ai-agent-watch install
```

```powershell
# Windows, in PowerShell run as Administrator
st-agent ai-agent-watch install
```

On Windows the installer adds Sematext Agent to `PATH`; a PowerShell window opened before the install does not see it, so open a new one.

This sets up both Claude Code and Codex: the hooks that let Sematext Agent check each tool call, and the telemetry they send it.

The command updates Claude Code's machine-wide managed settings and Codex's `requirements.toml`. It preserves unrelated settings and existing telemetry values, and backs up each file before changing it. Running the command again leaves an up-to-date configuration unchanged.

### Optional setup commands

Run these with the same administrator privileges as the install command above.

| Task | Command |
|---|---|
| Preview changes without writing files | `st-agent ai-agent-watch install --dry-run` |
| Configure only Claude Code | `st-agent ai-agent-watch install --claude` |
| Configure only Codex | `st-agent ai-agent-watch install --codex` |
| Install hooks while keeping telemetry configured elsewhere | `st-agent ai-agent-watch install --hooks-only` |

The hooks-only option does not set up telemetry for token usage and cost tracking. See [troubleshooting](#troubleshooting) if the command refuses to update a file.

### Check the setup

> **Screenshot placeholder — Workstation setup:** Show a successful `st-agent ai-agent-watch check` result and the corresponding host in AI Agent Watch.

Then check it, as any user:

```bash
st-agent ai-agent-watch check
```

`check` runs the hook command the way Claude Code and Codex run it, with a tool call Sematext Agent refuses, and shows the answer. It needs at least one [Governance policy](governance/policies.md) that blocks something. A working setup shows `pass` for each:

```
Claude Code  /Library/Application Support/ClaudeCode/managed-settings.json
  runs     /opt/spm/spm-monitor/bin/st-agent hook claude
  pass  a tool call came back refused: Sematext Agent blocked this (check): the hook works.
  up to date
```

If a check fails, see [Troubleshooting](#troubleshooting). The check call creates no event.

**After upgrading Sematext Agent**, run `check`. If it says `out of date`, the new version changed the hooks; run the `install` command it prints.

**Before uninstalling Sematext Agent**, run `sudo st-agent ai-agent-watch remove` (on Windows, as Administrator). It takes out what `install` wrote and leaves everything else. Codex's `[features] hooks = true` stays, as do Claude Code `env` values someone changed after `install`. Claude Code's telemetry settings all stay when the file sends logs somewhere else, and its telemetry switch stays while other telemetry settings use it.

## Set up by hand

For deploying through Jamf, Intune or Group Policy, or to Claude Code policy delivered by MDM or claude.ai, these are the blocks `install` writes.

### Centrally managed Claude Code

If your organization delivers Claude Code settings through MDM or claude.ai, check that the Sematext hooks will run alongside them:

1. Use Claude Code **2.1.242 or later**.
2. Run `/status` in Claude Code and inspect **Setting sources** to find the active policy source.
3. Add `"managedSourcesBehavior": "merge"` to that policy source. Without it, Claude Code ignores the hooks in the local managed-settings file.
4. Start a new session and [check the setup](#check-the-setup).

If the central policy sets its own OpenTelemetry exporter, coordinate the telemetry configuration there too: Claude Code takes telemetry settings from one source as a whole. Installing local hooks does not redirect centrally managed telemetry to Sematext Agent.

For manual deployment, use the configuration blocks below. Putting the hooks directly into claude.ai server-managed settings works only when all target machines use the same operating system, because the hook command has an OS-specific path.

### Claude Code

1. **Check centrally managed settings.** If your organization uses MDM or claude.ai settings, complete [Centrally managed Claude Code](#centrally-managed-claude-code) first.
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
    "PreToolUse": [{"matcher": "*", "hooks": [{"type": "command", "command": "/opt/spm/spm-monitor/bin/st-agent", "args": ["hook", "claude"], "timeout": 5}]}],
    "PostToolUse": [{"matcher": "*", "hooks": [{"type": "command", "command": "/opt/spm/spm-monitor/bin/st-agent", "args": ["hook", "claude"], "timeout": 5}]}],
    "PostToolUseFailure": [{"matcher": "*", "hooks": [{"type": "command", "command": "/opt/spm/spm-monitor/bin/st-agent", "args": ["hook", "claude"], "timeout": 5}]}],
    "UserPromptSubmit": [{"hooks": [{"type": "command", "command": "/opt/spm/spm-monitor/bin/st-agent", "args": ["hook", "claude"], "timeout": 5}]}]
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
    "PreToolUse": [{"matcher": "*", "hooks": [{"type": "command", "command": "C:\\Program Files\\Sematext Agent\\st-agent.exe", "args": ["hook", "claude"], "timeout": 5}]}],
    "PostToolUse": [{"matcher": "*", "hooks": [{"type": "command", "command": "C:\\Program Files\\Sematext Agent\\st-agent.exe", "args": ["hook", "claude"], "timeout": 5}]}],
    "PostToolUseFailure": [{"matcher": "*", "hooks": [{"type": "command", "command": "C:\\Program Files\\Sematext Agent\\st-agent.exe", "args": ["hook", "claude"], "timeout": 5}]}],
    "UserPromptSubmit": [{"hooks": [{"type": "command", "command": "C:\\Program Files\\Sematext Agent\\st-agent.exe", "args": ["hook", "claude"], "timeout": 5}]}]
  }
}
```

- `env` sends Claude Code's activity to Sematext Agent; `hooks` lets Sematext Agent check each tool call. `OTEL_LOG_USER_PROMPTS` includes prompts in telemetry, and `OTEL_LOG_TOOL_DETAILS` includes tool details. The configured hooks also scan submitted prompts and tool inputs/results independently of those telemetry switches.
- `args` makes Claude Code start Sematext Agent directly, with no shell (Claude Code 2.1.139 or later). Without it, Claude Code runs the command in Git Bash on Windows, or in PowerShell when Git for Windows is not installed, and a path that one shell runs, the other does not.
- Users without administrator rights cannot remove these managed settings. To also stop them from adding hooks of their own, add `"allowManagedHooksOnly": true`.
- Claude Code reads the settings when a session starts.

### Codex

1. **Add this block** to `requirements.toml`: `/etc/codex/requirements.toml` on macOS, `%ProgramData%\OpenAI\Codex\requirements.toml` on Windows. When the `RequirementsPath` value under `HKLM\SOFTWARE\Policies\OpenAI\Codex` names another file, Codex 0.164 or later reads that file instead, and older versions still read the default one. If the file already has a `[features]` table, add `hooks = true` to it instead of adding a second one. Users without administrator rights cannot change these managed settings.

    ```toml
    [features]
    hooks = true

    [otel]
    exporter = { otlp-grpc = { endpoint = "http://127.0.0.1:4347" } }
    log_user_prompt = true

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

    Codex reads `[otel]` from `requirements.toml` from version 0.166; older versions skip it and run the hooks only.

2. **Telemetry managed elsewhere.** If `requirements.toml` already has an `[otel]` table, Codex sends its telemetry there and not to Sematext Agent; leave the `[otel]` block out.

3. **Check it.** From a terminal on the machine, `codex exec "run the shell command: nc -h"`, with a Governance policy on `nc`, must be refused with `Sematext Agent blocked this: governance rule (binary) matches nc.` A broken `requirements.toml` stops Codex from starting a session, so run this after every change.

- `[features] hooks = true` keeps the hooks on even when a user turns hooks off. Hooks in `requirements.toml` run without asking the user.
- A hook a user adds can change a call after Sematext Agent checked it. `allow_managed_hooks_only = true` at the top of `requirements.toml` prevents that, and also drops the hooks users added themselves.
- Codex reads the settings when a session starts.

## Verify

Start a Claude Code or Codex session and give it a prompt that uses a tool. Within a minute, the AI Agent Watch Overview shows an `agent_session_started` event for the host, followed by `llm_usage` and `tool_executed` events. A blocked call shows up as an `exec_denied`, `file_access_denied` or `net_denied` event in the [Governance report](governance/index.md#governance-report).

If nothing arrives, check that the Sematext Agent log shows `AI agent OTLP receiver started` and `AI agent hook endpoint started`. For Claude Code, run `/status` and check that `Setting sources` lists the managed settings. For Codex, check that the `[otel]` block is in the file Codex reads and points at `127.0.0.1:4347`.

## Troubleshooting

### The installer refuses to update a file

Read the path and reason printed by the command. Run setup as an administrator, then check the affected file, its parent folders, and the Sematext Agent executable:

- On macOS, they must be owned by root and must not be writable by other users.
- On Windows, they must be owned by an administrator and must not grant ordinary users permission to change them.
- Use real files and directories rather than symbolic links or Windows junctions, and make sure the administrator can read existing settings.

Ask the machine's administrator to correct the reported ownership, permissions, or path issue, then rerun the install command. The installer leaves files it cannot safely update unchanged.

### A setup check fails

| Result | What to check |
|---|---|
| `command did not run` | Confirm that Sematext Agent is installed and the configured hook command can start. |
| `agent not reachable` | Start Sematext Agent and check that `aiagent.enabled` and `aiagent.hook.enabled` are enabled in `st-agent.yml`. |
| `no policy loaded` | Enable AI Agent Watch for the Infra App, check `aiagent.enforcement.enabled`, and enable at least one governance policy with a blocking condition. |
| `out of date` | Rerun the install command printed by the check, then check again. |

If Claude Code is centrally managed and hooks are ignored, follow [Centrally managed Claude Code](#centrally-managed-claude-code).

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
| `tool_executed` | Shell commands and Claude Code's own tools (Grep, Glob, WebFetch, WebSearch). Subagents with their description, type and model. MCP tools include masked, size-limited arguments. | Shell commands, web searches with their queries, files deleted by edits, subagents with their name, type and model. Other tools include masked, size-limited arguments; some communication tools report their name only. |
| `tool_exit` | Exit code of shell commands. | Same. |
| `file_read`, `file_write` | Files Claude Code reads and edits with its own tools. | Files Codex edits, and images it views. Files Codex reads with shell commands appear as the command. |
| `file_rename` | No. | Yes, for files Codex moves in an edit. |
| `file_open_failed` | Failed reads, except missing files. | No. |
| `net_connect_started` | Only for WebFetch. Connections made by shell commands, such as `curl`, are not seen. | No. Codex's web search and page fetches run on OpenAI's servers. |
| `pii_detection` | Prompts, tool arguments and tool output. Not the system prompt or model replies. | Same. |
| `exec_denied`, `file_access_denied`, `net_denied` | Yes, for the tool calls in [What you get](#what-you-get). | Same. |
| `exec_failed`, `network_activity` | No. | No. |

A subagent's activity appears in the session of the agent that started it, as on Linux.
