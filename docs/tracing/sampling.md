title: Trace Sampling
description: Configure sampling strategies for OpenTelemetry tracing

## Trace Sampling

Sampling helps control the volume of traces sent to Sematext Cloud, reducing costs and performance overhead while maintaining visibility into your application's behavior.

## Why Sampling?

- Cost Management: Reduce the amount of trace data stored and processed
- Performance: Lower overhead on your application
- Network Traffic: Reduce bandwidth usage between your app and Sematext
- Focus on Important Data: Sample strategically to capture relevant traces

## Sampling Strategies

### Always On (Development)

Sample all traces - useful for development and debugging:

```bash
export OTEL_TRACES_SAMPLER=always_on
```

Use when:

- Developing and testing
- Debugging specific issues
- Low traffic environments

### Always Off

Disable all tracing:

```bash
export OTEL_TRACES_SAMPLER=always_off
```

Use when:

- Temporarily disabling tracing
- Feature flags for tracing control

### Trace ID Ratio (Production)

Sample a percentage of traces randomly:

```bash
# Sample 10% of traces
export OTEL_TRACES_SAMPLER=traceidratio
export OTEL_TRACES_SAMPLER_ARG=0.1

# Sample 1% of traces
export OTEL_TRACES_SAMPLER=traceidratio
export OTEL_TRACES_SAMPLER_ARG=0.01

# Sample 50% of traces
export OTEL_TRACES_SAMPLER=traceidratio
export OTEL_TRACES_SAMPLER_ARG=0.5
```

Use when:

- Production environments
- High-traffic applications
- Predictable sampling needed

### Parent-Based Sampling (Default)

Respects the sampling decision from the parent span:

```bash
export OTEL_TRACES_SAMPLER=parentbased_always_on
# or
export OTEL_TRACES_SAMPLER=parentbased_always_off
# or
export OTEL_TRACES_SAMPLER=parentbased_traceidratio
export OTEL_TRACES_SAMPLER_ARG=0.1
```

Use when:

- Microservices architectures
- Maintaining trace continuity across services
- Default behavior for most SDKs

## SDK-Specific Configuration

### Java

```bash
# Via environment variables
export OTEL_TRACES_SAMPLER=traceidratio
export OTEL_TRACES_SAMPLER_ARG=0.1

# Via system properties
java -javaagent:opentelemetry-javaagent.jar \
  -Dotel.traces.sampler=traceidratio \
  -Dotel.traces.sampler.arg=0.1 \
  -jar your-app.jar
```

### Python

```python
from opentelemetry import trace
from opentelemetry.sdk.trace import TracerProvider
from opentelemetry.sdk.trace.sampling import TraceIdRatioBasedSampler

# Configure 10% sampling
tracer_provider = TracerProvider(
    sampler=TraceIdRatioBasedSampler(0.1)
)
trace.set_tracer_provider(tracer_provider)
```

### Node.js

```javascript
const { NodeSDK } = require('@opentelemetry/sdk-node');
const { TraceIdRatioBasedSampler } = require('@opentelemetry/sdk-trace-base');

const sdk = new NodeSDK({
  sampler: new TraceIdRatioBasedSampler(0.1), // 10% sampling
  // ... other configuration
});
```

### Go

```go
import (
    "go.opentelemetry.io/otel/sdk/trace"
)

tp := trace.NewTracerProvider(
    trace.WithSampler(trace.TraceIDRatioBased(0.1)), // 10% sampling
    // ... other options
)
```

### .NET

```csharp
using OpenTelemetry.Trace;

builder.Services.AddOpenTelemetry()
    .WithTracing(tracing => tracing
        .SetSampler(new TraceIdRatioBasedSampler(0.1)) // 10% sampling
        // ... other configuration
    );
```

### Ruby

```ruby
require 'opentelemetry/sdk'

OpenTelemetry::SDK.configure do |c|
  c.use_all
  c.add_span_processor(
    OpenTelemetry::SDK::Trace::Export::BatchSpanProcessor.new(
      exporter,
      sampler: OpenTelemetry::SDK::Trace::Samplers.trace_id_ratio_based(0.1) # 10% sampling
    )
  )
end
```

## Custom Sampling Logic

You can implement custom sampling based on specific criteria:

### Sample by Endpoint

Sample different endpoints at different rates:

```javascript
// Node.js example
class CustomSampler {
  shouldSample(context, traceId, spanName, spanKind, attributes) {
    // Sample 100% of /health checks
    if (attributes['http.target'] === '/health') {
      return { decision: SamplingDecision.NOT_RECORD };
    }
    
    // Sample 50% of /api/critical endpoints
    if (attributes['http.target']?.startsWith('/api/critical')) {
      return { decision: Math.random() < 0.5 ? 
        SamplingDecision.RECORD_AND_SAMPLED : 
        SamplingDecision.NOT_RECORD };
    }
    
    // Sample 1% of everything else
    return { decision: Math.random() < 0.01 ? 
      SamplingDecision.RECORD_AND_SAMPLED : 
      SamplingDecision.NOT_RECORD };
  }
}
```

### Sample Errors at Higher Rate

Always capture traces with errors:

```python
# Python example
class ErrorAwareSampler(Sampler):
    def should_sample(self, parent_context, trace_id, name, kind, attributes, links):
        # Always sample if error attribute is present
        if attributes and attributes.get("error", False):
            return SamplingResult(Decision.RECORD_AND_SAMPLE)
        
        # Otherwise use 10% sampling
        return TraceIdRatioBasedSampler(0.1).should_sample(
            parent_context, trace_id, name, kind, attributes, links
        )
```

## Sampling Best Practices

### Development Environment
- Use `always_on` for complete visibility
- No sampling during debugging
- Enable all trace levels

### Staging Environment
- Use moderate sampling (10-50%)
- Test sampling configuration
- Validate sampling decisions

### Production Environment
- Start with conservative sampling (1-10%)
- Adjust based on:
  - Traffic volume
  - Cost constraints
  - Performance impact
- Monitor sampling effectiveness

### High-Traffic Services
- Very low sampling rates (0.1-1%)
- Focus on error traces
- Sample critical operations at higher rates

## Sampling Recommendations by Traffic

| Requests/sec | Recommended Sampling | Rationale |
|--------------|---------------------|-----------|
| < 10 | 100% (always_on) | Capture everything |
| 10-100 | 50-100% | High visibility needed |
| 100-1,000 | 10-50% | Balance visibility and volume |
| 1,000-10,000 | 1-10% | Reduce overhead |
| > 10,000 | 0.1-1% | Minimize impact |

## Head vs Tail Sampling

### Head Sampling (Current)
- Decision made at trace start
- Configured in your application
- Lower overhead
- May miss interesting traces

### Tail Sampling (Future)
- Decision made after trace completion
- Can sample based on trace characteristics
- Requires more infrastructure
- Better for capturing anomalies

*Note: Tail sampling support is planned for future releases.*

## Monitoring Sampling Effectiveness

### Check Sampling Rate

Monitor actual sampling rate in your application:

```javascript
// Track sampling decisions
let totalRequests = 0;
let sampledRequests = 0;

// In your instrumentation
totalRequests++;
if (span.isRecording()) {
  sampledRequests++;
}

// Log sampling rate periodically
console.log(`Sampling rate: ${(sampledRequests/totalRequests * 100).toFixed(2)}%`);
```

### Validate Coverage

Ensure important operations are being sampled:

- Error traces captured
- Critical business transactions included
- Performance outliers detected

## Troubleshooting Sampling

### No Traces Appearing
- Check sampling isn't set to `always_off`
- Verify sampling rate isn't too low
- Ensure parent-based sampling isn't blocking child spans

### Too Many Traces
- Reduce sampling rate
- Check for sampling configuration in multiple places
- Verify environment variables are being applied

### Inconsistent Sampling
- Use parent-based sampling for distributed systems
- Ensure all services use compatible sampling strategies
- Check for sampling overrides in code

## Next Steps

- [Configure your SDKs](/docs/tracing/sdks/)
- [Monitor trace volume](/docs/tracing/reports/overview/)
- [Set up alerts](/docs/tracing/alerts/creating-alerts/)
- [Troubleshooting Guide](/docs/tracing/troubleshooting/)

## Related Documentation

- [Getting Started with Tracing](/docs/tracing/getting-started/)
- [OpenTelemetry SDKs](/docs/tracing/sdks/)
- [Creating a Tracing App](/docs/tracing/create-tracing-app/)