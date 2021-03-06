title: Read data from standard input 
description: Logagent features modular logging architecture framework where each input or output module is implemented as a plugin, and loaded on demand as declared in the configuration file. Standard input reads data from the standard input stream and is activated by default

## Input Plugin: Standard input (stdin)

This plugin reads data from the standard input stream and is activated by default. 
 
### Configuration

```

input:
  stdin: true
  # disable reading from stdin
  # stdin: false

output:
  stdout: yaml
  # use 'pretty' for pretty json and 'ldjson' for line delimited json
  # stdout: pretty
  # stdout: ldjson

```

Start logagent

```
cat test.log | logagent --yaml
cat test.log | logagent --config stdin.yaml
# convert a JSON file to YAML
cat test.json | logagent --yaml > test.yml
# index a JSON file in elasticsearch
cat mydata.json | logagent -e http://elasticsearch:9200 -i myindex
```
