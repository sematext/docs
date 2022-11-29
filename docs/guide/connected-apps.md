title: Connected Apps Guide
description: Connected Apps  is a data pivoting feature and available in all solutions. You can connect any two Apps you have access to, regardless of their type.

Connected Apps  is a data pivoting feature and available in all solutions. You can connect any two Apps you have access to, regardless of their type.

Connecting a Logs App to a Monitoring App will **pre-select that Logs App when you decide to correlate metrics from the connected Monitoring App.**

To connect Apps, click on the connect Apps icon on top right from any report and click **“+ Connect New App”** button 

![Sematext Cloud Connected Apps - Connect Apps Drop Down](../images/guide/connected-apps/connect-apps-dropdown.png)

Select the Apps and click **“Connect Apps”** button

![Sematext Cloud Connected Apps - Connected Apps Page](../images/guide/connected-apps/connect-apps-page.png)

Once you connect Apps together, you can easily navigate from one to another with a single click or open the second App in [Split Screen](https://sematext.com/docs/guide/split-screen/) to **correlate metrics and logs**.

Let’s say we are monitoring a ClickHouse database and shipping metrics and logs to Sematext Cloud. You started seeing a significant amount of error logs and you want to investigate it further by comparing with metrics.

If the two Apps are connected, you can easily open the Monitoring App in [Split Screen](https://sematext.com/docs/guide/split-screen/) and see if there are any significant spikes in metrics within that time period. 
Instantly check if insufficient resources or unexpected amount of query rate or connections are causing the error logs in your database.

![Sematext Cloud Connected Apps - Connected Apps Drop Down](../images/guide/connected-apps/connected-apps-dropdown.png)

![Sematext Cloud Connected Apps - Connected Apps Split Screen](../images/guide/connected-apps/connected-apps-split-screen.png)

In addition, when you receive an alert notification for an App, **the alert notification will automatically include information and charts from connected Apps**, thus providing more information and context for you.

![Sematext Cloud Connected Apps - Connected Apps Alerts](../images/guide/connected-apps/connected-apps-alerts.png)

Any App can be connected to any number of Apps. 
