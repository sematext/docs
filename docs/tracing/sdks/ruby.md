title: Ruby OpenTelemetry SDK for Sematext Tracing
description: Complete guide to instrumenting Ruby applications with OpenTelemetry for Sematext Tracing

## Ruby OpenTelemetry SDK

This guide covers how to instrument Ruby applications with OpenTelemetry to send traces to Sematext Tracing.

Ruby OpenTelemetry primarily relies on manual instrumentation, though some automatic instrumentation libraries are available for specific frameworks.

## Basic Setup

### 1. Add OpenTelemetry Gems to Your Gemfile

```ruby
gem 'opentelemetry-sdk'
gem 'opentelemetry-exporter-otlp'
gem 'opentelemetry-instrumentation-all'
```

Or for specific instrumentations:
```ruby
gem 'opentelemetry-sdk'
gem 'opentelemetry-exporter-otlp'
gem 'opentelemetry-instrumentation-rails'
gem 'opentelemetry-instrumentation-active_record'
gem 'opentelemetry-instrumentation-net_http'
```

### 2. Install Gems

```bash
bundle install
```

### 3. Initialize OpenTelemetry

```ruby
require 'opentelemetry/sdk'
require 'opentelemetry/exporter/otlp'

OpenTelemetry::SDK.configure do |c|
  c.service_name = 'your-service-name'
  c.service_version = '1.0.0'
  
  c.add_span_processor(
    OpenTelemetry::SDK::Trace::Export::BatchSpanProcessor.new(
      OpenTelemetry::Exporter::OTLP::Exporter.new(
        endpoint: 'http://localhost:4338'
      )
    )
  )
end
```

## Rails Application

### Configuration for Rails

Create an initializer `config/initializers/opentelemetry.rb`:

```ruby
require 'opentelemetry/sdk'
require 'opentelemetry/exporter/otlp'
require 'opentelemetry/instrumentation/rails'
require 'opentelemetry/instrumentation/active_record'
require 'opentelemetry/instrumentation/net_http'

OpenTelemetry::SDK.configure do |c|
  c.service_name = Rails.application.class.module_parent_name.downcase
  c.service_version = '1.0.0'
  
  # Add resource attributes
  c.resource = OpenTelemetry::SDK::Resources::Resource.create({
    'service.name' => Rails.application.class.module_parent_name.downcase,
    'service.version' => '1.0.0',
    'deployment.environment' => Rails.env,
    'service.framework' => 'rails'
  })
  
  # Configure instrumentation
  c.use 'OpenTelemetry::Instrumentation::Rails', {
    enable_recognize_route: true,
    enable_action_view: true,
    enable_action_cable: true
  }
  c.use 'OpenTelemetry::Instrumentation::ActiveRecord'
  c.use 'OpenTelemetry::Instrumentation::Net::HTTP'
  
  # Add OTLP exporter
  c.add_span_processor(
    OpenTelemetry::SDK::Trace::Export::BatchSpanProcessor.new(
      OpenTelemetry::Exporter::OTLP::Exporter.new(
        endpoint: 'http://localhost:4338',
        headers: {}
      )
    )
  )
end
```

### Rails Controller Example

```ruby
class UsersController < ApplicationController
  def show
    tracer = OpenTelemetry.tracer_provider.tracer('users-controller')
    
    tracer.in_span('get-user-action') do |span|
      user_id = params[:id]
      span.set_attribute('user.id', user_id)
      span.set_attribute('controller.action', 'show')
      
      begin
        @user = User.find(user_id)
        span.set_attribute('user.found', true)
        span.set_attribute('user.name', @user.name)
        
        render json: { user: @user }
      rescue ActiveRecord::RecordNotFound => e
        span.set_attribute('user.found', false)
        span.record_exception(e)
        span.set_status(OpenTelemetry::Trace::Status.error('User not found'))
        
        render json: { error: 'User not found' }, status: :not_found
      rescue StandardError => e
        span.record_exception(e)
        span.set_status(OpenTelemetry::Trace::Status.error(e.message))
        
        render json: { error: 'Internal server error' }, status: :internal_server_error
      end
    end
  end
end
```

### Rails Model with Custom Spans

```ruby
class User < ApplicationRecord
  def self.find_with_caching(id)
    tracer = OpenTelemetry.tracer_provider.tracer('user-model')
    
    tracer.in_span('find-user-with-cache') do |span|
      span.set_attribute('user.id', id)
      span.set_attribute('operation.type', 'database-with-cache')
      
      # Check cache first
      cached_user = Rails.cache.read("user:#{id}")
      
      if cached_user
        span.set_attribute('cache.hit', true)
        span.add_event('Cache hit for user')
        return cached_user
      end
      
      span.set_attribute('cache.hit', false)
      span.add_event('Cache miss, querying database')
      
      user = find(id)
      
      # Cache the result
      Rails.cache.write("user:#{id}", user, expires_in: 1.hour)
      span.add_event('User cached for future requests')
      
      user
    end
  end
  
  def update_profile(attributes)
    tracer = OpenTelemetry.tracer_provider.tracer('user-model')
    
    tracer.in_span('update-user-profile') do |span|
      span.set_attribute('user.id', self.id)
      span.set_attribute('attributes.count', attributes.keys.size)
      
      transaction do
        update!(attributes)
        span.set_attribute('update.success', true)
        span.add_event('Profile updated successfully')
      end
    rescue ActiveRecord::RecordInvalid => e
      span.record_exception(e)
      span.set_status(OpenTelemetry::Trace::Status.error('Validation failed'))
      raise
    end
  end
end
```

## Sinatra Application

### Basic Sinatra Setup

```ruby
require 'sinatra'
require 'opentelemetry/sdk'
require 'opentelemetry/exporter/otlp'
require 'opentelemetry/instrumentation/sinatra'

# Configure OpenTelemetry
OpenTelemetry::SDK.configure do |c|
  c.service_name = 'sinatra-api'
  c.use 'OpenTelemetry::Instrumentation::Sinatra'
  
  c.add_span_processor(
    OpenTelemetry::SDK::Trace::Export::BatchSpanProcessor.new(
      OpenTelemetry::Exporter::OTLP::Exporter.new(
        endpoint: 'http://localhost:4338'
      )
    )
  )
end

get '/users/:id' do
  tracer = OpenTelemetry.tracer_provider.tracer('sinatra-api')
  
  tracer.in_span('get-user-sinatra') do |span|
    user_id = params[:id]
    span.set_attribute('user.id', user_id)
    span.set_attribute('http.method', request.request_method)
    span.set_attribute('http.path', request.path)
    
    begin
      user = fetch_user(user_id)
      content_type :json
      { user: user }.to_json
    rescue StandardError => e
      span.record_exception(e)
      span.set_status(OpenTelemetry::Trace::Status.error(e.message))
      status 500
      { error: 'Internal server error' }.to_json
    end
  end
end

def fetch_user(user_id)
  tracer = OpenTelemetry.tracer_provider.tracer('sinatra-api')
  
  tracer.in_span('fetch-user') do |span|
    span.set_attribute('user.id', user_id)
    span.set_attribute('data.source', 'database')
    
    # Simulate database call
    sleep(0.1)
    
    { id: user_id, name: 'John Doe', email: 'john@example.com' }
  end
end
```

## Manual Instrumentation

### Creating Spans Manually

```ruby
tracer = OpenTelemetry.tracer_provider.tracer('my-service')

tracer.in_span('business-operation') do |span|
  span.set_attribute('operation.type', 'data-processing')
  span.set_attribute('input.size', data.size)
  
  begin
    result = process_data(data)
    
    span.set_attribute('result.count', result.length)
    span.set_attribute('operation.success', true)
    span.add_event('Processing completed successfully')
    
    result
  rescue StandardError => e
    span.record_exception(e)
    span.set_status(OpenTelemetry::Trace::Status.error(e.message))
    raise
  end
end
```

### Nested Spans

```ruby
def complex_operation(data)
  tracer = OpenTelemetry.tracer_provider.tracer('my-service')
  
  tracer.in_span('complex-operation') do |parent_span|
    parent_span.set_attribute('data.type', data.class.name)
    
    # Step 1: Validation
    tracer.in_span('validate-data') do |validation_span|
      validation_span.set_attribute('validation.rules', 'required,format,length')
      validate_data(data)
      validation_span.add_event('Data validation passed')
    end
    
    # Step 2: Processing  
    tracer.in_span('process-data') do |processing_span|
      processing_span.set_attribute('processing.algorithm', 'v2')
      result = transform_data(data)
      processing_span.set_attribute('processing.output_size', result.size)
      result
    end
  end
end
```

## Database Instrumentation

### Available Instrumentation Gems

```ruby
# Add to Gemfile
gem 'opentelemetry-instrumentation-active_record'  # ActiveRecord
gem 'opentelemetry-instrumentation-mysql2'         # MySQL
gem 'opentelemetry-instrumentation-pg'             # PostgreSQL
gem 'opentelemetry-instrumentation-redis'          # Redis
gem 'opentelemetry-instrumentation-mongo'          # MongoDB
```

### ActiveRecord Configuration

```ruby
OpenTelemetry::SDK.configure do |c|
  c.use 'OpenTelemetry::Instrumentation::ActiveRecord', {
    # Enable SQL statement capture (be careful with sensitive data)
    enable_sql_obfuscation: true
  }
end
```

### Custom Database Spans

```ruby
class UserRepository
  def find_with_tracing(id)
    tracer = OpenTelemetry.tracer_provider.tracer('user-repository')
    
    tracer.in_span('user-repository-find') do |span|
      span.set_attribute('user.id', id)
      span.set_attribute('db.operation', 'SELECT')
      span.set_attribute('db.table', 'users')
      
      start_time = Time.now
      
      begin
        user = User.find(id)
        
        duration = Time.now - start_time
        span.set_attribute('db.duration_ms', (duration * 1000).round(2))
        span.set_attribute('user.found', true)
        
        user
      rescue ActiveRecord::RecordNotFound
        span.set_attribute('user.found', false)
        span.add_event('User not found in database')
        raise
      end
    end
  end
end
```

## HTTP Client Instrumentation

### Net::HTTP

```ruby
# Automatically instrumented when using the net_http instrumentation
require 'opentelemetry/instrumentation/net_http'

OpenTelemetry::SDK.configure do |c|
  c.use 'OpenTelemetry::Instrumentation::Net::HTTP'
end

# Usage - automatically traced
uri = URI('https://api.example.com/users/123')
response = Net::HTTP.get_response(uri)
```

### Custom HTTP Client Spans

```ruby
require 'httparty'

class ApiClient
  include HTTParty
  
  def self.fetch_user_profile(user_id)
    tracer = OpenTelemetry.tracer_provider.tracer('api-client')
    
    tracer.in_span('fetch-external-user-profile') do |span|
      span.set_attribute('user.id', user_id)
      span.set_attribute('http.url', "https://api.example.com/users/#{user_id}")
      span.set_attribute('http.method', 'GET')
      
      start_time = Time.now
      
      begin
        response = get("/users/#{user_id}")
        
        duration = Time.now - start_time
        span.set_attribute('http.duration_ms', (duration * 1000).round(2))
        span.set_attribute('http.status_code', response.code)
        
        if response.success?
          span.set_attribute('http.success', true)
          response.parsed_response
        else
          span.set_attribute('http.success', false)
          span.set_status(OpenTelemetry::Trace::Status.error("HTTP #{response.code}"))
          raise "HTTP Error: #{response.code}"
        end
      rescue StandardError => e
        span.record_exception(e)
        span.set_status(OpenTelemetry::Trace::Status.error(e.message))
        raise
      end
    end
  end
end
```

## Background Jobs

### Sidekiq Integration

```ruby
# Add to Gemfile
gem 'opentelemetry-instrumentation-sidekiq'

# Configure
OpenTelemetry::SDK.configure do |c|
  c.use 'OpenTelemetry::Instrumentation::Sidekiq'
end

# Job class
class UserNotificationJob
  include Sidekiq::Worker
  
  def perform(user_id, message)
    tracer = OpenTelemetry.tracer_provider.tracer('sidekiq-job')
    
    tracer.in_span('user-notification-job') do |span|
      span.set_attribute('user.id', user_id)
      span.set_attribute('message.type', 'notification')
      span.set_attribute('job.queue', 'default')
      
      begin
        user = User.find(user_id)
        send_notification(user, message)
        
        span.set_attribute('notification.sent', true)
        span.add_event('Notification sent successfully')
      rescue StandardError => e
        span.record_exception(e)
        span.set_status(OpenTelemetry::Trace::Status.error(e.message))
        raise
      end
    end
  end
  
  private
  
  def send_notification(user, message)
    # Notification logic here
    sleep(0.5) # Simulate API call
  end
end
```

## Configuration Options

### Environment Variables

```bash
export OTEL_SERVICE_NAME=my-ruby-service
export OTEL_SERVICE_VERSION=1.0.0
export OTEL_RESOURCE_ATTRIBUTES=environment=production,team=backend
export OTEL_EXPORTER_OTLP_ENDPOINT=http://localhost:4338
export OTEL_EXPORTER_OTLP_PROTOCOL=http/protobuf
```

### Advanced Configuration

```ruby
OpenTelemetry::SDK.configure do |c|
  c.service_name = ENV['OTEL_SERVICE_NAME'] || 'ruby-app'
  c.service_version = ENV['OTEL_SERVICE_VERSION'] || '1.0.0'
  
  # Custom resource attributes
  c.resource = OpenTelemetry::SDK::Resources::Resource.create({
    'service.name' => c.service_name,
    'service.version' => c.service_version,
    'deployment.environment' => ENV['RAILS_ENV'] || 'development',
    'host.name' => Socket.gethostname
  })
  
  # Sampling configuration
  c.sampler = OpenTelemetry::SDK::Trace::Samplers::TraceIdRatioBased.new(0.1) # 10%
  
  # Configure span processors
  c.add_span_processor(
    OpenTelemetry::SDK::Trace::Export::BatchSpanProcessor.new(
      OpenTelemetry::Exporter::OTLP::Exporter.new(
        endpoint: ENV['OTEL_EXPORTER_OTLP_ENDPOINT'] || 'http://localhost:4338',
        headers: {},
        timeout: 30
      ),
      # Batch processor configuration
      max_queue_size: 2048,
      schedule_delay_millis: 5000,
      max_export_batch_size: 512,
      export_timeout_millis: 30000
    )
  )
end
```

## Available Instrumentation Gems

```ruby
# Core gems
gem 'opentelemetry-sdk'
gem 'opentelemetry-exporter-otlp'

# Web frameworks
gem 'opentelemetry-instrumentation-rails'
gem 'opentelemetry-instrumentation-sinatra'
gem 'opentelemetry-instrumentation-rack'

# Databases
gem 'opentelemetry-instrumentation-active_record'
gem 'opentelemetry-instrumentation-mysql2'
gem 'opentelemetry-instrumentation-pg'
gem 'opentelemetry-instrumentation-redis'
gem 'opentelemetry-instrumentation-mongo'

# HTTP clients
gem 'opentelemetry-instrumentation-net_http'
gem 'opentelemetry-instrumentation-faraday'
gem 'opentelemetry-instrumentation-rest_client'

# Background jobs
gem 'opentelemetry-instrumentation-sidekiq'
gem 'opentelemetry-instrumentation-delayed_job'

# Other libraries
gem 'opentelemetry-instrumentation-aws_sdk'
gem 'opentelemetry-instrumentation-bunny'  # RabbitMQ
gem 'opentelemetry-instrumentation-graphql'
```

## Troubleshooting

### Debug Configuration

```ruby
# Enable debug logging
require 'logger'

OpenTelemetry.logger = Logger.new(STDOUT)
OpenTelemetry.logger.level = Logger::DEBUG

# Add console exporter for debugging
require 'opentelemetry/exporter/console'

OpenTelemetry::SDK.configure do |c|
  c.add_span_processor(
    OpenTelemetry::SDK::Trace::Export::SimpleSpanProcessor.new(
      OpenTelemetry::Exporter::Console::SpanExporter.new
    )
  )
end
```

### Common Issues

**No Traces Appearing**
- Verify Sematext Agent is running
- Check OTLP endpoint configuration
- Ensure proper gem installation

**Memory Issues**
```ruby
# Configure batch processor with smaller settings
c.add_span_processor(
  OpenTelemetry::SDK::Trace::Export::BatchSpanProcessor.new(
    exporter,
    max_queue_size: 512,
    max_export_batch_size: 128
  )
)
```

### Verification Script

```ruby
# test_tracing.rb
require 'opentelemetry/sdk'
require 'opentelemetry/exporter/otlp'

OpenTelemetry::SDK.configure do |c|
  c.service_name = 'test-service'
  c.add_span_processor(
    OpenTelemetry::SDK::Trace::Export::SimpleSpanProcessor.new(
      OpenTelemetry::Exporter::Console::SpanExporter.new
    )
  )
end

tracer = OpenTelemetry.tracer_provider.tracer('test-tracer')

tracer.in_span('test-span') do |span|
  span.set_attribute('test.attribute', 'test-value')
  puts 'Test span created'
end
```

## Best Practices

### Span Management

```ruby
# Use in_span for automatic span lifecycle management
tracer.in_span('operation-name') do |span|
  # Work here - span is automatically ended
end

# Manual span management (use with caution)
span = tracer.start_span('manual-span')
begin
  # Work here
ensure
  span.finish
end
```

### Error Handling

```ruby
begin
  # Business logic
rescue StandardError => e
  span.record_exception(e)
  span.set_status(OpenTelemetry::Trace::Status.error(e.message))
  raise
end
```

### Attributes and Events

```ruby
# Set attributes
span.set_attribute('user.id', user_id)
span.set_attribute('operation.duration_ms', duration_ms)

# Add events
span.add_event('Operation started')
span.add_event('Validation completed', { 'validation.result' => 'passed' })

# Avoid sensitive data
# span.set_attribute('password', secret) # Don't do this
```

## Next Steps

- [Configure Sematext Agent](/docs/agents/sematext-agent/opentelemetry/)
- [Explore Traces](/docs/tracing/reports/explorer/)
- [Set Up Alerts](/docs/tracing/alerts/creating-alerts/)
- [Other SDK Languages](/docs/tracing/sdks/)

## Related Documentation

- [OpenTelemetry Ruby Documentation](https://opentelemetry.io/docs/instrumentation/ruby/)
- [Ruby Instrumentation Libraries](https://opentelemetry.io/docs/instrumentation/ruby/libraries/)
- [Troubleshooting Guide](/docs/tracing/troubleshooting/)