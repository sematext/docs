title: JVM Logs Integration
description: Sematext JVM Logs integration allows you to check grabeg collector logs, times the applications threads were stopped, memory regions size and much more.

To make use of the Sematext JVM Logs integration, you'll need to install the Sematext Agent and configure it to ship garbage collector logs to your JVM Logs App via the [Logs Discovery](../logs/discovery/intro.md). 

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
  alt="Solr G1 GC Report"
  src="../../images/agents/jvm_logs_g1gc.png"
  title="Solr G1 GC Report"
/>

Other built-in reports include:

- **Errors**: breakdown of errors comming from your logs
- **G1GC**: report dedicated to the garbge first garbage collector and its metrics 
- **Meta**: meta and class regions dedicated report
- **Suvrivor Stats**: information regarding the survivor region