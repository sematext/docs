title: Install Logagent
description: Logagent, Sematext log shipper and Logstash alternative, is available as Docker image. It has automatic Docker installation and seamless logging system service integration with our log management and analysis platform


## Installation for Docker

The Logagent Docker image is pre-configured to collect container logs including enrichment of logs with Kubernetes and Docker EE/Swarm metadata. 

To run Sematext Docker Agent you will need a Logs App Token.  If you don't have Logs Apps yet, you can [create Apps now](https://apps.sematext.com/ui/integrations).

See: [sematext/logagent](https://hub.docker.com/r/sematext/logagent/) on Docker Hub. 

## Basic configuration options

The [Logagent](https://sematext.com/logagent) docker container can be configured through the following environment variables:

* **REGION**: Sematext Cloud region **US** or **EU** (default: US). The receiver URL will be set to EU/US default values. When using REGION, you don't need to set LOGS_RECEIVER_URL (see below).
* **LOGS_RECEIVER_URL**: The URL of your Elasticsearch Endpoint _(defaults to Sematext Cloud US https://logsene-receiver.sematext.com)_. 
  - For Sematext Europe use https://logsene-receiver.eu.sematext.com. 
  - For Elasticsearch https://elasticserch-server-name:9200.
* **LOGS_TOKEN**: The index where the agent should log to _(for [Sematext Cloud](https://sematext.com/cloud) users the logs token)_
* **LOG_GLOB**: Semicolon-separated list of file globs __(e.g. /mylogs/**/*.log;/var/log/**/*.log)__. Mount your server log files into the container using a Docker volume e.g. `-v /var/log:/mylogs`. 
* **LOGAGENT_ARGS**: Additional [command line arguments for Logagent](https://sematext.com/docs/logagent/cli-parameters/) _(e.g. LOGAGENT_ARGS="-n httpd" to specify a log source name or LOGAGENT_ARGS="-u 514" to act as syslog server)_. Please refer to Logagent command line argumetns in the [Logagent Documentation](https://sematext.com/docs/logagent/cli-parameters/)

## Docker Run

The most basic start method is using docker run command:

```
docker pull sematext/logagent
docker run -d --name logagent \
-e LOGS_TOKEN=YOUR_LOGS_TOKEN \
-e LOGS_RECEIVER_URL="https://logsene-receiver.sematext.com"
-v /var/run/docker.sock:/var/run/docker.sock sematext/logagent
```


## Docker Compose

To use [Docker Compose](https://docs.docker.com/compose/) create docker-compose.yml as follows and insert real tokens:

```

# docker-compose.yml
logagent:
  image: 'sematext/logagent:latest'
  environment:
    - LOGS_TOKEN=YOUR_LOGS_TOKEN 
    - LOGS_RECEIVER_URL="https://logsene-receiver.sematext.com"
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
deploy Sematext Docker Agent with following docker command with your Logs Tokens:

```
docker service create -mode global -name logagent \
-mount type=bind,src=/var/run/docker.sock,dst=/var/run/docker.sock \
-e LOGS_TOKEN="REPLACE THIS WITH YOUR LOGS TOKEN" \
-e LOGS_RECEIVER_URL="https://logsene-receiver.sematext.com"
sematext/logagent
```

## Kubernetes and Red Hat OpenShift

Run Sematext Agent as [Kubernetes DaemonSet](https://kubernetes.io/docs/concepts/workloads/controllers/daemonset).

First, create [logagent-daemonset.yml](https://github.com/sematext/logagent-js/blob/master/kubernetes/logagent-daemonset.yml) - and set your Logs Token in the spec.env section.

Then run the DaemonSet:

```
kubectl create -f logagent-daemonset.yml
```

On Red Hat OpenShift use the "oc" command instead of kubectl.

```
oc apply -f logagent-daemonset.yml
```

## Mesos / Marathon

The following configuration will activate Sematext Docker Agent on every node in the Mesos cluster. Please note that you have to specify the number of Mesos nodes (instances) and Logs Token. An example call to the Marathon API:

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
        "LOGS_TOKEN": "YOUR_LOGS_TOKEN",
        "LOGS_RECEIVER_URL": "https://logsene-receiver.sematext.com"

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

| Parameter / Environment variable                         | Description                                                                                                                                                                                                                                                                                                                                              |
|----------------------------------------------------------|----------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------|
| Required Parameters                                      |                                                                                                                                                                                                                                                                                                                                                          |
| LOGS_TOKEN                                               | Logsene Application Token enables logging to Logsene, see logging specific parameters for filter options and Log Routing section to route logs from different containers to separate Logsene applications                                                                                                                                                |
| -v /var/run/docker.sock                                  | Path to the docker socket                                                                                                                                                                                                                                                                                                                                |
| Optional Parameters:                                     |                                                                                                                                                                                                                                                                                                                                                          |
| REGION                                                   | Sematext Cloud region **US** or **EU** (default: US). The receiver URL will be set to EU/US default values. When using REGION, you don't need to set LOGS_RECEIVER_URL (see below).                                                                                                                                                                      |
| LOG_GLOB                                                 | Semicolon-separated list of file globs (e.g. /var/log/**/*.log;/mylogs/**/*.log) to collect log files from the host, assuming the log files are mounted to /mylogs using Docker -v /var/logs:/mylogs                                                                                                                                                     |
| LOGAGENT_ARGS                                            | Additional command line arguments for Logagent (e.g. LOGAGENT_ARGS="-n httpd" to specify a log source name or LOGAGENT_ARGS="-u 514" to act as syslog server)                                                                                                                                                                                            |
| --privileged                                             | The parameter might be helpful when Sematext Agent could not start because of limited permission to connect and write to the Docker socket /var/run/docker.sock. The privileged mode is a potential security risk, we recommend to enable the appropriate security. Please read about Docker security: https://docs.docker.com/engine/security/security/ |
| HTTPS_PROXY                                              | URL for a proxy server (behind firewalls)                                                                                                                                                                                                                                                                                                                |
| LOGS_RECEIVER_URL                                        | URL for bulk inserts into Sematext Cloud. Required for Sematext Enterprise (local IP:PORT) or Sematext Cloud Europe: https://logsene-receiver.eu.sematext.com                                                                                                                                                                                            |
| Docker Logs Parameters                                   |                                                                                                                                                                                                                                                                                                                                                          |
| TAGGING_LABELS                                           | A list of docker label names or environment variable names to tag container logs. Supporting wildcards e.g. TAGGING_LABELS='com.docker.swarm,com.myapp.'                                                                                                                                                                                                 |
| Whitelist containers for logging                         |                                                                                                                                                                                                                                                                                                                                                          |
| MATCH_BY_NAME                                            | Regular expression to white list container names                                                                                                                                                                                                                                                                                                         |
| MATCH_BY_IMAGE                                           | Regular expression to white list image names                                                                                                                                                                                                                                                                                                             |
| Blacklist containers                                     |                                                                                                                                                                                                                                                                                                                                                          |
| SKIP_BY_NAME                                             | Regular expression to black list container names                                                                                                                                                                                                                                                                                                         |
| SKIP_BY_IMAGE                                            | Regular expression to black list image names for logging                                                                                                                                                                                                                                                                                                 |
| PATTERNS_URL                                             | Load pattern.yml via HTTP e.g. -e PATTERNS_URL=https://raw.githubusercontent.com/sematext/logagent-js/master/patterns.yml                                                                                                                                                                                                                                |
| LOGAGENT_PATTERNS                                        | Pass patterns.yml via env. variable e.g. -e LOGAGENT_PATTERNS="$(cat ./patters.yml)"                                                                                                                                                                                                                                                                     |
| LOGAGENT_PATTERNS_BASE64                                 | Set to "true" if the LOGAGENT_PATTERNS patterns file you are passing in via env. variable is base64 encoded e.g `-e LOGAGENT_PATTERNS="$(cat ./patterns.yml &#124; base64)"`. Useful if your params file is not getting set properly due to shell interpretation or otherwise.                                                                                  |
| PATTERN_MATCHING_ENABLED                                 | Activate logagent-js parser, default value is true. To disable the log parser set the value to false. This could increase the throughput of log processing for nodes with a very high log volume.                                                                                                                                                        |
| -v /yourpatterns/patterns.yml:/etc/logagent/patterns.yml | to provide custom patterns for log parsing, see logagent-js                                                                                                                                                                                                                                                                                              |
| -v /tmp:/logsene-log-buffer                              | Directory to store logs, in a case of a network or service outage. Docker Agent deletes these files after successful transmission.                                                                                                                                                                                                                       |
| GEOIP_ENABLED                                            | trueenables GeoIP lookups in the log parser, default value: false                                                                                                                                                                                                                                                                                        |
| MAXMIND_DB_DIR                                           | Directory for the Geo-IP lite database, must end with /. Storing the DB in a volume could save downloads for updates after restarts. Using /tmp/ (ramdisk) could speed up Geo-IP lookups (requires add. ~30 MB main memory).                                                                                                                             |
| ENABLE_LOGSENE_STATS                                     | Enables logging of transmission stats to Sematext Cloud. Default value 'false'. Provides a number of logs received, a number of logs shipped, number of failed/successful HTTP transmissions (bulk requests to Sematext Cloud) and retransmissions of failed requests.                                                                                   |
| LOGSENE_REMOVE_FIELDS                                    | Removes fields from parsed/enriched logs. E.g. LOGSENE_REMOVE_FIELDS=logSource,container_host_name,swarm_node,password,creditCardNo  |
