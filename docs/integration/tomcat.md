## Metrics

### Report: Request

#### Chart: Data
Metric Name | Metric Description
--- | ---
bytes received | Bytes received by all the request processors running on the Apache Tomcat container (without headers)
bytes sent | Bytes sent by all the request processors running on the Apache Tomcat (without headers)

#### Chart: Processing
Metric Name | Metric Description
--- | ---
processing time | Cumulated processing time

#### Chart: Total
Metric Name | Metric Description
--- | ---
non-error requests | 
error requests | Error count on all the request processors running on the Apache Tomcat container

#### Chart: Requests
Metric Name | Metric Description
--- | ---
request count | Cumulative request count of the Apache Tomcat container
error count | Error count on all the request processors running on the Apache Tomcat container



### Report: Threads

#### Chart: Connections
Metric Name | Metric Description
--- | ---
connection count | The current count of connections handled by this endpoint
max connections | The maximum number of connections that the server will accept and process at any given time

#### Chart: Threads
Metric Name | Metric Description
--- | ---
current threads busy | Thread pool usage. Current worker threads busy count
current thread count | Thread pool usage. Current worker threads count
max threads | Additional threads will be created up to the configured maximum
poller thread count | The number of threads used to poll kept alive connections
acceptor thread count | The number of threads to be used to accept connections



### Report: Executor

#### Chart: Executor Queue
Metric Name | Metric Description
--- | ---
max queue size  | Maximum number of tasks for the pending task queue
queue size | Number of tasks waiting to be processed

#### Chart: Threads
Metric Name | Metric Description
--- | ---
active threads | Number of threads currently processing a task
core pool size | Core size of the thread pool
max threads | Maximum number of allocated threads
min spare threads | Minimum number of allocated threads
pool size | Number of threads in the pool

#### Chart: Tasks
Metric Name | Metric Description
--- | ---
completed task count | Number of tasks completed by the executor



### Report: Jsp

#### Chart: Jsp Counts
Metric Name | Metric Description
--- | ---
jsp loaded count | The number of JSPs that have been loaded into a webapp
jsp reload count | The number of JSPs that have been reloaded
jsp unload count | The number of JSPs that have been unloaded



### Report: WebModule

#### Chart: Web Module Timings
Metric Name | Metric Description
--- | ---
max time | Maximum execution time of all servlets in this context
processing time  | Cumulative execution times of all servlets in this context
min time  | Minimum execution time of all servlets in this context

#### Chart: Web Module Request Counters
Metric Name | Metric Description
--- | ---
error rate (%) | 
error count | Cumulative error count of all servlets in this context
request count | Cumulative request count of all servlets in this context



### Report: Cache

#### Chart: Cache Size
Metric Name | Metric Description
--- | ---
max size | The maximum size of the static resource cache
size | Current size

#### Chart: Cache Usage
Metric Name | Metric Description
--- | ---
hits (%) | 
hits | Number of times the cache was hit
lookups | Number of times the cache was accessed



### Report: DataSource

#### Chart: Data Source Pool Active
Metric Name | Metric Description
--- | ---
max active | The maximum number of active connections that can be allocated from this pool at the same time
num active | Current Active

#### Chart: Data Source Pool Idle
Metric Name | Metric Description
--- | ---
init size | The initial number of connections that are created when the pool is started
max idle | The maximum number of connections that should be kept in the pool at all times
min idle | The minimum number of established connections that should be kept in the pool at all times
num idle | The number of established connections in the pool that are idle



### Report: Session

#### Chart: Session Counters
Metric Name | Metric Description
--- | ---
rejected rate | 
expired rate | 
create rate | 
rejected sessions | How often was a configured maxActiveSessions limit reached
expired sessions | Number of sessions that expired (doesn't include explicit invalidations)
created sessions | Total number of sessions created since startup

#### Chart: Session Timings
Metric Name | Metric Description
--- | ---
session average alive time | Average time an expired session had been alive
session max alive time | Measured from session creation to expiration (be it logout or session idle timeout)
processing time | Total processing time since startup, cumulated elapsed milliseconds needed for session expiration handling.

#### Chart: Sessions Active
Metric Name | Metric Description
--- | ---
active sessions | Number of active sessions at this moment
max active | Max number of concurrent active sessions



