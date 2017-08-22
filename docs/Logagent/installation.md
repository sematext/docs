# Install Node.js 

Official Node.js [downloads and instructions](https://nodejs.org/en/download/).
E.g. for Debian/Ubuntu:
```
curl -sL https://deb.nodesource.com/setup_4.x | sudo -E bash -
sudo apt-get install -y nodejs
```

# Install Logagent
```
sudo npm i -g @sematext/logagent 
```

## Install service (Linux, Mac OS X)

1. Get a free account at [sematext.com](https://apps.sematext.com/users-web/register.do)
2. [create a Logsene App](https://apps.sematext.com/logsene-reports/registerApplication.do) to obtain an App Token for [Logsene](http://www.sematext.com/logsene/) 
3. Install logagent as system service
Logagent detects the init system and installs systemd or upstart service scripts. 
On Mac OS X it creates a launchd service. Simply run:
```
# Install logagent package globally 
sudo npm i -g @sematext/logagent
sudo logagent-setup -i LOGSENE_TOKEN
# for EU region: 
# sudo logagent-setup -i LOGSENE_TOKEN -u logsene-receiver.eu.sematext.com
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

