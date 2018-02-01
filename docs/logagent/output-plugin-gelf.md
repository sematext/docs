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
