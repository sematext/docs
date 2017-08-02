To send new events to your Logsene application, you have two ways to
connect:

  - HTTP / HTTPS, by using the Elasticsearch API on
    **logsene-receiver.sematext.com**
  - UDP / TCP / RELP / TLS, by using the syslog receiver on
    **logsene-receiver-syslog.sematext.com**
  - UDP / TCP by using the socket receiver for JSON
    on **logsene-receiver-syslog.sematext.com**

Both options work with existing applications, such as
[Logstash](Logstash),
[Fluentd](https://github.com/uken/fluent-plugin-elasticsearch),
[rsyslog](rsyslog) or
[syslog-ng](syslog-ng). And you can always write your own
application or script that works with
[Elasticsearch](Index-Events-via-Elasticsearch-API) or
syslog or Apache Flume or really any other tool that can send data to
[Logsene's Elasticsearch
API](Index-Events-via-Elasticsearch-API).

**To see more details on a specific option, click on one of the child
pages below.**

