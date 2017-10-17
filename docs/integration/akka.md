## Integration

- Instructions: [https://apps.sematext.com/ui/howto/Akka/overview](https://apps.sematext.com/ui/howto/Akka/overview)

## Metrics

Metric Name | Key | Agg | Type | Description
--- | --- | --- | --- | ---
'collection time' | akka.jvm.gc.collection.time | Sum | Long | 
'collection count' | akka.jvm.gc.collection.count | Sum | Long | 
max | akka.memory.pool.max | Avg | Long | 
committed | akka.memory.pool.committed | Avg | Long | 
used | akka.memory.pool.used | Avg | Long | 
'max' | akka.actor.mailbox.time.max | Max | Long | 
'min' | akka.actor.processing.time.min | Min | Long | 
'max' | akka.actor.processing.time.max | Max | Long | 
'min' | akka.actor.mailbox.time.min | Min | Long | 
'count' | akka.actor.errors | Sum | Long | 
http requests count | tracing.akka.requests | Sum | Long | 
max response time | tracing.akka.requests.time.max | Max | Long | 
50% response time | tracing.akka.requests.time.p50 | Avg | Long | 
min response time | tracing.akka.requests.time.min | Min | Long | 
90% response time | tracing.akka.requests.time.p90 | Avg | Long | 
99% response time | tracing.akka.requests.time.p99 | Avg | Long | 
'loaded' | akka.jvm.classes.loaded.total | Max | Long | 
'currently loaded' | akka.jvm.classes.loaded | Max | Long | 
'unloaded' | akka.jvm.classes.unloaded | Max | Long | 
trace error count | tracing.akka.requests.errors | Sum | Long | 
4xx | tracing.akka.requests.errors.4xx | Sum | Long | 
5xx | tracing.akka.requests.errors.5xx | Sum | Long | 
min value | akka.custom.histogram.min | Min | Long | 
count | akka.custom.counter.count | Sum | Long | 
90% | akka.custom.histogram.p90 | Avg | Long | 
max value | akka.custom.min.max.counter.max | Max | Long | 
99% | akka.custom.histogram.p99 | Avg | Long | 
max value | akka.custom.gauge.max | Max | Long | 
50% | akka.custom.histogram.p50 | Avg | Long | 
min value | akka.custom.min.max.counter.min | Min | Long | 
max value | akka.custom.histogram.max | Max | Long | 
min value | akka.custom.gauge.min | Min | Long | 
'queued tasks' | akka.dispatcher.fj.tasks.queued | Max | Long | 
'core pool size' | akka.dispatcher.executor.pool.core | Max | Long | 
'pool size' | akka.dispatcher.executor.pool | Max | Long | 
'max pool size' | akka.dispatcher.executor.pool.max | Max | Long | 
'active threads' | akka.dispatcher.executor.threads.active | Max | Long | 
'parallelism' | akka.dispatcher.fj.parallelism | Max | Long | 
'processed tasks' | akka.dispatcher.executor.tasks.processed | Max | Long | 
'running threads' | akka.dispatcher.fj.threads.running | Max | Long | 
'min' | akka.router.processing.time.min | Min | Long | 
'min' | akka.router.routing.time.min | Min | Long | 
'min' | akka.router.mailbox.time.min | Min | Long | 
'count' | akka.router.processing.errors | Sum | Long | 
'max' | akka.router.routing.time.max | Max | Long | 
'max' | akka.router.processing.time.max | Max | Long | 
'max' | akka.router.mailbox.time.max | Max | Long | 
