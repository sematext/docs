title: Microsoft Teams Alerts Integration
description: Sematext threshold, anomaly and / or heartbeat Alerts integration with Microsoft Teams. Use them together to get the information about each notification quickly and on any device.

## In Microsoft Teams

**1.** Create a [Microsoft Teams account](https://www.microsoft.com/en-us/microsoft-365/microsoft-teams/group-chat-software) if you don't have one already and create a new team and channel that will be used to receive notifications from Sematext.

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

**8.** Finally, copy the displayed **Webhook URL** and click **Create** to finish webhook creation.

<img class="content-modal-image" alt="Create Microsoft Teams Integration - Webhook URL" src="../../images/integrations/create-teams-integration-webhook-url.png" title="Create Microsoft Teams Integration - Webhook URL">

With the **Incoming Webhook** configured we can now use the **Webhook URL** to configure the Microsoft Teams notification hook in Sematext.

## In Sematext

**1.** Navigate to [Notification Hooks](https://apps.sematext.com/ui/webhook-create) and select Microsoft Teams card to create a new Microsoft Teams notification hook.

![Sematext Notification Hooks](../../images/integrations/sematext-notification-hooks.png "Sematext Notification Hook")

**2.** Add your Microsoft Teams **webhook URL**. 

<img class="content-modal-image" alt="Create Microsoft Teams Integration" src="../../images/integrations/create-teams-integration.png" title="Create Microsoft Teams Integration">

Next, click the **Send Test Notification** button. Microsoft Teams should return **1** indicating everything is configured correctly. Check your Microsoft Teams channel for the test message from Sematext. 

Once the test message is visible, click the **Save Notification Hook** button to save your configuration. 