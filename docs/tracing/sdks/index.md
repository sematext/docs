title: OpenTelemetry SDKs for Sematext Tracing
description: Overview of supported OpenTelemetry SDKs and language-specific instrumentation for Sematext Tracing

## OpenTelemetry SDKs for Sematext Tracing

Sematext Tracing uses OpenTelemetry, the vendor-neutral observability standard, to collect traces from your applications. This section provides comprehensive guides for instrumenting applications in various programming languages.

## How It Works

```
Your Application → OpenTelemetry SDK → Sematext Agent → Sematext Cloud
```

1. **Your Application**: Instrumented with OpenTelemetry SDK
2. **OpenTelemetry SDK**: Captures traces and sends them via OTLP protocol
3. **Sematext Agent**: Receives traces via OTLP receiver and exports them to Sematext Cloud
4. **Sematext Cloud**: Stores, analyzes, and visualizes your traces

> **Important**: The Sematext Agent with OTLP support is required for all SDK configurations. The agent acts as a local collector that receives traces from your application and securely forwards them to Sematext Cloud.

## Supported Languages

### Auto-Instrumentation Available

These languages provide automatic instrumentation that captures traces with minimal code changes:

#### [Java](java.md)
- **Auto-instrumentation**: Java agent with zero code changes
- **Frameworks**: Spring Boot, Tomcat, Jetty, and more
- **Libraries**: JDBC, HTTP clients, messaging systems
- **Kotlin Support**: Full compatibility with Kotlin applications

#### [Python](python.md)
- **Auto-instrumentation**: One-command setup with `opentelemetry-instrument`
- **Frameworks**: Django, Flask, FastAPI, Tornado
- **Libraries**: SQLAlchemy, Redis, PostgreSQL, MySQL, requests
- **Async Support**: Full async/await compatibility

#### [Node.js](nodejs.md)
- **Auto-instrumentation**: Automatic framework detection
- **Frameworks**: Express, Koa, Fastify, HTTP/HTTPS
- **Libraries**: MongoDB, PostgreSQL, Redis, HTTP clients
- **TypeScript**: Full TypeScript support with type definitions

#### [.NET](dotnet.md)
- **Auto-instrumentation**: .NET automatic instrumentation
- **Frameworks**: ASP.NET Core, console apps, worker services
- **Libraries**: Entity Framework, HTTP clients, SQL Server
- **Platforms**: .NET Core, .NET Framework, .NET 5+

### Manual Instrumentation

#### [Go](go.md)
- **Manual instrumentation**: Easy-to-use instrumentation libraries
- **Frameworks**: Gin, Echo, HTTP server/client
- **Libraries**: SQL databases, Redis, gRPC
- **Performance**: Minimal overhead with excellent performance

#### [Ruby](ruby.md)
- **Framework Support**: Rails, Sinatra with some auto-instrumentation
- **Libraries**: ActiveRecord, Redis, HTTP clients, background jobs
- **Flexibility**: Fine-grained control over span creation

### Other Languages

Don't see your language? OpenTelemetry supports many more languages:

- **PHP**: OpenTelemetry PHP with framework support
- **Rust**: Growing ecosystem with basic instrumentation
- **C++**: Core OpenTelemetry C++ SDK
- **Erlang/Elixir**: Community-driven instrumentations
- **Swift**: iOS and server-side Swift support

For languages not covered in detail, you can:
1. Use the [OpenTelemetry documentation](https://opentelemetry.io/docs/instrumentation/) for your language
2. Configure OTLP export to `http://localhost:4338` (HTTP) or `http://localhost:4337` (gRPC)
3. Contact [support@sematext.com](mailto:support@sematext.com) for guidance

## Quick Setup Overview

All SDK configurations follow a similar pattern:

### 1. Install OpenTelemetry Dependencies
Each language has its own package manager and dependencies:
```bash
# Java
wget opentelemetry-javaagent.jar

# Python  
pip install opentelemetry-distro[otlp]

# Node.js
npm install @opentelemetry/auto-instrumentations-node

# Go
go get go.opentelemetry.io/otel

# .NET
dotnet add package OpenTelemetry.Exporter.OpenTelemetryProtocol

# Ruby
gem install opentelemetry-sdk opentelemetry-exporter-otlp
```

### 2. Configure OTLP Export
Point your application to the Sematext Agent:
```bash
export OTEL_SERVICE_NAME=your-service-name
export OTEL_EXPORTER_OTLP_ENDPOINT=http://localhost:4338
export OTEL_EXPORTER_OTLP_PROTOCOL=http/protobuf
```

### 3. Run Your Application
Execute with tracing enabled:
```bash
# Java
java -javaagent:opentelemetry-javaagent.jar -jar app.jar

# Python
opentelemetry-instrument python app.py

# Node.js  
node -r ./tracing.js app.js

# Others: varies by language
```

## Agent Requirement

**Critical**: All applications require the [Sematext Agent](/docs/agents/sematext-agent/opentelemetry/) to be running with OpenTelemetry support enabled.

The agent provides:
- **OTLP Receiver**: Accepts traces from your applications
- **Security**: Secure communication to Sematext Cloud
- **Reliability**: Buffering and retry logic
- **Performance**: Local collection reduces application overhead

## Example Applications

Complete working examples for all supported languages are available in our public repository:

**🔗 [Sematext OpenTelemetry Examples](https://github.com/sematext/sematext-opentelemetry-examples)**

The repository includes:
- Ready-to-run applications for each language
- Docker Compose setups with Sematext Agent
- Configuration examples for different frameworks
- Best practices and common patterns
- Integration examples with databases, message queues, and HTTP clients

## Common Configuration

### OTLP Endpoints
- **HTTP** (Recommended): `http://localhost:4338`
- **gRPC**: `http://localhost:4337`
- **Protocol**: `http/protobuf` for HTTP, `grpc` for gRPC

### Service Configuration
```bash
# Required
export OTEL_SERVICE_NAME=your-service-name

# Optional but recommended
export OTEL_SERVICE_VERSION=1.0.0
export OTEL_RESOURCE_ATTRIBUTES=environment=production,team=backend
```

### Sampling Configuration
```bash
# Sample all traces (development)
export OTEL_TRACES_SAMPLER=always_on

# Sample 10% of traces (production)
export OTEL_TRACES_SAMPLER=traceidratio
export OTEL_TRACES_SAMPLER_ARG=0.1
```

## Feature Comparison

| Language | Auto-Instrumentation | Manual Spans | Async Support | Framework Coverage | Performance |
|----------|---------------------|--------------|---------------|-------------------|-------------|
| Java     | ✅ Excellent        | ✅ Full      | ✅ Yes        | ✅ Comprehensive  | ⚡ Excellent |
| Python   | ✅ Excellent        | ✅ Full      | ✅ Yes        | ✅ Comprehensive  | ⚡ Good     |
| Node.js  | ✅ Excellent        | ✅ Full      | ✅ Native     | ✅ Comprehensive  | ⚡ Excellent |
| .NET     | ✅ Good             | ✅ Full      | ✅ Yes        | ✅ Good           | ⚡ Excellent |
| Go       | ⚠️ Manual          | ✅ Full      | ✅ Yes        | ⚡ Growing       | ⚡ Excellent |
| Ruby     | ⚠️ Limited         | ✅ Full      | ✅ Partial    | ⚡ Good          | ⚡ Good     |

## Best Practices

### Service Naming
- Use descriptive, consistent names
- Include environment: `api-prod`, `worker-staging`
- Follow your organization's naming conventions

### Sampling Strategy
- **Development**: Use `always_on` for complete visibility
- **Production**: Use `traceidratio` (typically 0.01-0.1)
- **High-traffic services**: Lower sampling rates (0.001-0.01)

### Resource Attributes
Always include:
```bash
export OTEL_RESOURCE_ATTRIBUTES=\
environment=${ENV},\
service.version=${VERSION},\
deployment.environment=${ENVIRONMENT}
```

### Error Handling
- Always record exceptions in spans
- Set appropriate span status codes
- Include relevant error context as attributes

## Getting Help

### Documentation
- Language-specific guides in this section
- [OpenTelemetry official documentation](https://opentelemetry.io/docs/)
- [Sematext Agent OpenTelemetry setup](/docs/agents/sematext-agent/opentelemetry/)

### Examples and Code
- [Sematext OpenTelemetry Examples Repository](https://github.com/sematext/sematext-opentelemetry-examples)
- Working applications for all supported languages
- Docker Compose configurations
- Production-ready examples

### Support
- **Documentation Issues**: Check the [Troubleshooting Guide](/docs/tracing/troubleshooting/)
- **Technical Support**: Contact [support@sematext.com](mailto:support@sematext.com)
- **Community**: OpenTelemetry community resources

## Next Steps

1. **Choose Your Language**: Select your programming language from the list above
2. **Install Sematext Agent**: Set up the [agent with OpenTelemetry support](/docs/agents/sematext-agent/opentelemetry/)
3. **Follow SDK Guide**: Complete the language-specific instrumentation guide
4. **Explore Examples**: Check out the [examples repository](https://github.com/sematext/sematext-opentelemetry-examples)
5. **View Your Traces**: Start analyzing traces in [Sematext Cloud](/docs/tracing/explorer/)

The OpenTelemetry-based approach provides excellent performance, broad language support, and vendor-neutral instrumentation that works with any observability platform.