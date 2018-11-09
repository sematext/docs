title: Install Logagent
description: Logagent, Sematext log shipper and Logstash alternative, is available as Docker image. It has automatic Docker installation and seamless logging system service integration with our logs management and analysis platform


[Logagent](https://sematext.com/docs/logagent) is a general purpose log shipper. The [Logagent Docker image](https://hub.docker.com/r/sematext/logagent/) is tailored for the log collection on container platforms. It runs as a tiny container on every Docker host and collects logs for all cluster nodes and their containers. 

## Installation for Docker


To run Logagent you will need a Logs App Token (aka LOGSENE_TOKEN).  If you don't have Logs Apps yet, you can [create Apps now](https://apps.sematext.com/ui/integrations)

## Docker image

The Logagent image can be found:
- On Docker Hub: [sematext/logagent](https://hub.docker.com/r/sematext/logagent/) on Docker Hub

## Docker Run

The most basic start method is using docker run command:

```
docker pull sematext/logagent
docker run -d --name logagent \
-e LOGSENE_TOKEN=YOUR_LOGSENE_TOKEN \
-v /var/run/docker.sock:/var/run/docker.sock sematext/logagent
```


## Docker Compose

To use [Docker Compose](https://docs.docker.com/compose/) create docker-compose.yml as follows and insert real tokens:

```

# docker-compose.yml
logagent:
  image: 'sematext/logagent:latest'
  environment:
    - LOGSENE_TOKEN=YOUR_LOGSENE_TOKEN 
  cap_add:
    - SYS_ADMIN
  restart: always
  volumes:
    - '/var/run/docker.sock:/var/run/docker.sock'

```

Then start Logagent with the docker-compose file: 

```
docker-compose up -d
```

## Docker Swarm and Docker Enterprise

Connect your Docker client to Swarm or UCP remote API endpoint and
deploy Sematext Docker Agent with following docker command with your SPM and Logsene tokens:

```bash
docker service create -mode global -name logagent \
-mount type=bind,src=/var/run/docker.sock,dst=/var/run/docker.sock \
-e LOGSENE_TOKEN=”REPLACE THIS WITH YOUR LOGSENE TOKEN” \
sematext/logagent
```

## Kubernetes and Red Hat OpenShift

Run Sematext Agent as [Kubernetes DaemonSet](https://kubernetes.io/docs/concepts/workloads/controllers/daemonset).

First, create [logagent-daemonset.yml](https://github.com/sematext/logagent-js/blob/master/kubernetes/logagent-daemonset.yml) - and set your Logsene token in the spec.env section.

Then run the DaemonSet:

```
kubectl create -f logagent-daemonset.yml
```

On Red Hat OpenShift use the "oc" command instead of kubectl.

```
oc apply -f logagent-daemonset.yml
```

## Mesos / Marathon

The following configuration will activate Sematext Docker Agent on every node in the Mesos cluster. Please note that you have to specify the number of Mesos nodes (instances), SPM App Token and Logsene App Token. An example call to the Marathon API:

```
curl -XPOST -H "Content-type: application/json" http://your_marathon_server:8080/v2/apps  -d '
{
  "container": {
    "type": "DOCKER",
    "docker": {
      "image": "sematext/logagent"
    },
    "volumes": [
      {
        "containerPath": "/var/run/docker.sock",
        "hostPath": "/var/run/docker.sock",
        "mode": "RW"
      }
    ],
    "network": "BRIDGE"
  },
  "env": {
        "LOGSENE_TOKEN": "YOUR_LOGSENE_TOKEN"
  },
  "id": "sematext-logagent",
  "instances": 1,
  "cpus": 0.1,
  "mem": 100,
  "constraints": [
    [
      "hostname",
      "UNIQUE"
    ]
  ]
}
```

## Configuration options

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
<td>LOGSENE_TOKEN</td>
<td>Logsene Application Token enables logging to Logsene, see logging specific parameters for filter options and Log Routing section to route logs from different containers to separate Logsene applications</td>
</tr>
<tr>
<td><code>-v /var/run/docker.sock</code></td>
<td>Path to the docker socket </td>
</tr>
<td><strong>Optional Parameters:</strong></td>
<td></td>
</tr>
<tr><td>REGION</td>
  <td>Sematext Cloud region **US** or **EU** (default: US). The receiver URL will be set to EU/US default values. When using REGION, you don't need to set LOGSENE_RECEIVER_URL (see below).
  </td>
</tr>
<tr>
  
<tr><td>LOG_GLOB</td>
  <td>Semicolon-separated list of file globs (e.g. <code>/var/log/**/*.log;/mylogs/**/*.log</code>) to collect log files from the host, assuming the log files are mounted to <code>/mylogs</code> using Docker <code> -v /var/logs:/mylogs</code> </td>
</tr>  
<tr><td>LOGAGENT_ARGS</td>
  <td>
    Additional <a href="https://sematext.com/docs/logagent/cli-parameters/">command line arguments for Logagent</a> (e.g. <code>LOGAGENT_ARGS="-n httpd"</code> to specify a log source name or <code>LOGAGENT_ARGS="-u 514"</code> to act as syslog server)
</td>
</tr>  
<td>--privileged</td>
<td>The parameter might be helpful when Sematext Agent could not start because of limited permission to connect and write to the Docker socket /var/run/docker.sock. The privileged mode is a potential security risk, we recommend to enable the appropriate security. Please read about Docker security: https://docs.docker.com/engine/security/security/</td>
</tr>
<td>HTTPS_PROXY</td>
<td>URL for a proxy server (behind firewalls)</td>
</tr>
<tr>
<td>LOGSENE_RECEIVER_URL</td>
<td>URL for bulk inserts into Logsene. Required for Sematext Enterprise (local IP:PORT) or Sematext Cloud Europe: https://logsene-receiver.eu.sematext.com</td>
</tr>
<td>EVENTS_RECEIVER_URL</td>
<td>URL for SPM events receiver. Required for Sematext Enterprise (local IP:PORT) or Sematext Cloud Europe: https://event-receiver.eu.sematext.com</td>
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
</tbody>
</table>
</div>

See [Logagent Documentation](https://sematext.com/docs/logagent) for more info.

