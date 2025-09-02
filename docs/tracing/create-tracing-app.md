title: Creating a Tracing App
description: Complete guide to creating and configuring a new Tracing App in Sematext Cloud

## Creating a Tracing App

This guide walks you through the complete Tracing App creation process in Sematext Cloud, from initial setup through SDK configuration and agent installation.

## Prerequisites

- A Sematext Cloud account ([sign up free](https://apps.sematext.com/ui/registration))
- Access to your application's source code or deployment configuration
- Ability to install or access the Sematext Agent

## Complete App Creation Flow

### Step 1: Create Your Tracing App

#### 1.1 Navigate to App Creation
1. Log in to [Sematext Cloud](https://apps.sematext.com)
2. Click **Create App** or **Create New Tracing App** in the main navigation
3. Select **Tracing** as the app type

#### 1.2 Configure App Settings

**App Name**
- Enter a descriptive name for your Tracing App
- Use names that reflect your service or environment (e.g., "production-api", "user-service", "payment-gateway")

**Plan Selection**
Choose from three available plans:
- **Basic**: Entry-level tracing with essential features
- **Standard**: Enhanced capabilities with longer data retention  
- **Pro**: Full-featured tracing with advanced analytics

**Infrastructure App Selection**
- **Select existing Infra App**: Choose from available Infra Apps if you have any
- **Create new Infra App**: If none exists, a new one will be automatically created
- The Infra App is required for agent communication and will be configured for tracing

### Step 2: Configure OpenTelemetry SDK

After app creation, the wizard continues with SDK configuration:

#### 2.1 Select Your Programming Language

Choose from the available programming languages:
- **Java** (including Kotlin)
- **Python** 
- **Node.js**
- **Go**
- **.NET**
- **Ruby**
- **PHP**
- **JavaScript**

#### 2.2 Configure Service Names and Follow Instructions

**Name the Service**
- Enter a meaningful name for your application service
- This should match your actual service name in your application

**Follow SDK Instructions**
The UI will provide complete, language-specific instructions including:
- Required dependencies and installation commands
- Code examples for auto-instrumentation (recommended)
- Manual instrumentation examples (advanced)
- Environment variables and configuration options
- Framework-specific guidance

**Add Multiple Services** (Optional)
- Click "Add Another Service" to configure multiple services at once
- Each service will have its own configuration and will appear in the service list

### Step 3: Install and Configure Sematext Agent

The wizard continues with agent installation options:

#### 3.1 Choose Deployment Method

Select from four deployment methods:

**Single Host**
- **Best for**: Development environments, single servers, or testing
- **Platforms**: Linux (various distributions), Windows
- **Options**: GUI installer (Windows) or command-line installation

**Server Fleet** 
- **Best for**: Production environments with multiple servers managed centrally
- **Tools**: Ansible, Windows Group Policy
- **Use**: Configuration management for multiple hosts

**Containerized**
- **Best for**: Docker environments, container orchestration platforms
- **Platforms**: Docker, Swarm, Nomad, AWS ECS
- **Deploy**: As a container in your containerized environment

**Kubernetes**
- **Best for**: Kubernetes clusters (AKS, EKS, GKE, OpenShift, Rancher)
- **Methods**: Helm, kubectl, Sematext Operator
- **Deploy**: As a DaemonSet across your Kubernetes cluster

#### 3.2 Follow Installation Instructions

The UI provides step-by-step installation commands for your chosen method:

**Agent Configuration**
The agent will be automatically configured with:
- Your Infra App token for authentication
- OTLP receiver enabled for trace collection  
- Your Traces token for sending data to Sematext Cloud
- Service names you configured in Step 2
- Default ports: 4337 (gRPC), 4338 (HTTP)

**Custom Port Configuration** (Optional)
- Modify default OTLP ports if needed
- Configure TLS certificates if not using defaults
- Add custom environment variables

### Step 4: Complete Setup

#### 4.1 Verify Installation
- The wizard will show "Host Detected" when the agent is running correctly
- Services will appear as "Healthy" when properly configured

#### 4.2 Generate Test Traffic
- Make requests to your instrumented application
- Traces should appear in the Sematext Cloud UI within seconds

## What You'll Have After Completion

### Tokens and Configuration
- **Infra App Token**: For agent authentication
- **Traces Token**: For sending trace data to Sematext Cloud
- **Service Configuration**: All configured services ready to send traces

### Ready-to-Use Features
- **Tracing Overview Dashboard**: Key metrics and service health
- **Traces Explorer**: Search and filter traces
- **Individual Trace Analysis**: Detailed span inspection
- **Alert Configuration**: Ready to set up performance alerts

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
- **Apps**: Use environment prefixes (`prod-api`, `staging-web`)
- **Services**: Use descriptive names (`user-authentication`, `payment-processor`)
- Keep names concise but clear

### Planning Your Setup
- **One App per Service**: Separate Tracing Apps for different microservices
- **Environment Separation**: Different apps for prod/staging/dev
- **Infrastructure Apps**: Reuse for related services on same infrastructure

## Troubleshooting

### No Traces Appearing
- Verify agent is running and shows "Host Detected"
- Check OTLP endpoint configuration in your application
- Ensure service names match between app configuration and code
- Review the [Troubleshooting Guide](/docs/tracing/troubleshooting/)

### Agent Issues
- Confirm Infra App token is correct
- Check network connectivity between agent and application
- Verify ports 4337/4338 are accessible
- Review agent logs for configuration errors

## Next Steps

After completing app creation:

1. **Explore Traces**: Navigate to [Traces Explorer](/docs/tracing/explorer/) to see your traces
2. **Set Up Alerts**: Create [performance alerts](/docs/tracing/alerts/creating-alerts/) for key metrics  
3. **Add Custom Instrumentation**: Learn about [manual instrumentation in SDKs](/docs/tracing/sdks/)
4. **Optimize Performance**: Configure [sampling strategies](/docs/tracing/sampling/)

## Related Documentation

- [OpenTelemetry SDKs](/docs/tracing/sdks/) - Detailed SDK documentation
- [Agent Configuration](/docs/agents/sematext-agent/opentelemetry/) - Agent setup details  
- [Tracing Dashboard](/docs/tracing/dashboard/) - Understanding the tracing UI
- [Troubleshooting](/docs/tracing/troubleshooting/) - Common issues and solutions

## Need Help?

- Contact [support@sematext.com](mailto:support@sematext.com)
- Use live chat in Sematext Cloud
- Check our [FAQ](/docs/tracing/faq/) for common questions