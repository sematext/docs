title: Container metrics
description: Container metrics, docker, rkt, containerd, cgroupfs

Sematext Agent offers an unified and agnostic approach to container engine monitoring and visibility. Containers are discovered from _cgroupfs_ hierarchies and all the metrics are directly fetched from accounting data that is exposed through _cgroup_ controllers. We have support for Docker, rkt and containerd container runtimes.

## Metrics

The following table recaps all the metrics shipped by the agent.

### Memory

| Metric name           | Description |
| ----------------------|-------------|
| resident memory usage | Represents container resident memory usage in bytes |
| cache memory          | Is the amount of memory allocated for page cache. The total amount of memory consumed by a container is the sum of RSS + cache memory |   
| memory fail counter   | Is the number of times that memory cgroup limit was exceeded |
| memory limit          | Designates the max allowed memory limit for the container cgroup  |
| memory pages in       | The number of events each time the page is accounted to the container cgroup|
| memory pages out      | Is the number of events each time a page is unaccounted from the container cgroup |
| memory pages fault    | Represents the number of page faults accounted the cgroup |
| swap size             | Is the number of bytes of swap usage |


### Disk

| Metric name           | Description |
| ----------------------|-------------|
| read bytes            | Is the number of bytes read from the disk |
| read time             | Represents the total amount of time (in nanoseconds) between read request dispatch and request completion |
| read wait time        | Represents total amount of time the read I/O operations for the container spent waiting in the scheduler queues |
| write bytes           | Is the number of bytes written to the disk |
| write time            | Represents the total amount of time (in nanoseconds) between write request dispatch and request completion |
| write wait time       | Represents total amount of time the write I/O operations for the container spent waiting in the scheduler queues |

### CPU

| Metric name           | Description |
| ----------------------|-------------|
| cpu usage             | Represents the container CPU usage in % |
| throttled time        | Is the total amount of time that processes have been throttled in the container cgroup |

### Network

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
