Title: Receive Apple iPhone positions 

## Input plugin: logagent-apple-location

[Logagent](https://sematext.com/logagent) plugin to track the GPS position of Apple devices using the find-my-iphone API. 


## Install Logagent & plugin

```
npm i -g @sematext/logagent
npm i -g logagent-apple-location
```

## Configuration 

```yaml

input: 
  track-apple-devices: 
    module: logagent-apple-location
    # Your Apple ID (e-mail address)
    # Instead of adding Apple-ID to this config you could set env. variable APPLE_ID
    appleId: your-apple-id@icloud.com 
    # Instead of adding iCloud password to this config you could set env. variable APPLE_PW
    applePassword: your-apple-password
    # Note locating phones might consume more energy on the devices  
    # Query Apple API every N minutes. The minimum value is 1 minute.
    interval: 10 
    # Regular expressions to filter devices by device.name or device.deviceDisplayName
    # blacklist - ignore devices matching following regular expression, case sensitive
    ignoreDeviceName: 'iPhone.4'
    # whitelist - track only devices matching following regular expression
    filterDeviceName: 'iPhone.6'
    # verbose output to console for filter matching
    debug: true

output: 
  stdout: yaml
  sematext-cloud: 
    module: elasticsearch
    url: https://logsene-receiver.sematext.com
    index: YOUR_LOGSENE_TOKEN

```

## Run Logagent

```
logagent --config apple-location.yml
```
