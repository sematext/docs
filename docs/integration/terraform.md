title: Sematext Terraform Guide
description: Sematext Cloud supplies a Terraform Provider and Resources used to automate monitoring across all your systems, Apps, and services.

You can now include Sematext Cloud as your go-to choice for fast deploy of visualization, APM, metrics and logging aspects within your cloud-as-code solutions using proven managed sub-components.

You can access the Sematext Cloud Provider in the
<a href="https://registry.terraform.io/providers/sematext/sematext/latest">Terraform Registry</a> 

<br>

## Available Sematext Resources

- [Akka](https://registry.terraform.io/providers/sematext/sematext/latest/docs/resources/sematext_monitor_akka)
- [AWS EC2](https://registry.terraform.io/providers/sematext/sematext/latest/docs/resources/sematext_monitor_awsec2)
- [AWS ELB](https://registry.terraform.io/providers/sematext/sematext/latest/docs/resources/sematext_monitor_awselb)
- [AWS EBS](https://registry.terraform.io/providers/sematext/sematext/latest/docs/resources/sematext_monitor_awsebs)
- [Apache](https://registry.terraform.io/providers/sematext/sematext/latest/docs/resources/sematext_monitor_apache)
- [Cassandra](https://registry.terraform.io/providers/sematext/sematext/latest/docs/resources/sematext_monitor_cassandra)
- [ClickHouse](https://registry.terraform.io/providers/sematext/sematext/latest/docs/resources/sematext_monitor_clickhouse)
- [Docker](https://registry.terraform.io/providers/sematext/sematext/latest/docs/resources/sematext_monitor_docker)
- [Elasticsearch](https://registry.terraform.io/providers/sematext/sematext/latest/docs/resources/sematext_monitor_elasticsearch)
- [HAProxy](https://registry.terraform.io/providers/sematext/sematext/latest/docs/resources/sematext_monitor_haproxy)
- [HBase](https://registry.terraform.io/providers/sematext/sematext/latest/docs/resources/sematext_monitor_hbase)
- [Java](https://registry.terraform.io/providers/sematext/sematext/latest/docs/resources/sematext_monitor_jvm)
- [Kafka](https://registry.terraform.io/providers/sematext/sematext/latest/docs/resources/sematext_monitor_kafka)
- [Logs](https://registry.terraform.io/providers/sematext/sematext/latest/docs/resources/sematext_monitor_logsene)
- [MongoDB](https://registry.terraform.io/providers/sematext/sematext/latest/docs/resources/sematext_monitor_mongodb)
- [MySQL](https://registry.terraform.io/providers/sematext/sematext/latest/docs/resources/sematext_monitor_mysql)
- [Nginx](https://registry.terraform.io/providers/sematext/sematext/latest/docs/resources/sematext_monitor_nginx)
- [Nginx+](https://registry.terraform.io/providers/sematext/sematext/latest/docs/resources/sematext_monitor_nginxplus)
- [Node.js](https://registry.terraform.io/providers/sematext/sematext/latest/docs/resources/sematext_monitor_nodejs)
- [Redis](https://registry.terraform.io/providers/sematext/sematext/latest/docs/resources/sematext_monitor_redis)
- [Hadoop](https://registry.terraform.io/providers/sematext/sematext/latest/docs/resources/sematext_monitor_hadoopmrv1)
- [Solr](https://registry.terraform.io/providers/sematext/sematext/latest/docs/resources/sematext_monitor_solr)
- [Solr Cloud](https://registry.terraform.io/providers/sematext/sematext/latest/docs/resources/sematext_monitor_solrcloud)
- [Apache Spark](https://registry.terraform.io/providers/sematext/sematext/latest/docs/resources/sematext_monitor_spark)
- [Apache Storm](https://registry.terraform.io/providers/sematext/sematext/latest/docs/resources/sematext_monitor_storm)
- [Tomcat](https://registry.terraform.io/providers/sematext/sematext/latest/docs/resources/sematext_monitor_tomcat)
- [ZooKeeper](https://registry.terraform.io/providers/sematext/sematext/latest/docs/resources/sematext_monitor_zookeeper)


<br>


## Getting Started


### Setup

You'll need the following : 

- [Terraform v0.13+](https://www.terraform.io/downloads.html) 
- [Sematext Cloud Account](https://apps.sematext.com/ui/account)
- [Sematext Cloud API Access Token](https://apps.sematext.com/ui/account)
- [Choice of Sematext Cloud Plan ID](https://github.com/sematext/terraform-provider-sematext/blob/master/docs/guides/plans.md)

### Environment

Create the following environment variables:

```sh
export SEMATEXT_API_KEY="<your access key>"
export SEMATEXT_REGION="<US or EU>"
```

### Create a Terraform HCL script

In this simplistic case we create a file containing the following Terraform snippet. 


```hcl
terraform {
  required_providers {
    sematext = {
      source = "sematext/sematext"
      version = ">=0.1.3"
    }
  }
}

provider "sematext" {
    sematext_region = "US"
}

resource "sematext_monitor_mongodb" "monitor_mongodb" {
    name = "MongoDB Monitor Example"
    billing_plan_id = 125 
}
```

Save this to a file e.g. main.tf

We will use this to create a monitoring App in Sematext Cloud, ready to receive, in this case MongoDB Metrics.
Note this will just demonstrate a starting point. Usually you would combine other Providers and deploy suitable agent-collectors.

<br>

### Step 1 : Initialize a Deployment 

*Initialize Terraform state and download the Terraform Provider ready for use.*

```bash
$ terraform init
```

<br>

### Step 2 : Create a Deployment Plan

*This will tell you the plan is to deploy a new sematext_monitor_mongodb on Sematext Cloud.*

```bash
$ terraform plan
```

<br>

### Step 3 : Execute the Deployment

*Perform the deployment. Once done you now have a new monitoring App on Sematext Cloud, ready to receive, in this case MongoDB Metrics.*

```bash
$ terraform apply
```

<br>

### Step 4 : Modify the Plan

*We want add an additional monitoring App on for Elasticsearch. Append the following snippet to the bottom of your main.tf* 

```hcl
resource "sematext_monitor_elasticsearch" "monitor_elasticsearch" {
    name = "Elasticsearch Monitor Example"
    billing_plan_id = 12 
}
```

<br>

### Step 5 : Re-Plan Deployment

*This will tell you the plan is to deploy an additional new sematext_monitor_elasticsearch.*

```bash
$ terraform plan
```

<br>

### Step 6 : Execute Your Deployment

*Perform the deployment. You will now have an additional Sematext Cloud Elasticsearch App ready to receive metrics.*

```bash
$ terraform execute
```



### Step 7 : Clean up

*Once you are finished taking a look retire the two Apps you created.* 
 
```bash
$ terraform destroy
```

<br>

__Note this sets the apps to a retire status rather than deletion. They will be automatically removed after 30 days__

Refer to our [examples repo](https://github.com/sematext/terraform-examples) for more realistic examples.

<br><br>
## Further links to know more

- [Terraform Registry Sematext Provider](https://registry.terraform.io/providers/sematext/sematext/latest)
- [Sematext Provider Github](https://github.com/sematext/terraform-provider-sematext)
- [Sematext Manual Integration Guide](https://sematext.com/docs/integration/)
- [Terraform Website](https://www.terraform.io)
- [Terraform Mailing List [Google Groups] ](http://groups.google.com/group/terraform-tool)
- [![Gitter chat](https://badges.gitter.im/hashicorp-terraform/Lobby.svg)](https://gitter.im/hashicorp-terraform/Lobby)


## Recommendations for learning more about Sematext products and services:

- Infrastructure [integrations documentation](/integration/)
- Our [website](https://sematext.com/)
- For open-source integrations and other Sematext contribution to the open-source community, check our [GitHub](https://github.com/sematext/) repositories.
- or just talk to us using chat located in right bottom corner of any page, and one of our engineers will help you navigate Sematext waters.
