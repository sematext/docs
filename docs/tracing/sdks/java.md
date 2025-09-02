title: Java OpenTelemetry SDK for Sematext Tracing
description: Complete guide to instrumenting Java applications with OpenTelemetry for Sematext Tracing

## Java OpenTelemetry SDK

This guide covers how to instrument Java applications with OpenTelemetry to send traces to Sematext Tracing.

> **Note**: Kotlin applications can use the same Java instrumentation. All examples below work with Kotlin code.

## Auto-Instrumentation (Recommended)

Auto-instrumentation is the easiest way to get started. The OpenTelemetry Java agent automatically instruments popular frameworks and libraries without requiring code changes.

### 1. Download the OpenTelemetry Java Agent

```bash
wget https://github.com/open-telemetry/opentelemetry-java-instrumentation/releases/latest/download/opentelemetry-javaagent.jar
```

### 2. Run Your Application with the Agent

```bash
java -javaagent:opentelemetry-javaagent.jar \
  -Dotel.service.name=your-service-name \
  -Dotel.exporter.otlp.endpoint=http://localhost:4338 \
  -Dotel.exporter.otlp.protocol=http/protobuf \
  -jar your-application.jar
```

### Framework-Specific Considerations

**Spring Boot**
- No additional configuration needed
- Auto-instrumentation works out of the box
- Captures HTTP requests, database calls, and more

**Tomcat**
- Works with WAR deployments
- Add the agent to your Tomcat startup script

**Jetty**
- Supported out of the box
- Add the agent to your Jetty configuration

### Environment Variables

You can also configure the agent using environment variables:

```bash
export OTEL_SERVICE_NAME=your-service-name
export OTEL_EXPORTER_OTLP_ENDPOINT=http://localhost:4338
export OTEL_EXPORTER_OTLP_PROTOCOL=http/protobuf

java -javaagent:opentelemetry-javaagent.jar -jar your-application.jar
```

## Manual Instrumentation (Advanced)

For more control over instrumentation, you can manually instrument your application.

### 1. Add Dependencies

**Maven (pom.xml)**:
```xml
<dependencies>
  <dependency>
    <groupId>io.opentelemetry</groupId>
    <artifactId>opentelemetry-api</artifactId>
    <version>1.32.0</version>
  </dependency>
  <dependency>
    <groupId>io.opentelemetry</groupId>
    <artifactId>opentelemetry-sdk</artifactId>
    <version>1.32.0</version>
  </dependency>
  <dependency>
    <groupId>io.opentelemetry</groupId>
    <artifactId>opentelemetry-exporter-otlp</artifactId>
    <version>1.32.0</version>
  </dependency>
  <dependency>
    <groupId>io.opentelemetry.instrumentation</groupId>
    <artifactId>opentelemetry-instrumentation-annotations</artifactId>
    <version>1.32.0-alpha</version>
  </dependency>
</dependencies>
```

**Gradle (build.gradle)**:
```gradle
dependencies {
    implementation 'io.opentelemetry:opentelemetry-api:1.32.0'
    implementation 'io.opentelemetry:opentelemetry-sdk:1.32.0'
    implementation 'io.opentelemetry:opentelemetry-exporter-otlp:1.32.0'
    implementation 'io.opentelemetry.instrumentation:opentelemetry-instrumentation-annotations:1.32.0-alpha'
}
```

### 2. Initialize OpenTelemetry

```java
import io.opentelemetry.api.OpenTelemetry;
import io.opentelemetry.exporter.otlp.trace.OtlpGrpcSpanExporter;
import io.opentelemetry.sdk.OpenTelemetrySdk;
import io.opentelemetry.sdk.trace.SdkTracerProvider;
import io.opentelemetry.sdk.trace.export.BatchSpanProcessor;
import io.opentelemetry.sdk.resources.Resource;
import io.opentelemetry.semconv.resource.attributes.ResourceAttributes;

public class TracingConfiguration {
    public static OpenTelemetry initializeOpenTelemetry() {
        return OpenTelemetrySdk.builder()
            .setTracerProvider(
                SdkTracerProvider.builder()
                    .addSpanProcessor(BatchSpanProcessor.builder(
                        OtlpGrpcSpanExporter.builder()
                            .setEndpoint("http://localhost:4337")
                            .build())
                        .build())
                    .setResource(Resource.getDefault().toBuilder()
                        .put(ResourceAttributes.SERVICE_NAME, "your-service-name")
                        .build())
                    .build())
            .build();
    }
}
```

### 3. Create and Use Spans

```java
import io.opentelemetry.api.trace.Tracer;
import io.opentelemetry.api.trace.Span;
import io.opentelemetry.api.trace.StatusCode;
import io.opentelemetry.context.Scope;

public class MyService {
    private static final Tracer tracer = 
        openTelemetry.getTracer("your-service-name");
    
    public void doWork() {
        Span span = tracer.spanBuilder("operation-name").startSpan();
        
        try (Scope scope = span.makeCurrent()) {
            // Add attributes to the span
            span.setAttribute("user.id", "12345");
            span.setAttribute("operation.type", "database-query");
            
            // Your business logic here
            performDatabaseOperation();
            
            // Mark span as successful
            span.setStatus(StatusCode.OK);
        } catch (Exception e) {
            // Record the exception
            span.recordException(e);
            span.setStatus(StatusCode.ERROR, "Operation failed");
            throw e;
        } finally {
            span.end();
        }
    }
}
```

### 4. Using Annotations (Simplified)

```java
import io.opentelemetry.instrumentation.annotations.WithSpan;
import io.opentelemetry.instrumentation.annotations.SpanAttribute;

public class MyService {
    
    @WithSpan("database-operation")
    public User getUserById(@SpanAttribute("user.id") String userId) {
        // This method will automatically be traced
        return userRepository.findById(userId);
    }
    
    @WithSpan
    public void processOrder(@SpanAttribute String orderId) {
        // Method name will be used as span name
        orderService.process(orderId);
    }
}
```

## Configuration Options

### OTLP Endpoints

**HTTP (Recommended)**:
```bash
-Dotel.exporter.otlp.endpoint=http://localhost:4338
-Dotel.exporter.otlp.protocol=http/protobuf
```

**gRPC**:
```bash
-Dotel.exporter.otlp.endpoint=http://localhost:4337
-Dotel.exporter.otlp.protocol=grpc
```

### Service Configuration

```bash
# Service name (required)
-Dotel.service.name=my-java-service

# Service version
-Dotel.service.version=1.0.0

# Environment
-Dotel.resource.attributes=environment=production,team=backend
```

### Sampling Configuration

```bash
# Sample all traces (development)
-Dotel.traces.sampler=always_on

# Sample 10% of traces (production)
-Dotel.traces.sampler=traceidratio
-Dotel.traces.sampler.arg=0.1

# No sampling (disable tracing)
-Dotel.traces.sampler=always_off
```

## Spring Boot Integration

### 1. Add Dependencies

```xml
<dependency>
    <groupId>io.opentelemetry.instrumentation</groupId>
    <artifactId>opentelemetry-spring-boot-starter</artifactId>
    <version>1.32.0-alpha</version>
</dependency>
```

### 2. Configuration (application.yml)

```yaml
otel:
  service:
    name: my-spring-service
  exporter:
    otlp:
      endpoint: http://localhost:4338
      protocol: http/protobuf
  traces:
    sampler:
      probability: 0.1
```

### 3. Custom Instrumentation

```java
import io.opentelemetry.api.trace.Tracer;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

@Service
public class OrderService {
    
    @Autowired
    private Tracer tracer;
    
    public void processOrder(String orderId) {
        Span span = tracer.spanBuilder("process-order")
            .setAttribute("order.id", orderId)
            .startSpan();
            
        try (Scope scope = span.makeCurrent()) {
            // Process the order
        } finally {
            span.end();
        }
    }
}
```

## Troubleshooting

### Common Issues

**No Traces Appearing**
- Verify the Sematext Agent is running and accessible
- Check the OTLP endpoint configuration
- Ensure service name is set correctly

**High Memory Usage**
- Reduce sampling rate for production environments
- Configure batch span processor settings

**Performance Impact**
- Use async span processors
- Configure appropriate batch sizes
- Consider using traceidratio sampler

### Debug Configuration

Enable debug logging to troubleshoot issues:

```bash
-Dotel.javaagent.debug=true
-Djava.util.logging.config.file=logging.properties
```

**logging.properties**:
```properties
io.opentelemetry.level=FINE
io.opentelemetry.exporter.level=FINE
```

### Verification

Test your configuration with a simple span:

```java
import io.opentelemetry.api.GlobalOpenTelemetry;
import io.opentelemetry.api.trace.Tracer;

public class TracingTest {
    public static void main(String[] args) {
        Tracer tracer = GlobalOpenTelemetry.getTracer("test-tracer");
        
        Span span = tracer.spanBuilder("test-span").startSpan();
        try {
            span.setAttribute("test.attribute", "test-value");
            System.out.println("Test span created");
        } finally {
            span.end();
        }
    }
}
```

## Best Practices

### Span Naming
- Use descriptive, consistent names
- Follow the format: `operation-name` or `service.operation`
- Keep names short but meaningful

### Attributes
- Add relevant business context
- Use semantic conventions when possible
- Don't include sensitive data (passwords, tokens)

### Error Handling
```java
try {
    // Business logic
} catch (Exception e) {
    span.recordException(e);
    span.setStatus(StatusCode.ERROR, e.getMessage());
    throw e;
}
```

### Resource Management
```java
// Always use try-with-resources or finally blocks
Span span = tracer.spanBuilder("operation").startSpan();
try (Scope scope = span.makeCurrent()) {
    // Work here
} finally {
    span.end();
}
```

## Next Steps

- [Configure Sematext Agent](/docs/agents/sematext-agent/opentelemetry/)
- [Explore Traces](/docs/tracing/explorer/)
- [Set Up Alerts](/docs/tracing/alerts/creating-alerts/)
- [Other SDK Languages](index.md)

## Related Documentation

- [OpenTelemetry Java Documentation](https://opentelemetry.io/docs/instrumentation/java/)
- [Spring Boot Integration](https://opentelemetry.io/docs/instrumentation/java/spring-boot/)
- [Troubleshooting Guide](/docs/tracing/troubleshooting/)