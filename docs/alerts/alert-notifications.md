---
title: Alerts Notifications
description: Configuring notifications for Alerts
---

# Alerts Notifications

The primary purpose of alert rules is to send notifications when triggered. This is the job of Notification Hooks.

## Available Notification Integrations

<div class="notification-grid">
  <a href="/docs/integration/alerts-bigpanda-integration/" class="notification-card">
    <img src="/docs/images/alerts/notifications/bigpanda.svg" alt="BigPanda">
    <div class="notification-content">
      <h3>BigPanda</h3>
      <p>Alert integration with BigPanda's event and incident management platform.</p>
    </div>
  </a>

  <a href="/docs/integration/alerts-email-integration/" class="notification-card">
    <img src="/docs/images/alerts/notifications/mail.svg" alt="Email">
    <div class="notification-content">
      <h3>Email</h3>
      <p>Default notification method with embedded charts for quick assessment.</p>
    </div>
  </a>

  <a href="/docs/integration/alerts-hipchat-integration/" class="notification-card">
    <img src="/docs/images/alerts/notifications/hipchat.svg" alt="Hipchat">
    <div class="notification-content">
      <h3>Hipchat</h3>
      <p>Send alerts to Hipchat's internal messaging platform.</p>
    </div>
  </a>

  <a href="/docs/integration/alerts-nagios-integration/" class="notification-card">
    <img src="/docs/images/alerts/notifications/nagios.jpg" alt="Nagios">
    <div class="notification-content">
      <h3>Nagios</h3>
      <p>Forward alerts to Nagios monitoring system.</p>
    </div>
  </a>

  <a href="/docs/integration/alerts-opsgenie-integration/" class="notification-card">
    <img src="/docs/images/alerts/notifications/opsgenie.svg" alt="Opsgenie">
    <div class="notification-content">
      <h3>Opsgenie</h3>
      <p>Integrate with OpsGenie for improved incident response.</p>
    </div>
  </a>

  <a href="/docs/integration/alerts-pagerduty-integration/" class="notification-card">
    <img src="/docs/images/alerts/notifications/pagerduty.svg" alt="Pagerduty">
    <div class="notification-content">
      <h3>PagerDuty</h3>
      <p>Send alerts to PagerDuty for improved incident management.</p>
    </div>
  </a>

  <a href="/docs/integration/alerts-pushover-integration/" class="notification-card">
    <img src="/docs/images/alerts/notifications/pushover.svg" alt="Pushover">
    <div class="notification-content">
      <h3>Pushover</h3>
      <p>Receive mobile notifications through Pushover.</p>
    </div>
  </a>

  <a href="/docs/integration/alerts-slack-integration/" class="notification-card">
    <img src="/docs/images/alerts/notifications/slack.svg" alt="Slack">
    <div class="notification-content">
      <h3>Slack</h3>
      <p>Send alerts to Slack workspaces and channels.</p>
    </div>
  </a>

  <a href="/docs/integration/alerts-victorops-integration/" class="notification-card">
    <img src="/docs/images/alerts/notifications/victorops.svg" alt="Victorops">
    <div class="notification-content">
      <h3>Victorops</h3>
      <p>Fast alerts integration with VictorOps incident management.</p>
    </div>
  </a>

  <a href="/docs/integration/alerts-webhooks-integration/" class="notification-card">
    <img src="/docs/images/alerts/notifications/webhooks.svg" alt="Webhooks">
    <div class="notification-content">
      <h3>Webhooks</h3>
      <p>Call custom endpoints with customizable request format.</p>
    </div>
  </a>

  <a href="/docs/integration/alerts-zapier-integration/" class="notification-card">
    <img src="/docs/images/alerts/notifications/zapier.svg" alt="Zapier">
    <div class="notification-content">
      <h3>Zapier</h3>
      <p>Connect alerts to hundreds of apps through Zapier.</p>
    </div>
  </a>

  <a href="/docs/integration/alerts-spikesh-integration/" class="notification-card">
    <img src="/docs/images/alerts/notifications/spike.svg" alt="Spike.sh">
    <div class="notification-content">
      <h3>Spike.sh</h3>
      <p>Integrate with Spike.sh for on-call management.</p>
    </div>
  </a>

  <a href="/docs/integration/alerts-squadcast-integration/" class="notification-card">
    <img src="/docs/images/alerts/notifications/squadcast.svg" alt="Squadcast">
    <div class="notification-content">
      <h3>Squadcast</h3>
      <p>Forward alerts to Squadcast incident response platform.</p>
    </div>
  </a>

  <a href="/docs/integration/alerts-microsoft-teams-integration/" class="notification-card">
    <img src="/docs/images/alerts/notifications/teams.svg" alt="Microsoft Teams">
    <div class="notification-content">
      <h3>Microsoft Teams</h3>
      <p>Send notifications to Microsoft Teams channels.</p>
    </div>
  </a>

  <a href="/docs/integration/alerts-telegram-integration/" class="notification-card">
    <img src="/docs/images/alerts/notifications/telegram.svg" alt="Telegram">
    <div class="notification-content">
      <h3>Telegram</h3>
      <p>Receive alert notifications in Telegram.</p>
    </div>
  </a>

  <a href="/docs/integration/alerts-twilio-integration/" class="notification-card">
    <img src="/docs/images/alerts/notifications/twilio.svg" alt="Twilio">
    <div class="notification-content">
      <h3>Twilio SMS</h3>
      <p>Get SMS notifications via Twilio service.</p>
    </div>
  </a>

  <a href="/docs/integration/alerts-googlechat-integration/" class="notification-card">
    <img src="/docs/images/alerts/notifications/googlechat.svg" alt="Google Chat">
    <div class="notification-content">
      <h3>Google Chat</h3>
      <p>Receive notifications in Google Chat spaces.</p>
    </div>
  </a>

  <a href="/docs/integration/alerts-signl4-integration/" class="notification-card">
    <img src="/docs/images/alerts/notifications/signl4.svg" alt="Signl4">
    <div class="notification-content">
      <h3>Signl4</h3>
      <p>Mobile alert notifications via Signl4.</p>
    </div>
  </a>

  <a href="/docs/integration/alerts-servicenow-integration/" class="notification-card">
    <img src="/docs/images/alerts/notifications/servicenow.svg" alt="ServiceNow">
    <div class="notification-content">
      <h3>ServiceNow</h3>
      <p>Create incidents in ServiceNow from alerts.</p>
    </div>
  </a>

  <a href="/docs/integration/alerts-alertops-integration/" class="notification-card">
    <img src="/docs/images/alerts/notifications/alertops.svg" alt="AlertOps">
    <div class="notification-content">
      <h3>AlertOps</h3>
      <p>Forward alerts to AlertOps platform.</p>
    </div>
  </a>
</div>

For most of these notification hooks, you will first need to create that third party service and obtain the required API keys and/or other tokens in order to establish communication between that service and Sematext Cloud. The image below shows a third party notification hook integration being created, Slack in this example.

![Sematext Cloud - Slack Notification Hook](/docs/images/guide/integrations/slack-notification-hook.png)

## SMS Notification Hooks

You can use Sematext's email Notification Hook to receive alert notifications via SMS / text:

- Verizon: [phone number]@vtext.com (sms)
- AT&T: [phone number]@txt.att.net (sms) / [phone number]@mms.att.net (mms) 
- T-Mobile: phonenumber@tmomail.net (sms+mms) 
- Virgin mobile: [phone number]@vmobil.com 

SMS notifications can also be enabled by integrating Sematext Notification Hooks with 3rd-party services like **Twilio**. For further information, please see [SMS/Text Alerts Integration](/docs/integration/alerts-sms-integration).

## Email Notification Hooks

An email notification hook is created automatically during signup. Additional notification hooks can be created on the Notification Hooks view that is part of Alerts menu.

![Sematext Alerts](/docs/images/alerts/image_10.png "Sematext Alerts")
