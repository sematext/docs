title: Akka performance monitoring
description: Sematext APM monitoring integration for Akka actors, dispatchers, and routers reports as well as OS, JVM heap, garbage collection, class loading, threads, memory pool, and other real-time visualizations with dashboards, notification channels and alerts.

## Integration

- Instructions: [https://apps.sematext.com/ui/howto/Akka/overview](https://apps.sematext.com/ui/howto/Akka/overview)

## Akka Default Alerts

As soon as you create an Akka App, you will receive a set of default [alert rules](https://sematext.com/docs/guide/alerts-guide/). These pre-configured rules will [notify](https://sematext.com/docs/alerts/alert-notifications/) you of important events that may require your attention, as shown below.

### CPU idle < 5%

This alert rule continuously monitors the CPU idle percentage in an Akka system, triggering a warning (WARN priority) when the CPU idle falls below 5%. The minimum delay between consecutive alerts triggered by this alert rule is set to 10 minutes.

Suppose an Akka system typically operates with CPU idle percentages above 5%. However, due to increased workload, the CPU idle percentage drops below 5%. When this happens, the alert rule  the alert rule triggers a warning.

#### Actions to take

- Review the resource usage of the Akka system to identify the cause of increased CPU usage and decreased idle percentage. This may involve analyzing application load, system configuration, and resource allocation

### Network received anomaly

This alert rule continuously monitors the rate of network data received by an Akka application, checking for anomalies in the received data rate over time. When anomalies are detected, it triggers a warning (WARN priority). The minimum delay between consecutive alerts triggered by this alert rule is set to 10 minutes.

Suppose an Akka application typically receives network data at a consistent rate, but due to network congestion or other issues, the rate of data reception suddenly drops or spikes unexpectedly. When this happens, the alert rule triggers a warning.

#### Actions to take

- Check the status of the network infrastructure to determine if there are any issues such as congestion, packet loss, or connectivity problems affecting data reception
- Review application logs and system metrics for any errors or warnings that may be impacting network data reception

### Network transmitted anomaly

This alert rule continuously monitors the rate of network transmission on the operating system level for Akka applications, checking for anomalies in transmission rates over time. When anomalies are detected, it triggers a warning (WARN priority).

Suppose an Akka application typically maintains a stable rate of network transmission, but due to increased network congestion or connectivity issues, the transmission rate suddenly changes unexpectedly. When this happens, the alert rule checks for anomalies in the network transmission rate over the last hour. Upon detecting the anomaly, the alert rule triggers a warning.

#### Actions to take

- Check for network connectivity issues that may be affecting the transmission rate
- Review network configurations and adjust settings to optimize network performance

You can [create additional alerts](https://sematext.com/docs/alerts) on any metric.


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

## FAQ
** Why are some of the metric charts empty? **

Some of the charts show metrics that are available only if you are using Kamon 0.6.x.  In Kamon 1.x some of those metrics have been removed.
