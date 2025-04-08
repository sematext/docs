title: Alerts Overview
description: Threshold, anomaly, and heartbeat alerts for your logs, infrastructure and user-experience metrics with email notifications and various 3rd party integrations and notification hooks such as PagerDuty, Slack and more

<div class="video_container">
<iframe src="https://www.youtube.com/embed/ik_L7Qk_Aug" 
frameborder="0" allow="autoplay; encrypted-media" 
allowfullscreen class="video"></iframe>
</div>


Alerts are used to notify you when one or more pre-defined conditions in your *metrics*, *logs*, *experience*, or *synthetics* data are met.

For example, you might want to be notified when available disk space reaches a certain threshold – *metrics alert*, when the number of logs with `severity: warning` gets too high – *logs alert*, when your users start experiencing high response times – *experience alert*, or when a website or API monitor detects downtime or slow response times – *synthetics alert*.

<!--iframe width="800" height="450" src="https://www.youtube.com/embed/WE9xAUud28o?rel=0" frameborder="0" allow="autoplay; encrypted-media" allowfullscreen></iframe-->

<br/>

## Alert Types

[Sematext Cloud](https://sematext.com/cloud) includes multiple **types** of alerts that integrate with [PagerDuty](/docs/integration/alerts-pagerduty-integration/), [Slack](/docs/integration/alerts-slack-integration/), [email](/docs/alerts/alert-notifications/#email-notification-hooks), and [other 3rd party services](/docs/alerts/alert-notifications).  

1. **Threshold** alerts are the classic threshold based alerts. They are triggered when a certain pre-defined threshold is met.
2. **Heartbeat** alerts are triggered when [Sematext Cloud](https://sematext.com/cloud) stops receiving data from your server, container, application, etc.  
3. **Anomaly** alerts are based on statistical anomaly detection. They are triggered when values suddenly change and deviate from the continously computed baseline.

![Sematext Anomaly Alerts](/docs/images/guide/alerts-and-events/anomaly-alerts.png)

When an anomaly alert is triggered, you'll be able to observe spikes and dips within the alert details flyout upon clicking on the [alert event](/docs/alerts/alert-events/). The chart also features a confidence band that illustrates the range of certainty around the expected values.

![Sematext Anomaly Alert Confidence Band](/docs/images/guide/alerts-and-events/anomaly-alert-confidence-band.png)

## Alert Sources

Alerts can operate on three different **sources** of data:  

1. **[Metrics](/docs/alerts/creating-metrics-alerts/)** alerts work with infrastructure metrics
2. **[Logs](/docs/alerts/creating-logs-alerts/)** alerts are based on various types of logs
3. **[Experience](/docs/alerts/creating-experience-alerts/)** alerts are concerned with *real user monitoring* data - RUM
4. **[Synthetics](/docs/alerts/creating-synthetics-alerts/)** alerts monitor website and API performance through synthetic monitoring checks

Alert type | Metrics | Logs | Experience | Synthetics
--- | --- | --- | --- | ---
Threshold | yes | yes | yes | yes
Anomaly | yes | yes | yes | yes
Heartbeat | yes | no | no | no

You can manage Alert rules interactively via the UI, or you can [manage alerts via the API](/docs/api).

## Alert Rules

Alert rules define the conditions under which alerts are triggered. They enable you to customize monitoring and other aspects based on your specific needs. For more information on creating and managing alert rules, check out the [Alert Rules documentation](/docs/alerts/alert-rules).

## Alert Events

Alert events represent the specific occurrences of triggered alerts within your Apps. For more information on how alert events work and how to manage them, visit the [Alert Events documentation](/docs/alerts/alert-events/).

## Alert Notifications

Alert notifications inform you when an alert is triggered. You can configure various notification channels to ensure that the right team members are alerted promptly. For detailed information on setting up alert notifications, refer to the [Alert Notifications documentation](/docs/alerts/alert-notifications/).
