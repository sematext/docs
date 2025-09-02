title: Python OpenTelemetry SDK for Sematext Tracing
description: Complete guide to instrumenting Python applications with OpenTelemetry for Sematext Tracing

## Python OpenTelemetry SDK

This guide covers how to instrument Python applications with OpenTelemetry to send traces to Sematext Tracing.

## Auto-Instrumentation (Recommended)

Auto-instrumentation is the easiest way to get started. It automatically instruments popular frameworks and libraries without requiring code changes.

### 1. Install the Auto-Instrumentation Package

```bash
pip install opentelemetry-distro[otlp]
pip install opentelemetry-instrumentation
```

### 2. Auto-Discover and Install Instrumentations

```bash
opentelemetry-bootstrap -a install
```

This command automatically detects the packages in your environment and installs the corresponding OpenTelemetry instrumentation libraries.

### 3. Run Your Application

```bash
export OTEL_SERVICE_NAME=your-service-name
export OTEL_EXPORTER_OTLP_ENDPOINT=http://localhost:4338
export OTEL_EXPORTER_OTLP_PROTOCOL=http/protobuf

opentelemetry-instrument python your_app.py
```

### Framework-Specific Auto-Instrumentation

**Flask**:
```bash
pip install opentelemetry-instrumentation-flask
```

**Django**:
```bash
pip install opentelemetry-instrumentation-django
```

**FastAPI**:
```bash
pip install opentelemetry-instrumentation-fastapi
```

**Requests**:
```bash
pip install opentelemetry-instrumentation-requests
```

**SQLAlchemy**:
```bash
pip install opentelemetry-instrumentation-sqlalchemy
```

**Redis**:
```bash
pip install opentelemetry-instrumentation-redis
```

## Manual Instrumentation (Advanced)

For more control over instrumentation, you can manually instrument your application.

### 1. Install Required Packages

```bash
pip install opentelemetry-api opentelemetry-sdk opentelemetry-exporter-otlp
```

### 2. Initialize Tracing

```python
from opentelemetry import trace
from opentelemetry.exporter.otlp.proto.http.trace_exporter import OTLPSpanExporter
from opentelemetry.sdk.trace import TracerProvider
from opentelemetry.sdk.trace.export import BatchSpanProcessor
from opentelemetry.sdk.resources import Resource

# Configure the tracer provider
resource = Resource.create({
    "service.name": "your-service-name",
    "service.version": "1.0.0",
    "deployment.environment": "production"
})

trace.set_tracer_provider(TracerProvider(resource=resource))
tracer_provider = trace.get_tracer_provider()

# Configure OTLP exporter
otlp_exporter = OTLPSpanExporter(
    endpoint="http://localhost:4338",
    headers={}
)

# Add span processor
tracer_provider.add_span_processor(
    BatchSpanProcessor(otlp_exporter)
)

# Get tracer
tracer = trace.get_tracer("your-service-name")
```

### 3. Create Spans

```python
from opentelemetry import trace
from opentelemetry.trace import Status, StatusCode

def process_user_data(user_id):
    tracer = trace.get_tracer(__name__)
    
    with tracer.start_as_current_span("process-user-data") as span:
        # Add attributes to the span
        span.set_attribute("user.id", user_id)
        span.set_attribute("operation.type", "data-processing")
        
        try:
            # Your business logic here
            user_data = fetch_user_data(user_id)
            result = transform_data(user_data)
            
            # Add more attributes based on the result
            span.set_attribute("data.size", len(result))
            span.set_status(Status(StatusCode.OK))
            
            return result
            
        except Exception as e:
            # Record the exception
            span.record_exception(e)
            span.set_status(Status(StatusCode.ERROR, str(e)))
            raise

def fetch_user_data(user_id):
    tracer = trace.get_tracer(__name__)
    
    with tracer.start_as_current_span("fetch-user-data") as span:
        span.set_attribute("user.id", user_id)
        span.set_attribute("database.operation", "SELECT")
        
        # Simulate database call
        import time
        time.sleep(0.1)
        
        return {"id": user_id, "name": "John Doe"}
```

## Framework Integration Examples

### Flask Application

```python
from flask import Flask
from opentelemetry.instrumentation.flask import FlaskInstrumentor
from opentelemetry import trace

app = Flask(__name__)

# Initialize tracing (use the initialization code from above)
# ... initialization code ...

# Instrument Flask
FlaskInstrumentor().instrument_app(app)

@app.route("/users/<user_id>")
def get_user(user_id):
    tracer = trace.get_tracer(__name__)
    
    with tracer.start_as_current_span("get-user-handler") as span:
        span.set_attribute("user.id", user_id)
        
        # Your business logic
        user_data = fetch_user_from_db(user_id)
        
        return {"user": user_data}

if __name__ == "__main__":
    app.run(debug=True)
```

### Django Application

**settings.py**:
```python
from opentelemetry.instrumentation.django import DjangoInstrumentor

# Initialize tracing (use the initialization code from above)
# ... initialization code ...

# Instrument Django
DjangoInstrumentor().instrument()

# Add to INSTALLED_APPS if needed
INSTALLED_APPS = [
    # ... your apps ...
]
```

**views.py**:
```python
from django.http import JsonResponse
from opentelemetry import trace

def user_detail(request, user_id):
    tracer = trace.get_tracer(__name__)
    
    with tracer.start_as_current_span("user-detail-view") as span:
        span.set_attribute("user.id", user_id)
        span.set_attribute("http.method", request.method)
        
        # Your business logic
        user = get_user_by_id(user_id)
        
        return JsonResponse({"user": user})
```

### FastAPI Application

```python
from fastapi import FastAPI
from opentelemetry.instrumentation.fastapi import FastAPIInstrumentor
from opentelemetry import trace

app = FastAPI()

# Initialize tracing (use the initialization code from above)
# ... initialization code ...

# Instrument FastAPI
FastAPIInstrumentor.instrument_app(app)

@app.get("/users/{user_id}")
async def get_user(user_id: str):
    tracer = trace.get_tracer(__name__)
    
    with tracer.start_as_current_span("get-user-endpoint") as span:
        span.set_attribute("user.id", user_id)
        
        # Your async business logic
        user_data = await fetch_user_async(user_id)
        
        return {"user": user_data}
```

## Configuration Options

### Environment Variables

```bash
# Service configuration
export OTEL_SERVICE_NAME=my-python-service
export OTEL_SERVICE_VERSION=1.0.0
export OTEL_RESOURCE_ATTRIBUTES=environment=production,team=backend

# OTLP exporter configuration
export OTEL_EXPORTER_OTLP_ENDPOINT=http://localhost:4338
export OTEL_EXPORTER_OTLP_PROTOCOL=http/protobuf

# Sampling configuration
export OTEL_TRACES_SAMPLER=traceidratio
export OTEL_TRACES_SAMPLER_ARG=0.1
```

### Programmatic Configuration

```python
from opentelemetry.sdk.trace.sampling import TraceIdRatioBased

# Configure sampling
trace.set_tracer_provider(
    TracerProvider(
        resource=resource,
        sampler=TraceIdRatioBased(0.1)  # 10% sampling
    )
)
```

### Advanced OTLP Configuration

```python
from opentelemetry.exporter.otlp.proto.http.trace_exporter import OTLPSpanExporter

# HTTP with custom headers
otlp_exporter = OTLPSpanExporter(
    endpoint="http://localhost:4338",
    headers={"authorization": "Bearer token"},
    timeout=30
)

# gRPC exporter
from opentelemetry.exporter.otlp.proto.grpc.trace_exporter import OTLPSpanExporter as GRPCSpanExporter

grpc_exporter = GRPCSpanExporter(
    endpoint="http://localhost:4337",
    insecure=True
)
```

## Database Instrumentation

### SQLAlchemy

```bash
pip install opentelemetry-instrumentation-sqlalchemy
```

```python
from opentelemetry.instrumentation.sqlalchemy import SQLAlchemyInstrumentor
from sqlalchemy import create_engine

# Create your engine
engine = create_engine("postgresql://user:password@localhost/dbname")

# Instrument SQLAlchemy
SQLAlchemyInstrumentor().instrument(
    engine=engine,
    service="my-db-service"
)
```

### Psycopg2 (PostgreSQL)

```bash
pip install opentelemetry-instrumentation-psycopg2
```

```python
from opentelemetry.instrumentation.psycopg2 import Psycopg2Instrumentor

# Instrument psycopg2
Psycopg2Instrumentor().instrument()
```

### Redis

```bash
pip install opentelemetry-instrumentation-redis
```

```python
from opentelemetry.instrumentation.redis import RedisInstrumentor

# Instrument Redis
RedisInstrumentor().instrument()
```

## Async Support

For async applications, use the same patterns with async/await:

```python
import asyncio
from opentelemetry import trace

async def async_operation():
    tracer = trace.get_tracer(__name__)
    
    with tracer.start_as_current_span("async-operation") as span:
        span.set_attribute("operation.type", "async")
        
        # Async work
        await asyncio.sleep(0.1)
        result = await fetch_data_async()
        
        span.set_attribute("result.count", len(result))
        return result

# For aiohttp
from opentelemetry.instrumentation.aiohttp_client import AioHttpClientInstrumentor
AioHttpClientInstrumentor().instrument()
```

## Troubleshooting

### Common Issues

**No Traces Appearing**
- Check that the Sematext Agent is running
- Verify OTLP endpoint configuration
- Ensure proper service name configuration

**Import Errors**
```bash
# Make sure all required packages are installed
pip install opentelemetry-distro[otlp]
opentelemetry-bootstrap -a install
```

**High Memory Usage**
```python
# Configure batch processor settings
from opentelemetry.sdk.trace.export import BatchSpanProcessor

processor = BatchSpanProcessor(
    otlp_exporter,
    max_queue_size=2048,
    schedule_delay_millis=5000,
    max_export_batch_size=512,
    export_timeout_millis=30000,
)
```

### Debug Configuration

```python
import logging

# Enable OpenTelemetry debug logging
logging.getLogger().setLevel(logging.DEBUG)
logging.getLogger("opentelemetry").setLevel(logging.DEBUG)
```

### Verification Script

```python
from opentelemetry import trace
from opentelemetry.exporter.otlp.proto.http.trace_exporter import OTLPSpanExporter
from opentelemetry.sdk.trace import TracerProvider
from opentelemetry.sdk.trace.export import BatchSpanProcessor, ConsoleSpanExporter
from opentelemetry.sdk.resources import Resource

def test_tracing():
    # Initialize tracing
    resource = Resource.create({"service.name": "test-service"})
    trace.set_tracer_provider(TracerProvider(resource=resource))
    
    # Add console exporter for testing
    trace.get_tracer_provider().add_span_processor(
        BatchSpanProcessor(ConsoleSpanExporter())
    )
    
    # Create a test span
    tracer = trace.get_tracer(__name__)
    with tracer.start_as_current_span("test-span") as span:
        span.set_attribute("test.attribute", "test-value")
        print("Test span created successfully")

if __name__ == "__main__":
    test_tracing()
```

## Best Practices

### Span Management
```python
# Use context managers for automatic span lifecycle management
with tracer.start_as_current_span("operation") as span:
    # Work here
    pass  # Span is automatically ended
```

### Error Handling
```python
try:
    # Business logic
    pass
except Exception as e:
    span.record_exception(e)
    span.set_status(Status(StatusCode.ERROR, str(e)))
    raise
```

### Attributes
```python
# Use semantic conventions
span.set_attribute("http.method", "GET")
span.set_attribute("http.url", "https://api.example.com")
span.set_attribute("user.id", "12345")

# Avoid sensitive data
# span.set_attribute("password", "secret")  # Don't do this
```

### Resource Configuration
```python
resource = Resource.create({
    "service.name": "my-service",
    "service.version": "1.2.3",
    "deployment.environment": "production",
    "telemetry.sdk.language": "python"
})
```

## Next Steps

- [Configure Sematext Agent](/docs/agents/sematext-agent/opentelemetry/)
- [Explore Traces](/docs/tracing/explorer/)
- [Set Up Alerts](/docs/tracing/alerts/creating-alerts/)
- [Other SDK Languages](/docs/tracing/sdks/)

## Related Documentation

- [OpenTelemetry Python Documentation](https://opentelemetry.io/docs/instrumentation/python/)
- [Python Auto-Instrumentation](https://opentelemetry.io/docs/instrumentation/python/automatic/)
- [Troubleshooting Guide](/docs/tracing/troubleshooting/)