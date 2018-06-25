Hipchat is a tool for team collaboration and messaging by Atlassian. It provides integration with a wide range of other tools in your environment, including Sematext Monitoring and Logging Management Platform. Both our On Premise as well as Cloud service provide two-way integration with HipChat where alerts go right into HipChat rooms, and in turn, users can acknowledge, close, or assign these alerts. Our Alert notifications are automatically forwarded to your HipChat room.

## In HipChat

1.  Navigate to Rooms / YOUR ROOM NAME / Tokens and create a new token.

    NOTE: we support OAuth2 and not OAuth1 tokens.

    Link: [Log into HipChat](https://sematexttest.hipchat.com/rooms)

    ![HipChat Notification Token](attachments/34340871/34504710.png?height=400
    "HipChat Notification Token")

    If you already have a HipChat token, please check whether
    it contains only lower case letters. If so, it is probably an OAuth1
    token.  We also support only OAuth2 tokens.  Please create OAuth2 token
    as described above. 

    **There are two possible ways to create HipChat OAuth2
    token: **

    A) Under room as described above. If you use this you will see
    messages from SPM with the nickname you define in the Token Label
    input.

    B) Under user via [Hipchat Account API](https://sematexttest.hipchat.com/account/api).
    If you use this option you will see all messages from Sematext Monitoring and Logging Management Platform with your
    own nickname. 


2.  Copy the HipChat Room Token because you'll need to paste it in later
    (see below). 

## In Sematext

1.  In Sematext Monitoring and Logging Management Platform Navigate to [Sematext Navigation Hooks](https://apps.sematext.com/ui/webhook-create) and select Hipchat card to create a new Hipchat notification hook.

![Sematext Notification Hooks](https://sematext.com/docs/images/integrations/sematext-notification-hooks.png  "Sematext Notification Hook")

2.  Add your HipChat token and Room Id. 

<img class="content-modal-image" alt="Create Hipchat Integration" src="https://sematext.com/docs/images/integrations/create-hipchat-integration.png" title="Create Hipchat Integration">

**Note:** You could add Room Id or Room Name. Both options are possible.

Click the “Test” button and when HipChat returns status code 200 or 204 you will know everything is configured correctly. Check your HipChat channel for the test message from Sematext.

That's it. Notifications sent to Slack can also be sent via other channels such as e-mail, PagerDuty, Nagios, etc. Check [Alerts](/integration) to learn more about other channels and types of alerts available.

We hope you enjoy using Sematext App and Infrastructure Monitoring and Log Management tools. If you need further support or have any feedback regarding our products, please don't hesitate to [contact us](mailto:support@sematext.com) ! You can also contact / talk to us using chat widget at the bottom right corner of the page or give us a shout [@Sematext](http://twitter.com/sematext).
