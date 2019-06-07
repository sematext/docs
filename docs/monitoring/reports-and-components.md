title: Sematext Monitoring Reports and Components
description: Sematext Cloud is a modern monitoring, log management, transaction tracing, and real user monitoring system that includes over 40 monitoring integrations. It is a suite of products that combine high-quality logging experience with other monitoring and alerting devops tools helping fix IT production issues


## Monitoring Report Menu

The **Monitoring Report Menu** is where the true power of Sematext Performance and Infrastructure Monitoring lies. This is where Observability comes to life. **Events and Logs** are **integrated** in a **single Monitoring Reports pane**, and used to **correlate metrics** with **application and server logs, events, alerts, anomalies**, and much more! 

Here's how you can **correlate Metrics with Events and Logs**, and view it all in a single view.

![Sematext Cloud Monitoring Guide - Monitoring Report Menu](https://sematext.com/docs/images/guide/monitoring/sematext-monitoring-guide-report-menu.png) 

### App State

When your Monitoring App is loaded the **Save and Reset buttons will be hidden** since you see the App's default state. If a **new component is added** or any existing **component is edited, alert created, and report component removed**, the **Save and Reset buttons will appear** in the report menu and allow for changes to be saved or reset to the initial state. If your browser is suddenly closed, and no changes were saved or reset, the App will preserve its initial state.

### Correlations

Correlations give you a single view for Metrics, Logs, and Events. This is a huge time saver to let you move from **Metrics spikes** to **drill down to Logs and Events** that caused them. 

With Alerts and the new Real User Monitoring feature we want to create a set of tools that provide instant feedback to help monitor and troubleshoot your infrastructure and software.

#### Events

Here you can see the Events toggle switched on, showing you an Events Histogram which follows the same timeline as the Metrics. 

![Sematext Cloud Monitoring Guide - Events Correlation View](https://sematext.com/docs/images/guide/monitoring/event-correlation-with-stream.png) 

When the Events toggle is on in the report menu, the **Events Search component** is loaded. It has a **search box**, an **App Selector** to select what data you want to load and correlate, and an **Events Histogram** displaying bar chart across the time frame selected in the time picker.

Contextual menu items are located as a series of icons next to the App Selector. The first one opens the **Event Stream component** below the **Event Search component** and provides the **list view of every event**. This includes timestamp, details, event type tag(s), and event description.

Combined with the **Metric Reports** below, and with the help of a **charting hairline**, zoom and chart navigation tools, it is easy to see how using our **Monitoring and Logging tools in a single page** is a must-have for any DevOps team! 

#### Logs

<!-- Image below shows correlations and Events toggle selected for Apache Logs app in the same view together with Apache Monitoring app used to analyze various server metrics data using build in reports and data visualizations tools. Two apps were initially created, one for Apache sever logs and the other as Apache Monitoring Integration, and combined provide a full insight into server anomalies or incidents. -->

Just like with the Events toggle, turning on the **Logs toggle** in the Reports Menu will display a **Logs Search component** with a search box, an App Selector, and a series of icons used to expand the log table, open the Logs Search component contextual menu, and other related settings and features as shown in the image below.

![Sematext Cloud Monitoring Guide - Logs Correlation View](https://sematext.com/docs/images/guide/monitoring/log-correlation-with-log-table.png)

Clicking on the **Logs icon** will open **Logs Table component** below the Logs Search component. A list view of log entries will be displayed with `@timestamp`, `_source`, and `Tags` as default columns, but all available log fields will be available in the **Logs Table component dropdown menu**, and easily selected or deselected and displayed in data table view. Column width can be also resized to better organize Log Table when multiple fields are selected at once.

Every Log entry in the table has two left aligned icons, one that opens **panel with all log details**, and the other that opens **Log context**. Contextual logging is an approach that encourages not just adding additional useful data to log events, but also sharing that data across related events. Check out the [Logs Guide](./logs-guide) for more info. 


### Report Actions 

The icons to the right in the report menu provide:

- **Email Report** - There are Email and Subscription types available with time, frequency, and time range defined to send automated reports.

- **Full Screen Mode** - Entering full screen mode brings only that component into full-page view and removes all other. All charts have zoom, hairline, and time navigation tools with tooltips available for effective chart interaction and data analysis.

- **Connected Applications** - Connecting a Monitoring App to a Logs App will pre-select that Logs App when you decide to correlate metrics. When you receive an alert notification for an app, the alert notification will automatically include information and charts from connected apps providing more information and context for you. You can connect any two apps you have access to, regardless of their type. A single app can be connected to any number of other apps.

- **Monitor Installation** - You will need to install Sematext Agent so metrics are sent to your Monitoring App. Please refer to [Integrations](https://sematext.com/docs/integration/) to configure what you wish to monitor. 

By checking out the [Integrations documentation](https://sematext.com/docs/integration/) you can learn more about how to monitor various programming languages, operating systems, containers (Docker, Kubernetes, Mesos), Cloud IaaS / PaaS services, iOS, Android, AWS EC2, AWS S3, Log Management, and log shippers. There you will find detailed information on how to install and configure different agents required to start sending your logs and metrics data to Sematext Cloud.

### Report Settings

- **Report Actions** - Your customized monitoring report can be better described using meta name and description, and you can assign unique URL Alias to identify that report.

- **Legends Position** and **Extended Charts** features - Except in the **default Overview Report**, each report can have legends for better chart interaction. Extended charts are also displayed below and provide a comparative view about the longer time span relative to the time frame displayed in the main chart. Just like report legends, the extended view can be hidden and only the chart with X and Y values displayed.

## Components

Using custom components you can add **monitoring metrics time series**, **metric panel**, **markdown notes**, and create custom reports with rich data visualizations and chart tools to analyze your data.

Each component can also be added to a custom dashboard you define.

### Monitoring Components

Line, Area, Bar charts binned by metric creation date, bar chart binned by event creation date, table of events in reverse chronological order are available for your Monitoring App.

![Sematext Cloud Monitoring Guide - Add Metric Component](../images/guide/monitoring/components.png) 

Use them together with out-of-the-box metrics reports and visualizations, generated when your Monitoring App is created, and you will go from metric spikes to your apps’ and servers’ logs in seconds and get to the root cause in minutes. 

### Monitoring Component Settings

Each Component can be added to a custom Dashboard, and you can organize reports from one or several applications, both Monitoring Apps as well as Logs Apps. Creating rich data and visualization reports based on various metrics and logs data has never been easier.

Here's an image of **Metrics Component** dropdown menu. You can edit the component metrics, add it to a custom Dashboard, create alerts, and much more.

![Sematext Cloud Monitoring Guide - Component Settings](https://sematext.com/docs/images/guide/monitoring/component-settings-dropdown.png)
