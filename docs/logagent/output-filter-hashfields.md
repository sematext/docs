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
    - '/var/log/*/access.log'

# log agent parses web server logs out of the box ...
# output filter to encrypt client_ip and user field in web server logs
outputFilter:
  hashfields: 
    module: hash-fields
    # JS regeular expression to match log source name
    matchSource: !!js/regexp access.log
    # algorithms supported by nodejs crypto module, e.g. sha1, sha256, sha512, md5, ...
    algorithm: sha256
    fields:
      - client_ip
      - user
  
```

Run Logagent with your config: 

```
logagent --config logagent-example-config.yml --yaml
```
