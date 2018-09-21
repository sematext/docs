title: Send data to ZeroMQ
description: Logagent message consumer plugin to ZeroMQ. Logagent is light-weight log shipper, filebeat, fluentd or rsyslog alternative with out of the box and extensible log parsing, on-disk buffering, secure transport, bulk indexing to Elasticsearch and Sematext logs management platform


log shipper, 0mq, zeromq, logging pipeline

## Logagent Plugin: ZeroMQ

Output plugin for [@sematext/logagent](http://sematext.com/logagent/). The plugin acts as message consumer using ZeroMQ.

Output plugins support three types of messaging patterns
 
 * Publish-subscripe
 * Request-response
 * fire-and-forget some times called pipeline
 

## Installation 

Install [@sematext/logagent](https://www.npmjs.com/package/@sematext/logagent) and [logagent-output-zeromq](https://www.npmjs.com/package/logagent-output-zeromq) npm package: 

```
npm i -g @sematext/logagent 
npm i -g logagent-output-zeromq
```
 
### Configuration

```
# Global options
options:
  includeOriginalLine: false

input:
  stdin: true

output:
  zeromq: 
    module: output-zeromq
    host: 127.0.0.1
    port_zmq: 3000
    # for Publish-subscribe = 0  Request-response = 1  Publish-subscribe= 2
    pattern: 1
    topic: topic-example

```

Start logagent

```
logagent --config logagent-zeromq-output.yml
```
