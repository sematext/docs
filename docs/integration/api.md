## Metrics

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
