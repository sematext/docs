You can send structured logs via syslog by putting a JSON within the
message part of your log, according to the [CEE](http://cee.mitre.org/)
standard. For example, to do a quick test via
    netcat:

    $ echo 'my-host my-process[1234]:@cee: {"logsene-app-token":"LOGSENE_APP_TOKEN_GOES_HERE", "hello":"world"}' | nc logsene-receiver-syslog.sematext.com 514

If you have your [rsyslog](rsyslog.html),
 [syslog-ng](syslog-ng.html) or
[syslogd](syslogd.html) daemon already set up to send logs to
your application, all you need to do is to make your structured messages
comply to CEE. For
    example:

    $ logger '@cee: {"logsene-app-token":"LOGSENE_APP_TOKEN_GOES_HERE", "hello":"world"}'

## How it works

The only special thing here is to begin your message with a "CEE cookie"
that says "@cee:". Optionally, the cookie can be followed by a
whitespace. Then, insert a JSON with fields and values of your choice,
although CEE and [Project
Lumberjack](https://fedorahosted.org/lumberjack/) suggest a [list of
standard fields](https://fedorahosted.org/lumberjack/wiki/FieldList)
which should have the same name across applications.

We'll parse your JSON and index it, along with the following fields from
your log:

  - **timestamp**. Normally specified by your syslog daemon or the
    application logging to it. If it's not specified, like in the netcat
    example above, we'll set it to the time when it arrived to us
  - **hostname**. It's the *my-host* string in the netcat example above.
    Normally, the syslog daemon provides your host name automatically
  - **severity**. Normally specified by your syslog daemon. If it's not
    specified, like in the netcat example above, it will be *notice*
  - **facility**. Normally specified by your syslog daemon. If it's not
    specified, like in the netcat example above, it will be *user*
  - **syslog-tag**. It's the *my-process\[1234\]:* string in the netcat
    example above. Otherwise, the application provides it to the syslog
    daemon. For example, with logger, your tag will be "logger:"
  - **source**. It's the part of the syslog tag without the optional PID
    and the characters that surround it (*my-process* in the example
    above), and it's useful for filtering only logs from the same source

So the log above will appear similar to this (pretty-printed):

    {
      "@timestamp":"2012-12-03T11:42:54.644758+01:00",
      "host":"my-host",
      "severity":"notice",
      "facility":"user",
      "syslog-tag":"my-process:",
      "source":"my-process:",
      "logsene-app-token":"LOGSENE_APP_TOKEN_GOES_HERE",
      "hello": "world" 
    }

## How do I specify a timestamp, severity and facility via netcat?

In the previous netcat example, only the minimum fields are specified: a
host name, a tag, and a message. But you can add those by putting a
string that complies to
[RFC-3164](https://www.rfc-editor.org/rfc/rfc3164.txt). The timestamp
field can also be a standard, high-precision, RFC-3339 timestamp. For
example, let's say you want Severity to be Critical and Facility to be
User:

    echo "<10>2013-08-29T13:41:03.152+03:00 my-host my-process:@cee: {"logsene-app-token":"LOGSENE_APP_TOKEN_GOES_HERE", "message":"this is a test message"} | nc logsene-receiver-syslog.sematext.com 514

