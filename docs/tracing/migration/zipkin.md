title: Migrating from Zipkin to Sematext Tracing
description: Complete guide to migrate from Zipkin tracing to Sematext Tracing with OpenTelemetry

## Migrating from Zipkin to Sematext Tracing

This guide helps you migrate from Zipkin to Sematext Tracing while preserving your existing instrumentation and gaining advanced observability features.

## Migration Overview

Sematext Tracing uses OpenTelemetry, which has excellent Zipkin compatibility, making migration smooth:

```
Current: Application → Zipkin Client → Zipkin Server → Zipkin Storage

New:     Application → OpenTelemetry SDK → Sematext Agent → Sematext Cloud
```

## Why Migrate to Sematext?

Advantages over self-hosted Zipkin:

- Managed Service: No server maintenance, scaling, or storage management
- Integrated Observability: Combine tracing with logs, metrics, and alerts in one platform
- Advanced Analytics: Service maps (coming soon), performance analysis, and anomaly detection
- OpenTelemetry Standard: Future-proof with industry-standard instrumentation
- Cost Efficiency: Built-in sampling, retention policies, and optimization tools
- Better Performance: Optimized ingestion and query performance

## Migration Strategies

### Strategy 1: Parallel Migration (Recommended)

Gradually migrate while keeping Zipkin as backup:

1. **Setup**: Deploy Sematext alongside existing Zipkin
2. **Dual Sending**: Configure apps to send traces to both systems
3. **Validation**: Compare data quality and completeness
4. **Switch Over**: Gradually move services to Sematext only
5. **Cleanup**: Decommission Zipkin infrastructure

### Strategy 2: Direct Migration

Quick migration for smaller deployments:

1. **Preparation**: Set up Sematext infrastructure
2. **Service Groups**: Migrate related services together
3. **Validate**: Ensure trace continuity across service boundaries
4. **Complete**: Switch remaining services

## Pre-Migration Assessment

### Document Current Setup

- [ ] Service Inventory: List all services sending traces to Zipkin
- [ ] Instrumentation Review: Document libraries and custom instrumentation
- [ ] Sampling Configuration: Note current sampling rates and strategies
- [ ] Dependencies: Identify dashboards, alerts, or tools using Zipkin data
- [ ] Storage Requirements: Estimate current trace volume and retention needs

### Zipkin Configuration Audit

Review your current Zipkin setup:

```properties
# Example Zipkin client configuration
zipkin.base-url=http://zipkin:9411
zipkin.service-name=my-service
zipkin.sender.type=web
zipkin.sampler.probability=0.1
```

## Step-by-Step Migration

### Step 1: Sematext Infrastructure Setup

1. **Create Tracing Apps**:

    - [Create Sematext Tracing Apps](/docs/tracing/create-tracing-app/) for your services
    - Organize by business domain or team ownership
    - Save the Tracing App tokens

2. **Deploy Sematext Agent**:

    - [Install Sematext Agent](/docs/agents/sematext-agent/installation/) on your infrastructure
    - [Enable OpenTelemetry support](/docs/agents/sematext-agent/opentelemetry/)
    - Verify agent is receiving traces on ports 4337 (gRPC) and 4338 (HTTP)

### Step 2: Application Migration by Language

##### Java Applications

Current Zipkin Setup:
```java
// Spring Boot with Zipkin
<dependency>
    <groupId>org.springframework.cloud</groupId>
    <artifactId>spring-cloud-starter-zipkin</artifactId>
</dependency>

// Application properties
spring.zipkin.base-url=http://zipkin:9411
spring.application.name=my-service
spring.sleuth.sampler.probability=0.1
```

New OpenTelemetry Setup:

Auto-Instrumentation (Recommended):
```bash
# Download OpenTelemetry agent
wget https://github.com/open-telemetry/opentelemetry-java-instrumentation/releases/latest/download/opentelemetry-javaagent.jar

# Replace Zipkin configuration
java -javaagent:opentelemetry-javaagent.jar \
  -Dotel.service.name=my-service \
  -Dotel.exporter.otlp.endpoint=http://localhost:4338 \
  -Dotel.exporter.otlp.protocol=http/protobuf \
  -Dotel.traces.sampler=traceidratio \
  -Dotel.traces.sampler.arg=0.1 \
  -jar my-application.jar
```

Spring Boot Migration:
```xml
<!-- Remove Zipkin dependencies -->
<!-- Add OpenTelemetry -->
<dependency>
    <groupId>io.opentelemetry.instrumentation</groupId>
    <artifactId>opentelemetry-spring-boot-starter</artifactId>
    <version>1.32.0-alpha</version>
</dependency>
```

```yaml
# application.yml
otel:
  service:
    name: my-service
  exporter:
    otlp:
      endpoint: http://localhost:4338
      protocol: http/protobuf
  traces:
    sampler:
      probability: 0.1
```

##### Python Applications

Current Zipkin Setup:
```python
from py_zipkin.zipkin import zipkin_span

@zipkin_span(service_name='my-service', span_name='operation')
def my_function():
    # Your code here
    pass
```

New OpenTelemetry Setup:
```bash
# Install OpenTelemetry packages
pip install opentelemetry-distro[otlp]
opentelemetry-bootstrap -a install

# Environment configuration
export OTEL_SERVICE_NAME=my-service
export OTEL_EXPORTER_OTLP_ENDPOINT=http://localhost:4338
export OTEL_EXPORTER_OTLP_PROTOCOL=http/protobuf
export OTEL_TRACES_SAMPLER=traceidratio
export OTEL_TRACES_SAMPLER_ARG=0.1

# Run with auto-instrumentation
opentelemetry-instrument python my_app.py
```

Manual migration:
```python
from opentelemetry import trace

tracer = trace.get_tracer(__name__)

@tracer.start_as_current_span("operation")
def my_function():
    # Your code here - very similar to Zipkin
    span = trace.get_current_span()
    span.set_attribute("custom.tag", "value")
```

##### Node.js Applications

Current Zipkin Setup:
```javascript
const zipkin = require('zipkin');
const {BatchRecorder} = require('zipkin');
const {HttpLogger} = require('zipkin-transport-http');

const recorder = new BatchRecorder({
  logger: new HttpLogger({
    endpoint: 'http://zipkin:9411/api/v2/spans'
  })
});

const tracer = new zipkin.Tracer({
  ctxImpl: new zipkin.ExplicitContext(),
  recorder,
  localServiceName: 'my-service'
});
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
    [SemanticResourceAttributes.SERVICE_NAME]: 'my-service',
  }),
  instrumentations: [getNodeAutoInstrumentations()],
});

sdk.start();

// Environment variables
process.env.OTEL_EXPORTER_OTLP_ENDPOINT = 'http://localhost:4338';
process.env.OTEL_EXPORTER_OTLP_PROTOCOL = 'http/protobuf';

// Run: node -r ./tracing.js my-app.js
```

##### Go Applications

Current Zipkin Setup:
```go
import (
    "github.com/openzipkin/zipkin-go"
    zipkinhttp "github.com/openzipkin/zipkin-go/reporter/http"
)

reporter := zipkinhttp.NewReporter("http://zipkin:9411/api/v2/spans")
tracer, err := zipkin.NewTracer(
    reporter,
    zipkin.WithLocalEndpoint(&zipkin.Endpoint{
        ServiceName: "my-service",
    }),
)
```

New OpenTelemetry Setup:
```go
import (
    "context"
    "go.opentelemetry.io/otel"
    "go.opentelemetry.io/otel/exporters/otlp/otlptrace/otlptracehttp"
    "go.opentelemetry.io/otel/sdk/trace"
    "go.opentelemetry.io/otel/semconv/v1.17.0/httpconv"
)

ctx := context.Background()

// Create OTLP exporter
exporter, err := otlptracehttp.New(ctx,
    otlptracehttp.WithEndpoint("http://localhost:4338"),
)

// Create tracer provider
tp := trace.NewTracerProvider(
    trace.WithBatcher(exporter),
    trace.WithResource(resource.NewWithAttributes(
        semconv.ServiceNameKey.String("my-service"),
    )),
    trace.WithSampler(trace.TraceIDRatioBased(0.1)),
)

otel.SetTracerProvider(tp)
tracer := tp.Tracer("my-service")
```

### Step 3: Configuration Migration

##### Sampling Migration

Zipkin Sampling:
```properties
# Zipkin probability sampling (10%)
zipkin.sampler.probability=0.1

# Zipkin counting sampler (every 10th trace)
zipkin.sampler.rate=10
```

OpenTelemetry Sampling:
```bash
# Probability sampling equivalent
export OTEL_TRACES_SAMPLER=traceidratio
export OTEL_TRACES_SAMPLER_ARG=0.1

# Always sample (for development)
export OTEL_TRACES_SAMPLER=always_on

# Custom sampling in code
sampler = TraceIdRatioBasedSampler(ratio=0.1)
```

##### Tag Migration

Zipkin Tags:
```java
span.tag("http.method", "GET");
span.tag("user.id", "12345");
span.tag("error", "true");
```

OpenTelemetry Attributes:
```java
span.setAttribute("http.method", "GET");
span.setAttribute("user.id", "12345");
span.setStatus(StatusCode.ERROR, "Operation failed");
```

### Step 4: Dual Export Configuration

Run both systems in parallel during migration:

Application-Level Dual Export (Recommended):
```python
# Python example
from opentelemetry.exporter.zipkin.proto.http import ZipkinExporter
from opentelemetry.exporter.otlp.proto.http.trace_exporter import OTLPSpanExporter
from opentelemetry.sdk.trace.export import BatchSpanProcessor

# Zipkin exporter (keep temporarily during migration)
zipkin_exporter = ZipkinExporter(
    endpoint="http://zipkin:9411/api/v2/spans"
)

# Sematext Agent OTLP endpoint (already running)
otlp_exporter = OTLPSpanExporter(
    endpoint="http://localhost:4338/v1/traces"  # Sematext Agent HTTP endpoint for traces
)

# Add both to tracer provider
tracer_provider = TracerProvider()
tracer_provider.add_span_processor(BatchSpanProcessor(zipkin_exporter))
tracer_provider.add_span_processor(BatchSpanProcessor(otlp_exporter))
```

Note: Since Sematext Agent already accepts OTLP traffic (ports 4337 for gRPC, 4338 for HTTP for traces), you don't need an additional OpenTelemetry Collector. The application can send traces directly to Sematext Agent while maintaining the Zipkin export during migration.

Alternative: Feature Flag Approach
```python
# Use feature flags to switch between systems
if feature_flag.is_enabled("use_sematext"):
    exporter = OTLPSpanExporter(endpoint="http://localhost:4338/v1/traces")
else:
    exporter = ZipkinExporter(endpoint="http://zipkin:9411/api/v2/spans")

tracer_provider.add_span_processor(BatchSpanProcessor(exporter))
```

### Step 5: Data Validation

Compare Key Metrics Between Systems:

1. Service Coverage:

    - Verify all Zipkin services appear in Sematext
    - Check operation names and counts
    - Validate service dependencies

2. Trace Quality:
   
    - Compare span counts per trace
    - Verify custom tags/attributes
    - Check error trace capture

3. Volume and Sampling:
   
    - Validate trace ingestion rates
    - Confirm sampling is working correctly
    - Monitor for data loss or duplication

Validation Script Example:
```python
import requests
from datetime import datetime, timedelta

# Compare trace counts between systems
def compare_trace_counts():
    end_time = datetime.now()
    start_time = end_time - timedelta(hours=1)
    
    # Zipkin query
    zipkin_url = f"http://zipkin:9411/api/v2/traces?serviceName=my-service&start={start_time}&end={end_time}"
    zipkin_traces = requests.get(zipkin_url).json()
    
    # Sematext query (via API)
    sematext_traces = query_sematext_traces("my-service", start_time, end_time)
    
    print(f"Zipkin traces: {len(zipkin_traces)}")
    print(f"Sematext traces: {len(sematext_traces)}")
    
    # Allow for some variance due to timing differences
    variance = abs(len(zipkin_traces) - len(sematext_traces))
    if variance / len(zipkin_traces) > 0.05:  # 5% tolerance
        print("WARNING: Significant difference in trace counts!")
```

### Step 6: Dashboard and Alert Migration

Export Zipkin Queries:

- Document important Zipkin UI searches and filters
- Note any custom dashboards built on Zipkin APIs
- List existing alerting rules

Create Sematext Equivalents:

- [Tracing Overview](/docs/tracing/reports/overview/) - Your primary dashboard for service health insights and performance monitoring
- [Traces Explorer](/docs/tracing/reports/explorer/) - Search and filter traces to find specific issues
- [Trace Details View](/docs/tracing/reports/trace-details/) - Drill down into individual traces with waterfall visualization
- [Span Details Panel](/docs/tracing/reports/trace-details/#span-details-panel) - Examine detailed span attributes
- Set up [performance alerts](/docs/tracing/alerts/creating-alerts/) for key metrics
- Configure [anomaly detection](/docs/tracing/reports/overview/#anomaly-detection) for proactive monitoring

## Common Migration Challenges

### Challenge 1: B3 Propagation Headers

**Issue**: Zipkin uses B3 propagation headers that differ from OpenTelemetry's W3C standard

**Solution**: Configure OpenTelemetry to support B3 headers during migration:

```python
from opentelemetry.propagators.b3 import B3MultiFormat, B3SingleFormat
from opentelemetry.propagators.composite import CompositePropagator
from opentelemetry.propagate import set_global_textmap

# Support both B3 and W3C headers during transition
propagator = CompositePropagator([
    B3MultiFormat(),
    B3SingleFormat(),
    TraceContextTextMapPropagator(),
])
set_global_textmap(propagator)
```

### Challenge 2: Custom Zipkin Annotations

**Issue**: Zipkin's timeline annotations don't directly map to OpenTelemetry

**Solution**: Convert annotations to events:

```java
// Zipkin annotations
span.annotate("cs");  // Client send
span.annotate("cr");  // Client receive

// OpenTelemetry events
span.addEvent("client.send");
span.addEvent("client.receive");

// Or use semantic conventions
span.setSpanKind(SpanKind.CLIENT);
```

### Challenge 3: Different Span Timing

**Issue**: Zipkin and OpenTelemetry may calculate durations differently

**Solution**: Validate timing accuracy and adjust if needed:

```python
# Ensure consistent timing in manual instrumentation
import time
from opentelemetry import trace

tracer = trace.get_tracer(__name__)

with tracer.start_as_current_span("operation") as span:
    start_time = time.time()
    
    # Your operation
    do_work()
    
    duration_ms = (time.time() - start_time) * 1000
    span.set_attribute("duration.manual", duration_ms)
```

## Post-Migration Optimization

### Performance Tuning

1. **Batch Configuration**: Optimize export batch sizes for your traffic volume
2. **Sampling Strategies**: Use [advanced sampling](/docs/tracing/sampling/) for cost optimization
3. **Attribute Filtering**: Remove unnecessary tags to reduce costs

### Advanced Features

Explore Sematext features not available in Zipkin:

- Service dependency maps
- Anomaly detection and alerts
- Cross-system correlation (logs, metrics, traces)
- Performance baselines and SLA monitoring

## Rollback Strategy

Prepare for potential rollback:

1. **Dual System Operation**: Keep Zipkin running until fully validated
2. **Feature Flags**: Implement toggles to switch between exporters
3. **Load Balancer Rules**: Quick DNS/proxy changes for rollback
4. **Data Export**: Backup critical trace data before Zipkin decommission

## Migration Checklist Template

### Week 1: Setup and Pilot
- [ ] Assess current Zipkin deployment (1 day)
- [ ] Create Sematext Tracing Apps and install agents (1 day)
- [ ] Select 2-3 pilot services and configure dual export (2-3 days)
- [ ] Validate data quality and test basic features (1-2 days)

### Week 2: Full Migration
- [ ] Migrate remaining services in planned order
- [ ] Complete dashboard and alert setup
- [ ] Monitor system performance
- [ ] Train team on Sematext features

### Week 3: Optimization and Cleanup
- [ ] Optimize sampling and performance settings
- [ ] Decommission Zipkin infrastructure
- [ ] Implement advanced Sematext features
- [ ] Document new processes

## Troubleshooting Common Issues

### Missing Traces

Symptoms: Traces appear in Zipkin but not Sematext

Solutions:

- Check OTLP exporter configuration
- Verify Sematext Agent connectivity
- Review sampling configuration
- Check for export errors in application logs

### Performance Impact

Symptoms: Increased latency after migration

Solutions:

- Optimize batch processor settings
- Review sampling rates
- Check network connectivity to Sematext Agent
- Monitor resource usage on agent hosts

### Context Propagation Issues

Symptoms: Broken trace chains between services

Solutions:

- Ensure all services use compatible propagation
- Configure B3 header support during transition
- Verify service-to-service communication headers
- Test trace propagation end-to-end

## Support Resources

- Migration Help: Contact [support@sematext.com](mailto:support@sematext.com) for assistance
- Documentation: Review [OpenTelemetry SDK guides](/docs/tracing/sdks/)
- Troubleshooting: Check the [tracing troubleshooting guide](/docs/tracing/troubleshooting/)
- Best Practices: Follow [cost optimization strategies](/docs/tracing/cost-optimization/)

## Related Documentation

- [OpenTelemetry SDKs](/docs/tracing/sdks/)
- [Sampling Configuration](/docs/tracing/sampling/)
- [Tracing Reports](/docs/tracing/reports/overview/)
- [Creating Alerts](/docs/tracing/alerts/creating-alerts/)
- [Agent Configuration](/docs/agents/sematext-agent/opentelemetry/)