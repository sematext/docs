title: Installing Logagent on Mac
description: Logagent, Sematext log shipper and Logstash alternative, is available as node.js npm package for Linux, Mac, and Windows. It has automatic Systemd or Upstart service scripts installation and seamless logging system service integration with our logs management and analysis platform

### Install Node.js 

Here are the official Node.js [downloads and instructions](https://nodejs.org/en/download/).

### Install the Logagent npm package

``` bash
sudo npm i -g @sematext/logagent 
```

### Run Logagent and ship logs

#### 1. Register for a free account at [Sematext.com](https://apps.sematext.com/ui/registration)

#### 2. [Create a Logs App](https://apps.sematext.com/ui/integrations) to get a Logs Token for [Sematext Logs](http://www.sematext.com/logsene/)

#### 3. Run Logagent as System Service

Logagent detects the init system and installs Launchd service scripts.

- *Ship logs to default US region*
    <!-- language: bash -->
        
        sudo logagent-setup -i LOGS_TOKEN

- *Ship logs to EU region*
    <!-- language: bash -->
        
        sudo logagent-setup -i LOGS_TOKEN -u logsene-receiver.eu.sematext.com

- *Ship logs to local Elasticsearch*
    <!-- language: bash -->
        
        sudo logagent-setup -i index -u http://localhost:9200

Changing the Elasticsearch `index` and `endpoint` let's you ship logs to any Elasticsearch cluster. After running `logagent-setup` the agent will start shipping logs immediately.

##### Location of service scripts
- Launchd: ```launchctl start/stop com.sematext.logagent```

##### Check service status
- Launchd: ```launchctl start/stop com.sematext.logagent```

##### Start/stop service
- Launchd: ```launchctl start/stop com.sematext.logagent```

#### 4. Configure Logagent settings
The setup script generates the configuration file in `/etc/sematext/logagent.conf`. The default settings will ship all log files from the `/var/log` directory to Sematext Cloud. [Here's the configuration guide](./config-file).

