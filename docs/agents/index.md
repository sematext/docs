title: Sematext Agents
description: Sematext has several different Agents available for you to monitor your servers, cluster, applications and general infrastructure.

To start monitoring your infrastructure you need to set up the
appropriate Sematext monitoring agent. You can choose from:
  
  - [Sematext Agent](../agents/sematext-agent/), a lightweight, blazing 
    fast Go-based Monitoring Agent with a tiny footprint for both 
    infrastructure and containers.

  - [Sematext Infra & App Agent](spm-client) (aka SPM Client or SPM
    Monitor). The Infra Agent collects OS & Network metrics.
    The App Agent collects application metrics. The App Agent
    can run in [embedded](spm-monitor-javaagent)
    (aka Java agent-based, aka in-process) or
    [standalone](spm-monitor-standalone) mode.  This agent can also
    instrument JVM-based apps to collect transaction traces and
    perform [on demand profiling](on-demand-profiling).

  - [Node.js-based App Agent](node-agent), which can [monitor
    Apache](../integration/apache) and [Nginx](../integration/nginx)
    (including [Nginx Plus](../integration/nginxplus)).

  - Sematext Docker Agent (Deprecated), which can collect not
    only container and host metrics, but also container events and
    also logs, it can parse and structure out of the box.

