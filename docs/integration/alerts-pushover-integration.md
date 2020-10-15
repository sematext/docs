title: Pushover Alerts Integration
description: Sematext threshold, anomaly and / or heartbeat Alerts integration with Pushover's real-time messaging communication tool. Use them together for seamless infrastructure and application monitoring integration with alert-messaging, and begin sending webhook notifications to your customized devops team channel

Pushover is a service to receive instant push notifications on your phone or tablet from a variety of sources.  On the server side, Pushover provides an HTTP API for queueing messages to deliver to devices addressable by User or Group Keys. On the device side, Pushover's iOS, Android, and Desktop clients receive those push notifications, show them to the user, and store them for offline viewing.

Sematext has threshold, anomaly and / or heartbeat Alerts integration with Pushover's alert/incident management and notification tools.

## **In Pushover**

Log into your [Pushover account](https://pushover.net/login) and create user key and app token needed to create the integration between Pushover and Sematext APM, Log Management, Tracing, Experience, and Synthetics platform. Also check [Pushover's API](https://pushover.net/api) for alert creation, deletion, and action requests are processed asynchronously to provide higher availability and scalability, therefore valid requests for those endpoints.

Visit Pushover's [FAQ](https://pushover.net/faq) for more information about their service integration with other SaaS monitoring and logging tools such as ours.

## **In Sematext**

Navigate to [Sematext Navigation Hooks](https://apps.sematext.com/ui/webhook-create) and select Pushover card to create a new notification hook.

![Sematext Notification Hooks](https://sematext.com/docs/images/integrations/sematext-notification-hooks.png "Sematext Notification Hook")

Enter required parameters and copy incoming Pushover Service API Key. Click Test button to confirm that Sematext app is sending data and save your Pushover alerts integration.

![Pushover Alerts Integration](https://sematext.com/docs/images/integrations/pushover-integration.png "Pushover Integration")

**Done.** Every alert from your Sematext Monitoring app will be forwarded to Pushover, where you can manage escalation policies and configure notifications to other services like HipChat, Slack, Zapier, Flowdock, and more.
