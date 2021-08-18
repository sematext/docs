title: Tail Multiple Log Files
description: Logagent features modular logging architecture framework where each input or output module is implemented as a plugin, and loaded on demand as declared in the configuration file. File input plugin tails logs from files and detects new files matching the npm glob patterns. Plugin behaves like the "tail -f" Linux command that reads files from the end of the file

## Input Plugin: File

Plugin to tail logs from files. A list of [glob patterns](https://www.npmjs.com/package/glob#glob-primer) is interpreted to generate the list of files, watched for changes. The file input plugin detects new files matching the glob patterns. The file input plugin behaves like the "tail -f" Linux command and reads files from the end of the file. 

In addition, the last read file position is stored in the configured disk buffer directory 'diskBufferDir' when Logagent terminates. File positions are recovered when Logagent starts again. 

### Configuration

```yaml

diskBufferDir: /tmp
input:
  files:
    - '/var/log/**/*.log'
    - '/opt/myapp/**/*.log'
    - '/opt/another-log-directory/another.log'
    # Windows example
    # - 'D:\logs\**\*.log'
    
output:
  stdout: yaml
  elasticsearch:
    module: elasticsearch
    url: http://localhost:9200
    index: logs
```

Start Logagent

```
logagent --config myconfig.yml
```
