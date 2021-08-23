title: Custom Metrics
description: Sematext infrastructure and application monitoring service exposes APIs and provides endpoints that let you send custom metrics and turn them into dashboards and real-time visualizations
    
You can send custom metrics to any of your monitoring Apps. These metrics will be counted towards your
datapoints-per-minute quota which may trigger rejection in case of a huge amount of metrics sent from your machines. 
The limits are set very high, though, and under the normal operation it is hard to reach them.

Metrics are sent to metrics receivers (in the US region to `spm-receiver.sematext.com`, in the EU region
to `spm-receiver.eu.sematext.com`). Expected format is based on 
[Influx Line Protocol](https://docs.influxdata.com/influxdb/v1.7/write_protocols/line_protocol_tutorial/), with a few
specific additional requirements. That means that many existing libraries/tools that know how to send metrics to
InfluxDB, can also send the metrics to Sematext backend.

### Sematext specifics

Sematext backend supports v1 of influx line protocol, so endpoint that accepts the metrics is
`spm-receiver.sematext.com/write?db=metrics`. Each metrics line sent to Sematext backend must contain a tag with the
name `token` and value equal to a token of Sematext monitoring App you wish to send the metrics to.

Additionally, it is strongly encouraged, where applicable, to add `os.host` tag with value equal to the name of the
monitored host. This tag is deeply integrated into Sematext backend and lack of it may cause some features to not work.

Sematext backend uses a catalogue of common [tags](https://sematext.com/docs/tags/). Depending on the nature of your
custom metrics, adding some of the tags from this catalogue can make your metrics better integrated into Sematext
ecosystem.


### Metrics line example

```
appStats,token=00000000-1111-2222-3333-444444444444,os.host=host001,service=registration user.requests.count=10i,user.requests.time=327i 1628605794318000000
```

In this example we can see:
- `appStats` - a `measurement` or a `namespace`, it describes the type of metrics in this particular line and it can be
  anything that makes sense to you. It will be used as a prefix to all metrics in this line (so, full name of a metric
  `user.requests.count` is actually `appStats.user.requests.count`)
- `token` - a token of your Sematext monitoring App
- `os.host` and `service` - two tags used to describe these metrics. You can append more tags by appending them after
  `service=registration` (tags have to be separated by a comma)
- `user.requests.count` and `user.requests.time` - two metrics. You can append more metrics, metrics should be comma
  separated.
- `1628605794318000000` - the third and the final element of a metric line, measurement timestamp expressed in
  nanoseconds

A single request can contain any number of metric lines, each line added in a new line (`\n` as a separator between the
lines). We recommend sending batches of between 100 and 500 lines of metrics. Of course, if you don't gather as many
lines, but would still like the metrics to appear in the UI as soon as possible, send smaller batches.

Example of sending a batch of metrics:
```
curl -XPOST -H "Content-Type: text/plain" "https://spm-receiver.sematext.com/write?db=metrics" -d '
appStats,token=00000000-1111-2222-3333-444444444444,os.host=host001,service=registration user.requests.count=10i,user.requests.time=327i 1628605794318000000
appStats,token=00000000-1111-2222-3333-444444444444,os.host=host002,service=payment user.requests.count=31i,user.requests.time=1152i 1628605797988000000
appStats,token=00000000-1111-2222-3333-444444444444,os.host=host003,service=email user.requests.count=20i,user.requests.time=218i 1628605812295000000
'
```

### Metainfo

Each metric has attributes that describe how it is used in the UI. Sematext specific is that such info about metrics
(we call it the "metainfo") can be sent to a separate endpoint. It is enough to send such metainfo just once for your
application.

Metric attributes are:
- name - in the example above, names are `user.requests.count` and `user.requests.time`
- label - name that will be used in charts
- description - longer description of the meaning of particular metric
- numericType - long or double
- type - counter or gauge. In example above, both metrics are counters because they describe how many requests there
  were and how much time those requests took since the previous measurement. Metrics like `memory.used` or
  `disk.space.used` which represent exact value of some metric at particular point in time are gauges.
- unit - can be one of standard units (ms, sec, bytes...) or something custom that makes sense to you.

Here is an example of metainfo line:

```
appStats,label=requests\ count,numericType=long,token=00000000-1111-2222-3333-444444444444,type=counter user.requests.count
```

Metainfo entries can be sent in a single batch, each entry in a new line. The endpoint where these entries are sent is
`https://spm-receiver.sematext.com/write?db=metainfo` (and a similar one for EU region, where base server is
`spm-receiver.eu.sematext.com`)

In case when the metainfo for some metric is missing, the following values will be used:
- name - whatever is the name of the metric, e.g. `user.requests.count`
- label - name will be used instead
- description - it will be empty
- numericType - double
- type - gauge
- unit - it will be empty

One of these attributes can be adjusted directly in the charts - `type`. There is a "rollup" function which is a SUM in
case of a counter and an AVG in case of gauge metric.

### Libraries and tools

A list of official libraries to connect to InfluxDB is [here](https://docs.influxdata.com/influxdb/cloud/api-guide/client-libraries/).
These are, however, libraries that connect to 1.8/2.0 version of InfluxDB, while Sematext backend requires 1.7 or older.
Github repositories of these libraries provide a link to older version which supports 1.7 and which would work with
Sematext.

Another possibility is to use a tool like [Telegraf Agent](https://github.com/influxdata/telegraf). It has support for
InfluxDB 1.7, but (at the time of this writing) there is also a [pull-request](https://github.com/influxdata/telegraf/pull/9586)
for fully compatible Sematext Output. Either of these can be used to send the metrics to Sematext backend, but using
Sematext Output is much simpler as you wouldn't have to worry about any Sematext specific, everything is encapsulated in
Sematext Output logic.

