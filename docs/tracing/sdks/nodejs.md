title: Node.js OpenTelemetry SDK for Sematext Tracing
description: Complete guide to instrumenting Node.js applications with OpenTelemetry for Sematext Tracing

## Node.js OpenTelemetry SDK

This guide covers how to instrument Node.js applications with OpenTelemetry to send traces to Sematext Tracing.

## Auto-Instrumentation (Recommended)

Auto-instrumentation automatically instruments popular frameworks and libraries without requiring code changes.

### 1. Install Dependencies

```bash
npm install @opentelemetry/auto-instrumentations-node
npm install @opentelemetry/exporter-trace-otlp-http
npm install @opentelemetry/sdk-node
```

### 2. Create Tracing Configuration File

Create a file called `tracing.js`:

```javascript
const { NodeSDK } = require('@opentelemetry/sdk-node');
const { getNodeAutoInstrumentations } = require('@opentelemetry/auto-instrumentations-node');
const { OTLPTraceExporter } = require('@opentelemetry/exporter-trace-otlp-http');

const sdk = new NodeSDK({
  serviceName: 'your-service-name',
  traceExporter: new OTLPTraceExporter({
    url: 'http://localhost:4338',
  }),
  instrumentations: [getNodeAutoInstrumentations()],
});

sdk.start();
```

### 3. Run Your Application

```bash
node -r ./tracing.js your-app.js
```

Or add it to your package.json:

```json
{
  "scripts": {
    "start": "node -r ./tracing.js app.js"
  }
}
```

### Framework-Specific Considerations

**Express.js**

- Automatically instrumented out of the box
- Captures HTTP requests, responses, and route information

**Koa**

- Automatically instrumented
- Supports Koa v2+ applications

**Fastify**

- Automatically instrumented
- Captures request/response cycles

**HTTP/HTTPS**

- Client and server requests automatically traced
- Works with built-in http/https modules

## Manual Instrumentation (Advanced)

For more control over instrumentation, you can manually configure OpenTelemetry.

### 1. Install Core Packages

```bash
npm install @opentelemetry/api @opentelemetry/sdk-node @opentelemetry/exporter-trace-otlp-http
```

### 2. Initialize Tracing

```javascript
const { NodeSDK } = require('@opentelemetry/sdk-node');
const { OTLPTraceExporter } = require('@opentelemetry/exporter-trace-otlp-http');
const { Resource } = require('@opentelemetry/resources');
const { SemanticResourceAttributes } = require('@opentelemetry/semantic-conventions');

const sdk = new NodeSDK({
  resource: new Resource({
    [SemanticResourceAttributes.SERVICE_NAME]: 'your-service-name',
    [SemanticResourceAttributes.SERVICE_VERSION]: '1.0.0',
    [SemanticResourceAttributes.DEPLOYMENT_ENVIRONMENT]: 'production',
  }),
  traceExporter: new OTLPTraceExporter({
    url: 'http://localhost:4338',
  }),
});

sdk.start();

// Get tracer for manual instrumentation
const { trace } = require('@opentelemetry/api');
const tracer = trace.getTracer('your-service-name');

module.exports = { tracer };
```

### 3. Create Spans

```javascript
const { trace, SpanStatusCode } = require('@opentelemetry/api');

async function processUserData(userId) {
  const tracer = trace.getActiveTracer();
  
  const span = tracer.startSpan('process-user-data');
  
  try {
    // Add attributes to the span
    span.setAttributes({
      'user.id': userId,
      'operation.type': 'data-processing'
    });
    
    // Your business logic here
    const userData = await fetchUserData(userId);
    const result = await transformData(userData);
    
    // Add more attributes based on the result
    span.setAttributes({
      'data.size': result.length,
      'operation.success': true
    });
    
    span.setStatus({ code: SpanStatusCode.OK });
    return result;
    
  } catch (error) {
    // Record the exception
    span.recordException(error);
    span.setStatus({
      code: SpanStatusCode.ERROR,
      message: error.message
    });
    throw error;
  } finally {
    span.end();
  }
}

async function fetchUserData(userId) {
  const tracer = trace.getActiveTracer();
  
  return tracer.startActiveSpan('fetch-user-data', async (span) => {
    span.setAttributes({
      'user.id': userId,
      'database.operation': 'SELECT'
    });
    
    try {
      // Simulate database call
      await new Promise(resolve => setTimeout(resolve, 100));
      return { id: userId, name: 'John Doe' };
    } finally {
      span.end();
    }
  });
}
```

## Express.js Integration

### Basic Setup with Auto-Instrumentation

```javascript
// tracing.js
const { NodeSDK } = require('@opentelemetry/sdk-node');
const { getNodeAutoInstrumentations } = require('@opentelemetry/auto-instrumentations-node');
const { OTLPTraceExporter } = require('@opentelemetry/exporter-trace-otlp-http');

const sdk = new NodeSDK({
  serviceName: 'express-api',
  traceExporter: new OTLPTraceExporter({
    url: 'http://localhost:4338',
  }),
  instrumentations: [getNodeAutoInstrumentations()],
});

sdk.start();
```

```javascript
// app.js
const express = require('express');
const { trace } = require('@opentelemetry/api');

const app = express();
const tracer = trace.getTracer('express-api');

app.get('/users/:id', async (req, res) => {
  const span = tracer.startSpan('get-user-handler');
  
  try {
    span.setAttributes({
      'user.id': req.params.id,
      'http.method': req.method,
      'http.route': req.route.path
    });
    
    // Your business logic
    const user = await getUserById(req.params.id);
    
    res.json({ user });
    span.setStatus({ code: SpanStatusCode.OK });
  } catch (error) {
    span.recordException(error);
    span.setStatus({
      code: SpanStatusCode.ERROR,
      message: error.message
    });
    res.status(500).json({ error: 'Internal server error' });
  } finally {
    span.end();
  }
});

app.listen(3000, () => {
  console.log('Server running on port 3000');
});
```

### Run the Express App

```bash
node -r ./tracing.js app.js
```

## Koa Integration

```javascript
// app.js with Koa
const Koa = require('koa');
const Router = require('@koa/router');
const { trace } = require('@opentelemetry/api');

const app = new Koa();
const router = new Router();
const tracer = trace.getTracer('koa-api');

router.get('/users/:id', async (ctx) => {
  const span = tracer.startSpan('get-user-koa');
  
  try {
    span.setAttributes({
      'user.id': ctx.params.id,
      'http.method': ctx.method,
      'http.path': ctx.path
    });
    
    // Your business logic
    const user = await getUserById(ctx.params.id);
    
    ctx.body = { user };
    span.setStatus({ code: SpanStatusCode.OK });
  } catch (error) {
    span.recordException(error);
    span.setStatus({
      code: SpanStatusCode.ERROR,
      message: error.message
    });
    ctx.status = 500;
    ctx.body = { error: 'Internal server error' };
  } finally {
    span.end();
  }
});

app.use(router.routes());
app.listen(3000);
```

## Database Instrumentation

### MongoDB

```bash
npm install @opentelemetry/instrumentation-mongodb
```

```javascript
const { MongoDBInstrumentation } = require('@opentelemetry/instrumentation-mongodb');

const sdk = new NodeSDK({
  serviceName: 'my-app',
  instrumentations: [
    getNodeAutoInstrumentations(),
    new MongoDBInstrumentation()
  ],
  traceExporter: new OTLPTraceExporter({
    url: 'http://localhost:4338',
  }),
});
```

### PostgreSQL (pg)

```bash
npm install @opentelemetry/instrumentation-pg
```

```javascript
const { PgInstrumentation } = require('@opentelemetry/instrumentation-pg');

const sdk = new NodeSDK({
  instrumentations: [
    getNodeAutoInstrumentations(),
    new PgInstrumentation()
  ],
  // ... other configuration
});
```

### Redis

```bash
npm install @opentelemetry/instrumentation-redis
```

```javascript
const { RedisInstrumentation } = require('@opentelemetry/instrumentation-redis');

const sdk = new NodeSDK({
  instrumentations: [
    getNodeAutoInstrumentations(),
    new RedisInstrumentation()
  ],
  // ... other configuration
});
```

## Configuration Options

### Environment Variables

```bash
# Service configuration
export OTEL_SERVICE_NAME=my-node-service
export OTEL_SERVICE_VERSION=1.0.0
export OTEL_RESOURCE_ATTRIBUTES=environment=production,team=backend

# OTLP exporter configuration
export OTEL_EXPORTER_OTLP_ENDPOINT=http://localhost:4338
export OTEL_EXPORTER_OTLP_PROTOCOL=http/protobuf

# Sampling configuration
export OTEL_TRACES_SAMPLER=traceidratio
export OTEL_TRACES_SAMPLER_ARG=0.1
```

### Advanced Configuration

```javascript
const { NodeSDK } = require('@opentelemetry/sdk-node');
const { TraceIdRatioBasedSampler } = require('@opentelemetry/sdk-trace-base');

const sdk = new NodeSDK({
  serviceName: 'advanced-service',
  sampler: new TraceIdRatioBasedSampler(0.1), // 10% sampling
  traceExporter: new OTLPTraceExporter({
    url: 'http://localhost:4338',
    headers: {
      'authorization': 'Bearer your-token'
    },
    timeout: 30000, // 30 seconds
  }),
  instrumentations: [
    getNodeAutoInstrumentations({
      '@opentelemetry/instrumentation-fs': {
        enabled: false, // Disable file system instrumentation
      },
      '@opentelemetry/instrumentation-http': {
        enabled: true,
        ignoreLinkLocalAddresses: true,
      }
    })
  ]
});
```

### gRPC Configuration

```javascript
const { OTLPTraceExporter } = require('@opentelemetry/exporter-trace-otlp-grpc');

const sdk = new NodeSDK({
  traceExporter: new OTLPTraceExporter({
    url: 'http://localhost:4337',
  }),
  // ... other configuration
});
```

## TypeScript Support

### Install TypeScript Dependencies

```bash
npm install --save-dev typescript @types/node
npm install @opentelemetry/api @opentelemetry/sdk-node @opentelemetry/auto-instrumentations-node
```

### TypeScript Configuration

```typescript
// tracing.ts
import { NodeSDK } from '@opentelemetry/sdk-node';
import { getNodeAutoInstrumentations } from '@opentelemetry/auto-instrumentations-node';
import { OTLPTraceExporter } from '@opentelemetry/exporter-trace-otlp-http';

const sdk = new NodeSDK({
  serviceName: 'typescript-service',
  traceExporter: new OTLPTraceExporter({
    url: 'http://localhost:4338',
  }),
  instrumentations: [getNodeAutoInstrumentations()],
});

sdk.start();
```

```typescript
// app.ts
import express from 'express';
import { trace, SpanStatusCode } from '@opentelemetry/api';

const app = express();
const tracer = trace.getTracer('typescript-service');

interface User {
  id: string;
  name: string;
  email: string;
}

app.get('/users/:id', async (req, res) => {
  const span = tracer.startSpan('get-user-typescript');
  
  try {
    span.setAttributes({
      'user.id': req.params.id,
      'operation.type': 'user-fetch'
    });
    
    const user: User = await fetchUser(req.params.id);
    
    res.json({ user });
    span.setStatus({ code: SpanStatusCode.OK });
  } catch (error) {
    span.recordException(error as Error);
    span.setStatus({
      code: SpanStatusCode.ERROR,
      message: (error as Error).message
    });
    res.status(500).json({ error: 'Internal server error' });
  } finally {
    span.end();
  }
});

async function fetchUser(id: string): Promise<User> {
  return tracer.startActiveSpan('fetch-user-db', async (span) => {
    try {
      span.setAttributes({
        'user.id': id,
        'database.operation': 'SELECT'
      });
      
      // Simulate database call
      await new Promise(resolve => setTimeout(resolve, 100));
      
      return {
        id,
        name: 'John Doe',
        email: 'john@example.com'
      };
    } finally {
      span.end();
    }
  });
}

app.listen(3000, () => {
  console.log('TypeScript server running on port 3000');
});
```

## Troubleshooting

### Common Issues

**No Traces Appearing**

- Ensure the Sematext Agent is running and accessible
- Check the OTLP endpoint configuration
- Verify service name is set correctly

**Module Not Found Errors**

```bash
# Make sure all dependencies are installed
npm install @opentelemetry/auto-instrumentations-node @opentelemetry/sdk-node @opentelemetry/exporter-trace-otlp-http
```

**Performance Issues**

```javascript
// Configure batch span processor
const { BatchSpanProcessor } = require('@opentelemetry/sdk-trace-base');

const sdk = new NodeSDK({
  spanProcessor: new BatchSpanProcessor(exporter, {
    maxQueueSize: 2048,
    scheduledDelayMillis: 5000,
    maxExportBatchSize: 512,
    exportTimeoutMillis: 30000,
  })
});
```

### Debug Configuration

```javascript
// Enable debug logging
process.env.OTEL_LOG_LEVEL = 'debug';

// Or programmatically
const sdk = new NodeSDK({
  // ... configuration
});

sdk.start();
console.log('Tracing initialized');
```

### Verification Script

```javascript
// test-tracing.js
const { NodeSDK } = require('@opentelemetry/sdk-node');
const { ConsoleSpanExporter } = require('@opentelemetry/sdk-trace-base');
const { trace } = require('@opentelemetry/api');

const sdk = new NodeSDK({
  serviceName: 'test-service',
  traceExporter: new ConsoleSpanExporter(),
});

sdk.start();

const tracer = trace.getTracer('test-service');

const span = tracer.startSpan('test-span');
span.setAttributes({
  'test.attribute': 'test-value',
  'test.number': 42
});
span.end();

console.log('Test span created - check console output');
```

## Best Practices

### Span Management
```javascript
// Use startActiveSpan for automatic context management
tracer.startActiveSpan('operation-name', async (span) => {
  try {
    // Your code here
    span.setAttributes({ key: 'value' });
  } catch (error) {
    span.recordException(error);
    throw error;
  } finally {
    span.end();
  }
});
```

### Error Handling
```javascript
try {
  // Business logic
} catch (error) {
  span.recordException(error);
  span.setStatus({
    code: SpanStatusCode.ERROR,
    message: error.message
  });
  throw error;
}
```

### Async/Await Patterns
```javascript
async function asyncOperation() {
  return tracer.startActiveSpan('async-op', async (span) => {
    try {
      const result = await someAsyncWork();
      span.setAttributes({ 'result.count': result.length });
      return result;
    } catch (error) {
      span.recordException(error);
      throw error;
    } finally {
      span.end();
    }
  });
}
```

### Resource Configuration
```javascript
const { Resource } = require('@opentelemetry/resources');
const { SemanticResourceAttributes } = require('@opentelemetry/semantic-conventions');

const resource = new Resource({
  [SemanticResourceAttributes.SERVICE_NAME]: 'my-service',
  [SemanticResourceAttributes.SERVICE_VERSION]: '1.2.3',
  [SemanticResourceAttributes.DEPLOYMENT_ENVIRONMENT]: 'production',
  [SemanticResourceAttributes.SERVICE_NAMESPACE]: 'ecommerce'
});
```

## Next Steps

- [Configure Sematext Agent](/docs/agents/sematext-agent/opentelemetry/)
- [Explore Traces](/docs/tracing/reports/explorer/)
- [Set Up Alerts](/docs/tracing/alerts/creating-alerts/)
- [Other SDK Languages](/docs/tracing/sdks/)

## Related Documentation

- [OpenTelemetry Node.js Documentation](https://opentelemetry.io/docs/instrumentation/js/)
- [Node.js Auto-Instrumentation](https://opentelemetry.io/docs/instrumentation/js/automatic/)
- [Troubleshooting Guide](/docs/tracing/troubleshooting/)