title: AWS CloudWatch Logs
description: Ship CloudWatch logs to Sematext Cloud. 

If you want to ship CloudWatch logs, you can use <a
href="https://github.com/sematext/logsene-aws-lambda-cloudwatch"
target="_blank" rel="noopener">another AWS Lambda function</a>. If
logs are VPC flowlogs, the Lambda function will also parse them and
add geoIP information on the source IP addresses.

You can find step-by-step instructions to set up log shipping under [Custom Integrations --> CloudWatch](https://apps.sematext.com/ui/howto/Logsene/overview?appTypeName=Logsene&activeSection=awscloudwatch) tab. 
