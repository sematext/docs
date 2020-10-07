title: Signl4 Alerts Integration
description: Sematext threshold, anomaly and / or heartbeat Alerts integration with Signl4. Use them together to get the information about each notification quickly and on any device.

## In Signl4

**1.** Create a Signl4 account at [signl4.com](https://www.signl4.com).

**2.** Go to the **Apps** in the left menu and chose the **Inbound Webhook** to get the webhook URL:

<img class="content-modal-image" alt="Create Signl4 Integration - Inbound Webhook" src="../../images/integrations/create-signl4-integration-inbound-webhook.png" title="Create Signl4 Integration - Inbound Webhook">

**3.** Copy the **Signl4 team's webhook URL**:

<img class="content-modal-image" alt="Create Signl4 Integration - Webhook URL" src="../../images/integrations/create-signl4-integration-webhook-url.png" title="Create Signl4 Integration - Webhook URL">

Once we have the **Signl4 team's webhook URL** we can create the Signl4 notification hook in Sematext.

## In Sematext

**1.** Navigate to [Notification Hooks](https://apps.sematext.com/ui/webhook-create) and select Signl4 card to create a new Signl4 notification hook.

![Sematext Notification Hooks](https://sematext.com/docs/images/integrations/sematext-notification-hooks.png  "Sematext Notification Hook")

**2.** Add your notification hook name and **Signl4 Inbound Webhook URL**.

<img class="content-modal-image" alt="Create Signl4 Integration" src="../../images/integrations/create-signl4-integration.png" title="Create Signl4 Integration">

Next, click the **Send Test Notification** button. Signl4 should return status code **201** and the **eventId** indicating everything is configured correctly. Check your Signl4 account to see if the notification was created. 

Once the notification is visible, click the **Save Notification Hook** button to save your configuration. 