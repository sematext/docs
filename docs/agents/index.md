title: Sematext Agents
description: Sematext has several different Agents available for you to monitor your servers, cluster, applications and general infrastructure.

To start monitoring your infrastructure you need to set up the
appropriate Sematext monitoring agent. You can choose from:

  - [Sematext Agent](./sematext-agent/), a lightweight, blazing
    fast Go-based Monitoring Agent with a tiny footprint for both
    infrastructure and containers. It also collects metrics for various
    [integrations](../integration) using App Agents. App Agents can also
    instrument JVM-based apps to collect transaction traces and perform
    [on demand profiling](../monitoring/on-demand-profiling).

  - [Node.js-based App Agent](./node-agent), which can [monitor
    Apache](../integration/apache), [Nginx](../integration/nginx)
    (including [Nginx Plus](../integration/nginxplus)), [Express.js](../integration/express.js), and [Node.js](../integration/node.js) of course.

  - [Browser SDK Agent](./browser), an open source agent that is 
  	able to ship web application related metrics related to user
  	interaction. 