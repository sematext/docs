title: Resources Timing
description: How Sematext Experience collects external resources data such as downloaded images, CSS files, and Javascript files
-----

Experience collects resources data such as downloaded images, CSS and Javascript files. When someone visits your website the browser will begin downloading resources. These resources can have a big impact on your website loading speed.

The same process happens in Single Page Apps when user navigates to a different part of the web app.

There are two ways to see resources performance data in Experience.


## Resources Waterfall

Open the details page for some page load to access the Resources Waterfall table.

This table shows downloaded resources ordered by the time when resource got discovered. Each row shows the different stages of the download process.

You can sort the waterfall by Size, Load Time, Time to Loaded, and Time Started (Waterfall).

Let's explain what each of these mean:

 * Size is the transferred size of the resource. Size will be "Unknown" if it's not available due to <a href="#cross-origin-resource-sharing-cors-restrictions">CORS restrictions</a>.
 * Load Time is the time it took to download the resource once the fetch started
 * Time to Loaded is the time from when the page load got initiated to when this resource got downloaded
 * Time Started is the time when browser queued this resource for download

<img
  class="content-modal-image"
  alt="Resources Waterfall Screenshot"
  src="../../images/experience/waterfall.png"
  title="Resources Waterfall"
/>

## Resources Overview

The Top Resources table on the Overview page shows the site-wide performance for resources. The table is sortable by each column.

 * Hits is the number of times the resource got requested
 * Size is the average size of the resource 
 * DNS Lookup is the time it took to lookup the domain with DNS
 * TCP Handshake is the time it took to establish TCP connection
 * SSL Handshake is the time it took to perform the handshake process for securing the connection
 * Request is the average time it took for the server to process the request
 * Response is the average time it took for the browser to download the resource once it was processed by the server
 * Total is the average total time it took to fetch the resource. This time also includes the time the resource spent in the browser queue for fetching.

<img
  class="content-modal-image"
  alt="Resources Overview Table Screenshot"
  src="../../images/experience/resources.png"
  title="Resources Overview"
/>

Some of these timings are not available for CORS resources (see below).

## Cross-Origin Resource Sharing (CORS) restrictions

When CORS is in effect, many of the timing properties are zero, unless you adjust the server access policy. To relax the policy, the server should return the "Timing-Allow-Origin" HTTP response header. The header should list all domains that can access these restricted properties.

If you control the server that is providing the resource you should add this header to each response. You can use "*" to allow any domain, or the exact name(s) of the domain where the Experience script is collecting data. For example:

```
Timing-Allow-Origin: *
```

or

```
Timing-Allow-Origin: www.mysite.com
```
