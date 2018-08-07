title: Sematext Syslogd Integration
description: Ship your logs to Sematext centralized monitoring and logging plafrom with syslogd via UDP. 

With plain syslogd, you can send logs to Sematext Logs Management App via UDP if you add this
line to your **/etc/syslog.conf**:

``` bash
*.* @logsene-receiver-syslog.sematext.com
```

Before you restart syslogd, **[register your public IP](authorizing-ips-for-syslog).** If you're behind a NAT
or registering IPs doesn't suit your use-case, there are other options:

  - if you just want to test sending a few logs to Logs Management App, you can use
    your application token in a [CEE-formatted JSON message](json-messages-over-syslog). For
example:

<!-- end list -->

``` bash
logger '@cee: {"logsene-app-token": "LOGSENE_APP_TOKEN_GOES_HERE", "message": "hello world!"}'
```

  - change your syslog daemon from syslogd to
    [rsyslog](rsyslog) or
    [syslog-ng](syslog-ng) or anything else that lets you
    format your messages, so you can build a JSON containing your
    Logs Management application token like the one above
  - similar to the solution above, you can use a separate machine for
    consolidating your logs, where you'd install rsyslog or syslog-ng.
    Configure that machine to send logs to Logs Management App, and configure your
    syslogd to send logs to your logs to your "central"
    rsyslog/syslog-ng via UDP:

<!-- end list -->

``` bash
*.* @central-syslog-server
```

If your central machine is running syslog-ng, you'll have to add an
[udp() option](http://www.balabit.com/sites/default/files/documents/syslog-ng-ose-3.3-guides/en/syslog-ng-ose-v3.3-guide-admin-en/html/reference_source_tcpudp.html)
to your [source() statement](syslog-ng/#configure-sources)
in **/etc/syslog-ng/syslog-ng.conf**:

``` bash
udp()
```

If your central machine is running rsyslog, you'll have to load the [UDP input module](http://www.rsyslog.com/doc/imudp.html) and run it on the
standard **port 514**:

``` bash
$ModLoad imudp
$UDPServerRun 514
```
