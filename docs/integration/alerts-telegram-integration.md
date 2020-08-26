title: Telegram Alerts Integration
description: Sematext threshold, anomaly and / or heartbeat Alerts integration with Telegram messenger. Use them together to get the information about each notification quickly and on any device.

## In Telegram

**1.** Create a Telegram account at [telegram.org](https://telegram.org).

**2.** Setup your Telegram client and start chatting with a user named **BotFather**. This is a place where you can create your bot. Just type in:

```
/newbot
```

And in the next line type your bot name, i.e. **SematextNotificationBot**. 

Finally, type the bot username, it has to end with the **_bot** suffix, i.e. **SematextNotificationBot_bot**.

If everything went successfully you should get a message with the **Bot Token API key**:

<img class="content-modal-image" alt="Create Telegram Bot Token API Key" src="../../images/integrations/create-telegram-integration_bot_key.png" title="Create Telegram Bot Token API Key">

Note the **Bot Token API key** down, you will need to provide it in Sematext UI.

**3.** Using the Telegram client send a message to your bot.

<img class="content-modal-image" alt="Send a Message To Telegram Bot" src="../../images/integrations/create-telegram-integration_bot_key.png" title="Send a Message To Telegram Bot">

**4.** Invite the bot to the channel it should send the notifications to. You can do that by including the bot in the administrators of the channel in your Telegram client. Let's follow the steps. 

First, message the bot using the Telegram client of your choice:

<img class="content-modal-image" alt="Create Telegram Integration - Message Bot" src="../../images/integrations/create-telegram-integration_bot_message.png" title="Create Telegram Integration - Message Bot">

Next, click the channel name:

<img class="content-modal-image" alt="Create Telegram Integration - Click Channel Name" src="../../images/integrations/create-telegram-integration_click_channel_name.png" title="Create Telegram Integration - Click Channel Name">

Click the **Administrators** to list the channel administrators:

<img class="content-modal-image" alt="Create Telegram Integration - List Administrators" src="../../images/integrations/create-telegram-integration_add_administrator.png" title="Create Telegram Integration - List Administrators">

Click the **Add Admin** button:

<img class="content-modal-image" alt="Create Telegram Integration - Add Admin" src="../../images/integrations/create-telegram-integration_add_new_administrator.png" title="Create Telegram Integration - Add Admin">

Find the created bot and click on it:

<img class="content-modal-image" alt="Create Telegram Integration - Add the Bot" src="../../images/integrations/create-telegram-integration_add_bot.png" title="Create Telegram Integration - Add the Bot">

Finally review the permissions and click done:

<img class="content-modal-image" alt="Create Telegram Integration - Review Permissions" src="../../images/integrations/create-telegram-integration_add_bot_finish.png" title="Create Telegram Integration - Review Permissions">

**5.** Retrieve the channel identifier that the bot will send the notifications to. This can be done by running the following request:

``` bash
curl -s -k https://api.telegram.org/bot<BOT_TOKEN_API_KEY>/getUpdates
```

Just replace the **<BOT_TOKEN_API_KEY>** with the token that you got in the second step. The response should be similar to the following one:

``` json
{"ok":true,"result":[{"update_id":878583440,
"channel_post":{"message_id":2,"chat":{"id":-1001236826225,"title":"SematextNotifications","type":"channel"},"date":1598380548,"text":"Test test"}}]}
```

If the response is empty, just send a simple message to the channel you invited the bot to and re-run the request. We are interested in the chat identifier, so the **-1001236826225** value from the above response. Note it down.

We are now ready to add our Telegram notification hook to Sematext.

## In Sematext

**1.** Navigate to [Notification Hooks](https://apps.sematext.com/ui/webhook-create) and select Telegram card to create a new Telegram notification hook.

![Sematext Notification Hooks](../../images/integrations/sematext-notification-hooks.png "Sematext Notification Hook")

**2.** Add your Telegram **bot token** and **chat identifier**. 

<img class="content-modal-image" alt="Create Telegram Integration" src="../../images/integrations/create-telegram-integration.png" title="Create Telegram Integration">

Next, click the **Send Test Notification** button. Telegram returns status code **200** indicating everything is configured correctly. Check your Telegram channel for the test message from Sematext. 

Once the test message is visible click the **Save Notification Hook** button to save your configuration. 

That's it. Notifications sent to Telegram can also be sent via other channels such as e-mail, Pagerduty, Nagios, etc. Check [alerts](/integration) to learn more about other channels and types of alerts available.

We hope you enjoy using Sematext App and infrastructure monitoring and log management tools. If you need further support or have any feedback regarding our products, please don't hesitate to [contact us](mailto:support@sematext.com)!

You can also contact / talk to us using chat widget at the bottom right corner of the page or give us a shout [@Sematext](http://twitter.com/sematext).
