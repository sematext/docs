title: Express.js Monitoring Integration
description: Sematext Express.js monitoring integration is available as an npm package and required as any other Node.js module. Request rate and event loop latency, memory, http server stats, garbage collection and other Node.js reports and dashboards are available out of the box. Including HTTP logs and Application logs for API-specific troubleshooting and debugging.

This is the Express.js monitoring and logging agent for Sematext, written entirely in Node.js without CPU and memory overhead. It's easy to install and require in your source code.

## Sematext Express.js Agent Quick Start
This lightweight, open-source [Express.js monitoring agent](https://github.com/sematext/sematext-agent-express) collects Node.js process and performance metrics and sends them to Sematext. It is available as an [npm package](https://nodei.co/npm/sematext-agent-express/) that can be added to Node.js source code like any other npm module.

First you install the npm module.
```bash
# Terminal
npm i sematext-agent-express
```

### Configure Environment

Make sure to configure your ENVIRONMENT variables before adding `sematext-agent-express`. You can do this either by exporting the variables to your environment or by using `dotenv`. We suggest you use [dotenv](https://github.com/motdotla/dotenv).

#### Export env vars

If you are using the US region of Sematext Cloud:

```bash
export REGION=US
export MONITORING_TOKEN=<YOUR_MONITORING_TOKEN>
export LOGS_TOKEN=<YOUR_LOGS_TOKEN>
export INFRA_TOKEN=<YOUR_INFRA_TOKEN>
```
_**Note:** The US region is set by default, so you do not need to add an environment variable at all._

If you are using the EU region of Sematext Cloud:

```bash
export REGION=EU
export MONITORING_TOKEN=<YOUR_MONITORING_TOKEN>
export LOGS_TOKEN=<YOUR_LOGS_TOKEN>
export INFRA_TOKEN=<YOUR_INFRA_TOKEN>
```

#### Use dotenv

```bash
npm i dotenv
```

Create a `.env` file in the root of your project.

Add this code if you are using the US region of Sematext Cloud:

```
REGION=US
MONITORING_TOKEN=<YOUR_MONITORING_TOKEN>
LOGS_TOKEN=<YOUR_LOGS_TOKEN>
INFRA_TOKEN=<YOUR_INFRA_TOKEN>
```
_**Note:** The US region is set by default, so you do not need to add an environment variable at all._

Add this code if you are using the EU region of Sematext Cloud:

```
REGION=EU
MONITORING_TOKEN=<YOUR_MONITORING_TOKEN>
LOGS_TOKEN=<YOUR_LOGS_TOKEN>
INFRA_TOKEN=<YOUR_INFRA_TOKEN>
```

### Configure Agent

Make sure to load the environment variables at the top of your JavaScript entry point file. Then require `sematext-agent-express`.

The Agent has 3 parts:

- `stMonitor` - Monitors metrics and sends to Sematext Monitoring
- `stLogger` - A logger based on `winston`, that will send logs directly to Sematext Logs
- `stHttpLoggerMiddleware` - Express.js middleware function that will send all HTTP endpoint logs to Sematext Logs

#### Usage

```javascript
// Load env vars
require('dotenv').config()

// require all agents
const {
  stMonitor,
  stLogger,
  stHttpLoggerMiddleware
} = require('sematext-agent-express')

// Start monitoring metrics
stMonitor.start()

// ...

// At the top of your routes add the stHttpLoggerMiddleware to send HTTP logs to Sematext
const express = require('express')
const app = express()
app.use(stHttpLoggerMiddleware)

// ...

// Use the stLogger to send all types of logs directly to Sematext
app.get('/api', (req, res, next) => {
  stLogger.info('Hello World.')
  stLogger.error('Some error.')
  res.status(200).send('Hello World.')
})
```

You can use all parts of the Agent of use them separately. It's all up to you.

The Sematext Express.js Agent will start collecting dozens of key metrics and logs right away, and start showing you the performance and health of your Express.js applications immediately.

## Collected Express.js Metrics

The Sematext Express.js Agent collects the following metrics.

### Operating System

- CPU usage 
- CPU load
- Memory usage

![](https://sematext.com/wp-content/uploads/2019/05/pasted-image-0-4.png)

### Process Memory Usage

- Released memory between garbage collection cycles
- Process heap size
- Process heap usage

### Process Count

- Number of master processes
- Number of child processes

![](https://sematext.com/wp-content/uploads/2020/02/nodejs-process-count.png)

### Process CPU Usage

- CPU usage per process
- CPU usage per PID

![](https://sematext.com/wp-content/uploads/2020/02/nodejs-process-cpu-usage.png)
![](https://sematext.com/wp-content/uploads/2020/02/nodejs-process-cpu-by-pid.png)

### Process RSS Usage

- RSS usage per process
- RSS usage per PID

![](https://sematext.com/wp-content/uploads/2020/02/nodejs-process-rss.png)

### Process Uptime

- Process Uptime per process
- Process Uptime per PID

![](https://sematext.com/wp-content/uploads/2020/02/nodejs-process-uptime.png)

### Process Thread Count

- Number of threads per process
- Number of threads per PID

![](https://sematext.com/wp-content/uploads/2020/02/nodejs-process-thread.png)

![](https://sematext.com/wp-content/uploads/2019/05/pasted-image-0-5.png)

### Worker Processes (cluster module)

- Worker count
- Event loop latency per worker

![](https://sematext.com/wp-content/uploads/2019/05/pasted-image-0-1.png)

### Event Loop

- Maximum event loop latency
- Minimum event loop latency
- Average event loop latency

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
- Request/Response content-length
- Error rates (total, 3xx, 4xx, 5xx)

![](https://sematext.com/wp-content/uploads/2019/05/pasted-image-0-3.png)

## Collected Express.js Logs

The Sematext Express.js Agent collects the following logs for every HTTP request.

### Structured HTTP logs

Here's an example of what a structured HTTP log looks like:

timestamp | message | severity | host | ip | method | url | status | content length | response time
--- | --- | --- | --- | --- | --- | --- | --- | --- | ---
2019-12-23T21:06:36.615Z | your_message | info/debug/error/warn | your_hostname | 127.0.0.1 | GET/PUT/POST/DELETE | /api/v1 | 2xx/3xx/4xx/5xx | in bytes | in ms

Displayed in `JSON` format:

```json
{
  "@timestamp": "2019-12-23T21:06:36.615Z",
  "message": "HTTP LOG",
  "severity": "info",
  "host": "ip-172-31-29-198",
  "ip": "172.31.29.198",
  "method": "GET",
  "url": "/v1/users",
  "status": "200",
  "contentLength": "-",
  "responseTime": "18.403"
}
```

Using this data, you can create custom dashboards displaying detailed data about all HTTP requests hitting your Express.js application.

## Running the Sematext Express.js Agent in Production
If you want to have a reliable application with high uptime, make sure to use the `cluster` module, with the addition of running the Node.js process with Systemd. This will ensure restarts when your application fails and make rolling updates much easier.

### Use the `cluster` module to run Node.js
To make use of the full power of your server, you should run an instance of your Node.js application on each CPU core. The `cluster` module makes this easier than ever. Create another file called `cluster.js`.

```javascript
// cluster.js

const cluster = require('cluster')
const numCPUs = require('os').cpus().length
const app = require('./app')
const port = process.env.PORT || 3000

const masterProcess = () => Array.from(Array(numCPUs)).map(cluster.fork)
const childProcess = () => app.listen(port)
if (cluster.isMaster) masterProcess()
else childProcess()
cluster.on('exit', (worker) => cluster.fork())
```

Now you can run your app with:
```bash
node cluster.js
```

The cluster will spin up a master process with a dedicated process ID and run `numCPUs` number of worker processes. They will be load balanced in a round-robin fashion from the master process.

This is not all, you should also make sure to run your Node.js application with Systemd to make it a system service and run automatically on startup and restart itself if it fails.

### Set up Node.js with Systemd
The service files for the things that systemd controls all live under the directory path

```bash
/lib/systemd/system
```

Create a new file there:
```bash
sudo vim /lib/systemd/system/app.service
```

And add this piece of code:
```bash
# /lib/systemd/system/app.service

[Unit]
Description=app.js - running your Node.js app as a system service
Documentation=https://yourwebsite.com
After=network.target

[Service]
Type=simple
User=root
ExecStart=/usr/bin/node /absolute/path/to/your/project/app.js
Restart=on-failure

[Install]
WantedBy=multi-user.target
```

To use Systemd to control the app you first need to reload the Daemon to register the new file.

```bash
sudo systemctl daemon-reload
```

Now launch your app with:
```bash
sudo systemctl start app
```

You've successfully launched your Node.js app using Systemd! If it doesn't work for some reason, make sure to check your paths in `ExecStart` are correct.
```bash
ExecStart=/usr/bin/node /absolute/path/to/your/project/app.js
```
These need to point to the `node` binary and the absolute path to your `app.js` file.

## Use `PM2` to run Node.js
You can also run your application with PM2 just like you would normally. Using the same setup as with a default Express.js server. Load the env vars and agent at the top of your source file.

```javascript
// app.js

// Load env vars
require('dotenv').config({ path: '/absolute/path/to/your/project/.env' })

// require all agents
const {
  stMonitor,
  stLogger,
  stHttpLoggerMiddleware
} = require('sematext-agent-express')

// Start monitoring metrics
stMonitor.start()


// ...

// At the top of your routes add the stHttpLoggerMiddleware to send HTTP logs to Sematext
const express = require('express')
const app = express()
app.use(stHttpLoggerMiddleware)

// ...
```

Run the `pm2` command to start your server.

```bash
pm2 start app.js -i max
```

The agent will detect you are running PM2 and start collecting metrics automatically.


## Use Containers to run Node.js
You can also run your application in any container environment, like Docker, Docker Compose, Docker Swarm, or Kubernetes. You'll use the same setup as with a default Node.js server. But, instead of using `dotenv`, you'll add the environment variables when starting the container.

First of all, require the agent at the top of your init file:


```javascript
// app.js

// require all agents
const {
  stMonitor,
  stLogger,
  stHttpLoggerMiddleware
} = require('sematext-agent-express')

// Start monitoring metrics
stMonitor.start()


// ...

// At the top of your routes add the stHttpLoggerMiddleware to send HTTP logs to Sematext
const express = require('express')
const app = express()
app.use(stHttpLoggerMiddleware)

// ...
```

Then, use this `Dockerfile` to make sure garbage collection metrics are enabled:

```dockerfile
FROM alpine AS build
WORKDIR /usr/src/app
RUN apk add --no-cache --update \
  python3 \
  make \
  gcc \
  g++ \
  nodejs \
  nodejs-npm
 
COPY package.json package-lock.json ./
RUN npm install --production
 
#############
 
FROM alpine
WORKDIR /usr/src/app
RUN apk add --no-cache --update nodejs
COPY --from=build /usr/src/app/node_modules ./node_modules
COPY . .
EXPOSE <PORT>
CMD ["node", "app.js"]
```

Change the `<PORT>` you're exposing and if needed, change `app.js` to the entrypoint of your application.

Now build a Docker image from the `Dockerfile` above. Run this command in the same directory where you have the `Dockerfile`:

```bash
docker build -t <YOUR_IMAGE:TAG> .
```

### Docker

Next, run the Docker image. Add your `MONITORING_TOKEN`. Change the `<PORT>` to the one you're exposing and `<YOUR_IMAGE:TAG>` to the name of the image you just built. Optionally, add additional flags if you need to.

```bash
docker run -d -p <PORT>:<PORT> \
  -v /var/run/docker.sock:/var/run/docker.sock \
  -e MONITORING_TOKEN=<MONITORING_TOKEN> \
  -e LOGS_TOKEN=<LOGS_TOKEN> \
  <YOUR_IMAGE:TAG>
```

### Docker Compose

Alternatively, you can use Docker Compose. Use this `docker-compose.yml` file alongside the `Dockerfile` above to build and run your application. First add your `<MONITORING_TOKEN>`, then change the `<PORT>` to the one you're exposing and `<YOUR_IMAGE:TAG>` to the name of the image you just built.

```yaml
version: '3'
services:
  your-nodejs-app:
    build:
      context: ./
      dockerfile: Dockerfile
    image: '<YOUR_IMAGE:TAG>'
    environment:
      - MONITORING_TOKEN=<MONITORING_TOKEN>
      - LOGS_TOKEN=<LOGS_TOKEN>
    restart: always
    volumes:
      - '/var/run/docker.sock:/var/run/docker.sock'
    ports:
      - '<PORT>:<PORT>'
```

### Docker Swarm

The same approach works for Docker Swarm. First add your `<MONITORING_TOKEN>`, then change the `<PORT>` to the one you're exposing and `<YOUR_IMAGE:TAG>` to the name of the image you just built.

```bash
docker service create --name your-nodejs-app \
  -p <PORT>:<PORT> \
  --restart-condition any \
  --mount type=bind,src=/var/run/docker.sock,dst=/var/run/docker.sock \
  -e MONITORING_TOKEN=<MONITORING_TOKEN> \
  -e LOGS_TOKEN=<LOGS_TOKEN> \
  <YOUR_IMAGE:TAG>
```

Alternatively, if you want to use a Docker Compose file with the `docker stack` command, add this to your `docker-compose.yml` file. First add your `<MONITORING_TOKEN>`, then change the `<PORT>` to the one you're exposing and `<YOUR_IMAGE:TAG>` to the name of the image you just built.

```yaml
services:
  your-nodejs-app:
    image: '<YOUR_IMAGE:TAG>'
    environment:
      - MONITORING_TOKEN=<MONITORING_TOKEN>
      - LOGS_TOKEN=<LOGS_TOKEN>
    volumes:
      - '/var/run/docker.sock:/var/run/docker.sock'
    deploy:
      mode: replicated
      replicas: 1
      labels: [APP=APP]
      update_config:
        parallelism: 1
        delay: 5s
      restart_policy:
        condition: on-failure
        delay: 5s
    ports:
      - "<PORT>:<PORT>"
```


### Kubernetes

To enable the agent in Kubernetes envs you first need to create a Cluster Role, Cluster Role Binding, and Service Account for the Agent to get permissions to access the Kubernetes API.

```yaml
# Cluster Role bindings for Agent
apiVersion: rbac.authorization.k8s.io/v1
kind: ClusterRoleBinding
metadata:
  name: spm-agent-nodejs
  labels:
    app: spm-agent-nodejs
roleRef:
  apiGroup: rbac.authorization.k8s.io
  kind: ClusterRole
  name: spm-agent-nodejs
subjects:
- kind: ServiceAccount
  name: spm-agent-nodejs
  namespace: default
---
# Cluster Role for Agent
apiVersion: rbac.authorization.k8s.io/v1
kind: ClusterRole
metadata:
  name: spm-agent-nodejs
  labels:
    app: spm-agent-nodejs
rules:
- apiGroups:
  - ""
  resources:
  - pods
  verbs:
  - list
  - get
  - watch
---
# Service Account for Agent
apiVersion: v1
kind: ServiceAccount
metadata:
  name: spm-agent-nodejs
  labels:
    app: spm-agent-nodejs
```

Apply the cluster role.

```bash
kubectl create -f nodejs-cluster-role.yml
```

Next, run the Docker image in your Kubernetes Cluster as a Deployment. Add your `<MONITORING_TOKEN>` Change the `<PORT>` to the one you're exposing, and `<YOUR_IMAGE:TAG>` to the name of the image you just built. You can edit the replicas as you see fit. Make sure to add `serviceAccountName: spm-agent-nodejs` to enable the required permissions.

```yaml
apiVersion: apps/v1
kind: Deployment
metadata:
  name: your-nodejs-app-deployment
  labels:
    app: nodejs
spec:
  replicas: 3
  selector:
    matchLabels:
      app: nodejs
  template:
    metadata:
      labels:
        app: nodejs
    spec:
      serviceAccountName: spm-agent-nodejs
      containers:
      - name: nodejs
        image: <YOUR_IMAGE:TAG>
        ports:
        - containerPort: <PORT>
        env:
        - name: POD_NAME
          valueFrom:
            fieldRef:
              fieldPath: metadata.name
        - name: POD_NAMESPACE
          valueFrom:
            fieldRef:
              fieldPath: metadata.namespace
        - name: MONITORING_TOKEN
          value: "<MONITORING_TOKEN>"
        - name: LOGS_TOKEN
          value: "<LOGS_TOKEN>"
```

Create the deployment.

```bash
kubectl create -f nodejs-deployment.yml
```

Next, expose your Deployment with a Service. Change the `<PORT>` to the one you're exposing, and set the `clusterIP` if needed.

```yaml
apiVersion: v1
kind: Service
metadata:
  name: your-nodejs-app-service
spec:
  selector:
    app: nodejs
  ports:
    - protocol: TCP
      port: 80
      targetPort: <PORT>
  type: LoadBalancer
  # if you are using a cloud provider (AWS, GCP, etc...)
  # a LoadBalancer will be provisioned automatically.
  # Otherwise set the clusterIP below.
  # clusterIP: <YOUR_CLUSTER_IP>
```

Create the service.

```bash
kubectl create -f nodejs-service.yml
```

## Integration

- Agent: [https://github.com/sematext/sematext-express-agent](https://github.com/sematext/sematext-express-agent)
<!-- - Tutorial: [https://sematext.com/blog/nodejs-monitoring-made-easy-with-sematext/](https://sematext.com/blog/nodejs-monitoring-made-easy-with-sematext/) -->
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
process count | process.count | All | Long |
process cpu usage | process.cpu.usage | All | Double |
process rss usage | process.rss | All | Double |
process thread count | process.thread.count | All | Long |
process uptime | process.uptime | All | Long |
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

## FAQ

### How to Monitor OS and Infra metrics with the Node.js Integration?
We have deprecated the built-in Operating System monitor in the
[Node.js-based Agent](https://github.com/sematext/spm-agent-nodejs) and
moved to using our [Go-based Sematext Agent](../agents/sematext-agent) for
Operating System and Infrastructure metrics. If you are using the
[`spm-agent-nodejs >=4.0.0`](https://github.com/sematext/spm-agent-nodejs) or
the [`sematext-agent-express >=2.0.0`](https://github.com/sematext/sematext-agent-express)
you are required to [install or upgrade the Sematext Agent](../monitoring/spm-faq/#how-do-i-upgrade-the-sematext-agent)
to gather Operating System and Infrastructure metrics.

### Can I install Express.js agent on Windows?

Yes. The native modules are automatically compiled during "npm
install" (using node-gyp). On Windows the required build tools like
python or C++ compilers are typically not installed by default.  See
<https://github.com/TooTallNate/node-gyp> for details about the
required compiler and build tools.

### How can I use Node.js agent behind Firewalls / Proxy servers?

By default data is transmitted via HTTPS. If no direct connection is
possible, a proxy server can be used by setting the environment
variable HTTPS\_PROXY=<https://your-proxy>.

### What should I do after upgrading to a new Node.js version?

If you switch the Node.js version the sematext-express-agent package will
need to be installed again (due to the fact that included native
modules may change from version to version).  After the version
change please run a fresh "npm install" if you added sematext-express-agent
to the dependencies in your package.json or at the very least run
"npm install sematext-express-agent".

### How do I upgrade to the latest version of sematext-express-agent?

To use the latest version of sematext-express-agent we recommend you
install/upgrade using:
```
npm install sematext-express-agent@latest
```

To add the dependency to your package.json simply use:
```
npm install sematext-express-agent@latest --save
```

## Troubleshooting

If you are not seeing some or any Express.js metrics, you can create a "diagnostics dump" and contact us via live chat or email. To create the diagnostics dump just run the following command in the root directory of your project.

```
sudo node ./node_modules/spm-agent-nodejs/bin/spm-nodejs-diagnostics.js
```

This will create a ZIP file and show the Sematext Support email address to which the ZIP file should be sent.
