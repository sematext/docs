title: PHP OpenTelemetry SDK for Sematext Tracing
description: Complete guide to instrumenting PHP applications (Laravel, Symfony, vanilla PHP) with OpenTelemetry for Sematext Tracing

## PHP OpenTelemetry SDK

This guide covers how to instrument PHP applications with OpenTelemetry to send traces (and optionally metrics and logs) to Sematext. Both auto-instrumentation (via the OpenTelemetry PHP extension) and manual instrumentation are supported.

## Prerequisites

- PHP 8.2 or newer
- [Composer](https://getcomposer.org/) for dependency management
- The OpenTelemetry PHP extension (`ext-opentelemetry`) for auto-instrumentation
- A Sematext App ([create one](/docs/tracing/create-tracing-app/)) and your token
- One of:
    - The [Sematext Agent](/docs/agents/sematext-agent/opentelemetry/) running locally (agent flow), or
    - Direct connectivity to the [managed OTLP endpoint](/docs/guide/managed-otlp-endpoint/) (managed flow)

## Install the OpenTelemetry PHP extension

Auto-instrumentation requires a PHP extension that hooks into the runtime. Install it with PECL:

```bash
pecl install opentelemetry
```

Enable it in `php.ini`:

```ini
extension=opentelemetry.so
```

Verify:

```bash
php -m | grep opentelemetry
```

You can skip this extension if you only plan to use manual instrumentation — but auto-instrumentation is much faster to get started with.

## Install OpenTelemetry packages

In your project root:

```bash
composer require \
  open-telemetry/sdk \
  open-telemetry/exporter-otlp \
  open-telemetry/opentelemetry-auto-laravel
```

Swap `opentelemetry-auto-laravel` for the appropriate auto-instrumentation package for your framework (Symfony, Slim, etc.) — see the [OpenTelemetry PHP registry](https://opentelemetry.io/ecosystem/registry/?language=php) for the full list.

## Configure environment variables

The OpenTelemetry PHP SDK reads its configuration from environment variables. Pick the flow that matches your setup.

### Flow A — Sematext Agent (default in the per-language examples)

```bash
export OTEL_PHP_AUTOLOAD_ENABLED=true
export OTEL_SERVICE_NAME=your-service-name
export OTEL_SERVICE_VERSION=1.0.0

export OTEL_TRACES_EXPORTER=otlp
export OTEL_METRICS_EXPORTER=otlp
export OTEL_LOGS_EXPORTER=none   # auto-instrumentation doesn't ship logs

export OTEL_EXPORTER_OTLP_TRACES_ENDPOINT=http://localhost:4338
export OTEL_EXPORTER_OTLP_METRICS_ENDPOINT=http://localhost:4318
export OTEL_EXPORTER_OTLP_PROTOCOL=http/protobuf
```

`OTEL_PHP_AUTOLOAD_ENABLED=true` is required for the PHP SDK to bootstrap automatically when the extension is loaded.

### Flow B — Managed OTLP endpoint (no agent)

```bash
export OTEL_PHP_AUTOLOAD_ENABLED=true
export OTEL_SERVICE_NAME=your-service-name
export OTEL_SERVICE_VERSION=1.0.0

export OTEL_TRACES_EXPORTER=otlp
export OTEL_METRICS_EXPORTER=otlp
export OTEL_LOGS_EXPORTER=none

# Pick US or EU based on your account region
export OTEL_EXPORTER_OTLP_ENDPOINT=https://otlp-receiver.eu.sematext.com
export OTEL_EXPORTER_OTLP_PROTOCOL=http/protobuf

# Per-signal tokens — only set the ones for Apps you've actually created
export OTEL_EXPORTER_OTLP_TRACES_HEADERS=X-API-TOKEN=<tracing-app-token>
export OTEL_EXPORTER_OTLP_METRICS_HEADERS=X-API-TOKEN=<monitoring-app-token>
```

See [Managed OTLP Endpoint](/docs/guide/managed-otlp-endpoint/) for the full endpoint matrix (US/EU × HTTP/gRPC), compression options, and troubleshooting.

## Auto vs manual instrumentation

| Style | Traces | Metrics | Logs | Code changes |
|---|---|---|---|---|
| **Auto-instrumentation** | ✅ | ✅ | ❌ | None — just env vars + the extension |
| **Manual instrumentation** | ✅ | ✅ | ✅ | Explicit SDK init + span creation |

Auto-instrumentation is the recommended starting point for Laravel, Symfony, and other supported frameworks. Switch to (or add) manual instrumentation when you need:

- Custom spans around your own business logic
- Custom span attributes (user tier, feature flag, etc.)
- Log shipping (auto doesn't cover OTel logs in PHP today)

The two styles compose: you can add manual spans on top of auto-instrumentation in the same application.

## Manual instrumentation example

Bootstrap the SDK and create a custom span:

```php
<?php
use OpenTelemetry\API\Globals;
use OpenTelemetry\API\Trace\StatusCode;

require __DIR__ . '/vendor/autoload.php';

$tracer = Globals::tracerProvider()->getTracer('my-service');

$span = $tracer->spanBuilder('checkout')->startSpan();
$scope = $span->activate();
try {
    $span->setAttribute('user.tier', $userTier);
    // ... your code ...
    $span->setStatus(StatusCode::STATUS_OK);
} catch (\Throwable $e) {
    $span->recordException($e);
    $span->setStatus(StatusCode::STATUS_ERROR, $e->getMessage());
    throw $e;
} finally {
    $scope->detach();
    $span->end();
}
```

The SDK reads its exporter config from the same `OTEL_EXPORTER_OTLP_*` env vars as auto-instrumentation, so the same Flow A / Flow B blocks above apply.

## Running a worked example

The [`sematext-otel-onboarding`](https://github.com/sematext/sematext-otel-onboarding) repository has a complete Laravel example with both auto and manual instrumentation, for baremetal / Docker / Kubernetes:

- [`php/baremetal/auto-instrumentation/laravel/`](https://github.com/sematext/sematext-otel-onboarding/tree/main/php/baremetal/auto-instrumentation/laravel)
- [`php/baremetal/manual-instrumentation/laravel/`](https://github.com/sematext/sematext-otel-onboarding/tree/main/php/baremetal/manual-instrumentation/laravel)
- [`php/docker/`](https://github.com/sematext/sematext-otel-onboarding/tree/main/php/docker) — Docker variants
- [`php/kubernetes/`](https://github.com/sematext/sematext-otel-onboarding/tree/main/php/kubernetes) — Kubernetes variants

Clone the repo and follow the per-example README — they're self-contained, ready to run against a Sematext account, and a good baseline if your project gets stuck.

## Troubleshooting

| Symptom | Likely cause |
|---|---|
| `php -m | grep opentelemetry` returns nothing | Extension installed but not enabled in `php.ini` — confirm with `php --ini` to see which file is loaded |
| Auto-instrumentation isn't producing any spans | `OTEL_PHP_AUTOLOAD_ENABLED=true` is missing, or the framework-specific package (`opentelemetry-auto-laravel`, etc.) isn't installed |
| Traces ship but metrics don't | `OTEL_METRICS_EXPORTER=otlp` not set, or the metrics endpoint isn't reachable |
| Logs don't ship even with manual instrumentation | OTel logs in PHP are newer — confirm your `open-telemetry/sdk` version and logger configuration |
| 401 / 403 from the managed endpoint | Token in `OTEL_EXPORTER_OTLP_*_HEADERS` is for the wrong region, or sent as `Authorization: Bearer` instead of `X-API-TOKEN` |

## See also

- [OpenTelemetry PHP documentation](https://opentelemetry.io/docs/languages/php/)
- [OpenTelemetry PHP auto-instrumentation](https://opentelemetry.io/docs/zero-code/php/)
- [Managed OTLP Endpoint](/docs/guide/managed-otlp-endpoint/) — direct-to-Sematext flow
- [Sematext Agent OpenTelemetry](/docs/agents/sematext-agent/opentelemetry/) — local-agent flow
- [AI-Powered OTel Onboarding](/docs/guide/ai-powered-otel-onboarding/) — interactive setup
- [sematext-otel-onboarding repository](https://github.com/sematext/sematext-otel-onboarding) — runnable PHP examples
