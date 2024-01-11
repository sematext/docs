title: AWS S3 (CloudTrail, Flow logs, ELB access logs, etc.)
description: Subscribe to AWS Lambda log streams and ship logs to Sematext Cloud. 

If you want to automatically subscribe to AWS Lambda log streams you can use
this <a href="https://github.com/sematext/cloudwatch-sematext-aws-lambda-log-shipper" target="_blank" rel="noopener">CloudFormation stack</a>.

It'll let you run a single command and set up log group subscriptions,
funnel all CloudWatch logs to Kinesis, and use a dedicated Lambda function
to ship these logs to Sematext.

Read the [full tutorial on our blog](https://sematext.com/blog/centralized-aws-lambda-logs-kinesis-serverless/)!

You can find step-by-step instructions to set up log shipping under [Custom Integrations --> AWS Lambda](https://apps.sematext.com/ui/howto/Logsene/overview?appTypeName=Logsene&activeSection=awslambda) tab. 
