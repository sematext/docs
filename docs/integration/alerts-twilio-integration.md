title: Twilio Alerts Integration
description: Sematext threshold, anomaly and / or heartbeat Alerts integration with Twilio. Use them together to get the information about each notification quickly and on any device.

## In Telegram

**1.** Create a Twilio account at [twilio.com](https://twilio.com).

**2.** Go to your Twilio project that you want to send notifications to and setup a new Twilio **Phone number**. This number will be used as the sender or the SMS messages. If you are testing Twilio you can click the **Get a Trial Number** button to generate a temporary phone number for tests. In addition to the phone number you will also need the **Account SID** and the **Auth Token** to be able to setup the notification in Sematext. Note those down:

<img class="content-modal-image" alt="Create Twilio Integration - Credentials" src="../../images/integrations/create-twilio-integration-create-phone-number.png" title="Create Twilio Integration - Credentials">

If you wish to test Sematext notifications in Twilio test environment head to **Settings** and its **General** subsection to get the test **Account SID** and the **Auth Token**.

<img class="content-modal-image" alt="Create Twilio Integration - Test Credentials" src="../../images/integrations/create-twilio-integration-settings.png" title="Create Twilio Integration - Test Credentials">

**3.** If you didn't have a Twilio phone number earlier clicking the **Get a Trial Number** button will result in displaying your phone number. Click the **Choose this Number** to accept it:

<img class="content-modal-image" alt="Create Twilio Integration - New Phone Number" src="../../images/integrations/create-twilio-integration-confirm-phone-number.png" title="Create Twilio Integration - New Phone Number">

**4.** Once accepted note down the phone number:

<img class="content-modal-image" alt="Create Twilio Integration - Phone Number" src="../../images/integrations/create-twilio-integration-display-phone-number.png" title="Create Twilio Integration - Phone Number">

Once we have the **Accound SID**, the **Auth token** and the **Twilio phone number** we can create the Twilio notification hook in Sematext.

## In Sematext

**1.** Navigate to [Notification Hooks](https://apps.sematext.com/ui/webhook-create) and select Twilio card to create a new Twilio notification hook.

![Sematext Notification Hooks](../../images/integrations/sematext-notification-hooks.png "Sematext Notification Hook")

**2.** Add your notification hook name and Twilio API details by providing: **Accound SID**, **Auth token**, **destination phone number**, and **Twilio phone number**.

<img class="content-modal-image" alt="Create Twilio Integration" src="../../images/integrations/create-twilio-integration.png" title="Create Twilio Integration">

Next, click the **Send Test Notification** button. Twilio returns status code **201** indicating everything is configured correctly. Check your phone if the SMS from Twilio was delivered. 

Once the SMS is visible click the **Save Notification Hook** button to save your configuration. 

That's it. Notifications sent to Twilio can also be sent via other channels such as e-mail, Pagerduty, Nagios, etc. Check [alerts](/integration) to learn more about other channels and types of alerts available.

We hope you enjoy using Sematext App and infrastructure monitoring and log management tools. If you need further support or have any feedback regarding our products, please don't hesitate to [contact us](mailto:support@sematext.com)!

You can also contact / talk to us using chat widget at the bottom right corner of the page or give us a shout [@Sematext](http://twitter.com/sematext).
