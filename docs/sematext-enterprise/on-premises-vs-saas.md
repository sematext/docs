title: On-premises vs Saas
description: Deployment model differences for Sematext infrastructure & application performance monitoring, and
log management service.

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
