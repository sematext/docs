title: Sematext Dashboards Settings
description: Sematext Cloud is a modern monitoring, log management, transaction tracing, and real user monitoring system. Dashboarding is system's powerful feature for cohesive data analysis from multiple data sources such as logs, metrics, and events. 



<!-- https://sematext.com/docs/images/guide/dashboards/sematext-dashboards-guide.png -->


Dashboard settings include:

  - Edit / Clone / Delete Dashboard
  - App & Dashboards picker
  - Time picker
  - Report settings

<video style="display:block; width:100%; height:auto;" controls autoplay loop>
  <source src="https://sematext.com/wp-content/uploads/2019/07/dash-settings.mp4" type="video/mp4" />
</video>

## Side Navigation

The persistent region on the left that can be collapsed, is used to easily switch across monitoring, log management, transaction tracing, real user monitoring, and other user & team features. All side navigation tabs are selectable. If they have chevrons, it indicates that the top level section is collapsible and contains additional subitems. The subitems will let you explore all your Apps, or choose a particular App.

Side navigation top level sections for infrastructure and application performance monitoring, log management, transaction tracing, and real user monitoring:

- Dashboards
- Infrastructure
- Monitoring
- Logs
- Correlations
- Alerts and Events
- Integrations

Side navigation sections for user and team features:

- Invites
- Team
- Account 

![Sematext Monitoring App Sidenav](../images/guide/monitoring/monitoring-sidenav.png)

## App & Dashboard Selector

The App & Dashboard selector lets you **choose any App** as well as any **Dashboards and Reports** that you have generated from those Apps. Infrastructure views such as AppMap, NetMap, Servers, and Containers are also available for selection, and together provide seamless switching and navigation between logs, application and infrastructure monitoring, which is essential when rushing to fix production issues.

## App Actions

Right next to the App & Dashboard Selector is the **App Actions dropdown menu** and **horizontal ellipsis icon**. 

The App Actions dropdown menu allows you to **quickly switch between your Dashboards, Logs and Monitoring Apps**. While the horizontal ellipsis icon shows your App options and lets you open various app specific functions, like instructions to **install monitors and start sending metrics, app settings, alert rules, heartbeat alerts, as well as ability to connect two different apps, invite team members, and transfer app ownership**.

All App Actions open in a modal dialogue window as temporary UI regions and let you adjust and edit settings or create various alerts. The Monitoring App view remains unchanged and allows for easy interaction between various system settings and reports views.

## Report Selector

Once you create a Monitoring App, and start your Agent, you will get a **default Report created for you named Overview**. It will have the default data and default [component](#components) configuration. You can edit this Report, clone it, or create new ones. 

![](../images/guide/monitoring/report-selector.png)

Based on what type of Monitoring Integration you chose, more Reports get created by default. In this Docker sample you can see three more Reports are created by default.

## Time Picker

The Time Picker is available whenever a Logs or Monitoring App is selected as well as when any custom dashboards are being used. **One minute is the shortest time increment** you can select. **Thirty minutes, one and two hours, and one, two, seven, and thirty days time-span shortcuts** are exposed common observability defaults.

A **custom time range can be selected using the time picker dropdown menu**. The Logs App will automatically refresh upon selection and update all the reports accordingly.

## Refresh and Live Tail

Refresh data and Live Tail options are located next to the time picker. The **Live Tail feature provides real-time insights as soon as your data is consumed and indexed**. It can be also stopped so the auto-refresh does not update the data, in case you need to inspect specific incidents or anomalies within a certain time segment.

## Notifications

The megaphone icon in the right section of the header is used to open the notifications. If your plan is in need of an upgrade, a new feature is announced, or similar system and service updates require your attention, they'll be shown in the notifications view.

The next section describes the monitoring report menu located just below the top navigation menu, and help you discover how to add new components, correlate your logs and events with your Monitoring App, do report-specific actions, connect your Apps, and more.

