title: Store logs in Graylog 
description: Send data to a GELF server using protocol v1.1 via UDP with Gelf output plugin for Logagent, light-weight log shipper, filebeat, fluentd or rsyslog alternative with out of the box and extensible log parsing, on-disk buffering, secure transport, bulk indexing to Elasticsearch and Sematext logs management platform

## Output Plugin: GELF output plugin
This plugin sends data to a GELF server using protocol v1.1 via UDP.

#### Installation 

Install graygelf module 

```
npm i -g graygelf
# sudo npm i -g --unsafe-perm graygelf 
```

### Configuration

```
# Global options
options:
  includeOriginalLine: false

input:
  stdin: true

output: 
  gelf:
    module: output-gelf
    host: localhost
    # graylog port (default: 12201)
    port: 12201
    # compression 'gzip' or 'deflate' (default: 'deflate')
    compressType: deflate
    # size of chunked messages in bytes (default: 1240)
    chunkSize: 1024

```

Start logagent

```
cat test.log | logagent --config stdout.yaml
```

### Simple server to check data

```
var gelfserver = require('graygelf/server')
var server = gelfserver()
server.on('message', function (gelf) {
 
  console.log('received message', JSON.stringify(gelf))
})
server.listen(12201)
```
