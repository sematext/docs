title: Configuring Process Monitoring
description: Process Monitoring is enabled by default in the [Sematext Agent configuration.

Process Monitoring is enabled by default in the [Sematext Agent configuration](../agents/sematext-agent/containers/configuration/). You can *disable* process metrics/metadata collection by setting the following properties:

<div class="mdl-tabs mdl-js-tabs mdl-js-ripple-effect">
 <div class="mdl-tabs__tab-bar">
     <a href="#file-enabled" class="mdl-tabs__tab is-active">Config file</a>
     <a href="#env-enabled" class="mdl-tabs__tab">Env variable</a>
 </div>

 <div class="mdl-tabs__panel is-active" id="file-enabled">
   <pre>
   # st-agent.yml
   process:
     enabled: false
   </pre>
 </div>
 <div class="mdl-tabs__panel" id="env-enabled">
   <pre>
   PROCESS_ENABLED=false
   </pre>
 </div>
</div>

After that the [Sematext Agent](../agents/sematext-agent) needs to be restarted by running the following command:

```
sudo service/systemctl spm-monitor-st-agent restart
```

There are numerous settings you can configure for Process Monitoring in the Sematext Agent. Check out the [Metrics](./metrics) first!