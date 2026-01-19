title: .NET OpenTelemetry SDK for Sematext Tracing
description: Complete guide to instrumenting .NET applications with OpenTelemetry for Sematext Tracing

## .NET OpenTelemetry SDK

This guide covers how to instrument .NET applications with OpenTelemetry to send traces to Sematext Tracing.

<div class="mdl-tabs__panel is-active" markdown>

**Quick Start:** For complete, working examples with auto and manual instrumentation for Baremetal, Docker, and Kubernetes, see our **[.NET Examples Repository](https://github.com/sematext/sematext-opentelemetry-examples/tree/main/dotnet)**.

</div>

## Auto-Instrumentation (Recommended)

Auto-instrumentation automatically instruments popular frameworks and libraries without requiring code changes.

### 1. Install the .NET Automatic Instrumentation

**For Windows:**
```powershell
# Download the latest release
$url = "https://github.com/open-telemetry/opentelemetry-dotnet-instrumentation/releases/latest/download/opentelemetry-dotnet-instrumentation-windows.zip"
Invoke-WebRequest -Uri $url -OutFile "otel-dotnet-auto.zip"
Expand-Archive -Path "otel-dotnet-auto.zip" -DestinationPath "C:\otel-dotnet-auto"
```

**For Linux:**
```bash
# Download the latest release
curl -L -o opentelemetry-dotnet-instrumentation-linux.tar.gz \
  https://github.com/open-telemetry/opentelemetry-dotnet-instrumentation/releases/latest/download/opentelemetry-dotnet-instrumentation-linux-glibc.tar.gz

# Extract
mkdir -p /opt/opentelemetry-dotnet-instrumentation
tar -xzf opentelemetry-dotnet-instrumentation-linux.tar.gz -C /opt/opentelemetry-dotnet-instrumentation
```

### 2. Set Environment Variables and Run

**Windows:**
```powershell
$env:OTEL_SERVICE_NAME="your-service-name"
$env:OTEL_EXPORTER_OTLP_ENDPOINT="http://localhost:4338"
$env:OTEL_EXPORTER_OTLP_PROTOCOL="http/protobuf"
$env:OTEL_DOTNET_AUTO_HOME="C:\otel-dotnet-auto"
$env:CORECLR_ENABLE_PROFILING="1"
$env:CORECLR_PROFILER="{918728DD-259F-4A6A-AC2B-B85E1B658318}"
$env:CORECLR_PROFILER_PATH="$env:OTEL_DOTNET_AUTO_HOME\win-x64\OpenTelemetry.AutoInstrumentation.Native.dll"

dotnet run
```

**Linux:**
```bash
export OTEL_SERVICE_NAME=your-service-name
export OTEL_EXPORTER_OTLP_ENDPOINT=http://localhost:4338
export OTEL_EXPORTER_OTLP_PROTOCOL=http/protobuf
export OTEL_DOTNET_AUTO_HOME=/opt/opentelemetry-dotnet-instrumentation
export CORECLR_ENABLE_PROFILING=1
export CORECLR_PROFILER={918728DD-259F-4A6A-AC2B-B85E1B658318}
export CORECLR_PROFILER_PATH=$OTEL_DOTNET_AUTO_HOME/linux-x64/OpenTelemetry.AutoInstrumentation.Native.so

dotnet run
```

## Manual Instrumentation (Advanced)

For more control over instrumentation, you can manually configure OpenTelemetry.

### 1. Install NuGet Packages

```xml
<PackageReference Include="OpenTelemetry" Version="1.6.0" />
<PackageReference Include="OpenTelemetry.Extensions.Hosting" Version="1.6.0" />
<PackageReference Include="OpenTelemetry.Exporter.OpenTelemetryProtocol" Version="1.6.0" />
<PackageReference Include="OpenTelemetry.Instrumentation.AspNetCore" Version="1.5.1-beta.1" />
<PackageReference Include="OpenTelemetry.Instrumentation.Http" Version="1.5.1-beta.1" />
```

### 2. Configure in Program.cs (ASP.NET Core)

```csharp
using OpenTelemetry.Trace;
using OpenTelemetry.Resources;
using OpenTelemetry.Exporter;

var builder = WebApplication.CreateBuilder(args);

// Add services to the container
builder.Services.AddControllers();

// Configure OpenTelemetry
builder.Services.AddOpenTelemetry()
    .ConfigureResource(resource => resource
        .AddService("your-service-name", "1.0.0")
        .AddAttributes(new Dictionary<string, object>
        {
            ["deployment.environment"] = "production",
            ["service.team"] = "backend"
        }))
    .WithTracing(tracing => tracing
        .AddAspNetCoreInstrumentation(options =>
        {
            options.RecordException = true;
            options.Filter = httpContext =>
            {
                // Filter out health check endpoints
                return !httpContext.Request.Path.StartsWithSegments("/health");
            };
        })
        .AddHttpClientInstrumentation(options =>
        {
            options.RecordException = true;
        })
        .AddSource("YourApplication")
        .AddOtlpExporter(options =>
        {
            options.Endpoint = new Uri("http://localhost:4338");
            options.Protocol = OtlpExportProtocol.HttpProtobuf;
        }));

var app = builder.Build();

// Configure the HTTP request pipeline
app.UseRouting();
app.MapControllers();

app.Run();
```

### 3. Manual Span Creation

```csharp
using System.Diagnostics;
using OpenTelemetry;
using OpenTelemetry.Trace;

public class UserService
{
    private static readonly ActivitySource ActivitySource = new("YourApplication");
    
    public async Task<User> GetUserAsync(string userId)
    {
        using var activity = ActivitySource.StartActivity("get-user");
        activity?.SetTag("user.id", userId);
        activity?.SetTag("operation.type", "database-query");
        
        try
        {
            // Your business logic here
            var user = await FetchUserFromDatabaseAsync(userId);
            
            activity?.SetTag("user.found", user != null);
            activity?.SetStatus(ActivityStatusCode.Ok);
            
            return user;
        }
        catch (Exception ex)
        {
            activity?.SetStatus(ActivityStatusCode.Error, ex.Message);
            activity?.RecordException(ex);
            throw;
        }
    }
    
    private async Task<User> FetchUserFromDatabaseAsync(string userId)
    {
        using var activity = ActivitySource.StartActivity("fetch-user-db");
        activity?.SetTag("user.id", userId);
        activity?.SetTag("db.operation", "SELECT");
        activity?.SetTag("db.table", "users");
        
        try
        {
            // Simulate database call
            await Task.Delay(100);
            
            return new User { Id = userId, Name = "John Doe" };
        }
        catch (Exception ex)
        {
            activity?.RecordException(ex);
            throw;
        }
    }
}

public class User
{
    public string Id { get; set; }
    public string Name { get; set; }
}
```

## ASP.NET Core Integration

### Controller Example

```csharp
using Microsoft.AspNetCore.Mvc;
using System.Diagnostics;

[ApiController]
[Route("api/[controller]")]
public class UsersController : ControllerBase
{
    private static readonly ActivitySource ActivitySource = new("YourApplication");
    private readonly UserService _userService;
    
    public UsersController(UserService userService)
    {
        _userService = userService;
    }
    
    [HttpGet("{id}")]
    public async Task<ActionResult<User>> GetUser(string id)
    {
        using var activity = ActivitySource.StartActivity("get-user-controller");
        activity?.SetTag("user.id", id);
        activity?.SetTag("http.method", Request.Method);
        activity?.SetTag("http.route", "/api/users/{id}");
        
        try
        {
            var user = await _userService.GetUserAsync(id);
            
            if (user == null)
            {
                activity?.SetTag("user.found", false);
                return NotFound();
            }
            
            activity?.SetTag("user.found", true);
            return Ok(user);
        }
        catch (Exception ex)
        {
            activity?.SetStatus(ActivityStatusCode.Error, ex.Message);
            activity?.RecordException(ex);
            return StatusCode(500, "Internal server error");
        }
    }
}
```

### Middleware for Custom Instrumentation

```csharp
public class TracingMiddleware
{
    private readonly RequestDelegate _next;
    private static readonly ActivitySource ActivitySource = new("YourApplication.Middleware");
    
    public TracingMiddleware(RequestDelegate next)
    {
        _next = next;
    }
    
    public async Task InvokeAsync(HttpContext context)
    {
        using var activity = ActivitySource.StartActivity("custom-middleware");
        activity?.SetTag("http.path", context.Request.Path);
        activity?.SetTag("http.method", context.Request.Method);
        
        try
        {
            await _next(context);
            
            activity?.SetTag("http.status_code", context.Response.StatusCode);
            
            if (context.Response.StatusCode >= 400)
            {
                activity?.SetStatus(ActivityStatusCode.Error, $"HTTP {context.Response.StatusCode}");
            }
        }
        catch (Exception ex)
        {
            activity?.SetStatus(ActivityStatusCode.Error, ex.Message);
            activity?.RecordException(ex);
            throw;
        }
    }
}

// Register in Program.cs
app.UseMiddleware<TracingMiddleware>();
```

## Database Instrumentation

### Entity Framework Core

```xml
<PackageReference Include="OpenTelemetry.Instrumentation.EntityFrameworkCore" Version="1.0.0-beta.7" />
```

```csharp
builder.Services.AddOpenTelemetry()
    .WithTracing(tracing => tracing
        .AddEntityFrameworkCoreInstrumentation(options =>
        {
            options.SetDbStatementForText = true;
            options.SetDbStatementForStoredProcedure = true;
        })
        // ... other configuration
    );
```

### SQL Client

```xml
<PackageReference Include="OpenTelemetry.Instrumentation.SqlClient" Version="1.5.1-beta.1" />
```

```csharp
builder.Services.AddOpenTelemetry()
    .WithTracing(tracing => tracing
        .AddSqlClientInstrumentation(options =>
        {
            options.SetDbStatementForText = true;
            options.RecordException = true;
        })
        // ... other configuration
    );
```

### Redis

```xml
<PackageReference Include="OpenTelemetry.Instrumentation.StackExchangeRedis" Version="1.0.0-rc9.10" />
```

```csharp
using StackExchange.Redis;

// In Program.cs
var redis = ConnectionMultiplexer.Connect("localhost:6379");
builder.Services.AddSingleton<IConnectionMultiplexer>(redis);

builder.Services.AddOpenTelemetry()
    .WithTracing(tracing => tracing
        .AddRedisInstrumentation(redis)
        // ... other configuration
    );
```

## Console Application

### Program.cs for Console App

```csharp
using OpenTelemetry;
using OpenTelemetry.Resources;
using OpenTelemetry.Trace;
using System.Diagnostics;

// Configure OpenTelemetry
using var tracerProvider = Sdk.CreateTracerProviderBuilder()
    .AddSource("ConsoleApp")
    .ConfigureResource(resource => resource
        .AddService("console-app", "1.0.0"))
    .AddOtlpExporter(options =>
    {
        options.Endpoint = new Uri("http://localhost:4338");
        options.Protocol = OtlpExportProtocol.HttpProtobuf;
    })
    .Build();

var activitySource = new ActivitySource("ConsoleApp");

// Your application logic
using var activity = activitySource.StartActivity("main-operation");
activity?.SetTag("operation.type", "batch-processing");

try
{
    await DoWorkAsync();
    activity?.SetStatus(ActivityStatusCode.Ok);
}
catch (Exception ex)
{
    activity?.SetStatus(ActivityStatusCode.Error, ex.Message);
    activity?.RecordException(ex);
    throw;
}

async Task DoWorkAsync()
{
    using var workActivity = activitySource.StartActivity("do-work");
    workActivity?.SetTag("work.type", "data-processing");
    
    // Simulate work
    await Task.Delay(1000);
    
    workActivity?.SetTag("work.completed", true);
}
```

## Worker Service

### Background Service with Tracing

```csharp
using OpenTelemetry;
using OpenTelemetry.Resources;
using OpenTelemetry.Trace;
using System.Diagnostics;

public class TracedWorkerService : BackgroundService
{
    private static readonly ActivitySource ActivitySource = new("WorkerService");
    private readonly ILogger<TracedWorkerService> _logger;
    
    public TracedWorkerService(ILogger<TracedWorkerService> logger)
    {
        _logger = logger;
    }
    
    protected override async Task ExecuteAsync(CancellationToken stoppingToken)
    {
        while (!stoppingToken.IsCancellationRequested)
        {
            using var activity = ActivitySource.StartActivity("worker-iteration");
            activity?.SetTag("iteration.timestamp", DateTimeOffset.UtcNow.ToString());
            
            try
            {
                await ProcessBatchAsync();
                
                activity?.SetStatus(ActivityStatusCode.Ok);
                await Task.Delay(TimeSpan.FromMinutes(1), stoppingToken);
            }
            catch (Exception ex)
            {
                activity?.SetStatus(ActivityStatusCode.Error, ex.Message);
                activity?.RecordException(ex);
                _logger.LogError(ex, "Error in worker service");
            }
        }
    }
    
    private async Task ProcessBatchAsync()
    {
        using var activity = ActivitySource.StartActivity("process-batch");
        
        // Your batch processing logic
        await Task.Delay(100);
        
        activity?.SetTag("batch.processed", true);
    }
}

// In Program.cs
var builder = Host.CreateApplicationBuilder(args);

builder.Services.AddOpenTelemetry()
    .ConfigureResource(resource => resource
        .AddService("worker-service"))
    .WithTracing(tracing => tracing
        .AddSource("WorkerService")
        .AddOtlpExporter(options =>
        {
            options.Endpoint = new Uri("http://localhost:4338");
            options.Protocol = OtlpExportProtocol.HttpProtobuf;
        }));

builder.Services.AddHostedService<TracedWorkerService>();

var host = builder.Build();
host.Run();
```

## Configuration Options

### appsettings.json Configuration

```json
{
  "OpenTelemetry": {
    "ServiceName": "my-dotnet-service",
    "ServiceVersion": "1.0.0",
    "Otlp": {
      "Endpoint": "http://localhost:4338",
      "Protocol": "HttpProtobuf"
    },
    "Sampling": {
      "Type": "TraceIdRatioBased",
      "Ratio": 0.1
    }
  }
}
```

### Using Configuration

```csharp
builder.Services.AddOpenTelemetry()
    .ConfigureResource(resource => resource
        .AddService(
            serviceName: builder.Configuration["OpenTelemetry:ServiceName"] ?? "unknown-service",
            serviceVersion: builder.Configuration["OpenTelemetry:ServiceVersion"]))
    .WithTracing(tracing => tracing
        .AddAspNetCoreInstrumentation()
        .AddHttpClientInstrumentation()
        .AddOtlpExporter(options =>
        {
            options.Endpoint = new Uri(builder.Configuration["OpenTelemetry:Otlp:Endpoint"] ?? "http://localhost:4338");
            options.Protocol = Enum.Parse<OtlpExportProtocol>(
                builder.Configuration["OpenTelemetry:Otlp:Protocol"] ?? "HttpProtobuf");
        }));
```

## Troubleshooting

### Debug Configuration

```csharp
using OpenTelemetry.Trace;

builder.Services.AddOpenTelemetry()
    .WithTracing(tracing => tracing
        .AddConsoleExporter() // Add console output for debugging
        .AddOtlpExporter()
        // ... other configuration
    );
```

### Common Issues

**No Traces Appearing**
- Verify the Sematext Agent is running
- Check OTLP endpoint configuration
- Ensure ActivitySource names match between creation and registration

**Performance Issues**
```csharp
builder.Services.AddOpenTelemetry()
    .WithTracing(tracing => tracing
        .SetSampler(new TraceIdRatioBasedSampler(0.1)) // 10% sampling
        // ... other configuration
    );
```

### Verification

```csharp
using System.Diagnostics;

public class TracingTest
{
    private static readonly ActivitySource ActivitySource = new("TestApp");
    
    public static void TestTracing()
    {
        using var activity = ActivitySource.StartActivity("test-span");
        activity?.SetTag("test.attribute", "test-value");
        activity?.SetTag("test.number", 42);
        
        Console.WriteLine("Test span created");
    }
}
```

## Best Practices

### Activity Source Management

```csharp
// Create a single ActivitySource per assembly/module
public static class Telemetry
{
    public static readonly ActivitySource ActivitySource = new("YourApplication");
}

// Use it throughout your application
using var activity = Telemetry.ActivitySource.StartActivity("operation-name");
```

### Exception Handling

```csharp
try
{
    // Business logic
}
catch (Exception ex)
{
    activity?.SetStatus(ActivityStatusCode.Error, ex.Message);
    activity?.RecordException(ex);
    throw; // Re-throw to maintain exception flow
}
```

### Resource Attributes

```csharp
.ConfigureResource(resource => resource
    .AddService("my-service", "1.0.0")
    .AddAttributes(new Dictionary<string, object>
    {
        ["deployment.environment"] = Environment.GetEnvironmentVariable("ASPNETCORE_ENVIRONMENT") ?? "unknown",
        ["service.team"] = "backend",
        ["service.component"] = "api"
    }))
```

## Next Steps

- [Configure Sematext Agent](/docs/agents/sematext-agent/opentelemetry/)
- [Explore Traces](/docs/tracing/reports/explorer/)
- [Set Up Alerts](/docs/tracing/alerts/creating-alerts/)
- [Other SDK Languages](/docs/tracing/sdks/)

## Related Documentation

- [OpenTelemetry .NET Documentation](https://opentelemetry.io/docs/instrumentation/net/)
- [.NET Auto-Instrumentation](https://opentelemetry.io/docs/instrumentation/net/automatic/)
- [Troubleshooting Guide](/docs/tracing/troubleshooting/)