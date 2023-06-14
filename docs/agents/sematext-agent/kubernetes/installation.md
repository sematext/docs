title: Installing Sematext Agent on Kubernetes

## Helm Chart

The preferred way to install Sematext Agent is via a Helm chart. [Sematext Agent helm chart](https://github.com/sematext/helm-charts/tree/master/charts/sematext-agent) is available in official charts' repositories, and it installs the Sematext Agent to all nodes in your cluster via `DaemonSet` resource.

To install it, run the following command:

```sh
helm install --name sematext-agent \
  --set infraToken=<YOUR_INFRA_TOKEN> \
  --set region=<"US" or "EU"> \
  stable/sematext-agent
```

For more details, refer to our [helm chart docs](helm.md).

## Sematext Operator

The Sematext Operator for Kubernetes provides an easy way to deploy Sematext Agent.
Sematext Operator is available in [OperatorHub.io](https://operatorhub.io/?keyword=sematext), and in RedHat's OpenShift Container Platform.

To install the operator, run the following command:

```sh
kubectl apply -f https://raw.githubusercontent.com/sematext/sematext-operator/master/bundle.yaml
```

Once installed, you can create `SematextAgent` resource that deploys Sematext Agent to all nodes in your cluster via `DaemonSet` resource:

```yaml
apiVersion: sematext.com/v1alpha1
kind: SematextAgent
metadata:
  name: test-sematextagent
spec:
  region: <"US" or "EU">
  infraToken: YOUR_INFRA_TOKEN
```

This operator uses all the same options as the Sematext Agent helm chart.
For more details refer to [operator docs](operator.md).

## Manual Installation

### Configure RBAC

If your cluster has RBAC enabled add `ClusterRole` and `ClusterRoleBindings` resources.

Create a `st-agent-crb.yml` file for the `ClusterRole` and the `ClusterRoleBinding`. For `ClusterRoleBindings` you should also update `REPLACE_WITH_NAMESPACE` value to match with namespace where the Sematext Agent will be installed:

```yaml
apiVersion: rbac.authorization.k8s.io/v1
kind: ClusterRoleBinding
metadata:
  name: sematext-agent
  labels:
    app: sematext-agent
roleRef:
  apiGroup: rbac.authorization.k8s.io
  kind: ClusterRole
  name: sematext-agent
subjects:
- kind: ServiceAccount
  name: sematext-agent
  namespace: <REPLACE_WITH_NAMESPACE>
---
apiVersion: rbac.authorization.k8s.io/v1
kind: ClusterRole
metadata:
  name: sematext-agent
  labels:
    app: sematext-agent
rules:
- apiGroups:
  - ""
  resources:
  - events
  - pods
  - configmaps
  - nodes
  - secrets
  verbs:
  - list
  - get
  - watch
- apiGroups:
  - ""
  resources:
  - nodes/metrics
  verbs:
  - get
  - create
- apiGroups:
  - ""
  resources:
  - pods
  - configmaps
  verbs:
  - create
  - delete
  - update
- apiGroups:
  - apps
  resources:
  - deployments
  verbs:
  - watch
  - list
- apiGroups:
  - extensions
  resources:
  - replicasets
  verbs:
  - get
  - watch
  - list
```

Deploy the ClusterRoleBinding and ClusterRole:

```sh
kubectl apply -f st-agent-crb.yml
```

### Create and Deploy the DaemonSet

Create a `st-agent-ds.yml` file for the deployment (replace with your token and region):

```yaml
apiVersion: v1
kind: ServiceAccount
metadata:
  name: sematext-agent
  labels:
    app: sematext-agent
---
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
  template:
    metadata:
      labels:
        app: sematext-agent
    spec:
      serviceAccountName: sematext-agent
      hostNetwork: true
      dnsPolicy: ClusterFirstWithHostNet
      containers:
      - name: agent
        image: sematext/agent:latest
        imagePullPolicy: Always
        env:
        - name: AUTODISCO_VECTOR_SERVICE_ACCOUNT
          value: sematext-agent-vector
        - name: INFRA_TOKEN
          value: <YOUR_INFRA_TOKEN>
        - name: REGION
          value: <"US" or "EU">
        - name: KUBERNETES_CLUSTER_ID
          value: "default"
        - name: API_SERVER_PORT
          value: "8675"
        - name: STA_NAMESPACE
          valueFrom:
          fieldRef:
            fieldPath: metadata.namespace
        livenessProbe:
          httpGet:
            path: /health
            port: 8675
        readinessProbe:
          httpGet:
            path: /health
            port: 8675
        volumeMounts:
          - name: hostfs
            mountPath: /hostfs
            readOnly: true
          - name: sysfs
            mountPath: /host/sys
            readOnly: true
          - name: passwd
            mountPath: /etc/passwd
            readOnly: true
          - name: group
            mountPath: /etc/group
            readOnly: true
          - name: debugfs
            mountPath: /sys/kernel/debug
          - name: run
            mountPath: /var/run/
        securityContext:
          privileged: true
        ports:
          - name: http
            containerPort: 8675
            protocol: TCP
      volumes:
        - name: hostfs
          hostPath:
            path: /
        - name: sysfs
          hostPath:
            path: /sys
        - name: passwd
          hostPath:
            path: /etc/passwd
        - name: group
          hostPath:
            path: /etc/group
        - name: debugfs
          hostPath:
            path: /sys/kernel/debug
        - name: run
          hostPath:
            path: /var/run/
      tolerations:
      - effect: NoSchedule
        key: node-role.kubernetes.io/master
```

_[Read more](../permission-requirements.md#bind-mounts) about why Sematext Agent needs access to host files and directories._

Deploy the DaemonSet:

```sh
kubectl apply -f st-agent-ds.yml
```
