title: Audit Trail
description: Track user activities and changes across your account to see who did what, when, and where — making it easier to monitor usage and maintain compliance.

Audit Trail helps you track changes made by users across your account. It shows what was changed, who made the change, and when. This includes actions like creating, updating, or deleting [Alerts](https://sematext.com/docs/guide/alerts-guide/), [Apps](https://sematext.com/docs/guide/app-guide/), [Pipelines](https://sematext.com/docs/logs/pipelines/), and other important resources.
This feature is useful for reviewing changes over time, identifying who changed what and when, troubleshooting account issues by checking recent updates, and improving visibility and accountability across your team.

![Audit Trail](/docs/images/guide/audit-trail/audit-trail.png)

## What It Tracks

Every time a user makes a change, an event is recorded in the Audit Trail. In addition to tracking manual user actions, Audit Trail also tracks certain changes that are automatically made by the Sematext system to help with the setup and configuration. For example, when you create a new [App](https://sematext.com/docs/guide/app-guide/), we automatically create default alert rules tailored to the selected integration type. These defaults are designed to help you start monitoring key metrics and logs with minimal setup. These system-initiated actions appear in the Audit Trail with the user listed as `sc-system@sematext.com`.

Below is the full list of tracked event types:

### Plan, Subscription, and Billing Account Changes

Includes updates to plans, retention periods, daily and hard limits across all solutions. Also covers changes related to payment methods and billing emails.

### Team and Permissions

Tracks changes related to [account members](https://sematext.com/docs/team/account-members/) and [App guests](https://sematext.com/docs/team/app-guests/), such as:

- Adding or removing account members
- Changing roles of account members
- Adding or removing App guests
- Changing roles of App guests
- Conversion of the account to a team account

### App Lifecycle and Auto Monitoring

Tracks important changes related to your [Apps](https://sematext.com/docs/guide/app-guide/) and their monitoring setup. It includes the creation, disabling, and deletion of [Apps](https://sematext.com/docs/guide/app-guide/) across all Sematext solutions. It also covers special cases like Apps disabled due to failed payments. Additionally, it tracks when automatic metrics or logs monitoring and shipping are enabled or disabled, along with changes to the destination App for logs or metrics.

### Alert Rule Changes

Tracks when alerts are created, deleted, enabled, or disabled, as well as any updates made to [alert rules](https://sematext.com/docs/guide/alerts-guide/). This includes changes to alert conditions, queries, filters, schedules, names, priorities, group-by and roll-up settings, metrics, and transformation scripts. It also captures changes to notification settings and hooks.

### Synthetics Monitoring

Tracks creation, updates, disabling, and deletion of [monitors](https://sematext.com/docs/synthetics/). This includes:

- Changes to monitor URLs, device types, run intervals, [locations](https://sematext.com/docs/synthetics/#locations), and conditions
- [Status pages](https://sematext.com/docs/synthetics/status-pages/) and [scheduled pauses](https://sematext.com/docs/synthetics/scheduled-pauses/) being created, updated, or deleted
- [SSL certificate tracking](https://sematext.com/docs/synthetics/ssl-certificate-monitoring/) and validation toggled on or off
- Updates to request settings and authentication
- Monitor type changes (URL/script-based), as well as script and secret variable updates

### Pipelines and Processors

Records creation, updates, removal, enabling, and disabling of [processors](https://sematext.com/docs/logs/processors-overview/). Tracks detailed changes to processor settings such as field mappings, filters, target/source fields, scripts, sampling rates, and processor ordering.

###  Reports and Dashboards

Tracks creation and updates of reports at both App and Dashboard levels, updates to [report components](https://sematext.com/docs/dashboards/reports-and-components/), and creation or deletion of [dashboards](https://sematext.com/docs/dashboards/).

> When multiple settings are changed at once—for example, if several fields in an alert rule are edited—Audit Trail groups them into a single event. Each recorded entry shows what was changed, along with the previous and new values for each field.

![Audit Trail Flyout](/docs/images/guide/audit-trail/audit-trail-event-flyout.png)

## How to Use It

You can access the Audit Trail from your Sematext Cloud account. It allows you to:

- Filter events by user, event type, or related App
- View the most frequent actions in the Top Events section
- Click from an event to open the related App, Alert Rule, Pipeline, or other resource
- See a timestamp and the user responsible for each action

![Audit Trail Usage](/docs/images/guide/audit-trail/audit-trail-usage.gif)

Audit Trail can be enabled or disabled at any time from your account settings.

