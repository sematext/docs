title: Sematext Experience FAQ
description: FAQ about Sematext Experience, real user monitoring for websites and single page apps

### General
<a name="what-should-i-do-if-i-cant-find-the-answer-to-my-question-in-this-faq" href="#what-should-i-do-if-i-cant-find-the-answer-to-my-question-in-this-faq" class="faq-questions"><strong>What should I do if I can't find the answer to my question in this FAQ?</strong></a>

Check the [general FAQ](/faq) for questions that are not strictly
about Sematext Experience.  If you can't find the answer to your
question please email <support@sematext.com> or use our live chat.


<a name="what-happens-if-limit" href="#what-happens-if-limit" class="faq-questions"><strong>Can I receive more data than my monthly plan limit allows?</strong></a>

No, not by default. In order to prevent overage and additional costs, we enable
<a href="#what-is-staggering">staggering</a> by default for all Experience
Apps. You can enable or disable this setting in your App settings -> Usage
screen.

<a name="what-is-staggering" href="what-is-staggering" class="faq-questions"><strong>What is staggering?</strong></a>

When staggering is enabled, your App will have a maximum daily limit of page
loads based on your monthly plan limit. So if you have a plan limit of 100,000
page loads and the current month has 30 days, then your App will have a daily
limit of 3,333 page loads.

<a name="what-is-overage" href="what-is-staggering" class="faq-questions"><strong>What is overage?</strong></a>

By default overage is not possible since <a
href="#what-is-staggering">staggering</a> is enabled for all new Experience
Apps.

When <a href="#what-is-staggering">staggering</a> is disabled, your App may
receive more data than defined in the monthly plan limit. This additional
amount of data is called overage. Overage is charged in addition to your
monthly pricing plan cost at the end of the month.

The amount you will be charged depends on the amount of overage on a monthly
basis. If you have received 10% more data during the month than defined in your
pricing plan, then you will be charged 10% more. Again, note that overage is
not possible when you have <a href="#what-is-staggering">staggering</a>
enabled.

<a name="script-performance" href="script-performance" class="faq-questions"><strong>Does the Experience script have any effect on my website performance?</strong></a>

No, the Experience script will not negatively impact your website performance.
We will do our best to ensure that the script is as minimal as possible and
that it never interferes with the normal operation of your website or webapp.
The script is loaded asynchronously and in most cases should have no or very
small effect on website performance.

<a name="multiple-domain" href="multiple-domain" class="faq-questions"><strong>Can I send data from a different domain?</strong></a>

Depending on your plan, you may be able to send data from multiple domains at
the same time. If your pricing plan supports more than one domain, just set up
the script on additional domains and your data should appear shortly in
Experience.

If you want to switch the domain from which you are sending data, note that it
may take up to 5 minutes for the data to start being accepted if your pricing
plan supports only one domain.

<a name="configure-requirements" href="configure-requirements" class="faq-questions"><strong>What are the user satisfaction scores shown in Experience based on?</strong></a>

The scores are based on the time threshold defined in the [Configure
Requirements](/experience/configure-requirements) screen. By default these time
thresholds are 2 seconds. You can adjust these time thresholds if you have a
different performance target for your website or webapp. You can read
[Configure Requirements](/experience/configure-requirements) to learn how to
adjust the time thresholds or [User
Satisfaction](/experience/user-satisfaction) to learn more about Apdex scores
in general.

### Troubleshooting

<a name="stopped-sending-data" href="#stopped-sending-data"><strong>My App has stopped receiving data. What should I do?</strong></a>

Check if you have reached your daily limit in the App settings -> Usage screen. If
you have reached your daily limit, you can increase the daily limit or disable
<a href="#what-is-staggering">staggering</a> but note that this may cause <a
href="#what-is-overage">overage</a> and additional costs at the end of the
month.

If your limits are not reached, check if the Experience script is configured
according to the installation instructions.

If the script is configured correctly, and your daily limits are not reached
please contact us via live chat or <support@sematext.com>.


### Sharing

<a name="how-can-i-share-my-sematext-apps-with-other-users" href="#how-can-i-share-my-sematext-apps-with-other-users" class="faq-questions"><strong>How can I share my Sematext Apps with other users?</strong></a>

See [sharing FAQ](/faq/#sharing).

<a name="what-is-the-difference-between-owner-admin-billing_admin-and-user-roles" href="#what-is-the-difference-between-owner-admin-billing_admin-and-user-roles" class="faq-questions"><strong>What is the difference between OWNER, ADMIN, BILLING_ADMIN, and USER roles?</strong></a>

See info about user roles in [sharing FAQ](/faq/#sharing).

### Alerts

<a name="can-i-send-alerts-to-hipchat-slack-nagios-or-other-webhooks" href="#can-i-send-alerts-to-hipchat-slack-nagios-or-other-webhooks" class="faq-questions"><strong>Can I send alerts to HipChat, Slack, Nagios, or other WebHooks?</strong></a>

See [alerts FAQ](/faq/#alerts).

<a name="what-are-threshold-based-alerts" href="#what-are-threshold-based-alerts" class="faq-questions"><strong>What are Threshold-based Alerts?</strong></a>

See [alerts FAQ](/faq/#alerts).

<a name="what-is-anomaly-detection" href="#what-is-anomaly-detection" class="faq-questions"><strong>What is Anomaly Detection?</strong></a>

See [alerts FAQ](/faq/#alerts).
