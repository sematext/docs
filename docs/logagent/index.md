Title: Sematext Logagent Log Shipper
Description: Logagent is lightweight log shipper, filebeat, fluentd or rsyslog alternative with out of the box and extensible log parsing, on-disk buffering, secure transport, bulk indexing to Elasticsearch, Kafka, and Sematext

![Logagent Logo](https://camo.githubusercontent.com/67b5c3e09a309fc8551d2b1752531c5adf0c510b/68747470733a2f2f73656d61746578742e636f6d2f77702d636f6e74656e742f75706c6f6164732f323031362f30372f6c6f676167656e742e706e67)

## What is Logagent?
[Logagent](https://sematext.com/logagent) is a modern, open-source, lightweight **log shipper** with a low memory footprint and low CPU overhead!

It comes with out of the box and extensible **log parsing**, **on-disk buffering**, **secure transport**, and **log shipping** with **bulk indexing** to any **Elasticsearch endpoint**, including [Sematext Logs](https://sematext.com/logsene), Kafka, etc.

If you're eager to get started, here's how you start shipping logs.

```bash
# Make sure you have Node.js installed
curl -sL https://deb.nodesource.com/setup_12.x | sudo -E bash -
sudo apt-get install -y nodejs

# Install Logagent and run it as a system service
sudo npm i -g @sematext/logagent
sudo logagent-setup -i <LOGS_TOKEN or ES_INDEX>
```

To read more jump to [Installation](./installation) right away.

## Features
Logagent contains an installer when you want to use it as a [log shipper](./installation).  Configuration is done via a simple [`YAML` configuration file](./config-file). It has a library that supports **patterns for log parsing**, and it can also be used as a **command line tool**.

- [Install Logagent](./installation) with:
    - Linux Systemd
    - Linux Upstart
    - Windows service
    - Mac OS X Launchd service
    - Docker
    - Docker Swarm
    - Kubernetes
- **Log shipping** with a disk buffer ensures no loss of data
- A simple **YAML configuration file**
- Built-in **data parser** with configurable **patterns**
- **Command-line tool**
- Plugins:
    - Inputs (files, streams, sockets, databases)
    - Input filters (grep/grok filters)
    - Outputs (Elasticsearch, Sematext Cloud, Kafka, etc.)
    - Output filters (SQL aggregation of parsed data, enrichment of data)
- Node.js API

## Installation Options
- Install as a [system service](./installation)
- Run as a [Docker Container](./installation-docker) 
- [Deploy to Heroku](./installation-heroku) as Heroku Log drain
- Deployment to Cloud Foundry as Cloud Foundry Log drain (thus usable with Pivotal, IBM Bluemix, etc.)

## Configuration
After installing Logagent, run `logagent-setup` to create a system service and start shipping logs right away. This will also create a simple [`YAML` configuration file](./config-file) for you in `/etc/sematext/logagent.conf`.

```yaml hl_lines="18 19 24 25 27 29 30 35"
# /etc/sematext/logagent.conf

# Global options
options:
  # print stats every 60 seconds 
  printStats: 60
  # don't write parsed logs to stdout
  suppress: true
  # Enable/disable GeoIP lookups
  # Startup of logagent might be slower when downloading the GeoIP database
  geoipEnabled: false
  # Directory to store Logagent status and temporary files
  # this is equals to LOGS_TMP_DIR env variable 
  diskBufferDir: /tmp/sematext-logagent

input:
  # a list of glob patterns to watch files to tail
  files:
    - '/var/log/**/*.log'

output:
  # index logs in Elasticsearch or Sematext Logs
  sematext: # output a name, e.g.m elasticsearch, sematext, etc.
    module: elasticsearch
    url: https://logsene-receiver.sematext.com
    # default Elasticsearch index or Sematext Logs token to use
    index: <LOGS_TOKEN or ES_INDEX>
    # indices for shipping logs to multiple locations
    indices: 
      <LOGS_TOKEN_1 or ES_INDEX_1>: 
      # list of log sources or filenames
        - syslog\.log
        - access\.log
        - auth\.log
      <LOGS_TOKEN_2 or ES_INDEX_2>: 
      # list of RegEx matching a log source or filename
        - .*wifi.*
        - .*bluetooth.*
```

## Command-line Tool
Logagent can also be **used as a command-line tool**. To use Logagent only as a command-line tool running `logagent-setup` and using the default configuration file is not needed.

- Works with **Unix pipes**, **stdin**, and **stdout**  
- **Log parser** and format converter
    - text to JSON
    - line delimited JSON or YAML
        
        <!-- language: bash -->

            cat access.log | logagent --yaml

- **Import files** into Elasticsearch

    <!-- language: bash -->

        cat access.log | logagent -n nginx -e http://localhost:9200 -i logs

- **Watch multiple log files** in the terminal
        
    <!-- language: bash -->

        logagent -yaml -g '/var/log/**/*.log'

- **Store logs** in Elasticsearch
        
    <!-- language: bash -->

        logagent -e http://localhost:9200 -i logs

## Built-in Log Parser
You can configure [custom data patterns for parsing logs](./parser).

- Log format detection and intelligent pattern matching
- The pattern library includes a set of popular log formats for databases, web servers, message queues, etc.
- Easy to extend with custom patterns and Javascript transform functions
- Hot reload of changed pattern definitions without service restart
- Auto-detection of date and numeric fields
- Masking of sensitive data with configurable hashing algorithms (SHA-1, SHA-256, SHA-512, …)
- GeoIP lookup with automatic GeoIP DB updates (Maxmind GeoIP-Lite files)

## Plugins 
A comprehensive collection of plugins for data input, processing, and output are available. See the complete list of [Logagent Plugins](./plugins).   

## API 
Logagent is an [npm package](https://www.npmjs.com/package/@sematext/logagent) and can add log parsing to Node.js applications.

## Related Packages
- [Logsene-CLI](https://github.com/sematext/logsene-cli) - Enables searching logs in Sematext Logs from the command-line 
- [Winston-Logsene](https://github.com/sematext/winston-logsene) - Logging for Node.js - Winston transport layer for Sematext Logs
