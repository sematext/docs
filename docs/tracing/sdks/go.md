title: Go OpenTelemetry SDK for Sematext Tracing
description: Complete guide to instrumenting Go applications with OpenTelemetry for Sematext Tracing

## Go OpenTelemetry SDK

This guide covers how to instrument Go applications with OpenTelemetry and send telemetry to Sematext: traces to the Tracing App, [metrics](#metrics) to the Monitoring App, and [logs](#logs) to the Logs App.

## Instrumentation Options

Go compiles to a static binary, so there is no runtime agent that attaches to a running process the way there is for Java or Node.js. Instrumentation happens in one of three places instead:

| Approach | Code changes | Notes |
|---|---|---|
| **SDK + instrumentation libraries** (this guide) | Yes | The stable, mainstream path. Full control over spans, metrics and logs. |
| **Compile-time** ([`otelc`](https://github.com/open-telemetry/opentelemetry-go-compile-instrumentation)) | None | Instrumentation woven in during `go build`. No runtime overhead, no privileged container. |
| **eBPF** ([OBI](https://opentelemetry.io/docs/zero-code/obi/)) | None | Watches the kernel; no rebuild needed. Linux only, requires privileged containers, and is still `v0`. |

This guide covers the SDK approach, which is what you want when you need spans around your own business logic or correlated logs. For runnable examples of all three, see the [Sematext OTel onboarding examples](https://github.com/sematext/sematext-otel-onboarding/tree/main/go).

## Installation

### 1. Install Dependencies

```bash
go mod init your-service
go get go.opentelemetry.io/otel
go get go.opentelemetry.io/otel/sdk
go get go.opentelemetry.io/otel/exporters/otlp/otlptrace/otlptracehttp
```

### 2. Basic Setup

```go
package main

import (
    "context"
    "log"

    "go.opentelemetry.io/otel"
    "go.opentelemetry.io/otel/exporters/otlp/otlptrace/otlptracehttp"
    "go.opentelemetry.io/otel/sdk/resource"
    sdktrace "go.opentelemetry.io/otel/sdk/trace"
    semconv "go.opentelemetry.io/otel/semconv/v1.27.0"
)

func initTracer() func(context.Context) error {
    ctx := context.Background()

    // Endpoint, headers and protocol are also readable from the standard
    // OTEL_EXPORTER_OTLP_* environment variables — see Configuration below.
    exporter, err := otlptracehttp.New(ctx,
        otlptracehttp.WithEndpointURL("http://localhost:4338"),
    )
    if err != nil {
        log.Fatalf("Failed to create exporter: %v", err)
    }

    res, err := resource.New(ctx,
        resource.WithFromEnv(),
        resource.WithTelemetrySDK(),
        resource.WithAttributes(
            semconv.ServiceName("your-service-name"),
            semconv.ServiceVersion("1.0.0"),
            semconv.DeploymentEnvironmentName("production"),
        ),
    )
    if err != nil {
        log.Fatalf("Failed to create resource: %v", err)
    }

    tracerProvider := sdktrace.NewTracerProvider(
        sdktrace.WithBatcher(exporter),
        sdktrace.WithResource(res),
    )

    otel.SetTracerProvider(tracerProvider)

    return tracerProvider.Shutdown
}

func main() {
    shutdown := initTracer()
    defer func() {
        if err := shutdown(context.Background()); err != nil {
            log.Printf("Failed to shutdown TracerProvider: %v", err)
        }
    }()

    // Your application code here
}
```

> **Note**: the tracer provider lives in `go.opentelemetry.io/otel/sdk/trace`, not `go.opentelemetry.io/otel/sdk` (which only carries a version constant). `WithEndpointURL` takes a full URL; the older `WithEndpoint` expects a bare `host:port` with no scheme.

## Framework Integration

### Gin Framework

```bash
go get go.opentelemetry.io/contrib/instrumentation/github.com/gin-gonic/gin/otelgin
```

```go
package main

import (
    "context"
    "net/http"
    
    "github.com/gin-gonic/gin"
    "go.opentelemetry.io/contrib/instrumentation/github.com/gin-gonic/gin/otelgin"
    "go.opentelemetry.io/otel"
    "go.opentelemetry.io/otel/attribute"
    "go.opentelemetry.io/otel/codes"
)

func main() {
    shutdown := initTracer()
    defer shutdown(context.Background())
    
    r := gin.Default()
    
    // Add OpenTelemetry middleware
    r.Use(otelgin.Middleware("your-service-name"))
    
    r.GET("/users/:id", getUserHandler)
    
    r.Run(":8080")
}

func getUserHandler(c *gin.Context) {
    ctx := c.Request.Context()
    tracer := otel.Tracer("user-service")
    
    ctx, span := tracer.Start(ctx, "get-user-handler")
    defer span.End()
    
    userID := c.Param("id")
    span.SetAttributes(
        attribute.String("user.id", userID),
        attribute.String("http.method", c.Request.Method),
        attribute.String("http.route", c.FullPath()),
    )
    
    // Your business logic
    user, err := fetchUser(ctx, userID)
    if err != nil {
        span.RecordError(err)
        span.SetStatus(codes.Error, err.Error())
        c.JSON(http.StatusInternalServerError, gin.H{"error": "Internal server error"})
        return
    }
    
    span.SetAttributes(attribute.String("user.name", user.Name))
    c.JSON(http.StatusOK, gin.H{"user": user})
}

type User struct {
    ID   string `json:"id"`
    Name string `json:"name"`
}

func fetchUser(ctx context.Context, userID string) (*User, error) {
    tracer := otel.Tracer("user-service")
    
    ctx, span := tracer.Start(ctx, "fetch-user-db")
    defer span.End()
    
    span.SetAttributes(
        attribute.String("user.id", userID),
        attribute.String("database.operation", "SELECT"),
    )
    
    // Simulate database operation
    user := &User{
        ID:   userID,
        Name: "John Doe",
    }
    
    return user, nil
}
```

### Echo Framework

```bash
go get go.opentelemetry.io/contrib/instrumentation/github.com/labstack/echo/otelecho
```

```go
package main

import (
    "context"
    "net/http"
    
    "github.com/labstack/echo/v4"
    "go.opentelemetry.io/contrib/instrumentation/github.com/labstack/echo/otelecho"
    "go.opentelemetry.io/otel"
    "go.opentelemetry.io/otel/attribute"
)

func main() {
    shutdown := initTracer()
    defer shutdown(context.Background())
    
    e := echo.New()
    
    // Add OpenTelemetry middleware
    e.Use(otelecho.Middleware("your-service-name"))
    
    e.GET("/users/:id", getUserEcho)
    
    e.Logger.Fatal(e.Start(":8080"))
}

func getUserEcho(c echo.Context) error {
    ctx := c.Request().Context()
    tracer := otel.Tracer("user-service")
    
    ctx, span := tracer.Start(ctx, "get-user-echo")
    defer span.End()
    
    userID := c.Param("id")
    span.SetAttributes(
        attribute.String("user.id", userID),
        attribute.String("http.method", c.Request().Method),
    )
    
    user, err := fetchUser(ctx, userID)
    if err != nil {
        span.RecordError(err)
        return c.JSON(http.StatusInternalServerError, map[string]string{"error": "Internal server error"})
    }
    
    return c.JSON(http.StatusOK, map[string]interface{}{"user": user})
}
```

### HTTP Client and Server

```bash
go get go.opentelemetry.io/contrib/instrumentation/net/http/otelhttp
```

```go
package main

import (
    "context"
    "fmt"
    "net/http"
    
    "go.opentelemetry.io/contrib/instrumentation/net/http/otelhttp"
    "go.opentelemetry.io/otel"
    "go.opentelemetry.io/otel/attribute"
)

func main() {
    shutdown := initTracer()
    defer shutdown(context.Background())
    
    // HTTP Server with tracing
    mux := http.NewServeMux()
    mux.HandleFunc("/users/", userHandler)
    
    handler := otelhttp.NewHandler(mux, "user-server")
    
    fmt.Println("Server starting on :8080")
    http.ListenAndServe(":8080", handler)
}

func userHandler(w http.ResponseWriter, r *http.Request) {
    ctx := r.Context()
    tracer := otel.Tracer("user-service")
    
    ctx, span := tracer.Start(ctx, "user-handler")
    defer span.End()
    
    userID := r.URL.Path[len("/users/"):]
    span.SetAttributes(
        attribute.String("user.id", userID),
        attribute.String("http.method", r.Method),
    )
    
    // Make HTTP request to another service
    err := callExternalAPI(ctx, userID)
    if err != nil {
        span.RecordError(err)
        http.Error(w, "Internal server error", http.StatusInternalServerError)
        return
    }
    
    w.Header().Set("Content-Type", "application/json")
    fmt.Fprintf(w, `{"user_id": "%s", "name": "John Doe"}`, userID)
}

func callExternalAPI(ctx context.Context, userID string) error {
    // HTTP Client with tracing
    client := http.Client{
        Transport: otelhttp.NewTransport(http.DefaultTransport),
    }
    
    tracer := otel.Tracer("user-service")
    ctx, span := tracer.Start(ctx, "external-api-call")
    defer span.End()
    
    span.SetAttributes(
        attribute.String("user.id", userID),
        attribute.String("external.service", "user-profile-api"),
    )
    
    req, err := http.NewRequestWithContext(ctx, "GET", 
        fmt.Sprintf("http://api.example.com/profiles/%s", userID), nil)
    if err != nil {
        return err
    }
    
    resp, err := client.Do(req)
    if err != nil {
        return err
    }
    defer resp.Body.Close()
    
    span.SetAttributes(attribute.Int("http.status_code", resp.StatusCode))
    return nil
}
```

## Database Instrumentation

### SQL Database

There is no `otelsql` package under `go.opentelemetry.io/contrib`. The widely used community driver wrapper is [`github.com/XSAM/otelsql`](https://github.com/XSAM/otelsql):

```bash
go get github.com/XSAM/otelsql
go get github.com/lib/pq # for PostgreSQL
```

```go
package main

import (
    "context"
    "database/sql"

    "github.com/XSAM/otelsql"
    _ "github.com/lib/pq"
    "go.opentelemetry.io/otel"
    "go.opentelemetry.io/otel/attribute"
    semconv "go.opentelemetry.io/otel/semconv/v1.27.0"
)

func initDB() (*sql.DB, error) {
    // otelsql.Open wraps the driver so every query produces a span.
    db, err := otelsql.Open("postgres",
        "postgresql://user:password@localhost/dbname?sslmode=disable",
        otelsql.WithAttributes(semconv.DBSystemPostgreSQL),
    )
    if err != nil {
        return nil, err
    }

    // Optional: also export connection-pool metrics.
    if _, err := otelsql.RegisterDBStatsMetrics(db,
        otelsql.WithAttributes(semconv.DBSystemPostgreSQL),
    ); err != nil {
        return nil, err
    }

    return db, nil
}

func fetchUserFromDB(ctx context.Context, db *sql.DB, userID string) (*User, error) {
    tracer := otel.Tracer("user-service")
    
    ctx, span := tracer.Start(ctx, "fetch-user-query")
    defer span.End()
    
    span.SetAttributes(
        attribute.String("user.id", userID),
        attribute.String("db.operation", "SELECT"),
        attribute.String("db.table", "users"),
    )
    
    var user User
    err := db.QueryRowContext(ctx, "SELECT id, name FROM users WHERE id = $1", userID).
        Scan(&user.ID, &user.Name)
    
    if err != nil {
        span.RecordError(err)
        return nil, err
    }
    
    return &user, nil
}
```

### Redis

`go-redis` ships its own OpenTelemetry integration as `redisotel`. Use the `v9` client — `go-redis/v8` and the old contrib `otelredis` package are superseded:

```bash
go get github.com/redis/go-redis/v9
go get github.com/redis/go-redis/extra/redisotel/v9
```

```go
package main

import (
    "context"
    "fmt"

    "github.com/redis/go-redis/extra/redisotel/v9"
    "github.com/redis/go-redis/v9"
    "go.opentelemetry.io/otel"
    "go.opentelemetry.io/otel/attribute"
)

func initRedis() (*redis.Client, error) {
    rdb := redis.NewClient(&redis.Options{
        Addr: "localhost:6379",
    })

    // Instrument commands with traces, and optionally metrics.
    if err := redisotel.InstrumentTracing(rdb); err != nil {
        return nil, err
    }
    if err := redisotel.InstrumentMetrics(rdb); err != nil {
        return nil, err
    }

    return rdb, nil
}

func cacheUser(ctx context.Context, rdb *redis.Client, userID string, user *User) error {
    tracer := otel.Tracer("user-service")

    ctx, span := tracer.Start(ctx, "cache-user")
    defer span.End()

    span.SetAttributes(
        attribute.String("user.id", userID),
        attribute.String("cache.operation", "SET"),
    )

    return rdb.Set(ctx, fmt.Sprintf("user:%s", userID), user, 0).Err()
}
```

## Manual Instrumentation

### Creating Spans

```go
import (
    "context"
    "fmt"

    "go.opentelemetry.io/otel"
    "go.opentelemetry.io/otel/attribute"
    "go.opentelemetry.io/otel/codes"
    "go.opentelemetry.io/otel/trace"
)

func businessOperation(ctx context.Context, data string) error {
    tracer := otel.Tracer("business-service")
    
    ctx, span := tracer.Start(ctx, "business-operation")
    defer span.End()
    
    // Add attributes
    span.SetAttributes(
        attribute.String("operation.type", "data-processing"),
        attribute.String("input.data", data),
    )
    
    // Do work
    result, err := processData(ctx, data)
    if err != nil {
        span.RecordError(err)
        span.SetStatus(codes.Error, err.Error())
        return err
    }
    
    // Add result attributes
    span.SetAttributes(
        attribute.Int("result.count", len(result)),
        attribute.Bool("operation.success", true),
    )
    
    span.SetStatus(codes.Ok, "Operation completed successfully")
    return nil
}

func processData(ctx context.Context, data string) ([]string, error) {
    tracer := otel.Tracer("business-service")
    
    ctx, span := tracer.Start(ctx, "process-data")
    defer span.End()
    
    span.SetAttributes(
        attribute.String("input.length", fmt.Sprintf("%d", len(data))),
    )
    
    // Add events to the span
    span.AddEvent("Starting data processing")
    
    // Simulate processing
    result := []string{"processed", "data"}
    
    span.AddEvent("Data processing completed", 
        trace.WithAttributes(
            attribute.Int("result.items", len(result)),
        ))
    
    return result, nil
}
```

### Context Propagation

```go
import (
    "context"

    "go.opentelemetry.io/otel"
    "go.opentelemetry.io/otel/attribute"
)

func parentOperation(ctx context.Context) error {
    tracer := otel.Tracer("service")
    
    ctx, span := tracer.Start(ctx, "parent-operation")
    defer span.End()
    
    // Call child operation with context
    return childOperation(ctx)
}

func childOperation(ctx context.Context) error {
    tracer := otel.Tracer("service")
    
    // This will be a child span of parent-operation
    ctx, span := tracer.Start(ctx, "child-operation")
    defer span.End()
    
    span.SetAttributes(attribute.String("child.id", "123"))
    
    return nil
}
```

## Metrics

Traces answer "what happened in this request". Metrics answer "how is the service behaving overall", and feed the Sematext Monitoring App.

```bash
go get go.opentelemetry.io/otel/exporters/otlp/otlpmetric/otlpmetrichttp
```

### Meter Provider Setup

```go
package main

import (
    "context"
    "log"
    "time"

    "go.opentelemetry.io/otel"
    "go.opentelemetry.io/otel/exporters/otlp/otlpmetric/otlpmetrichttp"
    sdkmetric "go.opentelemetry.io/otel/sdk/metric"
    "go.opentelemetry.io/otel/sdk/resource"
)

func initMeter(res *resource.Resource) func(context.Context) error {
    ctx := context.Background()

    // Note the port: the Sematext Agent listens for metrics on 4318,
    // separately from traces on 4338.
    exporter, err := otlpmetrichttp.New(ctx,
        otlpmetrichttp.WithEndpointURL("http://localhost:4318"),
    )
    if err != nil {
        log.Fatalf("Failed to create metric exporter: %v", err)
    }

    provider := sdkmetric.NewMeterProvider(
        sdkmetric.WithResource(res),
        sdkmetric.WithReader(sdkmetric.NewPeriodicReader(exporter,
            sdkmetric.WithInterval(30*time.Second),
        )),
    )

    otel.SetMeterProvider(provider)
    return provider.Shutdown
}
```

### Creating Metrics

Create instruments once at startup and reuse them — creating one per request is a common and costly mistake.

```go
package main

import (
    "context"
    "time"

    "go.opentelemetry.io/otel"
    "go.opentelemetry.io/otel/attribute"
    "go.opentelemetry.io/otel/metric"
)

var (
    requestCount    metric.Int64Counter
    requestDuration metric.Float64Histogram
    activeRequests  metric.Int64UpDownCounter
)

func initMetrics() error {
    meter := otel.Meter("my-go-service")

    var err error
    if requestCount, err = meter.Int64Counter("app.requests",
        metric.WithDescription("Total requests handled"),
        metric.WithUnit("{request}"),
    ); err != nil {
        return err
    }
    if requestDuration, err = meter.Float64Histogram("app.request.duration",
        metric.WithDescription("Request duration"),
        metric.WithUnit("s"),
    ); err != nil {
        return err
    }
    if activeRequests, err = meter.Int64UpDownCounter("app.requests.active",
        metric.WithDescription("In-flight requests"),
        metric.WithUnit("{request}"),
    ); err != nil {
        return err
    }
    return nil
}

func handleWork(ctx context.Context) {
    attrs := metric.WithAttributes(attribute.String("route", "/users/:id"))

    activeRequests.Add(ctx, 1, attrs)
    defer activeRequests.Add(ctx, -1, attrs)

    start := time.Now()
    // ... handle the request ...
    requestCount.Add(ctx, 1, attrs)
    requestDuration.Record(ctx, time.Since(start).Seconds(), attrs)
}
```

> Keep attribute values bounded. Attributes such as a user ID or a raw URL create a new time series per value, which inflates cardinality quickly — use the route pattern (`/users/:id`) rather than the resolved path (`/users/12345`).

### Go Runtime Metrics

GC, goroutine and heap metrics with no manual instruments:

```bash
go get go.opentelemetry.io/contrib/instrumentation/runtime
```

```go
package main

import (
    "log"

    "go.opentelemetry.io/contrib/instrumentation/runtime"
)

func initRuntimeMetrics() {
    // Uses the global meter provider set up by initMeter above.
    if err := runtime.Start(); err != nil {
        log.Fatalf("Failed to start runtime metrics: %v", err)
    }
}
```

## Logs

Logs exported through OpenTelemetry are automatically stamped with the `trace_id` and `span_id` of the active span, which is what lets you jump from a log line to its trace in Sematext.

```bash
go get go.opentelemetry.io/otel/exporters/otlp/otlplog/otlploghttp
go get go.opentelemetry.io/contrib/bridges/otelslog
```

### Logger Provider Setup

```go
package main

import (
    "context"
    "log"

    "go.opentelemetry.io/otel/exporters/otlp/otlplog/otlploghttp"
    "go.opentelemetry.io/otel/log/global"
    sdklog "go.opentelemetry.io/otel/sdk/log"
    "go.opentelemetry.io/otel/sdk/resource"
)

func initLogger(res *resource.Resource) func(context.Context) error {
    ctx := context.Background()

    // Logs go to yet another Agent port: 4328.
    exporter, err := otlploghttp.New(ctx,
        otlploghttp.WithEndpointURL("http://localhost:4328"),
    )
    if err != nil {
        log.Fatalf("Failed to create log exporter: %v", err)
    }

    provider := sdklog.NewLoggerProvider(
        sdklog.WithResource(res),
        sdklog.WithProcessor(sdklog.NewBatchProcessor(exporter)),
    )

    global.SetLoggerProvider(provider)
    return provider.Shutdown
}
```

### Logging with Trace Correlation

The `otelslog` bridge lets you keep using the standard library's `slog`:

```go
package main

import (
    "context"
    "log/slog"

    "go.opentelemetry.io/contrib/bridges/otelslog"
)

var logger = otelslog.NewLogger("my-go-service")

func doThing(ctx context.Context, id string) {
    // Pass ctx: the bridge reads the active span from it and attaches
    // trace_id/span_id, making this log line clickable from the trace.
    logger.InfoContext(ctx, "fetching user", slog.String("user.id", id))

    // No ctx: still exported, but NOT correlated with any trace.
    slog.Info("not correlated")
}
```

**The `Context` suffix is the whole trick.** `logger.InfoContext(ctx, ...)` correlates; `logger.Info(...)` does not. This is the single most common reason logs and traces fail to line up in Sematext.

## Configuration Options

### Environment Variables

Every exporter reads the standard `OTEL_*` variables, so endpoints and tokens do not need to be hardcoded:

```bash
export OTEL_SERVICE_NAME=my-go-service
export OTEL_RESOURCE_ATTRIBUTES=service.version=1.0.0,deployment.environment=production,team=backend
export OTEL_EXPORTER_OTLP_PROTOCOL=http/protobuf

# The Sematext Agent listens on a DIFFERENT PORT PER SIGNAL, so set each
# endpoint rather than a single shared OTEL_EXPORTER_OTLP_ENDPOINT.
export OTEL_EXPORTER_OTLP_TRACES_ENDPOINT=http://localhost:4338
export OTEL_EXPORTER_OTLP_METRICS_ENDPOINT=http://localhost:4318
export OTEL_EXPORTER_OTLP_LOGS_ENDPOINT=http://localhost:4328
```

| Signal | Agent HTTP port | Agent gRPC port |
|---|---|---|
| Traces | 4338 | 4337 |
| Metrics | 4318 | 4317 |
| Logs | 4328 | 4327 |

> There is no `OTEL_SERVICE_VERSION` variable — set `service.version` through `OTEL_RESOURCE_ATTRIBUTES` as shown above.
>
> A per-signal endpoint is used verbatim. Only the generic `OTEL_EXPORTER_OTLP_ENDPOINT` has `/v1/traces`, `/v1/metrics` or `/v1/logs` appended to it.

### gRPC Configuration

```bash
go get go.opentelemetry.io/otel/exporters/otlp/otlptrace/otlptracegrpc
```

```go
package main

import (
    "context"
    "log"

    "go.opentelemetry.io/otel"
    "go.opentelemetry.io/otel/exporters/otlp/otlptrace/otlptracegrpc"
    "go.opentelemetry.io/otel/sdk/resource"
    sdktrace "go.opentelemetry.io/otel/sdk/trace"
    "google.golang.org/grpc"
    "google.golang.org/grpc/credentials/insecure"
)

func initTracerGRPC() func(context.Context) error {
    ctx := context.Background()

    // grpc.NewClient replaces the deprecated grpc.DialContext. Note that
    // grpc.WithBlock() is also deprecated and unsupported here — the
    // connection is established lazily.
    conn, err := grpc.NewClient("localhost:4337",
        grpc.WithTransportCredentials(insecure.NewCredentials()),
    )
    if err != nil {
        log.Fatalf("Failed to create gRPC connection: %v", err)
    }

    exporter, err := otlptracegrpc.New(ctx,
        otlptracegrpc.WithGRPCConn(conn),
    )
    if err != nil {
        log.Fatalf("Failed to create exporter: %v", err)
    }

    res, err := resource.New(ctx, resource.WithFromEnv(), resource.WithTelemetrySDK())
    if err != nil {
        log.Fatalf("Failed to create resource: %v", err)
    }

    tracerProvider := sdktrace.NewTracerProvider(
        sdktrace.WithBatcher(exporter),
        sdktrace.WithResource(res),
    )
    otel.SetTracerProvider(tracerProvider)

    return tracerProvider.Shutdown
}
```

### Sampling Configuration

```go
import (
    "context"

    "go.opentelemetry.io/otel"
    "go.opentelemetry.io/otel/sdk/resource"
    sdktrace "go.opentelemetry.io/otel/sdk/trace"
)

func initTracerWithSampling(exporter sdktrace.SpanExporter, res *resource.Resource) func(context.Context) error {
    tracerProvider := sdktrace.NewTracerProvider(
        sdktrace.WithBatcher(exporter),
        sdktrace.WithResource(res),
        // Sample 10% of traces, but always follow an upstream sampling
        // decision so distributed traces are not truncated mid-path.
        sdktrace.WithSampler(
            sdktrace.ParentBased(sdktrace.TraceIDRatioBased(0.1)),
        ),
    )

    otel.SetTracerProvider(tracerProvider)
    return tracerProvider.Shutdown
}
```

Sampling is also configurable without code changes:

```bash
export OTEL_TRACES_SAMPLER=parentbased_traceidratio
export OTEL_TRACES_SAMPLER_ARG=0.1
```

## Best Practices

### Resource Management

```go
import (
    "context"
    "log"

    "go.opentelemetry.io/otel/attribute"
    "go.opentelemetry.io/otel/sdk/resource"
    semconv "go.opentelemetry.io/otel/semconv/v1.27.0"
)

func initTracer() func(context.Context) error {
    ctx := context.Background()

    res, err := resource.New(ctx,
        resource.WithAttributes(
            semconv.ServiceName("my-go-service"),
            semconv.ServiceVersion("1.0.0"),
            semconv.DeploymentEnvironmentName("production"),
            attribute.String("service.team", "backend"),
        ),
        resource.WithProcess(),
        resource.WithHost(),
    )
    if err != nil {
        log.Fatalf("Failed to create resource: %v", err)
    }
    
    // ... rest of setup
}
```

### Error Handling

```go
import (
    "context"

    "go.opentelemetry.io/otel"
    "go.opentelemetry.io/otel/codes"
    "go.opentelemetry.io/otel/trace"
)

// handleError records an error on the span and marks it failed, so it shows up
// in the Sematext Tracing App's error views.
func handleError(span trace.Span, err error) error {
    if err != nil {
        span.RecordError(err)
        span.SetStatus(codes.Error, err.Error())
    }
    return err
}

// Usage inside an instrumented function:
func doWork(ctx context.Context) error {
    ctx, span := otel.Tracer("service").Start(ctx, "do-work")
    defer span.End()

    if err := someOperation(ctx); err != nil {
        return handleError(span, err)
    }
    return nil
}
```

### Span Attributes

```go
import (
    "net/http"

    "go.opentelemetry.io/otel/attribute"
    semconv "go.opentelemetry.io/otel/semconv/v1.27.0"
    "go.opentelemetry.io/otel/trace"
)

func setSpanAttributes(span trace.Span, r *http.Request) {
    // Use semantic conventions when possible. Names changed in the HTTP
    // conventions v1.21 -> v1.27 (http.method became http.request.method,
    // http.url became url.full, and so on), so pin one semconv version and
    // use the helpers from it rather than hand-writing attribute keys.
    span.SetAttributes(
        semconv.HTTPRequestMethodKey.String(r.Method),
        semconv.URLFull(r.URL.String()),
        semconv.HTTPResponseStatusCode(200),
    )

    // Attributes with no semantic convention: use your own namespaced keys.
    span.SetAttributes(
        attribute.String("app.user.id", "12345"),
        attribute.String("business.operation", "user-registration"),
        attribute.Int("batch.size", 100),
        attribute.Bool("feature.enabled", true),
    )
}
```

> Instrumentation libraries such as `otelgin`, `otelecho` and `otelhttp` already set the HTTP semantic-convention attributes for you. Add these manually only when you create spans yourself.

## Troubleshooting

### Debug Configuration

Print spans to stdout instead of shipping them, to confirm instrumentation works before involving the network:

```bash
go get go.opentelemetry.io/otel/exporters/stdout/stdouttrace
```

```go
package main

import (
    "log"

    "go.opentelemetry.io/otel"
    "go.opentelemetry.io/otel/exporters/stdout/stdouttrace"
    "go.opentelemetry.io/otel/sdk/resource"
    sdktrace "go.opentelemetry.io/otel/sdk/trace"
)

func initDebugTracer(res *resource.Resource) {
    consoleExporter, err := stdouttrace.New(
        stdouttrace.WithPrettyPrint(),
    )
    if err != nil {
        log.Fatal(err)
    }

    tracerProvider := sdktrace.NewTracerProvider(
        // WithSyncer exports immediately instead of batching — useful for
        // debugging, but do not use it in production.
        sdktrace.WithSyncer(consoleExporter),
        sdktrace.WithResource(res),
    )

    otel.SetTracerProvider(tracerProvider)
}
```

The same thing without code changes:

```bash
export OTEL_TRACES_EXPORTER=console
```

### Verification

```go
import (
    "context"
    "fmt"

    "go.opentelemetry.io/otel"
    "go.opentelemetry.io/otel/attribute"
)

func testTracing() {
    tracer := otel.Tracer("test-service")

    _, span := tracer.Start(context.Background(), "test-span")
    defer span.End()
    
    span.SetAttributes(
        attribute.String("test.attribute", "test-value"),
        attribute.Int("test.number", 42),
    )
    
    fmt.Println("Test span created")
}
```

## Next Steps

- [Configure Sematext Agent](/docs/agents/sematext-agent/opentelemetry/)
- [Explore Traces](/docs/tracing/reports/explorer/)
- [Set Up Alerts](/docs/tracing/alerts/creating-alerts/)
- [Other SDK Languages](/docs/tracing/sdks/)
- [Runnable Go examples](https://github.com/sematext/sematext-otel-onboarding/tree/main/go) — SDK, compile-time and eBPF, with Docker Compose

## Related Documentation

- [OpenTelemetry Go Documentation](https://opentelemetry.io/docs/instrumentation/go/)
- [Go Instrumentation Libraries](https://opentelemetry.io/docs/instrumentation/go/libraries/)
- [Troubleshooting Guide](../troubleshooting.md)