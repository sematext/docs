title: Migrating from DataDog APM to Sematext Tracing
description: Complete guide to migrate from DataDog APM to Sematext Tracing with OpenTelemetry

## Migrating from DataDog APM to Sematext Tracing

This guide provides a migration path from DataDog APM to Sematext Tracing, helping you transition while maintaining observability and potentially reducing costs.

## Migration Overview

DataDog APM uses proprietary agents and instrumentation, while Sematext Tracing is built on OpenTelemetry standards:

```
Current: Application → DataDog Agent → DataDog Libraries → DataDog Cloud

New:     Application → OpenTelemetry SDK → Sematext Agent → Sematext Cloud
```

## Why Migrate from DataDog?

Common Migration Drivers:

- Cost Optimization: DataDog's per-host and per-million-span pricing can become expensive at scale
- Vendor Independence: Avoid vendor lock-in with open-standard OpenTelemetry
- Unified Platform: Combine tracing with logs and metrics in one Sematext platform
- Better Control: More granular control over sampling and retention policies
- Simplified Architecture: Reduce dependency on proprietary agents and libraries

## Migration Challenges and Solutions

### Challenge 1: Proprietary Instrumentation

**DataDog Challenge**: DataDog uses proprietary tracing libraries and automatic instrumentation

**OpenTelemetry Solution**: Replace with standardized OpenTelemetry instrumentation

**Impact**: Medium - requires code changes for custom instrumentation

### Challenge 2: DataDog Agent Dependency  

**DataDog Challenge**: Applications depend on DataDog Agent for trace collection

**Sematext Solution**: Replace with Sematext Agent with OpenTelemetry support

**Impact**: Low - infrastructure change only

### Challenge 3: Custom Metrics and Dashboards

**DataDog Challenge**: Custom dashboards, monitors, and APM-specific queries

**Sematext Solution**: Recreate using Sematext's tracing reports and alerting

**Impact**: High - requires manual recreation and validation

## Pre-Migration Assessment

### Document Current DataDog Setup

Service Inventory:

- [ ] List all applications with DataDog APM enabled
- [ ] Document DataDog Agent configurations
- [ ] Identify services using custom instrumentation
- [ ] Map service dependencies and trace flows

Custom Instrumentation Audit:

- [ ] Document custom spans and traces
- [ ] List custom tags and metadata
- [ ] Identify business-critical metrics derived from traces
- [ ] Note any DataDog-specific integrations

Dashboard and Alert Review:

- [ ] Export critical APM dashboards
- [ ] Document monitor configurations and thresholds
- [ ] List SLO/SLA definitions
- [ ] Identify automated responses and webhooks

## Step-by-Step Migration

### Step 1: Sematext Infrastructure Setup

1. **Create Sematext Environment**:

    - [Create Sematext Tracing Apps](/docs/tracing/create-tracing-app/) for your services
    - Organize Apps by environment (prod/staging/dev) or business domain
    - Note Tracing App tokens for configuration

2. **Deploy Sematext Agent**:
    - [Install Sematext Agent](/docs/agents/sematext-agent/installation/) alongside existing DataDog agents
    - [Enable OpenTelemetry support](/docs/agents/sematext-agent/opentelemetry/)
    - Verify OTLP endpoints are accessible (4337 gRPC, 4338 HTTP)

### Step 2: Application Migration by Language

#### Java Applications

Current DataDog Setup:
```bash
# DataDog Java agent
java -javaagent:dd-java-agent.jar \
  -Ddd.service=my-service \
  -Ddd.env=production \
  -Ddd.version=1.2.3 \
  -Ddd.profiling.enabled=true \
  -jar my-application.jar
```

New OpenTelemetry Setup:
```bash
# Download OpenTelemetry Java agent
wget https://github.com/open-telemetry/opentelemetry-java-instrumentation/releases/latest/download/opentelemetry-javaagent.jar

# Replace DataDog agent
java -javaagent:opentelemetry-javaagent.jar \
  -Dotel.service.name=my-service \
  -Dotel.resource.attributes=environment=production,service.version=1.2.3 \
  -Dotel.exporter.otlp.endpoint=http://localhost:4338 \
  -Dotel.exporter.otlp.protocol=http/protobuf \
  -jar my-application.jar
```

Custom Instrumentation Migration:
```java
// DataDog custom instrumentation
import datadog.trace.api.Trace;
import datadog.trace.api.DDTags;

@Trace
public void processOrder(String orderId) {
    Span span = GlobalTracer.get().activeSpan();
    span.setTag(DDTags.SERVICE_NAME, "order-processor");
    span.setTag("order.id", orderId);
    // Business logic
}

// OpenTelemetry equivalent
import io.opentelemetry.api.trace.Tracer;
import io.opentelemetry.api.trace.Span;
import io.opentelemetry.context.Scope;

private final Tracer tracer = GlobalOpenTelemetry.getTracer("order-processor");

public void processOrder(String orderId) {
    Span span = tracer.spanBuilder("process-order").startSpan();
    try (Scope scope = span.makeCurrent()) {
        span.setAttribute("order.id", orderId);
        span.setAttribute("service.name", "order-processor");
        // Business logic
    } finally {
        span.end();
    }
}
```

#### Python Applications

Current DataDog Setup:
```python
# DataDog automatic instrumentation
from ddtrace import patch_all
patch_all()

# Custom tracing
from ddtrace import tracer

@tracer.wrap("custom.operation")
def process_data(data):
    span = tracer.current_span()
    span.set_tag("data.size", len(data))
    span.set_tag("custom.metric", calculate_metric(data))
    return process(data)
```

New OpenTelemetry Setup:
```bash
# Install OpenTelemetry packages
pip install opentelemetry-distro[otlp]
opentelemetry-bootstrap -a install

# Environment configuration
export OTEL_SERVICE_NAME=my-python-service
export OTEL_EXPORTER_OTLP_ENDPOINT=http://localhost:4338
export OTEL_EXPORTER_OTLP_PROTOCOL=http/protobuf
export OTEL_RESOURCE_ATTRIBUTES=environment=production,service.version=1.2.3

# Run with auto-instrumentation
opentelemetry-instrument python my_app.py
```

```python
# OpenTelemetry custom instrumentation
from opentelemetry import trace

tracer = trace.get_tracer(__name__)

@tracer.start_as_current_span("process-data")
def process_data(data):
    span = trace.get_current_span()
    span.set_attribute("data.size", len(data))
    span.set_attribute("custom.metric", calculate_metric(data))
    return process(data)
```

#### Node.js Applications

Current DataDog Setup:
```javascript
// DataDog tracer initialization
const tracer = require('dd-trace').init({
  service: 'my-node-service',
  env: 'production',
  version: '1.2.3'
});

// Custom instrumentation
const span = tracer.startSpan('custom.operation');
span.setTag('user.id', userId);
span.setTag('operation.type', 'data-processing');
// ... operation
span.finish();
```

New OpenTelemetry Setup:
```javascript
// Install packages
// npm install @opentelemetry/auto-instrumentations-node @opentelemetry/sdk-node

// tracing.js
const { NodeSDK } = require('@opentelemetry/sdk-node');
const { getNodeAutoInstrumentations } = require('@opentelemetry/auto-instrumentations-node');
const { Resource } = require('@opentelemetry/resources');
const { SemanticResourceAttributes } = require('@opentelemetry/semantic-conventions');

const sdk = new NodeSDK({
  resource: new Resource({
    [SemanticResourceAttributes.SERVICE_NAME]: 'my-node-service',
    [SemanticResourceAttributes.SERVICE_VERSION]: '1.2.3',
    environment: 'production'
  }),
  instrumentations: [getNodeAutoInstrumentations()],
});

sdk.start();

// Custom instrumentation
const { trace } = require('@opentelemetry/api');
const tracer = trace.getTracer('my-node-service');

const span = tracer.startSpan('custom.operation');
span.setAttributes({
  'user.id': userId,
  'operation.type': 'data-processing'
});
// ... operation
span.end();
```

#### Go Applications

Current DataDog Setup:
```go
import "gopkg.in/DataDog/dd-trace-go.v1/ddtrace/tracer"

// Initialize DataDog tracer
tracer.Start(
    tracer.WithService("my-go-service"),
    tracer.WithEnv("production"),
    tracer.WithServiceVersion("1.2.3"),
)
defer tracer.Stop()

// Custom span
span := tracer.StartSpan("custom.operation")
span.SetTag("user.id", userID)
defer span.Finish()
```

New OpenTelemetry Setup:
```go
import (
    "context"
    "go.opentelemetry.io/otel"
    "go.opentelemetry.io/otel/exporters/otlp/otlptrace/otlptracehttp"
    "go.opentelemetry.io/otel/sdk/trace"
    "go.opentelemetry.io/otel/sdk/resource"
    semconv "go.opentelemetry.io/otel/semconv/v1.17.0"
)

// Initialize OpenTelemetry
ctx := context.Background()
res := resource.NewWithAttributes(
    semconv.SchemaURL,
    semconv.ServiceName("my-go-service"),
    semconv.ServiceVersion("1.2.3"),
    semconv.Environment("production"),
)

exporter, err := otlptracehttp.New(ctx,
    otlptracehttp.WithEndpoint("http://localhost:4338"),
)

tp := trace.NewTracerProvider(
    trace.WithBatcher(exporter),
    trace.WithResource(res),
)
otel.SetTracerProvider(tp)

// Custom span
tracer := otel.Tracer("my-go-service")
ctx, span := tracer.Start(ctx, "custom.operation")
span.SetAttributes(attribute.String("user.id", userID))
defer span.End()
```

### Step 3: Configuration Migration

#### Environment Variables Mapping

**DataDog Environment Variables:**
```bash
DD_SERVICE=my-service
DD_ENV=production
DD_VERSION=1.2.3
DD_TRACE_SAMPLE_RATE=0.1
DD_TRACE_ANALYTICS_ENABLED=true
DD_TAGS=team:backend,owner:john
```

**OpenTelemetry Equivalents:**
```bash
OTEL_SERVICE_NAME=my-service
OTEL_RESOURCE_ATTRIBUTES=environment=production,service.version=1.2.3,team=backend,owner=john
OTEL_TRACES_SAMPLER=traceidratio
OTEL_TRACES_SAMPLER_ARG=0.1
```

#### Sampling Configuration

**DataDog Sampling:**

- DataDog handles sampling automatically with agent-level configuration
- Priority sampling based on service importance
- Custom sampling rules via agent configuration

**OpenTelemetry Sampling:**
```bash
# Basic percentage sampling
export OTEL_TRACES_SAMPLER=traceidratio
export OTEL_TRACES_SAMPLER_ARG=0.1

# Always sample (development)
export OTEL_TRACES_SAMPLER=always_on

# Custom sampling in application code
```

### Step 4: Parallel Operation

Run both DataDog and Sematext tracing simultaneously during migration:

Application-Level Dual Export (Recommended):
```python
# Python example with dual export
from opentelemetry.sdk.trace.export import BatchSpanProcessor
from opentelemetry.exporter.datadog import DatadogExporter
from opentelemetry.exporter.otlp.proto.http.trace_exporter import OTLPSpanExporter

# DataDog exporter (keep temporarily during migration)
datadog_exporter = DatadogExporter(
    agent_url="http://datadog-agent:8126"
)

# Sematext Agent OTLP endpoint (already running)
otlp_exporter = OTLPSpanExporter(
    endpoint="http://localhost:4338/v1/traces"  # Sematext Agent HTTP endpoint for traces
)

# Add both processors to tracer provider
tracer_provider = TracerProvider()
tracer_provider.add_span_processor(BatchSpanProcessor(datadog_exporter))
tracer_provider.add_span_processor(BatchSpanProcessor(otlp_exporter))
```

Note: Since Sematext Agent already accepts OTLP traffic (ports 4337 for gRPC, 4338 for HTTP for traces), you don't need additional infrastructure. Applications can send traces directly to Sematext Agent while maintaining DataDog export during migration.

Docker Compose Example:
```yaml
# docker-compose.yml
services:
  app:
    image: my-app:latest
    environment:
      # DataDog configuration (existing)
      - DD_AGENT_HOST=datadog-agent
      - DD_SERVICE=my-service
      # OpenTelemetry configuration (new)
      - OTEL_EXPORTER_OTLP_ENDPOINT=http://sematext-agent:4338
      - OTEL_SERVICE_NAME=my-service
    depends_on:
      - datadog-agent
      - sematext-agent

  datadog-agent:
    image: gcr.io/datadoghq/agent:7
    # ... DataDog agent config

  sematext-agent:
    image: sematext/agent:latest
    # ... Sematext agent config
```

### Step 5: Dashboard and Monitoring Migration

#### DataDog Dashboard Elements to Recreate

DataDog Dashboard Elements:

- Request rate, error rate, latency (RED metrics)
- Service dependencies and communication patterns
- Error distribution and top errors
- Performance percentiles (P50, P95, P99)
- Custom span tags and business KPIs

Sematext Provides Out-of-the-Box:

- Error rates with error type breakdown (HTTP errors, exceptions, timeouts)
- Latency percentiles (P50, P95, P99) calculated automatically
- Service health indicators with color-coded status
- Request volumes and throughput per service
- Performance trends and timeline visualizations
- Trace volume distribution with peak detection
- [Default tracing alerts](/docs/tracing/alerts/creating-alerts/#default-tracing-alerts)
- [Tracing Overview](/docs/tracing/reports/overview/) dashboard with all metrics
- [Traces Explorer](/docs/tracing/reports/explorer/) for searching and filtering
- [Trace Details](/docs/tracing/reports/trace-details/) with waterfall visualization
- Custom alerts based on any OpenTelemetry attribute

#### DataDog Monitor Migration

Common DataDog Monitors:
```yaml
# DataDog monitor example
type: trace-analytics
name: "High Error Rate Alert"
query: "traces(service:my-service).rollup(count).by(service).last(5m) > 100"
message: "Error rate is high for service my-service"
thresholds:
  critical: 100
  warning: 50
```

Sematext Alert Equivalent:

- Create threshold-based alerts in Sematext for error rates
- Set up anomaly detection for automatic threshold adjustment
- Configure notification channels (Slack, email, PagerDuty)

### Step 6: Data Validation

Compare Key Metrics:

1. **Service Coverage**: Verify all DataDog services appear in Sematext
2. **Trace Volume**: Compare trace ingestion rates between systems
3. **Custom Attributes**: Ensure DataDog tags translate to OpenTelemetry attributes
4. **Error Capture**: Validate error traces and exception handling
5. **Performance Metrics**: Compare latency distributions and percentiles

Validation Script Example:
```python
import requests
from datetime import datetime, timedelta

def compare_service_metrics():
    """Compare key metrics between DataDog and Sematext"""
    
    # DataDog API query
    dd_params = {
        'from': int((datetime.now() - timedelta(hours=1)).timestamp()),
        'to': int(datetime.now().timestamp()),
        'query': 'avg:trace.http.request.duration{service:my-service}'
    }
    
    dd_response = requests.get(
        'https://api.datadoghq.com/api/v1/query',
        headers={'DD-API-KEY': 'your-api-key'},
        params=dd_params
    )
    
    # Sematext query (via API or UI)
    # Compare results and validate consistency
    
    print(f"DataDog avg latency: {dd_response.json()}")
    # Implement Sematext comparison logic
```

## Common Migration Challenges

### Challenge 1: DataDog Agent Dependencies

**Issue**: Applications configured to send traces directly to DataDog agent

**Solution**: Update configuration to use OpenTelemetry exporters:
```python
# Before: DataDog-specific configuration
DD_AGENT_HOST=datadog-agent
DD_TRACE_AGENT_PORT=8126

# After: OpenTelemetry configuration
OTEL_EXPORTER_OTLP_ENDPOINT=http://localhost:4338
```

### Challenge 2: Custom DataDog Integrations

**Issue**: Applications using DataDog-specific libraries and integrations

**Solution**: Replace with OpenTelemetry equivalents or custom instrumentation:
```python
# DataDog custom integration
from ddtrace.contrib.celery import patch
patch()

# OpenTelemetry equivalent
from opentelemetry.instrumentation.celery import CeleryInstrumentor
CeleryInstrumentor().instrument()
```

### Challenge 3: DataDog Trace Analytics

**Issue**: Queries and dashboards based on DataDog's trace analytics

**Solution**: Recreate using Sematext's trace analysis features:

- Use attribute filtering instead of DataDog's tag-based queries
- Leverage Sematext's Tracing Overview for built-in analytics and aggregations
- Use Traces Explorer to search and filter trace data

### Challenge 4: DataDog Profiling Integration

**Issue**: Applications using DataDog's continuous profiling

**Solution**: 

- Profiling is separate from tracing - can be migrated independently
- Consider alternative profiling solutions or OpenTelemetry profiling (when available)
- Focus on tracing migration first, then address profiling separately

## Cost Comparison and Optimization

### DataDog vs Sematext Pricing Models

DataDog Pricing Challenges:

- Per-host pricing for agents
- Per-million-span pricing for APM
- Additional costs for premium features
- Complex pricing tiers and add-ons

Sematext Benefits:

- Simplified pricing based on data volume - see [Sematext pricing](https://sematext.com/pricing)
- Predictable costs with retention controls
- Built-in [cost optimization features](/docs/tracing/cost-optimization/)
- No per-host charges

### Post-Migration Cost Optimization

1. **Implement Intelligent Sampling**: Use OpenTelemetry's flexible sampling
2. **Optimize Retention**: Set appropriate retention periods per service
3. **Filter Unnecessary Data**: Remove noise from traces
4. **Monitor Usage**: Track costs and adjust strategies

## Timeline and Rollback Strategy

### Migration Timeline Template

Week 1: Assessment and Setup

- [ ] Audit current DataDog setup (1-2 days)
- [ ] Create Sematext infrastructure and install agents (1 day)
- [ ] Plan service migration order (1 day)

Week 2-3: Pilot and Migration

- [ ] Migrate 2-3 pilot services with dual export (2-3 days)
- [ ] Validate data quality and features (1-2 days)
- [ ] Migrate remaining services (3-5 days)
- [ ] Set up key dashboards and alerts (2-3 days)

Week 4: Optimization and Cleanup

- [ ] Monitor performance and optimize settings
- [ ] Remove DataDog agents and licensing
- [ ] Final validation and team training

### Rollback Strategy

Prepare for Rollback:

1. **Keep DataDog Running**: Don't decommission until fully validated
2. **Feature Flags**: Use toggles to switch between tracing systems
3. **Configuration Management**: Quick rollback via config changes
4. **Monitoring**: Set up alerts for migration issues

## Post-Migration Benefits

Immediate Benefits:

- Reduced vendor lock-in
- Simplified architecture with OpenTelemetry standards
- Unified observability platform
- Better control over sampling and costs

Long-term Benefits:

- OpenTelemetry ecosystem access
- Future-proof observability strategy
- Potential cost savings at scale
- Enhanced correlation with logs and metrics

## Support and Resources

Migration Assistance:

- Contact [support@sematext.com](mailto:support@sematext.com) for personalized help
- Professional services available for complex migrations
- Documentation and best practices guides

Related Resources:

- [OpenTelemetry SDKs](/docs/tracing/sdks/)
- [Sampling Strategies](/docs/tracing/sampling/)
- [Cost Optimization](/docs/tracing/cost-optimization/)
- [Troubleshooting Guide](/docs/tracing/troubleshooting/)

## Next Steps

1. **Assess Current Setup**: Document your DataDog APM configuration
2. **Plan Migration**: Use the timeline template and choose pilot services  
3. **Set Up Infrastructure**: Create Sematext account and install agents
4. **Start Migration**: Begin with non-critical services
5. **Get Support**: Reach out for assistance with complex scenarios

Migrating from DataDog APM to Sematext Tracing positions your organization for better cost control, vendor independence, and access to the growing OpenTelemetry ecosystem while maintaining world-class observability capabilities.