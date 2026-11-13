title: AI Agent Watch FAQ
description: Common questions about default restrictions, agent trust, and governance exceptions

## Can I apply strict policies to every newly discovered agent?

Yes. Create and enable governance policies with **Is Trusted Agent is false** in their scope. New agents start untrusted, so matching policies apply automatically. See [Strict Policies for Newly Discovered Agents](governance/strict-default-policies.md) for the complete setup and verification walkthrough.

## Can I block everything except approved paths or destinations?

AI Agent Watch does not currently provide a general allowlist mode or allow rules that override blocks. You can automatically apply explicit blocking policies to untrusted agents, but this is different from denying every operation except a few exceptions. See [the supported workflow and limitations](governance/strict-default-policies.md#can-i-block-everything-except-specific-exceptions).

## Does marking an agent trusted disable governance?

Only policies scoped to untrusted agents stop applying to that agent after the update reaches the host. Other matching policies remain active, and activity collection continues. See [Review and trust an agent](governance/strict-default-policies.md#5-review-and-trust-an-agent).

## Does a trusted destination bypass a blocking policy?

No. Trusted Hosts helps classify activity and configure alerts; it does not create exceptions to network governance policies. See [what the workflow provides](governance/strict-default-policies.md#what-this-workflow-does-and-does-not-provide).
