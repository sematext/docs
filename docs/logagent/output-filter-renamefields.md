Title: Rename fields in logs 
Description: Change certain field names to use more suitable names.


## Output filter: rename-fields

This plugin renames fields before sending them to the output destination. 

### Configuration 

Add the following 'outputFilter' section to the Logagent configuration file. Note that you can use the plugin with multiple configurations for different event sources.

```yaml
# tail web server logs
input: 
  files:
    - '/var/log/*/access_log'

# log agent parses web server logs out of the box ...
# output filter to rename the user field into user_object
outputFilter:
  rename-fields:
    module: rename-fields
    # JS regular expression to match log source name,
    # in this case it matches all
    matchSource: !!js/regexp .*
    fields:
      - fieldName: user
        renameTo: user_object  
```
