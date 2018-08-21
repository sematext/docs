title: Logagent input plugin for GELF / Graylog protocol
description: Logagent features modular logging architecture framework where each input or output module is implemented as a plugin, and loaded on demand as declared in the configuration file. GELF input plugin receives logs data with GELF protocol v1.1 via UDP. GELF (Graylog Extended Log Format) is a log format that avoids the shortcomings of classic plain syslog, and the great choice for logging from within applications

## Input Plugin: GELF 

Plugin to receive logs with GELF protocol v1.1 via UDP. GELF (Graylog Extended Log Format) is a log format that avoids the shortcomings of classic plain syslog.

### Installation 

Install graygelf module 

```
npm i -g graygelf
# sudo npm i -g --unsafe-perm graygelf 
```

### Configuration

```yaml
# Global options
input:
  gelf: 
    module: input-gelf
    port: 12100
    host: 0.0.0.0
output:
  # print parsed logs in YAML format to stdout   
  stdout: yaml 
```

Start Logagent

```
logagent --config myconfig.yml
```

Ship logs to GELF input through a simple snapshot:

``` 
var log = require('graygelf')({
    host: 'localhost',
    port: 12100
  })
log.info.a('short', 'full', { foo: 'bar' })
``` 
