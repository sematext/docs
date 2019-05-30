title: Container metrics
description: Container metrics, docker, rkt, containerd, cgroupfs

Sematext Agent offers an unified and agnostic approach to container engine monitoring and visibility. Containers are discovered from _cgroupfs_ hierarchies and all the metrics are directly fetched from specialized _cgroup_ controllers. We have support for Docker, rkt and containerd container runtimes. The following table recaps all the metrics shipped by the agent.

### Memory metrics

| Metric name           | Description |
| ----------------------|-------------|
| resident memory usage | Represents container resident memory usage in bytes |
| cache memory          | Is the amount of memory allocated for page cache. The total amount of memory consumed by a container is a sum of RSS + cache memory |   
| memory fail counter   | Is the number of times that memory cgroup limit was exceeded |
| memory limit          | Designates the max allowed memory limit for the container cgroup  |
| memory pages in       | The number of events each time the page is accounted to the container cgroup|
| memory pages out      | Is the number of events each time a page is unaccounted from the container cgroup |
| memory pages fault    | Represents the number of page faults accounted the cgroup |
| swap size             | Is the number of bytes of swap usage |


### Disk metrics

| Metric name           | Description |
| ----------------------|-------------|
| resident memory usage | Represents container resident memory usage in bytes |
