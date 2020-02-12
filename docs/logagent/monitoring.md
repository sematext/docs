title: Logagent Monitoring 
description: How to monitor Logagent runtime performance metrics

## Node.js runtime performance

### Containerized environment
If you are running Logagent in containers you should be running [sematext/logagent](../installation-docker/).
Set the MONITORING_TOKEN environmental variable to ship Logagent's Node.js runtime metrics to Sematext.  Just make sure the token is for the Node.js Monitoring App.

Example:
```
docker run -it \
  -e MONITORING_TOKEN=<nodejs app token here> \
  -e INFRA_TOKEN=<infra app token here> \
  -e LOGS_TOKEN=<logs app token here> \
  -v /var/run/docker.sock:/var/run/docker.sock \
  sematext/logagent
```

<something about helm and other ways or running sematext/logagent>

### Non-containerized environment

If non-containerized environments install the [logagent-nodejs-monitor](https://www.npmjs.com/package/@sematext/logagent-nodejs-monitor) plugin.

#### Installation
```npm i -g @sematext/logagent-nodejs-monitor```

#### Configuration
Add the following to the Logagent config file:

```
input:
  logagentMonitor:
    module: @sematext/logagent-nodejs-monitor
    INFRA_TOKEN: <infra app token here>
    MONITORING_TOKEN: <nodejs app token here>
    SPM_LOG_TO_COSOLE: false
    SPM_LOG_LEVEL: error
```
  
## Logagent internal metrics
Logagent keeps track of several internal metrics.  It writes them to ____ every _____.  
To enable/disable do ____

```yaml
# Something
something about verbosity? frequency?  target output?
```
