title: AI-Powered OpenTelemetry Onboarding
description: Use an AI coding agent like Claude Code to instrument your applications with OpenTelemetry and ship telemetry to Sematext Cloud, guided by an open-source skill.

Instrumenting an application with OpenTelemetry has a lot of moving parts — which SDK, which auto-instrumentation package, which endpoint and protocol, which auth header, which signals you actually want to ship. None of it is hard, but all of it is fiddly. Multiply by every service in your stack and the time adds up.

Sematext publishes an open-source [Agent Skill](https://github.com/sematext/sematext-otel-onboarding/blob/main/skills/sematext-otel.md) that walks you through the decisions and assembles the exact configuration for your situation. Load it into [Claude Code](https://docs.claude.com/en/docs/claude-code) (or any AI agent that can read a markdown URL) and answer six short questions; it produces the env-var block ready to paste plus a pointer to a runnable reference example in the [sematext-otel-onboarding](https://github.com/sematext/sematext-otel-onboarding) repo.

## What the skill does

When loaded by an agent, the skill triages your setup through six questions:

1. **Region** — US or EU. Determines which OTLP endpoint to use; tokens are region-bound.
2. **App types** — Tracing, Logs, Monitoring. Any combination. Each App has its own token; the skill only configures signals you're actually wiring up.
3. **Flow** — Sematext managed OTLP endpoint, or the Sematext Agent acting as a local OTLP collector.
4. **Protocol** — HTTP (default, `http/protobuf`) or gRPC.
5. **Language and environment** — Java/Spring Boot, Node.js/Express, Python/Flask, .NET/ASP.NET Core, PHP/Laravel, across baremetal, Docker, or Kubernetes.
6. **Auto or manual instrumentation** — auto covers traces and metrics with no code changes; manual additionally covers logs and lets you add custom spans and attributes.

It then produces the exact env-var block for your case (with the Sematext-specific `X-API-TOKEN` header), suggests where to apply it in your project, and points you at the matching reference example you can use as a known-good baseline.

## How to invoke it

In [Claude Code](https://docs.claude.com/en/docs/claude-code), from your project directory:

```text
Use https://github.com/sematext/sematext-otel-onboarding/blob/main/skills/sematext-otel.md
to instrument this codebase for Sematext.
Region: US. App type: Tracing. Token: <your-tracing-app-token>.
```

(Swap region, App type, and token for your setup. You can paste it without those hints too — the skill will ask.)

Other AI agents that can fetch a URL can load the same skill — it's plain markdown with no Claude-specific behavior.

## What's actually in the skill

The skill file is open source. You can read every line before letting an agent act on it. It contains:

- The endpoint matrix for both regions (US/EU) and both protocols (HTTP/gRPC)
- The full env-var block for the managed OTLP flow, including per-signal `X-API-TOKEN` headers
- The env-var block and port table (4338 traces / 4318 metrics / 4328 logs) for the Sematext Agent flow
- A pointer to the per-language reference example in the same repository, including build/run instructions
- A troubleshooting table covering the common gotchas — region/token mismatch, the Bearer-vs-`X-API-TOKEN` header, auto-instrumentation not shipping logs, CORS for browser-side telemetry, port/protocol mismatches

## What the skill is not

- **Not a replacement for engineering judgment.** It writes the boilerplate that gets your service shipping telemetry. Custom span attributes, business metrics, custom log enrichment — those are still your call.
- **Not magic.** The skill is plain markdown in a public repository. Nothing is hidden; you can audit it before running an agent against it.
- **Not Sematext-specific software.** No vendor agent, no SDK fork, no proprietary tooling. Just documentation that happens to be structured for an AI to act on.

## See also

- [sematext-otel-onboarding repository](https://github.com/sematext/sematext-otel-onboarding) — reference examples for Node.js, Java, Python, .NET, and PHP, plus an end-to-end multi-service example for distributed tracing
- [Creating a Tracing App](../tracing/create-tracing-app.md)
- [OpenTelemetry SDKs](../tracing/sdks/index.md)
- [Sematext Agent OpenTelemetry](../agents/sematext-agent/opentelemetry/index.md)
