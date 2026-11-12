title: AI Agent Watch Platform Support
description: Compare AI Agent Watch requirements, setup, and capabilities on Linux, macOS, and Windows

AI Agent Watch supports Linux, macOS, and Windows. Employee workstations can run any of these operating systems; server and workstation use cases do not determine the collection method. The operating system and the AI agent determine how activity is collected and which capabilities are available.

## Choose your setup path

| Platform | Where it can be used | Setup |
|---|---|---|
| Linux | Employee workstations, servers, containers, and Kubernetes workloads. | Install Sematext Agent and enable AI Agent Watch for its Infra App. Supported AI agents are discovered automatically. |
| macOS | Employee workstations and other supported macOS hosts. | Install Sematext Agent, enable AI Agent Watch, and configure Claude Code or Codex telemetry and hooks. |
| Windows | Employee workstations and supported Windows Server hosts. | Install Sematext Agent, enable AI Agent Watch, and configure Claude Code or Codex telemetry and hooks. |

Start with [Getting Started](getting-started.md). For supported operating-system releases, see the [Sematext Agent Platform Support Policy](/docs/agents/sematext-agent/platform-support-policy/).

## Linux

The Linux collection path applies to both personal development machines and shared infrastructure. Sematext Agent automatically discovers supported AI agent processes and observes their activity through eBPF; you do not need the macOS/Windows telemetry and hook setup.

- **Activity collection:** AI Agent Watch was introduced in Sematext Agent **4.5.0** and requires Linux kernel **5.8 or newer**. Keep Sematext Agent up to date to collect the latest supported events and model usage.
- **Installation:** Follow [Linux installation](/docs/agents/sematext-agent/linux-installation/) for a workstation or server, or the relevant [Sematext Agent deployment instructions](/docs/agents/sematext-agent/) for containers and Kubernetes.
- **Governance:** Requires Sematext Agent **4.6 or later**, Linux kernel **5.17 or newer**, and BPF-LSM enabled. Check [Governance Compatibility](governance/compatibility.md) before relying on enforcement.

For containers and Kubernetes, kernel requirements apply to the host or worker node. A supported Linux workstation uses the same collection and enforcement mechanisms as a supported Linux server.

## macOS and Windows

AI Agent Watch supports **Claude Code** and **Codex** on these platforms. Supported Codex use includes the CLI, `codex exec`, and the IDE extension. Claude Code support includes the CLI and the desktop app's Code tab.

- **Sematext Agent:** Version **4.7 or later** is required.
- **Collection:** Configure the coding agent to report telemetry to Sematext Agent. Unlike Linux, installing the collector and enabling the Infra App alone does not configure AI-agent activity reporting.
- **Governance and additional scanning:** Configure the coding agent's hooks. Governance checks known tool calls before they run; it does not enforce policy on the underlying operating-system activity.
- **Setup and verification:** Follow [macOS and Windows Setup](macos-windows.md) for the installer command, supported coding-agent versions, managed settings, and checks.

## Capability comparison

| Capability | Linux | macOS and Windows |
|---|---|---|
| Agent discovery and activity collection | Automatic discovery and kernel-based observation of supported AI agents. | Configure supported Claude Code or Codex telemetry and hooks. |
| Sessions and tool activity | Observed agent and child-process activity. | Reported coding-agent sessions and tool calls. |
| File activity | Supported kernel file operations. | Supported file tools and patches. Files read inside shell commands are not captured as separate file reads. |
| Network activity | Observed connections and traffic, including byte counts. | Limited reported destinations; no network byte totals or visibility into shell-child connections. |
| PII detection | Scanning of captured outbound content. | Scanning of reported prompts, tool arguments, and hook-reported tool output. |
| Governance | Enforcement of supported kernel operations on compatible hosts, including child-process activity. | Checks of known tool calls. Shell checks are best effort; MCP calls and underlying child-process activity are not checked. |
| Token usage and calculated costs | Supported captured model requests. | Token usage reported by the configured coding agent. |

These are collection boundaries, not a guarantee that every action or model request is captured. Event availability depends on the agent, version, and collection mechanism. See [Captured Events](captured-events.md#platform-coverage) and the [Claude Code/Codex event matrix](macos-windows.md#events-compared-to-linux) for details.

## Governance boundaries

Linux governance requires the kernel support described above. Hosts without it can still provide supported activity data, but should not be treated as enforcing governance policies.

On macOS and Windows, governance depends on the configured coding-agent hooks. Shell-command checks inspect command text on a best-effort basis; they do not observe everything the command or its children do. A call proceeds unchecked if Sematext Agent is unavailable or its answer arrives after the hook's deadline. See [macOS and Windows governance coverage](macos-windows.md#what-you-get).

## Costs across servers and workstations

[Cost Tracking](cost-tracking/index.md) uses captured model token usage, regardless of whether it comes from a workstation or server. Compare agents by host, model, and session in [Cost Reports](cost-tracking/reports.md). Missing usage or pricing can make costs incomplete; see [Pricing and Calculations](cost-tracking/pricing.md#missing-and-partial-costs).
