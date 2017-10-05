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