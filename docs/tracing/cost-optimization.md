title: Tracing Cost Optimization
description: Strategies and techniques to optimize costs while maintaining observability in Sematext Tracing

## Tracing Cost Optimization

Distributed tracing can generate significant data volumes, especially in high-traffic applications. This guide provides strategies to optimize your tracing costs while maintaining essential observability.

> **Note:** Tracing costs are primarily driven by the volume of trace data ingested and stored. Any data you filter out during collection or reduce through sampling directly impacts your costs. Sampling must be configured in your applications - the Sematext Agent forwards all traces it receives.

## Sampling Strategies

Sampling is the most effective way to reduce tracing costs while maintaining statistical significance. For detailed configuration instructions, see the [Sampling Configuration Guide](/docs/tracing/sampling/).

### Head-Based Sampling (Recommended Start)

Sample traces at the application level before they're sent:

Production Environments:

- High-traffic services: 1-5% sampling (0.01-0.05)
- Medium-traffic services: 5-10% sampling (0.05-0.1)
- Low-traffic services: 10-50% sampling (0.1-0.5)

Development/Staging:
- Use 100% sampling for complete visibility during testing


### Service-Specific Sampling

Apply different sampling rates based on service importance:

Critical Services (Higher Sampling):

- Payment processing: 50-100%
- Authentication: 20-50%
- Core APIs: 10-20%

Support Services (Lower Sampling):

- Health checks: 0.1-1%
- Static content: 0.1-1%
- Internal utilities: 1-5%

## Attribute and Data Optimization

### Remove Unnecessary Attributes

Filter out attributes that don't provide actionable insights:

High-Volume, Low-Value Attributes:

- Large request/response bodies
- Detailed stack traces for successful operations
- Verbose debug information
- Redundant metadata

OpenTelemetry Attribute Filtering:

```javascript
// Example: Filter out large attributes
const span = tracer.startSpan('operation');
// Don't add large request bodies
// span.setAttributes({ 'http.request.body': largeBody }); // Avoid this

// Instead, add size or summary information
span.setAttributes({ 
  'http.request.size': largeBody.length,
  'http.request.type': 'json'
});
```

### Optimize Span Names and Operations

Use consistent, concise span names:

Good Examples:
- `GET /api/users/{id}`
- `database.query`
- `payment.process`

Avoid:
- `GET /api/users/12345` (high cardinality)
- `Very long descriptive operation name with lots of details`
- Dynamic span names with timestamps or IDs

## Infrastructure and Agent Optimization

### Agent Configuration

For agent-specific optimizations, see the [Agent OpenTelemetry Configuration](/docs/agents/sematext-agent/opentelemetry/) guide.

## Service and Environment Strategies

### Environment Separation

**Production:**

- Lower sampling rates (1-10%)
- Focus on error and performance traces
- Longer retention for critical paths

**Staging:**

- Medium sampling rates (10-50%)
- Comprehensive error tracking
- Shorter retention periods

Development:

- Higher sampling rates or 100% sampling
- Full attribute collection for debugging
- Shortest retention periods

### Service Prioritization

Tier 1 (Business Critical):

- Customer-facing APIs
- Payment processing
- Authentication services
- Sampling: 10-50%

Tier 2 (Important):

- Internal APIs
- Data processing
- Integration services
- Sampling: 5-20%

Tier 3 (Supporting):

- Health checks
- Metrics collection
- Background tasks
- Sampling: 1-5%

## Retention and Plan Optimization

### Data Retention Strategy

Short-Term (1-7 days):

- High-volume, low-priority traces
- Development environment traces
- Automated testing traces

Medium-Term (7-30 days):

- Production error traces
- Performance baseline traces
- Critical business flows

Long-Term (30+ days):

- Compliance-required traces
- Security audit trails
- Business intelligence traces

### Plan Selection

Choose the right Sematext plan based on your needs:

Basic Plan:

- Small applications
- Low to medium traffic
- Basic retention needs

Standard Plan:

- Growing applications
- Medium to high traffic
- Enhanced analytics needs

Pro Plan:

- Large-scale applications
- Enterprise requirements
- Advanced analytics and longer retention

See detailed features and pricing at [sematext.com/pricing](https://sematext.com/pricing)

## Monitoring and Alerting Cost Impact

### Cost-Aware Alerting

Set up alerts that balance coverage with cost:

High-Value Alerts (Always Monitor):

- Error rate spikes
- Critical service failures
- SLA violations

Medium-Value Alerts (Sampled Monitoring):

- Performance degradation
- Unusual traffic patterns
- Service dependencies

### Cost Monitoring

Track Key Metrics:

- Daily trace volume by service
- Sampling effectiveness
- Storage utilization
- Plan usage trends

Cost Optimization Alerts:

- Alert when trace volume increases unexpectedly
- Monitor sampling rate effectiveness
- Track storage growth trends

## Implementation Checklist

### Phase 1: Assessment
- [ ] Analyze current trace volume by service
- [ ] Identify high-volume, low-value traces
- [ ] Evaluate service criticality tiers
- [ ] Review current sampling configuration

### Phase 2: Quick Wins
- [ ] Implement basic sampling (5-10% for high-traffic services)
- [ ] Remove unnecessary attributes from spans
- [ ] Filter out health check and monitoring traces
- [ ] Optimize span naming conventions

### Phase 3: Advanced Optimization
- [ ] Set up service-specific sampling rates
- [ ] Configure attribute filtering rules
- [ ] Optimize retention policies

### Phase 4: Monitoring and Tuning
- [ ] Set up cost monitoring dashboards
- [ ] Implement cost-aware alerting
- [ ] Regular review and adjustment of sampling rates
- [ ] Monitor for sampling bias in critical paths

## Best Practices

### Sampling Best Practices
- Start conservative: Begin with lower sampling rates and increase as needed
- Preserve errors: Always sample error traces at higher rates
- Monitor bias: Ensure sampling doesn't hide important patterns
- Service correlation: Consider trace propagation when setting service-specific rates

### Attribute Management
- Business value: Only collect attributes that provide actionable insights
- Cardinality control: Avoid high-cardinality attributes (user IDs, timestamps)
- Size limits: Set reasonable limits on attribute value sizes
- Sensitive data: Never include secrets, passwords, or PII in traces

### Regular Reviews
- Monthly: Review trace volumes and costs
- Quarterly: Adjust sampling rates based on traffic patterns
- Annually: Evaluate plan needs and retention requirements

## Troubleshooting Cost Issues

### High Costs Checklist
1. Check sampling rates - Are they too high for your traffic volume?
2. Review service distribution - Are non-critical services generating most traces?
3. Analyze trace sizes - Are spans containing unnecessary large attributes?
4. Examine retention - Are you storing traces longer than needed?
5. Service proliferation - Are test or temporary services generating traces?

### Common Cost Drivers
- No sampling in production environments
- Health check traces not filtered out
- Large request/response bodies in span attributes
- High-cardinality span names (with IDs or timestamps)
- Development traces not properly separated

## Next Steps

- [Set Up Performance Alerts](/docs/tracing/alerts/creating-alerts/)
- [Monitor Trace Volume](/docs/tracing/reports/overview/)
- [Optimize Agent Configuration](/docs/agents/sematext-agent/opentelemetry/)

## Related Documentation

- [Sampling Configuration Guide](/docs/tracing/sampling/)
- [OpenTelemetry SDKs](/docs/tracing/sdks/)
- [Tracing Reports](/docs/tracing/reports/overview/)
- [Agent Troubleshooting](/docs/agents/sematext-agent/agent-troubleshooting/)