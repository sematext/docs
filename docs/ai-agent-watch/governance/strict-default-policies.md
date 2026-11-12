title: Strict Policies for Newly Discovered Agents
description: Automatically apply governance restrictions to untrusted AI agents and review them before granting trust

You can apply a set of governance restrictions to newly discovered AI agents automatically. Scope your policies to **Is Trusted Agent is false**: new agents start untrusted, so the restrictions apply without adding each agent to a policy individually.

For example, an organization can restrict unreviewed agents from accessing credential files, running selected commands, or connecting to private networks. After reviewing an agent, an administrator can mark it trusted to remove it from these untrusted-only policies. Policies with other matching scopes continue to apply.

## Can I block everything except specific exceptions?

AI Agent Watch currently supports policies that **block matching operations**. It does not provide an allow-rule mode or an allow rule that overrides a matching block. Consequently, it does not provide a complete allowlist configuration such as:

```text
Block every file path except /project/path
Block every network destination except approved services
```

These describe desired behavior, not configuration syntax. Adding a destination to [Trusted Hosts](../trusted-agents-hosts.md#trusted-hosts) does not exempt it from a network governance policy. Marking an agent trusted exempts that agent from policies scoped to untrusted agents; it does not create path, command, or destination exceptions.

The workflow below establishes automatic restrictions for untrusted agents using the operations you explicitly choose to block. Operations outside those conditions remain unaffected by these policies.

## 1. Prepare a host and define the restrictions

Follow [Governance Compatibility](compatibility.md) to confirm that enforcement is available on the target machine. For macOS and Windows, complete the [coding-agent hook setup](../macos-windows.md).

Decide what an unreviewed agent should be prevented from doing. Start with a specific test host so you can verify the effect before applying the restrictions more broadly.

The following are examples of separate policies. Adapt them to your environment:

| Policy type | Condition | Scope | Intended restriction |
|---|---|---|---|
| File Access | Extension ends with `.pem` | Is Trusted Agent is false | Block access to files with this credential-file suffix. |
| File Access | Extension ends with `.env` | Is Trusted Agent is false | Block access to files with this environment-file suffix. |
| Tool Execution | Binary basename `nc` | Is Trusted Agent is false | Block execution of the netcat binary with this name. |
| Network Activity | CIDR `10.0.0.0/8` | Is Trusted Agent is false | Block matching connections to this private IPv4 range. |

The filename examples do not cover every credential file. The command example does not block every networking tool. The network example can also block legitimate internal services; on workstations, it only checks supported tool-call targets and does not resolve hostnames into IP addresses. See [platform boundaries](#platform-boundaries) before choosing conditions.

## 2. Create and enable the policies

1. Open **AI Agent Watch → Event Alerting → Governance Policies**.
2. Click **Add Policy** and choose the policy type for one restriction.
3. Name the policy and add its condition, using the examples above or your own targets.
4. In **Scope**, select **Is Trusted Agent**, operator **is**, value **false**. For a test deployment, also add **Host Name is** your test host.
5. Save and enable the policy. Repeat for the other restrictions.
6. Optionally configure [alert rules and notifications](policies.md#get-notified-when-a-policy-matches) for the resulting governance events.

Each policy controls one action type. Create separate policies for file access, tool execution, and network activity. Additional scope entries are combined with AND, so a test-host scope restricts enforcement to untrusted agents on that host.

> **Screenshot placeholder — Strict policy scope:** Show an enabled File Access policy for `.pem`, with Is Trusted Agent is false and a test-host scope.

Policies must be enabled to enforce anything. The provided default example policies are disabled until you enable them; add the untrusted-agent scope before using them for this workflow.

## 3. Verify the restrictions

Allow policy changes to reach Sematext Agent; updates can take up to five minutes. On workstations, also run `st-agent ai-agent-watch check` to verify the hooks.

1. Start an untrusted AI agent on the test machine.
2. Ask it to perform an operation matching one test policy. For example, use a harmless test file ending in `.pem` and ask the agent to read it. On a workstation, use a supported file-reading tool rather than assuming a shell command provides the same coverage.
3. Confirm that the operation is refused. In **AI Agent Watch → Governance**, find the corresponding `file_access_denied`, `exec_denied`, or `net_denied` event and inspect the agent, host, and matched condition.
4. Verify the other policy types you plan to use. An allowed action alone does not prove enforcement is working.

When you are satisfied, remove the test-host scope or replace it with the hosts or workloads you want to protect. Keep **Is Trusted Agent is false** on every policy intended for this workflow.

## 4. Apply the restrictions to future agents

There is no separate “make default” switch for this workflow. The enabled policies remain in place, and their untrusted-agent scope covers newly discovered agents that match any additional host, agent-type, or workload scopes.

For account-wide coverage, keep only **Is Trusted Agent is false** in the scope. A policy restricted to one host or namespace does not become a default for agents elsewhere. Detection, policy delivery, host compatibility, and platform coverage still determine when and where enforcement takes effect; this is not a guarantee that every operation is blocked from the instant an unknown process starts.

## 5. Review and trust an agent

Review the agent's identity, host, sessions, and governance events. If it is approved, mark it trusted from the [Detected Agents list](../trusted-agents-hosts.md#trusted-agents). Account owners and admins can change trust status.

The trust change refreshes the account's policies. After the update reaches Sematext Agent, policies scoped to **Is Trusted Agent is false** no longer apply to that agent. Other matching policies continue to apply, and activity collection continues. Verify the resulting behavior rather than assuming a trust change has already reached the host.

Trust applies to the detected agent identity, not every agent belonging to an employee. A different identity, such as another host or version, may need separate review. On macOS and Windows, hook-based trust matching does not distinguish agent versions; see [workstation coverage](../macos-windows.md).

To restore the untrusted-only restrictions, mark the agent untrusted again and allow the policy update to reach the host.

> **Screenshot placeholder — Review and trust:** Show an untrusted agent in Detected Agents and its governance events before changing trust status.

## Platform boundaries

- **Linux:** Governance operates on supported kernel activity and requires BPF-LSM. See [compatibility requirements](compatibility.md).
- **macOS and Windows:** Governance checks known Claude Code and Codex tool calls through hooks. Shell-command checks are best effort. MCP calls and the underlying activity of a command's child processes are not checked. Calls proceed unchecked if Sematext Agent is unavailable or its answer arrives after the hook's deadline. See [workstation limitations](../macos-windows.md#what-you-get).

## What this workflow does and does not provide

| Requirement | Current behavior |
|---|---|
| Automatically restrict newly discovered, untrusted agents | Enabled policies with Is Trusted Agent is false apply to matching agents as they are discovered and policy configuration reaches the host. |
| Exempt a reviewed agent from those restrictions | Mark it trusted; untrusted-only policies stop applying after the update reaches the host. |
| Block everything except specific paths, commands, or destinations | No general allowlist or allow-override mode is available. Define explicit blocking conditions instead. |
| Use Trusted Hosts as governance exceptions | Trust affects event classification and alerting; it does not override network governance policies. |
| Guarantee a sandbox across all platforms | Enforcement is limited to each platform's supported operations and collection mechanism. |

For shorter answers, see the [AI Agent Watch FAQ](../faq.md). For the full policy grammar, see [Governance Policies](policies.md).
