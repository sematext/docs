title: AI Agent Watch on macOS, Windows and WSL
description: Set up AI Agent Watch and Governance for Claude Code and Codex on macOS, Windows and WSL

AI Agent Watch supports **Claude Code** and **Codex** on macOS and Windows, giving you visibility into their activity, token usage, and costs. [Governance policies](governance/index.md) can also block supported tool calls, such as reading sensitive files or running restricted commands, before they execute.

Configure Claude Code and Codex once on each machine to enable AI Agent Watch for their terminal, desktop, and IDE sessions. If you use WSL, configure each distro separately.

- **Terminal:** the Claude Code and Codex CLIs, including `codex exec`
- **Desktop apps:** Claude Code in the Claude desktop app, and the Codex app
- **IDE extensions:** such as the Claude Code and Codex extensions for VS Code
- **WSL:** Claude Code and Codex running inside a WSL distro on Windows

AI Agent Watch monitors sessions running locally on your machine. Cloud sessions, such as Claude Code on the web or Codex cloud tasks, are not monitored by that installation.

On Linux, none of this is needed: Sematext Agent discovers AI agents on its own. See [Platform Support](platform-support.md).

## What you get

- **Activity:** [AI Agent Watch events](captured-events.md) for every session, including token usage, tool calls, and the files Claude Code and Codex read and edit. See [Platform Support](platform-support.md#capability-comparison) for how this compares to Linux.
- **Sensitive data detection:** Detect sensitive information, such as credentials and personal data, in prompts, tool arguments, and tool output using [PII categories](pii-categories.md). Scanning happens on the machine, and detected values are masked before findings are sent to Sematext Cloud.
- **Governance:** Use [policies](governance/policies.md) to block supported Claude Code and Codex tool calls before they run. When a call is blocked, both you and the coding agent receive an explanation.

### What Governance checks

Governance checks the tool calls Claude Code and Codex make, not the operating system activity underneath them:

| Tool call | Checked |
|---|---|
| Reading, writing and editing files, Codex patches, viewing images, fetching a URL | Yes. The file or URL is part of the tool call. |
| Shell commands | Best effort. The command text is checked, so `cat .env`, `nc -h` and `curl http://10.1.2.3` are blocked. A command written to hide what it runs, such as a variable (`x=nc; $x`), an interpreter (`python3 -c`) or a script the AI agent writes and then runs, is not. |
| MCP tools and web search | No. |
| What a command's own child processes do | No. |

On macOS and Windows, governance checks supported tool calls before they run. It does not monitor or block the underlying operations performed by those calls. On supported Linux hosts, governance works at the kernel level and can also block matching operations performed by processes the AI agent starts.

If Sematext Agent is unavailable or does not respond before the hook times out, the tool call proceeds without a governance check.

## Before you start

- **Sematext Agent 4.7 or later.** See [Getting Started](getting-started.md) and the installation instructions for [macOS](/docs/agents/sematext-agent/macos-installation/) or [Windows](/docs/agents/sematext-agent/windows-installation/).
- **Claude Code 2.1.139 or later.**
- **Codex 0.166 or later.** Older versions are still checked by Governance and PII detection, but send no session or usage events.
- **An enabled governance policy to verify blocking.** The [default example policies](governance/policies.md#default-example-policies) are disabled by default. Review and enable one, or create a test policy that blocks a tool call you can safely try, such as running `nc -h`.
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

    Open a new PowerShell window after installing Sematext Agent so it recognizes the `st-agent` command.

    If you use Claude Code or Codex inside WSL, follow the **Windows (WSL)** tab to configure each distro separately.

=== "Windows (WSL)"

    Configure each WSL distro where you use Claude Code or Codex. Sematext Agent runs on Windows, so you do not need to install it inside WSL.

    Open a regular PowerShell window from the Windows account you use for WSL. You do not need to run it as Administrator. Run:

    ```powershell
    st-agent ai-agent-watch install --wsl Ubuntu
    ```

    Replace `Ubuntu` with your distro's name. Run `wsl -l -v` to list your distros, and repeat the setup command for each one you use.

    If you also use Claude Code or Codex directly on Windows, complete the setup in the **Windows** tab as well.

    **Additional setup for WSL2**

    On Windows 11 22H2 or later, enable mirrored networking by adding the following to `%USERPROFILE%\.wslconfig`. If the file already contains a `[wsl2]` section, add the setting under that section.

    ```ini
    [wsl2]
    networkingMode=mirrored
    ```

    Save the file, then run `wsl --shutdown` in PowerShell. This stops all running WSL distros. Reopen your distro for the change to take effect.

    WSL1 does not require this additional configuration.

After running the setup command, start a new Claude Code or Codex session for the changes to take effect. Existing sessions continue using their previous configuration.

## Verify

1. **Check the governance hooks.** Run:

    ```bash
    st-agent ai-agent-watch check
    ```

    For WSL, specify your distro:

    ```powershell
    st-agent ai-agent-watch check --wsl Ubuntu
    ```

    Look for `pass` for each coding agent you configured. This confirms that the hook can reach Sematext Agent and receive a blocking response. The check requires an enabled governance policy and does not create an event. If it fails, see [Troubleshooting](#troubleshooting).

2. **Confirm blocking in a new session.** Ask Claude Code or Codex to make a tool call that matches an enabled policy. For example, if your policy blocks `nc`, ask it to run `nc -h`.

    The call should be blocked with an explanation from Sematext Agent. This confirms that the coding agent loaded the hooks for the session.

3. **Confirm activity and token usage in Sematext Cloud.** Open the AI Agent Watch Overview and look for the new session. Check the [Governance report](governance/index.md#governance-report) for the blocked call. After the session makes a model request that reports usage, check [LLM Usage](cost-tracking/reports.md#llm-usage) for its token counts.

    If blocking works but activity or token usage is missing, see [No events, but blocking works](#no-events-but-blocking-works).

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

Check the Sematext Agent log for `AI agent OTLP receiver started` and `AI agent hook endpoint started`:

- **macOS:** `/opt/spm/spm-monitor/logs/st-agent/st-agent.log` (read it with `sudo`).
- **Windows:** `C:\Windows\System32\config\systemprofile\AppData\Local\sematext-agent\logs\st-agent.log`.

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
