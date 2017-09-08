
## Plugin: File input

Plugin to tail logs from files. A list of [glob patterns](https://www.npmjs.com/package/glob#glob-primer) is interpreted to generate the list of files, watched for changes. The file input plugin detects new files matching the glob patterns.  The file input plugin behaves like the "tail -f" Linux command and reads files from the end of the file. In addition, the last read file position is stored in the configured disk buffer directory 'diskBufferDir' when Logagent terminates. File positions are recovered when Logagent starts again. 

### Configuration

```yaml

diskBufferDir: /tmp
input:
  # a list of glob patterns to watch files to tail
  files:
    - '/var/log/**/*.log'
    - '/opt/myapp/**/*.log'

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
