title: Sematext Experience Detailed Timing Breakdown
description: Investigate page loads and HTTP Requests performance breakdown with Sematext Experience

Load time performance depends on multiple factors. If your visitors are experiencing slow page load or HTTP requests performance it can be caused by the network, DNS servers, redirects, application performance, etc. To better understand which part of the loading process is slow, we've added detailed timing breakdown on Page Loads and HTTP Requests screens.

<img
  class="content-modal-image"
  alt="Experience Timing Breakdown"
  src="../../images/experience/breakdown.png"
  title="Experience Timing Breakdown"
  width=800
  height=86
/>

The parts shown above are based on the Navigation Timing API and the timestamps returned by the browser for each page load and HTTP request:

 * **Redirect** - is the average time browser has spent following redirects.
 * **Cache** is the average time browser has spent retrieving cached resources.
 * **DNS** is the average time browser has spent looking up the domain of your website.
 * **Latency** is the average latency for the page load or HTTP request.
 * **Server** is the average time the browser has been waiting for the server to process the request.
 * **Transfer** is the average time the browser took to download the response from the server.
 * **Render** is the average time the browser took to render the response from the server, download any blocking resources, and finish the load event.

## Soft page loads and cross-origin HTTP requests

Soft page loads and cross-origin HTTP requests are not included in the breakdown.

See [Cross-Origin Resource Sharing (CORS) restrictions](/experience/resources/#cross-origin-resource-sharing-cors-restrictions) on how to enable detailed timing attributes for cross-origin HTTP requests.

