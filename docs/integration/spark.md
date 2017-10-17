## Integration

- Instructions: [https://apps.sematext.com/ui/howto/Spark/overview](https://apps.sematext.com/ui/howto/Spark/overview)

## Metrics

Metric Name | Key | Agg | Type | Description
--- | --- | --- | --- | ---
last received delay | spark.batches.received.processing.delay | Avg | Long | 
unprocessed batches | spark.batches.unprocessed | Sum | Long | 
running batches | spark.batches.running | Avg | Long | 
receivers | spark.receivers | Avg | Long | 
last received delay | spark.batches.received..scheduling.delay | Avg | Long | 
waiting batches | spark.batches.waiting | Avg | Long | 
last completed delay | spark.batches.completed.scheduling.delay | Avg | Long | 
retained completed batches | spark.batches.completed.retained | Sum | Long | 
total completed batches | spark.batches.completed | Sum | Long | 
last completed delay | spark.batches.completed.processing.delay | Avg | Long | 
active jobs | spark.jobs.active | Avg | Long | 
waiting stages | spark.stages.waiting | Avg | Long | 
driver memory used | spark.driver.disk.used | Avg | Long | 
all jobs | spark.jobs | Avg | Long | 
driver memory used | spark.driver.memory.used | Avg | Long | 
failed stages | spark.stages.failed | Sum | Long | 
driver max memory | spark.driver.memory.total | Avg | Long | 
driver remaining memory | spark.driver.memory.free | Avg | Long | 
running stages | spark.stages.running | Avg | Long | 
executors | spark.executors | Avg | Long | 
cores free | spark.cores.free | Avg | Long | 
worker used memory | spark.worker.memory.used | Avg | Long | 
worker free memory | spark.worker.memory.free | Avg | Long | 
cores used | spark.cores.used | Avg | Long | 
waiting apps | spark.apps.waiting | Avg | Long | 
apps | spark.apps | Avg | Long | 
workers | spark.workers | Avg | Long | 
read ops | spark.executor.hdfs.reads | Sum | Long | 
current pool size | spark.executor.pool.size | Avg | Long | 
write ops | spark.executor.file.writes | Sum | Long | 
large read ops | spark.executor.hdfs.reads.large | Sum | Long | 
complete tasks | spark.executor.tasks.completed | Sum | Long | 
large read ops | spark.executor.file.reads.large | Sum | Long | 
read ops | spark.executor.file.reads | Sum | Long | 
write ops | spark.executor.hdfs.writes | Sum | Long | 
active tasks | spark.executor.tasks.active | Avg | Long | 
read bytes | spark.executor.file.read.bytes | Sum | Long | 
read bytes | spark.executor.hdfs.read.bytes | Sum | Long | 
write bytes | spark.executor.hdfs.write.bytes | Sum | Long | 
write bytes | spark.executor.file.write.bytes | Sum | Long | 
completed | spark.application.stages.completed | Sum | Long | 
failed | spark.application.tasks.failed | Sum | Long | 
total | spark.application.tasks.total | Avg | Long | 
skipped | spark.application.tasks.skipped | Sum | Long | 
active | spark.application.tasks.active | Avg | Long | 
completed | spark.application.tasks.completed | Sum | Long | 
active | spark.application.stages.active | Avg | Long | 
skipped | spark.application.stages.skipped | Sum | Long | 
failed | spark.application.stages.failed | Sum | Long | 
uncompleted apps | spark.applications.uncompleted | Avg | Long | 
output bytes | spark.application.stage.output.bytes | Sum | Long | 
disk bytes | spark.application.stage.disk.bytes.spilled | Sum | Long | 
failed | spark.application.stage.tasks.failed | Sum | Long | 
read bytes | spark.application.stage.shuffle.read.bytes | Sum | Long | 
input bytes | spark.application.stage.input.bytes | Sum | Long | 
output records | spark.application.stage.output.records | Sum | Long | 
memory bytes | spark.application.stage.memory.bytes.spilled | Sum | Long | 
write bytes | spark.application.stage.shuffle.write.bytes | Sum | Long | 
read records | spark.application.stage.shuffle.read.records | Sum | Long | 
input records | spark.application.stage.input.records | Sum | Long | 
active | spark.application.stage.tasks.active | Avg | Long | 
completed | spark.application.stage.tasks.completed | Sum | Long | 
write records | spark.application.stage.shuffle.write.records | Sum | Long | 
disk used | spark.application.rdd.storage.partitions.cached | Avg | Long | 
memory used | spark.application.rdd.storage.memory.used | Avg | Long | 
disk used | spark.application.rdd.storage.disk.used | Avg | Long | 
partitions | spark.application.rdd.storage.partitions | Avg | Long | 
input bytes | spark.application.executor.input.bytes | Sum | Long | 
shuffle write | spark.application.executor.shuffle.write | Sum | Long | 
failed | spark.application.executor.tasks.failed | Sum | Long | 
active | spark.application.executor.tasks.active | Avg | Long | 
duration | spark.application.executor.duration | Sum | Long | 
cores | spark.application.executor.cores | Avg | Long | 
total | spark.application.executor.tasks.total | Sum | Long | 
shuffle read | spark.application.executor.shuffle.read | Sum | Long | 
memory used | spark.application.executor.memory.used | Avg | Long | 
max tasks | spark.application.executor.tasks.max | Max | Long | 
completed | spark.application.executor.tasks.completed | Sum | Long | 
disk used | spark.application.executor.disk.used | Avg | Long | 
mex memory | spark.application.executor.max.memory | Max | Long | 
gc time | spark.application.executor.gc.time | Sum | Long | 
rdd blocks | spark.application.executor.rdd.blocks | Avg | Long | 

## Api Metrics

Metric Name | Key | Agg | Type | Description
--- | --- | --- | --- | ---
completed | spark.application.stages.completed | Sum | Long | 
failed | spark.application.tasks.failed | Sum | Long | 
total | spark.application.tasks.total | Avg | Long | 
skipped | spark.application.tasks.skipped | Sum | Long | 
active | spark.application.tasks.active | Avg | Long | 
completed | spark.application.tasks.completed | Sum | Long | 
active | spark.application.stages.active | Avg | Long | 
skipped | spark.application.stages.skipped | Sum | Long | 
failed | spark.application.stages.failed | Sum | Long | 
uncompleted apps | spark.applications.uncompleted | Avg | Long | 
output bytes | spark.application.stage.output.bytes | Sum | Long | 
disk bytes | spark.application.stage.disk.bytes.spilled | Sum | Long | 
failed | spark.application.stage.tasks.failed | Sum | Long | 
read bytes | spark.application.stage.shuffle.read.bytes | Sum | Long | 
input bytes | spark.application.stage.input.bytes | Sum | Long | 
output records | spark.application.stage.output.records | Sum | Long | 
memory bytes | spark.application.stage.memory.bytes.spilled | Sum | Long | 
write bytes | spark.application.stage.shuffle.write.bytes | Sum | Long | 
read records | spark.application.stage.shuffle.read.records | Sum | Long | 
input records | spark.application.stage.input.records | Sum | Long | 
active | spark.application.stage.tasks.active | Avg | Long | 
completed | spark.application.stage.tasks.completed | Sum | Long | 
write records | spark.application.stage.shuffle.write.records | Sum | Long | 
disk used | spark.application.rdd.storage.partitions.cached | Avg | Long | 
memory used | spark.application.rdd.storage.memory.used | Avg | Long | 
disk used | spark.application.rdd.storage.disk.used | Avg | Long | 
partitions | spark.application.rdd.storage.partitions | Avg | Long | 
input bytes | spark.application.executor.input.bytes | Sum | Long | 
shuffle write | spark.application.executor.shuffle.write | Sum | Long | 
failed | spark.application.executor.tasks.failed | Sum | Long | 
active | spark.application.executor.tasks.active | Avg | Long | 
duration | spark.application.executor.duration | Sum | Long | 
cores | spark.application.executor.cores | Avg | Long | 
total | spark.application.executor.tasks.total | Sum | Long | 
shuffle read | spark.application.executor.shuffle.read | Sum | Long | 
memory used | spark.application.executor.memory.used | Avg | Long | 
max tasks | spark.application.executor.tasks.max | Max | Long | 
completed | spark.application.executor.tasks.completed | Sum | Long | 
disk used | spark.application.executor.disk.used | Avg | Long | 
mex memory | spark.application.executor.max.memory | Max | Long | 
gc time | spark.application.executor.gc.time | Sum | Long | 
rdd blocks | spark.application.executor.rdd.blocks | Avg | Long | 
