Kubernetes is a portable, extensible, open-source platform for managing containerized workloads and services, that facilitates both declarative configuration and automation. To start monitoring Kubernetes with Sematext, you only need to install a tiny agent that adds basically no CPU or memory overhead.

## Monitoring Kubernetes with Sematext

Sematext Monitoring will give you detailed insights into your cluster’s health, performance metrics, resource counts amongst other important metrics. Speaking of metrics, check out [this ](https://sematext.com/docs/agents/sematext-agent/kubernetes/metrics/)page for a summarized list of the key metrics you can follow with Sematext as well as a short explanation for each one of them.




![alt_text](https://sematext.com/wp-content/uploads/2020/03/Kubernetes-Pod-Overview.png "Sematext Monitoring")



### Helm Chart

To start monitoring Kubernetes with Sematext install the Sematext Agent. The easiest way to do that is with a Helm chart. It’s available in the official charts repo and it will install to all nodes in your cluster. To install it run the following command:




```
helm install --name sematext-agent \
  --set containerToken=<YOUR_CONTAINER_TOKEN> \
  --set infraToken=<YOUR_INFRA_TOKEN> \
  --set logsToken=<YOUR_LOGS_TOKEN> \
  --set region=<"US" or "EU"> \
  stable/sematext-agent
```



Check out [github](https://github.com/helm/charts/blob/master/stable/sematext-agent/README.md)for more details.


### Sematext Operator

You can also install Sematext Operator using this command:




```
kubectl apply -f https://raw.githubusercontent.com/sematext/sematext-operator/master/bundle.yaml
```




After the installation has finished you can create the SematextAgent resource that deploys the agent to all the nodes in your cluster.




```
apiVersion: sematext.com/v1alpha1
kind: SematextAgent
metadata:
  name: sematext-agent
spec:
  region: <"US" or "EU">
  containerToken: YOUR_CONTAINER_TOKEN
  logsToken: YOUR_LOGS_TOKEN
  infraToken: YOUR_INFRA_TOKEN
```



For those looking for a more hands-on approach, there’s a [manual installation procedure](https://sematext.com/docs/agents/sematext-agent/kubernetes/installation/#manual-installation) with `kubectl`.


## Shipping Kubernetes logs to Sematext


Due to it's nature, Kubernetes can be difficult to debug and without proper tooling this process will take a lot longer than it has too. Sematext helps you shed light on what caused the anomaly that led to the crash.





![alt_text](https://sematext.com/docs/images/logs/logsene-ui.png "Sematext Logs")


To configure Kubernetes log shipping we’re going to use Helm.


### Helm

To install Logagent with Helm you’ll need to run the following command:

```

helm install st-logagent \

  --set logsToken=860d2539-3e00-4b4a-969d-13b4a4f4b8e7 \

  --set region=EU \

  stable/sematext-agent

```

Deleting Logagent can be done with:

```

helm delete st-logagent

```


If you are looking to use a different type of integration you can check out this [page](https://sematext.com/docs/logagent/installation-docker/#kubernetes-and-openshift).


## Kubernetes Metrics 

Container and Kubernetes metrics are collected along with labels and tags, which are exposed in the UI to allow slicing and dicing and building of custom dashboards.


### Pod Metrics



*   Pod count - Represents the total nodes in the cluster
*   Pod restarts - The total number of pods scheduled across nodes
*   Containers count - Represents the total number ofcontainers
*   Succeeded pods - Represents the number of pods that are successfully scheduled
*   Failed pods - Represents the number of failed pods
*   Unknown pods - Represents the number of pods that are in unknown state
*   Pending pods - Is the number of pods in pending state
*   Running pods - Reflects the current number of running pods



![alt_text](https://sematext.com/wp-content/uploads/2020/04/image2.png "Sematext Kubernetes Metrics")



### Deployment



*   Current replicas - Represents the number of active deployment replicas
*   Available replicas - The number of pod instances targeted by the deployment
*   Desired replicas - Is the of number of non-terminated pods targeted by the deployment that have the desired template specification



![alt_text](https://sematext.com/wp-content/uploads/2020/04/image6.png "Sematext Kubernetes Metrics")



### Storage



*   Read bytes - Is the number of bytes read from the disk
*   Read time - Represents the total amount of time (in nanoseconds) between read request dispatch and request completion
*   Read wait time - Represents total amount of time the read I/O operations for the container spent waiting in the scheduler queues
*   Write bytes - Is the number of bytes written to the disk
*   Write time - Represents the total amount of time (in nanoseconds) between write request dispatch and request completion
*   Write wait - time	Represents total amount of time the write I/O operations for the container spent waiting in the scheduler queues


![alt_text](https://sematext.com/wp-content/uploads/2020/04/image1.png "Sematext Kubernetes Metrics")



### Network


*   Received bytes - Received amount of bytes on the network interface
*   Received packets - Received amount of packets on the network interface
*   Received errors - Received amount of errors on the network interface
*   Dropped ingresspackets - The amount of dropped inbound packets on the network interface
*   Transmitted bytes - Transmitted amount of bytes on the network interface
*   Transmitted packets - Transmitted amount of packets on the network interface
*   Transmitted errors - Transmitted amount of errors on the network interface
*   Dropped egress packets - The amount of dropped outbound packets on the network interface

![alt_text](https://sematext.com/wp-content/uploads/2020/04/network.png "Sematext Kubernetes Metrics")

### Memory


*   Memory fail counter - Is the number of times that memory cgroup limit was exceeded
*   Memory limit - Designates the max allowed memory limit for the container cgroup
*   Memory pages in - The number of events each time the page is accounted to the container cgroup
*   Memory pages out - Is the number of events each time a page is unaccounted from the container cgroup
*   Memory pages fault - Represents the number of page faults accounted the cgroup
*   Swap size	Is - the number of bytes of swap usage

### CPU


*   Cpu usage - Represents the container CPU usage in %
*   Throttled time - Is the total amount of time that processes have been throttled in the container cgroup

![alt_text](https://sematext.com/wp-content/uploads/2020/04/CPU.png "Sematext Kubernetes Metrics")



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
