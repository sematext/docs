title: Connected Apps Guide
description: Connected Apps is a data pivoting feature and available in all solutions. You can connect any two Apps you have access to, regardless of their type.

Connected Apps is a data pivoting feature and available in all solutions. You can connect any two Apps you have access to, regardless of their type.

When you connect two Apps, selecting Connected Apps while viewing one of those Apps will automatically select the other connected App when you decide to **correlate their data** via [Split Screen](https://sematext.com/docs/guide/split-screen/).

To connect Apps, click on the connect Apps icon on top right from any report and click **“+ Connect New App”** button.

![Sematext Cloud Connected Apps - Connect Apps Drop Down](../images/guide/connected-apps/connect-apps-dropdown.png)

Select the Apps and click **“Connect Apps”** button.

![Sematext Cloud Connected Apps - Connected Apps Page](../images/guide/connected-apps/connect-apps-page.png)

Once you connect Apps together, you can easily navigate from one App to the other with a single click or open the second App in [Split Screen](https://sematext.com/docs/guide/split-screen/) to **correlate their data**.

Let’s say we are monitoring a ClickHouse database and shipping metrics and logs to Sematext Cloud. You started seeing a significant amount of error logs and you want to investigate it further by comparing with metrics.

If the two Apps are connected, you can easily open the Monitoring App in [Split Screen](https://sematext.com/docs/guide/split-screen/) and see if there are any significant spikes in metrics within that time period. 
Instantly check if insufficient resources or unexpected query rates or connections are the source of error logs coming from your database.

![Sematext Cloud Connected Apps - Connected Apps Drop Down](../images/guide/connected-apps/connected-apps-dropdown.png)

![Sematext Cloud Connected Apps - Connected Apps Split Screen](../images/guide/connected-apps/connected-apps-split-screen.png)

In addition, when you receive an alert notification for an App, **the alert notification will automatically include information and charts from connected Apps**, thus providing more information and context for you.

![Sematext Cloud Connected Apps - Connected Apps Alerts](../images/guide/connected-apps/connected-apps-alerts.png)

Any App can be connected to any number of Apps. 

## Companion Apps
Companion Apps allow you to create a Logs App directly from a Monitoring App and vice versa. Within your existing App, simply click on the Companion App. 

todo: add screenshot

You can use the suggested name or edit a new one for your Companion App. A checkbox controls whether you want to connect both Apps, enabled by default. You always have the option to connect them manually later. Once you click the "Create an App" button, both Apps will be automatically connected. Furthermore, the already installed Agents can be used, allowing you to directly configure the newly created App.

todo: add screenshot

With both Apps automatically connected, you can now correlate their data for further troubleshooting via [Split Screen](https://sematext.com/docs/guide/split-screen/).
