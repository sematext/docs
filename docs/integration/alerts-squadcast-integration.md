title: Squadcast Alerts Integration
description: Sematext threshold, anomaly and / or heartbeat Alerts integration with Squadcast. Use them together to get the information about each notification quickly and on any device.

## In Squadcast

**1.** Create an account at [Squadcast](https://www.squadcast.com) if you don't have one already.

To receive incoming notifications from Sematext add and configure a new integration in Squadcast:

**2.** Click on profile icon in the top-right and chose **Profile** to open the profile details:

<img class="content-modal-image" alt="Create Squadcast Integration - Profile" src="../../images/integrations/create-squadcast-integration-profile.png" title="Create Squadcast Integration - Profile">

**3.** If you don't have an API token, click the **Generate new API token** to generate a token used to communicate with Squadcast and copy it so you can use it in Sematext:

<img class="content-modal-image" alt="Create Squadcast Integration - New API Token" src="../../images/integrations/create-squadcast-integration-profile-details.png" title="Create Squadcast Integration - New API Token">

**4.** If you don't have a service, create it using the **Add Service** button in the **Services** section. If you already have a service defined and you would like to add **alert source** jump to point **6**:

<img class="content-modal-image" alt="Create Squadcast Integration - Add Service" src="../../images/integrations/create-squadcast-integration-add-service.png" title="Create Squadcast Integration - Add Service">

**5.** A modal window will open allowing you to define the service

<img class="content-modal-image" alt="Create Squadcast Integration - Service Details" src="../../images/integrations/create-squadcast-integration-service-details.png" title="Create Squadcast Integration - Service Details">

**6.** In **Services** click the **Alert Sources** under the service you would like to integrate Sematext notifications with. If you wish to receive notifications from Sematext to different services you will need to create multiple notification hooks:  

<img class="content-modal-image" alt="Create Squadcast Integration - Alert Sources" src="../../images/integrations/create-squadcast-integration-alert-sources.png" title="Create Squadcast Integration - Alert Sources">

**6.** In the opened window type **API** and copy the **API Webhook URL**:

<img class="content-modal-image" alt="Create Squadcast Integration - API Webhook URL" src="../../images/integrations/create-squadcast-integration-alert-source-details.png" title="Create Squadcast Integration - API Webhook URL">

Having the **Alert Source** configured and having the **API Webhook URL** we can add the notification hook to Sematext. 

## In Sematext

**1.** Navigate to [Notification Hooks](https://apps.sematext.com/ui/webhook-create) and select Squadcast card to create a new Squadcast notification hook.

![Sematext Notification Hooks](https://sematext.com/docs/images/integrations/sematext-notification-hooks.png  "Sematext Notification Hook")

**2.** Add your Squadcast **Webhook URL**. 

<img class="content-modal-image" alt="Create Squadcast Integration" src="../../images/integrations/create-squadcast-integration.png" title="Create Squadcast Integration">

Next, click the **Send Test Notification** button. Squadcast should return information similar to **{"data":{"message":"Pipeline processing done"},"meta":{"request_id":"8a8c2d9b-aea6-479b-9f1f-373ac6785d37"}}** indicating everything is configured correctly. Check your Squadcast integration for the test message from Sematext. 

Once the test message is visible, click the **Save Notification Hook** button to save your configuration. 
