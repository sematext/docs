title: Custom Webhooks Parameters
description: Sematext threshold, anomaly and / or heartbeat Alerts integration with generic webhooks.

Sematext Notification Hooks support a set of variables you can use to customize the information sent from Sematext to the destination of your choice. 

The following variables are supported:

 * **$webHookName** - the name of the webhook
 * **$applicationId** - application identifier
 * **$applicationToken** - application token (be careful about providing one as it may allow unauthorized users to send or retrieve data for an App)
 * **$ruleType** - the type of the Alert Rule
 * **$createTimestamp** - alert creation timestamp
 * **$backToNormal** - flag indicating notification type that informs about the non-alerting state
 * **$title** - alert title
 * **$description** - alert description
 * **$url** - the URL of the webhook
 * **$troubleshootUrl** - troubleshoot URL in Sematext

You can use any of the above variables in the parameters when you create your Custom Webhook:

<img class="content-modal-image" alt="Custom Webhook With Parameters" src="../../images/integrations/custom-webhook-with-parameters.png" title="Create Custom Webhook With Parameters">