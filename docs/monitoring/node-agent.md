Title: Sematext Node Agent

The Node agent is a lightweight open-source agent for monitoring Node.js
applications.  It is built on top of the open-source [SPM Agent
Framework](https://github.com/sematext/spm-agent) which is the basis
for [MongoDB agent](../integration/mongodb), and [Sematext Docker
Agent](../sematext-docker-agent), as well as
[Nginx](../integration/nginx) and [Apache](../integration/apache)
agents.

### Infrastructure monitoring

Lightweight and pluggable, this agent comes with a number of out of
the box integrations. It has built-in support for collecting metrics
from JMX, REST APIs, and from databases that support JDBC.  

### Installation

```
npm install spm-agent-nodejs
```

### Requirements

Node 4.x and above.

