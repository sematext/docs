title: Integrations
descriptions: Sematext integrations with ready to use monitoring agents and log shippers for infrastructure and container monitoring, log management and analytics, alerting, chatops, and more. Our Cloud exposes the Sematext API -compatible with Elasticsearch and OpenSearch- and syslog receivers with built in anomaly detection, data analysis and visualization tools and services

Sematext supports over **100 different integrations** that automatically collect thousands of metrics and logs from your systems and applications. These integrations simplify monitoring and logging processes, offering fine-tuned **pre-built reports and alert rules** that are readily available and require no additional configuration.

Many integrations can be enabled through [Service Autodiscovery](/docs/fleet/discovery/), allowing you to start monitoring without modifying or restarting any services. This capability improves user experience by reducing setup time and facilitating easier integration.

The integrations are categorized to help you easily find solutions that suit your needs.

## Servers, Containers & Orchestration
Monitoring server infrastructures, containerized applications, and orchestration platforms.

| Integration | Description | Solution   |
|-------------|-------------|------------|
| [Infra](/docs/integration/infra/) | Monitor bare-metal servers and containerized environments | Monitoring |
| [Kubernetes](/docs/integration/kubernetes/)  | Monitor the performance and health of Kubernetes clusters | Monitoring |
| [Kubernetes Audit Logs](/docs/integration/kubernetes-audit-integration/)  | Monitor and analyze audit logs from your Kubernetes environment | Logs |
| [Linux](/docs/integration/linux/)  | Monitor and analyze log data from Linux systems     | Monitoring & Logs |
| [Windows](/docs/integration/windows/) | Monitor performance and logs from Windows Servers | Monitoring & Logs |


## Web & Application Servers
Integrations for popular web and application servers.

| Integration | Description | Solution   |
|-------------|-------------|------------|
| [Apache Web Server](/docs/integration/apache-integration/) | Monitor performance and logs from Apache web servers | Monitoring & Logs |
| [HAProxy](/docs/integration/haproxy/) | Monitor HAProxy load balancer performance | Monitoring & Logs |
| [NGINX](/docs/integration/nginx-integration/) | Collect metrics and logs from NGINX web servers | Monitoring & Logs |
| [NGINX Plus](/docs/integration/nginxplus/) | Monitor advanced features and logs from NGINX Plus | Monitoring & Logs |
| [Tomcat](/docs/integration/tomcat/) | Monitor application performance and logs from Tomcat servers | Monitoring & Logs |
| [Varnish Cache](/docs/integration/varnishcache-integration/) | Analyze caching performance and logs from Varnish | Monitoring & Logs |


## Databases & Data Stores
Integrations to monitor various databases and data storage solutions.

**Note:** For monitoring remote or managed databases (AWS RDS, Google Cloud SQL, etc.), see our [Remote Database Monitoring Guide](/docs/guide/remote-dbs-guide.md).


| Integration | Description | Solution   |
|-------------|-------------|------------|
| [Elasticsearch](/docs/integration/elasticsearch-integration/) | Monitor Elasticsearch clusters and manage log data | Monitoring & Logs |
| [OpenSearch](/docs/integration/opensearch-integration/) | Track performance and logs in OpenSearch clusters | Monitoring & Logs |
| [Solr](/docs/integration/solr-integration/) | Monitor Solr search platform performance and logs | Monitoring & Logs  |
| [SolrCloud](/docs/integration/solr-integration/) | Monitor distributed Solr Cloud installations and logs  | Monitoring & Logs |
| [MySQL](/docs/integration/mysql-integration/)          | Monitor MySQL databases and log queries | Monitoring & Logs  |
| [PostgreSQL](/docs/integration/postgresql-integration/) | Monitor PostgreSQL databases and manage log data | Monitoring & Logs  |
| [Redis](/docs/integration/redis/)       | Track performance metrics and logs from Redis instances    | Monitoring & Logs  |
| [MongoDB](/docs/integration/mongodb/)      | Monitor MongoDB databases and collect log data.  | Monitoring & Logs  |
| [Cassandra](/docs/integration/cassandra/)  | Monitor Cassandra clusters and analyze log information  | Monitoring |
| [ClickHouse](/docs/integration/clickhouse/) | Track performance metrics and logs from ClickHouse | Monitoring  |
| [Couchbase](/docs/integration/couchbase/) | Monitor Couchbase database performance and logs | Monitoring    |
| [HBase](/docs/integration/hbase/)         | Monitor HBase database performance and log information  | Monitoring |


## Big Data & Messaging Systems
Integrations that ease monitoring of big data platforms and messaging systems.

| Integration | Description | Solution   |
|-------------|-------------|------------|
| [Apache Kafka](/docs/integration/kafka/)   | Monitor Kafka brokers and track message flow   | Monitoring  |
| [Apache Hadoop](/docs/integration/hadoop/) | Monitor Hadoop clusters | Monitoring               |
| [Apache Spark](/docs/integration/spark/)   | Track performance metrics from Apache Spark jobs | Monitoring |
| [Apache Storm](/docs/integration/storm/) | Monitor real-time data processing with Apache Storm | Monitoring  |
| [Apache Zookeeper](/docs/integration/zookeeper/)  | Monitor Zookeeper for managing distributed apps | Monitoring |
| [RabbitMQ](/docs/integration/rabbitmq-integration/)  | Monitor RabbitMQ performance | Monitoring & Logs |


## Programming Languages & Frameworks
Integrations that support a variety of programming languages and frameworks.

| Integration | Description | Solution   |
|-------------|-------------|------------|
| [JVM](/docs/integration/jvm-integration/)         | Monitor Java Virtual Machine performance and logs      | Monitoring & Logs |
| [Node.js](/docs/integration/node.js/)     | Track performance metrics for Node.js applications     | Monitoring    |
| [Express.js](/docs/integration/express.js/)  | Monitor Express.js applications and manage logs        | Monitoring |
| [PHP](/docs/integration/php/)         | Track performance for PHP applications                 | Monitoring        |
| [Akka](/docs/integration/akka/)        | Monitor Akka applications for distributed computing    | Monitoring   |


## CI/CD Tools
Integrations for continuous integration and continuous deployment tools.

| Integration | Description | Solution   |
|-------------|-------------|------------|
| [Jenkins](/docs/integration/jenkins/) | Monitor CI/CD pipelines | Monitoring |
| [GitHub Webhook Events](/docs/integration/github-webhook-events-integration/) | Capture GitHub events and track related logs | Logs |
| [Terraform](/docs/integration/terraform/) | Monitor and track Terraform execution and infrastructure changes | Generic |
| [Synthetics for CI/CD](/docs/synthetics/ci-cd/overview/) | Monitor and test APIs and web performance during CI/CD processes | Synthetics |


## Cloud Services
Integrations for cloud service monitoring.

| Integration | Description | Solution   |
|-------------|-------------|------------|
| [Amazon Web Services (AWS)](/docs/integration/aws/)  | Monitor various AWS services and resources | Monitoring |
| [AWS ECS](/docs/integration/aws-ecs-logs/) | Collect and analyze logs from AWS ECS for containerized apps | Logs |
| [AWS CloudWatch](/docs/integration/aws-cw/) | Analyze logs from AWS CloudWatch for infrastructure and apps | Logs |
| [AWS Lambda](/docs/integration/aws-lambda/) | Subscribe to AWS Lambda log streams | Logs |
| [AWS S3](/docs/integration/aws-s3/) | Collect various logs from AWS S3, including CloudTrail, Flow logs and ELB access logs | Logs |


## Generic & System Logs
Integrations for managing and analyzing generic and system logs.

| Integration | Description | Solution   |
|-------------|-------------|------------|
| [Generic Logs](/docs/integration/generic-logs-integration/) | Manage and analyze various log data types |Logs |
| [Syslog](/docs/logs/syslog/) | Centralized logging for any syslog-compliant application |Logs |


## Frontend & User Experience
Integrations for monitoring the performance and responsiveness of frontend applications.

| Integration | Description | Solution   |
|-------------|-------------|------------|
| [Angular](/docs/experience/integrations/#angular) | Monitor Angular applications for performance and experience | Experience |
| [Ember](/docs/experience/integrations/#ember) | Monitor Ember applications for responsiveness| Experience  |
| [Google Tag Manager](/docs/experience/integrations/#google-tag-manager) | Integrate Experience using Google Tag Manager | Experience |
| [Micro Frontend](/docs/experience/integrations/#micro-frontend) | Monitor your micro frontend based web applications | Experience |
| [Next.js](/docs/experience/integrations/#nextjs) | Monitor Next.js applications and manage their performance | Experience |
| [React](/docs/experience/integrations/#react) | Track performance metrics and logs from React applications | Experience |
| [Server-side Rendered Websites](/docs/experience/integrations/#server-side-rendered-websites) | Monitor server-rendered websites | Experience |
| [Static Websites](/docs/experience/integrations/#static-websites) | Track experience for static web pages | Experience |
| [Vercel Experience](https://sematext.com/docs/experience/integrations/#vercel) | Track Vercel-hosted applications | Experience |
| [Vercel Synthetics](/docs/integration/vercel-synthetics-integration/) | Track Vercel-hosted applications | Synthetics |
| [Vercel Logs](/docs/integration/vercel-logs-integration/) | Track Vercel-hosted applications | Logs |
| [Vue.js](/docs/experience/integrations/#vuejs) | Monitor Vue.js applications and manage their performance | Experience |
| [Wordpress](/docs/experience/integrations/#wordpress) | Track experience for Wordpress web pages | Experience |


## Mobile Apps
Integrations for monitoring the performance and responsiveness of mobile applications across various platforms.

| Integration | Description | Solution   |
|-------------|-------------|------------|
| [Mobile Apps](/docs/integration/mobile-apps-logs/) | Monitor logs from mobile applications | Logs   |


## Notification Hooks
Integrations that provide instant alerts across your preferred communication platforms.

| Integration | Description | Solution   |
|-------------|-------------|------------|
| [AlertOps](/docs/integration/alerts-alertops-integration/) | Integrate with AlertOps for incident management | Alerts |
| [Big Panda](/docs/integration/alerts-bigpanda-integration/) | Monitor events with Big Panda notifications | Alerts |
| [Email as default system notification hook](/docs/integration/alerts-email-integration/) | Send email alerts for monitoring events | Alerts |
| [Custom user defined WebHook](/docs/integration/alerts-webhooks-integration/) | Configure custom webhooks for alerts | Alerts |
| [Google Chat](/docs/integration//alerts-googlechat-integration/) | Send notifications to Google Chat rooms | Alerts |
| [Hipchat](/docs/integration/alerts-hipchat-integration/) | Send notifications through Hipchat | Alerts |
| [Microsoft Teams](/docs/integration/alerts-microsoft-teams-integration/) | Get alerts in Microsoft Teams channels | Alerts |
| [Nagios](/docs/integration/alerts-nagios-integration/) | Monitor and integrate Nagios alerts | Alerts |
| [OpsGenie](/docs/integration/alerts-opsgenie-integration/) | Get notifications through OpsGenie | Alerts |
| [PagerDuty](/docs/integration/alerts-pagerduty-integration/) | Integrate with PagerDuty | Alerts |
| [Pushover](/docs/integration/alerts-pushover-integration/) | Get instant alerts via Pushover | Alerts |
| [ServiceNow](/docs/integration/alerts-servicenow-integration/) | Integrate with ServiceNow  | Alerts |
| [Signl4](/docs/integration/alerts-signl4-integration/) | Receive alerts on mobile with Signl4 | Alerts |
| [Slack](/docs/integration/alerts-slack-integration/) | Receive alerts in your Slack channels | Alerts |
| [SMS / text](/docs/integration/alerts-sms-integration/) | Send alerts via SMS | Alerts |
| [Spike.sh](/docs/integration/alerts-spikesh-integration/) | Integrate with Spike.sh | Alerts |
| [Squadcast](/docs/integration/alerts-squadcast-integration/) | Get alerts through Squadcast incident management | Alerts |
| [Telegram](/docs/integration/alerts-telegram-integration/) | Receive notifications through Telegram | Alerts |
| [Twilio](/docs/integration/alerts-twilio-integration/) | Send SMS alerts using Twilio integration | Alerts |
| [VictorOps](/docs/integration/alerts-victorops-integration/) | Integrate with VictorOps for alerting  | Alerts |
| [Zapier](/docs/integration/alerts-zapier-integration/) | Automate alerts through Zapier integration | Alerts |


## Setup Instructions
Each integration comes with detailed setup instructions to help you easily configure it for your environment. You can find specific instructions for each integration on their respective documentation page.

