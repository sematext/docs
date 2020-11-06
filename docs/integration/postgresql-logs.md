title: PostgreSQL Logs Integration
description: Sematext PostgreSQL Logs integration allows you to dive deeper into statement duration breakdown, as well as users accessing the databases

To make use of the Sematext PostgreSQL Logs integration, you'll need to send parsed PostgreSQL logs to your Sematext Logs App. The easiest way is via [Logagent](../logagent/index.md), which can parse PostgreSQL logs out of the box.

Once data is in, you can explore it via the built-in reports: 

<img
  class="content-modal-image"
  alt="PostgreSQL Logs Overview"
  src="../../images/agents/postgresql_overview.png"
  title="PostgreSQL Logs Overview"
/>

Be sure to check out the [PostgreSQL Monitoring integration](./postgresql.md) as well, to get a complete view on PostgreSQL. For example, if you notice expensive queries in the logs, monitoring can tell you whether they hit the indices or they were mostly scans.

## Setting up Logagent

With [Node.js installed](https://nodejs.org/en/download/package-manager/), you'd first need to install Logagent:
```bash
sudo npm i -g @sematext/logagent
```

Then, write a config file that tails your PostgreSQL logs and sends them to your PostgreSQL Logs App. Parsing happens out of the box, since we match the `postgres` source:
```
# Global options
options:
  # print stats every 60 seconds 
  printStats: 60
  # don't write parsed logs to stdout
  suppress: true

input:
  files:
    - /var/log/postgresql/postgresql-*-main.log

output:
  elasticsearch:
    module: elasticsearch
    # use logsene-receiver.eu.sematext.com for the EU region
    url: https://logsene-receiver.sematext.com
    indices:
      # send PostgreSQL logs to this Logs App
      YOUR_LOGS_TOKEN_GOES_HERE:
        - .*postgres.*\.log
```

Finally, use `logagent-setup` to copy the config to `/etc/sematext/logagent.conf`, then set up the init script and start Logagent:
```bash
sudo logagent-setup -c /path/to/logagent.conf
```

If you already have Logagent installed, you can simply append to the `files` input the PostgreSQL log file, then the two lines (token+pattern) in the `elasticsearch` output. In the end, restart Logagent.

## Exploring logs

Once data is in, you can explore it using the built-in reports or create your own. For example, you can use the Statement Duration report to check on your queries:

<img
  class="content-modal-image"
  alt="PostgreSQL Statement Duration Report"
  src="../../images/agents/postgresql_statement.png"
  title="PostgreSQL Statement Duration Report"
/>

## Troubleshooting

If you have trouble sending logs, try out the latest version of Logagent via `sudo npm i -g @sematext/logagent`. Also, make sure Logagent is pointed to the right path and Logs App token.

If logs don't get parsed properly, or you need additional parsing, feel free to open an issue or to contribute to [Logagent built-in patterns](https://github.com/sematext/logagent-js/blob/master/patterns.yml). These patterns are open-source, as well as Logagent itself.