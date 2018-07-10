title: JSON
description: Sending JSON messages via TCP syslog to Sematext log management application

Our cloud based SaaS / On-premises logging as a service platform can receive JSON messages from any application, as long as they they contain a valid token. The destination host is **logsene-receiver-syslog.sematext.com** / **logsene-receiver-syslog.eu.sematext.com** (if using Sematext Cloud Europe) and the port we use is 12201, both UDP and TCP.

## Example

A quick way to ship messages via TCP syslog is with
netcat:

``` bash
echo '{"logsene-app-token":"LOGSENE_APP_TOKEN_GOES_HERE", "message":"Hello, Logsene!"}' | nc logsene-receiver-syslog.sematext.com 12201
```
