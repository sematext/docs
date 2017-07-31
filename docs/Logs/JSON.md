# Essentials

We support receiving JSON messages from any application, as long as they
they contain a valid token. The destination host
is **logsene-receiver-syslog.sematext.com** and the port we use is
12201, both UDP and TCP.

### Example

A quick way to ship messages via TCP syslog is with
netcat:

``` syntaxhighlighter-pre
echo '{"logsene-app-token":"LOGSENE_APP_TOKEN_GOES_HERE", "message":"Hello, Logsene!"}' | nc logsene-receiver-syslog.sematext.com 12201
```

