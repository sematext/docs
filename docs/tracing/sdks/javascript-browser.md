title: Browser JavaScript OpenTelemetry SDK for Sematext Tracing
description: Complete guide to instrumenting browser applications (React, Vue, Angular) with OpenTelemetry for Sematext Tracing

## Browser JavaScript OpenTelemetry SDK

This guide covers how to instrument browser-based JavaScript applications with OpenTelemetry to send traces to Sematext Tracing. This includes React, Vue.js, Angular, and vanilla JavaScript applications.

## Overview

Browser tracing helps you:

- Monitor frontend performance and user interactions
- Track API calls and network requests to backend services
- Connect frontend traces with backend traces for end-to-end visibility
- Identify performance bottlenecks in user workflows

## Instrumentation Approach

Browser JavaScript applications support both auto-instrumentation and manual instrumentation:

**Auto-Instrumentation (Recommended)**:

- Automatically instruments fetch requests, XMLHttpRequest, and DOM interactions
- Uses `getWebAutoInstrumentations()` for zero-code tracing of common browser APIs
- Perfect for tracking API calls, page navigation, and user interactions
- Minimal setup - just configuration and initialization

**Manual Instrumentation**:

- Create custom spans for specific business logic or user actions
- Add detailed attributes and events to spans
- Fine-grained control over what gets traced
- Best for complex user workflows and custom metrics

This guide covers both approaches, starting with auto-instrumentation for quick setup, then showing manual instrumentation for advanced use cases.

## Prerequisites

- A Sematext Tracing App ([create one here](/docs/tracing/create-tracing-app/))
- Sematext Agent running with OpenTelemetry support
- One of the proxy approaches configured (see [Sending Traces from Browser](#sending-traces-from-browser))

## Sending Traces from Browser

Browser applications require a proxy to send traces to the Sematext Agent due to browser security restrictions (CORS policy). Here are the available approaches:

### 1. Web Server Proxy (Production Recommended)

Configure your web server to proxy OTLP requests to the Sematext Agent.

**Nginx Configuration:**
```nginx
server {
    listen 80;
    server_name yourdomain.com;

    # Serve your frontend application
    location / {
        root /var/www/html;
        try_files $uri $uri/ /index.html;
    }

    # Proxy traces to Sematext Agent
    location /v1/traces {
        proxy_pass http://localhost:4338/v1/traces;
        proxy_set_header Content-Type application/x-protobuf;
        proxy_set_header Host $host;
        
        # Enable CORS for browser requests
        if ($request_method = 'OPTIONS') {
            add_header 'Access-Control-Allow-Origin' '*';
            add_header 'Access-Control-Allow-Methods' 'GET, POST, OPTIONS';
            add_header 'Access-Control-Allow-Headers' 'Content-Type';
            add_header 'Access-Control-Max-Age' 1728000;
            add_header 'Content-Type' 'text/plain; charset=utf-8';
            add_header 'Content-Length' 0;
            return 204;
        }
        
        if ($request_method = 'POST') {
            add_header 'Access-Control-Allow-Origin' '*';
            add_header 'Access-Control-Allow-Methods' 'GET, POST, OPTIONS';
            add_header 'Access-Control-Allow-Headers' 'Content-Type';
        }
    }
}
```

**Apache Configuration:**
```apache
<VirtualHost *:80>
    ServerName yourdomain.com
    DocumentRoot /var/www/html

    # Serve frontend application
    <Directory /var/www/html>
        Options -Indexes +FollowSymLinks
        AllowOverride All
        Require all granted
    </Directory>

    # Proxy traces to Sematext Agent
    ProxyPass /v1/traces http://localhost:4338/v1/traces
    ProxyPassReverse /v1/traces http://localhost:4338/v1/traces
    
    # Enable CORS
    Header always set Access-Control-Allow-Origin "*"
    Header always set Access-Control-Allow-Methods "POST, GET, OPTIONS"
    Header always set Access-Control-Allow-Headers "Content-Type"
</VirtualHost>
```

### 2. Backend API Proxy (Most Flexible)

Create an API endpoint in your backend that forwards traces to the agent.

**Node.js/Express Example:**
```javascript
// routes/traces.js
const express = require('express');
const fetch = require('node-fetch');
const router = express.Router();

router.post('/api/traces', async (req, res) => {
  try {
    // Optional: Add server-side filtering or validation
    const traceData = req.body;
    
    // Forward to Sematext Agent
    const response = await fetch('http://localhost:4338/v1/traces', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/x-protobuf',
      },
      body: req.body
    });

    if (response.ok) {
      res.status(200).json({ success: true });
    } else {
      console.error('Failed to forward traces:', response.statusText);
      res.status(500).json({ error: 'Failed to send traces' });
    }
  } catch (error) {
    console.error('Trace proxy error:', error);
    res.status(500).json({ error: 'Internal server error' });
  }
});

module.exports = router;
```

**Python/Flask Example:**
```python
from flask import Flask, request, jsonify
import requests

app = Flask(__name__)

@app.route('/api/traces', methods=['POST', 'OPTIONS'])
def proxy_traces():
    if request.method == 'OPTIONS':
        # Handle CORS preflight
        response = jsonify({'status': 'ok'})
        response.headers.add('Access-Control-Allow-Origin', '*')
        response.headers.add('Access-Control-Allow-Headers', 'Content-Type')
        response.headers.add('Access-Control-Allow-Methods', 'POST')
        return response
    
    try:
        # Forward traces to Sematext Agent
        response = requests.post(
            'http://localhost:4338/v1/traces',
            data=request.data,
            headers={'Content-Type': 'application/x-protobuf'}
        )
        
        if response.status_code == 200:
            result = jsonify({'success': True})
            result.headers.add('Access-Control-Allow-Origin', '*')
            return result
        else:
            return jsonify({'error': 'Failed to send traces'}), 500
            
    except Exception as e:
        print(f"Trace proxy error: {e}")
        return jsonify({'error': 'Internal server error'}), 500
```

### 3. Development Proxy Setup

For local development, configure your development server to proxy trace requests.

**React (Create React App) - Package.json:**
```json
{
  "name": "your-react-app",
  "proxy": "http://localhost:4338",
  "scripts": {
    "start": "react-scripts start"
  }
}
```

**React (Vite) - vite.config.js:**
```javascript
import { defineConfig } from 'vite'
import react from '@vitejs/plugin-react'

export default defineConfig({
  plugins: [react()],
  server: {
    proxy: {
      '/v1/traces': {
        target: 'http://localhost:4338',
        changeOrigin: true,
      }
    }
  }
})
```

**Vue.js (Vue CLI) - vue.config.js:**
```javascript
module.exports = {
  devServer: {
    proxy: {
      '/v1/traces': {
        target: 'http://localhost:4338',
        changeOrigin: true,
      }
    }
  }
}
```

**Angular - proxy.conf.json:**
```json
{
  "/v1/traces": {
    "target": "http://localhost:4338",
    "secure": false,
    "changeOrigin": true
  }
}
```

Then update angular.json:
```json
"serve": {
  "builder": "@angular-devkit/build-angular:dev-server",
  "options": {
    "proxyConfig": "proxy.conf.json"
  }
}
```

## Basic Browser Setup

### 1. Install Dependencies

```bash
npm install @opentelemetry/sdk-web
npm install @opentelemetry/auto-instrumentations-web
npm install @opentelemetry/exporter-trace-otlp-http
```

### 2. Basic Configuration

Create a tracing initialization file:

```javascript
// tracing.js
import { WebTracerProvider } from '@opentelemetry/sdk-web';
import { Resource } from '@opentelemetry/resources';
import { BatchSpanProcessor } from '@opentelemetry/sdk-web';
import { getWebAutoInstrumentations } from '@opentelemetry/auto-instrumentations-web';
import { OTLPTraceExporter } from '@opentelemetry/exporter-trace-otlp-http';
import { registerInstrumentations } from '@opentelemetry/instrumentation';

// Determine the endpoint based on your proxy setup
const getTraceEndpoint = () => {
  if (process.env.NODE_ENV === 'development') {
    // For development with proxy
    return '/v1/traces';
  } else {
    // For production (adjust based on your setup)
    return '/v1/traces'; // Web server proxy
    // OR return '/api/traces'; // Backend API proxy
  }
};

const resource = new Resource({
  'service.name': 'your-frontend-app',
  'service.version': process.env.REACT_APP_VERSION || '1.0.0',
  'deployment.environment': process.env.NODE_ENV || 'development',
});

const provider = new WebTracerProvider({
  resource: resource,
});

const exporter = new OTLPTraceExporter({
  url: getTraceEndpoint(),
});

provider.addSpanProcessor(new BatchSpanProcessor(exporter));
provider.register();

// Register auto-instrumentations
registerInstrumentations({
  instrumentations: [getWebAutoInstrumentations({
    // Configure instrumentations as needed
    '@opentelemetry/instrumentation-fetch': {
      propagateTraceHeaderCorsUrls: [
        /.*/  // Propagate trace headers to all URLs
      ],
    },
    '@opentelemetry/instrumentation-xml-http-request': {
      propagateTraceHeaderCorsUrls: [
        /.*/
      ],
    },
  })],
});
```

## React Applications

### Setup in React

For React applications, add the tracing initialization at the very beginning of your app:

```javascript
// index.js or main.jsx
import './tracing'; // Import tracing first - IMPORTANT!
import React from 'react';
import ReactDOM from 'react-dom/client';
import App from './App';

const root = ReactDOM.createRoot(document.getElementById('root'));
root.render(
  <React.StrictMode>
    <App />
  </React.StrictMode>
);
```

### Manual Instrumentation in React

For custom spans in React components:

```javascript
// components/UserDashboard.jsx
import React, { useEffect, useState } from 'react';
import { trace } from '@opentelemetry/api';

const tracer = trace.getTracer('frontend-app');

function UserDashboard({ userId }) {
  const [userData, setUserData] = useState(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const loadUserData = async () => {
      const span = tracer.startSpan('load-user-data');
      span.setAttributes({
        'user.id': userId,
        'component': 'UserDashboard'
      });

      try {
        const response = await fetch(`/api/users/${userId}`);
        const data = await response.json();
        
        span.setAttributes({
          'http.status_code': response.status,
          'user.name': data.name
        });
        
        setUserData(data);
        span.setStatus({ code: 1 }); // OK
      } catch (error) {
        span.recordException(error);
        span.setStatus({ code: 2, message: error.message }); // ERROR
      } finally {
        setLoading(false);
        span.end();
      }
    };

    loadUserData();
  }, [userId]);

  if (loading) return <div>Loading...</div>;

  return (
    <div>
      {userData && <h1>Welcome, {userData.name}!</h1>}
    </div>
  );
}

export default UserDashboard;
```

### React Hooks for Tracing

Create a custom hook for easier tracing:

```javascript
// hooks/useTracing.js
import { useCallback } from 'react';
import { trace } from '@opentelemetry/api';

const tracer = trace.getTracer('frontend-app');

export function useTracing() {
  const traceOperation = useCallback(async (name, operation, attributes = {}) => {
    const span = tracer.startSpan(name);
    span.setAttributes(attributes);

    try {
      const result = await operation();
      span.setStatus({ code: 1 }); // OK
      return result;
    } catch (error) {
      span.recordException(error);
      span.setStatus({ code: 2, message: error.message });
      throw error;
    } finally {
      span.end();
    }
  }, []);

  const traceUserAction = useCallback((actionName, attributes = {}) => {
    const span = tracer.startSpan(`user-action.${actionName}`);
    span.setAttributes({
      'user.action': actionName,
      ...attributes
    });
    span.end();
  }, []);

  return { traceOperation, traceUserAction };
}
```

Usage in components:

```javascript
// components/ProductList.jsx
import React, { useEffect, useState } from 'react';
import { useTracing } from '../hooks/useTracing';

function ProductList() {
  const [products, setProducts] = useState([]);
  const { traceOperation, traceUserAction } = useTracing();

  useEffect(() => {
    traceOperation(
      'fetch-products',
      async () => {
        const response = await fetch('/api/products');
        const data = await response.json();
        setProducts(data);
        return data;
      },
      { 'component': 'ProductList' }
    );
  }, [traceOperation]);

  const handleProductClick = (product) => {
    traceUserAction('product-click', {
      'product.id': product.id,
      'product.category': product.category
    });
    
    // Handle click logic
  };

  return (
    <div>
      {products.map(product => (
        <div key={product.id} onClick={() => handleProductClick(product)}>
          {product.name}
        </div>
      ))}
    </div>
  );
}
```

## Vue.js Applications

### Setup in Vue 3

```javascript
// main.js
import './tracing'; // Import tracing first - IMPORTANT!
import { createApp } from 'vue';
import App from './App.vue';

createApp(App).mount('#app');
```

### Vue Composition API with Tracing

```javascript
// composables/useTracing.js
import { trace } from '@opentelemetry/api';

const tracer = trace.getTracer('vue-frontend-app');

export function useTracing() {
  const traceAsync = async (spanName, asyncFn, attributes = {}) => {
    const span = tracer.startSpan(spanName);
    span.setAttributes(attributes);

    try {
      const result = await asyncFn();
      span.setStatus({ code: 1 });
      return result;
    } catch (error) {
      span.recordException(error);
      span.setStatus({ code: 2, message: error.message });
      throw error;
    } finally {
      span.end();
    }
  };

  const traceUserEvent = (eventName, attributes = {}) => {
    const span = tracer.startSpan(`user-event.${eventName}`);
    span.setAttributes({
      'event.type': eventName,
      ...attributes
    });
    span.end();
  };

  return { traceAsync, traceUserEvent };
}
```

Usage in Vue components:

```javascript
// components/ProductCatalog.vue
<template>
  <div>
    <div v-if="loading">Loading products...</div>
    <div v-else>
      <product-item 
        v-for="product in products" 
        :key="product.id" 
        :product="product"
        @click="handleProductClick(product)"
      />
    </div>
  </div>
</template>

<script setup>
import { ref, onMounted } from 'vue';
import { useTracing } from '../composables/useTracing';
import ProductItem from './ProductItem.vue';

const products = ref([]);
const loading = ref(true);
const { traceAsync, traceUserEvent } = useTracing();

const handleProductClick = (product) => {
  traceUserEvent('product-view', {
    'product.id': product.id,
    'product.name': product.name
  });
};

onMounted(async () => {
  await traceAsync(
    'load-product-catalog',
    async () => {
      const response = await fetch('/api/products');
      products.value = await response.json();
      loading.value = false;
    },
    { 'component': 'ProductCatalog' }
  );
});
</script>
```

## Angular Applications

### Setup in Angular

```typescript
// main.ts
import './tracing'; // Import tracing first - IMPORTANT!
import { platformBrowserDynamic } from '@angular/platform-browser-dynamic';
import { AppModule } from './app/app.module';

platformBrowserDynamic().bootstrapModule(AppModule)
  .catch(err => console.error(err));
```

### Angular Service for Tracing

```typescript
// services/tracing.service.ts
import { Injectable } from '@angular/core';
import { trace } from '@opentelemetry/api';

@Injectable({
  providedIn: 'root'
})
export class TracingService {
  private tracer = trace.getTracer('angular-frontend-app');

  async traceOperation<T>(
    spanName: string,
    operation: () => Promise<T>,
    attributes: Record<string, string | number> = {}
  ): Promise<T> {
    const span = this.tracer.startSpan(spanName);
    span.setAttributes(attributes);

    try {
      const result = await operation();
      span.setStatus({ code: 1 }); // OK
      return result;
    } catch (error: any) {
      span.recordException(error);
      span.setStatus({ code: 2, message: error.message });
      throw error;
    } finally {
      span.end();
    }
  }

  traceUserInteraction(interaction: string, attributes: Record<string, any> = {}) {
    const span = this.tracer.startSpan(`user-interaction.${interaction}`);
    span.setAttributes({
      'interaction.type': interaction,
      ...attributes
    });
    span.end();
  }
}
```

Usage in Angular components:

```typescript
// components/user-profile.component.ts
import { Component, OnInit } from '@angular/core';
import { TracingService } from '../services/tracing.service';
import { UserService } from '../services/user.service';

@Component({
  selector: 'app-user-profile',
  template: `
    <div *ngIf="user">
      <h2>{{ user.name }}</h2>
      <button (click)="updateProfile()">Update Profile</button>
    </div>
    <div *ngIf="loading">Loading user profile...</div>
  `
})
export class UserProfileComponent implements OnInit {
  user: any = null;
  loading = true;

  constructor(
    private tracingService: TracingService,
    private userService: UserService
  ) {}

  async ngOnInit() {
    await this.tracingService.traceOperation(
      'load-user-profile',
      async () => {
        this.user = await this.userService.getCurrentUser();
        this.loading = false;
      },
      { 'component': 'UserProfileComponent' }
    );
  }

  async updateProfile() {
    this.tracingService.traceUserInteraction('update-profile-click', {
      'user.id': this.user.id
    });

    await this.tracingService.traceOperation(
      'update-user-profile',
      async () => {
        await this.userService.updateUser(this.user);
      }
    );
  }
}
```

## Vanilla JavaScript

For applications without frameworks:

```javascript
// app.js
import './tracing';
import { trace } from '@opentelemetry/api';

const tracer = trace.getTracer('vanilla-js-app');

class App {
  async initialize() {
    const span = tracer.startSpan('app-initialization');
    
    try {
      await this.loadConfiguration();
      await this.loadUserData();
      this.setupEventListeners();
      span.setStatus({ code: 1 });
    } catch (error) {
      span.recordException(error);
      span.setStatus({ code: 2, message: error.message });
    } finally {
      span.end();
    }
  }

  async loadUserData() {
    const span = tracer.startSpan('load-user-data');
    
    try {
      const response = await fetch('/api/user');
      const userData = await response.json();
      
      span.setAttributes({
        'user.id': userData.id,
        'user.role': userData.role
      });
      
      this.displayUser(userData);
      span.setStatus({ code: 1 });
    } catch (error) {
      span.recordException(error);
      span.setStatus({ code: 2, message: error.message });
      throw error;
    } finally {
      span.end();
    }
  }

  setupEventListeners() {
    document.addEventListener('click', (event) => {
      if (event.target.matches('.tracked-button')) {
        const span = tracer.startSpan('button-click');
        span.setAttributes({
          'button.id': event.target.id,
          'button.text': event.target.textContent,
          'click.x': event.clientX,
          'click.y': event.clientY
        });
        
        this.handleButtonClick(event.target);
        span.end();
      }
    });

    // Track form submissions
    document.addEventListener('submit', (event) => {
      const span = tracer.startSpan('form-submission');
      span.setAttributes({
        'form.id': event.target.id,
        'form.action': event.target.action
      });
      
      span.end();
    });
  }

  async handleButtonClick(button) {
    const span = tracer.startSpan('handle-button-action');
    
    try {
      // Simulate some action
      const action = button.dataset.action;
      await this.performAction(action);
      span.setStatus({ code: 1 });
    } catch (error) {
      span.recordException(error);
      span.setStatus({ code: 2, message: error.message });
    } finally {
      span.end();
    }
  }
}

const app = new App();
app.initialize();
```

## Browser-Specific Considerations

### Performance Considerations

Browser tracing can impact performance. Use these optimizations:

```javascript
// Optimized tracing configuration
import { BatchSpanProcessor } from '@opentelemetry/sdk-web';
import { TraceIdRatioBasedSampler, AlwaysOnSampler } from '@opentelemetry/sdk-web';

const isProduction = process.env.NODE_ENV === 'production';

const provider = new WebTracerProvider({
  resource: resource,
  sampler: isProduction 
    ? new TraceIdRatioBasedSampler(0.1)  // 10% sampling in production
    : new AlwaysOnSampler(),             // 100% in development
});

const exporter = new OTLPTraceExporter({
  url: getTraceEndpoint(),
});

// Optimize batch processing
provider.addSpanProcessor(new BatchSpanProcessor(exporter, {
  maxExportBatchSize: 512,
  maxQueueSize: 2048,
  scheduledDelayMillis: 5000,
  exportTimeoutMillis: 30000,
}));
```

### Security Considerations

- Never expose sensitive data in span attributes
- Be careful with user inputs in span names
- Consider sampling rates for high-traffic applications

```javascript
// Safe attribute setting
const safeSetAttributes = (span, attributes) => {
  const safeAttributes = {};
  
  for (const [key, value] of Object.entries(attributes)) {
    // Filter out sensitive data
    if (key.includes('password') || key.includes('token') || key.includes('secret')) {
      safeAttributes[key] = '[REDACTED]';
    } else if (typeof value === 'string' && value.length > 100) {
      safeAttributes[key] = value.substring(0, 100) + '...';
    } else {
      safeAttributes[key] = value;
    }
  }
  
  span.setAttributes(safeAttributes);
};
```

### Error Handling

Implement proper error handling to avoid breaking your application:

```javascript
// Safe tracing wrapper
const safeTrace = async (spanName, operation, attributes = {}) => {
  let span;
  
  try {
    span = tracer.startSpan(spanName);
    span.setAttributes(attributes);
    
    const result = await operation();
    span?.setStatus({ code: 1 });
    return result;
  } catch (error) {
    // Don't let tracing errors break the application
    try {
      span?.recordException(error);
      span?.setStatus({ code: 2, message: error.message });
    } catch (tracingError) {
      console.warn('Tracing error:', tracingError);
    }
    throw error;
  } finally {
    try {
      span?.end();
    } catch (tracingError) {
      console.warn('Tracing cleanup error:', tracingError);
    }
  }
};
```

### Development vs Production

Use different configurations for different environments:

```javascript
// Environment-specific configuration
const getTracingConfig = () => {
  const isProduction = process.env.NODE_ENV === 'production';
  const isDevelopment = process.env.NODE_ENV === 'development';
  
  return {
    serviceName: process.env.REACT_APP_SERVICE_NAME || 'frontend-app',
    serviceVersion: process.env.REACT_APP_VERSION || 'dev',
    environment: process.env.NODE_ENV || 'development',
    endpoint: isDevelopment 
      ? '/v1/traces'  // Development proxy
      : '/v1/traces', // Production proxy
    samplingRate: isProduction ? 0.01 : 1.0,
    debug: isDevelopment,
  };
};

// Apply configuration
const config = getTracingConfig();

if (config.debug) {
  import('@opentelemetry/api').then(({ diag, DiagConsoleLogger, DiagLogLevel }) => {
    diag.setLogger(new DiagConsoleLogger(), DiagLogLevel.DEBUG);
  });
}
```

## Connecting Frontend to Backend Traces

To connect your frontend traces with backend traces, ensure trace context propagation works correctly:

```javascript
// Auto-instrumentation handles this automatically for fetch and XMLHttpRequest
const fetchUserData = async (userId) => {
  const span = tracer.startSpan('fetch-user-data');
  span.setAttributes({ 'user.id': userId });

  try {
    // OpenTelemetry auto-instrumentation will automatically
    // add trace context headers (traceparent, tracestate) to this request
    const response = await fetch(`/api/users/${userId}`);
    const data = await response.json();
    
    span.setAttributes({
      'http.status_code': response.status,
      'http.url': response.url
    });
    
    return data;
  } finally {
    span.end();
  }
};

// Manual header propagation (if needed)
import { propagation, context } from '@opentelemetry/api';

const fetchWithManualPropagation = async (url, options = {}) => {
  const headers = {};
  
  // Inject current trace context into headers
  propagation.inject(context.active(), headers);
  
  return fetch(url, {
    ...options,
    headers: {
      ...options.headers,
      ...headers,
    },
  });
};
```

## Troubleshooting

### Common Issues

No traces appearing in Sematext:

- Verify your proxy configuration is working
- Check browser developer console for network errors
- Ensure the Sematext Agent is running and accessible
- Check sampling rate isn't too low

CORS errors:

- Verify your proxy is handling CORS headers correctly
- Check that OPTIONS requests are handled properly

High performance impact:

- Reduce sampling rate in production
- Optimize batch span processor settings
- Disable unused auto-instrumentations

Proxy not working:

- Check proxy configuration in your build tool
- Verify the agent endpoint is accessible
- Test the proxy endpoint directly

### Debug Mode

Enable debug logging to troubleshoot issues:

```javascript
// Enable debug logging (development only)
if (process.env.NODE_ENV === 'development') {
  import('@opentelemetry/api').then(({ diag, DiagConsoleLogger, DiagLogLevel }) => {
    diag.setLogger(new DiagConsoleLogger(), DiagLogLevel.DEBUG);
  });
}
```

### Testing Your Setup

Create a simple test to verify tracing is working:

```javascript
// test-tracing.js
import { trace } from '@opentelemetry/api';

const tracer = trace.getTracer('test-app');

const testTracing = () => {
  const span = tracer.startSpan('test-span');
  
  span.setAttributes({
    'test.name': 'tracing-setup-test',
    'test.timestamp': Date.now()
  });
  
  console.log('Test span created:', span);
  
  setTimeout(() => {
    span.end();
    console.log('Test span ended');
  }, 100);
};

// Run test after page load
window.addEventListener('load', testTracing);
```

## Best Practices

### Span Naming
- Use descriptive, consistent naming: `load-user-profile`, `submit-order-form`
- Include the action and context: `user-interaction.button-click`, `api-call.fetch-products`

### Attribute Guidelines
- Add meaningful context: component name, user ID, feature flags
- Don't include sensitive information
- Use consistent attribute naming across your application

### Performance Tips
- Use appropriate sampling rates for your traffic volume
- Batch span processing for better performance
- Only instrument critical user journeys in high-traffic apps

### Error Handling
- Always wrap tracing code in try-catch blocks
- Don't let tracing errors break your application
- Log tracing errors for debugging

## Next Steps

- [View your traces in Traces Explorer](/docs/tracing/reports/explorer/)
- [Set up alerts for frontend performance](/docs/tracing/alerts/creating-alerts/)
- [Configure sampling strategies](/docs/tracing/sampling/)
- [Connect with backend services](/docs/tracing/sdks/nodejs/)

## Related Documentation

- [Getting Started with Tracing](/docs/tracing/getting-started/)
- [Sematext Agent OpenTelemetry Configuration](/docs/agents/sematext-agent/opentelemetry/)
- [Node.js SDK (for backend APIs)](/docs/tracing/sdks/nodejs/)
- [Troubleshooting Guide](/docs/tracing/troubleshooting/)
