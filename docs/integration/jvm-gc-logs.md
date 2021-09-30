title: JVM Garbage Collector Logs Integration
description: Sematext JVM Garbage Collector Logs integration allows you to check garbage collector logs, times the application's threads were stopped, memory regions size, and much more.

To make use of the Sematext JVM Garbage Collector Logs integration, you'll need to install the [Sematext Agent](../agents/sematext-agent/index.md) and configure it to ship garbage collector logs via the [Logs Discovery](../logs/discovery/intro.md). You will want to create or select an existing JVM Logs App because that is what will provide you with all the out of the box dashboards and alerts, some of which you can see below.

Once data is in, you can explore it via the built-in reports: 

<img
  class="content-modal-image"
  alt="JVM Overview Report"
  src="../../images/agents/jvm_logs_overview.png"
  title="JVM Overview Report"
/>

Sematext can also collect JVM performance metrics in addition to extracting valuable data about garbage collection from the JVM logs. For monitoring JVM performance check out the [JVM Monitoring integration](./jvm.md).  These two integrations will give you a complete insight about your JVM-based applications. 

## Exploring Logs

You can explore garbage collection performance using the built-in reports or create your own. For example, you can use the G1GC report to see the top reasons the garbage collection was triggered, heap used before garbage collection, total heap after garbage collection or the number of G1 garbage collector workers:

<img
  class="content-modal-image"
  alt="JVM G1 GC Report"
  src="../../images/agents/jvm_logs_g1gc.png"
  title="JVM G1 GC Report"
/>

Other built-in reports include:

- **CMS**: several dedicated reports for threads stopping and stopped, survivors, timing and generations.
- **G1**: details, phases and regions related to G1GC, each in a dedicated report.

## Correlation with Metrics

For quick root-cause analysis use the [Split Screen](https://sematext.com/docs/guide/split-screen/) feature.  This will enable you to correlate metrics calculated from the JVM garbage collector logs with metrics from the JVM that your application is running in.

<img
  class="content-modal-image"
  alt="JVM and Solr Split Screen"
  src="../../images/agents/jvm_logs_split.png"
  title="JVM and Solr Split Screen"
/>

## Alerts 

With the built-in support for [alerting](https://sematext.com/docs/alerts/) you can be notified on any garbage collector metric derivated from your logs, such as the number of full garbage collections, an increasing number of workers, and many, many more. Use the threshold-based alerts or fully rely on anomaly detection to detect the unusual patterns in the metrics coming from your garbage collector logs.

<img
  class="content-modal-image"
  alt="JVM Logs Alerts Creation"
  src="../../images/agents/jvm_logs_alerts.png"
  title="JVM Logs Alerts Creation"
/>
