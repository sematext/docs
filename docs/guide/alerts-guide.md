title: Alerts Guide
description: Sematext Cloud Alerts give you a flexible centralized notification system that lets you manage Alert Rules and Alert Conditions across your whole stack. Use Events to correlate them with Metrics and/or Logs, and see what is happening with your infrastructure.  

A software developer may need alert notifications for both front-end and back-end performance, where operations personnel may need them for poor back-end performance, such as server memory or CPU performance.

Given there are different system administration and devops teams across your IT department, a good alerting practices require:

- Rules to address alerting requirements and personnel that is responsible for them.

- Criteria that triggers alerts for monitored resources and apps in your IT architecture.

- Thresholds you define for different alerting situations when your selected metrics reach certain severity levels. 

- Notification channels through which your team will be notified about the incident. 

Your devops team needs to be notified when your monitored IT key performance indicators spike or drop. Sematext Cloud provides coordinated alerting tools that help you address the underlying issues before they affect user experience. There are three diferent types of alerts available, namely: 

- Threshold alerts are the classic threshold based alerts. They are triggeed when something crosses a pre-defiend threshold.
 
- Anomaly alerts are based on statistical anomaly detection. They are triggeed when values suddenly change and deviate from the continously computed baseline. 

- Heartbeat alerts are triggered when something you are monitoring, like your servers, containers, or your applications stop emitting data to Sematext. 

Threshold and anomaly alerts can be triggered for both metrics and logging apps, where heartbeat alerts are only available for metrics apps.

Our alerting tools provide flexible centralized notification system that lets you manage alert rules across your whole stack. Focus on your key IT performance metrics and use various notification channels to get alerted when critical violations occur so you can take action and resolve an issue. Our alerting tools easily integrate with team communication software like PagerDuty, OpsGenie, HipChat, Slack, and more. 

Check [integrations](https://sematext.com/docs/integration/) pages for more information.

Understanding these fundamental alerting principles will help you get started with our SaaS or on-premises service and define conditions or identify what triggers an alert for the selected rule. You can easily configure alert rules and criteria required to create an incident record, manage notifications channels, and review alert incidents and assign responsibilities for the details of a particular incident.

## Default Alerts

Alerting gives you the ability to create monitors that trigger notifications when performance problems occur in your IT infrastructure. As soon as any app is created, either logging or monitoring, the system will generate several app specific alerts rules to get you started. 

Image below shows system generated saved query algolert anomaly alert for logging app. Three different alert types are also generated for every monitoring app created, namely: 

- metric alert

- heartbeat alert

- metric algolert anomaly

In the case of an example Elasticsearch monitoring app, Java usage threshold and Elasticsearch nodes anomalies were integration specific system generated alerts. There is also a heartbeat alert created that is triggered when the agent you installed stops emitting data to Sematext Cloud.  

![Sematext Cloud System Generated Alerts](https://sematext.com/docs/images/guide/alerts-and-events/system-generated-alerts.png "Sematext Cloud System Generated Alerts")

Navigate to [Alert Rules](https://apps.sematext.com/ui/events/alerts/rules) where you will find all system generated as well user generated alerts listed for all apps that were created. Use actions dropdown menu to edit or delete an existing alerts and icons are used to visualize different alert types.

![Sematext Cloud Alerts Rules Window](https://sematext.com/docs/images/guide/alerts-and-events/alert-rules-window.png "Sematext Cloud Sematext Cloud Alerts Rules Window")

## Creating Alerts

Sematext APM and logging management platform can accommodate IT systems requiring extensive alerting structure, but you may not need an extensive alerting structure at all. A simple alert policy with an email notification channel to cover basic alerting scenarios can be defined just as you can define complex ones.

### Alerting on Logs

In order to create a custom alert in any logging app logs search query needs to be saved. Save Query modal dialogue window will open with option to save an alert. When enable alert option is selected alert notifications panel will expand and alert specific information shown, namely 

- notification hooks details with default email notification hook used to send the message to your account and ability to add additional email address as well as other types of notification hooks. Check [integrations](https://sematext.com/docs/integration/) documentation pages for more information on available alerts notification hooks, and

- alert type, with threshold based alert and algolert or anomaly detection alert for any logging app. For more information on alerting capabilities check [alerts](https://sematext.com/docs/alerts/) documentation pages.

![Sematext Cloud Logging App Alerts](https://sematext.com/docs/images/guide/alerts-and-events/logs-app-create-alert.png "Sematext Cloud Logging App Alerts")


### Alerting on Metrics

Metrics monitoring has different alerting design than the logs query centered one. Although both have threshold and anomaly alerts available, monitoring apps use component based alerting userflow. Every metric time series becomes a component and custom alerts can be created for each, just as it can be added to a custom [dashboard](https://sematext.com/docs/guide/dashboards-guide/).

![Sematext Cloud Metric Component Alerts](https://sematext.com/docs/images/guide/alerts-and-events/metric-component-alert.png "Sematext Cloud Metric Component Alerts")

Additionally, monitoring apps have Heartbeat alerts available as a part of app settings and available in the app settings dropdown menu. They are triggered when something you are monitoring, like your servers, containers, or your applications stop emitting data to Sematext Cloud.

![Sematext Cloud Metric Component Custom Alerts](https://sematext.com/docs/images/guide/alerts-and-events/create-heartbeat-alerts.png "Sematext Cloud Metric Component Custom Alerts")

---

[Register](https://apps.sematext.com/ui/registration) for free or [Login](https://apps.sematext.com/ui/login/) into Sematext IT systems monitoring platform to get started and create your logs app. Upload your logs from all your servers to our centralized log management solution with Elasticsearch API and integrated Kibana, and experience the first true Hosted ELK Stack. 