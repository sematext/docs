## AWS Monitoring

### Which IAM permissions are needed to fetch Amazon EC2, EBS and ELB metrics

When you create an AWS app, you need to provide the access key and secret for a user that can fetch metrics for EC2, EBS and/or ELB, depending on which of those you select to be monitored. We recommend creating a separate IAM user for this, with the minimum permissions:
``` bash
{
    "Version": "2012-10-17",
    "Statement": [
        {
            "Effect": "Allow",
            "Action": [
                "ec2:DescribeInstances",
                "ec2:DescribeAddresses",
                "ec2:DescribeVolumes",
                "elasticloadbalancing:DescribeLoadBalancers",
                "cloudwatch:GetMetricStatistics",
                "cloudwatch:ListMetrics"'
            ],
            "Resource": [
                "*"
            ]
        }
    ]
}
```
The Describe* permissions are needed to identify the resources which need to be monitored (Instances and Addresses for EC2, Volumes for EBS and LoadBalancers for ELB), while GetMetricStatistics will allow SPM to fetch the actual metrics from CloudWatch.

## Metrics

### Report: Health

#### Chart: Health
Metric Name | Metric Description
--- | ---
'healthy instances' | 
'unhealthy instances' | 



### Report: CPU

#### Chart: Read/Write Operations
Metric Name | Metric Description
--- | ---
'disk reads' | 
'disk writes' | 

#### Chart: Disk Reads/Writes (Bytes)
Metric Name | Metric Description
--- | ---
'reads' | 
'writes' | 



### Report: Requests Queue

#### Chart: Rejected Requests
Metric Name | Metric Description
--- | ---
'rejected requests' | 

#### Chart: Pending Requests
Metric Name | Metric Description
--- | ---
'pending requests count' | 



### Report: CPU

#### Chart: CPU Utilization
Metric Name | Metric Description
--- | ---
'cpu utilization' | 



### Report: Status Check

#### Chart: Status Check
Metric Name | Metric Description
--- | ---
'status check failed' | 
'status check failed (instance)' | 
'status check failed (system)' | 



### Report: CPU

#### Chart: Network
Metric Name | Metric Description
--- | ---
'network in' | 
'network out' | 



### Report: EBS

#### Chart: % Time Spent Idle
Metric Name | Metric Description
--- | ---
'% Time Spent Idle' | 

#### Chart: Average Queue Length
Metric Name | Metric Description
--- | ---
'avg queue length' | 

#### Chart: Average Read/Write Latency
Metric Name | Metric Description
--- | ---
'avg. read latency' | 
'avg. write latency' | 

#### Chart: Read/Write Bandwidth
Metric Name | Metric Description
--- | ---
'read bandwidth' | 
'write bandwidth' | 

#### Chart: Average Read/Write Size
Metric Name | Metric Description
--- | ---
'avg. read size' | 
'avg. write size' | 

#### Chart: Read/Write Throughput
Metric Name | Metric Description
--- | ---
'read throughput' | 
'write throughput' | 



### Report: ELB Responses

#### Chart: ELB Responses
Metric Name | Metric Description
--- | ---
'4xx' | 
'5xx' | 



### Report: Provisioned IOPS

#### Chart: Consumed Read/Write Ops
Metric Name | Metric Description
--- | ---
'consumed read/write ops' | 

#### Chart: Volume Throughput Percentage
Metric Name | Metric Description
--- | ---
'throughtput percentage' | 



### Report: Requests

#### Chart: Latency
Metric Name | Metric Description
--- | ---
'latency min' | 
'latency max' | 
'latency avg' | 

#### Chart: Requests
Metric Name | Metric Description
--- | ---
'requests count' | 



### Report: Backend Responses

#### Chart: Backend Responses
Metric Name | Metric Description
--- | ---
'2xx' | 
'3xx' | 
'4xx' | 
'5xx' | 

#### Chart: Connection Errors
Metric Name | Metric Description
--- | ---
'connection errors' | 


