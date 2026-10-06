title: Kubernetes Configuration
description: Kubernetes settings for Sematext Agent and how to pass settings through a DaemonSet or Helm

This page covers settings for running Sematext Agent in Kubernetes. Settings that apply to every installation, such as proxy, logging, and journal settings, are on the [Sematext Agent configuration](/docs/agents/sematext-agent/configuration/) page. Container filtering settings such as `CONTAINER_SKIP_BY_IMAGE` are on the [Containers configuration](/docs/agents/sematext-agent/containers/configuration/) page and work in Kubernetes too.

## Environment Variables

| Variable | Description |
|----------|-------------|
| KUBERNETES_ENABLED | Specifies if the Kubernetes monitoring functionality is active. Default value is `true`. To disable Kubernetes collector set `KUBERNETES_ENABLED=false`. |
| KUBERNETES_EVENTS_NAMESPACE | Designates a namespace for Kubernetes event watcher. By default all namespaces are watched for Kubernetes events and forwarded to event/log receivers. |
| KUBERNETES_NAMESPACES | Defines the comma separated list of namespaces that are queried for Kubernetes resources such as pods or deployments. By default all namespaces are fetched. You can adjust specific namespaces such as `KUBERNETES_NAMESPACES=default,kube-system`. |
| KUBERNETES_INTERVAL | Defines the collection interval for Kubernetes resources (default 10s) |
| KUBERNETES_CLUSTER_ID | Uniquely identifies the cluster where agent is deployed |
| KUBERNETES_KUBELET_AUTH_TOKEN | Specifies the path for account service token |
| KUBERNETES_KUBELET_CA_PATH | Determines the file path for the certificate authority utilized during TLS verification |
| KUBERNETES_KUBELET_CERT_PATH | Determines the file path for the certificate file utilized during TLS verification |
| KUBERNETES_KUBELET_KEY_PATH | Determines the file path for the private key utilized during TLS verification |
| KUBERNETES_ETCD_CA_PATH | Determines the file path for the certificate authority utilized during TLS verification |
| KUBERNETES_ETCD_KEY_PATH | Determines the file path for the private key utilized during TLS verification |
| KUBERNETES_ETCD_CERT_PATH | Determines the file path for the certificate file utilized during TLS verification |
| KUBERNETES_KUBELET_INSECURE_SKIP_TLS_VERIFY | Indicates whether to skip TLS verification |
| KUBERNETES_KUBELET_METRICS_PORT | Specifies the port where kubelet Prometheus metrics are exposed (default 10250) |

## Populating Environment Variables in Kubernetes

To populate environment variables in Kubernetes, you need to propagate the variables to the pods by including them in the DaemonSet manifest within the `env` section. Consider the following example manifest:

```yaml
apiVersion: apps/v1
kind: DaemonSet
metadata:
  name: sematext-agent
  labels:
    app: sematext-agent
spec:
  selector:
    matchLabels:
      app: sematext-agent
 # ...
          env:
            - name: AUTODISCO_VECTOR_SERVICE_ACCOUNT
              value: sematext-agent-vector
            - name: INFRA_TOKEN
              value: <your-infra-token>
            - name: KUBERNETES_CLUSTER_ID
              value: <REPLACE_WITH_CLUSTER_NAME>
            - name: API_SERVER_PORT
              value: "8675"
            - name: REGION
              value: US
          livenessProbe:
            httpGet:
              path: /health
              port: 8675
# ...
```

You can add additional environment variables by following the `name` and `value` format, where the former is the name of the variable and the latter is the value. For example, to skip certain containers based on the image like `nginx`, add the following lines:

```yaml
            - name: CONTAINER_SKIP_BY_IMAGE
              value: nginx
```

If you are using the `helm` installation option instead of `kubectl`, you can add environment variables using the `--set` directive. Also, you can skip multiple images by separating multiple image names with a comma, as in the following example:

```bash
helm install st-agent \
  --set infraToken=<your-infra-token> \
  --set region=US \
  --set clusterName=REPLACE_WITH_CLUSTER_NAME \
  --set CONTAINER_SKIP_BY_IMAGE=nginx,apache/httpd \
  --namespace=sematext \
  --create-namespace \
  sematext/sematext-agent
```

**Note:** The `CONTAINER_SKIP_BY_IMAGE` values will search for any substring match among the discovered images. Therefore, if you wish to skip the `apache/httpd` image, you can simply use `httpd`. This applies similarly to other matching and skipping options such as `CONTAINER_MATCH_BY_IMAGE`, `CONTAINER_MATCH_BY_NAME`, and `CONTAINER_SKIP_BY_NAME`.
