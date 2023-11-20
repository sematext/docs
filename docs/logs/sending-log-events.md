title: Sending Log Events
description: Send new log events to Sematext using Sematext Agent, Elasticsearch API or syslog, and log shippers such as  Logstash, Fluentd, rsyslog, syslog-ng, Fluentbit and more

The simplest way to ship logs to Sematext is via the [Discovery](discovery/intro/) screen after the [initial setup](discovery/setup/). 

Follow these step-by-step instructions for setting up the [Sematext Agent](https://sematext.com/docs/agents/sematext-agent/) through the Logs App.

**Create Logs App:** After creating the Logs App, the environment selection screen for agent installation will be displayed.

![Logs App Select an Environment](../images/logs/select-environment.png)

Choose the environment in which you intend to install the agent. The installation instructions specific to that environment will be displayed.
Follow the provided instructions to install the agent. Once installed, the Logs App will identify the host and display the discovered log sources within it.

**View Discovered Logs:** Discovered Logs shows a list of log sources discovered within the host grouped by service type.

![Logs App Discovered Logs](../images/logs/discovered-logs.png)

**Set Up Automatic Log Shipping:** Click on the **Set Up** button next to the services from which you want to ship logs. This enables automatic log shipping for the selected services. For example, you can configure the system to send all log sources from Linux daemon services to Sematext Cloud as soon as they are discovered.

![Logs App Set Up Log Shipping](../images/logs/set-up-log-shipping.png)

**Finalization:** Congratulations! You have successfully configured automatic log shipping for logs discovered under Linux daemon services without any additional configuration.

If you want to ship logs from different hosts and containers to the same Logs App, you can always navigate to the Ship Logs screen from the left Menu panel and repeat the steps to install the agent to another host.

![Logs App Ship Logs](../images/logs/ship-logs.png)

Furthermore, at any time, you can navigate to the Discovery screen to view the log sources and services identified across your infrastructure, from all the containers and hosts where the [Sematext Agent](https://sematext.com/docs/agents/sematext-agent/) is installed. From this screen, you have the option to configure automatic log shipping or metrics without the need for any additional installations.

![Sematext Discovery](../images/logs/sematext-discovery.png)

### Custom Integration Options

Alternatively, you can explore various custom integration options for shipping log events to Sematext. This includes support for [Elasticsearch API](index-events-via-elasticsearch-api), [syslog-ng](syslog-ng), multiple programming languages, and popular log shippers such as [rsyslog](rsyslog), [Logstash](logstash), [Fluentd](https://github.com/uken/fluent-plugin-elasticsearch), and many many more.

![Logs App Custom Integrations](../images/logs/custom-integrations.png)
