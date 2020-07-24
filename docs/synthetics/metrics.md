title: Synthetics Metrics
description: List of metrics collected as part of HTTP and Browser monitor

Synthetics monitors collect the following metrics as part of every run. You can create custom charts using [Chart Builder](../dashboards/chart-builder/) for Synthetics metrics. The custom charts can be used to compare Synthetics metrics across multiple monitors.

## HTTP Monitor Metrics

| Name  | Label  | Description  | Unit  |
|---|---|---|---|
| synthetics.time.response  | Response time  | Total time taken for the complete request & response | ms  |
| synthetics.http.time.dns  | DNS lookup time  | DNS resolution time | ms |
| synthetics.http.time.connect  |  Socket connect time | Socket connection time  | ms |
| synthetics.http.time.tls  | TLS handshake time  |  TLS handshake time  | ms |
| synthetics.http.time.firstbyte  | Time to first byte (TTFB)  | Time taken to receive the first response byte from the server. Also called server or wait time | ms  |
| synthetics.http.time.download  |  Download Time | Time taken to download the response body  | ms  |
| synthetics.http.response.size  |  Response Body Size | Size of the response body  | bytes  |

## Browser Monitor Metrics

### Run Metrics

For every browser run, the monitor collects the below run-level metrics:

| Name  | Label  | Description  | Unit  |
|---|---|---|---|
| synthetics.time.response  | Response time  | Total time taken for the script to finish | ms  |
| synthetics.browser.request.count | Request count | Total number of HTTP requests sent during the execution of the script | |
| synthetics.browser.transfer.size | Transfer size | Total number of network bytes downloaded during the execution of the script | bytes |

### Page Load Metrics

The browser monitor collects the below page load (navigation) metrics for every run. If there are multiple page loads during the execution of the script, the last page-load metrics are collected.

| Name  | Label  | Description  | Unit  |
|---|---|---|---|
| synthetics.browser.time.frontend | Frontend time | Time taken for the browser to parse and create the page | ms |
| synthetics.browser.time.backend | Backend time |  Time taken for the network and the server to generate and start sending the HTML | | ms |
| synthetics.browser.time.pageload | Page load time | Time taken for the page to load, from initiation of the page load (e.g., click on a page link) to load completion in the browser | ms |
| synthetics.browser.time.dns | DNS time | DNS resolution time for the URL of the page | ms |
| synthetics.browser.time.connection | Socket connect time | Time taken to connect to server | ms |
| synthetics.browser.time.response | Time to first byte | Time taken for the server to send the response | ms |
| synthetics.browser.time.download | Download time | Time taken to download the page contents | ms |
| synthetics.browser.time.dom.interactive | DOM interactive time | Time taken by the browser to parse the document, including the network time from the user's location to your server | ms |
| synthetics.browser.time.dom.contentload | DOM content load time | Time taken by the browser to parse the document and execute deferred and parser-inserted scripts including the network time from the user's location to your server | ms |
| synthetics.browser.time.paint.first | First Paint (FP) | The time from navigation to the time when the first paint happens on the screen | ms |
| synthetics.browser.time.paint.firstcontentful | First Contentful Paint (FCP) |  The time from navigation to the time when the browser renders the first bit of content from the DOM | ms |
| synthetics.browser.time.paint.largestcontentful | Largest Contentful Paint (LCP) |  The time for largest content element to be visible in the viewport. | ms |
| synthetics.browser.cumulativelayoutshift | Cumulative Layout Shift (CLS) |  The sum total of all individual layout shift scores for every unexpected layout shift that occurs during the entire lifespan of the page ||

### Resource Metrics

Browser monitor collects the below metrics for every resource loaded during the execution of the script:

| Name  | Label  | Description  | Unit  |
|---|---|---|---|
| synthetics.browser.resource.transfer.size | Transfer size | Network size of the resource content | bytes |
| synthetics.browser.resource.time | Resource time | Total time taken to fetch the resource | ms |

### Custom Metrics

You can script the Browser monitor to collect custom metrics that are specific to your website or use case. For example, you might need to measure the time take to display auto-suggestions on your website or collect & monitor the value from an element in your webpage.  To collect a custom metric use `context.setMetric(name, value)` method in the Browser monitor script. For more info on how to use this API, look into the examples while creating the Browser monitor. The metric name should be unique for this Synthetics App and will be automatically pre-pended with `synthetics.` prefix. You could use [Chart Builder](../dashboards/chart-builder/) to create a custom chart to monitor this metric. You could also create a threshold or anomaly alert on this metric.