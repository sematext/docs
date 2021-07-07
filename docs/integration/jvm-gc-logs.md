title: JVM Garbage Collector Logs Integration
description: Sematext JVM Garbage Collector Logs integration allows you to check garbage collector logs, times the application's threads were stopped, memory regions size, and much more.

To make use of the Sematext JVM Garbage Collector Logs integration, you'll need to install the [Sematext Agent](../agents/sematext-agent/index.md) and configure it to ship garbage collector logs to your JVM Logs App via the [Logs Discovery](../logs/discovery/intro.md). 

Once data is in, you can explore it via the built-in reports: 

<img
  class="content-modal-image"
  alt="JVM Overview Report"
  src="../../images/agents/jvm_logs_overview.png"
  title="JVM Overview Report"
/>

Be sure to check out the [JVM Monitoring integration](./jvm.md) as well, to get a complete view on your JVM-based application. 

## Exploring Logs

Once the data is in, you can explore it using the built-in reports or create your own. For example, you can use the G1GC report to see the top reasons the garbage collection was triggered, heap used before garbage collection, total heap after garbage collection or the number of G1 garbage collector workers:

<img
  class="content-modal-image"
  alt="JVM G1 GC Report"
  src="../../images/agents/jvm_logs_g1gc.png"
  title="JVM G1 GC Report"
/>

Other built-in reports include:

- **Errors**: breakdown of errors coming from your logs
- **G1GC**: report dedicated to the garbage first garbage collector and its metrics 
- **Meta**: meta and class regions dedicated report
- **Survivor Stats**: information regarding the survivor region

## Alerts 

With the built-in support for alerting you can be notified on any garbage collector metric derivated from your logs, such as the number of full garbage collections, an increasing number of workers, and many, many more. Use the threshold-based alerts or fully rely on anomaly detection to detect the unusual patterns in the metrics coming from your garbage collector logs.

<img
  class="content-modal-image"
  alt="JVM and Solr Split Screen"
  src="../../images/agents/jvm_logs_split.png"
  title="JVM and Solr Split Screen"
/>

