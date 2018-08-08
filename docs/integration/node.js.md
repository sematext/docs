title: NodeJS Monitoring Integration
description: Sematext node.js monitoring integration is available as npm package and added as any other node.js module. Request rate and event loop latency, memory, http server stats, garbage collection and other node.js reports and dashboards are available out of the box. Set up anomaly detection or threshold-based alerts on any combination of metrics and filters, and use heartbeat alerts to notify you when any of your nodes goes down

## Overview

A light-weight, open-source [Node.js monitoring
agent](https://github.com/sematext/spm-agent-nodejs) collects Node.js
processes' metrics and sends them to Sematext. It is available as [npm
package](https://www.npmjs.com/package/spm-agent-nodejs) that can be
added to the JavaScript source code like any other Node.js module.

The following metrics are collected:

  - **Operating System**
    
      - CPU usage 
      - Memory usage

  - **Process Memory Usage**

  - **Number of Worker processes** (when using "cluster" package for
    master/worker processes)

  - **Event Loop**
    
      - Latencies (fastest, slowest, average)

  - **Garbage Collection (GC)**
    
      - Counters for full GC
      - Counters for incremental GC
      - Time spend for GC
      - Difference in heap used after each GC cycle

  - **HTTP Server stats**
    
      - Request count
      - Request rate
      - Content-Length
      - Error rates (total, 3xx, 4xx, 5xx)

## Troubleshooting

** Generate diagnostics file for Sematext Support **

If you are not seeing some or any Node.js metrics, you can create a
"diagnostics dump" and contact us via chat or email. To create the
diagnostics dump just run the following in your application directory:
```
node ./node_modules/spm-agent-nodejs/bin/spm-client-diagnostics.js 
```

This will create a ZIP file and show the Sematext Support email
address to which the ZIP file should be sent.


## Integration

- Agent: [https://github.com/sematext/spm-agent-nodejs](https://github.com/sematext/spm-agent-nodejs)
- Instructions: [https://apps.sematext.com/ui/howto/Node.js/overview](https://apps.sematext.com/ui/howto/Node.js/overview)

## Metrics

Metric Name | Key | Agg | Type | Description
--- | --- | --- | --- | ---
heap total | nodejs.heap.size | Avg | Long | 
heap used | nodejs.heap.used | Avg | Long | 
total released | nodejs.gc.heap.diff | Sum | Double | 
total duration | nodejs.gc.time | Sum | Double | 
full gc | nodejs.gc.full | Sum | Long | 
inc gc | nodejs.gc.inc | Sum | Long | 
memory rss | nodejs.memory.rss | Avg | Long | 
workers count | nodejs.workers | Avg | Long | 
request count | nodejs.requests | Sum | Long | 
error count | nodejs.errors | Sum | Long | 
5xx count | nodejs.errors.5xx | Sum | Long | 
4xx count | nodejs.errors.4xx | Sum | Long | 
3xx count | nodejs.errors.3xx | Sum | Long | 
total req. size | nodejs.requests.size.total | Sum | Long | 
total res. size | nodejs.response.size.total | Sum | Long | 
min response latency | nodejs.responses.latency.min | Min | Long | 
max response latency | nodejs.responses.latency.max | Max | Long | 
min latency | nodejs.eventloop.latency.min | Min | Long | 
max latency | nodejs.eventloop.latency.max | Max | Long | 

## Custom Metrics
    
To track custom metrics like the number of concurrent users, the
number of items placed in a shopping cart, or any other kind of
business transaction or KPI we provide a [Custom Metrics
API](/monitoring/custom-metrics) and a Node.js client for it:
[spm-metrics-js](https://www.npmjs.com/package/spm-metrics-js)

## FAQ

** Can I install spm-agent-nodejs on Windows? **

Yes.  The native modules are automatically compiled during "npm
install" (using node-gyp). On Windows the required build tools like
python or C++ compilers are typically not installed by default.  See
<https://github.com/TooTallNate/node-gyp> for details about the
required compiler and build tools.

** How can I configure spm-agent-nodejs for my app using PM2 process manager? **

Install spm-agent-nodejs as global module: 
```
sudo npm i -g spm-agent-nodejs
```

Check the location (full path) for spm-agent-nodejs using:
```
sudo npm root -g
```
The result is typically `/usr/local/lib/node_modules` or `/usr/lib/node_modules`. 
Remember the path to use it in the "interpreter_args" step below in the PM2 configuration file. 

If you use PM2 to start your Node.js process, then use the following environment section in your [PM2 application config file](http://pm2.keymetrics.io/docs/usage/application-declaration/#application-declaration-file):

```js
{ 
   "interpreter_args": "-r /usr/local/lib/node_modules/spm-agent-nodejs"
   "env": { 
      "SPM_TOKEN": "YOUR_SPM_TOKEN",
      "spmagent_dbDir": "./spmdb",
      "spmagent_logger__dir": "./spmlogs",
      "spmagent_logger__silent" = false,
      "spmagent_logger__level": "error"
}
```

** How can I use spm-agent-nodejs behind Firewalls / Proxy servers? **

By default data is transmitted via HTTPS. If no direct connection is
possible, a proxy server can be used by setting the environment
variable HTTPS\_PROXY=<https://your-proxy>.

** What should I do after upgrading to a new Node.js version? **

If you switch the Node.js version the spm-agent-nodejs package will
need to be installed again (due to the fact that included native
modules may change from version to version).  After the version
change please run a fresh "npm install" if you added spm-agent-nodejs
to the dependencies in your package.json or at the very least run
"npm install spm-agent-nodejs".

** How do I upgrade to the latest version of spm-agent-nodejs? **

To use the latest version of spm-agent-nodejs we recommend you
install/upgrade using:
```
npm install spm-agent-nodejs@latest
```

To add the dependency to your package.json simply use:
```
npm install spm-agent-nodejs@latest --save
```
