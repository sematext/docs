title: Creating a Tracing App
description: Complete guide to creating and configuring a new Tracing App in Sematext Cloud

This guide walks you through the complete Tracing App creation process in Sematext Cloud, from initial setup through SDK configuration and agent installation.

**What is a Tracing App?** In Sematext, an [App](/docs/guide/app-guide/) is a container for your data. A Tracing App specifically collects and stores distributed traces from your applications, providing a dedicated space to analyze performance, errors, and dependencies. Each App is isolated and can have its own access controls, retention settings, and alert configurations.

## Prerequisites

- A Sematext Cloud account ([sign up free](https://apps.sematext.com/ui/registration))
- Access to your application's source code or deployment configuration
- Ability to install the Sematext Agent ([installation guide](/docs/agents/sematext-agent/installation/)) with [OpenTelemetry support](/docs/agents/sematext-agent/opentelemetry/)

## Complete App Creation Flow

### Step 1: Create Your Tracing App

1.1 Navigate to App Creation:

1. Log in to [Sematext Cloud](https://apps.sematext.com)
2. Click "Create App" or "Create New Tracing App" in the main navigation
3. Select "Tracing" as the App type

1.2 Configure App Settings:

![Create Tracing App](/docs/images/tracing/tracing-new-app-creation-1a.png)

`App Name`:

- Enter a descriptive name for your Tracing App
- Use names that reflect your service or environment (e.g., "production-api", "user-service", "payment-gateway")

`Plan Selection`:

- Basic: Entry-level tracing with essential features
- Standard: Enhanced capabilities with longer data retention  
- Pro: Full-featured tracing with advanced analytics

See detailed features and pricing at [sematext.com/pricing](https://sematext.com/pricing)

`Infra App Selection`:

- Select existing Infra App: Choose from available Infra Apps if you have any
- Create new Infra App: If none exists, a new one will be automatically created
- The Infra App is required for agent communication and will be configured for tracing

![Plan and Infra App Selection](/docs/images/tracing/tracing-new-app-creation-2.png)

### Step 2: Configure OpenTelemetry SDK

After App creation, the wizard continues with SDK configuration:

2.1 Select Your Programming Language.

![SDK Language Selection](/docs/images/tracing/tracing-new-app-creation-4b.png)

Choose from the available programming languages:

- Java (including Kotlin)
- Python 
- Node.js
- Go
- .NET
- Ruby
- PHP
- JavaScript

2.2 Configure Service Names and Follow Instructions:

Name the Service:

- Enter a meaningful name for your application service
- This should match your actual service name in your application

![Service Configuration](/docs/images/tracing/tracing-new-app-creation-4d.png)

Follow SDK Instructions:
The UI will provide complete, language-specific instructions including:

- Required dependencies and installation commands
- Code examples for auto-instrumentation (recommended)
- Manual instrumentation examples (advanced)
- Environment variables and configuration options
- Framework-specific guidance

The wizard shows detailed instructions like this PHP example:

![PHP SDK Instructions](/docs/images/tracing/tracing-new-app-creation-4c.png)

Add Multiple Services (Optional):

- Click "Add Another Service" to configure multiple services at once
- Each service will have its own configuration and will appear in the service list

### Step 3: Install and Configure Sematext Agent

The wizard continues with agent installation options.

3.1 Choose Deployment Method:

Select from four deployment methods:

![Select Deployment Method](/docs/images/tracing/tracing-new-app-creation-5-2.png)

Single Host:

- Best for: Individual server installation (development, testing, or small production deployments)
- Platforms: Linux (various distributions), Windows  
- Installation: GUI installer (Windows) or command-line installation (Windows / Linux)

Server Fleet:

- Best for: Production environments with multiple servers managed centrally
- Management: Ansible, Windows Group Policy
- Approach: Configuration management for multiple hosts

Containerized:

- Best for: Docker environments, container orchestration platforms
- Platforms: Docker, Swarm, Nomad, AWS ECS
- Deployment: As a container in your containerized environment

Kubernetes:

- Best for: Kubernetes clusters (AKS, EKS, GKE, OpenShift, Rancher)
- Methods: Helm, kubectl, Sematext Operator
- Deployment: As a DaemonSet across your Kubernetes cluster

3.2 Follow Installation Instructions:

The UI provides step-by-step installation commands for your chosen method:

![Single Host Installation Instructions](/docs/images/tracing/tracing-new-app-creation-5-3.png)

Agent Configuration:
The agent will be automatically configured with:

- Your Infra App token for authentication
- OTLP receiver enabled for trace collection  
- Your Traces token for sending data to Sematext Cloud
- Service names you configured in Step 2
- Default ports: 4337 (gRPC), 4338 (HTTP)

Custom Port Configuration (Optional):

- Modify default OTLP ports if needed

### Step 4: Complete Setup

4.1 Verify Installation:

- The wizard will show "Host Detected" when the agent is running correctly
- Services will appear as "Healthy" when properly configured

![Setup Completion](/docs/images/tracing/tracing-new-app-creation-5-4.png)

4.2 Generate Test Traffic:

- Make requests to your instrumented application
- Traces should appear in the newly created Tracing App within seconds

## What You'll Have After Completion

### Tokens and Configuration

- Infra App Token: For agent authentication
- Tracing App Token: For sending trace data to Sematext Cloud
- Service Configuration: All configured services ready to send traces

### Ready-to-Use Features

- [Tracing Overview](/docs/tracing/reports/overview/): Key metrics and service health
- [Traces Explorer](/docs/tracing/reports/explorer/): Search and filter traces
- [Individual Trace Analysis](/docs/tracing/reports/trace-details/): Detailed span inspection
- [Alert Configuration](/docs/tracing/alerts/creating-alerts/): Ready to set up performance alerts

## SDK Examples

Here are quick examples for popular languages:

### Java
```bash
# Download OpenTelemetry Java agent
wget https://github.com/open-telemetry/opentelemetry-java-instrumentation/releases/latest/download/opentelemetry-javaagent.jar

# Run with automatic instrumentation
java -javaagent:opentelemetry-javaagent.jar \
  -Dotel.service.name=your-service-name \
  -Dotel.exporter.otlp.endpoint=http://localhost:4338 \
  -Dotel.exporter.otlp.protocol=http/protobuf \
  -jar your-application.jar
```

### Python
```bash
# Install OpenTelemetry packages
pip install opentelemetry-distro[otlp]
opentelemetry-bootstrap -a install

# Configure and run
export OTEL_SERVICE_NAME=your-service-name
export OTEL_EXPORTER_OTLP_ENDPOINT=http://localhost:4338
export OTEL_EXPORTER_OTLP_PROTOCOL=http/protobuf

opentelemetry-instrument python your_app.py
```

### Node.js
```bash
# Install dependencies
npm install @opentelemetry/auto-instrumentations-node @opentelemetry/exporter-trace-otlp-http @opentelemetry/sdk-node

# Create tracing.js and run
node -r ./tracing.js your-app.js
```

For complete setup instructions, the wizard provides detailed, language-specific guidance.

## Best Practices

### Naming Conventions

- Apps: Use environment prefixes (`prod-api`, `staging-web`)
- Services: Use descriptive names (`user-authentication`, `payment-processor`)
- Avoid spaces: Use hyphens or underscores instead (`my-service`, not `my service`)
- Keep names concise but clear

### Planning Your Setup

- One App per Business Domain: Group related microservices that communicate with each other (e.g., all e-commerce services, all analytics services)
- Environment Separation: Different Apps for prod/staging/dev environments  
- Cross-Service Visibility: Keep communicating services in the same App to see end-to-end traces

## Troubleshooting

### No Traces Appearing

- Verify agent is running and shows "Host Detected"
- Check OTLP endpoint configuration in your application
- Ensure service names match between App configuration and code
- Review the [Troubleshooting Guide](/docs/tracing/troubleshooting/)

### Agent Issues

- Confirm Infra App token is correct
- Check network connectivity between agent and application
- Verify ports 4337/4338 are accessible
- Review [agent logs](/docs/agents/sematext-agent/agent-troubleshooting/) for configuration errors

## Next Steps

After completing App creation:

1. Explore Traces: Navigate to [Traces Explorer](/docs/tracing/reports/explorer/) to see your traces
2. Set Up Alerts: Create [performance alerts](/docs/tracing/alerts/creating-alerts/) for key metrics  
3. Add Custom Instrumentation: Learn about [manual instrumentation in SDKs](/docs/tracing/sdks/)
4. Optimize Performance: Configure [sampling strategies](/docs/tracing/sampling/) and [cost optimization](/docs/tracing/cost-optimization/)

## Related Documentation

- [OpenTelemetry SDKs](/docs/tracing/sdks/) - Detailed SDK documentation
- [Agent Configuration](/docs/agents/sematext-agent/opentelemetry/) - Agent setup details  
- [Tracing Dashboard](/docs/tracing/reports/overview/) - Understanding the tracing UI
- [Troubleshooting](/docs/tracing/troubleshooting/) - Common issues and solutions

## Need Help?

- Contact [support@sematext.com](mailto:support@sematext.com)
- Use live chat in Sematext Cloud