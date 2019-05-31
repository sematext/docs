## Container Logging

The [Logagent Docker image](https://hub.docker.com/r/sematext/logagent/) is tailored for the log collection on container platforms. It runs as a tiny container on every Docker host and collects logs for all cluster nodes and their containers. It is open-source agent created by Sematext.

Logagent detects known log formats and structures your logs for supported applications and structures logs automatically. You can configure the log parser for any application by providing your pattern definitions or by contributing to the open source pattern definitions in the [patterns.yml](https://github.com/sematext/logagent-js/blob/master/patterns.yml) file.

Logagent enriches all container logs with metadata, such as container labels, Kubernetes metadata or Swarm metadata.

## More about Docker Monitoring
* [Docker Container Monitoring with Sematext](https://sematext.com/blog/docker-container-monitoring-with-sematext/)
* [Docker Container Monitoring and Management Challenges](https://sematext.com/blog/docker-container-monitoring-management-challenges/)
* [Docker Container Performance Metrics](https://sematext.com/blog/top-docker-metrics-to-watch/)
