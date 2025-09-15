title: Tracing Alerts
description: Setting up alerts for distributed tracing in Sematext Cloud

## Tracing Alerts

In Sematext you can create alerts based on trace counts and you can optionally filter them by OpenTelemetry attributes. You can alert on the number of traces matching specific criteria such as service names, error status, duration thresholds, and custom attributes.

## Creating Alerts

To create alerts for your Tracing App, follow the general Sematext alerting documentation:

- [Alert Rules](/docs/alerts/alert-rules/) - Learn how to create and configure alert rules
- [Alert Notifications](/docs/alerts/alert-notifications/) - Set up notification channels
- [Alert Conditions](/docs/alerts/creating-metrics-alerts/) - Configure alert conditions and thresholds

## Default Tracing Alerts

*Documentation for out-of-the-box tracing alerts coming soon.*

## Common Tracing Alert Use Cases

Here are typical scenarios where tracing alerts protect your application:

### Customer Experience Alerts
- **Checkout Process Failures**: Alert when payment processing or order completion errors spike
- **Login/Authentication Issues**: Detect when users can't access their accounts
- **Search Performance Degradation**: Know when product searches or data queries slow down
- **Page Load Timeouts**: Alert when key pages take too long to respond

### Business-Critical Operations
- **API Response Time SLA Violations**: Alert when your API responses exceed promised SLA thresholds
- **Database Connection Failures**: Detect when your app can't reach critical databases
- **Third-Party Service Outages**: Know immediately when payment gateways, shipping APIs, or other integrations fail
- **Background Job Failures**: Alert on failed report generation, data sync, or batch processing

### Traffic and Capacity
- **Unusual Traffic Patterns**: Detect potential DDoS attacks or unexpected viral traffic
- **Service Overload**: Alert when specific microservices are overwhelmed
- **Regional Performance Issues**: Know when users in specific regions experience slowdowns

### Revenue Impact
- **Shopping Cart Abandonment Signals**: High error rates in checkout flow
- **Payment Processing Errors**: Failed transactions that directly impact revenue
- **Inventory Service Failures**: Issues that prevent product availability checks

Each alert can be filtered by service name, operation, custom attributes, or any OpenTelemetry attribute to focus on what matters most to your application.

## Next Steps

- [View Traces Explorer](/docs/tracing/reports/explorer/)
- [Analyze Trace Details](/docs/tracing/reports/trace-details/)
- [Return to Tracing Overview](/docs/tracing/reports/overview/)

## Related Documentation

- [Getting Started with Tracing](/docs/tracing/getting-started/)
- [General Alerts Documentation](/docs/alerts/)
- [Troubleshooting Guide](/docs/tracing/troubleshooting/)