title: Automatic attaching to Java processes in container environments
description: Sematext Agent can automatically attach to Java processes (Solr, Kafka, Zookeeper...) and expose JMX port required for monitoring from within the service itself

When you assign a `MONITORING_TOKEN` to a Java service (e.g. via env variable), Sematext Agent will examine the process to see whether it can be
monitored right away (i.e check if JMX ports are already exposed). If it can, Sematext Agent will start its monitoring. However, if it can't, Sematext Agent
will try to inject into monitored process a special agent which has the sole purpose of opening a JMX port. JMX port opened in such way is
protected by authentication based on temporary username and password known only to Sematext Agent.

If JMX port is already open, but is protected with some authentication mechanism, Sematext Agent will try to open another JMX port anyway (it can't connect to the service
on exposed port since it doesn't have authentication credentials).

There are cases where automatic attaching may not be desirable:
- if you wish different kind of authentication (e.g. with truststore) to be used on exposed jmx port
- if Sematext Agent attaching logic is failing for some reason (you would notice that by missing metrics and errors in agent logs)


### How to disable or configure custom jmx authentication settings?

If you don't want the service monitored at all just remove `MONITORING_TOKEN` env variable from its container. If you want it to be monitored, but using your
own JMX authentication definition (either existing one or the one you will define just for this), [define container jmx settings manually](../../monitoring/manually-setting-jmx-containers).

