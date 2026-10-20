title: Service Details
description: Investigate a service using its API activity and network context

Service details connect the network and API views of a service. You can start from a service in Network Map or from API Radar and follow the available links to its related activity.

## Start from Network

Open **Service Monitoring → Network → Map** or **Services**, then select the service. Review its deployment and connection context before following links to related API activity.

See [Services View](../network-map/services-view.md) and [Tabular Views](../network-map/tabular-views.md) for the network details panels.

![Service details with View on Map and Open in API Radar actions](../images/service-monitoring/network-map-api-radar-navigation.png)

## Start from API Radar

Open **Service Monitoring → API Radar → Services Overview** or **Endpoints**. Find the service and inspect its endpoints. Endpoint details provide request metrics and an **Open in Network Map** action for investigating the associated network context.

An endpoint details panel describes a particular method and path. A service details panel describes the service itself. Use the former to investigate an API operation and the latter to investigate the service and its dependencies.

![API Radar endpoint details with Open in Network Map](../images/service-monitoring/api-radar/api-radar-service-details.png)

![Network Map service details with Open in API Radar](../images/service-monitoring/network-map-service-details.png)

<!-- Release check: confirm final shared service details tabs and labels against production. Do not copy mock endpoint tabs into the service panel description. -->
