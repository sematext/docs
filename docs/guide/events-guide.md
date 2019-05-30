title: Events Guide
description: Sematext Cloud Events provide flexible centralized dashboard that lets you see and manage Events across your whole stack. Use Events to correlate Alerts with Metrics and/or Logs, and gain proper insight into your whole infrastructure.

So what are events, why and how?

Our APM and logging tools let you visualize not only performance and custom metrics or logs, but also events. Such events may represent what is happening with a server or cluster, with an application, etc. 

Think application or server restarts, builds, deployments, alerts, etc. Events are graphed in timeseries charts and these charts can be shown next to metrics or logs charts. 

### Events Correlations

Image below shows the events correlation panel expanded within Apache monitoring app server metrics overview. It demonstrates Sematext Cloud events correlation capabilities with monitoring integrations. They can be also combined with server logs for a single pane of glass and full IT systems observability.

![Sematext Cloud Events and Metrics and Logs Correlation](https://sematext.com/docs/images/guide/alerts-and-events//events-corellation-monitoring-app.png "Sematext Cloud Events and Metrics and Logs Correlation")

This makes it possible to easily correlate events with metrics and/or logs. In addition to showing events as timeseries charts, a detailed listing of events can be seen and, of course, events can have tags, and can be searched and filtered.

### Events Components

There are two main components that make up events. Both can be added to dashboard(s) just as metrics and logs components. 

Moreover, with ability to add new events and attach them to any particular monitoring or logs app as well as dashboards, it is a perfect tool to document and leave notes alongside machine generated data. It supports markdown format and provides a perfect way to provide human input later used for presentations and reminders. 

#### Events Histogram

Events Histogram provides visual insight into events timeseries and can be easily filtered using time picker component shortcuts as well as zoom and shift chart tools. 

![Sematext Cloud Events Histogram Component](https://sematext.com/docs/images/guide/alerts-and-events/add-events-component-time-series.png "Sematext Cloud Events Histogram Component")

#### Events Stream

On the other hand, Event Stream table component provides a list view of all events that happened across your IT infrastructure. Whether monitoring or logging alert in Apache or Cassandra app was triggered, event stream view centralizes all of them in a single table. It is unified way to filter and pinpoint issues across multiple IT system administration dimensions. 

![Sematext Cloud Events Stream Component](https://sematext.com/docs/images/guide/alerts-and-events/event-stream-component.png "Sematext Cloud Events Stream Component")

Beyond events that you want to see as part of your operations intelligence think about events that matter to your team or your organization in general. Such "business events" can be shipped to Sematext, too.

Besides being shown in the UI events are also exposed via a REST API that lets you post, retrieve, and search your events. This REST API matches the Elasticsearch API, so you can use any Elasticsearch tool or client to post, get, and search events.

[Register](https://apps.sematext.com/ui/registration) for free or [Login](https://apps.sematext.com/ui/login/) into Sematext IT systems monitoring platform to get started and create your logs app. Upload your logs from all your servers to our centralized log management solution with Elasticsearch API and integrated Kibana, and experience the first true Hosted ELK Stack. 
