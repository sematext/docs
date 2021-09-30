title: Google Chat Alerts Integration
description: Sematext threshold, anomaly and / or heartbeat Alerts integration with Google Chat. Use them together to get the information about each notification quickly and on any device.

## In Google Chat

**1.** Create a new space that will be used to receive notifications from Sematext, or use an existing one.

On the spaces tab, click the **+** icon:

<img class="content-modal-image" alt="Create Google Chat Integration - Add Space" src="../../images/integrations/create-googlechat-integration-add.png" title="Create Google Chat Integration - Add Space">

**2.** Select **Create Space** option:

<img class="content-modal-image" alt="Create Google Chat Integration - New Space" src="../../images/integrations/create-googlechat-integration-new-space.png" title="Create Google Chat Integration - New Space">

**3.** Give your space a name and click **Create**:

<img class="content-modal-image" alt="Create Google Chat Integration - Create Space" src="../../images/integrations/create-googlechat-integration-create.png" title="Create Google Chat Integration - Create Space">

**4.** Open the drop down menu with your space's name and select **Manage webhooks**:

<img class="content-modal-image" alt="Create Google Chat Integration - Manage Webhooks" src="../../images/integrations/create-googlechat-integration-manage-webhooks.png" title="Create Google Chat Integration - Manage Webhooks">

**5.** Give your webhook a name (and optionally an avatar) and click **Save**:

<img class="content-modal-image" alt="Create Google Chat Integration - Save Webhook" src="../../images/integrations/create-googlechat-integration-save-webhooks.png" title="Create Google Chat Integration - Save Webhook">

**6.** Copy the webhook URL using the copy button:

<img class="content-modal-image" alt="Create Google Chat Integration - Copy Webhook" src="../../images/integrations/create-googlechat-integration-copy-webhooks.png" title="Create Google Chat Integration - Copy Webhook">

With the **Incoming Webhook** configured we can now use the **Webhook URL** to configure the Google Chat notification hook in Sematext.

## In Sematext

**1.** Navigate to [Notification Hooks](https://apps.sematext.com/ui/hooks/create) (in [EU](https://apps.eu.sematext.com/ui/hooks/create)) and select Google Chat card to create a new Google Chat notification hook.

<img class="content-modal-image" alt="Create Google Chat Integration - New Notification Hook" src="../../images/integrations/create-googlechat-integration-new-hook.png" title="Create Google Chat Integration - New Notification Hook">

**2.** Give your webhook a name and add your Google Chat **Webhook URL**.

<img class="content-modal-image" alt="Create Google Chat Integration - Paste Webhook URL" src="../../images/integrations/create-googlechat-integration-paste-hook.png" title="Create Google Chat Integration - Paste Webhook URL">

**3.** Next, click the **Send Test Notification** button. Google Chat should return **200 (OK)** indicating everything is configured correctly. Check your Google Chat channel for the test message from Sematext.

<img class="content-modal-image" alt="Create Google Chat Integration - Test Notification Hook" src="../../images/integrations/create-googlechat-integration-test-hook.png" title="Create Google Chat Integration - Test Notification Hook">

<img class="content-modal-image" alt="Create Google Chat Integration - Receive Notification Hook" src="../../images/integrations/create-googlechat-integration-receive-hook.png" title="Create Google Chat Integration - Receive Notification Hook">

Once the test message is visible, click the **Save Notification Hook** button to save your configuration. 
