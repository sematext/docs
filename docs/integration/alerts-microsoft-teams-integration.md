title: Microsoft Teams Alerts Integration
description: Sematext threshold, anomaly and / or heartbeat Alerts integration with Microsoft Teams. Use them together to get the information about each notification quickly and on any device.

## In Microsoft Teams

**1.** Create a [Microsoft Teams account](https://www.microsoft.com/en-us/microsoft-365/microsoft-teams/group-chat-software) if you don't have one already and create a new team and channel that will be used to receive the notifications from Sematext.

To receive incoming notifications from Sematext add and configure a new integration in Microsoft Teams:

**2.** Select **...** options for your team and click **Manage team**:

<img class="content-modal-image" alt="Create Microsoft Teams Integration - Manage Team" src="../../images/integrations/create-teams-integration-manage-team.png" title="Create Microsoft Teams Integration - Manage Team">

**3.** Click the **More Apps** button to display the list of additional applications:

<img class="content-modal-image" alt="Create Microsoft Teams Integration - More Apps" src="../../images/integrations/create-teams-integration-more-apps.png" title="Create Microsoft Teams Integration - More Apps">

**4.** Find the **Incoming Webhook**, chose it and click the **Add to a team** button to include the selected **Incoming Webhook** connector to your team.

<img class="content-modal-image" alt="Create Microsoft Teams Integration - Add App" src="../../images/integrations/create-teams-integration-add-app.png" title="Create Microsoft Teams Integration - Add App">

**5.** Select the channel to which the **Incoming Webhook** should be added and click the **Set up the Connector** button to continue with configuration.

<img class="content-modal-image" alt="Create Microsoft Teams Integration - Select Channel" src="../../images/integrations/create-teams-integration-select-channel.png" title="Create Microsoft Teams Integration - Select Channel">

**6.** Chose the **Configure** button to the right of the **Incoming Webhook** that you just added.

<img class="content-modal-image" alt="Create Microsoft Teams Integration - Configure" src="../../images/integrations/create-teams-integration-configure.png" title="Create Microsoft Teams Integration - Configure">

**7.** Give your webhook a name and click the **Create** button. As an optional step you can also upload a custom icon for your defined webhook. 

<img class="content-modal-image" alt="Create Microsoft Teams Integration - Create Incoming Webhook" src="../../images/integrations/create-teams-integration-create-incoming-webhook.png" title="Create Microsoft Teams Integration - Create Incoming Webhook">

**8.** Finally the webhook URL will be displayed. You need to copy it and store it - it will be used when configuring the Microsoft Teams notification hook in Sematext. Once you have it stored, click **Create** finishing the webhook creation.

<img class="content-modal-image" alt="Create Microsoft Teams Integration - Webhook URL" src="../../images/integrations/create-teams-integration-webhook-url.png" title="Create Microsoft Teams Integration - Webhook URL">

Having the **Incoming Webhook** configured and having the webhook URL we can add the notification to Sematext. 

## In Sematext

**1.** Navigate to [Notification Hooks](https://apps.sematext.com/ui/webhook-create) and select Microsoft Teams card to create a new Microsoft Teams notification hook.

![Sematext Notification Hooks](../../images/integrations/sematext-notification-hooks.png "Sematext Notification Hook")

**2.** Add your Microsoft Teams **webhook URL**. 

<img class="content-modal-image" alt="Create Microsoft Teams Integration" src="../../images/integrations/create-teams-integration.png" title="Create Microsoft Teams Integration">

Next, click the **Send Test Notification** button. Microsoft Teams returns **1** indicating everything is configured correctly. Check your Microsoft Teams channel for the test message from Sematext. 

Once the test message is visible click the **Save Notification Hook** button to save your configuration. 

That's it. Notifications sent to Microsoft Teams can also be sent via other channels such as e-mail, Pagerduty, Nagios, etc. Check [alerts](/integration) to learn more about other channels and types of alerts available.

We hope you enjoy using Sematext App and infrastructure monitoring and log management tools. If you need further support or have any feedback regarding our products, please don't hesitate to [contact us](mailto:support@sematext.com)!

You can also contact / talk to us using chat widget at the bottom right corner of the page or give us a shout [@Sematext](http://twitter.com/sematext).
