Kubernetes is a portable, extensible, open-source platform for managing containerized workloads and services, that facilitates both declarative configuration and automation. Because of its ever-growing popularity, we’ve decided to create a simple yet powerful Kubernetes monitoring integration that is easy to set up. You only need to install a tiny agent that adds basically no CPU or memory overhead. 


## Monitoring Kubernetes with Sematext

Sematext Monitoring will give you detailed insights into your cluster’s health, performance metrics, resource counts amongst other important metrics. Speaking of metrics, check out [this ](https://sematext.com/docs/agents/sematext-agent/kubernetes/metrics/)page for a summarized list of the key metrics you can follow with Sematext as well as a short explanation for each one of them.




![alt_text](https://sematext.com/wp-content/uploads/2020/03/Kubernetes-Pod-Overview.png "Sematext Monitoring")



### Helm Chart

To get started with monitoring Kubernetes with Sematext you’ll have to install the Sematext Agent and the easiest way to do it is with a Helm chart. It’s available in the official charts repo and it will install to all the nodes in your cluster. To install it you’ll need to run the following command:




```
helm install --name sematext-agent \
  --set containerToken=<YOUR_CONTAINER_TOKEN> \
  --set infraToken=<YOUR_INFRA_TOKEN> \
  --set logsToken=<YOUR_LOGS_TOKEN> \
  --set region=<"US" or "EU"> \
  stable/sematext-agent
```



Check out [github ](https://github.com/helm/charts/blob/master/stable/sematext-agent/README.md)for more details.


### Sematext Operator

You can also install Sematext using an Operator using this command:




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



For those looking for a more hands-on approach, there’s a manual installation procedure with `kubectl` detailed [here](https://sematext.com/docs/agents/sematext-agent/kubernetes/installation/#manual-installation).


## Shipping Kubernetes logs to Sematext

As you are well aware, logs in Kubernetes are a bit different than your run of the mill servers and virtual machines.

When your application crashes on a traditional machine, it leaves behind a number of breadcrumbs, or logs as we call them. This is not the case with Kubernetes as every time a pod dies, gets evicted or deleted it will lose all the logs making it very difficult to figure out what caused the anomaly that led to the crash in the first place. This is where Sematext comes into play. It will help you understand what’s happening in your cluster as well as help you debug your issues in less time, without spending hours looking for the culprit.





![alt_text](https://sematext.com/docs/images/logs/logsene-ui.png "Sematext Logs")


To configure Kubernetes log shipping we’re going to use Helm.


### Helm

To install the Logagent with Helm you’ll need to run the following command:

```

helm install st-logagent \

  --set logsToken=860d2539-3e00-4b4a-969d-13b4a4f4b8e7 \

  --set region=EU \

  stable/sematext-agent

```

Deleting the logagent can be done with:

```

helm delete st-logagent

```


If you are looking to use a different type of integration you can check out this [page](https://sematext.com/docs/logagent/installation-docker/#kubernetes-and-openshift).
