title: OS metrics
description: Operating system metrics collected by Sematext Agent.

The agent collects basic system metrics including memory usage, CPU utilization, disk I/O statistics, and more. Most metrics are directly pulled from the _procsfs_ every 10 seconds, although it is possible to alter the collection interval by modifying the `st-agent.yml` configuration file and specifying the period along with the time unit:

```yaml
# Metric collection interval for OS, network & container metrics
interval: 20s
```

The following is the detailed breakdown of every single metric tracked by Sematext Agent. Note that disk and network metrics are reported per device.

### Memory

| Metric name       | Description |
| ------------------|-------------|
| total memory      | Represents the overall amount of physical memory available on the system |
| available memory  | Designates the available physical memory for processes to allocate       |   
| used memory       | Is the amount of physical memory allocated by processes     |
| free memory       | Represents the amount of free physical memory     |
| buffered memory   | The amount of physical memory used for file system buffers where temporary raw blocks are allocated before they are flushed to disk|
| cache memory      | Is the amount of physical memory used as cache memory for files read from the disk |
| total swap memory | Represents the total amount of the swap area where inactive memory pages are pushed |
| free swap memory  | Is the the amount of free swap memory |
| swap pages in     | The count of memory pages pulled from the swap area |
| swap pages out    | The count of memory pages swapped to disk |

### CPU

| Metric name       | Description |
| ------------------|-------------|
| user time         | The time processes have spent executing in user space |
| sys time          | The time processes have spent executing in kernel space |
| idle time         | The amount of CPU idle time |
| nice time         | Is the amount of time processes have been executing with nice priority|
| wait time         | Represents the time spent serving I/O requests |
| irq time          | Is the time spent serving hardware interrupts |
| softirq time      | Designates the time spent serving software interrupts (e.g. deferred tasks scheduled by the kernel) |
| steal time        | Is the amount of CPU time desired by a guest virtual machine |

### Disk

| Metric name       | Description |
| ------------------|-------------|
| read bytes        | Is the number of bytes read from the storage layer |
| written bytes     | Is the number of bytes written to the storage layer |
| free bytes        | Represents the number of free bytes for the block device |
| used bytes        | Included the number of used bytes for the block device |

### System load

| Metric name       | Description |
| ------------------|-------------|
| load              | Average number of jobs executing in the kernel's run queue |
| load 5            | Average number of jobs executing in the run queue for the last 5 minutes |
| load 15           | Average number of jobs executing in the run queue for the last 15 minutes |

## Network

| Metric name             | Description |
| ------------------------|-------------|
| received bytes          | Received amount of bytes on the network interface |
| received packets        | Received amount of packets on the network interface |
| received errors         | Received amount of errors on the network interface |
| dropped ingress packets | The amount of dropped inbound packets on the network interface |
| transmitted bytes       | Transmitted amount of bytes on the network interface |
| transmitted packets     | Transmitted amount of packets on the network interface |
| transmitted errors      | Transmitted amount of errors on the network interface |
| dropped egress packets  | The amount of dropped outbound packets on the network interface |
