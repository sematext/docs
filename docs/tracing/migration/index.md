title: Migrating to Sematext Tracing
description: Migration guides for transitioning from other tracing solutions to Sematext Tracing

## Migrating to Sematext Tracing

This section provides guides for migrating from various tracing solutions to Sematext Tracing. Whether you're coming from open-source tools or commercial APM solutions, these guides will help you transition smoothly while preserving your observability investments.

## Why Migrate to Sematext?

**Key Benefits of Sematext Tracing:**

- **OpenTelemetry Native**: Built on the industry-standard observability framework
- **Unified Observability**: Combine tracing with logs, metrics, and alerts in one platform
- **Managed Service**: No infrastructure to maintain or scale
- **Advanced Analytics**: Service maps (coming soon), anomaly detection, and performance insights
- **Enterprise Ready**: RBAC, advanced alerting
- **Cost Optimization**: Built-in sampling strategies and retention management

## Migration Guides

### Open Source Tracing Solutions

#### [Jaeger Migration Guide](jaeger.md)
**Best for**: Teams currently using Jaeger for distributed tracing

Covers:

- Direct OpenTelemetry migration paths
- Jaeger client library replacement
- Sampling configuration migration
- Dashboard and alert recreation
- Parallel operation strategies

**Migration approach**: Straightforward OpenTelemetry transition  
**Timeline**: 2-3 weeks depending on service count

---

#### [Zipkin Migration Guide](zipkin.md)
**Best for**: Organizations with existing Zipkin deployments

Covers:

- B3 header propagation compatibility
- Spring Cloud Sleuth migration
- Custom annotation conversion
- Dual export configuration
- Performance optimization

**Migration approach**: Smooth transition with OpenTelemetry compatibility  
**Timeline**: 2-3 weeks for most deployments

---

### Commercial APM Solutions

#### [DataDog APM Migration Guide](datadog.md)
**Best for**: Teams currently using DataDog APM and looking to optimize costs

Covers:

- DataDog agent replacement with OpenTelemetry
- Custom instrumentation migration for all major languages
- Dashboard and monitor recreation in Sematext
- Cost comparison and optimization strategies (see [Sematext pricing](https://sematext.com/pricing))
- Dual export configuration for safe migration

**Migration approach**: Agent replacement with comprehensive OpenTelemetry migration  
**Timeline**: 3-4 weeks for most deployments

---

#### [New Relic APM Migration Guide](newrelic.md)
**Best for**: Organizations migrating from New Relic APM to reduce licensing costs

Covers:

- New Relic agent replacement across languages
- Custom attributes and events migration
- NRQL query recreation in Sematext
- Browser monitoring migration strategies
- Alert and dashboard recreation (see [Sematext pricing](https://sematext.com/pricing) for cost benefits)

**Migration approach**: Agent replacement with feature parity recreation  
**Timeline**: 3-4 weeks depending on customization level

---

#### [Dynatrace APM Migration Guide](dynatrace.md)
**Best for**: Teams moving from Dynatrace OneAgent to OpenTelemetry standards

Covers:

- OneAgent replacement with explicit instrumentation
- Service discovery migration from automatic to configured
- AI-powered insights recreation with manual rules
- Management zone and tagging strategy migration
- Cost optimization post-migration (see [Sematext pricing](https://sematext.com/pricing))

**Migration approach**: Transition from automatic to configured instrumentation  
**Timeline**: 4-5 weeks for complex environments

---

## General Migration Strategy

Regardless of your current solution, follow this proven migration approach:

### Phase 1: Assessment and Planning (2-3 days)

**Inventory Current State:**

- [ ] Document all services sending traces
- [ ] Review custom instrumentation and business logic
- [ ] Identify critical dashboards and alerts
- [ ] Assess data volume and retention requirements
- [ ] Map team responsibilities and access controls

**Plan Migration:**

- [ ] Define success criteria and acceptance tests
- [ ] Choose pilot services (start with non-critical)
- [ ] Plan parallel operation period
- [ ] Identify potential rollback triggers
- [ ] Create migration timeline and milestones

### Phase 2: Infrastructure Setup (1 week)

**Sematext Setup:**

- [ ] [Create Sematext account and Tracing Apps](/docs/tracing/create-tracing-app/)
- [ ] [Install and configure Sematext Agent](/docs/agents/sematext-agent/opentelemetry/)
- [ ] Test connectivity and trace ingestion
- [ ] Set up team access and permissions

**OpenTelemetry Preparation:**

- [ ] Choose appropriate [SDK languages](/docs/tracing/sdks/)
- [ ] Plan instrumentation approach (auto vs manual)
- [ ] Design sampling strategy
- [ ] Prepare deployment automation

### Phase 3: Pilot Migration (1 week)

**Start Small:**

- [ ] Choose 2-3 non-critical services
- [ ] Implement OpenTelemetry instrumentation
- [ ] Configure application-level dual export to both systems
- [ ] Validate trace data quality and completeness

**Validation:**

- [ ] Compare trace volumes and sampling rates
- [ ] Verify custom attributes and metadata
- [ ] Test end-to-end trace propagation
- [ ] Validate error capture and reporting

### Phase 4: Gradual Migration (1-2 weeks)

**Service-by-Service Migration:**

- [ ] Migrate services in dependency order
- [ ] Maintain trace continuity across service boundaries
- [ ] Monitor performance impact and resource usage
- [ ] Update documentation and runbooks

**Dashboard and Alert Migration:**

- [ ] Recreate critical dashboards in [Sematext reports](/docs/tracing/reports/overview/)
- [ ] Set up [key performance alerts](/docs/tracing/alerts/creating-alerts/)
- [ ] Test alert delivery and escalation paths
- [ ] Train team on new interfaces

### Phase 5: Optimization and Cleanup (2-3 days)

**Performance Tuning:**

- [ ] Optimize sampling rates using [cost optimization strategies](/docs/tracing/cost-optimization/)
- [ ] Fine-tune batch processing and export settings
- [ ] Implement advanced Sematext features
- [ ] Monitor costs and adjust retention policies

**Decommission Old System:**

- [ ] Validate all services migrated successfully
- [ ] Export historical data if needed
- [ ] Remove old agents and instrumentation
- [ ] Update monitoring and operational procedures

## Universal Migration Challenges

### Challenge 1: Instrumentation Differences

**Problem**: Each APM solution uses different APIs and concepts

**Solution**: Map concepts between systems:
```
Proprietary Agent     → OpenTelemetry SDK
Custom Tags/Labels    → Span Attributes  
Transactions/Traces   → Distributed Traces
Segments/Spans       → OpenTelemetry Spans
Timeline Annotations → Span Events
```

### Challenge 2: Data Model Differences

**Problem**: Different solutions structure and store trace data differently

**Solution**: 

- Focus on business-level metrics that translate across systems
- Use semantic conventions for consistency  
- Accept that some proprietary features won't have direct equivalents
- Leverage Sematext's advanced analytics to replace vendor-specific insights

### Challenge 3: Context Propagation

**Problem**: Trace context headers vary between systems

**Solution**: Use OpenTelemetry's composite propagators during transition:
```python
from opentelemetry.propagators.composite import CompositePropagator
from opentelemetry.propagators.b3 import B3MultiFormat
from opentelemetry.propagate import set_global_textmap

# Support multiple header formats during migration
propagator = CompositePropagator([
    TraceContextTextMapPropagator(),  # W3C standard
    B3MultiFormat(),                  # Zipkin compatible
    # Add other formats as needed
])
set_global_textmap(propagator)
```

### Challenge 4: Sampling Strategy Migration

**Problem**: Different sampling approaches and configurations

**Solution**: Start conservative, then optimize:

1. Begin with simple percentage-based sampling
2. Monitor data volume and costs
3. Implement advanced strategies using [Sematext's sampling guide](/docs/tracing/sampling/)
4. Use service-specific sampling based on criticality

## Migration Best Practices

### Technical Best Practices

1. **Gradual Migration**: Never migrate everything at once
2. **Parallel Operation**: Use application-level dual export during transition (Sematext Agent already handles OTLP, no need for additional collectors)
3. **Comprehensive Testing**: Validate trace continuity and data quality
4. **Monitoring**: Watch for performance impacts and data loss
5. **Rollback Plan**: Always have a way to revert quickly

### Organizational Best Practices

1. **Team Training**: Ensure teams understand OpenTelemetry concepts
2. **Documentation**: Update runbooks and operational procedures  
3. **Communication**: Keep stakeholders informed of progress
4. **Success Criteria**: Define clear metrics for migration success
5. **Post-Migration Review**: Capture lessons learned for future migrations

## Common Pitfalls to Avoid

1. **Insufficient Testing**: Not validating trace completeness and accuracy
2. **No Rollback Plan**: Being unable to revert if issues arise
3. **Ignoring Dependencies**: Not considering trace propagation between services
4. **Inadequate Monitoring**: Missing performance impacts or data quality issues
5. **Rushed Timeline**: Not allowing adequate time for validation and optimization

## Support and Resources

### Getting Help

- **Migration Support**: Contact [support@sematext.com](mailto:support@sematext.com) for personalized migration assistance
- **Documentation**: Comprehensive guides available for all [OpenTelemetry SDKs](/docs/tracing/sdks/)
- **Community**: Join discussions about OpenTelemetry best practices
- **Professional Services**: Available for complex enterprise migrations

### Useful Resources

- [OpenTelemetry Official Documentation](https://opentelemetry.io/docs/)
- [Sematext Tracing Getting Started](/docs/tracing/getting-started/)
- [Cost Optimization Strategies](/docs/tracing/cost-optimization/)
- [Troubleshooting Guide](/docs/tracing/troubleshooting/)

## Next Steps

1. **Choose Your Migration Guide**: Select the guide most relevant to your current solution
2. **Plan Your Migration**: Use the assessment templates and timeline guidance
3. **Start with Pilot**: Begin with non-critical services for validation
4. **Get Support**: Contact our team for personalized migration assistance

Whether you're migrating from open-source tools like Jaeger and Zipkin or commercial solutions like DataDog and New Relic, we're here to help ensure your migration is successful and your observability capabilities are enhanced.