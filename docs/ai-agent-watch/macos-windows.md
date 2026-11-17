title: AI Agent Watch on macOS, Windows and WSL
description: Set up AI Agent Watch and Governance for Claude Code and Codex on macOS, Windows and WSL

On macOS and Windows, AI Agent Watch gets its data from **Claude Code** and **Codex** themselves. They send their activity to [Sematext Agent](/docs/agents/sematext-agent/) on the same machine and ask it before every tool call, so [Governance](governance/index.md) can block calls that break a policy.

A one-time setup per machine turns this on. It covers every place Claude Code and Codex run on that machine:

- **Terminal:** the Claude Code and Codex CLIs, including `codex exec`
- **Desktop apps:** Claude Code in the Claude desktop app, and the Codex app
- **IDE extensions:** such as the Claude Code and Codex extensions for VS Code
- **WSL:** Claude Code and Codex running inside a WSL distro on Windows

Sessions that run in the cloud, such as Claude Code on the web or Codex cloud tasks, do not run on the machine and are not covered.

On Linux, none of this is needed: Sematext Agent discovers AI agents on its own. See [Platform Support](platform-support.md).

## What you get

- **Activity:** [AI Agent Watch events](captured-events.md) for every session, including token usage, tool calls, and the files Claude Code and Codex read and edit. See [Platform Support](platform-support.md#capability-comparison) for how this compares to Linux.
- **Sensitive data detection:** [PII](pii-categories.md) findings in prompts, tool arguments and tool output. Text is scanned on the machine; only masked findings are sent to Sematext Cloud.
- **Governance:** [policies](governance/policies.md) enforced on Claude Code and Codex tool calls. A blocked call does not run, and both the user and the AI agent see why:

```
Sematext Agent blocked this: governance rule (extension) matches /Users/ann/app/.env. Ask your admin to change the rule.
```

### What Governance checks

Governance checks the tool calls Claude Code and Codex make, not the operating system activity underneath them:

| Tool call | Checked |
|---|---|
| Reading, writing and editing files, Codex patches, viewing images, fetching a URL | Yes. The file or URL is part of the tool call. |
| Shell commands | Best effort. The command text is checked, so `cat .env`, `nc -h` and `curl http://10.1.2.3` are blocked. A command written to hide what it runs, such as a variable (`x=nc; $x`), an interpreter (`python3 -c`) or a script the AI agent writes and then runs, is not. |
| MCP tools and web search | No. |
| What a command's own child processes do | No. |

Treat it as a guardrail for the AI agent's own actions. On Linux, Governance is enforced in the kernel: it checks every program, file and connection the AI agent and the processes it starts use, however the command was written.

If Sematext Agent is stopped or does not answer in time, the tool call goes ahead, so Sematext Agent never blocks a developer's work by being down.

## Before you start

- **Sematext Agent 4.7 or later**, connected to an Infra App with AI Agent Watch enabled. See [Getting Started](getting-started.md), and install the agent on [macOS](/docs/agents/sematext-agent/macos-installation/) or [Windows](/docs/agents/sematext-agent/windows-installation/).
- **Claude Code 2.1.139 or later.**
- **Codex 0.166 or later.** Older versions are still checked by Governance and PII detection, but send no session or usage events.
- **At least one enabled Governance policy that blocks something**, to test the setup with. The default [policies](governance/policies.md) are disabled when AI Agent Watch is enabled; enable one, or create one that blocks `nc`.
- If your organization manages Claude Code settings through **MDM or claude.ai**, also follow [Organization setup](#organization-setup), or Claude Code will ignore the hooks.

## Set up

Run this once per machine. It sets up both Claude Code and Codex, even if they are not installed yet.

=== "macOS"

    In Terminal:

    ```bash
    sudo st-agent ai-agent-watch install
    ```

=== "Windows"

    In PowerShell, run as Administrator:

    ```powershell
    st-agent ai-agent-watch install
    ```

    Use a PowerShell window opened after Sematext Agent was installed, so `st-agent` is on the `PATH`.

    If WSL is installed, the command ends by listing your WSL distros. Claude Code and Codex inside them need their own setup: see the **Windows (WSL)** tab.

=== "Windows (WSL)"

    Claude Code and Codex inside a WSL distro read the distro's own settings, so each distro is set up separately. Sematext Agent keeps running on Windows; nothing is installed in the distro.

    In a normal PowerShell window, as the Windows user who owns the distro:

    ```powershell
    st-agent ai-agent-watch install --wsl Ubuntu
    ```

    Replace `Ubuntu` with your distro's name; `wsl -l -v` lists them. No Administrator rights are needed. Run it as the user, not from an MDM script: WSL keeps distros per Windows user.

    If Claude Code or Codex also runs on Windows itself, set that up too, with the **Windows** tab.

    **WSL2:** Governance and PII detection work as is. Session and usage events need mirrored networking, so Claude Code and Codex in the distro can reach Sematext Agent on Windows. Add this to `%USERPROFILE%\.wslconfig`, then run `wsl --shutdown`:

    ```ini
    [wsl2]
    networkingMode=mirrored
    ```

    Mirrored networking needs Windows 11 22H2 or later. WSL1 needs nothing extra.

The setup keeps every other setting in the files it changes and backs each file up first. Running it again changes nothing.

Start a new Claude Code or Codex session afterwards. Sessions that were already running keep their old settings.

## Verify

1. **Run the check.** Any user can run it:

    ```bash
    st-agent ai-agent-watch check
    ```

    For a WSL distro, add `--wsl Ubuntu`. A working setup shows `pass` for each of Claude Code and Codex:

    ```
    Claude Code  /Library/Application Support/ClaudeCode/managed-settings.json
      runs     /opt/spm/spm-monitor/bin/st-agent hook claude
      pass  a tool call came back refused: Sematext Agent blocked this (check): the hook works.
      up to date
    ```

    The check creates no event. If it fails, see [Troubleshooting](#troubleshooting).

2. **Try a blocked call.** In a new session, ask Claude Code or Codex to do something one of your policies blocks. With a policy on `nc`, ask it to "run the shell command `nc -h`". It must be refused with `Sematext Agent blocked this: governance rule (binary) matches nc.`

    This step proves Claude Code or Codex actually loaded the setup, which the check alone does not. A call that goes through proves nothing: a hook that does not run lets every call through.

3. **See the events.** Within a minute, the AI Agent Watch Overview shows the session, and the blocked call appears in the [Governance report](governance/index.md#governance-report).

If nothing arrives, look in the Sematext Agent log for `AI agent OTLP receiver started` and `AI agent hook endpoint started`. The log is `/opt/spm/spm-monitor/logs/st-agent/st-agent.log` on macOS (read it with `sudo`) and `C:\Windows\System32\config\systemprofile\AppData\Local\sematext-agent\logs\st-agent.log` on Windows.

## Organization setup

Use this section when you deploy settings through claude.ai, Jamf, Intune or Group Policy instead of running `install` on each machine, or when your organization already manages Claude Code or Codex.

=== "Claude Code"

    The same block works on macOS, Windows and WSL:

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
        "PreToolUse": [{"matcher": "*", "hooks": [{"type": "command", "command": "st-agent", "args": ["hook", "claude"], "timeout": 5}]}],
        "PostToolUse": [{"matcher": "*", "hooks": [{"type": "command", "command": "st-agent", "args": ["hook", "claude"], "timeout": 5}]}],
        "PostToolUseFailure": [{"matcher": "*", "hooks": [{"type": "command", "command": "st-agent", "args": ["hook", "claude"], "timeout": 5}]}],
        "UserPromptSubmit": [{"hooks": [{"type": "command", "command": "st-agent", "args": ["hook", "claude"], "timeout": 5}]}]
      }
    }
    ```

    - `st-agent` must be on the `PATH`. The installers add it, and `install --wsl` adds it in WSL. To pin it, use the full path: `/opt/spm/spm-monitor/bin/st-agent` on macOS, `C:\Program Files\Sematext Agent\st-agent.exe` on Windows.
    - To stop users adding hooks of their own, add `"allowManagedHooksOnly": true`.

    ### Where to put it

    Claude Code reads its policy from one managed source. Run `/status` in Claude Code: **Setting sources** names it.

    - **claude.ai server-managed settings or MDM:** add the block there. This is the simplest option when your organization already uses one of them. Claude Code uses only that source, so the managed settings file that `install` writes is ignored, even when the central policy sets a single unrelated key.
    - **Managed settings file:** add the block to `/Library/Application Support/ClaudeCode/managed-settings.json` on macOS, `C:\Program Files\ClaudeCode\managed-settings.json` on Windows, or `/etc/claude-code/managed-settings.json` in WSL, next to any keys already in it. This is the file `install` writes.

    To keep the file that `install` writes and still use a central policy, add `"managedSourcesBehavior": "merge"` to the central policy (Claude Code **2.1.242 or later**). With both MDM and claude.ai, add it to the claude.ai settings, and to MDM too for machines that never receive the claude.ai settings. Setting it in the local file has no effect.

    If your central policy sets its own OpenTelemetry exporter, Claude Code sends its telemetry there, not to Sematext Agent. Governance and PII detection still work; session and usage events do not arrive.

    [Try a blocked call](#verify) in a new session after any change.

=== "Codex"

    Add the block below to Codex's `requirements.toml`. The same block works on macOS, Windows and WSL:

    - macOS and WSL: `/etc/codex/requirements.toml`
    - Windows: `%ProgramData%\OpenAI\Codex\requirements.toml`, or the file the `RequirementsPath` value under `HKLM\SOFTWARE\Policies\OpenAI\Codex` names (Codex 0.164 or later)

    ```toml
    [features]
    hooks = true

    # BEGIN Sematext Agent (st-agent ai-agent-watch install)
    [otel]
    exporter = { otlp-grpc = { endpoint = "http://127.0.0.1:4347" } }
    log_user_prompt = true

    [[hooks.PreToolUse]]
    [[hooks.PreToolUse.hooks]]
    type = "command"
    command = "st-agent hook codex"
    timeout = 5

    [[hooks.PostToolUse]]
    [[hooks.PostToolUse.hooks]]
    type = "command"
    command = "st-agent hook codex"
    timeout = 5

    [[hooks.UserPromptSubmit]]
    [[hooks.UserPromptSubmit.hooks]]
    type = "command"
    command = "st-agent hook codex"
    timeout = 5
    # END Sematext Agent
    ```

    - Keep the `BEGIN` and `END` lines: `install` finds the block by them.
    - `st-agent` must be on the `PATH`, as for Claude Code. To pin it, use `/opt/spm/spm-monitor/bin/st-agent hook codex` on macOS, and add `commandWindows = '''& 'C:\Program Files\Sematext Agent\st-agent.exe' hook codex'''` for Windows.
    - If the file already has `[features]`, add `hooks = true` to it. If it already has `[otel]`, leave ours out; Governance and PII detection still work.
    - To stop user hooks from changing a call after the check, add `allow_managed_hooks_only = true` at the top.
    - A broken file stops Codex from starting, so [try a blocked call](#verify) after every change.

## Optional commands

`ai-agent-watch` can be shortened to `aiaw`. `install` and `remove` need `sudo` on macOS and Administrator on Windows, except with `--wsl` or `--dry-run`.

| Command or option | What it does |
|---|---|
| `install --dry-run` | Shows what would change and writes nothing. |
| `install --claude`, `install --codex` | Sets up only Claude Code or only Codex. Also works with `check` and `remove`. |
| `install --hooks-only` | Sets up Governance and PII detection, and leaves the telemetry settings as they are. |
| `install --wsl <distro>` | Sets up a WSL distro instead of Windows. Also works with `check` and `remove`. |
| `remove` | Takes out what `install` wrote and leaves everything else. |

**After upgrading Sematext Agent**, run `check`. If it says `out of date`, run the `install` command it prints.

**Before uninstalling Sematext Agent**, run `remove`. Codex keeps `hooks = true`, and Claude Code keeps any telemetry setting someone changed after `install`.

## Troubleshooting

### A setup check fails

| Result | What to do |
|---|---|
| `command did not run` | Check that Sematext Agent is installed and the hook command it shows exists. |
| `agent not reachable` | Start Sematext Agent, and check that `aiagent.enabled` and `aiagent.hook.enabled` are not turned off in `st-agent.yml`. |
| `no policy loaded` | Check that AI Agent Watch is enabled for the Infra App and at least one Governance policy that blocks something is enabled. |
| `out of date` | Run the `install` command the check prints, then check again. |

### The check passes, but calls are not blocked

Claude Code is probably getting its policy from MDM or claude.ai and ignoring the local hooks. See [Where to put it](#where-to-put-it).

### Install refuses to update a file

`install` refuses a settings file that ordinary users could change, since they could turn the hooks off. Read the path and reason it prints, then check that file, its parent folders and the Sematext Agent executable:

- On macOS, they must be owned by root and not writable by other users.
- On Windows, they must be owned by an administrator and not let ordinary users change them.
- They must be real files and folders, not symbolic links or Windows junctions.

Fix the reported issue and run `install` again. Files it refuses are left unchanged.

### No events, but blocking works

- Check that the OTLP endpoint is `127.0.0.1:4347`. Sematext Agent drops Claude Code and Codex activity sent to its OpenTelemetry logs ports (4327 and 4328), so prompts never end up in a Logs App.
- In WSL2, turn on mirrored networking. See the **Windows (WSL)** tab under [Set up](#set-up).
- For Codex, check the version is 0.166 or later.

## Ports and turning it off

Sematext Agent listens on `127.0.0.1:4347` (telemetry, gRPC), `127.0.0.1:4348` (telemetry, HTTP) and `127.0.0.1:4349` (hooks). If another process already holds one of these ports, Sematext Agent logs a warning and keeps the ones it could bind.

To turn either off, set it in `st-agent.yml` (`/opt/spm/properties/st-agent.yml` on macOS, `C:\Program Files\Sematext Agent\properties\st-agent.yml` on Windows):

```yaml
aiagent:
  otlp:
    enabled: false
  hook:
    enabled: false
```

Then restart Sematext Agent: `sudo st-agent macos-service restart` on macOS, or `st-agent windows-service restart` in PowerShell as Administrator on Windows. See [macOS](/docs/agents/sematext-agent/macos-installation/#how-to-start-stop-restart-sematext-agent) and [Windows](/docs/agents/sematext-agent/windows-installation/#how-to-start-stop-restart-sematext-agent) for more.
