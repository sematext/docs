title: Logagent input plugin for Cloud Foundry
description: Logagent features modular logging architecture framework where each input or output module is implemented as a plugin. Plugin recieves logs from Cloud Foundry log drains via HTTP. The Sematext SaaS and on-premises platform works well with container-based architecture, and provides logging and monitoring tools for variety of private cloud distributions and public cloud instances, developer frameworks, application services, and more.

## Input Plugin: Cloud Foundry 

Recieves logs from Cloud Foundry log drains via HTTP.

Please note:  
__To ship Cloud Foundry application logs to Sematext Logs, we recommend to [stream Cloud Foundry application logs directly to Sematext Logs](https://docs.cloudfoundry.org/devguide/services/log-management-thirdparty-svc.html#logsene)__

### Configuration

```yaml

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
