title: Sematext Agent Release Notes
description: Features and improvements releases for the Sematext Agent

Sematext Agent is a dynamic project with frequent releases. This Changelog contains only important changes, new features, and critical bug fixes. To install or upgrade the Sematext Agent, make sure to follow the Sematext Agent Installation instructions provided in Sematext Cloud and refer to our [FAQ section](/docs/monitoring/spm-faq/#agent-updating) for further assistance on agent updating.

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

## Version 4.2.0

Date: December 23, 2025

### New Features

- **OTel CLI All-Services Support**: Added support for managing all OpenTelemetry services at once via the CLI, making it easier to configure and control multiple OTel services simultaneously.
- **Image Pull Secrets for Auto-Discovery**: Added support for defining `imagePullSecrets` for pods spawned by auto-discovery, enabling use of private container registries.

### Improvements

- **Monitoring Agent Resource Configuration**: Removed hardcoded CPU and memory limits for Elasticsearch and Solr Monitoring Agents. These services now use the same configurable defaults as other services.
- **Log Shipper Resource Management**: Added configurable CPU and memory limits for the log shipper in both Kubernetes and Docker environments.
- **Log Shipper Reliability Enhancements**: Added disk buffer, retry configuration, and rate limiting options for the Elasticsearch sink to prevent data loss and backend overload during high-volume scenarios.

### Bug Fixes

- Resolved OpenSearch mapping conflict where `connection.remote_endpoint` was being used as both a primitive string and an object with nested fields.
- Custom Logs no longer generates empty include patterns for non-JSON files.
- CronJob metrics collection no longer crashes when a job has no StartTime.
- Changing a monitoring rule's token now properly detaches the old monitoring process.
- Resolved goroutine leaks in auto-discovery terminate handler and Monitoring Agent log publishers that could cause OOMKill.
- Log shipper pods in Kubernetes now use isolated emptyDir storage, preventing data directory conflicts on multi-pod nodes.
- Log shipper now uses memory buffer when running in containers.
- Resolved log shipper VRL syntax error that caused crash loops on nodes with journald log sources.
- Journal storage for Kubernetes metrics now registers all required gob types.
- Resolved concurrent map access issues that caused intermittent agent restarts.

## Version 4.1.0

Date: October 8, 2025

### Bug Fixes

- Resolved issue where we weren't able to get metrics for Elasticsearch deployments which have tiered data nodes.
- We now automatically detect if a service being monitored by our App Agent modifies and automatically trigger redeployment for the App Agent.


## Version 4.0.0

Date: August 28, 2025

### Improvements

- Migrated leader election mechanism from ConfigMaps to Leases for improved Kubernetes compatibility.
- Performance improvements.

### Breaking Changes

Due to our leader election changes, updating cluster roles is required.

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

Ensure you have at least version **1.8.0** of the `sematext-agent` Helm package.
```
> helm search repo sematext
NAME                   	CHART VERSION	APP VERSION	DESCRIPTION                                       
sematext/sematext-agent	1.8.0        	1.0        	Helm chart for deploying Sematext Agent and Log...
```

After updating the Helm chart, follow the agent upgrade steps from Sematext Cloud.

#### Troubleshooting

For any errors, check our [Sematext Monitoring FAQ](/docs/monitoring/spm-faq/).

## Version 3.10.1

Date: August 22, 2025

### New Features

- **OpenTelemetry Windows Support**: Added OpenTelemetry GUI support to the Windows installer, enabling OTel functionality on Windows environments.

### Improvements

- **Service Permissions**: Added services permission for service catalog functionality in the Helm chart.

### Bug Fixes

- **OTel CLI Type Flag**: Fixed type flag requirement for OpenTelemetry services commands in the CLI.

## Version 3.10.0

Date: August 4, 2025

### New Features

- **Kubernetes/Docker OpenTelemetry Support**: Added support for OpenTelemetry in Kubernetes and Docker environments via environment variables, including Helm chart support.
- **OTel Token Groups**: Introduced bulk service names support for OpenTelemetry configurations, allowing for more efficient management of multiple services.

### Improvements

- **Performance Optimizations**: 
  - Optimized journal retry loop and reduced memory usage for better system resource utilization.
  - Enhanced OTel receivers and Elasticsearch client performance to significantly reduce CPU usage.
- **Traces Configuration**: Added fallback support for `traces_receiver_url` property to improve trace collection reliability.

### Bug Fixes

- **Custom Logs**: Muted excessive logging for example `myapp-logs` application to reduce log noise.
- **Log File Management**: Enhanced log file lifecycle tracking to prevent duplicate log entries and improve data accuracy.
- **OTel Logs**: Disabled payload writing for OpenTelemetry logs to optimize performance and reduce storage overhead.

## Version 3.9.0

Date: June 20, 2025

### New Features

- **OpenTelemetry (OTel) Support (Preview)**: Initial support for OpenTelemetry is now available, allowing the agent to collect metrics, logs, and traces. This feature is currently in testing and is disabled by default.

### Improvements

- **Proxy Support Enhancements**:
  - Added proxy support for communication between the Sematext Cloud Command Server and the agent.
  - Introduced new proxy configuration options for the Monitoring Agent in Kubernetes and Docker.
  - Enabled proxy usage for the Logs-shipper.
- Added a mechanism to remove orphaned Monitoring Agent processes.

### Bug Fixes

- Resolved issues with re-spawning the Monitoring Agent and incorrect Apache PID selection.

### Packaging and Installation

- Docker image aliases have changed. The `latest` alias will no longer be published. Instead, we will publish `latest-{major}` tags to provide more stable releases when breaking changes occur.

## Version 3.8.0

Date: January 15, 2025

### New Features

- **Linux Logpack Support**: Introducing native Linux log collection capabilities, eliminating the need for the legacy log shipper. Configure using the new `include-linux-matches` setting in st-agent.yml.
- **Kubernetes Node Conditions**: Added support for monitoring Kubernetes node conditions, providing better visibility into node health and status.

### Improvements

- **Resource Management Settings**: Added fine-grained control over resource utilization:
  - Docker environments: New `container-cpu-set` and `container-mem-limit` settings for container resource management.
  - Baremetal environments: New `autodisco.agent.baremetal-memory-options` for memory optimization.
- **Windows Services Enhancements**:
  - Added DisplayName support for better service identification.
  - Introduced capability to consistently monitor top processes.
  
### Bug Fixes

- Enhanced text file detection algorithm during log discovery to capture previously missed log files.
- Fixed container CPU metrics collection by improving previous CPU delta calculations.

## Version 3.7.0

Date: September 23, 2024

### New Features
- **Windows Events**: Sematext Agent now supports collecting Windows Events. Stay tuned for the upcoming release of Windows Event Logs integration in Sematext Cloud.

### Improvements

- The agent owner reference has been added to the Log-shipper DaemonSet, ensuring automatic deletion of the Log-shipper DaemonSet when the Sematext Agent DaemonSet is deleted.
- A new error message has been added to notify users when Java is not present. This is a case for using Monitoring Agent without Java.

### Bug Fixes

- Fixed an issue that caused Kubernetes events to be duplicated by an edge-case.

## Version 3.6.0

Date: July 30, 2024

### New Features

- **Custom Logs Support**: Sematext Agent now supports configuring log shipping through a YAML file, `custom-logs.yml`. This feature allows users to specify log file locations and custom parsing rules, which is useful for log files not discovered automatically or when custom log parsing rules are needed. This release only includes support for Linux (baremetal). Support for Windows, Kubernetes, and Docker is coming soon. For more information, please refer to [Custom Logs Shipping](/docs/agents/sematext-agent/custom-logs) docs.

## Version 3.5.0

Date: July 9, 2024

### New Features

- **Windows Services**: We introduce metrics collection for Windows Services. The agent can now ship the status of your Windows Services. Stay tuned for the upcoming release of Windows Services monitoring integration in Sematext Cloud.

### Bug Fixes

- Fixed broken system-generators usage for Ubuntu-24.04 and Fedora-40.
- Fixed a string escaping issue that may affect defining passwords for the MySQL integration.

## Version 3.4.1

Date: May 15, 2024

### New Features

- [**Windows Support**](/docs/agents/sematext-agent/windows-installation/): We are excited to announce that Sematext Agent now supports monitoring Windows hosts. The Sematext Agent can collect a wide range of metrics about your Windows host, including CPU, memory, disk, network, and processes.

### Improvements

- Implemented a new billing system for CronJobs and Jobs that is more favorable to customers than existing container billing.
- Enhanced the reliability of the Kubernetes initialization structure.
- Corrected inaccurate information about `agent_started` events in Sematext Cloud that gave the impression the agent was frequently restarting.

### Bug Fixes

- Resolved a service discovery bug occurring with ElasticSearch version 8.
- Fixed a bug that affected reading Nginx configuration files, to enable discovery of your `server_status` path.
- Addressed specific scenario where pods were not being monitored when utilizing the Containerd runtime in Kubernetes.
- Resolved an edge-case bug occurring during discovering services via eBPF, which led to incorrect service IP addresses.

## Version 3.3.0

Date: March 5, 2024

### Improvements

- Updated the App-Agent command signature to prevent orphan processes after an Out-of-Memory (OOM) event occurs in the JVM.
- Enhanced log-discovery to automatically identify files named `*_log` as log files, without the need for fallback timestamp checking.

### Bug Fixes

- Fixed a service discovery edge-case bug when a cold start happens for the ElasticSearch baremetal service.

## Version 3.2.3

Date: January 31, 2024

### Improvements

- Started using "always-restart" feature in the log-shipping Systemd service to ensure its continuous operation, even in the event of an OOM-kill triggered by the kernel.
- Added File-Descriptor based log-discovery as a fallback to eBPF based log-discovery.
- Enhanced our capability to verify file modified-time values.

### Bug Fixes

- Added guessing `mount_id` offset value to fix broken eBPF based log-discovery for newer kernels.
- Fix discarding `gc.log` files for the Elasticsearch service.

## Version 3.2.2

Date: January 8, 2024

### Improvements

- Added `safe-to-evict` annotation to prevent downscaling issues for `st-jmx` Kubernetes pods.
- Added `org.elasticsearch.launcher.CliToolLauncher` signature to the Elasticsearch autodiscovery signatures.

### Bug Fixes

- Addressed a bug that was preventing the Sematext Agent from spawning monitoring [Monitoring Agent](/docs/agents/sematext-agent/app-agent/) pods in Google Kubernetes Engine (GKE) environments.

## Version 3.2.1

Date: November 11, 2023

### Improvements

- Metrics added: `system load percentage`, `swap total memory`, `OOM`, `process count`, `mem available`, `mem total`.
- Improved Kubernetes event fields to ensure unique identification.

### Bug Fixes

- Addressed a network detection problem specific to Docker Swarm.
- Resolved a nil pointer issue associated with Kubernetes CronJob.
- Implemented a fix to prevent the overwriting of empty Grok fields.

## Version 3.2.0

Date: October 19, 2023

### New Features

- Kubernetes Jobs and CronJobs monitoring: We introduce metrics collection for Kubernetes Jobs and CronJobs. You can check all supported Job and CronJob metrics in [this wiki](/docs/integration/kubernetes/#cronjob-overview-metrics).
- Kubernetes Controller Manager monitoring: We now support the collection of metrics from kube-controller. You can check all supported kube-controller metrics in [this wiki](/docs/integration/kubernetes/#kube-controller-metrics).
- Kubernetes Pod labels: We have added support for collecting metrics related to Kubernetes Pod Labels, allowing for more in-depth monitoring of your pods.
- MySQL General Logs support: In this update, we introduce support for parsing MySQL General Logs.

### Improvements

- Kubernetes API Server: We now monitor the API server even if the nodes are unreachable.
- Ship heartbeat failures from Etcd: We added a metric from Etcd that represents the heartbeat failures for that component.

### Bug Fixes

- Resolved log spam issue: In version 3.1.0, we identified a log spamming issue, and we are pleased to announce that this issue has been resolved. No more unnecessary log spam.
- Kafka signature issue: We've covered a new signature for Kafka that may affect auto-discovery.
- Set OpenSearch processes to `opensearch` group: We have updated the categorisation of OpenSearch processes to `opensearch` group instead of `jvm`.

### Action Required Changes

The new Kubernetes CronJobs monitoring requires additional cluster roles for proper functioning. If you are using Kubernetes, follow the installation method specific steps below:

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
- Introducing unified runtime metrics to provide a comprehensive view of system performance in the Kubernetes monitoring integration. You can check all supported runtime metrics in [this wiki](/docs/integration/kubernetes/#runtime-metrics).

### Bug Fixes

- Corrected inaccurate expected and live instance metrics within the Kubernetes monitoring integration.
- Added `/etc/machine-id` as a new option to obtain system UUID.
- Addressed MariaDB monitoring issue by adding `mariadbd` signature to the MySQL integration.

## Version 3.0.0

Date: July 25, 2023

### New Features

- [**Kubernetes Components**](https://kubernetes.io/docs/concepts/overview/components/) monitoring integration: We are excited to announce that Sematext Agent now supports monitoring of critical Kubernetes components, including **API Server**, **CoreDNS**, **kube-proxy**, **kubelet**, **Scheduler**, and **Etcd**. Gain deeper insights into your Kubernetes cluster's performance with this powerful integration. Check out [Kubernetes Monitoring Integration](/docs/integration/kubernetes/) for details.
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

If you want to turn off `hostNetwork` access, check [our docs about hostNetwork](/docs/agents/sematext-agent/kubernetes/hostnetwork/).

#### Troubleshooting

For any errors, check our [Sematext Monitoring FAQ](/docs/monitoring/spm-faq/).

## Version 2.3.0

Date: June 6, 2023

### New Features

- MySQL logs parsing support: We have enhanced the log parsing capabilities of Sematext Agent with this update. Your log messages can now be parsed more effectively, leading to improved visibility and analysis.

### Improvements

- Improved container fields: Sematext Agent now provides more comprehensive fields for containers in Kubernetes. We have introduced the missing `container.type` field, allowing for better categorization of containers. Additionally, we have added the new `container.image.tag` field, providing valuable information about container images for improved management and identification. For details, check [our docs about tags](/docs/tags/common-schema/#container-tags).

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
