## Grep Input Filter

Apply regex to filter raw input from Logagent before logs are parsed

## Configuration 

Add the following section to the Logagent configuration file. Please note you could use the plugin with multiple configurations. Output of the first filter is passed into the next one ...: 

```yaml
input: 
  files:
    - '/var/log/**/*.log'

inputFilter:
  - module: grep
    config:
      matchSource: !!js/regexp /myapp.log/
      include: !!js/regexp /info|error/i
      exclude: !!js/regexp /test/i

output:
  elasticsearch:
    module: elasticsearch
    url: http://localhost:9200
    index: mylogs

```

The example above filters all log files with the content "info" or "error", and drops all lines with the keyword "test". 

Run Logagent: 
```
logagent --config myconfig.yml 
```
