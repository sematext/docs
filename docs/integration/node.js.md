title: NodeJS Monitoring Integration
description: Sematext Node.js monitoring integration is available as npm package and added as any other node.js module. Request rate and event loop latency, memory, http server stats, garbage collection and other node.js reports and dashboards are available out of the box. Set up anomaly detection or threshold-based alerts on any combination of metrics and filters, and use heartbeat alerts to notify you when any of your nodes goes down

Sematext offers a simple Node.js monitoring agent, written entirely in Node.js without CPU and memory overhead. It's easy to install and require in your source code.

## Sematext Node.js Monitoring Agent
This lightweight, open-source [Node.js monitoring agent](https://github.com/sematext/spm-agent-nodejs) collects Node.js process and performance metrics then sends them to Sematext. It is available as an [npm package](https://www.npmjs.com/package/spm-agent-nodejs) that can be added to JavaScript source code like any other Node.js module.

First you install the npm module.
```bash
# Terminal
npm install spm-agent-nodejs
```

You need to add the `SPM_TOKEN` of your Sematext Monitoring App to your Node.js process environment with a module like [dotenv](https://github.com/motdotla/dotenv), or directly before running the application.

```bash
# .env
SPM_TOKEN=<your-spm-token-goes-here>
```

Require it in your source code at the top if your source file.
```javascript
// app.js
require('dotenv').config() // if you're using dotenv
require('spm-agent-nodejs')
```

Run your source file.
```bash
# Terminal
node app.js
```
Or without dotenv.
```bash
# Terminal
SPM_TOKEN=<your-spm-token-goes-here> node app.js
```

The Sematext Node.js monitoring agent will start collecting dozens of key metrics right away, and start showing you the performance and health of your Node.js applications immediately.

## Collected Node.js Metrics 

The Sematext Node.js monitoring agent collects the following metrics.

### Operating System    

- CPU usage 
- CPU Load
- Memory usage

![](https://sematext.com/wp-content/uploads/2019/05/pasted-image-0-4.png)

### Process Memory Usage

- Released memory between Garbage Collection Cycles
- Process Heap Size
- Process Heap Usage

![](https://sematext.com/wp-content/uploads/2019/05/pasted-image-0-5.png)

### Worker processes (cluster module)

- Worker count
- Event loop latency per worker

![](https://sematext.com/wp-content/uploads/2019/05/pasted-image-0-1.png)

### Event Loop

- Maximum Event Loop Latency
- Minimum Event Loop Latency
- Average Event Loop Latency

![](https://sematext.com/wp-content/uploads/2019/05/pasted-image-0.png)

### Garbage Collection

- Time consumed for garbage collection
- Counters for full garbage collection cycles
- Counters for incremental garbage collection cycles
- Released memory after garbage collection

![](https://sematext.com/wp-content/uploads/2019/05/pasted-image-0-2.png)


### HTTP Server Stats

- Request count
- Request rate
- Response time
- Request/Response Content-Length
- Error rates (total, 3xx, 4xx, 5xx)

![](https://sematext.com/wp-content/uploads/2019/05/pasted-image-0-3.png)

## Use the `cluster` module to run Node.js

## Set up Node.js with Systemd

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
- Tutorial: [https://sematext.com/blog/nodejs-monitoring-made-easy-with-sematext/](https://sematext.com/blog/nodejs-monitoring-made-easy-with-sematext/)
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

### Can I install spm-agent-nodejs on Windows?

Yes.  The native modules are automatically compiled during "npm
install" (using node-gyp). On Windows the required build tools like
python or C++ compilers are typically not installed by default.  See
<https://github.com/TooTallNate/node-gyp> for details about the
required compiler and build tools.

### PM2: How can I configure spm-agent-nodejs for my app using PM2 process manager?

Install `spm-agent-nodejs` as a global module.
```bash
sudo npm i -g spm-agent-nodejs --unsafe-perm
```

Check the location (full path) for `spm-agent-nodejs` using:
```
sudo npm root -g
```
The result is typically `/usr/local/lib/node_modules` or `/usr/lib/node_modules`. 
Remember the path to use it in the `interpreter_args` step below in the PM2 configuration file. You will need to append `/spm-agent-nodejs` to this path to access the globally installed directory of the `spm-agent-nodejs`.

First generate the PM2 config file:
```
pm2 ecosystem
```

This command will create a file called `ecosystem.config.js`.
```javascript
// ecosystem.config.js
module.exports = {
  apps : [{
    name: 'API',
    script: 'app.js',

    // Options reference: https://pm2.io/doc/en/runtime/reference/ecosystem-file/
    args: 'one two',
    instances: 1,
    autorestart: true,
    watch: false,
    max_memory_restart: '1G',
    env: {
      NODE_ENV: 'development'
    },
    env_production: {
      NODE_ENV: 'production'
    }
  }]
  // ...
};
```

Edit this file so it has an `interpreter_args` section, and SPM agent `env` variables.

```javascript
// ecosystem.config.js
module.exports = {
  apps : [{
    name: 'API',
    script: 'app.js', // replace with your server file
    instances: 1, // does not work with more than 1 because cluster mode is not supported
    autorestart: true,
    watch: false,
    exec_mode: 'fork', // does not work in 'cluster'
    interpreter_args: '-r /usr/lib/node_modules/spm-agent-nodejs', // ADD THIS
    env: { // ADD ALL OF THIS TOO
      NODE_ENV: 'development',
      SPM_TOKEN: 'YOUR_SPM_TOKEN',
      spmagent_dbDir: './spmdb',
      spmagent_logger__dir: './spmlogs',
      spmagent_logger__silent: false,
      spmagent_logger__level: 'error'
    },
    env_production: {
      NODE_ENV: 'production',
      SPM_TOKEN: 'YOUR_SPM_TOKEN',
      spmagent_dbDir: './spmdb',
      spmagent_logger__dir: './spmlogs',
      spmagent_logger__silent: false,
      spmagent_logger__level: 'error'
    }
  }]
  // ...
};
```

Run PM2 with the config file:
```
pm2 start ecosystem.config.js
```

### How can I use spm-agent-nodejs behind Firewalls / Proxy servers?

By default data is transmitted via HTTPS. If no direct connection is
possible, a proxy server can be used by setting the environment
variable HTTPS\_PROXY=<https://your-proxy>.

### What should I do after upgrading to a new Node.js version?

If you switch the Node.js version the spm-agent-nodejs package will
need to be installed again (due to the fact that included native
modules may change from version to version).  After the version
change please run a fresh "npm install" if you added spm-agent-nodejs
to the dependencies in your package.json or at the very least run
"npm install spm-agent-nodejs".

### How do I upgrade to the latest version of spm-agent-nodejs?

To use the latest version of spm-agent-nodejs we recommend you
install/upgrade using:
```
npm install spm-agent-nodejs@latest
```

To add the dependency to your package.json simply use:
```
npm install spm-agent-nodejs@latest --save
```
