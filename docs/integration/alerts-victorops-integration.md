title: VictorOps Alerts Integration
description: Sematext threshold, anomaly and / or heartbeat Alerts integration with VictorOps real-time messaging communication tool. Use them together for seamless infrastructure and application monitoring integration with alert-messaging, and begin sending webhook notifications to your customized devops team channel

VictorOps automates getting the right alert to the right person at the right time with its incident management software that aligns our log management and monitoring platform. Sematext has threshold, anomaly and / or heartbeat Alerts integration with VictorOps' alert/incident management and notification tools.

## **In VictorOps**

Log into your [VictorOps account](https://portal.victorops.com/) and create Routing Key and API Key needed to create the integration between VictorOps and Sematext APM, Log Management, Tracing, and RUM platform. Also check [VictorOps's API](https://help.victorops.com/knowledge-base/victorops-restendpoint-integration/) for alerts API and REST Endpoint information.

Visit VictorOps's [Getting Started Guide](https://help.victorops.com/article-categories/getting-started/) for more information about their service integration with other SaaS monitoring and logging tools such as ours.

## **In Sematext**

Navigate to [Sematext Navigation Hooks](https://apps.sematext.com/ui/webhook-create) and select VictorOps card to create a new notification hook.

![Sematext Notification Hooks](https://sematext.com/docs/images/integrations/sematext-notification-hooks.png "Sematext Notification Hook")

Enter required parameters and copy incoming VictorOps Routing and API Key. Click Test button to confirm that Sematext app is sending data and save your VictorOps alerts integration.

![VictorOps Alerts Integration](https://sematext.com/docs/images/integrations/victorops-integration.png "VictorOps Integration")

**Done.** Every alert from your Sematext Monitoring app will be forwarded to VictorOps,
where you can manage escalation policies and configure notifications to
other services like HipChat, Slack, Zapier, Flowdock, and more.
