title: iOS/Swift OpenTelemetry SDK for Sematext Tracing
description: Complete guide to instrumenting iOS applications with OpenTelemetry for Sematext Tracing

## iOS/Swift OpenTelemetry SDK

This guide covers how to instrument iOS applications with OpenTelemetry to send traces to Sematext Tracing.

## Instrumentation Approach

iOS/Swift requires **manual instrumentation**:

- **Manual instrumentation required**: Unlike server-side SDKs, iOS doesn't have auto-instrumentation agents. You need to explicitly create spans in your code
- **Library helpers available**: Some libraries provide OpenTelemetry instrumentation helpers, but these still require manual integration
- **Full control**: Manual instrumentation gives you complete control over what to trace and which attributes to capture

While this requires more initial setup than auto-instrumentation, it results in precise, application-specific tracing tailored to your needs.

## Prerequisites

- A Sematext Tracing App ([create one here](/docs/tracing/create-tracing-app/))
- [Sematext Agent](/docs/agents/sematext-agent/opentelemetry/) running with OpenTelemetry support
- iOS 13.0+ / macOS 10.15+ / tvOS 13.0+ / watchOS 6.0+
- Xcode 13.0+
- Swift 5.5+
- A backend proxy endpoint to forward traces (see [Backend Proxy Configuration](#backend-proxy-configuration))

## Installation

### Swift Package Manager (Recommended)

1. In Xcode, select **File > Add Package Dependencies**
2. Enter the package URL: `https://github.com/open-telemetry/opentelemetry-swift`
3. Select the version and add these products to your target:
   - `OpenTelemetryApi`
   - `OpenTelemetrySdk`
   - `OtlpTraceExporter`

### CocoaPods

Add to your `Podfile`:

```ruby
pod 'OpenTelemetryApi'
pod 'OpenTelemetrySdk'
pod 'OpenTelemetryProtocolExporterHTTP'
```

Then run:
```bash
pod install
```

## Basic Configuration

### 1. Initialize OpenTelemetry in Your App

Create a tracing configuration class:

```swift
import Foundation
import OpenTelemetryApi
import OpenTelemetrySdk
import OpenTelemetryProtocolExporterHTTP

class TracingConfiguration {
    static let shared = TracingConfiguration()
    
    private(set) var tracer: Tracer!
    private var tracerProvider: TracerProvider!
    
    private init() {
        setupOpenTelemetry()
    }
    
    private func setupOpenTelemetry() {
        // Configure resource with service information
        let resource = Resource(attributes: [
            ResourceAttributes.serviceName.rawValue: .string("my-ios-app"),
            ResourceAttributes.serviceVersion.rawValue: .string(getAppVersion()),
            "environment": .string(isDebugBuild() ? "development" : "production"),
            "platform": .string("iOS"),
            "os.version": .string(UIDevice.current.systemVersion)
        ])
        
        // Configure OTLP exporter to send traces to your backend proxy
        // Note: Direct connection to Sematext Agent not possible from mobile
        let otlpConfiguration = OtlpConfiguration(
            endpoint: URL(string: "https://your-backend.com/v1/traces")!,
            headers: ["Authorization": "Bearer your-api-key"]  // Add authentication
        )
        
        let otlpTraceExporter = OtlpHttpTraceExporter(
            configuration: otlpConfiguration
        )
        
        // Configure span processor with batching
        let spanProcessor = BatchSpanProcessor(
            spanExporter: otlpTraceExporter,
            scheduleDelay: 5,  // Send every 5 seconds
            maxQueueSize: 2048,
            maxExportBatchSize: 512
        )
        
        // Build tracer provider
        tracerProvider = TracerProviderBuilder()
            .add(spanProcessor: spanProcessor)
            .with(resource: resource)
            .build()
        
        // Register as global tracer provider
        OpenTelemetry.registerTracerProvider(tracerProvider: tracerProvider)
        
        // Get tracer for application use
        tracer = tracerProvider.get(
            instrumentationName: "my-ios-app",
            instrumentationVersion: getAppVersion()
        )
    }
    
    private func getAppVersion() -> String {
        Bundle.main.infoDictionary?["CFBundleShortVersionString"] as? String ?? "1.0.0"
    }
    
    private func isDebugBuild() -> Bool {
        #if DEBUG
        return true
        #else
        return false
        #endif
    }
}
```

### 2. Initialize in App Delegate

**UIKit Apps:**
```swift
import UIKit

@main
class AppDelegate: UIResponder, UIApplicationDelegate {
    
    func application(
        _ application: UIApplication,
        didFinishLaunchingWithOptions launchOptions: [UIApplication.LaunchOptionsKey: Any]?
    ) -> Bool {
        // Initialize tracing
        _ = TracingConfiguration.shared
        
        // Start app launch span
        let span = TracingConfiguration.shared.tracer.spanBuilder("app-launch")
            .setStartTime(Date())
            .startSpan()
        
        span.setAttribute(key: "launch.type", value: "cold")
        
        // Your app initialization
        
        span.end()
        
        return true
    }
}
```

**SwiftUI Apps:**
```swift
import SwiftUI

@main
struct MyApp: App {
    init() {
        // Initialize tracing
        _ = TracingConfiguration.shared
    }
    
    var body: some Scene {
        WindowGroup {
            ContentView()
                .onAppear {
                    trackAppearance(screen: "main")
                }
        }
    }
    
    private func trackAppearance(screen: String) {
        let span = TracingConfiguration.shared.tracer
            .spanBuilder("screen-appear")
            .startSpan()
        span.setAttribute(key: "screen.name", value: screen)
        span.end()
    }
}
```

## Manual Instrumentation

Since iOS requires manual instrumentation, you need to explicitly create spans for all operations you want to trace. 

### What Needs Manual Instrumentation

Everything in iOS requires manual instrumentation, including:

- **Network requests** (URLSession, Alamofire, etc.)
- **View lifecycle** (viewDidLoad, viewWillAppear, etc.)
- **User interactions** (button taps, gestures, form submissions)
- **Database operations** (Core Data, SQLite, Realm)
- **Business logic** (data processing, calculations, workflows)
- **Background tasks** (notifications, data sync, uploads)

Here are common patterns for instrumenting these operations:

### View Controller Lifecycle Tracing

```swift
import UIKit
import OpenTelemetryApi

class MainViewController: UIViewController {
    private var viewSpan: Span?
    
    override func viewDidLoad() {
        super.viewDidLoad()
        
        let span = TracingConfiguration.shared.tracer
            .spanBuilder("MainViewController.viewDidLoad")
            .startSpan()
        
        defer { span.end() }
        
        span.setAttribute(key: "screen.name", value: "main")
        
        // Your initialization code
    }
    
    override func viewWillAppear(_ animated: Bool) {
        super.viewWillAppear(animated)
        
        viewSpan = TracingConfiguration.shared.tracer
            .spanBuilder("MainViewController.active")
            .startSpan()
        
        viewSpan?.setAttribute(key: "animated", value: animated)
    }
    
    override func viewWillDisappear(_ animated: Bool) {
        super.viewWillDisappear(animated)
        
        viewSpan?.end()
        viewSpan = nil
    }
}
```

### SwiftUI View Tracing

```swift
import SwiftUI
import OpenTelemetryApi

struct ContentView: View {
    @State private var isLoading = false
    
    var body: some View {
        VStack {
            Button("Fetch Data") {
                Task {
                    await fetchData()
                }
            }
            
            if isLoading {
                ProgressView()
            }
        }
        .onAppear {
            trackScreenView("content")
        }
    }
    
    private func trackScreenView(_ screenName: String) {
        let span = TracingConfiguration.shared.tracer
            .spanBuilder("screen-view")
            .startSpan()
        
        span.setAttribute(key: "screen.name", value: screenName)
        span.setAttribute(key: "timestamp", value: Date().timeIntervalSince1970)
        span.end()
    }
    
    private func fetchData() async {
        let span = TracingConfiguration.shared.tracer
            .spanBuilder("fetch-data")
            .startSpan()
        
        defer { span.end() }
        
        isLoading = true
        defer { isLoading = false }
        
        do {
            // Perform network request
            span.setAttribute(key: "status", value: "success")
        } catch {
            span.recordException(error)
            span.setStatus(.error(description: error.localizedDescription))
        }
    }
}
```

### Network Request Tracing

URLSession requires manual instrumentation - wrap your network calls with spans:

```swift
import Foundation
import OpenTelemetryApi

class NetworkService {
    
    func fetchData(from url: URL) async throws -> Data {
        let span = TracingConfiguration.shared.tracer
            .spanBuilder("http-request")
            .setSpanKind(.client)
            .startSpan()
        
        defer { span.end() }
        
        // Add HTTP attributes
        span.setAttribute(key: "http.method", value: "GET")
        span.setAttribute(key: "http.url", value: url.absoluteString)
        span.setAttribute(key: "http.scheme", value: url.scheme ?? "https")
        span.setAttribute(key: "http.host", value: url.host ?? "")
        
        do {
            let (data, response) = try await URLSession.shared.data(from: url)
            
            if let httpResponse = response as? HTTPURLResponse {
                span.setAttribute(key: "http.status_code", value: httpResponse.statusCode)
                
                if httpResponse.statusCode >= 400 {
                    span.setStatus(.error(description: "HTTP \(httpResponse.statusCode)"))
                }
            }
            
            span.setAttribute(key: "http.response_size", value: data.count)
            return data
            
        } catch {
            span.recordException(error)
            span.setStatus(.error(description: error.localizedDescription))
            throw error
        }
    }
}
```

### User Interaction Tracing

```swift
class UserInteractionTracker {
    
    static func trackButtonTap(_ buttonName: String, attributes: [String: Any] = [:]) {
        let span = TracingConfiguration.shared.tracer
            .spanBuilder("button-tap")
            .startSpan()
        
        span.setAttribute(key: "button.name", value: buttonName)
        span.setAttribute(key: "timestamp", value: Date().timeIntervalSince1970)
        
        for (key, value) in attributes {
            if let stringValue = value as? String {
                span.setAttribute(key: key, value: stringValue)
            } else if let intValue = value as? Int {
                span.setAttribute(key: key, value: intValue)
            }
        }
        
        span.end()
    }
    
    static func trackGesture(_ gestureType: String, on view: String) {
        let span = TracingConfiguration.shared.tracer
            .spanBuilder("gesture")
            .startSpan()
        
        span.setAttribute(key: "gesture.type", value: gestureType)
        span.setAttribute(key: "view.name", value: view)
        span.end()
    }
}

// Usage in SwiftUI
Button("Submit") {
    UserInteractionTracker.trackButtonTap("submit", attributes: [
        "form": "login",
        "method": "email"
    ])
    // Perform action
}

// Usage in UIKit
@IBAction func submitTapped(_ sender: UIButton) {
    UserInteractionTracker.trackButtonTap("submit")
    // Perform action
}
```

## Backend Proxy Configuration

Since iOS applications cannot directly connect to the Sematext Agent, you need a backend proxy. See the [Browser JavaScript proxy configuration](/docs/tracing/sdks/javascript-browser/#proxy-configuration) for examples that work with mobile apps.

### Swift Backend Proxy (Vapor)

If you're using Swift on the server side:

```swift
import Vapor
import OpenTelemetryProtocolExporterHTTP

func routes(_ app: Application) throws {
    app.post("traces") { req async throws -> HTTPStatus in
        // Validate request
        guard let authHeader = req.headers["Authorization"].first,
              validateAuth(authHeader) else {
            throw Abort(.unauthorized)
        }
        
        // Forward traces to Sematext Agent
        let traces = try req.content.decode(TracesRequest.self)
        try await forwardToSematextAgent(traces)
        
        return .ok
    }
}
```

## Performance Considerations

### Sampling Configuration

```swift
// Configure sampling based on environment
let sampler: Sampler = {
    #if DEBUG
    return AlwaysOnSampler()  // Sample everything in debug
    #else
    return TraceIdRatioBasedSampler(ratio: 0.1)  // Sample 10% in production
    #endif
}()

let tracerProvider = TracerProviderBuilder()
    .add(spanProcessor: spanProcessor)
    .with(sampler: sampler)
    .build()
```

### Battery and Performance Optimization

```swift
class AdaptiveTracing {
    static func updateTracingBasedOnBatteryState() {
        UIDevice.current.isBatteryMonitoringEnabled = true
        
        let batteryLevel = UIDevice.current.batteryLevel
        let batteryState = UIDevice.current.batteryState
        
        switch batteryState {
        case .unplugged, .unknown:
            if batteryLevel < 0.2 {
                // Low battery - reduce tracing
                setSamplingRate(0.01)
            } else {
                // Normal battery - standard tracing
                setSamplingRate(0.1)
            }
        case .charging, .full:
            // Charging - can use more aggressive tracing
            setSamplingRate(0.5)
        @unknown default:
            setSamplingRate(0.1)
        }
    }
    
    static func updateTracingForAppState() {
        NotificationCenter.default.addObserver(
            forName: UIApplication.didEnterBackgroundNotification,
            object: nil,
            queue: .main
        ) { _ in
            // App in background - minimal tracing
            setSamplingRate(0.01)
        }
        
        NotificationCenter.default.addObserver(
            forName: UIApplication.willEnterForegroundNotification,
            object: nil,
            queue: .main
        ) { _ in
            // App in foreground - normal tracing
            setSamplingRate(0.1)
        }
    }
}
```

## Best Practices

### Privacy and Security

```swift
extension Span {
    /// Add user context without exposing sensitive data
    func setUserContext(userId: String) {
        // Hash user ID for privacy
        let hashedId = userId.data(using: .utf8)?.sha256() ?? ""
        self.setAttribute(key: "user.id", value: hashedId)
    }
    
    /// Sanitize URLs to remove sensitive parameters
    func setSanitizedURL(_ url: URL) {
        var components = URLComponents(url: url, resolvingAgainstBaseURL: false)
        components?.queryItems = nil  // Remove query parameters
        
        if let sanitizedURL = components?.url {
            self.setAttribute(key: "http.url", value: sanitizedURL.absoluteString)
        }
    }
}
```

### iOS-Specific Attributes

```swift
extension Span {
    func setDeviceContext() {
        setAttribute(key: "device.model", value: UIDevice.current.model)
        setAttribute(key: "device.name", value: UIDevice.current.name)
        setAttribute(key: "os.name", value: UIDevice.current.systemName)
        setAttribute(key: "os.version", value: UIDevice.current.systemVersion)
        
        if let identifierForVendor = UIDevice.current.identifierForVendor {
            setAttribute(key: "device.id", value: identifierForVendor.uuidString)
        }
        
        // Screen information
        let screen = UIScreen.main
        setAttribute(key: "screen.width", value: Int(screen.bounds.width))
        setAttribute(key: "screen.height", value: Int(screen.bounds.height))
        setAttribute(key: "screen.scale", value: screen.scale)
    }
}
```

### Error Handling

```swift
extension Span {
    func recordError(_ error: Error, file: String = #file, line: Int = #line) {
        self.recordException(error)
        self.setStatus(.error(description: error.localizedDescription))
        self.setAttribute(key: "error.file", value: file)
        self.setAttribute(key: "error.line", value: line)
        
        // Add stack trace if available
        if let nsError = error as NSError? {
            if let stackTrace = nsError.userInfo[NSStackTraceKey] as? String {
                self.setAttribute(key: "error.stack", value: stackTrace)
            }
        }
    }
}
```

## Troubleshooting

### Common Issues

No Traces Appearing:

- Verify your proxy endpoint is accessible
- Check Info.plist for App Transport Security settings
- Ensure TracingConfiguration is initialized early
- Review proxy logs for incoming requests

High Battery Usage:

- Reduce sampling rate
- Increase batch delay
- Disable tracing when on low battery
- Use adaptive tracing based on app state

Memory Issues:

- Ensure spans are properly ended
- Reduce max queue size
- Implement span lifecycle management
- Monitor for retain cycles

### Debug Logging

Enable debug output:

```swift
// Add to TracingConfiguration
private func enableDebugLogging() {
    #if DEBUG
    // Set up debug logging for OpenTelemetry
    LoggingSystem.bootstrap { label in
        var handler = StreamLogHandler.standardOutput(label: label)
        handler.logLevel = .debug
        return handler
    }
    #endif
}
```

### Testing Traces

```swift
import XCTest
import OpenTelemetryApi

class TracingTests: XCTestCase {
    
    func testSpanCreation() {
        let span = TracingConfiguration.shared.tracer
            .spanBuilder("test-span")
            .startSpan()
        
        span.setAttribute(key: "test", value: true)
        span.end()
        
        // Verify span was created and ended
        XCTAssertNotNil(span)
    }
}
```

## Next Steps

- [Configure your backend proxy](/docs/tracing/sdks/javascript-browser/#proxy-configuration)
- [Set up alerts](/docs/tracing/alerts/creating-alerts/)
- [Explore traces](/docs/tracing/reports/explorer/)
- [Android SDK](/docs/tracing/sdks/android/)

## Related Documentation

- [OpenTelemetry Swift](https://github.com/open-telemetry/opentelemetry-swift)
- [OpenTelemetry iOS Examples](https://github.com/open-telemetry/opentelemetry-swift/tree/main/Examples)
- [Apple Developer Documentation](https://developer.apple.com/documentation/)