title: Kubernetes Monitoring Integration
description: Kubernetes is a portable, extensible, open-source platform for managing containerized workloads and services, that facilitates both declarative configuration and automation. To start monitoring Kubernetes with Sematext, you only need to install a tiny agent that adds basically no CPU or memory overhead.

Kubernetes is a portable, extensible, open-source platform for managing containerized workloads and services, that facilitates both declarative configuration and automation. To start monitoring Kubernetes with Sematext, you only need to install a tiny agent that adds basically no CPU or memory overhead.

## Monitoring Kubernetes with Sematext

Sematext Monitoring will provide you with detailed insights into your cluster's control plane components and their health, performance metrics, and resource counts, among other important metrics. Speaking of metrics, you can check out [this page](https://sematext.com/docs/agents/sematext-agent/kubernetes/metrics/) for a summarized list of key metrics that you can track using Sematext. It also includes a short explanation for each metric.

![alt_text](https://sematext.com/wp-content/uploads/2020/03/Kubernetes-Pod-Overview.png "Sematext Monitoring")

### Agent Install
To start monitoring Kubernetes with Sematext install the Sematext Agent. Setting up the agent takes less than 5 minutes:

1.  Create a new Infra App on https://apps.sematext.com/ui/monitoring-create by choosing the INFRA App card from the list of integrations.
2.  Name your Infra App, select the Kubernetes environment and install the Sematext Agent based on your preferred installation method. Available options include kubectl and a Helm chart.

### Agent Configuration
The Sematext Agent offers a versatile container engine monitoring and visibility solution that is easy to customize. For more information, please refer ot our [Agent Configuration for Kubernetes](https://sematext.com/docs/agents/sematext-agent/kubernetes/configuration/).

## Shipping Kubernetes logs to Sematext

Due to its nature, Kubernetes can be difficult to debug and without proper tooling this process will take a lot longer than it has to. Sematext helps you shed light on what caused issues with your Kubernetes cluster by collecting Kubernetes logs and events.

All you need to do is use [Discovery](../logs/discovery/setup) to Set Up log shipping:

<img class="content-modal-image" alt="Kubernetes logs - Discovery" src="../../images/integrations/kubernetes-logs-disco.png" title="Kubernetes logs - Discovery">

Once data is in, you can explore it via the built-in reports:

<img class="content-modal-image" alt="Kubernetes logs" src="../../images/integrations/kubernetes-logs.png" title="Kubernetes logs">

If you are looking to use a different type of integration you can check out this [page](https://sematext.com/docs/logagent/installation-docker/#kubernetes-and-openshift).


## Kubernetes Metrics

Container and Kubernetes metrics are collected along with labels and tags, which are exposed in the UI to allow slicing and dicing and building of custom dashboards.

### Kubernetes Control Plane Metrics

#### API Server Metrics

* Request Latency: Measures the time taken to process API server requests
* Request Throughput: Tracks the number of API server requests processed per unit of time
* Error Rate: Monitors the rate of API server errors

<img class="content-modal-image" alt="API Server Requests" src="../../images/integrations/kubernetes-apiserver-requests.png" title="API Server Requests">

<img class="content-modal-image" alt="API Server Auth" src="../../images/integrations/kubernetes-apiserver-auth.png" title="API Server Auth">

#### CoreDNS Metrics

* DNS Request Latency: Measures the time taken to process DNS requests by CoreDNS
* DNS Local and Remote Cache Misses: Counts the number of cache misses for DNS queries in CoreDNS's local or remote cache.
* Error Rate: Monitors the rate of DNS errors encountered by CoreDNS

<img class="content-modal-image" alt="CoreDNS Overview" src="../../images/integrations/kubernetes-coredns-overview.png" title="CoreDNS Overview">

<img class="content-modal-image" alt="CoreDNS Cache" src="../../images/integrations/kubernetes-coredns-cache.png" title="CoreDNS Cache">

#### etcd Metrics

* Leader Changes: Tracks the number of times the etcd cluster leadership changes
* Disk Space Usage: Monitors the amount of disk space used by etcd
* WAL Write Latency: Measures the latency of write operations to the etcd Write-Ahead Log (WAL)
* WAL Snapshot Latency: Measures the latency of taking snapshots of the etcd Write-Ahead Log (WAL)
* WAL Commit Latency: Measures the latency of committing changes from the etcd Write-Ahead Log (WAL) to the database

<img class="content-modal-image" alt="etcd overview" src="../../images/integrations/kubernetes-etcd-overview.png" title="etcd overview">

<img class="content-modal-image" alt="etcd mvcc" src="../../images/integrations/kubernetes-etcd-mvcc.png" title="etcd mvcc">

#### kube-proxy Metrics

* Service Changes: Tracks the number of changes in services detected by kube-proxy
* Endpoint Changes: Tracks the number of changes in endpoints detected by kube-proxy
* Synchronization of Proxy Rules: Measures the time taken to synchronize proxy rules for services
* Request Latency by Host, HTTP Method, Path: Measures the latency of requests proxied by kube-proxy, categorized by host, HTTP method or Path

<img class="content-modal-image" alt="kube-proxy overview" src="../../images/integrations/kubernetes-kubeproxy-overview.png" title="kube-proxy overview">

<img class="content-modal-image" alt="kube-proxy sync proxy rules" src="../../images/integrations/kubernetes-kubeproxy-syncproxyrules.png" title="kube-proxy sync proxy rules">

#### Scheduler Metrics

* Scheduling Latency by Attempts: Measures the scheduling latency for pods based on the number of attempts made
* Failed Scheduling Attempts: Monitors the number of failed pod scheduling attempts
* Queued Pods by Queue: Tracks the number of pods currently in the scheduler's queue, categorized by the queue name
* Unschedulable Pods: Tracks the number of pods that cannot be scheduled due to resource constraints

<img class="content-modal-image" alt="scheduler overview" src="../../images/integrations/kubernetes-schedulers-overview.png" title="scheduler overview">

<img class="content-modal-image" alt="scheduler latency" src="../../images/integrations/kubernetes-schedulers-latency.png" title="scheduler latency">

### Pod Metrics

*   Pod count - The total nodes in the cluster
*   Pod restarts - The total number of pods scheduled across nodes
*   Containers count - The total number ofcontainers
*   Succeeded pods - The number of pods that are successfully scheduled
*   Failed pods - The number of failed pods
*   Unknown pods - The number of pods that are in unknown state
*   Pending pods - The number of pods in pending state
*   Running pods - Reflects the current number of running pods

![alt_text](https://sematext.com/wp-content/uploads/2020/04/image2.png "Sematext Kubernetes Metrics")

### Deployment

*   Current replicas - The number of active deployment replicas
*   Available replicas - The number of pod instances targeted by the deployment
*   Desired replicas - The number of non-terminated pods targeted by the deployment that have the desired template specification

![alt_text](https://sematext.com/wp-content/uploads/2020/04/image6.png "Sematext Kubernetes Metrics")

### Storage

*   Read bytes - The number of bytes read from the disk
*   Read time - The total amount of time (in nanoseconds) between read request dispatch and request completion
*   Read wait time - The total amount of time the read I/O operations for the container spent waiting in the scheduler queues
*   Write bytes - The number of bytes written to disk
*   Write time - The total amount of time (in nanoseconds) between write request dispatch and request completion
*   Write wait time - Total amount of time the write I/O operations for the container spent waiting in the scheduler queues


![alt_text](https://sematext.com/wp-content/uploads/2020/04/image1.png "Sematext Kubernetes Metrics")

### Network

*   Received bytes - Received amount of bytes on the network interface
*   Received packets - Received amount of packets on the network interface
*   Received errors - Received amount of errors on the network interface
*   Dropped ingress packets - The amount of dropped inbound packets on the network interface
*   Transmitted bytes - Transmitted amount of bytes on the network interface
*   Transmitted packets - Transmitted amount of packets on the network interface
*   Transmitted errors - Transmitted amount of errors on the network interface
*   Dropped egress packets - The amount of dropped outbound packets on the network interface

![alt_text](https://sematext.com/wp-content/uploads/2020/04/network.png "Sematext Kubernetes Metrics")

### Memory

*   Memory fail counter - The number of times that memory cgroup limit was exceeded
*   Memory limit - Designates the max allowed memory limit for the container cgroup
*   Memory pages in - The number of events each time the page is accounted to the container cgroup
*   Memory pages out - The number of events each time a page is unaccounted from the container cgroup
*   Memory pages fault - Represents the number of page faults accounted the cgroup
*   Swap size - The number of bytes of swap usage

![alt_text](https://sematext.com/wp-content/uploads/2020/04/ram.png "Sematext Kubernetes Metrics")


### CPU

*   Cpu usage - The container CPU usage in %
*   Throttled time - The total amount of time that processes have been throttled in the container cgroup

![alt_text](https://sematext.com/wp-content/uploads/2020/04/CPU.png "Sematext Kubernetes Metrics")

## Metrics Fields

### Cluster Metrics

|Name| Type   | Unit   | Description |
|----|--------|--------|-------------|
|kubernetes.cluster.pod.count| gauge  |  |number of pods in the cluster|
|kubernetes.cluster.deployment.count| gauge  |  |number of deployments in the cluster|
|kubernetes.cluster.node.count| gauge  |  |number of node comprising the cluster|

### Pod Metrics

|Name| Type  | Unit | Description                                                                                                   |
|----|-------|------|---------------------------------------------------------------------------------------------------------------|
|kubernetes.pod.restarts| counter| long | number of pod restarts                                                                                        |
|kubernetes.pod.container.count| gauge | long | number of containers inside pod                                                                               |
|kubernetes.pod.count| gauge | long | pod count which is always equal to one                                                                        |
|kubernetes.pod.count.succeeded| gauge | long  | equal to one if all containers inside pod have terminated in success                                          |
|kubernetes.pod.count.failed| gauge | long | equal to one if all containers inside pod have terminated and at least one container has terminated in failure|
|kubernetes.pod.count.unknown| gauge | long | equal to one if pod state can't be obtained                                                                   |
|kubernetes.pod.count.pending| gauge | long | equal to one if the pod has been accepted by the scheduler and his containers are waiting to be created       |
|kubernetes.pod.count.running| gauge | long |equal to one if the pod has been scheduled on a node and at least one of his containers is running|

### Deployment Metrics

|Name|Type| Unit   | Label | Description          |
|----|----|--------|-------|----------------------|
|kubernetes.deployment.count|gauge|  | deployment count | number of active deployments |
|kubernetes.deployment.replicas|gauge|  | replica count | number of active replicas |
|kubernetes.deployment.replicas.avail|gauge|  | number of available replicas. Replicas are marked as available if they are passing the health check |
|kubernetes.deployment.replicas.desired|gauge|  | number of desired replicas as defined in the deployment |

### Storage Metrics
| Metric Name              | Type  | Unit  | Description                           |
|--------------------------|-------|-------|---------------------------------------|
| kubernetes.pvc.used      | gauge | bytes |number of used inodes in the volume    |
| kubernetes.pvc.available | gauge | bytes |number of available bytes in the volume |
| kubernetes.pvc.capacity  | gauge | bytes |capacity in bytes of the volume        |

### Kubelet Metrics
#### Runtime Operations
|Metric Name| Type  | Unit    | Description                                                     |
|----|-------|---------|-----------------------------------------------------------------|
|kubelet.runtime_operation.count| gauge |   | cumulative number of runtime operations by operation type       |
|kubelet.runtime_operation.errors| gauge |   | cumulative number of runtime operation errors by operation type |
|kubelet.runtime_operation.total_num| gauge |   | total number of runtime operations           |
|kubelet.runtime_operation.duration| gauge | seconds | duration of runtime operations               |
|kubelet.runtime_operation.p50latency| gauge | seconds | p50 latency in seconds of runtime operations |
|kubelet.runtime_operation.p75latency| gauge | seconds | p75 latency in seconds of runtime operations |
|kubelet.runtime_operation.p90latency| gauge | seconds | p90 latency in seconds of runtime operations |
|kubelet.runtime_operation.p95latency| gauge | seconds | p95 latency in seconds of runtime operations |
|kubelet.runtime_operation.p99latency| gauge | seconds | p99 latency in seconds of runtime operations |

#### Kubelet
|Metric Name| Type  | Unit   | Description                    |
|----|-------|--------|--------------------------------|
|kubelet.pods.instances| gauge |  | pods Instances                 |
|kubelet.pods.running| gauge |  | running Pods                   |
|kubelet.pods.started| gauge |  | started Pods                   |
|kubelet.pods.started_error| gauge |  | pods Started Errors            |
|kubelet.containers.created| gauge |  | containers with status Created |
|kubelet.containers.exited| gauge |  | containers with status Exited  |
|kubelet.containers.running| gauge |  | containers with status Running |
|kubelet.containers.unknown| gauge |  | containers with status Unknown |

#### Pod Start Duration
|Metric Name| Type  | Unit    | Description                                                           |
|----|-------|---------|-----------------------------------------------------------------------|
|kubelet.pod_start.total_num| gauge |   | number of pod starts                                                  |
|kubelet.pod_start.duration| gauge | seconds  | duration of a pod start in seconds                                    |
|kubelet.pod_start.p50latency| gauge | seconds | p50 latency in seconds for a single pod to go from pending to running |
|kubelet.pod_start.p75latency| gauge | seconds | p75 latency in seconds for a single pod to go from pending to running |
|kubelet.pod_start.p90latency| gauge | seconds | p90 latency in seconds for a single pod to go from pending to running |
|kubelet.pod_start.p95latency| gauge | seconds | p95 latency in seconds for a single pod to go from pending to running |
|kubelet.pod_start.p99latency| gauge | seconds | p99 latency in seconds for a single pod to go from pending to running |

#### Pod Worker Duration
|Metric Name| Type  | Unit    | Description                                      |
|----|-------|---------|--------------------------------------------------|
|kubelet.pod_worker.total_num| gauge |   | pod worker counter                          |
|kubelet.pod_worker.duration| gauge | seconds | pod worker duration                         |
|kubelet.pod_worker.p50latency| gauge | seconds | p50 latency in seconds to sync a single pod |
|kubelet.pod_worker.p75latency| gauge | seconds | p75 latency in seconds to sync a single pod |
|kubelet.pod_worker.p90latency| gauge | seconds | p90 latency in seconds to sync a single pod |
|kubelet.pod_worker.p95latency| gauge | seconds | p95 latency in seconds to sync a single pod |
|kubelet.pod_worker.p99latency| gauge | seconds | p99 latency in seconds to sync a single pod |

#### Pod Worker Start Duration
|Metric Name| Type  | Unit    | Description                                                        |
|----|-------|---------|--------------------------------------------------------------------|
|kubelet.pod_worker_start.total_num| gauge |   | worker start counter                                          |
|kubelet.pod_worker_start.duration| gauge | seconds  | duration for starting a worker                                |
|kubelet.pod_worker_start.p50latency| gauge | seconds | p50 latency in seconds from seeing a pod to starting a worker |
|kubelet.pod_worker_start.p75latency| gauge | seconds | p75 latency in seconds from seeing a pod to starting a worker |
|kubelet.pod_worker_start.p90latency| gauge | seconds | p90 latency in seconds from seeing a pod to starting a worker |
|kubelet.pod_worker_start.p95latency| gauge | seconds | p95 latency in seconds from seeing a pod to starting a worker |
|kubelet.pod_worker_start.p99latency| gauge | seconds | p99 latency in seconds from seeing a pod to starting a worker |

#### Volume Manager
|Metric Name| Type  | Unit   | Description                                 |
|----|-------|--------|---------------------------------------------|
|kubelet.volume_manager.count| gauge |  | total volumes managed by the volume manager |
|kubelet.volume_manager.desired.count| gauge |  | total volumes desired by the volume manager |

#### Storage Operation
|Metric Name| Type  | Unit    | Description                               |
|----|-------|---------|-------------------------------------------|
|kubelet.storage.total_num| gauge |   | total number of storage operations        |
|kubelet.storage.duration| gauge | seconds  | duration of storage operations in seconds |
|kubelet.storage.p50latency| gauge | seconds | p50 latency to perform storage operations |
|kubelet.storage.p75latency| gauge | seconds | p75 latency to perform storage operations |
|kubelet.storage.p90latency| gauge | seconds | p90 latency to perform storage operations |
|kubelet.storage.p95latency| gauge | seconds | p95 latency to perform storage operations |
|kubelet.storage.p99latency| gauge | seconds | p99 latency to perform storage operations |

#### Cgroup Manager
|Metric Name| Type  | Unit    | Description                                                 |
|----|-------|---------|-------------------------------------------------------------|
|kubelet.cgroup.total_num| gauge |   | total number of cgroup management operations by the kubelet |
|kubelet.cgroup.duration| gauge | seconds  | duration of cgroup management by the kubelet in seconds |
|kubelet.cgroup.p50latency| gauge | seconds | p50 latency for cgroup manager operations |
|kubelet.cgroup.p75latency| gauge | seconds | p75 latency for cgroup manager operations |
|kubelet.cgroup.p90latency| gauge | seconds | p90 latency for cgroup manager operations |
|kubelet.cgroup.p95latency| gauge | seconds | p95 latency for cgroup manager operations |
|kubelet.cgroup.p99latency| gauge | seconds | p99 latency for cgroup manager operations |

#### PLEG Relist Interval
|Metric Name| Type  | Unit    | Description                                                |
|----|-------|---------|------------------------------------------------------------|
|kubelet.pleg_relist_interval.total_num| gauge |   | total number of intervals between pod relisting operations |
|kubelet.pleg_relist_interval.duration| gauge | seconds  | duration of intervals between pod relisting operations    |
|kubelet.pleg_relist_interval.p50latency| gauge | seconds | p50 latency of intervals between pod relisting operations |
|kubelet.pleg_relist_interval.p75latency| gauge | seconds | p75 latency of intervals between pod relisting operations |
|kubelet.pleg_relist_interval.p90latency| gauge | seconds | p90 latency of intervals between pod relisting operations |
|kubelet.pleg_relist_interval.p95latency| gauge | seconds | p95 latency of intervals between pod relisting operations |
|kubelet.pleg_relist_interval.p99latency| gauge | seconds | p99 latency of intervals between pod relisting operations |

#### Docker Operations
|Metric Name| Type  | Unit    | Description                                      |
|----|-------|---------|--------------------------------------------------|
|kubelet.docker_operation.errors| gauge |   | number of Docker operation errors           |
|kubelet.docker_operation.operations| gauge |   | total number of Docker operations           |
|kubelet.docker_operation.total_num| gauge |   | number of Docker operations                 |
|kubelet.docker_operation.duration| gauge | seconds | duration of docker operations in seconds    |
|kubelet.docker_operation.p50latency| gauge | seconds | p50 latency in seconds of Docker operations |
|kubelet.docker_operation.p75latency| gauge | seconds | p75 latency in seconds of Docker operations |
|kubelet.docker_operation.p90latency| gauge | seconds | p90 latency in seconds of Docker operations |
|kubelet.docker_operation.p95latency| gauge | seconds | p95 latency in seconds of Docker operations |
|kubelet.docker_operation.p99latency| gauge | seconds | p99 latency in seconds of Docker operations |

#### HTTP Inflight Request
| Metric Name                              | Type  | Unit   | Description                 |
|------------------------------------------|-------|--------|-----------------------------|
| kubelet.http_inflight_request.total_num  | gauge |  | number of inflight requests |

#### HTTP Request Duration
|Metric Name| Type  | Unit   | Description                             |
|----|-------|--------|-----------------------------------------|
|kubelet.http_request.operations| gauge |  | total number of HTTP request operations |
|kubelet.http_request.total_num| gauge |   | total number of HTTP requests       |
|kubelet.http_request.duration| gauge | seconds | HTTP request duration               |
|kubelet.http_request.p50latency| gauge | seconds | p50 HTTP request latency in seconds |
|kubelet.http_request.p75latency| gauge | seconds | p75 HTTP request latency in seconds |
|kubelet.http_request.p90latency| gauge | seconds | p90 HTTP request latency in seconds |
|kubelet.http_request.p95latency| gauge | seconds | p95 HTTP request latency in seconds |
|kubelet.http_request.p99latency| gauge | seconds | p99 HTTP request latency in seconds |

#### Network Plugin Operations
|Metric Name| Type  | Unit    | Description                                            |
|----|-------|---------|--------------------------------------------------------|
|kubelet.network_plugin_operation.errors| gauge |   | network plugin operation errors                     |
|kubelet.network_plugin_operation.operations| gauge |   |                                                     |
|kubelet.network_plugin_operation.total_num| gauge |   | total number of network plugin operations           |
|kubelet.network_plugin_operation.duration| gauge | seconds | network plugin operations duration                  |
|kubelet.network_plugin_operation.p50latency| gauge | seconds | p50 latency in seconds of network plugin operations |
|kubelet.network_plugin_operation.p75latency| gauge | seconds | p75 latency in seconds of network plugin operations |
|kubelet.network_plugin_operation.p90latency| gauge | seconds | p90 latency in seconds of network plugin operations |
|kubelet.network_plugin_operation.p95latency| gauge | seconds | p95 latency in seconds of network plugin operations |
|kubelet.network_plugin_operation.p99latency| gauge | seconds | p99 latency in seconds of network plugin operations |

#### PLEG Relist Duration
|Metric Name| Type  | Unit    | Description                   |
|----|-------|---------|-------------------------------|
|kubelet.pleg_relist.total_num| gauge |  | number of pod relisting performed by kubelet              |
|kubelet.pleg_relist.duration| gauge | seconds | duration of pod relisting performed by kubelet in seconds |
|kubelet.pleg_relist.p50duration| gauge | seconds | p50 latency of pod relisting |
|kubelet.pleg_relist.p75duration| gauge | seconds | p75 latency of pod relisting |
|kubelet.pleg_relist.p90duration| gauge | seconds | p90 latency of pod relisting |
|kubelet.pleg_relist.p95duration| gauge | seconds | p95 latency of pod relisting |
|kubelet.pleg_relist.p99duration| gauge | seconds | p99 latency of pod relisting |

#### Started Containers
|Metric Name| Type  | Unit   | Description                           |
|----|-------|--------|---------------------------------------|
|kubelet.started_containers.errors| gauge |  | number of started containers with errors |
|kubelet.started_containers.total_num| gauge |  | total number of started containers |

#### Volume Stats Inode
|Metric Name| Type  | Unit   | Description                            |
|----|-------|--------|----------------------------------------|
|kubelet.volume_stats_inode.free| gauge |  | number of free inodes in the volume    |
|kubelet.volume_stats_inode.used| gauge |  | number of used inodes in the volume    |
|kubelet.volume_stats_inode.maximum| gauge |  | maximum number of inodes in the volume |

#### PLEG Events
|Metric Name| Type  | Unit  | Description                                  |
|----|-------|-------|----------------------------------------------|
|kubelet.pleg_events.discard| gauge | | number of discarded events by kubelet's PLEG |
|kubelet.pleg_events.last_seen|       | timestamp | last timestamp in which PLEG was observed |

### API Server Metrics
#### Inflight Requests
|Metric Name| Type  | Unit   | Description                                                |
|----|-------|--------|------------------------------------------------------------|
|apiserver.inflight_requests.total_num| gauge |  | number of in-flight requests being processed by API server |

#### Audit Events
|Metric Name| Type  | Unit   | Description                                                    |
|----|-------|--------|----------------------------------------------------------------|
|apiserver.audit_events.total_num| gauge |  | number of audit events generated and sent to the audit backend |

#### Request Duration
|Metric Name| Type  | Unit    | Description                          |
|----|-------|---------|--------------------------------------|
|apiserver.etcd_request_duration.p50latency| gauge | seconds | p50 latency of etcd requests                  |
|apiserver.etcd_request_duration.p75latency| gauge | seconds | p75 latency of etcd requests                  |
|apiserver.etcd_request_duration.p90latency| gauge | seconds | p90 latency of etcd requests                  |
|apiserver.etcd_request_duration.p95latency| gauge | seconds | p95 latency of etcd requests                  |
|apiserver.etcd_request_duration.p99latency| gauge | seconds | p99 latency of etcd requests                  |
|apiserver.etcd_request_duration.duration| gauge | seconds | duration of etcd requests measured in seconds |
|apiserver.etcd_request_duration.total_num| gauge |   | number of etcd requests |

#### Storage Objects
|Metric Name| Type  | Unit   | Description                                                      |
|----|-------|--------|------------------------------------------------------------------|
|apiserver.storage_objects.total_num| gauge |  | number of stored objects at the time of last check split by kind |

#### Client Requests
|Metric Name| Type  | Unit   | Description             |
|----|-------|--------|-------------------------|
|apiserver.client_requests.total_num| gauge |  | number of HTTP requests |

#### Rejected Audit Requests
|Metric Name| Type  | Unit   | Description                                           |
|----|-------|--------|-------------------------------------------------------|
|apiserver.rejected_audit_req.total_num| gauge |  | number of API server audit requests rejected |

#### Current Executing Requests
|Metric Name| Type  | Unit   | Description                                                                           |
|----|-------|--------|---------------------------------------------------------------------------------------|
|apiserver.current_executing_reqs.total_num| gauge |  | number of requests in regular execution phase in the API Priority and Fairness system |

#### Current Inqueue Requests
|Metric Name| Type  | Unit   | Description                                                                            |
|----|-------|--------|----------------------------------------------------------------------------------------|
|apiserver.current_inqueue_reqs.total_num| gauge |  | number of requests currently pending in queues of the API Priority and Fairness system |

#### Admission Duration
| Metric Name                             |       | Unit    | Description                                    |
|-----------------------------------------|-------|---------|------------------------------------------------|
| apiserver.admission_duration.p50latency | gauge | seconds | p50 latency of admission controller processing                |
| apiserver.admission_duration.p75latency | gauge | seconds | p75 latency of admission controller processing                |
| apiserver.admission_duration.p90latency | gauge | seconds | p90 latency of admission controller processing                |
| apiserver.admission_duration.p95latency | gauge | seconds | p95 latency of admission controller processing                |
| apiserver.admission_duration.p99latency | gauge | seconds | p99 latency of admission controller processing                |
| apiserver.admission_duration.duration   | gauge | seconds | duration of admission controller processing in the API server |
| apiserver.admission_duration.total_num  | gauge |   | number of admission controller processing in the API server |

#### TLS Error
| Metric Name | Type  | Unit  | Description                                                      |
|--------------|-------|-------|------------------------------------------------------------------|
| apiserver.tls_handshake_error.total_num | gauge | | number of requests dropped with 'TLS handshake error from' error |

#### Authentication Duration
|Metric Name| Type  | Unit   | Description                               |
|----|-------|--------|-------------------------------------------|
|apiserver.auth_duration.p50latency| gauge | seconds | p50 latency of authentication process           |
|apiserver.auth_duration.p75latency| gauge | seconds | p75 latency of authentication process           |
|apiserver.auth_duration.p90latency| gauge | seconds | p90 latency of authentication process           |
|apiserver.auth_duration.p95latency| gauge | seconds | p95 latency of authentication process           |
|apiserver.auth_duration.p99latency| gauge | seconds | p99 latency of authentication process           |
|apiserver.auth_duration.duration| gauge | seconds       | duration of authentication processes in seconds |
|apiserver.auth_duration.total_num| gauge |  | number of authentication processes |

#### Authenticated User Requests
|Metric Name| Type  | Unit   | Description                      |
|----|-------|--------|----------------------------------|
|apiserver.auth_user_req.total_num| gauge |  | number of authenticated requests |

#### Client Certificate Expiry
|Metric Name| Type  | Unit    | Description                    |
|----|-------|---------|--------------------------------|
|apiserver.client_cert_expiry.p50latency| gauge | seconds | p50 latency of expiration time                                                                 |
|apiserver.client_cert_expiry.p75latency| gauge | seconds | p75 latency of expiration time                                                                 |
|apiserver.client_cert_expiry.p90latency| gauge | seconds | p90 latency of expiration time                                                                 |
|apiserver.client_cert_expiry.p95latency| gauge | seconds | p95 latency of expiration time                                                                 |
|apiserver.client_cert_expiry.p99latency| gauge | seconds | p99 latency of expiration time                                                                 |
|apiserver.client_cert_expiry.duration| gauge | seconds | expiration time in seconds of the client certificates used to authenticate with the API server |
|apiserver.client_cert_expiry.total_num| gauge |   | number of clients certificates used to authenticate with the API server |

#### Key Geneneration Fails
|Metric Name| Type  | Unit   | Description                                                   |
|----|-------|--------|---------------------------------------------------------------|
|apiserver.key_gen_fails.total_num| gauge |  | number of failed data encryption key(DEK) generation operations |

#### Key Generation Duration
|Metric Name| Type  | Unit    | Description                                                                        |
|----|-------|---------|------------------------------------------------------------------------------------|
|apiserver.key_gen_duration.p50latency| gauge | seconds | p50 latency of key generation for storing data                                     |
|apiserver.key_gen_duration.p75latency| gauge | seconds | p75 latency of key generation for storing data                                     |
|apiserver.key_gen_duration.p90latency| gauge | seconds | p90 latency of key generation for storing data                                     |
|apiserver.key_gen_duration.p95latency| gauge | seconds | p95 latency of key generation for storing data                                     |
|apiserver.key_gen_duration.p99latency| gauge | seconds | p99 latency of key generation for storing data                                     |
|apiserver.key_gen_duration.duration| gauge | seconds | duration of key generation for storing data in the API server's storage in seconds |
|apiserver.key_gen_duration.total_num| gauge |  | number of key generation for storing data in the API server's storage |

#### Requests Total
|Metric Name| Type  | Unit   | Description                   |
|----|-------|--------|-------------------------------|
|apiserver.request_total.total_num| gauge |  | number of API server requests |

#### Requests Duration
|Metric Name| Type  | Unit    | Description                                |
|----|-------|---------|--------------------------------------------|
|apiserver.request_duration.p50latency| gauge | seconds | p50 latency of API server requests         |
|apiserver.request_duration.p75latency| gauge | seconds | p75 latency of API server requests         |
|apiserver.request_duration.p90latency| gauge | seconds | p90 latency of API server requests         |
|apiserver.request_duration.p95latency| gauge | seconds | p95 latency of API server requests         |
|apiserver.request_duration.p99latency| gauge | seconds | p99 latency of API server requests         |
|apiserver.request_duration.duration| gauge | seconds | duration of API server requests in seconds |
|apiserver.request_duration.total_num| gauge |  | number of API server requests |

### Etcd Metrics
#### Generic
|Metric Name| Type  | Unit    | Description                             |
|----|-------|---------|-----------------------------------------|
|etcd.has_leader| gauge |  | whether or not a leader exists          |
|etcd.leader.changes_seen| gauge |   | number of leader changes seen           |
|etcd.proposals.applied| gauge |   | number of consensus proposals applied   |
|etcd.proposals.committed| gauge |  | number of consensus proposals committed |
|etcd.proposals.failed| gauge |   | number of failed proposals seen       |
|etcd.proposals.pending| gauge |   | number of pending proposals to commit |
|etcd.version|       | version | version of etcd running |

#### Commit
|Metric Name| Type  | Unit    | Description                                                      |
|----|-------|---------|------------------------------------------------------------------|
|etcd.disk_backend_commit.p50latency| gauge | seconds | p50 latency of commit operations                                 |
|etcd.disk_backend_commit.p75latency| gauge | seconds | p75 latency of commit operations                                 |
|etcd.disk_backend_commit.p90latency| gauge | seconds | p90 latency of commit operations                                 |
|etcd.disk_backend_commit.p95latency| gauge | seconds | p95 latency of commit operations                                 |
|etcd.disk_backend_commit.p99latency| gauge | seconds | p99 latency of commit operations                                 |
|etcd.disk_backend_commit.duration| gauge | seconds | duration of commit operations for etcd's disk backend in seconds |
|etcd.disk_backend_commit.total_num| gauge |   | number of commit operations for etcd's disk backend commits      |

#### WAL
|Metric Name| Type  | Unit    | Description                      |
|----|-------|---------|----------------------------------|
|etcd.disk_wal_fsync.p50latency| gauge | seconds | p50 latency of fsync operations                                                                              |
|etcd.disk_wal_fsync.p75latency| gauge | seconds | p75 latency of fsync operations                                                                              |
|etcd.disk_wal_fsync.p90latency| gauge | seconds | p90 latency of fsync operations                                                                              |
|etcd.disk_wal_fsync.p95latency| gauge | seconds | p95 latency of fsync operations                                                                              |
|etcd.disk_wal_fsync.p99latency| gauge | seconds | p99 latency of fsync operations                                                                              |
|etcd.disk_wal_fsync.total_num| gauge |   | number of fsync (flush to disk) operations for etcd's write-ahead log (WAL) on the disk backend              |
|etcd.disk_wal_fsync.duration| gauge | seconds | duration of fsync (flush to disk) operations for etcd's write-ahead log (WAL) on the disk backend in seconds |

#### Backend Snapshots
|Metric Name| Type  | Unit    | Description                                                      |
|----|-------|---------|------------------------------------------------------------------|
|etcd.disk_backend_snapshot.p50latency| gauge | seconds | p50 latency of snapshot creation                                 |
|etcd.disk_backend_snapshot.p75latency| gauge | seconds | p75 latency of snapshot creation                                 |
|etcd.disk_backend_snapshot.p90latency| gauge | seconds | p90 latency of snapshot creation                                 |
|etcd.disk_backend_snapshot.p95latency| gauge | seconds | p95 latency of snapshot creation                                 |
|etcd.disk_backend_snapshot.p99latency| gauge | seconds | p99 latency of snapshot creation                                 |
|etcd.disk_backend_snapshot.total_num| gauge |   | number of snapshot creation for etcd's disk backend              |
|etcd.disk_backend_snapshot.duration| gauge | seconds | duration of snapshot creation for etcd's disk backend in seconds |

#### GRPC Total
|Metric Name| Type  | Unit   | Description                                                            |
|----|-------|--------|------------------------------------------------------------------------|
|etcd.grpc.handled| gauge | | number of RPCs completed on the server, regardless of success or failure |

#### MVCC
|Metric Name| Type  | Unit  | Description                                                                                |
|----|-------|-------|--------------------------------------------------------------------------------------------|
|etcd.mvcc.keys| gauge | | number of keys                                                |
|etcd.mvcc.events| gauge | | number of events sent by this member                          |
|etcd.mvcc.keys_bytes| gauge |  | number of MVCC keys involved in etcd debugging operations     |
|etcd.mvcc.watch_stream| gauge |  | number of watch streams                                       |
|etcd.mvcc.watcher| gauge |  | number of watchers                                            |
|etcd.mvcc.db_read| gauge |  | number of currently open read transactions                    |
|etcd.mvcc.db_size| gauge | bytes | size of the underlying database physically allocated in bytes |
|etcd.mvcc.db_used| gauge | bytes | size of the underlying database logically in use in bytes |
|etcd.mvcc.puts| gauge |  | number of puts seen by this member                       |
|etcd.mvcc.deletes| gauge | | number of deletes seen by this member                    |
|etcd.mvcc.slow_watches| gauge |  | number of unsynced slow watchers                         |
|etcd.watch.requests| gauge |  | number of incoming watch requests (new or reestablished) |
|etcd.store.watchers| gauge |  | number of currently active watchers |

#### Commit Rebalance
|Metric Name| Type  | Unit    | Description |
|----|-------|---------|-------------|
|etcd.commit_rebalance_duration.p50latency| gauge | seconds | p50 latency of commit and rebalance operations   |
|etcd.commit_rebalance_duration.p75latency| gauge | seconds | p75 latency of commit and rebalance operations                               |
|etcd.commit_rebalance_duration.p90latency| gauge | seconds | p90 latency of commit and rebalance operations                               |
|etcd.commit_rebalance_duration.p95latency| gauge | seconds | p95 latency of commit and rebalance operations                               |
|etcd.commit_rebalance_duration.p99latency| gauge | seconds | p99 latency of commit and rebalance operations                               |
|etcd.commit_rebalance_duration.total_num| gauge |   | number of commit and rebalance operations for etcd disk backend              |
|etcd.commit_rebalance_duration.duration| gauge | seconds | duration of commit and rebalance operations for etcd disk backend in seconds |

#### Commit Write
|Metric Name| Type  | Unit    | Description                                                     |
|----|-------|---------|-----------------------------------------------------------------|
|etcd.commit_write.p50latency| gauge | seconds | p50 latency of write operations during commit                   |
|etcd.commit_write.p75latency| gauge | seconds | p75 latency of write operations during commit                   |
|etcd.commit_write.p90latency| gauge | seconds | p90 latency of write operations during commit                   |
|etcd.commit_write.p95latency| gauge | seconds | p95 latency of write operations during commit                   |
|etcd.commit_write.p99latency| gauge | seconds | p99 latency of write operations during commit                   |
|etcd.commit_write.total_num| gauge |  | number of write operations during commit in etcd disk backend   |
|etcd.commit_write.duration| gauge | seconds | duration of write operations during commit in etcd disk backend |

#### DB Compaction Duration
|Metric Name| Type  | Unit    | Description                                                                                                        |
|--|-------|---------|--------------------------------------------------------------------------------------------------------------------|
|etcd.mvcc_db_compaction.p50latency| gauge | seconds | p50 latency of MVCC database compaction operations                                                                 |
|etcd.mvcc_db_compaction.p75latency| gauge | seconds | p75 latency of MVCC database compaction operations             |
|etcd.mvcc_db_compaction.p90latency| gauge | seconds | p90 latency of MVCC database compaction operations             |
|etcd.mvcc_db_compaction.p95latency| gauge | seconds | p95 latency of MVCC database compaction operations             |
|etcd.mvcc_db_compaction.p99latency| gauge | seconds | p99 latency of MVCC database compaction operations             |
|etcd.mvcc_db_compaction.total_num| gauge |  | number of MVCC database compaction operations                  |
|etcd.mvcc_db_compaction.duration| gauge | seconds | duration of MVCC database compaction operations in miliseconds |

### Kube-proxy Metrics
#### Generic
|Metric Name| Type  | Unit   | Description                                    |
|----|-------|--------|------------------------------------------------|
|kubeproxy.endpoint.changes| gauge |  | number of proxy rules endpoint changes         |
|kubeproxy.endpoint.changes_pending| gauge | | number of proxy rules endpoint changes pending |
|kubeproxy.restore.failures| gauge |  | number of proxy iptables restore failures     |
|kubeproxy.service.changes| gauge |  | number of proxy rules service changes         |
|kubeproxy.service.changes_pending| gauge |  | number of proxy rules service changes pending |

#### Client Requests
|Metric Name| Type  | Unit   | Description                                                           |
|----|-------|--------|-----------------------------------------------------------------------|
|kubeproxy.rest_client.total_num| gauge |  | number of HTTP requests, partitioned by status code, method, and host |

#### Client Duration
|Metric Name| Type  | Unit    | Description                                 |
|----|-------|---------|---------------------------------------------|
|kubeproxy.rest_client_duration.p50latency| gauge | seconds | p50 latency of REST client requests         |
|kubeproxy.rest_client_duration.p75latency| gauge | seconds | p75 latency of REST client requests         |
|kubeproxy.rest_client_duration.p90latency| gauge | seconds | p90 latency of REST client requests         |
|kubeproxy.rest_client_duration.p95latency| gauge | seconds | p95 latency of REST client requests         |
|kubeproxy.rest_client_duration.p99latency| gauge | seconds | p99 latency of REST client requests         |
|kubeproxy.rest_client_duration.duration| gauge | seconds | duration of REST client requests in seconds |
|kubeproxy.rest_client_duration.total_num| gauge |  | number of REST client requests |

#### Sync Proxy Rules Duration
|Metric Name| Type  | Unit    | Description                                        |
|----|-------|---------|----------------------------------------------------|
|kubeproxy.sync_proxy_rules.p50latency| gauge | seconds | p50 latency of proxy rules synchronization         |
|kubeproxy.sync_proxy_rules.p75latency| gauge | seconds | p75 latency of proxy rules synchronization         |
|kubeproxy.sync_proxy_rules.p90latency| gauge | seconds | p90 latency of proxy rules synchronization         |
|kubeproxy.sync_proxy_rules.p95latency| gauge | seconds | p95 latency of proxy rules synchronization         |
|kubeproxy.sync_proxy_rules.p99latency| gauge | seconds | p99 latency of proxy rules synchronization         |
|kubeproxy.sync_proxy_rules.duration| gauge | seconds | duration of proxy rules synchronization in seconds |
|kubeproxy.sync_proxy_rules.total_num| gauge |   | number of proxy rules synchronization |

### CoreDNS Metrics
#### Generic
|Metric Name| Type  | Unit   | Description                                                               |
|----|-------|--------|---------------------------------------------------------------------------|
|coredns.cache.entries| gauge |  | number of elements in the cache                                           |
|coredns.cache.hits| gauge |  | number of cache hits                                                      |
|coredns.cache.misses| gauge |  | number of cache misses                                                    |
|coredns.panics.total_num| gauge |  | number of panics                                                          |
|coredns.failed_reloads.total_num| gauge |  | number of failed reload attempts                                          |
|coredns.healthcheck_broken.total_num| gauge |  | number of complete failures of the healthchecks                           |
|coredns.forward_max_concurrent_rejects.total_num| gauge |  | number of queries rejected because the concurrent queries were at maximum |

#### Request Duration
|Metric Name| Type  | Unit    | Description                                            |
|----|-------|---------|--------------------------------------------------------|
|coredns.request_duration.p50latency| gauge | seconds | p50 latency of DNS requests handled                    |
|coredns.request_duration.p75latency| gauge | seconds | p75 latency of DNS requests handled                    |
|coredns.request_duration.p90latency| gauge | seconds | p90 latency of DNS requests handled                    |
|coredns.request_duration.p95latency| gauge | seconds | p95 latency of DNS requests handled                    |
|coredns.request_duration.p99latency| gauge | seconds | p99 latency of DNS requests handled                    |
|coredns.request_duration.duration| gauge | seconds | duration of DNS requests handled by CoreDNS in seconds |
|coredns.request_duration.total_num| gauge | | number of DNS requests handled by CoreDNS |

#### Requests
|Metric Name|       | Unit   | Description                           |
|----|-------|--------|---------------------------------------|
|coredns.request_counter.total_num| gauge |  | number of requests handled by CoreDNS |

#### Response Status Codes
|Metric Name|       | Unit   | Description                     |
|----|-------|--------|---------------------------------|
|coredns.response_code.total_num| gauge |  | number of response status codes |

#### Forward Cache Hits
|Metric Name| Type  | Unit   | Description                                               |
|----|-------|--------|-----------------------------------------------------------|
|coredns.forward_cache.hits| gauge |  | number of connection cache hits per upstream and protocol |

#### Forward Cache Misses
| Metric Name                   | Type  | Unit   | Description                                                 |
|-------------------------------|-------|--------|-------------------------------------------------------------|
| coredns.forward_cache.misses  | gauge |  | number of connection cache misses per upstream and protocol |

#### Forward Request Duration
|Metric Name| Type  | Unit    | Description                                                      |
|----|-------|---------|------------------------------------------------------------------|
|coredns.forward_request.p50latency| gauge | seconds | p50 latency of forwarded DNS requests handled                     |
|coredns.forward_request.p75latency| gauge | seconds | p75 latency of forwarded DNS requests handled                     |
|coredns.forward_request.p90latency| gauge | seconds | p90 latency of forwarded DNS requests handled                     |
|coredns.forward_request.p95latency| gauge | seconds | p95 latency of forwarded DNS requests handled                     |
|coredns.forward_request.p99latency| gauge | seconds | p99 latency of forwarded DNS requests hanndled                    |
|coredns.forward_request.duration| gauge | seconds | duration of forwarding DNS requests handled by CoreDNS in seconds |
|coredns.forward_request.total_num| gauge |   | number of forwarding DNS requests handled by CoreDNS |

### Scheduler Metrics
#### Preemption Attempts
|Metric Name| Type  | Unit   | Description                                  |
|----|-------|--------|----------------------------------------------|
|scheduler.preemption_attempts.total_num| gauge |  | number of preemption attempts in the cluster |

#### Pending Pods
|Metric Name| Type  | Unit   | Description                               |
|----|-------|--------|-------------------------------------------|
|scheduler.pending_pods.total_num| gauge |  | number of pending pods, by the queue type |

#### Queue Incoming Pods
|Metric Name| Type  | Unit   | Description                                                       |
|----|-------|--------|-------------------------------------------------------------------|
|scheduler.incoming_pods.total_num| gauge | | number of pods added to scheduling queues by event and queue type |

#### Scheduler Attempts
|Metric Name| Type  | Unit   | Description                                        |
|----|-------|--------|----------------------------------------------------|
|scheduler.schedule_attempts.total_num| gauge |  | number of attempts to schedule pods, by the result |

#### Go Routines
|Metric Name| Type  | Unit   | Description                                                            |
|----|-------|--------|------------------------------------------------------------------------|
|scheduler.go_routines.total_num| gauge |  | number of running goroutines split by the work they do such as binding |

#### Cache
| Metric Name                | Type  | Unit   | Description                                                            |
|----------------------------|-------|--------|------------------------------------------------------------------------|
| scheduler.cache.total_num  | gauge |  | number of nodes, pods, and assumed (bound) pods in the scheduler cache |

#### E2E Scheduling Duration
|Metric Name| Type  | Unit    | Description                                                                                       |
|----|-------|---------|---------------------------------------------------------------------------------------------------|
|scheduler.e2e_duration.p50latency| gauge | seconds | p50 latency of end-to-end scheduling operations                                                   |
|scheduler.e2e_duration.p75latency| gauge | seconds | p75 latency of end-to-end scheduling operations                                                   |
|scheduler.e2e_duration.p90latency| gauge | seconds | p90 latency of end-to-end scheduling operations                                                   |
|scheduler.e2e_duration.p95latency| gauge | seconds | p95 latency of end-to-end scheduling operations                                                   |
|scheduler.e2e_duration.p99latency| gauge | seconds | p99 latency of end-to-end scheduling operations                                                   |
|scheduler.e2e_duration.total_num| gauge |   | number of end-to-end scheduling operations                                                        |
|scheduler.e2e_duration.duration| gauge | seconds | duration of end-to-end scheduling operations measured in seconds (scheduling algorithm + binding) |

#### Scheduling Algorithm Duration
|Metric Name| Type  | Unit    | Description                                           |
|----|-------|---------|-------------------------------------------------------|
|scheduler.scheduling_algorithm.p50latency| gauge | seconds | p50 latency of scheduling algorithm executions        |
|scheduler.scheduling_algorithm.p75latency| gauge | seconds | p75 latency of scheduling algorithm executions        |
|scheduler.scheduling_algorithm.p90latency| gauge | seconds | p90 latency of scheduling algorithm executions        |
|scheduler.scheduling_algorithm.p95latency| gauge | seconds | p95 latency of scheduling algorithm executions        |
|scheduler.scheduling_algorithm.p99latency| gauge | seconds | p99 latency of scheduling algorithm executions        |
|scheduler.scheduling_algorithm.total_num| gauge |   | number of scheduling algorithm execution              |
|scheduler.scheduling_algorithm.duration| gauge | seconds | duration of scheduling algorithm execution in seconds |

#### Preemption Victims
|Metric Name| Type  | Unit    | Description                                                                                    |
|----|-------|---------|------------------------------------------------------------------------------------------------|
|scheduler.preemption_victims.p50latency| gauge | seconds | p50 latency of preemption victims                                                              |
|scheduler.preemption_victims.p75latency| gauge | seconds | p75 latency of preemption victims                                                              |
|scheduler.preemption_victims.p90latency| gauge | seconds | p90 latency of preemption victims                                                              |
|scheduler.preemption_victims.p95latency| gauge | seconds | p95 latency of preemption victims                                                              |
|scheduler.preemption_victims.p99latency| gauge | seconds | p99 latency of preemption victims                                                              |
|scheduler.preemption_victims.total_num| gauge |   | number of preemption victims identified by the scheduler for resource reclamation              |
|scheduler.preemption_victims.duration| gauge | seconds | duration of preemption victims identified by the scheduler for resource reclamation in seconds |

#### Scheduling Duration
|Metric Name| Type  | Unit    | Description                                                                |
|----|-------|---------|----------------------------------------------------------------------------|
|scheduler.scheduling_duration.p50latency| gauge | seconds | p50 latency of pod scheduling operations                                   |
|scheduler.scheduling_duration.p75latency| gauge | seconds | p75 latency of pod scheduling operations                                   |
|scheduler.scheduling_duration.p90latency| gauge | seconds | p90 latency of pod scheduling operations                                   |
|scheduler.scheduling_duration.p95latency| gauge | seconds | p95 latency of pod scheduling operations                                   |
|scheduler.scheduling_duration.p99latency| gauge | seconds | p99 latency of pod scheduling operations                                   |
|scheduler.scheduling_duration.total_num| gauge |   | number of pod scheduling operations in the scheduler                       |
|scheduler.scheduling_duration.duration| gauge | seconds | duration of pod scheduling operations in the scheduler measured in seconds |

#### Framework Extension Duration
|Metric Name| Type  | Unit    | Description                                                         |
|----|-------|---------|---------------------------------------------------------------------|
|scheduler.framework_extension.p50latency| gauge | seconds | p50 latency of framework extension point executions                 |
|scheduler.framework_extension.p75latency| gauge | seconds | p75 latency of framework extension point executions                 |
|scheduler.framework_extension.p90latency| gauge | seconds | p90 latency of framework extension point executions                 |
|scheduler.framework_extension.p95latency| gauge | seconds | p95 latency of framework extension point executions                 |
|scheduler.framework_extension.p99latency| gauge | seconds | p99 latency of framework extension point executions                 |
|scheduler.framework_extension.total_num| gauge |   | number of framework extension point execution measured              |
|scheduler.framework_extension.duration| gauge | seconds | duration of framework extension point execution measured in seconds |

#### Scheduler Attempts
|Metric Name| Type  | Unit   | Description                         |
|----|-------|--------|-------------------------------------|
|scheduler.attempts.total_num| gauge |  | number of attempts to schedule pods |

### Runtime Metrics
| Metric Name                   | Type  | Unit   | Description                                                           |
|----------------|-------|--------|-----------------------------------------------------------------------|
| kubernetes.runtime.os_threads          | gauge |   | number of operating system threads used                               |
| kubernetes.runtime.goroutines          | gauge |   | number of goroutines active                                           |
| kubernetes.runtime.resident_memory     | gauge | bytes  | amount of memory for process code and data occupied                     |
| kubernetes.runtime.virtual_memory      | gauge | bytes  | amount of virtual memory used                                           |
| kubernetes.runtime.number_frees        | gauge |   | number of allocated memory blocks that have been freed                  |
| kubernetes.runtime.number_mallocs      | gauge |   | number of memory allocations performed                                  |
| kubernetes.runtime.heap_obtained       | gauge | bytes  | memory obtained from the operating system for the heap                  |
| kubernetes.runtime.heap_used           | gauge | bytes  | amount of heap memory in use                                            |
| kubernetes.runtime.heap_waiting        | gauge | bytes  | amount of heap memory currently unused and can be potentially allocated |
| kubernetes.runtime.number_heap_objects | gauge |   | number of allocated objects in the heap memory                |
| kubernetes.runtime.stack_obtained      | gauge | bytes  | memory obtained from the operating system for the stack space |
| kubernetes.runtime.stack_used          | gauge | bytes  | amount of stack memory in use          |
| kubernetes.runtime.gc_duration         | gauge | seconds | duration of a garbage collection event |
| kubernetes.runtime.gc_count            | gauge |   | number of garbage collection events |

## Troubleshooting

If you are having trouble sending metrics, try out the latest version of the [Sematext Agent](../agents/sematext-agent/installation/). Additionally, make sure to check out the [Agents Information panel](https://sematext.com/docs/fleet/#agent-information-panel) for any errors, and refer to our [Sematext Monitoring FAQ](https://sematext.com/docs/monitoring/spm-faq/) for useful tips.

### Cluster Roles / RBAC Rules

In case you have trouble getting data in Kubernetes Master Components reports (e.g. Kubelet, Scheduler, kube-proxy, Etcd, CoreDNS) or some of the Workloads reports (e.g. DaemonSets, StatefulSets), make sure that RBAC is enabled in your cluster. Also you'll need to update your RBAC rules configuration:

**kubectl Installation**

```
kubectl apply -f https://sematext-installer.s3.amazonaws.com/sematext-clusterroles.yaml
```

**Helm Installation**

```
helm repo add sematext https://cdn.sematext.com/helm-charts
helm repo update
```

Also, please make sure that your agent is [up to date](https://sematext.com/docs/monitoring/spm-faq/#agent-updating).

### Why we need hostNetwork access and how to turn it off if desired
Check out [our page about hostnetwork](https://sematext.com/docs/agents/sematext-agent/kubernetes/hostnetwork/).

### Setting TLS Certificate Paths
While monitoring Kubernetes master components, the Sematext agent will automatically retrieve certificates from the host machine. 
However, if the necessary paths are not present within the [common paths](https://kubernetes.io/docs/setup/best-practices/certificates/#certificate-paths), 
some additional configuration will be needed to enable querying of the metrics endpoints.

If the default TLS paths are not applicable, you can specify the correct paths using the [Kubernetes environment variables](https://sematext.com/docs/agents/sematext-agent/kubernetes/configuration/). 
These configurations can be directly placed within the DaemonSet configuration as shown below:
```yaml 
          env:
            - name: AUTODISCO_VECTOR_SERVICE_ACCOUNT
              value: sematext-agent-vector
              # ...
            - name: KUBERNETES_KUBELET_KEY_PATH
              value: "/some/custom/path"
              # ...
```


