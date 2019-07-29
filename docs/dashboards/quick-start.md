title: Sematext Dashboards Quick Start
description: Sematext Cloud is a modern monitoring, log management, transaction tracing, and real user monitoring system. Dashboarding is system's powerful feature for cohesive data analysis from multiple data sources such as logs, metrics, and events. 


Image bellow shows already created Dashboards Report identifying section's top navigation elements and active app section in the left sidebar navigation. We are using it to monitor the health of our cloud based application performance monitoring platform. It is made up of several different technologies used in our stack, namely [HBase](/integration/hbase/), [Kafka](/integration/kafka/), and [MySql](/integration/mysql/), and for each piece of tech in the stack a monitoring application has been created.  

Check [Integrations](/integration/) pages for more details on available monitoring integrations. 

![Sematext Dashboards Guide](https://sematext.com/docs/images/guide/dashboards/sematext-dashboards-guide.png "Sematext Dashboards Guide")

Each monitoring app comes with out of box metrics components that are carefully crafted to give you instant insight into the most important and relevant metrics for that particular technology. For example, an [Elasticsearch  monitoring app](/integration/elasticsearch/) will have cluster health, index stats, nodes, request rate, cache, jvm pool size, latency, connections, documents, and more metrics components displayed as report components, and available as soon as installed Sematext agent starts sending your app's metrics.

Check out [infrastructure monitoring](/monitoring/) pages to learn how to create monitoring app and set up a monitoring agent.


## Adding Component(s) to Dashboard(s)

Any logging or metric report component can be easily added to one or more dashboards. First create a dashboard. Navigate to [dashboards](https://apps.sematext.com/ui/dashboards) section and click on the add new button. Name your dashboard and further describe it using description field. 

![Add New Dashboards](https://sematext.com/docs/images/guide/dashboards/add-dashboard.png "Add New Dashboards")

Once you have a dashboard created, you can start adding components to it. At least one or more monitoring or logging application needs to be created. As soon as your data is consumed and indexed by our cloud service, both logs and metric components will become available for dashboarding. 

Moreover, with our custom reports features you can first create specific logging, events or metric component, and add it to your dashboard just as you can with out of box [integration](/integration/) specific components that come included when you first create an app.

Image below shows a custom Kafka report panel that was created by our devops team, and illustrates what will be displayed in a modal window when you add a component to a dashboard using components settings dropdown menu. Both custom and out of box components are available and they can be logging, metrics or events in nature.   

![Add Metric Dashboards Component](https://sematext.com/docs/images/guide/dashboards/add-metric-report-to-dashboard.png "Add Metric Dashboards Component")

The visualizations are available as dashboard components in our on-premises and cloud SaaS infrastructure & application monitoring, and logging management tools:

- Line, Area, Bar charts metrics component binned by metric creation date
- Bar chart component binned by event creation date
- Table of events component in reverse chronological order
- Log Table component with logs listed in reverse chronological order
- Logs count bar chart time series component 
- Numeric field time series component 
- Events Count bar chart time series component
- Top N Values of given log event field component
- Markdown free form editor component ussed to create textual panels used to add custom event notes
