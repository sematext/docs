title: Configuring Package Collection
description: Package Collection is enabled by default in the Sematext Agent configuration.

Package Collection is enabled by default in the [Sematext Agent configuration](../agents/sematext-agent/containers/configuration/). It collects packages from two different sources:

- packages installed on virtual/bare-metal hosts
- packages residing inside containers

You can *disable* package collection by setting the following properties:

<div class="mdl-tabs mdl-js-tabs mdl-js-ripple-effect">
 <div class="mdl-tabs__tab-bar">
     <a href="#file-pkg-enabled" class="mdl-tabs__tab is-active">Config file</a>
     <a href="#env-pkg-enabled" class="mdl-tabs__tab">Env variable</a>
 </div>

 <div class="mdl-tabs__panel is-active" id="file-pkg-enabled">
   <pre>
   # st-agent.yml
   pkg:
     enabled: false
     container-enabled: false
   </pre>
 </div>
 <div class="mdl-tabs__panel" id="env-pkg-enabled">
   <pre>
   PKG_ENABLED=false
   PKG_CONTAINER_ENABLED=false
   </pre>
 </div>
</div>

Additionally, you can tweak the interval that determines how often packages are scanned. By default, the interval is every 10 minutes. The agent retrieves packages from the file system and any running containers, then compares the current state to decide which packages should be reported as installed or removed, and finally ships the events to Sematext Cloud. Asides from that, the agent proactively reacts to the file system changes and bulks the packages in real time.

<div class="mdl-tabs mdl-js-tabs mdl-js-ripple-effect">
 <div class="mdl-tabs__tab-bar">
     <a href="#file-pkg-interval" class="mdl-tabs__tab is-active">Config file</a>
     <a href="#env-pkg-interval" class="mdl-tabs__tab">Env variable</a>
 </div>

 <div class="mdl-tabs__panel is-active" id="file-pkg-interval">
   <pre>
   # st-agent.yml
   pkg:
     interval: 10m
   </pre>
 </div>
 <div class="mdl-tabs__panel" id="env-pkg-interval">
   <pre>
   PKG_INTERVAL=10m
   </pre>
 </div>
</div>

Some packages may include the a list of configuration files (e.g. Debian packages). To instruct the agent to track the configuration files, you can use the following settings.

<div class="mdl-tabs mdl-js-tabs mdl-js-ripple-effect">
 <div class="mdl-tabs__tab-bar">
     <a href="#file-pkg-configs" class="mdl-tabs__tab is-active">Config file</a>
     <a href="#env-pkg-configs" class="mdl-tabs__tab">Env variable</a>
 </div>

 <div class="mdl-tabs__panel is-active" id="file-pkg-configs">
   <pre>
   # st-agent.yml
   pkg:
     configs-enabled: true
   </pre>
 </div>
 <div class="mdl-tabs__panel" id="env-pkg-configs">
   <pre>
   CONFIGS_ENABLED=true
   </pre>
 </div>
</div>
