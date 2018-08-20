title: Use Grok patterns to filter raw logs 
description: Logagent features modular logging architecture framework where each input or output module is implemented as a plugin, and loaded on demand as declared in the configuration file. Input filters process raw input from input plugins before log events get parsed and grep and grok filters are currently available

## Input Filter: Grok

Input plugin for [@sematext/logagent](http://sematext.com/logagent/). Uses Grok patterns to filter data from input plugins before data are parsed.

### Installation 

Install [@sematext/logagent](https://www.npmjs.com/package/@sematext/logagent) and [logagent-input-filter-grok](https://www.npmjs.com/package/logagent-input-filter-grok) npm package: 

```
npm i -g @sematext/logagent
npm i -g logagent-input-filter-grok
```

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
