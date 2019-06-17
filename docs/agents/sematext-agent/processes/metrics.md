title: Process Monitoring
description: Process Monitoring memory CPU usage

Sematext Agent gathers various metrics and metadata about running processes and brings them to [Sematext Cloud](https://sematext.com/cloud/) so you can painlessly explore the system resources allocated by processes whether they're executing on bare metal machines or scheduled on multi-cluster Kubernetes workloads.

To tweak the frequency of process's metrics delivery to Sematext Cloud, set the interval in the `st-agent.yml` configuration file:

```yaml
# Metric collection interval for processes
process:
  interval: 10s
```

### Metrics

The agent collects top _N_ processes by CPU and memory utilization. The table below includes all available metrics.

| Metric name       | Description |
| ------------------|-------------|
| resident memory   | Represents the resident memory allocated by the process. It comprises the memory allocated for heap and stack areas |
| CPU usage         | Designates the process's CPU utilization in percentage       |   
| fd count          | Is the number of file descriptors allocated by the process     |
| thread count      | Represents the number of threads running in the process's address space  |
| disk read bytes   | Is the amount of bytes that the process fetched from the storage layer     |
| disk write bytes  | Is the amount of bytes which the process sent to the storage layer     |
| read ops          | Is the number of read operations (syscalls, e.g. `read` or `pread`) issued by the process     |
| write ops         | Is the number of write operations (syscalls, e.g. `write` or `pwrite`) issued by the process     |
