title: Tags 
description: A Tag is an attribute of a data point (or metric) that could be used for grouping and filtering.

[Tags](../tags) are sent by Sematext's Agents as part of every data point. Tags are shown in the UI as filters and group by elements. 

For example, as part of Docker container metrics, the agent sends hostname on which the container is running, container identifier, container name, container image as tags which appear as filters in UI. Users can then group or filter the container metrics using these tags as well as [build custom charts](../dashboards/chart-builder/).

If you choose to use 3rd party agents to ship metrics, logs, or any other data, you need to ensure the tag names match those from the [Sematext Common Schema](../tags/common-schema).  You can, of course, send additional tags.

To read more, check out our [Tags documentation](../tags).
