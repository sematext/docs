## Integration

- Instructions: [https://apps.sematext.com/ui/howto/Spark/overview](https://apps.sematext.com/ui/howto/Spark/overview)

## Metrics

Metric Name                           |  Key                                       |  Metric Type  |  Numeric Type  |  Unit   |  Description
--------------------------------------|--------------------------------------------|---------------|----------------|---------|-------------
executor large file reads             |  spark.executor.file.reads.large           |  gauge        |  long          |         |
executor file reads bytes             |  spark.executor.file.reads.bytes           |  gauge        |  long          |  bytes  |
executor file reads                   |  spark.executor.file.reads                 |  gauge        |  long          |         |
executor file writes bytes            |  spark.executor.file.writes.bytes          |  gauge        |  long          |  bytes  |
executor file writes                  |  spark.executor.file.writes                |  gauge        |  long          |         |
executor large hdfs reads             |  spark.executor.hdfs.reads.large           |  gauge        |  long          |         |
executor hdfs reads bytes             |  spark.executor.hdfs.reads.bytes           |  gauge        |  long          |  bytes  |
executor hdfs reads                   |  spark.executor.hdfs.reads                 |  gauge        |  long          |         |
executor hdfs writes bytes            |  spark.executor.hdfs.writes.bytes          |  gauge        |  long          |  bytes  |
executor hdfs writes                  |  spark.executor.hdfs.writes                |  gauge        |  long          |         |
executor active tasks                 |  spark.executor.tasks.active               |  gauge        |  long          |         |
executor completed tasks              |  spark.executor.tasks.completed            |  gauge        |  long          |         |
executor used pool size               |  spark.executor.used.pool.size             |  gauge        |  long          |  bytes  |
executor max pool size                |  spark.executor.max.pool.size              |  gauge        |  long          |  bytes  |
driver disk used                      |  spark.driver.disk.used                    |  gauge        |  long          |  bytes  |
driver memory max                     |  spark.driver.memory.total                 |  gauge        |  long          |  bytes  |
driver memory used                    |  spark.driver.memory.used                  |  gauge        |  long          |  bytes  |
driver memory free                    |  spark.driver.memory.free                  |  gauge        |  long          |  bytes  |
active driver jobs                    |  spark.jobs.active                         |  gauge        |  long          |         |
all driver jobs                       |  spark.jobs                                |  gauge        |  long          |         |
failed driver stages                  |  spark.stages.failed                       |  gauge        |  long          |         |
running driver stages                 |  spark.stages.running                      |  gauge        |  long          |         |
waiting driver stages                 |  spark.stages.waiting                      |  gauge        |  long          |         |
spark apps                            |  spark.apps                                |  gauge        |  long          |         |
waiting apps                          |  spark.apps.waiting                        |  gauge        |  long          |         |
spark workers                         |  spark.workers                             |  gauge        |  long          |         |
live spark workers                    |  spark.workers.alive                       |  gauge        |  long          |         |
spark receivers                       |  spark.receivers                           |  gauge        |  long          |         |
total completed batches               |  spark.batches.completed                   |  gauge        |  long          |         |
unprocessed batches                   |  spark.batches.unprocessed                 |  gauge        |  long          |         |
waiting batches                       |  spark.batches.waiting                     |  gauge        |  long          |         |
running batches                       |  spark.batches.running                     |  gauge        |  long          |         |
last completed batch scheduling time  |  spark.batches.completed.scheduling.delay  |  gauge        |  long          |  ms     |
last completed batch processing time  |  spark.batches.completed.processing.delay  |  gauge        |  long          |  ms     |
retained completed batches            |  spark.batches.completed.retained          |  gauge        |  long          |         |
last received batch scheduling time   |  spark.batches.received.scheduling.delay   |  gauge        |  long          |  ms     |
last received batch processing time   |  spark.batches.received.processing.delay   |  gauge        |  long          |  ms     |
last received batch records           |  spark.batches.received.records            |  gauge        |  long          |         |
total received records                |  spark.records.received                    |  gauge        |  long          |         |
total processed records               |  spark.records.processed                   |  gauge        |  long          |         |
worker executors                      |  spark.executors                           |  gauge        |  long          |         |
worker cores used                     |  spark.cores.used                          |  gauge        |  long          |         |
worker cores free                     |  spark.cores.free                          |  gauge        |  long          |         |
worker used memory                    |  spark.worker.memory.used                  |  gauge        |  long          |  bytes  |
worker free memory                    |  spark.worker.memory.free                  |  gauge        |  long          |  bytes  |
uncompleted apps                      |  spark.applications.uncompleted            |  gauge        |  long          |         |
