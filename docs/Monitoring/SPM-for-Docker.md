<div class="video_container">
<iframe class="video" src="https://www.youtube.com/embed/cLKnn1Qbxlc" frameborder="0" allowfullscreen ></iframe>
</div>
## Overview
  
The following information is collected and transmitted to SPM 
(Cloud or On-Premises version):SPM for Docker uses the open-source
 [Docker monitoring agent](https://github.com/sematext/sematext-agent-docker) available on
Docker Registry as a ready-to-go [sematext-agent-docker image](https://registry.hub.docker.com/u/sematext/sematext-agent-docker/).

<table>
<tbody>
<tr class="odd">
<td><strong>Type</strong></td>
<td><strong>Description</strong></td>
</tr>
<tr class="even">
<td><strong>Operating System Metrics</strong></td>
<td><p>Host machine metrics</p>
<ul>
<li>CPU Usage</li>
<li>Memory Usage</li>
<li>Network Stats</li>
<li>Disk I/O Stats</li>
</ul></td>
</tr>
<tr class="odd">
<td><strong>Docker Container Metrics/Stats</strong></td>
<td><ul>
<li>CPU Usage / limits</li>
<li>Memory Usage / Limits / Fail Counters</li>
<li>Network Stats</li>
<li>Disk I/O Stats</li>
</ul></td>
</tr>
<tr class="even">
<td><strong>Events</strong></td>
<td> </td>
</tr>
<tr class="odd">
<td> Agent Startup Event</td>
<td>server-info – created by spm-agent framework with node.js and OS version info on startup. Please note the agent is implemented in node.js.</td>
</tr>
<tr class="even">
<td> </td>
<td>Docker-info – Docker Version, API Version, Kernel Version on startup</td>
</tr>
<tr class="odd">
<td>Docker Events</td>
<td>Container Lifecycle Events| create, exec_create, destroy, export, ...</td>
</tr>
<tr class="even">
<td>Container Runtime Events</td>
<td>die, exec_start, kill, pause, restart, start, stop, unpause, ...</td>
</tr>
<tr class="odd">
<td><strong>Docker Logs</strong></td>
<td> </td>
</tr>
<tr class="even">
<td>Default Fields</td>
<td><ul>
<li>hostname / IP address</li>
<li>container id</li>
<li>container name</li>
<li>image name</li>
<li>message</li>
</ul></td>
</tr>
<tr class="odd">
<td><p>Log formats</p>
<p>(detection and log parsers)</p></td>
<td><ul>
<li>NGINX</li>
<li>APACHE httpd, Kafka, Solr, HBase, Zookeeper, Cassandra</li>
<li>MySQL</li>
<li>MongoDB</li>
<li>Redis</li>
<li>Elasticsearch</li>
<li>NSQ  / <a href="http://Nsq.io" class="external-link">Nsq.io</a></li>
<li>patterns are maintained here: 
<ul>
<li><a href="https://github.com/sematext/logagent-js" class="uri" class="external-link">https://github.com/sematext/logagent-js</a></li>
</ul></li>
</ul></td>
</tr>
<tr class="even">
<td> </td>
<td><span>JSON, Plain Text</span></td>
</tr>
</tbody>
</table>

## Supported Platforms

  - Docker \>= 1.6
  - Platforms using Docker:  
      - Docker Cloud
      - Docker Data Center
      - Kubernetes
      - Mesos
      - CoreOS
      - RancherOS
      - Amazon ECS
      - DEIS PaaS

## Installation and Configuration

1.  Create an SPM App of type "Docker" in SPM 
2.  Click the "**Install Monitor**" button and follow the customized
    instructions for the created SPM App  
      

Step 2) provides customized instructions (including the SPM App Token)
for this general procedure:

**Installation** of the Docker Image of the monitoring agent:

``` bash
docker pull sematext/sematext-agent-docker
```

**Configuration** during start of sematext-agent-docker:

  - Set the SPM\_TOKEN
  - Pass the Docker UNIX domain socket to the
container  
      

<!-- end list -->

``` bash
docker run -d --name sematext-agent -e SPM_TOKEN=YOUR-SPM-TOKEN -v /var/run/docker.sock:/var/run/docker.sock sematext/sematext-agent-docker
```

**Environment Variables** (passed by "-e" in the command line):

<table>
<tbody>
<tr class="odd">
<td><strong>Environment Variable</strong></td>
<td><strong>Description</strong></td>
</tr>
<tr class="even">
<td><em>SPM_TOKEN </em></td>
<td>The identifier of your SPM App for Docker. SPM Overview of your Apps: <a href="https://apps.sematext.com/ui/monitoring" class="uri" class="external-link">https://apps.sematext.com/ui/monitoring</a></td>
</tr>
<tr class="odd">
<td>HOSTNAME_LOOKUP_URL</td>
<td>On Amazon ECS the &quot;HOSTNAME&quot; variable is not avialable for container tasks. Please point HOSTNAME_LOOKUP_URL to <span style="color: rgb(0,0,0);">&quot;169.254.169.254/latest/meta-data/local-hostname&quot;</span></td>
</tr>
<tr class="even">
<td><p>HTTPS_PROXY </p></td>
<td><span> URL for a proxy server</span></td>
</tr>
<tr class="odd">
<td><strong>Parameters for logging</strong></td>
<td> </td>
</tr>
<tr class="even">
<td><em>LOGSENE_TOKEN</em></td>
<td><div class="content-wrapper">
<p> The identifier for a <a href="http://sematext.com/logsene/" class="external-link">Logsene</a> App</p>
<ul>
<li>When this parameter is present all outputs of containers are shipped to Logsene by default</li>
<li><p>In addition a log forwarding service is started on exposed port 9000, to expose the service please use &quot;-p YOUR_LOGGING_PORT:9000&quot;<br />
The service accepts line delimited JSON (like logstash, bunyan format) or text input (like syslog lines) and forwards it to the specified Logsene Application <br />
Example:</p>
<div class="code panel pdl" style="border-width: 1px;">
<div class="codeContent panelContent pdl">
<pre class="syntaxhighlighter-pre" data-syntaxhighlighter-params="brush: java; gutter: false; theme: Confluence" data-theme="Confluence"><code>journalctl -o json | ncat localhost $LOGGING_PORT </code></pre>
</div>
</div>
<p>or</p>
<div class="code panel pdl" style="border-width: 1px;">
<div class="codeContent panelContent pdl">
<pre class="syntaxhighlighter-pre" data-syntaxhighlighter-params="brush: java; gutter: false; theme: Confluence" data-theme="Confluence"><code> tail -f /var/log/access.log | netcat localhost $LOGGING_PORT</code></pre>
</div>
</div>
<p><em>Supported input formats:</em></p>
<ul>
<li><strong>journalctl</strong> -o short | short-iso | json 
<ul>
<li>Messages from dockerd are parsed from MESSAGE field<br />
using time, level and message fields</li>
<li>We recommend to use the json option to make all fields available in Logsene</li>
</ul></li>
<li><strong>Bunyan</strong> JSON format (node.js)</li>
<li><strong>Logstash</strong> JSON format</li>
<li><strong>Syslog</strong> lines  <br />
<br />
</li>
</ul></li>
</ul>
</div></td>
</tr>
<tr class="odd">
<td><strong><em>Filter logs from specific containers</em></strong></td>
<td> </td>
</tr>
<tr class="even">
<td>MATCH_BY_NAME</td>
<td> a regular expression to whitelist containers by name</td>
</tr>
<tr class="odd">
<td>MATCH_BY_IMAGE</td>
<td>a regular expression to whitelist contianers by image names </td>
</tr>
<tr class="even">
<td>SKIP_BY_NAME</td>
<td>a regular expression to ignore containers by name</td>
</tr>
<tr class="odd">
<td>SKIP_BY_IMAGE</td>
<td>a regular expression to ignore containers by image names </td>
</tr>
<tr class="even">
<td>DISABLE_DOCKER_LOGS</td>
<td>disables the collection of logs via Docker API (e.g. if you use the TCP service to provide logs)</td>
</tr>
<tr class="odd">
<td>REMOVE_ANSI_ESCAPE_SEQ</td>
<td><span>removes ANSI terminal escape sequences (e.g. colored logs) before the parsing starts. </span>Default value: &quot;enabled&quot;</td>
</tr>
<tr class="even">
<td><strong>Custom pattern definitions for the log parser</strong></td>
<td> </td>
</tr>
<tr class="odd">
<td>Custom pattern definitions in a Docker volume</td>
<td><p>To use a custom pattern definition for <a href="https://github.com/sematext/spm-agent-docker#integrated-log-parser" class="external-link">the integrated log parser</a> simply mount a file to '/etc/logagent/patterns.yml':</p>
<pre><code>-v $(pwd)/patterns.yml:/etc/logagent/patterns.yml</code></pre></td>
</tr>
<tr class="even">
<td>PATTERNS_URL</td>
<td>To use a custom pattern definition for <a href="https://github.com/sematext/spm-agent-docker#integrated-log-parser" class="external-link">the integrated log parser</a> from the given URL to a patterns.yml file.</td>
</tr>
<tr class="odd">
<td>LOGAGENT_PATTERNS</td>
<td>To use a custom pattern definition for <a href="https://github.com/sematext/spm-agent-docker#integrated-log-parser" class="external-link">the integrated log parser</a> via env. variable e.g. <code>-e LOGAGENT_PATTERNS=&quot;$(cat ./patters.yml)&quot;</code></td>
</tr>
<tr class="even">
<td>PATTERN_MATCHING_ENABLED</td>
<td>Activate <a href="https://sematext.github.io/logagent-js/parser/" class="external-link">logagent-js parser</a>, default value is <code>true</code>. To disable the log parser set the value to <code>false</code>. This could increase the throughput of log processing for nodes with a very high log volume. Please note, logs are always tagged with container meta data (name, image, compose project/service etc.).</td>
</tr>
<tr class="odd">
<td><strong>Volume mount to access Docker Unix Socket</strong></td>
<td><p><strong>-v <a href="http://path_to_unix_docker_socket/var/run/docker.sock" class="external-link">PATH_TO_UNIX_DOCKER_SOCKET:/var/run/docker.sock</a></strong>  - The monitoring container needs access to the hosts Docker socket to make be able to get the stats. The location in the container is /var/run/docker.sock. </p></td>
</tr>
<tr class="even">
<td> </td>
<td><p><span>The parameter <strong>--privileged</strong> might be helpful when Sematext Docker Agent could not start because of limited permission to connect and write to the Docker socket /var/run/docker.sock. The privileged mode is a potential security risk, we recommend to enable the appropriate security. Please read about Docker security:</span><a href="https://docs.docker.com/engine/security/security/" class="uri" class="external-link">https://docs.docker.com/engine/security/security/</a></p></td>
</tr>
<tr class="odd">
<td><strong>Settings for On Premises</strong></td>
<td> </td>
</tr>
<tr class="even">
<td><span>LOGSENE_RECEIVER_URL</span></td>
<td><span>URL for bulk inserts into Logsene. Required only for Logsene On-Premises only.</span></td>
</tr>
<tr class="odd">
<td><span>SPM_RECEIVER_URL</span></td>
<td><span>URL for bulk inserts into SPM. Required only for SPM On-Premises.</span></td>
</tr>
<tr class="even">
<td>EVENTS_RECEIVER_URL</td>
<td>URL for SPM events receiver. Required for SPM On-Premises only.</td>
</tr>
<tr class="odd">
<td><strong>Geo-IP Configuration</strong></td>
<td> </td>
</tr>
<tr class="even">
<td><span>GEOIP_ENABLED</span></td>
<td><code>true </code><span>enables GeoIP lookups in the log parser, default value: </span><code>false</code></td>
</tr>
<tr class="odd">
<td><span>MAXMIND_DB_DIR</span></td>
<td><span>Directory for the Geo-IP lite database, must end with </span><code>/</code><span>. Storing the DB in a volume could save downloads for updates after restarts. Using </span><code>/tmp/</code><span> (ramdisk) could speed up Geo-IP lookups (consumes add. ~30 MB main memory).</span></td>
</tr>
</tbody>
</table>

## Docker Swarm, Docker UCP and Docker Datacenter

Connect your Docker client to Swarm or UCP remote API endpoint and
deploy following docker-compose.yml file with your SPM and Logsene
token: 

``` bash
sematext-agent-docker:
image: 'sematext/sematext-agent-docker:latest'
environment:
 - LOGSENE_TOKEN="REPLACE THIS WITH YOUR LOGSENE TOKEN"
 - SPM_TOKEN="REPLACE THIS WITH YOUR SPM TOKEN"
 - affinity:container!=*sematext-agent-docker*
  restart: always
  volumes:
    - /var/run/docker.sock:/var/run/docker.sock
```

Then use docker-compose scale to deploy the agent to each
node. 

``` bash
docker-compose scale sematext-agent-docker=$(docker info | grep Nodes | awk '{ print $2 }')
```

## CoreOS Support

To install SPM for Docker including log forwarding from journald execute
these commands:

``` bash
export $SPM_TOKEN=YOUR-SPM-TOKEN
export $LOGSENE_TOKEN=YOUR-SPM-TOKEN
etcdctl set /sematext.com/myapp/spm/token $SPM_TOKEN
etcdctl set /sematext.com/myapp/logsene/token $LOGSENE_TOKEN
wget https://raw.githubusercontent.com/sematext/sematext-agent-docker/master/coreos/sematext-agent.service
fleetctl load sematext-agent.service; fleetctl start sematext-agent.service
wget https://raw.githubusercontent.com/sematext/sematext-agent-docker/master/coreos/logsene.service
fleetctl load logsene.service; fleetctl start logsene.service; 
```

Please note the provided .service scripts use port 9000 for the logging
service. The provided service templates could be changed after the
download.

An alternative way to install the services is to include the content of
the unit files in the cloud-init config file. 

The latest documentation, install script, and service files are
available in the [Github repository](https://github.com/sematext/sematext-agent-docker/tree/master/coreos)

## Access to the Docker Socket  / Docker API  

**Please note the Docker Daemon can be configured to use Unix sockets
(default), TCP sockets (default port 2375) and TLS sockets
(authentication with certificates). Depending on your Docker setup,
Sematext Agent needs to be configured to access the Docker Socket (API
access).  
**

**Docker Unix Socket**

Make sure that you have the permissions to access /var/run/docker.sock
(or the actual location of the docker  unix socket). E.g. use 'sudo' to
run the "docker run" command.

Check your permissions first:

``` bash
ls -la /var/run/docker.sock
srw-rw---- 1 root docker 0 Dec  3 07:52 /var/run/docker.sock
```

If you like to create a docker group, to access docker without super
user permissions,
see <https://docs.docker.com/engine/installation/linux/docker-ee/ubuntu/>

**How to activate the Unix socket in parallel to a TCP socket?**  
Check the configuration of the Docker Daemon in /etc/defaults/docker -
it is possible to activate TCP and the Unix socket in parallel, simply
add  "-H unix:///var/run/docker.sock" and restart dockerd.

``` bash
## /etc/defaults/docker
DOCKER_OPTS="-H tcp://0.0.0.0:2375 -H unix:///var/run/docker.sock"
```

  
Run Sematext Agent with access to the Unix socket:

``` bash
docker run --name sematext-agent --restart=always \
-v /var/run/docker.sock:/var/run/docker.sock \ 
-e SPM_TOKEN=YOUR_SPM_TOKEN -e LOGSENE_TOKEN=YOUR_LOGSENE_TOKEN \ 
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
docker run --name sematext-agent -e DOCKER_PORT=2375 -e SPM_TOKEN=YOUR_SPM_TOKEN -e LOGSENE_TOKEN=YOUR_LOGSENE_TOKEN sematext/sematextagent-docker
```

Relevant Parameters:

\-e DOCKER\_PORT - Sematext Agent will use the container gateway address
(autodetect) with the given DOCKER\_PORT

\-e DOCKER\_HOST - e.g.
tcp://ip-of-docker-host-reachable-from-container-network:2375/

**Docker TLS Socket**

To access the Docker TLS socket (on port 2376 or 3376 for Docker Swarm
Master), Sematext Agent needs access to the certifcates. Please use the
following parameters to configure TLS access:

  - \-e DOCKER\_HOST - e.g. tcp://ip-reachable-from-container:2375/
  - \-e DOCKER\_TLS\_VERIFY - 0 or 1
  - \-e DOCKER\_CERT\_PATH - path to your certificate files, mount the
    path to the countainer with "-v
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
 -e SPM_TOKEN=YOUR_SPM_TOKEN  -e LOGSENE_TOKEN=YOUR_LOGSENE_TOKEN \
 -e DOCKER_TLS_VERIFY -e DOCKER_CERT_PATH -e DOCKER_HOST -v $DOCKER_CERT_PATH:$DOCKER_CERT_PATH \ 
sematext/sematext-agent-docker
```

 

## Known Issues

**Conflict with Docker logging-drivers. Sematext Docker Agent is running
with a valid Logsene Token, but Logsene does not show container logs. **

Please note that Sematext Docker Agent collects logs via Docker Remote
API. If you use a Docker logging-driver other than the default json-file
driver, logs will not be available via the Docker Remote API. Please
make sure that your container or docker daemon uses json-file logging
driver. This ensures that logs are exposed via Docker Remote API. To
check, run the "docker logs" command. If "docker logs CID" is shows
container logs then Sematext Docker Agent should be able to collect the
logs as well. 

## Troubleshooting and How-To

The following command enables **debug** information to stdout - to be
displayed with "docker logs
container\_id\_of\_sematext-agent-docker":

``` bash
docker run -d --name sematext-agent -e SPM_TOKEN=YOUR-SPM_TOKEN -e spmagent_logger__console=true -e spmagent_logger__level=debug -v /var/run/docker.sock:/var/run/docker.sock sematext/sematext-agent-docker
docker logs sematext-agent
```

Parameters for debug
output:

``` bash
-e SPM_LOG_TO_CONSOLE=true - enables internal log messages to the console. Normally only metrics and errors are logged to the console
-e SPM_LOG_LEVEL=debug - "info|warn|error|debug" - set this to "debug" to see all messages on console
-e DEBUG_SPM_LOGGING=enabled - very detailed logging before parsing, after parsing, inserts to Logsene, etc. - please activate it only on demand from our support
```

  

If running Sematext Docker Agent in debug mode doesn't help you spot and
solve the problem please send us the diagnostics package as described
below.

Run the following to collect basic information for our support, such as
environment variables, and configuration:

``` bash
$ docker exec -it sematext-agent spm-client-diagnostics
...
SPM diagnostics info is in /tmp/spm-diagnose.zip
Please e-mail the file to support@sematext.com
```

Please contact us via chat or email us the output of that command and
the generated ZIP file (to support@sematext.com). You can copy the ZIP
file to your host using "docker cp":

``` bash
docker cp sematext-agent:/tmp/spm-diagnose.zip .
```

Github Repository

Latest information
for [sematext-agent-docker](https://github.com/sematext/sematext-agent-docker)
and [open issues](https://github.com/sematext/sematext-agent-docker/issues)

