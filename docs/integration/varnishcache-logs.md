title: Varnish Cache Logs Integration
description: Sematext Varnish Cache Logs integration allows you to check response time, first byte served, along with traffic distribution across servers and requests made to the client and backend side.

To make use of the Sematext Varnish Cache Logs integration, you'll need to install the [Sematext Agent](../agents/sematext-agent/index.md) and configure it to ship Varnish Cache logs via the [Logs Discovery](../logs/discovery/intro.md). You will want to create or select an existing Varnish Cache Logs App because that is what will provide you with all the out of the box dashboards, some of which you can see below. Moreover, pre-configured anomaly alert rules are available to notify about increasing **4xx** and **5xx** response rates.

## Log Collection

1. To enable Varnish logging uncomment the following in `/etc/default/varnishncsa`:

``` bash
  VARNISHNCSA_ENABLED=1
```

2. Create `st_varnishncsa_format` file and add the following:

``` bash
"Timestamp": "%t", "network_client_ip": "%h", "varnish_hit_miss": "%{Varnish:hitmiss}x", "varnish_side": "%{Varnish:side}x", "age": %{age}o, "handling": "%{Varnish:handling}x", "http_request": "%r", "varnish_time_first_byte": %{Varnish:time_firstbyte}x, "http_method": "%m", "http_status_code": %s, "response_reason": "%{VSL:RespReason}x", "fetch_error": "%{VSL:FetchError}x", "x_forwarded_for": "%{x-forwarded-for}i", "remote_user": "%u", "network_bytes_written": "%b", "http_response_time": %D, "http_user_agent": "%{User-agent}i", "http_referer": "%{Referer}i", "x_varnish": "%{x-varnish}o", "x_magento_yags": "%{x-magento-tags}o"
```

3. Execute the `sudo systemctl edit varnishncsa` command to edit `ExecStart` property and paste the following:

``` bash
[Service]
ExecStart=
ExecStart=/usr/bin/varnishncsa -a -w /var/log/varnish/varnishncsa.log -D -c -b -f /home/user/st_varnishncsa_format -P /run/varnishncsa/varnishncsa.pid
```
You should provide the full path to the `st_varnishncsa_format` file in the command above. In this example, the file was located within the `/home/user` folder.

4. Restart the varnishncsa to apply the changes.

## Exploring logs

Once data is in, you can explore it via the built-in reports or create your own. 

<img
  class="content-modal-image"
  alt="Varnish Cache Logs Overview Report"
  src="../../images/integrations/varnishcache-logs-overview.png"
  title="Varnish Cache Logs Overview Report"
/>

### Traffic Insight Report

You can use the Traffic Insight report to see top clients, referrers, average response time and time to serve first byte based on servers and "zoom in" to the ones you're interested in:

<img
  class="content-modal-image"
  alt="Varnish Cache Traffic Insight Report"
  src="../../images/integrations/varnishcache-traffic-insight.png"
  title="Varnish Cache Traffic Insight Report"
/>

### Traffic Distribution Report

You can use the Traffic Distribution report to see the traffic distribution across servers for resource planning by analyzing data volume and bytes served:

<img
  class="content-modal-image"
  alt="Varnish Cache Traffic Distribution Report"
  src="../../images/integrations/varnishcache-traffic-distribution.png"
  title="Varnish Cache Traffic Distribution Report"
/>

### Client Side Logs Report

You can use the Client Side Logs report to see the requests made to the client side:

<img
  class="content-modal-image"
  alt="Varnish Cache Client Side Logs Report"
  src="../../images/integrations/varnishcache-client-side-logs.png"
  title="Varnish Cache Client Side Logs Report"
/>

### Backend Side Logs Report

You can use the Backend Side Logs report to see the requests made to the backend side:

<img
  class="content-modal-image"
  alt="Varnish Cache Backend Side Logs Report"
  src="../../images/integrations/varnishcache-backend-side-logs.png"
  title="Varnish Cache Backend Side Logs Report"
/>

## Troubleshooting

If you have trouble sending logs, try out the latest version of [Sematext Agent](../agents/sematext-agent/installation/). Also, make sure Sematext Agent is configured to send logs to your Varnish Cache Logs App. Last, check the [Log Agents panel](https://sematext.com/docs/fleet/#log-agents) for any errors, and refer to our [Sematext Logs FAQ](https://sematext.com/docs/logs/faq/) for useful tips.


