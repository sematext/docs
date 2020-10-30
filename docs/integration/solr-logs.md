title: Solr Logs Integration
description: Solr RabbitMQ Logs integration allows you to check query distribution, analyze errors, Zookeeper and Overseer logs and much more.

To make use of the Sematext Solr Logs integration, you'll need to send parsed Solr logs to your Sematext Logs App. The easiest way is via [Logagent](../logagent/index.md), which can parse Solr logs out of the box.

Once data is in, you can explore it via the built-in reports: 

<img
  class="content-modal-image"
  alt="Solr Logs Overview"
  src="../../images/agents/solr_logs_overview.png"
  title="Solr Logs Overview"
/>

Be sure to check out the [Solr Monitoring integration](./solr.md) as well, to get a complete view on Solr. For example, if you see logs of a node restarting, metrics let you see the impact on the rest of the cluster in terms of CPU, GC, and other metrics. Including query time metrics, even if you don't collect logs from [all] queries.

## Setting up Logagent

With [Node.js installed](https://nodejs.org/en/download/package-manager/), you'd first need to install Logagent:
```bash
sudo npm i -g @sematext/logagent
```

Then, write a config file that tails your Solr logs and sends them to your Solr Logs App. Parsing happens out of the box, since we match the `solr` source:
```
# Global options
options:
  # print stats every 60 seconds 
  printStats: 60
  # don't write parsed logs to stdout
  suppress: true

input:
  files:
    - /var/solr/logs/solr.log

output:
  elasticsearch:
    module: elasticsearch
    # use logsene-receiver.eu.sematext.com for the EU region
    url: https://logsene-receiver.sematext.com
    indices:
      # send Solr logs to this Logs App
      YOUR_LOGS_TOKEN_GOES_HERE:
        - .*solr.*\.log
```

Finally, use `logagent-setup` to copy the config to `/etc/sematext/logagent.conf`, then set up the init script and start Logagent:
```bash
sudo logagent-setup -c /path/to/logagent.conf
```

If you already have Logagent installed, you can simply append to the `files` input the Solr log file, then the two lines (token+pattern) in the `elasticsearch` output. In the end, restart Logagent. And no, `elasticsearch` there is not a typo, it's just that Sematext Logs [exposes the Elasicsearch API](../logs/index-events-via-elasticsearch-api.md) 😊.

## Exploring logs

Once data is in, you can explore it using the built-in reports or create your own. For example, you can use the Queries report to see a breakdown of your queries and "zoom in" to the ones you're interested in:

<img
  class="content-modal-image"
  alt="Solr Queries Report"
  src="../../images/agents/solr_logs_hits.png"
  title="Solr Queries Report"
/>

Other built-in reports include:

- **Errors**: breakdown of what's wrong: which nodes/classes/collections/etc generate errors
- **Zookeeper**: logs produced by Solr's [Zookeeper](http://zookeeper.apache.org) client and other Zookeeper-related classes and threads. Look here for insights on SolrCloud's stability. For the Zookeeper ensemble itself, check out our [Zookeeper monitoring integration](./zookeeper.md)
- **Overseer**: logs produced by SolrCloud's [Overseer](https://lucene.apache.org/solr/8_6_0/solr-core/org/apache/solr/cloud/Overseer.html) thread and other Overseer activities (e.g. shard leader election)
- **Start & Stop**: startup-related and shutdown-related logs. Look here if a node went down unexpectedly or doesn't show up in the cluster when started

## Troubleshooting

If you have trouble sending logs, try out the latest version of Logagent via `sudo npm i -g @sematext/logagent`. Also, make sure Logagent is pointed to the right path and Logs App token.

If logs don't get parsed properly, or you need additional parsing, feel free to open an issue or to contribute to [Logagent built-in patterns](https://github.com/sematext/logagent-js/blob/master/patterns.yml). These patterns are open-source, as well as Logagent itself.