title: Nagios Alerts Integration
description: Sematext threshold, anomaly and / or heartbeat Alerts integration with Nagios's. Nagios provides enterprise-class Open Source IT system monitoring tools. Use them together for seamless infrastructure and application monitoring integration with alert-messaging

Nagios monitors the network for problems caused by overloaded data links or network connections, as well as monitoring routers, switches and more. Easily able to monitor availability, uptime and response time of every node on the network, Nagios can deliver the results in a variety of visual representations and reports, and our log management and monitoring platform can be connected with Nagios as well.

Sematext has threshold, anomaly and / or heartbeat Alerts integration with Nagios's IT system monitoring tools.

## **In Nagios**

You will need various parameters, namely values for service name, port, host, unknown notification host, password, and catch all notifcation host to create the integration between Nagios and Sematext APM, Log Management, Tracing, Experience, and Synthetics platform.

Visit Nagios's [App Documentation](https://www.nagios.org/documentation/) for more information about their service integration with other SaaS monitoring and logging tools such as ours.

## **In Sematext**

Navigate to [Notification Hooks](https://apps.sematext.com/ui/hooks/create) (in [EU](https://apps.eu.sematext.com/ui/hooks/create)) and select Nagios card to create a new notification hook.

![Sematext Notification Hooks](https://sematext.com/docs/images/integrations/sematext-notification-hooks.png "Sematext Notification Hook")

Enter required parameters and click Test button to confirm that Sematext app is sending data and save your Nagios alerts integration.

![Nagios Alerts Integration](https://sematext.com/docs/images/integrations/nagios-integration.png "Nagios Integration")

**Done.** Every alert from your Sematext Monitoring app will be forwarded to Nagios,
where you can manage escalation policies and configure notifications to
other services like HipChat, Slack, Nagios, Flowdock, and more.
