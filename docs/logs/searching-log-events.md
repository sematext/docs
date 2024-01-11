title: Searching Log Events
description: Search through your data using Elasticsearch API or Logsene CLI, a command line interface for searching through logs with the ability to pipe the output to `awk`, `sed`, `cut`, `sort` and other useful shell commands

<iframe width="800" height="450" src="https://www.youtube.com/embed/TSlp3ru1BNA" frameborder="0" allow="autoplay; encrypted-media" allowfullscreen></iframe>

By connecting to port **80** (or 443, if you want HTTPS) on **logsene-receiver.sematext.com** / **logsene-syslog-receiver.eu.sematext.com** (if using Sematext Cloud Europe), you can use the Elasticsearch API to search through your data, in the same way [you can send it](sending-log-events).

[Logs Apps](https://sematext.com/docs/logs/) comes with its own UI, which integrates nicely with other Sematext Apps, such as [Monitoring](https://sematext.com/spm/) (see the [Monitoring Documentation](../monitoring)). You can correlate data in any Logs App with any other Logs, [Monitoring](https://sematext.com/docs/monitoring/), [Synthetics](https://sematext.com/docs/synthetics/) or [Experience](https://sematext.com/docs/experience/) App by using [Split Screen](https://sematext.com/docs/guide/split-screen/).

<img alt="Sematext Monitoring UI screen" src="/docs/images/logs/logsene-ui.png" title="Sematext Logging UI screen">

You can also use [Kibana](kibana)  or deploy your own UI or custom scripts.

Besides web UI, there's also [Logsene CLI](https://www.npmjs.com/package/logsene-cli), a command line interface for searching through logs, with the ability to pipe the output to `awk`, `sed`, `cut`, `sort` and other useful shell commands.
See [Logsene CLI Introduction](https://blog.sematext.com/2015/07/07/logsene-cli/).
