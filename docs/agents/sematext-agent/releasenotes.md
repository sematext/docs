title: Sematext Agent Release Notes
description: Features and improvements releases for Sematext Agent

Sematext Agent is a dynamic project with frequent releases. This Changelog contains only important changes, new features, and critical bug fixes. To install or upgrade the Sematext Agent, make sure to follow the Sematext Agent Installation instructions provided in Sematext Cloud and refer to our [FAQ section](https://sematext.com/docs/monitoring/spm-faq/#agent-updating) for further assistance on agent updating.

<!-- Template:

## Version X.X.X

Date: MM D, YYYY

### New Features

NULL

### Improvements

NULL

### Bug Fixes

NULL

### Action Required Changes

NULL

### Breaking Changes

NULL

### Deprecation Notice

NULL

### Packaging and Installation

NULL

-->

## Version 3.2.0

Date: October 19, 2023

### New Features

- CronJob Metrics: We are happy to introduce metrics collection for CronJob. Now, you can gain insights into the metrics of your CronJobs. You can check all supported CronJoc metrics in [this wiki](https://sematext.com/docs/integration/kubernetes/#cronjob-overview-metrics).
- kube-controller Metrics Collection: We now support the collection of metrics from kube-controller, providing you with valuable data to monitor Kubernetes controller performance.
- Kubernetes Pod Labels: We have added support for collecting metrics related to Kubernetes Pod Labels, allowing for more in-depth monitoring of your pods.
- MySQL General Logs Support: In this update, we introduce support for parsing MySQL general logs.

### Improvements

- API Server: We now monitor the API server even if the nodes are unreachable.
- Ship Heartbeat Failures: With this improvement, we ensure that heartbeat failures are properly handled and reported.

### Bug Fixes

- Resolved Log Spam Issue: In version 3.1.0, we identified a log spamming issue, and we are pleased to announce that this issue has been resolved. No more unnecessary log spam.
- Kafka Signature Issue: We've covered a new signature for Kafka that may affect auto-discovery.
- Set OpenSearch Processes to `opensearch` Type: We have updated the categorisation of OpenSearch processes to `opensearch` type instead of `jvm`.

### Action Required Changes

The new CronJobs monitoring integration requires additional cluster roles for proper functioning. If you are using Kubernetes, follow the installation method specific steps below:

#### kubectl Installation

Please re-apply `sematext-clusterroles.yaml` to your cluster.

```
kubectl apply -f https://sematext-installer.s3.amazonaws.com/sematext-clusterroles.yaml
```

After applying the new cluster roles, follow the agent upgrade steps from Sematext Cloud.

#### Helm Installation

Please update your `sematext` Helm repository. 

```
helm repo add sematext https://cdn.sematext.com/helm-charts
helm repo update
```

Ensure that you have at least **1.3.0** version for the `sematext-agent` Helm package.
```
> helm search repo sematext
NAME                   	CHART VERSION	APP VERSION	DESCRIPTION                                       
sematext/sematext-agent	1.3.0        	1.0        	Helm chart for deploying Sematext Agent and Log...
```

After updating the Helm chart, follow the agent upgrade steps from Sematext Cloud.

## Version 3.1.0

Date: August 24, 2023

### New Features

- Varnish Cache monitoring support: With this update, Sematext Agent can now discover and collect metrics from your Varnish Cache service. Stay tuned for the upcoming release of Varnish Cache monitoring integration in Sematext Cloud.
- Support has been added for kube-proxy and API server monitoring in Google Kubernetes Engine (GKE) as part of our Kubernetes monitoring integration.

### Improvements

- We've fine-tuned data collection in the Kubernetes monitoring integration, resulting in improved performance and efficiency.
- Improved discovery for ElasticSearch integration: We have enhanced the ElasticSearch integration by excluding the unsupported `.log` files. Now, Sematext Agent will only discover and support `.json` files for ElasticSearch integration.
- Enriched Vector diagnostics information for baremetal, Kubernetes, and Docker setups.
- Introducing unified runtime metrics to provide a comprehensive view of system performance in the Kubernetes monitoring integration. You can check all supported runtime metrics in [this wiki](https://sematext.com/docs/integration/kubernetes/#runtime-metrics).

### Bug Fixes

- Corrected inaccurate expected and live instance metrics within the Kubernetes monitoring integration.
- Added `/etc/machine-id` as a new option to obtain system UUID.
- Addressed MariaDB monitoring issue by adding `mariadbd` signature to the MySQL integration.

## Version 3.0.0

Date: July 25, 2023

### New Features

- [**Kubernetes Components**](https://kubernetes.io/docs/concepts/overview/components/) monitoring integration: We are excited to announce that Sematext Agent now supports monitoring of critical Kubernetes components, including **API Server**, **CoreDNS**, **kube-proxy**, **kubelet**, **Scheduler**, and **Etcd**. Gain deeper insights into your Kubernetes cluster's performance with this powerful integration. Check out [Kubernetes Monitoring Integration](https://sematext.com/docs/integration/kubernetes/) for details.
- Varnish Cache logs parsing support: With this update, Sematext Agent can now parse fields from your Varnish Cache log messages. Stay tuned for the upcoming release of Varnish Cache logs integration in Sematext Cloud, enhancing your logging experience further.

### Improvements

- Improved discovery for OpenSearch integration: We have enhanced the OpenSearch integration by excluding the unsupported `.json` files. Now, Sematext Agent will only discover and support `.log` files for OpenSearch integration, ensuring a smoother experience.

### Bug Fixes

- Fixed incorrect `Not Configured` status for the log shipper: We have resolved the issue that was causing the log shipper to display an incorrect status message.

### Action Required Changes

The new Kubernetes Components monitoring integration introduces additional cluster roles for proper functioning. If you are using Kubernetes, follow the installation method specific steps below:

#### kubectl Installation

Please re-apply `sematext-clusterroles.yaml` to your cluster.

```
kubectl apply -f https://sematext-installer.s3.amazonaws.com/sematext-clusterroles.yaml
```

After applying the new cluster roles, follow the agent upgrade steps from Sematext Cloud.

#### Helm Installation

Please update your `sematext` Helm repository. 

```
helm repo add sematext https://cdn.sematext.com/helm-charts
helm repo update
```

Ensure that you have at least **1.2.1** version for the `sematext-agent` Helm package.
```
> helm search repo sematext
NAME                   	CHART VERSION	APP VERSION	DESCRIPTION                                       
sematext/sematext-agent	1.2.1        	1.0        	Helm chart for deploying Sematext Agent and Log...
```

After updating the Helm chart, follow the agent upgrade steps from Sematext Cloud.

#### hostNetwork Setting Usage

In Kubernetes, the `hostNetwork` is a configuration option that allows a container to share the network namespace of its host node. Sematext Agent requires `hostNetwork: true` setting to monitor the control plane components. By default, the `hostNetwork` setting is set to `true` starting from version 3.0.0 of Sematext Agent.

If you want to turn off `hostNetwork` access, check [our docs about hostNetwork](https://sematext.com/docs/agents/sematext-agent/kubernetes/hostnetwork/).

#### Troubleshooting

For any errors, check our [Sematext Monitoring FAQ](https://sematext.com/docs/monitoring/spm-faq/).

## Version 2.3.0

Date: June 6, 2023

### New Features

- MySQL logs parsing support: We have enhanced the log parsing capabilities of Sematext Agent with this update. Your log messages can now be parsed more effectively, leading to improved visibility and analysis.

### Improvements

- Improved container fields: Sematext Agent now provides more comprehensive fields for containers in Kubernetes. We have introduced the missing `container.type` field, allowing for better categorization of containers. Additionally, we have added the new `container.image.tag` field, providing valuable information about container images for improved management and identification. For details, check [our docs about tags](https://sematext.com/docs/tags/common-schema/#container-tags).

### Bug Fixes

- Fixed an edge case for tracer to check network packets via eBPF: We have addressed the issue that previously prevented the tracer from effectively checking network packets via eBPF. This fix improves the functionality and reliability of the tracer, ensuring accurate monitoring of network traffic.
- Fixed nil pointer issue for MySQL and resolved broken portmatcher for MySQL: We have resolved a nil pointer issue that affected MySQL, eliminating potential errors and ensuring smooth operation. Additionally, we fixed a broken portmatcher specifically for MySQL, allowing for accurate monitoring and analysis of MySQL environments.
- Fixed connection issue to MongoDB: We have resolved the issue caused by an outdated data collector.

### Packaging and Installation

- Introduced Beta version for Sematext Agent: This release includes the ability to install the Beta version of the Sematext Agent (currently available for Debian and Ubuntu distributions only).  To opt for the Beta version, install the `sematext-agent-beta` package instead of the standard `sematext-agent`. When you install `sematext-agent-beta` you will receive regular updates like 2.4.0, 2.4.1, 2.5.0, as well as release candidates like 2.4.0-rc.1, for example.

## Version 2.2.0

Date: May 10, 2023

### New Features

- Introducing a new command to gather information about Kubernetes Cluster Roles: This new feature enables our agent to collect Cluster Roles and provide more useful information in Sematext Cloud.
- HTTPS support for OpenSearch and ElasticSearch: Sematext-Agent now supports both HTTP and HTTPS. The agent automatically detects whether HTTPS is available and uses it accordingly.

### Improvements

- Rewritten agent app logs to be under `st-agent`: The Sematext Agent logs are now displayed under `st-agent`, resulting in cleaner and more organized dashboards.
- Removed unnecessary errors from Fleet/Agent Errors page: We've cleaned up some noise from the Fleet/Agent Errors page to improve your monitoring experience.

### Bug Fixes

- Fixed ClickHouse discovery service signature: We have addressed the issue that caused some log files to not be selected.
- Fixed empty data for Infra info page: This fix resolves the issue with delayed data on the Infra info page.
- Fixed non-displayed HTTP request codes for Apache Logs: We have corrected our log field generator for this case, ensuring that all HTTP request codes are properly displayed.

## Version 2.1.0

Date: April 6, 2023

### New Features

- OpenSearch logs parsing support: With this update, we now parse fields of your log messages. We will also be releasing OpenSearch logs integration soon to enhance your logging experience.

### Improvements

- Additional Kubelet metrics: You can now collect a wider range of metrics from your Kubelet nodes, providing you with greater visibility into the health and performance of your Kubernetes cluster.
- Logging process improvements: We have made several enhancements to our logging process to reduce noise and simplify logs shown in Fleet.

### Bug Fixes

- Fixed missing Docker container memory issue: We have resolved the issue where the Docker container memory was not being properly displayed.
- Fixed missing `[]*types.ContainerInfo` issue: We have addressed the issue where `[]*types.ContainerInfo` was missing.
- Fixed JVM garbage collection detection: We have corrected the issue where the JVM GC logs were being identified as logs of another type.
- Fixed log shipping in Docker Swarm for some cases: We have resolved the issue where log shipping was not working properly for Docker Swarm.

### Packaging and Installation

- CentOS 9 package was released.

## Version 2.0.0

Date: March 8, 2023

### New Features

- OpenSearch auto-discovery support. Now you can easily start to collect the metrics of your OpenSearch services. Check [**OpenSearch Monitoring Integration**](https://sematext.com/integrations/opensearch/) for more information.
- StatefulSets and DaemonSets metrics collecting support.

### Bug Fixes

- Swarm housekeeping functionality.

### Breaking Changes

We added StatefulSets and DaemonSets metrics collection support. This new feature requires some additional cluster roles. If you're using Kubernetes and you installed the agent with `kubectl`, please update the clusterroles before upgrading your agent by running the following command:

```
kubectl apply -f https://sematext-installer.s3.amazonaws.com/sematext-clusterroles.yaml
```
