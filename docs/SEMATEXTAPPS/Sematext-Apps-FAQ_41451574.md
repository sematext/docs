  - [Can I install Sematext Apps if my server is behind a
    firewall](#SematextAppsFAQ-CanIinstallSematextAppsifmyserverisbehindafirewall)
  - [Can I configure Sematext Apps if my server has multiple IP
    addresses or it is behind a
    firewall](#SematextAppsFAQ-CanIconfigureSematextAppsifmyserverhasmultipleIPaddressesoritisbehindafirewall)
  - [What happens if one of the nodes dies or needs to be replaced or
    removed](#SematextAppsFAQ-Whathappensifoneofthenodesdiesorneedstobereplacedorremoved)
  - [What happens if the primary node dies or needs to be
    replaced](#SematextAppsFAQ-Whathappensiftheprimarynodediesorneedstobereplaced)
  - [Can I change the Elasticsearch cluster name or use an existing
    cluster](#SematextAppsFAQ-CanIchangetheElasticsearchclusternameoruseanexistingcluster)
  - [What server is used for sending
    emails](#SematextAppsFAQ-Whatserverisusedforsendingemails)
  - [Can I enable HTTPS and SSL
    certificates](#SematextAppsFAQ-CanIenableHTTPSandSSLcertificates)
  - [I’m running out of disk space because of Elasticsearch, what do I
    do](#SematextAppsFAQ-I’mrunningoutofdiskspacebecauseofElasticsearch,whatdoIdo)
  - [I’m running out of disk space because of Kafka, what do I
    do](#SematextAppsFAQ-I’mrunningoutofdiskspacebecauseofKafka,whatdoIdo)
  - [Can I use localhost instead of
    127.0.0.1](#SematextAppsFAQ-CanIuselocalhostinsteadof127.0.0.1)
  - [How can I optimize the VM when using SSD
    storage](#SematextAppsFAQ-HowcanIoptimizetheVMwhenusingSSDstorage)
  - [How many VMs or disk space do I
    need](#SematextAppsFAQ-HowmanyVMsordiskspacedoIneed)
  - [How do I get a new license](#SematextAppsFAQ-HowdoIgetanewlicense)
  - [Where do I put a new license
    file](#SematextAppsFAQ-WheredoIputanewlicensefile)
  - [License expiry](#SematextAppsFAQ-Licenseexpiry)
  - [How do SPM license limits
    work](#SematextAppsFAQ-HowdoSPMlicenselimitswork)
  - [How do Logsene license limits
    work](#SematextAppsFAQ-HowdoLogsenelicenselimitswork)
  - [Where are Kibana indices backed
    up](#SematextAppsFAQ-WhereareKibanaindicesbackedup)
  - [How do I create the diagnostics
    package](#SematextAppsFAQ-HowdoIcreatethediagnosticspackage)

  

### Can I install Sematext Apps if my server is behind a firewall

Yes. If your system is behind a firewall and cannot connect to the
Internet to download anything, please [contact
Sematext](https://sematext.com/contact/) to get the packages that have
all dependencies included in
them.

### Can I configure Sematext Apps if my server has multiple IP addresses or it is behind a firewall

The config script has an option to provide the IP address from the
config
script:

``` 
  ./config.py init --ip ADDR
```

### What happens if one of the nodes dies or needs to be replaced or removed

The config script has an option to remove a node from the cluster, but
not for the primary node:

``` 
  ./config.py remove --id <node_id>
```

The ID of the node can be found by running the status command:

``` 
  ./config.py status 
```

### What happens if the primary node dies or needs to be replaced

The cluster will not work without a primary node. To get the cluster up
and running some manual steps will have to be executed. We plan to
automate this in the very near future to to make things easy in these
rare
cases.

### Can I change the Elasticsearch cluster name or use an existing cluster

At the moment, the cluster name is hardcoded to sematext-es.

### What server is used for sending emails

For sending emails, a local SMTP server is used. To use a different
server changes need to be done in
**/opt/sematext/conf/common/common.onpremises.properties**:

``` 
  email.host=email_server_addr
  email.port=email_server_port
  email.user=email_username
  email.password=email_passowrd
  email.from=Some Name <some_email@some_domain>
  email.smtp.auth=true / false
  email.smtp.starttls.enable=true / false
  email.smtp.ssl.enable=true / false
  email.smtp.socketFactory.class=javax.net.ssl.SSLSocketFactory / javax.net.SocketFactory
```

### Can I enable HTTPS and SSL certificates

We recommend to use a load balancer that can also handle the HTTPS and
SSL offloading.

### I’m running out of disk space because of Elasticsearch, what do I do

When running out of space because of Elasticsearch, please add more Data
nodes. Data will be distributed between all nodes. Please keep in mind
that this does not happen immediately and plan in advance.  Do not add
more than one node at the same time. Depending how busy the cluster is,
it can take some time to stabilize. You can use SPM to check when the
cluster has stabilized. Check that cluster state is Green before and
after adding new nodes.

### I’m running out of disk space because of Kafka, what do I do

When running out of space because of Kafka, please add more Master
nodes. Data will be distributed between all nodes. Please keep in mind
that this does not happen immediately and plan in advance. Do not add
more than one node at the same time. Depending how busy the cluster is,
it can take some time to stabilize. You can use SPM to check when the
cluster has stabilized. There is also a setting that controls how long
logs are kept before being discarded in /opt/sematext/kafka/config. The
default value is:

``` 
  log.retention.hours=24
```

### Can I use localhost instead of 127.0.0.1

When using “http”://localhost” instead of <http://127.0.0.1>, you might
bump into a Google Chrome bug regarding cookies for “localhost”.

### How can I optimize the VM when using SSD storage

The I/O scheduler should be set to NOOP at
runtime:

``` 
  echo noop | sudo tee /sys/block/xvdh/queue/scheduler (xvdh is the SSD drive)
```

persistent: add elevator=noop to the "kernel" like of /etc/grub.conf

### How many VMs or disk space do I need

The volume of per-server metrics or logs, and log event sizes can vary a
lot, so it is nearly impossible to give good estimates. However, SPM
monitors itself to help with capacity planning.  Disk usage tell you how
much disk is being used and how much is left.  CPU usage tells you
whether CPU is being maxed out or not. To expand, you can either add
more VMs/nodes, or give the existing VMs more CPU or disk.

### How do I get a new license

The SematextApps VM has an initial trial license that will expire in 30
days.  When the trial license or the real license expires, you will not
be able log into the Web UI.  To get a new license, please [contact
Sematext](https://sematext.com/contact/).

### Where do I put a new license file

The license file location is /opt/sematext/license.jar on any of your
SUA servers.

License files are automatically loaded as soon as you copy them to said
location.

### License expiry

All Sematext on-premises licenses are limited by their expiry date. As
expiry date approaches (and passes), license holders and owner of
default on-premises account will be notified by email.

After the license expires, you will be able to continue using
applications only for a few more days, so [contact
Sematext](https://sematext.com/contact/) early about the new license to
avoid any service interruptions.

### How do SPM license limits work

SPM licenses have additional limit on concurrent number of
"server-apps". This "server-apps" is a combination of SPM App token and
server where SPM monitor client is installed. For example, if you have 4
servers, and on each of them you've installed 3 SPM App tokens, that is
counted as 12 server-apps (regardless of whether those servers use same
or different SPM App tokens).

If during the day your number of server-apps goes over the limit defined
by license, you will be notified by email and by Notification displayed
at the top of SPM UI. You will have until the end of the day (counted by
UTC timezone) to reduce the number of server-apps below the license
limit. If reduction doesn't happen until the end of the day, that day
will be counted as "over the limit" incident.

You are allowed to have a maximum of 4 such incidents over the trailing
30 days window. Once you have 5 or more such incidents over the last 30
days (check is done each day at 02:00 AM UTC), read-access to data will
be blocked. This means that performance metrics will continue to be
collected by SPM, but until the number of "over the limit" incidents
falls back below 5 or you get a fresh license with higher limits, you
will be unable to view data in charts.

### How do Logsene license limits work

Logsene licenses have additional limit on the amount of log data per
day. The limit is expressed in MB, GB, TB... per day, and is compared
with the total amount of log data used by all your Logsene Apps
combined.

If during the day your amount of data goes over the license limit, you
will be notified by email and by Notification displayed at the top of
Logsene UI. You will have time until the end of the day (counted by UTC
timezone) to reduce the amount of logs below the limit (e.g. by deleting
some data manually). If reduction doesn't happen until the end of the
day, that day will be counted as "over the limit" incident.

You are allowed to have a maximum of 4 such incidents over the trailing
30 days window. Once you hit 5 or more such incidents over the last 30
days (check is done each day at 02:00 AM UTC), read-access to data will
be blocked. This means that logs data will continue to be accepted by
Logsene, but until the number of "over the limit" incidents falls back
below 5 or you get a fresh license with higher limits, you will be
unable to view data in charts.

### Where are Kibana indices backed up

Kibana indices are backed up daily in
the /opt/sematext/data/kibana/\<DATE\> dir.  
To restore these indices, just run the following
command.

``` syntaxhighlighter-pre
/opt/sematext/script/es-index.py --location /opt/sematext/data/kibana/<DATE> restore
```

### How do I create the diagnostics package

 In case you are having issues with SematextApps, you can create
diagnostics package on affected nodes by running:

``` syntaxhighlighter-pre
sudo /opt/sematext/script/diag.sh
```

The resulting package will contain all relevant info needed for our
investigation.

