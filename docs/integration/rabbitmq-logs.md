title: RabbitMQ Logs Integration
description: Sematext RabbitMQ Logs integration allows you to troubleshoot connection, access, and other RabbitMQ issues.

To make use of the Sematext RabbitMQ Logs integration, you'll need to send parsed RabbitMQ logs to your Sematext Logs App. The easiest way is via [Logagent](../logagent/index.md), which can parse RabbitMQ logs out of the box.

Once data is in, you can explore it via the built-in reports: 

<img
  class="content-modal-image"
  alt="RabbitMQ Logs Overview"
  src="../../images/agents/rabbitmq_overview.png"
  title="RabbitMQ Logs Overview"
/>

## Setting up Logagent

With [Node.js installed](https://nodejs.org/en/download/package-manager/), you'd first need to install Logagent:
```bash
sudo npm i -g @sematext/logagent
```

Then, write a config file that tails your RabbitMQ logs and sends them to your RabbitMQ Logs App. Parsing happens out of the box, since we match the `rabbit` source:
```
# Global options
options:
  # print stats every 60 seconds 
  printStats: 60
  # don't write parsed logs to stdout
  suppress: true

input:
  files:
    - /var/log/rabbitmq/**/*.log

output:
  elasticsearch:
    module: elasticsearch
    url: https://logsene-receiver.sematext.com
    indices:
      # send RabbitMQ logs to this Logs App
      YOUR_LOGS_TOKEN_GOES_HERE:
        - .*rabbit.*\.log
```

Finally, use `logagent-setup` to copy the config to `/etc/sematext/logagent.conf`, then set up the init script and start Logagent:
```bash
sudo logagent-setup -c /path/to/logagent.conf
```

If you already have Logagent installed, you can simply append to the `files` input the RabbitMQ log file, then the two lines (token+pattern) in the `elasticsearch` output. In the end, restart Logagent.

## Exploring logs

Once data is in, you can explore it using the built-in reports or create your own. For example, you can use the Authentication report to check on granded and denied connectioons:

<img
  class="content-modal-image"
  alt="RabbitMQ Authentication Report"
  src="../../images/agents/rabbitmq_auth.png"
  title="RabbitMQ Authentication Report"
/>

Other built-in reports include:

- **Connections**: Logs specifically about accepted and closed connections. You can see here when you have spikes in connection creation. You can also identify noisy sources, users, as well as popular destinations.
- **Start & Stop**: Logs about RabbitMQ startup and shutdown. Besides unexpected restarts, you can find info about which write-ahead logs (WALs) were recovered.

## Troubleshooting

If you have trouble sending logs, try out the latest version of Logagent via `sudo npm i -g @sematext/logagent`. Also, make sure Logagent is pointed to the right path and Logs App token.

If logs don't get parsed properly, or you need additional parsing, feel free to open an issue or to contribute to [Logagent built-in patterns](https://github.com/sematext/logagent-js/blob/master/patterns.yml). These patterns are open-source, as well as Logagent itself.