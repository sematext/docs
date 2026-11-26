title: Setting up Autofixer
description: Install the Autofixer skill and set it up for a repository

Setting up Autofixer takes two steps: installing the skill once on your machine, and setting it up once for each repository you want it to work on. Setting up a repository is a conversation with your agent: Autofixer looks around first, then asks only what it couldn't work out on its own.



## Before you start

### Connect the Sematext Cloud MCP Server

Autofixer reads your telemetry through the [Sematext Cloud MCP Server](/docs/mcp/). Follow [Getting Started](/docs/mcp/getting-started/) to connect it to your agent, or let Autofixer do it: if the MCP Server is missing when you set up a repository, Autofixer offers to connect it, asking you for your region (US or EU) and your API key.

!!! warning "Region matters"
    Connect the MCP Server for the region your Sematext Cloud account is in. If you have accounts in both regions, connect both, and tell Autofixer which one reaches which account (see [Several Sematext accounts](#several-sematext-accounts)).

Most agents load new MCP tools only after a restart. After connecting the MCP Server, restart your agent and ask it to set up Autofixer again; it picks up where it left off.

### Supported AI agents

Autofixer works with any coding agent that:

- loads skills in the [Agent Skills](https://agentskills.io) format,
- can read files and run shell commands, and
- can connect to MCP servers.

Agents that can start sub-agents, such as Claude Code, can run several parts of a run at once. Others run them one after another.

Autofixer also needs `git`. For tickets and pull requests, your agent needs access to your issue tracker and code host, for example through their MCP servers or CLIs such as `gh`.



## Installing the skill

Clone the [Autofixer repository](https://github.com/sematext/autofixer) into the directory your agent loads skills from, keeping the folder name `autofixer`. For Claude Code, that's `~/.claude/skills/`:

```bash
git clone https://github.com/sematext/autofixer.git ~/.claude/skills/autofixer
```

For other agents, check where they load skills from.

### Keeping it up to date

Update the skill with `git pull` in its folder:

```bash
git -C ~/.claude/skills/autofixer pull
```

When the skill is newer than a repository's setup, Autofixer says so at the start of a run or fix and suggests a [refresh](#refreshing-the-setup).



## Setting up a repository

Open your agent in the repository and say:

> Set up Autofixer

Setup goes through these steps. If it gets interrupted, ask again and it continues where it stopped.

### What setup discovers

Before asking you anything, Autofixer looks around on its own. This part is quick and cheap.

- **Integrations**: it checks that the Sematext MCP Server, your issue tracker and your code host respond, and tells you what each missing one would cost you.
- **Telemetry**: your Sematext Cloud Apps, and in each Logs App, which field holds the severity and which one names the service. Also which services log how many errors, your traces, deployment events, synthetic monitors and, if you use Network Map, the live connections between your services.
- **Code**: what can be deployed (main packages, Dockerfiles, Helm charts), how to build and test it, and any docs already written for agents, such as `AGENTS.md` or `CLAUDE.md`.

### The interview

Then Autofixer asks only what it couldn't discover, one question at a time, and proposes an answer for each:

1. **Scope**: which repositories and which Sematext Apps belong to this product.
2. **Tracker**: the project, issue type, parent epic, assignee, labels, estimates, the status to move a ticket to once its pull request is open, and the ones that close a ticket as Won't Fix and reopen it.
3. **Conventions**: ticket keys, title prefix, and how branches, commits and pull requests are named. It proposes them from your recent git history.
4. **Autonomy**: how far runs and fixes may go on their own (see [Choosing an autonomy level](#choosing-an-autonomy-level)).
5. **Policies and watchlist**: anything Autofixer must always report, or must never touch.

### The code scan

To write its notes about your architecture, Autofixer needs to read your code once, fully. That uses a lot of tokens, so before it starts, it tells you which directories it would read, how many files that is, and roughly how many tokens it could use, and waits for your answer.

You can skip the scan. Autofixer still works without these notes, but every investigation then has to search the code from scratch, which costs more over time.

During the scan, Autofixer maps your services, how they talk to each other (from the code, the deployment configuration, and the live connections seen in your telemetry), and which service in your telemetry belongs to which code. It asks you about anything it can't place, such as a service in your logs that has no code in the repository.

### Choosing lanes

Autofixer groups your services into [lanes](index.md#lanes-one-service-at-a-time), usually one per significant service or a small group of tightly coupled ones. It uses each service's error volume, so a noisy service never shares a lane with quiet ones, while small, quiet services can share one. It proposes the lanes, and you can change them.

### Connecting your tracker and code host

Autofixer works with whatever tracker and code host your agent can reach, such as Jira and GitHub. Without a tracker, tickets are written as Markdown files in `_autofixer/tickets/`. Without a code host, fixes stop at a local branch, with the pull request description added to the ticket.

### Choosing an autonomy level

You set autonomy separately for runs and for fixes:

| | Options |
|---|---|
| Runs | **Report only**: list what was found, file nothing. **Tickets**: file a ticket for each confirmed bug worth fixing. |
| Fixes | **Branch**: stop at a local branch. **Commit**: commit, don't push. **Pull request**: push and open a pull request. |

Autofixer proposes the most your integrations allow. Autofixer never merges, whatever you choose.

### Reviewing and committing the `_autofixer/` folder

Setup ends with a few checks, such as whether each lane's log filter matches anything. Then comes a **dry census**: how many unclassified errors each lane has, so you can see how much the first run will face. Autofixer also reports what's missing from your telemetry, for example "no deployment events, so a new error can't be narrowed down to one deploy".

Everything setup writes goes into an `_autofixer/` folder in your repository. Review it, then commit everything in it except `_autofixer/local/`, which is personal and ignored by git. Committing it shares it with your team. See [The `_autofixer` folder](autofixer-folder.md) for what's in it.



## Personal settings

### The `local/user.md` file

Some settings differ from one developer to the next: your account in the tracker, your branch prefix, the code host account pull requests are assigned to. These go into `_autofixer/local/user.md`, which is never committed. The shared instructions refer to them as `{user.<key>}`, for example a branch pattern `{user.branch_prefix}_PROJ-123_short-description`, so the shared files read the same for everyone.

```
- name: Jane Doe
- tracker_account: 5570fa:2c02-...
- code_host_account: @me
- branch_prefix: jd
- parallel_briefs: 2
```

### Several Sematext accounts

If your services send telemetry to more than one Sematext account, for example one in the US region and one in the EU region, connect one MCP Server for each and record in `user.md` which one reaches which account. Autofixer then queries the right one for each App.

### Running briefs in parallel

A run is split into self-contained pieces of work, called briefs: one survey per lane and one investigation per candidate. If your agent can start sub-agents, Autofixer runs several briefs at once. `parallel_briefs` sets how many, 2 by default. More is faster but uses up your agent's usage limits sooner, so raise it only if you have room to spare.



## When a teammate joins

Once `_autofixer/` is committed, teammates don't need to set up the repository again. They install the skill and connect the MCP Server. The first time they run or fix anything, Autofixer notices that their `local/user.md` is missing, fills in what it can discover (such as their tracker account), asks for the rest, and writes the file.



## Refreshing the setup

Your system changes: services get added, renamed or removed, and code moves. To bring Autofixer's notes up to date, say:

> Refresh Autofixer

A refresh compares what Autofixer knows with what it finds now: new services without a lane, lane filters that match nothing, docs pointing at code that moved. It also updates the notes to the current skill version's formats. It proposes each change and applies it only once you agree, and it never deletes a classification your team has already made.

Autofixer suggests a refresh on its own when the skill is newer than the repository's setup, and lists notes that haven't been updated in more than three months.
