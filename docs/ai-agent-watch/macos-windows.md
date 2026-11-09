title: AI Agent Watch on macOS and Windows
description: Set up AI Agent Watch and Governance for Claude Code and Codex on macOS and Windows workstations

AI Agent Watch and [Governance](governance/index.md) work on macOS and Windows workstations for **Claude Code** and **Codex** (the CLI, `codex exec` and the IDE extension). On Linux they need no setup. On macOS and Windows, Claude Code and Codex need a one-time setup per machine, done by an administrator with one command, so they report to Sematext Agent.

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

## Set up

As an administrator, on each machine:

```bash
# macOS
sudo st-agent ai-agent-watch init
```

```powershell
# Windows, in PowerShell run as Administrator
& 'C:\Program Files\Sematext Agent\st-agent.exe' ai-agent-watch init
```

This sets up both Claude Code and Codex: the hooks that let Sematext Agent check each tool call, and the telemetry they send it. `aiaw` is short for `ai-agent-watch`.

- It writes only the machine-wide files: Claude Code's [managed settings](https://code.claude.com/docs/en/managed-settings) and Codex's `requirements.toml`. Every other setting in them stays, and a setting someone else already gave a value, such as `OTEL_LOG_USER_PROMPTS`, keeps it.
- It refuses a file, or a folder above it, that a user could change to turn the hooks off: on macOS one not owned by root or writable by other users, on Windows one not owned by an administrator, one that lets other users change it, or a link or junction. It also refuses when Sematext Agent's own binary is one a user could replace. It also leaves a file that is a link, or that it cannot read, as it is, and says why. On Windows, a folder it creates under `ProgramData` gets permissions that let only administrators add files.
- A file is backed up next to itself before it changes. Running it again changes nothing.
- `--dry-run` shows what would change and writes nothing. `--claude` or `--codex` sets up one of them. `--hooks-only` leaves telemetry alone.
- It sets up Claude Code or Codex even if it is not installed yet; the settings apply once it is.
- It warns when Claude Code will not read the file's hooks: when your organization delivers Claude Code policy through MDM or claude.ai server-managed settings, Claude Code uses that source's hooks only. Set `"managedSourcesBehavior": "merge"` there (Claude Code 2.1.242 or later), and the file's hooks run next to it. The telemetry settings still apply, unless that source sets its own OpenTelemetry exporter: Claude Code takes those settings from one source as a whole.

Then check it, as any user (on Windows, `& 'C:\Program Files\Sematext Agent\st-agent.exe' ai-agent-watch check`):

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

`command did not run` means the hook could not be started, `agent not reachable` that Sematext Agent is not running, or AI Agent Watch or its hook endpoint is off in `st-agent.yml` (`aiagent.enabled`, `aiagent.hook.enabled`). `no policy loaded` means AI Agent Monitoring is off for this app, enforcement is off in `st-agent.yml` (`aiagent.enforcement.enabled`), or no Governance policy blocks anything. The check call creates no event.

**After upgrading Sematext Agent**, run `check`. If it says `out of date`, the new version changed the hooks; run the `init` command it prints.

**Before uninstalling Sematext Agent**, run `sudo st-agent ai-agent-watch remove` (on Windows, as Administrator). It takes out what `init` wrote and leaves everything else. Codex's `[features] hooks = true` stays, as do Claude Code `env` values someone changed after `init`. Claude Code's telemetry settings all stay when the file sends logs somewhere else, and its telemetry switch stays while other telemetry settings use it.

## Set up by hand

For deploying through Jamf, Intune or Group Policy, or to Claude Code policy delivered by MDM or claude.ai, these are the blocks `init` writes.

### Claude Code

1. **Find where Claude Code reads policy from.** Run `/status` in Claude Code; `Setting sources` names it. If your organization delivers Claude Code policy through MDM (a macOS configuration profile or the Windows `HKLM\SOFTWARE\Policies\ClaudeCode` registry value) or through server-managed settings on claude.ai, add `"managedSourcesBehavior": "merge"` there (Claude Code 2.1.242 or later); without it Claude Code skips the hooks in the file in the next step. Adding the hooks block to server-managed settings instead works only when every machine runs the same OS: that one block reaches every machine, and the hook names a per-OS path.
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

- `env` sends Claude Code's activity to Sematext Agent; `hooks` lets Sematext Agent check each tool call. Without `OTEL_LOG_USER_PROMPTS` prompts are not scanned, and without `OTEL_LOG_TOOL_DETAILS` tool calls show their name only.
- `args` makes Claude Code start Sematext Agent directly, with no shell (Claude Code 2.1.139 or later). Without it, Claude Code runs the command in Git Bash on Windows, or in PowerShell when Git for Windows is not installed, and a path that one shell runs, the other does not.
- Users cannot remove these settings. To also stop them from adding hooks of their own, add `"allowManagedHooksOnly": true`.
- Claude Code reads the settings when a session starts.

### Codex

1. **Add this block** to `requirements.toml`: `/etc/codex/requirements.toml` on macOS, `%ProgramData%\OpenAI\Codex\requirements.toml` on Windows. When the `RequirementsPath` value under `HKLM\SOFTWARE\Policies\OpenAI\Codex` names another file, Codex 0.164 or later reads that file instead, and older versions still read the default one. If the file already has a `[features]` table, add `hooks = true` to it instead of adding a second one. Users cannot change these settings.

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
