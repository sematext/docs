title: Microsoft Teams Alerts Integration
description: Sematext threshold, anomaly and / or heartbeat Alerts integration with Microsoft Teams. Use them together to get the information about each notification quickly and on any device.

## In Microsoft Teams

**1.** Create a new team and channel that will be used to receive notifications from Sematext.

**2.** Follow the instructions on [Manage Microsoft 365 connectors and custom connectors](https://learn.microsoft.com/en-us/microsoftteams/m365-custom-connectors#update-connectors-url) to update existing or create a new connector URL.  

**3.** Finally, copy the displayed **URL** in the forth step.

We can now use the **URL** to configure the Microsoft Teams notification hook in Sematext.

## In Sematext

**1.** Navigate to [Notification Hooks](https://apps.sematext.com/ui/hooks/create) (in [EU](https://apps.eu.sematext.com/ui/hooks/create)) and select Microsoft Teams card to create a new Microsoft Teams notification hook.

![Sematext Notification Hooks](https://sematext.com/docs/images/integrations/sematext-notification-hooks.png  "Sematext Notification Hook")

**2.** Add your Microsoft Teams **webhook URL**. 

<img class="content-modal-image" alt="Create Microsoft Teams Integration" src="../../images/integrations/create-teams-integration.png" title="Create Microsoft Teams Integration">

Next, click the **Send Test Notification** button. Microsoft Teams should return **1** indicating everything is configured correctly. Check your Microsoft Teams channel for the test message from Sematext. 

Once the test message is visible, click the **Save Notification Hook** button to save your configuration. 
