## Introduction

This chart installs the Sematext Agent to all nodes in your cluster via a `DaemonSet` resource.

## Prerequisites

- Kubernetes 1.13+
- You need to create [an Infra App in Sematext Cloud](https://apps.sematext.com/ui/monitoring-create/app/infra) to get your infra token.

## Installation

To install the chart for monitoring and shipping logs run the following command:

```bash
$ helm repo add sematext https://cdn.sematext.com/helm-charts/
$ helm install st-agent \
    --set infraToken=YOUR_INFRA_TOKEN \
    --set region=US \
    sematext/sematext-agent
```

To install the chart for both logs and monitoring run the following command:

```bash
$ helm repo add sematext https://cdn.sematext.com/helm-charts/
$ helm install st-agent \
    --set logsToken=YOUR_LOGS_TOKEN \
    --set infraToken=YOUR_INFRA_TOKEN \
    --set region=US \
    sematext/sematext-agent
```

To provide your infra token as a kubernetes secret instead, create a secret with `infra-token` as a key, and provide its name to the install command:

```bash
$ kubectl create secret generic sematext-secret \
    --from-literal=infra-token=YOUR_INFRA_TOKEN \
$ helm repo add sematext https://cdn.sematext.com/helm-charts/
$ helm install st-agent \
    --set existingSecret.name=sematext-secret \
    --set existingSecret.hasInfraToken=true \
    --set region=US \
    sematext/sematext-agent
```



After a few minutes, you should see your services appear in the [Discovery page in Sematext Cloud](https://apps.sematext.com/ui/discovery/services), where you can enable the collection of metrics, events and logs.

**NOTE:** If you want to use Sematext hosted in the EU region set the region parameter to `--set region=EU`. Also, it is worth mentioning that the agent is running as a privileged container.

## Removal

To uninstall the chart use:


```bash
$ helm uninstall st-agent
```

The command removes all the Kubernetes components associated with the chart and deletes the release.

## Configuration

The following table lists the configuration parameters of the `sematext-agent` chart and default values.

|             Parameter                  |            Description            |                  Default                  |
|----------------------------------------|-----------------------------------|-------------------------------------------|
| `infraToken`                           | Sematext Infra token              | `Nil` Provide your Infra token            |
| `existingSecret.name`                  | Secret with infra/logs tokens     | `Nil` Provide an existing secret          |
| `existingSecret.hasLogsToken`          | Does secret contain logs token    | `false` Enable if secret has logsToken    |
| `existingSecret.hasInfraToken`         | Does secret contain infra token   | `false` Enable if secret has infraToken   |
| `region`                               | Sematext region                   | `US` Sematext US or EU region             |
| `agent.image.repository`               | The image repository              | `sematext/agent`                          |
| `agent.image.tag`                      | The image tag                     | `latest`                                  |
| `agent.image.pullPolicy`               | Image pull policy                 | `Always`                                  |
| `agent.service.port`                   | Service port                      | `80`                                      |
| `agent.service.type`                   | Service type                      | `ClusterIP`                               |
| `agent.resources`                      | Agent resources                   | `{}`                                      |
| `serviceAccount.create`                | Create a service account          | `true`                                    |
| `serviceAccount.name`                  | Service account name              | `Nil` Defaults to chart name              |
| `priorityClassName`                    | Priority class name               | `Nil`                                     |
| `rbac.create`                          | RBAC enabled                      | `true`                                    |
| `tolerations`                          | Tolerations                       | `[]`                                      |
| `nodeSelector`                         | Node selector                     | `{}`                                      |
| `serverBaseUrl`                        | Custom Base URL                   | `Nil`                                     |
| `logsReceiverUrl`                      | Custom Logs receiver URL          | `Nil`                                     |
| `eventsReceiverUrl`                    | Custom Event receiver URL         | `Nil`                                     |
| `commandServerUrl`                     | Custom Command server URL         | `Nil`                                     |

Specify each parameter using the `--set key=value` argument to `helm install`. For example:

```bash
$ helm repo add sematext https://cdn.sematext.com/helm-charts/
$ helm install st-agent \
    --set infraToken=YOUR_INFRA_TOKEN \
    --set region=US \
    --set agent.image.tag=1.16.11 \
    --set agent.image.pullPolicy=IfNotPresent \
    sematext/sematext-agent
```

Alternatively, you can use a YAML file that specifies the values while installing the chart. For example:

```bash
$ helm repo add sematext https://cdn.sematext.com/helm-charts/
$ helm install st-agent -f custom_values.yaml sematext/sematext-agent
```
