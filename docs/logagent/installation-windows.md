title: Installing Logagent on Windows
description: Logagent, Sematext log shipper and Logstash alternative, is available as node.js npm package for Linux, Mac, and Windows. It has automatic Systemd or Upstart service scripts installation and seamless logging system service integration with our logs management and analysis platform

## Installation on Windows

1. Download nodejs from [nodejs.org](https://nodejs.org/en/download/) and install it

2. Install Logagent and Windows event plugin
  ``` bash
  npm i -g @sematext/logagent
  npm i -g node-windows
  npm i -g logagent-input-windows-events
  # run logagent windows version
  logagent-windows --help
  ```

3. Optional service installer

Create a configuration file for Logagent in
```
%ProgramData%\Sematext\logagent.conf
```
(default: c:\ProgramData\sematext\logagent.conf)

In case you want to store the configuration file in a different directory, enter the new location in the registry:

```
HKEY_LOCAL_MACHINE\System\CurrentControlSet\Control\Session Manager\Environment\LOGAGENT_CONFIG
```

Example config file to collect Windows events to Elasticsearch:

```yaml
options:
  includeOriginalLine: false
  suppress: true

input:
  windowsEvent:
    module: logagent-input-windows-events
    # query events every 10 seconds
    interval: 10
    maxEvents: 1000

output:
  local-es:
    module: elasticsearch
    url: http://localhost:9200
    index: windows_events
```

If you're using [Sematext Logs](https://sematext.com/logsene/), the output would be:

```yaml
output:
  sematext:
    module: elasticsearch
    url: https://logsene-receiver.sematext.com
    # for the EU datacenter, it's https://logsene-receiver.eu.sematext.com
    index: LOGSENE-APP-TOKEN-GOES-HERE
```

Run service installer:


```
logagent-windows -install
```

To uninstall the service run

```
logagent-windows -uninstall
```
