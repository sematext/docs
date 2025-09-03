title: Getting Started with Sematext Tracing
description: Learn how to set up distributed tracing with OpenTelemetry and Sematext

## Getting Started with Sematext Tracing

Sematext Tracing helps you monitor and troubleshoot distributed applications by tracking requests as they flow through your services. Built on OpenTelemetry, it provides visibility into performance bottlenecks, error propagation, and service dependencies.

## Prerequisites

Before you begin, ensure you have:

- A Sematext Cloud account ([sign up free](https://apps.sematext.com/ui/registration))
- Access to your application's source code or deployment configuration
- Ability to install the Sematext Agent on your infrastructure

## How It Works

Sematext Tracing works by:

1. Instrumenting Your Application: Add OpenTelemetry libraries to your code to automatically capture traces
2. Collecting Traces: The Sematext Agent receives traces from your application via OTLP protocol
3. Forwarding to Cloud: The agent securely sends trace data to Sematext Cloud
4. Analysis & Visualization: View traces in the Sematext UI with powerful search and analysis tools

```
Your App → OpenTelemetry SDK → Sematext Agent → Sematext Cloud
```

## Complete Setup Process

Setting up tracing involves creating a Tracing App and following the configuration wizard:

### 1. Create Your Tracing App
The wizard walks you through:

- App Creation: Name your App and choose a plan (Basic, Standard, or Pro)
- Infrastructure Setup: Select an existing Infra App or create a new one
- SDK Configuration: Choose your programming language and configure services
- Agent Installation: Deploy the Sematext Agent using your preferred method

**👉 [Complete Step-by-Step Guide](/docs/tracing/create-tracing-app/)**

The wizard provides detailed instructions for each step, including code examples and configuration commands.

### 2. What You'll Set Up

**Programming Languages Supported**:

- Java (including Kotlin), Python, Node.js, Go, .NET, Ruby, PHP, JavaScript

**Agent Deployment Options**:

- Single Host: Install directly on individual servers (Linux/Windows)
- Server Fleet: Deploy across multiple servers using Ansible or Group Policy  
- Containerized: Run as containers in Docker, Swarm, Nomad, or AWS ECS
- Kubernetes: Deploy as DaemonSet on any Kubernetes distribution

**Configuration Includes**:

- OpenTelemetry SDK setup with automatic instrumentation
- Service name configuration and multi-service support
- OTLP endpoint configuration (gRPC port 4337, HTTP port 4338)
- Agent authentication and secure trace forwarding

## Quick Start Example

Here's what the process looks like for a Python application:

1. Create Tracing App in Sematext Cloud
2. Install OpenTelemetry:
   ```bash
   pip install opentelemetry-distro[otlp]
   opentelemetry-bootstrap -a install
   ```
3. Configure Environment:
   ```bash
   export OTEL_SERVICE_NAME=my-python-service
   export OTEL_EXPORTER_OTLP_ENDPOINT=http://localhost:4338
   ```
4. Run with Instrumentation:
   ```bash
   opentelemetry-instrument python app.py
   ```

The wizard provides similar examples for all supported languages.

## What You'll See After Setup

Once everything is configured and running:

### Tracing Overview Dashboard
- Key Metrics: Total traces, error rates, latency percentiles (P50, P95, P99)
- Service Health: Current status and performance trends for each service
- Recent Alerts: Any threshold violations or anomalies detected
- Error Analysis: Recent errors and their distribution across services

### Traces Explorer
- Search Capabilities: Find traces by service, duration, status, or custom attributes
- Timeline View: See trace volume and patterns over time
- Advanced Filtering: Filter by response codes, span errors, database operations

### Individual Trace Analysis
- Waterfall View: Visual representation of the complete request flow
- Span Details: Examine individual operations with attributes, events, and errors
- Performance Insights: Identify slow operations and optimization opportunities

## Common Use Cases

**Microservices Monitoring**
- Track requests across multiple services
- Identify service dependencies and communication patterns
- Monitor inter-service latency and error rates

**Performance Optimization**
- Find slow database queries and API calls
- Identify bottlenecks in request processing
- Understand resource usage patterns

**Error Debugging**
- Trace error propagation across services
- See complete context when errors occur
- Correlate errors with performance issues

**Capacity Planning**
- Monitor system behavior under different loads
- Identify scaling bottlenecks
- Plan infrastructure improvements

## Next Steps

After setting up your first Tracing App:

1. [Set Up Alerts](/docs/tracing/alerts/creating-alerts/): Get notified of performance issues
2. [Explore Advanced Features](/docs/tracing/reports/overview/): Learn about all dashboard components
3. [Add Custom Instrumentation](/docs/tracing/sdks/): Enhance trace details with manual instrumentation
4. [Configure Sampling](/docs/tracing/sampling/): Optimize costs and performance

## Common Configuration

### OTLP Endpoints
- gRPC: `http://localhost:4337`
- HTTP: `http://localhost:4338` (recommended)
- Protocol: `http/protobuf`

### Environment Variables
```bash
export OTEL_SERVICE_NAME=your-service-name
export OTEL_EXPORTER_OTLP_ENDPOINT=http://localhost:4338
export OTEL_EXPORTER_OTLP_PROTOCOL=http/protobuf
```

## Need Help?

- Check [SDK documentation](/docs/tracing/sdks/) for language-specific setup
- Review [Agent OpenTelemetry configuration](/docs/agents/sematext-agent/opentelemetry/)
- See the [Troubleshooting Guide](/docs/tracing/troubleshooting/)
- Contact [support@sematext.com](mailto:support@sematext.com)