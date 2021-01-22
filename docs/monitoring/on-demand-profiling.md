title: On Demand Profiling
description: Run on demand profiling, detect app hotspots and profile JVM-based based applications such as Spark, Elasticsearch, Solr, Kafka, Hadoop, Storm, Cassandra, HBase, etc.

On-demand profiling is a feature of the [App Agent](../agents/sematext-agent/app-agent), included in the Sematext Agent package,  that
lets you profile your own [JVM-based applications](https://sematext.com/java-monitoring/) or even any 3rd party
[JVM-based applications](https://sematext.com/java-monitoring/) (e.g. Spark, Elasticsearch, Solr, Kafka,
Hadoop, Storm, Cassandra, HBase, etc.).

**Notes**:

  - Profiling is different from [Transaction Tracing](../tracing).  Profiling is something
    you run on demand, for a short period of time, on a specific
    app/server.  It detects application hotspots, just like a typical
    profiler.  Transaction Tracing traces individual *transactions*,
    such as HTTP requests, and shows slow parts of each such transaction
    trace.  Once enabled, it traces continuously.  Using a profiler and
    having Transaction Tracing is not exclusive - one can use both.
  - The profiler does not require you to enable it in the monitoring
    agent.  It requires no restarts.  It works with both
    [embedded](../agents/sematext-agent/app-agent/spm-monitor-javaagent) and
    [standalone](../agents/sematext-agent/app-agent/spm-monitor-standalone) agent.
  - [Sematext Agent](../agents/sematext-agent) (aka SPM client) version 1.29.2 or greater is required.
  - Anything that runs in the [JVM](https://sematext.com/java-monitoring/) can be profiled - Java, Scala,
    Clojure, Groovy, JRuby, JPython, etc.

**Known issues**:

  - In order to profile Elasticsearch server you must enable remote JMX
    connection (as described [standalone monitor setup instructions page](../agents/sematext-agent/app-agent/spm-monitor-standalone)) and
    set SPM\_MONITOR\_JMX\_PARAMS property in a .properties file under
    the /opt/spm/spm-monitor/conf/ directory.

**Resources**:

  - <https://sematext.com/blog/on-demand-java-profiling/>
