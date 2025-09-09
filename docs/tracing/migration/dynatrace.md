title: Migrating from Dynatrace APM to Sematext Tracing
description: Complete guide to migrate from Dynatrace APM to Sematext Tracing with OpenTelemetry

## Migrating from Dynatrace APM to Sematext Tracing

This guide provides a migration strategy from Dynatrace APM to Sematext Tracing, helping you transition from Dynatrace's AI-powered monitoring to OpenTelemetry-based observability.

## Migration Overview

Dynatrace uses OneAgent for automatic application discovery and monitoring, while Sematext leverages OpenTelemetry standards:

```
Current: Application → Dynatrace OneAgent → Dynatrace Cluster → Dynatrace SaaS/Managed

New:     Application → OpenTelemetry SDK → Sematext Agent → Sematext Cloud
```

## Why Migrate from Dynatrace?

**Common Migration Drivers:**

- **Cost Optimization**: Dynatrace's per-host pricing can become expensive at scale
- **Open Standards**: Avoid vendor lock-in with OpenTelemetry standard
- **Simplified Architecture**: Reduce dependency on proprietary monitoring agents
- **Unified Platform**: Combine tracing with logs and metrics in one solution
- **Better Control**: More granular control over data collection and retention

## Migration Challenges and Solutions

### Challenge 1: OneAgent Dependency

**Dynatrace Challenge**: Applications rely on OneAgent for automatic discovery and monitoring

**OpenTelemetry Solution**: Replace with explicit OpenTelemetry instrumentation and configuration

**Impact**: High - requires explicit instrumentation setup vs automatic discovery

### Challenge 2: AI-Powered Analytics

**Dynatrace Challenge**: AI-driven problem detection and root cause analysis

**Sematext Solution**: Use Sematext's analytics and alerting with manual configuration

**Impact**: Medium - requires setting up explicit monitoring rules

### Challenge 3: Service Entity Model

**Dynatrace Challenge**: Dynatrace's automatic service entity detection and mapping

**OpenTelemetry Solution**: Define services explicitly through OpenTelemetry configuration

**Impact**: Medium - requires explicit service definition

## Pre-Migration Assessment

### Document Current Dynatrace Setup

Infrastructure Inventory:

- [ ] List all hosts with OneAgent installed
- [ ] Document OneAgent versions and configurations
- [ ] Identify manually configured services and custom metrics
- [ ] Map service dependencies discovered by Dynatrace

Monitoring Configuration:

- [ ] Export custom dashboards and charts
- [ ] Document problem detection rules and alerts
- [ ] List management zones and tagging strategies  
- [ ] Review SLO definitions and configurations

Integration Assessment:

- [ ] Document integrations with external systems
- [ ] Review API usage and custom extensions
- [ ] Assess dependency on Dynatrace-specific features
- [ ] Identify business-critical monitoring workflows

## Step-by-Step Migration

### Step 1: Sematext Infrastructure Setup

1. **Create Sematext Environment**:

    - [Create Sematext Tracing Apps](/docs/tracing/create-tracing-app/) for your services
    - Organize by business domain or environment (prod/staging/dev)
    - Document Tracing App tokens for configuration

2. **Deploy Sematext Agent**:

    - [Install Sematext Agent](/docs/agents/sematext-agent/installation/) on target infrastructure
    - [Enable OpenTelemetry support](/docs/agents/sematext-agent/opentelemetry/)
    - Configure OTLP endpoints (4337 gRPC, 4338 HTTP)

### Step 2: Application Migration by Technology

#### Java Applications

Current Dynatrace Setup:
```bash
# OneAgent installation (automatic)
# No application changes required
# OneAgent discovers Java applications automatically
```

New OpenTelemetry Setup:
```bash
# Download OpenTelemetry Java agent
wget https://github.com/open-telemetry/opentelemetry-java-instrumentation/releases/latest/download/opentelemetry-javaagent.jar

# Explicit instrumentation configuration
java -javaagent:opentelemetry-javaagent.jar \
  -Dotel.service.name=my-java-service \
  -Dotel.resource.attributes=environment=production,team=backend \
  -Dotel.exporter.otlp.endpoint=http://localhost:4338 \
  -Dotel.exporter.otlp.protocol=http/protobuf \
  -jar my-application.jar
```

Custom Business Logic Instrumentation:
```java
// Dynatrace custom services (automatic detection)
// No explicit code required for basic instrumentation

// OpenTelemetry explicit instrumentation
import io.opentelemetry.api.GlobalOpenTelemetry;
import io.opentelemetry.api.trace.Tracer;
import io.opentelemetry.api.trace.Span;
import io.opentelemetry.context.Scope;

private final Tracer tracer = GlobalOpenTelemetry.getTracer("business-logic");

public void processBusinessTransaction(String transactionId) {
    Span span = tracer.spanBuilder("process-business-transaction")
        .setAttribute("transaction.id", transactionId)
        .setAttribute("business.unit", "payments")
        .startSpan();
    
    try (Scope scope = span.makeCurrent()) {
        // Business logic
        span.addEvent("transaction.validated");
        processPayment(transactionId);
        span.setStatus(StatusCode.OK);
    } catch (Exception e) {
        span.recordException(e);
        span.setStatus(StatusCode.ERROR, e.getMessage());
    } finally {
        span.end();
    }
}
```

#### .NET Applications

Current Dynatrace Setup:
```csharp
// OneAgent automatically instruments .NET applications
// No code changes required for basic monitoring
```

New OpenTelemetry Setup:
```xml
<!-- Package references -->
<PackageReference Include="OpenTelemetry" Version="1.6.0" />
<PackageReference Include="OpenTelemetry.Extensions.Hosting" Version="1.6.0" />
<PackageReference Include="OpenTelemetry.Exporter.OpenTelemetryProtocol" Version="1.6.0" />
<PackageReference Include="OpenTelemetry.Instrumentation.AspNetCore" Version="1.5.1-beta.1" />
```

```csharp
// Startup configuration
using OpenTelemetry.Trace;

builder.Services.AddOpenTelemetry()
    .WithTracing(tracing => tracing
        .AddSource("MyApplication")
        .AddAspNetCoreInstrumentation()
        .AddHttpClientInstrumentation()
        .AddSqlClientInstrumentation()
        .AddOtlpExporter(options =>
        {
            options.Endpoint = new Uri("http://localhost:4318/v1/traces");
        }));

// Custom instrumentation
using System.Diagnostics;

private static readonly ActivitySource ActivitySource = new("MyApplication");

public async Task<ProcessResult> ProcessOrderAsync(Order order)
{
    using var activity = ActivitySource.StartActivity("process-order");
    activity?.SetTag("order.id", order.Id);
    activity?.SetTag("customer.tier", order.CustomerTier);
    
    try
    {
        var result = await ProcessOrderLogic(order);
        activity?.SetStatus(ActivityStatusCode.Ok);
        return result;
    }
    catch (Exception ex)
    {
        activity?.SetStatus(ActivityStatusCode.Error, ex.Message);
        throw;
    }
}
```

#### Node.js Applications

Current Dynatrace Setup:
```javascript
// OneAgent automatically discovers and monitors Node.js applications
// No application code changes required
```

New OpenTelemetry Setup:
```javascript
// Install packages
// npm install @opentelemetry/auto-instrumentations-node @opentelemetry/sdk-node

// tracing.js - Initialize before application
const { NodeSDK } = require('@opentelemetry/sdk-node');
const { getNodeAutoInstrumentations } = require('@opentelemetry/auto-instrumentations-node');
const { Resource } = require('@opentelemetry/resources');
const { SemanticResourceAttributes } = require('@opentelemetry/semantic-conventions');

const sdk = new NodeSDK({
  resource: new Resource({
    [SemanticResourceAttributes.SERVICE_NAME]: 'my-node-service',
    [SemanticResourceAttributes.SERVICE_VERSION]: '1.0.0',
    [SemanticResourceAttributes.DEPLOYMENT_ENVIRONMENT]: 'production'
  }),
  instrumentations: [getNodeAutoInstrumentations()],
});

sdk.start();

// Custom business logic instrumentation
const { trace } = require('@opentelemetry/api');
const tracer = trace.getTracer('business-operations');

async function processCustomerRequest(customerId, requestType) {
    const span = tracer.startSpan('process-customer-request');
    span.setAttributes({
        'customer.id': customerId,
        'request.type': requestType,
        'processing.priority': 'high'
    });
    
    try {
        const result = await processRequest(customerId, requestType);
        span.addEvent('request.completed');
        span.setStatus({ code: SpanStatusCode.OK });
        return result;
    } catch (error) {
        span.recordException(error);
        span.setStatus({
            code: SpanStatusCode.ERROR,
            message: error.message
        });
        throw error;
    } finally {
        span.end();
    }
}
```

#### Python Applications

Current Dynatrace Setup:
```python
# OneAgent automatically instruments Python applications
# No code changes required for basic monitoring
```

New OpenTelemetry Setup:
```bash
# Install OpenTelemetry packages
pip install opentelemetry-distro[otlp]
opentelemetry-bootstrap -a install

# Environment configuration
export OTEL_SERVICE_NAME=my-python-service
export OTEL_RESOURCE_ATTRIBUTES=environment=production,team=data-science
export OTEL_EXPORTER_OTLP_ENDPOINT=http://localhost:4318
export OTEL_EXPORTER_OTLP_PROTOCOL=http/protobuf

# Run with auto-instrumentation
opentelemetry-instrument python my_app.py
```

```python
# Custom instrumentation for business logic
from opentelemetry import trace
from opentelemetry.trace import Status, StatusCode

tracer = trace.get_tracer(__name__)

def process_data_pipeline(dataset_id, pipeline_config):
    with tracer.start_as_current_span("process-data-pipeline") as span:
        span.set_attribute("dataset.id", dataset_id)
        span.set_attribute("pipeline.type", pipeline_config.type)
        span.set_attribute("processing.mode", "batch")
        
        try:
            # Data processing logic
            result = execute_pipeline(dataset_id, pipeline_config)
            
            span.add_event("pipeline.completed", {
                "records.processed": result.record_count,
                "processing.duration": result.duration
            })
            
            span.set_status(Status(StatusCode.OK))
            return result
            
        except Exception as e:
            span.record_exception(e)
            span.set_status(Status(StatusCode.ERROR, str(e)))
            raise
```

### Step 3: Service Discovery and Mapping Migration

#### Dynatrace Smartscape to OpenTelemetry Service Map

Dynatrace Approach:

- Automatic service discovery through OneAgent
- AI-powered service dependency mapping
- Automatic technology detection

OpenTelemetry Approach:

- Explicit service definition through configuration
- Service dependencies tracked through distributed traces
- Manual service categorization and tagging

Migration Strategy:

1. Export Service Inventory: Document services discovered by Dynatrace
2. Define Service Configuration: Create explicit OpenTelemetry service definitions
3. Validate Dependencies: Ensure distributed tracing captures service relationships
4. Tag Consistently: Apply consistent tagging strategy across services

### Step 4: Monitoring and Alerting Migration

#### Problem Detection Rules Migration

Dynatrace Problem Detection:
```yaml
# Dynatrace automatic problem detection
- Response time degradation (AI baseline)
- Error rate increases (AI baseline)
- Resource utilization anomalies
- Custom metric thresholds
```

Sematext Alert Recreation:
```yaml
# Explicit alert configuration required
- Response time: > 2s for 5 minutes
- Error rate: > 5% for 3 minutes  
- Throughput: < 50% of baseline for 10 minutes
- Custom business metrics: explicit thresholds
```

Migration Steps:

1. Document Current Rules: Export all Dynatrace problem detection configurations
2. Create Sematext Alerts: Set up equivalent [performance alerts](/docs/tracing/alerts/creating-alerts/)
3. Adjust Baselines: Manually set thresholds based on historical data
4. Test Alerting: Validate alert delivery and escalation paths

#### Dashboard Migration

Dynatrace Dashboards:

- Built-in service overview dashboards
- Custom business dashboards
- Real-time problem feeds
- Service flow visualizations

Sematext Provides Out-of-the-Box:

- Service health with color-coded indicators
- Error rates and error type classification
- Latency percentiles (P50, P95, P99) automatically calculated
- Request volumes and throughput metrics
- Performance trend visualizations
- [Default tracing alerts](/docs/tracing/alerts/creating-alerts/#default-tracing-alerts)
- [Tracing Overview](/docs/tracing/reports/overview/) dashboard with all metrics
- [Traces Explorer](/docs/tracing/reports/explorer/) for investigation
- [Trace Details](/docs/tracing/reports/trace-details/) with waterfall views

### Step 5: Custom Extensions and Integrations

#### OneAgent Extensions Migration

Dynatrace Extensions:

- Custom metrics collection
- Third-party system integration
- Business transaction definitions
- Custom service detection rules

OpenTelemetry Equivalent:

- Use OpenTelemetry metrics SDK for custom metrics
- Implement custom instrumentation for third-party systems
- Define business transactions through span attributes
- Configure explicit service discovery

#### API Integration Migration

Dynatrace API Usage:
```python
# Dynatrace API example
import requests

def get_service_metrics():
    response = requests.get(
        'https://your-tenant.live.dynatrace.com/api/v1/timeseries/com.dynatrace.builtin:service.responsetime',
        headers={'Authorization': 'Api-Token your-token'}
    )
    return response.json()
```

Sematext API Equivalent:
```python
# Sematext API for metrics
def get_service_metrics():
    response = requests.get(
        'https://apps.sematext.com/api/v1/traces/search',
        headers={'Authorization': 'Bearer your-token'},
        params={'service': 'my-service', 'time_range': '1h'}
    )
    return response.json()
```

### Step 6: Data Validation and Parallel Operation

Validation Strategy:

1. **Service Coverage**: Ensure all Dynatrace-monitored services appear in Sematext
2. **Dependency Mapping**: Validate service relationships through distributed traces
3. **Metric Accuracy**: Compare key performance indicators between systems
4. **Alert Coverage**: Test alert triggers and notification delivery

Parallel Operation Setup:

Since Dynatrace OneAgent and OpenTelemetry instrumentation work differently, you'll typically run both during migration:

```bash
# Configure OpenTelemetry to send to Sematext Agent
export OTEL_EXPORTER_OTLP_ENDPOINT=http://localhost:4338  # Sematext Agent HTTP endpoint for traces
export OTEL_SERVICE_NAME=my-service
export OTEL_RESOURCE_ATTRIBUTES=environment=production

# Keep OneAgent running (it operates independently)
# OneAgent will continue sending to Dynatrace
# OpenTelemetry will send to Sematext Agent

# Gradual transition approach:
# 1. Start with non-critical services
# 2. Validate data quality in both systems
# 3. Migrate critical services
# 4. Remove OneAgent after full validation
```

Note: Sematext Agent already accepts OTLP traffic (ports 4337 for gRPC, 4338 for HTTP for traces), so no additional OpenTelemetry Collector is needed. Applications send traces directly to Sematext Agent while OneAgent continues its automatic instrumentation.

## Common Migration Challenges

### Challenge 1: Loss of AI-Powered Insights

**Issue**: Dynatrace's AI-driven problem detection and root cause analysis

**Solution**: 

- Set up explicit alerting rules based on historical patterns
- Use Sematext's anomaly detection capabilities
- Implement custom analytics for business-specific insights
- Leverage OpenTelemetry's rich trace context for root cause analysis

### Challenge 2: Automatic Service Discovery

**Issue**: OneAgent's automatic application discovery vs explicit OpenTelemetry configuration

**Solution**:

- Document all services currently monitored by Dynatrace
- Create explicit service definitions in OpenTelemetry
- Use consistent naming and tagging strategies
- Implement automated service registration where possible

### Challenge 3: Dynatrace-Specific Integrations

**Issue**: Custom integrations built around Dynatrace APIs and data formats

**Solution**:

- Identify critical integrations and their dependencies
- Recreate using OpenTelemetry standards and Sematext APIs
- Consider phased migration for complex integrations
- Update downstream systems to consume OpenTelemetry data

## Cost Comparison and Optimization

### Dynatrace vs Sematext Cost Model

Dynatrace Cost Challenges:

- Per-host pricing can become expensive at scale
- Complex licensing tiers (Infrastructure, APM, Digital Experience)
- Additional costs for AI features and advanced analytics
- Per-user pricing for certain features

Sematext Advantages:

- Transparent volume-based pricing - see [Sematext pricing](https://sematext.com/pricing)
- No per-host limitations
- [Built-in cost optimization tools](/docs/tracing/cost-optimization/)
- Predictable scaling costs

### Post-Migration Optimization

1. **Implement Efficient Sampling**: Use OpenTelemetry's sampling strategies
2. **Optimize Trace Attributes**: Remove unnecessary data to reduce costs
3. **Adjust Retention**: Set appropriate retention periods per service type
4. **Monitor Usage**: Track costs and optimize based on actual usage patterns

## Migration Timeline

### Recommended Migration Schedule

Week 1-2: Assessment and Setup

- [ ] Complete Dynatrace environment audit (2-3 days)
- [ ] Export critical monitoring configurations (1-2 days)
- [ ] Create Sematext infrastructure and install agents (1 day)
- [ ] Plan service migration priority (1-2 days)

Week 3-4: Pilot and Migration

- [ ] Select pilot applications and implement OpenTelemetry (2-3 days)
- [ ] Set up parallel operation and validate data quality (2-3 days)
- [ ] Migrate remaining applications in planned order (3-5 days)
- [ ] Set up essential monitoring and alerting (2-3 days)

Week 5-6: Optimization and Cleanup

- [ ] Train teams on new monitoring workflows
- [ ] Optimize sampling and performance settings
- [ ] Remove OneAgent from migrated hosts
- [ ] Final validation and establish new procedures

## Rollback Strategy

Prepare for Rollback:

1. **Maintain OneAgent**: Keep Dynatrace monitoring active during migration
2. **Configuration Backup**: Save all Dynatrace configurations before changes
3. **Validation Gates**: Set clear criteria for migration success/failure
4. **Quick Recovery**: Plan rapid rollback procedures for critical issues

## Post-Migration Benefits

Immediate Benefits:

- Reduced per-host licensing costs
- Open-standard observability with OpenTelemetry
- Unified platform for traces, logs, and metrics
- Better control over data collection and retention

Long-term Benefits:

- Vendor-neutral observability strategy
- Access to growing OpenTelemetry ecosystem
- Simplified monitoring architecture
- Enhanced correlation across observability data types

## Support and Resources

Migration Assistance:

- Contact [support@sematext.com](mailto:support@sematext.com) for personalized support
- Professional services available for enterprise migrations
- Comprehensive documentation and best practices

Related Documentation:

- [OpenTelemetry SDKs](/docs/tracing/sdks/)
- [Cost Optimization Strategies](/docs/tracing/cost-optimization/)
- [Tracing Analytics](/docs/tracing/reports/overview/)
- [Alert Configuration](/docs/tracing/alerts/creating-alerts/)

Migrating from Dynatrace to Sematext Tracing represents a strategic move toward open standards while maintaining enterprise-grade observability capabilities. This migration guide provides the framework for a successful transition that reduces costs while preserving or enhancing your monitoring capabilities.