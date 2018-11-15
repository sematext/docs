title: Logs Guide - Logging Mananagement App
description: Sematext Cloud is a modern monitoring, log management, transaction tracing, and real user monitoring system that aggregates and structures your logs across various languages and platforms. It is a suite of products that combine high-quality logging experience with other monitoring and alerting devops tools helping fix production issues

<iframe width="800" height="450" src="https://youtu.be/glwZ8OCV0kc?rel=0" frameborder="0" allow="autoplay; encrypted-media" allowfullscreen></iframe>

Logs are everywhere, networks, servers, containers, cloud infrastructure, IoT, applications, load balancers, everywhere.

In order to draw meaningful insights from the sea of logs your administrators, developers, IT operators, and security professionals comb on daily basis, you need a scalable platform that centralizes all these logs. Our SaaS / on-premise centralized IT systems management service provides ability to search and help your devops team find common exceptions, detect patterns in behaviors, and solve SLA, performance issues, and availability problems.

Collect and send data from any part of your stack with different [log shippers available](https://sematext.com/docs/logs/sending-log-events/), and centralize and index logs from operating systems, containers, network devices, AWS infrastructure, application access logs, custom events, and more. 

Our [logging management platform](https://sematext.com/logsene/) provides ability to create your own queries through its [Elasticsearch API](https://sematext.com/docs/logs/search-through-the-elasticsearch-api/) as well as rich, yet simple query syntax very much like the [query syntax](https://sematext.com/docs/logs/search-syntax/) used by Google. Search and analyze your IT enterprise logs using Sematext advanced analytics tools, identify and compare patterns and anomalies, and monitor your whole IT infrastructure through a single pane of glass. 

You can also create and integrate [alerts](https://sematext.com/docs/alerts/) with commonly used collaboration and messaging software such as [Hipchat](https://sematext.com/docs/integration/alerts-hipchat-integration/), [Slack](https://sematext.com/docs/integration/alerts-slack-integration/), [Big Panda](https://sematext.com/docs/integration/alerts-bigpanda-integration/), [PagerDuty](https://sematext.com/docs/integration/alerts-pagerduty-integration/), [VictorOps](https://sematext.com/docs/integration/alerts-victorops-integration/), [OpsGenie](https://sematext.com/docs/integration/alerts-opsgenie-integration/) or simply by using your email address(es). Use these services to continuously monitor large volume of data and logs, and ensure that you are alerted in time.

Check [integrations](https://sematext.com/docs/integration/) pages for more information. 

Logs are aggregated by time and shown in the logging management web application, where you have the ability to search for specific terms, narrow down time ranges, filter fields, setup alerts and more. The supported Search API's are URI based search, Request body based search, Real time GET operation, and Multiple GET and Multiple Search operations in a single request.

Check related [Field Types](https://sematext.com/docs/logs/field-types/), [Supported Date Formats](https://sematext.com/docs/logs/supported-date-formats/), [Special Fields](https://sematext.com/docs/logs/special-fields/), and [FAQ](https://sematext.com/docs/logs/faq/) to learn more about Sematext logging management platform features.

Regulatory expectations to store all logs require centralized log management solution, and Sematext logging management platform addresses these requirements. Monitor health of your whole application and infrastructure stack using our Cloud service and ensure that data is properly secured and stored. You can correlate views across multiple logs from different components and get a full stack observability. Share metrics reports and dashboards so that the entire team has access to the same data, while RBAC (Role Based Access Control) provides different access and user permissions to the team.

We can help you focus on your core competencies and provide your IT managers with tools necessary for complete logs management together with your stack metrics monitoring, a single pane of glass for full observability. Should security incident or outage take place, you need insight that allows you to quickly resolve the issue and avoid poor customer experience.

[Register](https://apps.sematext.com/ui/registration) for free or [Login](https://apps.sematext.com/ui/login/) into Sematext IT systems monitoring platform to get started and create your logs app. Upload your logs from all your servers to our centralized log management solution with Elasticsearch API and integrated Kibana, and experience the first true Hosted ELK Stack. 

If you prefer good old way to search and analyze your logs, try our [command line tool](https://sematext.com/blog/logsene-cli/) for viewing, searching, filtering, and analyzing of log entries across all your logs from all your apps. 

## Logs Guide

Good tools for IT enterprise logs analysis have several main requirements, namely:

- way to ship, ingest, and reliably index machine data
- tools to search, correlate and investigate logs data
- drill-down analysis functionality to reveal trends, spikes, and anomalies
- monitoring and alerting features with 3rd party webhooks integrations 
- ability to build reports and dashboards from your data

We will keep these requirements in mind while trying to provide insight into Sematext logs section features within our IT enterprise monitoring and logging management suite. This guide will help you get started with our cloud service and discover logs, monitoring, and other application features. 

Image below shows the default logs view and marked are the main application and system UI elements. 

![Sematext Cloud Monitoring Guide](https://sematext.com/docs/images/guide/logs/sematext-logs-guide.png)

## App Navigation 

### Side Navigation

Side navigation is peristent UI region that can be collapsed / toggled on or off for full reports view, and is used to easily switch across monitoring, log management, transaction tracing, real user monitoring, and other user & team system features. All side navigation options are selectable at all times and the right aligned chevrons indicate that the top level section is collapsible and contains additional subitems.

Side Navigation consists of the following top level sections:

- Dashboards
- Infrastructure
- Monitoring
- Logs
- Correlations
- Alerts and Events
- Integrations

as infrastructure and app monitoring, log management, transaction tracing, and real user monitoring system regions and

- Invites
- Team
- Account 

as user and team Sematext Cloud system features.

### App & Dash Selector

The App & Dash dropdown Selector lets you choose any logging or monitoring app as well as any dashboard report(s) that you have generated from those apps. Moreover, infrastructure views such as AppMap, NetMap, Servers, and Containers are also available for selection, and together provide seamless switching and navigation between logging, and app & IT infrastructure monitoring, essential when rushing to fix IT production issues.

### App Actions

Right next to the App & Dash Selector is the App Actions dropdown menu, horizontal elipsis icon, opening various app specific functions, namely instructions to install monitor and start sending your metrics, app settings, alert rules, heartbeat alert creation as well as ability to connect two different apps, invite team members, and transfer app ownership.

All App Actions open in a modal dialogue window as temporary UI regions and let you adjust and edit settings or create various alerts. App view remains unchanged and allows for easy interaction between various system settings and reports view.

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

## Logs Search and Report Menu

Logs Search and Report Menu is where the true power of Sematext APM platform and the whole stack observability comes to life. Events and logs are integrated in a single monitoring reports pane, and used to search server logs, events, alerts, anomalies, and more. 

Image below shows the report menu in detail followed by explanation on how to use these features. Search logs in a single unified view and add additional components to your metrics reports, share reports, and more.

![Sematext Cloud Monitoring Guide - Monitoring Report Menu](https://sematext.com/docs/images/guide/logs/sematext-logs-search-and-report-menu.png) 

### App State

When your app is intially loaded, Save and Reset buttons will be hidden since that is app's default state and there is no need for changes to be saved or reset. If a new component is added or any existing component is edited, alert created, and report component removed, Save and Reset button will appear in the report menu and allow for changes to be saved or reset to the initial state. If your browser is suddenly closed, and no changes were saved or reset, app will preserve the initial state.


### Report Actions 

Right aligned set of icons in the logs search and report menu provide:

- Save Query - Every query can be saved for later use. Ability to save queries are part of essential tools to search, correlate and investigate logs data. Each saved query becomes the part of saved queries section in our logging platform.  

- Saved Queries - Right next to the save query icon is the star icon that opens a modal dialogue window with all your saved queries displayed in [Sematable](https://github.com/sematext/sematable), a table component that displays

	- _Tag Color_ that can be assigned to any logs query while it is being saved by user using colour picker componenet 
	- _Query Name_ to further identify and describe logs query
	- _Query String_ will be string you use in logs search input field
	- _Owner_	
	- _10m, 1h, 12h, and 1d_ shortcuts with histogram for fast observability of query patterns across common time intervals
	- Saved _query actions_ dropdown menu used to add new, edit, clone, reset, and delete saved logs report

- Email Report - There are Email and Subscription types available with time, frequency, and time range defined so your devops can get automatated reports for comparative and incremental app & infrastructure monitoring analysis.

- Full Screen Mode - Entering full screen mode brings only that component into a view and removes all other app's UI elements. It is useful for group and team presentations as well as specific and detailed view of a single component, showing detailed metrics visualizations. All charts have zoom, hairline, and time navigation tools with tooltips available for effective chart interaction and data analysis.

- Connected Applications - Connecting a logs app to a monitoring app will pre-select that logs app when you decide to correlate metrics from the connected monitoring app, and thus save you time. When you receive an alert notification for an app, the alert notification will automatically include information (e.g. charts) from connected apps, and thus provide more information and context for you. You can connect any two apps you have access to, regardless of their type. A single app can be connected to any number of other apps.

- Monitor Installation - You will need to install Sematext agent so metrics or logs data can be forwarded to our logs, app & infrastructure monitoring SaaS service. Please refer to [Integrations](https://sematext.com/docs/integration/) documentation pages for particular tech you wish to monitor, and learn more about how to monitor various programming languages, operating systems, containers (Docker, Kubernetes, Mesos), Cloud IaaS / PaaS services, iOS, Android, AWS EC2, AWS s3, and logging management service and log shippers available. There you will find detailed information on how to install and configure different agents required to start sending your logs and metrics data to Sematext Cloud.

### Report Settings

- Report Actions - Your customized logs report can be better described using meta name and description, and you can assign unique URL Alias to identify that report.

- Legends Position and Extended Charts features - Except in app default overview mode, each report can have legends (each metric name) arranged below, to the left or can be hidden for better chart interaction. Extended charts are also displayed below and provide comparative view into longer time span relative to the time frame displayed in the main chart above. Just like report legends, extended view can be hidden and only the chart with x and y values displayed.

## Components

Using custom components your whole devops team can add monitoring metrics time series, events count time series, events, markdown notes, and create custom reports with rich data visualizations and chart tools to analyze your data.

There are both APM & Logging common as well as logs or monitoring specific components, and they will be contextually available depending on whether it is monitoring or logs app. Each component can be also added to custom dashboards defined by the system administrator or other devops and data analytics professionals.  

### Logs Components

Logs Count and Logs Table Component, Line, Area, Bar charts binned by metric creation date, bar chart binned by event creation date, table of events in reverse chronological order, as well as  additional logging components that can be added to your logs app are available.

![Sematext Cloud Monitoring Guide - Add Metric Component](https://sematext.com/docs/images/guide/logs/add-logs-component.png) 

Use them together with out of box metrics reports and visualizations, generated when your app is created, and you will go from metric spikes to your apps’ and servers’ logs in seconds and get to the root cause in minutes. Forget about ssh-ing to servers and grepping logs and find similar metric patterns with built-in metric correlations.

#### Component Settings

Each Component can be added to a custom Dashboard, and you can organize devops or business reports from one or several applications, both logging as well as monitoring, and create rich data and visualization reports based on various metrics and logs data. 

Below is the image of Log Events Component dropdown menu with log specific export and field editor features and ability to add component to a custom dashboard

![Sematext Cloud Monitoring Guide - Component Settings](https://sematext.com/docs/images/guide/logs/logs-component-settings-dropdown.png)

[Register](https://apps.sematext.com/ui/registration) for free or [Login](https://apps.sematext.com/ui/login/) into Sematext IT systems monitoring platform to get started and create your logs app. Upload your logs from all your servers to our centralized log management solution with Elasticsearch API and integrated Kibana, and experience the first true Hosted ELK Stack.

Recommendations for learning more about Sematext products and services:

- [Logs documentation](/logs/)
- Our [website](https://sematext.com/) and [Logging](https://sematext.com/logsene/) products 
- For Sematext Logging Agent and other Sematext contribution to the open-source community, check our [GitHub](https://github.com/sematext/) repositories.
- or just use chat in the right bottom corner of the app or website page and one of our engineers will help you navigate Sematext waters.
