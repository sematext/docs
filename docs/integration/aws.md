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

Metric Name | Key | Agg | Type | Description
--- | --- | --- | --- | ---
'reads' | aws.ec2.disk.read.bytes | Sum | Double | 
'writes' | aws.ec2.disk.write.bytes | Sum | Double | 
'rejected requests' | aws.elb.requests.rejected | Sum | Double | 
'pending requests count' | aws.elb.requests.pending | Max | Long | 
'network out' | aws.ec2.network.tx.bytes | Sum | Double | 
'network in' | aws.ec2.network.rx.bytes | Sum | Double | 
'5xx' | aws.elb.reponse.code.5xx | Sum | Double | 
'4xx' | aws.elb.reponse.code.4xx | Sum | Double | 
'consumed read/write ops' | aws.ebs.provisioned.ops.total | Sum | Double | 
'requests count' | aws.elb.requests | Sum | Double | 
'2xx' | aws.elb.backend.response.code.2xx | Sum | Double | 
'4xx' | aws.elb.backend.response.code.4xx | Sum | Double | 
'3xx' | aws.elb.backend.response.code.3xx | Sum | Double | 
'5xx' | aws.elb.backend.response.code.5xx | Sum | Double | 
'connection errors' | aws.elb.backend.connection.errors | Sum | Double | 
