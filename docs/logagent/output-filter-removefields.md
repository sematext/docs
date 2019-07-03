Title: Remove fields from logs 
Description: GDPR, log anonymizer, reduce log volume


## Output filter: remove-fields

This plugin removes fields before sending them to the output destination. Alternatively, instead of completely removing fields and their values completely, this plugin can replace all occurrences of the original field values with string `!REMOVED!`. To mask field values instead of removing them set the `maskValuesInMessageField` flag to `true`. 

In the context of data protection regulations like GDPR you might need to mask data fields, especially when you hand over log data to third parties. 


### Configuration 

Add the following 'outputFilter' section to the Logagent configuration file. Note that you can use the plugin with multiple configurations for different event sources. 

```yaml
# tail web server logs
input: 
  files:
    - '/var/log/*/access_log'

# log agent parses web server logs out of the box ...
# output filter to encrypt client_ip and user field in web server logs
outputFilter:
  ip-truncate-fields:
    module: remove-fields
    # JS regeular expression to match log source name
    matchSource: !!js/regexp access_log
    maskValuesInMessageField: true
    fields:
      - client_ip
      - user
  
```

Run Logagent with your config: 

```
logagent --config logagent-example-config.yml -n httpd --yaml
```

The output does not contain client_ip and user fields: 

```
logSource:    httpd
_type:        access_common
remote_id:    -
method:       GET
path:         /
http_version: HTTP/1.1
status_code:  304
size:         0
@timestamp:   Thu Apr 26 2018 22:02:26 GMT+0200 (CEST)
```
