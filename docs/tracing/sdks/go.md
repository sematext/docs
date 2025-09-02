title: Go OpenTelemetry SDK for Sematext Tracing
description: Complete guide to instrumenting Go applications with OpenTelemetry for Sematext Tracing

## Go OpenTelemetry SDK

This guide covers how to instrument Go applications with OpenTelemetry to send traces to Sematext Tracing.

## Installation

Go doesn't have comprehensive auto-instrumentation like other languages, but provides easy-to-use instrumentation libraries for popular frameworks.

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
    "go.opentelemetry.io/otel/sdk"
    "go.opentelemetry.io/otel/sdk/resource"
    "go.opentelemetry.io/otel/semconv/v1.21.0"
)

func initTracer() func(context.Context) error {
    ctx := context.Background()
    
    exporter, err := otlptracehttp.New(ctx,
        otlptracehttp.WithEndpoint("http://localhost:4338"),
        otlptracehttp.WithInsecure(),
    )
    if err != nil {
        log.Fatalf("Failed to create exporter: %v", err)
    }
    
    res := resource.NewWithAttributes(
        semconv.SchemaURL,
        semconv.ServiceName("your-service-name"),
        semconv.ServiceVersion("1.0.0"),
        semconv.DeploymentEnvironment("production"),
    )
    
    tracerProvider := sdk.NewTracerProvider(
        sdk.WithBatcher(exporter),
        sdk.WithResource(res),
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
    "go.opentelemetry.io/otel/trace"
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

```bash
go get go.opentelemetry.io/contrib/instrumentation/database/sql/otelsql
go get github.com/lib/pq # for PostgreSQL
```

```go
package main

import (
    "context"
    "database/sql"
    
    "go.opentelemetry.io/contrib/instrumentation/database/sql/otelsql"
    _ "github.com/lib/pq"
)

func initDB() (*sql.DB, error) {
    // Register the wrapped driver
    driverName, err := otelsql.Register("postgres",
        otelsql.WithAttributes(
            semconv.DBSystemPostgreSQL,
        ),
    )
    if err != nil {
        return nil, err
    }
    
    // Open database with the wrapped driver
    db, err := sql.Open(driverName, "postgresql://user:password@localhost/dbname?sslmode=disable")
    if err != nil {
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

```bash
go get go.opentelemetry.io/contrib/instrumentation/github.com/go-redis/redis/v8/otelredis
go get github.com/go-redis/redis/v8
```

```go
package main

import (
    "context"
    
    "github.com/go-redis/redis/v8"
    "go.opentelemetry.io/contrib/instrumentation/github.com/go-redis/redis/v8/otelredis"
    "go.opentelemetry.io/otel/attribute"
)

func initRedis() *redis.Client {
    rdb := redis.NewClient(&redis.Options{
        Addr: "localhost:6379",
    })
    
    // Add OpenTelemetry hook
    rdb.AddHook(otelredis.NewTracingHook())
    
    return rdb
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
    "go.opentelemetry.io/otel"
    "go.opentelemetry.io/otel/attribute"
    "go.opentelemetry.io/otel/codes"
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

## Configuration Options

### Environment Variables

```bash
export OTEL_SERVICE_NAME=my-go-service
export OTEL_SERVICE_VERSION=1.0.0
export OTEL_RESOURCE_ATTRIBUTES=environment=production,team=backend
export OTEL_EXPORTER_OTLP_ENDPOINT=http://localhost:4338
export OTEL_EXPORTER_OTLP_PROTOCOL=http/protobuf
```

### gRPC Configuration

```bash
go get go.opentelemetry.io/otel/exporters/otlp/otlptrace/otlptracegrpc
```

```go
import (
    "go.opentelemetry.io/otel/exporters/otlp/otlptrace/otlptracegrpc"
    "google.golang.org/grpc"
    "google.golang.org/grpc/credentials/insecure"
)

func initTracerGRPC() func(context.Context) error {
    ctx := context.Background()
    
    conn, err := grpc.DialContext(ctx, "localhost:4337",
        grpc.WithTransportCredentials(insecure.NewCredentials()),
        grpc.WithBlock(),
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
    
    // Rest of the setup...
    return tracerProvider.Shutdown
}
```

### Sampling Configuration

```go
import (
    "go.opentelemetry.io/otel/sdk/trace"
)

func initTracerWithSampling() func(context.Context) error {
    // ... exporter setup ...
    
    tracerProvider := sdk.NewTracerProvider(
        sdk.WithBatcher(exporter),
        sdk.WithResource(res),
        sdk.WithSampler(trace.TraceIDRatioBased(0.1)), // 10% sampling
    )
    
    otel.SetTracerProvider(tracerProvider)
    return tracerProvider.Shutdown
}
```

## Best Practices

### Resource Management

```go
func initTracer() func(context.Context) error {
    ctx := context.Background()
    
    res, err := resource.New(ctx,
        resource.WithAttributes(
            semconv.ServiceName("my-go-service"),
            semconv.ServiceVersion("1.0.0"),
            semconv.DeploymentEnvironment("production"),
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
    "go.opentelemetry.io/otel/codes"
    "go.opentelemetry.io/otel/trace"
)

func handleError(span trace.Span, err error) error {
    if err != nil {
        span.RecordError(err)
        span.SetStatus(codes.Error, err.Error())
    }
    return err
}

// Usage
if err := someOperation(); err != nil {
    return handleError(span, err)
}
```

### Span Attributes

```go
// Use semantic conventions when possible
span.SetAttributes(
    semconv.HTTPMethod(r.Method),
    semconv.HTTPURL(r.URL.String()),
    semconv.HTTPStatusCode(200),
    semconv.UserID("12345"),
)

// Custom attributes
span.SetAttributes(
    attribute.String("business.operation", "user-registration"),
    attribute.Int("batch.size", 100),
    attribute.Bool("feature.enabled", true),
)
```

## Troubleshooting

### Debug Configuration

```go
import (
    "go.opentelemetry.io/otel/sdk/trace"
)

func initDebugTracer() {
    // Add console exporter for debugging
    consoleExporter, err := stdouttrace.New(
        stdouttrace.WithPrettyPrint(),
    )
    if err != nil {
        log.Fatal(err)
    }
    
    tracerProvider := sdk.NewTracerProvider(
        sdk.WithSyncer(consoleExporter), // Use Syncer for immediate output
        sdk.WithResource(res),
    )
    
    otel.SetTracerProvider(tracerProvider)
}
```

### Verification

```go
func testTracing() {
    tracer := otel.Tracer("test-service")
    
    ctx, span := tracer.Start(context.Background(), "test-span")
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
- [Explore Traces](/docs/tracing/explorer/)
- [Set Up Alerts](/docs/tracing/alerts/creating-alerts/)
- [Other SDK Languages](/docs/tracing/sdks/)

## Related Documentation

- [OpenTelemetry Go Documentation](https://opentelemetry.io/docs/instrumentation/go/)
- [Go Instrumentation Libraries](https://opentelemetry.io/docs/instrumentation/go/libraries/)
- [Troubleshooting Guide](../troubleshooting.md)