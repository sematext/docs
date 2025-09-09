title: Migrating from New Relic APM to Sematext Tracing
description: Complete guide to migrate from New Relic APM to Sematext Tracing with OpenTelemetry

## Migrating from New Relic APM to Sematext Tracing

This guide helps you migrate from New Relic APM to Sematext Tracing using OpenTelemetry standards, potentially reducing costs while maintaining or improving observability capabilities.

## Migration Overview

New Relic APM uses proprietary agents and data formats, while Sematext Tracing leverages OpenTelemetry:

```
Current: Application → New Relic Agent → New Relic Collector → New Relic Platform

New:     Application → OpenTelemetry SDK → Sematext Agent → Sematext Cloud
```

## Why Migrate from New Relic?

Common Migration Drivers:

- Cost Optimization: New Relic's user-based pricing and data ingestion costs can become expensive
- Unified Observability: Combine tracing with logs and metrics in one integrated platform
- Open Standards: Future-proof your observability with vendor-neutral OpenTelemetry
- Better Control: More granular control over sampling, retention, and data quality
- Simplified Licensing: Avoid complex user-based licensing models

## Migration Challenges and Solutions

### Challenge 1: New Relic Agent Replacement

**New Relic Challenge**: Applications instrumented with New Relic proprietary agents

**OpenTelemetry Solution**: Replace with standard OpenTelemetry instrumentation

**Impact**: Medium - requires application configuration changes

### Challenge 2: Custom Attributes and Events

**New Relic Challenge**: New Relic-specific APIs for custom attributes, events, and metrics

**Sematext Solution**: Convert to OpenTelemetry spans, attributes, and events

**Impact**: Medium - custom code needs updating

### Challenge 3: New Relic Insights and NRQL Queries

**New Relic Challenge**: Dashboards and alerts built on New Relic Query Language (NRQL)

**Sematext Solution**: Recreate using Sematext's tracing analytics and query capabilities

**Impact**: High - requires dashboard and alert recreation

## Pre-Migration Assessment

### Document Current New Relic Setup

Application Inventory:

- [ ] List all applications with New Relic APM agents
- [ ] Document agent versions and configurations
- [ ] Identify applications using New Relic Browser monitoring
- [ ] Map service dependencies and external service calls

Custom Instrumentation Audit:

- [ ] Document custom transactions and traces
- [ ] List New Relic API usage (custom events, attributes, metrics)
- [ ] Identify business-critical custom dashboards
- [ ] Note integration with New Relic Alerts and notification channels

Licensing and Usage Review:

- [ ] Document current New Relic pricing tier and user count
- [ ] Assess data retention requirements
- [ ] Review compliance and audit requirements
- [ ] Estimate current trace volume and growth projections

## Step-by-Step Migration

### Step 1: Sematext Infrastructure Setup

1. **Create Sematext Environment**:

   - [Create Sematext Tracing Apps](/docs/tracing/create-tracing-app/) for your applications
   - Organize by environment (production/staging/development)
   - Save Tracing App tokens for agent configuration

2. **Deploy Sematext Agent**:

   - [Install Sematext Agent](/docs/agents/sematext-agent/installation/) on your infrastructure
   - [Configure OpenTelemetry support](/docs/agents/sematext-agent/opentelemetry/)
   - Test OTLP endpoint connectivity (ports 4337/4338)

### Step 2: Application Migration by Language

##### Java Applications

Current New Relic Setup:
```bash
# New Relic Java agent
java -javaagent:newrelic.jar \
  -Dnewrelic.config.app_name="My Java App" \
  -Dnewrelic.config.license_key=your_license_key \
  -jar my-application.jar
```

```xml
<!-- newrelic.yml configuration -->
common: &default_settings
  license_key: 'your_license_key'
  app_name: My Java App
  distributed_tracing:
    enabled: true
```

New OpenTelemetry Setup:
```bash
# Download OpenTelemetry Java agent
wget https://github.com/open-telemetry/opentelemetry-java-instrumentation/releases/latest/download/opentelemetry-javaagent.jar

# Replace New Relic agent
java -javaagent:opentelemetry-javaagent.jar \
  -Dotel.service.name="My Java App" \
  -Dotel.resource.attributes=environment=production,service.version=1.0 \
  -Dotel.exporter.otlp.endpoint=http://localhost:4338 \
  -Dotel.exporter.otlp.protocol=http/protobuf \
  -jar my-application.jar
```

Custom Instrumentation Migration:
```java
// New Relic custom instrumentation
import com.newrelic.api.agent.NewRelic;
import com.newrelic.api.agent.Trace;

@Trace
public void processOrder(String orderId) {
    NewRelic.addCustomAttribute("order.id", orderId);
    NewRelic.addCustomAttribute("customer.tier", "premium");
    NewRelic.incrementCounter("Custom/Orders/Processed");
    // Business logic
}

// OpenTelemetry equivalent
import io.opentelemetry.api.GlobalOpenTelemetry;
import io.opentelemetry.api.trace.Tracer;
import io.opentelemetry.api.trace.Span;
import io.opentelemetry.context.Scope;

private final Tracer tracer = GlobalOpenTelemetry.getTracer("order-processor");

public void processOrder(String orderId) {
    Span span = tracer.spanBuilder("process-order").startSpan();
    try (Scope scope = span.makeCurrent()) {
        span.setAttribute("order.id", orderId);
        span.setAttribute("customer.tier", "premium");
        span.addEvent("order.processed");
        // Business logic - counters handled by metrics system
    } finally {
        span.end();
    }
}
```

##### .NET Applications

Current New Relic Setup:
```xml
<!-- packages.config -->
<package id="NewRelic.Agent.Api" version="10.20.1" targetFramework="net472" />
```

```csharp
using NewRelic.Api.Agent;

[Transaction]
[Trace]
public async Task<string> ProcessDataAsync(string data)
{
    NewRelic.AddCustomAttribute("data.size", data.Length);
    NewRelic.SetTransactionName("Custom", "ProcessData");
    
    using (var segment = NewRelic.GetAgent().CurrentTransaction.StartSegment("database-call"))
    {
        return await DatabaseCall(data);
    }
}
```

New OpenTelemetry Setup:
```xml
<!-- PackageReference -->
<PackageReference Include="OpenTelemetry" Version="1.6.0" />
<PackageReference Include="OpenTelemetry.Extensions.Hosting" Version="1.6.0" />
<PackageReference Include="OpenTelemetry.Exporter.OpenTelemetryProtocol" Version="1.6.0" />
<PackageReference Include="OpenTelemetry.Instrumentation.AspNetCore" Version="1.5.1-beta.1" />
```

```csharp
using OpenTelemetry.Trace;
using System.Diagnostics;

private static readonly ActivitySource ActivitySource = new("ProcessDataService");

public async Task<string> ProcessDataAsync(string data)
{
    using var activity = ActivitySource.StartActivity("process-data");
    activity?.SetTag("data.size", data.Length);
    activity?.SetTag("operation.name", "ProcessData");
    
    using var dbActivity = ActivitySource.StartActivity("database-call");
    return await DatabaseCall(data);
}

// Startup configuration
builder.Services.AddOpenTelemetry()
    .WithTracing(tracing => tracing
        .AddSource("ProcessDataService")
        .AddAspNetCoreInstrumentation()
        .AddOtlpExporter(options =>
        {
            options.Endpoint = new Uri("http://localhost:4318/v1/traces");
        }));
```

##### Python Applications

Current New Relic Setup:
```python
# newrelic.ini configuration
[newrelic]
license_key = your_license_key
app_name = My Python App

# Application instrumentation
import newrelic.agent

@newrelic.agent.function_trace()
def process_user_request(user_id):
    newrelic.agent.add_custom_attribute('user.id', user_id)
    newrelic.agent.add_custom_attribute('request.type', 'premium')
    
    with newrelic.agent.BackgroundTask(application, 'process_request'):
        return handle_request(user_id)
```

New OpenTelemetry Setup:
```bash
# Install OpenTelemetry packages
pip install opentelemetry-distro[otlp]
opentelemetry-bootstrap -a install

# Environment configuration
export OTEL_SERVICE_NAME="My Python App"
export OTEL_EXPORTER_OTLP_ENDPOINT=http://localhost:4318
export OTEL_RESOURCE_ATTRIBUTES=environment=production,service.version=1.0

# Run with auto-instrumentation
opentelemetry-instrument python my_app.py
```

```python
# OpenTelemetry custom instrumentation
from opentelemetry import trace

tracer = trace.get_tracer(__name__)

def process_user_request(user_id):
    with tracer.start_as_current_span("process-user-request") as span:
        span.set_attribute("user.id", user_id)
        span.set_attribute("request.type", "premium")
        span.add_event("request.started")
        
        return handle_request(user_id)
```

##### Node.js Applications

Current New Relic Setup:
```javascript
// New Relic agent initialization
require('newrelic');

const newrelic = require('newrelic');

// Custom instrumentation
function processOrder(orderId, callback) {
    newrelic.startWebTransaction('/api/orders/process', function() {
        newrelic.addCustomAttribute('order.id', orderId);
        newrelic.addCustomAttribute('processing.type', 'express');
        
        const transaction = newrelic.getTransaction();
        
        newrelic.startSegment('database-query', true, function() {
            // Database operations
            callback(null, result);
        });
    });
}
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
    [SemanticResourceAttributes.SERVICE_NAME]: 'My Node App',
    [SemanticResourceAttributes.SERVICE_VERSION]: '1.0',
    environment: 'production'
  }),
  instrumentations: [getNodeAutoInstrumentations()],
});

sdk.start();

// Custom instrumentation
const { trace } = require('@opentelemetry/api');
const tracer = trace.getTracer('order-processor');

function processOrder(orderId, callback) {
    const span = tracer.startSpan('process-order');
    span.setAttributes({
        'order.id': orderId,
        'processing.type': 'express'
    });
    
    // Create child span for database operations
    const dbSpan = tracer.startSpan('database-query', { parent: span });
    
    // Database operations
    dbSpan.end();
    span.end();
    
    callback(null, result);
}
```

### Step 3: Browser Monitoring Migration

New Relic Browser → Sematext RUM:

New Relic Browser monitoring needs to be replaced with equivalent frontend monitoring:

```javascript
// New Relic Browser snippet
<script type="text/javascript">
window.NREUM||(NREUM={});
// ... New Relic browser agent code
</script>

// OpenTelemetry Browser equivalent
import { WebTracerProvider } from '@opentelemetry/sdk-trace-web';
import { getWebAutoInstrumentations } from '@opentelemetry/auto-instrumentations-web';
import { OTLPTraceExporter } from '@opentelemetry/exporter-trace-otlp-http';

const provider = new WebTracerProvider();
const exporter = new OTLPTraceExporter({
  url: 'https://your-proxy-endpoint/v1/traces'  // Browser needs proxy
});

provider.addSpanProcessor(new BatchSpanProcessor(exporter));
provider.register();

registerInstrumentations({
  instrumentations: [getWebAutoInstrumentations()],
});
```

### Step 4: Configuration and Environment Migration

##### New Relic Configuration Mapping

New Relic Environment Variables:
```bash
NEW_RELIC_LICENSE_KEY=your_license_key
NEW_RELIC_APP_NAME="My Application"
NEW_RELIC_DISTRIBUTED_TRACING_ENABLED=true
NEW_RELIC_SPAN_EVENTS_ENABLED=true
NEW_RELIC_LOG_LEVEL=info
```

OpenTelemetry Equivalents:
```bash
OTEL_SERVICE_NAME="My Application"
OTEL_EXPORTER_OTLP_ENDPOINT=http://localhost:4318
OTEL_EXPORTER_OTLP_PROTOCOL=http/protobuf
OTEL_RESOURCE_ATTRIBUTES=environment=production,service.version=1.0
OTEL_LOG_LEVEL=info
```

##### Sampling Configuration

New Relic Sampling:

- New Relic handles sampling automatically based on account limits
- Adaptive sampling based on transaction volume
- Priority sampling for important transactions

OpenTelemetry Sampling:
```bash
# Fixed percentage sampling
export OTEL_TRACES_SAMPLER=traceidratio
export OTEL_TRACES_SAMPLER_ARG=0.1

# Parent-based sampling (default)
export OTEL_TRACES_SAMPLER=parentbased_traceidratio
export OTEL_TRACES_SAMPLER_ARG=0.1
```

### Step 5: Dashboard and Alert Migration

##### New Relic Insights to Sematext Analytics

New Relic NRQL Queries:
```sql
-- New Relic query example
SELECT average(duration) 
FROM Transaction 
WHERE appName = 'My App' 
AND name LIKE 'WebTransaction/Custom/%' 
SINCE 1 hour ago 
FACET name
```

Sematext Equivalent:

- [Tracing Overview](/docs/tracing/reports/overview/) - Get service health insights and performance metrics (replaces New Relic APM overview)
- [Traces Explorer](/docs/tracing/reports/explorer/) - Search and filter traces by service, operation, and attributes
- [Trace Details View](/docs/tracing/reports/trace-details/) - Examine distributed traces across services with waterfall visualization
- [Span Details Panel](/docs/tracing/reports/trace-details/#span-details-panel) - View detailed span timing and attributes

##### Alert Migration Strategy

New Relic Alert Conditions:
```yaml
# Example New Relic alert policy
name: "High Error Rate"
type: apm_app_metric
entities: ["My App"]
metric: error_percentage
condition: above
critical_threshold: 5
warning_threshold: 2
```

Sematext Alert Recreation:

1. Create equivalent alerts using [Sematext alerting](/docs/tracing/alerts/creating-alerts/)
2. Set up notification channels (Slack, email, PagerDuty)
3. Configure alert escalation policies
4. Test alert delivery and adjust thresholds

### Step 6: Parallel Operation During Migration

To safely migrate, run both systems simultaneously:

Application-Level Dual Export (Recommended):
```python
# Python example - send to both New Relic and Sematext
from opentelemetry.sdk.trace.export import BatchSpanProcessor

# Keep New Relic exporter temporarily (if using OpenTelemetry SDK)
# Note: Most New Relic setups use proprietary agents, not OpenTelemetry
# In that case, keep the New Relic agent running separately

# Sematext Agent OTLP endpoint (already running)
from opentelemetry.exporter.otlp.proto.http.trace_exporter import OTLPSpanExporter
otlp_exporter = OTLPSpanExporter(
    endpoint="http://localhost:4338/v1/traces"  # Sematext Agent HTTP endpoint for traces
)

tracer_provider = TracerProvider()
tracer_provider.add_span_processor(BatchSpanProcessor(otlp_exporter))
```

Note: Since most New Relic deployments use proprietary agents rather than OpenTelemetry, you'll likely run both the New Relic agent and OpenTelemetry instrumentation side-by-side during migration. Sematext Agent already accepts OTLP traffic (ports 4337 for gRPC, 4338 for HTTP for traces), so no additional collector is needed.

### Step 7: Data Validation and Testing

Validation Checklist:

- [ ] **Service Discovery**: All New Relic applications appear in Sematext
- [ ] **Trace Completeness**: End-to-end traces captured correctly
- [ ] **Custom Attributes**: New Relic custom attributes converted to OpenTelemetry
- [ ] **Error Tracking**: Exceptions and errors properly captured
- [ ] **Performance Metrics**: Response times and throughput match expectations

Side-by-Side Comparison:
```python
# Validation script example
def compare_metrics():
    # New Relic API call
    nr_response = requests.get(
        'https://api.newrelic.com/v2/applications/{app_id}/metrics.json',
        headers={'X-Api-Key': 'your_api_key'},
        params={'names[]': 'HttpDispatcher', 'values[]': 'average_response_time'}
    )
    
    # Sematext API comparison
    # Implement Sematext query for same time period
    # Compare results and validate accuracy
```

## Common Migration Challenges

### Challenge 1: New Relic Insights Dependencies

**Issue**: Dashboards and reports heavily dependent on New Relic Insights

**Solution**: 

- Export key NRQL queries and recreate using Sematext analytics
- Focus on business-critical metrics first
- Use Sematext's built-in dashboards as starting points
- Consider creating custom visualizations for unique requirements

### Challenge 2: New Relic Browser Integration

**Issue**: Frontend applications instrumented with New Relic Browser

**Solution**:

- Replace with [OpenTelemetry browser instrumentation](/docs/tracing/sdks/javascript-browser/)
- Set up proxy configuration for browser-to-agent communication
- Maintain similar RUM metrics and user journey tracking
- Consider correlation between frontend and backend traces

### Challenge 3: New Relic Synthetics Integration

**Issue**: Synthetic monitoring integrated with APM

**Solution**:

- Evaluate Sematext Synthetics or third-party alternatives
- Ensure synthetic tests can generate trace data
- Maintain alerting integration between synthetics and APM

### Challenge 4: Custom Metric Collection

**Issue**: Applications using New Relic API for custom metrics

**Solution**:

- Separate metrics from tracing concerns
- Use OpenTelemetry metrics SDK for custom metrics
- Consider dedicated metrics collection systems
- Maintain correlation between metrics and traces

## Cost Optimization Post-Migration

### New Relic Cost Factors vs Sematext

New Relic Pricing Challenges:

- User-based pricing model
- Data retention limits
- Premium feature costs
- Complex pricing tiers

Sematext Advantages:

- Volume-based pricing - see [Sematext pricing](https://sematext.com/pricing)
- Flexible retention controls
- [Built-in cost optimization](/docs/tracing/cost-optimization/)
- Predictable scaling costs

### Optimization Strategies

1. **Implement Smart Sampling**: Use OpenTelemetry's flexible sampling options
2. **Optimize Trace Attributes**: Remove unnecessary custom attributes
3. **Adjust Retention**: Set appropriate retention periods per service
4. **Monitor Usage**: Track costs and adjust strategies accordingly

## Migration Timeline

### Recommended Timeline Template

Week 1: Assessment and Setup

- [ ] Complete New Relic inventory and assessment (1-2 days)
- [ ] Create Sematext infrastructure and install agents (1 day)
- [ ] Plan migration approach for proprietary vs OpenTelemetry apps (1 day)

Week 2-3: Migration Implementation

- [ ] Choose pilot applications and implement OpenTelemetry (2-3 days)
- [ ] Configure dual export and validate data quality (2 days)
- [ ] Migrate remaining applications systematically (3-5 days)
- [ ] Set up critical alerts and validate completeness (2-3 days)

Week 4: Optimization and Cleanup

- [ ] Optimize sampling and performance settings
- [ ] Remove New Relic agents and licensing
- [ ] Final validation and team training

## Rollback Strategy

Rollback Preparation:

1. **Maintain New Relic**: Keep agents active during migration period
2. **Configuration Switches**: Use environment variables for quick rollback
3. **Monitoring**: Set up alerts for migration-related issues
4. **Documentation**: Maintain detailed rollback procedures

## Post-Migration Benefits

Immediate Benefits:

- Reduced licensing complexity
- Open-standard instrumentation
- Unified observability platform
- Better cost predictability

Long-term Benefits:

- Vendor independence with OpenTelemetry
- Growing ecosystem of compatible tools
- Future-proof observability strategy
- Enhanced correlation capabilities

## Support and Next Steps

Migration Support:

- Contact [support@sematext.com](mailto:support@sematext.com) for personalized assistance
- Professional services available for complex migrations
- Comprehensive documentation and best practices

Related Resources:

- [OpenTelemetry SDKs](/docs/tracing/sdks/)
- [Cost Optimization Strategies](/docs/tracing/cost-optimization/)
- [Tracing Reports and Analytics](/docs/tracing/reports/overview/)
- [Troubleshooting Guide](/docs/tracing/troubleshooting/)

Migrating from New Relic APM to Sematext Tracing offers the opportunity to modernize your observability stack with open standards while potentially reducing costs and complexity. The comprehensive approach outlined in this guide ensures a successful transition with minimal risk to your production systems.