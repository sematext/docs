

### RBAC
If your cluster has RBAC enabled add `ClusterRole` and `ClusterRoleBindings`. For `ClusterRoleBindings` you should update `REPLACE_WITH_NAMESPACE` value to match with namespace where the Sematext agent will be installed:

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
```
### Create and deploy the DaemonSet

 Create a `st-agent-ds.yml` file for the deployment (Replace Tokens and receiver URLs):

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
      containers:
      - name: agent
        image: sematext/agent:latest
        imagePullPolicy: Always
        env:
        - name: CONTAINER_TOKEN
          value: <YOUR_DOCKER_APP_TOKEN_HERE>
        - name: INFRA_TOKEN
          value: <YOUR_INFRA_APP_TOKEN_HERE>
        - name: REGION:
          value: <US or EU>
        - name: API_SERVER_HOST
          value: "0.0.0.0"
        - name: API_SERVER_PORT
          value: "80"
        - name: JOURNAL_DIR
          value: "/opt/spm/st-agent"
        - name: LOGGING_WRITE_EVENTS
          value: "false"
        - name: LOGGING_REQUEST_TRACKING
          value: "false"
        - name: LOGGING_LEVEL
          value: "info"
        - name: KUBERNETES_CLUSTER_ID
          value: <REPLACE_WITH_CLUSTER_NAME>
        - name: NODE_NAME
          valueFrom:
            fieldRef:
              fieldPath: spec.nodeName
        livenessProbe:
          httpGet:
            path: /health
            port: 80
        readinessProbe:
          httpGet:
            path: /health
            port: 80
        volumeMounts:
          - name: procfs
            mountPath: /host/proc
            readOnly: true
          - name: sysfs
            mountPath: /host/sys
            readOnly: true
          - name: etc
            mountPath: /host/etc
            readOnly: true
          - name: debugfs
            mountPath: /sys/kernel/debug
          - name: docker-sock
            mountPath: /var/run/docker.sock
          - name: journal
            mountPath: /opt/spm/st-agent
          - name: user-lib
            mountPath: /host/usr/lib
        securityContext:
          privileged: true
        ports:
          - name: http
            containerPort: 80
            protocol: TCP
      volumes:
        - name: procfs
          hostPath:
            path: /proc
        - name: sysfs
          hostPath:
            path: /sys
        - name: etc
          hostPath:
            path: /etc
        - name: debugfs
          hostPath:
            path: /sys/kernel/debug
        - name: docker-sock
          hostPath:
            path: /var/run/docker.sock
        - name: journal
          hostPath:
            path: /tmp
        - name: user-lib
          hostPath:
            path: /usr/lib
      tolerations:
      - effect: NoSchedule
        key: node-role.kubernetes.io/master
```

Deploy the DaemonSet:

```
kubectl create st-agent-ds.yml
```

## Helm chart deployment

### Install

__If you have already installed Sematext Agent helm chart with a Logs App, skip to the Upgrade section.__

This helm chart installs the Sematext Agent to all nodes in your cluster via `DaemonSet` resource.

To install it run the following command:

```bash
helm install --name sematext-agent \
  --set containerToken=<YOUR_DOCKER_APP_TOKEN_HERE> \
  --set infraToken=<YOUR_INFRA_APP_TOKEN_HERE> \
  --set region=US \
  stable/sematext-agent
```

### Upgrade

```bash
If you have already installed Sematext Agent helm chart with a Logs App, just do the upgrade:

helm upgrade sematext-agent \
  --set containerToken=<YOUR_DOCKER_APP_TOKEN_HERE> \
  --set infraToken=<YOUR_INFRA_APP_TOKEN_HERE> \
  --reuse-values \
  stable/sematext-agent
```
