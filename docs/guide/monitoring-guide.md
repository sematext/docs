title: Sematext Monitoring User Guide
description: Sematext Cloud is a modern monitoring, log management, transaction tracing, and real user monitoring system that includes over 40 monitoring integrations. It is a suite of products that combine high-quality logging experience with other monitoring and alerting devops tools helping fix IT production issues


Sematext **Application** and **Infrastructure Monitoring** lets you **collect metrics** and **events** across your whole stack with over [40 integrations](https://sematext.com/integrations/). 

Get started in minutes with **out-of-the-box dashboards**, [**alerts**](https://sematext.com/alerts/) and [**anomaly detection**](https://sematext.com/alerts/) rules, and ability to **analyze metrics** by a number of context-aware filters.

The integrations cover several key features. You have [**Server Monitoring**](../monitoring/#setting-up-monitoring-agents) giving you complete insight about the utilization of your servers and cloud instances. **Monitor Containers** with [**Sematext Agent**](../containers/sematext-agent/), which is deployed seamlessly with Docker or Kubernetes.

Our SaaS/on-premises monitoring product goes beyond just collecting metrics. 

Use [**Database Monitoring**](https://sematext.com/database-monitoring/) to get a complete overview of your database health whether you are running it on your own infrastructure or using AWS RDS. 

[**Transaction Tracing**](https://sematext.com/tracing/) will show slow database operations, full SQL statements, end-to-end HTTP transaction context, top 10 operations by throughput, latency, or time consumed, filter database operations, and much more...

**Inventory Monitoring** will track all your infrastructure configurations, collect data about machines and group it into sets for easy access and identification.

You can create [**custom dashboards**](./dashboards-guide) with real-time data that helps you understand important trends, summarize top values and view the frequency of conditions.

If you haven't [signed up for free](https://apps.sematext.com/ui/registration) yet, check it out or [sign in](https://apps.sematext.com/ui/login/) to get started by creating a Sematext Monitoring App with over 40 integrations to choose from.

## Creating a Monitoring App
After you get logged into Sematext Cloud at <https://apps.sematext.com> (or <https://apps.eu.sematext.com> if using Sematext Cloud Europe), the first step is to create a Monitoring App. An App is an independent namespace for your data.

For example, if you have a development and a production environment, it might make sense to have one App for each. You can create as many Apps as you want.

You create an App by pressing the **+ Create Monitoring App** button in the Monitoring tab.

![Create a new Monitoring App](../images/guide/monitoring/sematext-monitoring-app-create.png)

Choose one of the 40 integrations.

![Choose Monitoring App Integration](../images/guide/monitoring/monitoring-app-integrations.png)

Once clicking on your desired integration, add a name, and press **Continue**.

![Name Monitoring App Integration](../images/guide/monitoring/name-monitoring-app.png)
<p align="center" style="font-style:italic;font-size:12px;">A sample of creating a Docker Monitoring App</p>

This will immediately open up the Agent installation instructions. Follow the steps and data will start flowing in!

![Install Agent](../images/guide/monitoring/install-monitoring-agent.png)
<p align="center" style="font-style:italic;font-size:12px;">Every type of Integration has a dedicated Agent Installation Guide</p>


Once you have data flowing you can **analyze metrics** by a number of context-aware filters, add **alerts** and **anomaly detection**, and **correlate metrics** with events and logs.

![Monitoring Agent Shipping Data](../images/guide/monitoring/monitoring-agent-shipping.png)

### Setting up Monitoring Agents

Metrics are shipped to Sematext Monitoring using Agents. To monitor your infrastructure you need to set up a **Sematext Monitoring Agent**. You can choose from:

  - [**Sematext Infra & App Agent (SPM)**](../monitoring/spm-client/)
    
    The Infra Agent collects OS & Network metrics. The App Agent collects application metrics.

  - [**Sematext Node.js App Agent**](../monitoring/node-agent)
    
    Monitors Node.js applications but can also [monitor Apache](../integration/apache) and [Nginx](../integration/nginx), including [Nginx Plus](../integration/nginxplus).

  - [**Docker Agent**](../containers)
  
    Collects container and host metrics, and container events.

The setup instructions for each of the agents are shown in the UI and you can also see them under individual [integrations](../integration).

Once the agent is set up metrics will start coming to Sematext
instantly. If you do not see performance charts 5 minutes after setting up the agent, have a
look at the <a href="http://sematext.com/docs/monitoring/spm-faq/">troubleshooting</a> page.</p>


## Monitoring App Layout

This guide will help you get started with our Monitoring App and discover reporting, monitoring, and other features and functionalities. Here's the default monitoring view and shown are the main application and system elements.

![Sematext Cloud Monitoring Guide](https://sematext.com/docs/images/guide/monitoring/sematext-monitoring-guide.png)

## Monitoring App Settings

App settings and actions include, but are not limited to:

  - inviting others to your App
  - [alert rules](../alerts)
  - changing your App's plan
  - connecting Apps
  - heartbeat alert cration
  - App ownership transfer
  - scheduled report emails (aka Subscriptions)
  
<!-- <img class="content-modal-image" alt="Sematext Monitoring App Settings UI screen" src="../images/monitoring/app-settings-menu.png" title="Sematext Monitoring App Settings Screen"> -->

<!-- ![Install Agent](../images/monitoring/app-settings-menu.png) -->

![Sematext Monitoring App Settings](../images/guide/monitoring/monitoring-app-settings3.png)


### Side Navigation

The persistent region on the left that can be collapsed, is used to easily switch across monitoring, log management, transaction tracing, real user monitoring, and other user & team features. All side navigation tabs are selectable. If they have chevrons, it indicates that the top level section is collapsible and contains additional subitems. The subitems will let you explore all your Apps, or choose a particular App.

Side navigation top level sections for infrastructure and application performance monitoring, log management, transaction tracing, and real user monitoring:

- Dashboards
- Infrastructure
- Monitoring
- Logs
- Correlations
- Alerts and Events
- Integrations

Side navigation sections for user and team features:

- Invites
- Team
- Account 

![Sematext Monitoring App Sidenav](../images/guide/monitoring/monitoring-sidenav.png)

### App Selector

The App dropdown selector lets you **choose any Logs or Monitoring App** as well as any **Dashboards and Reports** that you have generated from those Apps. Infrastructure views such as AppMap, NetMap, Servers, and Containers are also available for selection, and together provide seamless switching and navigation between logs, application and infrastructure monitoring, which is essential when rushing to fix production issues.

### App Actions

Right next to the App Selector is the **App Actions dropdown menu** and **horizontal ellipsis icon**. 

The App Actions dropdown menu allows you to **quickly switch between your Dashboards, Logs and Monitoring Apps**. While the horizontal ellipsis icon shows your App options and lets you open various app specific functions, like instructions to **install monitors and start sending metrics, app settings, alert rules, heartbeat alerts, as well as ability to connect two different apps, invite team members, and transfer app ownership**.

All App Actions open in a modal dialogue window as temporary UI regions and let you adjust and edit settings or create various alerts. The Monitoring App view remains unchanged and allows for easy interaction between various system settings and reports views.

### Report Selector

Once you create a Monitoring App, and start your Agent, you will get a **default Report created for you named Overview**. It will have the default data and default [component](#components) configuration. You can edit this Report, clone it, or create new ones. 

![](../images/guide/monitoring/report-selector.png)

Based on what type of Monitoring Integration you chose, more Reports get created by default. In this Docker sample you can see three more Reports are created by default.

### Time Picker

Time Picker is available whenever logging or monitoring app is selected as well as any generated dashboards are being used. One minute is the shortest time increment user can select. Thirty minutes, one and two hour, and one, two, seven, and thirty days time span shortcuts are exposed for easy common observability.

Custom time range can be selected using the time picker dropdown menu. App will automatically refresh upon selection and update all the reports in view accordingly.

### Refresh and Live Tail

Refresh data and Live Tail / Stop auto-refresh data options are additional time specific features and located next to the time picker. Live Tail feature provides real-time insights as soon as your data is consumed and indexed, and all the data is automatically refreshed. It can be also stopped so no automatic refreshing takes place in case your devops team needs to inspect specific incident or anomaly within a certain time segment. 

### Notifications

Bell icon in the right section of the header is used to open system notifications messaging modal window. If your plan needs upgrading, a new feature is announced, and other such system or service messages will be shown in the notifications view, and may or may not require user action.

### User Settings

Last, but not the least User Settings is the last right aligned item in the app header UI. Account switching features, Invitations to other devops team members, Billing, Help, and other user related system functionalities are located in the user settings dropdown menu. They are also top level items easily accessible from the left sidebar. 

Image below shows the main app navigation sections:

- Side navigation 
- App & Dash Selector dropdown menu
- App Actions dropdown menu
- User Settings dropdown menu
- Time Picker component 

![Sematext Cloud Monitoring Guide - Menus](https://sematext.com/docs/images/guide/monitoring/sematext-monitoring-guide-app-menus.png)

The next section describes the monitoring report menu located just below the top navigation menu, and help you discover how to add new components, correlate your logs and events with your monitoring app, do report specific actions, connect your apps, and more.

## Monitoring Report Menu

Monitoring Report Menu is where the true power of Sematext APM platform and the whole stack observability comes to life. Events and logs are integrated in a single monitoring reports pane, and used to correlate metrics with application and server logs, events, alerts, anomalies, and more. 

Image below shows the report menu in detail followed by explanation on how to use these features. See any metric and any logs in a single unified view, add additional components to your metrics reports, share reports, and more.

![Sematext Cloud Monitoring Guide - Monitoring Report Menu](https://sematext.com/docs/images/guide/monitoring/sematext-monitoring-guide-report-menu.png) 

### App State

When your app is initially loaded, Save and Reset buttons will be hidden since that is app's default state and there is no need for changes to be saved or reset. If a new component is added or any existing component is edited, alert created, and report component removed, Save and Reset button will appear in the report menu and allow for changes to be saved or reset to the initial state. If your browser is suddenly closed, and no changes were saved or reset, app will preserve the initial state.

### Correlations

Correlations feature is essential system part designed to provide a single pane of glass that provides full IT systems observability. Sematext team pioneered unification of logging and monitoring devops tools into a single app view, and continue to do so with the integration of events into correlations. 

Moreover, with the new RUM (Real User Monitoring) functionality we seek to create a Suite of Enterprise IT Tools that provide instant ROI and help your devops team bring your servers, apps, metrics ,logs, events, and alerts together.

This is really cool and a huge time saver. Empower your IT system administrators to go from metric spikes to your apps’ and servers’ logs in seconds, find similar metric patterns with built-in metric correlation, get to the root cause in minutes, and see any metric any logs in a single unified view!

Image below shows correlations and Events toggle selected for Apache Logs app in the same view together with Apache Monitoring app used to analyze various server metrics data using build in reports and data visualizations tools. Two apps were initially created, one for Apache sever logs and the other as Apache Monitoring Integration, and combined provide a full insight into server anomalies or incidents.

#### Events

 ![Sematext Cloud Monitoring Guide - Events Correlation View](https://sematext.com/docs/images/guide/monitoring/event-correlation-with-stream.png) 

When the Event correlation is selected in the report menu, the Event Search component is loaded with search input, App Selector used to select an app and app's data you want to load and correlate, and events histogram displaying bar chart across the time frame selected in the time picker above.

Component's contextual menu items are located as a series of icons next to the App Selector. The first one opens Event Stream component below the Event Search component and provides the list view of every event, timestamp, details, event type tag(s), and event description.

Combined with the metric reports below, and with the help of charting hairline, zoom and chart navigation tools, it is easy to see how using our APM and Logging tools in a single pane is a must have for any modern IT enterprise. 

Next, let's take a look at the Logs correlations and how to utilize them together with metric reports as well as events.

#### Logs

Just like the Events correlation view, turning on Logs correlation in the Reports Menu will display Logs Search componenet with search input, App Selector, and the series of icons used to expand log table, open logs component contextual menu, and other related settings and features as shown in the image below.

Clicking on the Logs icon will open logs data table component view below the Logs Search component. List view of log entries will be displayed with ```@timestamp```, ```_source```, and ```Tags``` as default columns, but all available logs fields will be available in Logs Table component dropdown menu, and easily selected or deselected and displayed in data table view. Column width can be also resized to better organize Log Table when multiple fields are selected at once.

Every Log entry in the table has two left aligned icons, one that opens panel with all log details, and the other that opens Log context. Contextual logging is an approach that encourages not just adding additional useful data to log events, but also sharing that data across related events.

(These are both powerful features by themselves and deserve more attention in order to discover their true potential.  For more information on Logs refer to Logging Guide) 

 ![Sematext Cloud Monitoring Guide - Logs Correlation View](https://sematext.com/docs/images/guide/monitoring/log-correlation-with-log-table.png)  

### Report Actions 

Right aligned set of icons in the report menu provide:

- Email Report - There are Email and Subscription types available with time, frequency, and time range defined so your devops can get automatated reports for comparative and incremental app & infrastructure monitoring analysis.

- Full Screen Mode - Entering full screen mode brings only that component into a view and removes all other app's UI elements. It is useful for group and team presentations as well as specific and detailed view of a single component, showing detailed metrics visualizations. All charts have zoom, hairline, and time navigation tools with tooltips available for effective chart interaction and data analysis.

- Connected Applications - Connecting a logs app to a monitoring app will pre-select that logs app when you decide to correlate metrics from the connected monitoring app, and thus save you time. When you receive an alert notification for an app, the alert notification will automatically include information (e.g. charts) from connected apps, and thus provide more information and context for you. You can connect any two apps you have access to, regardless of their type. A single app can be connected to any number of other apps.

- Monitor Installation - You will need to install Sematext agent so metrics or logs data can be forwarded to our logs, app & infrastructure monitoring SaaS service. Please refer to [Integrations](https://sematext.com/docs/integration/) documentation pages for particular tech you wish to monitor, and learn more about how to monitor various programming languages, operating systems, containers (Docker, Kubernetes, Mesos), Cloud IaaS / PaaS services, iOS, Android, AWS EC2, AWS s3, and logging management service and log shippers available. There you will find detailed information on how to install and configure different agents required to start sending your logs and metrics data to Sematext Cloud.

### Report Settings

- Report Actions - Your customized monitoring report can be better described using meta name and description, and you can assign unique URL Alias to identify that report.

- Legends Position and Extended Charts features - Except in app default overview mode, each report can have legends (each metric name) arranged below, to the left or can be hidden for better chart interaction. Extended charts are also displayed below and provide comparative view into longer time span relative to the time frame displayed in the main chart above. Just like report legends, extended view can be hidden and only the chart with x and y values displayed.

## Components

Using custom components your whole devops team can add monitoring metrics time series, events count time series, events, markdown notes, and create custom reports with rich data visualizations and chart tools to analyze your data.

There are both APM & Logging common as well as logs or monitoring specific components, and they will be contextually available depending on whether it is monitoring or logs app. Each component can be also added to custom dashboards defined by the system administrator or other devops and data analytics professionals.  

### Monitoring Components

Line, Area, Bar charts binned by metric creation date, bar chart binned by event creation date, table of events in reverse chronological order, as well as  additional logging components that can be added to your logs app are available.

![Sematext Cloud Monitoring Guide - Add Metric Component](https://sematext.com/docs/images/guide/monitoring/add-metric-component.png) 

Use them together with out of the box metrics reports and visualizations, generated when your app is created, and you will go from metric spikes to your apps’ and servers’ logs in seconds and get to the root cause in minutes. Forget about ssh-ing to servers and grepping logs and find similar metric patterns with built-in metric correlations.

#### Component Settings

Each Component can be added to a custom Dashboard, and you can organize devops or business reports from one or several applications, both logging as well as monitoring, and create rich data and visualization reports based on various metrics and logs data. 

![Sematext Cloud Monitoring Guide - Component Settings](https://sematext.com/docs/images/guide/monitoring/component-settings-dropdown.png)
