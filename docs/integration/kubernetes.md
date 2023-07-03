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
|kubernetes.deployment.count|gauge|ns|long|deployment count|deployment count which is always equal to one|
|kubernetes.deployment.replicas|gauge|ns|long|replica count|number of active replicas|
|kubernetes.deployment.replicas.avail|gauge|ns|long|available replica count|number of available replicas. Replicas are marked as available if they are passing the health check|
|kubernetes.deployment.replicas.desired|gauge|ns|long|desired replica count|number of desired replicas as defined in the deployment|
|kubernetes.pvc.available|gauge|bytes|long|available bytes|number of available bytes in the volume|
|kubernetes.pvc.used|gauge|bytes|long|used bytes|number of used bytes in the volume|
|kubernetes.pvc.capacity|gauge|bytes|long|volume capacity|the capacity in bytes of the volume|
|kubernetes.cluster.pod.count|gauge|ns|long|total pod count|number of pods in the cluster|
|kubernetes.cluster.deployment.count|gauge|ns|long|total deployment count|number of deployments in the cluster|
|kubernetes.cluster.node.count|gauge|ns|long|total node count|number of node comprising the cluster|

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
