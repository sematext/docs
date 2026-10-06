title: Sematext Agent Configuration
description: Settings that apply to Sematext Agent however it is installed, on Linux hosts, in Docker, or in Kubernetes

Use these settings to configure Sematext Agent however you installed it: on a Linux host, in Docker, or in Kubernetes. Settings for a specific environment are on their own pages:

- [Containers configuration](/docs/agents/sematext-agent/containers/configuration/) for Docker connection, container filtering, and passing settings to the agent container
- [Kubernetes configuration](/docs/agents/sematext-agent/kubernetes/configuration/) for Kubernetes settings and passing settings through a DaemonSet or Helm

## Configuration File

Sematext Agent reads its settings from the `st-agent.yml` file. On a Linux host, the file is at `/opt/spm/properties/st-agent.yml`. When the agent runs in a container, mount the file into the container and set the `CONFIG_FILE` environment variable to its path.

The configuration file accepts all options listed below in YAML format.

```yaml
# Sematext Agent configuration file
infra-token: <YOUR_INFRA_APP_TOKEN_HERE>
# Logs token to store Docker and Kubernetes Events in Sematext Logs
logs-token: <YOUR_LOGS_APP_TOKEN_HERE>
# Location to persist events, when backend is not reachable
journal:
  dir: /var/run/st-agent

pkg:
 enabled: true

logging:
  format: json
  write-events: false
  request-tracking: false
  level: warning
```

## Environment Variables

You can also set each option as an environment variable. The variable name is the option name in upper case, with `.` and `-` replaced by `_`. For example, `journal.retry-interval` becomes `JOURNAL_RETRY_INTERVAL`.

| Variable | Description |
|----------|-------------|
| **Firewall and Proxy Settings** | |
| PROXY_HOST, PROXY_PORT, PROXY_PASSWORD, PROXY_USERNAME, PROXY_SECURE | These variables specify the settings for the proxy server. |
| **Process Monitoring** | |
| PROCESS_ENABLED | Specifies if process metrics collection is enabled. To disable process metrics collector set `PROCESS_ENABLED=false`. See [Process Monitoring configuration](/docs/agents/sematext-agent/processes/configuration/). |
| **Troubleshooting Options** | |
| LOGGING_LEVEL | Defines the minimal allowed log level. Default log level is `info`. You can choose between `debug`, `info`, `warn/warning`, `error`, `fatal` and `panic`. |
| LOGGING_WRITE_EVENTS | Defines whether event payloads are written to standard output stream. Useful for debugging. You can disable this feature by setting `LOGGING_WRITE_EVENTS=false`. |
| **Other Agent Settings** | |
| INTERVAL | Specifies the collection interval for metrics collectors. Default interval is `10s`. You can specify a duration for collection interval in seconds, minutes or hours (`INTERVAL=1m`). |
| JOURNAL_DIR | Defines the data directory where failed events are stored. Agent periodically scans this directory and resends events to the backend. |
| JOURNAL_RETRY_INTERVAL | Specifies how often journal directory is scanned for failed events. Default interval is `30s`. You can specify a different interval in either seconds, minutes or hours (`JOURNAL_RETRY_INTERVAL=5m`) |
| AUTODISCO_TEMPLATES_PATH | Defines the location of the `autodisco.yml` file that contains definitions of patterns involved in app auto-discovery. |
| HOSTNAME_ALIAS | When specified it overrides the original host name. |
