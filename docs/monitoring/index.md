Title: Infrastructure monitoring
Description: Sematext infrastructure and application performance monitoring docs

### Creating Monitoring Apps

The first step to monitoring with Sematext is to create a Monitoring App. Go to [monitoring view](https://apps.sematext.com/ui/monitoring), click on add new app button, select your integration and create monitoring app.

<a href="#create-spm-app"><img class="content-modal-image" alt="Sematext Monitoring UI screen" src="../images/monitoring/sematext-monitoring.png" title="Sematext Monitoring UI screen"></a>

<div class="css-modal-container">
<div id="create-spm-app" class="modal-window">
<div>
<h2>Monitoring Integrations UI</h2>
<img class="content-modal-image" alt="Sematext Monitoring UI screen" src="../images/monitoring/sematext-monitoring.png" title="Sematext Monitoring UI screen">
<a href="#modal-close" title="Close" class="modal-close">&times; Close</a>
</div>
</div>
</div>

You can have any number of Monitoring Apps and each App can be shared
with different people, giving them different access roles.  Very
importantly, each App has its own plan. Some Apps can use the free plan,
while others can use paid plans, thus enabling a lot of flexibility around cost management.

A number of App management operations, such as creation of new Apps, definition of alert rules, etc., are exposed via the [API](../api).

### Setting up Monitoring Agents

To start monitoring your infrastructure you need to set up the
appropriate Sematext monitoring agent. You can choose from:

  - [Java-based App Agent](spm-client) (aka SPM Client or SPM
    Monitor), which you can run in [embedded](spm-monitor-javaagent)
    (aka Javaagent-based, aka in-process) or
    [standalone](spm-monitor-standalone) mode
  - [Node-based App Agent](node-agent)
  - [Docker Agent](../sematext-docker-agent)

The setup instructions for each of the agents are shown in the UI and you can also see them under individual [integrations](../integration).

Once the agent is set up metrics will start coming to Sematext
instantly. If you do not see performance charts 5 minutes after setting up the agent, have a
look at the <a
href="http://sematext.com/docs/monitoring/spm-faq/">Troubleshooting</a>
page.</p>

### App Settings

App settings and actions include, but are not limited to:

  - inviting others to your App
  - [alert rules](../alerts)
  - changing your App's plan
  - connecting Apps
  - heartbeat alert cration
  - App ownership transfer
  - scheduled report emails (aka Subscriptions)
  
<a href="#app-settings-menu"><img class="content-modal-image" alt="Sematext Monitoring App Settings UI screen" src="../images/monitoring/app-settings-menu.png" title="Sematext Monitoring App Settings UI screen"></a>

<div class="css-modal-container">
<div id="app-settings-menu" class="modal-window">
<div>
<h2>App Settings Menu </h2>
<img alt="Sematext Monitoring App Settings UI screen" src="../images/monitoring/app-settings-menu.png" title="Sematext Monitoring App Settings UI screen">

<a href="#modal-close" title="Close" class="modal-close">&times; Close</a>
</div>
</div>
</div>
  
<!-- ###Visualizing and Analyzing Your Data -->

### Additional Features

To help you manage your metrics, hosts, and containers, and to help you create more useful dashboards, you can assign metadata to each host/server/container in the form of tags.

Check [Tag Support](tag-support) page for different ways of Tags organization.

Network Map can help you visualize the network topology of a system monitored by Sematext.  It can discover hosts and collect information about communication between them, such as the amount of received/transmitted data on each port.

For more information on Network Map check [Network Map](network-map) page.

[On-demand profiling](on-demand-profiling) lets you profile your own JVM-based applications or even any 3rd party JVM-based applications (e.g. Spark, Elasticsearch, Solr, Kafka, Hadoop, Storm, Cassandra, HBase, etc.).

It works with both embedded and standalone agent and has negligible overhead.

[Custom Metrics](custom-metrics) API and provided libraries let you send custom metrics (any numerical data, not just performance metrics) into Sematext and graph it along other reports.

### Getting Support

We hope you enjoy using Sematext App and Infrastructure Monitoring and Log Management tools. If you need further support or have any feedback regarding our products, please don't hesitate to [contact us](mailto:support@sematext.com) ! You can also contact / talk to us using chat widget at the bottom right corner of the page or give us a shout [@Sematext](http://twitter.com/sematext). 
