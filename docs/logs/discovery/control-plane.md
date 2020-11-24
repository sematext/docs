title: Logs Discovery Control Plane
description: Logs Discovery Control Plane

Logs Discovery Control Plane is the central location for managing the shipping of discovered log sources. It consists of various tabs, each of them designated to one particular log source.

The rows are comprised of the following columns:

- `Name` represents the human-friendly identifier for the log source, such as log file name or container name.
- `Infra App` is linked to the App token that was used to deploy the Sematext Agent. The Infra App stores infrastructure data and metrics including discovered log sources.
- `Destination App` specifies the Logs App where logs are shipped. You can selects a distinct Logs App for each group.
- `Automatic Shipping` determines whether the logs are automatically shipped for some group. Initially, if no log shipping was set up, this column shows the `Set Up` button. Conversely, if log shipping was configured, this column displays a toggle that permits enabling/disabling the automatic log shipping.
- `Actions` column that contains various log shipping-related actions.

![Logs Discovery](images/logs-start-page.png)

## Log sources

- `Files` show discovered log files grouped by service type or process name. The Sematext Agent infers the service that's writing to a log file and automatically tags all log files of such a service. If the agent can't recognize the service type, because the signature for that service is not present in the agent's internal catalog, the log files are grouped by process name that owns the log files and writes to them.

![Kafka Log Files](images/kafka-log-files.png)

As depicted in the image above, the Kafka group is composed of three log file sources that pertain to the Kafka service. Each of the log file sources can have multiple instances of the same log file discovered on different machines. Once you click on particular log file source, it will bring in a table with all log file instances per host, like shown in the image below.

![Log File Instances](images/log-file-instances.png)

- `Containers` reveal all discovered Docker containers grouped by image name or the image digest. This log source pinpoints Docker containers that are not managed by the orchestrator such as Kubernetes.

![Container Log Sources](images/log-sources-containers.png)

In a similar manner to log file sources, each container log group shows a collection of containers that might be running on different nodes.

![Protokube Container Logs](images/protokube-container.png)
