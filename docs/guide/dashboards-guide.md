title: Dashboards Guide
description: Sematext Cloud is a modern monitoring, log management, transaction tracing, and real user monitoring system. Dashboarding is system's powerful feature for cohesive data analysis from multiple data sources such as logs, metrics, and events. 

Sematext Cloud, our real-time analytics and data visualization IT enterprise platform for logs and application metrics, is designed to make the dashboarding powerful feature for cohesive data analysis, and for easy navigation and customization of dashboard reports by your DevOps or business team. 

Index data from virtually any source, format or location, search and analyze it, and monitor your applications and infrastructure stack with ability to generate dashboard(s) from all these pieces, usually disconnected parts of IT puzzle. Combine them together and use dashboarding as powerful analytics and presentation tool.

Dashboards provide helpful views of KPIs (key performance indicators) and consist of multiple visualization components which can accumulate data from multiple data sources such as logs, metrics, and events into one centralized pane of observability glass. You can create goal specific reports with various metrics visualized, and share them in a meeting to show what that data says about your business. 

On the other hand, logs data is hard to analize and can be extremely tedious to understand. Dashboards provide means to bring together one or more metrics reports together with logs reports, and display them in a unified report view for easy correlation and investigation. Dashboards help you get visual view of operations happening in you environment and often play key role in decision making.

[Register](https://apps.sematext.com/ui/registration) for free or [Login](https://apps.sematext.com/ui/login/) into Sematext IT enterprise systems monitoring platform to get started and create various dashboards reports from your [logs](/logs/) or [monitoring](/monitoring/) applications. Make it indispensable tool to search and investigate logs data while having relevant metrics and performance KPIs available in one place, in a single pane of glass. 

Your devops team will be able to quickly respond to service failures and minimize downtime, proactively use dashboarding to identify performance issues before the user experience is affected, and pinpoint the root cause of the problem and focus on fixing rather than investigating your IT infrastructure and application issues.

## Dashboards Guide

Image bellow shows already created Dashboards Report identifying section's top navigation elements and active app section in the left sidebar navigation. We are using it to monitor the health of our cloud based application performance monitoring platform. It is made up of several different technologies used in our stack, namely [Hbase](/integration/hbase/), [Kafka](/integration/kafka/), and [MySql](/integration/mysql/), and for each piece of tech in the stack a monitoring application has been created.  

Check [Integrations](/integration/) pages for more details on available monitoring integrations. 

![Sematext Dashboards Guide](https://sematext.com/docs/images/guide/dashboards/sematext-dashboards-guide.png "Sematext Dashboards Guide")

Each monitoring app comes with out of box metrics components that are carefully crafted to give you instant insight into the most important and relevant metrics for that particular technology. For example, an [Elasticsearch  monitoring app](/integration/elasticsearch/) will have cluster health, index stats, nodes, request rate, cache, jvm pool size, latency, connections, documents, and more metrics components displayed as report components, and available as soon as installed Sematext agent starts sending your app's metrics.

Check out [infrastructure monitoring](/monitoring/) pages to learn how to create monitoring app and set up monitoring agent.

Image bellow shows a common monitoring app report component showing its functionality and interactive elements. Using component settings dropdown menu, you can easily add any metrics components from one or more apps to a dashboard. Create your stack correlations reports and observe and analyze how multiple technologies coexist in your IT ecosystem. Zoom and time shift through charts, display single component in full view, create alerts, and effortlessly share reports across your organization. 

![Metrics Dashboards Component](https://sematext.com/docs/images/guide/dashboards/metrics-dashboard-component.png "Metrics Dashboards Component")

Just as monitoring app, logs app comes with pre build logging report components, namely Log Table component and Logs count histogram component. Use dropdown settings menu to add logs components to your dashboards, and combine them with metrics ones for full obeservability of your IT stack. Our tools will help your devops team find common exceptions, detect patterns in behaviors, and solve performance issues and availability problems. 

![Logs Dashboards Component](https://sematext.com/docs/images/guide/dashboards/logs-dashboard-component.png "Logs Dashboards Component")

Monitor health of your whole application and infrastructure stack using our Cloud service, and easily navigate between dashboards and logs and monitoring apps. Add new components to your dashboards just as you can add out of box components available for over [40 different integrations](/integration/).

Following visualizations are available as dashboard components in our on-premises and cloud SaaS infrastructure & application monitoring, and logging management tools:

- Line, Area, Bar charts metrics component binned by metric creation date
- Bar chart component binned by event creation date
- Table of events component in reverse chronological order
- Log Table component with logs listed in reverse chronological order
- Logs count bar chart time series component 
- Numeric field time series component 
- Events Count bar chart time series component
- Top N Values of given log event field component
- Markdown free form editor component ussed to create textual panels used to add custom event notes

[Register](https://apps.sematext.com/ui/registration) for free or [Login](https://apps.sematext.com/ui/login/). Create various dashboards reports from your [logs](/logs/) or [monitoring](/monitoring/) applications. Make it indispensable tool to search and investigate logs data while having relevant metrics and performance KPIs available in one place, in a single pane of glass.
