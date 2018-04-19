Title: Send data to Rtail real-time log viewer
Description: log shipper, rtail, real-time log view

## Output Plugin: rTail  

[rTail](http://rtail.org/) shows real-time logs in a browser. This plugins ships messages to rTail servers and is able to launch rTail web server. 


### Configuration

```
input: 
  files:
    - /var/log/**/*.log

output: 
 rtail:
    # rtail host to send logs to
    host: localhost
    # rtails port to send logs to 
    udpPort: 3434
    # start rtail-server with given http port and bind to hostname
    webPort: 8080
    webHost: localhost
```

Start logagent

```
logagent --config rtail.yaml
```

### Command-line usage with rTail options

Ship logs to rtail and Elasticsearch to view logs in real-time in rtail and store logs in Elasticsearch

```
logagent -e http://localhost:9200 -i mylogs --rtailHost myrtailserver --rtailPort 9999 /var/log/*.log
```

Logagent can start the rtail web-server (in-process, saving memory), open browser with http://localhost:8080
```
# logagent has no dependency to rtail, to keep the package small
logagent -s -e http://localhost:9200 -i mylogs --rtailWebPort 8080 --rtailPort 9999 /var/log/*.log
```
