title: Elastic Container Service (ECS) Logs Integration
description: Whether you're using EC2 or Fargate, forward all container logs to Sematext Cloud. Get insight into your whole ECS Cluster.

By configuring either Logagent for EC2 or AWS Firelens for Fargate, you can forward all your container logs to Sematext and get insight into your whole Elastic Container Service (ECS) cluster in one place!

## ECS Logs Quick Start

The ECS Logs integration collects logs from ECS Tasks and Services running in:

- EC2 Container Instances
- Fargate 

To collect logs from EKS, see the [Kubernetes integration](./kubernetes/#shipping-kubernetes-logs-to-sematext).

### AWS ECS on AWS Fargate/EC2 With FireLens 

You can forward logs from containers running in AWS ECS on AWS Fargate/EC2 to Sematext with the help of FireLens

- [AWS FireLens](https://docs.aws.amazon.com/AmazonECS/latest/developerguide/using_firelens.html) - `awsfirelens`

With Firelens you can route logs to another AWS service, like Firehose, or use Fluentd or Fluent Bit. AWS provides the image for Fluentd / Fluent Bit. You need to configure the output module to use http and send the logs to Sematext.

#### 1. Enable FireLens
In the ECS Task Definition, check a checkbox called Enable FireLens integration. Choose Fluent Bit and AWS will populate the image name for you.

![aws-ecs-firelens-1](../images/integrations/aws-ecs-firelens-1.png)

AWS will add an additional container called `log_router` to the list of containers in your Task Definition.

#### 2. Configure AWS Metadata for your Log Driver

Make sure you have this section in the `log_router` container configuration.

```json
"firelensConfiguration": {
  "type": "fluentbit",
  "options": {
    "enable-ecs-log-metadata": "true"
  }
}
```

#### 3. Configure the FireLens Log Driver
Next, in the same Task Definition but **for your own container (not the `log_router`)**, you configure the `logConfiguration` like this, where `9c63d337-xxxx-xxxx-xxxx-abcc87342d47` is your `LOGS_TOKEN`:

```json
"logConfiguration": {
  "logDriver": "awsfirelens",
  "options": {
    "Format": "json",
    "Header_tag": "sourceName",
    "compress": "gzip",
    "Port": "443",
    "Host": "logs-ecs-receiver.sematext.com",
    "TLS": "on",
    "URI": "/9c63d337-xxxx-xxxx-xxxx-abcc87342d47",
    "Match": "*",
    "Name": "http"
  }
}
```

> Note: If you are using the EU region of Sematext you should set the Host like this: `"Host": "logs-ecs-receiver.eu.sematext.com"`

Optionally, you can manually set the `sourceName` of your logs. Instead of `"Header_tag": "sourceName"` you can set `"Header": "sourceName <SOURCE>"` if you want to parse certain types of logs. For example, `"Header": "sourceName nginx"` would parse Nginx logs.

## Next Steps

- [Set up custom alerts](../../alerts/creating-logs-alerts/)
- [Set up custom reports and components](../../logs/reports-and-components/)
- [Tagging best practices](../../tags/)