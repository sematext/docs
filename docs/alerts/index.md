title: Alerting on logs and metrics
description: Threshold, anomaly, and heartbeat alerts for your logs and infrastructure metrics with email notifications and various 3rd party integrations and notification hooks such as PagerDuty, Slack and more

### Alert Types
[Sematext Cloud](http://sematext.com/cloud/) includes multiple types
of alerts that integrate with PagerDuty, Slack, email, and [other 3rd
party services](#alert-integrations).  

1. **Threshold** alerts are the classic threshold based alerts.  They are
triggeed when something crosses a pre-defiend threshold.
2. **Anomaly** alerts are based on statistical anomaly detection.  They
are triggeed when values suddenly change and deviate from the
continously computed baseline.
3. **Heartbeat** alerts are triggered when something you are monitoring,
like your servers, containers, or your applications stop emitting data
to Sematext.

<iframe width="800" height="450" src="https://www.youtube.com/embed/WE9xAUud28o?rel=0" frameborder="0" allow="autoplay; encrypted-media" allowfullscreen></iframe>

### Alert Sources
Alerts can be triggered on both Metrics and Logs:

Alert type | Metrics | Logs
--- | --- | ---
Threshold | yes | yes |
Anomaly | yes | yes |
Heartbeat | yes | no |

You can manage Alert rules interactively via the UI, or you can
[manage alerts via the API](../api).


### Alert Integrations

Alert rules that don't actually send notifications when alerts are
triggered are nearly useless.  While alert notifications are also
shown on the [Events view](../events), alert notifications are
typically sent to other destinations via Notification Hooks.

An email notification hook is created automatically during signup.  Additional notification hooks can be created to send notications to PagerDuty, Slack, and more.
  
<div class="mdl-grid integrations">
    <div class="mdl-cell mdl-cell--3-col">
        <a href="/docs/integration/alerts-bigpanda-integration/">
            <div class="demo-card-event mdl-card mdl-shadow--2dp">
                <div class="flip-card-container">
                    <div class="flip-card">
                        <div class="side">
                            <img src="/docs/images/alerts/notifications/bigpanda.svg" alt="BigPanda" title="BigPanda Alerts Integration" style="width: 56px;">
                        </div>
                        <div class="side back">
                            <h5>BigPanda</h5>
                            Alerts integrations with BigPanda's event management and incident management process platform.
                        </div>
                    </div>
                </div>
            </div>
        </a>
    </div>
    <div class="mdl-cell mdl-cell--3-col">
        <a href="/docs/integration/alerts-email-integration/">
            <div class="demo-card-event mdl-card mdl-shadow--2dp">
                <div class="flip-card-container">
                    <div class="flip-card">
                        <div class="side">
                            <img src="/docs/images/alerts/notifications/mail.svg" alt="Email" title="Email Alerts Integration" style="height: 96px; padding-top: 44px;">
                        </div>
                        <div class="side back">
                            <h5>Email</h5>Want alerts via email? That’s the default, of course. Email notifications include embedded
                            charts, so you can quickly assess the situation.
                        </div>
                    </div>
                </div>
            </div>
        </a>
    </div>
    <div class="mdl-cell mdl-cell--3-col">
        <a href="/docs/integration/alerts-hipchat-integration/">
            <div class="demo-card-event mdl-card mdl-shadow--2dp">
                <div class="flip-card-container">
                    <div class="flip-card">
                        <div class="side">
                            <img src="/docs/images/alerts/notifications/hipchat.svg" alt="Hipchat Alerts Integration" title="Hipchat Alerts Integration"
                                style="width: 128px;">
                        </div>
                        <div class="side back">
                            <h5>Hipchat</h5>Send your alerts to Hipchat internal private online chat and instant messaging platform.</div>
                    </div>
                </div>
            </div>
        </a>
    </div>
    <div class="mdl-cell mdl-cell--3-col">
        <a href="/docs/integration/alerts-nagios-integration/">
            <div class="demo-card-event mdl-card mdl-shadow--2dp">
                <div class="flip-card-container">
                    <div class="flip-card">
                        <div class="side">
                            <img src="/docs/images/alerts/notifications/nagios.jpg" alt="Cassandra" title="Cassandra Monitoring" style="width: 96px; height: 32px; margin-top: 60px;">
                        </div>
                        <div class="side back">
                            <h5>Nagios</h5>
                            Still using Nagios? Yes, you can get your Sematext alerts sent to Nagios IT, network, server, and applications monitoring
                            system.</div>
                    </div>
                </div>
            </div>
        </a>
    </div>
</div>
<div class="mdl-grid integrations">
    <div class="mdl-cell mdl-cell--3-col">
        <a href="/docs/integration/alerts-opsgenie-integration/">
            <div class="demo-card-event mdl-card mdl-shadow--2dp">
                <div class="flip-card-container">
                    <div class="flip-card">
                        <div class="side">
                            <img src="/docs/images/alerts/notifications/opsgenie.svg" alt="Opsgenie" title="Opsgenie Alerts Integration" style="width: 128px;">
                        </div>
                        <div class="side back">
                            <h5>Opsgenie</h5>Easy integration with OpsGenie incident response orchestration platform for DevOps
                            & ITOps teams. Streamline your alerts and incident resolution processes.
                        </div>
                    </div>
                </div>
            </div>
        </a>
    </div>
    <div class="mdl-cell mdl-cell--3-col">
        <a href="/docs/integration/alerts-pagerduty-integration/">
            <div class="demo-card-event mdl-card mdl-shadow--2dp">
                <div class="flip-card-container">
                    <div class="flip-card">
                        <div class="side">
                            <img src="/docs/images/alerts/notifications/pagerduty.svg" alt="Pagerduty" title="PagerDuty - PagerDuty" style="width: 128px;">
                        </div>
                        <div class="side back">
                            <h5>PagerDuty</h5>Send alerts to PagerDuty's SaaS incident response platform for IT departments.
                            Improve visibility & agility across your organization.
                        </div>
                    </div>
                </div>
            </div>
        </a>
    </div>
    <div class="mdl-cell mdl-cell--3-col">
        <a href="/docs/integration/alerts-pushover-integration/">
            <div class="demo-card-event mdl-card mdl-shadow--2dp">
                <div class="flip-card-container">
                    <div class="flip-card">
                        <div class="side">
                            <img src="/docs/images/alerts/notifications/pushover.svg" alt="Pushover Alerts Integration" title="Pushover  Alerts Integration"
                                style="width: 64px;">
                        </div>
                        <div class="side back">
                            <h5>Pushover</h5>Like to get your alert notifications via your mobile device? Use Sematext with Pushover
                            real-time notifications integration!</div>
                    </div>
                </div>
            </div>
        </a>
    </div>
    <div class="mdl-cell mdl-cell--3-col">
        <a href="/docs/integration/alerts-slack-integration/">
            <div class="demo-card-event mdl-card mdl-shadow--2dp">
                <div class="flip-card-container">
                    <div class="flip-card">
                        <div class="side">
                            <img src="/docs/images/alerts/notifications/slack.svg" alt="Slack" title="Slack Alerts Integration" style="width: 128px;">
                        </div>
                        <div class="side back">
                            <h5>Slack</h5>Easy Sematext alerts integration with Slack's team collaboration tools and services.</div>
                    </div>
                </div>
            </div>
        </a>
    </div>
</div>
<div class="mdl-grid integrations">
    <div class="mdl-cell mdl-cell--3-col">
        <a href="/docs/integration/alerts-victorops-integration/">
            <div class="demo-card-event mdl-card mdl-shadow--2dp">
                <div class="flip-card-container">
                    <div class="flip-card">
                        <div class="side">
                            <img src="/docs/images/alerts/notifications/victorops.svg" alt="Victorops" title="VictorOps Alerts Integration" style="width: 128px;">
                        </div>
                        <div class="side back">
                            <h5>Victorops</h5>Fast alerts integration with Victorops' incident management software purpose-built
                            for DevOps.
                        </div>
                    </div>
                </div>
            </div>
        </a>
    </div>
    <div class="mdl-cell mdl-cell--3-col">
        <a href="/docs/integration/alerts-webhooks-integration/">
            <div class="demo-card-event mdl-card mdl-shadow--2dp">
                <div class="flip-card-container">
                    <div class="flip-card">
                        <div class="side">
                            <img src="/docs/images/alerts/notifications/webhooks.svg" alt="Webhooks" title="Webhooks Alerts Integration" style="width: 128px;">
                        </div>
                        <div class="side back">
                            <h5>Webhooks</h5>Have a custom WebHook you’d like to call? No problem – define the endpoint, format
                            (JSON, HTTP params, form-encoded), optional URL parameters and optional HTTP request headers.
                        </div>
                    </div>
                </div>
            </div>
        </a>
    </div>
    <div class="mdl-cell mdl-cell--3-col">
        <a href="/docs/integration/alerts-zapier-integration/">
            <div class="demo-card-event mdl-card mdl-shadow--2dp">
                <div class="flip-card-container">
                    <div class="flip-card">
                        <div class="side">
                            <img src="/docs/images/alerts/notifications/zapier.svg" alt="Zapier Alerts Integration" title="Zapier  Alerts Integration"
                                style="width: 96px;">
                        </div>
                        <div class="side back">
                            <h5>Zapier</h5>Need to ship your Sematext alerts somewhere else? Use Zapier integration.</div>
                    </div>
                </div>
            </div>
        </a>
    </div>
</div>
