title: Spike.sh Alerts Integration
description: Sematext threshold, anomaly and / or heartbeat Alerts integration with Spike.sh. Use them together to get the information about each notification quickly and on any device.

## In Spike.sh

**1.** Create an account at [Spike.sh](https://spike.sh) if you don't have one already.

To be able to receive incoming notifications we need to add and configure a new integration. To do that:

**2.** Go to the **Integrations** page and click **New integration**:

<img class="content-modal-image" alt="Create Spike.sh Integration - New Integration" src="../../images/integrations/create-spikesh-integration-integrations.png" title="Create Spike.sh Integration - New Integration">

**3.** Choose the **Sematext** integration from the integrations list: 

<img class="content-modal-image" alt="Create Spike.sh Integration - Sematext" src="../../images/integrations/create-spikesh-integration-sematext.png" title="Create Spike.sh Integration - Sematext">

**4.** Provide the name, description of the integration. Choose the service that it should be added to, the escalation policy and the acknowledge time:

<img class="content-modal-image" alt="Create Spike.sh Integration - Integration Description" src="../../images/integrations/create-spikesh-integration-add-integration.png" title="Create Spike.sh Integration - Integration Description">

**5.** Once created click the **Copy Webhook** link:

<img class="content-modal-image" alt="Create Spike.sh Integration - Copy Webhook" src="../../images/integrations/create-spikesh-integration-copy.png" title="Create Spike.sh Integration - Copy ">

**6.** Finally click **Copy** button in the displayed modal window and note down the URL that was copied into the clipboard:

<img class="content-modal-image" alt="Create Spike.sh Integration - URL copy" src="../../images/integrations/create-spikesh-integration-copy-webhook.png" title="Create Spike.sh Integration - URL copy">

Having the **Integration** configured and having the ** Webhook URL** we can add the notification to Sematext. 

## In Sematext

**1.** Navigate to [Notification Hooks](https://apps.sematext.com/ui/webhook-create) and select Spike.sh card to create a new Spike.sh notification hook.

![Sematext Notification Hooks](../../images/integrations/sematext-notification-hooks.png "Sematext Notification Hook")

**2.** Add your Spike.sh **Webhook URL**. 

<img class="content-modal-image" alt="Create Spike.sh Integration" src="../../images/integrations/create-spikesh-integration.png" title="Create Spike.sh Integration">

Next, click the **Send Test Notification** button. Spike.sh returns **OK** indicating everything is configured correctly. Check your Spike.sh integration for the test message from Sematext. 

Once the test message is visible click the **Save Notification Hook** button to save your configuration. 

That's it. Notifications sent to Spike.sh can also be sent via other channels such as e-mail, Pagerduty, Nagios, etc. Check [alerts](/integration) to learn more about other channels and types of alerts available.

We hope you enjoy using Sematext App and infrastructure monitoring and log management tools. If you need further support or have any feedback regarding our products, please don't hesitate to [contact us](mailto:support@sematext.com)!

You can also contact / talk to us using chat widget at the bottom right corner of the page or give us a shout [@Sematext](http://twitter.com/sematext).
