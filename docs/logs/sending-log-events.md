title: Sending Log Events
description: Send new log events to Sematext using Elasticsearch API or syslog, and log shippers such as Vector, Logstash, Logagent, Fluentd, rsyslog, syslog-ng, Fluentbit and more

The simplest way to ship logs to Sematext is via the [Discovery](discovery/intro/) screen after the [initial setup](discovery/setup/).  Alernatively, there are many other ways to ship log events to Sematext.  Because Sematext exposes an API compatible with Elasticsearch and OpenSearch, any of the numerous log shippers or log libraries that have Elasticsearch outputs (or "adapters") can be used to ship logs.  Sematext also accepts syslogs.

  - HTTP / HTTPS (ports 80 / 443), by using the Elasticsearch API on
    **logsene-receiver.sematext.com** / **logsene-receiver.eu.sematext.com**
  - UDP / TCP / RELP / TLS, by using the syslog receiver on
    **logsene-syslog-receiver.sematext.com** / **logsene-syslog-receiver.eu.sematext.com**
  - UDP / TCP by using the socket receiver for JSON on 
    **logsene-syslog-receiver.sematext.com** / **logsene-syslog-receiver.eu.sematext.com**

All options work with log shippers such as
[Logstash](logstash),
[Logagent](/logagent),
[Fluentd](https://github.com/uken/fluent-plugin-elasticsearch),
[rsyslog](rsyslog) or
[syslog-ng](syslog-ng)... and many, many more.  Instructions for a lot more log shipping methods are inside Sematext Cloud itself.

Additionally, you can always write your own application or script that works with
[Elasticsearch](index-events-via-elasticsearch-api) or syslog or any other tool that can send data to
[Sematext's Elasticsearch API](index-events-via-elasticsearch-api).
