title: Install Logagent
description: Logagent, Sematext log shipper and Logstash alternative, is available as node.js npm package for Linux, Mac and Windows. It has automatic Systemd or Upstart service scripts installation and seamless logging system service integration with our logs management and analysis platform

## Installation for Linux & Mac OS X

### Install Node.js 

Official Node.js [downloads and instructions](https://nodejs.org/en/download/).
E.g. for Debian/Ubuntu:
``` bash
curl -sL https://deb.nodesource.com/setup_8.x | sudo -E bash -
sudo apt-get install -y nodejs
```

### Install Logagent npm package
``` bash
sudo npm i -g @sematext/logagent 
```

### Install service (Linux, Mac OS X)

1. Get a free account at [sematext.com](https://apps.sematext.com/ui/registration)

2. [create a Logsene App](https://apps.sematext.com/ui/integrations) to obtain an App Token for [Logsene](http://www.sematext.com/logsene/), Sematext logs management and analysis system

3. Install Logagent as system service

Logagent detects the init system and installs Systemd or Upstart service scripts. 
On Mac OSX it creates a Launchd service. Simply run:

``` bash
  # Install logagent package globally 
  sudo npm i -g @sematext/logagent
  sudo logagent-setup -i LOGSENE_TOKEN
  # for EU region: 
  # sudo logagent-setup -i LOGSENE_TOKEN -u logsene-receiver.eu.sematext.com
  # for local Elasticsearch
  # sudo logagent-setup -i indexName -u http://localhost:9200
```

The setup script generates the configuraton file in ```/etc/sematext/logagent.conf```.
The default settings ship all logs from ```/var/log/**/*.log``` to Logsene. 

Location of service scripts:

- upstart: /etc/init/logagent.conf
- systemd: /etc/systemd/system/logagent.service
- launchd: /Library/LaunchDaemons/com.sematext.logagent.plist

Start/stop service: 

- upstart: ```service logagent stop/start```
- systemd: ```systemctl stop/start logagent```
- launchd: ```launchctl start/stop com.sematext.logagent```

