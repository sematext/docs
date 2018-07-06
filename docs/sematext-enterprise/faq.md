## Installation

<div class="accordion">
  <div class="option">
    <input type="checkbox" id="toggle1" class="toggle" />
    <label class="title" for="toggle1">
      Can I install Sematext Enterprise if my server is behind a firewall
    </label>
    <div class="content">
      <p>Yes. If your system is behind a firewall and cannot connect to the
      Internet to download anything, please <a href="https://sematext.com/contact/">contact Sematext</a> to get the packages that have
      all dependencies included in
      them.</p>
    </div>
  </div>
  <div class="option">
    <input type="checkbox" id="toggle2" class="toggle" />
    <label class="title" for="toggle2">Can I configure Sematext Enterprise if my server has multiple IP addresses or it is behind a firewall
    </label>
    <div class="content">
      <p>The config script has an option to provide the IP address from the config script:
    <pre>
    bash
      ./config.py init --ip ADDR
    </pre>
    </p>
    </div>
  </div>
  <div class="option">
    <input type="checkbox" id="toggle3" class="toggle" />
    <label class="title" for="toggle3">
      What happens if one of the nodes dies or needs to be replaced or removed
    </label>
    <div class="content">
      <p>
      The config script has an option to remove a node from the cluster, but
      not for the primary node: </p>
      <pre> bash
        ./config.py remove --id <node_id>
      </pre>
    <p>  The ID of the node can be found by running the status command: </p>
      <pre> bash
        ./config.py status 
      </pre>
      </p>
    </div>
  </div>
  <div class="option">
    <input type="checkbox" id="toggle4" class="toggle" />
    <label class="title" for="toggle4">
      What happens if the primary node dies or needs to be replaced
    </label>
    <div class="content">
      <p>
      The cluster will not work without a primary node. To get the cluster up
      and running some manual steps will have to be executed. We plan to
      automate this in the very near future to to make things easy in these
      rare
      cases.
      </p>
    </div>
  </div>
  <div class="option">
    <input type="checkbox" id="toggle5" class="toggle" />
    <label class="title" for="toggle5">
      Can I change the Elasticsearch cluster name or use an existing cluster
    </label>
    <div class="content">
      <p>
      At the moment, the cluster name is hardcoded to sematext-es.
      </p>
    </div>
  </div>
  <div class="option">
    <input type="checkbox" id="toggle6" class="toggle" />
    <label class="title" for="toggle6">
      What server is used for sending emails
    </label>
    <div class="content">
      <p>
      For sending emails, a local SMTP server is used. To use a different
      server changes need to be done in
      <strong>/opt/sematext/conf/common/common.onpremises.properties</strong>

      <pre> properties
        email.host=email_server_addr
        email.port=email_server_port
        email.user=email_username
        email.password=email_passowrd
        email.from=Some Name <some_email@some_domain>
        email.smtp.auth=true / false
        email.smtp.starttls.enable=true / false
        email.smtp.ssl.enable=true / false
        email.smtp.socketFactory.class=javax.net.ssl.SSLSocketFactory / javax.net.SocketFactory
      </pre>
      </p>
    </div>
  </div>
  <div class="option">
    <input type="checkbox" id="toggle7" class="toggle" />
    <label class="title" for="toggle7">
      Can I enable HTTPS and SSL certificates
    </label>
    <div class="content">
      <p>
      We recommend to use a load balancer that can also handle the HTTPS and SSL offloading.
      </p>
    </div>
  </div>
  <div class="option">
    <input type="checkbox" id="toggle8" class="toggle" />
    <label class="title" for="toggle8">
      I’m running out of disk space because of Elasticsearch, what do I do
    </label>
    <div class="content">
      <p>
      When running out of space because of Elasticsearch, please add more Data
      nodes. Data will be distributed between all nodes. Please keep in mind
      that this does not happen immediately and plan in advance.  Do not add
      more than one node at the same time. Depending how busy the cluster is,
      it can take some time to stabilize. You can use SPM to check when the
      cluster has stabilized. Check that cluster state is Green before and
      after adding new nodes.
      </p>
    </div>
  </div>
  <div class="option">
    <input type="checkbox" id="toggle9" class="toggle" />
    <label class="title" for="toggle9">
      I’m running out of disk space because of Kafka, what do I do
    </label>
    <div class="content">
      <p>
      When running out of space because of Kafka, please add more Master
      nodes. Data will be distributed between all nodes. Please keep in mind
      that this does not happen immediately and plan in advance. Do not add
      more than one node at the same time. Depending how busy the cluster is,
      it can take some time to stabilize. You can use SPM to check when the
      cluster has stabilized. There is also a setting that controls how long
      logs are kept before being discarded in /opt/sematext/kafka/config. The
      default value is:
      <pre>
      properties
        log.retention.hours=24
      </pre>
      </p>
    </div>
  </div>
  <div class="option">
    <input type="checkbox" id="toggle10" class="toggle" />
    <label class="title" for="toggle10">
      Can I use localhost instead of 127.0.0.1
    </label>
    <div class="content">
      <p>
      When using “http”://localhost” instead of <http://127.0.0.1>, you might
      bump into a Google Chrome bug regarding cookies for “localhost”.
      </p>
    </div>
  </div>
  <div class="option">
    <input type="checkbox" id="toggle11" class="toggle" />
    <label class="title" for="toggle11">
      How can I optimize the VM when using SSD storage
    </label>
    <div class="content">
      <p>
      The I/O scheduler should be set to NOOP at runtime:
      <pre>
      bash
        echo noop | sudo tee /sys/block/xvdh/queue/scheduler (xvdh is the SSD drive)
      </pre>
      persistent: add elevator=noop to the "kernel" like of /etc/grub.conf
      </p>
    </div>
  </div>
  <div class="option">
    <input type="checkbox" id="toggle12" class="toggle" />
    <label class="title" for="toggle12">
      How many VMs or disk space do I need
    </label>
    <div class="content">
      <p>
      The volume of per-server metrics or logs, and log event sizes can vary a
      lot, so it is nearly impossible to give good estimates. However, SPM
      monitors itself to help with capacity planning.  Disk usage tell you how
      much disk is being used and how much is left.  CPU usage tells you
      whether CPU is being maxed out or not. To expand, you can either add
      more VMs/nodes, or give the existing VMs more CPU or disk.
      </p>
    </div>
  </div>
  <div class="option">
    <input type="checkbox" id="toggle13" class="toggle" />
    <label class="title" for="toggle13">
      Where are Kibana indices backed up
    </label>
    <div class="content">
      <p>
      Kibana indices are backed up daily in
      the <strong>/opt/sematext/data/kibana/<DATE\> </strong> dir.
      To restore these indices, just run the following
      command.
      <pre>
      bash
      /opt/sematext/script/es-index.py --location /opt/sematext/data/kibana/<DATE> restore
      </pre>
      </p>
    </div>
  </div>
  <div class="option">
    <input type="checkbox" id="toggle14" class="toggle" />
    <label class="title" for="toggle14">
      How do I create the diagnostics package
    </label>
    <div class="content">
      <p>In case you are having issues with Sematext Apps, you can create diagnostics package on affected nodes by running: </p>
      <pre>
      bash
      sudo /opt/sematext/script/diag.sh
      </pre>
      <p>
      The resulting package will contain all relevant info needed for our investigation.
      </p>
    </div>
  </div>
</div>

## Licensing

<div class="accordion">
  <div class="option">
    <input type="checkbox" id="toggle15" class="toggle" />
    <label class="title" for="toggle15">
      How do I get a new license
    </label>
    <div class="content">
      <p>
      The SematextApps VM has an initial trial license that will expire in 30
      days.  When the trial license or the real license expires, you will not
      be able log into the Web UI.  To get a new license, please <a href="https://sematext.com/contact/">contact Sematext</a>.
      </p>
    </div>
  </div>
  <div class="option">
    <input type="checkbox" id="toggle16" class="toggle" />
    <label class="title" for="toggle16">Where do I put a new license file
    </label>
    <div class="content">
      <p>
      The license file location is /opt/sematext/license.jar on any of your
      SUA servers.
<br><br>
      License files are automatically loaded as soon as you copy them to said
      location.
      </p>
    </div>
  </div>
  <div class="option">
    <input type="checkbox" id="toggle17" class="toggle" />
    <label class="title" for="toggle17">
      License expiry
    </label>
    <div class="content">
        <p>
        All Sematext on-premises licenses are limited by their expiry date. As
        expiry date approaches (and passes), license holders and owner of
        default on-premises account will be notified by email.
<br><br>
        After the license expires, you will be able to continue using
        applications only for a few more days, so <a href="https://sematext.com/contact/">contact Sematext</a> early about the new license to avoid any service interruptions.
      </p>
    </div>
  </div>
  <div class="option">
    <input type="checkbox" id="toggle18" class="toggle" />
    <label class="title" for="toggle18">
      How do SPM license limits work
    </label>
    <div class="content">
      <p>
      SPM licenses have additional limit on concurrent number of
      "server-apps". This "server-apps" is a combination of SPM App token and
      server where SPM monitor client is installed. For example, if you have 4
      servers, and on each of them you've installed 3 SPM App tokens, that is
      counted as 12 server-apps (regardless of whether those servers use same
      or different SPM App tokens).
<br><br>
      If during the day your number of server-apps goes over the limit defined
      by license, you will be notified by email and by Notification displayed
      at the top of SPM UI. You will have until the end of the day (counted by
      UTC timezone) to reduce the number of server-apps below the license
      limit. If reduction doesn't happen until the end of the day, that day
      will be counted as "over the limit" incident.
<br><br>
      You are allowed to have a maximum of 4 such incidents over the trailing
      30 days window. Once you have 5 or more such incidents over the last 30
      days (check is done each day at 02:00 AM UTC), read-access to data will
      be blocked. This means that performance metrics will continue to be
      collected by SPM, but until the number of "over the limit" incidents
      falls back below 5 or you get a fresh license with higher limits, you
      will be unable to view data in charts.
      </p>
    </div>
  </div>
  <div class="option">
    <input type="checkbox" id="toggle19" class="toggle" />
    <label class="title" for="toggle19">How do Logsene license limits work
    </label>
    <div class="content">
      <p>
      Logsene licenses have additional limit on the amount of log data per
      day. The limit is expressed in MB, GB, TB... per day, and is compared
      with the total amount of log data used by all your Logsene Apps
      combined.
<br><br>
      If during the day your amount of data goes over the license limit, you
      will be notified by email and by Notification displayed at the top of
      Logsene UI. You will have time until the end of the day (counted by UTC
      timezone) to reduce the amount of logs below the limit (e.g. by deleting
      some data manually). If reduction doesn't happen until the end of the
      day, that day will be counted as "over the limit" incident.
<br><br>
      You are allowed to have a maximum of 4 such incidents over the trailing
      30 days window. Once you hit 5 or more such incidents over the last 30
      days (check is done each day at 02:00 AM UTC), read-access to data will
      be blocked. This means that logs data will continue to be accepted by
      Logsene, but until the number of "over the limit" incidents falls back
      below 5 or you get a fresh license with higher limits, you will be
      unable to view data in charts.
      </p>
    </div>
  </div>
</div>

## On-premises vs SaaS

<table class="mdl-data-table mdl-shadow--2dp" style="white-space: normal;">
  <thead>
    <tr>
      <th>Feature &amp; Capability
      </th>
      <th>Sematext Enterprise
      </th>
      <th>Sematext Cloud
      </th>
    </tr>
  </thead>
  <tbody>
    <tr>
      <td>Server Location
      </td>
      <td>In your data center on your hardware or private cloud.
      </td>
      <td>In the cloud (Amazon EC2) US and EU Regions are available
      </td>
    </tr>
    <tr>
      <td>Server Installation
      </td>
      <td>Manual installation of Sematext Enterprise
      </td>
      <td><a href="https://sematext.com/cloud/">Cloud version</a> is fully managed SaaS on AWS infrastructure. Both private and cloud version provide infrastructure monitoring, application performance monitoring, log management, docker metrics and logs, and more. Metrics, Traces, Logs, Alerts, and Events in one.
      </td>
    </tr>
    <tr>
      <td>Software Updates
      </td>
      <td>Manual / On-demand
      </td>
      <td>Automated
      </td>
    </tr>
    <tr>
      <td>Backups
      </td>
      <td>Manual
      </td>
      <td>On-demand / Automated
      </td>
    </tr>
    <tr>
      <td>Supported Agents
      </td>
      <td>
      Logstash, rsyslog, Apache Flume, Fluentd, or anything that can output to Elasticsearch for logging management. SPM Performance Monitoring Agent for Apache, Docker, and many other <a href="https://sematext.com/infrastructure-monitoring/">integrations</a>
      </td>
      <td>
      Logstash, rsyslog, Apache Flume, Fluentd, or anything that can output to Elasticsearch for logging management. SPM Performance Monitoring Agent for Apache, Docker, and many other <a href="https://sematext.com/infrastructure-monitoring/">integrations</a>
      </td>
    </tr>
    <tr>
      <td>Deployment Size
      </td>
      <td>Medium and Large
      </td>
      <td>Small, Medium and Large
      </td>
    </tr>
    <tr>
      <td>Data Retention
      </td>
      <td>Flexible, limited by provisioned disk space
      </td>
      <td>Depends on what Data Retention you selected when you picked your Logging Management App plan. Usage is metered hourly on a per-agent basis for server and infrastructure monitoring. Docker monitoring is based on the base price and per-container price. The base price includes monitoring of a Docker host and free monitoring of up to N containers.
      </td>
    </tr>
    <tr>
      <td>Collector Settings
      </td>
      <td>Flexible
      </td>
      <td>Optimized for cloud:
        <ul class="list">
          <li>Encryption: on (SSL)</li>
          <li>Compression: on</li>
        </ul>
      </td>
    </tr>
    <tr>
      <td>Memory Dumps
      </td>
      <td>Enabled
      </td>
      <td>Enabled
      </td>
    </tr>
    <tr>
      <td>Mail Server for notifications
      </td>
      <td>Provided by customers
      </td>
      <td>Fully Managed
      </td>
    </tr>
    <tr>
      <td>LDAP
      </td>
      <td>Provided by customers
      </td>
      <td>Fully Managed
      </td>
    </tr>
  </tbody>
</table>
