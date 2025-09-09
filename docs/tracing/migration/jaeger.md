title: Migrating from Jaeger to Sematext Tracing
description: Complete guide to migrate from Jaeger tracing to Sematext Tracing with OpenTelemetry

## Migrating from Jaeger to Sematext Tracing

This guide helps you migrate from Jaeger to Sematext Tracing while maintaining your existing trace data and instrumentation investments.

## Migration Overview

Sematext Tracing is built on OpenTelemetry, the same standard that Jaeger supports, making migration straightforward:

```
Current: Application → Jaeger Client → Jaeger Agent → Jaeger Collector → Jaeger Storage

New:     Application → OpenTelemetry SDK → Sematext Agent → Sematext Cloud
```

## Why Migrate to Sematext?

Advantages over self-hosted Jaeger:

- Managed Infrastructure: No need to manage Jaeger collectors, storage, or scaling
- Integrated Observability: Combine tracing with logs, metrics, and alerts in one platform
- Advanced Analytics: Built-in performance analysis, service maps, and anomaly detection
- OpenTelemetry Native: Future-proof with the industry standard
- Cost Optimization: Built-in sampling strategies and retention management

## Migration Strategies

### Strategy 1: Parallel Migration (Recommended)

Run both systems simultaneously during the transition:

1. **Phase 1**: Set up Sematext alongside existing Jaeger
2. **Phase 2**: Configure applications to send traces to both systems
3. **Phase 3**: Validate trace data in Sematext
4. **Phase 4**: Gradually switch services to Sematext-only
5. **Phase 5**: Decommission Jaeger infrastructure

### Strategy 2: Service-by-Service Migration

Migrate one service at a time:

1. Start with non-critical services
2. Validate each migration before proceeding
3. Move to critical services last
4. Maintain Jaeger for unmigrated services

## Pre-Migration Checklist

- [ ] Inventory Current Setup: Document all services using Jaeger
- [ ] Review Instrumentation: Catalog custom spans and tags
- [ ] Assess Sampling: Document current sampling configurations  
- [ ] Check Dependencies: Note any dashboards or alerts using Jaeger
- [ ] Plan Downtime: Identify any required maintenance windows
- [ ] Create Sematext Account: Set up Tracing Apps for your services

## Step-by-Step Migration

### Step 1: Set Up Sematext Infrastructure

1. **Create Tracing Apps**:

    - [Create a Sematext Tracing App](/docs/tracing/create-tracing-app/) for each service or business domain
    - Note down the Tracing App tokens

2. **Install Sematext Agent**:

    - [Install Sematext Agent](/docs/agents/sematext-agent/installation/) on your infrastructure
    - [Configure OpenTelemetry support](/docs/agents/sematext-agent/opentelemetry/)

### Step 2: Application Migration by Language

##### Java Applications

Current Jaeger Setup:
```java
// Old Jaeger configuration
Configuration config = Configuration.fromEnv("my-service");
Tracer tracer = config.getTracer();
```

New OpenTelemetry Setup:

Option A - Auto-Instrumentation (Recommended):
```bash
# Download OpenTelemetry Java agent
wget https://github.com/open-telemetry/opentelemetry-java-instrumentation/releases/latest/download/opentelemetry-javaagent.jar

# Replace Jaeger agent with OpenTelemetry
java -javaagent:opentelemetry-javaagent.jar \
  -Dotel.service.name=my-service \
  -Dotel.exporter.otlp.endpoint=http://localhost:4338 \
  -Dotel.exporter.otlp.protocol=http/protobuf \
  -jar my-application.jar
```

Option B - Manual Migration:
```java
// New OpenTelemetry configuration
import io.opentelemetry.api.GlobalOpenTelemetry;
import io.opentelemetry.api.trace.Tracer;

Tracer tracer = GlobalOpenTelemetry.getTracer("my-service");

// Span creation remains similar
Span span = tracer.spanBuilder("operation-name").startSpan();
try (Scope scope = span.makeCurrent()) {
    // Your code here
    span.setAttribute("key", "value");  // Same as Jaeger tags
} catch (Exception e) {
    span.recordException(e);
    span.setStatus(StatusCode.ERROR, e.getMessage());
} finally {
    span.end();
}
```

##### Python Applications

Current Jaeger Setup:
```python
from jaeger_client import Config

config = Config(
    config={'sampler': {'type': 'const', 'param': 1}},
    service_name='my-service'
)
tracer = config.initialize_tracer()
```

New OpenTelemetry Setup:
```bash
# Install OpenTelemetry packages
pip install opentelemetry-distro[otlp]
opentelemetry-bootstrap -a install

# Configure environment
export OTEL_SERVICE_NAME=my-service
export OTEL_EXPORTER_OTLP_ENDPOINT=http://localhost:4338
export OTEL_EXPORTER_OTLP_PROTOCOL=http/protobuf

# Run with auto-instrumentation
opentelemetry-instrument python my_app.py
```

Manual instrumentation:
```python
from opentelemetry import trace
from opentelemetry.trace import Status, StatusCode

tracer = trace.get_tracer(__name__)

# Similar span usage
with tracer.start_as_current_span("operation-name") as span:
    span.set_attribute("key", "value")  # Same as Jaeger tags
    try:
        # Your code here
        pass
    except Exception as e:
        span.record_exception(e)
        span.set_status(Status(StatusCode.ERROR, str(e)))
```

##### Node.js Applications

Current Jaeger Setup:
```javascript
const initJaegerTracer = require('jaeger-client').initTracer;

const tracer = initJaegerTracer({
  serviceName: 'my-service'
}, {});
```

New OpenTelemetry Setup:
```javascript
// Install packages
// npm install @opentelemetry/auto-instrumentations-node @opentelemetry/sdk-node

// tracing.js
const { NodeSDK } = require('@opentelemetry/sdk-node');
const { getNodeAutoInstrumentations } = require('@opentelemetry/auto-instrumentations-node');

const sdk = new NodeSDK({
  serviceName: 'my-service',
  instrumentations: [getNodeAutoInstrumentations()]
});

sdk.start();

// Run: node -r ./tracing.js my-app.js
```

##### Go Applications

Current Jaeger Setup:
```go
import "github.com/uber/jaeger-client-go"

tracer, closer := jaeger.NewTracer(
    "my-service",
    jaeger.NewConstSampler(true),
    jaeger.NewRemoteReporter(...),
)
```

New OpenTelemetry Setup:
```go
import (
    "go.opentelemetry.io/otel"
    "go.opentelemetry.io/otel/exporters/otlp/otlptrace/otlptracehttp"
    "go.opentelemetry.io/otel/sdk/trace"
)

// Initialize tracer
exporter, _ := otlptracehttp.New(context.Background(),
    otlptracehttp.WithEndpoint("http://localhost:4338"))

tp := trace.NewTracerProvider(
    trace.WithBatcher(exporter),
    trace.WithResource(resource.NewWithAttributes(
        semconv.ServiceNameKey.String("my-service"),
    )))

otel.SetTracerProvider(tp)
tracer := tp.Tracer("my-service")
```

### Step 3: Configuration Migration

##### Sampling Configuration

Jaeger Sampling:
```yaml
# Jaeger sampling config
strategies:
  default_strategy:
    type: probabilistic
    param: 0.1
```

OpenTelemetry Sampling:
```bash
# Environment variable
export OTEL_TRACES_SAMPLER=traceidratio
export OTEL_TRACES_SAMPLER_ARG=0.1

# Or in code
sampler = TraceIdRatioBasedSampler(0.1)
```

##### Service Tags / Resource Attributes

Jaeger Tags:
```yaml
JAEGER_TAGS=environment=production,version=1.2.3,datacenter=us-east
```

OpenTelemetry Resource Attributes:
```bash
export OTEL_RESOURCE_ATTRIBUTES=environment=production,service.version=1.2.3,datacenter=us-east
```

### Step 4: Parallel Operation Setup

To run both systems simultaneously:

Application-Level Dual Export (Recommended)
```python
# Python example - send to both Jaeger and Sematext
from opentelemetry.exporter.jaeger.thrift import JaegerExporter
from opentelemetry.exporter.otlp.proto.http.trace_exporter import OTLPSpanExporter
from opentelemetry.sdk.trace.export import BatchSpanProcessor

# Jaeger exporter (keep temporarily during migration)
jaeger_exporter = JaegerExporter(
    agent_host_name="jaeger-agent",
    agent_port=6831,
)

# Sematext Agent OTLP endpoint (already running)
otlp_exporter = OTLPSpanExporter(
    endpoint="http://localhost:4338/v1/traces"  # Sematext Agent HTTP endpoint for traces
)

# Add both processors
tracer_provider = TracerProvider()
tracer_provider.add_span_processor(BatchSpanProcessor(jaeger_exporter))
tracer_provider.add_span_processor(BatchSpanProcessor(otlp_exporter))
```

Note: Since Sematext Agent already accepts OTLP traffic (ports 4337 for gRPC, 4338 for HTTP for traces), you don't need an additional OpenTelemetry Collector. The application can send traces directly to Sematext Agent while maintaining the Jaeger export during migration.

### Step 5: Data Validation

Compare Key Metrics:

- Service names and operations
- Trace volume and sampling rates  
- Error rates and latencies
- Custom tags/attributes
- Dependency relationships

Validation Checklist:

- [ ] All services appear in Sematext
- [ ] Trace volumes match expected rates
- [ ] Custom attributes are preserved
- [ ] Error traces are captured correctly
- [ ] Performance metrics align with Jaeger

### Step 6: Dashboard and Alert Migration

Dashboards:

- Export key Jaeger dashboard queries
- Use Sematext's built-in reporting:
  - [Tracing Overview](/docs/tracing/reports/overview/) - Main dashboard for service health insights and metrics
  - [Traces Explorer](/docs/tracing/reports/explorer/) - Search and filter traces
  - [Trace Details View](/docs/tracing/reports/trace-details/) - Analyze individual request flows with waterfall visualization
  - [Span Details Panel](/docs/tracing/reports/trace-details/#span-details-panel) - Examine span-level details
- Test alerting rules in Sematext

Alerting:

- Document existing Jaeger alerts
- Create equivalent [Sematext alerts](/docs/tracing/alerts/creating-alerts/)
- Test alert delivery and escalation

## Common Migration Challenges

### Challenge 1: Custom Instrumentation Differences

**Issue**: Jaeger-specific APIs don't translate directly

**Solution**: Map concepts between systems:
```java
// Jaeger
span.setTag("user.id", userId);
span.log("Processing started");

// OpenTelemetry  
span.setAttribute("user.id", userId);
span.addEvent("Processing started");
```

### Challenge 2: Sampling Strategy Migration

**Issue**: Different sampling configuration formats

**Solution**: Use the [OpenTelemetry sampling guide](/docs/tracing/sampling/) to recreate your strategies:

```bash
# Jaeger const sampler (always on)
JAEGER_SAMPLER_TYPE=const
JAEGER_SAMPLER_PARAM=1

# OpenTelemetry equivalent
export OTEL_TRACES_SAMPLER=always_on

# Jaeger probabilistic sampler  
JAEGER_SAMPLER_TYPE=probabilistic
JAEGER_SAMPLER_PARAM=0.1

# OpenTelemetry equivalent
export OTEL_TRACES_SAMPLER=traceidratio
export OTEL_TRACES_SAMPLER_ARG=0.1
```

### Challenge 3: Different Trace Context Headers

**Issue**: Jaeger uses different trace propagation headers

**Solution**: OpenTelemetry uses W3C Trace Context by default. If you need Jaeger header compatibility during migration:

```python
from opentelemetry.propagators.jaeger import JaegerPropagator
from opentelemetry.propagators.composite import CompositePropagator
from opentelemetry.propagate import set_global_textmap

# Support both header formats during migration
propagator = CompositePropagator([
    JaegerPropagator(),
    TraceContextTextMapPropagator(),
])
set_global_textmap(propagator)
```

## Post-Migration Optimization

After successful migration:

1. **Review Sampling**: Optimize with [Sematext cost optimization strategies](/docs/tracing/cost-optimization/)
2. **Set Up Alerts**: Configure [performance and error alerts](/docs/tracing/alerts/creating-alerts/)
3. **Explore Features**: Use service maps, anomaly detection, and correlation features
4. **Team Training**: Train your team on Sematext's advanced features

## Rollback Plan

Always have a rollback strategy:

1. **Keep Jaeger Running**: Don't decommission until fully validated
2. **DNS/Load Balancer Switch**: Quick rollback via infrastructure changes
3. **Application Toggle**: Feature flags to switch between exporters
4. **Data Backup**: Export critical traces before decommissioning Jaeger

## Migration Timeline Template

Week 1: Setup and Pilot

- [ ] Assess current Jaeger setup (1 day)
- [ ] Create Sematext account and install agents (1 day)
- [ ] Choose 2-3 pilot services and implement dual export (2-3 days)
- [ ] Validate data quality and completeness (1-2 days)

Week 2: Full Migration

- [ ] Migrate remaining services
- [ ] Update any custom dashboards or alerts
- [ ] Monitor performance

Week 3: Cleanup

- [ ] Final validation across all services
- [ ] Decommission Jaeger infrastructure
- [ ] Optimize sampling and costs

## Need Help?

- Check the [troubleshooting guide](/docs/tracing/troubleshooting/) for common issues
- Review [OpenTelemetry SDK documentation](/docs/tracing/sdks/) for language-specific details
- Contact [support@sematext.com](mailto:support@sematext.com) for migration assistance

## Related Documentation

- [OpenTelemetry SDKs](/docs/tracing/sdks/)
- [Sampling Configuration](/docs/tracing/sampling/)
- [Cost Optimization](/docs/tracing/cost-optimization/)
- [Creating Alerts](/docs/tracing/alerts/creating-alerts/)
- [Tracing Reports](/docs/tracing/reports/overview/)