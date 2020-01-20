title: Chart Builder
description: Sematext monitoring service exposes APIs and provides libraries that let you send custom metrics and turn them into custom charts and real-time visualizations

Chart Builder enables you to create visualizations of the data sent to Sematext. It lets
you build charts not only for metrics but also logs. Charts created through the builder
are added to your reports or dashboards. Configuration of a chart requires specifying a list of
series with the metrics, optional filters and groupings. Each series is translated to a query, sent to
Sematext backend. Then extraction and processing of your data happens. Charts built through the 
builder give you a great tool to show the spikes, trends helping you to understand how your
application behaves in real time or how it behaved in the past.

You can put many series on a single chart. Each can be configured to have it's own color and
style (bar, line, area, points). Each series should be configured in a series
configuration panel. The panel where you change the settings of each series is split in a
couple sections.

## Metrics

In this section you pick one ore more metrics which are used to build a data series. If more
than one metric is picked you have to apply transformations to let Chart Builder know what is
the relation between metrics. If you don't write your own
expression in transformation section all metrics are added to each other producing
a single series.

## Transformation

Transformations are used to modify metrics with a formula. Why is this useful? Imagine you collect
all the ingredients of cpu usage separately, like `os.cpu.user`, `os.cpu.system`, `os.cpu.wait`,
... If you want to chart all the ingredients as a single series you have to
sum them in an expression like the one below

```
`os.cpu.user` + `os.cpu.system` + `os.cpu.wait`
```

Another example is ratio. Imagine that you are interested in the ratio of the network input
traffic and the network output traffic so you can easily spot suspicious behaviors of the system
(sudden jump of output traffic which is not correlated with the input traffic jump). Then
you simply divide one metric by another to get the interesting series:

```
`os.network.out` / `os.network.in`
```

_NOTE: All the metrics which have dot in the name have to be mentioned between_ ``` `` ``` .

### Math operators

You already know why transformations are needed. Here is what you can use to build transformations.

We support math operators `+`, `-`, `*`, `/`, `%`. Parts of the expressions can be scoped
with parenthesis `()`. For example

```
`os.cpu.user` / (`os.cpu.user` + `os.cpu.system` + `os.cpu.wait`) 
```

### Functions

In addition to math operations there are functions which also can be used. The list of functions
will be growing.

##### ifNull

  Returns an alternative value if the main argument is NULL.

  __Usage__:

  ```ifNull(x, y)```

  __Example__:

  ```ifNull(`os.disk.usage`, 0)```


##### coalesce

  Checks from left to right whether NULL arguments were passed and returns the first
  non-NULL argument. This function gets any number of parameters.


  __Usage__:

  ```coalesce(x, y, ...)```

  __Example__:
  
  Consider you collect 2 different metrics which have similar meaning. On one host you collect a
  metric which is called `os.disk.usage` and on the second host you collect a metric called
  `os.disk.used`. You'd like to show a total disk usage from 2 hosts. Unfortunately metrics
  are called differently. Here's where `coalesce` is useful. You simply call the function 
  ```coalesce(`os.disk.usage`, `os.disk.used`, 0)```. Depending on the metrics' name for a given
  datapoint one of `os.disk.usage`, `os.disk.used` and `0` will be picked.


## Filter by

Filter section is used to specify a criteria that is used to find only matching datapoints.
Suppose you collect data from multiple hosts but you'd like to see a chart containing only
2 of them (`host1` and `host2`). You have to pick the right filter
in [Filter by](#filterby) section. You chose tag name `os.host` and 2 tag values `host1` and `host2`.

Not all tags are physically stored with the datapoints but there can be a
logical connection between a tag (for example `os.host`) and so called tag alias. This tag
alias can describe for example availability zone, cpu type, etc. Read more
about [tag aliases](/monitoring/tag-aliases-support).

You can filter by tag aliases the same way as they are regular tags so this is completely
transparent to you.

You can use [variables](#variables) as tag values so they can be configured dynamically
from the report level.

## Group by

In Group by section you choose what grouping data series on a graph. For example, if you
choose `os.host` tag and aggregation in `Aggregation` field you choose `all separately`
the chart will show data series for each host separately. Each data series is made up of
the selected metric on a particular host.

You can use [variables](#variables) as tag values so they can be configured dynamically
from the report level.

### Aggregation functions

Back to the example from the section above, if you choose aggregation function instead of `all separately`
only one data series is created for all the hosts. The result depends on the aggregation function
function you choose. The aggregation function determines how the metrics are
aggregated into a single data series. You can pick one of `avg`, `sum`, `min`, `max`


## Rollup by

Datapoints sent to Sematext have time label. If a metric is updated every 10 second, and you are
looking at 24 hours time range, you need 14400 points to display all datapoints. 
Presenting so many datapoints on the chart would make the chart not readable and would impact
the web browser performance. If we build time buckets each containing 600 datapoints
we will have 24 datapoints to present on the chart (each datapoint for each hour). Rollup function
decides how time buckets are built (what aggregation is performed).

Each of predefined metrics has its own default rollup function defined depending on the type of
a metric. All the gauge metrics use average rollup function and all metrics of a type counter
use sum rollup function. In some cases it makes sense to customize the setting.

_NOTE: Recommended for expert users._


## Variables

Variables are used to dynamically filter and group by one or more widgets in the report by tags.

Filters from the `Filter by` section don't have to be configured statically when a chart
is created. Sometimes you need charts on the dashboard to react on a global filter
change. Consider a case where you're troubleshooting a system and you realized that one of the
hosts has problems. You have a dashboard which contains aggregate information for all hosts. You can
of course reconfigure all the components from the dashboard so they show only interesting host data.
As you might expect this is not a very efficient way of troubleshooting. Here is where Variables
become a very useful feature. You can just create a tag variable which points to field `os.host`.
Later this variable should be added to the charts which should listen for variable changes.
A variable is automatically added on top of the dashboard. When you change the tag values in the
variable charts will automatically reload the content to match the filter.

Variables can be used not only in `Filter by` section but also in group by section. Suppose you
have a dashboard with a couple charts which show aggregated metrics about disk usage on many hosts.
You want to troubleshoot a problem that you spotted on one of the charts (small jump on disk usage).
To identify the root cause you can try to find the problem by grouping metrics by `os.host`
tag. A group variable can let you to do that from the level of the dashboard without changing the
definition of series on any charts. Now imagine that you grouped data by `os.host` but still don't
see any obvious problem, because the disk usage jumped on all hosts. Then you may decide
to also group by `os.disk` and by doing that you may realize that the problem was only
`/dev/nvme0n2` disks.

Variables can be created in Report options "Manage variables".

![Manage Variables](../images/dashboards/variables.png)

