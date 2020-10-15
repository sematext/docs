title: OpsGenie Alerts Integration
description: Sematext threshold, anomaly and / or heartbeat Alerts integration with OpsGenie's real-time messaging communication tool. Use them together for seamless infrastructure and application monitoring integration with alert-messaging, and begin sending webhook notifications to your customized devops team channel

OpsGenie is a modern incident management platform for operating always-on services, empowering Dev and Ops teams to plan for service disruptions and stay in control during incidents. OpsGenie centralizes alerts, notifies the right people reliably, and enables them to collaborate and take rapid action. Throughout the entire incident lifecycle, OpsGenie tracks all activity and provides actionable insights to improve productivity and drive continuous operational efficiencies.

Sematext has threshold, anomaly and / or heartbeat Alerts integration with OpsGenie's's alert/incident management and notification tools.

## **In OpsGenie**

Log into your [OpsGenie account](https://app.opsgenie.com/auth/login) and create app API needed to create the integration between OpsGenie and Sematext APM, Log Management, Tracing, Experience, and Synthetics platform. Also check [Opsgenie's Alert API](https://docs.opsgenie.com/docs/alert-api) for alert creation, deletion, and action requests are processed asynchronously to provide higher availability and scalability, therefore valid requests for those endpoints.

Visit OpsGenie's documentation and [new user guide](https://docs.opsgenie.com/docs/new-user-guide) for more information about their service integration with other SaaS monitoring and logging tools such as ours.

## **In Sematext**

Navigate to [Sematext Navigation Hooks](https://apps.sematext.com/ui/webhook-create) and select OpsGenie card to create a new notification hook.

![Sematext Notification Hooks](https://sematext.com/docs/images/integrations/sematext-notification-hooks.png "Sematext Notification Hook")

Enter required parameters and copy incoming OpsGenie Service API Key. Click Test button to confirm that Sematext app is sending data and save your Pig Panda alerts integration.

![OpsGenie Alerts Integration](https://sematext.com/docs/images/integrations/opsgenie-integration.png "OpsGenie Integration")

**Done.** Every alert from your Sematext Monitoring app will be forwarded to OpsGenie,
where you can manage escalation policies and configure notifications to
other services like HipChat, Slack, Zapier, Flowdock, and more.
