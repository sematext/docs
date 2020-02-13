title: Configuring Sematext Docker Agent
description: Configuration instructions for Sematext Docker Agent, a modern, Docker-native monitoring and log collection agent. It runs as a tiny container on every Docker host and collects logs, metrics, and events for all cluster nodes and their containers

Please note [Monitoring & Logging for Docker
Enterprise](https://sematext.com/docker-enterprise-monitoring-and-logging/configuring-sematext-docker-agent/)
including detailed feature descriptions and configuration examples for
Sematext Docker Agent.

## Configuration Parameters

<div class="table-responsive">
<table class="mdl-data-table mdl-shadow--2dp" style="white-space: normal;">
<thead>
<tr>
<th>Parameter / Environment variable</th>
<th>Description</th>
</tr>
</thead>
<tbody>
<tr>
<td><strong>Required Parameters</strong></td>
<td></td>
</tr>
<tr>
<td>MONITORING_TOKEN</td>
<td>Monitoring App Token enables metric and event collection</td>
</tr>
<tr>
<td>LOGSENE_TOKEN</td>
<td>Logsene App Token enables logging to Logsene, see logging specific parameters for filter options and Log Routing section to route logs from different containers to separate Logsene applications</td>
</tr>
<tr>
<td><code>-v /var/run/docker.sock</code></td>
<td>Path to the docker socket (optional, if dockerd provides TCP on 2375, see also DOCKER_PORT and DOCKER_HOST parameter)</td>
</tr>
<tr>
<td><strong>TCP and TLS connection</strong></td>
<td>If the Unix socket is not available Sematext Agent assumes the Container Gateway Address (autodetect) and port 2375 as default (no TLS) - this needs no configuration. In case the Docker Daemon TCP settings are different, you have to configure the TCP settings. The TCP settings can be modified with the following parameters</td>
</tr>
<tr>
<td>DOCKER_HOST</td>
<td>e.g. tcp://ip-reachable-from-container:2375/ - default value 'unix:///var/run/docker.sock'. When the Unix socket is not available the agent tries to connect to tcp://gateway:2375. In case a TCP socket is used there is no need to mount the Docker Unix socket as volume</td>
</tr>
<tr>
<td>DOCKER_PORT</td>
<td>Sematext Agent will use its gateway address (auto detect) with the given DOCKER_PORT</td>
</tr>
<tr>
<td>DOCKER_TLS_VERIFY</td>
<td>0 or 1</td>
</tr>
<tr>
<td>DOCKER_CERT_PATH</td>
<td>Path to your certificate files, mount the path to the container with "-v $DOCKER_CERT_PATH:$DOCKER_CERT_PATH"</td>
</tr>
<tr>
<td><strong>Configuration via docker swarm secrets:</strong></td>
<td></td>
</tr>
<tr>
<td>CONFIG_FILE</td>
<td>Path to the configuration file, containing environment variables <code>key=value</code>. Default value: <code>/run/secrets/sematext-agent</code>. Create a secret with  <code>docker secret create sematext-agent ./sematext-agent.cfg</code>. Start Sematext Docker agent with `docker service create --mode global --secret sematext-agent --mount type=bind,src=/var/run/docker.sock,dst=/var/run/docker.sock sematext/sematext-agent-docker</td>
</tr>
<tr>
<td><strong>Optional Parameters:</strong></td>
<td></td>
</tr>
<tr>
<td>--privileged</td>
<td>The parameter might be helpful when Sematext Agent could not start because of limited permission to connect and write to the Docker socket /var/run/docker.sock. The privileged mode is a potential security risk, we recommend to enable the appropriate security. Please read about Docker security: https://docs.docker.com/engine/security/security/</td>
</tr>
<tr>
<td>HOSTNAME_LOOKUP_URL</td>
<td>On Amazon ECS, a <a href="http://docs.aws.amazon.com/AWSEC2/latest/UserGuide/ec2-instance-metadata.html">meta data query</a> must be used to get the instance hostname (e.g. "169.254.169.254/latest/meta-data/local-hostname")</td>
</tr>
<tr>
<td>HTTPS_PROXY</td>
<td>URL for a proxy server (behind firewalls)</td>
</tr>
<tr>
<td>LOGSENE_RECEIVER_URL</td>
<td>URL for bulk inserts into Logsene. Required for Sematext Enterprise (local IP:PORT) or Sematext Cloud Europe: https://logsene-receiver.eu.sematext.com</td>
</tr>
<tr>
<td>SPM_RECEIVER_URL</td>
<td>URL for bulk inserts into Sematext Monitoring. Required for Sematext Enterprise (local IP:PORT) or Sematext Cloud Europe: https://spm-receiver.eu.sematext.com/receiver/v1.</td>
</tr>
<tr>
<td>EVENTS_RECEIVER_URL</td>
<td>URL for Monitoring events receiver. Required for Sematext Enterprise (local IP:PORT) or Sematext Cloud Europe: https://event-receiver.eu.sematext.com</td>
</tr>
<tr>
<td><strong>Docker Logs Parameters</strong></td>
<td></td>
</tr>
<tr>
<td>TAGGING_LABELS</td>
<td>A list of docker label names or environment variable names to tag container logs. Supporting wildcards e.g. TAGGING_LABELS='com.docker.swarm<em>,com.myapp.</em>'</td>
</tr>
<tr>
<td><strong>Whitelist containers for logging</strong></td>
<td></td>
</tr>
<tr>
<td>MATCH_BY_NAME</td>
<td>Regular expression to white list container names</td>
</tr>
<tr>
<td>MATCH_BY_IMAGE</td>
<td>Regular expression to white list image names</td>
</tr>
<tr>
<td><strong>Blacklist containers</strong></td>
<td></td>
</tr>
<tr>
<td>SKIP_BY_NAME</td>
<td>Regular expression to black list container names</td>
</tr>
<tr>
<td>SKIP_BY_IMAGE</td>
<td>Regular expression to black list image names for logging</td>
</tr>
<tr>
<td>PATTERNS_URL</td>
<td>Load pattern.yml via HTTP e.g. <code>-e PATTERNS_URL=https://raw.githubusercontent.com/sematext/logagent-js/master/patterns.yml</code></td>
</tr>
<tr>
<td>LOGAGENT_PATTERNS</td>
<td>Pass patterns.yml via env. variable e.g. <code>-e LOGAGENT_PATTERNS="$(cat ./patters.yml)"</code></td>
</tr>
<tr>
<td>LOGAGENT_PATTERNS_BASE64</td>
<td>Set to "true" if the LOGAGENT_PATTERNS patterns file you are passing in via env. variable is base64 encoded e.g <code>-e LOGAGENT_PATTERNS="$(cat ./patterns.yml | base64)"</code>. Useful if your params file is not getting set properly due to shell interpretation or otherwise.</td>
</tr>
<tr>
<td>PATTERN_MATCHING_ENABLED</td>
<td>Activate <a href="http://sematext.com/docs/logagent/parser/">logagent-js parser</a>, default value is <code>true</code>. To disable the log parser set the value to <code>false</code>. This could increase the throughput of log processing for nodes with a very high log volume.</td>
</tr>
<tr>
<td style="word-break: break-all;">-v /yourpatterns/patterns.yml:/etc/logagent/patterns.yml</td>
<td>to provide custom patterns for log parsing, see <a href="https://github.com/sematext/logagent-js">logagent-js</a></td>
</tr>
<tr>
<td>-v /tmp:/logsene-log-buffer</td>
<td>Directory to store logs, in a case of a network or service outage. Docker Agent deletes these files after successful transmission.</td>
</tr>
<tr>
<td>GEOIP_ENABLED</td>
<td><code>true</code>enables GeoIP lookups in the log parser, default value: <code>false</code></td>
</tr>
<tr>
<td>MAXMIND_DB_DIR</td>
<td>Directory for the Geo-IP lite database, must end with <code>/</code>. Storing the DB in a volume could save downloads for updates after restarts. Using <code>/tmp/</code> (ramdisk) could speed up Geo-IP lookups (requires add. ~30 MB main memory).</td>
</tr>
<tr>
<td>ENABLE_LOGSENE_STATS</td>
<td>Enables logging of transmission stats to Logsene. Default value 'false'. Provides a number of logs received, a number of logs shipped, number of failed/successful HTTP transmissions (bulk requests to Logsene) and retransmissions of failed requests.</td>
</tr>
<tr>
<td>LOGSENE_REMOVE_FIELDS</td>
<td style="word-break: break-all;">Removes fields from parsed/enriched logs. E.g. LOGSENE_REMOVE_FIELDS=logSource,container_host_name,swarm_node,password,creditCardNo</td>
</tr>
<tr>
<td>IGNORE_LOGS_PATTERN</td>
<td style="word-break: break-all;">Filter logs by a JS regular expression. E.g. <code>IGNORE_LOGS_PATTERN=\/healthcheck|\/ping</code></td>
</tr>
</tbody>
</table>
</div>




## Access to the Docker Socket  / Docker API

*Note that Docker Daemon can be configured to use Unix sockets
(default), TCP sockets (default port 2375) and TLS sockets
(authentication with certificates). Depending on your Docker setup,
Sematext Agent needs to be configured to access the Docker Socket (API
access).*

**Docker Unix Socket**

Make sure that you have the permissions to access /var/run/docker.sock
(or the actual location of the docker unix socket). E.g. use 'sudo' to
run the "docker run" command.

Check your permissions first:

``` bash
ls -la /var/run/docker.sock
srw-rw---- 1 root docker 0 Dec  3 07:52 /var/run/docker.sock
```

If you prefer to create a docker group to access docker without super
user permissions,
see <https://docs.docker.com/engine/installation/linux/docker-ee/ubuntu/>

**How to activate the Unix socket in parallel to a TCP socket?**
Check the configuration of the Docker Daemon in /etc/defaults/docker -
it is possible to activate TCP and the Unix socket in parallel - simply
add  "-H unix:///var/run/docker.sock" and restart dockerd.

``` bash
## /etc/defaults/docker
DOCKER_OPTS="-H tcp://0.0.0.0:2375 -H unix:///var/run/docker.sock"
```


Run Sematext Agent with access to the Unix socket:

``` bash
docker run --name sematext-agent --restart=always \
-v /var/run/docker.sock:/var/run/docker.sock \
-e MONITORING_TOKEN=YOUR_MONITORING_TOKEN -e LOGSENE_TOKEN=YOUR_LOGSENE_TOKEN \
sematext/sematextagent-docker
```

**Docker TCP Socket**

When Sematext Agent can't find the Unix socket it tries to connect to
Docker Daemon via TCP on port 2375. The parameter DOCKER\_PORT specifies
the TCP port of the local Docker Daemon (set in /etc/default/docker in
DOCKER\_OPTS). This setup is typically used in Docker Swarm Nodes (TCP
port 2375).

Run Sematext Agent with Access to Docker TCP
socket:

``` bash
docker run --name sematext-agent -e DOCKER_PORT=2375 -e MONITORING_TOKEN=YOUR_MONITORING_TOKEN -e LOGSENE_TOKEN=YOUR_LOGSENE_TOKEN sematext/sematextagent-docker
```

Relevant Parameters:

\-e DOCKER\_PORT - Sematext Agent will use the container gateway address
(autodetect) with the given DOCKER\_PORT

\-e DOCKER\_HOST - e.g.
tcp://ip-of-docker-host-reachable-from-container-network:2375/

**Docker TLS Socket**

To access the Docker TLS socket (on port 2376 or 3376 for Docker Swarm
Master), Sematext Agent needs access to the certificates. Please use the
following parameters to configure TLS access:

  - \-e DOCKER\_HOST - e.g. tcp://ip-reachable-from-container:2375/
  - \-e DOCKER\_TLS\_VERIFY - 0 or 1
  - \-e DOCKER\_CERT\_PATH - path to your certificate files, mount the
    path to the container with "-v
    $DOCKER\_CERT\_PATH:$DOCKER\_CERT\_PATH"

Run Sematext Agent with access to Docker TLS socket:

``` bash
# Example with docker-machine
docker-machine env --swarm swarm-master
# export DOCKER_TLS_VERIFY="1"
# export DOCKER_HOST="tcp://192.168.99.101:3376"
# export DOCKER_CERT_PATH="/Users/stefan/.docker/machine/machines/swarm-master"
# export DOCKER_MACHINE_NAME="swarm-master"
eval "$(docker-machine env swarm-master)"
docker run -d --name sematext-agent --restart=always
 -e MONITORING_TOKEN=YOUR_MONITORING_TOKEN  -e LOGSENE_TOKEN=YOUR_LOGSENE_TOKEN \
 -e DOCKER_TLS_VERIFY -e DOCKER_CERT_PATH -e DOCKER_HOST -v $DOCKER_CERT_PATH:$DOCKER_CERT_PATH \
sematext/sematext-agent-docker
```


## Blacklisting and Whitelisting Logs

Not all logs might be of interest, so sooner or later you will have the need to blacklist some log types.  This is one of the reasons why Sematext Docker Agent automatically adds the following tags to all logs:

- Container ID
- Container Name
- Image Name
- Docker Compose Project Name
- Docker Compose Service Name
- Docker Compose Container Number

Using this “log metadata” you can whitelist or blacklist log outputs by image or container names. The relevant environment variables are:

- MATCH_BY_NAME — a regular expression to whitelist container names
- MATCH_BY_IMAGE — a regular expression to whitelist image names
- SKIP_BY_NAME — a regular expression to blacklist container names
- SKIP_BY_IMAGE — a regular expression to blacklist image names

## Container Log Parsing

In Docker, logs are console output streams from containers. They might be a mix of plain text messages from start scripts and structured logs from applications.  The problem is obvious – you can’t just take a stream of log events all mixed up and treat them like a blob.  You need to be able to tell which log event belongs to what container, what app, parse it correctly in order to structure it so you can later derive more insight and operational intelligence from logs, etc.

Sematext Docker Agent analyzes the event format, parses out data, and turns logs into structured JSON.  This is important because the value of logs increases when you structure them — you can then slice and dice them and gain a lot more insight about how your containers, servers, and applications operate.

Traditionally it was necessary to use log shippers like Logstash, Fluentd or Rsyslog to parse log messages.  The problem is that such setups are typically deployed in a very static fashion and configured for each input source. That does not work well in the hyper-dynamic world of containers! We have seen people struggling with the Syslog drivers, parsers configurations, log routing, and more! With its integrated automatic format detection, Sematext Docker Agent eliminates this struggle — and the waste of resources — both computing and human time that goes into dealing with such things! This integration has a low footprint, doesn’t need retransmissions of logs to external services, and it detects log types for the most popular applications and generic JSON and line-oriented log formats out of the box!

![Example: Apache Access Log fields generated by Sematext Docker Agent](https://sematext.com/wp-content/uploads/2016/06/image17.png)

For example, Sematext Docker Agent can parse logs from official images like:

- Nginx, Apache, Redis, MongoDB, MySQL
- Elasticsearch, Solr, Kafka, Zookeeper
- Hadoop, HBase, Cassandra
- Any JSON output with special support for Logstash or Bunyan format
- Plain text messages with or without timestamps in various formats
- Various Linux and Mac OSX system logs

### Adding log parsing patterns

In addition, you can define your own patterns for any log format you need to be able to parse and structure. There are three options to pass individual log parser patterns:

- Configuration file in a mounted volume: ```-v PATH_TO_YOUR_FILE:/etc/logagent/patterns.yml```
  - Kubernetes ConfigMap example: [Template for patterns.yml as ConfigMap](https://github.com/sematext/sematext-agent-docker/blob/4944ae2eb81512dd490d1ebfbda76cb6ea88dd63/kubernetes/sematext-agent-patterns.yml)
- Content of the configuration file in an environment variable: ```-e LOGAGENT_PATTERNS=”$(cat patterns.yml)”```
- Set patterns URL as environment variable: ```-e PATTERNS_URL=http://yourserver/patterns.yml```

The file format for the patterns.yml file is based on JS-YAML, in short:

- `–` indicates an array element
- `!js/regexp` – indicates a JavaScript regular expression
- `!!js/function >` – indicates a JavaScript function


The file has the following properties:

- patterns: list of patterns, each pattern starts with “-“
	- match: a list of pattern definition for a specific log source (image/container)
		- sourceName: a regular expression matching the name of the log source. The source name is a combination of image name and container name.
	  - regex: JS regular expression
	  - fields: field list of extracted match groups from the regex
	  - type: type used in Logsene (Elasticsearch Mapping)
	  - dateFormat: format of the special fields ‘ts’, if the date format matches, a new field @timestamp is generated
	  - transform: A JavaScript function to manipulate the result of regex and date parsing

The following example shows pattern definitions for web server logs, which is one of the patterns available by default:
![Example from https://sematext.github.io/logagent-js/parser/](https://sematext.com/wp-content/uploads/2016/06/image05-1.png)


This example shows a few very interesting features:

- Masking sensitive data with “autohash” property, listing fields to be replaced with a hash code
- Automatic Geo-IP lookups including automatic updates for Maxmind Geo-IP lite database
- Post-processing of parsed logs with JavaScript functions

The component for detecting and parsing log messages — [logagent-js](http://sematext.com/docs/logagent/parser/) — is open source and contributions for even more log formats are welcome.


## Log Routing

Routing logs from different containers to separate Logsene Apps can be configured via docker labels (or environment variables e.g. on Kubernetes). Simply tag a container with the label (or environment variable) ```LOGSENE_TOKEN=YOUR_LOGSENE_TOKEN```.
Sematext Agent inspects the containers for this label and ships the logs to the specified Logsene App.

__Example:__
The following command will start Nginx webserver and logs for this container will be shipped to the related Logsene App.

```
docker run --label LOGSENE_TOKEN=REPLACE_WITH_YOUR_LOGSENE_TOKEN -p 80:80 nginx
# or use environment variable on Kubernetes (no support for Docker labels)
# docker run -e LOGSENE_TOKEN=REPLACE_WITH_YOUR_LOGSENE_TOKEN -p 80:80 nginx
```

All other container logs will be shipped to the Logsene App specified in the docker run command for ```sematext/sematext-agent-docker``` with the environment variable ```LOGSENE_TOKEN```.

By default, all logs from all containers are collected and sent to Logsene/Elasticsearch. You can change this default by setting the ```LOGSENE_ENABLED_DEFAULT=false``` label for the Sematext Docker Agent container. This default can be overridden, on each container, through the ```LOGSENE_ENABLED``` label.

Please refer to [Docker Log Management & Enrichment](https://sematext.com/blog/2017/05/15/docker-log-management-enrichment/) for further details.


## Known Issues

**Conflict with Docker logging-drivers. Sematext Docker Agent is running
with a valid Logsene Token, but Logsene does not show container logs. **

Please note that Sematext Docker Agent collects logs via Docker Remote
API. If you use a Docker logging-driver other than the default json-file
driver, logs will not be available via the Docker Remote API. Please
make sure that your container or docker daemon uses json-file logging
driver. This ensures that logs are exposed via Docker Remote API. To
check, run the "docker logs" command. If "docker logs CID" shows
container logs then Sematext Docker Agent should be able to collect the
logs as well.
