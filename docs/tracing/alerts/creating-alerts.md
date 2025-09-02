title: Tracing Alerts
description: Setting up alerts for distributed tracing in Sematext Cloud

## Tracing Alerts

Tracing Apps in Sematext Cloud allow you to create alerts based on trace counts and filtered by OpenTelemetry attributes. You can alert on the number of traces matching specific criteria such as service names, error status, duration thresholds, and custom attributes.

## Creating Alerts

To create alerts for your Tracing App, follow the general Sematext alerting documentation:

- [Alert Rules](/docs/alerts/alert-rules/) - Learn how to create and configure alert rules
- [Alert Notifications](/docs/alerts/alert-notifications/) - Set up notification channels
- [Alert Conditions](/docs/alerts/creating-metrics-alerts/) - Configure alert conditions and thresholds

## Default Tracing Alerts

*Documentation for out-of-the-box tracing alerts coming soon.*

## Common Tracing Alert Use Cases

Typical alerts you might want to configure for tracing include:

- **Error Trace Count**: Alert when the number of traces with errors exceeds a threshold
- **Service-Specific Alerts**: Alert on trace counts for specific services
- **Slow Request Alerts**: Alert when traces with duration above a threshold exceed a certain count
- **Trace Volume Alerts**: Alert on unexpected changes in trace count

## Next Steps

- [View Traces Explorer](/docs/tracing/explorer/)
- [Analyze Trace Details](/docs/tracing/trace-details/)
- [Return to Tracing Overview](/docs/tracing/dashboard/)

## Related Documentation

- [Getting Started with Tracing](/docs/tracing/getting-started/)
- [General Alerts Documentation](/docs/alerts/)
- [Troubleshooting Guide](/docs/tracing/troubleshooting/)