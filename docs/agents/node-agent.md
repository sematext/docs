title: Sematext Node Agent
description: Collect Node.js processes' metrics and sends them to Sematext javascript monitoring solution available as npm package

The Node agent is a lightweight open-source agent for [monitoring
Node.js](../integration/node.js) applications.  It is built on top of
the open-source [SPM Agent Framework](https://github.com/sematext/spm-agent).

This agent is still in active use.

### Requirements

Node 4.x and above.

### Deprecated variants

In the past, the same base was used to monitor a few other integrations:

- [MongoDB agent](../integration/mongodb)
- [Nginx](../integration/nginx)
- [Apache](../integration/apache)

These are now monitored with a new, unified [Sematext Agent](./sematext-agent) that provides numerous
other integrations out-of-the-box and enables exciting features like infrastructure monitoring,
auto-discovery and many more.

To install the new agent, just follow the instructions in Sematext Cloud UI.

Before that, uninstall the old Node.js based agent if you were previously using one of:

- https://github.com/sematext/sematext-agent-nginx
- https://github.com/sematext/sematext-agent-httpd
- https://github.com/sematext/spm-agent-mongodb

The old agent was installed as an upstart or a systemd service, depending on your OS. To uninstall it,
just uninstall it like any other service. The names of the services related to these agents are:

- sematext-agent-nginx
- sematext-agent-httpd
- spm-agent-mongodb
