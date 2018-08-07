title: JVM Monitoring Integration

## Integration

- Instructions: [https://apps.sematext.com/ui/howto/JVM/overview](https://apps.sematext.com/ui/howto/JVM/overview)

## Metrics

Metric Name<br> Key *(Type)* *(Unit)*                                          |  Description
-------------------------------------------------------------------------------|---------------------------------
gc collection count<br>**jvm.gc.collection.count** <br>*(long counter)*        |  count of GC collections
gc collection time<br>**jvm.gc.collection.time** <br>*(long counter)* *(ms)*   |  duration of GC collections
open files<br>**jvm.files.open** <br>*(long gauge)*                            |  jvm currently open files
max open files<br>**jvm.files.max** <br>*(long gauge)*                         |  jvm max open files limit
jvm heap used<br>**jvm.heap.used** <br>*(long gauge)* *(bytes)*                |  jvm heap used memory
jvm non-heap used<br>**jvm.nonheap.used** <br>*(long gauge)* *(bytes)*         |  jvm non-heap used memory
jvm pool used<br>**jvm.pool.used** <br>*(long gauge)* *(bytes)*                |  jvm pool used memory
jvm pool used max<br>**jvm.pool.max** <br>*(long gauge)* *(bytes)*             |  jvm pool max memory
jvm threads<br>**jvm.threads** <br>*(long gauge)*                              |  current jvm thread count
jvm peak threads<br>**jvm.threads.peak** <br>*(long gauge)*                    |  peak jvm thread count
jvm daemon threads<br>**jvm.threads.deamon** <br>*(long gauge)*                |  current jvm daemon thread count
jvm total started threads<br>**jvm.threads.started.total** <br>*(long gauge)*  |  total started jvm thread count