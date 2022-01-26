title: Sematext Syslog Integration
description: Send syslog messages from any application to Sematext log management app. Token and IP based authorization for shipping logs over TCP/UDP/RELP

Sematext centralized monitoring and logging solution supports receiving syslog messages from any application, as long as
they comply to either [RFC-3164](https://tools.ietf.org/html/rfc3164) or
[RFC-5424](https://tools.ietf.org/html/rfc5424) (and
[RFC-5425](https://tools.ietf.org/html/rfc5425) for TLS). The
destination host is **logsene-syslog-receiver.sematext.com** / **logsene-syslog-receiver.eu.sematext.com** (if using Sematext Cloud Europe) and ports we use are:

  - for Syslog over UDP: **514**
  - for Syslog over TCP: **514**
  - for Syslog over TLS: **10514**
  - for RELP: **20514**

## Authorization

Authorizing syslog essentially means telling Sematext Platform which Logs Management App to send logs to. We recommend you embed your Logs Management App token in your syslog daemon's config in a [CEE-formatted JSON message](json-messages-over-syslog). Step-by-step instructions for [rsyslog](rsyslog), [syslog-ng](syslog-ng), and a raw example are below.

You can also put the Logs Management App token in the [tag](https://datatracker.ietf.org/doc/html/rfc3164#section-4.1.3) or the [APP-NAME](https://datatracker.ietf.org/doc/html/rfc5424#section-6.2.5) part of your syslog message. You'll see an example below as well.

Alternatively, [authorize your public IPs](authorizing-ips-for-syslog) and then send messages directly. Note that configuring your log shipper to send your Logs Management App token is preferred to authorizing source IPs. You can see specific instructions for [rsyslog](rsyslog), [syslog-ng](syslog-ng) and [syslogd](syslogd) for how to forward messages in this case.  

## Examples

Here's a quick way to ship messages via TCP syslog with netcat. We add the App token as a field in the message:

``` bash
echo 'my-host my-process:@cee: {"logsene-app-token": "LOGS_APP_TOKEN_GOES_HERE", "message": "hello world!"}' | nc logsene-syslog-receiver.sematext.com 514
```

If you prefer to add the token as a syslog tag:

``` bash
echo 'my-host LOGS_APP_TOKEN_GOES_HERE:hello world!' | nc logsene-syslog-receiver.sematext.com 514
```

To upload each line of `file.txt`:

``` bash
cat file.txt | while read -r LINE; do echo "my-host LOGS_APP_TOKEN_GOES_HERE:$LINE"; done | nc logsene-syslog-receiver.sematext.com 514
```

Note that the above will ship every line in the file as the `message` field. It will not parse the lines, for example if you have a timestamp (the `@timestamp` field will be populated with the time of the upload). Have a look at [logs discovery](discovery/intro) and [pipelines](pipelines) for more details on parsing.

## Ways to Ship Logs

In production, you're probably going to use a syslog daemon. Details on configuring syslog daemons to send logs over TCP/UDP/RELP are below:

  - [rsyslog](rsyslog)
  - [syslog-ng](syslog-ng)
  - [traditional syslogd](syslogd)

### TLS Encryption

In addition to TCP, UDP and RELP, our Logs Management App also supports RFC-5425 compliant Syslog over TLS. See instructions for [rsyslog](rsyslog) and [syslog-ng](syslog-ng) on how to configure them.

### HTTP or HTTPS

If you use a recent version of rsyslog (6.4.0 or later), you might want to send logs directly to [Sematext's Logs Management Elasticsearch API](index-events-via-elasticsearch-api), through the [omelasticsearch module](http://www.rsyslog.com/doc/omelasticsearch.html). Details on how
to do that are on the [rsyslog how to page](rsyslog).
