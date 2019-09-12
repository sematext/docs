title: Drop Events Filter 
description: Drop events before logs are shipped to any destination

## Output filter: drop-events

This plugin drops events by include/exclude criteria for each field. The filters property contains a list of fields. For each field, you can specify a regular expression to keep (include) or drop (exclude) the event from processing.

### Configuration 

Please note you could use the plugin with multiple configurations for different event sources.  

```yaml
# tail server logs
input: 
  files:
    - '/var/log/**/*.log'

outputFilter:
  dropEvents:
    module: drop-events
    debug: false
    filters:
      severity:
        include: !!js/regexp /error|warn/i
        exclude: !!js/regexp /debug|info/i
      service:
        exclude: !!js/regexp ntpd
      message: 
        include: !js/regexp /critical|auth|error|failed/

```

Run Logagent with your config: 

```
logagent --config logagent-example-config.yml --yaml
```

