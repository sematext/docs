## Integration

- Instructions: https://apps.sematext.com/ui/howto/Tomcat/overview

## Metrics

Metric Name | Key | Agg | Type | Description
--- | --- | --- | --- | ---
bytes sent | tomcat.requests.transfer.tx.bytes | Sum | Long | Bytes sent by all the request processors running on the Apache Tomcat (without headers)
error requests | tomcat.requests.errors | Sum | Long | Error count on all the request processors running on the Apache Tomcat container
processing time | tomcat.requests.processing.time | Sum | Long | Cumulated processing time
request count | tomcat.requests | Sum | Long | Cumulative request count of the Apache Tomcat container
bytes received | tomcat.requests.transfer.rx.bytes | Sum | Long | Bytes received by all the request processors running on the Apache Tomcat container (without headers)
max connections | tomcat.connections.max | Avg | Long | The maximum number of connections that the server will accept and process at any given time
poller thread count | tomcat.threads.pollers | Avg | Double | The number of threads used to poll kept alive connections
max threads | tomcat.threads.max | Avg | Long | Additional threads will be created up to the configured maximum
current threads busy | tomcat.threads.busy | Avg | Double | Thread pool usage. Current worker threads busy count
current thread count | tomcat.threads | Avg | Double | Thread pool usage. Current worker threads count
connection count | tomcat.connections | Avg | Double | The current count of connections handled by this endpoint
acceptor thread count | tomcat.threads.acceptors | Avg | Double | The number of threads to be used to accept connections
queue size | tomcat.executors.queue.size | Avg | Double | Number of tasks waiting to be processed
max queue size  | tomcat.executors.queue.size.max | Avg | Long | Maximum number of tasks for the pending task queue
completed task count | tomcat.executors.tasks.completed | Sum | Long | Number of tasks completed by the executor
max threads | tomcat.executors.max | Avg | Long | Maximum number of allocated threads
min spare threads | tomcat.executors.spare.min | Avg | Long | Minimum number of allocated threads
pool size | tomcat.executors.pool | Avg | Double | Number of threads in the pool
core pool size | tomcat.executors.core | Avg | Double | Core size of the thread pool
active threads | tomcat.executors.active | Avg | Double | Number of threads currently processing a task
jsp unload count | tomcat.jsp.unloaded | Sum | Long | The number of JSPs that have been unloaded
jsp reload count | tomcat.jsp.reloaded | Sum | Long | The number of JSPs that have been reloaded
jsp loaded count | tomcat.jsp.loaded | Sum | Long | The number of JSPs that have been loaded into a webapp
processing time  | tomcat.web.execution.time.total | Sum | Long | Cumulative execution times of all servlets in this context
max time | tomcat.web.execution.time.max | Avg | Long | Maximum execution time of all servlets in this context
min time  | tomcat.web.execution.time.min | Avg | Long | Minimum execution time of all servlets in this context
error count | tomcat.web.errors | Sum | Long | Cumulative error count of all servlets in this context
request count | tomcat.web.requests | Sum | Long | Cumulative request count of all servlets in this context
max size | tomcat.cache.size.max | Avg | Long | The maximum size of the static resource cache
size | tomcat.cache.size | Avg | Long | Current size
lookups | tomcat.cache.lookups | Sum | Long | Number of times the cache was accessed
hits | tomcat.cache.hits | Sum | Long | Number of times the cache was hit
num active | tomcat.datasource.active | Avg | Double | Current Active
max active | tomcat.datasource.active.max | Avg | Long | The maximum number of active connections that can be allocated from this pool at the same time
init size | tomcat.datasource.init | Avg | Long | The initial number of connections that are created when the pool is started
max idle | tomcat.datasource.idle.max | Avg | Long | The maximum number of connections that should be kept in the pool at all times
num idle | tomcat.datasource.idle | Avg | Double | The number of established connections in the pool that are idle
min idle | tomcat.datasource.idle.min | Avg | Long | The minimum number of established connections that should be kept in the pool at all times
rejected sessions | tomcat.sessions.rejected | Sum | Long | How often was a configured maxActiveSessions limit reached
processing time | tomcat.sessions.processing.time | Sum | Long | Total processing time since startup, cumulated elapsed milliseconds needed for session expiration handling.
created sessions | tomcat.sessions | Sum | Long | Total number of sessions created since startup
expired sessions | tomcat.sessions.expired | Sum | Long | Number of sessions that expired (doesn't include explicit invalidations)
session max alive time | tomcat.sessions.alive.time.max | Avg | Long | Measured from session creation to expiration (be it logout or session idle timeout)
max active | tomcat.sessions.active.max | Avg | Double | Max number of concurrent active sessions
active sessions | tomcat.sessions.active | Avg | Double | Number of active sessions at this moment
session average alive time | tomcat.sessions.alive.time | Avg | Long | Average time an expired session had been alive
