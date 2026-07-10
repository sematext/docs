title: Sematext Cloud MCP Server
description: An overview of the Sematext Cloud MCP Server and its functionality, as well as examples of how it helps you troubleshoot issues

Sematext Cloud offers many observability solutions, letting you store and analyze your Logs, monitor your Infrastructure, or check which Events happened. While these can be viewed and manually correlated within the UI, you can now also let your AI agent of choice query Sematext Cloud for your data and correlate it.



## About the MCP Server

The [Model Context Protocol](https://modelcontextprotocol.io/) (abbreviated as MCP) is an open standard that lets AI agents such as Claude or ChatGPT connect to external data sources - in this case Sematext Cloud. The Sematext Cloud MCP Server is thus the bridge between your AI agent and your observability data. Instead of copy-pasting logs into a chat or clicking through dashboards yourself, you describe the problem and the agent fetches the relevant logs, metrics, traces, and alerts - and correlates them for you.

The MCP Server has read-only access to your data. Your AI agent can query your logs, metrics, and traces, but it can't modify alert rules, Apps, or anything else in your account, making it safe to use with your preferred AI agent.


### How it works

1. You ask your AI agent a question, like *"Why did our error rate spike at 14:00?"*
2. The agent picks the right tools for the job - it might search your logs, query your metrics, or check which alerts fired.
3. The agent queries Sematext Cloud on your behalf, using your API Key, and combines the results into an answer.



## Features

Currently, the MCP Server gives your AI agents access to the following features:

- Checking your Sematext Cloud Apps to see what's available and which Apps are shipping data
- Searching for logs in your [Logs Apps](../logs/index.md) and providing context for them
- Fetching an overview of how the hosts and containers making up your [Infrastructure](../monitoring/infrastructure.md) are doing
- Querying metrics from your various [Monitoring Apps](../monitoring/index.md) to preemptively detect issues or troubleshoot live ones
- Viewing the [Alerts](../alerts/index.md) you have configured and which ones fired, letting you quickly correlate between different App types
- Browsing your Traces - both the general overview and the individual Traces - to check exactly which services cause errors and under which conditions


### Usage examples

Since the tools which provide these features come with detailed descriptions for the AI agents, you can easily get information about the services you're monitoring by asking questions such as:

- *Hey, we're seeing a spike in errors across our infrastructure. Can you check our logs from the last 24 hours and tell me what's going on? I need to know what kinds of errors we're dealing with, how many there are, and which hosts are affected.*
- *Users are complaining about slow load times. Can you check the traces for any slow requests?*
- *I found a slow trace in our tracing app. Can you find the slowest trace from the last hour and then show me the full span breakdown? I want to see where the time is being spent.*
- *I'm seeing some error traces in our services. Can you find the recent error traces and then check the logs around the same timeframe to see if there are related error messages?*
- *How's our infrastructure looking? Any hosts having issues?*
- *Can you check the health of our web servers? The hostnames start with "web-".*
- *What's the peak memory each of our hosts hit over the past week? I'm sizing instances for next quarter.*
- *I want to understand our alert health. Which of our alert rules have actually fired recently? Are there rules that are configured but never trigger (maybe the thresholds are too loose)? And are there rules firing constantly that we've become numb to?*
- *I think someone disabled some alerts for maintenance last week and forgot to turn them back on. Can you check if we have any disabled alert rules? Especially the high-priority ones, those should never stay off.*
- *We deployed at 14:00 UTC today. Is the error rate worse since then compared to the hour before the deploy?*



### Tools

This is a brief overview of what the specific tools that the MCP Server provides do.

| Tool | What it does |
|------|-------------|
| `list_apps` | Lists all Apps in your account |
| `query_logs` | Searches a Logs App for a specific message within the provided interval |
| `get_log_context` | Fetches logs surrounding a specific log entry to get more context |
| `list_metrics` | Discovers available metric names in an App |
| `list_dimensions` | Discovers tag names and values for filtering and grouping |
| `query_metrics` | Queries metrics as a timeseries or summary |
| `list_alert_rules` | Lists configured alert rule definitions |
| `list_alert_events` | Lists fired alert incidents |
| `list_events` | Lists deployment, infrastructure, and custom events |
| `get_infra_overview` | Snapshot of host and container health |
| `query_traces` | Searches traces by service, duration, status, and attributes |
| `get_trace` | Full span tree for a single trace |
| `get_traces_overview` | Tracing health snapshot with error rate and latency percentiles |



## Setting up the MCP Server

Setting up the MCP Server with your preferred AI agent can be done in under 5 minutes. Depending on which AI provider you use, the setup varies slightly, and you can check out the exact install instructions [here](/docs/mcp/getting-started).
