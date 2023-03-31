Title: Nginx Ingress Log Shipping
Description: Kubernetes is gaining popularity every day. Using an Ingress controller is the preferred method of allowing external access to the services in a cluster. This makes Ingress logs incredibly important for tracking the performance of your services, issues, bugs, and the security of your cluster.

Kubernetes is gaining popularity every day. Using an Ingress controller is the preferred method of allowing external access to the services in a cluster. This makes Ingress logs incredibly important for tracking the performance of your services, issues, bugs, and the security of your cluster.

## Ship Ingress logs

__Note: Make sure that the following prerequisites are met before continuing:__

- Nginx Ingress is [installed](https://github.com/helm/charts/tree/master/stable/nginx-ingress) 
- Logagent is [installed](https://github.com/sematext/helm-charts/)

Enable JSON logging, by updating the Ingress [config section](https://github.com/kubernetes/ingress-nginx/blob/master/docs/user-guide/nginx-configuration/configmap.md#log-format-upstream):

```yaml
defaultBackend:
  replicaCount: 2

controller:
  kind: DaemonSet
  extraEnvs:
    - name: LOGS_TOKEN
      value: "<YOUR_LOGS_TOKEN>"
  config:
    use-forwarded-headers: "true"
    use-geoip: "false"
    use-geoip2: "false"
    log-format-escape-json: "true"
    log-format-upstream: '{ 
      "@timestamp": "$time_iso8601", 
      "remote_addr": "$remote_addr",
      "x-forward-for": "$proxy_add_x_forwarded_for", 
      "request_id": "$req_id", 
      "remote_user": "$remote_user", 
      "bytes_sent": $bytes_sent, 
      "request_time": $request_time, 
      "status": $status, 
      "vhost": "$host", 
      "request_proto": "$server_protocol", 
      "path": "$uri", 
      "request_query": "$args", 
      "request_length": $request_length, 
      "duration": $request_time,
      "method": "$request_method", 
      "http_referrer": "$http_referer", 
      "http_user_agent": "$http_user_agent" 
    }'
```

To limit log collection to the `default` and `ingress` namespaces, use the  [`MATCH_BY_NAME`](./installation-docker/#whitelist-containers-for-logging) option.

Create an `agent.yaml` file that looks like this:
```yaml
region: US
logsToken: "<YOUR_LOGS_TOKEN>"
logagent:
  config:
    MATCH_BY_NAME: .*_(default|ingress)_.*
```

Setup Logagent to parse and ship logs:
```bash
helm install --name agent stable/sematext-agent -f agent.yaml
```

## Remove log enrichment

Some of the larger fields like `container`, `labels` and `logSource` are added by Logagent for better context. These can be removed by using the [`REMOVE_FIELDS`](./installation-docker/#other-options) option in Logagent:

Add the `REMOVE_FIELDS` option to your `agent.yaml`:
```yaml
region: US
logsToken: "<YOUR_LOGS_TOKEN>"
logagent:
  config:
    MATCH_BY_NAME: .*_(default|ingress)_.*
    REMOVE_FIELDS: container,labels,logSource
```

Run the Helm upgrade command:
```bash
helm upgrade agent stable/sematext-agent -f agent.yaml
```

## Remove unneeded fields

The same thing can be done by removing the unneeded fields from the Nginx Ingress log format.

```yaml
log-format-upstream: '{ 
  "@timestamp": "$time_iso8601", 
  "remote_addr": "$remote_addr",
  "bytes_sent": $bytes_sent, 
  "request_time": $request_time, 
  "status": $status, 
  "vhost": "$host", 
  "request_proto": "$server_protocol", 
  "path": "$uri", 
  "request_query": "$args", 
  "request_length": $request_length, 
  "duration": $request_time, 
  "method": "$request_method", 
  "http_user_agent": "$http_user_agent" 
}'
``` 

## Remove unneeded logs

To reduce logs size even further, some of the logs can be dropped. For example the 2xx requests can filtered by using the [`IGNORE_LOGS_PATTERN`](./installation-docker/#docker-logs-parameters) option in Logagent:

Add the `IGNORE_LOGS_PATTERN` option to your `agent.yaml`:
```yaml
region: US
logsToken: "<YOUR_LOGS_TOKEN>"
logagent:
  config:
    MATCH_BY_NAME: .*_(default|ingress)_.*
    REMOVE_FIELDS: container,labels,logSource
    IGNORE_LOGS_PATTERN: \"status\":\s20
```

Run the Helm upgrade once again:
```bash
helm upgrade agent stable/sematext-agent -f agent.yaml
```

By using `MATCH_BY_NAME` you can limit log collection to desired namespaces. Unneeded fields can be removed using `REMOVE_FIELDS` in the configuration. Even entire log lines can be ignored with `IGNORE_LOGS_PATTERN`. Logagent makes it easy to slim down any logs with very little effort.
