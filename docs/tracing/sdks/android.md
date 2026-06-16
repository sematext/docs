title: Android OpenTelemetry SDK for Sematext Tracing
description: Complete guide to instrumenting Android applications with OpenTelemetry for Sematext Tracing

## Android OpenTelemetry SDK

This guide covers how to instrument Android applications with OpenTelemetry to send traces to Sematext Tracing.

## Instrumentation Approach

Android supports **both auto and manual instrumentation**:

- **Auto-instrumentation**: The OpenTelemetry Android agent automatically instruments popular libraries like OkHttp, Retrofit, and Room database without code changes
- **Manual instrumentation**: Add custom spans for business logic, user interactions, and specific application flows

Most Android applications benefit from combining both approaches - auto-instrumentation for standard libraries and manual instrumentation for custom business logic.

## Prerequisites

- A Sematext Tracing App ([create one here](/docs/tracing/create-tracing-app/)) and its token
- Android API level 21+ (Android 5.0 Lollipop or higher)
- Gradle 7.0 or higher
- Kotlin 1.6+ or Java 8+

## Installation

### 1. Add Dependencies

Add the following to your app's `build.gradle` (or `build.gradle.kts` for Kotlin DSL):

**Groovy (build.gradle):**
```groovy
dependencies {
    implementation 'io.opentelemetry:opentelemetry-api:1.32.0'
    implementation 'io.opentelemetry:opentelemetry-sdk:1.32.0'
    implementation 'io.opentelemetry:opentelemetry-exporter-otlp:1.32.0'
    implementation 'io.opentelemetry.android:android-agent:0.4.0'
    implementation 'io.opentelemetry.instrumentation:opentelemetry-okhttp-3.0:1.32.0-alpha'
}
```

**Kotlin DSL (build.gradle.kts):**
```kotlin
dependencies {
    implementation("io.opentelemetry:opentelemetry-api:1.32.0")
    implementation("io.opentelemetry:opentelemetry-sdk:1.32.0")
    implementation("io.opentelemetry:opentelemetry-exporter-otlp:1.32.0")
    implementation("io.opentelemetry.android:android-agent:0.4.0")
    implementation("io.opentelemetry.instrumentation:opentelemetry-okhttp-3.0:1.32.0-alpha")
}
```

### 2. Network Permissions

Add the following permission to your `AndroidManifest.xml`:

```xml
<uses-permission android:name="android.permission.INTERNET" />
```

## Basic Configuration

### 1. Initialize OpenTelemetry in Your Application Class

Create or update your Application class:

**Kotlin:**
```kotlin
import android.app.Application
import io.opentelemetry.android.OpenTelemetryRum
import io.opentelemetry.android.config.OtelRumConfig
import io.opentelemetry.api.common.Attributes
import io.opentelemetry.api.trace.Tracer
import io.opentelemetry.exporter.otlp.trace.OtlpGrpcSpanExporter
import io.opentelemetry.sdk.OpenTelemetrySdk
import io.opentelemetry.sdk.resources.Resource
import io.opentelemetry.sdk.trace.SdkTracerProvider
import io.opentelemetry.sdk.trace.export.BatchSpanProcessor
import io.opentelemetry.semconv.resource.attributes.ResourceAttributes

class MyApplication : Application() {
    
    companion object {
        lateinit var tracer: Tracer
            private set
    }
    
    override fun onCreate() {
        super.onCreate()
        initializeOpenTelemetry()
    }
    
    private fun initializeOpenTelemetry() {
        // Configure resource with service information
        val resource = Resource.getDefault()
            .merge(Resource.create(
                Attributes.builder()
                    .put(ResourceAttributes.SERVICE_NAME, "my-android-app")
                    .put(ResourceAttributes.SERVICE_VERSION, BuildConfig.VERSION_NAME)
                    .put("environment", if (BuildConfig.DEBUG) "development" else "production")
                    .build()
            ))
        
        // Ship traces directly to the Sematext managed OTLP receiver.
        // Mobile apps aren't subject to browser CORS rules, so no agent or proxy is needed.
        // US gRPC endpoint shown; EU: https://otlp-receiver-grpc.eu.sematext.com:443
        val spanExporter = OtlpGrpcSpanExporter.builder()
            .setEndpoint("https://otlp-receiver-grpc.sematext.com:443")
            .addHeader("Authorization", "Bearer your-api-key")
            .build()
        
        // Build the tracer provider
        val tracerProvider = SdkTracerProvider.builder()
            .setResource(resource)
            .addSpanProcessor(BatchSpanProcessor.builder(spanExporter).build())
            .build()
        
        // Initialize OpenTelemetry SDK
        val openTelemetry = OpenTelemetrySdk.builder()
            .setTracerProvider(tracerProvider)
            .buildAndRegisterGlobal()
        
        // Get tracer for application use
        tracer = openTelemetry.getTracer("my-android-app")
        
        // Optional: Initialize RUM (Real User Monitoring) features
        val rumConfig = OtelRumConfig()
            .setGlobalAttributes(
                Attributes.builder()
                    .put("app.name", "my-android-app")
                    .put("app.version", BuildConfig.VERSION_NAME)
                    .build()
            )
        
        OpenTelemetryRum.builder(this, rumConfig)
            .setOpenTelemetry(openTelemetry)
            .build()
    }
}
```

**Java:**
```java
import android.app.Application;
import io.opentelemetry.api.common.Attributes;
import io.opentelemetry.api.trace.Tracer;
import io.opentelemetry.exporter.otlp.trace.OtlpGrpcSpanExporter;
import io.opentelemetry.sdk.OpenTelemetrySdk;
import io.opentelemetry.sdk.resources.Resource;
import io.opentelemetry.sdk.trace.SdkTracerProvider;
import io.opentelemetry.sdk.trace.export.BatchSpanProcessor;
import io.opentelemetry.semconv.resource.attributes.ResourceAttributes;

public class MyApplication extends Application {
    
    private static Tracer tracer;
    
    public static Tracer getTracer() {
        return tracer;
    }
    
    @Override
    public void onCreate() {
        super.onCreate();
        initializeOpenTelemetry();
    }
    
    private void initializeOpenTelemetry() {
        // Configure resource
        Resource resource = Resource.getDefault()
            .merge(Resource.create(
                Attributes.builder()
                    .put(ResourceAttributes.SERVICE_NAME, "my-android-app")
                    .put(ResourceAttributes.SERVICE_VERSION, BuildConfig.VERSION_NAME)
                    .put("environment", BuildConfig.DEBUG ? "development" : "production")
                    .build()
            ));
        
        // Ship traces directly to the Sematext managed OTLP receiver (no agent or proxy needed).
        // US gRPC endpoint shown; EU: https://otlp-receiver-grpc.eu.sematext.com:443
        OtlpGrpcSpanExporter spanExporter = OtlpGrpcSpanExporter.builder()
            .setEndpoint("https://otlp-receiver-grpc.sematext.com:443")
            .addHeader("Authorization", "Bearer your-api-key")
            .build();
        
        // Build tracer provider
        SdkTracerProvider tracerProvider = SdkTracerProvider.builder()
            .setResource(resource)
            .addSpanProcessor(BatchSpanProcessor.builder(spanExporter).build())
            .build();
        
        // Initialize SDK
        OpenTelemetrySdk openTelemetry = OpenTelemetrySdk.builder()
            .setTracerProvider(tracerProvider)
            .buildAndRegisterGlobal();
        
        tracer = openTelemetry.getTracer("my-android-app");
    }
}
```

### 2. Update AndroidManifest.xml

Register your custom Application class:

```xml
<application
    android:name=".MyApplication"
    android:icon="@mipmap/ic_launcher"
    android:label="@string/app_name"
    ...>
    <!-- Your activities and other components -->
</application>
```

## What's Automatically Instrumented

Once configured, the OpenTelemetry Android agent automatically traces:

- **OkHttp**: All HTTP requests and responses
- **Retrofit**: REST API calls built on OkHttp
- **Room Database**: Database queries and transactions
- **Android Activity**: Basic activity lifecycle events
- **Android Fragment**: Fragment lifecycle events

These automatic traces appear without any additional code. You only need manual instrumentation for custom business logic and specific user interactions.

## Manual Instrumentation Examples

While auto-instrumentation handles standard libraries automatically, you'll need manual instrumentation for custom business logic, UI interactions, and specific application flows. Here are common patterns:

### Activity Lifecycle Tracing (Manual)

**Kotlin:**
```kotlin
import android.os.Bundle
import androidx.appcompat.app.AppCompatActivity
import io.opentelemetry.api.trace.Span
import io.opentelemetry.context.Scope

class MainActivity : AppCompatActivity() {
    
    private var activitySpan: Span? = null
    private var scope: Scope? = null
    
    override fun onCreate(savedInstanceState: Bundle?) {
        super.onCreate(savedInstanceState)
        
        // Start span for activity creation
        activitySpan = MyApplication.tracer
            .spanBuilder("MainActivity.onCreate")
            .startSpan()
        scope = activitySpan?.makeCurrent()
        
        try {
            setContentView(R.layout.activity_main)
            // Your initialization code
            
            activitySpan?.setAttribute("screen.name", "main")
            activitySpan?.setAttribute("user.id", getUserId())
            
        } catch (e: Exception) {
            activitySpan?.recordException(e)
            throw e
        }
    }
    
    override fun onResume() {
        super.onResume()
        
        val span = MyApplication.tracer
            .spanBuilder("MainActivity.onResume")
            .startSpan()
        
        try {
            // Your resume logic
        } finally {
            span.end()
        }
    }
    
    override fun onDestroy() {
        super.onDestroy()
        scope?.close()
        activitySpan?.end()
    }
}
```

### Network Request Tracing

OkHttp is automatically instrumented, but you can add custom spans around network calls for additional context:

```kotlin
import okhttp3.OkHttpClient
import io.opentelemetry.instrumentation.okhttp.v3_0.OkHttpTelemetry

class NetworkService {
    
    private val client: OkHttpClient = OkHttpTelemetry.builder(
        MyApplication.tracer.tracerProvider
    ).build().newCallFactory(OkHttpClient())
    
    suspend fun fetchData(url: String): String {
        val request = Request.Builder()
            .url(url)
            .build()
        
        val span = MyApplication.tracer
            .spanBuilder("fetch-data")
            .setAttribute("http.url", url)
            .startSpan()
        
        return try {
            val response = client.newCall(request).execute()
            span.setAttribute("http.status_code", response.code.toLong())
            response.body?.string() ?: ""
        } catch (e: Exception) {
            span.recordException(e)
            throw e
        } finally {
            span.end()
        }
    }
}
```

### User Interaction Tracing (Manual)

```kotlin
class UserInteractionTracker {
    
    fun trackButtonClick(buttonName: String) {
        val span = MyApplication.tracer
            .spanBuilder("button-click")
            .setAttribute("button.name", buttonName)
            .setAttribute("screen.name", getCurrentScreen())
            .startSpan()
        
        try {
            // Process click
        } finally {
            span.end()
        }
    }
    
    fun trackUserAction(action: String, attributes: Map<String, String>) {
        val span = MyApplication.tracer
            .spanBuilder("user-action")
            .setAttribute("action.type", action)
            .startSpan()
        
        attributes.forEach { (key, value) ->
            span.setAttribute(key, value)
        }
        
        span.end()
    }
}
```

## Sending Traces to Sematext

Android apps ship spans straight to the Sematext [managed OTLP endpoint](/docs/guide/managed-otlp-endpoint/) over HTTPS — no Sematext Agent and no backend proxy required. Authenticate with your Tracing App token (shown in the exporter config above), and pick the endpoint for your account region:

| Region | gRPC endpoint | HTTP endpoint |
|---|---|---|
| US | `https://otlp-receiver-grpc.sematext.com:443` | `https://otlp-receiver.sematext.com` |
| EU | `https://otlp-receiver-grpc.eu.sematext.com:443` | `https://otlp-receiver.eu.sematext.com` |

!!! warning "Region matters"
    Tokens are region-bound. A US-region token sent to the EU endpoint (or vice versa) silently drops data. Match the endpoint to the region of the Sematext Cloud account that owns your App.

## Performance Considerations

### Sampling

Configure sampling to reduce overhead:

```kotlin
import io.opentelemetry.sdk.trace.samplers.Sampler

val tracerProvider = SdkTracerProvider.builder()
    .setSampler(Sampler.traceIdRatioBased(0.1))  // Sample 10% of traces
    .build()
```

### Batch Processing

Configure batch processing for efficient network usage:

```kotlin
val batchProcessor = BatchSpanProcessor.builder(spanExporter)
    .setScheduleDelay(5000, TimeUnit.MILLISECONDS)  // Send every 5 seconds
    .setMaxQueueSize(2048)  // Maximum spans to queue
    .setMaxExportBatchSize(512)  // Maximum batch size
    .build()
```

### Background vs Foreground

Adjust tracing based on app state:

```kotlin
class AppLifecycleObserver : DefaultLifecycleObserver {
    
    override fun onStart(owner: LifecycleOwner) {
        // App in foreground - enable full tracing
        updateSamplingRate(0.1)
    }
    
    override fun onStop(owner: LifecycleOwner) {
        // App in background - reduce tracing
        updateSamplingRate(0.01)
    }
}
```

## Best Practices

### Privacy and Security

- Never include sensitive user data in traces (passwords, tokens, PII)
- Use HTTPS for all trace exports
- Consider data residency requirements

### Mobile-Specific Attributes

Add mobile-specific context to your traces:

```kotlin
span.setAttribute("device.manufacturer", Build.MANUFACTURER)
span.setAttribute("device.model", Build.MODEL)
span.setAttribute("os.version", Build.VERSION.RELEASE)
span.setAttribute("app.version", BuildConfig.VERSION_NAME)
span.setAttribute("network.type", getNetworkType())
span.setAttribute("battery.level", getBatteryLevel())
```

### Error Handling

```kotlin
try {
    // Your operation
} catch (e: Exception) {
    span.recordException(e)
    span.setStatus(StatusCode.ERROR, e.message ?: "Unknown error")
    // Handle error appropriately
} finally {
    span.end()
}
```

## Troubleshooting

### Common Issues

No Traces Appearing:

- Confirm the OTLP endpoint region matches your account (US vs EU)
- Verify the auth header carries a valid Tracing App token
- Check network permissions in AndroidManifest.xml
- Ensure the Application class is registered

High Battery Usage:

- Reduce sampling rate
- Increase batch delay
- Disable tracing in background

Memory Issues:

- Reduce max queue size
- Implement proper span lifecycle management
- Use try-finally blocks to ensure spans are ended

### Debug Logging

Enable debug logging for troubleshooting:

```kotlin
// Add to your Application class
if (BuildConfig.DEBUG) {
    OpenTelemetry.setGlobalLoggerProvider(
        LoggerProvider { name ->
            object : Logger {
                override fun log(level: Level, message: String) {
                    Log.d("OTel-$name", message)
                }
            }
        }
    )
}
```

## Next Steps

- [Managed OTLP Endpoint](/docs/guide/managed-otlp-endpoint/)
- [Set up alerts](/docs/tracing/alerts/creating-alerts/)
- [Explore traces](/docs/tracing/reports/explorer/)
- [iOS/Swift SDK](/docs/tracing/sdks/ios-swift/)

## Related Documentation

- [OpenTelemetry Android Documentation](https://github.com/open-telemetry/opentelemetry-android)
- [OpenTelemetry Java Documentation](https://opentelemetry.io/docs/instrumentation/java/)
- [Mobile Application Monitoring Best Practices](https://opentelemetry.io/docs/reference/specification/trace/semantic_conventions/http/)