title: Autofixer FAQ
description: Common questions about Autofixer

### Can Autofixer change anything in my Sematext account or production?

No. Autofixer reads your telemetry through the [Sematext Cloud MCP Server](/docs/mcp/), which has read-only access. It never changes alert rules, Apps or anything else in your account, and it doesn't touch your production systems. The only things it changes are your code (on branches), your issue tracker (tickets and comments) and its own notes in `_autofixer/`, and only as far as the [autonomy](index.md#how-much-autofixer-does-on-its-own) you set allows.

### Will it merge its own pull requests?

No. At most, Autofixer opens a pull request and assigns it to you. Reviewing and merging always stays with a person.

### Which AI agents does it work with?

Any coding agent that loads skills in the [Agent Skills](https://agentskills.io) format, can read files and run shell commands, and can connect to MCP servers. See [Supported AI agents](setup.md#supported-ai-agents).

### Does it work without Jira or GitHub?

Yes. Without an issue tracker, Autofixer writes tickets as Markdown files in `_autofixer/tickets/`. Without a code host, fixes stop at a local branch and the pull request description goes into the ticket. It works with other trackers and code hosts too, as long as your agent can reach them.

### What does it do with customer data it sees in logs?

Your logs may contain customer identifiers, such as emails or account IDs. Autofixer never puts them into anything it commits, its commits or its pull requests. It describes them instead ("one customer's App"). Whether tickets in your issue tracker may carry them, which helps confirm an issue in a customer's account, is set in your repository's instructions. Secrets, such as API keys, tokens and passwords, never go anywhere. See [Safety and privacy](index.md#safety-and-privacy).

### Why did it mark a real bug as a known issue or Won't Fix?

Because its numbers said the fix would cost far more than it saves: a failure nobody notices, or one that's rare and harmless, with a fix that needs something expensive like a database migration or code in another repository. The report and the ticket give the numbers, the cost and when to look again. If you disagree, say "file the known issue …" or "fix PROJ-123 anyway". See [Deciding what's worth fixing](index.md#deciding-whats-worth-fixing).

### How do I make it stop reporting something?

If the error isn't a defect in your code, record it as Noise in its lane file, and no future run will look at it again. If it's out of scope for a while, such as a service being migrated or a component another team owns, add a Policy to `_autofixer/Instructions.md`. See [Editing these files by hand](autofixer-folder.md#editing-these-files-by-hand).

### It stopped at preflight. What now?

Preflight stops when something would make the run or fix unreliable, and tells you why. The common cases:

- **A repository is on another branch, or has local changes.** Commit or stash your work, or let Autofixer switch to the default branch.
- **The Sematext MCP Server doesn't respond.** Check that it's connected and that your API key is valid. A run needs it; a fix can continue from the ticket's notes without it.
- **The tracker or code host doesn't respond.** Reconnect it, or tell Autofixer to continue without it. It then writes Markdown tickets or stops at a local branch, and says so in the report.
- **Your personal settings are missing.** Answer its questions, and it writes `_autofixer/local/user.md` for you.

### A run hit a usage limit. Did I lose the work?

No. A run saves each finished piece of work to disk before acting on it. Once your limit resets, say "Continue the Autofixer run" and it resumes at the first unfinished step. See [Resuming an interrupted run](using.md#resuming-an-interrupted-run).

### How often should I run it?

It depends on how often you ship. A run after a busy week of releases is a good default. The first runs are the most expensive, because every error is new. After that, runs only look at what has changed, so they're quick and cheap, and running more often costs little.

### Does it work with logs that aren't in Sematext Cloud?

No. Autofixer reads telemetry only through the Sematext Cloud MCP Server. If some of your services log elsewhere, ship those logs to Sematext Cloud too, and Autofixer will include them.

### How do I update Autofixer?

Run `git pull` in the skill's folder. When the skill is newer than a repository's setup, Autofixer suggests a [refresh](setup.md#refreshing-the-setup) at the start of the next run or fix.
