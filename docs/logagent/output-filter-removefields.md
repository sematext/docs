Title: Remove fields from logs 
Description: GDPR, log anonymizer, reduce log volume


## Output filter: remove-fields

This plugin removes fields before the output happens. All occurrences of the original field values can be replaced in the log "message" field with the string `!REMOVED!`. To mask the field values in the message field set the flag `maskValuesInMessageField` to `true`. 

In the context of data protection regulations like GDPR you might need to mask data fields, especially when you handover log data to 3rd parties. 


### Configuration 

Add the following section 'outputFilter' to the Logagent configuration file. Please note you could use the plugin with multiple configurations for different event sources. 

```yaml
# tail web server logs
input: 
  files:
    - '/var/log/*/access_log'

# log agent parses web server logs out of the box ...
# output filter to encrypt client_ip and user field in web server logs
outputFilter:
  remove-fields:
    module: remove-fields
    # JS regular expression to match log source name
    matchSource: !!js/regexp .*
    # List of fields, where the values from removed field should be
    # replaced with maskValuesString 
    maskValuesInFields:
      - message
      - client_ip
    # String to replace masked values from removed fields
    maskValuesString: "ANONYMIZED-DATA"
    fields:
      - user
      - client_ip
      
```

Run Logagent with your config: 

```
logagent --config logagent-example-config.yml -n httpd --yaml
```

The output does not contain client_ip and user field, adn optionally the user/client ip is replaced with "ANONYMIZED-DATA" in the message field: 

```
logSource:    httpd
_type:        access_common
remote_id:    -
method:       GET
path:         /user/ANONYMIZED-DATA
message:      GET /user/ANONYMIZED-DATA
http_version: HTTP/1.1
status_code:  304
size:         0
@timestamp:   Thu Apr 26 2018 22:02:26 GMT+0200 (CEST)
```
