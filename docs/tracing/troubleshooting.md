title: Troubleshooting Tracing
description: Common issues and solutions for Sematext Tracing

## Troubleshooting Tracing

This guide helps you resolve common issues with Sematext Tracing, OpenTelemetry SDKs, and the Sematext Agent.

## No Traces Appearing

### Check Agent Status

**Linux:**
```bash
sudo systemctl status sematext-agent
sudo journalctl -u sematext-agent -f
```

**Docker:**
```bash
docker ps | grep sematext-agent
docker logs sematext-agent
```

**Kubernetes:**
```bash
kubectl get pods -n sematext | grep sematext-agent
kubectl logs -n sematext -l name=sematext-agent
```

### Verify OTLP Configuration

1. Check ports are open:

    - HTTP: Port 4338
    - gRPC: Port 4337

2. Test connectivity:

```bash
# Test HTTP endpoint
curl -v http://localhost:4338/v1/traces

# Test gRPC endpoint (requires grpcurl)
grpcurl -plaintext localhost:4337 list
```

3. Verify environment variables:

```bash
echo $OTEL_SERVICE_NAME
echo $OTEL_EXPORTER_OTLP_ENDPOINT
echo $OTEL_EXPORTER_OTLP_PROTOCOL
```

### Service Name Mismatch

The service name in your application must exactly match what's configured in the agent:

**Application:**
```javascript
// Your app sets:
const resource = new Resource({
  'service.name': 'frontend'
});
```

**Agent must have:**
```bash
sudo /opt/spm/spm-monitor/bin/st-agent otel services add \
  --service-names "frontend" \
  --token-group "your-group"
```

## Authentication Errors

### Invalid Token

1. Verify your Tracing App token in Sematext Cloud
2. Check token configuration in agent:

**Linux:**
```bash
cat /opt/spm/properties/otel.yml
```

**Docker:**
```bash
docker exec sematext-agent cat /opt/spm/properties/otel.yml
```

### Token Not Configured

Ensure token is added to token group:

```bash
sudo /opt/spm/spm-monitor/bin/st-agent otel token-groups add \
  --token-group "web-services" \
  --type traces \
  --token "your-traces-token"
```

## Performance Issues

### High Memory Usage

1. Check sampling rate:
```bash
# Development (100% sampling)
export OTEL_TRACES_SAMPLER=always_on

# Production (10% sampling)
export OTEL_TRACES_SAMPLER=traceidratio
export OTEL_TRACES_SAMPLER_ARG=0.1
```

2. Reduce batch size in SDK configuration

3. Check agent resource limits (Kubernetes):
```yaml
resources:
  limits:
    memory: "512Mi"
  requests:
    memory: "256Mi"
```

### Slow Trace Export

1. Check network latency to agent
2. Verify agent isn't overloaded:
```bash
# Check CPU and memory
top | grep st-agent
```
3. Consider using gRPC instead of HTTP for better performance

## SDK-Specific Issues

### Java

**Agent not loading:**
```bash
# Verify agent file exists and is readable
ls -la opentelemetry-javaagent.jar

# Check Java version compatibility
java -version
```

**Missing traces:**
```bash
# Enable debug logging
java -javaagent:opentelemetry-javaagent.jar \
  -Dotel.javaagent.debug=true \
  -jar your-app.jar
```

### Python

**Import errors:**
```bash
# Reinstall OpenTelemetry packages
pip install --upgrade opentelemetry-distro[otlp]
opentelemetry-bootstrap -a install
```

**Auto-instrumentation not working:**
```bash
# Verify installation
opentelemetry-instrument --version

# Check supported libraries
pip list | grep opentelemetry
```

### Node.js

**Module not found:**
```bash
# Reinstall dependencies
npm install @opentelemetry/auto-instrumentations-node
npm install @opentelemetry/exporter-trace-otlp-http
```

**Traces not exported:**
```javascript
// Enable debug logging
const { diag, DiagConsoleLogger, DiagLogLevel } = require('@opentelemetry/api');
diag.setLogger(new DiagConsoleLogger(), DiagLogLevel.DEBUG);
```

### Go

**Compilation errors:**
```bash
# Update dependencies
go get -u go.opentelemetry.io/otel
go get -u go.opentelemetry.io/otel/exporters/otlp/otlptrace
go get -u go.opentelemetry.io/otel/exporters/otlp/otlptrace/otlptracehttp
```

**No traces sent:**
```go
// Add error handling
if err := tracerProvider.Shutdown(context.Background()); err != nil {
    log.Printf("Error shutting down tracer provider: %v", err)
}
```

### .NET

**Auto-instrumentation not working:**
```bash
# Verify profiler is enabled
echo $CORECLR_ENABLE_PROFILING  # Should be 1
echo $CORECLR_PROFILER  # Should be {918728DD-259F-4A6A-AC2B-B85E1B658318}
```

**Missing dependencies:**
```bash
# Install required packages
dotnet add package OpenTelemetry.Exporter.OpenTelemetryProtocol
dotnet add package OpenTelemetry.Extensions.Hosting
```

### Ruby

**Gems not loading:**
```bash
# Update gems
gem update opentelemetry-sdk
gem update opentelemetry-exporter-otlp
```

**Configuration not applied:**
```ruby
# Verify configuration is loaded
puts OpenTelemetry.tracer_provider.inspect
```

## Agent Configuration Issues

### OpenTelemetry Not Enabled

```bash
# Enable OpenTelemetry support
sudo /opt/spm/spm-monitor/bin/st-agent otel enable --type traces

# Restart agent
sudo systemctl restart sematext-agent
```

### Service Not Mapped

```bash
# List current services
cat /opt/spm/properties/otel.yml | grep -A 5 services

# Add missing service
sudo /opt/spm/spm-monitor/bin/st-agent otel services add \
  --service-names "new-service" \
  --token-group "your-group"
```

### Wrong Port Configuration

```bash
# Check current port configuration
cat /opt/spm/properties/otel.yml | grep -A 10 receivers

# Update ports if needed
sudo /opt/spm/spm-monitor/bin/st-agent otel receivers set \
  --type traces --protocol http --port 4338
```

## Docker/Kubernetes Issues

### Container Can't Connect to Agent

1. Check network connectivity:

```bash
# From application container
ping sematext-agent
telnet sematext-agent 4338
```

2. Verify service discovery (Kubernetes):
```bash
kubectl get svc -n sematext | grep sematext-agent
```

3. Check firewall rules and network policies

### Environment Variables Not Set

**Docker Compose:**
```yaml
environment:
  - OTEL_SERVICE_NAME=your-service
  - OTEL_EXPORTER_OTLP_ENDPOINT=http://sematext-agent:4338
```

**Kubernetes:**
```yaml
env:
- name: OTEL_SERVICE_NAME
  value: "your-service"
- name: OTEL_EXPORTER_OTLP_ENDPOINT
  value: "http://sematext-agent-otlp.sematext:4338"
```

## Database Tracing

### SQL Query Visibility

OpenTelemetry automatically handles SQL queries to protect sensitive data:

- Parameterized queries (e.g., `SELECT * FROM users WHERE id = ?`) are shown as-is
- Non-parameterized queries have literal values replaced with `?` placeholders  
- Query parameters are not captured by default for security reasons

Example of what you'll see in traces:
- Original query: `SELECT * FROM users WHERE email = 'john@example.com' AND status = 'active'`
- In traces: `SELECT * FROM users WHERE email = ? AND status = ?`

### Missing Database Operations

If database operations aren't appearing in traces:

1. Verify database instrumentation is loaded:

   - Java: Database drivers are auto-instrumented
   - Python: `opentelemetry-instrumentation-sqlalchemy`, `opentelemetry-instrumentation-psycopg2`, etc.
   - Node.js: `@opentelemetry/instrumentation-mysql`, `@opentelemetry/instrumentation-pg`, etc.
   - Go: Requires manual instrumentation or `otelsql` wrapper

2. Check supported databases:

   - PostgreSQL, MySQL, MariaDB, MongoDB, Redis, Memcached
   - Most JDBC drivers (Java)
   - Most database clients with OpenTelemetry instrumentation libraries

3. Common issues:

   - ORM queries may need additional instrumentation
   - Connection pooling libraries might need specific instrumentation
   - Native database drivers may not be auto-instrumented

### Database Performance Troubleshooting

To identify slow queries in traces:

1. Filter by operation type:

   - Look for spans with `db.system` attribute (postgresql, mysql, etc.)
   - Filter by `db.operation` (SELECT, INSERT, UPDATE, DELETE)

2. Analyze query patterns:

   - Check `db.statement` for query structure
   - Look for N+1 query problems (many similar queries in sequence)
   - Identify missing indexes (slow SELECT operations)

3. Connection issues:

   - High latency on connection acquisition spans
   - Many short-lived connections (connection pool exhaustion)

### Database Span Attributes

Common database attributes you'll see:

- `db.system`: Database type (postgresql, mysql, mongodb, redis)
- `db.name`: Database/schema name
- `db.statement`: SQL query with placeholders
- `db.operation`: Operation type
- `db.user`: Database user (if not filtered)
- `net.peer.name`: Database host
- `net.peer.port`: Database port

## Common Error Messages

### "Connection refused"
- Agent not running
- Wrong endpoint URL
- Firewall blocking connection

### "Unauthorized" or "403 Forbidden"
- Invalid or missing token
- Token not configured for traces
- Wrong token type (using logs token instead of traces token)

### "Service name not found"
- Service not configured in agent
- Typo in service name
- Case sensitivity issue

### "Deadline exceeded"
- Network timeout
- Agent overloaded
- Increase timeout in SDK configuration

## Getting Help

If these troubleshooting steps don't resolve your issue:

1. Check agent logs for detailed error messages
2. Enable debug logging in your OpenTelemetry SDK
3. Verify configuration against the [SDK documentation](/docs/tracing/sdks/)
4. Contact support at support@sematext.com with:

    - Agent version
    - SDK language and version
    - Error messages and logs
    - Configuration details

## Related Documentation

- [Getting Started with Tracing](/docs/tracing/getting-started/)
- [OpenTelemetry SDKs](/docs/tracing/sdks/)
- [Agent Configuration](/docs/agents/sematext-agent/opentelemetry/)
- [Creating a Tracing App](/docs/tracing/create-tracing-app/)