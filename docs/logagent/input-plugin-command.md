title: Logagent input plugin for Command 
description: Logagent features modular logging architecture framework where each input or output module is implemented as a plugin, and loaded on demand as declared in the configuration file. Command input plugin is used to output commands as data source and schedule commands and stream the output into Logagent, similar to 'tail -n 10 test.log | logagent --yaml'. It can collect output from command line tools, namely journald logs via journalctl and information via http with curl or wget.

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
    command: journalctl -o json --since="$QUERY_TIME"
    sourceName: journald

    # date format for replacing $QUERY_TIME and $NOW
    # the following works for journalctl, the default is ISO 8601
    dateFormat: YYYY-MM-DD HH:mm:ss

    # where to persist last $QUERY_TIME
    # defaults to os.tmpdir()+'logagentLastQueryTimeFile'
    # lastQueryTimeFile: /tmp/logagentLastQueryTimeFile

    # value for $QUERY_TIME if nothing was persisted. Default below
    # initialQueryTime: "2001-01-01 00:00:00"

    # memory for the pipe between the command and Logagent
    # it should fit the maximum size of the command's stdout/stderr
    # size in bytes. Default below
    # maxBuffer: 50000000

    # after finishing the command, wait for N seconds then run it again
    restart: 1

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
