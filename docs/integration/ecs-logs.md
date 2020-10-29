title: Elastic Container Service (ECS) Logs Integration
description: Whether you're using EC2 or Fargate, forward all container logs to Sematext Cloud. Get insight into your whole ECS Cluster.

By configuring either Logagent for EC2 or AWS Firelens for Fargate, you can forward all your container logs to Sematext Logs and get insight into your whole Elastic Container Service (ECS) cluster in one place!

## ECS Logs Quick Start

The ECS Logs Integration collects logs from ECS Tasks and Services running in:

- EC2 Container Instances
- Fargate 

To collect logs from EKS, see the [Kubernetes integration](./kubernetes/#shipping-kubernetes-logs-to-sematext).

## Forwarding ECS Fargate logs to Sematext

There are two main ways you can forward logs from containers running in Fargate to Sematext. They rely on two different log drivers.

- [AWS Firelens](https://docs.aws.amazon.com/AmazonECS/latest/developerguide/using_firelens.html) - `awsfirelens`
- [AWS Logs](https://docs.aws.amazon.com/AmazonECS/latest/developerguide/using_awslogs.html) - `awslogs`

We suggest you use AWS Firelens to avoid additional CloudWatch costs.

### AWS Firelens
With Firelens you can route logs to another AWS service, like Firehose, or use Fluentd or Fluent Bit. AWS provides the image for Fluentd / Fluent Bit. You need to configure the output module.

#### 1. Enable Firelens
In the ECS Task Definition, check a checkbox called Enable FireLens integration. Choose Fluent Bit and AWS will populate the image name for you.

![aws-ecs-firelens-1](../images/integrations/aws-ecs-firelens-1.png)

An additional container called `log_router` will show up.

#### 2. Configure Fluent Bit `log_router`
Next, in the same Task Definition but for your own container (not the `log_router`), you configure the `logConfiguration` like this:

```json
"logConfiguration": {
  "logDriver": "awsfirelens",
  "options": {
    "Type": "ecs",
    "Port": "443",
    "Host": "logsene-receiver.sematext.com",
    "Index": "LOGS_TOKEN",
    "TLS": "On",
    "Match": "*",
    "Name": "es"
  }
}
```

> Note: If you are using the EU region of Sematext you should set the Host like this: `"Host": "logsene-receiver.eu.sematext.com"`

This will forward all container logs to Sematext.

### AWS Logs
This log driver will forward all logs to CloudWatch. From there you can configure a Lambda function to collect the logs and forward them to Sematext. 

#### 1. Enable forwarding to CloudWatch
Your ECS task configuration JSON will contain this snippet:
    
```json
"logConfiguration": {
  "logDriver": "awslogs",
  "options": {
    "awslogs-group": "/ecs/ecs-service-name",
    "awslogs-region": "eu-central-1",
    "awslogs-stream-prefix": "ecs"
  }
}
```

#### 2. Set up a Lambda function pipeline to collect and forward CloudWatch logs to Sematext
Once configured, you need to set up a Lambda function to collect these logs from CloudWatch and send them to Sematext. You do this by [following this guide](https://sematext.com/blog/centralized-aws-lambda-logs-kinesis-serverless/). Or, if you already know how to, [here is the code for the Lambda pipeline so you can deploy](https://github.com/sematext/cloudwatch-sematext-aws-lambda-log-shipper) right away. 

All you need to do is edit the secrets to add your Sematext LOGS_TOKEN and LOGS_RECEIVER_URL. Also, don't forget to [edit the PREFIX](https://github.com/sematext/cloudwatch-sematext-aws-lambda-log-shipper/blob/39c781df576e0decb9c4bfa4e615d76805d7b69f/sample.secrets.json#L9) to match your ECS containers. E.g:

```
"PREFIX": "/ecs/ecs-service-name"
```


## Forwarding ECS EC2 logs to Sematext
When using EC2 container instances you can configure Logagent to forward container logs.

### 1. Set env vars
In the ECS Task Definition you need to make sure you have these two environment variables configured:

- LOGS_TOKEN - set to your token
- REGION - either US or EU based on the region you are using

In JSON it looks like this:

```json
{
  "requiresCompatibilities": [
    "EC2"
  ],
  ...
  "containerDefinitions": [
    {
      "name": "st-logagent",
      "image": "sematext/logagent:latest",
      ...
      "environment": [
        {
            "name": "LOGS_TOKEN",
            "value": "9c63d337-xxxx-xxxx-xxxx-abcc87342d47"
        },
        {
            "name": "REGION",
            "value": "US"
        }
      ],
      ...
    }
  ]
  ...
}
```

### 2. Set volumes
To enable log collection you must bind the Docker Socket volume from the EC2 container instance to the Logagent container.

- `/var/run/docker.sock:/var/run/docker.sock` - bind the Docker socket from the host to the Logagent container

The `/var/run/docker.sock` path on the host must be bound to the `/var/run/docker.sock` path in the container.

In JSON it looks like this:

```json
{
  "requiresCompatibilities": [
    "EC2"
  ],
  ...
  "containerDefinitions": [
    {
      "name": "st-logagent",
      "image": "sematext/logagent:latest",
      ...
      "environment": [
        {
          "name": "LOGS_TOKEN",
          "value": "9c63d337-xxxx-xxxx-xxxx-abcc87342d47"
        },
        {
          "name": "REGION",
          "value": "US"
        }
      ],
      "mountPoints": [
        {
          "sourceVolume": "docker-socket",
          "containerPath": "/var/run/docker.sock",
          "readOnly": ""
        }
      ]
      ...
    }
  ],
  "volumes": [
    {
      "host": {
        "sourcePath": "/var/run/docker.sock"
      },
      "name": "docker-socket"
    }
  ]
  ...
}
```

### 3. Run the Logagent Task Definition as a Daemon Service
When creating the Logagent service make sure to set the `Launch type` as **EC2** and `Service type` as **DAEMON**.
