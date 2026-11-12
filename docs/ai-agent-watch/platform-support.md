title: AI Agent Watch Platform Support
description: Compare AI Agent Watch requirements, setup, and capabilities on Linux, macOS, and Windows

AI Agent Watch supports Linux, macOS, and Windows. The operating system and the AI agent determine how activity is collected and which capabilities are available.

## Choose your setup path

| Platform | Where it can be used | Setup |
|---|---|---|
| Linux | Employee workstations, servers, containers, and Kubernetes workloads. | Install Sematext Agent and enable AI Agent Watch for its Infra App. AI agents are discovered automatically. |
| macOS | Employee workstations and other supported macOS hosts. | Only Claude Code and Codex are currently supported. See [configuration instructions](macos-windows.md). |
| Windows | Employee workstations and supported Windows Server hosts. | Only Claude Code and Codex are currently supported. See [configuration instructions](macos-windows.md). |

For supported operating-system releases, see the [Sematext Agent Platform Support Policy](/docs/agents/sematext-agent/platform-support-policy/).

## Linux

The Linux collection path applies to both personal development machines and shared infrastructure. Sematext Agent automatically discovers supported AI agent processes and observes their activity through eBPF; you do not need the macOS/Windows telemetry and hook setup.

- **Activity collection:** AI Agent Watch was introduced in Sematext Agent **4.5.0** and requires Linux kernel **5.8 or newer**. Keep Sematext Agent up to date to collect the latest supported events and model usage.
- **Installation:** Follow [Linux installation](/docs/agents/sematext-agent/linux-installation/) for a workstation or server, or the relevant [Sematext Agent deployment instructions](/docs/agents/sematext-agent/) for containers and Kubernetes.
- **Governance:** Requires Sematext Agent **4.6 or later**, Linux kernel **5.17 or newer**, and BPF-LSM enabled. Check [Governance Compatibility](governance/compatibility.md) before relying on enforcement.

## macOS and Windows

AI Agent Watch supports **Claude Code** and **Codex** on these platforms. Supported Codex use includes the CLI, `codex exec`, and the IDE extension. Claude Code support includes the CLI and the desktop app's Code tab.

- **Sematext Agent:** Version **4.7 or later** is required.
- **Collection:** [Configure the coding agent](macos-windows.md#set-up) to report telemetry to Sematext Agent. Unlike Linux, installing the collector and enabling the Infra App alone does not configure AI-agent activity reporting.
- **Governance and additional scanning:** Configure the coding agent's hooks. Governance checks known tool calls before they run; it does not enforce policy on the underlying operating-system activity.
- **Setup and verification:** Follow [macOS and Windows Setup](macos-windows.md) for the installer command, supported coding-agent versions, managed settings, and checks.

## Capability comparison

The macOS and Windows column applies to Claude Code and Codex after completing their setup. Requirements for each platform are listed above.

| Capability | Linux | macOS and Windows |
|---|---|---|
| Discover AI agents automatically | Yes | No — configure Claude Code or Codex first. |
| Review agent sessions | Yes | Yes |
| See commands and tools used | Yes — includes activity from processes the agent starts. | Yes — tool calls reported by Claude Code or Codex. Activity inside a command is not shown separately. |
| See which files agents access | Yes | Limited — files accessed through supported tools and patches. Shell commands do not produce separate file-read events. |
| See network connections and traffic volume | Yes | Limited — some reported destinations; no traffic volume or connections made inside shell commands. |
| Detect sensitive information | Yes — scans captured outbound content for credentials and personal data. | Yes — scans reported prompts, tool inputs, and tool results. |
| Block actions with governance policies | Yes — blocks matching actions at the operating-system level, including actions from processes the agent starts. Requires [kernel support](governance/compatibility.md); without it, activity is monitored but policies are not enforced. | Limited — configured hooks check supported tool calls. Shell checks are best effort; MCP calls and activity inside commands are not checked. Calls proceed unchecked if Sematext Agent is unavailable or responds too late. See [coverage](macos-windows.md#what-you-get). |
| Track token usage and calculated costs | Yes | Yes |

Event availability depends on the agent and version. See [Captured Events](captured-events.md#platform-coverage) and the [Claude Code/Codex event matrix](macos-windows.md#events-compared-to-linux) for details.
