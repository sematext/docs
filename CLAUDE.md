# Sematext Documentation Repository

This is the documentation site for Sematext, built with MkDocs and the Material theme.

## Repository Structure

- `docs/` - All documentation markdown files
- `mkdocs.yml` - Site configuration and navigation
- `build_docs.sh` / `deploy_docs.sh` - Build and deployment scripts

## Key Files

- **Release Notes**: `docs/agents/sematext-agent/releasenotes.md`
- **Agent Docs**: `docs/agents/sematext-agent/`
- **Integrations**: `docs/integration/`

## Terminology Conventions

Always use these terms consistently:

| Correct Term | Do NOT Use |
|--------------|------------|
| Log Shipper | Vector |
| Monitoring Agent | App Agent, AA |
| Auto-Discovery | autodisco, service discovery |
| Sematext Agent | st-agent (except in code/config context) |
| Custom Logs | user logs |
| OpenTelemetry / OTel | OT, telemetry |

### Service Names (Always Capitalized)
Elasticsearch, OpenSearch, MySQL, Kafka, Solr, MongoDB, Apache, Nginx, Varnish Cache, ClickHouse, Etcd, CoreDNS, kubelet, kube-proxy

## Release Notes Style Guide

### Format
```markdown
## Version X.X.X

Date: Month D, YYYY

### New Features

- **Feature Name**: Description of what was added and the benefit.

### Improvements

- **Component Name**: What was improved and why it matters.

### Bug Fixes

- Resolved issue where [problem] occurred.
- X no longer [does problematic thing].
- X now [does correct thing].
```

### Section Order
1. New Features
2. Improvements
3. Bug Fixes
4. Action Required Changes (only when needed)
5. Breaking Changes (only when needed)
6. Deprecation Notice (only when needed)
7. Packaging and Installation (only when needed)

### Writing Style
- **New Features / Improvements**: Start with bold feature/component name, then colon, then description
- **Bug Fixes**: Vary the phrasing - use "Resolved...", "X no longer...", "X now..." (avoid starting every line with "Fixed...")
- Use active voice
- Be concise but complete
- Date format: `Month D, YYYY` (e.g., December 23, 2025)

## Private Features (Do Not Include in Public Release Notes)

These features are internal and should not be mentioned in public documentation:
- **Network Map** (netmap, service-catalog, service map)
- **NBPF** (network BPF, eBPF networking features)
- **AI Agent Monitoring** (aiagent, AI agent detection, audit events, LSM enforcement)

When writing release notes, exclude any PRs related to these features.

## Agent Source Repository

The Sematext Agent source code is in `sematext/agent` (private GitHub repo). Use `gh` CLI to fetch PR information:

```bash
gh pr view <number> --repo sematext/agent --json title,body,files
```

## Agents

- `@sta-release-notes` - Generate release notes for a new Sematext Agent version (provide the version number in your message)
