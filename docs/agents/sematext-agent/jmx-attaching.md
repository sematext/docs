title: Automatic attaching to JVM processes via JMX
description: Sematext Agent can automatically attach to JVM processes such as Solr, Kafka, and Zookeeper, and expose the JMX port required for monitoring from within the service itself.

When you assign a `MONITORING_TOKEN` to a service running in the JVM via an environment variable or when you enable [automatic monitoring of discovered services](../../monitoring/autodiscovery) for a particular service type, Sematext Agent will examine the process to see whether it can be
monitored right away by checking if JMX ports are already exposed. If it can, Sematext Agent will start monitoring it. However, if it can't, Sematext Agent
will try to add a special and secure agent for the monitored process, whose sole purpose is exposing JMX. Exposed JMX is protected by authentication based on a temporary username and password known only to Sematext Agent.

If JMX is already exposed, but is protected with some authentication mechanism whose credentials are not know to Sematext Agent, the agent will try to expose another JMX connector.

There are cases where automatic attaching may not be desirable:

- if you wish to use a different kind of authentication, maybe with truststore, on an exposed JMX port
- if Sematext Agent attaching logic is failing for some reason, which you would notice by missing metrics and errors in agent logs

### How to disable or configure custom JMX authentication settings?

If you don't want the service monitored at all just remove `MONITORING_TOKEN` env variable from its container. If you want it to be monitored, but using your
own JMX authentication definition (either existing one or the one you will define just for this), [define container jmx settings manually](../../monitoring/manually-setting-jmx-containers).

### Security manager permissions

When running your JVM applications under the supervision of the security manager, you'll have to register the permission to allow Sematext Agent to bootstrap the JMX connector in the target process. For this purpose, add the following permission directive in your policy file:

`permission java.lang.RuntimePermission "accessClassInPackage.com.sun.jndi.url.rmi";`

For instance, Solr 9 has the Security Manager enabled by default. In container deployments the policy file is located in `/opt/solr/server/etc/security.policy`. You can expand this file with the previous `java.lang.RuntimePermission` permission and bind-mount inside Solr container:

`-v /path/to/security.policy:/opt/solr/server/etc/security.policy`
