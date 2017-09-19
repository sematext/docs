## Plugin: Cloud Foundry input

Recieves logs from Cloud Foundry log drains via HTTP.

Please note:  
__To ship Cloud Foundry application logs to Logsene, we recommend to [stream Cloud Foundry application logs directly to Logsene](https://docs.cloudfoundry.org/devguide/services/log-management-thirdparty-svc.html#logsene)__

### Configuration

```
input:
  # Receive data from Cloud Foundry log drains via http  
  cloudFoundry:
    port: 8888

output: 
  stdout: yaml

```

Start Logagent

```
logagent --config myconfig.yml
```
