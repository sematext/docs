Good IT infrastucture alerting practices require:

- Policies to address alerting requirements and personnel that is responsible for them

- Criteria that triggers alerts for monitored resources and apps in your IT architecture

- Thresholds you define for different alerting situations when your selected metrics reach certain severity levels 

- Notification channels through which your team will be notified about the incident

For example, a software developer may need alert notifications for both front-end and back-end performance, where operations personnel may need alert notifications for poor back-end performance, such as server memory or CPU performance. 

Sematext APM and logging management platform can accommodate IT systems requiring extensive alerting structure or you may not need an extensive alerting structure at all. A simple alert policy with an email notification channel to cover basic alerting scenarios can be defined just as you can define complex ones.

Your devops team needs to be notified when your monitored IT key performance indicators spike or drop. Sematext Cloud provides coordinated alerting tools that help you address the underlying issues before they affect user experience. There are three diferent types of alerts available, namely: 

- Threshold alerts are the classic threshold based alerts. They are triggeed when something crosses a pre-defiend threshold.
 
- Anomaly alerts are based on statistical anomaly detection. They are triggeed when values suddenly change and deviate from the continously computed baseline. 

- Heartbeat alerts are triggered when something you are monitoring, like your servers, containers, or your applications stop emitting data to Sematext. 

Threshold and anomaly alerts can be triggered for both metrics and logging apps, where heartbeat alerts are only available for metrics apps.

Our alerting tools provide flexible centralized notification system that let you manage alert policies and alert conditions across your whole stack. Focus on your key IT performance metrics and use various notification channels to get alerted when critical violations occur so you can take action and resolve an issue. Our alerting tools easily integrate with team communication software like PagerDuty, OpsGenie, HipChat, Slack, and more. 

Check [integrations](https://sematext.com/docs/integration/) pages for more information.

Understanding these fundamental alerting principles will help you get started with our SaaS or on-premises service, namely:

- Defining conditions or identifying what triggers an alert for the selected policy.

- Configuring alert policies that contain the criteria for Sematext IT monitoring tools to create an incident record.

- managing notifications channels and where to send alerts.

- reviewing alert indcidents and assigning responsibilities for the details of a particular incident.

There is however another important concept and system feature that we want to address together with alerts, and it is events.

So what are events, why and how?

Our APM and logging tools you visualize not only performance and custom metrics or logs, but also events. Such events may represent what is happening with a server or cluster, with an application, etc. Think application or server restarts, builds, deployments, alerts, etc. Events are graphed in timeseries charts and these charts can be shown next to metrics or logs charts. This makes it possible to easily correlate events with metrics and/or logs. In addition to showing events as timeseries charts, a detailed listing of events can be seen and, of course, events can have tags, and can be searched and filtered.

Beyond events that you want to see as part of your operations intelligence think about events that matter to your team or your organization in general. Such "business events" can be shipped to Sematext, too.

Besides being shown in the UI events are also exposed via a REST API that lets you post, retrieve, and search your events. This REST API matches the Elasticsearch API, so you can use any Elasticsearch tool or client to post, get, and search events.

[Register](https://apps.sematext.com/ui/registration) for free or [Login](https://apps.sematext.com/ui/login/) into Sematext IT systems monitoring platform to get started and create your logs app. Upload your logs from all your servers to our centralized log management solution with Elasticsearch API and integrated Kibana, and experience the first true Hosted ELK Stack. 


# Alerts Guide


# Events Guide



