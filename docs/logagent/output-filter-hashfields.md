title: Hash log content 
description: Hash-fields plugin for Logagent replaces field values with its hash code. Use hash-fields log anonymizer to ensure GDPR compliance for masking data fields with strong hash functions (sha256, sha512), and you can also use the same values for log analytics with our logging management tools

## Output filter: hash-fields

This plugin replaces field values with its hash code. All occurrences of the original field value are replaced in the log "message" field with the hash code. 

In the context of data protection regulations like GDPR you might need to mask data fields, especially when you handover log data to 3rd parties. 

Using strong hash functions (sha256, sha512) the orginal field value can't be recovered. Nevertheless hashed values can be used for log analytics, e.g. to see a value distribution or count unique values. 


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
  hashFields: 
    module: hash-fields
    # JS regular expression to match log source name
    matchSource: !!js/regexp access_log
    # algorithms supported by nodejs crypto module, 
    # e.g. sha1, sha256, sha512, md5, ...
    algorithm: sha256
    fields:
      - client_ip

```

Run Logagent with your config: 

```
logagent --config logagent-example-config.yml -n httpd --yaml
```

The output in YAML format shows the hased IP address in the field client_ip: 

```
logSource:    httpd
_type:        access_common
client_ip:    eff8e7ca506627fe15dda5e0e512fcaad70b6d520f37cc76597fdb4f2d83a1a3
remote_id:    -
user:         -
method:       GET
path:         /
http_version: HTTP/1.1
status_code:  304
size:         0
@timestamp:   Thu Apr 26 2018 22:02:26 GMT+0200 (CEST)
```


