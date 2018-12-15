title: Send alerts to Prometheus Alertmanager
description: Send alerts to Prometheus Alertmanager and use its various notifications capabilities such as e-mail, slack, pagerduty, opsgenie and many more

## Output Plugin: Prometheus Alertmanager

Plugin to send alerts to Prometheus Alertmanager.

Applications: 
* Alert Notifications


### Configuration

In the configuration section `alertTemplate` the input values are be substituted with syntax `{variable-name}`.

```yaml
output:
  stdout: yaml 
  prometheus:
    module: prometheus-alertmanager
    url: http://localhost:9093
    alertTemplate:
      generatorURL: http://kibana/_plugin/kibana/app/kibana#/discover?&_a=(query:(language:lucene,query:'*{host}*'))
      labels:
        host: "{host}"
        environment: "{environment}"
      annotations:
        description: "The env is '{environment}'"
    debug: true
```

Start Logagent

```
logagent --config myconfig.yml
```
