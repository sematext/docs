title: Journald Logs Integration
description: Sematext Journald Logs integration is configured by pointing the systemd-journal-remote package to send Journald logs from your infrastructure to Sematext Logs.

Sematext offers a Journald logs receiver endpoint. Everything you need to do is to tell Journald to send logs to it.

## Sematext Journald Logs Quick Start

First install `systemd-journal-remote` on your machine.

<div class="mdl-tabs mdl-js-tabs mdl-js-ripple-effect">
 <div class="mdl-tabs__tab-bar">
     <a href="#redhat" class="mdl-tabs__tab is-active">Red Hat</a>
     <a href="#centos" class="mdl-tabs__tab">CentOS</a>
     <a href="#debian" class="mdl-tabs__tab">Debian</a>
     <a href="#ubuntu" class="mdl-tabs__tab">Ubuntu</a>
     <a href="#amazonlinux" class="mdl-tabs__tab">Amazon</a>
     <a href="#fedora" class="mdl-tabs__tab">Fedora</a>
 </div>

 <div class="mdl-tabs__panel is-active" id="redhat">
   <pre>sudo yum install systemd-journal-remote</pre>
 </div>
 <div class="mdl-tabs__panel" id="centos">
   <pre>sudo yum install systemd-journal-remote</pre>
 </div>
 <div class="mdl-tabs__panel" id="debian">
   <pre>sudo apt-get install systemd-journal-remote</pre>
 </div>

 <div class="mdl-tabs__panel" id="ubuntu">
   <pre>sudo apt-get install systemd-journal-remote</pre>
 </div>

 <div class="mdl-tabs__panel" id="amazonlinux">
   <pre>sudo yum install systemd-journal-remote</pre>
 </div>

 <div class="mdl-tabs__panel" id="fedora">
   <pre>sudo yum install systemd-journal-remote</pre>
 </div>
</div>


Edit the `/etc/systemd/journal-upload.conf` file and change the URL property.

```bash
[Upload]
URL=http://logsene-journald-receiver.sematext.com:80/YOUR_LOGS_TOKEN

# For EU Region
# URL=http://logsene-journald-receiver.eu.sematext.com:80/YOUR_LOGS_TOKEN
```

If you don't feel like editing files manually, you can run a sed command instead that will edit the file.

<div class="mdl-tabs mdl-js-tabs mdl-js-ripple-effect">
 <div class="mdl-tabs__tab-bar">
     <a href="#us" class="mdl-tabs__tab is-active">Sematext US Region</a>
     <a href="#eu" class="mdl-tabs__tab">Sematext EU Region</a>
 </div>

 <div class="mdl-tabs__panel is-active" id="us">
   <pre>sudo sed -i -E 's/(\#\s)?URL=.*/URL=http:\/\/logs-journald-receiver.sematext.com:80\/YOUR_LOGS_TOKEN/g' /etc/systemd/journal-upload.conf</pre>
 </div>
 <div class="mdl-tabs__panel" id="eu">
   <pre>sudo sed -i -E 's/(\#\s)?URL=.*/URL=http:\/\/logs-journald-receiver.eu.sematext.com:80\/YOUR_LOGS_TOKEN/g' /etc/systemd/journal-upload.conf</pre>
 </div>
</div>


Once the configuration is done, you enable and run the `systemd-journal-remote`.

```bash
systemctl enable systemd-journal-upload
systemctl start systemd-journal-upload
```

It behaves like any other Systemd daemon. You can check the status with:
```bash
systemctl status systemd-journal-upload
```

*__Note__: A bug in systemd-journal-upload service does not allow using HTTPS URL. You could use a local HTTPS reverse proxy to https://logsene-journald-receiver.sematext.com*


## Sematext Journald Logs Troubleshooting

In some cases your last stored cursor is larger than 10 MB, which will fail because the HTTP request size is too large. You can write a new cursor to `/var/lib/systemd/journal-upload/state`, or take the journal cursor from the output of `journalctl -f | head -c 1 | grep __CURSOR`.

If your old logs are less important, a quick way is to shrink your logs, before starting to ship them to Sematext is with setting the `vacuum-size` to less than 10 MB.

```bash
journalctl --vacuum-size=9M
```

After any changes don't forget to restart the daemon.

```bash
systemctl restart systemd-journal-upload
```