title: The _autofixer folder
description: The files Autofixer reads and writes in your repository, and how to maintain them

Autofixer keeps everything it knows about your repository in an `_autofixer/` folder at the repository's root. This page explains what's in it and how to look after it.



## Why Autofixer keeps notes in your repository

An agent starts every session knowing nothing about your system. Without notes, every run would have to rediscover which service owns which code, which errors are harmless, and which bugs already have tickets, and it would pay for that in time and tokens every time.

The `_autofixer/` folder is Autofixer's memory. Because most of it is committed, it's shared: what one person's run learns, everyone's next run already knows. It's also where you adapt Autofixer to your team: `_autofixer/Instructions.md` overrides the skill wherever the two disagree, so you never need to edit the skill itself.

Most of these files are written for agents rather than people. They're short and dense, with tables and `key: value` lines that are quick to scan, and they point at code instead of copying it. They're still plain Markdown, and you can read and edit them.



## Folder layout

```
_autofixer/
  Instructions.md     repositories, integrations, autonomy, policies, watchlist, style
  Sources.md          the Sematext Cloud Apps Autofixer reads, and how
  repo-docs/          architecture notes: Overview.md, plus one doc per area
  lanes/<lane>.md     one file per lane, with every classified signature
  tickets/            Markdown tickets, only when there's no issue tracker
  .gitignore          ignores local/
  local/              personal, never committed
    user.md           your own settings
    shortlist.md      candidates found but not ticketed yet
    runs/             a log and a working folder for each run
```

### Shared and personal files

Everything except `local/` is committed and shared with your team. The `local/` folder holds your own settings and your own runs' working files, and stays on your machine.

`Instructions.md`, `Sources.md` and every doc in `repo-docs/` open with two lines that tell Autofixer when they need attention:

```
Document updated for skill version: 1.2.0
Last modified at: Nov 19 2026
```

When the skill is newer than the first line, or the date is more than three months old, Autofixer suggests a [refresh](setup.md#refreshing-the-setup).



## Instructions.md

Your repository's rules for Autofixer. Setup writes it from your answers, and you can edit it at any time. It has these sections:

- **Repos**: the repositories Autofixer covers, their roles and default branches. A repository can also be listed as a read-only reference, for example one that holds deployment configuration.
- **Integrations**: the issue tracker (project, issue type, title prefix, parent, assignee, estimates, which statuses to use), the code host, and how tickets, branches, commits and pull requests are named.
- **Autonomy**: how far runs and fixes may go on their own.
- **Policies**: rules that change how Autofixer classifies or ranks things. For example: "service X is being migrated, rank its errors below user-facing ones", or "tickets may contain customer emails; pull requests and commits never do".
- **Watchlist**: things every run must report, whatever their state. For example: "every error from the payment jobs in the last 24 hours".
- **Style**: conventions for code, comments, tickets and pull requests.

Values that differ from one developer to the next are written as `{user.<key>}`, such as `{user.branch_prefix}`, and come from each developer's `local/user.md`.



## Sources.md

The Sematext Cloud Apps Autofixer reads, and for each one:

- its **role**: **Detect** (surveyed for candidates), **Enrich** (read during investigations, to see what the system looked like around an error) or **Not used**,
- for Logs Apps, which field holds the severity and which one names the service,
- the filter that selects errors,
- quirks worth knowing.



## repo-docs/

Architecture notes, written during setup's code scan. `Overview.md` covers:

- the services: their code, where they run, and their telemetry,
- the connections between them: who calls whom, through what, carrying what,
- which service serves which URL,
- how to build and test.

Each area doc covers one lane or group of lanes and ends with **Gotchas**: intentional behaviour that looks like a bug. Where good documentation already exists in your repository, these docs point to it instead of copying it.

Investigations start from these notes rather than from a search of the whole codebase, which makes them faster and cheaper.



## Lane files

One file per lane in `lanes/`. Every file in that folder is included in runs.

### Scope header

The top of each lane file says what the lane covers:

```
- Services: checkout-api, checkout-worker
- Code: services/checkout/
- Docs: repo-docs/Checkout.md
- Logs: Prod Logs (1234), filter: service:(checkout-api OR checkout-worker)
- Traces: checkout-api
```

### Sections

Then five sections, in this order:

| Section | What goes in it |
|---|---|
| Noise | Not a defect of this repository: infrastructure the code already handles correctly, client behaviour, input the code correctly rejects. Hidden from every future run. |
| Rejected | Looked at and dropped, with the reason and a "Revisit if" condition. Comes back automatically when the condition is met. |
| Known issues | Real bugs held back because the fix would cost far more than it saves, with the numbers and a "Revisit if" condition. |
| Ticketed | Has a ticket, filed by Autofixer or anyone else, with its status. |
| Notes | Facts an agent working in this lane needs and can't get from the code or git history: data quirks, cross-service constraints, how to test. |

### Entry formats, with examples

Each entry is one line. It starts with the **signature** and includes its **match**, the Sematext Logs query that selects exactly those lines.

A Noise entry:

```
- Client closed connection | Match: message:"client closed connection" | clients disconnecting mid-upload; the handler stops cleanly and nothing is lost | 2026-11-03
```

A Rejected entry:

```
- Cache warmup took longer than expected | Match: message:"Cache warmup took" | 4 in 15 days, all during node restarts | 2026-11-03 | Revisit if: more than 20 per 7 days
```

A Known issues entry:

```
- Export retry exhausted | Kind: Resilience | Match: message:"export retry exhausted" | Value: 2 per 30 days, one report regenerated by the user, nothing lost, Low | Cost: Costly, needs a schema migration | 2026-11-10 | Revisit if: more than 10 per 30 days, or a report is lost
```

A Ticketed entry:

```
- PROJ-123 - Order total rounded twice | Kind: Bug | Match: message:"order total mismatch" | Done: rounding happens once, in the pricing service | 2026-11-12
```

Once a ticket is fixed, its status says what the fix changed, not the pull request number or review state; those live in the tracker. A later run checks that the fix holds.

Two kinds of entry don't count against the residual:

- An entry whose evidence isn't an error, such as a warning that shows wrong behaviour, has a match ending in `(WARN)` or `(INFO)`.
- A bug found by reading code, with no log line at all, has `Match: - (no log signature)`.

When another lane owns the code behind an entry, the entry ends with `| See: <lane>`.



## Personal files

### user.md

Your own settings: your name, your account in the tracker, the code host account pull requests are assigned to, your branch prefix, which MCP Server reaches which Sematext account, and how many briefs to run in parallel. See [Personal settings](setup.md#personal-settings).

### Shortlist

`local/shortlist.md` holds candidates that are confirmed or found but don't have a ticket yet: because your runs only report, because a run didn't reach them, or because they're waiting on a Diagnosability ticket to add the log line that will pin them down.

### Run logs and run folders

Each run writes a log, `local/runs/<date-time>.md`, which starts with a progress checklist and ends with the [report](using.md#reading-the-run-report). Next to it, a run folder holds the full results of every survey and investigation, saved as soon as each finishes. That's what lets an interrupted run resume without redoing finished work. It's also what lets you file a known issue later without investigating it again.

These files are personal, so they may contain customer identifiers seen in logs. They never contain secrets.



## Markdown tickets

When there's no issue tracker, Autofixer writes tickets as `tickets/AF-1.md`, `tickets/AF-2.md` and so on. They have the same content as tracker tickets, plus a status, kind, lane and creation date at the top. Because they're committed, they follow the identifier rule below in full.



## The identifier rule

Committed files never contain identifiers of your product's users or customers: emails, names, account, user or App IDs, domains, tokens. They describe them instead: "one customer's App", "a status page's custom domain". Your own services' Sematext App IDs are fine. Nothing Autofixer writes ever contains a secret.

Before a run reports, it checks every shared file it changed against this rule.



## Editing these files by hand

You can edit any of these files yourself, and sometimes you should:

- **To correct a classification**, delete the entry or move it to the right section. A deleted entry's signature is back in the residual for the next run.
- **To keep Autofixer away from something**, add a Policy to `Instructions.md`, for example a component another team owns.
- **To make sure something is always reported**, add it to the Watchlist.
- **When a Note contradicts the code**, fix or delete the Note.
- **After a change**, update `Last modified at` in the docs that have it.

Keep the formats: Autofixer reads these files by their structure. For bigger changes, such as reorganizing lanes after an architecture change, ask Autofixer to [refresh](setup.md#refreshing-the-setup) instead.
