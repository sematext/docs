title: Creating Synthetics Alerts
description: Step by step guide to create Synthetics Alerts

With Synthetics App, you could create 2 types of alerts:

*) Synthetics Alerts - These are alerts that are auto-created when you create a monitor and will be raised when a run fails based on the configured conditions.
*) Metric Alerts - These are threshold and anomaly alerts that can be created on Synthetics metrics.

## Synthetics Alerts

These are the alerts to notify failure of a monitor. They are auto-created while creating the monitor. As of the monitor creation, you could specify the list of conditions that has to met for the monitor to pass. If any of these conditions fail, then the run will be declared failed and a Synthetics alert will be raised. These conditions are different for [HTTP](/synthetics/http-monitor/#conditions) and [Browser](synthetics/browser-monitor/#conditions) monitors.

You can customize the notification settings & schedule while creating the monitor. You can disable notifications temporarily by turning off `Enable Notifications`. When you turn off the notifications, the monitor will continue to run, but no notifications will be sent on failure. 

You could control when the alert should be triggered based on the consecutive run failures. By default, the alert will be triggered when the monitor fails from any of the locations. You could change the below parameter to control this behavior. For example, by setting this to 2 for monitor that runs every 10 mins from Frankfurt and Mumbai, the alert will be trigger only when the monitor fails twice consecutively from Frankfurt or Mumbai.

![Run count based alerting](../images/synthetics/create-monitor-run-count-alert.png)

## Metric Alerts

Apart of the auto-created Synthetics alerts, you could create custom alert on any of the Synthetics metrics and get notified when they are triggered. This could be used to set performance budgets for any of the metrics like page size, resource count, etc. You could create a threshold or anomaly alerts. These alert could be created directly from Synthetics charts in the monitor overview page or from custom charts for Synthetics metrics in [dashboard](/dashboards). You can select the metric to create the alert rule on by clicking the bell icon when you hover over the chart.

![Create Metric Alert from Synthetics charts](../images/synthetics/create-synthetics-metric-alert.png)

This opens Create Alert Rule dialog, where you can set up a threshold or anomaly alert for the selected metric.

![Create Metric Alert Rule](../images/synthetics/create-metric-alert-rule.png)
