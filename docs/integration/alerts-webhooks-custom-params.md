title: Custom Webhooks Parameters
description: Sematext threshold, anomaly and / or heartbeat Alerts integration with generic webhooks.

Sematext Notification Hooks support a set of variables you can use to customize the information sent from Sematext to the destination of your choice. 

The following variables are supported:

 * **$webHookName** - the name of the webhook
 * **$applicationId** - App identifier
 * **$applicationToken** - App token **IMPORTANT**: Anyone with access to your App token can access data in your App. Use $applicationToken only if you are sure there is no risk of the token getting compromised.
 * **$ruleType** - the type of the Alert Rule
 * **$createTimestamp** - alert creation timestamp in UTC
 * **$backToNormal** - **true** when the notification is for the incident going back to non-alerting state; **false** otherwise
 * **$title** - alert title, currently equal to ***Sematext***
 * **$description** - alert description
 * **$url** - webhook URL. **IMPORTANT**: to ensure data is sent to the destination securely you must use HTTPS, not HTTP.
 * **$troubleshootUrl** - the URL that leads to Alert Details screen in Sematext

You can use any of the above variables in the parameters when you create your Custom Webhook:

<img class="content-modal-image" alt="Custom Webhook With Parameters" src="../../images/integrations/custom-webhook-with-parameters.png" title="Create Custom Webhook With Parameters">