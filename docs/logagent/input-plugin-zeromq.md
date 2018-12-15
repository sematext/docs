title: Logagent input plugin for ZeroMQ
description: Logagent features modular logging architecture framework where each input or output module is implemented as a plugin. Plugin is available as node.js npm package and acts as messages consumer using ZeroMQ supporting three types of messaging patterns, namely Publish-subscribe, Request-response and fire-and-forget some times called pipeline.

## Logagent Plugin: ZeroMQ

Input plugin for [@sematext/logagent](http://sematext.com/logagent/). The plugin acts as messages consumer using ZeroMQ.

Input plugins support three types of messaging patterns:
 
1. Publish-subscribe
2. Request-response
3. fire-and-forget some times called pipeline


At the moment plugin is not able to configure socket parameter, by default fire-and-forget patter has configured by default **linger** to 500 and **connect_timeout** to 2500 ms

## Installation 

Install [@sematext/logagent](https://www.npmjs.com/package/@sematext/logagent) and [logagent-input-zeromq](https://www.npmjs.com/package/logagent-input-zeromq) npm package: 

```
npm i -g @sematext/logagent 
npm i -g logagent-input-zeromq
```
 
### Configuration

```yaml

# Global options
options:
  includeOriginalLine: false

input:
  zeromq: 
    module: input-zeromq
    host: 127.0.0.1
    port_zmq: 3000
    # for Fire-and-forget = 0  Request-response = 1  Publish-subscribe= 2
    pattern: 1
    topic: topic-example

output:
  stdout: ldjson # use 'pretty' for pretty json or 'yaml' 
  # elasticsearch: 
  #   module: elasticsearch
  #  url: http://localhost:9200
  #  index: test

```

Start logagent

```
logagent --config logagent-zeromq-input.yml
```
