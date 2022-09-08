title: PagerDuty Alerts Integration
description: Sematext threshold, anomaly and / or heartbeat Alerts integration with PagerDuty devops management and analytics platform. Use them together to gain full visibility into enterprise services, systems, incident response, and IT infrastructure health.

Use PagerDuty’s on-call schedules and escalation policies so that the right people are notified when events are triggered from Sematext 's server and application performance monitoring, alerting, and anomaly detection platform.

## **In PagerDuty**

- From the main page, select Services.

- On your Services page:

If you are creating a new service for your integration, click +Add New Service.

<img src="https://sematext.com/docs/images/integrations/create-pagerduty-integration-new-service.png">

Give your service a name, select an escalation policy and alert grouping rule click next, then select Sematext from Integrations and click Create Service

<img src="https://sematext.com/docs/images/integrations/create-pagerduty-integration.png">

If you are adding your integration to an existing service, click the name of the service you want to add the integration to. Then click the Integrations tab and click the +New Integration button.

- Select Sematext from the Integrations menu and click Add.

- Copy the Integration Key for your new integration:

<img src="https://sematext.com/docs/images/integrations/create-pagerduty-integration-copy-key.png">

If you want to edit your integration, click on your service. Then in Integrations tab you can specify Incident Behavior of your service. In Settings tab you can specify the Escalation Policy, Notification Urgency and Alert Grouping settings for your service.

Please refer to [PagerDuty's guide](https://www.pagerduty.com/docs/guides/sematext-spm-integration-guide/) on Sematext's integration of on-call schedules and escalation policies so that the right people are notified when events are triggered from our platform.

## **In Sematext**

Navigate to [Notification Hooks](https://apps.sematext.com/ui/hooks/create) (in [EU](https://apps.eu.sematext.com/ui/hooks/create)) and select PagerDuty card to create a new notification hook.

![Sematext Notification Hooks](https://sematext.com/docs/images/integrations/sematext-notification-hooks.png  "Sematext Notification Hook")

Enter required parameters and copy incoming PagerDuty Service API Key. Click Test button to confirm that Sematext app is sending data and save your PagerDuty alerts integration.

![PagerDuty Alerts Integration](https://sematext.com/docs/images/integrations/create-pagerduty-integration-add-hook.png  "Create PagerDuty Integration")

Check PagerDuty's [Generating a General Access REST API Key](https://support.pagerduty.com/docs/using-the-api#section-generating-an-api-key) documentation for more information on Service API Key.

**Done.** Every alert from your Sematext Monitoring app will be forwarded to PagerDuty,
where you can manage escalation policies and configure notifications to
other services like HipChat, Slack, Zapier, Flowdock, and more.

If you need help with this integration, send us an email at support@sematext.com or talk with us directly using live chat.
