title: Creating Alerts
description: Step-by-step alert creation instructions

## Creating Logs Alerts

In a Logs app, *saved queries* are used to save search queries that you want to reuse.

For example, let's say you used *include/exclude filters* to search for *Elasticsearch slowlogs warnings*.

![Elasticsearch slowlogs warnings search](../images/alerts/image_0.png)

Clicking on the bell icon creates a new *saved query*, where filters are transformed into `Query string`.

![image alt text](../images/alerts/image_1.png)

You can save this query as is and use it in future searches.

![image alt text](../images/alerts/image_2.png)

Clicking on the *alert view* icon <img role="presentation" width="26" height="26" src="/images/alerts/image_27.png" style="display:inline"> opens the view where you can edit *saved queries*.

![image alt text](../images/alerts/image_3.png)

The bell icon here means that *saved query* has *alert rule* attached to it.

Let's attach an *alert rule* to the *saved query* we've just created - click on `Edit`.  

### Source tab

By turning on `Enable alert` toggle *saved query* is expanded into *alert rule*.  

![image alt text](../images/alerts/image_4.png)

Let's say we want to get notified if the number of *slowlog warnings* reaches 10 in any 10 minutes. Notice that *Chart Preview* shows the threshold line to help you visualize the threshold value in context.  

The field next to threshold value allows you to easily multiply the threshold and thus has a default value of 1, which is neutral for multiplication.  

![image alt text](../images/alerts/image_5.png)

Although less applicable in the case of our *slowlog warnings*, `Ignore regularly occurring spikes and dips` tells the algorithm to ignore regular outliers that are not really anomalies, but are caused by regular spikes/dips.  

If you wanted to avoid using a specific threshold value and instead get notified when the number of *slowlog warnings* deviates from a continuously computed baseline, you'd change `Alert type` to `Anomaly alert`.

![image alt text](../images/alerts/image_6.png)

Notice that the chart changed to help you get a sense of what would constitute an anomalous value in your case (dots outside the gray *confidence interval*). 

The *confidence interval* is an approximation of Sematext Cloud's anomaly detection algorithm, so don't expect each and every red dot on the chart to have triggered the alert.

### Meta tab

Meta tab allows you to tag alert rule with a specific color and specify further details, like Runbook and Description.

![image alt text](../images/alerts/image_7.png)

 When you tag an alert with a color it looks like this:

![image alt text](../images/alerts/image_8.png)

### Notifications tab

The primary purpose of alert rules is to send notifications when triggered. This is the job of Notification Hooks.

<div class="mdl-grid integrations">
    <div class="mdl-cell mdl-cell--3-col">
        <a href="/docs/integration/alerts-bigpanda-integration/">
            <div class="demo-card-event mdl-card mdl-shadow--2dp">
                <div class="flip-card-container">
                    <div class="flip-card">
                        <div class="side">
                            <img src="/images/alerts/notifications/bigpanda.svg" alt="BigPanda" title="BigPanda Alerts Integration" style="width: 56px;">
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
                            <img src="/images/alerts/notifications/mail.svg" alt="Email" title="Email Alerts Integration" style="height: 96px; padding-top: 44px;">
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
                            <img src="/images/alerts/notifications/hipchat.svg" alt="Hipchat Alerts Integration" title="Hipchat Alerts Integration"
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
                            <img src="/images/alerts/notifications/nagios.jpg" alt="Cassandra" title="Cassandra Monitoring" style="width: 96px; height: 32px; margin-top: 60px;">
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
                            <img src="/images/alerts/notifications/opsgenie.svg" alt="Opsgenie" title="Opsgenie Alerts Integration" style="width: 128px;">
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
                            <img src="/images/alerts/notifications/pagerduty.svg" alt="Pagerduty" title="PagerDuty - PagerDuty" style="width: 128px;">
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
                            <img src="/images/alerts/notifications/pushover.svg" alt="Pushover Alerts Integration" title="Pushover  Alerts Integration"
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
                            <img src="/images/alerts/notifications/slack.svg" alt="Slack" title="Slack Alerts Integration" style="width: 128px;">
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
                            <img src="/images/alerts/notifications/victorops.svg" alt="Victorops" title="VictorOps Alerts Integration" style="width: 128px;">
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
                            <img src="/images/alerts/notifications/webhooks.svg" alt="Webhooks" title="Webhooks Alerts Integration" style="width: 128px;">
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
                            <img src="/images/alerts/notifications/zapier.svg" alt="Zapier Alerts Integration" title="Zapier  Alerts Integration"
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

An email notification hook is created automatically during signup. Additional notification hooks can be created on the Notification Hooks view. A convenient way to navigate here is using the shortcut on top of the Alert Rules view.

![image alt text](../images/alerts/image_10.png)

It’s a shortcut for Integrations > Notification Hooks.

![image alt text](../images/alerts/image_11.png)

### Account-default hooks

Each alert rule can be configured to send notifications to one or more notification hooks. But what do you do when you want to change where all alert notifications are sent? For example, what if you had them sent to VictorOps, but your team switched from VictorOps to OpsGenie?

To make it easy to change where alert notifications are sent for the whole Sematext Cloud account, without needing to modify each and every alert rule individually, Sematext has the concept of "account default hook".

Notification hooks can be marked as "account default hook" in the Notification Hooks view. 

![image alt text](../images/alerts/image_12.png)

While creating or modifying an alert rule one can choose whether to send notifications to whichever hook, or hooks, defined as default. This setting is turned on by default when a new alert rule is created. 

![image alt text](../images/alerts/image_13.png)

*Send to* section is read-only, because it merely shows the current state of *account-default* notification hooks. 

Besides *account-default notification hooks*, you can specify additional hooks that pertain only to this particular alert rule. The following alert would send notifications to 4 different destinations when triggered.

![image alt text](../images/alerts/image_14.png)

Each alert gives you the option to opt-out from **"Using account-default hooks for that alert"**, by simply turning off that toggle.

![image alt text](../images/alerts/image_15.png)

If you turn off notifications for an *alert rule* the only consequence of that alert being triggered will be to generate events in the [Events view](../events).

![image alt text](../images/alerts/image_16.png)

When alerts are defined to use default notification hooks then where they send notifications can be changed by simply changing which notification hooks are marked as default!

More than one notification hook can be marked as default. Which hooks are marked as default can be changed at any time. The change is instantaneous and applies to the whole account. Only alert rules that were defined to use the default notification hook(s) are affected. Any additional notification hooks specified for the alert rule will not be touched and will remain associated with the alert rule.

This gives you the ability to configure notifications for all your alerts without editing all of them individually.

### Schedule tab

This tab is used to set a detailed weekly schedule when notifications will be active. Default is *always active*.

![image alt text](../images/alerts/image_17.png)

Let's say you want to restrict notification only to workdays between 9AM and 5PM. You would first +Add Interval 09:00 - 17:00 to Monday, copy Monday to all other days with Copy To > All action.

![image alt text](../images/alerts/image_18.png)

The last step would be to set Saturday and Sunday to Inactive all day.

![image alt text](../images/alerts/image_19.png)

Reset to default action is used to go back to default, *always active* schedule. Discard changes is used to revert all changes back to the initial state, as it was previously saved. 

These two actions have the same effect when creating a new alert rule, since the starting schedule is the default - *always active*. Discard changes becomes useful when editing an existing schedule, where you perhaps made changes in other tabs and cancelling the whole alert rule would also lose those other changes. In that case you use Discard changes to revert just the Schedule tab back to the state it had when you started editing alert rule.

## Creating Metric Alerts

Each metric chart has a bell icon which, when clicked, shows a dropdown menu of all metrics. Selecting one of the metrics opens a panel with a new alert rule.

![image alt text](../images/alerts/image_20.png)

Similarly, alert rule can be created using a chart's more (**...**) menu.

![image alt text](../images/alerts/image_21.png)

## Creating Experience Alerts

Experience App allows you to create alert rules based on [Apdex score](https://en.wikipedia.org/wiki/Apdex) of Page Loads, HTTP Requests and On-Page Transactions.

![image alt text](../images/alerts/image_22.png)

You can set condition based on standard Apdex user satisfaction measurement:

* Excellent
* Good
* Fair
* Poor

Here's how to setup an *Experience* *alert rule* that will be triggered when the `HTTP Requests` *Apdex score* remains worse than `Good` for 10 minutes:

![image alt text](../images/alerts/image_23.png)
