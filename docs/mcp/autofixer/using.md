title: Using Autofixer
description: Run Autofixer, fix the tickets it files, and review what it produces

Once a repository is [set up](setup.md), you use Autofixer in two ways. You **run** it from time to time to find bugs and file tickets for them, and you ask it to **fix** tickets, one at a time. This page covers both, and what to do with the results.



## Before every run: preflight

Every run, fix and filing starts with the same quick checks, called preflight. Autofixer:

1. Checks that the Sematext Cloud MCP Server responds.
2. Checks that your issue tracker and code host respond.
3. Reads your personal settings, asking for anything that's missing.
4. Checks that every repository is on its default branch with no local changes, and updates each one from its remote.
5. Checks whether the repository's setup is older than the skill, and whether any notes are more than three months old.

If something fails, Autofixer stops and tells you. For example, if a repository is on a feature branch, it asks before switching. Preflight is the only time a run or fix asks you questions. After that, it works on its own.



## Running Autofixer

### A full run

Open your agent in the repository and say:

> Run Autofixer

A run goes through these phases:

1. **Census**: counts the new, unclassified errors in each lane over the last 7 days. It also collects slow endpoints from your traces and failing synthetic monitors, and checks your watchlist.
2. **Survey**: for each lane with something new, groups the errors into signatures and sorts them. Noise is recorded so it's never looked at again. Real problems in your code become candidates.
3. **Rank**: merges duplicates reported by more than one lane and orders the candidates. Failures users see come first (5xx errors, lost or wrong data), then latency, then background errors, then errors that only show up in logs.
4. **Investigate**: for each candidate, in order, finds the root cause in the code: the exact file and line, and a mechanism that explains everything in the log. It checks recent changes and deployments, and estimates whether the bug is [worth fixing](index.md#deciding-whats-worth-fixing).
5. **Ticket**: files a ticket for each confirmed bug worth fixing, best-ranked first. Known issues are held back and listed in the report instead.
6. **Report**: summarizes everything.

A run doesn't stop at a fixed number of candidates or tickets. It works through everything it found.

### Kinds of issues

Each candidate has a kind, which shapes what its fix looks like:

| Kind | What it means |
|---|---|
| Bug | Your code fails or gives wrong results: uncaught exceptions, 5xx responses, wrong output. |
| Resilience | Something in your infrastructure went wrong (a restart, a dependency down or slow) and your code handled it badly: it lost data, recorded a wrong result, or never retried. |
| Diagnosability | A real, recurring failure whose cause can't be pinned down because the failing input is never logged. The ticket adds the log line that would pin it down. |
| Log hygiene | An expected condition logged as an error at high volume, or a log line that leaks a secret. |
| Latency | A slow endpoint, judged by its latency and request count. |

### Scoped runs

You can narrow a run:

| You say | What runs |
|---|---|
| "Run Autofixer, only lanes payments and checkout" | Every phase, for those lanes only |
| "Run Autofixer, survey only" | Census and survey, then a report of the candidates |
| "Run Autofixer, triage only" | Everything except filing tickets: a report of the confirmed bugs |

### What a run produces

- **Tickets** in your tracker (or as Markdown files), each one complete enough to decide on its own whether it gets fixed:
    - what's happening, with a sample log line, counts and the query used,
    - the root cause, with the file and line,
    - the impact and the value estimate,
    - the proposed fix and how it will be tested.

    Each ticket ends with **implementation notes** for whoever fixes it: the files to change and everything that calls them, what must not change, approaches that were rejected and why, the failing test to write first, and the pitfalls the investigation ran into. With these notes, a fix can start coding right away instead of investigating again.

- **Comments on existing tickets**, when a finding belongs to a ticket that already exists, corrects it, or adds current evidence to it.
- **Updated lane files** in `_autofixer/lanes/`, with every signature the run classified.
- **A run log** in `_autofixer/local/runs/`, which holds the report.

### Reading the run report

The report is where Autofixer hands things over to you. It has these sections:

| Section | What's in it |
|---|---|
| Watchlist | Every hit on your watchlist, whatever its state. These need a person to look at them, even when Autofixer can't fix them. |
| Tickets | Every ticket filed, with its kind and a one-line summary. |
| Known issues | Real bugs held back because the fix would cost far more than it saves, with the numbers, the cost and when to look again. |
| Shortlist | Candidates still open, ranked. |
| Needs engineer review | What Autofixer can't or shouldn't do itself: problems outside your repositories (infrastructure, another team's code), decisions it shouldn't make, leads too weak to be candidates. |
| Shared changes | The committed files the run changed, with a suggested commit message. |
| Usage | What the run cost, compared with the previous run. |
| Proposed changes | Suggested improvements to your `_autofixer/` notes, the MCP Server and the skill itself. |

### Resuming an interrupted run

A run writes its progress to disk as it goes. Each finished piece of work is saved before Autofixer acts on it. If a run stops, because of a usage limit, a crash or a closed laptop, say:

> Continue the Autofixer run

It picks up at the first unfinished step. Nothing that was finished is done again.



## Fixing a ticket

### What a fix session does

Fix one ticket per session, ideally in a fresh one, by naming the ticket:

> Fix PROJ-123

Autofixer then:

1. **Checks the ticket against today's code**, since the code may have changed since the run that filed it.
2. **Checks that it's still worth fixing**, by counting how often the error happened in the last 7 and 30 days and weighing that against what the fix now takes.
3. **Creates a branch** from the freshly updated default branch, named after your conventions.
4. **Lists every caller** of the code it's about to change, so the fix doesn't break something elsewhere.
5. **Writes a failing test first**, wherever the code has tests, and checks that it fails for the right reason. Then it makes the smallest fix that works and runs the lint and tests.
6. **Stays within the ticket.** Other problems it notices get their own tickets, unless they're trivial.
7. **Gets the change reviewed** by a fresh pair of eyes: a separate agent that sees only the diff and the ticket, when your agent supports that. It fixes or explicitly answers each finding.
8. **Commits, pushes and opens a pull request**, as far as your autonomy allows. The pull request describes the evidence, the root cause, the fix, the tests and the review's findings, and links the ticket.
9. **Updates the ticket**: moves it to the status you chose, and adds a comment if the fix ended up different from what the ticket describes.
10. **Updates the lane file** and switches back to the default branch.

### When Autofixer declines to fix (Won't Fix)

If step 2 shows that the bug has become rare and harmless, and the fix is costly (for example a database migration for a failure nobody notices), Autofixer doesn't build it. If its autonomy allows, it closes the ticket as Won't Fix with a comment explaining the numbers, the cost, and when it would be worth revisiting. Otherwise it only recommends that in its report.

### Fixing it anyway

You always have the final say. To build the fix regardless, say:

> Fix PROJ-123 anyway

Autofixer also doesn't second-guess a ticket a person has already decided on: one filed from a known issue on request, or one reopened after a Won't Fix.

### Reviewing an Autofixer pull request

Review it like any other pull request. A few things make it easier:

- The **ticket** explains why the change is needed, with evidence you can check yourself: the log query, the counts, the file and line.
- The **pull request description** lists what the review found and how each finding was handled.
- The **failing test** written first shows the bug, and that the fix resolves it.
- **Ticket comments** call out where the fix differs from the ticket's plan.



## Filing a known issue

A run doesn't file tickets for known issues: real bugs whose fix would cost far more than it saves. They're listed in the run report and in their lane file. If you decide one should be fixed after all, say:

> File the known issue "Timeout calling orders service"

Autofixer re-checks the issue against the current code and counts, and files the ticket. The ticket notes that it was filed on request, so a later fix session won't hold it back again.



## Keeping the notes healthy

### Committing shared changes after a run

Runs and fixes update the shared files in `_autofixer/`, mostly the lane files. The run report lists the changed files with a suggested commit message. Unless your instructions allow Autofixer to commit them itself, review and commit them, so your teammates' runs benefit from what yours learned.

### Correcting a wrong classification

If Autofixer got something wrong, for example it marked a real bug as noise, edit the lane file: delete or move the entry, and the signature is back in the residual for the next run. See [Editing these files by hand](autofixer-folder.md#editing-these-files-by-hand).



## Cost and pacing

### What a run costs

Autofixer runs in your coding agent, so it uses your agent's tokens and usage limits. As a rough guide:

- A lane's first survey takes 60 to 120 tool calls, because every error is new.
- Later surveys take about 40 per lane, plus one or two per new candidate.
- An investigation takes about 40.

The first full run on a large system is the most expensive one. Each run reports what it cost, next to the previous run's figures.

### Usage limits

A first run on a large system can hit your agent's usage limit, especially with several briefs in parallel. Nothing finished is lost: [resume the run](#resuming-an-interrupted-run) once the limit resets. When a brief stops on a usage limit, Autofixer halves how many briefs it runs at once for the rest of the run.

### How runs get cheaper over time

Every signature a run classifies is filtered out of every later run. After the first few runs, most lanes have little or nothing new, and a run mostly confirms that, quickly. How often to run Autofixer depends on how often you ship; after a busy week of releases is a good time.
