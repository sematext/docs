title: Kubernetes Monitoring Integration
description: Kubernetes is a portable, extensible, open-source platform for managing containerized workloads and services, that facilitates both declarative configuration and automation. To start monitoring Kubernetes with Sematext, you only need to install a tiny agent that adds basically no CPU or memory overhead.

Kubernetes is a portable, extensible, open-source platform for managing containerized workloads and services, that facilitates both declarative configuration and automation. To start monitoring Kubernetes with Sematext, you only need to install a tiny agent that adds basically no CPU or memory overhead.

## Monitoring Kubernetes with Sematext

Sematext Monitoring will provide you with detailed insights into your cluster's control plane components and their health, performance metrics, and resource counts, among other important metrics. Speaking of metrics, you can check out [this page ](https://sematext.com/docs/agents/sematext-agent/kubernetes/metrics/) for a summarized list of key metrics that you can track using Sematext. It also includes a short explanation for each metric.

![alt_text](https://sematext.com/wp-content/uploads/2020/03/Kubernetes-Pod-Overview.png "Sematext Monitoring")

### Agent Install
To start monitoring Kubernetes with Sematext install the Sematext Agent. Setting up the agent takes less than 5 minutes:

1.  Create a new Infra App on https://apps.sematext.com/ui/monitoring-create by choosing the INFRA App card from the list of integrations.
2.  Name your Infra App, select the Kubernetes environment and install the Sematext Agent based on your preferred installation method. Available options include kubectl and a Helm chart.

## Shipping Kubernetes logs to Sematext

Due to its nature, Kubernetes can be difficult to debug and without proper tooling this process will take a lot longer than it has too. Sematext helps you shed light on what caused the anomaly that led to the crash.

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

TODO: add screenshot

#### CoreDNS Metrics

* DNS Request Latency: Measures the time taken to process DNS requests by CoreDNS
* DNS Local and Remote Cache Misses: Counts the number of cache misses for DNS queries in CoreDNS's local or remote cache.
* Error Rate: Monitors the rate of DNS errors encountered by CoreDNS

TODO: add screenshot

#### etcd Metrics

* Leader Changes: Tracks the number of times the etcd cluster leadership changes
* Disk Space Usage: Monitors the amount of disk space used by etcd
* WAL Write Latency: Measures the latency of write operations to the etcd Write-Ahead Log (WAL)
* WAL Snapshot Latency: Measures the latency of taking snapshots of the etcd Write-Ahead Log (WAL)
* WAL Commit Latency: Measures the latency of committing changes from the etcd Write-Ahead Log (WAL) to the database

TODO: add screenshot

#### kube-proxy Metrics

* Service Changes: Tracks the number of changes in services detected by kube-proxy
* Endpoint Changes: Tracks the number of changes in endpoints detected by kube-proxy
* Synchronization of Proxy Rules: Measures the time taken to synchronize proxy rules for services
* Request Latency by Host, HTTP Method, Path: Measures the latency of requests proxied by kube-proxy, categorized by host, HTTP method or Path

TODO: add screenshot

#### Scheduler Metrics

* Scheduling Latency by Attempts: Measures the scheduling latency for pods based on the number of attempts made
* Failed Scheduling Attempts: Monitors the number of failed pod scheduling attempts
* Queued Pods by Queue: Tracks the number of pods currently in the scheduler's queue, categorized by the queue name
* Unschedulable Pods: Tracks the number of pods that cannot be scheduled due to resource constraints

TODO: add screenshot

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

|Name|Type|Unit|Numeric Type|Label|Description|
|----|----|----|------------|-----|-----------|
|kubernetes.cluster.pod.count|gauge|ns|long|total pod count|number of pods in the cluster|
|kubernetes.cluster.deployment.count|gauge|ns|long|total deployment count|number of deployments in the cluster|
|kubernetes.cluster.node.count|gauge|ns|long|total node count|number of node comprising the cluster|

### Pod Metrics

|Name|Type|Unit|Numeric Type|Label|Description|
|----|----|----|------------|-----|-----------|
|kubernetes.pod.restarts|counter|ns|long|pod restarts|number of pod restarts|
|kubernetes.pod.container.count|gauge|ns|long|container count|number of containers inside pod|
|kubernetes.pod.count|gauge|ns|long|pod count|pod count which is always equal to one|
|kubernetes.pod.count.succeeded|gauge|ns|long|succeeded pod count|equal to one if all containers inside pod have terminated in success|
|kubernetes.pod.count.failed|gauge|ns|long|failed pod count|equal to one if all containers inside pod have terminated and at least one container has terminated in failure|
|kubernetes.pod.count.unknown|gauge|ns|long|unknown pod count|equal to one if pod state can't be obtained|
|kubernetes.pod.count.pending|gauge|ns|long|pending pod count|equal to one if the pod has been accepted by the scheduler and his containers are waiting to be created|
|kubernetes.pod.count.running|gauge|ns|long|running pod count|equal to one if the pod has been scheduled on a node and at least one of his containers is running|

### Deployment Metrics

|Name|Type|Unit|Numeric Type|Label|Description|
|----|----|----|------------|-----|-----------|
|kubernetes.deployment.count|gauge|ns|long|deployment count|deployment count which is always equal to one|
|kubernetes.deployment.replicas|gauge|ns|long|replica count|number of active replicas|
|kubernetes.deployment.replicas.avail|gauge|ns|long|available replica count|number of available replicas. Replicas are marked as available if they are passing the health check|
|kubernetes.deployment.replicas.desired|gauge|ns|long|desired replica count|number of desired replicas as defined in the deployment|

### Storage Metrics

|Name|Type|Unit|Numeric Type|Label|Description|
|----|----|----|------------|-----|-----------|
|kubernetes.pvc.available|gauge|bytes|long|available bytes|number of available bytes in the volume|
|kubernetes.pvc.used|gauge|bytes|long|used bytes|number of used bytes in the volume|
|kubernetes.pvc.capacity|gauge|bytes|long|volume capacity|the capacity in bytes of the volume|

### Kubelet Metrics
#### PVC
|Metric Name|Unit|Description|
|----|----|-----------|
|pvc.used|int64||
|pvc.available|int64||
|pvc.capacity|int64||

#### RuntimeOperation
|Metric Name|Unit|Description|
|----|----|-----------|
|kubelet.runtime_operation.count|int64||
|kubelet.runtime_operation.errors|int64||
|kubelet.runtime_operation.total_num|int64||
|kubelet.runtime_operation.duration|float64||
|kubelet.runtime_operation.p50latency|float64||
|kubelet.runtime_operation.p75latency|float64||
|kubelet.runtime_operation.p90latency|float64||
|kubelet.runtime_operation.p95latency|float64||
|kubelet.runtime_operation.p99latency|float64||

#### Kubelet
|Metric Name|Unit|Description|
|----|----|-----------|
|kubelet.pods.instances|int||
|kubelet.pods.running|float64||
|kubelet.pods.started|float64||
|kubelet.pods.started_error|float64||
|kubelet.containers.created|float64||
|kubelet.containers.exited|float64||
|kubelet.containers.running|float64||
|kubelet.containers.unknown|float64||

#### PodStartDuration
|Metric Name|Unit|Description|
|----|----|-----------|
|kubelet.pod_start.total_num|float64||
|kubelet.pod_start.duration|float64||
|kubelet.pod_start.p50latency|float64||
|kubelet.pod_start.p75latency|float64||
|kubelet.pod_start.p90latency|float64||
|kubelet.pod_start.p95latency|float64||
|kubelet.pod_start.p99latency|float64||

#### PodWorkerDuration
|Metric Name|Unit|Description|
|----|----|-----------|
|kubelet.pod_worker.total_num|int64||
|kubelet.pod_worker.duration|float64||
|kubelet.pod_worker.p50latency|float64||
|kubelet.pod_worker.p75latency|float64||
|kubelet.pod_worker.p90latency|float64||
|kubelet.pod_worker.p95latency|float64||
|kubelet.pod_worker.p99latency|float64||

#### PodWorkerStartDuration
|Metric Name|Unit|Description|
|----|----|-----------|
|kubelet.pod_worker_start.total_num|int64||
|kubelet.pod_worker_start.duration|float64||
|kubelet.pod_worker_start.p50latency|float64||
|kubelet.pod_worker_start.p75latency|float64||
|kubelet.pod_worker_start.p90latency|float64||
|kubelet.pod_worker_start.p95latency|float64||
|kubelet.pod_worker_start.p99latency|float64||

#### VolumeManager
|Metric Name|Unit|Description|
|----|----|-----------|
|kubelet.volume_manager.count|float64||
|kubelet.volume_manager.desired.count|float64||

#### StorageOperation
|Metric Name|Unit|Description|
|----|----|-----------|
|kubelet.storage.total_num|int64||
|kubelet.storage.duration|float64||
|kubelet.storage.p50latency|float64||
|kubelet.storage.p75latency|float64||
|kubelet.storage.p90latency|float64||
|kubelet.storage.p95latency|float64||
|kubelet.storage.p99latency|float64||

#### CGroupManager
|Metric Name|Unit|Description|
|----|----|-----------|
|kubelet.cgroup.total_num|int64||
|kubelet.cgroup.duration|float64||
|kubelet.cgroup.p50latency|float64||
|kubelet.cgroup.p75latency|float64||
|kubelet.cgroup.p90latency|float64||
|kubelet.cgroup.p95latency|float64||
|kubelet.cgroup.p99latency|float64||

#### PLEGRelistInterval
|Metric Name|Unit|Description|
|----|----|-----------|
|kubelet.pleg_relist_interval.total_num|int64||
|kubelet.pleg_relist_interval.duration|float64||
|kubelet.pleg_relist_interval.p50latency|float64||
|kubelet.pleg_relist_interval.p75latency|float64||
|kubelet.pleg_relist_interval.p90latency|float64||
|kubelet.pleg_relist_interval.p95latency|float64||
|kubelet.pleg_relist_interval.p99latency|float64||

#### ContainerLogFilesystemUsed
|Metric Name|Unit|Description|
|----|----|-----------|
|kubelet.container_log_filesystem.total_num|float64||

#### DockerOperations
|Metric Name|Unit|Description|
|----|----|-----------|
|kubelet.docker_operation.errors|float64||
|kubelet.docker_operation.operations|float64||
|kubelet.docker_operation.total_num|int64||
|kubelet.docker_operation.duration|float64||
|kubelet.docker_operation.p50latency|float64||
|kubelet.docker_operation.p75latency|float64||
|kubelet.docker_operation.p90latency|float64||
|kubelet.docker_operation.p95latency|float64||
|kubelet.docker_operation.p99latency|float64||

#### HTTPInflightRequest
|Metric Name|Unit|Description|
|----|----|-----------|
|kubelet.http_inflight_request.total_num|float64||

#### HTTPRequestDuration
|Metric Name|Unit|Description|
|----|----|-----------|
|kubelet.http_request.operations|float64||
|kubelet.http_request.total_num|int64||
|kubelet.http_request.duration|float64||
|kubelet.http_request.p50latency|float64||
|kubelet.http_request.p75latency|float64||
|kubelet.http_request.p90latency|float64||
|kubelet.http_request.p95latency|float64||
|kubelet.http_request.p99latency|float64||

#### NetworkPluginOperations
|Metric Name|Unit|Description|
|----|----|-----------|
|kubelet.network_plugin_operation.errors|float64||
|kubelet.network_plugin_operation.operations|float64||
|kubelet.network_plugin_operation.total_num|int64||
|kubelet.network_plugin_operation.duration|float64||
|kubelet.network_plugin_operation.p50latency|float64||
|kubelet.network_plugin_operation.p75latency|float64||
|kubelet.network_plugin_operation.p90latency|float64||
|kubelet.network_plugin_operation.p95latency|float64||
|kubelet.network_plugin_operation.p99latency|float64||

#### PLEGRelistDuration
|Metric Name|Unit|Description|
|----|----|-----------|
|kubelet.pleg_relist.total_num|int64||
|kubelet.pleg_relist.duration|float64||
|kubelet.pleg_relist.p50duration|float64||
|kubelet.pleg_relist.p75duration|float64||
|kubelet.pleg_relist.p90duration|float64||
|kubelet.pleg_relist.p95duration|float64||
|kubelet.pleg_relist.p99duration|float64||

#### StartedContainers
|Metric Name|Unit|Description|
|----|----|-----------|
|kubelet.started_containers.errors|float64||
|kubelet.started_containers.total_num|float64||

#### VolumeStatsInode
|Metric Name|Unit|Description|
|----|----|-----------|
|kubelet.volume_stats_inode.free|float64||
|kubelet.volume_stats_inode.used|float64||
|kubelet.volume_stats_inode.maximum|float64||

#### PLEGEvents
|Metric Name|Unit|Description|
|----|----|-----------|
|kubelet.pleg_events.discard|int64||
|kubelet.pleg_events.last_seen|int64||

### API Server Metrics
#### InflightRequests
|Metric Name|Unit|Description|
|----|----|-----------|
|apiserver.inflight_requests.total_num|uint64|Maximal number of currently used inflight request limit of this apiserver per request kind in last second|

#### AuditEvents
|Metric Name|Unit|Description|
|----|----|-----------|
|apiserver.audit_events.total_num|uint64|Counter of audit events generated and sent to the audit backend|

#### WorkqueueAdds
|Metric Name|Unit|Description|
|----|----|-----------|
|apiserver.work_queue_adds.total_num|uint64|Total number of adds handled by workqueue|

#### EtcdRequestDuration
|Metric Name|Unit|Description|
|----|----|-----------|
|apiserver.etcd_request_duration.p50latency|float64||
|apiserver.etcd_request_duration.p75latency|float64||
|apiserver.etcd_request_duration.p90latency|float64||
|apiserver.etcd_request_duration.p95latency|float64||
|apiserver.etcd_request_duration.p99latency|float64||
|apiserver.etcd_request_duration.duration|float64|Etcd request latency in seconds for each operation and object type|
|apiserver.etcd_request_duration.total_num|uint64||

#### StorageObjects
|Metric Name|Unit|Description|
|----|----|-----------|
|apiserver.storage_objects.total_num|uint64|Number of stored objects at the time of last check split by kind|

#### ClientRequests
|Metric Name|Unit|Description|
|----|----|-----------|
|apiserver.client_requests.total_num|uint64|Number of HTTP requests|

#### RejectedAuditReq
|Metric Name|Unit|Description|
|----|----|-----------|
|apiserver.rejected_audit_req.total_num|uint64||

#### CurrentExecutingReqs
|Metric Name|Unit|Description|
|----|----|-----------|
|apiserver.current_executing_reqs.total_num|uint64|Number of requests in regular execution phase in the API Priority and Fairness system|

#### CurrentInqueueReqs
|Metric Name|Unit|Description|
|----|----|-----------|
|apiserver.current_inqueue_reqs.total_num|uint64|Number of requests currently pending in queues of the API Priority and Fairness system|

#### DispatchedReq
|Metric Name|Unit|Description|
|----|----|-----------|
|apiserver.dispatched_req.total_num|uint64|Number of requests released by API Priority and Fairness system for service|

#### ClientReqDuration
|Metric Name|Unit|Description|
|----|----|-----------|
|apiserver.client_req_duration.p50latency|float64||
|apiserver.client_req_duration.p75latency|float64||
|apiserver.client_req_duration.p90latency|float64||
|apiserver.client_req_duration.p95latency|float64||
|apiserver.client_req_duration.p99latency|float64||
|apiserver.client_req_duration.duration|float64|Request latency in seconds|
|apiserver.client_req_duration.total_num|uint64||

#### AdmissionDuration
|Metric Name|Unit|Description|
|----|----|-----------|
|apiserver.admission_duration.p50latency|float64||
|apiserver.admission_duration.p75latency|float64||
|apiserver.admission_duration.p90latency|float64||
|apiserver.admission_duration.p95latency|float64||
|apiserver.admission_duration.p99latency|float64||
|apiserver.admission_duration.duration|float64|Admission controller latency in seconds|
|apiserver.admission_duration.total_num|uint64||

#### StepAdmissionDuration
|Metric Name|Unit|Description|
|----|----|-----------|
|apiserver.step_admission_duration.p50latency|float64||
|apiserver.step_admission_duration.p75latency|float64||
|apiserver.step_admission_duration.p90latency|float64||
|apiserver.step_admission_duration.p95latency|float64||
|apiserver.step_admission_duration.p99latency|float64||
|apiserver.step_admission_duration.duration|float64|Admission sub-step latency in seconds|
|apiserver.step_admission_duration.total_num|uint64||

#### RegWatchers
|Metric Name|Unit|Description|
|----|----|-----------|
|apiserver.reg_watchers.total_num|uint64|Number of currently registered watchers for a given resources|

#### TLSError
|Metric Name|Unit|Description|
|----|----|-----------|
|apiserver.tls_handshake_error.total_num|uint64|Number of requests dropped with 'TLS handshake error from' error|

#### AuthDuration
|Metric Name|Unit|Description|
|----|----|-----------|
|apiserver.auth_duration.p50latency|float64||
|apiserver.auth_duration.p75latency|float64||
|apiserver.auth_duration.p90latency|float64||
|apiserver.auth_duration.p95latency|float64||
|apiserver.auth_duration.p99latency|float64||
|apiserver.auth_duration.duration|float64|Authentication duration in seconds|
|apiserver.auth_duration.total_num|uint64||

#### AuthUserReq
|Metric Name|Unit|Description|
|----|----|-----------|
|apiserver.auth_user_req.total_num|uint64|Counter of authenticated requests|

#### ClientCertExpiry
|Metric Name|Unit|Description|
|----|----|-----------|
|apiserver.client_cert_expiry.p50latency|float64||
|apiserver.client_cert_expiry.p75latency|float64||
|apiserver.client_cert_expiry.p90latency|float64||
|apiserver.client_cert_expiry.p95latency|float64||
|apiserver.client_cert_expiry.p99latency|float64||
|apiserver.client_cert_expiry.duration|float64|Distribution of the remaining lifetime on the certificate used to authenticate a request|
|apiserver.client_cert_expiry.total_num|uint64||

#### EvaluatedObj
|Metric Name|Unit|Description|
|----|----|-----------|
|apiserver.evaluated_object.total_num|uint64|Number of objects tested in the course of serving a LIST request from storage|

#### FetchedObj
|Metric Name|Unit|Description|
|----|----|-----------|
|apiserver.fetched_object.total_num|uint64|Number of objects read from storage in the course of serving a LIST request|

#### ReturnedObj
|Metric Name|Unit|Description|
|----|----|-----------|
|apiserver.returned_object.total_num|uint64|Number of objects returned for a LIST request from storage|

#### TotalObj
|Metric Name|Unit|Description|
|----|----|-----------|
|apiserver.total_object.total_num|uint64|Number of LIST requests served from storage|

#### KeyGenFails
|Metric Name|Unit|Description|
|----|----|-----------|
|apiserver.key_gen_fails.total_num|uint64|Total number of failed data encryption key(DEK) generation operations|

#### ApisrwerCacheMisses
|Metric Name|Unit|Description|
|----|----|-----------|
|apiserver.cache_misses.total_num|uint64|Total number of cache misses while accessing key decryption key(KEK)|

#### KeyGenDuration
|Metric Name|Unit|Description|
|----|----|-----------|
|apiserver.key_gen_duration.p50latency|float64||
|apiserver.key_gen_duration.p75latency|float64||
|apiserver.key_gen_duration.p90latency|float64||
|apiserver.key_gen_duration.p95latency|float64||
|apiserver.key_gen_duration.p99latency|float64||
|apiserver.key_gen_duration.duration|float64|Latencies in seconds of data encryption key(DEK) generation operations|
|apiserver.key_gen_duration.total_num|uint64||

#### RequestTotal
|Metric Name|Unit|Description|
|----|----|-----------|
|apiserver.request_total.total_num|uint64|Counter of apiserver requests|

#### APIServerRequestDuration
|Metric Name|Unit|Description|
|----|----|-----------|
|apiserver.request_duration.p50latency|float64||
|apiserver.request_duration.p75latency|float64||
|apiserver.request_duration.p90latency|float64||
|apiserver.request_duration.p95latency|float64||
|apiserver.request_duration.p99latency|float64||
|apiserver.request_duration.duration|float64|Response latency distribution in seconds|
|apiserver.request_duration.total_num|uint64||

### Etcd Metrics
#### Generic
|Metric Name|Unit|Description|
|----|----|-----------|
|etcd.has_leader|uint64|Whether or not a leader exists|
|etcd.leader.changes_seen|uint64|The number of leader changes seen|
|etcd.proposals.applied|uint64|The total number of consensus proposals applied|
|etcd.proposals.committed|uint64|The total number of consensus proposals committed|
|etcd.proposals.failed|uint64|The total number of failed proposals seen|
|etcd.proposals.pending|uint64|The current number of pending proposals to commit|
|etcd.version|float64|Which version is running|

#### Commit
|Metric Name|Unit|Description|
|----|----|-----------|
|etcd.disk_backend_commit.p50latency|float64||
|etcd.disk_backend_commit.p75latency|float64||
|etcd.disk_backend_commit.p90latency|float64||
|etcd.disk_backend_commit.p95latency|float64||
|etcd.disk_backend_commit.p99latency|float64||
|etcd.disk_backend_commit.total_num|uint64||
|etcd.disk_backend_commit.duration|float64|The latency distributions of commit called by backend|

#### WAL
|Metric Name|Unit|Description|
|----|----|-----------|
|etcd.disk_wal_fsync.p50latency|float64||
|etcd.disk_wal_fsync.p75latency|float64||
|etcd.disk_wal_fsync.p90latency|float64||
|etcd.disk_wal_fsync.p95latency|float64||
|etcd.disk_wal_fsync.p99latency|float64||
|etcd.disk_wal_fsync.total_num|uint64||
|etcd.disk_wal_fsync.duration|float64|The latency distributions of fsync called by WAL|

#### Backend Snapshots
|Metric Name|Unit|Description|
|----|----|-----------|
|etcd.disk_backend_snapshot.p50latency|float64||
|etcd.disk_backend_snapshot.p75latency|float64||
|etcd.disk_backend_snapshot.p90latency|float64||
|etcd.disk_backend_snapshot.p95latency|float64||
|etcd.disk_backend_snapshot.p99latency|float64||
|etcd.disk_backend_snapshot.total_num|uint64||
|etcd.disk_backend_snapshot.duration|float64|The latency distribution of backend snapshots|

#### GRPC Received
|Metric Name|Unit|Description|
|----|----|-----------|
|etcd.grpc.msg.received|uint64|The total number of bytes received from grpc clients|

#### GRPC Sent
|Metric Name|Unit|Description|
|----|----|-----------|
|etcd.grpc.msg.sent|uint64|The total number of bytes sent to grpc clients|

#### GRPC Started
|Metric Name|Unit|Description|
|----|----|-----------|
|etcd.grpc.started|uint64||

#### GRPC Total
|Metric Name|Unit|Description|
|----|----|-----------|
|etcd.grpc.handled|uint64|Total number of RPCs completed on the server, regardless of success or failure|

#### MVCC
|Metric Name|Unit|Description|
|----|----|-----------|
|etcd.mvcc.keys|uint64|Total number of keys|
|etcd.mvcc.events|uint64|Total number of events sent by this member|
|etcd.mvcc.keys_bytes|uint64||
|etcd.mvcc.watch_stream|uint64|Total number of watch streams|
|etcd.mvcc.watcher|uint64|Total number of watchers|
|etcd.mvcc.db_read|uint64|The number of currently open read transactions|
|etcd.mvcc.db_size|uint64|Total size of the underlying database physically allocated in bytes.|
|etcd.mvcc.db_used|uint64|Total size of the underlying database logically in use in bytes|
|etcd.mvcc.puts|uint64|Total number of puts seen by this member|
|etcd.mvcc.deletes|uint64|Total number of deletes seen by this member|
|etcd.mvcc.slow_watches|uint64|Total number of unsynced slow watchers|
|etcd.watch.requests|uint64|Total number of incoming watch requests (new or reestablished)|
|etcd.store.watchers|uint64|Count of currently active watchers|

#### Commit Rebalance
|Metric Name|Unit|Description|
|----|----|-----------|
|etcd.commit_rebalance_duration.p50latency|float64||
|etcd.commit_rebalance_duration.p75latency|float64||
|etcd.commit_rebalance_duration.p90latency|float64||
|etcd.commit_rebalance_duration.p95latency|float64||
|etcd.commit_rebalance_duration.p99latency|float64||
|etcd.commit_rebalance_duration.total_num|uint64||
|etcd.commit_rebalance_duration.duration|float64|The latency distributions of commit.rebalance called by bboltdb backend|

#### Commit Write
|Metric Name|Unit|Description|
|----|----|-----------|
|etcd.commit_write.p50latency|float64||
|etcd.commit_write.p75latency|float64||
|etcd.commit_write.p90latency|float64||
|etcd.commit_write.p95latency|float64||
|etcd.commit_write.p99latency|float64||
|etcd.commit_write.total_num|uint64||
|etcd.commit_write.duration|float64|The latency distributions of commit.write called by bboltdb backend|

#### DB Compaction Duration
|Metric Name|Unit|Description|
|----|----|-----------|
|etcd.mvcc_db_compaction.p50latency|float64||
|etcd.mvcc_db_compaction.p75latency|float64||
|etcd.mvcc_db_compaction.p90latency|float64||
|etcd.mvcc_db_compaction.p95latency|float64||
|etcd.mvcc_db_compaction.p99latency|float64||
|etcd.mvcc_db_compaction.total_num|uint64|Db compaction total duration|
|etcd.mvcc_db_compaction.duration|float64||

### Kube-proxy Metrics
#### Generic
|Metric Name|Unit|Description|
|----|----|-----------|
|kubeproxy.endpoint.changes|uint64|Cumulative proxy rules Endpoint changes|
|kubeproxy.endpoint.changes_pending|uint64|Pending proxy rules Endpoint changes|
|kubeproxy.restore.failures|uint64|Cumulative proxy iptables restore failures|
|kubeproxy.service.changes|uint64|Cumulative proxy rules Service changes|
|kubeproxy.service.changes_pending|uint64|Pending proxy rules Service changes|

#### Client Requests
|Metric Name|Unit|Description|
|----|----|-----------|
|kubeproxy.rest_client.total_num|uint64|Number of HTTP requests, partitioned by status code, method, and host|

#### Client Duration
|Metric Name|Unit|Description|
|----|----|-----------|
|kubeproxy.rest_client_duration.p50latency|float64||
|kubeproxy.rest_client_duration.p75latency|float64||
|kubeproxy.rest_client_duration.p90latency|float64||
|kubeproxy.rest_client_duration.p95latency|float64||
|kubeproxy.rest_client_duration.p99latency|float64||
|kubeproxy.rest_client_duration.duration|float64|Request latency in seconds|
|kubeproxy.rest_client_duration.total_num|uint64||

#### Sync Proxy Rules Duration
|Metric Name|Unit|Description|
|----|----|-----------|
|kubeproxy.sync_proxy_rules.p50latency|float64||
|kubeproxy.sync_proxy_rules.p75latency|float64||
|kubeproxy.sync_proxy_rules.p90latency|float64||
|kubeproxy.sync_proxy_rules.p95latency|float64||
|kubeproxy.sync_proxy_rules.p99latency|float64||
|kubeproxy.sync_proxy_rules.duration|float64|SyncProxyRules latency in seconds|
|kubeproxy.sync_proxy_rules.total_num|uint64||

#### Runtime
|Metric Name|Unit|Description|
|----|----|-----------|
|kubeproxy.runtime.os_threads|uint64||
|kubeproxy.runtime.goroutines|uint64||
|kubeproxy.runtime.resident_memory|uint64||
|kubeproxy.runtime.virtual_memory|uint64||
|kubeproxy.runtime.number_frees|uint64||
|kubeproxy.runtime.number_mallocs|uint64||
|kubeproxy.runtime.heap_obtained|uint64||
|kubeproxy.runtime.heap_used|uint64||
|kubeproxy.runtime.heap_waiting|uint64||
|kubeproxy.runtime.number_heap_objects|uint64||
|kubeproxy.runtime.stack_obtained|uint64||
|kubeproxy.runtime.stack_used|uint64||
|kubeproxy.runtime.gc_duration|float64||
|kubeproxy.runtime.gc_count|uint64||

### CoreDNS Metrics
#### GS
|Metric Name|Unit|Description|
|----|----|-----------|
|coredns.cache.entries|uint64||
|coredns.cache.hits|uint64||
|coredns.cache.misses|uint64||
|coredns.panics.total_num|uint64||
|coredns.failed_reloads.total_num|uint64||
|coredns.healthcheck_broken.total_num|uint64||
|coredns.forward_max_concurrent_rejects.total_num|uint64||

#### RDL
|Metric Name|Unit|Description|
|----|----|-----------|
|coredns.request_duration.p50latency|float64||
|coredns.request_duration.p75latency|float64||
|coredns.request_duration.p90latency|float64||
|coredns.request_duration.p95latency|float64||
|coredns.request_duration.p99latency|float64||
|coredns.request_duration.duration|float64||
|coredns.request_duration.total_num|uint64||

#### RCZ
|Metric Name|Unit|Description|
|----|----|-----------|
|coredns.request_counter.total_num|uint64||

#### RSCC
|Metric Name|Unit|Description|
|----|----|-----------|
|coredns.response_code.total_num|uint64||

#### FCH
|Metric Name|Unit|Description|
|----|----|-----------|
|coredns.forward_cache.hits|uint64||

#### FCM
|Metric Name|Unit|Description|
|----|----|-----------|
|coredns.forward_cache.misses|uint64||

#### FRL
|Metric Name|Unit|Description|
|----|----|-----------|
|coredns.forward_request.p50latency|float64||
|coredns.forward_request.p75latency|float64||
|coredns.forward_request.p90latency|float64||
|coredns.forward_request.p95latency|float64||
|coredns.forward_request.p99latency|float64||
|coredns.forward_request.duration|float64||
|coredns.forward_request.total_num|uint64||

#### FRT
|Metric Name|Unit|Description|
|----|----|-----------|
|coredns.forward_response.total_num|uint64||

#### RuntimeCoredns
|Metric Name|Unit|Description|
|----|----|-----------|
|coredns.runtime.os_threads|uint64||
|coredns.runtime.goroutines|uint64||
|coredns.runtime.resident_memory|uint64||
|coredns.runtime.virtual_memory|uint64||
|coredns.runtime.number_frees|uint64||
|coredns.runtime.number_mallocs|uint64||
|coredns.runtime.heap_obtained|uint64||
|coredns.runtime.heap_used|uint64||
|coredns.runtime.heap_waiting|uint64||
|coredns.runtime.number_heap_objects|uint64||
|coredns.runtime.stack_obtained|uint64||
|coredns.runtime.stack_used|uint64||
|coredns.runtime.gc_duration|float64||
|coredns.runtime.gc_count|uint64||

### Scheduler Metrics
#### PA
|Metric Name|Unit|Description|
|----|----|-----------|
|scheduler.preemption_attempts.total_num|uint64||

#### PP
|Metric Name|Unit|Description|
|----|----|-----------|
|scheduler.pending_pods.total_num|uint64||

#### QIP
|Metric Name|Unit|Description|
|----|----|-----------|
|scheduler.incoming_pods.total_num|uint64||

#### SAT
|Metric Name|Unit|Description|
|----|----|-----------|
|scheduler.schedule_attempts.total_num|uint64||

#### SG
|Metric Name|Unit|Description|
|----|----|-----------|
|scheduler.go_routines.total_num|uint64||

#### SCS
|Metric Name|Unit|Description|
|----|----|-----------|
|scheduler.cache.total_num|uint64||

#### E2ESD
|Metric Name|Unit|Description|
|----|----|-----------|
|scheduler.e2e_duration.p50latency|float64||
|scheduler.e2e_duration.p75latency|float64||
|scheduler.e2e_duration.p90latency|float64||
|scheduler.e2e_duration.p95latency|float64||
|scheduler.e2e_duration.p99latency|float64||
|scheduler.e2e_duration.total_num|uint64||
|scheduler.e2e_duration.duration|float64||

#### SAD
|Metric Name|Unit|Description|
|----|----|-----------|
|scheduler.scheduling_algorithm.p50latency|float64||
|scheduler.scheduling_algorithm.p75latency|float64||
|scheduler.scheduling_algorithm.p90latency|float64||
|scheduler.scheduling_algorithm.p95latency|float64||
|scheduler.scheduling_algorithm.p99latency|float64||
|scheduler.scheduling_algorithm.total_num|uint64||
|scheduler.scheduling_algorithm.duration|float64||

#### PV
|Metric Name|Unit|Description|
|----|----|-----------|
|scheduler.preemption_victims.p50latency|float64||
|scheduler.preemption_victims.p75latency|float64||
|scheduler.preemption_victims.p90latency|float64||
|scheduler.preemption_victims.p95latency|float64||
|scheduler.preemption_victims.p99latency|float64||
|scheduler.preemption_victims.total_num|uint64||
|scheduler.preemption_victims.duration|float64||

#### PSDS
|Metric Name|Unit|Description|
|----|----|-----------|
|scheduler.scheduling_duration.p50latency|float64||
|scheduler.scheduling_duration.p75latency|float64||
|scheduler.scheduling_duration.p90latency|float64||
|scheduler.scheduling_duration.p95latency|float64||
|scheduler.scheduling_duration.p99latency|float64||
|scheduler.scheduling_duration.total_num|uint64||
|scheduler.scheduling_duration.duration|float64||

#### FEPD
|Metric Name|Unit|Description|
|----|----|-----------|
|scheduler.framework_extension.p50latency|float64||
|scheduler.framework_extension.p75latency|float64||
|scheduler.framework_extension.p90latency|float64||
|scheduler.framework_extension.p95latency|float64||
|scheduler.framework_extension.p99latency|float64||
|scheduler.framework_extension.total_num|uint64||
|scheduler.framework_extension.duration|float64||

#### PSA
|Metric Name|Unit|Description|
|----|----|-----------|
|scheduler.attempts.total_num|uint64||



## Sematext Agent

The Sematext Agent offers a versatile container engine monitoring and visibility solution that is easy to customize.


<table>
  <tr>
   <td><strong>Kubernetes Settings</strong>
   </td>
   <td>
   </td>
  </tr>
  <tr>
   <td>KUBERNETES_ENABLED
   </td>
   <td>Specifies if the Kubernetes monitoring functionality is active. Default value is <code>true</code>. To disable Kubernetes collector set <code>KUBERNETES_ENABLED=false</code>.
   </td>
  </tr>
  <tr>
   <td>KUBERNETES_EVENTS_NAMESPACE
   </td>
   <td>Designates a namespace for Kubernetes event watcher. By default all namespaces are watched for Kubernetes events and forwarded to event/log receivers.
   </td>
  </tr>
  <tr>
   <td>KUBERNETES_NAMESPACES
   </td>
   <td>Defines the comma separated list of namespaces that are queried for Kubernetes resources such as pods or deployments. By default all namespaces are fetched. You can adjust specific namespaces such as <code>KUBERNETES_NAMESPACES=default,kube-system</code>.
   </td>
  </tr>
  <tr>
   <td>KUBERNETES_INTERVAL
   </td>
   <td>Defines the collection interval for Kubernetes resources (default 10s)
   </td>
  </tr>
  <tr>
   <td>KUBERNETES_CLUSTER_ID
   </td>
   <td>Uniquely identifies the cluster where agent is deployed
   </td>
  </tr>
  <tr>
   <td>KUBERNETES_KUBELET_AUTH_TOKEN
   </td>
   <td>Specifies the path for account service token
   </td>
  </tr>
  <tr>
   <td>KUBERNETES_KUBELET_CA_PATH
   </td>
   <td>Determines the file path for the certificate authority utilized during TLS verification
   </td>
  </tr>
  <tr>
   <td>KUBERNETES_KUBELET_CERT_PATH
   </td>
   <td>Determines the file path for the certificate file utilized during TLS verification
   </td>
  </tr>
  <tr>
   <td>KUBERNETES_KUBELET_KEY_PATH
   </td>
   <td>Determines the file path for the private key utilized during TLS verification
   </td>
  </tr>
  <tr>
   <td>KUBERNETES_KUBELET_INSECURE_SKIP_TLS_VERIFY
   </td>
   <td>Indicates whether to skip TLS verification
   </td>
  </tr>
  <tr>
   <td>KUBERNETES_KUBELET_METRICS_PORT
   </td>
   <td>Specifies the port where kubelet Prometheus metrics are exposed (default 10250)
   </td>
  </tr>
</table>


You can find a complete list of **Environment Variables** available at this [link](https://sematext.com/docs/agents/sematext-agent/kubernetes/configuration/).

Containers are discovered from **_cgroupfs _** and the metrics are fetched directly through **_cgroup _** controllers. Check out [this ](https://sematext.com/docs/agents/sematext-agent/containers/metrics/)page for a complete list of the metrics shipped by the Sematext Agent.
