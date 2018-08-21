title: Logagent input plugin for Command 
description: Logagent features modular logging architecture framework where each input or output module is implemented as a plugin, and loaded on demand as declared in the configuration file. Command input plugin is used to output commands as data source and schedule commands and stream the output into Logagent, similar to 'tail -n 10 test.log | logagent --yaml'. It can collect output from command line tools, namely journald logs via journalctl and information via http with curl or wget

## Input Plugin: Command 

Input plugin to schedule commands and stream the output into Logagent, similar to 'tail -n 10 test.log | logagent --yaml'. 

Applications: 

- collect output from command line tools
    - collect journald logs via `journalctl`
    - collect information via http with `curl` or `wget`


### Configuration

```yaml

input:
  journald-json: 
    module: command
    command: journalctl -o json -f
    sourceName: journald
    # time in seconds to repeat the command
    restart: -1

output:
  es-local:
    module: elasticsearch
    url: http://localhost:9200
    index: journald_logs

```

Start Logagent

```
logagent --config myconfig.yml
```

