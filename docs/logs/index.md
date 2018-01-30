If you are new to Logsene, think of it as logging as a service - Logsene is
your own logging box in the cloud (or [running on your own infrastructure](../sematext-enterprise)),
a cheaper alternative to Splunk, or even
as Hosted Elasticsearch, since one of the APIs Logsene exposes is
[Elasticsearch API for indexing](index-events-via-elasticsearch-api) and
[searching](searching-log-events).

Below, you can find how you can get started.

#### Creating a Logsene App

After you get logged in to Sematext Cloud at <https://apps.sematext.com> (or <https://apps.eu.sematext.com> if using Sematext Cloud Europe), the first step
is to create an app. An app is an independent namespace
for your data. For example, if you have a development and a production
environment, it might make sense to have one app for each. You
can create as many apps as you want.

After creating an app you will get a confirmation screen that tells you how
to [send data to your new application](sending-log-events). Once you start
sending data, you can start [searching and analyzing those events](searching-log-events) via the native Logsene UI or [explore your data with Kibana](kibana).

#### Adding Data to Your App

There are two ways to
send data: [through Elasticsearch's API](index-events-via-elasticsearch-api) or [through syslog](syslog).

##### Elasticsearch API (Logstash & friends)

The easiest way to send logs from your files is
[through Logstash](logstash), Filebeat, or [Logagent](/logagent). You
can also use any tool that works with Elasticsearch's REST API, for both
[indexing](index-events-via-elasticsearch-api) and
[searching](search-through-the-elasticsearch-api). The
only condition is to use the app's token as the index name, and
**http://logsene-receiver.sematext.com:80** (or http://logsene-receiver.eu.sematext.com:80 if using Sematext Cloud Europe) as the address.

For more details on using the Elasticsearch REST API with Logsene, visit
the following page: [Index Events via Elasticsearch API](index-events-via-elasticsearch-api). Note that the API
supports both HTTP and HTTPS. The HTTPS endpoint would be
**https://logsene-receiver.sematext.com:443** / **https://logsene-receiver.eu.sematext.com:443**

##### Syslog

You can forward syslog via **UDP** (port 514), **TCP** (port 514),
**RELP** (port 20514) and **TLS** (port 10514). The host name is
**logsene-syslog-receiver.sematext.com** / **logsene-syslog-receiver.eu.sematext.com**

To get started quickly, you can use our configuration script and add
your application token as a parameter:

``` bash
curl -O https://apps.sematext.com/logsene/configure-syslog.py
sudo python configure-syslog.py $ADD-YOUR-APPLICATION-TOKEN-HERE
```

For more details, take a look at the [Syslog](syslog) page,
and the pages that are linked from it.

#### Searching and Visualizing Your Data

For searching and visualizing, you have two UIs that you can use out of
the box:

  - the native Logsene UI
  - [Kibana](kibana)

#### Change Your App's Settings

App's settings include, but are not limited to:

  - inviting new users to your application
  - [authorizing public IPs to send data to your application via syslog](authorizing-ips-for-syslog)
  - adjusting data retention time, daily volume, and limits
  - [changing your app's plan](faq/#plans-prices)
  - checking how much data is, or has been shipped to your app

##### Invite Users

Inviting new users lets them see your app(s). You can also make them ADMINs, which enables them to change some of the app's settings, too.

##### Authorize IP for Syslog

When you [send data via TCP/UDP/RELP syslog](syslog), you
can authorize by using the Logsene app token, or by registering
your public IP address. If you choose registering IPs, [this page](authorizing-ips-for-syslog) will guide you on doing
that from your app's settings or from the Logsene App
screen.

##### Storage and Retention

The Storage section shows how many logs (in count and as bytes) are stored in your app.
Old logs are being removed based on how long you choose to keep them. For example, if the retention time is 7
days then logs with the value of the **@timestamp** field
older than 7 days will be removed.

#### Getting Support

We hope you enjoy using Logsene. If you need further support, or have
any feedback regarding our products, please don't hesitate to [contact us](mailto:support@sematext.com)\!

