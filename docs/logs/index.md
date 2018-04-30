Think of Logsene as logging as a service or your own logging box in the cloud (or [running on your own infrastructure](../sematext-enterprise)). 

It is cheaper alternative to Splunk, or even as Hosted Elasticsearch, since one of the APIs Logsene exposes is [Elasticsearch API for indexing](index-events-via-elasticsearch-api) and [searching](searching-log-events).

<img alt="Sematext Monitoring UI screen" src="../images/logs/logsene-ui.png" title="Sematext Logging UI screen"></a>

### Creating a Logsene App

After you get logged in to Sematext Cloud at <https://apps.sematext.com> (or <https://apps.eu.sematext.com> if using Sematext Cloud Europe), the first step
is to create an app. An app is an independent namespace for your data. 

For example, if you have a development and a production environment, it might make sense to have one app for each. You can create as many apps as you want.

After creating an app you will get a confirmation screen that tells you how to [send data to your new application](sending-log-events). Once you start sending data, you can start [searching and analyzing those events](searching-log-events) via the native Logsene UI or [explore your data with Kibana](kibana).

### Adding Data to Your App

There are two ways to send data: [through Elasticsearch's API](index-events-via-elasticsearch-api) or [through syslog](syslog).

#### Elasticsearch API 

The easiest way to send logs from your files is [through Logstash](logstash), Filebeat, or [Logagent](/logagent). You can also use any tool that works with Elasticsearch's REST API, for both [indexing](index-events-via-elasticsearch-api) and [searching](search-through-the-elasticsearch-api). 

The only condition is to use the app's token as the index name, and **http://logsene-receiver.sematext.com:80** (or http://logsene-receiver.eu.sematext.com:80 if using Sematext Cloud Europe) as the address.

For more details on using the Elasticsearch REST API with Logsene, visit the following page: [Index Events via Elasticsearch API](index-events-via-elasticsearch-api). 

Note that the API supports both HTTP and HTTPS. The HTTPS endpoint would be **https://logsene-receiver.sematext.com:443** / **https://logsene-receiver.eu.sematext.com:443**

#### Syslog

You can forward syslog via **UDP** (port 514), **TCP** (port 514), **RELP** (port 20514) and **TLS** (port 10514). The host name is
**logsene-syslog-receiver.sematext.com** / **logsene-syslog-receiver.eu.sematext.com**

To get started quickly, you can use our configuration script and add your application token as a parameter:

``` bash
curl -O https://apps.sematext.com/logsene/configure-syslog.py
sudo python configure-syslog.py $ADD-YOUR-APPLICATION-TOKEN-HERE
```
For more details, take a look at the [Syslog](syslog) page, and the pages that are linked from it.

### App Settings

App's settings include, but are not limited to:

  - inviting new users to your application
  - [authorizing public IPs to send data to your application via syslog](authorizing-ips-for-syslog)
  - adjusting data retention time, daily volume, and limits
  - [changing your app's plan](faq/#plans-prices)
  - checking how much data is, or has been shipped to your app
  
  <img alt="Sematext Logging App Settings" src="../images/logs/logsene-app-settings.png" title="Sematext Logging App Settings"></a>

### Getting Support

We hope you enjoy using Sematext App and Infrastructure Monitoring and Log Management tools. If you need further support or have any feedback regarding our products, please don't hesitate to [contact us](mailto:support@sematext.com) ! You can also contact / talk to us using chat widget at the bottom right corner of the page or give us a shout [@Sematext](http://twitter.com/sematext). 
