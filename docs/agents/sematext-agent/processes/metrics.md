title: Process Monitoring Metrics
description: Process Monitoring memory CPU usage

Sematext Agent gathers various metrics and metadata about running processes and brings them to [Sematext Cloud](https://sematext.com/cloud/) so you can painlessly explore the system resources allocated by processes whether they're executing on bare metal machines, VMs, plain containers or scheduled to run on multi-cluster Kubernetes workloads.

Process collector is enabled by default. You can disable process metrics/metadata collection by setting the following properties:

<div class="mdl-tabs mdl-js-tabs mdl-js-ripple-effect">
 <div class="mdl-tabs__tab-bar">
     <a href="#file-enabled" class="mdl-tabs__tab is-active">Config file</a>
     <a href="#env-enabled" class="mdl-tabs__tab">Env variable</a>
 </div>

 <div class="mdl-tabs__panel is-active" id="file-enabled">
   <pre>
   # st-agent.yml
   process:
     enabled: false
   </pre>
 </div>
 <div class="mdl-tabs__panel" id="env-enabled">
   <pre>
   PROCESS_ENABLED=false
   </pre>
 </div>
</div>

Similarly, to tweak the frequency of the process' data series delivery to Sematext Cloud adjust the following options:

<div class="mdl-tabs mdl-js-tabs mdl-js-ripple-effect">
 <div class="mdl-tabs__tab-bar">
     <a href="#file-interval" class="mdl-tabs__tab is-active">Config file</a>
     <a href="#env-interval" class="mdl-tabs__tab">Env variable</a>
 </div>

 <div class="mdl-tabs__panel is-active" id="file-interval">
   <pre>
   # st-agent.yml
   process:
     interval: 10s
   </pre>
 </div>
 <div class="mdl-tabs__panel" id="env-interval">
   <pre>
   PROCESS_INTERVAL=10s
   </pre>
 </div>
</div>

### Metrics

The agent collects top _N_ processes by CPU and memory utilization. Once process is elected as a top resource consumer, it stays in the top N list for the time slice that has been allocated to it. It is relinquished from the top N list when there is another process with higher resource usage that displaces the current process or it leaves the top N list voluntarily (e.g. no longer detected as a relevant resource consumer).

The table below includes all available metrics.

| Metric name       | Description |
| ------------------|-------------|
| resident memory   | Represents the resident memory allocated by the process. It includes the memory allocated for heap and stack areas |
| CPU usage         | Designates the process' percentage of CPU utilization       |   
| fd count          | Is the number of file descriptors allocated by the process     |
| thread count      | Represents the number of threads running in the process' address space  |
| disk read bytes   | Is the number of bytes that the process fetched from the storage layer     |
| disk write bytes  | Is the number of bytes which the process sent to the storage layer     |
| read ops          | Is the number of read operations (syscalls, e.g. `read` or `pread`) issued by the process     |
| write ops         | Is the number of write operations (syscalls, e.g. `write` or `pwrite`) issued by the process     |
