title: AlertOps Alerts Integration
description: Sematext threshold, anomaly and / or heartbeat Alerts integration with AlertOps - a real-time, intelligent, automated incident management platform. Use them together for seamless infrastructure and application monitoring integration with alert-messaging, and begin sending webhook notifications to reach the appropriate team by using proper workflows, escalation policies and schedules. 

Based on your ruleset, incidents can be automatically opened and closed, depending on whether Sematext reports a problem or a recovery. 

The above scenario and scope for integration is due to the fact that AlertOps has a very flexible and simple API/Webhook configuration feature that can be leveraged with Sematext’s monitoring and alerting capabilities.

## **In AlertOps**

Log into your [AlertOps account](https://alertops.com/) and configure *inbound* integration between AlertOps and Sematext. Also check [AlertOps's integration guide](https://help.alertops.com/en/articles/5554660-sematext) for more integration details.


## **In Sematext**

Navigate to [Notification Hooks](https://apps.sematext.com/ui/hooks/create) (in [EU](https://apps.eu.sematext.com/ui/hooks/create)) and select AlertOps card to create a new notification hook.

![Sematext Notification Hooks](https://sematext.com/docs/images/integrations/sematext-notification-hooks.png "Sematext Notification Hook")

Enter required parameters and copy incoming AlertOps **API URL**. Click Test button to confirm that Sematext App is sending data and save your AlertOps alerts integration.
Once the test message is visible, click the **Save Notification Hook** button to save your configuration. 

![AlertOps Alerts Integration](https://sematext.com/docs/images/integrations/alertops-integration.png "AlertOps Integration")


## **Mapping priority in AlertOps**
Sematext Alerts let you set the priority for your alert rules. With this functionality, you will be able to differentiate between info, warn, error, and critical alerts.
You can check how to set up Escalation rules in AlertOps on [AlertOps's escalation policies](https://help.alertops.com/en/articles/1650437-escalation-policies)

You can utilize alert priority in AlertOps by mapping priority field to an Escalation rule.
This can be configured in `Inbound Integrations -> Sematext integration -> Advanced rules` menu option.
![AlertOps Escalation Rules Menu](https://sematext.com/docs/images/integrations/alertops-escalation-rules-menu.png "AlertOps Escalation Rules Menu")

Choose an AlertOps Escalation rule to map to a certain received priority from Sematext.
![AlertOps Escalation Rules](https://sematext.com/docs/images/integrations/alertops-escalation-rules.png "AlertOps Escalation Rules")

**Done.** Every alert from your Sematext App will be forwarded to AlertOps,
where you can manage escalation policies based on priority in received notification from Sematext.
