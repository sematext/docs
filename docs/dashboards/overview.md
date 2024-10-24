title: What is a Report?
description: Sematext Cloud Reports Guide. Using out-of-the-box reports or custom reports to visualize data.

A report in Sematext Cloud is a collection of visual components, like charts and tables, that help you monitor and analyze your metrics and logs. When you send metrics and logs to Sematext Cloud, we automatically provide you with out-of-the-box reports based on the [integration](https://sematext.com/docs/integration/) you’ve chosen when creating [Monitoring](https://sematext.com/docs/monitoring/) or [Logs](https://sematext.com/docs/logs/) [Apps](https://sematext.com/docs/guide/app-guide/). These reports are designed to highlight the most important data.
For example, if you want to collect metrics from an Apache web server and create an [Apache Monitoring App](https://sematext.com/docs/integration/apache-integration/), the reports will immediately display key metrics such as Scoreboard status, Worker activity, and performance data.

![Apache Monitoring Report](../images/guide/reports/reports-apache-monitoring.png)

Similarly, if you want to collect logs from an Apache web server and create an [Apache Logs App](https://sematext.com/docs/integration/apache-integration/#apache-logs), the out-of-the-box reports will provide visualizations for logs, such as total and failed requests, response codes, top HTTP methods, and user activity.

![Apache Logs Report](../images/guide/reports/reports-apache-logs.png)

On top of the out-of-the-box reports, you can also create Custom Reports tailored to your specific needs.

## Why Create Custom Reports?

While the default reports are a great starting point, you might want to focus on specific data that’s important to you. Maybe you want to track something unique to your setup, or compare different metrics side by side. Or you might be shipping [custom metrics](https://sematext.com/docs/monitoring/custom-metrics/) to your [Monitoring App](https://sematext.com/docs/monitoring/) and create a report to visualize that data. In this case, you can create a custom report that shows exactly what you need to see.

### How to Create a Custom Report

-  Go to your App where you want to create the report.
-  Click on "Add Report" that is available in the left menu panel.

![Apache Logs Report](../images/guide/reports/reports-add-report.png)

- Add visualization components. You can choose from charts (like line, bar, or pie charts) or tables to display your data using [Chart Builder](https://sematext.com/docs/dashboards/chart-builder/). You can also decide which metrics or logs to show, based on what you want to monitor.
