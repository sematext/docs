To send new events to your Logsene app, you have two ways to
connect - using Elasticsearch API or using syslog.

  - HTTP / HTTPS (ports 80 / 443), by using the Elasticsearch API on
    **logsene-receiver.sematext.com** / **logsene-receiver.eu.sematext.com**
  - UDP / TCP / RELP / TLS, by using the syslog receiver on
    **logsene-receiver-syslog.sematext.com** / **logsene-receiver-syslog.eu.sematext.com**
  - UDP / TCP by using the socket receiver for JSON
    on **logsene-receiver-syslog.sematext.com** / **logsene-receiver-syslog.eu.sematext.com**

All options work with log shippers such as
[Logstash](logstash),
[Logagent](/logagent),
[Fluentd](https://github.com/uken/fluent-plugin-elasticsearch),
[rsyslog](rsyslog) or
[syslog-ng](syslog-ng). And you can always write your own
application or script that works with
[Elasticsearch](index-events-via-elasticsearch-api) or
syslog or Apache Flume or really any other tool that can send data to
[Logsene's Elasticsearch API](index-events-via-elasticsearch-api).
