title: Journald Logs Integration
description: Sematext Linux Logs integration allows you to send systemd's journald logs to Sematext.

You can send Linux journal logs to Sematext in a few ways:

- [Logagent](../logagent/index.md) calls `journalctl` and tails the journal. Journal entries will be forwarded via HTTPS to Sematext
- `journal-upload` sends data directly to Sematext. Unfortunately, [in most systemd versions](https://github.com/systemd/systemd/pull/15347) you can't use HTTPS as a transport, only HTTP
- `journal-upload` sends journal entries to a local [Logagent](../logagent/index.md) that forwards them to Sematext via HTTPS

Whichever method you choose, once logs are in, you can explore them and drill into specifics, such as SSH or Kernel logs.

<img
  class="content-modal-image"
  alt="Linux Logs Overview"
  src="../../images/agents/linux_overview.png"
  title="Linux Logs Overview"
/>

## Option 1: Logagent and journalctl (recommended)

With [Node.js installed](https://nodejs.org/en/download/package-manager/), you'd first need to install Logagent:
```bash
sudo npm i -g @sematext/logagent
```

Then you can use `logagent-setup` to configure it to push logs to your Logs App:
```bash
sudo logagent-setup -i $YOUR_LOGS_TOKEN -u https://logs-token-receiver.sematext.com -l
```
Note: if you're in the EU region, use `-u https://logs-token-receiver.eu.sematext.com` instead.

## Option 2: journal-upload to Sematext

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

## Option 3: journald-upload to Sematext via Logagent

With [Node.js installed](https://nodejs.org/en/download/package-manager/), you'd first need to install Logagent:
```bash
sudo npm i -g @sematext/logagent
```

Then use `logagent-setup` to configure `journal-upload` to send data to it, and then to Sematext:
```bash
sudo logagent-setup -i $YOUR_LOGS_TOKEN -u https://logs-token-receiver.sematext.com -j
```
Note: if you're in the EU region, use `-u https://logs-token-receiver.eu.sematext.com` instead.

## Exploring logs

Once data is in, you can explore it using the built-in reports or create your own. For example, you can use the Auth report to explore sudo commands:

<img
  class="content-modal-image"
  alt="Linux Logs Auth Report"
  src="../../images/agents/linux_auth_logs.png"
  title="Linux Logs Auth Report"
/>

Other built-in reports include:

- **Kernel**: Logs filtered by the facility 0 (kernel). Here you will find all your startup logs, information about crashes, all that you typically see via `dmesg`
- **SSH**: Logs generated by the SSH daemon.
- **Services**: Logs from systemd saying starting/started/stopping/stopped. Look here for unexpected service restarts, for example.
- **Startup&Shutdown**: Logs from the system-shutdown service, as well as the kernel message telling you the Linux version on startup. Look here for reboots.
- **Audit**: Logs from the auditd service, with a syslog tag of `audit` and kernel messages including `selinux` or `audit`
- **Cron**: Logs sent to the cron facility (9). For example, you shell see here if `logrotate` ran properly.
- **YUM/Snap**: Logs labeled with either `yum` or `snapd` syslog tag. Look here for more info on package management.
- **Mail**: Logs sent to the mail facility (2). You can check on your postfix here.
- **DNS**: Messages from the systemd-resolved service. Look here if you suspect DNS resolution issues.

## Troubleshooting

If you have trouble with `journalctl` on the first run, it might be that the pipe buffer gets overrun. `logagent-setup` configures it for 100MB (look for `maxBuffer` in `/etc/sematext/logagent.conf`) and tries to pull logs since one week before (look for `initialQueryTime`). Logagent remembers where it left off in `/var/run/logagentLastQueryTimeFile` and calls `journalctl` with a 1 second delay between each run. This means subsequent runs should pull very little data each time.

If the default 100MB buffer is too small for the initial pull, you can do one of the following:

- make Logagent pull more recent data by changing `initialQueryTime`
- increase `maxBuffer` (value is in bytes). But if you need more than e.g. 200MB you might need to allocate more memory to Logagent itself: the default is 300MB (look for `--max-old-space-size=300` in `/usr/bin/logagent`)
- truncate the journal to <100MB. For example `journalctl --vacuum-size=90M`


If `journal-upload` is involved (options 2 and 3), you might bump into the 10MB HTTP request size limit. This happens if the last stored cursor is larger than 10 MB. You can write a new cursor to `/var/lib/systemd/journal-upload/state`, or take the journal cursor from the output of `journalctl -f | head -c 1 | grep __CURSOR`.

Or, if your old logs are less important, you can truncate the journald to less than 10 MB:

```bash
journalctl --vacuum-size=9M
```

With options 2 and 3, you'll need to restart `journal-upload` if you make changes to the cursor or journal itself. You'll also need to restart it after restarting Logagent (it doesn't restore the connection on its own):

```bash
systemctl restart systemd-journal-upload
```