## Input Filter: Grok

Apply Grok to filter raw input from Logagent before data are parsed

## Configuration 

Add the following section to the Logagent configuration file. Please note you could use the plugin with multiple configurations. The output of the first filter is passed into the next one ...: 

```yaml
input: 
  files:
    - '/var/log/**/*.log'

inputFilter:
  - module: grok
    config:
      # Logagent uses node-grok. It loads all patterns from the given file. Using 'matchSource' parameter it is possiible to define a custom pattern.
      # See https://github.com/Beh01der/node-grok/tree/master/lib/patterns for patterns loaded at start
      matchSource: '%{IP:client} \[%{TIMESTAMP_ISO8601:timestamp}\] "%{WORD:method} %{URIHOST:site}%{URIPATHPARAM:url}" %{INT:code} %{INT:request} %{INT:response} - %{NUMBER:took} \[%{DATA:cache}\] "%{DATA:mtag}" "%{DATA:agent}"'
      filePath: /tmp/grok-patterns
      idpattern: USER

output:
  elasticsearch:
    module: elasticsearch
    url: http://localhost:9200
    index: mylogs

```


Run Logagent: 
```
logagent --config myconfig.yml 
```
