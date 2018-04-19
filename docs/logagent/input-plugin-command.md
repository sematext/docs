Title: Use output of commands as data source

## Input Plugin: Command 

Input plugin to schedule commands and stream the output into Logagent.
Similar to 'tail -n 10 test.log | logagent --yaml'. 

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

