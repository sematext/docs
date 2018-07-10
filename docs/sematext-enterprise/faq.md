title: FAQ
description: FAQ about Sematext Enterprise, private or on-premises platform for infrastructure, app, and container monitoring and alerting as well as the log management platform.

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



