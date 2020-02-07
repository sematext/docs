title: App Agent
description: App Agent is used for collecting application metrics from JMX, REST APIs, and from databases that support JDBC as well as transaction traces collection and on demand JVM profiling.

The App Agent is open-source, written in Java (but not limited to
monitoring Java!), with a number of built-in integrations available
from the
[sematext-agent-integrations](https://github.com/sematext/sematext-agent-integrations)
repo. You can add your own integrations for monitoring additional
infrastructure and services.  Pull requests welcome!

## Capabilities

The agent communicates with Sematext via HTTPS.  It buffers data on
disk in case it cannot immediately ship it, ensuring data is never
lost.

### Application monitoring

Lightweight and pluggable, this agent comes with a number of out of
the box integrations. It has built-in support for collecting metrics
from JMX, REST APIs, and from databases that support JDBC.

### Tracing

The Sematext Agent can also instrument JVM-based apps using Java bytecode
instrumentation to collect [transaction traces](../../../tracing).

### Profiling

On demand [JVM profiling](../../../monitoring/on-demand-profiling) is built-in and help
you find bottlenecks in your code.

## App Agent Run modes

### Embedded

The [Embedded](spm-monitor-javaagent) mode can be used only for
monitoring JVM-based applications since it runs as a Java Agent
inside the Java process.  With the Embedded monitor, when setting it
up for the first time or when upgrading the monitor, one needs to
change the command-line and restart the process in which the monitor
is running (i.e., the process of the application being monitored), but
once that is done, the monitor runs seamlessly in-process. See [Embedded
Mode](spm-monitor-javaagent) for more info.

### Standalone

In the [Standalone](spm-monitor-standalone) mode the agent runs in a
separate process and can thus be used for monitoring both Java and
non-JVM-based applications. If access to JMX is required and the
application to monitor does not have JMX enabled, one will have to
adjust application's command-line parameters to enable JMX and that
will require application process restart.  However, once that is set
up, subsequent agent updates will not require the application
restart. See [Standalone Mode](spm-monitor-standalone) for
more info.

## Requirements

Java 6 and above.
