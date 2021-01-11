title: Pagerduty Alerts Integration
description: Sematext threshold, anomaly and / or heartbeat Alerts integration with PagerDuty devops management and analytics platform. Use them together to gain full visibility into enterprise services, systems, incident response, and IT infrastructure health.

Use PagerDuty’s on-call schedules and escalation policies so that the right people are notified when events are triggered from Sematext 's server and application performance monitoring, alerting, and anomaly detection platform.

## **In PagerDuty**

- From the Configuration menu, select Services.

- On your Services page:

If you are creating a new service for your integration, click +Add New Service.

If you are adding your integration to an existing service, click the name of the service you want to add the integration to. Then click the Integrations tab and click the +New Integration button.

<img src="https://iqm7l1pa7bn3d42rc278rat5-wpengine.netdna-ssl.com/wp-content/uploads/integration-guide-assets/RS-Add-New-Service.jpg">

<img src="https://iqm7l1pa7bn3d42rc278rat5-wpengine.netdna-ssl.com/wp-content/uploads/integration-guide-assets/RS-Add-Integration-Existing-Service.jpg">

- Select your app from the Integration Type menu and enter an Integration Name.

If you are creating a new service for your integration, in General Settings, enter a Name for your new service. Then, in Incident Settings, specify the Escalation Policy, Notification Urgency, and Incident Behavior for your new service.

- Click the Add Service or Add Integration button to save your new integration. You will be redirected to the Integrations page for your service.

- Copy the Integration Key for your new integration:

<img src="https://iqm7l1pa7bn3d42rc278rat5-wpengine.netdna-ssl.com/wp-content/uploads/integration-guide-assets/RS_Updates__API_Services-1024x146.png">

Please refer to [PagerDuty's guide](https://www.pagerduty.com/docs/guides/sematext-spm-integration-guide/) on Sematext's integration of on-call schedules and escalation policies so that the right people are notified when events are triggered from our platform.

## **In Sematext**

Navigate to [Notification Hooks](https://apps.sematext.com/ui/hooks/create) (in [EU](https://apps.eu.sematext.com/ui/hooks/create)) and select PagerDuty card to create a new notification hook.

![Sematext Notification Hooks](https://sematext.com/docs/images/integrations/sematext-notification-hooks.png  "Sematext Notification Hook")

Enter required parameters and copy incoming PagerDuty Service API Key. Click Test button to confirm that Sematext app is sending data and save your PagerDuty alerts integration.

![PagerDuty Alerts Integration](https://sematext.com/docs/images/integrations/pagerduty-integration-webhook.png  "Create PagerDuty Integration")

Check PagerDuty's [Generating a General Access REST API Key](https://support.pagerduty.com/docs/using-the-api#section-generating-an-api-key) documentation for more information on Service API Key.

**Done.** Every alert from your Sematext Monitoring app will be forwarded to PagerDuty,
where you can manage escalation policies and configure notifications to
other services like HipChat, Slack, Zapier, Flowdock, and more.
