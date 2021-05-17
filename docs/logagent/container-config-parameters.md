title: Logagent Configuration Parameters for Containers
description: Logagent, Sematext log shipper and Logstash alternative, is available as Docker image. It has automatic Docker installation and seamless logging system service integration with our log management and analysis platform

The Logagent container can be configured through the following environment variables:

* **REGION**: Sematext Cloud region **US** or **EU** (default: US). The receiver URL will be set to EU/US default values. When using REGION, you don't need to set `LOGS_RECEIVER_URL` (see below).
* **LOGS_RECEIVER_URL**: The URL of your Elasticsearch Endpoint _(defaults to Sematext Cloud US `https://logsene-receiver.sematext.com`)_.

    * For Sematext Europe use `https://logsene-receiver.eu.sematext.com`.
    * For Elasticsearch `https://elasticserch-server-name:9200`.

* **LOGS_TOKEN**: The index to ship logs to. For [Sematext](https://sematext.com/) use the Logs App Token.
* **LOGAGENT_ARGS**: Additional [command line arguments for Logagent](https://sematext.com/docs/logagent/cli-parameters/) <pre>LOGAGENT_ARGS="-n httpd"</pre> to specify a log source name or <pre>LOGAGENT_ARGS="-u 514"</pre> to act as syslog server. Please refer to Logagent command line arguments in the [Logagent Documentation](https://sematext.com/docs/logagent/cli-parameters/)

* **LOG_GLOB**: Semicolon-separated list of file globs 
    
        LOG_GLOB=/mylogs/**/*.log;/var/log/**/*.log 
    
    Mount your server log files into the container using a Docker volume e.g. 
    
        -v /var/log:/mylogs
    
    This feature is developed with the Glob module. [Here's a guide](./how-to-use-glob-patterns-to-exclude-logs/) on how to use Glob patterns.

* **-v /var/run/docker.sock:/var/run/docker.sock** - Collect container logs by mounting the docker socket (mandatory)

## Configuration Parameters

### Mandatory Parameters

<table>
<thead>
<tr>
<th>Parameter / Environment variable</th>
<th>Description</th>
</tr>
</thead>
<tbody>
<tr>
<td>LOGS_TOKEN</td>
<td>Logs Token enables logging to Sematext Cloud, see logging specific parameters for filter options and <a href="#log-routing">Log Routing</a> section to route logs from different containers to separate Logs Apps (indices)</td>
</tr>
<tr>
<td>-v /var/run/docker.sock</td>
<td>Path to the docker socket</td>
</tr>
</tbody>
</table>

### Optional Parameters


<table>
<thead>
<tr>
<th>Parameter / Environment variable</th>
<th>Description</th>
</tr>
</thead>
<tbody>
<tr>
<td>REGION</td>
<td>Sematext Cloud region <strong>US</strong> or <strong>EU</strong> (default: US). The receiver URL will be set to EU/US default values. When using REGION, you don't need to set LOGS_RECEIVER_URL (see below).</td>
</tr>
<tr>
<td>LOG_GLOB</td>
<td>Semicolon-separated list of file globs (e.g. /var/log/<strong>/*.log;/mylogs/</strong>/*.log) to collect log files from the host, assuming the log files are mounted to /mylogs using Docker -v /var/logs:/mylogs</td>
</tr>
<tr>
<td>LOGAGENT_ARGS</td>
<td>Additional command line arguments for Logagent (e.g. LOGAGENT_ARGS="-n httpd" to specify a log source name or LOGAGENT_ARGS="-u 514" to act as syslog server)</td>
</tr>
<tr>
<td>HTTPS_PROXY</td>
<td>URL for a proxy server (behind firewalls)</td>
</tr>
<tr>
<td>LOGS_RECEIVER_URL</td>
<td>URL for bulk inserts into Sematext Cloud. Required for Sematext Enterprise (local IP:PORT) or Sematext Cloud Europe: https://logsene-receiver.eu.sematext.com</td>
</tr>
<tr>
<td>LOGS_RECEIVER_URLS</td>
<td>Specify multiple receiver URLs for bulk inserts into Sematext Cloud. Required for Sematext Enterprise (local IP:PORT) or Sematext Cloud Europe: https://logsene-receiver.eu.sematext.com</td>
</tr>
<tr>
<td>JOURNALD_UPLOAD_PORT</td>
<td>Port number for the collection of journald logs, forwarded by systemd-journal-upload.service. Equals to Logagent argument --journald PORT.</td>
</tr>
<tr>
<td>SYSTEMD_UNIT_FILTER</td>
<td>A regular expression to filter journald logs by systemd unit name, e.g. "ssh.service|docker.service". The default value is ".*". </td>
</tr>
<tr>
<td>CONFIG_FILE</td>
<td>Path to the configuration file, containing environment variables <code>key=value</code>. Default value: <code>/run/secrets/logagent</code>. Create a secret with  <code>docker secret create logagent ./logagent.cfg</code>. Start Logagent with `docker service create --mode global --secret logagent --mount type=bind,src=/var/run/docker.sock,dst=/var/run/docker.sock sematext/logagent</td>
</tr>
<td>LA_CONFIG</td>
<td>Point to the location of a logagent config file. E.g. <pre>LA_CONFIG=/etc/sematext/logagent.conf</pre></td>
</tr>
<tr>
<td>LA_CONFIG_OVERRIDE</td>
<td>Ignores env vars for LOGS_TOKEN, REGION, and LOGS_RECEIVER_URL. E.g. <pre>LA_CONFIG_OVERRIDE=true</pre></td>
</tr>
<tr>
<td>--privileged</td>
<td>The parameter might be helpful when Logagent could not start because of limited permission to connect and write to the Docker socket /var/run/docker.sock. The privileged mode is a potential security risk, we recommend to enable the appropriate security. Please read about Docker security: https://docs.docker.com/engine/security/security/</td>
</tr>
</tbody>
</table>

#### Docker Logs Parameters

<table>
<thead>
<tr>
<th>Parameter / Environment variable</th>
<th>Description</th>
</tr>
</thead>
<tbody>
<tr>
<td>TAGGING_LABELS</td>
<td>A list of docker label names or environment variable names to tag container logs. Supporting wildcards. Default value: <pre>com.docker.*,io.kubernetes.*,annotation.io.*</pre></td>
</tr>
<tr>
<td>IGNORE_LOGS_PATTERN</td>
<td style="word-break: break-all;">Filter logs with a regular expression. <pre>IGNORE_LOGS_PATTERN=healthcheck|ping</pre> This will match log lines that contain "healthcheck" or "ping" in the message, and drop them. Only add the <b>regular expression without forward slashes</b>.</td>
</tr>
<tr>
<td>LOGSENE_ENABLED_DEFAULT</td>
<td>Enables log collection for containers having no explicit label/environment variable LOGSENE_ENABLED set. Default value: true. See section <a href="#log-routing">Log Routing</a>.</td>
</tr>
</tbody>
</table>

#### Whitelist Containers for Logging

<table>
<thead>
<tr>
<th>Parameter / Environment variable</th>
<th>Description</th>
</tr>
</thead>
<tbody>
<tr>
<td>MATCH_BY_NAME</td>
<td>Regular expression to whitelist container names. <pre>MATCH_BY_NAME=.*nginx.*</pre> This will match any container name that contains "nginx". Only add the <b>regular expression without forward slashes</b>.</td>
</tr>
<tr>
<td>MATCH_BY_IMAGE</td>
<td>Regular expression to whitelist image names. <pre>MATCH_BY_IMAGE=.*nginx.*</pre> This will match any image that contains "nginx". Only add the <b>regular expression without forward slashes</b>.</td>
</tr>
</tbody>
</table>

#### Blacklist Containers

<table>
<thead>
<tr>
<th>Parameter / Environment variable</th>
<th>Description</th>
</tr>
</thead>
<tbody>
<tr>
<td>SKIP_BY_NAME</td>
<td>Regular expression to blacklist container names for logging. <pre>SKIP_BY_NAME=.*nginx.*</pre> This will match any container name that contains "nginx". Only add the <b>regular expression without forward slashes</b>.</td>
</tr>
<tr>
<td>SKIP_BY_IMAGE</td>
<td>Regular expression to blacklist image names for logging. <pre>SKIP_BY_IMAGE=.*nginx.*</pre> This will match any image that contains "nginx". Only add the <b>regular expression without forward slashes</b>.</td>
</tr>
</tbody>
</table>

#### Set Log Patterns

Logagent supports various log formats defined in [patterns.yml](https://github.com/sematext/logagent-js/blob/master/patterns.yml) file.
The [Log Parser Patterns](https://sematext.com/docs/logagent/parser/) can be customized by proving your YAML file.

<table>
<thead>
<tr>
<th>Parameter / Environment variable</th>
<th>Description</th>
</tr>
</thead>
<tbody>
<tr>
<td>PATTERNS_URL</td>
<td>Load pattern.yml via HTTP e.g. <pre>PATTERNS_URL=https://myserver/patterns.yml</pre>
</td>
</tr>
<tr>
<td>LOGAGENT_PATTERNS</td>
<td>Pass patterns.yml via env. variable e.g. <pre>LOGAGENT_PATTERNS="$(cat ./patters.yml)"</pre></td>
</tr>
<tr>
<td>LOGAGENT_PATTERNS_BASE64</td>
<td>Set to "true" if the LOGAGENT_PATTERNS patterns file you are passing in via env. variable is base64 encoded e.g
  <pre>LOGAGENT_PATTERNS_BASE64="$(cat ./patterns.yml | base64)"</pre>. Useful if your patterns file is not getting set properly due to shell interpretation or otherwise.</td>
</tr>
<tr>
<td>PATTERN_MATCHING_ENABLED</td>
<td>Activate logagent-js parser, default value is true. To disable the log parser set the value to false. This could increase the throughput of log processing for nodes with a very high log volume.</td>
</tr>
<tr>
<td>-v /patterns.yml:/etc/logagent/patterns.yml</td>
<td>Mount a patterns file to <a href="https://sematext.com/docs/logagent/parser/">customize patterns for log parsing</a></td>
</tr>
</tbody>
</table>

#### Other Options

<table>
<thead>
<tr>
<th>Parameter / Environment variable</th>
<th>Description</th>
</tr>
</thead>
<tbody>
<tr>
<td>-v /tmp:/log-buffer</td>
<td>Directory to store logs, in a case of a network or service outage. Docker Agent deletes these files after successful transmission.</td>
</tr>
<tr>
<td>GEOIP_ENABLED</td>
<td>Enables GeoIP lookups in the log parser, default value: "false"</td>
</tr>
<tr>
<td>GEOIP_FIELD</td>
<td>The field to perform geo IP lookup e.g. <pre>GEOIP_FIELD="client_ip"</pre></td>
</tr>
<tr>
<td>MAXMIND_LICENSE_KEY</td>
<td>Your MaxMind license key</td>
</tr>
<tr>
<td>MAXMIND_DB_DIR</td>
<td>Directory for the Geo-IP lite database, must end with /. Storing the DB in a volume could save downloads for updates after restarts. Using /tmp/ (ramdisk) could speed up Geo-IP lookups (requires add. ~30 MB main memory).</td>
</tr>
<tr>
<td>REMOVE_FIELDS</td>
<td>Removes fields from parsed/enriched logs. E.g. <pre>REMOVE_FIELDS=password,creditCardNo</pre></td>
</tr>
<tr>


</tbody>
</table>
