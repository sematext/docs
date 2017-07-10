[Sematext-metrics-reporter](https://github.com/sematext/sematext-metrics-reporter)
is an extension for the[ Coda Hale
Metrics](http://metrics.codahale.com/) library version 2.2.0 and 3.x for
sending metrics to [SPM](http://sematext.com/spm/index.html).  Under the
hood sematext-metrics Java library is used to send metrics as [Custom
Metrics](Custom-Metrics_5373970.html) to SPM.

### Quick Start

To start sending metrics just create and start SematextMetricsReporter:

``` syntaxhighlighter-pre
MetricRegistry metrics = new MetricRegistry();

SematextClient.initialize("spm token here");
SematextMetricsReporter reporter = SematextMetricsReporter.forClient(SematextClient.client())
  .withFilter(MetricFilter.ALL)
  .withRegistry(metrics)
  .withDurationUnit(TimeUnit.MILLISECONDS)
  .build();

reporter.start(1, TimeUnit.MINUTES);
```

