title: Sematext Logagent Integration
description: Logagent can be used to send logs to Sematext monitoring and logging platform. Parse logs with grok filter, tag specific events, aggregate and index data and metrics from different sources


Sending logs to a [Sematext Logs App](https://sematext.com/logsene/) with [Logagent](https://sematext.com/logagent/) is configured by using the Elasticsearch module in the output configuration, and setting the `LOGS_TOKEN` as the index.

### Tailing Log Files
To send the contents of all log files in the `/var/log/` directory, you'd configure Logagent like this:

```yaml hl_lines="17 18 19"
# /etc/sematext/logagent.conf

# Global options
options:
  # print stats every 60 seconds 
  printStats: 60
  # don't write parsed logs to stdout
  suppress: true
  diskBufferDir: /tmp/sematext-logagent

input:
  files:
    - '/var/log/**/*.log'

output:
  sematext:
    module: elasticsearch
    url: https://logsene-receiver.sematext.com
    index: <LOGS_TOKEN>
```

To get started, first install Logagent and run the `logagent-setup` CLI command, where you replace `<LOGS_TOKEN>` with your Sematext Logs App token.

```bash
sudo npm i -g @sematext/logagent
sudo logagent-setup -i <LOGS_TOKEN>
```

This will do two things. First, generate a YAML configuration file in the `/etc/sematext/` directory called `logagent.conf`. But also create a system service for Logagent and run the log shipper.

Read more about Logagent in the [docs here](../logagent).