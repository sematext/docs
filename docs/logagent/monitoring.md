title: Logagent Monitoring 
description: How to monitor Logagent runtime performance metrics

## Node.js runtime performance
You can monitor Logagent performance by using the [logagent-nodejs-monitor](https://www.npmjs.com/package/@sematext/logagent-nodejs-monitor) plugin.
Setting the Sematext Monitoring App to set the MONITORING_TOKEN environmental variable will ship Logagent's Node.js runtime metrics to Sematext.

```
docker run -it \
  -e MONITORING_TOKEN=<token here> \
  -e INFRA_TOKEN=<token here> \
  -e LOGS_TOKEN=<token here> \
  -v /var/run/docker.sock:/var/run/docker.sock \
  sematext/logagent
```


## Logagent internal metrics
Logagent keeps track of several internal metrics.  It writes them to ____ every _____.  
To enable/disable do ____

```yaml
# Something
something about verbosity? frequency?  target output?
```
