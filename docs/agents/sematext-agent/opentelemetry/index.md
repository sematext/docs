title: OpenTelemetry Support in Sematext Agent
description: Complete guide to configuring the Sematext Agent for OpenTelemetry tracing support

## OpenTelemetry Support

The Sematext Agent includes built-in OpenTelemetry support, acting as a local collector that receives traces from your applications and forwards them to Sematext Cloud. This architecture provides secure, reliable trace collection with minimal application overhead.

OpenTelemetry support is available starting from version [3.10.0](https://sematext.com/docs/agents/sematext-agent/releasenotes/#version-3100).

> **Note**: While this guide focuses on tracing configuration, the agent also supports OpenTelemetry metrics and logs, with full documentation for those coming soon.

## Architecture Overview

```
Your Application → OpenTelemetry SDK → Sematext Agent → Sematext Cloud
```

The Sematext Agent provides:

- **OTLP Receiver**: Accepts traces via gRPC and HTTP protocols
- **Token Management**: Routes traces to appropriate Sematext applications using token groups
- **Service Mapping**: Matches application service names to configured token groups
- **Reliability**: Buffering and retry logic for trace delivery
- **Security**: Secure communication to Sematext Cloud

## OpenTelemetry Ports for Tracing

The agent exposes these default ports for OpenTelemetry traces:

| Protocol | Port | Endpoint | Purpose |
|----------|------|----------|---------|
| **HTTP** (Recommended) | 4338 | `http://localhost:4338` | Trace collection |
| **gRPC** | 4337 | `http://localhost:4337` | Trace collection |

> **Note**: The agent also supports OpenTelemetry metrics (ports 4317/4318) and logs (ports 4327/4328), but this guide focuses on tracing configuration.

## Service Name Matching

**Critical Concept**: Your application must send a `service.name` attribute in its telemetry data that exactly matches what you configure in the agent.

For example, if your application code sets:
```javascript
const resource = new Resource({
  'service.name': 'frontend',  // This must match your agent config
});
```

Then your agent configuration must include `frontend` as a service name.

The agent routes trace data based on **service names** organized into **token groups**:

```yaml
# Service-to-group mapping
services:
  frontend: "web-services"     # Service name from your application
  backend: "web-services"      # Multiple services can share the same group
  database: "db-services"      # Database service uses different tokens

# Token groups define the actual tokens
token-groups:
  web-services:                
    traces-token: "traces-app-token"            # For traces
    monitoring-token: "monitoring-app-token"    # For metrics (optional)
    logs-token: "logs-app-token"                # For logs (optional)
  db-services:                 
    traces-token: "db-traces-token"
    monitoring-token: "db-monitoring-token"
```

## Trace Flow

1. Application sends traces → `sematext-agent:4337/4338` 
2. Agent matches service name → Looks up appropriate traces token for that service
3. Agent forwards traces → Sends to Sematext Cloud with the corresponding token

## Configuration by Platform

### Linux/Windows

Use the `st-agent otel` command to manage OpenTelemetry settings for tracing.

##### 1. Enable OpenTelemetry Tracing

Linux:
```bash
sudo /opt/spm/spm-monitor/bin/st-agent otel enable --type traces
```

Windows:
```cmd
st-agent-amd64 otel enable --type traces
```

##### 2. Configure Token Groups

Create token groups and add your traces token:

Linux:
```bash
# Add traces token to web-services group
sudo /opt/spm/spm-monitor/bin/st-agent otel token-groups add \
  --token-group "web-services" \
  --type traces \
  --token "your-traces-token"

# Optionally add metrics and logs tokens for the same services
sudo /opt/spm/spm-monitor/bin/st-agent otel token-groups add \
  --token-group "web-services" \
  --type metrics \
  --token "your-monitoring-token"

sudo /opt/spm/spm-monitor/bin/st-agent otel token-groups add \
  --token-group "web-services" \
  --type logs \
  --token "your-logs-token"
```

Windows:
```cmd
st-agent-amd64 otel token-groups add --token-group "web-services" --type traces --token "your-traces-token"
st-agent-amd64 otel token-groups add --token-group "web-services" --type metrics --token "your-monitoring-token"
st-agent-amd64 otel token-groups add --token-group "web-services" --type logs --token "your-logs-token"
```

##### 3. Map Services to Token Groups

Map your application service names to token groups:

Linux:
```bash
sudo /opt/spm/spm-monitor/bin/st-agent otel services add \
  --service-names "frontend,backend,api" \
  --token-group "web-services"
```

Windows:
```cmd
st-agent-amd64 otel services add --service-names "frontend,backend,api" --token-group "web-services"
```

##### 4. Restart Agent

Linux:
```bash
sudo systemctl restart sematext-agent
```

Windows:
```cmd
st-agent-amd64 windows-service restart
```

##### Optional: Configure Custom Receiver Ports

You can configure custom receiver ports if needed:

Linux:
```bash
sudo /opt/spm/spm-monitor/bin/st-agent otel receivers set --type traces --protocol grpc --port 4337
sudo /opt/spm/spm-monitor/bin/st-agent otel receivers set --type traces --protocol http --port 4338
```

Windows:
```cmd
st-agent-amd64 otel receivers set --type traces --protocol grpc --port 4337
st-agent-amd64 otel receivers set --type traces --protocol http --port 4338
```

### Docker

Configure OpenTelemetry tracing by setting environment variables in your Docker container.

##### Environment Variable Format

For token groups, use this pattern:
- Traces token: `OTEL_{GROUP_NAME}_TOKEN_GROUP_TRACES_TOKEN`
- Service list: `OTEL_{GROUP_NAME}_TOKEN_GROUP_SERVICES` (comma-separated)

##### Docker Run Example

```bash
docker run -d \
  --name sematext-agent \
  -e INFRA_TOKEN=your-infra-token \
  -e OTEL_ENABLED=true \
  -e OTEL_TRACES_ENABLED=true \
  -e OTEL_WEB_SERVICES_TOKEN_GROUP_TRACES_TOKEN=your-traces-token \
  -e OTEL_WEB_SERVICES_TOKEN_GROUP_SERVICES=frontend,backend \
  -p 4337:4337 \
  -p 4338:4338 \
  -v /var/run/docker.sock:/var/run/docker.sock:ro \
  sematext/agent:latest-3
```

For metrics and logs support, also add:
```bash
  -e OTEL_METRICS_ENABLED=true \
  -e OTEL_LOGS_ENABLED=true \
  -e OTEL_WEB_SERVICES_TOKEN_GROUP_MONITORING_TOKEN=your-monitoring-token \
  -e OTEL_WEB_SERVICES_TOKEN_GROUP_LOGS_TOKEN=your-logs-token \
  -p 4317:4317 \
  -p 4318:4318 \
  -p 4327:4327 \
  -p 4328:4328 \
```

##### Docker Compose Example

```yaml
version: '3.8'
services:
  sematext-agent:
    image: sematext/agent:latest-3
    container_name: sematext-agent
    environment:
      - INFRA_TOKEN=your-infra-token
      - OTEL_ENABLED=true
      - OTEL_TRACES_ENABLED=true
      - OTEL_WEB_SERVICES_TOKEN_GROUP_TRACES_TOKEN=your-traces-token
      - OTEL_WEB_SERVICES_TOKEN_GROUP_SERVICES=frontend,backend
      # Optional: Enable metrics and logs
      - OTEL_METRICS_ENABLED=true
      - OTEL_LOGS_ENABLED=true
      - OTEL_WEB_SERVICES_TOKEN_GROUP_MONITORING_TOKEN=your-monitoring-token
      - OTEL_WEB_SERVICES_TOKEN_GROUP_LOGS_TOKEN=your-logs-token
    ports:
      - "4337:4337"  # Traces gRPC
      - "4338:4338"  # Traces HTTP
      # Optional: Metrics and logs ports
      - "4317:4317"  # Metrics gRPC
      - "4318:4318"  # Metrics HTTP
      - "4327:4327"  # Logs gRPC
      - "4328:4328"  # Logs HTTP
    volumes:
      - /var/run/docker.sock:/var/run/docker.sock:ro
    restart: unless-stopped

  your-app:
    image: your-app:latest
    environment:
      - OTEL_SERVICE_NAME=frontend
      - OTEL_EXPORTER_OTLP_ENDPOINT=http://sematext-agent:4338
      - OTEL_EXPORTER_OTLP_PROTOCOL=http/protobuf
    depends_on:
      - sematext-agent
```

### Kubernetes (Helm Chart)

Use the Sematext Helm chart version 1.7.0 or later with OpenTelemetry tracing configuration.

##### Configuration with values.yaml

```yaml
# values.yaml
infraToken: "your-infra-token"
region: "US"  # or "EU"

# OpenTelemetry configuration focused on tracing
otel:
  enabled: true
  traces:
    enabled: true
    receiver:
      grpc:
        host: "0.0.0.0"
        port: 4337
      http:
        host: "0.0.0.0"
        port: 4338
  
  # Optional: Enable metrics and logs
  metrics:
    enabled: true
    receiver:
      grpc:
        host: "0.0.0.0"
        port: 4317
      http:
        host: "0.0.0.0"
        port: 4318
  logs:
    enabled: true
    receiver:
      grpc:
        host: "0.0.0.0"
        port: 4327
      http:
        host: "0.0.0.0"
        port: 4328
  
  # Service-specific configuration
  services:
    frontend: "web-services"
    backend: "web-services"
    worker: "background-services"
  
  # Token groups for services
  token-groups:
    web-services:
      traces-token: "traces-app-token"
      monitoring-token: "metrics-app-token"  # Optional
      logs-token: "logs-app-token"           # Optional
    background-services:
      traces-token: "worker-traces-token"
      monitoring-token: "worker-metrics-token"
      logs-token: "worker-logs-token"
```

##### Deploy with Helm

```bash
helm repo add sematext https://helm.sematext.com
helm repo update

helm install sematext-agent sematext/sematext-agent -f values.yaml
```

##### Configuration with --set Flags

For tracing-focused deployment:

```bash
helm install sematext-agent sematext/sematext-agent \
  --set infraToken=your-infra-token \
  --set region=US \
  --set otel.enabled=true \
  --set otel.traces.enabled=true \
  --set otel.services.nodejs-example=nodejs-group \
  --set otel.token-groups.nodejs-group.traces-token=your-traces-token
```

With optional metrics and logs:
```bash
helm install sematext-agent sematext/sematext-agent \
  --set infraToken=your-infra-token \
  --set region=US \
  --set otel.enabled=true \
  --set otel.traces.enabled=true \
  --set otel.metrics.enabled=true \
  --set otel.logs.enabled=true \
  --set otel.services.nodejs-example=nodejs-group \
  --set otel.token-groups.nodejs-group.traces-token=your-traces-token \
  --set otel.token-groups.nodejs-group.monitoring-token=your-monitoring-token \
  --set otel.token-groups.nodejs-group.logs-token=your-logs-token
```

##### Custom Receiver Endpoints

For testing or development environments:

```bash
helm install sematext-agent sematext/sematext-agent \
  --set infraToken=your-infra-token \
  --set region=EU \
  --set otel.enabled=true \
  --set otel.traces.enabled=true \
  --set tracesReceiverUrl=http://custom-endpoint:4318/v1/traces \
  --set otel.services.my-app=my-app-group \
  --set otel.token-groups.my-app-group.traces-token=your-traces-token
```

### Kubernetes (kubectl)

For kubectl deployments, set environment variables in your deployment manifests.

##### Deployment Example

```yaml
apiVersion: apps/v1
kind: Deployment
metadata:
  name: sematext-agent
  namespace: sematext
spec:
  replicas: 1
  selector:
    matchLabels:
      app: sematext-agent
  template:
    metadata:
      labels:
        app: sematext-agent
    spec:
      containers:
      - name: sematext-agent
        image: sematext/agent:latest-3
        env:
        - name: INFRA_TOKEN
          valueFrom:
            secretKeyRef:
              name: sematext-agent
              key: infra-token
        - name: OTEL_ENABLED
          value: "true"
        - name: OTEL_TRACES_ENABLED
          value: "true"
        - name: OTEL_WEB_SERVICES_TOKEN_GROUP_TRACES_TOKEN
          value: "your-traces-token"
        - name: OTEL_WEB_SERVICES_TOKEN_GROUP_SERVICES
          value: "frontend,backend"
        # Optional: Enable metrics and logs
        - name: OTEL_METRICS_ENABLED
          value: "true"
        - name: OTEL_LOGS_ENABLED
          value: "true"
        - name: OTEL_WEB_SERVICES_TOKEN_GROUP_MONITORING_TOKEN
          value: "your-monitoring-token"
        - name: OTEL_WEB_SERVICES_TOKEN_GROUP_LOGS_TOKEN
          value: "your-logs-token"
        ports:
        - containerPort: 4337
          name: otel-grpc-traces
        - containerPort: 4338
          name: otel-http-traces
        # Optional: Metrics and logs ports
        - containerPort: 4317
          name: otel-grpc-metrics
        - containerPort: 4318
          name: otel-http-metrics
        - containerPort: 4327
          name: otel-grpc-logs
        - containerPort: 4328
          name: otel-http-logs
        volumeMounts:
        - name: docker-sock
          mountPath: /var/run/docker.sock
          readOnly: true
      volumes:
      - name: docker-sock
        hostPath:
          path: /var/run/docker.sock
```

##### Service for OTLP Endpoints

```yaml
apiVersion: v1
kind: Service
metadata:
  name: sematext-agent-otlp
  namespace: sematext
spec:
  selector:
    app: sematext-agent
  ports:
  - name: otel-grpc-traces
    port: 4337
    targetPort: 4337
    protocol: TCP
  - name: otel-http-traces
    port: 4338
    targetPort: 4338
    protocol: TCP
  # Optional: Metrics and logs ports
  - name: otel-grpc-metrics
    port: 4317
    targetPort: 4317
    protocol: TCP
  - name: otel-http-metrics
    port: 4318
    targetPort: 4318
    protocol: TCP
  - name: otel-grpc-logs
    port: 4327
    targetPort: 4327
    protocol: TCP
  - name: otel-http-logs
    port: 4328
    targetPort: 4328
    protocol: TCP
```

##### Apply Configuration

```bash
kubectl apply -f sematext-agent-deployment.yaml
kubectl apply -f sematext-agent-service.yaml
```

## Management Commands

### View Current Configuration

Linux:
```bash
cat /opt/spm/properties/otel.yml
```

Windows:
```cmd
type "C:\Program Files\Sematext Agent\properties\otel.yml"
```

### Remove Services

Remove a service from token group mapping:

Linux:
```bash
sudo /opt/spm/spm-monitor/bin/st-agent otel services remove --service-name "frontend"
```

Windows:
```cmd
st-agent-amd64 otel services remove --service-name "frontend"
```

### Remove Token Groups

Remove tokens from a group:

Linux:
```bash
sudo /opt/spm/spm-monitor/bin/st-agent otel token-groups remove --token-group "web-services" --type traces
```

Windows:
```cmd
st-agent-amd64 otel token-groups remove --token-group "web-services" --type traces
```

### Disable OpenTelemetry

Linux:
```bash
sudo /opt/spm/spm-monitor/bin/st-agent otel disable --type traces
```

Windows:
```cmd
st-agent-amd64 otel disable --type traces
```

## Application Configuration

Configure your OpenTelemetry SDK to send traces to the agent:

```bash
# Required for traces
export OTEL_SERVICE_NAME=your-service-name
export OTEL_EXPORTER_OTLP_ENDPOINT=http://localhost:4338
export OTEL_EXPORTER_OTLP_PROTOCOL=http/protobuf

# Optional: Configure sampling
export OTEL_TRACES_SAMPLER=traceidratio
export OTEL_TRACES_SAMPLER_ARG=0.1
```

## Verification

### Check Agent Status

View OpenTelemetry configuration and status:

Linux:
```bash
sudo /opt/spm/spm-monitor/bin/st-agent otel --help
```

Docker:
```bash
docker exec sematext-agent st-agent otel --help
```

Kubernetes:
```bash
kubectl exec -n sematext deployment/sematext-agent -- st-agent otel --help
```

### Test OTLP Connectivity

Test if the agent is accepting OTLP traces:

```bash
# Test HTTP endpoint (recommended)
curl -v http://localhost:4338/v1/traces

# Test gRPC endpoint (requires grpcurl)
grpcurl -plaintext localhost:4337 list
```

### View Agent Logs

Linux:
```bash
sudo journalctl -u sematext-agent -f
```

Docker:
```bash
docker logs -f sematext-agent
```

Kubernetes:
```bash
kubectl logs -n sematext deployment/sematext-agent -f
```

## Troubleshooting

### Common Issues

Agent not receiving traces:

- Verify OTLP endpoints are accessible and ports 4337/4338 are open
- Check firewall rules for trace ports
- Confirm service names in your application match agent configuration exactly

Authentication errors:

- Validate traces token is correct
- Ensure token group configuration matches service names
- Verify token permissions in Sematext Cloud

Service name mismatches:

- Check that `service.name` from your application exactly matches configured service names
- Review case sensitivity and spelling
- Use agent logs to see incoming service names

No traces appearing in Sematext:

- Verify agent is forwarding traces (check agent logs)
- Confirm traces token is valid and has permissions
- Ensure application is actually sending traces to the agent

### Debug Configuration

View the OpenTelemetry configuration file:

Linux:
```bash
sudo cat /opt/spm/properties/otel.yml
```

Windows:
```cmd
type "C:\Program Files\Sematext Agent\properties\otel.yml"
```

Docker:
```bash
docker exec sematext-agent cat /opt/spm/properties/otel.yml
```

## Best Practices

### Service Organization
- Use consistent service naming conventions across applications
- Group related services into logical token groups
- Organize token groups by environment, team, or service tier

### Token Management
- Use separate token groups for different environments (dev, staging, prod)
- Keep traces tokens secure and rotate regularly
- Document service-to-token-group mappings for your team

### Performance
- Monitor agent resource usage, especially in high-throughput environments
- Use appropriate sampling rates in applications (0.01-0.1 for production)
- Consider dedicated agent instances for high-volume services

### Security
- Restrict network access to OpenTelemetry ports (4337/4338) where possible
- Use separate tokens for different teams or environments
- Keep agent and application configurations synchronized

## Next Steps

- [Configure your applications with OpenTelemetry SDKs](/docs/tracing/sdks/)
- [Complete the Tracing App creation process](/docs/tracing/create-tracing-app/)
- [Get started with Sematext Tracing](/docs/tracing/getting-started/)
- [View complete tracing examples in our repository](https://github.com/sematext/sematext-opentelemetry-examples)
