title: Tags 
description: A Tag is an attribute of a data point (or metric) that could be used for grouping and filtering.

[Tags](../../tags) are sent by the Sematext Agent as part of every data point and they are shown in UI as filters. 

For example, as part of Docker container metrics, the agent sends hostname on which the container is running, container identifier, container name, container image as tags which appear as filters in UI. User can then group or filter the container metrics using these tags.

At the moment all Tags from the [Common Schema](../../tags/common-schema) apply to Monitoring Apps.

If you choose to use 3rd party agents, then you need to ensure the tag names match those from our Common Schema.

To read more, check out our [Tags documentation](../../tags).