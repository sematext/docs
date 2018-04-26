## Integration

- Instructions: [https://apps.sematext.com/ui/howto/JVM/overview](https://apps.sematext.com/ui/howto/JVM/overview)

## Metrics

Metric Name                |  Key                        |  Metric Type  |  Numeric Type  |  Unit   |  Description
---------------------------|-----------------------------|---------------|----------------|---------|---------------------------------
max open files             |  jvm.files.max              |  gauge        |  long          |         |  jvm max open files limit
open files                 |  jvm.files.open             |  gauge        |  long          |         |  jvm currently open files
gc collection count        |  jvm.gc.collection.count    |  counter      |  long          |         |  count of GC collections
gc collection time         |  jvm.gc.collection.time     |  counter      |  long          |  ms     |  duration of GC collections
jvm heap used              |  jvm.heap.used              |  gauge        |  long          |  bytes  |  jvm heap used memory
jvm non-heap used          |  jvm.nonheap.used           |  gauge        |  long          |  bytes  |  jvm non-heap used memory
jvm pool used max          |  jvm.pool.max               |  gauge        |  long          |  bytes  |  jvm pool max memory
jvm pool used              |  jvm.pool.used              |  gauge        |  long          |  bytes  |  jvm pool used memory
jvm threads                |  jvm.threads                |  gauge        |  long          |         |  current jvm thread count
jvm daemon threads         |  jvm.threads.deamon         |  gauge        |  long          |         |  current jvm daemon thread count
jvm peak threads           |  jvm.threads.peak           |  gauge        |  long          |         |  peak jvm thread count
jvm total started threads  |  jvm.threads.started.total  |  gauge        |  long          |         |  total started jvm thread count
