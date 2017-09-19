## Plugin: Standard output

This plugin writes the result of Logagent parser to the standard output stream (stdout) and is activated by default. 

Following message formats are supported: 
- Line delimited JSON (default)
- Pretty JSON (--pretty command line flag)
- YAML (--yaml command-line flag)
 
### Configuration

```

input:
  stdin: true
  files: 
    - /var/log/**/*.log

output:
  stdout: yaml
  # use 'pretty' for pretty json and 'ldjson' for line delimited json
  # stdout: pretty
  # stdout: ldjson

```

Start logagent

```
logagent --config stdout.yaml
```

### Command-line usage

```
cat test.log | logagent --yaml
cat test.log | logagent --pretty
cat test.log | logagent --ldjson
```