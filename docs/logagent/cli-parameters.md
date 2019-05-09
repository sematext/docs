title: Logagent Command-line Parameters
description: Command Line Parameters for Logagent, light-weight log shipper with out of the box and extensible log parsing, on-disk buffering, secure transport, bulk indexing to Elasticsearch and Sematext logs management platform. Low memory footprint and low CPU overhead make it suitable for deploying on edge nodes and devices, while its ability to parse and structure logs makes it a great Logstash alternative.

```bash
# Parse all logs and stream them to Sematext Logs 1-Click managed Elasticsearch 
$ logagent -i LOGSENE_TOKEN /var/log/*.log 

# stream logs to local Elasticsearch
$ logagent -e http://localhost:9200 -i myindex /var/log/*.log 

# Act as Syslog server on UDP and forward messages to Sematext Logs
$ logagent -u 514 -i LOGSENE_TOKEN  

# Act as Syslog server on UDP and write YAML formatted messages to console
$ logagent -u 514 -y  
```

Use a [glob](https://www.npmjs.com/package/glob) pattern to build the file list 

```bash
$ logagent -i LOGSENE_TOKEN -g '/var/log/**/*.log'
# pass multiple glob patterns
$ logagent -i LOGSENE_TOKEN -g '{/var/log/*.log,/opt/myapp/*.log}'
```

Watch selective log output on console by passing logs via stdin and format in YAML

```bash
$ tail -f /var/log/access.log | logagent -y -n httpd
$ tail -f /var/log/system.log | logagent -f my_own_patterns.yml  -y 
```

## Command Line Parameters 

```bash
$ logagent [options] [file list]
```


| Options     | Description |
|-------------|-------------|
| __General options__ | |
| `-h, --help` | output Logagent help |
| `-V, --version` | output Logagent version |
| `-v, --verbose` | output activity report every minute |
| `--config <configFileName>` | path to Logagent config file (see below) |
| `--geoipEnabled <value> `| true/false to enable/disable geoip lookups in patterns. |
| `--diskBufferDir  path`| directory to store status and buffered logs (during network outage) |
| `--includeOriginalLine` | includes the original message in parsed logs |
| `-f, --file <patternFile>` | file with pattern definitions, use multiple -f options for multiple files| 
| `-s, --suppress` | silent, print no logs to stdout; print only stats on exit |
| `--printStats` | print processing stats in the given interval in seconds, e.g. ```--print_stats 30``` to stderr. Useful with -s to see Logagent activity on the console without printing the parsed logs to stdout.|
| __Log input options__| |
| `--stdin` | read from stdin, default if no other input like files or UDP are set|
| list of files | Every argument after the options list is interpreted as a file name. All files in the file list (e.g. /var/log/*.log) are watched by [tail-forever](https://www.npmjs.com/package/tail-forever) starting at end of file|
| `-g glob-pattern` | use a [glob](https://www.npmjs.com/package/glob) pattern to watch log files e.g. ```-g "{/var/log/*.log,/Users/stefan/myapp/*.log}"```. The complete glob expression must be quoted to avoid interpretation of special characters by the Linux shell. |
| `--tailStartPosition bytes` | -1 to tail from end of file, >=0 to start from the given position (in bytes).  This setting applies to new files without their read position saved (see --logsene-tmp-dir)|
| `-n name` | name for the log source only when stdin is used, important to make multi-line patterns working on stdin because the status is tracked by the log source name| 
| `-u <port>` | starts a syslogd UDP listener on the given port to act as syslogd |
| `--journald <port>` | starts http server to receive logs from systemd-journal-upload.service |
| `--docker <docker-socket>` | collect docker logs e.g. `--docker /var/run/docker.sock` |
| `--dockerEvents` | collects Docker events from /var/run/docker.sock	|
| `--k8sEvents` | collects Kubernetes events from Kubernetes API. Detects automatically kubectl or in-cluster config for API access | 
| `--k8sContainerd` | enable Kubernetes containerd input-filter plugin to parse containerd logs from /var/log/pods | 
| `--heroku <port>` | listens for Heroku logs (http drain / framed syslog over http) |
| `--cfhttp <port>` | listens for Cloud Foundry logs (syslog over http)|
| __Output options__ | |
| __standard output stream__ | combine Logagent with any Unix tool via pipes |
| `-y, --yaml` | prints parsed messages in YAML format to stdout|
| `-p, --pretty` | prints parsed messages in pretty JSON format to stdout|
| `-j, --ldjson` | print parsed messages in line-delimited JSON format to stdout |
| __Elasticsearch / Logsene__| Log storage |
| `-e, --elasticsearchUrl <url>` | Elasticsearch URL e.g. http://localhost:9200, default `htpps://logsene-receiver.sematext.com`|
| `-t, --index <index>` | [Logs App token](http://sematext.com/logsene) to ship data to Sematext Cloud Apps or Elasticsearch index (see `--elasticsearchUrl`) |
| `--httpProxy <url>` | HTTP proxy url |
| `--httpsProxy <url>` | HTTPS proxy url |


The default output is line-delimited JSON for parsed log lines, as long as no format options like '-y' (YAML format), '-p' (pretty JSON), or '-s' (silent, no output to console) are specified. 


## Environment variables

|Variable|Description|
|--------|-----------|
|LOGS_TMP_DIR | Directory to store failed bulk requests for later retransmission.|
|LOGS_INTERVAL | Time to batch logs before a bulk request is done. Default is 10000 ms (10 seconds)|
|LOGS_BULK_SIZE | Maximum size of a bulk request. Default is 1000.|
|LOGS_RECEIVER_URL | URL for the Logsene receiver. For a local Elasticsearch server or for Sematext Enterprise version of Logsene. Defaults to Sematext Logsene SaaS receiver https://logsene-receiver.sematext.com/_bulk. Example for Elasticsearch: ```LOGSENE_URL=http://localhost:9200/_bulk```|
|HTTPS_PROXY| Proxy URL for HTTPS endpoints, like Logsene receiver. ```export HTTPS_PROXY=http://my-proxy.example```|
|HTTP_PROXY| Proxy URL for HTTP endpoints (e.g. On-Premises or local Elasticsearch). ```export HTTP_PROXY=http://my-proxy.example```|
|LOGAGENT_CONFIG | Filename to read Logagent CLI parameters from a file, defaults to ```/etc/sematext/logagent.conf`` |
|PATTERN_MATCHING_ENABLED | Default is 'true'. The value 'false' disables parsing of logs. |
|SCAN_ALL_PATTERNS | Default is 'false'. For performance reasons, patterns are matched by source name. Setting the value to 'true' enables pattern search regardless of source name |
