Title: Spark Monitoring Integration
Monitor your Hadoop ecosystem with Sematext Infrastructure and Application Monitoring SaaS, namely HDFS, MapReduce, YARN, and Spark. Visualize Apache Spark Manager/Master, Worker, Executor, and Driver componenets, and other key metrics reports. Create dashboards and alerts, and send notifications to your devops team through various messaging integrations

## Integration

- Instructions: [https://apps.sematext.com/ui/howto/Spark/overview](https://apps.sematext.com/ui/howto/Spark/overview)

## Metrics

Metric Name<br> Key *(Type)* *(Unit)*                                                                           |  Description
----------------------------------------------------------------------------------------------------------------|-------------
driver disk used<br>**spark.driver.disk.used** <br>*(long gauge)* *(bytes)*                                     |
driver memory max<br>**spark.driver.memory.total** <br>*(long gauge)* *(bytes)*                                 |
driver memory used<br>**spark.driver.memory.used** <br>*(long gauge)* *(bytes)*                                 |
driver memory free<br>**spark.driver.memory.free** <br>*(long gauge)* *(bytes)*                                 |
active driver jobs<br>**spark.jobs.active** <br>*(long gauge)*                                                  |
all driver jobs<br>**spark.jobs** <br>*(long gauge)*                                                            |
failed driver stages<br>**spark.stages.failed** <br>*(long gauge)*                                              |
running driver stages<br>**spark.stages.running** <br>*(long gauge)*                                            |
waiting driver stages<br>**spark.stages.waiting** <br>*(long gauge)*                                            |
executor large file reads<br>**spark.executor.file.reads.large** <br>*(long gauge)*                             |
executor file reads bytes<br>**spark.executor.file.reads.bytes** <br>*(long gauge)* *(bytes)*                   |
executor file reads<br>**spark.executor.file.reads** <br>*(long gauge)*                                         |
executor file writes bytes<br>**spark.executor.file.writes.bytes** <br>*(long gauge)* *(bytes)*                 |
executor file writes<br>**spark.executor.file.writes** <br>*(long gauge)*                                       |
executor large hdfs reads<br>**spark.executor.hdfs.reads.large** <br>*(long gauge)*                             |
executor hdfs reads bytes<br>**spark.executor.hdfs.reads.bytes** <br>*(long gauge)* *(bytes)*                   |
executor hdfs reads<br>**spark.executor.hdfs.reads** <br>*(long gauge)*                                         |
executor hdfs writes bytes<br>**spark.executor.hdfs.writes.bytes** <br>*(long gauge)* *(bytes)*                 |
executor hdfs writes<br>**spark.executor.hdfs.writes** <br>*(long gauge)*                                       |
executor active tasks<br>**spark.executor.tasks.active** <br>*(long gauge)*                                     |
executor completed tasks<br>**spark.executor.tasks.completed** <br>*(long gauge)*                               |
executor used pool size<br>**spark.executor.used.pool.size** <br>*(long gauge)* *(bytes)*                       |
executor max pool size<br>**spark.executor.max.pool.size** <br>*(long gauge)* *(bytes)*                         |
spark apps<br>**spark.apps** <br>*(long gauge)*                                                                 |
waiting apps<br>**spark.apps.waiting** <br>*(long gauge)*                                                       |
spark workers<br>**spark.workers** <br>*(long gauge)*                                                           |
live spark workers<br>**spark.workers.alive** <br>*(long gauge)*                                                |
spark receivers<br>**spark.receivers** <br>*(long gauge)*                                                       |
total completed batches<br>**spark.batches.completed** <br>*(long gauge)*                                       |
unprocessed batches<br>**spark.batches.unprocessed** <br>*(long gauge)*                                         |
waiting batches<br>**spark.batches.waiting** <br>*(long gauge)*                                                 |
running batches<br>**spark.batches.running** <br>*(long gauge)*                                                 |
retained completed batches<br>**spark.batches.completed.retained** <br>*(long gauge)*                           |
total received records<br>**spark.records.received** <br>*(long gauge)*                                         |
total processed records<br>**spark.records.processed** <br>*(long gauge)*                                       |
last completed batch scheduling time<br>**spark.batches.completed.scheduling.delay** <br>*(long gauge)* *(ms)*  |
last completed batch processing time<br>**spark.batches.completed.processing.delay** <br>*(long gauge)* *(ms)*  |
last received batch scheduling time<br>**spark.batches.received.scheduling.delay** <br>*(long gauge)* *(ms)*    |
last received batch processing time<br>**spark.batches.received.processing.delay** <br>*(long gauge)* *(ms)*    |
last received batch records<br>**spark.batches.received.records** <br>*(long gauge)*                            |
worker executors<br>**spark.executors** <br>*(long gauge)*                                                      |
worker cores used<br>**spark.cores.used** <br>*(long gauge)*                                                    |
worker cores free<br>**spark.cores.free** <br>*(long gauge)*                                                    |
worker used memory<br>**spark.worker.memory.used** <br>*(long gauge)* *(bytes)*                                 |
worker free memory<br>**spark.worker.memory.free** <br>*(long gauge)* *(bytes)*                                 |
uncompleted apps<br>**spark.applications.uncompleted** <br>*(long gauge)*                                       |
