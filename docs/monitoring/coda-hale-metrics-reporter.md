[Sematext-metrics-reporter](https://github.com/sematext/sematext-metrics-reporter)
is an extension for the[ Coda Hale Metrics](http://metrics.dropwizard.io/) library version 2.2.0 and 3.x for
sending metrics to [SPM](https://sematext.com/spm/).  Under the
hood sematext-metrics Java library is used to send metrics as [Custom Metrics](custom-metrics) to SPM.

### Quick Start

To start sending metrics just create and start SematextMetricsReporter:

``` java
MetricRegistry metrics = new MetricRegistry();

SematextClient.initialize("spm token here");
SematextMetricsReporter reporter = SematextMetricsReporter.forClient(SematextClient.client())
  .withFilter(MetricFilter.ALL)
  .withRegistry(metrics)
  .withDurationUnit(TimeUnit.MILLISECONDS)
  .build();

reporter.start(1, TimeUnit.MINUTES);
```

